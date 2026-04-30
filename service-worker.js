const CACHE_NAME = 'vouchers-cache-v3';

// القائمة بالملفات التي سيتم حفظها
const urlsToCache = [
  './',
  './index.html',
  './jwan-logo.png',
  './rehab-logo.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // تفعيل التحديث فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// مسح النسخ القديمة من ذاكرة الجوال
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// الأولوية لجلب التعديلات الجديدة من الإنترنت، وإذا لم يوجد إنترنت يفتح من الذاكرة
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
