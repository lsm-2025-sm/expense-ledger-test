// Generated from production assets. Personal ledger data stays in IndexedDB.
const CACHE = 'expense-ledger-assets-535d8e3dc2c9353f';
const ASSETS = ["./apple-touch-icon.png","./assets/index-B9YNC-O3.js","./assets/index-CmwkNnSP.css","./assets/web-5QNQLKwD.js","./assets/web-Cle3qhhn.js","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest"];
const URLS = new Set(ASSETS.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('expense-ledger-assets-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // Use the index matching this worker's cached bundle to avoid mixing releases.
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match('./index.html')) || fetch(request)));
  } else if (URLS.has(request.url)) {
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(request)) || fetch(request)));
  }
});
