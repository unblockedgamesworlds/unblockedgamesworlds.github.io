MainGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

MainGame.Preloader.prototype = {
	preload: function () {
		game.stage.backgroundColor = '#000000';


		var bg = game.add.sprite(MainGame.worldX, MainGame.worldY, 'backpreloader'); bg.anchor.setTo(0.5, 0.5);
		//game.add.sprite(MainGame.worldX-width, MainGame.worldY+20, 'preloaderBackground');

		var width = Math.ceil(412/2);
		this.background = game.add.sprite(MainGame.worldX-width, MainGame.worldY+200, 'preloader_back');
	    this.preloadBar = game.add.sprite(MainGame.worldX-width, MainGame.worldY+200, 'preloader_bar');
	    game.load.setPreloadSprite(this.preloadBar);

		game.load.image('bandai_logo', 'assets/bandai_logo.png?r=1');
		game.load.image('bg', 'assets/background/bg1.png?r=2');

		game.load.atlasJSONHash('ss_main', 'assets/spritesheets/ss_main.png?r='+MyMath.getRandomInt(0,99), 'assets/spritesheets/ss_main.json?r='+MyMath.getRandomInt(0,99));
		game.load.atlasJSONHash('ss_menu', 'assets/spritesheets/ss_menu.png?r='+MyMath.getRandomInt(0,99), 'assets/spritesheets/ss_menu.json?r='+MyMath.getRandomInt(0,99));

		game.load.audio('main_theme', ['assets/audio/ogg/main_theme.ogg', 'assets/audio/mp3/main_theme.mp3']);
		if (game.device.webAudio) {
		game.load.audio('bonus_activate', 		['assets/audio/ogg/bonus_activate.ogg', 'assets/audio/mp3/bonus_activate.mp3']);
		game.load.audio('bonus_born', 			['assets/audio/ogg/bonus_born.ogg', 'assets/audio/mp3/bonus_born.mp3']);
		game.load.audio('bonus_the_end', 		['assets/audio/ogg/bonus_the_end.ogg', 'assets/audio/mp3/bonus_the_end.mp3']);
		game.load.audio('buy1', 				['assets/audio/ogg/buy1.ogg', 'assets/audio/mp3/buy1.mp3']);
		game.load.audio('explosion1', 			['assets/audio/ogg/explosion1.ogg', 'assets/audio/mp3/explosion1.mp3']);
		game.load.audio('explosion2', 			['assets/audio/ogg/explosion2.ogg', 'assets/audio/mp3/explosion2.mp3']);
		game.load.audio('fire', 				['assets/audio/ogg/fire.ogg', 'assets/audio/mp3/fire.mp3']);
		game.load.audio('game_over', 			['assets/audio/ogg/game_over.ogg', 'assets/audio/mp3/game_over.mp3']);
		}

		game.load.json('alltext', 'assets/text/text.json?r='+MyMath.getRandomInt(0,99));

		game.add.text(0, 0, "0123456789", MainGame.styleText).destroy();
	},

	create: function () {
		MainGame.TEXT_FILE = game.cache.getJSON('alltext');

		MainGame.s_musicM = game.add.audio('main_theme', 1);
		if (game.device.webAudio) {
		MainGame.s_sounds1 = game.add.audio('bonus_activate', 1);
		MainGame.s_sounds2 = game.add.audio('bonus_born', 1);
		MainGame.s_sounds4 = game.add.audio('bonus_the_end', 1);
		MainGame.s_sounds8 = game.add.audio('buy1', 1.2);
		MainGame.s_sounds11 = game.add.audio('explosion1', 1);
		MainGame.s_sounds12 = game.add.audio('explosion2', 1);
		MainGame.s_sounds13 = game.add.audio('fire', 0.6);
		MainGame.s_sounds14 = game.add.audio('game_over', 1);
		}
	},

	update: function () {
		if (!this.ready) {
			this.ready = true;
			MainGame.continueGame();
		}
	}
};
