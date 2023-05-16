"use strict";

var log = console.log.bind(console);
var err = console.error.bind(console);
this.onerror = err;

var CACHE_VERSION = "1.0.0";
var CURRENT_CACHES = {
  prefetch: "prefetch-cache-v" + CACHE_VERSION,
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(function (cache) {
      return cache.addAll(["/sw-http1", "/sw-http2", "/sw-http3"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      console.log(keyList);
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CURRENT_CACHES.prefetch) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
