
/* ============================================================
   ALMAFLUXO — HARDWARE CORE
   Versão 1.5.0
   Integração: USB / SERIAL / BLE / WIFI / OBD-II / INSTALADOR
   Dependências:
   estado.js, detector.js, gravador.js, guia.js, diagnostico.js
   ============================================================ */

(()=>{'use strict';

/* ------------------------------------------------------------
   1. CONFIGURAÇÃO
   ------------------------------------------------------------ */

const BASE='https://almafluxo.uk/conversa/instalacao/';
const PACOTES_URL=BASE+'distribuicao/pacotes.json';

let CFG={};
let configErro=null;

const AG_PADRAO='http://127.0.0.1:8090';

const ESPERAS={
  conexao:5000,
  serial:2500,
  obd:4000,
  agente:3500
};

const USB_PADRAO={
  '2341:0043':['Arduino Uno R3','uno','confirmada'],
  '2341:0001':['Arduino Uno','uno','confirmada'],
  '2A03:0043':['Arduino Uno','uno','confirmada'],
  '1A86:7523':['Conversor CH340 (Arduino clone/Nano/ESP)',null,'parcial'],
  '10C4:EA60':['Conversor CP210x (comum em ESP32/NodeMCU)','esp32','provável'],
  '0403:6001':['Conversor FTDI (Arduino/ELM327 USB)',null,'parcial'],
  '303A:1001':['ESP32 USB nativo (S3/C3)','esp32','confirmada'],
  '303A:0002':['ESP32-S2','esp32','confirmada'],
  '2E8A:0005':['Raspberry Pi Pico (MicroPython)',null,'parcial','pico'],
  '2E8A:0003':['Raspberry Pi RP2040 (BOOTSEL)',null,'parcial','pico']
};

const NOMES=[
  [/elm|obd|vgate|vlink/i,'Adaptador OBD-II (ELM327)','obd'],
  [/esp32/i,'ESP32','esp32'],
  [/arduino/i,'Arduino','uno'],
  [/raspberry|rpi/i,'Raspberry Pi','rpi4'],
  [/hc-0|jdy|bt0|hm-1/i,'Módulo Bluetooth serial (HC-05/HM-10)',null]
];

const SISTEMAS={
  webOS:{alvo:'webos',nome:'TV LG (webOS)'},
  Tizen:{alvo:'tizen',nome:'TV Samsung (Tizen)'},
  Android:{alvo:'android',nome:'Android / Android TV'},
  Linux:{alvo:'linux',nome:'Linux / Raspberry Pi'}
};

const hx=n=>Number(n||0).toString(16).toUpperCase().padStart(4,'0');

function mesclar(a,b){
  return Object.assign({},a||{},b||{});
}

function validarObjeto(o){
  return !!o&&typeof o==='object'&&!Array.isArray(o);
}

async function buscarJSON(url,ms=5000){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),ms);

  try{
    const r=await fetch(url,{
      cache:'no-store',
      signal:ctrl.signal
    });

    if(!r.ok)throw new Error('HTTP '+r.status+' ao consultar '+url);

    const j=await r.json();

    if(!validarObjeto(j))throw new Error('Resposta JSON inválida');

    return j;
  }finally{
    clearTimeout(timer);
  }
}

async function carregarConfig(){
  try{
    const j=await buscarJSON(PACOTES_URL,8000);

    if(!validarObjeto(j.comunicacao)){
      throw new Error('Configuração comunicacao ausente no pacotes.json');
    }

    CFG=j.comunicacao;
    configErro=null;
    return CFG;
  }catch(e){
    configErro=e;
    CFG={};
    console.warn('[AFHW] Configuração remota indisponível:',e.message);
    return CFG;
  }
}

const READY=carregarConfig();

function agenteURL(){
  const u=CFG.agente&&CFG.agente.url;
  return typeof u==='string'&&/^http:\/\/(127\.0\.0\.1|localhost):\d+$/i.test(u)
    ?u.replace(/\/+$/,'')
    :AG_PADRAO;
}

function usbTabela(){
  return mesclar(USB_PADRAO,CFG.usb);
}

function serialBauds(){
  const b=CFG.serial&&CFG.serial.bauds;
  return Array.isArray(b)&&b.length
    ?b.map(Number).filter(x=>Number.isFinite(x)&&x>0)
    :[38400,115200,9600];
}

function timeoutOBD(){
  return Math.max(1000,Math.min(
    8000,
    Number(CFG.elm327&&CFG.elm327.timeout_pid_ms)||ESPERAS.obd
  ));
}

