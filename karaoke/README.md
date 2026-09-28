# ALMAFLUXO STUDIO v2

Versão limpa do app Streamlit para pós-produção de áudio.

## Incluído
- upload até 200 MB
- duração até 10 minutos
- ffprobe
- corte, ganho, fade in/out
- normalização -14 LUFS
- remoção de silêncio
- EQ de 3 bandas
- compressor opcional
- MP3 128/192/256/320 kbps
- DNA atualizado
- Base64 sob demanda
- HTML autônomo
- histórico das últimas 10 operações da sessão
- limpeza de arquivos temporários
- fallback para o player nativo quando a waveform não estiver disponível

## Deploy
Coloque `app.py`, `requirements.txt` e `packages.txt` no repositório e configure o Streamlit Cloud para executar `app.py`.

## Integração
O `?dna=` aceita JSON ou Base64 URL-safe. `?source=` e `?token=` são preservados como contexto. A presença de token não é considerada autenticação válida: a confirmação deve vir do Worker.
