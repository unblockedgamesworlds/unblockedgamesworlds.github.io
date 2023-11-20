var game;

window.onload = function () {
	setTimeout(function() {
		window.scrollTo(0, 1);
		if(MainGame.isAPI) GamifiveSDK.init({lite: true});
		initGameStates();
	}, 100);
}

var MainGame = {
	Config: {GAME_WIDTH:640, GAME_HEIGHT:960},
	isAPI: !true,
	isDebug: false,
	isGodMode: false,
	title: "batlecity_v1.0",
	state: null,
	stateName: "",
	orientation:0,//0 - PORTRAIT, 1 - LANDSCAPE
	orientated: false,
	languages: ['EN','IT','ES','PT','TR','RU','FR','JP','AR'],
	languagesN: ['00','01','02','03','04','07','08','09','10'],
	language: 0,
	styleText: { font: "20px joystix",fill: "#ffffff", align: "center"},
	styleText2: { font: "20px calibri",fill: "#ffffff", align: "center"},
	styleText3: { font: "20px Hardpixel",fill: "#ffffff", align: "center"},
	styleText4: { font: "20px ArialBold",fill: "#ffffff", align: "center"},
	GAME_TEXT: null,
	TEXT_FILE: null,
	old_w: false,
	old_h: false,
	onDesktop:false,
	fadeColor: 0x000000,
	textFPS: null,
	showFPS: false,
	isPaused: false,
	isGoAway:false,
	isMusicMuted: false,
	isMusicPlaying:-1,
	nextState:'',
	gameOver: false,
	firstLoad: true,
	firstTime: true,
	firstGo: true,
	points: 0,
	upgradeFirerate: 0,
	upgradeDamage: 0,
	bonusesLvl: [0,0,0,0,0,0,0],
	priceUp1: [50,200,400,600,900,1200,1500,2000,2500,3500,4500],
	priceUp2: [50,200,400,600,900,1200,1500,2000,2500,3500,4500],
	pricesBonus: [50,100,200,300,400,500,600,700,800,1000],
	firstBonus:2,

	initSettings: function () {
		game.input.maxPointers = 1;
		game.stage.disableVisibilityChange = true;//
		game.load.crossOrigin = "anonymous";
		game.stage.smoothed = false;

		game.add.text(0, 0, "0123456789", MainGame.styleText).destroy();
		game.add.text(0, 0, "0123456789", MainGame.styleText2).destroy();
		game.add.text(0, 0, "0123456789", MainGame.styleText3).destroy();
		game.add.text(0, 0, "0123456789", MainGame.styleText4).destroy();

		game.camera.onFadeComplete.add(MainGame.changeState, this);
		MainGame.worldX = game.world.centerX;
		MainGame.worldY = game.world.centerY;

		MainGame.loadSaves();

		MainGame.midX = Math.ceil(MainGame.Config.GAME_WIDTH / 2);

		if(game.device.desktop){
			game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

			window.addEventListener("keydown", function(e) {
			    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			        e.preventDefault();
			    }
			}, false);
		}
	},

	continueGame: function () {
		game.state.start('Menu');
	},

	addButton: function (link, vLayer, vX, vY, onClick, vText, vW, vH, vSize) {
		if (typeof vW === 'undefined') vW = 200;
		if (typeof vH === 'undefined') vH = 80;
		if (typeof vSize === 'undefined') vSize = 36;
		var btn = MainGame.addFill(vLayer, 0x333333, 0, vW, vH, vX-vW/2, vY-vH/2);
		btn.inputEnabled = true;
		btn.events.onInputDown.add(onClick, link);
		btn.text = MainGame.addText(1, vX, vY, vText, vLayer, vSize, '#FFFFFF', 0.5, 0.5);
		return btn;
	},

	addText: function (vT, vX, vY, vText, vLayer, vSize, vColor, vAnchorX, vAnchorY, vStyle) {
		if (typeof vLayer === 'undefined') vLayer = '';
		if (typeof vSize === 'undefined') vSize = 40;
		if (typeof vColor === 'undefined') vColor = '#000000';
		if (typeof vAnchorX === 'undefined') vAnchorX = 0;
		if (typeof vAnchorY === 'undefined') vAnchorY = 0;
		if (typeof vStyle === 'undefined') {
			if (vT == 0) {
				vStyle = MainGame.styleText3;
			}else{
				vStyle = MainGame.styleText;
				if(MainGame.languages[MainGame.language] == 'RU') vStyle = MainGame.styleText3;
				if(MainGame.languages[MainGame.language] == 'AR' || MainGame.languages[MainGame.language] == 'JP' || MainGame.languages[MainGame.language] == 'DE') vStyle = MainGame.styleText4;
			}
		}

		var text;
		if(vLayer!=''){
			text = vLayer.add(game.add.text(vX, vY, vText, vStyle));
		}else{
			text = game.add.text(vX, vY, vText, vStyle);
		}
		text.anchor.setTo(vAnchorX, vAnchorY);
		text.fontSize = vSize;
		text.fill = vColor;
		return text;
	},

	addLineBreak: function (vText){
		return vText.replace(" ", "\n");
	},

	updateTextWidth: function (vText, vMaxWidth){
		var _txtWidth = vText.width;
		var scale = 1;
		if(_txtWidth > vMaxWidth) {
			scale = vMaxWidth/_txtWidth;
			vText.scale.setTo(scale);
		}
		return scale;
	},

	addPanelka: function (vLayer, vX, vY, vW, vH, vColorF, vColorB, vLine){
		if (typeof vColorF === 'undefined') vColorF = 0x000000;
		if (typeof vColorB === 'undefined') vColorB = 0xffffff;
		if (typeof vLine === 'undefined') vLine = 4;
		var graphics = vLayer.add(game.add.graphics(vX, vY));
		graphics.lineStyle(vLine, vColorB, 0.6);
		graphics.beginFill(vColorF, 0.7);
		graphics.drawRect(0, 0, vW, vH);
		graphics.endFill();
		return graphics;
	},

	loadSaves: function () {
		if(MainGame.isAPI) {
			GamifiveSDK.loadUserData(this.dataIsLoaded);
		}else{
			var sPoints = localStorage[MainGame.title+"-points"]; if(sPoints != undefined && sPoints != "null") MainGame.points = Number(sPoints);
			var sLang = localStorage[MainGame.title+"-lang"]; if(sLang != undefined && sLang != "null") MainGame.language = Number(sLang);
			var sUpFirerate = localStorage[MainGame.title+"-upf"]; if(sUpFirerate != undefined && sUpFirerate != "null") MainGame.upgradeFirerate = Number(sUpFirerate);
			var sUpDamage = localStorage[MainGame.title+"-upd"]; if(sUpDamage != undefined && sUpDamage != "null") MainGame.upgradeDamage = Number(sUpDamage);

			var skok;
			for (var j = 0; j < 7; j++) {
				skok = localStorage[MainGame.title+"-blvl" + j];
				if(skok != undefined && skok != "null") MainGame.bonusesLvl[j] = Number(skok);
			}
		}
	},

	dataIsLoaded: function (data) {
		if(data.game != (MainGame.title+'_v1.0')) {
			if(MainGame.isAPI) GamifiveSDK.clearUserData();
			return;
		}
		if(data.language != null) MainGame.language = data.language;
		MainGame.points = data.points;
		MainGame.upgradeFirerate = data.upgradeFirerate;
		MainGame.upgradeDamage = data.upgradeDamage;
		MainGame.bonusesLvl = data.bonusesLvl;
	},

	saveSaves: function () {
		if(MainGame.isAPI) {
			var playerProgress = {
				game: MainGame.title+'_v1.0',
				language: MainGame.language,
				points: MainGame.points,
				upgradeFirerate: MainGame.upgradeFirerate,
				upgradeDamage: MainGame.upgradeDamage,
				bonusesLvl: MainGame.bonusesLvl
			};
			GamifiveSDK.saveUserData(playerProgress);
		}else{
			localStorage[MainGame.title+"-points"] = MainGame.points;
			localStorage[MainGame.title+"-lang"] = MainGame.language;
			localStorage[MainGame.title+"-upf"] = MainGame.upgradeFirerate;
			localStorage[MainGame.title+"-upd"] = MainGame.upgradeDamage;

			for (var j = 0; j < 7; j++) {
				localStorage[MainGame.title+"-blvl" + j] = MainGame.bonusesLvl[j];
			}
		}
	},

	clearSaves: function () {
		if(MainGame.isAPI) {
			GamifiveSDK.clearUserData();
		}else{
			for (var j = 0; j < 7; j++) {
				localStorage[MainGame.title+"-blvl" + j] = null;
			}
			localStorage[MainGame.title+"-points"] = null;
			localStorage[MainGame.title+"-lang"] = null;
			localStorage[MainGame.title+"-upf"] = null;
			localStorage[MainGame.title+"-upd"] = null;
		}
	},

	clearGame: function () {
		game.tweens.removeAll();
	},

	goToState: function (pNextState) {
			MainGame.isFadeGame = false;
			MainGame.clearGame();
			game.camera.fade(MainGame.fadeColor, 200);
			MainGame.nextState = pNextState;
	},

	changeState: function () {
		if(!MainGame.isFadeGame) game.state.start(MainGame.nextState);
	},

	fadeOut: function () {
		game.camera.flash(MainGame.fadeColor, 200);
	},

	resizeGame: function () {
		var ratio = window.innerWidth/window.innerHeight;
		var standardWidth = 640;
		var standardHeight = 960;
		var maxWidth = 1920;
		var standardRatio = standardWidth/standardHeight;

		if (ratio > standardRatio) {
			game.scale.setGameSize( Math.min(maxWidth, Math.ceil(standardHeight*ratio)) ,standardHeight);
			game.world.setBounds(Math.ceil((game.width-standardWidth)*-0.5),0,game.width,game.height);
		}else {
			game.scale.setGameSize( standardWidth, standardHeight);
			game.world.setBounds(0,0,Math.ceil((game.height-standardHeight)*-0.5),game.height);
		}
	},

	muteSounds: function (btn) {
		game.add.tween(btn.scale).to({x: 0.9, y: 0.9}, 200, Phaser.Easing.Cubic.Out, true);
		game.add.tween(btn.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true, 260);
		if(game.sound.mute) {
			btn.frameName = 'btn_sound_0000';
		}else{
			btn.frameName = 'btn_sound_0001';
		}
		game.sound.mute = !game.sound.mute;
		MainGame.isMusicMuted = game.sound.mute;
	},

	playMusic: function (num) {
		if(MainGame.isMusicPlaying === num) return;
		MainGame.s_musicM.play('',0,0.2,true);
		MainGame.isMusicPlaying = num;
	},

	stopMusic: function () {
		MainGame.isMusicPlaying = -1;
		if(MainGame.s_musicM != null) MainGame.s_musicM.stop();
		if(MainGame.s_musicG != null) MainGame.s_musicG.stop();
	},

	playSound: function (vNum) {
		if(game.device.webAudio) {
			if(MainGame["s_sounds"+vNum]) MainGame["s_sounds"+vNum].play();
		}
	},

	showFps: function (vX, vY) {
		if (typeof vX === 'undefined') vX = 20;
		if (typeof vY === 'undefined') vY = 20;
		game.time.advancedTiming = true;
		MainGame.textFPS = game.add.text(vX, vY, "FPS", {
			font: "20px Arial",
			fill: "#FFFFFF",
			align: "center"
		});
		MainGame.textFPS.fixedToCamera = true;
	},

	clickLogo: function (vMoreGames) {
		if (typeof vMoreGames === 'undefined') vMoreGames = true;
		if(MainGame.clickOne) return;

		try{
			if(MainGame.isAPI) GamifiveSDK.goToHome();
		}catch (err) {
			console.log(err);
		}

		MainGame.clickOne = true;
		game.time.events.add(500, MainGame.clickOneBack, this);
	},

	clickOneBack: function () {
		MainGame.clickOne = false;
	},

	addFill: function (vLayer, vColor, vAlpha, vW, vH,posX,posY) {
		if (typeof vAlpha === 'undefined') vAlpha = 1;
		if (typeof posX === 'undefined') posX = 0;
		if (typeof posY === 'undefined') posY = 0;
		if (typeof vW === 'undefined') {
			vW = game.width;
			posX = -vW/2;
		}
		if (typeof vH === 'undefined') {
			vH = game.height;
		}
		var bg = vLayer.add(game.add.graphics(posX, posY));
		bg.beginFill(vColor, vAlpha);
		bg.drawRect(0, 0, vW, vH);
		bg.endFill();
		return bg;
	}
};