function intervaloOBD(){
  return Math.max(2000,Math.min(
    30000,
    Number(CFG.elm327&&CFG.elm327.intervalo_leitura_ms)||6000
  ));
}

/* ------------------------------------------------------------
   2. COMUNICAÇÃO COM O AGENTE LOCAL
   ------------------------------------------------------------ */

async function agenteFetch(path,opts={},timeout){
  await READY;

  const ctrl=new AbortController();
  const ms=timeout||Number(CFG.agente&&CFG.agente.timeout_ms)||ESPERAS.agente;
  const timer=setTimeout(()=>ctrl.abort(),ms);

  try{
    const r=await fetch(agenteURL()+path,{
      ...opts,
      signal:ctrl.signal,
      cache:'no-store'
    });

    let j;

    try{
      j=await r.json();
    }catch(_){
      throw new Error('O agente respondeu com conteúdo inválido');
    }

    if(!r.ok||j.ok===false){
      throw new Error(j.erro||j.error||('Erro HTTP '+r.status));
    }

    return j;
  }catch(e){
    if(e.name==='AbortError'){
      throw new Error('Tempo esgotado ao comunicar com o agente local');
    }

    if(e instanceof TypeError){
      throw new Error('Não foi possível acessar o agente local. Verifique se ele está iniciado e se o navegador permite acesso à rede local.');
    }

    throw e;
  }finally{
    clearTimeout(timer);
  }
}

async function testarAgente(){
  return agenteFetch('/ping',{},ESPERAS.agente);
}

async function listarPortas(){
  return agenteFetch('/serial',{},ESPERAS.agente);
}

async function sondarRede(ip){
  if(!ipValido(ip))throw new Error('Informe um endereço IPv4 válido');

  return agenteFetch(
    '/probe?ip='+encodeURIComponent(ip),
    {},
    10000
  );
}

function ipValido(ip){
  if(typeof ip!=='string')return false;

  const p=ip.trim().split('.');

  if(p.length!==4)return false;

  if(!p.every(x=>/^\d{1,3}$/.test(x)&&Number(x)>=0&&Number(x)<=255)){
    return false;
  }

  const n=p.map(Number);

  return n[0]!==0&&
    n[0]!==127&&
    n[0]<224&&
    !(n[0]===169&&n[1]===254);
}

/* ------------------------------------------------------------
   3. PARSERS OBD-II
   ------------------------------------------------------------ */

function pid(r,h,n){
  const s=String(r||'').replace(/\s/g,'').toUpperCase();
  const chave='41'+String(h).slice(2).toUpperCase();
  const i=s.indexOf(chave);

  if(i<0)return null;

  const m=s.slice(i+4,i+4+n*2).match(/../g);

  if(!m||m.length!==n)return null;

  return m.map(x=>parseInt(x,16));
}

function dtc(r){
  const h=String(r||'').replace(/\s/g,'').toUpperCase();
  const i=h.indexOf('43');

  if(i<0)return [];

  return(h.slice(i+2).match(/.{4}/g)||[])
    .filter(x=>/^[0-9A-F]{4}$/.test(x)&&x!=='0000')
    .map(x=>{
      const n=parseInt(x[0],16);
      return'PCBU'[n>>2]+(n&3)+x.slice(1);
    });
}

/* ------------------------------------------------------------
   4. ACUMULADOR DE RESPOSTAS
   ------------------------------------------------------------ */

function acumulador(){
  let b='';

  return{
    add:s=>{b+=s},
    clr:()=>{b=''},
    get:()=>b
  };
}

async function espera(a,ms=1500){
  const fim=Date.now()+ms;

  while(Date.now()<fim){
    if(a.get().includes('>'))break;
    await new Promise(r=>setTimeout(r,35));
  }

  return a.get().replace(/[\r\n>]+/g,' ').trim();
}

/* ------------------------------------------------------------
   5. USB / SERIAL
   Não abre a porta automaticamente para placas comuns.
   O gravador recebe a porta ainda disponível.
   ------------------------------------------------------------ */

async function viaSerial(){
  if(!navigator.serial){
    throw new Error('Web Serial indisponível. Utilize Chrome ou Edge em um computador compatível.');
  }

  const port=await navigator.serial.requestPort();
  const info=port.getInfo();

  const id={
    vid:hx(info.usbVendorId),
    pid:hx(info.usbProductId),
    chave:hx(info.usbVendorId)+':'+hx(info.usbProductId)
  };

  return{
    via:'usb',
    port,
    info,
    usb:id,
    aberto:false,
    cmd:null,

    close:async function(){
      if(this.aberto){
        try{await port.close()}catch(_){}
        this.aberto=false;
      }
    }
  };
}

