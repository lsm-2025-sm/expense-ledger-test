// Generated from production assets. Personal ledger data stays in IndexedDB.
const CACHE = 'expense-ledger-assets-49b0edafde4ea09e';
const ASSETS = ["./apple-touch-icon.png","./assets/index-76sNUsgP.js","./assets/index-DItGeoVw.css","./assets/web-BC_e2sFk.js","./assets/web-CJxQYxLc.js","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest","./samples/2026-11/categories.json","./samples/2026-11/expected.json","./samples/2026-11/journal_settings.json","./samples/2026-11/records/2026-11.json","./samples/2026-11/settings.json"];
const URLS = new Set(ASSETS.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: 'window' });
    // Keep old bundles while older tabs may still request their lazy modules.
    // These are only static asset caches; ledger records remain in IndexedDB.
    if (!windows.length) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith('expense-ledger-assets-') && key !== CACHE).map(key => caches.delete(key)));
    }
    for (const client of windows) {
      const url = new URL(client.url);
      if (url.href.startsWith(self.registration.scope) && url.searchParams.get('refreshSample') === '1') {
        url.searchParams.delete('refreshSample');
        url.searchParams.set('sample', '2026-11');
        // Only the explicit recovery link reloads automatically. Other tabs
        // keep their current forms and data. Do not await navigation here.
        client.navigate(url.href).catch(() => {});
      }
    }
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // Online navigation always checks the current release. Offline fallback
    // uses this worker's own cached index, matching its cached asset bundle.
    const fallback = () => caches.open(CACHE).then(async cache => (await cache.match('./index.html')) || fetch(request));
    event.respondWith(fetch(request, { cache: 'no-store' }).then(response => response.ok ? response : fallback()).catch(fallback));
  } else if (URLS.has(request.url) || request.url.startsWith(new URL('./assets/', self.registration.scope).href)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const current = await cache.match(request);
      if (current) return current;
      for (const key of await caches.keys()) {
        if (key.startsWith('expense-ledger-assets-') && key !== CACHE) {
          const previous = await (await caches.open(key)).match(request);
          if (previous) return previous;
        }
      }
      return fetch(request);
    })());
  }
});
