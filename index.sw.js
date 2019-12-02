const CACHE_NAME = 'SITE_CONTENT_V1';

const urlsToCache = [
  'styles/index.css',
  'styles/images/—Pngtree—super mario cartoon background_191276.jpg',
  'index.html',
  'index.js',

  'apple-touch-icon.png',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'site.webmanifest',
  'safari-pinned-tab.svg'
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