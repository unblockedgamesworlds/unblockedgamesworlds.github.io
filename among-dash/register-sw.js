"use strict";(function(){function OnRegisterSWError(e)
{console.warn("Failed to register service worker: ",e);};window.C3_RegisterSW=function C3_RegisterSW()
{if(!navigator.serviceWorker)
return;try{navigator.serviceWorker.register("sw.js",{scope:"./"}).then(function(reg)
{console.log("Registered service worker on "+reg.scope);}).catch(OnRegisterSWError);}
catch(e)
{OnRegisterSWError(e);}};})();