// Service Worker for Travely PWA
// Version: 1.0.1

const CACHE_NAME = 'travely-cache-v1';
// Add assets that are part of the app shell and unlikely to change frequently.
// Next.js built assets (_next/static/...) are versioned and handled by browser caching policies.
// Focusing on PWA specific files and potentially some key static assets if needed.
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico', // Assuming a favicon might exist
  // It's typically better to let Next.js and browser caching handle /_next/static assets.
  // For a true offline experience with Next.js, 'next-pwa' package is recommended.
  // This basic service worker will cache the main entry points.
  // Add paths to your logo and icons if they are static and not handled by Next/Image optimizations for offline.
  // For example: '/logo.svg', '/icons/icon-192x192.png', '/icons/icon-512x512.png'
];

// Install event: Cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[Service Worker] Failed to cache app shell:', error);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: Serve cached assets first (Cache First strategy for specified assets)
self.addEventListener('fetch', (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // For HTML navigation, try network first, then cache (Network-Falling-Back-To-Cache)
  // This ensures users get the latest page if online, but can still access if offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If valid response, cache it for future offline use (optional, could lead to stale HTML)
          // Be cautious with caching HTML responses directly without a strategy.
          return response;
        })
        .catch(() => {
          console.log('[Service Worker] Navigate: Fetch failed, trying cache for', event.request.url);
          return caches.match(event.request)
            .then(response => response || caches.match('/')); // Fallback to root if specific page not cached
        })
    );
    return;
  }

  // For other requests (CSS, JS, images defined in urlsToCache), use Cache First.
  // Check if the request URL is one of the predefined assets to cache.
  // This avoids overly aggressive caching of all assets, especially Next.js dynamic chunks.
  const requestUrl = new URL(event.request.url);
  if (urlsToCache.includes(requestUrl.pathname) || (requestUrl.origin === self.location.origin && (requestUrl.pathname.startsWith('/icons/')))) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            // Cache hit - return response
            console.log('[Service Worker] Cache hit for:', event.request.url);
            return response;
          }
          console.log('[Service Worker] Cache miss, fetching from network:', event.request.url);
          // Not in cache - fetch from network, then cache it
          return fetch(event.request).then(
            (networkResponse) => {
              if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'opaque')) {
                return networkResponse;
              }
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return networkResponse;
            }
          );
        })
        .catch(error => {
          console.error('[Service Worker] Fetch failed:', error);
          // You could return a fallback offline image/page here if appropriate
        })
    );
  } else {
    // For all other requests (especially _next/static), let them go to the network.
    // Next.js has its own caching mechanisms for these.
    // console.log('[Service Worker] Bypassing cache for (likely Next.js asset):', event.request.url);
    event.respondWith(fetch(event.request));
  }
});