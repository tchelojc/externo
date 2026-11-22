/* ALMAFLUXO — GERADOR DE INSTALADOR ADAPTADO AO APARELHO
   Cria o pacote conforme o diagnóstico (plataforma + perfil gráfico).
   Navegador não instala programas sozinho: onde o sistema permite, gera o
   instalador para baixar; onde não permite (TVs), entrega o pacote nativo e
   o passo a passo. */
(()=>{
'use strict';

const ORIGEM='https://almafluxo.uk';
const URL_TOTEM=ORIGEM+'/conversa';
const RAW='https://raw.githubusercontent.com/tchelojc/externo/alma/conversa/instalacao/';
const APP_ID_WEBOS='uk.almafluxo.conversa';

let promptPWA=null;
try{
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptPWA=e;});
}catch(e){}

function plataforma(){
 try{return window.AFDetector?AFDetector.plataforma():'desconhecida';}
 catch(e){return 'desconhecida';}
}

function argsNavegador(perfil,modoTv){
 const a=['--app='+URL_TOTEM,'--autoplay-policy=no-user-gesture-required'];
 if(modoTv)a.push('--start-fullscreen');
 if(perfil&&perfil.esfera==='2d')a.push('--disable-smooth-scrolling');
 return a.join(' ');
}

function resumoPerfil(res){
 const nivel=(res&&res.nivel)||'equilibrado';
 const fps=(res&&res.perfil&&res.perfil.fps)||30;
 const esfera=(res&&res.perfil&&res.perfil.esfera)||'2d';
 return {nivel,fps,esfera};
}

function baixar(nome,texto){
 try{
  const blob=new Blob([texto],{type:'application/octet-stream'});
  if(navigator.msSaveBlob){navigator.msSaveBlob(blob,nome);return true;}
  const u=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=u;a.download=nome;a.style.display='none';
  document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(u);a.remove();},4000);
  return true;
 }catch(e){return false;}
}

/* ---------- WINDOWS ---------- */
function cmdWindows(res,modoTv){
 const p=resumoPerfil(res);
 const args=argsNavegador(res&&res.perfil,modoTv);
 const L=[
  '@echo off',
  'setlocal EnableExtensions',
  'title ALMAFLUXO - Instalador',
  'echo.',
  'echo  ALMAFLUXO - instalador gerado para este aparelho',
  'echo  Perfil: '+p.nivel+' / '+p.fps+' FPS / esfera '+p.esfera,
  'echo.',
  'set "DEST=%LOCALAPPDATA%\\ALMAFLUXO"',
  'set "RAW='+RAW+'"',
  'set "NAV="',
  'for %%P in ("%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" "%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe" "%LOCALAPPDATA%\\Google\\Chrome\\Application\\chrome.exe" "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe" "%ProgramFiles%\\Microsoft\\Edge\\Application\\msedge.exe") do if not defined NAV if exist "%%~P" set "NAV=%%~P"',
  'if not defined NAV goto semnav',
  'if not exist "%DEST%" mkdir "%DEST%"',
  '> "%DEST%\\perfil.json" echo {"nivel":"'+p.nivel+'","fps":'+p.fps+',"esfera":"'+p.esfera+'"}',
  'echo Criando atalhos (area de trabalho e menu iniciar)...',
  'powershell -NoProfile -ExecutionPolicy Bypass -Command "$w=New-Object -ComObject WScript.Shell; foreach($d in @([Environment]::GetFolderPath(\'Desktop\'),[Environment]::GetFolderPath(\'Programs\'))){ $s=$w.CreateShortcut($d+\'\\ALMAFLUXO.lnk\'); $s.TargetPath=\'%NAV%\'; $s.Arguments=\''+args+'\'; $s.IconLocation=\'%NAV%,0\'; $s.Description=\'ALMAFLUXO\'; $s.Save() }"',
  'if errorlevel 1 goto falhaatalho'
 ];
 if(modoTv){
  L.push('echo Configurando para iniciar junto com o Windows...');
  L.push('powershell -NoProfile -ExecutionPolicy Bypass -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut([Environment]::GetFolderPath(\'Startup\')+\'\\ALMAFLUXO.lnk\'); $s.TargetPath=\'%NAV%\'; $s.Arguments=\''+args+'\'; $s.Save()"');
 }
 L.push(
  'echo.',
  'choice /c SN /m "Instalar o agente local para USB e Wi-Fi (precisa de Python)"',
  'if errorlevel 2 goto desinst',
  'where python >nul 2>nul',
  'if errorlevel 1 goto sempy',
  'powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -UseBasicParsing \'%RAW%scripts/agente/almafluxo_agente.py\' -OutFile \'%DEST%\\almafluxo_agente.py\'"',
  'if errorlevel 1 goto falhaag',
  'python -m pip install --user --quiet pyserial',
  '> "%DEST%\\Agente.cmd" echo @python "%DEST%\\almafluxo_agente.py"',
  'echo Agente instalado. Para usar: execute %DEST%\\Agente.cmd',
  'goto desinst',
  ':desinst',
  '> "%DEST%\\Desinstalar.cmd" echo @echo off',
  '>> "%DEST%\\Desinstalar.cmd" echo powershell -NoProfile -Command "foreach($f in \'Desktop\',\'Programs\',\'Startup\'){Remove-Item ([Environment]::GetFolderPath($f)+\'\\ALMAFLUXO.lnk\') -ErrorAction SilentlyContinue}"',
  '>> "%DEST%\\Desinstalar.cmd" echo cd /d "%TEMP%"',
  '>> "%DEST%\\Desinstalar.cmd" echo rmdir /s /q "%DEST%"',
  'echo.',
  'echo Instalacao concluida. Abrindo o ALMAFLUXO...',
  'start "" "%NAV%" '+args,
  'timeout /t 4 >nul',
  'exit /b 0',
  ':semnav',
  'echo Nao encontrei o Google Chrome nem o Microsoft Edge.',
  'echo Instale um deles e execute este arquivo novamente.',
  'pause',
  'exit /b 1',
  ':falhaatalho',
  'echo Nao foi possivel criar os atalhos. Abra o endereco '+URL_TOTEM+' no navegador.',
  'pause',
  'exit /b 1',
  ':sempy',
  'echo Python nao encontrado. Instale em python.org e execute este arquivo de novo para o agente.',
  'goto desinst',
  ':falhaag',
  'echo Nao foi possivel baixar o agente. Verifique a conexao com a internet.',
  'goto desinst'
 );
 return L.join('\r\n')+'\r\n';
}

