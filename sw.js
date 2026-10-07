const CACHE = "pokerclub-v31";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/store.js",
  "./js/cloud.js",
  "./js/app.js",
  "./js/supabase-config.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var url = new URL(event.request.url);
  var path = url.pathname || "";
  if (path.indexOf("/.netlify/functions/") === 0 || path.indexOf("/api/supabase-config") === 0) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }
  var networkFirst = /\.(js|html)$/.test(path) || path === "/" || /\/index\.html$/.test(path);
  if (networkFirst) {
    event.respondWith(
      fetch(event.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
        return res;
      }).catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match("./index.html");
        });
      })
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
        return res;
      }).catch(function () { return caches.match("./index.html"); });
    })
  );
});
