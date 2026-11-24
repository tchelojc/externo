function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  'use strict';

  var AG = 'http://127.0.0.1:8090';
  var BASE = 'https://almafluxo.uk/conversa/instalacao/';
  var PACOTES_URL = BASE + 'distribuicao/pacotes.json';
  var ESP = 'https://cdn.jsdelivr.net/npm/esptool-js@0.5.4/bundle.js';
  var hex = function hex(b) {
    return _toConsumableArray(new Uint8Array(b)).map(function (x) {
      return x.toString(16).padStart(2, '0');
    }).join('');
  };
  var hashValido = function hashValido(h) {
    return typeof h === 'string' && /^[0-9a-f]{64}$/i.test(h);
  };
  var filtrar = function filtrar(l, alvo) {
    return (Array.isArray(l) ? l : []).filter(function (p) {
      return p && p.alvo === alvo && typeof p.arquivo === 'string' && p.arquivo.trim() && hashValido(p.sha256);
    });
  };
  function arquivoURL(arquivo) {
    if (typeof arquivo !== 'string' || !arquivo.trim()) {
      throw new Error('Caminho do pacote inválido.');
    }
    var u;
    try {
      u = new URL(arquivo, BASE);
    } catch (e) {
      throw new Error('Endereço do pacote inválido.');
    }
    if (u.origin !== new URL(BASE).origin) {
      throw new Error('Pacote fora do domínio autorizado.');
    }
    if (!u.pathname.startsWith('/conversa/instalacao/')) {
      throw new Error('Pacote fora do diretório de instalação.');
    }
    return u;
  }
  function obterPacotes() {
    return _obterPacotes.apply(this, arguments);
  }
  function _obterPacotes() {
    _obterPacotes = _asyncToGenerator(_regenerator().m(function _callee6() {
      var r, j;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return fetch(PACOTES_URL, {
              cache: 'no-store',
              credentials: 'same-origin'
            });
          case 1:
            r = _context6.v;
            if (r.ok) {
              _context6.n = 2;
              break;
            }
            throw new Error('Não foi possível carregar pacotes.json (HTTP ' + r.status + ').');
          case 2:
            _context6.n = 3;
            return r.json();
          case 3:
            j = _context6.v;
            if (!(!j || _typeof(j) !== 'object')) {
              _context6.n = 4;
              break;
            }
            throw new Error('Estrutura de pacotes inválida.');
          case 4:
            return _context6.a(2, j);
        }
      }, _callee6);
    }));
    return _obterPacotes.apply(this, arguments);
  }
  function baixar(_x) {
    return _baixar.apply(this, arguments);
  }
  function _baixar() {
    _baixar = _asyncToGenerator(_regenerator().m(function _callee7(p) {
      var url, r, b, calculado, _t6;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (!(!p || !hashValido(p.sha256))) {
              _context7.n = 1;
              break;
            }
            throw new Error('Pacote sem hash SHA-256 válido.');
          case 1:
            if (!(!window.crypto || !crypto.subtle)) {
              _context7.n = 2;
              break;
            }
            throw new Error('SHA-256 indisponível neste navegador seguro.');
          case 2:
            url = arquivoURL(p.arquivo);
            _context7.n = 3;
            return fetch(url.href, {
              cache: 'no-store',
              credentials: 'same-origin'
            });
          case 3:
            r = _context7.v;
            if (r.ok) {
              _context7.n = 4;
              break;
            }
            throw new Error('Pacote não encontrado no repositório (HTTP ' + r.status + ').');
          case 4:
            _context7.n = 5;
            return r.arrayBuffer();
          case 5:
            b = _context7.v;
            if (b.byteLength) {
              _context7.n = 6;
              break;
            }
            throw new Error('O pacote está vazio.');
          case 6:
            _t6 = hex;
            _context7.n = 7;
            return crypto.subtle.digest('SHA-256', b);
          case 7:
            calculado = _t6(_context7.v);
            if (!(calculado !== p.sha256.toLowerCase())) {
              _context7.n = 8;
              break;
            }
            throw new Error('Hash do pacote não confere: gravação cancelada.');
          case 8:
            return _context7.a(2, new Uint8Array(b));
        }
      }, _callee7);
    }));
    return _baixar.apply(this, arguments);
  }
  function respostaAgente(_x2, _x3) {
    return _respostaAgente.apply(this, arguments);
  }
  function _respostaAgente() {
    _respostaAgente = _asyncToGenerator(_regenerator().m(function _callee8(url, opcoes) {
      var r, j, _t7;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            _context8.n = 1;
            return fetch(url, opcoes);
          case 1:
            r = _context8.v;
            _context8.p = 2;
            _context8.n = 3;
            return r.json();
          case 3:
            j = _context8.v;
            _context8.n = 5;
            break;
          case 4:
            _context8.p = 4;
            _t7 = _context8.v;
            throw new Error('O agente local retornou uma resposta inválida.');
          case 5:
            if (r.ok) {
              _context8.n = 6;
              break;
            }
            throw new Error(j.erro || j.error || 'Falha no agente local (HTTP ' + r.status + ').');
          case 6:
            return _context8.a(2, j);
        }
      }, _callee8, null, [[2, 4]]);
    }));
    return _respostaAgente.apply(this, arguments);
  }
  window.AFGravador = {
    filtrar: filtrar,
    AG: AG,
    resumo: function resumo() {
      return _asyncToGenerator(_regenerator().m(function _callee() {
        var j, pacotes, alvos, com, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return obterPacotes();
            case 1:
              j = _context.v;
              pacotes = Array.isArray(j.pacotes) ? j.pacotes : [];
              alvos = j.alvos && _typeof(j.alvos) === 'object' ? j.alvos : {};
              com = new Set(pacotes.filter(function (p) {
                return p && filtrar([p], p.alvo).length;
              }).map(function (p) {
                return p.alvo;
              }));
              return _context.a(2, {
                com: _toConsumableArray(com),
                sem: Object.keys(alvos).filter(function (a) {
                  return !com.has(a);
                })
              });
            case 2:
              _context.p = 2;
              _t = _context.v;
              return _context.a(2, {
                com: [],
                sem: [],
                erro: _t.message
              });
          }
        }, _callee, null, [[0, 2]]);
      }))();
    },
    alvo: function alvo(a) {
      return _asyncToGenerator(_regenerator().m(function _callee2() {
        var j, alvos, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if (!(typeof a !== 'string' || !a.trim())) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, null);
            case 1:
              _context2.n = 2;
              return obterPacotes();
            case 2:
              j = _context2.v;
              alvos = j.alvos || {};
              return _context2.a(2, alvos[a] || null);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              return _context2.a(2, null);
          }
        }, _callee2, null, [[0, 3]]);
      }))();
    },
    pacotes: function pacotes(alvo) {
      return _asyncToGenerator(_regenerator().m(function _callee3() {
        var j, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              if (!(typeof alvo !== 'string' || !alvo.trim())) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, []);
            case 1:
              _context3.n = 2;
              return obterPacotes();
            case 2:
              j = _context3.v;
              return _context3.a(2, filtrar(j.pacotes, alvo));
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              return _context3.a(2, []);
          }
        }, _callee3, null, [[0, 3]]);
      }))();
    },
    esp32: function esp32(p, port, log, prog) {
      return _asyncToGenerator(_regenerator().m(function _callee4() {
        var d, m, tr, L, chip, s, BLOCO, i, parte, offset, _t4, _t5;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (port) {
                _context4.n = 1;
                break;
              }
              throw new Error('Conecte a placa por USB antes de gravar.');
            case 1:
              if (navigator.serial) {
                _context4.n = 2;
                break;
              }
              throw new Error('Web Serial não está disponível neste navegador.');
            case 2:
              if (typeof log !== 'function') log = function log() {};
              if (typeof prog !== 'function') prog = function prog() {};
              _context4.n = 3;
              return baixar(p);
            case 3:
              d = _context4.v;
              log('Pacote verificado (' + d.length + ' bytes). Carregando gravador…');
              _context4.n = 4;
              return new Function('u', 'return import(u)')(ESP);
            case 4:
              m = _context4.v;
              tr = new m.Transport(port, true);
              L = new m.ESPLoader({
                transport: tr,
                baudrate: 115200,
                terminal: {
                  clean: function clean() {},
                  writeLine: log,
                  write: log
                }
              });
              _context4.p = 5;
              _context4.n = 6;
              return L.main();
            case 6:
              chip = _context4.v;
              log('Chip: ' + chip);
              s = '';
              BLOCO = 8192;
              for (i = 0; i < d.length; i += BLOCO) {
                parte = d.subarray(i, Math.min(i + BLOCO, d.length));
                s += String.fromCharCode.apply(String, _toConsumableArray(parte));
              }
              offset = 0;
              if (typeof p.offset === 'number') {
                offset = p.offset;
              } else if (typeof p.offset === 'string') {
                offset = Number(p.offset);
              }
              if (!(!Number.isSafeInteger(offset) || offset < 0)) {
                _context4.n = 7;
                break;
              }
              throw new Error('Endereço de gravação inválido.');
            case 7:
              _context4.n = 8;
              return L.writeFlash({
                fileArray: [{
                  data: s,
                  address: offset
                }],
                flashSize: 'keep',
                flashMode: 'keep',
                flashFreq: 'keep',
                eraseAll: false,
                compress: true,
                reportProgress: function reportProgress(i, w, total) {
                  if (total > 0) {
                    prog(Math.max(0, Math.min(100, Math.round(w / total * 100))));
                  }
                }
              });
            case 8:
              _context4.n = 9;
              return L.after();
            case 9:
              prog(100);
              log('Gravação concluída e placa reiniciada.');
              return _context4.a(2, {
                ok: true,
                chip: chip,
                bytes: d.length
              });
            case 10:
              _context4.p = 10;
              _t4 = _context4.v;
              _context4.p = 11;
              if (!(typeof L.disconnect === 'function')) {
                _context4.n = 12;
                break;
              }
              _context4.n = 12;
              return L.disconnect();
            case 12:
              _context4.n = 14;
              break;
            case 13:
              _context4.p = 13;
              _t5 = _context4.v;
            case 14:
              throw _t4;
            case 15:
              return _context4.a(2);
          }
        }, _callee4, null, [[11, 13], [5, 10]]);
      }))();
    },
    viaAgente: function viaAgente(p, codigo, extra) {
      return _asyncToGenerator(_regenerator().m(function _callee5() {
        var _j$saida;
        var dados, j;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(!p || !hashValido(p.sha256))) {
                _context5.n = 1;
                break;
              }
              throw new Error('Pacote inválido ou sem SHA-256.');
            case 1:
              if (!(!p.id || !p.alvo || !p.arquivo)) {
                _context5.n = 2;
                break;
              }
              throw new Error('Identificação incompleta do pacote.');
            case 2:
              if (!(typeof codigo !== 'string' || !codigo.trim())) {
                _context5.n = 3;
                break;
              }
              throw new Error('Código de autorização não informado.');
            case 3:
              arquivoURL(p.arquivo);
              dados = Object.assign({}, extra && _typeof(extra) === 'object' ? extra : {}, {
                id: p.id,
                alvo: p.alvo,
                arquivo: p.arquivo,
                sha256: p.sha256.toLowerCase()
              });
              _context5.n = 4;
              return respostaAgente(AG + '/instalar', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Codigo': codigo
                },
                cache: 'no-store',
                body: JSON.stringify(dados)
              });
            case 4:
              j = _context5.v;
              if (!(j.ok !== true)) {
                _context5.n = 5;
                break;
              }
              throw new Error(j.erro || j.error || 'Falha na instalação pelo agente.');
            case 5:
              return _context5.a(2, (_j$saida = j.saida) !== null && _j$saida !== void 0 ? _j$saida : j);
          }
        }, _callee5);
      }))();
    }
  };
})();