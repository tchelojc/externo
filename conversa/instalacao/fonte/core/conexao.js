(()=>{'use strict';
/* ALMAFLUXO — PAINEL DE CONEXÃO (eletrica / mecanica)
   Botão visível + guia das rotas: USB, Bluetooth, Wi-Fi/Rede e API (agente local).
   A leitura real é feita por /core/hardware.js (AFHW), carregado sob demanda. */
if(window.__AF_CONEXAO__)return;window.__AF_CONEXAO__=true;

const AGENTE='http://127.0.0.1:8090',NUVEM=location.origin;
const DEPS=['estado','diagnostico','gravador','guia','hardware'];
let pronto=null,painel=null;

const el=(t,a,...f)=>{const e=document.createElement(t);Object.entries(a||{}).forEach(([k,v])=>k==='style'?e.style.cssText=v:k.startsWith('on')?e[k]=v:e.setAttribute(k,v));f.flat().forEach(x=>e.append(x));return e};
const tempo=(url,ms)=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);return fetch(url,{cache:'no-store',signal:c.signal}).finally(()=>clearTimeout(t))};

function carregarScript(nome){
 return new Promise((ok,erro)=>{
  const s=document.createElement('script');
  s.src='/core/'+nome+'.js';
  s.onload=ok;
  s.onerror=()=>erro(new Error('O servidor não entregou /core/'+nome+'.js (confira /instalador/status).'));
  document.head.appendChild(s);
 });
}
function carregarHW(){
 if(window.AFHW)return Promise.resolve();
 if(!pronto)pronto=(async()=>{
  for(const n of DEPS){
   if(n==='hardware'||!document.querySelector('script[src="/core/'+n+'.js"]'))await carregarScript(n).catch(e=>{if(n==='hardware')throw e;});
  }
  if(!window.AFHW)throw new Error('hardware.js carregou, mas o módulo AFHW não iniciou.');
 })().catch(e=>{pronto=null;throw e});
 return pronto;
}

async function testar(){
 const r={};
 r.seguro=!!window.isSecureContext;
 r.serial=!!(navigator.serial||navigator.usb);
 r.ble=!!navigator.bluetooth;
 try{const j=await(await tempo(AGENTE+'/ping',1500)).json();r.agente=j&&j.ok?('v'+(j.versao||'?')):false}catch(e){r.agente=false}
 try{const x=await tempo(NUVEM+'/api/wiki/lista',6000);r.nuvem=x.ok}catch(e){r.nuvem=false}
 r.hw=!!window.AFHW;
 return r;
}

const COR={ok:'#2fd48a',no:'#ff6b75',av:'#ffc66d'};
function linha(rot,estado,det){return el('div',{style:'display:flex;gap:8px;align-items:baseline;margin:3px 0'},el('b',{style:'color:'+COR[estado]+';min-width:14px'},estado==='ok'?'●':estado==='av'?'◐':'○'),el('span',{},el('b',{},rot+' '),el('small',{style:'color:#9ab1d0'},det)))}

function abrirVia(via,ip,porta){
 const msg=painel.querySelector('#afc-msg');
 msg.style.color='#9ab1d0';msg.textContent='Preparando leitura…';
 carregarHW().then(()=>{
  const h=document.getElementById('af-hardware-panel');
  const sr=h&&h.shadowRoot;
  if(!sr)throw new Error('Painel de hardware não foi criado.');
  if(via==='wifi'){const i=sr.querySelector('#ip'),p=sr.querySelector('#porta');if(i&&ip)i.value=ip;if(p&&porta)p.value=porta}
  sr.querySelector('#p').style.display='block';
  painel.style.display='none';
  const b=sr.querySelector('[data-v="'+via+'"]');
  if(!b)throw new Error('Via '+via+' indisponível no módulo.');
  b.click();
 }).catch(e=>{msg.style.color=COR.no;msg.textContent=e.message||String(e)});
}

