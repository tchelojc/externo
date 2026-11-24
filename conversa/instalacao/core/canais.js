function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  'use strict';

  if (window.AFCanais) return;
  var BASE_INSTALACAO = 'https://almafluxo.uk/conversa/instalacao/';
  var URL_CANAIS = BASE_INSTALACAO + 'distribuicao/canais.json';
  var CHAVE_ESTADO = 'almafluxo_instalador';
  var RAW_INSTALACAO = 'https://raw.githubusercontent.com/tchelojc/externo/alma/conversa/instalacao/';
  var PADRAO = {
    espera_conversa_s: 45,
    canais: [{
      id: 'conversa',
      numero: 1,
      nome: 'Conversa',
      tipo: 'totem',
      rota: '/conversa',
      alias: ['/conversa/totem1'],
      login: false
    }, {
      id: 'entrevista',
      numero: 2,
      nome: 'Entrevista',
      tipo: 'video',
      rota: '/conversa/entrevista',
      direto: true,
      login: false
    }, {
      id: 'youtube',
      numero: 3,
      nome: 'YouTube',
      tipo: 'youtube',
      rota: '/conversa/youtube',
      login: false,
      fontes: []
    }, {
      id: 'instagram',
      numero: 4,
      nome: 'Instagram',
      tipo: 'externo',
      rota: '/conversa/instagram',
      url: 'https://www.instagram.com/',
      login: true
    }, {
      id: 'tiktok',
      numero: 5,
      nome: 'TikTok',
      tipo: 'externo',
      rota: '/conversa/tiktok',
      url: 'https://www.tiktok.com/',
      login: true
    }, {
      id: 'facebook',
      numero: 6,
      nome: 'Facebook',
      tipo: 'externo',
      rota: '/conversa/facebook',
      url: 'https://www.facebook.com/',
      login: true
    }, {
      id: 'linkedin',
      numero: 7,
      nome: 'LinkedIn',
      tipo: 'externo',
      rota: '/conversa/linkedin',
      url: 'https://www.linkedin.com/',
      login: true
    }, {
      id: 'twitter',
      numero: 8,
      nome: 'X (Twitter)',
      tipo: 'externo',
      rota: '/conversa/twitter',
      url: 'https://x.com/',
      login: true
    }]
  };
  function carregarCanais() {
    return _carregarCanais.apply(this, arguments);
  }
  function _carregarCanais() {
    _carregarCanais = _asyncToGenerator(_regenerator().m(function _callee() {
      var urls, _i, _urls, u, r, j, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            urls = [BASE_INSTALACAO + 'distribuicao/canais.json', RAW_INSTALACAO + 'distribuicao/canais.json'];
            _i = 0, _urls = urls;
          case 1:
            if (!(_i < _urls.length)) {
              _context.n = 9;
              break;
            }
            u = _urls[_i];
            _context.p = 2;
            _context.n = 3;
            return fetch(u, {
              cache: 'no-store'
            });
          case 3:
            r = _context.v;
            if (r.ok) {
              _context.n = 4;
              break;
            }
            return _context.a(3, 8);
          case 4:
            _context.n = 5;
            return r.json();
          case 5:
            j = _context.v;
            if (!(j && Array.isArray(j.canais) && j.canais.length)) {
              _context.n = 6;
              break;
            }
            j.origem = u;
            return _context.a(2, j);
          case 6:
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
          case 8:
            _i++;
            _context.n = 1;
            break;
          case 9:
            return _context.a(2, Object.assign({
              origem: 'padrao'
            }, PADRAO));
        }
      }, _callee, null, [[2, 7]]);
    }));
    return _carregarCanais.apply(this, arguments);
  }
  function normalizarRota(rota) {
    try {
      if (typeof rota !== 'string' || !rota.trim()) return null;
      var u = new URL(rota, location.origin);
      if (u.origin !== location.origin) return null;
      if (!/^\/[\w./-]*$/.test(u.pathname)) return null;
      if (u.pathname.startsWith('//')) return null;
      return u.pathname;
    } catch (e) {
      return null;
    }
  }
  function decidir(c, ctx) {
    if (c.login && !ctx.logado) {
      return {
        tipo: 'login',
        rota: '/conversa/instalacao/'
      };
    }
    if (c.tipo !== 'totem' && !c.direto && !ctx.vista) {
      return {
        tipo: 'conversa',
        rota: '/conversa/',
        proximo: c.rota
      };
    }
    return {
      tipo: 'ir',
      rota: c.rota
    };
  }
  var vizinho = function vizinho(L, i, d) {
    return L.length ? L[((i < 0 ? d > 0 ? -1 : 0 : i) + d + L.length) % L.length] : null;
  };
  var logado = function logado() {
    try {
      return !!JSON.parse(localStorage.getItem('almafluxo_usuario') || 'null');
    } catch (e) {
      return false;
    }
  };
  var vista = function vista() {
    try {
      return !!sessionStorage.getItem('af_conversa_vista');
    } catch (e) {
      return false;
    }
  };
  window.AFCanais = {
    decidir: decidir,
    vizinho: vizinho
  };
  if (typeof document === 'undefined') return;
  var L = [];
  var cfg = {};
  var num = '';
  var tn = null;
  var pn = null;
  var etiquetaCanal = null;
  var avisoElemento = null;
  var K = CHAVE_ESTADO;
  function janelaAberta() {
    try { return !!(window.AFInst && window.AFInst.janelaAberta && window.AFInst.janelaAberta()); } catch (e) { return false; }
  }
  function quadroWin() {
    try { var q = window.AFInst && window.AFInst.quadro && window.AFInst.quadro(); return q && q.contentWindow || null; } catch (e) { return null; }
  }
  function caminhoAtual() {
    try {
      if (janelaAberta()) { var w = quadroWin(); if (w) return (w.location.pathname || '').replace(/\/+$/, '') || '/'; }
    } catch (e) {}
    return location.pathname.replace(/\/+$/, '') || '/';
  }
  var cur = function cur() {
    var atual = caminhoAtual();
    return L.findIndex(function (c) {
      return [c.rota].concat(c.alias || []).some(function (r) {
        var rota = normalizarRota(r);
        return rota && (rota.replace(/\/+$/, '') || '/') === atual;
      });
    });
  };
  var rotulo = function rotulo() {
    var c = L[cur()];
    return c ? c.numero + ' · ' + c.nome : 'CH';
  };
  function aviso(t) {
    if (!avisoElemento) {
      avisoElemento = document.createElement('div');
      avisoElemento.style.cssText = 'position:fixed;left:50%;bottom:8%;' + 'transform:translateX(-50%);z-index:2147483200;' + 'background:#06122cf2;color:#fff;' + 'border:1px solid #27c8ff;border-radius:12px;' + 'padding:12px 18px;font:16px system-ui';
      document.body.appendChild(avisoElemento);
    }
    avisoElemento.textContent = t;
    avisoElemento.style.display = 'block';
    clearTimeout(avisoElemento._t);
    avisoElemento._t = setTimeout(function () {
      avisoElemento.style.display = 'none';
    }, 3500);
  }
  function atualizarRotulo() {
    if (etiquetaCanal) {
      etiquetaCanal.textContent = rotulo();
    }
    document.querySelectorAll('[data-ctl="canal-nome"]').forEach(function (e) {
      var r = rotulo();
      if (e.textContent !== r) e.textContent = r;
    });
  }
  var contagem = null;
  function marcarVista() {
    try {
      sessionStorage.setItem('af_conversa_vista', '1');
    } catch (e) {}
  }
  function limparContagem() {
    if (contagem) {
      clearInterval(contagem.t);
      contagem = null;
    }
    if (avisoElemento) avisoElemento.style.display = 'none';
  }
  function navegar(rota, topo) {
    if (!topo && janelaAberta()) {
      Promise.resolve(window.AFInst.abrir(rota, { semControle: true })).then(function (r) {
        if (r && r.ok === false) aviso(r.msg || 'Não foi possível abrir o canal.');
      });
      return;
    }
    location.href = rota;
  }
  function esperarConversa(c, destino) {
    var espera = Number(cfg.espera_conversa_s);
    var total = Number.isFinite(espera) && espera >= 1 && espera <= 300 ? espera : 45;
    var falta = function falta() {
      return Math.ceil(total - performance.now() / 1000);
    };
    if (falta() <= 0) {
      marcarVista();
      navegar(destino);
      return;
    }
    limparContagem();
    var texto = function texto() {
      return 'Abrindo ' + c.nome + ' em ' + Math.max(0, falta()) + ' s (a conversa vem primeiro)';
    };
    aviso(texto());
    if (avisoElemento) clearTimeout(avisoElemento._t);
    contagem = {
      t: setInterval(function () {
        if (falta() <= 0) {
          limparContagem();
          marcarVista();
          navegar(destino);
          return;
        }
        aviso(texto());
        if (avisoElemento) clearTimeout(avisoElemento._t);
      }, 500)
    };
  }
  function irAgora(c) {
    if (!c) {
      aviso('Lista de canais indisponível. Recarregue a página.');
      return;
    }
    var destino = normalizarRota(c.rota);
    if (!destino) {
      aviso('Rota do canal inválida ou não permitida.');
      return;
    }
    var d = decidir(c, {
      logado: logado(),
      vista: vista()
    });
    var atualCanal = L[cur()];
    if (d.tipo === 'conversa' && atualCanal && atualCanal.tipo === 'totem') {
      esperarConversa(c, destino);
      return;
    }
    limparContagem();
    var rotaDestino = d.rota;
    if (d.tipo === 'conversa') {
      rotaDestino = '/conversa/';
    } else if (d.tipo === 'login') {
      rotaDestino = '/conversa/instalacao/';
    } else {
      rotaDestino = destino;
    }
    try {
      var s = JSON.parse(localStorage.getItem(K) || '{}');
      if (d.tipo === 'conversa') {
        s.proximo = destino;
        s.ultimaAbertura = Date.now();
        var espera = Number(cfg.espera_conversa_s);
        s.esperaTotem = Number.isFinite(espera) && espera >= 1 && espera <= 300 ? espera : 45;
      }
      if (d.tipo === 'ir' && logado()) {
        s.ultimoCanal = destino;
      }
      localStorage.setItem(K, JSON.stringify(s));
    } catch (e) {
      aviso('Não foi possível salvar o estado da navegação.');
      return;
    }
    if (d.tipo === 'login') {
      aviso('O canal ' + c.nome + ' exige login no ALMAFLUXO. Abrindo o cadastro…');
    }
    setTimeout(function () {
      navegar(rotaDestino, d.tipo === 'login');
    }, d.tipo === 'login' ? 1200 : 0);
  }
  // ── Troca de canal SÓ ao fim do ciclo (quando o quadro informa ciclo) ──
  var pendenteCanal = null, tPend = null, cicloAtivo = false, ultimoFim = 0;
  function ir(c) {
    if (!c) { irAgora(c); return; }
    if (!(cicloAtivo && janelaAberta())) { irAgora(c); return; }
    if (L[cur()] === c) { aviso('Você já está em ' + c.nome); return; }
    pendenteCanal = c;
    clearTimeout(tPend);
    var max = Number(cfg.ciclo_max_s);
    max = Number.isFinite(max) && max >= 30 && max <= 3600 ? max : 900;
    tPend = setTimeout(function () { fimDeCiclo('limite'); }, max * 1000);
    aviso('Canal ' + c.numero + ' · ' + c.nome + ' entra quando o ciclo terminar');
    atualizarPainel();
  }
  function fimDeCiclo() {
    var agora = Date.now();
    if (agora - ultimoFim < 1000) return;
    ultimoFim = agora;
    clearTimeout(tPend);
    var c = pendenteCanal; pendenteCanal = null;
    atualizarPainel();
    if (c) irAgora(c);
    if (window.AFControle) { try { window.AFControle.fimDeCiclo(); } catch (e) {} }
  }
  var mover = function mover(d) {
    return ir(vizinho(L, cur(), d));
  };
  var pelaNumero = function pelaNumero(n) {
    var c = L.find(function (x) {
      return String(x.numero) === String(n);
    });
    if (c) {
      ir(c);
    } else {
      aviso('Canal ' + n + ' não existe');
    }
  };
  // ═════════ Painel de controle: ESCONDIDO; quando aparece, fica no CENTRO ═════════
  var painel = null, boxQR = null, lblCodigo = null, lblStatus = null, lblPend = null, boxLista = null;
  var tPainel = null, querAberto = false, controleCarregado = null, controleIniciado = false;
  var estiloBtn = 'font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:10px;padding:12px 14px;cursor:pointer;min-height:44px';
  function btn(t, f, a) {
    var x = document.createElement('button');
    x.type = 'button'; x.textContent = t; x.setAttribute('aria-label', a || t);
    x.style.cssText = estiloBtn; x.onclick = f;
    return x;
  }
  function painelAberto() { return !!painel && painel.style.display !== 'none'; }
  function reiniciarAutoOcultar() {
    clearTimeout(tPainel);
    tPainel = setTimeout(fecharPainel, 30000);
  }
  function montarPainel() {
    if (painel) return;
    painel = document.createElement('div');
    painel.id = 'af-canais-painel';
    painel.setAttribute('role', 'dialog');
    painel.setAttribute('aria-label', 'Controle de canais');
    painel.style.cssText = 'position:fixed;z-index:2147483150;left:50%;top:50%;transform:translate(-50%,-50%);display:none;' + 'width:min(92vw,460px);max-height:88vh;overflow:auto;box-sizing:border-box;background:#06122cf5;color:#e8f1ff;' + 'border:1px solid #27c8ff;border-radius:16px;padding:16px;font:16px system-ui;text-align:center;box-shadow:0 12px 48px #000b';
    var t = document.createElement('div');
    t.textContent = 'Canais';
    t.style.cssText = 'font-weight:700;font-size:18px;margin-bottom:8px';
    etiquetaCanal = document.createElement('div');
    etiquetaCanal.style.cssText = 'color:#9fd8ff;margin-bottom:10px';
    var nav = document.createElement('div');
    nav.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px';
    nav.append(btn('‹ CH', function () { mover(-1); }, 'Canal anterior'), btn('CH ›', function () { mover(1); }, 'Próximo canal'));
    boxLista = document.createElement('div');
    boxLista.style.cssText = 'display:grid;gap:6px;margin-bottom:8px';
    lblPend = document.createElement('div');
    lblPend.style.cssText = 'color:#ffd17a;font-size:14px;min-height:18px;margin-bottom:8px';
    var sep = document.createElement('div');
    sep.style.cssText = 'border-top:1px solid #1d4a73;margin:8px 0;padding-top:10px;font-size:14px;color:#b8cbe6';
    sep.textContent = 'Controle pelo telefone — escaneie com a câmera (é preciso estar logado no ALMAFLUXO)';
    boxQR = document.createElement('div');
    boxQR.style.cssText = 'display:flex;justify-content:center;min-height:150px;margin:8px 0';
    lblCodigo = document.createElement('div');
    lblCodigo.style.cssText = 'font:700 20px ui-monospace,monospace;letter-spacing:3px';
    lblStatus = document.createElement('div');
    lblStatus.style.cssText = 'font-size:13px;color:#cfe3ff;min-height:18px;margin:6px 0 10px';
    painel.append(t, etiquetaCanal, nav, boxLista, lblPend, sep, boxQR, lblCodigo, lblStatus, btn('Fechar', fecharPainel, 'Fechar controle'));
    painel.addEventListener('click', reiniciarAutoOcultar);
    painel.addEventListener('keydown', reiniciarAutoOcultar);
    document.body.appendChild(painel);
    montarLista();
  }
  function montarLista() {
    if (!boxLista) return;
    boxLista.replaceChildren();
    L.forEach(function (c) {
      var b = btn(c.numero + ' · ' + c.nome + (c.login ? ' 🔒' : ''), function () { pelaNumero(c.numero); }, 'Canal ' + c.nome);
      b.dataset.numero = String(c.numero);
      b.style.textAlign = 'left';
      boxLista.appendChild(b);
    });
  }
  function atualizarPainel() {
    if (!painel) return;
    atualizarRotulo();
    lblPend.textContent = pendenteCanal ? '⏳ ' + pendenteCanal.nome + ' entra quando o ciclo terminar' : '';
    var atual = L[cur()];
    boxLista && boxLista.querySelectorAll('button').forEach(function (b) {
      b.style.background = atual && String(atual.numero) === b.dataset.numero ? '#1f7bff' : '#0a1d3a';
    });
  }
  function carregarControle() {
    if (window.AFControle) return Promise.resolve(true);
    if (controleCarregado) return controleCarregado;
    controleCarregado = new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = '/conversa/instalacao/core/controle-tv.js';
      s.onload = function () { ok(!!window.AFControle); };
      s.onerror = function () { controleCarregado = null; ok(false); };
      document.head.appendChild(s);
    });
    return controleCarregado;
  }
  function video() {
    try {
      var w = quadroWin(), vs = w ? w.document.querySelectorAll('video') : [];
      for (var k = 0; k < vs.length; k++) if (vs[k].readyState > 0) return vs[k];
    } catch (e) {}
    return null;
  }
  function comEntrevista(fn, generico) {
    return function (arg) {
      var w = quadroWin();
      if (w && w.AFEntrevista) return void w.AFEntrevista[fn](arg);
      var v = video();
      return v && generico ? void generico(v, arg) : 'nao_suportado';
    };
  }
  function iniciarControle() {
    if (controleIniciado) return;
    controleIniciado = true;
    window.AFControle.iniciar({
      canal: 'instalacao',
      imediatos: ['vel', 'pular', 'prox', 'ant', 'alternar'],
      cicloAtivo: function () { return cicloAtivo && janelaAberta(); },
      cicloMaxMs: (Number(cfg.ciclo_max_s) >= 30 ? Number(cfg.ciclo_max_s) : 900) * 1000,
      comandos: {
        canal: function (id) {
          var c = L.find(function (x) { return x.id === id; });
          if (!c) return 'canal_desconhecido';
          irAgora(c);
        },
        prox: comEntrevista('prox'),
        ant: comEntrevista('ant'),
        alternar: comEntrevista('alternar', function (v) { if (v.paused) v.play(); else v.pause(); }),
        vel: comEntrevista('vel', function (v, n) { v.playbackRate = n; }),
        pular: comEntrevista('pular', function (v, s) { v.currentTime = Math.max(0, v.currentTime + s); })
      },
      estado: function () {
        var c = L[cur()], w = quadroWin(), e = {};
        try { if (w && w.AFEntrevista) e = w.AFEntrevista.estado(); } catch (x) {}
        return Object.assign({ canal: c ? c.id : '' }, e);
      },
      aoMudar: function (info) {
        if (!painel) return;
        if (info.code && info.url) {
          lblCodigo.textContent = info.code;
          if (boxQR.dataset.url !== info.url) { boxQR.dataset.url = info.url; window.AFControle.qr(boxQR, info.url, 150); }
        }
        lblStatus.textContent = info.erro ? info.erro : (info.controlador ? 'Conectado: ' + info.controlador : 'Aguardando o telefone…');
      }
    });
  }
  function abrirPainel() {
    montarPainel();
    atualizarPainel();
    painel.style.display = 'block';
    reiniciarAutoOcultar();
    var b = painel.querySelector('button'); if (b) b.focus();
    carregarControle().then(function (ok) {
      if (!ok) { lblStatus.textContent = 'Controle pelo telefone indisponível.'; return; }
      iniciarControle();
      window.AFControle.ativar(true);
      window.AFControle.parear();
    });
  }
  function fecharPainel() {
    if (!painel) return;
    painel.style.display = 'none';
    clearTimeout(tPainel);
    if (window.AFControle) window.AFControle.ativar(false);
  }
  function lista() { painelAberto() ? fecharPainel() : abrirPainel(); }
  var controle = {
    abrir: function () { if (L.length) abrirPainel(); else querAberto = true; },
    fechar: fecharPainel,
    alternar: function () { painelAberto() ? fecharPainel() : controle.abrir(); }
  };
  // Quadro (iframe do instalador) carregou: observa o ciclo SEM alterar o totem
  function quadroCarregado(frame) {
    cicloAtivo = false;
    try {
      var w = frame.contentWindow;
      var p = (w.location.pathname || '').replace(/\/+$/, '') || '/';
      if (p === '/conversa' || p === '/conversa/totem1') marcarVista();
      var T = w.TOTEM_AMBIENTE;
      if (T && typeof T.cicloCompleto === 'function') {
        if (!T.__afCiclo) {
          var orig = T.cicloCompleto;
          T.cicloCompleto = function () {
            try { return orig.apply(this, arguments); } finally { try { fimDeCiclo('totem'); } catch (e) {} }
          };
          T.__afCiclo = 1;
        }
        cicloAtivo = true;
      }
      if (w.AFEntrevista) cicloAtivo = true;
      w.addEventListener('af:ciclo-fim', function () { fimDeCiclo('canal'); });
      w.addEventListener('keydown', tecla);
    } catch (e) {}
    atualizarPainel();
  }
  Object.assign(window.AFCanais, {
    mover: mover,
    lista: lista,
    pelaNumero: pelaNumero,
    rotulo: rotulo,
    controle: controle,
    quadroCarregado: quadroCarregado,
    fimDeCiclo: fimDeCiclo
  });
  function tecla(e) {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target && e.target.tagName || '')) return;
    var k = e.keyCode, n = e.key, aberto = painelAberto();
    if (k === 427 || n === 'ChannelUp') {
      e.preventDefault(); abrirPainel(); mover(1);
    } else if (k === 428 || n === 'ChannelDown') {
      e.preventDefault(); abrirPainel(); mover(-1);
    } else if (aberto && (k === 33 || n === 'PageUp')) {
      e.preventDefault(); mover(1);
    } else if (aberto && (k === 34 || n === 'PageDown')) {
      e.preventDefault(); mover(-1);
    } else if (aberto && (n === 'Escape' || k === 27 || k === 461 || k === 10009)) {
      e.preventDefault(); fecharPainel();
    } else if (aberto && /^[0-9]$/.test(n)) {
      num += n;
      aviso('Canal ' + num);
      clearTimeout(tn);
      tn = setTimeout(function () { pelaNumero(num); num = ''; }, 1500);
    }
  }
  addEventListener('keydown', tecla);
  carregarCanais().then(function (j) {
    if (!j || !Array.isArray(j.canais)) {
      throw new Error('Estrutura de canais inválida');
    }
    cfg = j;
    L = j.canais.filter(function (c) {
      return c && c.ativo !== false && c.numero !== undefined && typeof c.nome === 'string' && typeof c.rota === 'string' && !!normalizarRota(c.rota);
    });
    if (!L.length) return;
    document.documentElement.classList.add('af-canais');
    montarLista();
    if (querAberto) { querAberto = false; abrirPainel(); }
    atualizarRotulo();
    setInterval(atualizarRotulo, 800);
  }).catch(function (e) {
    console.warn('[AFCanais] Não foi possível carregar canais.json:', e);
  });
})();
