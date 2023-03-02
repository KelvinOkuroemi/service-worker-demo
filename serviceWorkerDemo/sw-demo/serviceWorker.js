const cachedName = "version2";
const cachedAssets = [
  "index.html",
  "about.html",
  "./js/main.js",
  "./css/index.css",
];

// Step - Install Service Worker
self.addEventListener("install", (e) => {
  console.log("Service Worker Installed");
  // Step - Cache files
  e.waitUntil(
    caches
      .open(cachedName)
      .then((cache) => {
        console.log("caching files");
        cache.addAll(cachedAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});
// Step - Activate Service Worker
self.addEventListener("activate", (e) => {
  console.log("Service Worker Activated");
  //Step - Keep Cache light
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cachedName) {
            console.log("Cached Service worker is being cleared");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Step - Persisting cached assets
self.addEventListener("fetch", (e) => {
  console.log("fetching service worker");
  e.respondWith(
    fetch(e.request).catch(() => {
      caches.match(e.request);
    })
  );
});
