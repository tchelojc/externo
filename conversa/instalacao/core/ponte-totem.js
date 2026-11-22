function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  'use strict';
  var CHAVE = 'almafluxo_instalador';
  var CHAVE_SESSAO = 'af_conversa_vista';
  var TEMPO_PADRAO = 45;
  var TEMPO_MAXIMO = 300;
  var VALIDADE_DESTINO = 10 * 60 * 1000;
  if (window.__AF_PONTE_TOTEM_EXECUTADA__) return;
  window.__AF_PONTE_TOTEM_EXECUTADA__ = true;
  function lerEstado() {
    try {
      var valor = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      return valor && _typeof(valor) === 'object' && !Array.isArray(valor) ? valor : {};
    } catch (erro) {
      return {};
    }
  }
  function salvarEstado(estado) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
      return true;
    } catch (erro) {
      return false;
    }
  }
  function obterEspera(estado) {
    var valor = Number(estado.esperaTotem);
    if (!Number.isFinite(valor) || valor < 1) {
      return TEMPO_PADRAO * 1000;
    }
    return Math.min(valor, TEMPO_MAXIMO) * 1000;
  }
  function validarDestino(destino) {
    if (typeof destino !== 'string' || !destino) return null;
    try {
      var url = new URL(destino, location.origin);
      if (url.origin !== location.origin) return null;
      if (!/^\/[\w./-]*$/.test(url.pathname)) return null;
      if (url.pathname.startsWith('//')) return null;
      if (url.href === location.href) return null;
      return url;
    } catch (erro) {
      return null;
    }
  }
  var estadoInicial = lerEstado();
  var espera = obterEspera(estadoInicial);
  setTimeout(function () {
    try {
      sessionStorage.setItem(CHAVE_SESSAO, '1');
    } catch (erro) {}
  }, espera);
  var destino = validarDestino(estadoInicial.proximo);
  var ultimaAbertura = Number(estadoInicial.ultimaAbertura);
  if (!destino || !Number.isFinite(ultimaAbertura) || ultimaAbertura <= 0 || Date.now() - ultimaAbertura > VALIDADE_DESTINO) {
    return;
  }
  setTimeout(function () {
    try {
      var estadoAtual = lerEstado();
      var destinoAtual = validarDestino(estadoAtual.proximo);
      var aberturaAtual = Number(estadoAtual.ultimaAbertura);
      if (!destinoAtual || !Number.isFinite(aberturaAtual) || Date.now() - aberturaAtual > VALIDADE_DESTINO) {
        return;
      }
      delete estadoAtual.proximo;
      delete estadoAtual.ultimaAbertura;
      if (!salvarEstado(estadoAtual)) return;
      location.assign(destinoAtual.href);
    } catch (erro) {}
  }, espera);
})();