(()=>{'use strict';const AG='http://127.0.0.1:8090',ESP='https://cdn.jsdelivr.net/npm/esptool-js@0.5.4/bundle.js';
const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
const filtrar=(l,alvo)=>(l||[]).filter(p=>p&&p.alvo===alvo&&p.arquivo&&/^[0-9a-f]{64}$/i.test(p.sha256||''));
async function baixar(p){const r=await fetch('/'+p.arquivo,{cache:'no-store'});if(!r.ok)throw new Error('pacote não encontrado no repositório');const b=await r.arrayBuffer();
 if(hex(await crypto.subtle.digest('SHA-256',b))!==p.sha256.toLowerCase())throw new Error('hash do pacote não confere: gravação cancelada');return new Uint8Array(b)}
window.AFGravador={filtrar,AG,
 async resumo(){try{const j=await fetch('https://almafluxo.uk/conversa/instalacao/distribuicao/pacotes.json',{cache:'no-store'}).then(r=>r.json()),com=new Set((j.pacotes||[]).filter(p=>filtrar([p],p.alvo).length).map(p=>p.alvo));return{com:[...com],sem:Object.keys(j.alvos||{}).filter(a=>!com.has(a))}}catch(e){return{com:[],sem:[]}}},
 async alvo(a){try{const j=await fetch('https://almafluxo.uk/conversa/instalacao/distribuicao/pacotes.json',{cache:'no-store'}).then(r=>r.json());return (j.alvos||{})[a]||null}catch(e){return null}},
 async pacotes(alvo){try{const j=await fetch('https://almafluxo.uk/conversa/instalacao/distribuicao/pacotes.json',{cache:'no-store'}).then(r=>r.json());return filtrar(j.pacotes,alvo)}catch(e){return[]}},
 // ESP32 direto do navegador por USB (Web Serial). Exige que a conexão atual seja a porta serial.
 async esp32(p,port,log,prog){if(!port)throw new Error('Conecte por USB antes (porta serial).');const d=await baixar(p);log('Pacote verificado ('+d.length+' bytes). Carregando gravador…');
  const m=await import(ESP),tr=new m.Transport(port,true),L=new m.ESPLoader({transport:tr,baudrate:115200,terminal:{clean(){},writeLine:log,write:log}});
  const chip=await L.main();log('Chip: '+chip);let s='';for(let i=0;i<d.length;i++)s+=String.fromCharCode(d[i]);
  await L.writeFlash({fileArray:[{data:s,address:parseInt(p.offset||'0x0',16)}],flashSize:'keep',flashMode:'keep',flashFreq:'keep',eraseAll:false,compress:true,reportProgress:(i,w,t)=>prog&&prog(Math.round(w/t*100))});
  await L.after();log('Gravação concluída e placa reiniciada.')},
 // Android / webOS / Pico: o agente local executa adb / ares-install / cópia UF2, conferindo o hash de novo
 async viaAgente(p,codigo,extra){const r=await fetch(AG+'/instalar',{method:'POST',headers:{'Content-Type':'application/json','X-Codigo':codigo},body:JSON.stringify({id:p.id,alvo:p.alvo,arquivo:p.arquivo,sha256:p.sha256,...extra})}).then(x=>x.json());if(!r.ok)throw new Error(r.erro||'falha no agente');return r.saida}}})();
