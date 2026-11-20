
(()=>{
'use strict';

const BASE='https://almafluxo.uk/conversa/instalacao/';
const PACOTES_URL=BASE+'distribuicao/pacotes.json';
const STORAGE='AF_AMBIENTE_RENDERIZACAO_V1';

let ev=null;
let janela=null;
let frame=null;
let status=null;

addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();
  ev=e;
});

addEventListener('appinstalled',()=>{
  try{
    AFEstado.set({
      instalado:true,
      instaladoEm:Date.now()
    });
  }catch(e){
    console.warn('[AFInst]',e);
  }
});

const GUIA={
  tizen:[
    'Use o pacote nativo Tizen quando disponível.',
    'Para navegação adaptativa, utilize um navegador compatível.',
    'A execução automática depende do suporte do fabricante.'
  ],
  webos:[
    'Use o pacote nativo webOS quando disponível.',
    'Verifique a compatibilidade do navegador da televisão.',
    'A execução automática depende do modelo.'
  ],
  'android-tv':[
    'Use o navegador compatível ou o pacote Android TV.',
    'A janela adaptativa funciona dentro do navegador.',
    'Um APK pode oferecer integração nativa adicional.'
  ],
  windows:[
    'Use o PWA quando disponível.',
    'A janela adaptativa pode abrir os endereços do ecossistema.',
    'Um executável nativo exige um pacote próprio.'
  ],
  linux:[
    'Use o PWA ou navegador compatível.',
    'A janela adaptativa utiliza os endereços existentes.'
  ],
  outras:[
    'Abra o portal em um navegador compatível.',
    'A janela adaptativa verifica o suporte de incorporação dos endereços.'
  ]
};

function validarDestino(destino){
  if(typeof destino!=='string'||!destino)return null;

  try{
    const url=new URL(destino,location.origin);

    if(url.origin!==location.origin)return null;
    if(!/^\/[\w./-]*$/.test(url.pathname))return null;
    if(url.pathname.startsWith('//'))return null;

    return url.pathname;
  }catch(e){
    return null;
  }
}

async function obterEsperaTotem(){
  try{
    const r=await fetch(PACOTES_URL,{
      cache:'no-store',
      credentials:'same-origin'
    });

    if(!r.ok)throw new Error('HTTP '+r.status);

    const j=await r.json();
    const n=Number(j?.comunicacao?.totem?.espera_s);

    return Number.isFinite(n)&&n>=1?
      Math.min(n,300):45;

  }catch(e){
    console.warn('[AFInst] Espera padrão:',e);
    return 45;
  }
}

function perfilAtual(){
  return window.AFPerfilInstalacao||
         window.AFDiagnosticoAdaptativo||
         null;
}

function criarEstilo(){
  if(document.getElementById('af-render-style'))return;

  const css=document.createElement('style');
  css.id='af-render-style';

  css.textContent=`
    #af-render-window{
      position:fixed;
      inset:0;
      z-index:2147483000;
      display:flex;
      flex-direction:column;
      background:#080d18;
      color:#fff;
      font:14px Arial,sans-serif;
    }

    #af-render-toolbar{
      min-height:46px;
      display:flex;
      align-items:center;
      gap:8px;
      padding:5px 10px;
      background:#101b2b;
      flex-wrap:wrap;
    }

    #af-render-toolbar button{
      border:1px solid #40516a;
      border-radius:7px;
      background:#1b2c42;
      color:white;
      padding:8px 12px;
      cursor:pointer;
    }

    #af-render-status{
      margin-left:auto;
      font-size:11px;
      opacity:.8;
    }

    #af-render-frame{
      width:100%;
      height:100%;
      flex:1;
      border:0;
      background:#080d18;
    }
  `;

  document.head.appendChild(css);
}

function criarJanela(){
  if(janela&&frame)return;

  criarEstilo();

  janela=document.createElement('section');
  janela.id='af-render-window';

  const barra=document.createElement('nav');
  barra.id='af-render-toolbar';

  const titulo=document.createElement('strong');
  titulo.textContent='ALMAFLUXO';

  function botao(nome,acao){
    const b=document.createElement('button');
    b.type='button';
    b.textContent=nome;
    b.addEventListener('click',acao);
    return b;
  }

  barra.append(
    titulo,
    botao('Início',()=>abrir('/')),
    botao('Totem',()=>abrir('/conversa/')),
    botao('Voltar',()=>{
      try{frame.contentWindow.history.back()}catch(e){}
    }),
    botao('Fechar',fechar)
  );

  status=document.createElement('span');
  status.id='af-render-status';
  status.textContent='Preparando renderização...';

  barra.appendChild(status);

  frame=document.createElement('iframe');
  frame.id='af-render-frame';
  frame.title='Navegação ALMAFLUXO';
  frame.setAttribute(
    'allow',
    'fullscreen; autoplay; encrypted-media; picture-in-picture'
  );
  frame.setAttribute('allowfullscreen','');

  janela.append(barra,frame);
  document.body.appendChild(janela);
}

