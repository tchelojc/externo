
(()=>{'use strict';

const ua=navigator.userAgent||'';

function plataforma(){

 if(/Web0S|webOS|NetCast/i.test(ua))return 'webos';

 if(/Tizen/i.test(ua))return 'tizen';

 if(/Android/i.test(ua)){
  return /TV|AFT|BRAVIA|SMART-TV|AndroidTV|GoogleTV/i.test(ua)
   ?'android-tv'
   :'android';
 }

 if(/Windows/i.test(ua))return 'windows';

 if(/iPhone|iPad|iPod/i.test(ua))return 'ios';

 if(/Mac/i.test(ua))return 'mac';

 if(/Linux|X11|CrOS/i.test(ua))return 'linux';

 return 'desconhecida';
}

const PACOTE={
 webos:'.ipk',
 tizen:'.wgt',
 'android-tv':'.apk',
 android:'.apk',
 windows:'PWA/.exe',
 linux:'PWA/.deb'
};

function instalado(){
 try{
  const standalone=
   window.matchMedia&&
   window.matchMedia('(display-mode: standalone)').matches;

  const fullscreen=
   window.matchMedia&&
   window.matchMedia('(display-mode: fullscreen)').matches;

  const minimal=
   window.matchMedia&&
   window.matchMedia('(display-mode: minimal-ui)').matches;

  return !!(
   standalone||
   fullscreen||
   minimal||
   navigator.standalone===true
  );

 }catch(e){
  return false;
 }
}

async function swAtivo(){
 try{
  if(!navigator.serviceWorker)return false;

  const registros=await navigator.serviceWorker.getRegistrations();

  return registros.some(r=>{
   const urls=[
    r.scope,
    r.active&&r.active.scriptURL,
    r.waiting&&r.waiting.scriptURL,
    r.installing&&r.installing.scriptURL
   ].filter(Boolean);

   return urls.some(url=>{
    try{
     const u=new URL(url,location.href);

     return u.origin===location.origin&&
      u.pathname.startsWith('/conversa/');
    }catch(e){
     return false;
    }
   });
  });

 }catch(e){
  return false;
 }
}

function caps(){
 return{
  pwa:'serviceWorker' in navigator,
  serial:!!navigator.serial,
  usb:!!navigator.usb,
  bluetooth:!!navigator.bluetooth,
  seguro:!!window.isSecureContext,
  fullscreen:!!(
   document.fullscreenEnabled||
   document.webkitFullscreenEnabled
  ),
  tela:!!navigator.wakeLock
 };
}

async function existente(){

 const s=window.AFEstado
  ?AFEstado.get()||{}
  :{};

 const standalone=instalado();
 const sw=await swAtivo();
 const flag=!!s.instalado;

 return{
  standalone,
  sw,
  flag,
  versao:s.versao||null,

  // Sinal de instalação confirmado pelo próprio instalador
  // ou execução em modo aplicativo.
  instalado:standalone||flag,

  // O Service Worker é apresentado separadamente.
  // Ele pode existir mesmo sem instalação PWA.
  pwaDisponivel:'serviceWorker' in navigator
 };
}

window.AFDetector={
 ua,
 plataforma,
 pacote:()=>PACOTE[plataforma()]||'—',
 instalado,
 swAtivo,
 caps,
 existente
};

})();
