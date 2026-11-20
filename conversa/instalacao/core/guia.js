(()=>{'use strict';const K='guias',$=(t,s,c)=>{const e=document.createElement(t);if(s)e.style.cssText=s;if(c)e.textContent=c;return e};
async function dados(){try{return (await fetch('https://almafluxo.uk/conversa/instalacao/distribuicao/pacotes.json',{cache:'no-store'}).then(r=>r.json())).guias||{}}catch(e){return{}}}
const VER={agente:async()=>!!(window.AFDiag&&await AFDiag.agente()),serial:async()=>!!navigator.serial||!!navigator.usb,bluetooth:async()=>!!navigator.bluetooth,instalado:async()=>!!(window.AFDetector&&(AFDetector.instalado()||AFEstado.get().instalado))};
const NV={agente:'Agente local ativo',serial:'Navegador com USB/serial',bluetooth:'Navegador com Bluetooth',instalado:'ALMAFLUXO instalado'};
window.AFGuia={ids:async()=>Object.entries(await dados()).map(([id,g])=>({id,nome:g.nome})),
 async abrir(id){const G=(await dados())[id];if(!G)return;const sv=()=>(window.AFEstado?AFEstado.get()[K]||{}:{}),pr=Math.min(sv()[id]||0,G.passos.length-1);let i=pr,ok={};
  const ov=$('div','position:fixed;inset:0;z-index:2147483100;background:#050d1af2;display:grid;place-items:center;padding:16px;font:16px system-ui;color:#e8f1ff'),cx=$('div','width:min(560px,100%);background:#0a1a33;border:1px solid #27c8ff;border-radius:14px;padding:20px');ov.appendChild(cx);document.body.appendChild(ov);
  const bt=(t,f,p)=>{const b=$('button','font:inherit;color:#e8f1ff;background:'+(p?'#1f7bff':'#0a1d3a')+';border:1px solid #27c8ff;border-radius:10px;padding:12px 16px;margin:8px 8px 0 0;cursor:pointer',t);b.onclick=f;return b};
  function draw(){const p=G.passos[i];cx.innerHTML='';cx.appendChild($('div','color:#8fa8c8;font-size:13px',G.nome+' · passo '+(i+1)+' de '+G.passos.length));
   const bar=$('div','height:6px;background:#12335a;border-radius:6px;margin:8px 0 14px;overflow:hidden');bar.appendChild($('div','height:100%;width:'+Math.round((i+1)/G.passos.length*100)+'%;background:#27c8ff'));cx.appendChild(bar);
   if(!G.implementado)cx.appendChild($('div','background:#2a2210;border-left:3px solid #f0a830;padding:8px 10px;margin-bottom:10px;font-size:13px','Esta plataforma ainda não tem instalador completo.'));
   cx.appendChild($('h2','margin:0 0 8px;font-size:20px',p.t));cx.appendChild($('p','line-height:1.5;color:#c8d8ee;margin:0 0 8px',p.d));
   const st=$('div','min-height:20px;font-size:14px');cx.appendChild(st);const nx=bt(i===G.passos.length-1?'Concluir':'Próximo ›',()=>{AFEstado&&AFEstado.set({[K]:{...sv(),[id]:i===G.passos.length-1?0:i+1}});if(i===G.passos.length-1)ov.remove();else{i++;draw()}},true);
   if(p.v){cx.appendChild(bt('Verificar',async()=>{st.textContent='Verificando…';const r=await VER[p.v]();ok[i]=r;st.style.color=r?'#2fd48a':'#ff6b75';st.textContent=(r?'✔ ':'✖ ')+NV[p.v]+(r?'':' — faça o passo e verifique de novo, ou continue se não se aplica.')}))}
   cx.appendChild($('div','height:0'));if(i>0)cx.appendChild(bt('‹ Voltar',()=>{i--;draw()}));cx.appendChild(nx);cx.appendChild(bt('Fechar',()=>ov.remove()));nx.focus()}
  draw()}}})();