KeyButton = function(game, link, kuda, x, y, callback, spritesheet, frame1, frame2, vText, vStyle, vFrameName, vId) {
	if (typeof vText === 'undefined') vText = '';
	if (typeof vStyle === 'undefined') vStyle = MainGame.styleText;
	if (typeof vFrameName === 'undefined') vFrameName = '';
	if (typeof vId === 'undefined') vId = '';
	//
	_game = game;
	//
	if(kuda == null) {
		this.buttonC = game.add.group();
	}else{
		this.buttonC = kuda.add(game.add.group());
	}
	this.buttonC.x = x;
	this.buttonC.y = y;
	//
	this.button = this.buttonC.add(game.add.button(0, 0, spritesheet, callback, link, frame1, frame2, frame1, frame2));
	this.button.game = _game;
	this.button.anchor.setTo(0.5, 0.5);
	this.button.inputEnabled = true;
	this.button.textKey = vText;
	if (_game.device.desktop) this.button.input.useHandCursor = true;

	if(vText != ''){
		var text = this.buttonC.add(game.add.text(0, 2, vText.toUpperCase(), vStyle));
		text.anchor.set(0.5);
		this.text = text;
	}else{
		if(vFrameName != '') {
			var text = this.buttonC.add(_game.add.sprite(0, -2, spritesheet, vFrameName));
			text.anchor.set(0.5);
		}
		this.button.textKey = vId;
	}

	this.button.events.onInputDown.add(function() {
		_game.add.tween(this.buttonC.scale).to({x: 0.9, y: 0.9}, 200, Phaser.Easing.Cubic.Out, true);
		_game.add.tween(this.buttonC.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true, 260);
	}, this);
};


