(()=>{'use strict';let CFG={};fetch('/distribuicao/pacotes.json',{cache:'no-store'}).then(r=>r.json()).then(j=>{CFG=j.comunicacao||{}}).catch(()=>{});const AG='http://127.0.0.1:8090',hx=n=>n.toString(16).toUpperCase().padStart(4,'0');
// VID:PID → [descrição, id da placa em /api/eletrica/placas, certeza]
const USB={'2341:0043':['Arduino Uno R3','uno','confirmada'],'2341:0001':['Arduino Uno','uno','confirmada'],'2A03:0043':['Arduino Uno','uno','confirmada'],'1A86:7523':['Conversor CH340 (Arduino clone/Nano/ESP)',null],'10C4:EA60':['Conversor CP210x (comum em ESP32/NodeMCU)','esp32','provável'],'0403:6001':['Conversor FTDI (Arduino/ELM327 USB)',null],'303A:1001':['ESP32 USB nativo (S3/C3)','esp32','confirmada'],'303A:0002':['ESP32-S2','esp32','confirmada'],'2E8A:0005':['Raspberry Pi Pico (MicroPython)',null,'parcial','pico'],'2E8A:0003':['Raspberry Pi RP2040 (BOOTSEL)',null,'parcial','pico']};
const NOME=[[/elm|obd|vgate|vlink/i,'Adaptador OBD-II (ELM327)','obd'],[/esp32/i,'ESP32','esp32'],[/arduino/i,'Arduino','uno'],[/raspberry|rpi/i,'Raspberry Pi','rpi4'],[/hc-0|jdy|bt0|hm-1/i,'Módulo Bluetooth serial (HC-05/HM-10)',null]];
const PORTAS={webos:'webOS (LG) → pacote .ipk',tizen:'Tizen (Samsung) → pacote .wgt',android:'Android/Android TV → pacote .apk',linux:'Linux/Raspberry (SSH)'};
// ---- parsers OBD-II (puros) ----
const pid=(r,h,n)=>{const s=String(r).replace(/\s/g,''),i=s.indexOf('41'+h.slice(2));if(i<0)return null;const m=s.slice(i+4,i+4+n*2).match(/../g);return m&&m.length===n?m.map(x=>parseInt(x,16)):null};
const dtc=r=>{const h=String(r).replace(/\s/g,''),i=h.indexOf('43');if(i<0)return[];return(h.slice(i+2).match(/.{4}/g)||[]).filter(x=>/^[0-9A-F]{4}$/i.test(x)&&x!=='0000').map(x=>{const n=parseInt(x[0],16);return'PCBU'[n>>2]+(n&3)+x.slice(1)})};
// ---- transportes: {cmd(texto,ms)→resposta, close()} ----
function acumulador(){let b='';return{add:s=>{b+=s},clr:()=>{b=''},get:()=>b}}
async function espera(a,ms){const f=Date.now()+ms;while(Date.now()<f&&!a.get().includes('>'))await new Promise(s=>setTimeout(s,40));return a.get().replace(/[\r\n>]+/g,' ').trim()}
async function viaSerial(baud){const p=await navigator.serial.requestPort(),i=p.getInfo();await p.open({baudRate:baud||38400});return{...await abreSerial(p),info:i,port:p}}
async function abreSerial(p){const e=new TextEncoder(),d=new TextDecoder(),w=p.writable.getWriter(),r=p.readable.getReader(),a=acumulador();let v=true;
 (async()=>{try{while(v){const x=await r.read();if(x.done)break;a.add(d.decode(x.value))}}catch(_){}})();
 return{cmd:async(c,ms=1500)=>{a.clr();await w.write(e.encode(c+'\r'));return espera(a,ms)},close:async()=>{v=false;try{await r.cancel();r.releaseLock();w.releaseLock();await p.close()}catch(_){}}}}
async function viaBLE(){const dev=await navigator.bluetooth.requestDevice({acceptAllDevices:true,optionalServices:(CFG.ble&&CFG.ble.servicos)||[0xFFF0,0xFFE0,0x18F0]});let N=null,W=null;
 try{const s=await dev.gatt.connect();for(const sv of await s.getPrimaryServices())for(const c of await sv.getCharacteristics()){if((c.properties.notify||c.properties.indicate)&&!N)N=c;if((c.properties.write||c.properties.writeWithoutResponse)&&!W)W=c}}catch(_){}
 const a=acumulador(),d=new TextDecoder(),e=new TextEncoder();
 if(N){await N.startNotifications();N.addEventListener('characteristicvaluechanged',x=>a.add(d.decode(x.target.value)))}
 return{nome:dev.name||'',cmd:W?async(c,ms=1500)=>{a.clr();const b=e.encode(c+'\r');for(let i=0;i<b.length;i+=20){const q=b.slice(i,i+20);W.writeValueWithoutResponse?await W.writeValueWithoutResponse(q):await W.writeValue(q)}return espera(a,ms)}:null,close:async()=>{try{dev.gatt.disconnect()}catch(_){}}}}
function viaAgente(ip,porta){return{cmd:async(c,ms=1500)=>{const r=await fetch(AG+'/tcp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ip,porta,cmd:c,t:ms})}).then(x=>x.json());if(!r.ok)throw new Error(r.erro||'falha TCP');return String(r.resp||'').replace(/[\r\n>]+/g,' ').trim()},close:async()=>{}}}
// ---- identificação ----
async function ehELM(t){for(const c of['ATZ','ATZ']){try{const r=await t.cmd(c,2500);if(/ELM|OBD|STN/i.test(r))return r}catch(_){}}return null}
async function identificar(t,ctx){const r={via:ctx.via,alvo:null,tipo:'placa',nome:'Dispositivo não identificado',placa:null,certeza:'—',sistema:'—',pacote:'—',detalhe:[]};
 if(ctx.usb){const k=hx(ctx.usb.usbVendorId||0)+':'+hx(ctx.usb.usbProductId||0),u=(CFG.usb||USB)[k];r.detalhe.push('USB '+k);if(u){r.nome=u[0];r.placa=u[1];r.certeza=u[2]||'parcial';r.alvo=u[3]||({uno:'avr',esp32:'esp32',pico:'pico'})[u[1]]||null}}
 if(ctx.nomeBLE){const n=NOME.find(x=>x[0].test(ctx.nomeBLE));r.detalhe.push('BLE "'+ctx.nomeBLE+'"');if(n){r.nome=n[1];if(n[2]!=='obd')r.placa=n[2];r.certeza='pelo nome'}else r.nome=ctx.nomeBLE}
 if(t&&t.cmd){const e=await ehELM(t);if(e){r.alvo=null;r.tipo='motor';r.nome='Motor via OBD-II ('+e.replace(/ATZ/,'').trim()+')';r.sistema='ECU do veículo (OBD-II)';r.certeza='confirmada';r.placa=null}}
 if(ctx.sonda){const s=ctx.sonda;r.sistema=s.sistema||r.sistema;r.alvo=({webOS:'webos',Tizen:'tizen',Android:'android',Linux:'linux'})[s.sistema]||r.alvo;r.pacote=s.pacote||r.pacote;r.nome=s.sistema?r.nome==='Dispositivo não identificado'?s.sistema:r.nome:r.nome;r.detalhe.push('portas '+(s.abertas||[]).map(x=>x.porta).join(','))}
 else if(r.tipo==='placa'&&r.placa)r.sistema='Firmware de microcontrolador (.hex/.bin/.uf2) — o sistema interno só é lido por SSH/Serial se a placa o expuser';
 return r}
async function lerOBD(t){const g=async h=>pid(await t.cmd(h,4000),h,h==='010C'?2:1);
 await t.cmd('ATE0');await t.cmd('ATSP0');const rpm=await g('010C'),tmp=await g('0105'),vel=await g('010D'),car=await g('0104'),mil=await g('0101'),cod=dtc(await t.cmd('03',4000));
 return{rpm:rpm?(rpm[0]*256+rpm[1])/4:null,temp:tmp?tmp[0]-40:null,vel:vel?vel[0]:null,carga:car?Math.round(car[0]*100/255):null,mil:mil?!!(mil[0]&0x80):null,dtc:cod}}
const AFHW={_t:{pid,dtc},identificar,lerOBD,cur:null,
 async conectar(via,ip,porta){let t=null,ctx={via};
  if(via==='usb'){if(!navigator.serial)throw new Error('Web Serial indisponível. Use Chrome/Edge (computador) ou o agente local.');
   const port=await navigator.serial.requestPort(),info=port.getInfo(),bs=(CFG.serial&&CFG.serial.bauds)||[38400,115200,9600];ctx.usb=info;let achou=false;
   for(const b of bs){try{await port.open({baudRate:b});const q=await abreSerial(port);if(await ehELM(q)){t={...q,port,info};achou=true;break}await q.close()}catch(_){try{await port.close()}catch(__){}}}
   if(!achou)t={port,info,cmd:null,close:async()=>{}};
  }else if(via==='bluetooth'){if(!navigator.bluetooth)throw new Error('Web Bluetooth indisponível (Chrome/Edge; não existe no iOS/Safari/Firefox).');t=await viaBLE();ctx.nomeBLE=t.nome}
  else{const E=CFG.elm327||{};ip=ip||E.ip_padrao||'192.168.0.10';porta=porta||E.porta_padrao||35000;t=viaAgente(ip,porta);ctx.ip=ip;try{const p=await fetch(AG+'/probe?ip='+encodeURIComponent(ip)).then(r=>r.json());ctx.sonda=p}catch(_){}}
  const id=await identificar(t,ctx).catch(e=>({via,tipo:'placa',nome:'Falha ao identificar: '+e.message,certeza:'—',sistema:'—',pacote:'—',detalhe:[]}));
  this.cur={t,id,ctx};this.aplicar(id);return this.cur},
 // integra às páginas SEM alterá-las: usa as funções globais que elas já expõem
 aplicar(id){try{if(id.placa&&typeof usar==='function'&&typeof PL!=='undefined'&&PL.length){const i=PL.findIndex(p=>p.id===id.placa);if(i>=0)usar(i)}}catch(_){}}};
window.AFHW=AFHW;
if(typeof document==='undefined')return;
const H=document.createElement('div');H.style.cssText='position:fixed;left:12px;bottom:12px;z-index:2147483000;font:13px system-ui';const S=H.attachShadow({mode:'open'});
S.innerHTML=`<style>button,input{font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:8px;padding:8px 10px;cursor:pointer}.f{background:#1f7bff;font-weight:700}#p{display:none;width:min(360px,92vw);max-height:70vh;overflow:auto;margin-bottom:8px;padding:12px;background:#06122cf2;border:1px solid #27c8ff;border-radius:12px;color:#e8f1ff}.r{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.o{color:#2fd48a}.x{color:#ff6b75}small{color:#8fa8c8;display:block}h3{margin:0 0 6px;font-size:14px;color:#27c8ff}</style>
<div id="p"><h3>Conectar placa / motor</h3><div class="r"><button data-v="usb">USB</button><button data-v="bluetooth">Bluetooth</button><button data-v="wifi">Wi-Fi</button><input id="ip" placeholder="IP (padrão OBD 192.168.0.10)" size="22"></div><div id="o"><small>Escolha a conexão. A leitura é feita neste computador/aparelho.</small></div></div><button class="f" id="b">⚡ Conectar</button>`;
const $=s=>S.querySelector(s),O=$('#o');let tm=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#b').onclick=()=>{const p=$('#p');p.style.display=p.style.display==='block'?'none':'block'};
S.querySelectorAll('[data-v]').forEach(b=>b.onclick=async()=>{clearInterval(tm);O.innerHTML='<small>Conectando…</small>';
 try{const c=await AFHW.conectar(b.dataset.v,$('#ip').value.trim()||null),i=c.id;
  O.innerHTML=`<b>${esc(i.nome)}</b><small>Tipo: ${i.tipo} · certeza: ${esc(i.certeza)}</small><small>Sistema: ${esc(i.sistema)}</small><small>Pacote: ${esc(i.pacote)} ${i.detalhe.length?'· '+esc(i.detalhe.join(' · ')):''}</small><div id="obd"></div><h3 style="margin-top:10px">Rota</h3><div id="rt"><small>Testando…</small></div>`;
  if(window.AFGravador)instalarUI(c,i);if(window.AFDiag)AFDiag.rota({via:c.ctx.via,id:i,ip:c.ctx.ip}).then(R=>{O.querySelector('#rt').innerHTML=R.map(x=>`<div class="${x.ok?'o':'x'}">${x.ok?'✔':'✖'} ${esc(x.n)} — ${esc(x.m)}${x.ok?'':'<small>'+esc(x.d||'')+'</small>'}</div>`).join('')});
  else O.querySelector('#rt').innerHTML='<small>core/diagnostico.js não carregado.</small>';
  if(i.tipo==='motor'){const tick=async()=>{try{const d=await AFHW.lerOBD(c.t);O.querySelector('#obd').innerHTML=`<div class="r"><span>RPM <b>${d.rpm??'—'}</b></span><span>Temp <b>${d.temp??'—'}°C</b></span><span>Vel <b>${d.vel??'—'} km/h</b></span><span>Carga <b>${d.carga??'—'}%</b></span></div><small>Luz MIL: ${d.mil==null?'—':d.mil?'ACESA':'apagada'} · Códigos: ${d.dtc.length?esc(d.dtc.join(', ')):'nenhum'}</small>`}catch(e){O.querySelector('#obd').innerHTML='<small class="x">Leitura OBD falhou: '+esc(e.message)+'</small>'}};tick();tm=setInterval(tick,(CFG.elm327&&CFG.elm327.intervalo_leitura_ms)||6000)}
 }catch(e){O.innerHTML='<div class="x">'+esc(e.message||e)+'</div>'}});
function instalarUI(c,i){const alvo=i.alvo||null,box=document.createElement('div');box.innerHTML='<h3 style="margin-top:10px">Instalar ALMAFLUXO</h3>';O.appendChild(box);if(window.AFGuia){const g=document.createElement('button');g.textContent='Guia passo a passo';g.onclick=()=>AFGuia.abrir(alvo||'outras');box.appendChild(g)}
 if(!alvo){box.insertAdjacentHTML('beforeend','<small>Sem caminho de instalação direta para este dispositivo.</small>');return}
 AFGravador.pacotes(alvo).then(L=>{if(!L.length)return AFGravador.alvo(alvo).then(a=>box.insertAdjacentHTML('beforeend','<small>Nenhum pacote publicado para "'+alvo+'".'+(a?' Requisitos: '+a.requisitos.join('; ')+'.':'')+'</small>'));
  L.forEach(p=>{const b=document.createElement('button');b.textContent='Instalar '+p.nome+' '+(p.versao||'');const lg=document.createElement('small');
   b.onclick=async()=>{if(!confirm('Isto vai gravar/instalar "'+p.nome+'" em: '+i.nome+'. Continuar?'))return;try{lg.textContent='Instalando…';
    if(alvo==='esp32'){const pt=c.t&&c.t.port;if(c.t.close)await c.t.close();await AFGravador.esp32(p,pt,m=>{lg.textContent=m},n=>{lg.textContent='Gravando '+n+'%'})}
    else{const cod=prompt('Código mostrado no terminal do agente local:');if(!cod)return;lg.textContent=await AFGravador.viaAgente(p,cod,{ip:c.ctx.ip||null})}}catch(e){lg.className='x';lg.textContent='Falhou: '+e.message}};
   box.appendChild(b);box.appendChild(lg)})})}
document.body.appendChild(H);})();