/* ---------- LINUX ---------- */
function shLinux(res,modoTv){
 const args=argsNavegador(res&&res.perfil,modoTv);
 return [
  '#!/bin/sh',
  'NAV=""',
  'for n in google-chrome-stable google-chrome chromium chromium-browser microsoft-edge; do',
  '  if command -v "$n" >/dev/null 2>&1; then NAV=$(command -v "$n"); break; fi',
  'done',
  'if [ -z "$NAV" ]; then echo "Instale o Google Chrome ou o Chromium e execute de novo."; exit 1; fi',
  'mkdir -p "$HOME/.local/share/applications"',
  'F="$HOME/.local/share/applications/almafluxo.desktop"',
  'cat > "$F" <<EOF2',
  '[Desktop Entry]',
  'Type=Application',
  'Name=ALMAFLUXO',
  'Exec=$NAV '+args,
  'Icon=web-browser',
  'Terminal=false',
  'Categories=Network;AudioVideo;',
  'EOF2',
  'chmod +x "$F"',
  'D="$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")"',
  'if [ -d "$D" ]; then cp "$F" "$D/ALMAFLUXO.desktop"; chmod +x "$D/ALMAFLUXO.desktop"; fi',
  'echo "ALMAFLUXO instalado. Procure por ALMAFLUXO no menu de aplicativos."',
  ''
 ].join('\n');
}

/* ---------- TVs ---------- */
async function pacotePublicado(alvo){
 try{
  const r=await fetch('/distribuicao/pacotes.json',{cache:'no-store'});
  if(!r.ok)return null;
  const j=await r.json();
  const l=(j.pacotes||[]).filter(p=>p&&p.alvo===alvo);
  return l.length?l[l.length-1]:null;
 }catch(e){return null;}
}

const FAVORITOS=[
 'Opção mais simples (funciona em qualquer TV): abra o navegador da TV, digite almafluxo.uk/conversa/instalacao, e adicione a página aos favoritos (menu do navegador, ícone de estrela ou "Adicionar aos favoritos").',
 'Se o menu do navegador oferecer "Adicionar à tela inicial" ou "Fixar", use essa opção: ela cria o atalho na lista de aplicativos.'
];

