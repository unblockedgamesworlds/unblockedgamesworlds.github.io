window.famobi = window.famobi || {};
window.famobi.audio = window.famobi.audio || {

	controls: false,
	bgm: true,
	sfx: true,

	init: function() {
		// do something
	},
	hasControls: function() {
		return this.controls;
	},
	isEnabled: function(type) {
		switch(type) {
			case "bgm":
				// return this.bgm;
			case "sfx":
				// return this.sfx;
			default:
				// return this.bgm && this.sfx;
				return GAMESNACKS.isAudioEnabled();
		}
	}
};

window.famobi_analytics = window.famobi_analytics || {};
window.famobi_tracking = window.famobi_tracking || {
	log: function() {},
	initUser: function() {},
	init: function() {},
	trackingAdCallback: function() {},
	trackEvent: function() {},
	sendRequest: function() {},
	processQueue: function() {}
};

window.famobi.getCurrentLanguage = function() {
	return "en";
};

window.famobi_analytics.trackEvent = function(event, params) {
	console.log(event, params);
	return new Promise(function(resolve, reject) {
		switch(event) {
			case "EVENT_LIVESCORE":
				console.log("GAMESNACKS.sendScore", params.liveScore);
				GAMESNACKS.sendScore(params.liveScore);
				return resolve(event, params);
			case "EVENT_LEVELSCORE":
				console.log("GAMESNACKS.sendScore", params.levelScore);
				GAMESNACKS.sendScore(params.levelScore);
				return resolve(event, params);
			case "EVENT_TOTALSCORE":
				console.log("GAMESNACKS.sendScore", params.totalScore);
				GAMESNACKS.sendScore(params.totalScore);
				return resolve(event, params);
			case "EVENT_LEVELFAIL":
				if(params.reason == "quit") {
					break;
				}
				console.log("GAMESNACKS.gameOver");
				GAMESNACKS.gameOver();
				return resolve(event, params);
			case "EVENT_LEVELSUCCESS":
				console.log("EVENT_LEVELSUCCESS");
				break;
			default:
				// ...
		}
		return resolve(event, params);
	});
};

window.famobi_analytics.trackScreen = function(screen) {
	if(screen == "SCREEN_HOME") {
		setTimeout(function() {
			window.famobi.hideSplashScreen();
		}, 500);
	}
}

// Gamesnack Audio Listener
GAMESNACKS.subscribeToAudioUpdates((isAudioEnabled) => {
	console.log("audio update received!");

	if(isAudioEnabled) {
		if(typeof window.famobi_onUnmuteRequested == "function") {
			window.famobi_onUnmuteRequested();
			console.log("unmuting requested");
		}
	} else {
		if(typeof window.famobi_onMuteRequested == "function") {
			window.famobi_onMuteRequested();
			console.log("muting requested");
		}
	}
});

// localforage: driver to localstorage
if(famobi_gameJS.includes("c2runtime.js")) {

	localForageCheck = setInterval(function() {

		if(typeof localforage !== "undefined") {
			console.log("localforage found");
			clearInterval(localForageCheck);

			localforage.ready(function() {
				localforage.setDriver(localforage.LOCALSTORAGE);
			});
		}
	}, 250);
}
