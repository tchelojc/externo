(function () {
  'use strict';
  if (window.AFControle) return;
  var API = '/proxy/controle';
  var QR_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
  var CONTROLE_URL = location.origin + '/conversa/instalacao/controle/';

  var cfg = null, par = null, pend = [], visto = {}, painelAberto = false, timer = null, ctlNome = null;
  var ultimoEstado = '', pareando = null, falhas = 0, indisponivel = false, tentouEm = 0;

  function post(corpo) {
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .catch(function () { return { ok: false, rede: true, error: 'Sem conexão com o servidor.' }; });
  }
  function avisar(extra) {
    if (!cfg || !cfg.aoMudar) return;
    var info = { code: par && par.code, url: par && CONTROLE_URL + '?p=' + par.code, controlador: ctlNome };
    try { cfg.aoMudar(Object.assign(info, extra || {})); } catch (e) {}
  }

  var qrPronto = null;
  function carregarQR() {
    if (window.qrcode) return Promise.resolve(true);
    if (qrPronto) return qrPronto;
    qrPronto = new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = QR_LIB; s.onload = function () { ok(!!window.qrcode); }; s.onerror = function () { qrPronto = null; ok(false); };
      document.head.appendChild(s);
    });
    return qrPronto;
  }
  function qr(el, texto, px) {
    if (!el) return Promise.resolve(false);
    return carregarQR().then(function (ok) {
      el.replaceChildren();
      if (!ok) { var t = document.createElement('span'); t.textContent = texto; t.style.cssText = 'font-size:13px;word-break:break-all'; el.appendChild(t); return false; }
      var q = window.qrcode(0, 'M'); q.addData(texto); q.make();
      var w = document.createElement('div');
      w.style.cssText = 'width:' + px + 'px;height:' + px + 'px;background:#fff;border-radius:8px;padding:4px;box-sizing:border-box';
      w.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
      var sv = w.querySelector('svg'); if (sv) { sv.setAttribute('width', '100%'); sv.setAttribute('height', '100%'); }
      el.appendChild(w); return true;
    });
  }

  function parear() {
    if (par && (ctlNome || Date.now() < par.expiraEm - 15000)) { avisar(); return Promise.resolve(par); }
    if (pareando) return pareando;
    // Servidor sem o KV (503) ou fora do ar: tenta de novo no máximo a cada 60 s, sem martelar.
    if (indisponivel && Date.now() - tentouEm < 60000) {
      avisar({ erro: 'Controle pelo telefone indisponível no servidor.' });
      return Promise.resolve(null);
    }
    pareando = post({ action: 'parear', canal: cfg.canal }).then(function (r) {
      pareando = null;
      if (r.ok) { par = { code: r.code, tvSecret: r.tvSecret, expiraEm: r.expiraEm }; ctlNome = null; visto = {}; falhas = 0; indisponivel = false; avisar(); return par; }
      falhas++; tentouEm = Date.now();
      if (/CONTROLE_KV/.test(r.error || '') || falhas >= 3) indisponivel = true;
      avisar({ erro: indisponivel ? 'Controle pelo telefone indisponível no servidor.' : (r.error || 'Sem conexão com o servidor.') });
      return null;
    });
    return pareando;
  }
  function agendar(ms) { clearTimeout(timer); if (ms) timer = setTimeout(ciclo, ms); }
  function proximoPoll() { return !par ? 0 : (ctlNome ? 3000 : (painelAberto ? 4000 : 10000)); }

  function ciclo() {
    if (!par) { if (painelAberto && !indisponivel) parear().then(function () { agendar(proximoPoll()); }); return; }
    var est = cfg.estado ? cfg.estado() : null, assin = JSON.stringify(est || {});
    var corpo = { action: 'fila', code: par.code, tvSecret: par.tvSecret };
    if (est && assin !== ultimoEstado) { corpo.estado = Object.assign({ canal: cfg.canal }, est); ultimoEstado = assin; }
    post(corpo).then(function (r) {
      if (r.ok) {
        var antes = ctlNome;
        ctlNome = r.controlador || null;
        pend = r.cmds || [];
        if (antes !== ctlNome) avisar();
        aplicarImediatos();
      } else if (r.expirado || /expirad/i.test(r.error || '')) {
        par = null; ctlNome = null; pend = []; ultimoEstado = '';
        if (painelAberto) parear();
      }
      agendar(proximoPoll());
    });
  }

  function executar(c) {
    var f = cfg.comandos && cfg.comandos[c.cmd];
    if (typeof f !== 'function') return 'nao_suportado';
    try { var r = f(c.arg); return typeof r === 'string' ? r : 'aplicado'; } catch (e) { return 'erro'; }
  }
  function ack(lista) {
    if (!lista.length || !par) return;
    post({ action: 'ack', code: par.code, tvSecret: par.tvSecret, resultados: lista });
  }
  function semCiclo() { return !!(cfg.cicloAtivo && !cfg.cicloAtivo()); }
  function aplicarImediatos() {
    var imed = cfg.imediatos || [], sem = semCiclo(), max = cfg.cicloMaxMs || 900000, agora = Date.now();
    var feitos = [], resto = [];
    pend.forEach(function (c) {
      if (!visto[c.id]) visto[c.id] = agora;
      if (sem || imed.indexOf(c.cmd) >= 0 || agora - visto[c.id] > max) feitos.push({ id: c.id, estado: executar(c) });
      else resto.push(c);
    });
    pend = resto; ack(feitos);
  }
  // O canais.js chama quando o ciclo termina: só aqui entra a TROCA DE CANAL.
  function fimDeCiclo() {
    if (!pend.length) return;
    var lote = pend.slice(); pend = [];
    var ultimoCanal = -1, feitos = [];
    lote.forEach(function (c, k) { if (c.cmd === 'canal') ultimoCanal = k; });
    lote.forEach(function (c, k) {
      if (c.cmd === 'canal' && k !== ultimoCanal) feitos.push({ id: c.id, estado: 'substituido' });
      else if (c.cmd !== 'canal') feitos.push({ id: c.id, estado: executar(c) });
    });
    ack(feitos);   // confirma antes: a página pode trocar logo depois
    if (ultimoCanal >= 0) ack([{ id: lote[ultimoCanal].id, estado: executar(lote[ultimoCanal]) }]);
  }

  window.AFControle = {
    iniciar: function (c) { cfg = c || {}; cfg.canal = cfg.canal || 'instalacao'; },
    ativar: function (aberto) { painelAberto = !!aberto; if (cfg) agendar(painelAberto || par ? 800 : 0); },
    parear: parear, fimDeCiclo: fimDeCiclo, qr: qr
  };
})();