/*
  A serial só será aberta para uma operação que realmente precise
  de comunicação serial. A gravação ESP32 recebe a porta fechada.
*/

async function abrirSerial(t,baud){
  const p=t.port;

  if(!p)throw new Error('Porta USB não disponível');

  if(p.readable||p.writable){
    throw new Error('A porta serial já está sendo utilizada');
  }

  await p.open({baudRate:baud||38400});

  const encoder=new TextEncoder();
  const decoder=new TextDecoder();
  const acc=acumulador();

  let ativo=true;
  let reader=null;
  let writer=null;

  try{
    reader=p.readable.getReader();
    writer=p.writable.getWriter();
  }catch(e){
    try{await p.close()}catch(_){}
    throw e;
  }

  const leitura=(async()=>{
    try{
      while(ativo){
        const x=await reader.read();

        if(x.done)break;

        if(x.value)acc.add(decoder.decode(x.value));
      }
    }catch(_){}
  })();

  const conexao={
    cmd:async(c,ms=1500)=>{
      if(!ativo)throw new Error('Conexão serial encerrada');

      acc.clr();
      await writer.write(encoder.encode(String(c)+'\r'));

      return espera(acc,ms);
    },

    close:async()=>{
      ativo=false;

      try{await reader.cancel()}catch(_){}
      try{reader.releaseLock()}catch(_){}
      try{writer.releaseLock()}catch(_){}
      try{await p.close()}catch(_){}

      await leitura.catch(()=>{});

      t.aberto=false;
    }
  };

  t.aberto=true;
  t.cmd=conexao.cmd;
  t.serial=conexao;

  return conexao;
}

/* ------------------------------------------------------------
   6. BLUETOOTH LOW ENERGY
   ------------------------------------------------------------ */

function bytesBLE(valor){
  const v=valor.target.value;

  return new Uint8Array(
    v.buffer,
    v.byteOffset,
    v.byteLength
  );
}

async function viaBLE(){
  if(!navigator.bluetooth){
    throw new Error('Web Bluetooth indisponível neste navegador. Utilize Chrome ou Edge compatível.');
  }

  const servicos=Array.isArray(CFG.ble&&CFG.ble.servicos)
    ?CFG.ble.servicos
    :[0xFFF0,0xFFE0,0x18F0];

  const dev=await navigator.bluetooth.requestDevice({
    acceptAllDevices:true,
    optionalServices:servicos
  });

  let server=null;
  let leitura=null;
  let escrita=null;
  let listener=null;

  try{
    server=await dev.gatt.connect();

    const servicosEncontrados=await server.getPrimaryServices();

    for(const s of servicosEncontrados){
      const chars=await s.getCharacteristics();

      const w=chars.find(c=>
        c.properties.write||c.properties.writeWithoutResponse
      );

      const n=chars.find(c=>
        c.properties.notify||c.properties.indicate
      );

      if(w&&n){
        escrita=w;
        leitura=n;
        break;
      }

      if(w&&!escrita)escrita=w;
      if(n&&!leitura)leitura=n;
    }

    if(!escrita){
      throw new Error('O dispositivo Bluetooth não disponibilizou característica de escrita');
    }

    if(!leitura){
      throw new Error('Não foi encontrada característica Bluetooth para receber respostas');
    }

    const acc=acumulador();
    const decoder=new TextDecoder();
    const encoder=new TextEncoder();

    listener=e=>{
      try{acc.add(decoder.decode(bytesBLE(e)))}catch(_){}
    };

    await leitura.startNotifications();
    leitura.addEventListener('characteristicvaluechanged',listener);

    const chunk=Math.max(
      1,
      Math.min(180,Number(CFG.ble&&CFG.ble.chunk_bytes)||20)
    );

    return{
      via:'bluetooth',
      nome:dev.name||'Dispositivo Bluetooth',
      device:dev,
      server,
      leitura,
      escrita,

      cmd:async(c,ms=1500)=>{
        if(!dev.gatt.connected){
          throw new Error('Bluetooth desconectado');
        }

        acc.clr();

        const dados=encoder.encode(String(c)+'\r');

        for(let i=0;i<dados.length;i+=chunk){
          const parte=dados.slice(i,i+chunk);

          if(escrita.writeValueWithoutResponse){
            await escrita.writeValueWithoutResponse(parte);
          }else{
            await escrita.writeValue(parte);
          }
        }

        return espera(acc,ms);
      },

      close:async()=>{
        try{
          if(listener&&leitura){
            leitura.removeEventListener('characteristicvaluechanged',listener);
          }

          if(dev.gatt.connected)dev.gatt.disconnect();
        }catch(_){}
      }
    };

  }catch(e){
    try{
      if(dev.gatt.connected)dev.gatt.disconnect();
    }catch(_){}

    throw e;
  }
}

