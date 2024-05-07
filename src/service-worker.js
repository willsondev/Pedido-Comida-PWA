// Asigna un nombre único al caché
const cacheName = 'mi-aplicacion-cache';

// Lista de archivos a ser cachéados
const cacheFiles = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/style.css',
  // Añade aquí todos los archivos que quieres cachear
];

// Instalación del service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheFiles))
  );
});

// Activación del service worker y eliminación de cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepta las peticiones y busca en el caché antes de ir al servidor
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
