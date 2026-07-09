// ════════════════════════════════════════════════════════════════
// ALMAFLUXO — Service Worker
// IMPORTANTE: a cada publicação/atualização real, troque VERSION abaixo.
// É essa troca que faz o navegador detectar um SW novo, rodar "install"
// de novo e (via "activate") apagar o cache antigo. Sem isso, o cache
// antigo nunca morre e o site fica "preso" numa versão congelada.
// ════════════════════════════════════════════════════════════════

const VERSION = 'v2-2026-07-09'; // <- mude isso a cada deploy
const CACHE = `almafluxo-${VERSION}`;

// Somente ativos verdadeiramente estáticos (nunca payloads de API/backend)
const ASSETS = [
  'index.html',
  'alma.html',
  'contato.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Caminhos/hosts que NUNCA devem ser interceptados pelo cache do SW.
// Cobre chamadas ao Apps Script (script.google.com), ao proxy Cloudflare
// (rotas /proxy/ e /webhook/ no próprio domínio) e à API do GitHub.
const NO_CACHE_HOSTS = ['script.google.com', 'api.github.com'];
const NO_CACHE_PATHS = ['/proxy/', '/webhook/'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 1) Chamadas de API/backend: sempre rede, nunca cache do SW.
  //    (POST já não seria pego pelo caches.match, mas isso também blinda
  //    qualquer GET — ex: geração de token, verificação de e-mail, etc.)
  const isNoCache =
    NO_CACHE_HOSTS.some(h => url.hostname.includes(h)) ||
    NO_CACHE_PATHS.some(p => url.pathname.startsWith(p));
  if (isNoCache) {
    return; // não chama respondWith → segue o fetch normal do navegador
  }

  // 2) Navegação/HTML: network-first. Tenta buscar a versão mais nova;
  //    só cai pro cache se estiver offline. Isso evita servir uma página
  //    velha quando existe uma nova publicada.
  const isHTML = e.request.mode === 'navigate' || url.pathname.endsWith('.html');
  if (isHTML) {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return resp;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // 3) Demais estáticos (ícones, manifest): cache-first normal.
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