/* ------------------------------------------------------------
   7. WIFI / TCP PELO AGENTE LOCAL
   ------------------------------------------------------------ */

function viaAgente(ip,porta){
  const p=Number(porta||35000);

  if(!ipValido(ip))throw new Error('IP inválido');

  if(!Number.isInteger(p)||p<1||p>65535){
    throw new Error('Porta de rede inválida');
  }

  return{
    via:'wifi',
    ip,
    porta:p,

    cmd:async(c,ms=1500)=>{
      const r=await agenteFetch('/tcp',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          ip,
          porta:p,
          cmd:String(c),
          t:Math.min(8000,Math.max(500,Number(ms)||1500))
        })
      },Math.min(10000,Number(ms)+3000));

      if(r.ok!==true){
        throw new Error(r.erro||'Falha na comunicação TCP');
      }

      return String(r.resp||'').replace(/[\r\n>]+/g,' ').trim();
    },

    close:async()=>{}
  };
}

/* ------------------------------------------------------------
   8. IDENTIFICAÇÃO DO HARDWARE
   ------------------------------------------------------------ */

function alvoPorPlaca(placa,alvoExtra){
  if(alvoExtra)return alvoExtra;

  return({
    uno:'avr',
    esp32:'esp32',
    pico:'pico',
    rpi4:'linux'
  })[placa]||null;
}

function alvoPorSistema(sistema){
  const s=SISTEMAS[sistema];
  return s?s.alvo:null;
}

async function ehELM(t){
  if(!t||typeof t.cmd!=='function')return null;

  for(const comando of ['ATZ','ATI']){
    try{
      const r=await t.cmd(comando,2500);

      if(/ELM|OBD|STN|V-LINK/i.test(r))return r;
    }catch(_){}
  }

  return null;
}

async function identificar(t,ctx={}){
  await READY;

  const r={
    via:ctx.via||'desconhecida',
    tipo:'placa',
    nome:'Dispositivo não identificado',
    alvo:null,
    placa:null,
    certeza:'não identificada',
    sistema:'—',
    pacote:'—',
    detalhe:[]
  };

  /* USB */

  if(ctx.usb){
    const k=ctx.usb.chave||
      hx(ctx.usb.usbVendorId)+':'+hx(ctx.usb.usbProductId);

    const u=usbTabela()[k];

    r.detalhe.push('USB '+k);

    if(u){
      r.nome=u[0];
      r.placa=u[1]||null;
      r.certeza=u[2]||'parcial';
      r.alvo=alvoPorPlaca(r.placa,u[3]);

      if(r.alvo==='avr')r.sistema='Firmware AVR';
      if(r.alvo==='esp32')r.sistema='Firmware ESP32';
      if(r.alvo==='pico')r.sistema='Firmware UF2';
    }
  }

  /* Bluetooth */

  if(ctx.nomeBLE){
    const n=NOMES.find(x=>x[0].test(ctx.nomeBLE));

    r.detalhe.push('BLE "'+ctx.nomeBLE+'"');

    if(n){
      r.nome=n[1];

      if(n[2]==='obd'){
        r.placa=null;
      }else{
        r.placa=n[2];
        r.alvo=alvoPorPlaca(n[2]);
      }

      r.certeza='identificado pelo nome BLE';
    }else{
      r.nome=ctx.nomeBLE;
      r.certeza='nome anunciado pelo dispositivo';
    }
  }

  /* OBD-II: somente quando o transporte foi selecionado
     para uma conexão de rede ou Bluetooth. */

  if(t&&t.cmd&&(ctx.via==='wifi'||ctx.via==='bluetooth')){
    const e=await ehELM(t);

    if(e){
      r.tipo='motor';
      r.nome='Motor via OBD-II ('+e.replace(/ATZ|ATI/g,'').trim()+')';
      r.sistema='ECU do veículo (OBD-II)';
      r.certeza='confirmada por resposta ELM/OBD';
      r.placa=null;
      r.alvo=null;
      r.pacote='Diagnóstico OBD-II';
    }
  }

  /* Rede / TV / computador */

  if(ctx.sonda&&ctx.sonda.ok){
    const s=ctx.sonda;

    if(s.sistema){
      r.sistema=s.sistema;
      r.alvo=alvoPorSistema(s.sistema);
      r.pacote=s.pacote||'—';

      if(r.nome==='Dispositivo não identificado'){
        r.nome=SISTEMAS[s.sistema]
          ?SISTEMAS[s.sistema].nome
          :s.sistema;
      }

      r.certeza='serviço identificado na rede';
    }

    r.detalhe.push(
      'Portas: '+(s.abertas||[])
        .map(x=>x.porta+'/'+x.servico)
        .join(', ')
    );
  }

  if(r.tipo==='placa'&&!r.alvo&&!ctx.sonda){
    r.detalhe.push('Identificação física ainda inconclusiva');
  }

  return r;
}

