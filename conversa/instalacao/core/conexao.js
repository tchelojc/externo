function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  'use strict';
  if (window.__AF_CONEXAO__) return;
  window.__AF_CONEXAO__ = true;
  var AGENTE = 'http://127.0.0.1:8090',
    NUVEM = location.origin;
  var DEPS = ['estado', 'diagnostico', 'gravador', 'guia', 'hardware'];
  var pronto = null,
    painel = null;
  var el = function el(t, a) {
    var e = document.createElement(t);
    Object.entries(a || {}).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];
      return k === 'style' ? e.style.cssText = v : k.startsWith('on') ? e[k] = v : e.setAttribute(k, v);
    });
    for (var _len = arguments.length, f = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      f[_key - 2] = arguments[_key];
    }
    f.flat().forEach(function (x) {
      return e.append(x);
    });
    return e;
  };
  var tempo = function tempo(url, ms) {
    var c = new AbortController(),
      t = setTimeout(function () {
        return c.abort();
      }, ms);
    return fetch(url, {
      cache: 'no-store',
      signal: c.signal
    }).finally(function () {
      return clearTimeout(t);
    });
  };
  function carregarScript(nome) {
    return new Promise(function (ok, erro) {
      var s = document.createElement('script');
      s.src = '/core/' + nome + '.js';
      s.onload = ok;
      s.onerror = function () {
        return erro(new Error('O servidor não entregou /core/' + nome + '.js (confira /instalador/status).'));
      };
      document.head.appendChild(s);
    });
  }
  function carregarHW() {
    if (window.AFHW) return Promise.resolve();
    if (!pronto) pronto = _asyncToGenerator(_regenerator().m(function _callee() {
      var _iterator, _step, _loop, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _iterator = _createForOfIteratorHelper(DEPS);
            _context2.p = 1;
            _loop = _regenerator().m(function _loop() {
              var n;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    n = _step.value;
                    if (!(n === 'hardware' || !document.querySelector('script[src="/core/' + n + '.js"]'))) {
                      _context.n = 1;
                      break;
                    }
                    _context.n = 1;
                    return carregarScript(n).catch(function (e) {
                      if (n === 'hardware') throw e;
                    });
                  case 1:
                    return _context.a(2);
                }
              }, _loop);
            });
            _iterator.s();
          case 2:
            if ((_step = _iterator.n()).done) {
              _context2.n = 4;
              break;
            }
            return _context2.d(_regeneratorValues(_loop()), 3);
          case 3:
            _context2.n = 2;
            break;
          case 4:
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t = _context2.v;
            _iterator.e(_t);
          case 6:
            _context2.p = 6;
            _iterator.f();
            return _context2.f(6);
          case 7:
            if (window.AFHW) {
              _context2.n = 8;
              break;
            }
            throw new Error('hardware.js carregou, mas o módulo AFHW não iniciou.');
          case 8:
            return _context2.a(2);
        }
      }, _callee, null, [[1, 5, 6, 7]]);
    }))().catch(function (e) {
      pronto = null;
      throw e;
    });
    return pronto;
  }
  function testar() {
    return _testar.apply(this, arguments);
  }
  function _testar() {
    _testar = _asyncToGenerator(_regenerator().m(function _callee2() {
      var r, j, x, _t2, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            r = {};
            r.seguro = !!window.isSecureContext;
            r.serial = !!(navigator.serial || navigator.usb);
            r.ble = !!navigator.bluetooth;
            _context3.p = 1;
            _context3.n = 2;
            return tempo(AGENTE + '/ping', 1500);
          case 2:
            _context3.n = 3;
            return _context3.v.json();
          case 3:
            j = _context3.v;
            r.agente = j && j.ok ? 'v' + (j.versao || '?') : false;
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t2 = _context3.v;
            r.agente = false;
          case 5:
            _context3.p = 5;
            _context3.n = 6;
            return tempo(NUVEM + '/api/wiki/lista', 6000);
          case 6:
            x = _context3.v;
            r.nuvem = x.ok;
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
            r.nuvem = false;
          case 8:
            r.hw = !!window.AFHW;
            return _context3.a(2, r);
        }
      }, _callee2, null, [[5, 7], [1, 4]]);
    }));
    return _testar.apply(this, arguments);
  }
  var COR = {
    ok: '#2fd48a',
    no: '#ff6b75',
    av: '#ffc66d'
  };
  function linha(rot, estado, det) {
    return el('div', {
      style: 'display:flex;gap:8px;align-items:baseline;margin:3px 0'
    }, el('b', {
      style: 'color:' + COR[estado] + ';min-width:14px'
    }, estado === 'ok' ? '●' : estado === 'av' ? '◐' : '○'), el('span', {}, el('b', {}, rot + ' '), el('small', {
      style: 'color:#9ab1d0'
    }, det)));
  }
  function abrirVia(via, ip, porta) {
    var msg = painel.querySelector('#afc-msg');
    msg.style.color = '#9ab1d0';
    msg.textContent = 'Preparando leitura…';
    carregarHW().then(function () {
      var h = document.getElementById('af-hardware-panel');
      var sr = h && h.shadowRoot;
      if (!sr) throw new Error('Painel de hardware não foi criado.');
      if (via === 'wifi') {
        var i = sr.querySelector('#ip'),
          p = sr.querySelector('#porta');
        if (i && ip) i.value = ip;
        if (p && porta) p.value = porta;
      }
      sr.querySelector('#p').style.display = 'block';
      painel.style.display = 'none';
      var b = sr.querySelector('[data-v="' + via + '"]');
      if (!b) throw new Error('Via ' + via + ' indisponível no módulo.');
      b.click();
    }).catch(function (e) {
      msg.style.color = COR.no;
      msg.textContent = e.message || String(e);
    });
  }
  function montar() {
    return _montar.apply(this, arguments);
  }
  function _montar() {
    _montar = _asyncToGenerator(_regenerator().m(function _callee3() {
      var corpo, r, via, ip, pt;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            corpo = painel.querySelector('#afc-corpo');
            corpo.replaceChildren(el('small', {
              style: 'color:#9ab1d0'
            }, 'Verificando cada trecho da rota…'));
            carregarHW().catch(function () {});
            _context4.n = 1;
            return testar();
          case 1:
            r = _context4.v;
            via = function via(titulo, desc, ok, aviso, acao, extra) {
              return el('div', {
                style: 'border:1px solid #254365;border-radius:10px;padding:9px;margin:7px 0'
              }, el('b', {}, titulo), el('small', {
                style: 'display:block;color:#9ab1d0;margin:3px 0 6px;line-height:1.45'
              }, desc), extra || '', ok ? el('button', {
                style: BTN + ';background:#1f7bff',
                onclick: acao
              }, 'Conectar') : el('small', {
                style: 'color:' + COR.av
              }, aviso));
            };
            ip = el('input', {
              value: '192.168.0.10',
              style: INP + ';flex:1'
            }), pt = el('input', {
              value: '35000',
              style: INP + ';width:80px'
            });
            corpo.replaceChildren(el('div', {
              style: 'margin-bottom:6px'
            }, el('b', {
              style: 'color:#27c8ff'
            }, 'Rota: equipamento ⇄ navegador ⇄ agente ⇄ nuvem'), linha('Navegador', r.seguro ? 'ok' : 'no', r.seguro ? 'conexão segura (HTTPS)' : 'sem HTTPS: USB e Bluetooth ficam bloqueados'), linha('USB/Serial', r.serial ? 'ok' : 'av', r.serial ? 'suportado' : 'este navegador não tem Web Serial/USB (use o agente)'), linha('Bluetooth', r.ble ? 'ok' : 'av', r.ble ? 'suportado' : 'este navegador não tem Web Bluetooth (use o agente)'), linha('Agente local', r.agente ? 'ok' : 'av', r.agente ? 'ativo ' + r.agente + ' em 127.0.0.1:8090' : 'não encontrado neste aparelho'), linha('Nuvem (Worker)', r.nuvem ? 'ok' : 'no', r.nuvem ? 'respondendo' : 'sem resposta agora')), via('1 · USB / Serial', 'Arduino, ESP32, Raspberry Pi Pico e adaptadores OBD-II por cabo. O navegador pede para você escolher a porta.', r.serial && r.seguro, 'Indisponível aqui. Use o computador com Chrome/Edge ou a via API (agente).', function () {
              return abrirVia('usb');
            }), via('2 · Bluetooth', 'Módulos HC-05/HM-10, ESP32 BLE e OBD-II Bluetooth LE. O navegador lista os aparelhos próximos.', r.ble && r.seguro, 'Indisponível aqui. Use Chrome/Edge no Android ou computador, ou a via API (agente).', function () {
              return abrirVia('bluetooth');
            }), via('3 · Wi-Fi / Rede', 'Adaptador OBD-II Wi-Fi e placas na rede local. Navegador não abre TCP: esta via passa pelo agente local.', !!r.agente, 'Requer o agente ativo (veja a via 4).', function () {
              return abrirVia('wifi', ip.value.trim(), pt.value.trim());
            }, el('div', {
              style: 'display:flex;gap:6px;margin:0 0 7px'
            }, ip, pt)), via('4 · API (agente local)', 'Para TV, celular ou navegador sem USB/Bluetooth: um programa no computador ligado à placa. Instale e execute:\n  pip install pyserial\n  python almafluxo_agente.py\nDepois toque em Verificar. A página fala com ele em 127.0.0.1:8090 e com a nuvem pelo Worker.', true, '', function () {
              return montar();
            }, null), el('small', {
              style: 'color:#9ab1d0;display:block;margin-top:6px;line-height:1.45'
            }, 'Hoje a nuvem recebe do navegador o que você escolher enviar pelas rotas existentes. Não há ainda uma rota no Worker que receba leituras do equipamento automaticamente.'));
            corpo.querySelectorAll('button').forEach(function (b) {
              if (b.textContent === 'Conectar' && b.parentElement.textContent.includes('4 · API')) b.textContent = 'Verificar de novo';
            });
          case 2:
            return _context4.a(2);
        }
      }, _callee3);
    }));
    return _montar.apply(this, arguments);
  }
  var BTN = 'font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:8px;padding:8px 12px;cursor:pointer';
  var INP = 'font:inherit;color:#e8f1ff;background:#0a1d3a;border:1px solid #27c8ff;border-radius:8px;padding:7px 9px;min-width:0';
  function iniciar() {
    var btn = el('button', {
      id: 'af-conexao-btn',
      type: 'button',
      'aria-label': 'Conectar equipamento',
      style: BTN + ';position:fixed;right:12px;bottom:12px;z-index:2147483100;font-weight:700;background:#1f7bff;box-shadow:0 4px 18px #0007',
      onclick: function onclick() {
        var aberto = painel.style.display === 'block';
        painel.style.display = aberto ? 'none' : 'block';
        if (!aberto) montar();
      }
    }, '🔌 Conectar equipamento');
    painel = el('div', {
      id: 'af-conexao-painel',
      style: 'display:none;position:fixed;right:12px;bottom:60px;z-index:2147483100;width:min(420px,94vw);max-height:78vh;overflow:auto;padding:13px;background:#06122cf7;border:1px solid #27c8ff;border-radius:12px;color:#e8f1ff;font:13px system-ui,sans-serif;white-space:pre-line;box-shadow:0 8px 35px #0009'
    }, el('div', {
      style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px'
    }, el('b', {
      style: 'font-size:14px;color:#27c8ff'
    }, 'Conectar equipamento'), el('button', {
      style: BTN + ';padding:4px 9px',
      onclick: function onclick() {
        return painel.style.display = 'none';
      },
      'aria-label': 'Fechar'
    }, '✕')), el('div', {
      id: 'afc-corpo'
    }), el('div', {
      id: 'afc-msg',
      style: 'margin-top:8px;font-size:12px'
    }));
    document.body.append(btn, painel);
  }
  if (document.body) iniciar();else addEventListener('DOMContentLoaded', iniciar);
})();