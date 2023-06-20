 // window.rWS = WebSocket;
        // WebSocket = function(url, options) {
        // 	var split = url.split('://');
        // 	var prefix = '';
        // 	switch (split[0].toLowerCase()) {
        // 		case 'ws':
        // 			prefix = 'wss://onebigorange-tmm.tbt.mx/websocket/http://';
        // 			break;
        // 		case 'wss':
        // 			prefix = 'wss://onebigorange-tmm.tbt.mx/websocket/https://';
        // 			break;
        // 		default:
        // 			prefix = split[0];
        // 	}
        // 	return new(Function.prototype.bind.call(window.rWS, null, (split[1].match(/\//g) || []).length === 0 ? (split[1].includes('?') ? prefix + split[1].replace('?', '/?') : prefix + split[1] + '/') : prefix + split[1], options));
        // };
        // var origOpen = XMLHttpRequest.prototype.open;
        // XMLHttpRequest.prototype.open = function(...args) {
        // 	args[1] = /^http/.test(args[1]) ? 'https://onebigstatic-tmm.tbt.mx/static/' + args[1] : args[1];
        // 	origOpen.apply(this, args);
        // };
        window.origBlob = window.Blob;
        window.Blob = function(array, options){
            if(array[1] instanceof Uint8Array){
                array[1] = new TextDecoder("utf-8").decode(array[1]).replace(/window\.top\.location\.href|window\.location\.href|document\.referrer|document\.URL/g, '"https://storage.y8.com/"');
            }
            return new window.origBlob(array, options);
        };
        var gameInstance = UnityLoader.instantiate("gameContainer", "Build/StackBump-new.json", {
            onProgress: UnityProgress,
            Module: {
                onRuntimeInitialized: function() {
                    UnityProgress(gameInstance, "complete")
                }
            }
        });