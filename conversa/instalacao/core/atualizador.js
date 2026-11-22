function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  'use strict';

  var BASE_INSTALACAO = 'https://almafluxo.uk/conversa/instalacao/';
  var URL_VERSAO = 'https://almafluxo.uk/distribuicao/versao.json';
  var PREFIXO_CACHE = 'af-instalador-';
  window.AFAtualizador = {
    checar: function checar() {
      return _asyncToGenerator(_regenerator().m(function _callee() {
        var local, resposta, v, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              local = window.AFEstado ? AFEstado.get().versao : null;
              _context.p = 1;
              _context.n = 2;
              return fetch(URL_VERSAO, {
                cache: 'no-store',
                credentials: 'same-origin'
              });
            case 2:
              resposta = _context.v;
              if (resposta.ok) {
                _context.n = 3;
                break;
              }
              throw new Error('HTTP ' + resposta.status);
            case 3:
              _context.n = 4;
              return resposta.json();
            case 4:
              v = _context.v;
              if (!(!v || typeof v.versao !== 'string' || !v.versao.trim())) {
                _context.n = 5;
                break;
              }
              throw new Error('Versão inválida');
            case 5:
              return _context.a(2, {
                local: local,
                remota: v.versao,
                nova: !local || local !== v.versao,
                notas: v.notas || ''
              });
            case 6:
              _context.p = 6;
              _t = _context.v;
              return _context.a(2, {
                local: local,
                remota: null,
                nova: false,
                erro: 'versao.json inacessível ou inválido'
              });
          }
        }, _callee, null, [[1, 6]]);
      }))();
    },
    aplicar: function aplicar(v) {
      return _asyncToGenerator(_regenerator().m(function _callee2() {
        var etapas, c, integridade, falhas, confirmacao, registros, nomes, _iterator, _step, nome, _t2, _t3, _t4, _t5, _t6;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              etapas = [];
              _context2.p = 1;
              if (!(typeof v !== 'string' || !/^[\w.-]+$/.test(v))) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, {
                ok: false,
                msg: 'Versão informada inválida.',
                etapas: etapas
              });
            case 2:
              _context2.n = 3;
              return window.AFAtualizador.checar();
            case 3:
              c = _context2.v;
              if (!(c.erro || c.remota !== v)) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2, {
                ok: false,
                msg: 'Atualização não aplicada: a versão remota mudou ou não respondeu.',
                etapas: etapas
              });
            case 4:
              etapas.push('Versão remota confirmada: ' + v);
              if (!(!window.AFIntegridade || typeof AFIntegridade.verificar !== 'function')) {
                _context2.n = 5;
                break;
              }
              return _context2.a(2, {
                ok: false,
                msg: 'Atualização não confirmada: módulo de integridade indisponível.',
                etapas: etapas
              });
            case 5:
              _context2.n = 6;
              return AFIntegridade.verificar(BASE_INSTALACAO);
            case 6:
              integridade = _context2.v;
              falhas = integridade.filter(function (x) {
                return !x.ok;
              });
              if (!(!integridade.length || falhas.length)) {
                _context2.n = 7;
                break;
              }
              return _context2.a(2, {
                ok: false,
                msg: 'Atualização NÃO confirmada: ' + (falhas.length ? falhas.map(function (x) {
                  return x.arq;
                }).join(', ') + ' não confere com o manifesto' : 'manifesto vazio ou sem arquivos verificáveis') + '. Versão anterior mantida.',
                etapas: etapas,
                falhas: falhas
              });
            case 7:
              etapas.push('Integridade confirmada: ' + integridade.length + '/' + integridade.length + ' arquivos.');
              _context2.n = 8;
              return window.AFAtualizador.checar();
            case 8:
              confirmacao = _context2.v;
              if (!(confirmacao.erro || confirmacao.remota !== v)) {
                _context2.n = 9;
                break;
              }
              return _context2.a(2, {
                ok: false,
                msg: 'A versão remota mudou durante a verificação. Atualização cancelada.',
                etapas: etapas
              });
            case 9:
              _context2.p = 9;
              if (!navigator.serviceWorker) {
                _context2.n = 11;
                break;
              }
              _context2.n = 10;
              return navigator.serviceWorker.getRegistrations();
            case 10:
              _t2 = _context2.v;
              _context2.n = 12;
              break;
            case 11:
              _t2 = [];
            case 12:
              registros = _t2;
              _context2.n = 13;
              return Promise.all(registros.map(function (r) {
                return r.update();
              }));
            case 13:
              etapas.push('Service Workers consultados: ' + registros.length);
              _context2.n = 15;
              break;
            case 14:
              _context2.p = 14;
              _t3 = _context2.v;
              etapas.push('Aviso no Service Worker: ' + _t3.message);
            case 15:
              _context2.p = 15;
              if (!window.caches) {
                _context2.n = 23;
                break;
              }
              _context2.n = 16;
              return caches.keys();
            case 16:
              nomes = _context2.v;
              _iterator = _createForOfIteratorHelper(nomes);
              _context2.p = 17;
              _iterator.s();
            case 18:
              if ((_step = _iterator.n()).done) {
                _context2.n = 20;
                break;
              }
              nome = _step.value;
              if (!(nome.startsWith(PREFIXO_CACHE) && nome !== PREFIXO_CACHE + v)) {
                _context2.n = 19;
                break;
              }
              _context2.n = 19;
              return caches.delete(nome);
            case 19:
              _context2.n = 18;
              break;
            case 20:
              _context2.n = 22;
              break;
            case 21:
              _context2.p = 21;
              _t4 = _context2.v;
              _iterator.e(_t4);
            case 22:
              _context2.p = 22;
              _iterator.f();
              return _context2.f(22);
            case 23:
              etapas.push('Caches antigos do instalador verificados.');
              _context2.n = 25;
              break;
            case 24:
              _context2.p = 24;
              _t5 = _context2.v;
              etapas.push('Aviso na limpeza de cache: ' + _t5.message);
            case 25:
              if (window.AFEstado) {
                AFEstado.set({
                  versao: v,
                  atualizadoEm: Date.now()
                });
              }
              return _context2.a(2, {
                ok: true,
                msg: 'Atualização para ' + v + ' confirmada. Integridade: ' + integridade.length + '/' + integridade.length + ' arquivos.',
                etapas: etapas
              });
            case 26:
              _context2.p = 26;
              _t6 = _context2.v;
              return _context2.a(2, {
                ok: false,
                msg: 'Falha durante a atualização: ' + _t6.message,
                etapas: etapas
              });
          }
        }, _callee2, null, [[17, 21, 22, 23], [15, 24], [9, 14], [1, 26]]);
      }))();
    }
  };
})();