async function guiaTv(alvo){
 const pac=await pacotePublicado(alvo);
 const arq=pac&&pac.arquivo?RAW+'distribuicao/pacotes/'+pac.arquivo:null;
 const passos=[].concat(FAVORITOS);
 let titulo='';

 if(alvo==='webos'){
  titulo='TV LG (webOS): instalar como aplicativo na tela inicial';
  passos.push(
   'Para o ícone ao lado de Netflix e YouTube é preciso instalar um aplicativo. Isso exige um computador na mesma rede da TV, uma vez só.',
   '1. Na TV, instale o aplicativo "Developer Mode" (LG Content Store), abra, ligue "Dev Mode Status" e anote o endereço IP e a senha (Key Server).',
   '2. No computador: npm install -g @webosose/ares-cli',
   '3. ares-setup-device --add tv --info "{\'host\':\'IP_DA_TV\',\'port\':\'9922\',\'username\':\'prisoner\'}"',
   '4. ares-novacom --device tv --getkey   (digite a senha da TV)',
   arq?'5. Baixe o pacote: '+arq:'5. O pacote ainda não está publicado: gere com ares-package a partir de plataformas/webos.',
   '6. ares-install --device tv almafluxo-webos.ipk',
   '7. O ALMAFLUXO aparece na lista de aplicativos da tela inicial.'
  );
 }else if(alvo==='tizen'){
  titulo='TV Samsung (Tizen): instalar como aplicativo na tela inicial';
  passos.push(
   'A Samsung só instala aplicativos assinados. É preciso o Tizen Studio no computador e um certificado Samsung para a sua TV.',
   '1. Na TV: Apps, digite 12345, ligue Developer mode e informe o IP do computador.',
   arq?'2. Baixe o projeto: '+arq+' e importe no Tizen Studio (File > Import).':'2. Importe o projeto de plataformas/tizen no Tizen Studio.',
   '3. Crie o certificado em Certificate Manager (Samsung) com o DUID da TV.',
   '4. Conecte a TV no Device Manager e use Run As > Tizen Web Application.',
   '5. O ALMAFLUXO aparece na lista de aplicativos da tela inicial.'
  );
 }else{
  titulo='Android TV / Fire TV: instalar como aplicativo';
  passos.push(
   'O aplicativo é criado a partir do endereço do ALMAFLUXO e instalado por APK.',
   '1. No computador, abra pwabuilder.com, informe '+URL_TOTEM+' e gere o pacote Android (APK).',
   '2. Envie o APK para a TV pelo aplicativo "Downloader" (Fire TV e Android TV) ou por adb install.',
   '3. Android TV pode ocultar aplicativos sem selo de TV: use o "Sideload Launcher" para abri-lo.'
  );
 }
 return {ok:true,tipo:'guia',titulo,passos,
  msg:titulo+'. O passo a passo foi listado abaixo.'};
}

/* ---------- PWA / outros ---------- */
async function pwa(){
 if(promptPWA){
  try{
   promptPWA.prompt();
   const r=await promptPWA.userChoice;
   promptPWA=null;
   return {ok:r&&r.outcome==='accepted',tipo:'pwa',passos:[],
    msg:r&&r.outcome==='accepted'?'ALMAFLUXO instalado como aplicativo.':'Instalação cancelada.'};
  }catch(e){}
 }
 return null;
}

const GUIA_NAV={
 android:['Abra o menu do Chrome (três pontos).','Toque em "Instalar aplicativo" ou "Adicionar à tela inicial".','O ícone do ALMAFLUXO aparece na tela inicial.'],
 ios:['Abra esta página no Safari.','Toque em Compartilhar.','Escolha "Adicionar à Tela de Início".'],
 mac:['No Chrome ou Edge: menu > "Instalar ALMAFLUXO".','No Safari: Arquivo > "Adicionar ao Dock".'],
 desconhecida:FAVORITOS
};

async function executar(res){
 const p=plataforma();
 const modoTv=false;

 if(p==='windows'){
  const ok=baixar('ALMAFLUXO-Instalar.cmd',cmdWindows(res,modoTv));
  return {ok,tipo:'arquivo',
   msg:ok?'Instalador gerado para este computador: ALMAFLUXO-Instalar.cmd. Abra o arquivo baixado (se o Windows avisar, escolha Mais informações > Executar assim mesmo).':'O navegador bloqueou o download.',
   passos:ok?['Abra a pasta Downloads e dê dois cliques em ALMAFLUXO-Instalar.cmd.','O instalador localiza o Chrome ou Edge, cria os atalhos e abre o ALMAFLUXO.','Para remover: %LOCALAPPDATA%\\ALMAFLUXO\\Desinstalar.cmd']:FAVORITOS};
 }

 if(p==='linux'){
  const ok=baixar('almafluxo-instalar.sh',shLinux(res,modoTv));
  return {ok,tipo:'arquivo',
   msg:ok?'Instalador gerado: almafluxo-instalar.sh.':'O navegador bloqueou o download.',
   passos:ok?['Abra um terminal na pasta Downloads.','Execute: sh almafluxo-instalar.sh','Procure ALMAFLUXO no menu de aplicativos.']:FAVORITOS};
 }

 if(p==='webos'||p==='tizen'||p==='android-tv')return guiaTv(p);

 const r=await pwa();
 if(r)return r;

 return {ok:true,tipo:'guia',
  msg:'Siga os passos abaixo para instalar neste aparelho.',
  passos:GUIA_NAV[p]||GUIA_NAV.desconhecida};
}

window.AFPacote={executar,cmdWindows,shLinux,guiaTv};
})();
