// Happiness Index - Service Worker
var CACHE = 'happiness-v1';
var ASSETS = ['/'];

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e){
  // Network first - always get fresh data
  e.respondWith(
    fetch(e.request).catch(function(){
      return caches.match(e.request);
    })
  );
});
