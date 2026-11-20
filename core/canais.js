(()=>{'use strict';if(window.AFCanais)return;
// decide o que acontece ao trocar de canal: login → conversa obrigatória (1x por sessão) → ir
function decidir(c,ctx){if(c.login&&!ctx.logado)return{tipo:'login',rota:'/conversa/instalacao'};
 if(c.tipo!=='totem'&&!ctx.vista)return{tipo:'conversa',rota:'/conversa/',proximo:c.rota};return{tipo:'ir',rota:c.rota}}
const vizinho=(L,i,d)=>L.length?L[((i<0?(d>0?-1:0):i)+d+L.length)%L.length]:null;
const logado=()=>{try{return !!JSON.parse(localStorage.getItem('almafluxo_usuario')||'null')}catch(e){return false}};
const vista=()=>{try{return !!sessionStorage.getItem('af_conversa_vista')}catch(e){return false}};
window.AFCanais={decidir,vizinho};
if(typeof document==='undefined')return;
let L=[],cfg={},num='',tn=null;const K='almafluxo_instalador';
const cur=()=>{const p=location.pathname.replace(/\/$/,'');return L.findIndex(c=>c.rota===p)};
const rotulo=()=>{const c=L[cur()];return c?c.numero+' · '+c.nome:'CH'};
function ir(c){if(!c)return;const d=decidir(c,{logado:logado(),vista:vista()});
 try{const s=JSON.parse(localStorage.getItem(K)||'{}');if(d.tipo==='conversa'){s.proximo=d.proximo;s.ultimaAbertura=Date.now();s.esperaTotem=cfg.espera_conversa_s||45}
  if(d.tipo==='ir'&&logado())s.ultimoCanal=c.rota; /* permanência de estado só com login */localStorage.setItem(K,JSON.stringify(s))}catch(e){}
 if(d.tipo==='login')aviso('O canal '+c.nome+' exige login no ALMAFLUXO. Abrindo o cadastro…');setTimeout(()=>{location.href=d.rota},d.tipo==='login'?1200:0)}
let av;function aviso(t){if(!av){av=document.createElement('div');av.style.cssText='position:fixed;left:50%;bottom:8%;transform:translateX(-50%);z-index:2147483200;background:#06122cf2;color:#fff;border:1px solid #27c8ff;border-radius:12px;padding:12px 18px;font:16px system-ui';document.body.appendChild(av)}av.textContent=t;av.style.display='block';clearTimeout(av._t);av._t=setTimeout(()=>{av.style.display='none'},3500)}
const mover=d=>ir(vizinho(L,cur(),d));
const pelaNumero=n=>{const c=L.find(x=>String(x.numero)===String(n));c?ir(c):aviso('Canal '+n+' não existe')};
let pn;function lista(){if(pn){pn.remove();pn=null;return}pn=document.createElement('div');pn.style.cssText='position:fixed;z-index:2147483180;top:64px;right:12px;background:#06122cf5;border:1px solid #27c8ff;border-radius:12px;padding:8px;max-height:70vh;overflow:auto;min-width:220px;font:16px system-ui';
 pn.innerHTML=L.map(x=>'<button data-n="'+x.numero+'" style="display:block;width:100%;text-align:left;margin:3px 0;font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:8px;padding:10px 12px;cursor:pointer">'+x.numero+' · '+x.nome+(x.login?' 🔒':'')+'</button>').join('');
 pn.onclick=e=>{const b=e.target.closest('button');if(b){const n=b.dataset.n;lista();pelaNumero(n)}};document.body.appendChild(pn)}
Object.assign(window.AFCanais,{mover,lista,pelaNumero,rotulo});
function flutuante(){const H=document.createElement('div');H.style.cssText='position:fixed;z-index:2147483150;display:flex;gap:4px;font:14px system-ui;opacity:.65;'+(cfg.posicao||'top:12px;right:12px');
 const b=(t,f,a)=>{const x=document.createElement('button');x.textContent=t;x.setAttribute('aria-label',a);x.style.cssText='font:inherit;color:#e8f1ff;background:#0a1d3acc;border:1px solid #27c8ff;border-radius:8px;padding:7px 11px;cursor:pointer';x.onclick=f;return x};
 const n=document.createElement('span');n.textContent=rotulo();n.style.cssText='color:#e8f1ff;background:#0a1d3acc;border:1px solid #27c8ff;border-radius:8px;padding:7px 11px';
 H.append(b('‹ CH',()=>mover(-1),'Canal anterior'),n,b('CH ›',()=>mover(1),'Próximo canal'),b('☰',lista,'Lista de canais'));document.body.appendChild(H)}
addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test((e.target&&e.target.tagName)||''))return;const k=e.keyCode,n=e.key;
 if(k===427||k===33||n==='ChannelUp'||n==='PageUp'){e.preventDefault();mover(1)}else if(k===428||k===34||n==='ChannelDown'||n==='PageDown'){e.preventDefault();mover(-1)}
 else if(/^[0-9]$/.test(n)){num+=n;aviso('Canal '+num);clearTimeout(tn);tn=setTimeout(()=>{pelaNumero(num);num=''},1500)}});
fetch('/distribuicao/canais.json',{cache:'no-store'}).then(r=>r.json()).then(j=>{cfg=j;L=(j.canais||[]).filter(c=>c.ativo!==false);if(!L.length)return;
 document.documentElement.classList.add('af-canais');if(!window.AF_CANAL_EMBUTIDO)flutuante();
 setInterval(()=>document.querySelectorAll('[data-ctl="canal-nome"]').forEach(e=>{const r=rotulo();if(e.textContent!==r)e.textContent=r}),800)}).catch(()=>{})})();
