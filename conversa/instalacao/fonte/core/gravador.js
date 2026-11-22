
(()=>{'use strict';

const AG='http://127.0.0.1:8090';
const BASE='https://almafluxo.uk/conversa/instalacao/';
const PACOTES_URL=BASE+'distribuicao/pacotes.json';
const ESP='https://cdn.jsdelivr.net/npm/esptool-js@0.5.4/bundle.js';

const hex=b=>[...new Uint8Array(b)]
 .map(x=>x.toString(16).padStart(2,'0'))
 .join('');

const hashValido=h=>typeof h==='string'&&/^[0-9a-f]{64}$/i.test(h);

const filtrar=(l,alvo)=>(Array.isArray(l)?l:[])
 .filter(p=>
  p&&
  p.alvo===alvo&&
  typeof p.arquivo==='string'&&
  p.arquivo.trim()&&
  hashValido(p.sha256)
 );

function arquivoURL(arquivo){
 if(typeof arquivo!=='string'||!arquivo.trim()){
  throw new Error('Caminho do pacote inválido.');
 }

 let u;

 try{
  u=new URL(arquivo,BASE);
 }catch(e){
  throw new Error('Endereço do pacote inválido.');
 }

 if(u.origin!==new URL(BASE).origin){
  throw new Error('Pacote fora do domínio autorizado.');
 }

 if(!u.pathname.startsWith('/conversa/instalacao/')){
  throw new Error('Pacote fora do diretório de instalação.');
 }

 return u;
}

async function obterPacotes(){
 const r=await fetch(PACOTES_URL,{
  cache:'no-store',
  credentials:'same-origin'
 });

 if(!r.ok){
  throw new Error('Não foi possível carregar pacotes.json (HTTP '+r.status+').');
 }

 const j=await r.json();

 if(!j||typeof j!=='object'){
  throw new Error('Estrutura de pacotes inválida.');
 }

 return j;
}

async function baixar(p){

 if(!p||!hashValido(p.sha256)){
  throw new Error('Pacote sem hash SHA-256 válido.');
 }

 if(!window.crypto||!crypto.subtle){
  throw new Error('SHA-256 indisponível neste navegador seguro.');
 }

 const url=arquivoURL(p.arquivo);

 const r=await fetch(url.href,{
  cache:'no-store',
  credentials:'same-origin'
 });

 if(!r.ok){
  throw new Error('Pacote não encontrado no repositório (HTTP '+r.status+').');
 }

 const b=await r.arrayBuffer();

 if(!b.byteLength){
  throw new Error('O pacote está vazio.');
 }

 const calculado=hex(
  await crypto.subtle.digest('SHA-256',b)
 );

 if(calculado!==p.sha256.toLowerCase()){
  throw new Error('Hash do pacote não confere: gravação cancelada.');
 }

 return new Uint8Array(b);
}

async function respostaAgente(url,opcoes){
 const r=await fetch(url,opcoes);

 let j;

 try{
  j=await r.json();
 }catch(e){
  throw new Error('O agente local retornou uma resposta inválida.');
 }

 if(!r.ok){
  throw new Error(
   j.erro||j.error||'Falha no agente local (HTTP '+r.status+').'
  );
 }

 return j;
}

window.AFGravador={

 filtrar,
 AG,

 async resumo(){
  try{
   const j=await obterPacotes();

   const pacotes=Array.isArray(j.pacotes)?j.pacotes:[];
   const alvos=j.alvos&&typeof j.alvos==='object'?j.alvos:{};

   const com=new Set(
    pacotes
     .filter(p=>p&&filtrar([p],p.alvo).length)
     .map(p=>p.alvo)
   );

   return{
    com:[...com],
    sem:Object.keys(alvos).filter(a=>!com.has(a))
   };

  }catch(e){
   return{
    com:[],
    sem:[],
    erro:e.message
   };
  }
 },

 async alvo(a){
  try{
   if(typeof a!=='string'||!a.trim())return null;

   const j=await obterPacotes();
   const alvos=j.alvos||{};

   return alvos[a]||null;

  }catch(e){
   return null;
  }
 },

 async pacotes(alvo){
  try{
   if(typeof alvo!=='string'||!alvo.trim())return [];

   const j=await obterPacotes();

   return filtrar(j.pacotes,alvo);

  }catch(e){
   return [];
  }
 },

 // ESP32 via USB / Web Serial.
 async esp32(p,port,log,prog){

  if(!port){
   throw new Error('Conecte a placa por USB antes de gravar.');
  }

  if(!navigator.serial){
   throw new Error('Web Serial não está disponível neste navegador.');
  }

  if(typeof log!=='function')log=()=>{};

  if(typeof prog!=='function')prog=()=>{};

  const d=await baixar(p);

  log('Pacote verificado ('+d.length+' bytes). Carregando gravador…');

  // import() dinâmico via Function: navegadores antigos não quebram ao ler o arquivo.
  const m=await (new Function('u','return import(u)'))(ESP);

  const tr=new m.Transport(port,true);

  const L=new m.ESPLoader({
   transport:tr,
   baudrate:115200,
   terminal:{
    clean(){},
    writeLine:log,
    write:log
   }
  });

  try{

   const chip=await L.main();

   log('Chip: '+chip);

   // Conversão binária para o formato esperado pelo esptool-js.
   let s='';
   const BLOCO=8192;

   for(let i=0;i<d.length;i+=BLOCO){
    const parte=d.subarray(i,Math.min(i+BLOCO,d.length));

    s+=String.fromCharCode(...parte);
   }

   let offset=0;

   if(typeof p.offset==='number'){
    offset=p.offset;
   }else if(typeof p.offset==='string'){
    offset=Number(p.offset);
   }

   if(!Number.isSafeInteger(offset)||offset<0){
    throw new Error('Endereço de gravação inválido.');
   }

   await L.writeFlash({
    fileArray:[{
     data:s,
     address:offset
    }],
    flashSize:'keep',
    flashMode:'keep',
    flashFreq:'keep',
    eraseAll:false,
    compress:true,

    reportProgress:(i,w,total)=>{
     if(total>0){
      prog(Math.max(0,Math.min(100,Math.round(w/total*100))));
     }
    }
   });

   await L.after();

   prog(100);
   log('Gravação concluída e placa reiniciada.');

   return{
    ok:true,
    chip,
    bytes:d.length
   };

  }catch(e){

   try{
    if(typeof L.disconnect==='function'){
     await L.disconnect();
    }
   }catch(_){}

   throw e;
  }
 },

 // Android / webOS / Raspberry Pi Pico:
 // o agente local executa a operação e deve conferir novamente o SHA-256.
 async viaAgente(p,codigo,extra){

  if(!p||!hashValido(p.sha256)){
   throw new Error('Pacote inválido ou sem SHA-256.');
  }

  if(!p.id||!p.alvo||!p.arquivo){
   throw new Error('Identificação incompleta do pacote.');
  }

  if(typeof codigo!=='string'||!codigo.trim()){
   throw new Error('Código de autorização não informado.');
  }

  // Confirma que o arquivo pertence à instalação.
  arquivoURL(p.arquivo);

  // Os campos essenciais são aplicados por último.
  // Assim, extra não consegue sobrescrevê-los.
  const dados=Object.assign(
   {},
   extra&&typeof extra==='object'?extra:{},
   {
    id:p.id,
    alvo:p.alvo,
    arquivo:p.arquivo,
    sha256:p.sha256.toLowerCase()
   }
  );

  const j=await respostaAgente(AG+'/instalar',{
   method:'POST',
   headers:{
    'Content-Type':'application/json',
    'X-Codigo':codigo
   },
   cache:'no-store',
   body:JSON.stringify(dados)
  });

  if(j.ok!==true){
   throw new Error(j.erro||j.error||'Falha na instalação pelo agente.');
  }

  return j.saida??j;
 }

};

})();
