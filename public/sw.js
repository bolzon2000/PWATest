
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('[Service Worker] Skipping the wait I hope');
  console.log('do we get eeyore back?!');
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static')
    .then(function(cache) {
      console.log('[Service Workder] Precaching App Shell');
      cache.add('/index.html');
      cache.add('/src/js/app.js');
      cache.add('/src/images/main-image.jpg')
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
