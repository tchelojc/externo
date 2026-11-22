function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  'use strict';
  var BASE = 'https://almafluxo.uk/conversa/instalacao/';
  var PACOTES_URL = BASE + 'distribuicao/pacotes.json';
  var STORAGE = 'AF_AMBIENTE_RENDERIZACAO_V1';
  var PERFIL_STORAGE = 'AF_PERFIL_TOTEM_V1';
  var TOTEM_URL = 'https://almafluxo.uk/conversa';
  function guardaNavegacao() {
    try {
      var agora = Date.now();
      var log = JSON.parse(sessionStorage.getItem('AF_NAV_LOG') || '[]').filter(function (t) {
        return agora - t < 20000;
      });
      log.push(agora);
      sessionStorage.setItem('AF_NAV_LOG', JSON.stringify(log));
      return log.length <= 3;
    } catch (e) {
      return true;
    }
  }
  var MSG_LOOP = 'Várias aberturas seguidas detectadas (possível loop). Aguarde 20 segundos e use "Executar totem completo".';
  var janela = null;
  var frame = null;
  var status = null;
  addEventListener('appinstalled', function () {
    try {
      AFEstado.set({
        instalado: true,
        instaladoEm: Date.now()
      });
    } catch (e) {
      console.warn('[AFInst]', e);
    }
  });
  var GUIA = {
    tizen: ['Use o pacote nativo Tizen quando disponível.', 'Para navegação adaptativa, utilize um navegador compatível.', 'A execução automática depende do suporte do fabricante.'],
    webos: ['Use o pacote nativo webOS quando disponível.', 'Verifique a compatibilidade do navegador da televisão.', 'A execução automática depende do modelo.'],
    'android-tv': ['Use o navegador compatível ou o pacote Android TV.', 'A janela adaptativa funciona dentro do navegador.', 'Um APK pode oferecer integração nativa adicional.'],
    windows: ['Use o PWA quando disponível.', 'A janela adaptativa pode abrir os endereços do ecossistema.', 'Um executável nativo exige um pacote próprio.'],
    linux: ['Use o PWA ou navegador compatível.', 'A janela adaptativa utiliza os endereços existentes.'],
    outras: ['Abra o portal em um navegador compatível.', 'A janela adaptativa verifica o suporte de incorporação.']
  };
  function validarDestino(destino) {
    if (typeof destino !== 'string' || !destino) return null;
    try {
      var url = new URL(destino, location.origin);
      if (url.origin !== location.origin) return null;
      if (!/^\/[\w./-]*$/.test(url.pathname)) return null;
      if (url.pathname.startsWith('//')) return null;
      return url.pathname;
    } catch (e) {
      return null;
    }
  }
  function obterEsperaTotem() {
    return _obterEsperaTotem.apply(this, arguments);
  }
  function _obterEsperaTotem() {
    _obterEsperaTotem = _asyncToGenerator(_regenerator().m(function _callee() {
      var _j$comunicacao, r, j, n, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return fetch(PACOTES_URL, {
              cache: 'no-store',
              credentials: 'same-origin'
            });
          case 1:
            r = _context.v;
            if (r.ok) {
              _context.n = 2;
              break;
            }
            throw new Error('HTTP ' + r.status);
          case 2:
            _context.n = 3;
            return r.json();
          case 3:
            j = _context.v;
            n = Number(j === null || j === void 0 || (_j$comunicacao = j.comunicacao) === null || _j$comunicacao === void 0 || (_j$comunicacao = _j$comunicacao.totem) === null || _j$comunicacao === void 0 ? void 0 : _j$comunicacao.espera_s);
            return _context.a(2, Number.isFinite(n) && n >= 1 ? Math.min(n, 300) : 45);
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.warn('[AFInst] Espera padrão:', _t);
            return _context.a(2, 45);
        }
      }, _callee, null, [[0, 4]]);
    }));
    return _obterEsperaTotem.apply(this, arguments);
  }
  function perfilAtual() {
    return window.AFPerfilInstalacao || window.AFDiagnosticoAdaptativo || null;
  }
  function diagnosticar() {
    return _diagnosticar.apply(this, arguments);
  }
  function _diagnosticar() {
    _diagnosticar = _asyncToGenerator(_regenerator().m(function _callee2() {
      var atual, resultado;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            atual = perfilAtual();
            if (!(atual !== null && atual !== void 0 && atual.perfil && atual !== null && atual !== void 0 && atual.nivel)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, atual);
          case 1:
            if (window.AFAdaptador) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, null);
          case 2:
            _context2.n = 3;
            return window.AFAdaptador.executar();
          case 3:
            resultado = _context2.v;
            if (resultado !== null && resultado !== void 0 && resultado.perfil) {
              window.AFPerfilInstalacao = resultado;
            }
            return _context2.a(2, resultado);
        }
      }, _callee2);
    }));
    return _diagnosticar.apply(this, arguments);
  }
  function salvarPerfilTotem(resultado) {
    if (!resultado) return false;
    try {
      var _resultado$perfil, _resultado$perfil2, _resultado$perfil3, _resultado$perfil4, _resultado$perfil5;
      var dados = {
        versao: 1,
        perfil: resultado.nivel || 'equilibrado',
        fps: ((_resultado$perfil = resultado.perfil) === null || _resultado$perfil === void 0 ? void 0 : _resultado$perfil.fps) || 30,
        imagem: ((_resultado$perfil2 = resultado.perfil) === null || _resultado$perfil2 === void 0 ? void 0 : _resultado$perfil2.imagem) || 'media',
        animacoes: ((_resultado$perfil3 = resultado.perfil) === null || _resultado$perfil3 === void 0 ? void 0 : _resultado$perfil3.animacoes) !== false,
        efeitos: ((_resultado$perfil4 = resultado.perfil) === null || _resultado$perfil4 === void 0 ? void 0 : _resultado$perfil4.efeitos) !== false,
        esfera: ((_resultado$perfil5 = resultado.perfil) === null || _resultado$perfil5 === void 0 ? void 0 : _resultado$perfil5.esfera) || '2d',
        registradoEm: Date.now()
      };
      localStorage.setItem(PERFIL_STORAGE, JSON.stringify(dados));
      return true;
    } catch (e) {
      console.warn('[AFInst] Perfil não persistido:', e);
      return false;
    }
  }
  function criarEstilo() {
    if (document.getElementById('af-render-style')) return;
    var css = document.createElement('style');
    css.id = 'af-render-style';
    css.textContent = "\n    #af-render-window{\n      position:fixed;\n      top:0;right:0;bottom:0;left:0;\n      z-index:2147483000;\n      display:flex;\n      flex-direction:column;\n      background:#080d18;\n      color:#fff;\n      font:14px Arial,sans-serif;\n    }\n\n    #af-render-toolbar{\n      min-height:46px;\n      display:flex;\n      align-items:center;\n      gap:8px;\n      padding:5px 10px;\n      background:#101b2b;\n      flex-wrap:wrap;\n    }\n\n    #af-render-toolbar button{\n      border:1px solid #40516a;\n      border-radius:7px;\n      background:#1b2c42;\n      color:white;\n      padding:8px 12px;\n      cursor:pointer;\n    }\n\n    #af-render-status{\n      margin-left:auto;\n      font-size:11px;\n      opacity:.8;\n    }\n\n    #af-render-frame{\n      width:100%;\n      height:100%;\n      flex:1;\n      border:0;\n      background:#080d18;\n    }\n  ";
    document.head.appendChild(css);
  }
  function criarJanela() {
    if (janela && frame) return;
    criarEstilo();
    janela = document.createElement('section');
    janela.id = 'af-render-window';
    var barra = document.createElement('nav');
    barra.id = 'af-render-toolbar';
    var titulo = document.createElement('strong');
    titulo.textContent = 'ALMAFLUXO';
    function botao(nome, acao) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = nome;
      b.addEventListener('click', acao);
      return b;
    }
    barra.append(titulo, botao('Início', function () {
      abrir('/');
    }), botao('Totem', function () {
      abrir('/conversa');
    }), botao('Voltar', function () {
      try {
        frame.contentWindow.history.back();
      } catch (e) {
        console.warn('[AFInst] Histórico:', e);
      }
    }), botao('Abrir direto', function () {
      location.assign(TOTEM_URL);
    }), botao('Fechar', fechar));
    status = document.createElement('span');
    status.id = 'af-render-status';
    status.textContent = 'Preparando renderização...';
    barra.appendChild(status);
    frame = document.createElement('iframe');
    frame.id = 'af-render-frame';
    frame.title = 'Navegação ALMAFLUXO';
    frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    frame.addEventListener('load', function () {
      adaptarFrame();
      try {
        var d = frame.contentDocument;
        if (d && d.body && !d.body.childElementCount && status) {
          status.textContent = 'Página vazia no renderizador. Use "Abrir direto".';
        }
      } catch (e) {}
    });
    janela.append(barra, frame);
    document.body.appendChild(janela);
  }
  function adaptarFrame() {
    if (!frame) return;
    var resultado = perfilAtual();
    if (!resultado || !resultado.perfil) return;
    var nivel = resultado.nivel || 'equilibrado';
    var p = resultado.perfil;
    if (status) {
      status.textContent = 'Perfil ' + nivel + ' · Meta ' + p.fps + ' FPS';
    }
    try {
      var doc = frame.contentDocument;
      if (!doc || !doc.documentElement) {
        throw new Error('Documento incorporado indisponível.');
      }
      var root = doc.documentElement;
      root.dataset.afDesempenho = nivel;
      root.style.setProperty('--af-fps', p.fps);
      root.style.setProperty('--af-frame-ms', Math.round(1000 / p.fps) + 'ms');
      var head = doc.head;
      if (!head) {
        head = doc.createElement('head');
        doc.documentElement.insertBefore(head, doc.documentElement.firstChild);
      }
      var css = doc.getElementById('af-adaptacao-injetada');
      if (!css) {
        css = doc.createElement('style');
        css.id = 'af-adaptacao-injetada';
        head.appendChild(css);
      }
      css.textContent = "\n      ".concat(!p.animacoes ? "\n        *,*::before,*::after{\n          animation:none!important;\n          transition:none!important;\n          scroll-behavior:auto!important;\n        }\n      " : '', "\n\n      ").concat(!p.efeitos ? "\n        *{\n          backdrop-filter:none!important;\n        }\n      " : '', "\n    ");
      var evento = new doc.defaultView.CustomEvent('af:perfil-adaptativo', {
        detail: resultado
      });
      doc.defaultView.dispatchEvent(evento);
    } catch (e) {
      if (status) {
        status.textContent = 'Adaptação limitada pelo navegador.';
      }
      console.warn('[AFInst] Não foi possível adaptar o frame:', e);
    }
  }
  function renderizar(destino) {
    if (window.top !== window) {
      return {
        ok: false,
        msg: 'Já está dentro do renderizador; abertura aninhada evitada.'
      };
    }
    if (!guardaNavegacao()) {
      return {
        ok: false,
        msg: MSG_LOOP
      };
    }
    var caminho = validarDestino(destino);
    if (!caminho) {
      return {
        ok: false,
        msg: 'Destino inválido para o renderizador.'
      };
    }
    criarJanela();
    var url = 'https://almafluxo.uk' + caminho;
    janela.style.display = 'flex';
    if (status) {
      status.textContent = 'Carregando ' + caminho + '...';
    }
    if (frame.getAttribute('src') !== url) {
      frame.setAttribute('src', url);
    } else {
      adaptarFrame();
    }
    return {
      ok: true,
      msg: 'Endereço aberto pelo renderizador ALMAFLUXO.'
    };
  }
  function abrir(_x) {
    return _abrir.apply(this, arguments);
  }
  function _abrir() {
    _abrir = _asyncToGenerator(_regenerator().m(function _callee3(destino) {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            return _context3.a(2, renderizar(destino || '/conversa'));
        }
      }, _callee3);
    }));
    return _abrir.apply(this, arguments);
  }
  function abrirDireto() {
    return _abrirDireto.apply(this, arguments);
  }
  function _abrirDireto() {
    _abrirDireto = _asyncToGenerator(_regenerator().m(function _callee4() {
      var resultado, _t2;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            if (status) {
              status.textContent = 'Analisando dispositivo...';
            }
            _context4.n = 1;
            return diagnosticar();
          case 1:
            resultado = _context4.v;
            if (resultado) {
              salvarPerfilTotem(resultado);
            }
            if (guardaNavegacao()) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2, {
              ok: false,
              msg: MSG_LOOP
            });
          case 2:
            location.assign(TOTEM_URL);
            return _context4.a(2, {
              ok: true,
              msg: 'Diagnóstico concluído. Abrindo Totem diretamente.'
            });
          case 3:
            _context4.p = 3;
            _t2 = _context4.v;
            console.error('[AFInst] Diagnóstico do Totem:', _t2);
            return _context4.a(2, {
              ok: false,
              msg: 'Falha no diagnóstico: ' + _t2.message
            });
        }
      }, _callee4, null, [[0, 3]]);
    }));
    return _abrirDireto.apply(this, arguments);
  }
  function executarCompleto() {
    location.assign(TOTEM_URL);
    return {
      ok: true,
      msg: 'Abrindo Totem completo diretamente.'
    };
  }
  function fechar() {
    if (janela) {
      janela.style.display = 'none';
    }
  }
  function instalar() {
    return _instalar.apply(this, arguments);
  }
  function _instalar() {
    _instalar = _asyncToGenerator(_regenerator().m(function _callee5() {
      var adaptacao, configuracao, persistido, _t3, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            status = null;
            criarJanela();
            janela.style.display = 'none';
            _context5.n = 1;
            return diagnosticar();
          case 1:
            adaptacao = _context5.v;
            if (adaptacao !== null && adaptacao !== void 0 && adaptacao.perfil) {
              _context5.n = 2;
              break;
            }
            throw new Error('Não foi possível preparar um perfil adaptativo válido.');
          case 2:
            configuracao = {
              versao: 1,
              tipo: 'ambiente-navegacao',
              perfil: adaptacao.nivel,
              fps: adaptacao.perfil.fps,
              imagem: adaptacao.perfil.imagem,
              criadoEm: Date.now()
            };
            persistido = false;
            try {
              localStorage.setItem(STORAGE, JSON.stringify(configuracao));
              persistido = true;
            } catch (e) {
              console.warn('[AFInst] Armazenamento:', e);
            }
            _context5.p = 3;
            if (!window.AFEstado) {
              _context5.n = 4;
              break;
            }
            _context5.n = 4;
            return AFEstado.persistir();
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t3 = _context5.v;
            console.warn('[AFInst] Persistência:', _t3);
          case 6:
            return _context5.a(2, {
              ok: true,
              msg: 'Ambiente ALMAFLUXO preparado. ' + 'Perfil: ' + configuracao.perfil + ' · Meta: ' + configuracao.fps + ' FPS. ' + (persistido ? 'Configuração salva neste navegador.' : 'Configuração mantida nesta sessão.')
            });
          case 7:
            _context5.p = 7;
            _t4 = _context5.v;
            console.error('[AFInst] Instalação:', _t4);
            return _context5.a(2, {
              ok: false,
              msg: 'Falha ao preparar ambiente: ' + ((_t4 === null || _t4 === void 0 ? void 0 : _t4.message) || String(_t4))
            });
        }
      }, _callee5, null, [[3, 5], [0, 7]]);
    }));
    return _instalar.apply(this, arguments);
  }
  function instalado() {
    try {
      return !!localStorage.getItem(STORAGE);
    } catch (e) {
      return false;
    }
  }
  function lerPerfilTotem() {
    try {
      var valor = localStorage.getItem(PERFIL_STORAGE);
      return valor ? JSON.parse(valor) : null;
    } catch (e) {
      return null;
    }
  }
  window.AFInst = {
    guia: function guia(plataforma) {
      return GUIA[plataforma] || GUIA.outras;
    },
    instalar: instalar,
    abrir: abrir,
    abrirDireto: abrirDireto,
    executarCompleto: executarCompleto,
    fechar: fechar,
    renderizar: renderizar,
    adaptarFrame: adaptarFrame,
    instalado: instalado,
    lerPerfilTotem: lerPerfilTotem,
    obterEnderecoTotem: function obterEnderecoTotem() {
      return TOTEM_URL;
    }
  };
})();