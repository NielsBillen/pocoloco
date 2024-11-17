let MANIFEST="flutter-app-manifest",TEMP="flutter-temp-cache",CACHE_NAME="flutter-app-cache",RESOURCES={"index.html":"7f44ea52c230a7d2ea1c387dc6f13ac5","/":"7f44ea52c230a7d2ea1c387dc6f13ac5","main.dart.mjs":"19fcb32a72c1f6ea1bab928179e198e4","main.dart.js":"45ccfaf497f841b922bc24a1664ba695","assets/assets/fonts/roboto/Roboto-Regular.ttf":"327362a7c8d487ad3f7970cc8e2aba8d","assets/FontManifest.json":"da88bb00383aac00adac8c5d671f99e3","assets/AssetManifest.json":"96df83bc5233e0e19f675e10b86c66c4","assets/fonts/MaterialIcons-Regular.otf":"6da8d22c5b1d07651d8e348fc5c5e3f9","assets/NOTICES":"1f0ff1da5f55d72173542c03b87cc3ad","assets/shaders/ink_sparkle.frag":"ecc85a2e95f5e9f53123dcaf8cb9b6ce","assets/AssetManifest.bin.json":"bb3c1ac765f3520960e01c952c7b7bfc","assets/AssetManifest.bin":"bd3e073b13f138968cfe2a4e3a78561b","manifest.json":"f34a6dfada7d491214ace9ec44fa9549","version.json":"35128bd9bc2cafeb16957097beab242d","splash/img/light-2x.png":"e6d14497e29a1d9ec1706419d8322b32","splash/img/dark-1x.png":"228b704c0d90bd554b3f97eb61395f74","splash/img/light-4x.png":"c7779e08f70949ccc9f5117a785a73de","splash/img/light-3x.png":"1ae0651f9ab481f0bb49462dd3fc8b3d","splash/img/dark-3x.png":"1ae0651f9ab481f0bb49462dd3fc8b3d","splash/img/dark-4x.png":"c7779e08f70949ccc9f5117a785a73de","splash/img/dark-2x.png":"e6d14497e29a1d9ec1706419d8322b32","splash/img/light-1x.png":"228b704c0d90bd554b3f97eb61395f74","canvaskit/skwasm.wasm":"9f0c0c02b82a910d12ce0543ec130e60","canvaskit/canvaskit.js.symbols":"48c83a2ce573d9692e8d970e288d75f7","canvaskit/chromium/canvaskit.js.symbols":"a012ed99ccba193cf96bb2643003f6fc","canvaskit/chromium/canvaskit.wasm":"b1ac05b29c127d86df4bcfbf50dd902a","canvaskit/chromium/canvaskit.js":"671c6b4f8fcc199dcc551c7bb125f239","canvaskit/skwasm.js.symbols":"262f4827a1317abb59d71d6c587a93e2","canvaskit/canvaskit.wasm":"1f237a213d7370cf95f443d896176460","canvaskit/skwasm.js":"694fda5704053957c2594de355805228","canvaskit/skwasm.worker.js":"89990e8c92bcb123999aa81f7e203b1c","canvaskit/canvaskit.js":"66177750aff65a66cb07bb44b8c6422b","flutter_bootstrap.js":"af360b77c1d82507d21cb4a49b65639c","favicon.ico":"c11f4dd3adca75136a4c6919548de704","main.dart.wasm":"bcfdcf04bd1cc46561e8c74c34201f75","icons/icon.svg":"18e66e6418b151e563935d72eb437c20","icons/icon-192.png":"ff7088266fdd87b71e0400495396197e","icons/icon-512.png":"901cfeccf0fede2452ca73aad224bddf","flutter.js":"f393d3c16b631f36852323de8e583132"},CORE=["main.dart.js","main.dart.wasm","main.dart.mjs","index.html","flutter_bootstrap.js","assets/AssetManifest.bin.json","assets/FontManifest.json"];async function downloadOffline(){var a,e,s=[],t=await caches.open(CACHE_NAME),c={};for(a of await t.keys()){var n=a.url.substring(origin.length+1);c[n=""==n?"/":n]=!0}for(e of Object.keys(RESOURCES))c[e]||s.push(e);return t.addAll(s)}function onlineFirst(s){return s.respondWith(fetch(s.request).then(e=>caches.open(CACHE_NAME).then(a=>(a.put(s.request,e.clone()),e))).catch(e=>caches.open(CACHE_NAME).then(a=>a.match(s.request).then(a=>{if(null!=a)return a;throw e}))))}self.addEventListener("install",a=>(self.skipWaiting(),a.waitUntil(caches.open(TEMP).then(a=>a.addAll(CORE.map(a=>new Request(a,{cache:"reload"}))))))),self.addEventListener("activate",function(a){return a.waitUntil((async()=>{try{var a=await caches.open(CACHE_NAME),e=await caches.open(TEMP),s=await caches.open(MANIFEST),t=await s.match("manifest");if(t){var c=await t.json(),n=self.location.origin;for(f of await a.keys()){var i=f.url.substring(n.length+1);""==i&&(i="/"),RESOURCES[i]&&RESOURCES[i]==c[i]||await a.delete(f)}for(f of await e.keys()){d=await e.match(f);await a.put(f,d)}}else{await caches.delete(CACHE_NAME),a=await caches.open(CACHE_NAME);for(var f of await e.keys()){var d=await e.match(f);await a.put(f,d)}}await caches.delete(TEMP),await s.put("manifest",new Response(JSON.stringify(RESOURCES))),self.clients.claim()}catch(a){console.error("Failed to upgrade service worker: "+a),await caches.delete(CACHE_NAME),await caches.delete(TEMP),await caches.delete(MANIFEST)}})())}),self.addEventListener("fetch",s=>{if("GET"===s.request.method){var a=self.location.origin,e=s.request.url.substring(a.length+1);if(-1!=e.indexOf("?v=")&&(e=e.split("?v=")[0]),s.request.url!=a&&!s.request.url.startsWith(a+"/#")&&""!=e||(e="/"),RESOURCES[e])return"/"==e?onlineFirst(s):void s.respondWith(caches.open(CACHE_NAME).then(e=>e.match(s.request).then(a=>a||fetch(s.request).then(a=>(a&&Boolean(a.ok)&&e.put(s.request,a.clone()),a)))))}}),self.addEventListener("message",a=>{"skipWaiting"===a.data?self.skipWaiting():"downloadOffline"===a.data&&downloadOffline()});