from __future__ import annotations

import base64
import binascii
import html
import json
import re
import shutil
import subprocess
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import streamlit as st

st.set_page_config(page_title="ALMAFLUXO STUDIO", page_icon="🎛️", layout="wide")

MAX_UPLOAD = 200 * 1024 * 1024
MAX_DURATION = 600
FFMPEG_TIMEOUT = 60
FORMATS = ["mp3", "wav", "ogg", "m4a", "flac", "aac"]
BITRATES = ["128k", "192k", "256k", "320k"]

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Rajdhani:wght@400;600&family=Share+Tech+Mono&display=swap');
:root{--bg:#0a0a0f;--bg1:#101019;--gold:#d4a843;--cyan:#00d4c8;--green:#39d98a;--red:#ff5a5a;--muted:#9a93a8;--border:rgba(212,168,67,.2)}
.stApp{background:var(--bg);color:#e8e6e3}.stApp h1,.stApp h2,.stApp h3{font-family:Orbitron!important;color:var(--gold)!important}
.stApp p,.stApp label,.stApp li{font-family:Rajdhani,sans-serif}.stButton>button,.stDownloadButton>button{border-radius:28px;font-family:'Share Tech Mono';letter-spacing:1px;min-height:42px}
.stButton>button{background:rgba(212,168,67,.08);color:var(--gold);border:1px solid var(--gold)}.stDownloadButton>button{background:rgba(0,212,200,.08);color:var(--cyan);border:1px solid var(--cyan)}
.header{border-bottom:1px solid var(--border);padding:5px 0 18px;margin-bottom:22px}.title{font:700 30px Orbitron;color:var(--gold);letter-spacing:3px}.sub,.mono{font:11px 'Share Tech Mono';letter-spacing:2px;color:var(--muted)}
.card{background:var(--bg1);border:1px solid var(--border);border-radius:12px;padding:16px;margin:8px 0}.dna{border-color:rgba(0,212,200,.3)}
.ok,.warn,.err{padding:13px;border-radius:9px;font:12px 'Share Tech Mono';margin:8px 0}.ok{border:1px solid var(--green);color:var(--green);background:rgba(57,217,138,.06)}.warn{border:1px solid var(--gold);color:#e6c87a;background:rgba(212,168,67,.06)}.err{border:1px solid var(--red);color:var(--red);background:rgba(255,90,90,.06)}
.footer{border-top:1px solid var(--border);margin-top:50px;padding-top:18px;text-align:center;color:#514963;font:10px 'Share Tech Mono';letter-spacing:2px}
</style>
""", unsafe_allow_html=True)


def init_state() -> None:
    defaults = {
        "audio_bytes": None, "audio_name": None, "audio_mime": None,
        "audio_path": None, "info": {}, "dna": None, "source": None,
        "token": None, "premium": False, "result": None, "result_name": None,
        "result_info": {}, "ops": [], "error": None, "elapsed": None,
        "history": [],
    }
    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def safe_name(name: str) -> str:
    s = re.sub(r"[^A-Za-z0-9._-]+", "_", Path(name or "audio").stem)
    return (s.strip("._-") or "audio")[:80]


def tool(name: str) -> str | None:
    return shutil.which(name)


def ffmpeg_ok() -> bool:
    return bool(tool("ffmpeg") and tool("ffprobe"))


def run(cmd: list[str], timeout: int, text: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=text, timeout=timeout, check=False)


def probe(path: str) -> dict[str, Any]:
    if not ffmpeg_ok():
        return {}
    try:
        r = run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", path], 15)
        if r.returncode:
            return {}
        data = json.loads(r.stdout or "{}")
        fmt = data.get("format", {})
        stream = next((x for x in data.get("streams", []) if x.get("codec_type") == "audio"), {})
        return {
            "duracao": float(fmt.get("duration") or 0),
            "bitrate": int(float(fmt.get("bit_rate") or 0)),
            "sample_rate": int(stream.get("sample_rate") or 0),
            "canais": int(stream.get("channels") or 0),
            "codec": stream.get("codec_name") or "?",
            "format": fmt.get("format_name") or "?",
        }
    except Exception:
        return {}


def save_temp(raw: bytes, name: str) -> str:
    f = tempfile.NamedTemporaryFile(delete=False, suffix=Path(name).suffix or ".bin")
    try:
        f.write(raw)
        return f.name
    finally:
        f.close()


def cleanup(path: str | None) -> None:
    if path:
        try:
            Path(path).unlink(missing_ok=True)
        except Exception:
            pass


def reset() -> None:
    cleanup(st.session_state.get("audio_path"))
    for k in list(st.session_state.keys()):
        del st.session_state[k]
    init_state()


def decode_dna(value: str | None) -> dict[str, Any] | None:
    if not value:
        return None
    candidates = [value]
    try:
        padded = value + "=" * ((4 - len(value) % 4) % 4)
        candidates.insert(0, base64.urlsafe_b64decode(padded).decode())
    except (binascii.Error, UnicodeDecodeError, ValueError):
        pass
    for item in candidates:
        try:
            obj = json.loads(item)
            if isinstance(obj, dict):
                obj.setdefault("schema", "ALMAFLUXO_MUSIC_DNA")
                obj.setdefault("version", 2)
                return obj
        except Exception:
            continue
    return None


def filters_for(gain: float, fade_in: float, fade_out: float, duration: float,
                silence: bool, normalize: bool, low: float, mid: float,
                high: float, compressor: bool) -> list[str]:
    f: list[str] = []
    if gain: f.append(f"volume={gain:.2f}dB")
    if fade_in: f.append(f"afade=t=in:st=0:d={fade_in:.3f}")
    if fade_out: f.append(f"afade=t=out:st={max(0, duration-fade_out):.3f}:d={fade_out:.3f}")
    if silence: f.append("silenceremove=start_periods=1:start_duration=0.10:start_threshold=-50dB")
    if low: f.append(f"equalizer=f=100:t=q:w=1:g={low:.2f}")
    if mid: f.append(f"equalizer=f=1000:t=q:w=1:g={mid:.2f}")
    if high: f.append(f"equalizer=f=8000:t=q:w=1:g={high:.2f}")
    if compressor: f.append("acompressor=threshold=-18dB:ratio=3:attack=20:release=250")
    if normalize: f.append("loudnorm=I=-14:TP=-1.5:LRA=11")
    return f


def process_audio(src: str, dst: str, start: float, end: float, gain: float,
                  fade_in: float, fade_out: float, bitrate: str, normalize: bool,
                  silence: bool, low: float, mid: float, high: float,
                  compressor: bool) -> None:
    duration = end - start
    filters = filters_for(gain, fade_in, fade_out, duration, silence, normalize, low, mid, high, compressor)
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{start:.3f}", "-i", src, "-t", f"{duration:.3f}"]
    if filters:
        cmd += ["-af", ",".join(filters)]
    cmd += ["-vn", "-codec:a", "libmp3lame", "-b:a", bitrate, "-ar", "44100", "-ac", "2", dst]
    r = run(cmd, FFMPEG_TIMEOUT)
    if r.returncode:
        raise RuntimeError((r.stderr or "ffmpeg falhou")[-1800:])


def update_dna(dna: dict[str, Any] | None, ops: list[str], bitrate: str, info: dict[str, Any]) -> dict[str, Any]:
    out = dict(dna or {})
    out.setdefault("schema", "ALMAFLUXO_MUSIC_DNA")
    out.setdefault("version", 2)
    out["processado"] = True
    out["studio"] = {
        "processado": True, "operacoes": ops, "bitrate": int(bitrate[:-1]),
        "formato": "mp3", "timestamp": now_utc(),
        "duracao_resultado": info.get("duracao", 0),
        "tamanho_resultado_bytes": info.get("tamanho_bytes", 0),
    }
    return out


def autonomous_html(mp3: bytes, dna: dict[str, Any] | None) -> bytes:
    audio64 = base64.b64encode(mp3).decode("ascii")
    title = html.escape(str((dna or {}).get("titulo") or "ALMAFLUXO · Obra"))
    dna_json = json.dumps(dna or {}, ensure_ascii=False).replace("</script>", "<\\/script>")
    doc = f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><style>body{{margin:0;min-height:100vh;background:#0a0a0f;color:#eee;font-family:Arial;display:grid;place-items:center;padding:20px}}main{{width:min(760px,100%);background:#101019;border:1px solid #d4a84344;border-radius:16px;padding:24px;box-sizing:border-box}}h1{{color:#d4a843}}audio{{width:100%;margin:20px 0}}pre{{background:#0a0a0f;padding:16px;color:#9a93a8;white-space:pre-wrap;word-break:break-word}}</style></head><body><main><h1>ALMAFLUXO · {title}</h1><audio controls preload="metadata" src="data:audio/mpeg;base64,{audio64}"></audio><h3>DNA MUSICAL</h3><pre id="dna"></pre><small>ALMAFLUXO STUDIO · obra autônoma</small><script>const DNA={dna_json};document.getElementById("dna").textContent=JSON.stringify(DNA,null,2);</script></main></body></html>'''
    return doc.encode("utf-8")


init_state()
qp = st.query_params
st.session_state.source = qp.get("source")
st.session_state.token = qp.get("token")
if st.session_state.dna is None:
    st.session_state.dna = decode_dna(qp.get("dna"))

with st.sidebar:
    st.markdown("### 🎛️ ALMAFLUXO STUDIO")
    st.markdown('<div class="mono">OFICINA DE PÓS-PRODUÇÃO</div>', unsafe_allow_html=True)
    st.divider()
    st.markdown("**Ecossistema**")
    st.write("🌀 SOMA")
    st.write("🎵 ALMADITOR MUSIC")
    st.write("🎤 KARAOKÊ FLUXO")
    st.write("🏠 PORTAL ALMAFLUXO")
    st.divider()
    st.write("🟢 ffmpeg + ffprobe ativos" if ffmpeg_ok() else "🔴 ffmpeg/ffprobe indisponíveis")
    st.write(f"📡 origem: {st.session_state.source or 'direta'}")
    st.write("🔑 token recebido" if st.session_state.token else "⚪ sem token")
    if st.session_state.token:
        st.caption("Token recebido não é considerado válido sem confirmação do Worker.")

st.markdown('<div class="header"><div class="title">ALMAFLUXO STUDIO</div><div class="sub">OFICINA DE PÓS-PRODUÇÃO DE ÁUDIO · CAMADA OPCIONAL</div></div>', unsafe_allow_html=True)
st.markdown('<div class="warn">💡 O STUDIO é opcional. Se estiver offline, SOMA, ALMADITOR MUSIC e KARAOKÊ continuam funcionando.</div>', unsafe_allow_html=True)

if st.session_state.audio_bytes is None:
    st.markdown("### 📁 Carregar áudio")
    up = st.file_uploader("Arraste um áudio ou clique para selecionar", type=FORMATS)
    if up is not None:
        raw = up.getvalue()
        if len(raw) > MAX_UPLOAD:
            st.error("O arquivo ultrapassa 200 MB.")
        else:
            path = save_temp(raw, up.name)
            info = probe(path)
            duration = float(info.get("duracao") or 0)
            if not ffmpeg_ok():
                cleanup(path)
                st.error("Oficina offline: ffmpeg/ffprobe não estão disponíveis. O restante do ecossistema não é afetado.")
            elif duration <= 0:
                cleanup(path)
                st.error("Não foi possível identificar a duração do áudio.")
            elif duration > MAX_DURATION:
                cleanup(path)
                st.error("O áudio ultrapassa o limite de 10 minutos.")
            else:
                st.session_state.audio_bytes = raw
                st.session_state.audio_name = up.name
                st.session_state.audio_mime = up.type or "audio/mpeg"
                st.session_state.audio_path = path
                st.session_state.info = info
                st.rerun()
    st.markdown("---")
    st.markdown("### Núcleo")
    st.markdown("Corte · ganho · fades · loudnorm -14 LUFS · silêncio · EQ 3 bandas · compressor · MP3 128/192/256/320 · DNA · Base64 · HTML autônomo")
else:
    raw = st.session_state.audio_bytes
    name = st.session_state.audio_name
    mime = st.session_state.audio_mime or "audio/mpeg"
    info = st.session_state.info or probe(st.session_state.audio_path)
    duration = float(info.get("duracao") or 0)

    a,b,c,d = st.columns(4)
    a.metric("Duração", f"{int(duration//60)}:{int(duration%60):02d}")
    b.metric("Tamanho", f"{len(raw)/1024/1024:.2f} MB")
    c.metric("Codec", str(info.get("codec", "?")).upper())
    d.metric("Canais", str(info.get("canais", "?")))

    if st.session_state.dna:
        dna = st.session_state.dna
        st.markdown(f'''<div class="card dna"><div class="mono" style="color:#00d4c8">🧬 DNA DETECTADO</div><p><b>Título:</b> {html.escape(str(dna.get("titulo","—")))}</p><p><b>Território:</b> {html.escape(str(dna.get("territorio","—")))}</p><p><b>Ano:</b> {html.escape(str(dna.get("ano","—")))}</p><p><b>Elemento:</b> {html.escape(str(dna.get("elemento","—")))}</p><p><b>Sentimento:</b> {html.escape(str(dna.get("sentimento","—")))}</p><p><b>BPM:</b> {html.escape(str(dna.get("bpm","—")))}</p><p><b>Seed:</b> {html.escape(str(dna.get("seed","—")))}</p></div>''', unsafe_allow_html=True)
        with st.expander("📜 DNA completo"):
            st.json(dna)

    st.markdown("### 🔊 Pré-escuta")
    st.audio(raw, format=mime)
    st.caption("Waveform interativa fica desacoplada do núcleo; se o componente visual falhar, o processamento continua pelo player nativo.")

    st.markdown("### ⚙️ Processamento")
    with st.form("processing"):
        p1,p2 = st.columns(2)
        with p1:
            start = st.number_input("Início (s)", 0.0, max(duration, 0.1), 0.0, 0.1)
            end = st.number_input("Fim (s)", 0.1, max(duration, 0.1), max(duration, 0.1), 0.1)
            gain = st.slider("Ganho (dB)", -20.0, 20.0, 0.0, 0.5)
        with p2:
            fade_in = st.slider("Fade in (s)", 0.0, min(10.0, max(duration,0.1)), 0.0, 0.1)
            fade_out = st.slider("Fade out (s)", 0.0, min(10.0, max(duration,0.1)), 0.0, 0.1)
            bitrate = st.selectbox("Bitrate MP3", BITRATES, index=1)
        o1,o2 = st.columns(2)
        with o1:
            normalize = st.checkbox("Normalizar -14 LUFS", True)
            silence = st.checkbox("Remover silêncio inicial", False)
        with o2:
            compressor = st.checkbox("Compressão dinâmica", False)
        st.markdown("**EQ 3 bandas**")
        e1,e2,e3 = st.columns(3)
        low = e1.slider("Graves · 100 Hz", -12.0, 12.0, 0.0, 0.5)
        mid = e2.slider("Médios · 1 kHz", -12.0, 12.0, 0.0, 0.5)
        high = e3.slider("Agudos · 8 kHz", -12.0, 12.0, 0.0, 0.5)
        go = st.form_submit_button("⚡ PROCESSAR", use_container_width=True)

    x,y = st.columns(2)
    x.download_button("⬇ BAIXAR ORIGINAL", raw, name, mime=mime, use_container_width=True)
    if y.button("🔄 NOVO ÁUDIO", use_container_width=True):
        reset(); st.rerun()

    if go:
        st.session_state.error = None
        if not ffmpeg_ok():
            st.session_state.error = "ffmpeg/ffprobe indisponíveis no servidor."
        elif end <= start:
            st.session_state.error = "O fim precisa ser maior que o início."
        elif fade_in + fade_out >= end - start:
            st.session_state.error = "Fade in + fade out precisa ser menor que a duração selecionada."
        else:
            ops=[]
            if start>0 or end<duration: ops.append(f"corte {start:.1f}s → {end:.1f}s")
            if gain: ops.append(f"ganho {gain:+.1f} dB")
            if fade_in: ops.append(f"fade in {fade_in:.1f}s")
            if fade_out: ops.append(f"fade out {fade_out:.1f}s")
            if silence: ops.append("remoção de silêncio inicial")
            if low or mid or high: ops.append("EQ 3 bandas")
            if compressor: ops.append("compressão dinâmica")
            if normalize: ops.append("normalização -14 LUFS")
            ops.append(f"MP3 {bitrate}")
            out=None; t0=time.monotonic()
            try:
                with st.status("⚙️ Processando com ffmpeg...", expanded=True) as status:
                    out=tempfile.NamedTemporaryFile(delete=False,suffix=".mp3").name
                    process_audio(st.session_state.audio_path,out,start,end,gain,fade_in,fade_out,bitrate,normalize,silence,low,mid,high,compressor)
                    elapsed=time.monotonic()-t0
                    if elapsed>FFMPEG_TIMEOUT: raise TimeoutError("Processamento ultrapassou 60 segundos.")
                    result=Path(out).read_bytes()
                    ri=probe(out); ri["tamanho_bytes"]=len(result)
                    st.session_state.result=result; st.session_state.result_name=f"almafluxo_studio_{safe_name(name)}_{int(time.time())}.mp3"; st.session_state.result_info=ri; st.session_state.ops=ops; st.session_state.elapsed=elapsed
                    st.session_state.dna=update_dna(st.session_state.dna,ops,bitrate,ri)
                    st.session_state.history.insert(0,{"timestamp":now_utc(),"arquivo":name,"operacoes":ops})
                    st.session_state.history=st.session_state.history[:10]
                    status.update(label="✅ Processamento concluído",state="complete")
            except subprocess.TimeoutExpired:
                st.session_state.error="ffmpeg ultrapassou 60 segundos."
            except TimeoutError as exc:
                st.session_state.error=str(exc)
            except Exception as exc:
                st.session_state.error=f"Erro no processamento: {exc}"
            finally:
                cleanup(out)

    if st.session_state.get("error"):
        st.markdown(f'<div class="err">❌ {html.escape(st.session_state.error)}</div>',unsafe_allow_html=True)
        st.info("Tente um áudio menor ou reduza a região/filtros.")

    if st.session_state.result:
        result=st.session_state.result; ri=st.session_state.result_info
        st.markdown("---")
        st.markdown('<div class="ok">✅ PROCESSAMENTO CONCLUÍDO</div>',unsafe_allow_html=True)
        r1,r2,r3,r4=st.columns(4)
        r1.metric("Tamanho",f"{len(result)/1024/1024:.2f} MB")
        rd=float(ri.get("duracao") or 0); r2.metric("Duração",f"{int(rd//60)}:{int(rd%60):02d}")
        r3.metric("Tempo",f"{st.session_state.elapsed:.1f}s"); r4.metric("Operações",len(st.session_state.ops))
        for op in st.session_state.ops: st.write("•",op)
        st.audio(result,format="audio/mpeg")
        q1,q2,q3=st.columns(3)
        q1.download_button("⬇ BAIXAR MP3",result,st.session_state.result_name,mime="audio/mpeg",use_container_width=True)
        dna_bytes=json.dumps(st.session_state.dna or {},ensure_ascii=False,indent=2).encode()
        q2.download_button("⬇ BAIXAR DNA ATUALIZADO",dna_bytes,"almafluxo_dna_atualizado.json",mime="application/json",use_container_width=True)
        q3.download_button("⬇ GERAR HTML AUTÔNOMO",autonomous_html(result,st.session_state.dna),f"{safe_name(name)}_ALMAFLUXO.html",mime="text/html",use_container_width=True)
        with st.expander("🧬 Base64 do MP3"):
            b64=base64.b64encode(result).decode(); st.caption(f"{len(b64):,} caracteres".replace(",",".")); st.text_area("Base64",b64,height=160)
        with st.expander("🔗 Ponte de integração"):
            st.info("O Python do Streamlit não acessa diretamente window.postMessage. O retorno automático deve ser feito por um bridge JavaScript/iframe ou por uma rota HTTP. Enquanto isso, MP3 + DNA + HTML permanecem disponíveis por download.")

if st.session_state.history:
    with st.expander("🕘 Histórico da sessão · últimas 10"):
        for h in st.session_state.history: st.write(h["timestamp"],"·",h["arquivo"],"·"," / ".join(h["operacoes"]))

st.markdown('<div class="footer">ALMAFLUXO STUDIO · OFICINA OPCIONAL · SE CAIR, O RESTO DO ECOSSISTEMA CONTINUA</div>',unsafe_allow_html=True)
