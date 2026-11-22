#!/usr/bin/env python3
"""Agente local ALMAFLUXO (127.0.0.1:8090). Só biblioteca padrão; pyserial é opcional (pip install pyserial)."""
import json, socket, ipaddress, secrets, hashlib, os, glob, shutil, subprocess, tempfile, urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs
VERSAO = "1.1"; CODIGO = "%06d" % secrets.randbelow(10**6); BASES = ("https://raw.githubusercontent.com/",); ORIG = {"https://almafluxo.uk", "https://www.almafluxo.uk"}
PORTAS = {3000: "webOS", 3001: "webOS", 8001: "Tizen", 8002: "Tizen", 5555: "Android", 8008: "Android", 22: "Linux", 80: "HTTP", 35000: "ELM327"}
PACOTE = {"webOS": ".ipk", "Tizen": ".wgt", "Android": ".apk", "Linux": "pacote Linux/SSH"}
def privado(ip):
    try: return ipaddress.ip_address(ip).is_private
    except ValueError: return False
def porta_aberta(ip, p, t=0.8):
    try:
        with socket.create_connection((ip, p), timeout=t): return True
    except OSError: return False

def instalar(d):
    """Só executa ferramentas fixas, sobre pacote baixado do GitHub com SHA-256 conferido aqui."""
    base = os.environ.get("ALMAFLUXO_BASE", "")
    if not base.startswith(BASES): return {"ok": False, "erro": "defina ALMAFLUXO_BASE=https://raw.githubusercontent.com/USUARIO/REPO/main/"}
    arq = d.get("arquivo", "")
    if ".." in arq or not arq.startswith("distribuicao/pacotes/"): return {"ok": False, "erro": "caminho de pacote inválido"}
    dados = urllib.request.urlopen(base + arq, timeout=60).read()
    if hashlib.sha256(dados).hexdigest() != str(d.get("sha256", "")).lower(): return {"ok": False, "erro": "hash não confere"}
    tmp = os.path.join(tempfile.mkdtemp(), os.path.basename(arq)); open(tmp, "wb").write(dados)
    alvo, ip = d.get("alvo"), d.get("ip")
    if alvo == "android":
        if ip and privado(ip): subprocess.run(["adb", "connect", ip + ":5555"], capture_output=True, timeout=20)
        cmd = ["adb", "install", "-r", tmp]
    elif alvo == "webos":
        if not ip or not privado(ip): return {"ok": False, "erro": "informe o IP da TV (modo desenvolvedor ativo e dispositivo cadastrado no ares-setup-device como 'almafluxo')"}
        cmd = ["ares-install", "-d", "almafluxo", tmp]
    elif alvo == "pico":
        pts = glob.glob("/media/*/RPI-RP2") + glob.glob("/run/media/*/RPI-RP2") + glob.glob("/Volumes/RPI-RP2") + [x + ":\\" for x in "DEFGHIJKLMNOP" if os.path.exists(x + ":\\INFO_UF2.TXT")]
        if not pts: return {"ok": False, "erro": "Pico não está em modo BOOTSEL (segure BOOTSEL ao ligar o USB)"}
        shutil.copy(tmp, pts[0]); return {"ok": True, "saida": "UF2 copiado para " + pts[0]}
    else: return {"ok": False, "erro": "alvo sem instalador no agente (tizen e avr ainda não implementados)"}
    if not shutil.which(cmd[0]): return {"ok": False, "erro": cmd[0] + " não encontrado no PATH deste computador"}
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    return {"ok": r.returncode == 0, "saida": (r.stdout + r.stderr).strip()[-600:], "erro": (r.stderr or r.stdout).strip()[-300:]}
class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def _o(self):
        o = self.headers.get("Origin", "")
        return o if o in ORIG else None
    def _send(self, code, obj):
        b = json.dumps(obj).encode(); o = self._o()
        self.send_response(code); self.send_header("Content-Type", "application/json")
        if o: self.send_header("Access-Control-Allow-Origin", o); self.send_header("Vary", "Origin")
        self.end_headers(); self.wfile.write(b)
    def do_OPTIONS(self):
        o = self._o(); self.send_response(204)
        if o:
            self.send_header("Access-Control-Allow-Origin", o); self.send_header("Access-Control-Allow-Methods", "GET,POST")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Codigo"); self.send_header("Access-Control-Allow-Private-Network", "true")
        self.end_headers()
    def do_GET(self):
        if self.headers.get("Origin") and not self._o(): return self._send(403, {"ok": False})
        u = urlparse(self.path); q = parse_qs(u.query)
        if u.path == "/ping": return self._send(200, {"ok": True, "versao": VERSAO})
        if u.path == "/serial":
            try:
                from serial.tools import list_ports
                return self._send(200, {"ok": True, "portas": [{"dev": p.device, "desc": p.description, "vid": p.vid, "pid": p.pid} for p in list_ports.comports()]})
            except ImportError: return self._send(200, {"ok": False, "erro": "instale pyserial: pip install pyserial"})
        if u.path == "/probe":
            ip = (q.get("ip") or [""])[0]
            if not privado(ip): return self._send(400, {"ok": False, "erro": "apenas IP de rede local"})
            ab = [{"porta": p, "servico": s} for p, s in PORTAS.items() if porta_aberta(ip, p)]
            sis = next((s for _, s in [(a["porta"], a["servico"]) for a in ab] if s in PACOTE), None)
            return self._send(200, {"ok": True, "ip": ip, "abertas": ab, "sistema": sis, "pacote": PACOTE.get(sis)})
        self._send(404, {"ok": False})
    def do_POST(self):
        if not self._o(): return self._send(403, {"ok": False})
        if self.path == "/instalar":
            if self.headers.get("X-Codigo") != CODIGO: return self._send(403, {"ok": False, "erro": "código inválido"})
            try: return self._send(200, instalar(json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0)) or 0) or b"{}")))
            except Exception as e: return self._send(200, {"ok": False, "erro": str(e)})
        if self.path != "/tcp": return self._send(404, {"ok": False})
        try:
            d = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0)) or 0) or b"{}")
            ip, porta = d["ip"], int(d["porta"])
            if not privado(ip): return self._send(400, {"ok": False, "erro": "apenas IP de rede local"})
            ms = min(int(d.get("t", 1500)), 8000) / 1000
            with socket.create_connection((ip, porta), timeout=3) as s:
                s.sendall((d.get("cmd", "") + "\r").encode()); s.settimeout(ms); buf = b""
                try:
                    while b">" not in buf:
                        c = s.recv(512)
                        if not c: break
                        buf += c
                except socket.timeout: pass
            self._send(200, {"ok": True, "resp": buf.decode(errors="replace")})
        except Exception as e: self._send(200, {"ok": False, "erro": str(e)})
if __name__ == "__main__":
    print("Agente ALMAFLUXO em http://127.0.0.1:8090 | CÓDIGO DE INSTALAÇÃO:", CODIGO)
    ThreadingHTTPServer(("127.0.0.1", 8090), H).serve_forever()
