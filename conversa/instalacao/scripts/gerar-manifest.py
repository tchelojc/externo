#!/usr/bin/env python3
"""Uso: python scripts/gerar-manifest.py 1.0.1 "notas". Gera hashes SHA-256 e atualiza distribuicao/."""
import hashlib, json, sys, glob, os, time
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
v = sys.argv[1] if len(sys.argv) > 1 else "1.0.0"
arq = {f.replace("\\", "/"): hashlib.sha256(open(f, "rb").read()).hexdigest() for f in sorted(glob.glob("core/*.js")) if not f.endswith("polifill.js")}
json.dump({"versao": v, "arquivos": arq}, open("distribuicao/manifest.json", "w"), indent=1)
json.dump({"versao": v, "data": time.strftime("%Y-%m-%d"), "notas": sys.argv[2] if len(sys.argv) > 2 else ""}, open("distribuicao/versao.json", "w"), indent=1)
print("ok", v, len(arq), "arquivos")
