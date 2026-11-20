(()=>{'use strict';let ev=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ev=e});
addEventListener('appinstalled',()=>{AFEstado.set({instalado:true,instaladoEm:Date.now()})});
// Início automático: depende do fabricante/modelo; o nome do menu varia. Sem a opção, só um pacote nativo (plataformas/) resolve.
const GUIA={
 tizen:['Instale pelo módulo plataformas/tizen (.wgt, modo desenvolvedor ou loja).','Ajustes › Geral › procure a opção de executar o último app/Smart Hub ao ligar (o nome varia por ano/modelo).','TV corporativa/sinalização: use "URL Launcher" apontando para https://almafluxo.uk/conversa/instalacao.'],
 webos:['Instale pelo módulo plataformas/webos (.ipk, modo desenvolvedor ou loja).','Ajustes › Geral › procure o início automático/aplicativo inicial (varia por modelo).','Sinalização LG: configure app/URL de início no menu de instalação.'],
 'android-tv':['Instale o .apk (plataformas/android-tv) ou instale o PWA pelo Chrome.','Um APK nativo pode iniciar no boot; PWA em navegador não inicia sozinho.','Alternativa: definir o app como launcher/tela inicial pelo menu do fabricante.'],
 windows:['Instale o PWA (Edge/Chrome › Instalar) e abra a pasta Inicializar (Win+R › shell:startup).','Coloque ali um atalho para o app instalado.'],
 linux:['Instale o PWA ou use o pacote em plataformas/linux/debian-offline.','Adicione o app em Aplicativos de inicialização da sessão.'],
 outras:['Abra https://almafluxo.uk/conversa/instalacao no navegador da TV e salve como página inicial/favorita.','Se o navegador não abre o totem, é falta de suporte do aparelho: use o módulo nativo da plataforma.']};
window.AFInst={guia:p=>GUIA[p]||GUIA.outras,
 async instalar(){await AFEstado.persistir();if(ev){ev.prompt();const r=await ev.userChoice;ev=null;if(r.outcome==='accepted'){AFEstado.set({instalado:true,instaladoEm:Date.now()});return{ok:true,msg:'Instalado.'}}return{ok:false,msg:'Instalação cancelada.'}}
  if(AFDetector.instalado())return{ok:true,msg:'Já está rodando como aplicativo instalado.'};
  const p=AFDetector.plataforma();return{ok:false,msg:'Este navegador não oferece instalação direta. '+(p==='ios'?'No iPhone/iPad: Compartilhar › Adicionar à Tela de Início.':'Use o menu do navegador (Instalar/Adicionar à tela inicial) ou o pacote '+AFDetector.pacote()+' da plataforma.')}},
 // toda entrada no ecossistema passa por /conversa antes; o destino fica gravado
 async abrir(destino){let e=45;try{e=(await fetch('/distribuicao/pacotes.json').then(r=>r.json())).comunicacao.totem.espera_s||45}catch(_){}AFEstado.set({proximo:destino||null,esperaTotem:e,ultimaAbertura:Date.now()});location.href='/conversa/'}};})();