/* ------------------------------------------------------------
   9. LEITURA OBD-II
   ------------------------------------------------------------ */

async function lerOBD(t){
  if(!t||typeof t.cmd!=='function'){
    throw new Error('Nenhuma conexão OBD disponível');
  }

  const timeout=timeoutOBD();

  const g=async(h,n=1)=>{
    return pid(await t.cmd(h,timeout),h,n);
  };

  const init=Array.isArray(CFG.elm327&&CFG.elm327.init)
    ?CFG.elm327.init
    :['ATE0','ATSP0'];

  for(const c of init){
    await t.cmd(c,2000);
  }

  const rpm=await g('010C',2);
  const tmp=await g('0105');
  const vel=await g('010D');
  const car=await g('0104');
  const mil=await g('0101',4);
  const cod=dtc(await t.cmd('03',timeout));

  return{
    rpm:rpm?(rpm[0]*256+rpm[1])/4:null,
    temp:tmp?tmp[0]-40:null,
    vel:vel?vel[0]:null,
    carga:car?Math.round(car[0]*100/255):null,
    mil:mil?!!(mil[0]&0x80):null,
    dtc:cod
  };
}

/* ------------------------------------------------------------
   10. GERENCIAMENTO DE CONEXÕES
   ------------------------------------------------------------ */

let conexaoAtual=null;
let conexaoID=0;

async function encerrarAtual(){
  const anterior=conexaoAtual;

  conexaoAtual=null;

  if(!anterior)return;

  try{
    if(anterior.t&&typeof anterior.t.close==='function'){
      await anterior.t.close();
    }
  }catch(e){
    console.warn('[AFHW] Erro ao encerrar conexão:',e);
  }
}

function aplicar(id){
  try{
    if(
      id&&id.placa&&
      typeof usar==='function'&&
      typeof PL!=='undefined'&&
      PL.length
    ){
      const i=PL.findIndex(p=>p.id===id.placa);

      if(i>=0)usar(i);
    }
  }catch(e){
    console.warn('[AFHW] Integração com página externa:',e);
  }
}

/* ------------------------------------------------------------
   11. API PÚBLICA AFHW
   ------------------------------------------------------------ */

const AFHW={
  versao:'1.5.0',

  _t:{pid,dtc},

  cur:null,

  ready:READY,

  config:()=>CFG,

  erroConfig:()=>configErro,

  agente:{
    ping:testarAgente,
    portas:listarPortas,
    probe:sondarRede
  },

  async identificar(t,ctx){
    return identificar(t,ctx);
  },

  async conectar(via,ip,porta){
    await READY;

    const idConexao=++conexaoID;

    await encerrarAtual();

    let t=null;
    const ctx={via};

    try{
      if(via==='usb'){
        t=await viaSerial();
        ctx.usb=t.usb;

      }else if(via==='bluetooth'){
        t=await viaBLE();
        ctx.nomeBLE=t.nome;

      }else if(via==='wifi'){
        const E=CFG.elm327||{};

        ip=String(ip||E.ip_padrao||'192.168.0.10').trim();
        porta=Number(porta||E.porta_padrao||35000);

        t=viaAgente(ip,porta);

        ctx.ip=ip;
        ctx.porta=porta;

        try{
          ctx.sonda=await sondarRede(ip);
        }catch(e){
          ctx.erroSonda=e.message;
          console.warn('[AFHW] Sondagem de rede:',e.message);
        }

      }else{
        throw new Error('Tipo de conexão desconhecido: '+via);
      }

      const id=await identificar(t,ctx);

      if(idConexao!==conexaoID){
        if(t&&t.close)await t.close();
        throw new Error('A conexão foi substituída por outra solicitação');
      }

      const atual={
        t,
        id,
        ctx,
        conectadoEm:new Date().toISOString()
      };

      conexaoAtual=atual;
      this.cur=atual;

      aplicar(id);

      return atual;

    }catch(e){
      if(t&&t.close){
        try{await t.close()}catch(_){}
      }

      if(idConexao===conexaoID){
        conexaoAtual=null;
        this.cur=null;
      }

      throw e;
    }
  },

  async desconectar(){
    ++conexaoID;
    await encerrarAtual();
    this.cur=null;
    return true;
  },

  aplicar,

  async lerOBD(t){
    return lerOBD(t||(
      this.cur&&this.cur.t
    ));
  }
};

