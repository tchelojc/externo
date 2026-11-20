
(()=>{
'use strict';

/*
 * ALMAFLUXO — INSTALADOR E MOTOR DE NAVEGAÇÃO
 *
 * 1. instalar()
 *    Prepara o ambiente e cria o renderizador.
 *
 * 2. abrir('/conversa')
 *    Abre o Totem dentro do renderizador adaptativo.
 *
 * 3. abrirDireto()
 *    Executa o diagnóstico, registra o perfil e abre
 *    o Totem diretamente, sem iframe.
 *
 * 4. executarCompleto()
 *    Abre o Totem diretamente, sem filtro adaptativo.
 */

const BASE='https://almafluxo.uk/conversa/instalacao/';
const PACOTES_URL=BASE+'distribuicao/pacotes.json';
const STORAGE='AF_AMBIENTE_RENDERIZACAO_V1';
const PERFIL_STORAGE='AF_PERFIL_TOTEM_V1';

const TOTEM_URL='https://almafluxo.uk/conversa';

let janela=null;
let frame=null;
let status=null;

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
    'A janela adaptativa verifica o suporte de incorporação.'
  ]
};

/* =====================================================
   VALIDAÇÃO DE ENDEREÇOS
===================================================== */

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

/* =====================================================
   CONFIGURAÇÃO DO TOTEM
===================================================== */

async function obterEsperaTotem(){
  try{
    const r=await fetch(PACOTES_URL,{
      cache:'no-store',
      credentials:'same-origin'
    });

    if(!r.ok)throw new Error('HTTP '+r.status);

    const j=await r.json();
    const n=Number(j?.comunicacao?.totem?.espera_s);

    return Number.isFinite(n)&&n>=1
      ?Math.min(n,300)
      :45;

  }catch(e){
    console.warn('[AFInst] Espera padrão:',e);
    return 45;
  }
}

/* =====================================================
   PERFIL ADAPTATIVO
===================================================== */

function perfilAtual(){
  return window.AFPerfilInstalacao||
         window.AFDiagnosticoAdaptativo||
         null;
}

async function diagnosticar(){
  const atual=perfilAtual();

  // Reaproveita o perfil já calculado durante a abertura
  // do portal ou pelo botão de instalação.
  if(atual?.perfil&&atual?.nivel){
    return atual;
  }

  if(!window.AFAdaptador){
    return null;
  }

  const resultado=await window.AFAdaptador.executar();

  if(resultado?.perfil){
    window.AFPerfilInstalacao=resultado;
  }

  return resultado;
}

function salvarPerfilTotem(resultado){
  if(!resultado)return false;

  try{
    const dados={
      versao:1,
      perfil:resultado.nivel||'equilibrado',
      fps:resultado.perfil?.fps||30,
      imagem:resultado.perfil?.imagem||'media',
      animacoes:resultado.perfil?.animacoes!==false,
      efeitos:resultado.perfil?.efeitos!==false,
      registradoEm:Date.now()
    };

    localStorage.setItem(
      PERFIL_STORAGE,
      JSON.stringify(dados)
    );

    return true;

  }catch(e){
    console.warn('[AFInst] Perfil não persistido:',e);
    return false;
  }
}

/* =====================================================
   ESTILO DO RENDERIZADOR
===================================================== */

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

/* =====================================================
   CRIAÇÃO DA JANELA
===================================================== */

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

    botao('Início',()=>{
      abrir('/');
    }),

    botao('Totem',()=>{
      abrir('/conversa');
    }),

    botao('Voltar',()=>{
      try{
        frame.contentWindow.history.back();
      }catch(e){
        console.warn('[AFInst] Histórico:',e);
      }
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
    'autoplay; encrypted-media; picture-in-picture'
  );

  frame.addEventListener('load',()=>{
    adaptarFrame();
  });

  janela.append(barra,frame);
  document.body.appendChild(janela);
}

/* =====================================================
   ADAPTAÇÃO DO IFRAME
===================================================== */

function adaptarFrame(){
  if(!frame)return;

  const resultado=perfilAtual();

  if(!resultado||!resultado.perfil)return;

  const nivel=resultado.nivel||'equilibrado';
  const p=resultado.perfil;

  if(status){
    status.textContent=
      'Perfil '+nivel+' · Meta '+p.fps+' FPS';
  }

  try{
    const doc=frame.contentDocument;

    if(!doc||!doc.documentElement){
      throw new Error('Documento incorporado indisponível.');
    }

    const root=doc.documentElement;

    root.dataset.afDesempenho=nivel;

    root.style.setProperty(
      '--af-fps',
      p.fps
    );

    root.style.setProperty(
      '--af-frame-ms',
      Math.round(1000/p.fps)+'ms'
    );

    let head=doc.head;

    if(!head){
      head=doc.createElement('head');
      doc.documentElement.insertBefore(
        head,
        doc.documentElement.firstChild
      );
    }

    let css=doc.getElementById('af-adaptacao-injetada');

    if(!css){
      css=doc.createElement('style');
      css.id='af-adaptacao-injetada';
      head.appendChild(css);
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
        'Adaptação limitada pelo navegador.';
    }

    console.warn(
      '[AFInst] Não foi possível adaptar o frame:',
      e
    );
  }
}

