(()=>{'use strict';const ua=navigator.userAgent||'';
function plataforma(){if(/Web0S|webOS|NetCast/i.test(ua))return 'webos';if(/Tizen/i.test(ua))return 'tizen';
 if(/Android/i.test(ua))return /TV|AFT|BRAVIA|SMART-TV|AndroidTV/i.test(ua)?'android-tv':'android';
 if(/Windows/i.test(ua))return 'windows';if(/iPhone|iPad|iPod/i.test(ua))return 'ios';if(/Mac/i.test(ua))return 'mac';if(/Linux|X11|CrOS/i.test(ua))return 'linux';return 'desconhecida'}
const PACOTE={webos:'.ipk',tizen:'.wgt','android-tv':'.apk',android:'.apk',windows:'PWA/.exe',linux:'PWA/.deb'};
function instalado(){try{return matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches||navigator.standalone===true}catch(e){return false}}
async function swAtivo(){try{return !!(navigator.serviceWorker&&(await navigator.serviceWorker.getRegistrations()).length)}catch(e){return false}}
window.AFDetector={ua,plataforma,pacote:()=>PACOTE[plataforma()]||'—',instalado,swAtivo,
 caps:()=>({pwa:'serviceWorker' in navigator,serial:!!navigator.serial,usb:!!navigator.usb,bluetooth:!!navigator.bluetooth,seguro:window.isSecureContext}),
 // "instalação existente" só é confirmada por sinais reais: janela standalone, SW registrado ou flag gravada pelo próprio instalador
 async existente(){const s=window.AFEstado?AFEstado.get():{};return{standalone:instalado(),sw:await swAtivo(),flag:!!s.instalado,versao:s.versao||null}}}})();
