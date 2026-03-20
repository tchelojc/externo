const CACHE = 'almafluxo-v1';

// Agora inclui todas as páginas e ícones necessários
const ASSETS = [
  'index.html',
  'alma.html',
  'contato.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Instalação: baixa todos os arquivos listados
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting(); // ativa o novo worker imediatamente
});

// Ativação: remove caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // assume controle de todas as abas abertas
});

// Estratégia offline-first: busca no cache, se não tiver, vai à rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