SimpleButton = function(game, link, kuda, x, y, key, frame, callback, animationScale, vText, vDx, vDy, vStyle, vIsUpperCase) {
	if (typeof vText === 'undefined') vText = '';
	if (typeof vDx === 'undefined') vDx = 0;
	if (typeof vDy === 'undefined') vDy = 0;
	if (typeof animationScale === 'undefined')animationScale = 0;
	if (typeof vStyle === 'undefined') vStyle = MainGame.styleText;
	if (typeof vIsUpperCase === 'undefined') vIsUpperCase = true;
	//
	_game = game;
	//
	if(kuda == null) {
		this.buttonC = game.add.group();
	}else{
		this.buttonC = kuda.add(game.add.group());
	}
	this.buttonC.x = x;
	this.buttonC.y = y;
	//
	this.button = this.buttonC.add(_game.add.sprite(0, 0, key, frame));
	this.button.game = _game;
	this.button.anchor.setTo(0.5, 0.5);
	this.button.inputEnabled = true;
	//this.button.keyText = vText;

	//if (_game.device.desktop) this.button.input.useHandCursor = true;

	if(vText != ''){
		if(vIsUpperCase) vText = vText.toUpperCase();
		var text = this.buttonC.add(game.add.text(0+vDx, 0+vDy, vText, vStyle));
		text.anchor.set(0.5);
		this.text = text;
	}

	this.button.events.onInputDown.add(function() {
		//if (_game.device.webAudio) _game.sound.play("s_tap",2.5);
		if(this.buttonC.alpha<1) return;
		_game.add.tween(this.buttonC.scale).to({x: 0.9, y: 0.9}, 200, Phaser.Easing.Cubic.Out, true);
		_game.add.tween(this.buttonC.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true, 260);
		_game.time.events.add(250, callback, link);
	}, this);

	if(animationScale > 1){
		_game.add.tween(this.buttonC.scale).to({ x: animationScale, y: animationScale }, 630, Phaser.Easing.Linear.None)
            .to({ x: 1, y: 1}, 630, Phaser.Easing.Linear.None)
            .loop()
            .start();
	}
};


