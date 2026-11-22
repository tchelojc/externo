function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  'use strict';
  var AG = 'http://127.0.0.1:8090';
  var SITE = 'https://almafluxo.uk';
  var BASE = SITE + '/conversa/instalacao/';
  var URL_TESTE = BASE + 'manifest.json';
  var VERSAO = '2.0';
  var LIMITES = {
    agente: 3500,
    rede: 9000,
    internet: 7000
  };
  var agora = function agora() {
    return Date.now();
  };
  var erroTexto = function erroTexto(e) {
    if (!e) return 'Erro desconhecido';
    if (e.name === 'AbortError') return 'Tempo esgotado';
    if (e instanceof TypeError) return 'Falha de comunicação, rede ou política de acesso do navegador';
    return String(e.message || e);
  };
  var tempo = function tempo(fn, ms) {
    var c = new AbortController();
    var id = setTimeout(function () {
      return c.abort();
    }, ms);
    return Promise.resolve().then(function () {
      return fn(c.signal);
    }).finally(function () {
      return clearTimeout(id);
    });
  };
  var objeto = function objeto(v) {
    return !!v && _typeof(v) === 'object' && !Array.isArray(v);
  };
  var texto = function texto(v) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    return String(v == null ? '' : v).slice(0, max);
  };
  var criarEtapa = function criarEtapa(dados) {
    var status = dados.status || (dados.ok ? 'ok' : 'falha');
    return {
      codigo: texto(dados.codigo || 'TESTE', 80),
      etapa: texto(dados.etapa || 'diagnostico', 80),
      n: texto(dados.n || 'Teste', 120),
      ok: status === 'ok',
      status: status,
      gravidade: dados.gravidade || (status === 'falha' ? 'erro' : status === 'bloqueado' ? 'bloqueio' : status === 'aviso' ? 'aviso' : status === 'nao_testado' ? 'informativo' : 'nenhuma'),
      m: texto(dados.m || '', 500),
      d: texto(dados.d || '', 500),
      proximaAcao: texto(dados.proximaAcao || '', 500),
      duracao_ms: Math.max(0, Number(dados.duracao_ms) || 0),
      evidencia: objeto(dados.evidencia) ? dados.evidencia : {}
    };
  };
  var sucesso = function sucesso(codigo, etapa, n, m, d) {
    var extra = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return criarEtapa(_objectSpread({
      codigo: codigo,
      etapa: etapa,
      n: n,
      m: m,
      d: d,
      status: 'ok'
    }, extra));
  };
  var aviso = function aviso(codigo, etapa, n, m, d) {
    var extra = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return criarEtapa(_objectSpread({
      codigo: codigo,
      etapa: etapa,
      n: n,
      m: m,
      d: d,
      status: 'aviso'
    }, extra));
  };
  var falha = function falha(codigo, etapa, n, m, d) {
    var extra = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return criarEtapa(_objectSpread({
      codigo: codigo,
      etapa: etapa,
      n: n,
      m: m,
      d: d,
      status: 'falha'
    }, extra));
  };
  var naoTestado = function naoTestado(codigo, etapa, n, m, d) {
    var extra = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return criarEtapa(_objectSpread({
      codigo: codigo,
      etapa: etapa,
      n: n,
      m: m,
      d: d,
      status: 'nao_testado'
    }, extra));
  };
  var bloqueado = function bloqueado(codigo, etapa, n, m, d) {
    var extra = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return criarEtapa(_objectSpread({
      codigo: codigo,
      etapa: etapa,
      n: n,
      m: m,
      d: d,
      status: 'bloqueado'
    }, extra));
  };
  function fetchJSON(_x) {
    return _fetchJSON.apply(this, arguments);
  }
  function _fetchJSON() {
    _fetchJSON = _asyncToGenerator(_regenerator().m(function _callee8(url) {
      var ms,
        opcoes,
        _args8 = arguments;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            ms = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 3500;
            opcoes = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
            return _context8.a(2, tempo(function () {
              var _ref = _asyncToGenerator(_regenerator().m(function _callee7(signal) {
                var r, tipo;
                return _regenerator().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      _context7.n = 1;
                      return fetch(url, _objectSpread({
                        cache: 'no-store',
                        signal: signal,
                        mode: 'cors',
                        credentials: 'omit'
                      }, opcoes));
                    case 1:
                      r = _context7.v;
                      if (r.ok) {
                        _context7.n = 2;
                        break;
                      }
                      throw new Error('HTTP ' + r.status);
                    case 2:
                      tipo = r.headers.get('content-type') || '';
                      if (/json/i.test(tipo)) {
                        _context7.n = 3;
                        break;
                      }
                      throw new Error('Resposta não é JSON');
                    case 3:
                      return _context7.a(2, r.json());
                  }
                }, _callee7);
              }));
              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }(), ms));
        }
      }, _callee8);
    }));
    return _fetchJSON.apply(this, arguments);
  }
  function validarIP(ip) {
    if (typeof ip !== 'string') return false;
    ip = ip.trim();
    if (!ip || ip.length > 45) return false;
    var partes = ip.split('.');
    if (partes.length === 4) {
      return partes.every(function (x) {
        return /^\d{1,3}$/.test(x) && Number(x) >= 0 && Number(x) <= 255;
      });
    }
    return ip.includes(':') && /^[0-9a-f:]+$/i.test(ip) && ip.length <= 45;
  }
  function identificarTipo(c) {
    var via = texto(c && c.via, 30).toLowerCase();
    if (via === 'usb') return 'usb';
    if (via === 'bluetooth') return 'bluetooth';
    if (via === 'wifi') return 'wifi';
    return via || 'desconhecida';
  }
  function avaliarIdentificacao(id) {
    if (!objeto(id)) return {
      status: 'nao_testado',
      nome: 'Nenhum equipamento informado'
    };
    var nome = texto(id.nome, 200);
    var desconhecido = !nome || /não identificado|nao identificado|desconhecido|falha ao identificar/i.test(nome);
    if (desconhecido) {
      return {
        status: 'aviso',
        nome: nome || 'Dispositivo não identificado'
      };
    }
    var certeza = texto(id.certeza, 40).toLowerCase();
    if (certeza === 'confirmada') {
      return {
        status: 'ok',
        nome: nome
      };
    }
    return {
      status: 'aviso',
      nome: nome
    };
  }
  var AFDiag = {
    AG: AG,
    SITE: SITE,
    BASE: BASE,
    VERSAO: VERSAO,
    testarAgente: function testarAgente() {
      return _asyncToGenerator(_regenerator().m(function _callee() {
        var inicio, a, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              inicio = agora();
              _context.p = 1;
              _context.n = 2;
              return fetchJSON(AG + '/ping', LIMITES.agente);
            case 2:
              a = _context.v;
              if (!(!objeto(a) || a.ok !== true)) {
                _context.n = 3;
                break;
              }
              throw new Error('O agente não confirmou funcionamento');
            case 3:
              return _context.a(2, {
                ok: true,
                dados: a,
                duracao_ms: agora() - inicio,
                erro: null
              });
            case 4:
              _context.p = 4;
              _t = _context.v;
              return _context.a(2, {
                ok: false,
                dados: null,
                duracao_ms: agora() - inicio,
                erro: erroTexto(_t)
              });
          }
        }, _callee, null, [[1, 4]]);
      }))();
    },
    agente: function agente() {
      var _this = this;
      return _asyncToGenerator(_regenerator().m(function _callee2() {
        var r;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return _this.testarAgente();
            case 1:
              r = _context2.v;
              return _context2.a(2, r.ok ? r.dados : null);
          }
        }, _callee2);
      }))();
    },
    testarRede: function testarRede(ip) {
      return _asyncToGenerator(_regenerator().m(function _callee3() {
        var inicio, p, portas, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              inicio = agora();
              if (validarIP(ip)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, {
                ok: false,
                testado: false,
                portas: [],
                erro: 'Endereço IP inválido',
                duracao_ms: agora() - inicio
              });
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return fetchJSON(AG + '/probe?ip=' + encodeURIComponent(ip), LIMITES.rede);
            case 2:
              p = _context3.v;
              if (!(!objeto(p) || p.ok !== true)) {
                _context3.n = 3;
                break;
              }
              throw new Error(p.erro || 'O agente não confirmou a sondagem');
            case 3:
              portas = Array.isArray(p.abertas) ? p.abertas.filter(function (x) {
                return objeto(x);
              }) : [];
              return _context3.a(2, {
                ok: true,
                testado: true,
                ip: p.ip || ip,
                portas: portas,
                sistema: p.sistema || null,
                pacote: p.pacote || null,
                duracao_ms: agora() - inicio,
                erro: null
              });
            case 4:
              _context3.p = 4;
              _t2 = _context3.v;
              return _context3.a(2, {
                ok: false,
                testado: false,
                portas: [],
                erro: erroTexto(_t2),
                duracao_ms: agora() - inicio
              });
          }
        }, _callee3, null, [[1, 4]]);
      }))();
    },
    testarInternet: function testarInternet() {
      return _asyncToGenerator(_regenerator().m(function _callee4() {
        var inicio, manifesto, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              inicio = agora();
              _context4.p = 1;
              _context4.n = 2;
              return fetchJSON(URL_TESTE, LIMITES.internet);
            case 2:
              manifesto = _context4.v;
              if (objeto(manifesto)) {
                _context4.n = 3;
                break;
              }
              throw new Error('Manifesto inválido');
            case 3:
              if (manifesto.versao) {
                _context4.n = 4;
                break;
              }
              throw new Error('Manifesto sem identificação de versão');
            case 4:
              return _context4.a(2, {
                ok: true,
                duracao_ms: agora() - inicio,
                versao: texto(manifesto.versao, 40),
                erro: null
              });
            case 5:
              _context4.p = 5;
              _t3 = _context4.v;
              return _context4.a(2, {
                ok: false,
                duracao_ms: agora() - inicio,
                versao: null,
                erro: erroTexto(_t3)
              });
          }
        }, _callee4, null, [[1, 5]]);
      }))();
    },
    executar: function executar(c) {
      var _this2 = this;
      return _asyncToGenerator(_regenerator().m(function _callee5() {
        var inicio, etapas, via, adicionar, avaliacao, precisaAgente, agente, rede, internet;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              c = objeto(c) ? c : {};
              inicio = agora();
              etapas = [];
              via = identificarTipo(c);
              adicionar = function adicionar(e) {
                return etapas.push(e);
              };
              if (via === 'desconhecida') {
                adicionar(aviso('CONEXAO_NAO_INFORMADA', 'conexao', 'Tipo de conexão', 'Não foi informado como o equipamento está conectado.', 'Informe USB, Bluetooth ou Wi-Fi.', {
                  proximaAcao: 'Selecionar o tipo de conexão.'
                }));
              } else {
                adicionar(sucesso('CONEXAO_INFORMADA', 'conexao', 'Tipo de conexão', 'Conexão selecionada: ' + via, 'O tipo de conexão foi informado pelo módulo de hardware.', {
                  evidencia: {
                    via: via
                  }
                }));
              }
              avaliacao = avaliarIdentificacao(c.id);
              if (avaliacao.status === 'ok') {
                adicionar(sucesso('EQUIPAMENTO_IDENTIFICADO', 'identificacao', 'Identificação do equipamento', 'Equipamento reconhecido: ' + avaliacao.nome, 'A identificação foi marcada como confirmada pelo módulo de hardware.', {
                  evidencia: {
                    nome: avaliacao.nome,
                    certeza: c.id.certeza || null,
                    alvo: c.id.alvo || null,
                    placa: c.id.placa || null
                  }
                }));
              } else if (avaliacao.status === 'aviso') {
                adicionar(aviso('IDENTIFICACAO_PARCIAL', 'identificacao', 'Identificação do equipamento', avaliacao.nome, 'O dispositivo foi descrito, mas sua identificação ainda não foi confirmada.', {
                  proximaAcao: 'Verificar VID/PID, nome BLE e resposta do protocolo.'
                }));
              } else {
                adicionar(naoTestado('IDENTIFICACAO_AUSENTE', 'identificacao', 'Identificação do equipamento', 'Nenhum resultado de identificação foi fornecido.', 'A identificação precisa ser executada pelo hardware.js.'));
              }
              precisaAgente = via === 'wifi' || c.exigirAgente === true || c.instalacao === true;
              _context5.n = 1;
              return _this2.testarAgente();
            case 1:
              agente = _context5.v;
              if (agente.ok) {
                adicionar(sucesso('AGENTE_ATIVO', 'computador', 'Agente local', 'Agente ativo' + (agente.dados.versao ? ' — versão ' + agente.dados.versao : ''), 'O agente respondeu ao teste /ping.', {
                  duracao_ms: agente.duracao_ms,
                  evidencia: {
                    versao: agente.dados.versao || null
                  }
                }));
              } else if (precisaAgente) {
                adicionar(falha('AGENTE_INDISPONIVEL', 'computador', 'Agente local', 'O agente não respondeu ou não confirmou funcionamento.', agente.erro, {
                  duracao_ms: agente.duracao_ms,
                  proximaAcao: 'Iniciar o agente ALMAFLUXO e verificar as permissões de acesso local.'
                }));
              } else {
                adicionar(aviso('AGENTE_OPCIONAL', 'computador', 'Agente local', 'Agente indisponível. Não é obrigatório para esta conexão.', agente.erro, {
                  duracao_ms: agente.duracao_ms,
                  proximaAcao: 'Nenhuma ação necessária, salvo se a operação exigir o agente.'
                }));
              }
              if (!c.ip) {
                _context5.n = 6;
                break;
              }
              if (validarIP(c.ip)) {
                _context5.n = 2;
                break;
              }
              adicionar(falha('IP_INVALIDO', 'rede', 'Rede interna', 'O endereço IP informado não é válido.', 'Confira o endereço do equipamento.', {
                proximaAcao: 'Corrigir o endereço IP.'
              }));
              _context5.n = 5;
              break;
            case 2:
              if (agente.ok) {
                _context5.n = 3;
                break;
              }
              adicionar(naoTestado('REDE_SEM_AGENTE', 'rede', 'Rede interna', 'A sondagem não foi realizada porque o agente local não está disponível.', 'O navegador não realiza diretamente a varredura de portas por este mecanismo.', {
                proximaAcao: 'Iniciar o agente local e repetir o teste.'
              }));
              _context5.n = 5;
              break;
            case 3:
              _context5.n = 4;
              return _this2.testarRede(c.ip);
            case 4:
              rede = _context5.v;
              if (rede.ok && rede.portas.length) {
                adicionar(sucesso('REDE_SERVICOS_ENCONTRADOS', 'rede', 'Rede interna', 'Serviços encontrados: ' + rede.portas.map(function (x) {
                  return x.porta;
                }).join(', '), 'O agente identificou portas abertas no endereço informado.', {
                  duracao_ms: rede.duracao_ms,
                  evidencia: {
                    ip: rede.ip,
                    portas: rede.portas,
                    sistema: rede.sistema
                  }
                }));
              } else if (rede.ok) {
                adicionar(aviso('REDE_SEM_PORTAS_DETECTADAS', 'rede', 'Rede interna', 'O endereço foi consultado, mas nenhuma das portas monitoradas respondeu.', 'Isso não prova que o equipamento esteja desligado. Pode haver firewall, serviços desativados ou portas diferentes.', {
                  duracao_ms: rede.duracao_ms,
                  proximaAcao: 'Conferir o IP, os serviços habilitados e as portas utilizadas pelo equipamento.',
                  evidencia: {
                    ip: rede.ip,
                    portas: []
                  }
                }));
              } else {
                adicionar(falha('REDE_TESTE_FALHOU', 'rede', 'Rede interna', 'Não foi possível concluir a sondagem.', rede.erro, {
                  duracao_ms: rede.duracao_ms,
                  proximaAcao: 'Verificar agente, IP, firewall e permissões de rede.'
                }));
              }
            case 5:
              _context5.n = 7;
              break;
            case 6:
              adicionar(naoTestado('IP_NAO_INFORMADO', 'rede', 'Rede interna', 'Não foi informado um IP para a sondagem.', 'Este teste é opcional para USB e Bluetooth.'));
            case 7:
              _context5.n = 8;
              return _this2.testarInternet();
            case 8:
              internet = _context5.v;
              if (internet.ok) {
                adicionar(sucesso('PORTAL_ACESSIVEL', 'internet', 'Portal ALMAFLUXO', 'Portal e manifesto acessíveis — versão ' + internet.versao, 'A requisição HTTPS ao manifesto foi concluída.', {
                  duracao_ms: internet.duracao_ms,
                  evidencia: {
                    versao: internet.versao
                  }
                }));
              } else {
                adicionar(falha('PORTAL_INDISPONIVEL', 'internet', 'Portal ALMAFLUXO', 'Não foi possível validar o manifesto de instalação.', internet.erro, {
                  duracao_ms: internet.duracao_ms,
                  proximaAcao: 'Verificar DNS, internet, HTTPS e publicação do manifesto.'
                }));
              }
              return _context5.a(2, _this2.resumo(etapas, {
                inicio: inicio,
                via: via,
                equipamento: avaliacao.nome
              }));
          }
        }, _callee5);
      }))();
    },
    resumo: function resumo(etapas) {
      var contexto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var lista = Array.isArray(etapas) ? etapas : [];
      var contagem = {
        total: lista.length,
        ok: 0,
        aviso: 0,
        falha: 0,
        bloqueado: 0,
        nao_testado: 0
      };
      lista.forEach(function (e) {
        if (Object.prototype.hasOwnProperty.call(contagem, e.status)) {
          contagem[e.status]++;
        }
      });
      var criticas = contagem.falha + contagem.bloqueado;
      var status = 'ok';
      if (criticas) status = 'falha';else if (contagem.aviso) status = 'aviso';else if (!contagem.ok) status = 'nao_testado';
      return {
        versao: VERSAO,
        data: new Date().toISOString(),
        status: status,
        aprovado: status === 'ok',
        contexto: {
          via: contexto.via || null,
          equipamento: contexto.equipamento || null
        },
        contagem: contagem,
        etapas: lista,
        duracao_ms: Math.max(0, agora() - (contexto.inicio || agora()))
      };
    },
    rota: function rota(c) {
      var _this3 = this;
      return _asyncToGenerator(_regenerator().m(function _callee6() {
        var relatorio;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return _this3.executar(c);
            case 1:
              relatorio = _context6.v;
              return _context6.a(2, relatorio.etapas.map(function (e) {
                return {
                  n: e.n,
                  ok: e.ok,
                  m: e.m,
                  d: e.d,
                  status: e.status,
                  codigo: e.codigo,
                  etapa: e.etapa,
                  gravidade: e.gravidade,
                  proximaAcao: e.proximaAcao,
                  duracao_ms: e.duracao_ms,
                  evidencia: e.evidencia
                };
              }));
          }
        }, _callee6);
      }))();
    }
  };
  window.AFDiag = AFDiag;
})();