// service-worker.js

// Define el nombre de la caché
const CACHE_NAME = 'travely-pwa-cache-v1';

// Lista de URLs para cachear (App Shell)
// Incluye la página principal, manifest, CSS principal, JS principal, y los iconos principales.
const urlsToCache = [
  '/', // Página de inicio
  '/manifest.json', // Manifiesto de la PWA
  // '/css/style.css', // Si tuvieras un CSS global separado (con Next.js esto se maneja diferente)
  // '/js/main.js',   // Si tuvieras un JS global separado (con Next.js esto se maneja diferente)
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Puedes añadir aquí otras rutas clave de tu App Shell que siempre deban estar disponibles offline
  // Por ejemplo, páginas estáticas importantes o assets críticos.
  // Nota: Next.js tiene su propio manejo de cacheo y optimización,
  // este service worker es un complemento para el App Shell básico y PWA.
];

// Evento 'install': Se dispara cuando el Service Worker se instala.
// Aquí es donde cacheamos los assets estáticos iniciales (App Shell).
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Abriendo caché y añadiendo App Shell:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[ServiceWorker] App Shell cacheado exitosamente.');
        return self.skipWaiting(); // Forza al SW a activarse inmediatamente.
      })
      .catch((error) => {
        console.error('[ServiceWorker] Falló el cacheo del App Shell durante la instalación:', error);
      })
  );
});

// Evento 'activate': Se dispara después de que el SW se instala y está listo para tomar control.
// Aquí es donde limpiamos cachés antiguas si es necesario.
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Si el nombre de la caché no es el actual, la eliminamos.
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Service Worker activado y cachés antiguas limpiadas.');
      return self.clients.claim(); // Permite al SW tomar control de las páginas abiertas inmediatamente.
    })
  );
});

// Evento 'fetch': Se dispara cada vez que la aplicación realiza una petición de red (fetch).
// Implementa una estrategia "Network Falling Back to Cache" para las navegaciones.
// Para otros assets, podría ser "Cache First" si ya están en urlsToCache.
self.addEventListener('fetch', (event) => {
  // Solo interceptamos peticiones GET.
  if (event.request.method !== 'GET') {
    return;
  }

  // Estrategia: Network falling back to cache para peticiones de navegación
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si la respuesta de red es válida, la clonamos y la guardamos en caché para futuras solicitudes offline.
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // Si la red falla, intentamos servir desde la caché.
          console.log(`[ServiceWorker] Red no disponible para ${event.request.url}. Sirviendo desde caché.`);
          return caches.match(event.request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match('/'); // Fallback a la página de inicio si no está en caché.
            });
        })
    );
  } else if (urlsToCache.includes(event.request.url) || event.request.destination === 'image' || event.request.destination === 'style' || event.request.destination === 'script') {
    // Estrategia: Cache first, falling back to network para assets estáticos conocidos y otros assets.
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // console.log(`[ServiceWorker] Sirviendo desde caché: ${event.request.url}`);
            return cachedResponse;
          }
          // console.log(`[ServiceWorker] No en caché, solicitando a la red: ${event.request.url}`);
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          }).catch(() => {
            // Offline fallback para imágenes podría ser un placeholder
            if (event.request.destination === 'image') {
              // return caches.match('/icons/placeholder.png'); // Asegúrate de tener un placeholder
            }
            return new Response("Contenido no disponible offline.", { status: 404, statusText: "Offline" });
          });
        })
    );
  } else {
    // Para otras peticiones, simplemente intentamos la red.
    // No queremos cachear todo por defecto.
    event.respondWith(fetch(event.request).catch(() => {
       return new Response("Contenido no disponible offline.", { status: 404, statusText: "Offline" });
    }));
  }
});
