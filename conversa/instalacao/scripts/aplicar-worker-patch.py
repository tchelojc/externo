#!/usr/bin/env python3
"""Integra o instalador ao worker.js EXISTENTE, sem apagar nada (o caminho antigo do Drive continua como reserva).
Uso: python scripts/aplicar-worker-patch.py worker.js https://raw.githubusercontent.com/tchelojc/externo/alma/instalador/ [saida.js]"""
import sys, re, subprocess, shutil
if len(sys.argv) < 3: sys.exit(__doc__)
src, base = sys.argv[1], sys.argv[2]; out = sys.argv[3] if len(sys.argv) > 3 else "worker.patched.js"
if not re.fullmatch(r"https://raw\.githubusercontent\.com/[\w.-]+/[\w.-]+/[\w./-]+/", base): sys.exit("Base inválida. Ex.: https://raw.githubusercontent.com/USUARIO/REPO/main/")
s = open(src, encoding="utf-8", newline="").read(); NL = "\r\n" if "\r\n" in s else "\n"
if "/*ALMAFLUXO-INSTALADOR*/" in s: sys.exit("Patch já aplicado.")
def troca(a, b):
    global s
    a = a.replace("\n", NL); b = b.replace("\n", NL)
    if s.count(a) != 1: sys.exit("Âncora não encontrada (ou duplicada) — worker diferente do esperado: " + a[:70].strip())
    s = s.replace(a, b)
FN = r'''/*ALMAFLUXO-INSTALADOR*/
var INSTALADOR_BASE = "__BASE__";
function __instaladorOk() { return /^https:\/\/raw\.githubusercontent\.com\/[\w.-]+\/[\w.-]+\/[\w.\/-]+\/$/.test(INSTALADOR_BASE); }
var __INST_MIME = { html: "text/html; charset=utf-8", js: "application/javascript; charset=utf-8", json: "application/json; charset=utf-8" };
async function __rotaInstalador(path) {
  const canal = /^\/conversa\/(youtube|instagram|tiktok|facebook|linkedin|twitter)\d*\/?$/.test(path);
  if (!(canal || path === "/portal" || path === "/portal/" || path.startsWith("/core/") || path.startsWith("/distribuicao/"))) return null;
  const sem = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };
  if (!__instaladorOk()) return new Response("INSTALADOR_BASE não configurado no Worker.", { status: 503, headers: sem });
  const rel = canal ? "canal/index.html" : path.startsWith("/portal") ? "portal/index.html" : path.slice(1);
  if (rel.includes("..") || !/^[\w\/.-]+$/.test(rel)) return new Response("Caminho inválido.", { status: 400, headers: sem });
  const r = await fetch(INSTALADOR_BASE + rel, { cf: { cacheTtl: 60 } });
  if (!r.ok) return new Response("Não encontrado no repositório do instalador.", { status: r.status === 404 ? 404 : 502, headers: sem });
  return new Response(r.body, { status: 200, headers: { "Content-Type": __INST_MIME[rel.split(".").pop()] || "application/octet-stream", "Cache-Control": canal ? "no-store" : "no-cache", "X-Content-Type-Options": "nosniff" } });
}
async function __instaladorHtml(origin) {
  const r = await fetch(INSTALADOR_BASE + "instalacao/index.html", { cf: { cacheTtl: 60 } });
  if (!r.ok) return null; // cai no caminho antigo (Drive)
  return new Response(await r.text(), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", ...corsHeaders(origin), ...__CABECALHOS_SEG } });
}
// Injeta scripts SEM editar os arquivos: ponte de hardware em /eletrica e /mecanica; ponte de retorno no totem (só age se o instalador pediu).
function __injetarAlma(resp, path) {
  if (!/text\/html/.test(resp.headers.get("Content-Type") || "")) return resp;
  let tags = null;
  if (/^\/(eletrica|mecanica)(\/(index\.html)?)?$/.test(path)) tags = '<script src="/core/estado.js"></script><script src="/core/diagnostico.js"></script><script src="/core/gravador.js"></script><script src="/core/guia.js"></script><script src="/core/hardware.js"></script>';
  else if ((path === "/conversa" || path.startsWith("/conversa/")) && !path.startsWith("/conversa/instalacao") && !/^\/conversa\/(youtube|instagram|tiktok|facebook|linkedin|twitter)/.test(path)) tags = '<script src="/core/ponte-totem.js"></script><script src="/core/canais.js"></script>';
  if (!tags) return resp;
  return new HTMLRewriter().on("body", { element(e) { e.append(tags, { html: true }); } }).transform(resp);
}
'''.replace("__BASE__", base)
troca("\nvar worker_default = {\n", "\n" + FN + "var worker_default = {\n")
troca('    const resp =\n      path === "/conversa/sw.js"', '    let resp =\n      path === "/conversa/sw.js"')
troca("    if (registrar) {\n      // ... (mantém como está)", "    resp = __injetarAlma(resp, path);\n    if (registrar) {\n      // ... (mantém como está)")
troca("    const registrar = !!env.TRAFEGO_KEY", "    { const __r = await __rotaInstalador(path); if (__r) return __r; }\n    const registrar = !!env.TRAFEGO_KEY")
troca('  if (p === "/conversa/instalacao") {', '  if (p === "/conversa/instalacao" && __instaladorOk()) { const __r = await __instaladorHtml(origin); if (__r) return __r; }\n  if (p === "/conversa/instalacao") {')
open(out, "w", encoding="utf-8", newline="").write(s)
if shutil.which("node"):
    import os, tempfile; t = os.path.join(tempfile.mkdtemp(), "w.mjs"); shutil.copy(out, t)
    r = subprocess.run(["node", "--check", t], capture_output=True, text=True)
    if r.returncode: sys.exit("Sintaxe inválida após o patch:\n" + r.stderr[:500])
print("OK ->", out)