function adaptarFrame(){
  if(!frame)return;

  const resultado=perfilAtual();

  if(!resultado)return;

  const nivel=resultado.nivel;
  const p=resultado.perfil;

  status.textContent=
    'Perfil '+nivel+' · Meta '+p.fps+' FPS';

  try{
    const doc=frame.contentDocument;
    if(!doc||!doc.documentElement)return;

    const root=doc.documentElement;

    root.dataset.afDesempenho=nivel;
    root.style.setProperty('--af-fps',p.fps);
    root.style.setProperty(
      '--af-frame-ms',
      Math.round(1000/p.fps)+'ms'
    );

    let css=doc.getElementById('af-adaptacao-injetada');

    if(!css){
      css=doc.createElement('style');
      css.id='af-adaptacao-injetada';
      doc.head.appendChild(css);
    }

    css.textContent=`
      ${!p.animacoes?`
        *,*::before,*::after{
          animation:none!important;
          transition:none!important;
          scroll-behavior:auto!important;
        }
      `:''}

      ${!p.efeitos?`
        *{
          backdrop-filter:none!important;
        }
      `:''}
    `;

    const evento=new doc.defaultView.CustomEvent(
      'af:perfil-adaptativo',
      {detail:resultado}
    );

    doc.defaultView.dispatchEvent(evento);

  }catch(e){
    if(status){
      status.textContent=
        'O navegador não permite adaptar esta página incorporada.';
    }

    console.warn('[AFInst] Adaptação do frame limitada:',e);
  }
}

function renderizar(destino){
  criarJanela();

  const url=new URL(destino,location.origin);

  if(frame.src!==url.href){
    frame.onload=()=>{
      adaptarFrame();
    };

    frame.src=url.href;
  }else{
    adaptarFrame();
  }

  janela.style.display='flex';

  return{
    ok:true,
    msg:'Ambiente de navegação aberto.'
  };
}

function fechar(){
  if(janela){
    janela.style.display='none';
  }
}

async function abrir(destino){
  const caminho=validarDestino(destino||'/');

  if(!caminho){
    return{
      ok:false,
      msg:'Destino inválido.'
    };
  }

  const espera=await obterEsperaTotem();

  try{
    AFEstado.set({
      proximo:caminho,
      esperaTotem:espera,
      ultimaAbertura:Date.now()
    });
  }catch(e){
    console.warn('[AFInst] Estado:',e);
  }

  return renderizar(caminho);
}

async function instalar(){
  try{
    try{
      await AFEstado.persistir();
    }catch(e){
      console.warn('[AFInst] Persistência:',e);
    }

    const adaptacao=window.AFAdaptador?
      await AFAdaptador.executar():perfilAtual();

    if(adaptacao){
      window.AFPerfilInstalacao=adaptacao;
    }

    const configuracao={
      versao:1,
      tipo:'ambiente-navegacao',
      perfil:adaptacao?.nivel||'equilibrado',
      fps:adaptacao?.perfil?.fps||30,
      criadoEm:Date.now()
    };

    let persistido=false;

    try{
      localStorage.setItem(
        STORAGE,
        JSON.stringify(configuracao)
      );
      persistido=true;
    }catch(e){
      console.warn('[AFInst] Armazenamento indisponível:',e);
    }

    // Se o navegador oferecer instalação PWA,
    // ela é complementar à criação do ambiente.
    if(ev){
      const evento=ev;
      ev=null;

      try{
        await evento.prompt();
        await evento.userChoice;
      }catch(e){
        console.warn('[AFInst] PWA:',e);
      }
    }

    const r=renderizar('/');

    return{
      ok:true,
      msg:
        'Ambiente ALMAFLUXO preparado. '+
        'Perfil: '+configuracao.perfil+
        '. '+(persistido?
          'Configuração salva neste navegador.':
          'Configuração mantida apenas nesta sessão.')
    };

  }catch(e){
    return{
      ok:false,
      msg:'Falha ao preparar o ambiente: '+e.message
    };
  }
}

function instalado(){
  try{
    return !!localStorage.getItem(STORAGE);
  }catch(e){
    return false;
  }
}

window.AFInst={
  guia(plataforma){
    return GUIA[plataforma]||GUIA.outras;
  },

  instalar,
  abrir,
  fechar,
  renderizar,
  adaptarFrame,
  instalado
};

})();
