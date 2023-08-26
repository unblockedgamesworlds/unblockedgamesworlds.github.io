(function(){'use strict';var ENABLE_LOG=false;var ENABLE_CONCURRENCY=true;var MAX_CONCURRENCY=4;var DEFAULT_CONCURRENCY=2;var STATE_INIT=0;var STATE_LOADING=1;var STATE_READY=2;var IDLE_TIMEOUT=500;var HARDWARE_CONCURRANCY=Math.min(MAX_CONCURRENCY,(navigator["hardwareConcurrency"]||DEFAULT_CONCURRENCY));var LIBRARY_URL=(window["cr_opusWasmScriptUrl"]||"opus.wasm.js");var _state=STATE_INIT;var _queue=[];var _pending=[];var _counter=0;var _workers=[];var _isConcurrent=true;var _idleTimer=null;var _hotLoad=false;var _workerURL=null;if(_isConcurrent)
{window.OpusDecoder=function(buffer,callback)
{_queue.unshift([_counter++,buffer,callback]);if(_state==STATE_READY)
ProcessNext();else if(_state==STATE_INIT)
Initialise();};window.OpusDecoder["Initialise"]=function(n)
{_hotLoad=true;Initialise(n);};window.OpusDecoder["Destroy"]=function()
{Destroy();};window.OpusDecoder["type"]="concurrent";}
function log()
{if(ENABLE_LOG)
console.log.apply(console,arguments);}
function startProfile()
{if(ENABLE_LOG)
console.profile("audio");}
function snapshotProfile(n)
{if(ENABLE_LOG)
console.takeHeapSnapshot(n);}
function delayedSnapshotProfile(n,t)
{if(ENABLE_LOG)
setTimeout(snapshotProfile,t,n);}
function delayedEndProfile(t)
{if(ENABLE_LOG)
setTimeout(endProfile,t);}
function endProfile()
{if(ENABLE_LOG)
console.profileEnd("audio");}
function IsWKWebView()
{var isIOS=/(iphone|ipod|ipad)/i.test(navigator.userAgent);var isCordova=!!window["cordova"];return isIOS&&isCordova;}
function Initialise(n)
{if(_state!=STATE_INIT)
return;_state=STATE_LOADING;if(_isConcurrent)
{log("Initialising multi-worker opus decoder");startProfile();snapshotProfile("init")
GetWorkerURL(function(err,url){if(err)
throw new Error(err);var count=n||HARDWARE_CONCURRANCY;while(count--)
CreateWorker(url);_state=STATE_READY;ProcessNext();});}}
function Destroy()
{if(_state!=STATE_READY)
return;log("Destroying opus decoder");CancelIdleTimer();for(var i=0,l=_workers.length;i<l;i++)
_workers[i].terminate();_state=STATE_INIT;_queue.length=0;_pending.length=0;_counter=0;_workers.length=0;snapshotProfile("destroy");delayedEndProfile(5000);delayedSnapshotProfile("after completion",5000);}
function ProcessNext()
{var job;var buffer;var callback;var id;var worker;if(_isConcurrent)
{var L=_workers.length;if(_queue.length)
{CancelIdleTimer();while(_queue.length)
{job=_queue.pop();id=job[0];buffer=job[1];callback=job[2];worker=_workers[id%L];worker.postMessage({"id":id,"buffer":buffer},[buffer]);_pending.push([id,callback]);}}}}
function ReadLocalFile(url,cb)
{var path=window["cordova"]["file"]["applicationDirectory"]+"www/"+url;window["resolveLocalFileSystemURL"](path,function(entry)
{entry["file"](function(file)
{var reader=new FileReader();reader.onload=function()
{cb(null,reader.result);};reader.onerror=function()
{cb("Failed to read "+path);};reader.readAsArrayBuffer(file);})});}
function GetWorkerURL(cb)
{if(IsWKWebView())
{if(_workerURL)
{cb(null,_workerURL);}
else
{ReadLocalFile(LIBRARY_URL,function(err,workContent)
{if(err)
cb(err);else
{_workerURL=URL.createObjectURL(new Blob(["self[\"IS_WKWEBVIEW\"] = true;\n",workContent]));cb(null,_workerURL);}});}}
else if(window["cr_opusWasmBinaryUrl"])
{if(_workerURL)
{cb(null,_workerURL);}
else
{fetch(LIBRARY_URL).then(function(response)
{return response.text();}).then(function(text)
{var prefixLine="self[\"cr_opusWasmBinaryUrl\"] = \""+window["cr_opusWasmBinaryUrl"]+"\";\n";_workerURL=URL.createObjectURL(new Blob([prefixLine,text]));cb(null,_workerURL);}).catch(function(err)
{cb(err);});}}
else
{cb(null,LIBRARY_URL);}}
function CreateWorker(url)
{var worker=new Worker(url);_workers.push(worker);worker.onmessage=OnWorkerMessage;}
function RequestFile(url,worker,id)
{ReadLocalFile(url,function(err,data){if(err)
{worker.postMessage({"type":"request","id":id,"error":err});}
else
{worker.postMessage({"type":"request","id":id,"buffer":data},[data]);}});}
function CompleteJobWithID(id,err,buffer,time)
{var job;for(var i=0,l=_pending.length;i<l;i++)
{if(_pending[i][0]==id)
{job=_pending[i];_pending.splice(i,1);break;}}
if(!job)
throw new Error("No job with ID "+id);job[1](err,buffer,time);if(_pending.length==0)
{StartIdleTimer();}}
var OnWorkerMessage=function OnWorkerMessage(e)
{var data=e.data;var id=data["id"];var worker=this;switch(data["type"])
{case "request":RequestFile(data["url"],worker,id);break;case "error":CompleteJobWithID(id,data["value"],null);break;case "complete":CompleteJobWithID(id,null,data["value"],data["time"]);break;}}
function StartIdleTimer()
{if(_hotLoad)
return;if(_idleTimer)
{CancelIdleTimer();}
log("Starting idle timer");snapshotProfile("idle");_idleTimer=setTimeout(TriggerIdle,IDLE_TIMEOUT);}
function CancelIdleTimer()
{if(_idleTimer)
{log("Cancelling idle timer");clearTimeout(_idleTimer);_idleTimer=null;}}
var TriggerIdle=function TriggerIdle()
{if(_idleTimer)
{log("Completing idle timer");_idleTimer=null;Destroy();}}})();