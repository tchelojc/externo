
(()=>{
  'use strict';

  /* ALMAFLUXO — Ponte entre instalador e totem.
     Executada pelo Worker sem editar o código do totem. */

  const CHAVE = 'almafluxo_instalador';
  const CHAVE_SESSAO = 'af_conversa_vista';
  const TEMPO_PADRAO = 45;
  const TEMPO_MAXIMO = 300;
  const VALIDADE_DESTINO = 10 * 60 * 1000;

  // Evita executar a ponte duas vezes na mesma página.
  if (window.__AF_PONTE_TOTEM_EXECUTADA__) return;
  window.__AF_PONTE_TOTEM_EXECUTADA__ = true;

  function lerEstado() {
    try {
      const valor = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      return valor && typeof valor === 'object' && !Array.isArray(valor)
        ? valor
        : {};
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
    const valor = Number(estado.esperaTotem);

    if (!Number.isFinite(valor) || valor < 1) {
      return TEMPO_PADRAO * 1000;
    }

    return Math.min(valor, TEMPO_MAXIMO) * 1000;
  }

  function validarDestino(destino) {
    if (typeof destino !== 'string' || !destino) return null;

    try {
      const url = new URL(destino, location.origin);

      // Somente caminhos internos da mesma origem.
      if (url.origin !== location.origin) return null;

      if (!/^\/[\w./-]*$/.test(url.pathname)) return null;

      if (url.pathname.startsWith('//')) return null;

      // Impede retorno ao próprio endereço atual.
      if (url.href === location.href) return null;

      return url;
    } catch (erro) {
      return null;
    }
  }

  const estadoInicial = lerEstado();
  const espera = obterEspera(estadoInicial);

  // A conversa só é considerada vista após o tempo mínimo.
  setTimeout(() => {
    try {
      sessionStorage.setItem(CHAVE_SESSAO, '1');
    } catch (erro) {}
  }, espera);

  const destino = validarDestino(estadoInicial.proximo);
  const ultimaAbertura = Number(estadoInicial.ultimaAbertura);

  if (
    !destino ||
    !Number.isFinite(ultimaAbertura) ||
    ultimaAbertura <= 0 ||
    Date.now() - ultimaAbertura > VALIDADE_DESTINO
  ) {
    return;
  }

  setTimeout(() => {
    try {
      // Confere novamente o estado antes de redirecionar.
      const estadoAtual = lerEstado();
      const destinoAtual = validarDestino(estadoAtual.proximo);
      const aberturaAtual = Number(estadoAtual.ultimaAbertura);

      if (
        !destinoAtual ||
        !Number.isFinite(aberturaAtual) ||
        Date.now() - aberturaAtual > VALIDADE_DESTINO
      ) {
        return;
      }

      // Consome o destino antes do redirecionamento.
      delete estadoAtual.proximo;
      delete estadoAtual.ultimaAbertura;

      if (!salvarEstado(estadoAtual)) return;

      location.assign(destinoAtual.href);

    } catch (erro) {
      // Falha silenciosa: o totem permanece aberto.
    }
  }, espera);

})();
