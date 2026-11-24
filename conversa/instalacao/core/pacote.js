function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  'use strict';

  var ORIGEM = 'https://almafluxo.uk';
  var URL_TOTEM = ORIGEM + '/conversa';
  var RAW = 'https://raw.githubusercontent.com/tchelojc/externo/alma/conversa/instalacao/';
  var APP_ID_WEBOS = 'uk.almafluxo.conversa';
  var promptPWA = null;
  try {
    addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      promptPWA = e;
    });
  } catch (e) {}
  function plataforma() {
    try {
      return window.AFDetector ? AFDetector.plataforma() : 'desconhecida';
    } catch (e) {
      return 'desconhecida';
    }
  }
  function argsNavegador(perfil, modoTv) {
    var a = ['--app=' + URL_TOTEM, '--autoplay-policy=no-user-gesture-required'];
    if (modoTv) a.push('--start-fullscreen');
    if (perfil && perfil.esfera === '2d') a.push('--disable-smooth-scrolling');
    return a.join(' ');
  }
  function resumoPerfil(res) {
    var nivel = res && res.nivel || 'equilibrado';
    var fps = res && res.perfil && res.perfil.fps || 30;
    var esfera = res && res.perfil && res.perfil.esfera || '2d';
    return {
      nivel: nivel,
      fps: fps,
      esfera: esfera
    };
  }
  function baixar(nome, texto) {
    try {
      var blob = new Blob([texto], {
        type: 'application/octet-stream'
      });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, nome);
        return true;
      }
      var u = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = u;
      a.download = nome;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(u);
        a.remove();
      }, 4000);
      return true;
    } catch (e) {
      return false;
    }
  }
  function cmdWindows(res, modoTv) {
    var p = resumoPerfil(res);
    var args = argsNavegador(res && res.perfil, modoTv);
    var L = ['@echo off', 'setlocal EnableExtensions', 'title ALMAFLUXO - Instalador', 'echo.', 'echo  ALMAFLUXO - instalador gerado para este aparelho', 'echo  Perfil: ' + p.nivel + ' / ' + p.fps + ' FPS / esfera ' + p.esfera, 'echo.', 'set "DEST=%LOCALAPPDATA%\\ALMAFLUXO"', 'set "RAW=' + RAW + '"', 'set "NAV="', 'for %%P in ("%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" "%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe" "%LOCALAPPDATA%\\Google\\Chrome\\Application\\chrome.exe" "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe" "%ProgramFiles%\\Microsoft\\Edge\\Application\\msedge.exe") do if not defined NAV if exist "%%~P" set "NAV=%%~P"', 'if not defined NAV goto semnav', 'if not exist "%DEST%" mkdir "%DEST%"', '> "%DEST%\\perfil.json" echo {"nivel":"' + p.nivel + '","fps":' + p.fps + ',"esfera":"' + p.esfera + '"}', 'echo Criando atalhos (area de trabalho e menu iniciar)...', 'powershell -NoProfile -ExecutionPolicy Bypass -Command "$w=New-Object -ComObject WScript.Shell; foreach($d in @([Environment]::GetFolderPath(\'Desktop\'),[Environment]::GetFolderPath(\'Programs\'))){ $s=$w.CreateShortcut($d+\'\\ALMAFLUXO.lnk\'); $s.TargetPath=\'%NAV%\'; $s.Arguments=\'' + args + '\'; $s.IconLocation=\'%NAV%,0\'; $s.Description=\'ALMAFLUXO\'; $s.Save() }"', 'if errorlevel 1 goto falhaatalho'];
    if (modoTv) {
      L.push('echo Configurando para iniciar junto com o Windows...');
      L.push('powershell -NoProfile -ExecutionPolicy Bypass -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut([Environment]::GetFolderPath(\'Startup\')+\'\\ALMAFLUXO.lnk\'); $s.TargetPath=\'%NAV%\'; $s.Arguments=\'' + args + '\'; $s.Save()"');
    }
    L.push('echo.', 'choice /c SN /m "Instalar o agente local para USB e Wi-Fi (precisa de Python)"', 'if errorlevel 2 goto desinst', 'where python >nul 2>nul', 'if errorlevel 1 goto sempy', 'powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -UseBasicParsing \'%RAW%scripts/agente/almafluxo_agente.py\' -OutFile \'%DEST%\\almafluxo_agente.py\'"', 'if errorlevel 1 goto falhaag', 'python -m pip install --user --quiet pyserial', '> "%DEST%\\Agente.cmd" echo @python "%DEST%\\almafluxo_agente.py"', 'echo Agente instalado. Para usar: execute %DEST%\\Agente.cmd', 'goto desinst', ':desinst', '> "%DEST%\\Desinstalar.cmd" echo @echo off', '>> "%DEST%\\Desinstalar.cmd" echo powershell -NoProfile -Command "foreach($f in \'Desktop\',\'Programs\',\'Startup\'){Remove-Item ([Environment]::GetFolderPath($f)+\'\\ALMAFLUXO.lnk\') -ErrorAction SilentlyContinue}"', '>> "%DEST%\\Desinstalar.cmd" echo cd /d "%TEMP%"', '>> "%DEST%\\Desinstalar.cmd" echo rmdir /s /q "%DEST%"', 'echo.', 'echo Instalacao concluida. Abrindo o ALMAFLUXO...', 'start "" "%NAV%" ' + args, 'timeout /t 4 >nul', 'exit /b 0', ':semnav', 'echo Nao encontrei o Google Chrome nem o Microsoft Edge.', 'echo Instale um deles e execute este arquivo novamente.', 'pause', 'exit /b 1', ':falhaatalho', 'echo Nao foi possivel criar os atalhos. Abra o endereco ' + URL_TOTEM + ' no navegador.', 'pause', 'exit /b 1', ':sempy', 'echo Python nao encontrado. Instale em python.org e execute este arquivo de novo para o agente.', 'goto desinst', ':falhaag', 'echo Nao foi possivel baixar o agente. Verifique a conexao com a internet.', 'goto desinst');
    return L.join('\r\n') + '\r\n';
  }
  function shLinux(res, modoTv) {
    var args = argsNavegador(res && res.perfil, modoTv);
    return ['#!/bin/sh', 'NAV=""', 'for n in google-chrome-stable google-chrome chromium chromium-browser microsoft-edge; do', '  if command -v "$n" >/dev/null 2>&1; then NAV=$(command -v "$n"); break; fi', 'done', 'if [ -z "$NAV" ]; then echo "Instale o Google Chrome ou o Chromium e execute de novo."; exit 1; fi', 'mkdir -p "$HOME/.local/share/applications"', 'F="$HOME/.local/share/applications/almafluxo.desktop"', 'cat > "$F" <<EOF2', '[Desktop Entry]', 'Type=Application', 'Name=ALMAFLUXO', 'Exec=$NAV ' + args, 'Icon=web-browser', 'Terminal=false', 'Categories=Network;AudioVideo;', 'EOF2', 'chmod +x "$F"', 'D="$(xdg-user-dir DESKTOP 2>/dev/null || echo "$HOME/Desktop")"', 'if [ -d "$D" ]; then cp "$F" "$D/ALMAFLUXO.desktop"; chmod +x "$D/ALMAFLUXO.desktop"; fi', 'echo "ALMAFLUXO instalado. Procure por ALMAFLUXO no menu de aplicativos."', ''].join('\n');
  }
  function pacotePublicado(_x) {
    return _pacotePublicado.apply(this, arguments);
  }
  function _pacotePublicado() {
    _pacotePublicado = _asyncToGenerator(_regenerator().m(function _callee(alvo) {
      var r, j, l, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return fetch('/distribuicao/pacotes.json', {
              cache: 'no-store'
            });
          case 1:
            r = _context.v;
            if (r.ok) {
              _context.n = 2;
              break;
            }
            return _context.a(2, null);
          case 2:
            _context.n = 3;
            return r.json();
          case 3:
            j = _context.v;
            l = (j.pacotes || []).filter(function (p) {
              return p && p.alvo === alvo;
            });
            return _context.a(2, l.length ? l[l.length - 1] : null);
          case 4:
            _context.p = 4;
            _t = _context.v;
            return _context.a(2, null);
        }
      }, _callee, null, [[0, 4]]);
    }));
    return _pacotePublicado.apply(this, arguments);
  }
  var FAVORITOS = ['Opção mais simples (funciona em qualquer TV): abra o navegador da TV, digite almafluxo.uk/conversa/instalacao, e adicione a página aos favoritos (menu do navegador, ícone de estrela ou "Adicionar aos favoritos").', 'Se o menu do navegador oferecer "Adicionar à tela inicial" ou "Fixar", use essa opção: ela cria o atalho na lista de aplicativos.'];
  function guiaTv(_x2) {
    return _guiaTv.apply(this, arguments);
  }
  function _guiaTv() {
    _guiaTv = _asyncToGenerator(_regenerator().m(function _callee2(alvo) {
      var pac, arq, passos, titulo;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return pacotePublicado(alvo);
          case 1:
            pac = _context2.v;
            arq = pac && pac.arquivo ? RAW + 'distribuicao/pacotes/' + pac.arquivo : null;
            passos = [].concat(FAVORITOS);
            titulo = '';
            if (alvo === 'webos') {
              titulo = 'TV LG (webOS): instalar como aplicativo na tela inicial';
              passos.push('Para o ícone ao lado de Netflix e YouTube é preciso instalar um aplicativo. Isso exige um computador na mesma rede da TV, uma vez só.', '1. Na TV, instale o aplicativo "Developer Mode" (LG Content Store), abra, ligue "Dev Mode Status" e anote o endereço IP e a senha (Key Server).', '2. No computador: npm install -g @webosose/ares-cli', '3. ares-setup-device --add tv --info "{\'host\':\'IP_DA_TV\',\'port\':\'9922\',\'username\':\'prisoner\'}"', '4. ares-novacom --device tv --getkey   (digite a senha da TV)', arq ? '5. Baixe o pacote: ' + arq : '5. O pacote ainda não está publicado: gere com ares-package a partir de plataformas/webos.', '6. ares-install --device tv almafluxo-webos.ipk', '7. O ALMAFLUXO aparece na lista de aplicativos da tela inicial.');
            } else if (alvo === 'tizen') {
              titulo = 'TV Samsung (Tizen): instalar como aplicativo na tela inicial';
              passos.push('A Samsung só instala aplicativos assinados. É preciso o Tizen Studio no computador e um certificado Samsung para a sua TV.', '1. Na TV: Apps, digite 12345, ligue Developer mode e informe o IP do computador.', arq ? '2. Baixe o projeto: ' + arq + ' e importe no Tizen Studio (File > Import).' : '2. Importe o projeto de plataformas/tizen no Tizen Studio.', '3. Crie o certificado em Certificate Manager (Samsung) com o DUID da TV.', '4. Conecte a TV no Device Manager e use Run As > Tizen Web Application.', '5. O ALMAFLUXO aparece na lista de aplicativos da tela inicial.');
            } else {
              titulo = 'Android TV / Fire TV: instalar como aplicativo';
              passos.push('O aplicativo é criado a partir do endereço do ALMAFLUXO e instalado por APK.', '1. No computador, abra pwabuilder.com, informe ' + URL_TOTEM + ' e gere o pacote Android (APK).', '2. Envie o APK para a TV pelo aplicativo "Downloader" (Fire TV e Android TV) ou por adb install.', '3. Android TV pode ocultar aplicativos sem selo de TV: use o "Sideload Launcher" para abri-lo.');
            }
            return _context2.a(2, {
              ok: true,
              tipo: 'guia',
              titulo: titulo,
              passos: passos,
              msg: titulo + '. O passo a passo foi listado abaixo.'
            });
        }
      }, _callee2);
    }));
    return _guiaTv.apply(this, arguments);
  }
  function pwa() {
    return _pwa.apply(this, arguments);
  }
  function _pwa() {
    _pwa = _asyncToGenerator(_regenerator().m(function _callee3() {
      var r, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!promptPWA) {
              _context3.n = 4;
              break;
            }
            _context3.p = 1;
            promptPWA.prompt();
            _context3.n = 2;
            return promptPWA.userChoice;
          case 2:
            r = _context3.v;
            promptPWA = null;
            return _context3.a(2, {
              ok: r && r.outcome === 'accepted',
              tipo: 'pwa',
              passos: [],
              msg: r && r.outcome === 'accepted' ? 'ALMAFLUXO instalado como aplicativo.' : 'Instalação cancelada.'
            });
          case 3:
            _context3.p = 3;
            _t2 = _context3.v;
          case 4:
            return _context3.a(2, null);
        }
      }, _callee3, null, [[1, 3]]);
    }));
    return _pwa.apply(this, arguments);
  }
  var GUIA_NAV = {
    android: ['Abra o menu do Chrome (três pontos).', 'Toque em "Instalar aplicativo" ou "Adicionar à tela inicial".', 'O ícone do ALMAFLUXO aparece na tela inicial.'],
    ios: ['Abra esta página no Safari.', 'Toque em Compartilhar.', 'Escolha "Adicionar à Tela de Início".'],
    mac: ['No Chrome ou Edge: menu > "Instalar ALMAFLUXO".', 'No Safari: Arquivo > "Adicionar ao Dock".'],
    desconhecida: FAVORITOS
  };
  function executar(_x3) {
    return _executar.apply(this, arguments);
  }
  function _executar() {
    _executar = _asyncToGenerator(_regenerator().m(function _callee4(res) {
      var p, modoTv, ok, _ok, r;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            p = plataforma();
            modoTv = false;
            if (!(p === 'windows')) {
              _context4.n = 1;
              break;
            }
            ok = baixar('ALMAFLUXO-Instalar.cmd', cmdWindows(res, modoTv));
            return _context4.a(2, {
              ok: ok,
              tipo: 'arquivo',
              msg: ok ? 'Instalador gerado para este computador: ALMAFLUXO-Instalar.cmd. Abra o arquivo baixado (se o Windows avisar, escolha Mais informações > Executar assim mesmo).' : 'O navegador bloqueou o download.',
              passos: ok ? ['Abra a pasta Downloads e dê dois cliques em ALMAFLUXO-Instalar.cmd.', 'O instalador localiza o Chrome ou Edge, cria os atalhos e abre o ALMAFLUXO.', 'Para remover: %LOCALAPPDATA%\\ALMAFLUXO\\Desinstalar.cmd'] : FAVORITOS
            });
          case 1:
            if (!(p === 'linux')) {
              _context4.n = 2;
              break;
            }
            _ok = baixar('almafluxo-instalar.sh', shLinux(res, modoTv));
            return _context4.a(2, {
              ok: _ok,
              tipo: 'arquivo',
              msg: _ok ? 'Instalador gerado: almafluxo-instalar.sh.' : 'O navegador bloqueou o download.',
              passos: _ok ? ['Abra um terminal na pasta Downloads.', 'Execute: sh almafluxo-instalar.sh', 'Procure ALMAFLUXO no menu de aplicativos.'] : FAVORITOS
            });
          case 2:
            if (!(p === 'webos' || p === 'tizen' || p === 'android-tv')) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2, guiaTv(p));
          case 3:
            _context4.n = 4;
            return pwa();
          case 4:
            r = _context4.v;
            if (!r) {
              _context4.n = 5;
              break;
            }
            return _context4.a(2, r);
          case 5:
            return _context4.a(2, {
              ok: true,
              tipo: 'guia',
              msg: 'Siga os passos abaixo para instalar neste aparelho.',
              passos: GUIA_NAV[p] || GUIA_NAV.desconhecida
            });
        }
      }, _callee4);
    }));
    return _executar.apply(this, arguments);
  }
  window.AFPacote = {
    executar: executar,
    cmdWindows: cmdWindows,
    shLinux: shLinux,
    guiaTv: guiaTv
  };
})();