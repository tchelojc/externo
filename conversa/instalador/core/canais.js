
(()=>{'use strict';

if(window.AFCanais)return;

const BASE_INSTALACAO = 'https://almafluxo.uk/conversa/instalacao/';
const URL_CANAIS = BASE_INSTALACAO + 'canais.json';
const CHAVE_ESTADO = 'almafluxo_instalador';

// Aceita caminhos internos e URLs absolutas do próprio ALMAFLUXO.
// Retorna somente o caminho, para compatibilidade com ponte-totem.js.
function normalizarRota(rota){
 try{
  if(typeof rota!=='string'||!rota.trim())return null;

  const u=new URL(rota,location.origin);

  if(u.origin!==location.origin)return null;
  if(!/^\/[\w./-]*$/.test(u.pathname))return null;
  if(u.pathname.startsWith('//'))return null;

  return u.pathname;
 }catch(e){
  return null;
 }
}

// Decide o fluxo de entrada no canal.
function decidir(c,ctx){
 if(c.login&&!ctx.logado){
  return{tipo:'login',rota:'/conversa/instalacao/'};
 }

 if(c.tipo!=='totem'&&!ctx.vista){
  return{
   tipo:'conversa',
   rota:'/conversa/',
   proximo:c.rota
  };
 }

 return{tipo:'ir',rota:c.rota};
}

const vizinho=(L,i,d)=>
 L.length
  ?L[((i<0?(d>0?-1:0):i)+d+L.length)%L.length]
  :null;

const logado=()=>{
 try{
  return !!JSON.parse(
   localStorage.getItem('almafluxo_usuario')||'null'
  );
 }catch(e){
  return false;
 }
};

const vista=()=>{
 try{
  return !!sessionStorage.getItem('af_conversa_vista');
 }catch(e){
  return false;
 }
};

window.AFCanais={decidir,vizinho};

if(typeof document==='undefined')return;

let L=[];
let cfg={};
let num='';
let tn=null;
let pn=null;
let etiquetaCanal=null;
let avisoElemento=null;

const K=CHAVE_ESTADO;

const cur=()=>{
 const atual=location.pathname.replace(/\/+$/,'')||'/';

 return L.findIndex(c=>{
  const rota=normalizarRota(c.rota);
  return rota&&(rota.replace(/\/+$/,'')||'/')===atual;
 });
};

const rotulo=()=>{
 const c=L[cur()];
 return c?c.numero+' · '+c.nome:'CH';
};

function aviso(t){
 if(!avisoElemento){
  avisoElemento=document.createElement('div');

  avisoElemento.style.cssText=
   'position:fixed;left:50%;bottom:8%;'+
   'transform:translateX(-50%);z-index:2147483200;'+
   'background:#06122cf2;color:#fff;'+
   'border:1px solid #27c8ff;border-radius:12px;'+
   'padding:12px 18px;font:16px system-ui';

  document.body.appendChild(avisoElemento);
 }

 avisoElemento.textContent=t;
 avisoElemento.style.display='block';

 clearTimeout(avisoElemento._t);

 avisoElemento._t=setTimeout(()=>{
  avisoElemento.style.display='none';
 },3500);
}

function atualizarRotulo(){
 if(etiquetaCanal){
  etiquetaCanal.textContent=rotulo();
 }

 document.querySelectorAll('[data-ctl="canal-nome"]')
  .forEach(e=>{
   const r=rotulo();
   if(e.textContent!==r)e.textContent=r;
  });
}

function ir(c){
 if(!c)return;

 const destino=normalizarRota(c.rota);

 if(!destino){
  aviso('Rota do canal inválida ou não permitida.');
  return;
 }

 // A decisão usa o estado atual da sessão.
 const d=decidir(c,{
  logado:logado(),
  vista:vista()
 });

 let rotaDestino=d.rota;

 if(d.tipo==='conversa'){
  rotaDestino='/conversa/';
 }else if(d.tipo==='login'){
  rotaDestino='/conversa/instalacao/';
 }else{
  rotaDestino=destino;
 }

 // Preserva o destino pendente para a ponte do totem.
 try{
  const s=JSON.parse(localStorage.getItem(K)||'{}');

  if(d.tipo==='conversa'){
   s.proximo=destino;
   s.ultimaAbertura=Date.now();

   const espera=Number(cfg.espera_conversa_s);
   s.esperaTotem=
    Number.isFinite(espera)&&espera>=1&&espera<=300
     ?espera
     :45;
  }

  if(d.tipo==='ir'&&logado()){
   s.ultimoCanal=destino;
  }

  localStorage.setItem(K,JSON.stringify(s));

 }catch(e){
  aviso('Não foi possível salvar o estado da navegação.');
  return;
 }

 if(d.tipo==='login'){
  aviso('O canal '+c.nome+' exige login no ALMAFLUXO. Abrindo o cadastro…');
 }

 setTimeout(()=>{
  location.href=rotaDestino;
 },d.tipo==='login'?1200:0);
}

const mover=d=>ir(vizinho(L,cur(),d));

const pelaNumero=n=>{
 const c=L.find(x=>String(x.numero)===String(n));

 if(c){
  ir(c);
 }else{
  aviso('Canal '+n+' não existe');
 }
};

function lista(){
 if(pn){
  pn.remove();
  pn=null;
  return;
 }

 pn=document.createElement('div');

 pn.style.cssText=
  'position:fixed;z-index:2147483180;top:64px;right:12px;'+
  'background:#06122cf5;border:1px solid #27c8ff;'+
  'border-radius:12px;padding:8px;max-height:70vh;'+
  'overflow:auto;min-width:220px;font:16px system-ui';

 L.forEach(c=>{
  const b=document.createElement('button');

  b.type='button';
  b.textContent=
   c.numero+' · '+c.nome+(c.login?' 🔒':'');

  b.dataset.numero=String(c.numero);

  b.style.cssText=
   'display:block;width:100%;text-align:left;'+
   'margin:3px 0;font:inherit;color:#e8f1ff;'+
   'background:#0a1d3a;border:1px solid #27c8ff;'+
   'border-radius:8px;padding:10px 12px;cursor:pointer';

  pn.appendChild(b);
 });

 pn.onclick=e=>{
  const b=e.target.closest('button');

  if(b&&pn.contains(b)){
   const n=b.dataset.numero;
   lista();
   pelaNumero(n);
  }
 };

 document.body.appendChild(pn);
}

Object.assign(window.AFCanais,{
 mover,
 lista,
 pelaNumero,
 rotulo
});

function flutuante(){
 const H=document.createElement('div');

 H.style.cssText=
  'position:fixed;z-index:2147483150;'+
  'display:flex;gap:4px;font:14px system-ui;opacity:.65;'+
  (cfg.posicao||'top:12px;right:12px');

 const b=(t,f,a)=>{
  const x=document.createElement('button');

  x.type='button';
  x.textContent=t;
  x.setAttribute('aria-label',a);

  x.style.cssText=
   'font:inherit;color:#e8f1ff;'+
   'background:#0a1d3acc;border:1px solid #27c8ff;'+
   'border-radius:8px;padding:7px 11px;cursor:pointer';

  x.onclick=f;

  return x;
 };

 etiquetaCanal=document.createElement('span');

 etiquetaCanal.textContent=rotulo();

 etiquetaCanal.style.cssText=
  'color:#e8f1ff;background:#0a1d3acc;'+
  'border:1px solid #27c8ff;border-radius:8px;'+
  'padding:7px 11px';

 H.append(
  b('‹ CH',()=>mover(-1),'Canal anterior'),
  etiquetaCanal,
  b('CH ›',()=>mover(1),'Próximo canal'),
  b('☰',lista,'Lista de canais')
 );

 document.body.appendChild(H);
}

// Controles de teclado e controle remoto.
addEventListener('keydown',e=>{
 if(/INPUT|TEXTAREA|SELECT/.test(
  (e.target&&e.target.tagName)||''
 ))return;

 const k=e.keyCode;
 const n=e.key;

 if(k===427||k===33||n==='ChannelUp'||n==='PageUp'){
  e.preventDefault();
  mover(1);

 }else if(k===428||k===34||n==='ChannelDown'||n==='PageDown'){
  e.preventDefault();
  mover(-1);

 }else if(/^[0-9]$/.test(n)){
  num+=n;

  aviso('Canal '+num);

  clearTimeout(tn);

  tn=setTimeout(()=>{
   pelaNumero(num);
   num='';
  },1500);
 }
});

// Carrega a lista de canais no local correto.
fetch(URL_CANAIS,{
 cache:'no-store',
 credentials:'same-origin'
})
.then(r=>{
 if(!r.ok)throw new Error('HTTP '+r.status);
 return r.json();
})
.then(j=>{
 if(!j||!Array.isArray(j.canais)){
  throw new Error('Estrutura de canais inválida');
 }

 cfg=j;

 L=j.canais.filter(c=>
  c&&c.ativo!==false&&
  c.numero!==undefined&&
  typeof c.nome==='string'&&
  typeof c.rota==='string'&&
  !!normalizarRota(c.rota)
 );

 if(!L.length)return;

 document.documentElement.classList.add('af-canais');

 if(!window.AF_CANAL_EMBUTIDO){
  flutuante();
 }

 atualizarRotulo();

 setInterval(atualizarRotulo,800);

})
.catch(e=>{
 console.warn('[AFCanais] Não foi possível carregar canais.json:',e);
});

})();