window.AFHW=AFHW;

/* ------------------------------------------------------------
   12. INTERFACE VISUAL
   ------------------------------------------------------------ */

if(typeof document==='undefined')return;

if(document.getElementById('af-hardware-panel'))return;

const H=document.createElement('div');
H.id='af-hardware-panel';

H.style.cssText=[
  'position:fixed',
  'left:12px',
  'bottom:12px',
  'z-index:2147483000',
  'font:13px system-ui,sans-serif'
].join(';');

const S=H.attachShadow({mode:'open'});

S.innerHTML=`
<style>
*{box-sizing:border-box}
button,input{
 font:inherit;
 color:#e8f1ff;
 background:#0a1d3a;
 border:1px solid #27c8ff;
 border-radius:8px;
 padding:8px 10px
}
button{cursor:pointer}
button:disabled{opacity:.45;cursor:not-allowed}
button:hover{background:#12325b}
.f{background:#1f7bff;font-weight:700}
#p{
 display:none;
 width:min(390px,92vw);
 max-height:75vh;
 overflow:auto;
 margin-bottom:8px;
 padding:13px;
 background:#06122cf5;
 border:1px solid #27c8ff;
 border-radius:12px;
 color:#e8f1ff;
 box-shadow:0 8px 35px #0008
}
.r{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.o{color:#2fd48a}
.x{color:#ff6b75}
.warn{color:#ffc66d}
small{color:#9ab1d0;display:block;line-height:1.5}
h3{margin:0 0 8px;font-size:14px;color:#27c8ff}
hr{border:0;border-top:1px solid #254365;margin:10px 0}
#obd{
 display:grid;
 grid-template-columns:1fr 1fr;
 gap:7px;
 margin:9px 0
}
.metric{
 padding:7px;
 background:#102746;
 border-radius:7px
}
.metric b{display:block;font-size:16px;margin-top:3px}
#rt{margin-top:7px}
#status{margin-top:8px}
.full{width:100%}
</style>

<div id="p">
 <h3>Conectar equipamento</h3>

 <div class="r">
  <button data-v="usb">USB / Serial</button>
  <button data-v="bluetooth">Bluetooth</button>
  <button data-v="wifi">Wi-Fi / Rede</button>
 </div>

 <div class="r">
  <input id="ip" placeholder="IP do equipamento" value="192.168.0.10" style="flex:1;min-width:150px">
  <input id="porta" placeholder="Porta" value="35000" style="width:82px">
 </div>

 <div id="o">
  <small>Escolha o tipo de conexão para começar.</small>
 </div>

 <div id="status"></div>
</div>

<button class="f" id="b">⚡ Conectar</button>
`;

const $=s=>S.querySelector(s);
const O=$('#o');
const STATUS=$('#status');

let tm=null;
let tickID=0;

