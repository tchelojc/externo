
(()=>{
  'use strict';

  const BASE = 'https://almafluxo.uk/conversa/instalacao/';
  const PACOTES_URL = BASE + 'distribuicao/pacotes.json';

  let ev = null;

  // Captura o evento de instalação PWA.
  addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    ev = e;
  });

  // Registra quando o aplicativo foi instalado.
  addEventListener('appinstalled', () => {
    try {
      AFEstado.set({
        instalado: true,
        instaladoEm: Date.now()
      });
    } catch (erro) {
      console.warn('[AFInst] Não foi possível registrar instalação:', erro);
    }
  });

  // Início automático: depende do fabricante/modelo.
  const GUIA = {
    tizen: [
      'Instale pelo módulo plataformas/tizen (.wgt, modo desenvolvedor ou loja).',
      'Ajustes › Geral › procure a opção de executar o último app/Smart Hub ao ligar (o nome varia por ano/modelo).',
      'TV corporativa/sinalização: use "URL Launcher" apontando para https://almafluxo.uk/conversa/instalacao/.'
    ],

    webos: [
      'Instale pelo módulo plataformas/webos (.ipk, modo desenvolvedor ou loja).',
      'Ajustes › Geral › procure o início automático/aplicativo inicial (varia por modelo).',
      'Sinalização LG: configure app/URL de início no menu de instalação.'
    ],

    'android-tv': [
      'Instale o .apk (plataformas/android-tv) ou instale o PWA pelo Chrome.',
      'Um APK nativo pode iniciar no boot; PWA em navegador não inicia sozinho.',
      'Alternativa: definir o app como launcher/tela inicial pelo menu do fabricante.'
    ],

    windows: [
      'Instale o PWA (Edge/Chrome › Instalar) e abra a pasta Inicializar (Win+R › shell:startup).',
      'Coloque ali um atalho para o app instalado.'
    ],

    linux: [
      'Instale o PWA ou use o pacote em plataformas/linux/debian-offline.',
      'Adicione o app em Aplicativos de inicialização da sessão.'
    ],

    outras: [
      'Abra https://almafluxo.uk/conversa/instalacao/ no navegador da TV e salve como página inicial/favorita.',
      'Se o navegador não abre o totem, é falta de suporte do aparelho: use o módulo nativo da plataforma.'
    ]
  };

  // Valida destinos internos do ecossistema.
  function validarDestino(destino) {
    if (typeof destino !== 'string' || !destino) {
      return null;
    }

    try {
      const url = new URL(destino, location.origin);

      if (url.origin !== location.origin) return null;
      if (!/^\/[\w./-]*$/.test(url.pathname)) return null;
      if (url.pathname.startsWith('//')) return null;

      return url.pathname;
    } catch (erro) {
      return null;
    }
  }

  // Obtém o tempo configurado no pacotes.json.
  async function obterEsperaTotem() {
    const PADRAO = 45;

    try {
      const resposta = await fetch(PACOTES_URL, {
        cache: 'no-store',
        credentials: 'same-origin'
      });

      if (!resposta.ok) {
        throw new Error(`HTTP ${resposta.status}`);
      }

      const dados = await resposta.json();
      const valor = Number(dados?.comunicacao?.totem?.espera_s);

      if (!Number.isFinite(valor) || valor < 1) {
        return PADRAO;
      }

      return Math.min(valor, 300);

    } catch (erro) {
      console.warn('[AFInst] Usando espera padrão:', erro);
      return PADRAO;
    }
  }

  window.AFInst = {

    guia(plataforma) {
      return GUIA[plataforma] || GUIA.outras;
    },

    async instalar() {
      await AFEstado.persistir();

      if (ev) {
        const evento = ev;
        ev = null;

        try {
          await evento.prompt();

          const resultado = await evento.userChoice;

          if (resultado.outcome === 'accepted') {
            AFEstado.set({
              instalado: true,
              instaladoEm: Date.now()
            });

            return {
              ok: true,
              msg: 'Instalado.'
            };
          }

          return {
            ok: false,
            msg: 'Instalação cancelada.'
          };

        } catch (erro) {
          return {
            ok: false,
            msg: 'Não foi possível iniciar a instalação: ' + erro.message
          };
        }
      }

      if (AFDetector.instalado()) {
        return {
          ok: true,
          msg: 'Já está rodando como aplicativo instalado.'
        };
      }

      const plataforma = AFDetector.plataforma();

      return {
        ok: false,
        msg:
          'Este navegador não oferece instalação direta. ' +
          (plataforma === 'ios'
            ? 'No iPhone/iPad: Compartilhar › Adicionar à Tela de Início.'
            : 'Use o menu do navegador (Instalar/Adicionar à tela inicial) ou o pacote ' +
              AFDetector.pacote() +
              ' da plataforma.')
      };
    },

    // Toda entrada no ecossistema passa por /conversa.
    // O destino é gravado para a ponte do totem.
    async abrir(destino) {
      const caminho = destino ? validarDestino(destino) : null;

      if (destino && !caminho) {
        return {
          ok: false,
          msg: 'Destino inválido ou externo. Redirecionamento cancelado.'
        };
      }

      const espera = await obterEsperaTotem();

      AFEstado.set({
        proximo: caminho,
        esperaTotem: espera,
        ultimaAbertura: Date.now()
      });

      location.href = '/conversa/';

      return {
        ok: true,
        msg: 'Abrindo o ecossistema.'
      };
    }

  };

})();
