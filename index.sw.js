const CACHE_NAME = 'SITE_CONTENT_V1';

const urlsToCache = [
  '/src/styles/index.css',
  '/src/styles/images/—Pngtree—super mario cartoon background_191276.jpg',
  '/src/index.html',
  '/src/index.js'
];

self.addEventListener('install', event => {
  console.log('installing');
  event.waitUntil( async function() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(urlsToCache);
    console.log('cache added');
  }())
});

self.addEventListener('fetch', event => {
  console.log(`fetching from: ${event.request.url}`);
  const url = event.request;
  event.respondWith(
    caches.match(url).then(response => {
      return response || fetch(url).then(res => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(url, res.clone())
        })
      })
    })
  )
});