function escapar(s){
  return String(s??'').replace(/[&<>"']/g,c=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  })[c]);
}

function mensagem(msg,tipo=''){
  STATUS.className=tipo;
  STATUS.textContent=msg;
}

function pararLeitura(){
  if(tm){
    clearInterval(tm);
    tm=null;
  }

  ++tickID;
}

function renderIdentificacao(i){
  const box=document.createElement('div');

  const nome=document.createElement('b');
  nome.textContent=i.nome||'Dispositivo não identificado';
  box.appendChild(nome);

  const dados=[
    'Tipo: '+(i.tipo||'—'),
    'Certeza: '+(i.certeza||'—'),
    'Sistema: '+(i.sistema||'—'),
    'Alvo: '+(i.alvo||'sem instalador')
  ];

  dados.forEach(x=>{
    const sm=document.createElement('small');
    sm.textContent=x;
    box.appendChild(sm);
  });

  if(i.detalhe&&i.detalhe.length){
    const sm=document.createElement('small');
    sm.textContent=i.detalhe.join(' · ');
    box.appendChild(sm);
  }

  return box;
}

function renderRota(resultado){
  const box=document.createElement('div');

  if(!Array.isArray(resultado)){
    box.textContent='Diagnóstico indisponível.';
    return box;
  }

  resultado.forEach(x=>{
    const linha=document.createElement('div');
    linha.className=x.ok?'o':'x';
    linha.style.margin='5px 0';

    linha.textContent=(x.ok?'✔ ':'✖ ')+
      (x.n||'Etapa')+' — '+(x.m||'');

    box.appendChild(linha);

    if(!x.ok&&x.d){
      const sm=document.createElement('small');
      sm.textContent=x.d;
      box.appendChild(sm);
    }
  });

  return box;
}

/* ------------------------------------------------------------
   13. LEITURA DO MOTOR
   ------------------------------------------------------------ */

async function atualizarOBD(c,box,meuID){
  if(meuID!==tickID)return;

  try{
    const d=await AFHW.lerOBD(c.t);

    if(meuID!==tickID)return;

    box.innerHTML=`
      <div class="metric">RPM<b>${d.rpm??'—'}</b></div>
      <div class="metric">Temperatura<b>${d.temp==null?'—':d.temp+' °C'}</b></div>
      <div class="metric">Velocidade<b>${d.vel==null?'—':d.vel+' km/h'}</b></div>
      <div class="metric">Carga<b>${d.carga==null?'—':d.carga+'%'}</b></div>
    `;

    const sm=document.createElement('small');

    sm.textContent='Luz MIL: '+
      (d.mil==null?'não disponível':d.mil?'ACESА':'apagada')+
      ' · Códigos: '+
      (d.dtc.length?d.dtc.join(', '):'nenhum código informado');

    box.appendChild(sm);

  }catch(e){
    if(meuID!==tickID)return;

    box.textContent='Leitura OBD falhou: '+e.message;
    box.className='x';
  }
}

function iniciarOBD(c,box){
  pararLeitura();

  const meuID=tickID;

  atualizarOBD(c,box,meuID);

  tm=setInterval(
    ()=>atualizarOBD(c,box,meuID),
    intervaloOBD()
  );
}

/* ------------------------------------------------------------
   14. INSTALAÇÃO DE PACOTES
   ------------------------------------------------------------ */

async function instalarUI(c,i){
  const box=document.createElement('div');

  const titulo=document.createElement('h3');
  titulo.style.marginTop='12px';
  titulo.textContent='Instalar ALMAFLUXO';
  box.appendChild(titulo);

  O.appendChild(box);

  const alvo=i.alvo;

  if(window.AFGuia){
    const guia=document.createElement('button');
    guia.textContent='Guia passo a passo';
    guia.onclick=()=>{
      AFGuia.abrir(alvo||'outras');
    };
    box.appendChild(guia);
  }

  if(!alvo){
    const sm=document.createElement('small');
    sm.textContent='Este equipamento foi identificado, mas não possui um alvo de instalação associado.';
    box.appendChild(sm);
    return;
  }

  if(!window.AFGravador){
    const sm=document.createElement('small');
    sm.textContent='O módulo gravador.js não está carregado.';
    box.appendChild(sm);
    return;
  }

  const carregando=document.createElement('small');
  carregando.textContent='Consultando pacotes publicados...';
  box.appendChild(carregando);

  try{
    const lista=await AFGravador.pacotes(alvo);

    carregando.remove();

    if(!Array.isArray(lista)||!lista.length){
      const sm=document.createElement('small');
      sm.className='warn';
      sm.textContent='Nenhum pacote publicado para o alvo "'+alvo+'".';
      box.appendChild(sm);

      try{
        const a=await AFGravador.alvo(alvo);

        if(a&&Array.isArray(a.requisitos)){
          const req=document.createElement('small');
          req.textContent='Requisitos: '+a.requisitos.join('; ');
          box.appendChild(req);
        }
      }catch(_){}

      return;
    }

    lista.forEach(p=>{
      const b=document.createElement('button');
      b.style.margin='5px 4px 5px 0';
      b.textContent='Instalar '+(p.nome||p.id||alvo)+' '+(p.versao||'');

      const lg=document.createElement('small');

      b.onclick=async()=>{
        if(!confirm(
          'A operação irá gravar ou instalar "'+
          (p.nome||p.id||alvo)+
          '" no equipamento "'+i.nome+'".\n\nDeseja continuar?'
        ))return;

        b.disabled=true;
        lg.className='';
        lg.textContent='Preparando instalação...';

        try{
          if(alvo==='esp32'){
            const pt=c.t&&c.t.port;

            if(!pt)throw new Error('Porta USB do ESP32 não está disponível');

            if(pt.readable||pt.writable){
              throw new Error('A porta serial está ocupada. Desconecte e conecte novamente o equipamento.');
            }

            await AFGravador.esp32(
              p,
              pt,
              m=>{lg.textContent=String(m)},
              n=>{lg.textContent='Gravando '+n+'%'}
            );

          }else{
            const cod=prompt(
              'Digite o código de instalação exibido no terminal do agente local:'
            );

            if(!cod){
              lg.textContent='Instalação cancelada.';
              return;
            }

            const resultado=await AFGravador.viaAgente(
              p,
              cod.trim(),
              {ip:c.ctx.ip||null}
            );

            lg.textContent=String(resultado||'Operação concluída.');
          }

          lg.className='o';

        }catch(e){
          lg.className='x';
          lg.textContent='Falha na instalação: '+e.message;

        }finally{
          b.disabled=false;
        }
      };

      box.appendChild(b);
      box.appendChild(lg);
    });

  }catch(e){
    carregando.className='x';
    carregando.textContent='Erro ao consultar pacotes: '+e.message;
  }
}

/* ------------------------------------------------------------
   15. DIAGNÓSTICO E APRESENTAÇÃO DA CONEXÃO
   ------------------------------------------------------------ */

async function apresentar(c){
  O.replaceChildren();

  O.appendChild(renderIdentificacao(c.id));

  const obd=document.createElement('div');
  obd.id='obd';
  O.appendChild(obd);

  if(c.id.tipo==='motor'){
    iniciarOBD(c,obd);
  }

  const hr=document.createElement('hr');
  O.appendChild(hr);

  const h=document.createElement('h3');
  h.textContent='Diagnóstico de conexão';
  O.appendChild(h);

  const rota=document.createElement('div');
  rota.id='rt';
  rota.textContent='Verificando...';
  O.appendChild(rota);

  if(window.AFDiag&&typeof AFDiag.rota==='function'){
    try{
      const R=await AFDiag.rota({
        via:c.ctx.via,
        id:c.id,
        ip:c.ctx.ip
      });

      rota.replaceWith(renderRota(R));

    }catch(e){
      rota.textContent='Diagnóstico falhou: '+e.message;
    }
  }else{
    rota.textContent='Módulo diagnostico.js não carregado.';
  }

  if(window.AFGravador){
    await instalarUI(c,c.id);
  }

  const desconectar=document.createElement('button');
  desconectar.style.marginTop='10px';
  desconectar.textContent='Desconectar equipamento';

  desconectar.onclick=async()=>{
    pararLeitura();
    await AFHW.desconectar();

    O.replaceChildren();

    const sm=document.createElement('small');
    sm.textContent='Equipamento desconectado.';
    O.appendChild(sm);

    mensagem('Conexão encerrada.');
  };

  O.appendChild(desconectar);

  mensagem('Equipamento conectado.','o');
}

/* ------------------------------------------------------------
   16. CONTROLES PRINCIPAIS
   ------------------------------------------------------------ */

$('#b').onclick=()=>{
  const p=$('#p');

  p.style.display=p.style.display==='block'
    ?'none'
    :'block';
};

S.querySelectorAll('[data-v]').forEach(b=>{
  b.onclick=async()=>{
    pararLeitura();

    S.querySelectorAll('[data-v]').forEach(x=>x.disabled=true);

    O.replaceChildren();

    const carregando=document.createElement('small');
    carregando.textContent='Conectando e identificando equipamento...';
    O.appendChild(carregando);

    mensagem('Estabelecendo conexão...');

    try{
      await READY;

      const via=b.dataset.v;

      const ip=$('#ip').value.trim()||null;
      const porta=Number($('#porta').value)||null;

      const c=await AFHW.conectar(via,ip,porta);

      await apresentar(c);

    }catch(e){
      O.replaceChildren();

      const erro=document.createElement('div');
      erro.className='x';
      erro.textContent=e.message||String(e);

      O.appendChild(erro);

      mensagem('Não foi possível conectar.','x');

    }finally{
      S.querySelectorAll('[data-v]').forEach(x=>x.disabled=false);
    }
  };
});

/* ------------------------------------------------------------
   17. INICIALIZAÇÃO
   ------------------------------------------------------------ */

READY.then(()=>{
  const E=CFG.elm327||{};

  if(E.ip_padrao)$('#ip').value=E.ip_padrao;
  if(E.porta_padrao)$('#porta').value=E.porta_padrao;

  console.info('[AFHW] Hardware Core '+AFHW.versao+' inicializado.');
}).catch(e=>{
  console.warn('[AFHW] Inicialização com configuração padrão:',e);
});

document.body.appendChild(H);

})();
