//navn og version på casch samling
const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

// const assets = 
//install event
self.addEventListener('install', (event) => {
  console.log('service worker acticated');

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('skriv til alle statisk cache');

      return cache.addAll [
        // CSS
        './assets/css/global-stylesheet.css',
        './assets/css/main-stylesheet-index.css',
        './assets/css/main-stylesheet-indstillinger.css',
        './assets/css/main-stylesheet-oversigt.css',
        './assets/css/main-styleshhet-historik.css',
        './assets/css/nav-stylesheet-historik.css',
        './assets/css/nav-stylesheet-index.css',
        './assets/css/nav-stylesheet-indstillinger.css',
        './assets/css/nav-stylesheet-oversigt.css',
        // JS
        './assets/js/controller.js',
        './assets/js/global-indstillinger.js',
        './assets/js/historik.js',
        './assets/js/index.js',
        './assets/js/oversigt.js',
        // pages
        './pages/historik.html',
        './pages/indstillinger.html',
        './pages/oversigt.html',
        './index.html',
        // images
        './assets/logos/mainIcon.ico',
        './assets/images/screenshotNarrow1.png',
        './assets/images/screenshotNarrow2.png',
        './assets/images/screenshotNarrow3.png',
        './assets/images/screenshotWide.png',
        // serviceworker
        './pages/fallback.html',
        './manifest.json'
      ]
    }),
  );
});


//Activate
self.addEventListener('activate', event => {
  console.log('service worker acticated');

event.waitUntil(
  // Rydder op i cache og sletter alle uaktuelle caches
  caches.keys().then(keys => {
          const filteredKeys =keys.filter(key => key !== staticCacheName)
          filteredKeys.map(key => caches.delete(key))
      })
  )
});


// Fetch event
self.addEventListener('fetch', event => {

    // Kontroller svar på request
	event.respondWith(
        // Kig efter file match i cache 
		caches.match(event.request).then(cacheRes => {
            // Returner match fra cache - ellers hent fil på server
			return (
          cacheRes || 
          fetch(event.request).then(async cacheRes => {
            
          // Tilføjer nye sider til cachen
				    return caches.open(dynamicCacheName).then(cache => {
              // Bruger put til at tilføje sider til vores cache
					    // Læg mærke til metoden clone
					    cache.put(event.request.url, cacheRes.clone())
					    // Returnerer fetch request
					    return cacheRes
				    })
			    })
          )
        }).catch(() => {
          // Hvis ovenstående giver fejl kaldes fallback siden			
          return caches.match('./pages/fallback.html');
        })
      )
        
  // Kald evt. limit cache funktion
 
})

