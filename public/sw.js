const helloPwa = "hello-pwa";
const assets = ["/", "/index.html", "/assets"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(helloPwa).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
