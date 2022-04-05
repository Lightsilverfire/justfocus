const cacheName="PUT_NAME_OF_CACHE_HERE_V1";
/*Just take into account that the "files" below are request-url's and not filenames perse. So for your root of your website yous should include "./" 
and if you use my site (or another plain HTML-site) also "index.html". If you use a server-side language and have friendly url's that could be something like 
"news/this-is-a-newsarticle/".*/
const appFiles=[
	"manifest.json",
	"js/scripts.js",
	"css/stylesheet.css",
	"icon-512x512.png", 
	"./",
  "index.html"
];


self.addEventListener("install",(installing)=>{
    console.log("Service Worker: I am being installed, hello world!");
    //Put important offline files in cache on installation of the service worker
  CHANGEWITHYOURINSTALLEVENTVARIABLE.waitUntil(
  caches.open(CHANGEWITHYOURCACHENAMEVARIABLE).then((cache)=>{
    console.log("Service Worker: Caching important offline files");
    return cache.addAll(CHANGEWITHYOURFILESARRAYVARIABLE);
  })
);
  });
  
  self.addEventListener("activate",(activating)=>{	
    console.log("Service Worker: All systems online, ready to go!");
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: User threw a ball, I need to fetch it!");
  });
  
  self.addEventListener("push",(pushing)=>{
      console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
  })
  