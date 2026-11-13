// Generated from production assets. Personal ledger data stays in IndexedDB.
const CACHE = 'expense-ledger-assets-5cfb4b361744ab3d';
const ASSETS = ["./apple-touch-icon.png","./assets/index-310dsDdo.js","./assets/index-BHnC9KIC.css","./assets/web-D4iV3KNC.js","./assets/web-DJqIskL-.js","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest","./samples/2026-11/categories.json","./samples/2026-11/expected.json","./samples/2026-11/journal_settings.json","./samples/2026-11/records/2026-11.json","./samples/2026-11/settings.json"];
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
