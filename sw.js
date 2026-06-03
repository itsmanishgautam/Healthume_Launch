// Service Worker to handle offline assets and intercept 404 errors for custom page rendering
const CACHE_NAME = 'healthume-cache-v1';
const ASSETS = [
  '/404.html',
  '/css/style.css',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 404) {
          return caches.match('/404.html') || response;
        }
        return response;
      })
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/404.html');
        }
        return caches.match(event.request);
      })
  );
});
