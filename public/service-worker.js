const CACHE_NAME = 'sms-cache-v2';

const PRECACHE_URLS = [
  '/',
  '/index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  const isStaticAsset =
    requestUrl.origin === location.origin &&
    (
      requestUrl.pathname === '/' ||
      requestUrl.pathname === '/index.html' ||
      requestUrl.pathname.startsWith('/assets/') ||
      requestUrl.pathname.endsWith('.png') ||
      requestUrl.pathname.endsWith('.jpg') ||
      requestUrl.pathname.endsWith('.jpeg') ||
      requestUrl.pathname.endsWith('.svg') ||
      requestUrl.pathname.endsWith('.webp') ||
      requestUrl.pathname.endsWith('.json') ||
      requestUrl.pathname.endsWith('.css') ||
      requestUrl.pathname.endsWith('.js')
    );

  if (isStaticAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(event.request);

          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }

          return networkResponse;
        } catch {
          const fallback = await cache.match('/index.html');
          if (fallback) return fallback;
        }
      })
    );
  }
});