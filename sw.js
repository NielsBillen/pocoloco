const CACHE_NAME = "pocoloco";

const urlsToCache = [
    'index.html',
    'images/screenshot.jpg',
    'images/logo/logo32.png',
    'images/logo/logo48.png',
    'images/logo/logo64.png',
    'images/logo/logo128.png',
    'images/logo/logo144.png',
    'images/logo/logo156.png',
    'images/logo/logo256.png',
    'images/logo/logo512.png',
	'fonts/patuaone.woff2',
	'fonts/robotocondensed.woff2'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});