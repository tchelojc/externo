# ALMAFLUXO-INSTALADOR
Origem oficial: este repositório GitHub. O Worker serve `/portal`, `/core/*`, `/distribuicao/*` e `/conversa/instalacao` a partir dele.

**Integrar ao Worker (automático; o caminho antigo do Drive fica como reserva):**
`python scripts/aplicar-worker-patch.py worker.js https://raw.githubusercontent.com/tchelojc/externo/alma/instalador/ worker.patched.js`
O script confere as âncoras, aplica, valida a sintaxe e recusa worker diferente do esperado. Foi testado contra o worker.js enviado (rotas /core, /portal, /conversa/instalacao e proteção de caminho), com a rede simulada.

## Estado real
Pronto: portal; hub (instalar/atualizar/conversa/universo, login gravado, guia de início com a TV); core (detector, instalador PWA, atualizador, integridade SHA-256); ponte USB/Bluetooth/Wi-Fi para eletrica e mecanica; agente local; testes do parser OBD.
NÃO pronto: pacotes nativos .ipk/.wgt/.apk/Linux (pasta plataformas/), canais de streaming, tunel para porta externa. Nada foi testado em TV, placa ou carro reais.

## Uso
1. Publique no GitHub, ajuste `INSTALADOR_BASE` e aplique `scripts/worker-patch.js`.
2. `python scripts/gerar-manifest.py 1.0.1 "notas"` a cada alteração do core, e commit.
3. No computador: `pip install pyserial` (opcional) e `python scripts/agente/almafluxo_agente.py`.
4. Abra almafluxo.uk/eletrica ou /mecanica: botão ⚡ Conectar.
## Conversa primeiro
Instalar/abrir sempre passa por /conversa e grava `proximo` em `almafluxo_instalador`. O Worker injeta `core/ponte-totem.js` no totem (sem editar o arquivo dele): só age se o instalador pediu um destino nos últimos 10 min, espera `comunicacao.totem.espera_s` (45 s) e redireciona uma vez; o totem aberto direto não muda. Linha equivalente, se preferir colocar à mão:
`setTimeout(()=>{try{const s=JSON.parse(localStorage.almafluxo_instalador||'{}');if(s.proximo){delete s.proximo;localStorage.almafluxo_instalador=JSON.stringify(s);location.href='/'}}catch(e){}},45000)`

## Instalação direta pela elétrica (botão ⚡ Conectar → "Instalar ALMAFLUXO")
- ESP32: grava pelo navegador (USB, esptool-js 0.5.4 via jsDelivr — confira se a CSP permite). Outros alvos (android/webos/pico) passam pelo agente, que pede o CÓDIGO impresso no terminal e confere o SHA-256 de novo. Defina `ALMAFLUXO_BASE=https://raw.githubusercontent.com/tchelojc/externo/alma/instalador/` ao iniciar o agente.
- Os pacotes ficam em `distribuicao/pacotes/` e são listados em `distribuicao/pacotes.json` (hoje VAZIO: não existe firmware/APK/IPK do ALMAFLUXO ainda). Sem pacote publicado, o botão só informa isso.
- Não implementado: Tizen (.wgt), Arduino AVR, Windows/Linux nativos. Placa-mãe de TV/celular só com depuração/modo desenvolvedor ligado no aparelho.

## Repositório e canais
- Repositório: github.com/tchelojc/externo, branch `alma`. Envie esta pasta inteira para `instalador/` na raiz do branch (não toca em `conversa/`). Base do Worker: `https://raw.githubusercontent.com/tchelojc/externo/alma/instalador/`.
- **Canais** (`distribuicao/canais.json`): troca por ‹ CH ›, lista ☰, teclas CH+/CH− (Samsung 427/428, PageUp/PageDown) e número + pausa. Rotas: `/conversa/totem…`, `/conversa/youtube`, `/conversa/instagram`, `tiktok`, `facebook`, `linkedin`, `twitter`.
- Regras: canal com 🔒 exige login ALMAFLUXO; a conversa roda primeiro, uma vez por sessão (libera depois de `espera_conversa_s`); só com login o último canal fica lembrado.
- Limites reais: YouTube abre embutido. Instagram, TikTok, Facebook, LinkedIn e X bloqueiam abrir dentro de outra página e mantêm o login no site deles — o canal abre em nova janela (pode não funcionar em navegador de TV). O controle fica flutuante no canto; para ficar ao lado do botão de slide, precisa do totem.html.
