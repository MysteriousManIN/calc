"use strict";

window.navigator.serviceWorker.register("sw.js").then(
  (res)=>{ },
  (err)=>{ console.log(err); }
)