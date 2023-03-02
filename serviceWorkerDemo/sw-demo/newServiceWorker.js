
const cachedName = "siteVersion";

// Step - Install Service Worker
self.addEventListener("install", (e) => {
  console.log("Service Worker Installed");
  // Step - Cache files
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
    fetch(e.request)
      .then((res) => {
        const responseClone = res.clone();
        caches.open(cachedName).then((cache) => {
          cache.put(e.request, responseClone);
        });
        return res;
      })
      .catch((err) => {
        caches.match(e.request).then((res) => res);
      })
  );
});