/* =====================================================
   ABERTURA PELO RENDERIZADOR
===================================================== */

function renderizar(destino){
  const caminho=validarDestino(destino);

  if(!caminho){
    return {
      ok:false,
      msg:'Destino inválido para o renderizador.'
    };
  }

  criarJanela();

  const url='https://almafluxo.uk'+caminho;

  janela.style.display='flex';

  if(status){
    status.textContent='Carregando '+caminho+'...';
  }

  // Não utiliza AFEstado.proximo.
  // Não redireciona para o portal.
  // Carrega diretamente o destino no iframe.

  if(frame.getAttribute('src')!==url){
    frame.setAttribute('src',url);
  }else{
    adaptarFrame();
  }

  return {
    ok:true,
    msg:'Endereço aberto pelo renderizador ALMAFLUXO.'
  };
}

/* =====================================================
   BOTÃO 2 — NOSSA CONVERSA COM RENDERIZADOR
===================================================== */

async function abrir(destino){
  return renderizar(destino||'/conversa');
}

/* =====================================================
   BOTÃO — ABRIR TOTEM DIRETAMENTE COM DIAGNÓSTICO
===================================================== */

async function abrirDireto(){
  try{
    if(status){
      status.textContent='Analisando dispositivo...';
    }

    const resultado=await diagnosticar();

    if(resultado){
      salvarPerfilTotem(resultado);
    }

    // Navegação direta.
    // Sem iframe e sem redirecionamento pelo portal.
    location.assign(TOTEM_URL);

    return {
      ok:true,
      msg:'Diagnóstico concluído. Abrindo Totem diretamente.'
    };

  }catch(e){

    console.error('[AFInst] Diagnóstico do Totem:',e);

    return {
      ok:false,
      msg:'Falha no diagnóstico: '+e.message
    };
  }
}

/* =====================================================
   BOTÃO — EXECUTAR TOTEM COMPLETO
===================================================== */

function executarCompleto(){

  // Não executa diagnóstico.
  // Não aplica perfil.
  // Não utiliza iframe.
  // Não altera AFEstado.
  // Abre o endereço integral diretamente.

  location.assign(TOTEM_URL);

  return {
    ok:true,
    msg:'Abrindo Totem completo diretamente.'
  };
}

/* =====================================================
   FECHAR RENDERIZADOR
===================================================== */

function fechar(){
  if(janela){
    janela.style.display='none';
  }
}

/* =====================================================
   INSTALAÇÃO DO AMBIENTE ALMAFLUXO
===================================================== */

async function instalar(){
  try{
    status=null;

    // Cria a estrutura do renderizador, mas não abre
    // nenhuma rota e não inicia navegação.
    criarJanela();

    janela.style.display='none';

    const adaptacao=await diagnosticar();

    if(!adaptacao?.perfil){
      throw new Error(
        'Não foi possível preparar um perfil adaptativo válido.'
      );
    }

    const configuracao={
      versao:1,
      tipo:'ambiente-navegacao',
      perfil:adaptacao.nivel,
      fps:adaptacao.perfil.fps,
      imagem:adaptacao.perfil.imagem,
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
      console.warn('[AFInst] Armazenamento:',e);
    }

    try{
      if(window.AFEstado){
        await AFEstado.persistir();
      }
    }catch(e){
      console.warn('[AFInst] Persistência:',e);
    }

    return {
      ok:true,
      msg:
        'Ambiente ALMAFLUXO preparado. '+
        'Perfil: '+configuracao.perfil+
        ' · Meta: '+configuracao.fps+' FPS. '+
        (persistido
          ?'Configuração salva neste navegador.'
          :'Configuração mantida nesta sessão.')
    };

  }catch(e){

    console.error('[AFInst] Instalação:',e);

    return {
      ok:false,
      msg:'Falha ao preparar ambiente: '+(e?.message||String(e))
    };
  }
}

/* =====================================================
   CONSULTA DO AMBIENTE
===================================================== */

function instalado(){
  try{
    return !!localStorage.getItem(STORAGE);
  }catch(e){
    return false;
  }
}

function lerPerfilTotem(){
  try{
    const valor=localStorage.getItem(PERFIL_STORAGE);
    return valor?JSON.parse(valor):null;
  }catch(e){
    return null;
  }
}

/* =====================================================
   API PÚBLICA
===================================================== */

window.AFInst={

  guia(plataforma){
    return GUIA[plataforma]||GUIA.outras;
  },

  instalar,

  // Abertura dentro do renderizador.
  abrir,

  // Abertura direta com diagnóstico.
  abrirDireto,

  // Abertura direta integral, sem filtro.
  executarCompleto,

  fechar,
  renderizar,
  adaptarFrame,
  instalado,
  lerPerfilTotem,

  obterEnderecoTotem(){
    return TOTEM_URL;
  }

};

})();
