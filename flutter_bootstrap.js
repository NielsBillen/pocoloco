(()=>{var u={hasImageCodecs:!("u"<typeof ImageDecoder||"Google Inc."!==navigator.vendor&&"Edg/"!==navigator.agent),hasChromiumBreakIterators:typeof Intl.v8BreakIterator<"u"&&typeof Intl.Segmenter<"u",supportsWasmGC:WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0])),crossOriginIsolated:window.crossOriginIsolated};function p(...e){return new URL(w(...e),document.baseURI).toString()}function w(...e){return e.filter(e=>!!e).map((t,e)=>{if(0===e)return i(t);{var r=i(t);let e=0;for(;e<r.length&&"/"===r.charAt(e);)e++;return r.substring(e)}}).filter(e=>e.length).join("/")}function i(e){let t=e.length;for(;0<t&&"/"===e.charAt(t-1);)t--;return e.substring(0,t)}var m=class{constructor(){this._scriptLoaded=!1}setTrustedTypesPolicy(e){this._ttPolicy=e}async loadEntrypoint(e){var{entrypointUrl:e=p("main.dart.js"),onEntrypointLoaded:t,nonce:r}=e||{};return this._loadJSEntrypoint(e,t,r)}async load(e,t,r,i,a){a??=e=>{e.initializeEngine(r).then(e=>e.runApp())};var n=r.entryPointBaseUrl;return"dart2wasm"===e.compileTarget?this._loadWasmEntrypoint(e,t,n,a):(t=p(n,e.mainJsPath??"main.dart.js"),this._loadJSEntrypoint(t,a,i))}didCreateEngineInitializer(e){"function"==typeof this._didCreateEngineInitializerResolve&&(this._didCreateEngineInitializerResolve(e),this._didCreateEngineInitializerResolve=null,delete _flutter.loader.didCreateEngineInitializer),"function"==typeof this._onEntrypointLoaded&&this._onEntrypointLoaded(e)}_loadJSEntrypoint(e,t,i){var a="function"==typeof t;if(!this._scriptLoaded){this._scriptLoaded=!0;let r=this._createScriptTag(e,i);if(!a)return new Promise((e,t)=>{console.debug("Injecting <script> tag. Using Promises. Use the callback approach instead!"),this._didCreateEngineInitializerResolve=e,r.addEventListener("error",t),document.head.append(r)});console.debug("Injecting <script> tag. Using callback."),this._onEntrypointLoaded=t,document.head.append(r)}}async _loadWasmEntrypoint(s,c,l,d){if(!this._scriptLoaded){this._scriptLoaded=!0,this._onEntrypointLoaded=d;let{mainWasmPath:e,jsSupportRuntimePath:t}=s,r=p(l,e),i=p(l,t),a=(null!=this._ttPolicy&&(i=this._ttPolicy.createScriptURL(i)),WebAssembly.compileStreaming(fetch(r))),n=await import(i),o;o="skwasm"===s.renderer?(async()=>{var e=await c.skwasm;return{skwasm:(window._flutter_skwasmInstance=e).wasmExports,skwasmWrapper:e,ffi:{memory:e.wasmMemory}}})():{};d=await n.instantiate(a,o);await n.invoke(d)}}_createScriptTag(e,t){var r=document.createElement("script");r.type="application/javascript",t&&(r.nonce=t);let i=e;return null!=this._ttPolicy&&(i=this._ttPolicy.createScriptURL(e)),r.src=i,r}};async function n(e,r,i){if(r<0)return e;let a,t=new Promise((e,t)=>{a=setTimeout(()=>{t(new Error(i+` took more than ${r}ms to resolve. Moving on.`,{cause:n}))},r)});return Promise.race([e,t]).finally(()=>{clearTimeout(a)})}var v=class{setTrustedTypesPolicy(e){this._ttPolicy=e}loadServiceWorker(e){if(!e)return console.debug("Null serviceWorker configuration. Skipping."),Promise.resolve();if(!("serviceWorker"in navigator)){let e="Service Worker API unavailable.";return window.isSecureContext||(e=e+`
The current context is NOT secure.`+`
Read more: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts`),Promise.reject(new Error(e))}let{serviceWorkerVersion:t,serviceWorkerUrl:r=p("flutter_service_worker.js?v="+t),timeoutMillis:i=4e3}=e,a=r;return null!=this._ttPolicy&&(a=this._ttPolicy.createScriptURL(a)),n(navigator.serviceWorker.register(a).then(e=>this._getNewServiceWorker(e,t)).then(this._waitForServiceWorkerActivation),i,"prepareServiceWorker")}async _getNewServiceWorker(e,t){return e.active||!e.installing&&!e.waiting?e.active.scriptURL.endsWith(t)?(console.debug("Loading from existing service worker."),e.active):(t=await e.update(),console.debug("Updating service worker."),t.installing||t.waiting||t.active):(console.debug("Installing/Activating first service worker."),e.installing||e.waiting)}async _waitForServiceWorkerActivation(r){if(r&&"activated"!==r.state)return new Promise((e,t)=>{r.addEventListener("statechange",()=>{"activated"===r.state&&(console.debug("Activated new service worker."),e())})});if(!r)throw new Error("Cannot activate a null service worker!");console.debug("Service worker already active.")}},g=class{constructor(e,i="flutter-js"){let a=e||[/\.js$/,/\.mjs$/];window.trustedTypes&&(this.policy=trustedTypes.createPolicy(i,{createScriptURL:function(e){if(e.startsWith("blob:"))return e;let t=new URL(e,window.location),r=t.pathname.split("/").pop();if(a.some(e=>e.test(r)))return t.toString();console.error("URL rejected by TrustedTypes policy",i,":",e,"(download prevented)")}}))}},h=e=>{let a=WebAssembly.compileStreaming(fetch(e));return(r,i)=>((async()=>{var e=await a,t=await WebAssembly.instantiate(e,r);i(t,e)})(),{})},e=class{async loadEntrypoint(e){let{serviceWorker:t,...r}=e||{},i=new g,a=new v;a.setTrustedTypesPolicy(i.policy),await a.loadServiceWorker(t).catch(e=>{console.warn("Exception while loading service worker:",e)});e=new m;return e.setTrustedTypesPolicy(i.policy),this.didCreateEngineInitializer=e.didCreateEngineInitializer.bind(e),e.loadEntrypoint(r)}async load({serviceWorkerSettings:e,onEntrypointLoaded:t,nonce:r,config:i}={}){i??={};var a,n,o,s,c,l=_flutter.buildConfig;if(!l)throw"FlutterLoader.load requires _flutter.buildConfig to be set";let d=l.builds.find(e=>{return!("dart2wasm"===e.compileTarget&&!u.supportsWasmGC||i.renderer&&(t=e,r=i.renderer,"auto"!==t.renderer?t.renderer!=r:"canvaskit"!=r&&"html"!=r))&&("skwasm"!==e.renderer||u.crossOriginIsolated&&u.hasChromiumBreakIterators&&u.hasImageCodecs&&u.supportsWasmGC);var t,r});if(d)return(a={}).flutterTT=new g,e&&(a.serviceWorkerLoader=new v,a.serviceWorkerLoader.setTrustedTypesPolicy(a.flutterTT.policy),await a.serviceWorkerLoader.loadServiceWorker(e).catch(e=>{console.warn("Exception while loading service worker:",e)})),e=l,l=i.canvasKitBaseUrl||(e.engineRevision&&!e.useLocalCanvasKit?w("https://www.gstatic.com/flutter-canvaskit",e.engineRevision):"canvaskit"),"canvaskit"===d.renderer?a.canvasKit=(n=a,o=i,s=u,c=l,window.flutterCanvasKitLoaded=(async()=>{if(!window.flutterCanvasKit){var i=s.hasChromiumBreakIterators&&s.hasImageCodecs;if(!i&&"chromium"==o.canvasKitVariant)throw"Chromium CanvasKit variant specifically requested, but unsupported in this browser";let e=i&&"full"!==o.canvasKitVariant,t=c,r=(e&&(t=p(t,"chromium")),p(t,"canvaskit.js"));n.flutterTT.policy&&(r=n.flutterTT.policy.createScriptURL(r));var i=h(p(t,"canvaskit.wasm")),a=await import(r);window.flutterCanvasKit=await a.default({instantiateWasm:i})}return window.flutterCanvasKit})(),window.flutterCanvasKitLoaded):"skwasm"===d.renderer&&(a.skwasm=(async(e,t)=>{let r=p(t,"skwasm.js"),i=r;e.flutterTT.policy&&(i=e.flutterTT.policy.createScriptURL(i));e=h(p(t,"skwasm.wasm"));return(await import(i)).default({instantiateWasm:e,locateFile:(e,t)=>{t+=e;return t.endsWith(".worker.js")?URL.createObjectURL(new Blob([`importScripts('${t}');`],{type:"application/javascript"})):t},mainScriptUrlOrBlob:r})})(a,l)),(e=new m).setTrustedTypesPolicy(a.flutterTT.policy),this.didCreateEngineInitializer=e.didCreateEngineInitializer.bind(e),e.load(d,a,i,r,t);throw"FlutterLoader could not find a build compatible with configuration and environment."}};window._flutter||(window._flutter={}),window._flutter.loader||(window._flutter.loader=new e)})(),window._flutter||(window._flutter={}),_flutter.buildConfig={engineRevision:"36335019a8eab588c3c2ea783c618d90505be233",builds:[{compileTarget:"dart2wasm",renderer:"skwasm",mainWasmPath:"main.dart.wasm",jsSupportRuntimePath:"main.dart.mjs"},{compileTarget:"dart2js",renderer:"canvaskit",mainJsPath:"main.dart.js"}]},_flutter.loader.load({serviceWorkerSettings:{serviceWorkerVersion:"692364339"}});