function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  'use strict';
  var BASE = 'https://almafluxo.uk/conversa/instalacao/';
  var PACOTES_URL = BASE + 'distribuicao/pacotes.json';
  var CFG = {};
  var configErro = null;
  var AG_PADRAO = 'http://127.0.0.1:8090';
  var ESPERAS = {
    conexao: 5000,
    serial: 2500,
    obd: 4000,
    agente: 3500
  };
  var USB_PADRAO = {
    '2341:0043': ['Arduino Uno R3', 'uno', 'confirmada'],
    '2341:0001': ['Arduino Uno', 'uno', 'confirmada'],
    '2A03:0043': ['Arduino Uno', 'uno', 'confirmada'],
    '1A86:7523': ['Conversor CH340 (Arduino clone/Nano/ESP)', null, 'parcial'],
    '10C4:EA60': ['Conversor CP210x (comum em ESP32/NodeMCU)', 'esp32', 'provável'],
    '0403:6001': ['Conversor FTDI (Arduino/ELM327 USB)', null, 'parcial'],
    '303A:1001': ['ESP32 USB nativo (S3/C3)', 'esp32', 'confirmada'],
    '303A:0002': ['ESP32-S2', 'esp32', 'confirmada'],
    '2E8A:0005': ['Raspberry Pi Pico (MicroPython)', null, 'parcial', 'pico'],
    '2E8A:0003': ['Raspberry Pi RP2040 (BOOTSEL)', null, 'parcial', 'pico']
  };
  var NOMES = [[/elm|obd|vgate|vlink/i, 'Adaptador OBD-II (ELM327)', 'obd'], [/esp32/i, 'ESP32', 'esp32'], [/arduino/i, 'Arduino', 'uno'], [/raspberry|rpi/i, 'Raspberry Pi', 'rpi4'], [/hc-0|jdy|bt0|hm-1/i, 'Módulo Bluetooth serial (HC-05/HM-10)', null]];
  var SISTEMAS = {
    webOS: {
      alvo: 'webos',
      nome: 'TV LG (webOS)'
    },
    Tizen: {
      alvo: 'tizen',
      nome: 'TV Samsung (Tizen)'
    },
    Android: {
      alvo: 'android',
      nome: 'Android / Android TV'
    },
    Linux: {
      alvo: 'linux',
      nome: 'Linux / Raspberry Pi'
    }
  };
  var hx = function hx(n) {
    return Number(n || 0).toString(16).toUpperCase().padStart(4, '0');
  };
  function mesclar(a, b) {
    return Object.assign({}, a || {}, b || {});
  }
  function validarObjeto(o) {
    return !!o && _typeof(o) === 'object' && !Array.isArray(o);
  }
  function buscarJSON(_x) {
    return _buscarJSON.apply(this, arguments);
  }
  function _buscarJSON() {
    _buscarJSON = _asyncToGenerator(_regenerator().m(function _callee8(url) {
      var ms,
        ctrl,
        timer,
        r,
        j,
        _args8 = arguments;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            ms = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 5000;
            ctrl = new AbortController();
            timer = setTimeout(function () {
              return ctrl.abort();
            }, ms);
            _context8.p = 1;
            _context8.n = 2;
            return fetch(url, {
              cache: 'no-store',
              signal: ctrl.signal
            });
          case 2:
            r = _context8.v;
            if (r.ok) {
              _context8.n = 3;
              break;
            }
            throw new Error('HTTP ' + r.status + ' ao consultar ' + url);
          case 3:
            _context8.n = 4;
            return r.json();
          case 4:
            j = _context8.v;
            if (validarObjeto(j)) {
              _context8.n = 5;
              break;
            }
            throw new Error('Resposta JSON inválida');
          case 5:
            return _context8.a(2, j);
          case 6:
            _context8.p = 6;
            clearTimeout(timer);
            return _context8.f(6);
          case 7:
            return _context8.a(2);
        }
      }, _callee8, null, [[1,, 6, 7]]);
    }));
    return _buscarJSON.apply(this, arguments);
  }
  function carregarConfig() {
    return _carregarConfig.apply(this, arguments);
  }
  function _carregarConfig() {
    _carregarConfig = _asyncToGenerator(_regenerator().m(function _callee9() {
      var j, _t5;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            _context9.p = 0;
            _context9.n = 1;
            return buscarJSON(PACOTES_URL, 8000);
          case 1:
            j = _context9.v;
            if (validarObjeto(j.comunicacao)) {
              _context9.n = 2;
              break;
            }
            throw new Error('Configuração comunicacao ausente no pacotes.json');
          case 2:
            CFG = j.comunicacao;
            configErro = null;
            return _context9.a(2, CFG);
          case 3:
            _context9.p = 3;
            _t5 = _context9.v;
            configErro = _t5;
            CFG = {};
            console.warn('[AFHW] Configuração remota indisponível:', _t5.message);
            return _context9.a(2, CFG);
        }
      }, _callee9, null, [[0, 3]]);
    }));
    return _carregarConfig.apply(this, arguments);
  }
  var READY = carregarConfig();
  function agenteURL() {
    var u = CFG.agente && CFG.agente.url;
    return typeof u === 'string' && /^http:\/\/(127\.0\.0\.1|localhost):\d+$/i.test(u) ? u.replace(/\/+$/, '') : AG_PADRAO;
  }
  function usbTabela() {
    return mesclar(USB_PADRAO, CFG.usb);
  }
  function serialBauds() {
    var b = CFG.serial && CFG.serial.bauds;
    return Array.isArray(b) && b.length ? b.map(Number).filter(function (x) {
      return Number.isFinite(x) && x > 0;
    }) : [38400, 115200, 9600];
  }
  function timeoutOBD() {
    return Math.max(1000, Math.min(8000, Number(CFG.elm327 && CFG.elm327.timeout_pid_ms) || ESPERAS.obd));
  }
  function intervaloOBD() {
    return Math.max(2000, Math.min(30000, Number(CFG.elm327 && CFG.elm327.intervalo_leitura_ms) || 6000));
  }
  function agenteFetch(_x2) {
    return _agenteFetch.apply(this, arguments);
  }
  function _agenteFetch() {
    _agenteFetch = _asyncToGenerator(_regenerator().m(function _callee0(path) {
      var opts,
        timeout,
        ctrl,
        ms,
        timer,
        r,
        j,
        _args0 = arguments,
        _t6,
        _t7;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            opts = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
            timeout = _args0.length > 2 ? _args0[2] : undefined;
            _context0.n = 1;
            return READY;
          case 1:
            ctrl = new AbortController();
            ms = timeout || Number(CFG.agente && CFG.agente.timeout_ms) || ESPERAS.agente;
            timer = setTimeout(function () {
              return ctrl.abort();
            }, ms);
            _context0.p = 2;
            _context0.n = 3;
            return fetch(agenteURL() + path, _objectSpread(_objectSpread({}, opts), {}, {
              signal: ctrl.signal,
              cache: 'no-store'
            }));
          case 3:
            r = _context0.v;
            _context0.p = 4;
            _context0.n = 5;
            return r.json();
          case 5:
            j = _context0.v;
            _context0.n = 7;
            break;
          case 6:
            _context0.p = 6;
            _t6 = _context0.v;
            throw new Error('O agente respondeu com conteúdo inválido');
          case 7:
            if (!(!r.ok || j.ok === false)) {
              _context0.n = 8;
              break;
            }
            throw new Error(j.erro || j.error || 'Erro HTTP ' + r.status);
          case 8:
            return _context0.a(2, j);
          case 9:
            _context0.p = 9;
            _t7 = _context0.v;
            if (!(_t7.name === 'AbortError')) {
              _context0.n = 10;
              break;
            }
            throw new Error('Tempo esgotado ao comunicar com o agente local');
          case 10:
            if (!(_t7 instanceof TypeError)) {
              _context0.n = 11;
              break;
            }
            throw new Error('Não foi possível acessar o agente local. Verifique se ele está iniciado e se o navegador permite acesso à rede local.');
          case 11:
            throw _t7;
          case 12:
            _context0.p = 12;
            clearTimeout(timer);
            return _context0.f(12);
          case 13:
            return _context0.a(2);
        }
      }, _callee0, null, [[4, 6], [2, 9, 12, 13]]);
    }));
    return _agenteFetch.apply(this, arguments);
  }
  function testarAgente() {
    return _testarAgente.apply(this, arguments);
  }
  function _testarAgente() {
    _testarAgente = _asyncToGenerator(_regenerator().m(function _callee1() {
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            return _context1.a(2, agenteFetch('/ping', {}, ESPERAS.agente));
        }
      }, _callee1);
    }));
    return _testarAgente.apply(this, arguments);
  }
  function listarPortas() {
    return _listarPortas.apply(this, arguments);
  }
  function _listarPortas() {
    _listarPortas = _asyncToGenerator(_regenerator().m(function _callee10() {
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            return _context10.a(2, agenteFetch('/serial', {}, ESPERAS.agente));
        }
      }, _callee10);
    }));
    return _listarPortas.apply(this, arguments);
  }
  function sondarRede(_x3) {
    return _sondarRede.apply(this, arguments);
  }
  function _sondarRede() {
    _sondarRede = _asyncToGenerator(_regenerator().m(function _callee11(ip) {
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            if (ipValido(ip)) {
              _context11.n = 1;
              break;
            }
            throw new Error('Informe um endereço IPv4 válido');
          case 1:
            return _context11.a(2, agenteFetch('/probe?ip=' + encodeURIComponent(ip), {}, 10000));
        }
      }, _callee11);
    }));
    return _sondarRede.apply(this, arguments);
  }
  function ipValido(ip) {
    if (typeof ip !== 'string') return false;
    var p = ip.trim().split('.');
    if (p.length !== 4) return false;
    if (!p.every(function (x) {
      return /^\d{1,3}$/.test(x) && Number(x) >= 0 && Number(x) <= 255;
    })) {
      return false;
    }
    var n = p.map(Number);
    return n[0] !== 0 && n[0] !== 127 && n[0] < 224 && !(n[0] === 169 && n[1] === 254);
  }
  function pid(r, h, n) {
    var s = String(r || '').replace(/\s/g, '').toUpperCase();
    var chave = '41' + String(h).slice(2).toUpperCase();
    var i = s.indexOf(chave);
    if (i < 0) return null;
    var m = s.slice(i + 4, i + 4 + n * 2).match(/../g);
    if (!m || m.length !== n) return null;
    return m.map(function (x) {
      return parseInt(x, 16);
    });
  }
  function dtc(r) {
    var h = String(r || '').replace(/\s/g, '').toUpperCase();
    var i = h.indexOf('43');
    if (i < 0) return [];
    return (h.slice(i + 2).match(/.{4}/g) || []).filter(function (x) {
      return /^[0-9A-F]{4}$/.test(x) && x !== '0000';
    }).map(function (x) {
      var n = parseInt(x[0], 16);
      return 'PCBU'[n >> 2] + (n & 3) + x.slice(1);
    });
  }
  function acumulador() {
    var b = '';
    return {
      add: function add(s) {
        b += s;
      },
      clr: function clr() {
        b = '';
      },
      get: function get() {
        return b;
      }
    };
  }
  function espera(_x4) {
    return _espera.apply(this, arguments);
  }
  function _espera() {
    _espera = _asyncToGenerator(_regenerator().m(function _callee12(a) {
      var ms,
        fim,
        _args12 = arguments;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            ms = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 1500;
            fim = Date.now() + ms;
          case 1:
            if (!(Date.now() < fim)) {
              _context12.n = 4;
              break;
            }
            if (!a.get().includes('>')) {
              _context12.n = 2;
              break;
            }
            return _context12.a(3, 4);
          case 2:
            _context12.n = 3;
            return new Promise(function (r) {
              return setTimeout(r, 35);
            });
          case 3:
            _context12.n = 1;
            break;
          case 4:
            return _context12.a(2, a.get().replace(/[\r\n>]+/g, ' ').trim());
        }
      }, _callee12);
    }));
    return _espera.apply(this, arguments);
  }
  function viaSerial() {
    return _viaSerial.apply(this, arguments);
  }
  function _viaSerial() {
    _viaSerial = _asyncToGenerator(_regenerator().m(function _callee14() {
      var port, info, id;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.n) {
          case 0:
            if (navigator.serial) {
              _context14.n = 1;
              break;
            }
            throw new Error('Web Serial indisponível. Utilize Chrome ou Edge em um computador compatível.');
          case 1:
            _context14.n = 2;
            return navigator.serial.requestPort();
          case 2:
            port = _context14.v;
            info = port.getInfo();
            id = {
              vid: hx(info.usbVendorId),
              pid: hx(info.usbProductId),
              chave: hx(info.usbVendorId) + ':' + hx(info.usbProductId)
            };
            return _context14.a(2, {
              via: 'usb',
              port: port,
              info: info,
              usb: id,
              aberto: false,
              cmd: null,
              close: function () {
                var _close2 = _asyncToGenerator(_regenerator().m(function _callee13() {
                  var _t8;
                  return _regenerator().w(function (_context13) {
                    while (1) switch (_context13.p = _context13.n) {
                      case 0:
                        if (!this.aberto) {
                          _context13.n = 5;
                          break;
                        }
                        _context13.p = 1;
                        _context13.n = 2;
                        return port.close();
                      case 2:
                        _context13.n = 4;
                        break;
                      case 3:
                        _context13.p = 3;
                        _t8 = _context13.v;
                      case 4:
                        this.aberto = false;
                      case 5:
                        return _context13.a(2);
                    }
                  }, _callee13, this, [[1, 3]]);
                }));
                function close() {
                  return _close2.apply(this, arguments);
                }
                return close;
              }()
            });
        }
      }, _callee14);
    }));
    return _viaSerial.apply(this, arguments);
  }
  function abrirSerial(_x5, _x6) {
    return _abrirSerial.apply(this, arguments);
  }
  function _abrirSerial() {
    _abrirSerial = _asyncToGenerator(_regenerator().m(function _callee18(t, baud) {
      var p, encoder, decoder, acc, ativo, reader, writer, leitura, conexao, _t10, _t11;
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.p = _context18.n) {
          case 0:
            p = t.port;
            if (p) {
              _context18.n = 1;
              break;
            }
            throw new Error('Porta USB não disponível');
          case 1:
            if (!(p.readable || p.writable)) {
              _context18.n = 2;
              break;
            }
            throw new Error('A porta serial já está sendo utilizada');
          case 2:
            _context18.n = 3;
            return p.open({
              baudRate: baud || 38400
            });
          case 3:
            encoder = new TextEncoder();
            decoder = new TextDecoder();
            acc = acumulador();
            ativo = true;
            reader = null;
            writer = null;
            _context18.p = 4;
            reader = p.readable.getReader();
            writer = p.writable.getWriter();
            _context18.n = 10;
            break;
          case 5:
            _context18.p = 5;
            _t10 = _context18.v;
            _context18.p = 6;
            _context18.n = 7;
            return p.close();
          case 7:
            _context18.n = 9;
            break;
          case 8:
            _context18.p = 8;
            _t11 = _context18.v;
          case 9:
            throw _t10;
          case 10:
            leitura = _asyncToGenerator(_regenerator().m(function _callee15() {
              var x, _t9;
              return _regenerator().w(function (_context15) {
                while (1) switch (_context15.p = _context15.n) {
                  case 0:
                    _context15.p = 0;
                  case 1:
                    if (!ativo) {
                      _context15.n = 4;
                      break;
                    }
                    _context15.n = 2;
                    return reader.read();
                  case 2:
                    x = _context15.v;
                    if (!x.done) {
                      _context15.n = 3;
                      break;
                    }
                    return _context15.a(3, 4);
                  case 3:
                    if (x.value) acc.add(decoder.decode(x.value));
                    _context15.n = 1;
                    break;
                  case 4:
                    _context15.n = 6;
                    break;
                  case 5:
                    _context15.p = 5;
                    _t9 = _context15.v;
                  case 6:
                    return _context15.a(2);
                }
              }, _callee15, null, [[0, 5]]);
            }))();
            conexao = {
              cmd: function () {
                var _cmd2 = _asyncToGenerator(_regenerator().m(function _callee16(c) {
                  var ms,
                    _args16 = arguments;
                  return _regenerator().w(function (_context16) {
                    while (1) switch (_context16.n) {
                      case 0:
                        ms = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 1500;
                        if (ativo) {
                          _context16.n = 1;
                          break;
                        }
                        throw new Error('Conexão serial encerrada');
                      case 1:
                        acc.clr();
                        _context16.n = 2;
                        return writer.write(encoder.encode(String(c) + '\r'));
                      case 2:
                        return _context16.a(2, espera(acc, ms));
                    }
                  }, _callee16);
                }));
                function cmd(_x15) {
                  return _cmd2.apply(this, arguments);
                }
                return cmd;
              }(),
              close: function () {
                var _close3 = _asyncToGenerator(_regenerator().m(function _callee17() {
                  var _t0, _t1;
                  return _regenerator().w(function (_context17) {
                    while (1) switch (_context17.p = _context17.n) {
                      case 0:
                        ativo = false;
                        _context17.p = 1;
                        _context17.n = 2;
                        return reader.cancel();
                      case 2:
                        _context17.n = 4;
                        break;
                      case 3:
                        _context17.p = 3;
                        _t0 = _context17.v;
                      case 4:
                        try {
                          reader.releaseLock();
                        } catch (_) {}
                        try {
                          writer.releaseLock();
                        } catch (_) {}
                        _context17.p = 5;
                        _context17.n = 6;
                        return p.close();
                      case 6:
                        _context17.n = 8;
                        break;
                      case 7:
                        _context17.p = 7;
                        _t1 = _context17.v;
                      case 8:
                        _context17.n = 9;
                        return leitura.catch(function () {});
                      case 9:
                        t.aberto = false;
                      case 10:
                        return _context17.a(2);
                    }
                  }, _callee17, null, [[5, 7], [1, 3]]);
                }));
                function close() {
                  return _close3.apply(this, arguments);
                }
                return close;
              }()
            };
            t.aberto = true;
            t.cmd = conexao.cmd;
            t.serial = conexao;
            return _context18.a(2, conexao);
        }
      }, _callee18, null, [[6, 8], [4, 5]]);
    }));
    return _abrirSerial.apply(this, arguments);
  }
  function bytesBLE(valor) {
    var v = valor.target.value;
    return new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
  }
  function viaBLE() {
    return _viaBLE.apply(this, arguments);
  }
  function _viaBLE() {
    _viaBLE = _asyncToGenerator(_regenerator().m(function _callee21() {
      var servicos, dev, server, leitura, escrita, listener, servicosEncontrados, _iterator, _step, s, chars, w, n, acc, decoder, encoder, chunk, _t12, _t13;
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.p = _context21.n) {
          case 0:
            if (navigator.bluetooth) {
              _context21.n = 1;
              break;
            }
            throw new Error('Web Bluetooth indisponível neste navegador. Utilize Chrome ou Edge compatível.');
          case 1:
            servicos = Array.isArray(CFG.ble && CFG.ble.servicos) ? CFG.ble.servicos : [0xFFF0, 0xFFE0, 0x18F0];
            _context21.n = 2;
            return navigator.bluetooth.requestDevice({
              acceptAllDevices: true,
              optionalServices: servicos
            });
          case 2:
            dev = _context21.v;
            server = null;
            leitura = null;
            escrita = null;
            listener = null;
            _context21.p = 3;
            _context21.n = 4;
            return dev.gatt.connect();
          case 4:
            server = _context21.v;
            _context21.n = 5;
            return server.getPrimaryServices();
          case 5:
            servicosEncontrados = _context21.v;
            _iterator = _createForOfIteratorHelper(servicosEncontrados);
            _context21.p = 6;
            _iterator.s();
          case 7:
            if ((_step = _iterator.n()).done) {
              _context21.n = 11;
              break;
            }
            s = _step.value;
            _context21.n = 8;
            return s.getCharacteristics();
          case 8:
            chars = _context21.v;
            w = chars.find(function (c) {
              return c.properties.write || c.properties.writeWithoutResponse;
            });
            n = chars.find(function (c) {
              return c.properties.notify || c.properties.indicate;
            });
            if (!(w && n)) {
              _context21.n = 9;
              break;
            }
            escrita = w;
            leitura = n;
            return _context21.a(3, 11);
          case 9:
            if (w && !escrita) escrita = w;
            if (n && !leitura) leitura = n;
          case 10:
            _context21.n = 7;
            break;
          case 11:
            _context21.n = 13;
            break;
          case 12:
            _context21.p = 12;
            _t12 = _context21.v;
            _iterator.e(_t12);
          case 13:
            _context21.p = 13;
            _iterator.f();
            return _context21.f(13);
          case 14:
            if (escrita) {
              _context21.n = 15;
              break;
            }
            throw new Error('O dispositivo Bluetooth não disponibilizou característica de escrita');
          case 15:
            if (leitura) {
              _context21.n = 16;
              break;
            }
            throw new Error('Não foi encontrada característica Bluetooth para receber respostas');
          case 16:
            acc = acumulador();
            decoder = new TextDecoder();
            encoder = new TextEncoder();
            listener = function listener(e) {
              try {
                acc.add(decoder.decode(bytesBLE(e)));
              } catch (_) {}
            };
            _context21.n = 17;
            return leitura.startNotifications();
          case 17:
            leitura.addEventListener('characteristicvaluechanged', listener);
            chunk = Math.max(1, Math.min(180, Number(CFG.ble && CFG.ble.chunk_bytes) || 20));
            return _context21.a(2, {
              via: 'bluetooth',
              nome: dev.name || 'Dispositivo Bluetooth',
              device: dev,
              server: server,
              leitura: leitura,
              escrita: escrita,
              cmd: function () {
                var _cmd3 = _asyncToGenerator(_regenerator().m(function _callee19(c) {
                  var ms,
                    dados,
                    i,
                    parte,
                    _args19 = arguments;
                  return _regenerator().w(function (_context19) {
                    while (1) switch (_context19.n) {
                      case 0:
                        ms = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : 1500;
                        if (dev.gatt.connected) {
                          _context19.n = 1;
                          break;
                        }
                        throw new Error('Bluetooth desconectado');
                      case 1:
                        acc.clr();
                        dados = encoder.encode(String(c) + '\r');
                        i = 0;
                      case 2:
                        if (!(i < dados.length)) {
                          _context19.n = 6;
                          break;
                        }
                        parte = dados.slice(i, i + chunk);
                        if (!escrita.writeValueWithoutResponse) {
                          _context19.n = 4;
                          break;
                        }
                        _context19.n = 3;
                        return escrita.writeValueWithoutResponse(parte);
                      case 3:
                        _context19.n = 5;
                        break;
                      case 4:
                        _context19.n = 5;
                        return escrita.writeValue(parte);
                      case 5:
                        i += chunk;
                        _context19.n = 2;
                        break;
                      case 6:
                        return _context19.a(2, espera(acc, ms));
                    }
                  }, _callee19);
                }));
                function cmd(_x16) {
                  return _cmd3.apply(this, arguments);
                }
                return cmd;
              }(),
              close: function () {
                var _close4 = _asyncToGenerator(_regenerator().m(function _callee20() {
                  return _regenerator().w(function (_context20) {
                    while (1) switch (_context20.n) {
                      case 0:
                        try {
                          if (listener && leitura) {
                            leitura.removeEventListener('characteristicvaluechanged', listener);
                          }
                          if (dev.gatt.connected) dev.gatt.disconnect();
                        } catch (_) {}
                      case 1:
                        return _context20.a(2);
                    }
                  }, _callee20);
                }));
                function close() {
                  return _close4.apply(this, arguments);
                }
                return close;
              }()
            });
          case 18:
            _context21.p = 18;
            _t13 = _context21.v;
            try {
              if (dev.gatt.connected) dev.gatt.disconnect();
            } catch (_) {}
            throw _t13;
          case 19:
            return _context21.a(2);
        }
      }, _callee21, null, [[6, 12, 13, 14], [3, 18]]);
    }));
    return _viaBLE.apply(this, arguments);
  }
  function viaAgente(ip, porta) {
    var p = Number(porta || 35000);
    if (!ipValido(ip)) throw new Error('IP inválido');
    if (!Number.isInteger(p) || p < 1 || p > 65535) {
      throw new Error('Porta de rede inválida');
    }
    return {
      via: 'wifi',
      ip: ip,
      porta: p,
      cmd: function () {
        var _cmd = _asyncToGenerator(_regenerator().m(function _callee(c) {
          var ms,
            r,
            _args = arguments;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                ms = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1500;
                _context.n = 1;
                return agenteFetch('/tcp', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    ip: ip,
                    porta: p,
                    cmd: String(c),
                    t: Math.min(8000, Math.max(500, Number(ms) || 1500))
                  })
                }, Math.min(10000, Number(ms) + 3000));
              case 1:
                r = _context.v;
                if (!(r.ok !== true)) {
                  _context.n = 2;
                  break;
                }
                throw new Error(r.erro || 'Falha na comunicação TCP');
              case 2:
                return _context.a(2, String(r.resp || '').replace(/[\r\n>]+/g, ' ').trim());
            }
          }, _callee);
        }));
        function cmd(_x7) {
          return _cmd.apply(this, arguments);
        }
        return cmd;
      }(),
      close: function () {
        var _close = _asyncToGenerator(_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        function close() {
          return _close.apply(this, arguments);
        }
        return close;
      }()
    };
  }
  function alvoPorPlaca(placa, alvoExtra) {
    if (alvoExtra) return alvoExtra;
    return {
      uno: 'avr',
      esp32: 'esp32',
      pico: 'pico',
      rpi4: 'linux'
    }[placa] || null;
  }
  function alvoPorSistema(sistema) {
    var s = SISTEMAS[sistema];
    return s ? s.alvo : null;
  }
  function ehELM(_x8) {
    return _ehELM.apply(this, arguments);
  }
  function _ehELM() {
    _ehELM = _asyncToGenerator(_regenerator().m(function _callee22(t) {
      var _i, _arr, comando, r, _t14;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.p = _context22.n) {
          case 0:
            if (!(!t || typeof t.cmd !== 'function')) {
              _context22.n = 1;
              break;
            }
            return _context22.a(2, null);
          case 1:
            _i = 0, _arr = ['ATZ', 'ATI'];
          case 2:
            if (!(_i < _arr.length)) {
              _context22.n = 8;
              break;
            }
            comando = _arr[_i];
            _context22.p = 3;
            _context22.n = 4;
            return t.cmd(comando, 2500);
          case 4:
            r = _context22.v;
            if (!/ELM|OBD|STN|V-LINK/i.test(r)) {
              _context22.n = 5;
              break;
            }
            return _context22.a(2, r);
          case 5:
            _context22.n = 7;
            break;
          case 6:
            _context22.p = 6;
            _t14 = _context22.v;
          case 7:
            _i++;
            _context22.n = 2;
            break;
          case 8:
            return _context22.a(2, null);
        }
      }, _callee22, null, [[3, 6]]);
    }));
    return _ehELM.apply(this, arguments);
  }
  function _identificar2(_x9) {
    return _identificar.apply(this, arguments);
  }
  function _identificar() {
    _identificar = _asyncToGenerator(_regenerator().m(function _callee23(t) {
      var ctx,
        r,
        k,
        u,
        n,
        e,
        s,
        _args23 = arguments;
      return _regenerator().w(function (_context23) {
        while (1) switch (_context23.n) {
          case 0:
            ctx = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : {};
            _context23.n = 1;
            return READY;
          case 1:
            r = {
              via: ctx.via || 'desconhecida',
              tipo: 'placa',
              nome: 'Dispositivo não identificado',
              alvo: null,
              placa: null,
              certeza: 'não identificada',
              sistema: '—',
              pacote: '—',
              detalhe: []
            };
            if (ctx.usb) {
              k = ctx.usb.chave || hx(ctx.usb.usbVendorId) + ':' + hx(ctx.usb.usbProductId);
              u = usbTabela()[k];
              r.detalhe.push('USB ' + k);
              if (u) {
                r.nome = u[0];
                r.placa = u[1] || null;
                r.certeza = u[2] || 'parcial';
                r.alvo = alvoPorPlaca(r.placa, u[3]);
                if (r.alvo === 'avr') r.sistema = 'Firmware AVR';
                if (r.alvo === 'esp32') r.sistema = 'Firmware ESP32';
                if (r.alvo === 'pico') r.sistema = 'Firmware UF2';
              }
            }
            if (ctx.nomeBLE) {
              n = NOMES.find(function (x) {
                return x[0].test(ctx.nomeBLE);
              });
              r.detalhe.push('BLE "' + ctx.nomeBLE + '"');
              if (n) {
                r.nome = n[1];
                if (n[2] === 'obd') {
                  r.placa = null;
                } else {
                  r.placa = n[2];
                  r.alvo = alvoPorPlaca(n[2]);
                }
                r.certeza = 'identificado pelo nome BLE';
              } else {
                r.nome = ctx.nomeBLE;
                r.certeza = 'nome anunciado pelo dispositivo';
              }
            }
            if (!(t && t.cmd && (ctx.via === 'wifi' || ctx.via === 'bluetooth'))) {
              _context23.n = 3;
              break;
            }
            _context23.n = 2;
            return ehELM(t);
          case 2:
            e = _context23.v;
            if (e) {
              r.tipo = 'motor';
              r.nome = 'Motor via OBD-II (' + e.replace(/ATZ|ATI/g, '').trim() + ')';
              r.sistema = 'ECU do veículo (OBD-II)';
              r.certeza = 'confirmada por resposta ELM/OBD';
              r.placa = null;
              r.alvo = null;
              r.pacote = 'Diagnóstico OBD-II';
            }
          case 3:
            if (ctx.sonda && ctx.sonda.ok) {
              s = ctx.sonda;
              if (s.sistema) {
                r.sistema = s.sistema;
                r.alvo = alvoPorSistema(s.sistema);
                r.pacote = s.pacote || '—';
                if (r.nome === 'Dispositivo não identificado') {
                  r.nome = SISTEMAS[s.sistema] ? SISTEMAS[s.sistema].nome : s.sistema;
                }
                r.certeza = 'serviço identificado na rede';
              }
              r.detalhe.push('Portas: ' + (s.abertas || []).map(function (x) {
                return x.porta + '/' + x.servico;
              }).join(', '));
            }
            if (r.tipo === 'placa' && !r.alvo && !ctx.sonda) {
              r.detalhe.push('Identificação física ainda inconclusiva');
            }
            return _context23.a(2, r);
        }
      }, _callee23);
    }));
    return _identificar.apply(this, arguments);
  }
  function _lerOBD2(_x0) {
    return _lerOBD.apply(this, arguments);
  }
  function _lerOBD() {
    _lerOBD = _asyncToGenerator(_regenerator().m(function _callee25(t) {
      var timeout, g, init, _iterator2, _step2, c, rpm, tmp, vel, car, mil, cod, _t16, _t17;
      return _regenerator().w(function (_context25) {
        while (1) switch (_context25.p = _context25.n) {
          case 0:
            if (!(!t || typeof t.cmd !== 'function')) {
              _context25.n = 1;
              break;
            }
            throw new Error('Nenhuma conexão OBD disponível');
          case 1:
            timeout = timeoutOBD();
            g = function () {
              var _ref3 = _asyncToGenerator(_regenerator().m(function _callee24(h) {
                var n,
                  _args24 = arguments,
                  _t15;
                return _regenerator().w(function (_context24) {
                  while (1) switch (_context24.n) {
                    case 0:
                      n = _args24.length > 1 && _args24[1] !== undefined ? _args24[1] : 1;
                      _t15 = pid;
                      _context24.n = 1;
                      return t.cmd(h, timeout);
                    case 1:
                      return _context24.a(2, _t15(_context24.v, h, n));
                  }
                }, _callee24);
              }));
              return function g(_x17) {
                return _ref3.apply(this, arguments);
              };
            }();
            init = Array.isArray(CFG.elm327 && CFG.elm327.init) ? CFG.elm327.init : ['ATE0', 'ATSP0'];
            _iterator2 = _createForOfIteratorHelper(init);
            _context25.p = 2;
            _iterator2.s();
          case 3:
            if ((_step2 = _iterator2.n()).done) {
              _context25.n = 5;
              break;
            }
            c = _step2.value;
            _context25.n = 4;
            return t.cmd(c, 2000);
          case 4:
            _context25.n = 3;
            break;
          case 5:
            _context25.n = 7;
            break;
          case 6:
            _context25.p = 6;
            _t16 = _context25.v;
            _iterator2.e(_t16);
          case 7:
            _context25.p = 7;
            _iterator2.f();
            return _context25.f(7);
          case 8:
            _context25.n = 9;
            return g('010C', 2);
          case 9:
            rpm = _context25.v;
            _context25.n = 10;
            return g('0105');
          case 10:
            tmp = _context25.v;
            _context25.n = 11;
            return g('010D');
          case 11:
            vel = _context25.v;
            _context25.n = 12;
            return g('0104');
          case 12:
            car = _context25.v;
            _context25.n = 13;
            return g('0101', 4);
          case 13:
            mil = _context25.v;
            _t17 = dtc;
            _context25.n = 14;
            return t.cmd('03', timeout);
          case 14:
            cod = _t17(_context25.v);
            return _context25.a(2, {
              rpm: rpm ? (rpm[0] * 256 + rpm[1]) / 4 : null,
              temp: tmp ? tmp[0] - 40 : null,
              vel: vel ? vel[0] : null,
              carga: car ? Math.round(car[0] * 100 / 255) : null,
              mil: mil ? !!(mil[0] & 0x80) : null,
              dtc: cod
            });
        }
      }, _callee25, null, [[2, 6, 7, 8]]);
    }));
    return _lerOBD.apply(this, arguments);
  }
  var conexaoAtual = null;
  var conexaoID = 0;
  function encerrarAtual() {
    return _encerrarAtual.apply(this, arguments);
  }
  function _encerrarAtual() {
    _encerrarAtual = _asyncToGenerator(_regenerator().m(function _callee26() {
      var anterior, _t18;
      return _regenerator().w(function (_context26) {
        while (1) switch (_context26.p = _context26.n) {
          case 0:
            anterior = conexaoAtual;
            conexaoAtual = null;
            if (anterior) {
              _context26.n = 1;
              break;
            }
            return _context26.a(2);
          case 1:
            _context26.p = 1;
            if (!(anterior.t && typeof anterior.t.close === 'function')) {
              _context26.n = 2;
              break;
            }
            _context26.n = 2;
            return anterior.t.close();
          case 2:
            _context26.n = 4;
            break;
          case 3:
            _context26.p = 3;
            _t18 = _context26.v;
            console.warn('[AFHW] Erro ao encerrar conexão:', _t18);
          case 4:
            return _context26.a(2);
        }
      }, _callee26, null, [[1, 3]]);
    }));
    return _encerrarAtual.apply(this, arguments);
  }
  function aplicar(id) {
    try {
      if (id && id.placa && typeof usar === 'function' && typeof PL !== 'undefined' && PL.length) {
        var i = PL.findIndex(function (p) {
          return p.id === id.placa;
        });
        if (i >= 0) usar(i);
      }
    } catch (e) {
      console.warn('[AFHW] Integração com página externa:', e);
    }
  }
  var AFHW = {
    versao: '1.5.0',
    _t: {
      pid: pid,
      dtc: dtc
    },
    cur: null,
    ready: READY,
    config: function config() {
      return CFG;
    },
    erroConfig: function erroConfig() {
      return configErro;
    },
    agente: {
      ping: testarAgente,
      portas: listarPortas,
      probe: sondarRede
    },
    identificar: function identificar(t, ctx) {
      return _asyncToGenerator(_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, _identificar2(t, ctx));
          }
        }, _callee3);
      }))();
    },
    conectar: function conectar(via, ip, porta) {
      var _this = this;
      return _asyncToGenerator(_regenerator().m(function _callee4() {
        var idConexao, t, ctx, E, id, atual, _t, _t2, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.n = 1;
              return READY;
            case 1:
              idConexao = ++conexaoID;
              _context4.n = 2;
              return encerrarAtual();
            case 2:
              t = null;
              ctx = {
                via: via
              };
              _context4.p = 3;
              if (!(via === 'usb')) {
                _context4.n = 5;
                break;
              }
              _context4.n = 4;
              return viaSerial();
            case 4:
              t = _context4.v;
              ctx.usb = t.usb;
              _context4.n = 13;
              break;
            case 5:
              if (!(via === 'bluetooth')) {
                _context4.n = 7;
                break;
              }
              _context4.n = 6;
              return viaBLE();
            case 6:
              t = _context4.v;
              ctx.nomeBLE = t.nome;
              _context4.n = 13;
              break;
            case 7:
              if (!(via === 'wifi')) {
                _context4.n = 12;
                break;
              }
              E = CFG.elm327 || {};
              ip = String(ip || E.ip_padrao || '192.168.0.10').trim();
              porta = Number(porta || E.porta_padrao || 35000);
              t = viaAgente(ip, porta);
              ctx.ip = ip;
              ctx.porta = porta;
              _context4.p = 8;
              _context4.n = 9;
              return sondarRede(ip);
            case 9:
              ctx.sonda = _context4.v;
              _context4.n = 11;
              break;
            case 10:
              _context4.p = 10;
              _t = _context4.v;
              ctx.erroSonda = _t.message;
              console.warn('[AFHW] Sondagem de rede:', _t.message);
            case 11:
              _context4.n = 13;
              break;
            case 12:
              throw new Error('Tipo de conexão desconhecido: ' + via);
            case 13:
              _context4.n = 14;
              return _identificar2(t, ctx);
            case 14:
              id = _context4.v;
              if (!(idConexao !== conexaoID)) {
                _context4.n = 16;
                break;
              }
              if (!(t && t.close)) {
                _context4.n = 15;
                break;
              }
              _context4.n = 15;
              return t.close();
            case 15:
              throw new Error('A conexão foi substituída por outra solicitação');
            case 16:
              atual = {
                t: t,
                id: id,
                ctx: ctx,
                conectadoEm: new Date().toISOString()
              };
              conexaoAtual = atual;
              _this.cur = atual;
              aplicar(id);
              return _context4.a(2, atual);
            case 17:
              _context4.p = 17;
              _t2 = _context4.v;
              if (!(t && t.close)) {
                _context4.n = 21;
                break;
              }
              _context4.p = 18;
              _context4.n = 19;
              return t.close();
            case 19:
              _context4.n = 21;
              break;
            case 20:
              _context4.p = 20;
              _t3 = _context4.v;
            case 21:
              if (idConexao === conexaoID) {
                conexaoAtual = null;
                _this.cur = null;
              }
              throw _t2;
            case 22:
              return _context4.a(2);
          }
        }, _callee4, null, [[18, 20], [8, 10], [3, 17]]);
      }))();
    },
    desconectar: function desconectar() {
      var _this2 = this;
      return _asyncToGenerator(_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              ++conexaoID;
              _context5.n = 1;
              return encerrarAtual();
            case 1:
              _this2.cur = null;
              return _context5.a(2, true);
          }
        }, _callee5);
      }))();
    },
    aplicar: aplicar,
    lerOBD: function lerOBD(t) {
      var _this3 = this;
      return _asyncToGenerator(_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              return _context6.a(2, _lerOBD2(t || _this3.cur && _this3.cur.t));
          }
        }, _callee6);
      }))();
    }
  };
  window.AFHW = AFHW;
  if (typeof document === 'undefined') return;
  if (document.getElementById('af-hardware-panel')) return;
  var H = document.createElement('div');
  H.id = 'af-hardware-panel';
  H.style.cssText = ['position:fixed', 'left:12px', 'bottom:12px', 'z-index:2147483000', 'font:13px system-ui,sans-serif'].join(';');
  var S = H.attachShadow({
    mode: 'open'
  });
  S.innerHTML = "\n<style>\n*{box-sizing:border-box}\nbutton,input{\n font:inherit;\n color:#e8f1ff;\n background:#0a1d3a;\n border:1px solid #27c8ff;\n border-radius:8px;\n padding:8px 10px\n}\nbutton{cursor:pointer}\nbutton:disabled{opacity:.45;cursor:not-allowed}\nbutton:hover{background:#12325b}\n.f{background:#1f7bff;font-weight:700}\n#p{\n display:none;\n width:min(390px,92vw);\n max-height:75vh;\n overflow:auto;\n margin-bottom:8px;\n padding:13px;\n background:#06122cf5;\n border:1px solid #27c8ff;\n border-radius:12px;\n color:#e8f1ff;\n box-shadow:0 8px 35px #0008\n}\n.r{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}\n.o{color:#2fd48a}\n.x{color:#ff6b75}\n.warn{color:#ffc66d}\nsmall{color:#9ab1d0;display:block;line-height:1.5}\nh3{margin:0 0 8px;font-size:14px;color:#27c8ff}\nhr{border:0;border-top:1px solid #254365;margin:10px 0}\n#obd{\n display:grid;\n grid-template-columns:1fr 1fr;\n gap:7px;\n margin:9px 0\n}\n.metric{\n padding:7px;\n background:#102746;\n border-radius:7px\n}\n.metric b{display:block;font-size:16px;margin-top:3px}\n#rt{margin-top:7px}\n#status{margin-top:8px}\n.full{width:100%}\n</style>\n\n<div id=\"p\">\n <h3>Conectar equipamento</h3>\n\n <div class=\"r\">\n  <button data-v=\"usb\">USB / Serial</button>\n  <button data-v=\"bluetooth\">Bluetooth</button>\n  <button data-v=\"wifi\">Wi-Fi / Rede</button>\n </div>\n\n <div class=\"r\">\n  <input id=\"ip\" placeholder=\"IP do equipamento\" value=\"192.168.0.10\" style=\"flex:1;min-width:150px\">\n  <input id=\"porta\" placeholder=\"Porta\" value=\"35000\" style=\"width:82px\">\n </div>\n\n <div id=\"o\">\n  <small>Escolha o tipo de conex\xE3o para come\xE7ar.</small>\n </div>\n\n <div id=\"status\"></div>\n</div>\n\n<button class=\"f\" id=\"b\">\u26A1 Conectar</button>\n";
  var $ = function $(s) {
    return S.querySelector(s);
  };
  var O = $('#o');
  var STATUS = $('#status');
  var tm = null;
  var tickID = 0;
  function escapar(s) {
    return String(s !== null && s !== void 0 ? s : '').replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c];
    });
  }
  function mensagem(msg) {
    var tipo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    STATUS.className = tipo;
    STATUS.textContent = msg;
  }
  function pararLeitura() {
    if (tm) {
      clearInterval(tm);
      tm = null;
    }
    ++tickID;
  }
  function renderIdentificacao(i) {
    var box = document.createElement('div');
    var nome = document.createElement('b');
    nome.textContent = i.nome || 'Dispositivo não identificado';
    box.appendChild(nome);
    var dados = ['Tipo: ' + (i.tipo || '—'), 'Certeza: ' + (i.certeza || '—'), 'Sistema: ' + (i.sistema || '—'), 'Alvo: ' + (i.alvo || 'sem instalador')];
    dados.forEach(function (x) {
      var sm = document.createElement('small');
      sm.textContent = x;
      box.appendChild(sm);
    });
    if (i.detalhe && i.detalhe.length) {
      var sm = document.createElement('small');
      sm.textContent = i.detalhe.join(' · ');
      box.appendChild(sm);
    }
    return box;
  }
  function renderRota(resultado) {
    var box = document.createElement('div');
    if (!Array.isArray(resultado)) {
      box.textContent = 'Diagnóstico indisponível.';
      return box;
    }
    resultado.forEach(function (x) {
      var linha = document.createElement('div');
      linha.className = x.ok ? 'o' : 'x';
      linha.style.margin = '5px 0';
      linha.textContent = (x.ok ? '✔ ' : '✖ ') + (x.n || 'Etapa') + ' — ' + (x.m || '');
      box.appendChild(linha);
      if (!x.ok && x.d) {
        var sm = document.createElement('small');
        sm.textContent = x.d;
        box.appendChild(sm);
      }
    });
    return box;
  }
  function atualizarOBD(_x1, _x10, _x11) {
    return _atualizarOBD.apply(this, arguments);
  }
  function _atualizarOBD() {
    _atualizarOBD = _asyncToGenerator(_regenerator().m(function _callee27(c, box, meuID) {
      var _d$rpm, d, sm, _t19;
      return _regenerator().w(function (_context27) {
        while (1) switch (_context27.p = _context27.n) {
          case 0:
            if (!(meuID !== tickID)) {
              _context27.n = 1;
              break;
            }
            return _context27.a(2);
          case 1:
            _context27.p = 1;
            _context27.n = 2;
            return AFHW.lerOBD(c.t);
          case 2:
            d = _context27.v;
            if (!(meuID !== tickID)) {
              _context27.n = 3;
              break;
            }
            return _context27.a(2);
          case 3:
            box.innerHTML = "\n      <div class=\"metric\">RPM<b>".concat((_d$rpm = d.rpm) !== null && _d$rpm !== void 0 ? _d$rpm : '—', "</b></div>\n      <div class=\"metric\">Temperatura<b>").concat(d.temp == null ? '—' : d.temp + ' °C', "</b></div>\n      <div class=\"metric\">Velocidade<b>").concat(d.vel == null ? '—' : d.vel + ' km/h', "</b></div>\n      <div class=\"metric\">Carga<b>").concat(d.carga == null ? '—' : d.carga + '%', "</b></div>\n    ");
            sm = document.createElement('small');
            sm.textContent = 'Luz MIL: ' + (d.mil == null ? 'não disponível' : d.mil ? 'ACESА' : 'apagada') + ' · Códigos: ' + (d.dtc.length ? d.dtc.join(', ') : 'nenhum código informado');
            box.appendChild(sm);
            _context27.n = 6;
            break;
          case 4:
            _context27.p = 4;
            _t19 = _context27.v;
            if (!(meuID !== tickID)) {
              _context27.n = 5;
              break;
            }
            return _context27.a(2);
          case 5:
            box.textContent = 'Leitura OBD falhou: ' + _t19.message;
            box.className = 'x';
          case 6:
            return _context27.a(2);
        }
      }, _callee27, null, [[1, 4]]);
    }));
    return _atualizarOBD.apply(this, arguments);
  }
  function iniciarOBD(c, box) {
    pararLeitura();
    var meuID = tickID;
    atualizarOBD(c, box, meuID);
    tm = setInterval(function () {
      return atualizarOBD(c, box, meuID);
    }, intervaloOBD());
  }
  function instalarUI(_x12, _x13) {
    return _instalarUI.apply(this, arguments);
  }
  function _instalarUI() {
    _instalarUI = _asyncToGenerator(_regenerator().m(function _callee29(c, i) {
      var box, titulo, alvo, guia, sm, _sm, carregando, lista, _sm2, a, req, _t21, _t22;
      return _regenerator().w(function (_context29) {
        while (1) switch (_context29.p = _context29.n) {
          case 0:
            box = document.createElement('div');
            titulo = document.createElement('h3');
            titulo.style.marginTop = '12px';
            titulo.textContent = 'Instalar ALMAFLUXO';
            box.appendChild(titulo);
            O.appendChild(box);
            alvo = i.alvo;
            if (window.AFGuia) {
              guia = document.createElement('button');
              guia.textContent = 'Guia passo a passo';
              guia.onclick = function () {
                AFGuia.abrir(alvo || 'outras');
              };
              box.appendChild(guia);
            }
            if (alvo) {
              _context29.n = 1;
              break;
            }
            sm = document.createElement('small');
            sm.textContent = 'Este equipamento foi identificado, mas não possui um alvo de instalação associado.';
            box.appendChild(sm);
            return _context29.a(2);
          case 1:
            if (window.AFGravador) {
              _context29.n = 2;
              break;
            }
            _sm = document.createElement('small');
            _sm.textContent = 'O módulo gravador.js não está carregado.';
            box.appendChild(_sm);
            return _context29.a(2);
          case 2:
            carregando = document.createElement('small');
            carregando.textContent = 'Consultando pacotes publicados...';
            box.appendChild(carregando);
            _context29.p = 3;
            _context29.n = 4;
            return AFGravador.pacotes(alvo);
          case 4:
            lista = _context29.v;
            carregando.remove();
            if (!(!Array.isArray(lista) || !lista.length)) {
              _context29.n = 9;
              break;
            }
            _sm2 = document.createElement('small');
            _sm2.className = 'warn';
            _sm2.textContent = 'Nenhum pacote publicado para o alvo "' + alvo + '".';
            box.appendChild(_sm2);
            _context29.p = 5;
            _context29.n = 6;
            return AFGravador.alvo(alvo);
          case 6:
            a = _context29.v;
            if (a && Array.isArray(a.requisitos)) {
              req = document.createElement('small');
              req.textContent = 'Requisitos: ' + a.requisitos.join('; ');
              box.appendChild(req);
            }
            _context29.n = 8;
            break;
          case 7:
            _context29.p = 7;
            _t21 = _context29.v;
          case 8:
            return _context29.a(2);
          case 9:
            lista.forEach(function (p) {
              var b = document.createElement('button');
              b.style.margin = '5px 4px 5px 0';
              b.textContent = 'Instalar ' + (p.nome || p.id || alvo) + ' ' + (p.versao || '');
              var lg = document.createElement('small');
              b.onclick = _asyncToGenerator(_regenerator().m(function _callee28() {
                var pt, cod, resultado, _t20;
                return _regenerator().w(function (_context28) {
                  while (1) switch (_context28.p = _context28.n) {
                    case 0:
                      if (confirm('A operação irá gravar ou instalar "' + (p.nome || p.id || alvo) + '" no equipamento "' + i.nome + '".\n\nDeseja continuar?')) {
                        _context28.n = 1;
                        break;
                      }
                      return _context28.a(2);
                    case 1:
                      b.disabled = true;
                      lg.className = '';
                      lg.textContent = 'Preparando instalação...';
                      _context28.p = 2;
                      if (!(alvo === 'esp32')) {
                        _context28.n = 6;
                        break;
                      }
                      pt = c.t && c.t.port;
                      if (pt) {
                        _context28.n = 3;
                        break;
                      }
                      throw new Error('Porta USB do ESP32 não está disponível');
                    case 3:
                      if (!(pt.readable || pt.writable)) {
                        _context28.n = 4;
                        break;
                      }
                      throw new Error('A porta serial está ocupada. Desconecte e conecte novamente o equipamento.');
                    case 4:
                      _context28.n = 5;
                      return AFGravador.esp32(p, pt, function (m) {
                        lg.textContent = String(m);
                      }, function (n) {
                        lg.textContent = 'Gravando ' + n + '%';
                      });
                    case 5:
                      _context28.n = 9;
                      break;
                    case 6:
                      cod = prompt('Digite o código de instalação exibido no terminal do agente local:');
                      if (cod) {
                        _context28.n = 7;
                        break;
                      }
                      lg.textContent = 'Instalação cancelada.';
                      return _context28.a(2);
                    case 7:
                      _context28.n = 8;
                      return AFGravador.viaAgente(p, cod.trim(), {
                        ip: c.ctx.ip || null
                      });
                    case 8:
                      resultado = _context28.v;
                      lg.textContent = String(resultado || 'Operação concluída.');
                    case 9:
                      lg.className = 'o';
                      _context28.n = 11;
                      break;
                    case 10:
                      _context28.p = 10;
                      _t20 = _context28.v;
                      lg.className = 'x';
                      lg.textContent = 'Falha na instalação: ' + _t20.message;
                    case 11:
                      _context28.p = 11;
                      b.disabled = false;
                      return _context28.f(11);
                    case 12:
                      return _context28.a(2);
                  }
                }, _callee28, null, [[2, 10, 11, 12]]);
              }));
              box.appendChild(b);
              box.appendChild(lg);
            });
            _context29.n = 11;
            break;
          case 10:
            _context29.p = 10;
            _t22 = _context29.v;
            carregando.className = 'x';
            carregando.textContent = 'Erro ao consultar pacotes: ' + _t22.message;
          case 11:
            return _context29.a(2);
        }
      }, _callee29, null, [[5, 7], [3, 10]]);
    }));
    return _instalarUI.apply(this, arguments);
  }
  function apresentar(_x14) {
    return _apresentar.apply(this, arguments);
  }
  function _apresentar() {
    _apresentar = _asyncToGenerator(_regenerator().m(function _callee31(c) {
      var obd, hr, h, rota, R, desconectar, _t23;
      return _regenerator().w(function (_context31) {
        while (1) switch (_context31.p = _context31.n) {
          case 0:
            O.replaceChildren();
            O.appendChild(renderIdentificacao(c.id));
            obd = document.createElement('div');
            obd.id = 'obd';
            O.appendChild(obd);
            if (c.id.tipo === 'motor') {
              iniciarOBD(c, obd);
            }
            hr = document.createElement('hr');
            O.appendChild(hr);
            h = document.createElement('h3');
            h.textContent = 'Diagnóstico de conexão';
            O.appendChild(h);
            rota = document.createElement('div');
            rota.id = 'rt';
            rota.textContent = 'Verificando...';
            O.appendChild(rota);
            if (!(window.AFDiag && typeof AFDiag.rota === 'function')) {
              _context31.n = 5;
              break;
            }
            _context31.p = 1;
            _context31.n = 2;
            return AFDiag.rota({
              via: c.ctx.via,
              id: c.id,
              ip: c.ctx.ip
            });
          case 2:
            R = _context31.v;
            rota.replaceWith(renderRota(R));
            _context31.n = 4;
            break;
          case 3:
            _context31.p = 3;
            _t23 = _context31.v;
            rota.textContent = 'Diagnóstico falhou: ' + _t23.message;
          case 4:
            _context31.n = 6;
            break;
          case 5:
            rota.textContent = 'Módulo diagnostico.js não carregado.';
          case 6:
            if (!window.AFGravador) {
              _context31.n = 7;
              break;
            }
            _context31.n = 7;
            return instalarUI(c, c.id);
          case 7:
            desconectar = document.createElement('button');
            desconectar.style.marginTop = '10px';
            desconectar.textContent = 'Desconectar equipamento';
            desconectar.onclick = _asyncToGenerator(_regenerator().m(function _callee30() {
              var sm;
              return _regenerator().w(function (_context30) {
                while (1) switch (_context30.n) {
                  case 0:
                    pararLeitura();
                    _context30.n = 1;
                    return AFHW.desconectar();
                  case 1:
                    O.replaceChildren();
                    sm = document.createElement('small');
                    sm.textContent = 'Equipamento desconectado.';
                    O.appendChild(sm);
                    mensagem('Conexão encerrada.');
                  case 2:
                    return _context30.a(2);
                }
              }, _callee30);
            }));
            O.appendChild(desconectar);
            mensagem('Equipamento conectado.', 'o');
          case 8:
            return _context31.a(2);
        }
      }, _callee31, null, [[1, 3]]);
    }));
    return _apresentar.apply(this, arguments);
  }
  $('#b').onclick = function () {
    var p = $('#p');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
  };
  S.querySelectorAll('[data-v]').forEach(function (b) {
    b.onclick = _asyncToGenerator(_regenerator().m(function _callee7() {
      var carregando, via, ip, porta, c, erro, _t4;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            pararLeitura();
            S.querySelectorAll('[data-v]').forEach(function (x) {
              return x.disabled = true;
            });
            O.replaceChildren();
            carregando = document.createElement('small');
            carregando.textContent = 'Conectando e identificando equipamento...';
            O.appendChild(carregando);
            mensagem('Estabelecendo conexão...');
            _context7.p = 1;
            _context7.n = 2;
            return READY;
          case 2:
            via = b.dataset.v;
            ip = $('#ip').value.trim() || null;
            porta = Number($('#porta').value) || null;
            _context7.n = 3;
            return AFHW.conectar(via, ip, porta);
          case 3:
            c = _context7.v;
            _context7.n = 4;
            return apresentar(c);
          case 4:
            _context7.n = 6;
            break;
          case 5:
            _context7.p = 5;
            _t4 = _context7.v;
            O.replaceChildren();
            erro = document.createElement('div');
            erro.className = 'x';
            erro.textContent = _t4.message || String(_t4);
            O.appendChild(erro);
            mensagem('Não foi possível conectar.', 'x');
          case 6:
            _context7.p = 6;
            S.querySelectorAll('[data-v]').forEach(function (x) {
              return x.disabled = false;
            });
            return _context7.f(6);
          case 7:
            return _context7.a(2);
        }
      }, _callee7, null, [[1, 5, 6, 7]]);
    }));
  });
  READY.then(function () {
    var E = CFG.elm327 || {};
    if (E.ip_padrao) $('#ip').value = E.ip_padrao;
    if (E.porta_padrao) $('#porta').value = E.porta_padrao;
    console.info('[AFHW] Hardware Core ' + AFHW.versao + ' inicializado.');
  }).catch(function (e) {
    console.warn('[AFHW] Inicialização com configuração padrão:', e);
  });
  document.body.appendChild(H);
})();