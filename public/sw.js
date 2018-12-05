
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Skipping the wait I hope');
  console.log('adding bytes');
  self.skipWaiting();
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static')
    .then(function(cache) {
      console.log('[Service Workder] Precaching App Shell');
      cache.add('/index.html');
      cache.add('/src/js/app.js');
    })
  )
});


self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  //console.log('[Service Worker] Fetching something ....', event);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch (event.request);
        }
      })
  );
});