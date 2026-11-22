function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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

  var BASE_PADRAO = 'https://almafluxo.uk/conversa/instalacao/';
  var hex = function hex(buffer) {
    return _toConsumableArray(new Uint8Array(buffer)).map(function (byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  };
  function buscar(_x) {
    return _buscar.apply(this, arguments);
  }
  function _buscar() {
    _buscar = _asyncToGenerator(_regenerator().m(function _callee2(url) {
      var resposta;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return fetch(url, {
              cache: 'no-store',
              credentials: 'same-origin'
            });
          case 1:
            resposta = _context2.v;
            if (resposta.ok) {
              _context2.n = 2;
              break;
            }
            throw new Error("HTTP ".concat(resposta.status));
          case 2:
            return _context2.a(2, resposta);
        }
      }, _callee2);
    }));
    return _buscar.apply(this, arguments);
  }
  window.AFIntegridade = {
    verificar: function verificar() {
      var _arguments = arguments;
      return _asyncToGenerator(_regenerator().m(function _callee() {
        var base, resultados, manifestoURL, urlManifesto, resposta, manifesto, _i, _Object$entries, _Object$entries$_i, caminho, hashEsperado, urlArquivo, respostaArquivo, conteudo, hashCalculado, ok, _t, _t2, _t3;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              base = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : BASE_PADRAO;
              resultados = [];
              _context.p = 1;
              manifestoURL = new URL(base.endsWith('/') ? base : base + '/', location.href);
              if (!(manifestoURL.origin !== location.origin)) {
                _context.n = 2;
                break;
              }
              return _context.a(2, [{
                arq: 'manifest.json',
                ok: false,
                msg: 'Origem do manifesto não permitida'
              }]);
            case 2:
              urlManifesto = new URL('manifest.json', manifestoURL);
              _context.n = 3;
              return buscar(urlManifesto.href);
            case 3:
              resposta = _context.v;
              _context.n = 4;
              return resposta.json();
            case 4:
              manifesto = _context.v;
              if (!(!manifesto || _typeof(manifesto.arquivos) !== 'object' || !manifesto.arquivos)) {
                _context.n = 5;
                break;
              }
              throw new Error('Estrutura do manifesto inválida');
            case 5:
              if (window.crypto && crypto.subtle) {
                _context.n = 6;
                break;
              }
              return _context.a(2, [{
                arq: '(crypto)',
                ok: false,
                msg: 'SHA-256 indisponível neste navegador'
              }]);
            case 6:
              _i = 0, _Object$entries = Object.entries(manifesto.arquivos);
            case 7:
              if (!(_i < _Object$entries.length)) {
                _context.n = 17;
                break;
              }
              _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), caminho = _Object$entries$_i[0], hashEsperado = _Object$entries$_i[1];
              _context.p = 8;
              if (!(typeof caminho !== 'string' || caminho.startsWith('/') || caminho.includes('\\') || caminho.split('/').some(function (p) {
                return p === '..' || p === '.' || !p;
              }))) {
                _context.n = 9;
                break;
              }
              throw new Error('Caminho inválido');
            case 9:
              if (!(typeof hashEsperado !== 'string' || !/^[a-f0-9]{64}$/i.test(hashEsperado))) {
                _context.n = 10;
                break;
              }
              throw new Error('Hash inválido no manifesto');
            case 10:
              urlArquivo = new URL(caminho, manifestoURL);
              if (!(urlArquivo.origin !== location.origin)) {
                _context.n = 11;
                break;
              }
              throw new Error('Origem do arquivo não permitida');
            case 11:
              _context.n = 12;
              return buscar(urlArquivo.href);
            case 12:
              respostaArquivo = _context.v;
              _context.n = 13;
              return respostaArquivo.arrayBuffer();
            case 13:
              conteudo = _context.v;
              _t = hex;
              _context.n = 14;
              return crypto.subtle.digest('SHA-256', conteudo);
            case 14:
              hashCalculado = _t(_context.v);
              ok = hashCalculado.toLowerCase() === hashEsperado.toLowerCase();
              resultados.push({
                arq: caminho,
                ok: ok,
                msg: ok ? 'íntegro' : 'hash diferente do manifesto'
              });
              _context.n = 16;
              break;
            case 15:
              _context.p = 15;
              _t2 = _context.v;
              resultados.push({
                arq: caminho,
                ok: false,
                msg: _t2.message || 'não carregou'
              });
            case 16:
              _i++;
              _context.n = 7;
              break;
            case 17:
              _context.n = 19;
              break;
            case 18:
              _context.p = 18;
              _t3 = _context.v;
              resultados.push({
                arq: 'manifest.json',
                ok: false,
                msg: _t3.message || 'manifesto indisponível'
              });
            case 19:
              return _context.a(2, resultados);
          }
        }, _callee, null, [[8, 15], [1, 18]]);
      }))();
    }
  };
})();