var MyKeyboard = {
	initKeyboard: function (vX,vY,vLayer,vTextField) {
		this.arrKeys = [];

		var posY = 0;
		var posX = 0;
		var sdvigX = vX;
		var btn;
		for(var i=0;i<36;i++){
			if(i==10 || i==20 || i==29) {
				posY++;
				posX = 0;
				if(posY==1) sdvigX = vX+22.5;
				if(posY==2) sdvigX = vX+45;
				if(posY==3) sdvigX = vX+45+45;
			}
			btn = new KeyButton(game, this, vLayer, sdvigX+45*posX++, vY+45*posY, this.keyPressVirutal, 'ss_main', 'btn_key_miniOver_0000', 'btn_key_miniUp_0000', MainGame.keyboardKeys[i], MainGame.styleTextKey);
			this.arrKeys.push(btn);
		}

		btn = new KeyButton(game, this, vLayer, vX+45*10, vY, this.keyPressVirutal, 'ss_main', 'btn_key_miniOver_0000', 'btn_key_miniUp_0000', '', MainGame.styleTextKey, 'symbol_arrow_0000', 'bspace');
		this.arrKeys.push(btn);

		MainGame.keyboardField = vTextField;
		MainGame.keyboardArrKeys = this.arrKeys;

		MainGame.keyboardActivated = true;
	},

	keyPressVirutal: function (vKey) {
		var ch = vKey.textKey;
		if(ch == 'bspace'){
			this.removeBukva();
		}else if(ch == 'space'){
			this.addBukva(' ');
		}else{
			this.addBukva(ch.toUpperCase());
		}
	},

	addBukva: function (vChar) {
		str = MainGame.keyboardField.text;
		strl = str.length;
		if(strl >= MainGame.MAX_LENGTH) return;
		if(strl==0 && vChar==' ') return;
		MainGame.keyboardField.setText(MainGame.keyboardField.text+vChar);
	},

	removeBukva: function () {
		str = MainGame.keyboardField.text;
		strl = str.length;
		if(strl < 1) return;
		newstr = MainGame.keyboardField.text.substring(0, strl-1);
		MainGame.keyboardField.setText(newstr);
	},

	tweenBtn: function (vBtn) {
		game.add.tween(vBtn.scale).to({x: 0.9, y: 0.9}, 200, Phaser.Easing.Cubic.Out, true);
		game.add.tween(vBtn.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true, 260);
	}
}

