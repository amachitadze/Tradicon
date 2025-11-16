/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// This service worker is intentionally left simple for now.
// It will be populated with caching strategies during the build process if needed,
// or can be manually edited for custom offline logic.

const CACHE_NAME = 'tradicon-cache-v1';
// Add assets that should be cached for offline use.
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/index.css',
    '/manifest.json',
    // Add other critical assets like logos or fonts if they are self-hosted
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch(err => {
                console.error('Failed to open cache and add assets:', err);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Cache first, then network
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && event.request.url.startsWith('http')) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            });
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});