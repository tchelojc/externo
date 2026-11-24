function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  'use strict';

  var K = 'guias';
  var BASE = 'https://almafluxo.uk/conversa/instalacao/';
  var PACOTES_URL = BASE + 'distribuicao/pacotes.json';
  var $ = function $(t, s, c) {
    var e = document.createElement(t);
    if (s) e.style.cssText = s;
    if (c !== undefined) e.textContent = c;
    return e;
  };
  function dados() {
    return _dados.apply(this, arguments);
  }
  function _dados() {
    _dados = _asyncToGenerator(_regenerator().m(function _callee8() {
      var r, j, _t5;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            _context8.p = 0;
            _context8.n = 1;
            return fetch(PACOTES_URL, {
              cache: 'no-store',
              credentials: 'same-origin'
            });
          case 1:
            r = _context8.v;
            if (r.ok) {
              _context8.n = 2;
              break;
            }
            throw new Error('HTTP ' + r.status);
          case 2:
            _context8.n = 3;
            return r.json();
          case 3:
            j = _context8.v;
            return _context8.a(2, j && j.guias && _typeof(j.guias) === 'object' ? j.guias : {});
          case 4:
            _context8.p = 4;
            _t5 = _context8.v;
            console.warn('[AFGuia] Não foi possível carregar os guias:', _t5);
            return _context8.a(2, {});
        }
      }, _callee8, null, [[0, 4]]);
    }));
    return _dados.apply(this, arguments);
  }
  var VER = {
    agente: function () {
      var _agente = _asyncToGenerator(_regenerator().m(function _callee() {
        var _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _t = window.AFDiag;
              if (!_t) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return AFDiag.agente();
            case 1:
              _t = _context.v;
            case 2:
              return _context.a(2, !!_t);
            case 3:
              _context.p = 3;
              _t2 = _context.v;
              return _context.a(2, false);
          }
        }, _callee, null, [[0, 3]]);
      }));
      function agente() {
        return _agente.apply(this, arguments);
      }
      return agente;
    }(),
    serial: function () {
      var _serial = _asyncToGenerator(_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, !!(navigator.serial || navigator.usb));
          }
        }, _callee2);
      }));
      function serial() {
        return _serial.apply(this, arguments);
      }
      return serial;
    }(),
    bluetooth: function () {
      var _bluetooth = _asyncToGenerator(_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, !!navigator.bluetooth);
          }
        }, _callee3);
      }));
      function bluetooth() {
        return _bluetooth.apply(this, arguments);
      }
      return bluetooth;
    }(),
    instalado: function () {
      var _instalado = _asyncToGenerator(_regenerator().m(function _callee4() {
        var d, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              if (window.AFDetector) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, false);
            case 1:
              _context4.n = 2;
              return AFDetector.existente();
            case 2:
              d = _context4.v;
              return _context4.a(2, !!(d.instalado || d.standalone));
            case 3:
              _context4.p = 3;
              _t3 = _context4.v;
              return _context4.a(2, false);
          }
        }, _callee4, null, [[0, 3]]);
      }));
      function instalado() {
        return _instalado.apply(this, arguments);
      }
      return instalado;
    }()
  };
  var NV = {
    agente: 'Agente local ativo',
    serial: 'Navegador com USB/serial',
    bluetooth: 'Navegador com Bluetooth',
    instalado: 'ALMAFLUXO instalado'
  };
  function estadoGuia() {
    try {
      return window.AFEstado ? AFEstado.get()[K] || {} : {};
    } catch (e) {
      return {};
    }
  }
  function salvarProgresso(id, passo) {
    if (!window.AFEstado) return;
    var atual = estadoGuia();
    AFEstado.set(_defineProperty({}, K, Object.assign({}, atual, _defineProperty({}, id, passo))));
  }
  function normalizarGuia(G) {
    if (!G || _typeof(G) !== 'object') return null;
    if (!Array.isArray(G.passos) || !G.passos.length) return null;
    var passos = G.passos.filter(function (p) {
      return p && typeof p.t === 'string' && typeof p.d === 'string';
    });
    if (!passos.length) return null;
    return {
      nome: typeof G.nome === 'string' ? G.nome : 'Guia ALMAFLUXO',
      implementado: G.implementado === true,
      passos: passos
    };
  }
  window.AFGuia = {
    ids: function () {
      var _ids = _asyncToGenerator(_regenerator().m(function _callee5() {
        var G;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return dados();
            case 1:
              G = _context5.v;
              return _context5.a(2, Object.entries(G).filter(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                  g = _ref2[1];
                return g && _typeof(g) === 'object';
              }).map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  id = _ref4[0],
                  g = _ref4[1];
                return {
                  id: id,
                  nome: g.nome || id
                };
              }));
          }
        }, _callee5);
      }));
      function ids() {
        return _ids.apply(this, arguments);
      }
      return ids;
    }(),
    abrir: function abrir(id) {
      return _asyncToGenerator(_regenerator().m(function _callee7() {
        var todos, G, progresso, salvo, i, ov, cx, bt, fechar, draw;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              draw = function _draw() {
                var p = G.passos[i];
                cx.replaceChildren();
                cx.appendChild($('div', 'color:#8fa8c8;font-size:13px', G.nome + ' · passo ' + (i + 1) + ' de ' + G.passos.length));
                var bar = $('div', 'height:6px;background:#12335a;border-radius:6px;' + 'margin:8px 0 14px;overflow:hidden;');
                bar.appendChild($('div', 'height:100%;width:' + Math.round((i + 1) / G.passos.length * 100) + '%;background:#27c8ff;transition:width .2s;'));
                cx.appendChild(bar);
                if (!G.implementado) {
                  cx.appendChild($('div', 'background:#2a2210;border-left:3px solid #f0a830;' + 'padding:8px 10px;margin-bottom:10px;font-size:13px;', 'Esta plataforma ainda não possui instalador completo.'));
                }
                cx.appendChild($('h2', 'margin:0 0 8px;font-size:20px', p.t));
                cx.appendChild($('p', 'line-height:1.5;color:#c8d8ee;margin:0 0 8px', p.d));
                var st = $('div', 'min-height:20px;font-size:14px;margin-top:8px;');
                cx.appendChild(st);
                if (p.v) {
                  var verificar = bt('Verificar', _asyncToGenerator(_regenerator().m(function _callee6() {
                    var fn, resultado, _t4;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.p = _context6.n) {
                        case 0:
                          verificar.disabled = true;
                          st.style.color = '#c8d8ee';
                          st.textContent = 'Verificando…';
                          _context6.p = 1;
                          fn = VER[p.v];
                          if (fn) {
                            _context6.n = 2;
                            break;
                          }
                          throw new Error('Verificação não implementada.');
                        case 2:
                          _context6.n = 3;
                          return fn();
                        case 3:
                          resultado = _context6.v;
                          st.style.color = resultado ? '#2fd48a' : '#ff6b75';
                          st.textContent = (resultado ? '✔ ' : '✖ ') + (NV[p.v] || p.v) + (resultado ? '' : ' — faça o passo e tente novamente.');
                          _context6.n = 5;
                          break;
                        case 4:
                          _context6.p = 4;
                          _t4 = _context6.v;
                          st.style.color = '#ff6b75';
                          st.textContent = 'Falha na verificação: ' + _t4.message;
                        case 5:
                          _context6.p = 5;
                          verificar.disabled = false;
                          return _context6.f(5);
                        case 6:
                          return _context6.a(2);
                      }
                    }, _callee6, null, [[1, 4, 5, 6]]);
                  })));
                  cx.appendChild(verificar);
                }
                if (i > 0) {
                  cx.appendChild(bt('‹ Voltar', function () {
                    i--;
                    draw();
                  }));
                }
                var nx = bt(i === G.passos.length - 1 ? 'Concluir' : 'Próximo ›', function () {
                  if (i === G.passos.length - 1) {
                    salvarProgresso(id, 0);
                    fechar();
                  } else {
                    i++;
                    salvarProgresso(id, i);
                    draw();
                  }
                }, true);
                cx.appendChild(nx);
                cx.appendChild(bt('Fechar', fechar));
                nx.focus();
              };
              fechar = function _fechar() {
                ov.remove();
              };
              _context7.n = 1;
              return dados();
            case 1:
              todos = _context7.v;
              G = normalizarGuia(todos[id]);
              if (G) {
                _context7.n = 2;
                break;
              }
              console.warn('[AFGuia] Guia inválido ou inexistente:', id);
              return _context7.a(2, false);
            case 2:
              progresso = estadoGuia();
              salvo = Number(progresso[id] || 0);
              if (!Number.isInteger(salvo) || salvo < 0) {
                salvo = 0;
              }
              i = Math.min(salvo, G.passos.length - 1);
              ov = $('div', 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483100;' + 'background:#050d1af2;display:grid;place-items:center;' + 'padding:16px;font:16px system-ui;color:#e8f1ff;');
              cx = $('div', 'width:min(560px,100%);max-height:90vh;overflow:auto;' + 'background:#0a1a33;border:1px solid #27c8ff;' + 'border-radius:14px;padding:20px;box-sizing:border-box;');
              ov.appendChild(cx);
              document.body.appendChild(ov);
              bt = function bt(t, f, destaque) {
                var b = $('button', 'font:inherit;color:#e8f1ff;background:' + (destaque ? '#1f7bff' : '#0a1d3a') + ';border:1px solid #27c8ff;border-radius:10px;' + 'padding:12px 16px;margin:8px 8px 0 0;cursor:pointer;', t);
                b.type = 'button';
                b.onclick = f;
                return b;
              };
              draw();
              return _context7.a(2, true);
          }
        }, _callee7);
      }))();
    }
  };
})();