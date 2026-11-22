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
            urls = ['/distribuicao/canais.json', BASE_INSTALACAO + 'distribuicao/canais.json', RAW_INSTALACAO + 'distribuicao/canais.json'];
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
  var cur = function cur() {
    var atual = location.pathname.replace(/\/+$/, '') || '/';
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
  function esperarConversa(c, destino) {
    var espera = Number(cfg.espera_conversa_s);
    var total = Number.isFinite(espera) && espera >= 1 && espera <= 300 ? espera : 45;
    var falta = function falta() {
      return Math.ceil(total - performance.now() / 1000);
    };
    if (falta() <= 0) {
      marcarVista();
      location.href = destino;
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
          location.href = destino;
          return;
        }
        aviso(texto());
        if (avisoElemento) clearTimeout(avisoElemento._t);
      }, 500)
    };
  }
  function ir(c) {
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
      location.href = rotaDestino;
    }, d.tipo === 'login' ? 1200 : 0);
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
  function lista() {
    if (pn) {
      pn.remove();
      pn = null;
      return;
    }
    pn = document.createElement('div');
    pn.style.cssText = 'position:fixed;z-index:2147483180;top:64px;right:12px;' + 'background:#06122cf5;border:1px solid #27c8ff;' + 'border-radius:12px;padding:8px;max-height:70vh;' + 'overflow:auto;min-width:220px;font:16px system-ui';
    L.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c.numero + ' · ' + c.nome + (c.login ? ' 🔒' : '');
      b.dataset.numero = String(c.numero);
      b.style.cssText = 'display:block;width:100%;text-align:left;' + 'margin:3px 0;font:inherit;color:#e8f1ff;' + 'background:#0a1d3a;border:1px solid #27c8ff;' + 'border-radius:8px;padding:10px 12px;cursor:pointer';
      pn.appendChild(b);
    });
    pn.onclick = function (e) {
      var b = e.target.closest('button');
      if (b && pn.contains(b)) {
        var n = b.dataset.numero;
        lista();
        pelaNumero(n);
      }
    };
    document.body.appendChild(pn);
  }
  Object.assign(window.AFCanais, {
    mover: mover,
    lista: lista,
    pelaNumero: pelaNumero,
    rotulo: rotulo
  });
  function flutuante() {
    var H = document.createElement('div');
    H.style.cssText = 'position:fixed;z-index:2147483150;' + 'display:flex;gap:4px;font:14px system-ui;opacity:.65;' + (cfg.posicao || 'top:12px;right:12px');
    var b = function b(t, f, a) {
      var x = document.createElement('button');
      x.type = 'button';
      x.textContent = t;
      x.setAttribute('aria-label', a);
      x.style.cssText = 'font:inherit;color:#e8f1ff;' + 'background:#0a1d3acc;border:1px solid #27c8ff;' + 'border-radius:8px;padding:7px 11px;cursor:pointer';
      x.onclick = f;
      return x;
    };
    etiquetaCanal = document.createElement('span');
    etiquetaCanal.textContent = rotulo();
    etiquetaCanal.style.cssText = 'color:#e8f1ff;background:#0a1d3acc;' + 'border:1px solid #27c8ff;border-radius:8px;' + 'padding:7px 11px';
    H.append(b('‹ CH', function () {
      return mover(-1);
    }, 'Canal anterior'), etiquetaCanal, b('CH ›', function () {
      return mover(1);
    }, 'Próximo canal'), b('☰', lista, 'Lista de canais'));
    document.body.appendChild(H);
  }
  addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target && e.target.tagName || '')) return;
    var k = e.keyCode;
    var n = e.key;
    if (k === 427 || k === 33 || n === 'ChannelUp' || n === 'PageUp') {
      e.preventDefault();
      mover(1);
    } else if (k === 428 || k === 34 || n === 'ChannelDown' || n === 'PageDown') {
      e.preventDefault();
      mover(-1);
    } else if (/^[0-9]$/.test(n)) {
      num += n;
      aviso('Canal ' + num);
      clearTimeout(tn);
      tn = setTimeout(function () {
        pelaNumero(num);
        num = '';
      }, 1500);
    }
  });
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
    if (!window.AF_CANAL_EMBUTIDO) {
      flutuante();
    }
    atualizarRotulo();
    setInterval(atualizarRotulo, 800);
  }).catch(function (e) {
    console.warn('[AFCanais] Não foi possível carregar canais.json:', e);
  });
})();