var MyMath = {
	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getRandomBool: function () {
		return Math.random() < 0.5 ? true : false;
	},

	shuffleArr: function (o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},

	distanceTwoPoints: function (x1, x2, y1, y2) {
		var dx = x1-x2;
		var dy = y1-y2;
		return dx * dx + dy * dy;
	},

	parseQuery: function (qstr) {
		var query = {};
		var a = qstr.substr(1).split('&');
		for (var i = 0; i < a.length; i++) {
			var b = a[i].split('=');
			query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
		}
		return query;
	},

	lerp: function(in_Src, in_Dst, in_Ratio) {
		return (in_Src * (1 - in_Ratio)) + (in_Dst * in_Ratio);
	}
	//Phaser.Utils.chanceRoll(35)
};

function initGameStates(){
	game = new Phaser.Game(MainGame.Config.GAME_WIDTH, MainGame.Config.GAME_HEIGHT, Phaser.AUTO, 'game-container');//AUTO  CANVAS

	game.state.add('Boot', MainGame.Boot, true);
	game.state.add('Preloader', MainGame.Preloader);
	game.state.add('Menu', MainGame.Menu);
	game.state.add('Game', MainGame.Game);
	game.state.add('UpgradeScreen', MainGame.UpgradeScreen);

	setTimeout(function() {
	window.scrollTo(0, 1)
	}, 100);
}

function trace(a) {console.log(a);}
