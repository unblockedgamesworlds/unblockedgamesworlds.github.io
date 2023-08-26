"use strict";(function(){class OfflineClient
{constructor()
{this._broadcastChannel=(typeof BroadcastChannel==="undefined"?null:new BroadcastChannel("offline"));this._queuedMessages=[];this._onMessageCallback=null;if(this._broadcastChannel)
{var self=this;this._broadcastChannel.onmessage=function(e)
{self._OnBroadcastChannelMessage(e);};};}
_OnBroadcastChannelMessage(e)
{if(this._onMessageCallback)
{this._onMessageCallback(e);return;}
this._queuedMessages.push(e);}
SetMessageCallback(f)
{this._onMessageCallback=f;for(let e of this._queuedMessages)
this._onMessageCallback(e);this._queuedMessages.length=0;}};window.OfflineClientInfo=new OfflineClient();}());