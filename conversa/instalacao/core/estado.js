function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  'use strict';

  var K = 'almafluxo_instalador';
  var U = 'almafluxo_usuario';
  var LOGIN_URL = '/proxy/central';
  var g = function g() {
    try {
      var s = JSON.parse(localStorage.getItem(K) || '{}');
      return s && _typeof(s) === 'object' && !Array.isArray(s) ? s : {};
    } catch (e) {
      return {};
    }
  };
  function set(p) {
    var atual = g();
    var dados = p && _typeof(p) === 'object' && !Array.isArray(p) ? p : {};
    var s = Object.assign({}, atual, dados);
    try {
      localStorage.setItem(K, JSON.stringify(s));
    } catch (e) {
      console.warn('[AFEstado] Não foi possível persistir o estado:', e);
    }
    return s;
  }
  function usuario() {
    try {
      var u = JSON.parse(localStorage.getItem(U) || 'null');
      return u && _typeof(u) === 'object' && !Array.isArray(u) ? u : null;
    } catch (e) {
      return null;
    }
  }
  function login(_x, _x2) {
    return _login.apply(this, arguments);
  }
  function _login() {
    _login = _asyncToGenerator(_regenerator().m(function _callee(email, senha) {
      var _ref, _u$balance;
      var resposta, r, u, tk, autenticado, UDATA, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(typeof email !== 'string' || !email.trim())) {
              _context.n = 1;
              break;
            }
            throw new Error('Informe o e-mail.');
          case 1:
            if (!(typeof senha !== 'string' || !senha)) {
              _context.n = 2;
              break;
            }
            throw new Error('Informe a senha.');
          case 2:
            _context.p = 2;
            _context.n = 3;
            return fetch(LOGIN_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'same-origin',
              cache: 'no-store',
              body: JSON.stringify({
                action: 'login',
                email: email.trim(),
                senha: senha
              })
            });
          case 3:
            r = _context.v;
            if (r.ok) {
              _context.n = 4;
              break;
            }
            throw new Error('Falha na autenticação (HTTP ' + r.status + ').');
          case 4:
            _context.n = 5;
            return r.json();
          case 5:
            resposta = _context.v;
            _context.n = 9;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            if (!(_t instanceof SyntaxError)) {
              _context.n = 7;
              break;
            }
            throw new Error('O servidor retornou uma resposta inválida.');
          case 7:
            if (!(_t.name === 'TypeError')) {
              _context.n = 8;
              break;
            }
            throw new Error('Não foi possível conectar ao servidor de autenticação.');
          case 8:
            throw _t;
          case 9:
            if (!(!resposta || _typeof(resposta) !== 'object')) {
              _context.n = 10;
              break;
            }
            throw new Error('Resposta de autenticação inválida.');
          case 10:
            u = resposta.usuario || resposta;
            tk = resposta.token || resposta.sessionToken || u.sessionToken;
            autenticado = resposta.ok === true || resposta.autenticado === true || resposta.status === 'success';
            if (!(!autenticado || !tk)) {
              _context.n = 11;
              break;
            }
            throw new Error(resposta.error || resposta.message || 'E-mail ou senha incorretos.');
          case 11:
            UDATA = {
              nome: u.nome || 'Usuário',
              email: email.trim(),
              balance: (_ref = (_u$balance = u.balance) !== null && _u$balance !== void 0 ? _u$balance : u.saldo) !== null && _ref !== void 0 ? _ref : 0,
              sessionToken: tk,
              master: !!(u.master || u.admin)
            };
            _context.p = 12;
            localStorage.setItem(U, JSON.stringify(UDATA));
            _context.n = 14;
            break;
          case 13:
            _context.p = 13;
            _t2 = _context.v;
            throw new Error('Autenticação realizada, mas não foi possível salvar a sessão neste dispositivo.');
          case 14:
            return _context.a(2, UDATA);
        }
      }, _callee, null, [[12, 13], [2, 6]]);
    }));
    return _login.apply(this, arguments);
  }
  function persistir() {
    return _persistir.apply(this, arguments);
  }
  function _persistir() {
    _persistir = _asyncToGenerator(_regenerator().m(function _callee2() {
      var _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            if (!(navigator.storage && typeof navigator.storage.persist === 'function')) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return navigator.storage.persist();
          case 1:
            return _context2.a(2, _context2.v);
          case 2:
            return _context2.a(2, false);
          case 3:
            _context2.p = 3;
            _t3 = _context2.v;
            return _context2.a(2, false);
        }
      }, _callee2, null, [[0, 3]]);
    }));
    return _persistir.apply(this, arguments);
  }
  window.AFEstado = {
    get: g,
    set: set,
    usuario: usuario,
    login: login,
    persistir: persistir
  };
})();