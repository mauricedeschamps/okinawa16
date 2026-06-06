const CACHE_NAME = 'okinawa16-v1';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['/',
'index.html',
'manifest.json',
'icons/icon-192.jpg',
'icons/icon-512.jpg'
])));
  self.skipWaiting();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); }))));
  self.clients.claim();
});