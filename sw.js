// Service Worker básico para IFAP
const CACHE_NAME = 'ifap-v1.0.1';
const urlsToCache = [
  '/',
  '/html/index.html',
  '/css/styles.css',
  '/manifest.json',
  '/images/placeholder.svg',
  // Agregar más recursos según sea necesario
];

// Manejar mensajes del cliente
self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'cleanOldCaches') {
    cleanOldCaches();
  }
});

// Función para limpiar caches antiguos
function cleanOldCaches() {
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheName !== CACHE_NAME) {
          console.log('Eliminando cache antiguo:', cacheName);
          return caches.delete(cacheName);
        }
      })
    );
  });
}

// Instalación del service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo durante activación:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar control inmediatamente
  event.waitUntil(self.clients.claim());
});

// Interceptar solicitudes de red
self.addEventListener('fetch', (event) => {
  // Filtrar solicitudes no válidas para cache
  const url = event.request.url;

  // Solo procesar solicitudes HTTP/HTTPS
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return;
  }

  // Excluir extensiones de navegador
  if (url.includes('chrome-extension://') ||
      url.includes('moz-extension://') ||
      url.includes('safari-extension://') ||
      url.includes('edge-extension://')) {
    return;
  }

  // Excluir solicitudes de datos (data URLs)
  if (url.startsWith('data:')) {
    return;
  }

  // Excluir solicitudes blob
  if (url.startsWith('blob:')) {
    return;
  }

  // Solo procesar solicitudes GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retornar respuesta del cache si existe
        if (response) {
          return response;
        }

        // Si no está en cache, hacer la solicitud de red
        return fetch(event.request)
          .then((response) => {
            // Verificar que la respuesta sea válida para cachear
            if (!response ||
                response.status !== 200 ||
                response.type !== 'basic' ||
                !response.ok) {
              return response;
            }

            // Verificar que la URL sea válida para cachear
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              return response;
            }

            // Clonar la respuesta para poder usarla y cachearla
            const responseToCache = response.clone();

            // Cachear de forma segura
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Verificar nuevamente antes de cachear
                if (url.startsWith('http://') || url.startsWith('https://')) {
                  cache.put(event.request, responseToCache);
                }
              })
              .catch((error) => {
                // Silenciar errores de cache
                console.log('Error al cachear:', error);
              });

            return response;
          })
          .catch(() => {
            // Si falla la solicitud de red y es una página HTML, mostrar página offline
            if (event.request.destination === 'document') {
              return caches.match('/html/index.html');
            }
          });
      })
  );
});