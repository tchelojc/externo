
(()=>{
  'use strict';

  const BASE_PADRAO = 'https://almafluxo.uk/conversa/instalacao/';

  const hex = buffer =>
    [...new Uint8Array(buffer)]
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');

  async function buscar(url) {
    const resposta = await fetch(url, {
      cache: 'no-store',
      credentials: 'same-origin'
    });

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }

    return resposta;
  }

  window.AFIntegridade = {

    async verificar(base = BASE_PADRAO) {
      const resultados = [];

      let manifestoURL;

      try {
        // Normaliza a URL-base.
        manifestoURL = new URL(
          base.endsWith('/') ? base : base + '/',
          location.href
        );

        if (manifestoURL.origin !== location.origin) {
          return [{
            arq: 'manifest.json',
            ok: false,
            msg: 'Origem do manifesto não permitida'
          }];
        }

        // O manifesto fica na raiz da instalação.
        const urlManifesto = new URL(
          'manifest.json',
          manifestoURL
        );

        const resposta = await buscar(urlManifesto.href);
        const manifesto = await resposta.json();

        if (
          !manifesto ||
          typeof manifesto.arquivos !== 'object' ||
          !manifesto.arquivos
        ) {
          throw new Error('Estrutura do manifesto inválida');
        }

        if (!(window.crypto && crypto.subtle)) {
          return [{
            arq: '(crypto)',
            ok: false,
            msg: 'SHA-256 indisponível neste navegador'
          }];
        }

        // Verifica cada arquivo declarado no manifesto.
        for (const [caminho, hashEsperado] of
          Object.entries(manifesto.arquivos)) {

          try {
            // Aceita apenas caminhos relativos internos.
            if (
              typeof caminho !== 'string' ||
              caminho.startsWith('/') ||
              caminho.includes('\\') ||
              caminho.split('/').some(p =>
                p === '..' || p === '.' || !p
              )
            ) {
              throw new Error('Caminho inválido');
            }

            if (
              typeof hashEsperado !== 'string' ||
              !/^[a-f0-9]{64}$/i.test(hashEsperado)
            ) {
              throw new Error('Hash inválido no manifesto');
            }

            const urlArquivo = new URL(
              caminho,
              manifestoURL
            );

            if (urlArquivo.origin !== location.origin) {
              throw new Error('Origem do arquivo não permitida');
            }

            const respostaArquivo = await buscar(
              urlArquivo.href
            );

            const conteudo = await respostaArquivo.arrayBuffer();

            const hashCalculado = hex(
              await crypto.subtle.digest(
                'SHA-256',
                conteudo
              )
            );

            const ok =
              hashCalculado.toLowerCase() ===
              hashEsperado.toLowerCase();

            resultados.push({
              arq: caminho,
              ok,
              msg: ok
                ? 'íntegro'
                : 'hash diferente do manifesto'
            });

          } catch (erro) {
            resultados.push({
              arq: caminho,
              ok: false,
              msg: erro.message || 'não carregou'
            });
          }
        }

      } catch (erro) {
        resultados.push({
          arq: 'manifest.json',
          ok: false,
          msg: erro.message || 'manifesto indisponível'
        });
      }

      return resultados;
    }

  };

})();
