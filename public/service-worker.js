
// public/service-worker.js

// Define el nombre de la caché. Cámbialo si actualizas los assets precacheados.
const CACHE_NAME = 'travely-pwa-cache-v1.1'; // Versión actualizada para reflejar cambios

// Lista de URLs para precachear (App Shell fundamental).
// Estos son los archivos mínimos necesarios para que la app "funcione" offline.
const urlsToCache = [
  '/', // La ruta raíz
  // Next.js maneja el cacheo de sus propios chunks de JS/CSS y páginas de manera optimizada.
  // Por lo tanto, no es necesario (ni recomendable en general) precachear explícitamente 
  // las rutas de las páginas o los assets generados por Next.js aquí.
  // Nos enfocamos en el manifest y los iconos principales.
  '/manifest.json',
  '/icons/icon-192x192.png', // Asegúrate que estos iconos existan en public/icons/
  '/icons/icon-512x512.png'
  // Considera añadir una página offline.html aquí si la creas:
  // '/offline.html' 
];

// ---- CICLO DE VIDA DEL SERVICE WORKER ----

// Evento 'install': Se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando Service Worker...');
  
  // El Service Worker intentará precachear los assets del App Shell.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Abriendo caché y precacheando App Shell:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] App Shell precacheada exitosamente.');
        // Forza la activación del nuevo Service Worker una vez instalado,
        // en lugar de esperar a que todas las pestañas del cliente se cierren.
        return self.skipWaiting(); 
      })
      .catch(error => {
        console.error('[Service Worker] Falló el precacheo del App Shell:', error);
      })
  );
});

// Evento 'activate': Se dispara cuando el Service Worker se activa.
// Es un buen momento para limpiar cachés antiguas que ya no se usan.
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Si el nombre de la caché no es el actual, se elimina.
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Service Worker activado y cachés antiguas limpiadas.');
      // Permite que el SW tome control de los clientes (páginas) abiertos inmediatamente
      // sin necesidad de recargar la página.
      return self.clients.claim(); 
    })
  );
});

// ---- ESTRATEGIAS DE CACHÉ Y RESPUESTA A PETICIONES ----

// Evento 'fetch': Se dispara cada vez que la aplicación realiza una petición de red (ej. cargar una imagen, un script, una API).
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo interceptar peticiones GET. Otras peticiones (POST, PUT, etc.) no suelen ser cacheables.
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar peticiones a Firebase y Genkit para evitar problemas de cacheado de API calls sensibles o de autenticación.
  // También ignorar las peticiones internas de Next.js para HMR (Hot Module Replacement) en desarrollo.
  if (request.url.includes('firebase') || request.url.includes('genkit') || request.url.includes('/_next/static/webpack/')) {
    return; // Dejar que estas peticiones pasen directamente a la red.
  }

  // Estrategia para las navegaciones (peticiones de documentos HTML): Network First, Falling Back to Cache.
  // Intenta obtener la página de la red para tener la versión más actualizada.
  // Si la red falla, sirve la versión de la caché si está disponible.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Si la respuesta de red es válida, la almacenamos en caché para futuras visitas offline.
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Si la red falla, intentamos servir desde la caché.
          console.log(`[Service Worker] Red no disponible para navegación a ${request.url}. Intentando desde caché.`);
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Opcional: Devolver una página offline.html genérica si la navegación falla y no está en caché.
            // return caches.match('/offline.html'); 
            // Por ahora, simplemente fallará si no está en caché y la red está caída.
          });
        })
    );
    return;
  }

  // Estrategia para otros assets (CSS, JS, imágenes, fuentes, etc.): Cache First, Falling Back to Network.
  // Sirve desde la caché si está disponible para velocidad. Si no, va a la red y cachea la respuesta.
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Si el recurso está en caché, lo devolvemos.
          // console.log(`[Service Worker] Recurso encontrado en caché: ${request.url}`);
          return cachedResponse;
        }

        // Si no está en caché, hacemos la petición a la red.
        // console.log(`[Service Worker] Recurso NO encontrado en caché, solicitando a la red: ${request.url}`);
        return fetch(request).then((networkResponse) => {
          // Si la respuesta de red es válida (ej. status 200),
          // la clonamos y la guardamos en caché para futuras peticiones.
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(error => {
          console.error(`[Service Worker] Error al obtener de la red y no está en caché: ${request.url}`, error);
          // Aquí podrías devolver un asset placeholder (ej. imagen genérica de error) si lo deseas.
          // Por ejemplo, para imágenes:
          // if (request.headers.get('accept').includes('image')) {
          //   return caches.match('/icons/placeholder-image.png'); // Necesitarías cachear esta imagen.
          // }
        });
      })
  );
});
