
(()=>{'use strict';

const K='guias';
const BASE='https://almafluxo.uk/conversa/instalacao/';
const PACOTES_URL=BASE+'distribuicao/pacotes.json';

const $=(t,s,c)=>{
 const e=document.createElement(t);
 if(s)e.style.cssText=s;
 if(c!==undefined)e.textContent=c;
 return e;
};

async function dados(){
 try{
  const r=await fetch(PACOTES_URL,{
   cache:'no-store',
   credentials:'same-origin'
  });

  if(!r.ok)throw new Error('HTTP '+r.status);

  const j=await r.json();

  return j&&j.guias&&typeof j.guias==='object'
   ?j.guias
   :{};

 }catch(e){
  console.warn('[AFGuia] Não foi possível carregar os guias:',e);
  return {};
 }
}

const VER={

 agente:async()=>{
  try{
   return !!(
    window.AFDiag&&
    await AFDiag.agente()
   );
  }catch(e){
   return false;
  }
 },

 serial:async()=>{
  return !!(
   navigator.serial||
   navigator.usb
  );
 },

 bluetooth:async()=>{
  return !!navigator.bluetooth;
 },

 instalado:async()=>{
  try{
   if(!window.AFDetector)return false;

   const d=await AFDetector.existente();

   return !!(d.instalado||d.standalone);

  }catch(e){
   return false;
  }
 }

};

const NV={
 agente:'Agente local ativo',
 serial:'Navegador com USB/serial',
 bluetooth:'Navegador com Bluetooth',
 instalado:'ALMAFLUXO instalado'
};

function estadoGuia(){
 try{
  return window.AFEstado
   ?AFEstado.get()[K]||{}
   :{};
 }catch(e){
  return {};
 }
}

function salvarProgresso(id,passo){
 if(!window.AFEstado)return;

 const atual=estadoGuia();

 AFEstado.set({
  [K]:Object.assign({},atual,{
   [id]:passo
  })
 });
}

function normalizarGuia(G){
 if(!G||typeof G!=='object')return null;

 if(!Array.isArray(G.passos)||!G.passos.length)return null;

 const passos=G.passos.filter(p=>
  p&&
  typeof p.t==='string'&&
  typeof p.d==='string'
 );

 if(!passos.length)return null;

 return{
  nome:typeof G.nome==='string'?G.nome:'Guia ALMAFLUXO',
  implementado:G.implementado===true,
  passos
 };
}

window.AFGuia={

 ids:async()=>{
  const G=await dados();

  return Object.entries(G)
   .filter(([,g])=>g&&typeof g==='object')
   .map(([id,g])=>({
    id,
    nome:g.nome||id
   }));
 },

 async abrir(id){

  const todos=await dados();
  const G=normalizarGuia(todos[id]);

  if(!G){
   console.warn('[AFGuia] Guia inválido ou inexistente:',id);
   return false;
  }

  let progresso=estadoGuia();

  let salvo=Number(progresso[id]||0);

  if(!Number.isInteger(salvo)||salvo<0){
   salvo=0;
  }

  let i=Math.min(salvo,G.passos.length-1);

  const ov=$(
   'div',
   'position:fixed;inset:0;z-index:2147483100;'+
   'background:#050d1af2;display:grid;place-items:center;'+
   'padding:16px;font:16px system-ui;color:#e8f1ff;'
  );

  const cx=$(
   'div',
   'width:min(560px,100%);max-height:90vh;overflow:auto;'+
   'background:#0a1a33;border:1px solid #27c8ff;'+
   'border-radius:14px;padding:20px;box-sizing:border-box;'
  );

  ov.appendChild(cx);
  document.body.appendChild(ov);

  const bt=(t,f,destaque)=>{
   const b=$(
    'button',
    'font:inherit;color:#e8f1ff;background:'+
    (destaque?'#1f7bff':'#0a1d3a')+
    ';border:1px solid #27c8ff;border-radius:10px;'+
    'padding:12px 16px;margin:8px 8px 0 0;cursor:pointer;',
    t
   );

   b.type='button';
   b.onclick=f;

   return b;
  };

  function fechar(){
   ov.remove();
  }

  function draw(){

   const p=G.passos[i];

   cx.replaceChildren();

   cx.appendChild($(
    'div',
    'color:#8fa8c8;font-size:13px',
    G.nome+' · passo '+(i+1)+' de '+G.passos.length
   ));

   const bar=$(
    'div',
    'height:6px;background:#12335a;border-radius:6px;'+
    'margin:8px 0 14px;overflow:hidden;'
   );

   bar.appendChild($(
    'div',
    'height:100%;width:'+
    Math.round((i+1)/G.passos.length*100)+
    '%;background:#27c8ff;transition:width .2s;'
   ));

   cx.appendChild(bar);

   if(!G.implementado){
    cx.appendChild($(
     'div',
     'background:#2a2210;border-left:3px solid #f0a830;'+
     'padding:8px 10px;margin-bottom:10px;font-size:13px;',
     'Esta plataforma ainda não possui instalador completo.'
    ));
   }

   cx.appendChild($(
    'h2',
    'margin:0 0 8px;font-size:20px',
    p.t
   ));

   cx.appendChild($(
    'p',
    'line-height:1.5;color:#c8d8ee;margin:0 0 8px',
    p.d
   ));

   const st=$(
    'div',
    'min-height:20px;font-size:14px;margin-top:8px;'
   );

   cx.appendChild(st);

   // Verificação da etapa.
   if(p.v){

    const verificar=bt('Verificar',async()=>{

     verificar.disabled=true;
     st.style.color='#c8d8ee';
     st.textContent='Verificando…';

     try{

      const fn=VER[p.v];

      if(!fn){
       throw new Error('Verificação não implementada.');
      }

      const resultado=await fn();

      st.style.color=resultado?'#2fd48a':'#ff6b75';

      st.textContent=
       (resultado?'✔ ':'✖ ')+
       (NV[p.v]||p.v)+
       (resultado?'':' — faça o passo e tente novamente.');

     }catch(e){

      st.style.color='#ff6b75';
      st.textContent='Falha na verificação: '+e.message;

     }finally{
      verificar.disabled=false;
     }

    });

    cx.appendChild(verificar);
   }

   // Botões de navegação.
   if(i>0){
    cx.appendChild(bt('‹ Voltar',()=>{
     i--;
     draw();
    }));
   }

   const nx=bt(
    i===G.passos.length-1?'Concluir':'Próximo ›',
    ()=>{

     if(i===G.passos.length-1){

      salvarProgresso(id,0);
      fechar();

     }else{

      i++;
      salvarProgresso(id,i);
      draw();

     }

    },
    true
   );

   cx.appendChild(nx);

   cx.appendChild(bt('Fechar',fechar));

   nx.focus();
  }

  draw();

  return true;
 }

};

})();