async function montar(){
 const corpo=painel.querySelector('#afc-corpo');
 corpo.replaceChildren(el('small',{style:'color:#9ab1d0'},'Verificando cada trecho da rota…'));
 carregarHW().catch(()=>{});   // pré-carrega para manter o gesto do clique válido (USB/Bluetooth)
 const r=await testar();
 const via=(titulo,desc,ok,aviso,acao,extra)=>el('div',{style:'border:1px solid #254365;border-radius:10px;padding:9px;margin:7px 0'},
  el('b',{},titulo),el('small',{style:'display:block;color:#9ab1d0;margin:3px 0 6px;line-height:1.45'},desc),
  extra||'',
  ok?el('button',{style:BTN+';background:#1f7bff',onclick:acao},'Conectar'):el('small',{style:'color:'+COR.av},aviso));
 const ip=el('input',{value:'192.168.0.10',style:INP+';flex:1'}),pt=el('input',{value:'35000',style:INP+';width:80px'});
 corpo.replaceChildren(
  el('div',{style:'margin-bottom:6px'},
   el('b',{style:'color:#27c8ff'},'Rota: equipamento ⇄ navegador ⇄ agente ⇄ nuvem'),
   linha('Navegador',r.seguro?'ok':'no',r.seguro?'conexão segura (HTTPS)':'sem HTTPS: USB e Bluetooth ficam bloqueados'),
   linha('USB/Serial',r.serial?'ok':'av',r.serial?'suportado':'este navegador não tem Web Serial/USB (use o agente)'),
   linha('Bluetooth',r.ble?'ok':'av',r.ble?'suportado':'este navegador não tem Web Bluetooth (use o agente)'),
   linha('Agente local',r.agente?'ok':'av',r.agente?'ativo '+r.agente+' em 127.0.0.1:8090':'não encontrado neste aparelho'),
   linha('Nuvem (Worker)',r.nuvem?'ok':'no',r.nuvem?'respondendo':'sem resposta agora')),
  via('1 · USB / Serial','Arduino, ESP32, Raspberry Pi Pico e adaptadores OBD-II por cabo. O navegador pede para você escolher a porta.',r.serial&&r.seguro,'Indisponível aqui. Use o computador com Chrome/Edge ou a via API (agente).',()=>abrirVia('usb')),
  via('2 · Bluetooth','Módulos HC-05/HM-10, ESP32 BLE e OBD-II Bluetooth LE. O navegador lista os aparelhos próximos.',r.ble&&r.seguro,'Indisponível aqui. Use Chrome/Edge no Android ou computador, ou a via API (agente).',()=>abrirVia('bluetooth')),
  via('3 · Wi-Fi / Rede','Adaptador OBD-II Wi-Fi e placas na rede local. Navegador não abre TCP: esta via passa pelo agente local.',!!r.agente,'Requer o agente ativo (veja a via 4).',()=>abrirVia('wifi',ip.value.trim(),pt.value.trim()),el('div',{style:'display:flex;gap:6px;margin:0 0 7px'},ip,pt)),
  via('4 · API (agente local)','Para TV, celular ou navegador sem USB/Bluetooth: um programa no computador ligado à placa. Instale e execute:\n  pip install pyserial\n  python almafluxo_agente.py\nDepois toque em Verificar. A página fala com ele em 127.0.0.1:8090 e com a nuvem pelo Worker.',true,'',()=>montar(),null),
  el('small',{style:'color:#9ab1d0;display:block;margin-top:6px;line-height:1.45'},'Hoje a nuvem recebe do navegador o que você escolher enviar pelas rotas existentes. Não há ainda uma rota no Worker que receba leituras do equipamento automaticamente.')
 );
 corpo.querySelectorAll('button').forEach(b=>{if(b.textContent==='Conectar'&&b.parentElement.textContent.includes('4 · API'))b.textContent='Verificar de novo'});
}
const BTN='font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:8px;padding:8px 12px;cursor:pointer';
const INP='font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:8px;padding:7px 9px;min-width:0';

function iniciar(){
 const btn=el('button',{id:'af-conexao-btn',type:'button','aria-label':'Conectar equipamento',style:BTN+';position:fixed;right:12px;bottom:12px;z-index:2147483100;font-weight:700;background:#1f7bff;box-shadow:0 4px 18px #0007',onclick:()=>{const aberto=painel.style.display==='block';painel.style.display=aberto?'none':'block';if(!aberto)montar()}},'🔌 Conectar equipamento');
 painel=el('div',{id:'af-conexao-painel',style:'display:none;position:fixed;right:12px;bottom:60px;z-index:2147483100;width:min(420px,94vw);max-height:78vh;overflow:auto;padding:13px;background:#06122cf7;border:1px solid #27c8ff;border-radius:12px;color:#e8f1ff;font:13px system-ui,sans-serif;white-space:pre-line;box-shadow:0 8px 35px #0009'},
  el('div',{style:'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px'},el('b',{style:'font-size:14px;color:#27c8ff'},'Conectar equipamento'),el('button',{style:BTN+';padding:4px 9px',onclick:()=>painel.style.display='none','aria-label':'Fechar'},'✕')),
  el('div',{id:'afc-corpo'}),el('div',{id:'afc-msg',style:'margin-top:8px;font-size:12px'}));
 document.body.append(btn,painel);
}
if(document.body)iniciar();else addEventListener('DOMContentLoaded',iniciar);
})();
