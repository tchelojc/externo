(function () {
  'use strict';

  if (window.AFCanais) return;
  var BASE_INSTALACAO = 'https://almafluxo.uk/conversa/instalacao/';
  var URL_CANAIS = BASE_INSTALACAO + 'distribuicao/canais.json';
  var CHAVE_ESTADO = 'almafluxo_instalador';
  function normalizarRota(rota) {
    try {
      if (typeof rota !== 'string' || !rota.trim()) return null;
      var u = new URL(rota, location.origin);
      if (u.origin !== location.origin) return null;
      if (!/^\/[\w./-]*$/.test(u.pathname)) return null;
      if (u.pathname.startsWith('//')) return null;
      return u.pathname;
    } catch (e) {
      return null;
    }
  }
  function decidir(c, ctx) {
    if (c.login && !ctx.logado) {
      return {
        tipo: 'login',
        rota: '/conversa/instalacao/'
      };
    }
    if (c.tipo !== 'totem' && !c.direto && !ctx.vista) {
      return {
        tipo: 'conversa',
        rota: '/conversa/',
        proximo: c.rota
      };
    }
    return {
      tipo: 'ir',
      rota: c.rota
    };
  }
  var vizinho = function vizinho(L, i, d) {
    return L.length ? L[((i < 0 ? d > 0 ? -1 : 0 : i) + d + L.length) % L.length] : null;
  };
  var logado = function logado() {
    try {
      return !!JSON.parse(localStorage.getItem('almafluxo_usuario') || 'null');
    } catch (e) {
      return false;
    }
  };
  var vista = function vista() {
    try {
      return !!sessionStorage.getItem('af_conversa_vista');
    } catch (e) {
      return false;
    }
  };
  window.AFCanais = {
    decidir: decidir,
    vizinho: vizinho
  };
  if (typeof document === 'undefined') return;
  var L = [];
  var cfg = {};
  var num = '';
  var tn = null;
  var pn = null;
  var etiquetaCanal = null;
  var avisoElemento = null;
  var K = CHAVE_ESTADO;
  var cur = function cur() {
    var atual = location.pathname.replace(/\/+$/, '') || '/';
    return L.findIndex(function (c) {
      return [c.rota].concat(c.alias || []).some(function (r) {
        var rota = normalizarRota(r);
        return rota && (rota.replace(/\/+$/, '') || '/') === atual;
      });
    });
  };
  var rotulo = function rotulo() {
    var c = L[cur()];
    return c ? c.numero + ' · ' + c.nome : 'CH';
  };
  function aviso(t) {
    if (!avisoElemento) {
      avisoElemento = document.createElement('div');
      avisoElemento.style.cssText = 'position:fixed;left:50%;bottom:8%;' + 'transform:translateX(-50%);z-index:2147483200;' + 'background:#06122cf2;color:#fff;' + 'border:1px solid #27c8ff;border-radius:12px;' + 'padding:12px 18px;font:16px system-ui';
      document.body.appendChild(avisoElemento);
    }
    avisoElemento.textContent = t;
    avisoElemento.style.display = 'block';
    clearTimeout(avisoElemento._t);
    avisoElemento._t = setTimeout(function () {
      avisoElemento.style.display = 'none';
    }, 3500);
  }
  function atualizarRotulo() {
    if (etiquetaCanal) {
      etiquetaCanal.textContent = rotulo();
    }
    document.querySelectorAll('[data-ctl="canal-nome"]').forEach(function (e) {
      var r = rotulo();
      if (e.textContent !== r) e.textContent = r;
    });
  }
  var contagem = null;
  function marcarVista() {
    try {
      sessionStorage.setItem('af_conversa_vista', '1');
    } catch (e) {}
  }
  function limparContagem() {
    if (contagem) {
      clearInterval(contagem.t);
      contagem = null;
    }
    if (avisoElemento) avisoElemento.style.display = 'none';
  }
  function esperarConversa(c, destino) {
    var espera = Number(cfg.espera_conversa_s);
    var total = Number.isFinite(espera) && espera >= 1 && espera <= 300 ? espera : 45;
    var falta = function falta() {
      return Math.ceil(total - performance.now() / 1000);
    };
    if (falta() <= 0) {
      marcarVista();
      location.href = destino;
      return;
    }
    limparContagem();
    var texto = function texto() {
      return 'Abrindo ' + c.nome + ' em ' + Math.max(0, falta()) + ' s (a conversa vem primeiro)';
    };
    aviso(texto());
    if (avisoElemento) clearTimeout(avisoElemento._t);
    contagem = {
      t: setInterval(function () {
        if (falta() <= 0) {
          limparContagem();
          marcarVista();
          location.href = destino;
          return;
        }
        aviso(texto());
        if (avisoElemento) clearTimeout(avisoElemento._t);
      }, 500)
    };
  }
  function ir(c) {
    if (!c) {
      aviso('Lista de canais indisponível. Recarregue a página.');
      return;
    }
    var destino = normalizarRota(c.rota);
    if (!destino) {
      aviso('Rota do canal inválida ou não permitida.');
      return;
    }
    var d = decidir(c, {
      logado: logado(),
      vista: vista()
    });
    var atualCanal = L[cur()];
    if (d.tipo === 'conversa' && atualCanal && atualCanal.tipo === 'totem') {
      esperarConversa(c, destino);
      return;
    }
    limparContagem();
    var rotaDestino = d.rota;
    if (d.tipo === 'conversa') {
      rotaDestino = '/conversa/';
    } else if (d.tipo === 'login') {
      rotaDestino = '/conversa/instalacao/';
    } else {
      rotaDestino = destino;
    }
    try {
      var s = JSON.parse(localStorage.getItem(K) || '{}');
      if (d.tipo === 'conversa') {
        s.proximo = destino;
        s.ultimaAbertura = Date.now();
        var espera = Number(cfg.espera_conversa_s);
        s.esperaTotem = Number.isFinite(espera) && espera >= 1 && espera <= 300 ? espera : 45;
      }
      if (d.tipo === 'ir' && logado()) {
        s.ultimoCanal = destino;
      }
      localStorage.setItem(K, JSON.stringify(s));
    } catch (e) {
      aviso('Não foi possível salvar o estado da navegação.');
      return;
    }
    if (d.tipo === 'login') {
      aviso('O canal ' + c.nome + ' exige login no ALMAFLUXO. Abrindo o cadastro…');
    }
    setTimeout(function () {
      location.href = rotaDestino;
    }, d.tipo === 'login' ? 1200 : 0);
  }
  var mover = function mover(d) {
    return ir(vizinho(L, cur(), d));
  };
  var pelaNumero = function pelaNumero(n) {
    var c = L.find(function (x) {
      return String(x.numero) === String(n);
    });
    if (c) {
      ir(c);
    } else {
      aviso('Canal ' + n + ' não existe');
    }
  };
  function lista() {
    if (pn) {
      pn.remove();
      pn = null;
      return;
    }
    pn = document.createElement('div');
    pn.style.cssText = 'position:fixed;z-index:2147483180;top:64px;right:12px;' + 'background:#06122cf5;border:1px solid #27c8ff;' + 'border-radius:12px;padding:8px;max-height:70vh;' + 'overflow:auto;min-width:220px;font:16px system-ui';
    L.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c.numero + ' · ' + c.nome + (c.login ? ' 🔒' : '');
      b.dataset.numero = String(c.numero);
      b.style.cssText = 'display:block;width:100%;text-align:left;' + 'margin:3px 0;font:inherit;color:#e8f1ff;' + 'background:#0a1d3a;border:1px solid #27c8ff;' + 'border-radius:8px;padding:10px 12px;cursor:pointer';
      pn.appendChild(b);
    });
    pn.onclick = function (e) {
      var b = e.target.closest('button');
      if (b && pn.contains(b)) {
        var n = b.dataset.numero;
        lista();
        pelaNumero(n);
      }
    };
    document.body.appendChild(pn);
  }
  Object.assign(window.AFCanais, {
    mover: mover,
    lista: lista,
    pelaNumero: pelaNumero,
    rotulo: rotulo
  });
  function flutuante() {
    var H = document.createElement('div');
    H.style.cssText = 'position:fixed;z-index:2147483150;' + 'display:flex;gap:4px;font:14px system-ui;opacity:.65;' + (cfg.posicao || 'top:12px;right:12px');
    var b = function b(t, f, a) {
      var x = document.createElement('button');
      x.type = 'button';
      x.textContent = t;
      x.setAttribute('aria-label', a);
      x.style.cssText = 'font:inherit;color:#e8f1ff;' + 'background:#0a1d3acc;border:1px solid #27c8ff;' + 'border-radius:8px;padding:7px 11px;cursor:pointer';
      x.onclick = f;
      return x;
    };
    etiquetaCanal = document.createElement('span');
    etiquetaCanal.textContent = rotulo();
    etiquetaCanal.style.cssText = 'color:#e8f1ff;background:#0a1d3acc;' + 'border:1px solid #27c8ff;border-radius:8px;' + 'padding:7px 11px';
    H.append(b('‹ CH', function () {
      return mover(-1);
    }, 'Canal anterior'), etiquetaCanal, b('CH ›', function () {
      return mover(1);
    }, 'Próximo canal'), b('☰', lista, 'Lista de canais'));
    document.body.appendChild(H);
  }
  addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target && e.target.tagName || '')) return;
    var k = e.keyCode;
    var n = e.key;
    if (k === 427 || k === 33 || n === 'ChannelUp' || n === 'PageUp') {
      e.preventDefault();
      mover(1);
    } else if (k === 428 || k === 34 || n === 'ChannelDown' || n === 'PageDown') {
      e.preventDefault();
      mover(-1);
    } else if (/^[0-9]$/.test(n)) {
      num += n;
      aviso('Canal ' + num);
      clearTimeout(tn);
      tn = setTimeout(function () {
        pelaNumero(num);
        num = '';
      }, 1500);
    }
  });
  fetch(URL_CANAIS, {
    cache: 'no-store',
    credentials: 'same-origin'
  }).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(function (j) {
    if (!j || !Array.isArray(j.canais)) {
      throw new Error('Estrutura de canais inválida');
    }
    cfg = j;
    L = j.canais.filter(function (c) {
      return c && c.ativo !== false && c.numero !== undefined && typeof c.nome === 'string' && typeof c.rota === 'string' && !!normalizarRota(c.rota);
    });
    if (!L.length) return;
    document.documentElement.classList.add('af-canais');
    if (!window.AF_CANAL_EMBUTIDO) {
      flutuante();
    }
    atualizarRotulo();
    setInterval(atualizarRotulo, 800);
  }).catch(function (e) {
    console.warn('[AFCanais] Não foi possível carregar canais.json:', e);
  });
})();