let MANIFEST="flutter-app-manifest",TEMP="flutter-temp-cache",CACHE_NAME="flutter-app-cache",RESOURCES={"index.html":"7f44ea52c230a7d2ea1c387dc6f13ac5","/":"7f44ea52c230a7d2ea1c387dc6f13ac5","main.dart.mjs":"7fa9baaee09f5b628f3cc4065619325d","main.dart.js":"bed64b5d3e10353d91c4e2d4da6a0a0e","assets/assets/fonts/roboto/Roboto-Regular.ttf":"327362a7c8d487ad3f7970cc8e2aba8d","assets/FontManifest.json":"da88bb00383aac00adac8c5d671f99e3","assets/AssetManifest.json":"96df83bc5233e0e19f675e10b86c66c4","assets/fonts/MaterialIcons-Regular.otf":"e91073b2c35dcfa4cd857aa67e5badb6","assets/NOTICES":"1f0ff1da5f55d72173542c03b87cc3ad","assets/shaders/ink_sparkle.frag":"ecc85a2e95f5e9f53123dcaf8cb9b6ce","assets/AssetManifest.bin.json":"bb3c1ac765f3520960e01c952c7b7bfc","assets/AssetManifest.bin":"bd3e073b13f138968cfe2a4e3a78561b","manifest.json":"4dc808a2506acdca368a230a9d2ea619","version.json":"35128bd9bc2cafeb16957097beab242d","splash/img/light-2x.png":"e6d14497e29a1d9ec1706419d8322b32","splash/img/dark-1x.png":"228b704c0d90bd554b3f97eb61395f74","splash/img/light-4x.png":"c7779e08f70949ccc9f5117a785a73de","splash/img/light-3x.png":"1ae0651f9ab481f0bb49462dd3fc8b3d","splash/img/dark-3x.png":"1ae0651f9ab481f0bb49462dd3fc8b3d","splash/img/dark-4x.png":"c7779e08f70949ccc9f5117a785a73de","splash/img/dark-2x.png":"e6d14497e29a1d9ec1706419d8322b32","splash/img/light-1x.png":"228b704c0d90bd554b3f97eb61395f74","canvaskit/skwasm.wasm":"9f0c0c02b82a910d12ce0543ec130e60","canvaskit/canvaskit.js.symbols":"48c83a2ce573d9692e8d970e288d75f7","canvaskit/chromium/canvaskit.js.symbols":"a012ed99ccba193cf96bb2643003f6fc","canvaskit/chromium/canvaskit.wasm":"b1ac05b29c127d86df4bcfbf50dd902a","canvaskit/chromium/canvaskit.js":"671c6b4f8fcc199dcc551c7bb125f239","canvaskit/skwasm.js.symbols":"262f4827a1317abb59d71d6c587a93e2","canvaskit/canvaskit.wasm":"1f237a213d7370cf95f443d896176460","canvaskit/skwasm.js":"694fda5704053957c2594de355805228","canvaskit/skwasm.worker.js":"89990e8c92bcb123999aa81f7e203b1c","canvaskit/canvaskit.js":"66177750aff65a66cb07bb44b8c6422b","flutter_bootstrap.js":"22056c65e203de0800517dd52d0b9b3e","favicon.ico":"c11f4dd3adca75136a4c6919548de704","main.dart.wasm":"c825aa2383019d6338e39c08d246a6d0","icons/Icon-maskable-512.png":"301a7604d45b3e739efc881eb04896ea","icons/Icon-512.png":"96e752610906ba2a93c65f8abe1645f1","icons/Icon-maskable-192.png":"c457ef57daa1d16f64b27b786ec2ea3c","icons/Icon-192.png":"ac9a721a12bbc803b44f645561ecb1e1","flutter.js":"f393d3c16b631f36852323de8e583132"},CORE=["main.dart.js","main.dart.wasm","main.dart.mjs","index.html","flutter_bootstrap.js","assets/AssetManifest.bin.json","assets/FontManifest.json"];async function downloadOffline(){var request,resourceKey,resources=[],contentCache=await caches.open(CACHE_NAME),currentContent={};for(request of await contentCache.keys()){var key=request.url.substring(origin.length+1);currentContent[key=""==key?"/":key]=!0}for(resourceKey of Object.keys(RESOURCES))currentContent[resourceKey]||resources.push(resourceKey);return contentCache.addAll(resources)}function onlineFirst(event){return event.respondWith(fetch(event.request).then(response=>caches.open(CACHE_NAME).then(cache=>(cache.put(event.request,response.clone()),response))).catch(error=>caches.open(CACHE_NAME).then(cache=>cache.match(event.request).then(response=>{if(null!=response)return response;throw error}))))}self.addEventListener("install",event=>(self.skipWaiting(),event.waitUntil(caches.open(TEMP).then(cache=>cache.addAll(CORE.map(value=>new Request(value,{cache:"reload"}))))))),self.addEventListener("activate",function(event){return event.waitUntil((async()=>{try{var contentCache=await caches.open(CACHE_NAME),tempCache=await caches.open(TEMP),manifestCache=await caches.open(MANIFEST),manifest=await manifestCache.match("manifest");if(manifest){var oldManifest=await manifest.json(),origin=self.location.origin;for(request of await contentCache.keys()){var key=request.url.substring(origin.length+1);""==key&&(key="/"),RESOURCES[key]&&RESOURCES[key]==oldManifest[key]||await contentCache.delete(request)}for(request of await tempCache.keys()){response=await tempCache.match(request);await contentCache.put(request,response)}}else{await caches.delete(CACHE_NAME),contentCache=await caches.open(CACHE_NAME);for(var request of await tempCache.keys()){var response=await tempCache.match(request);await contentCache.put(request,response)}}await caches.delete(TEMP),await manifestCache.put("manifest",new Response(JSON.stringify(RESOURCES))),self.clients.claim()}catch(err){console.error("Failed to upgrade service worker: "+err),await caches.delete(CACHE_NAME),await caches.delete(TEMP),await caches.delete(MANIFEST)}})())}),self.addEventListener("fetch",event=>{if("GET"===event.request.method){var origin=self.location.origin,key=event.request.url.substring(origin.length+1);if(-1!=key.indexOf("?v=")&&(key=key.split("?v=")[0]),event.request.url!=origin&&!event.request.url.startsWith(origin+"/#")&&""!=key||(key="/"),RESOURCES[key])return"/"==key?onlineFirst(event):void event.respondWith(caches.open(CACHE_NAME).then(cache=>cache.match(event.request).then(response=>response||fetch(event.request).then(response=>(response&&Boolean(response.ok)&&cache.put(event.request,response.clone()),response)))))}}),self.addEventListener("message",event=>{"skipWaiting"===event.data?self.skipWaiting():"downloadOffline"===event.data&&downloadOffline()});