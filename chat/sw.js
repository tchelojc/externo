/* Messenger ALMAFLUXO — service worker (escopo /chat/)
   Faz duas coisas: deixa o app instalável e mostra os avisos de mensagem nova.
   Não guarda nada em cache: o chat precisa sempre de rede. */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(){ /* sem cache: a rede responde */ });

self.addEventListener('push', function(e){
  var d = {};
  try{ d = e.data ? e.data.json() : {}; }catch(err){ d = { corpo: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.titulo || 'Messenger ALMAFLUXO', {
    body: d.corpo || 'Nova mensagem',
    tag: d.tag || 'chat',
    renotify: true,
    icon: '/chat/icons/icon-192.png',
    badge: '/chat/icons/badge-96.png',
    data: { url: d.url || '/chat/' }
  }));
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var alvo = new URL((e.notification.data && e.notification.data.url) || '/chat/', self.location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(lista){
    for(var i = 0; i < lista.length; i++){
      var c = lista[i];
      if(c.url.indexOf(self.location.origin + '/chat') === 0 && 'focus' in c){
        try{ if('navigate' in c) c.navigate(alvo); }catch(err){}
        return c.focus();
      }
    }
    return self.clients.openWindow(alvo);
  }));
});
