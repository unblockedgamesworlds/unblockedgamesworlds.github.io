MainGame.Boot = function (game) {

};

MainGame.Boot.prototype = {
    init: function () {
    		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    		game.scale.setResizeCallback(this.resizeGame);
    		game.scale.pageAlignHorizontally = true;

        if (game.device.desktop) {
            MainGame.onDesktop = true;
        }else {
            game.scale.pageAlignVertically = true;
            game.scale.forceLandscape = true;
            if(MainGame.orientation == 0){
                game.scale.forceOrientation(false, true);
            }else{
                game.scale.forceOrientation(true, false);
            }
            game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            game.scale.onOrientationChange.add(this.changeOrientation, this);
        }

        game.onPause.add(this.onGamePause, this);
        game.onResume.add(this.onGameResume, this);

        MainGame.initSettings();
    },

    resizeGame: function () {
  		if (MainGame.old_w != window.innerWidth || MainGame.old_h != window.innerHeight) {
    			MainGame.old_w = window.innerWidth;
    			MainGame.old_h = window.innerHeight;
    			MainGame.resizeGame();
		  }
	  },

    preload: function () {
        this.load.image('backpreloader', 'assets/backpreloader.png?r=1');
        this.load.image('preloader_bar', 'assets/preloader_bar.png?r=1');
        this.load.image('preloader_back', 'assets/preloader_back.png?r=1');
    },

    create: function () {
        this.state.start('Preloader');
    },

    onGamePause: function() {
        if(!game.sound.mute){
            MainGame.isGoAway = true;
            game.sound.mute = true;
        }else{
            MainGame.isGoAway = false;
        }
    },

    onGameResume: function() {
        if(MainGame.isGoAway){
            game.sound.mute = false;
        }
    },

    enterIncorrectOrientation: function () {
		setTimeout(function() {
		   window.scrollTo(0, 1)
		}, 100);
        MainGame.orientated = false;
		//
		document.getElementById('orientation').style.display = 'block';
		if(!game.device.android){
		document.getElementById('orientation').style.width = window.innerWidth + 'px';
		document.getElementById('orientation').style.height = window.innerHeight + 'px';
		}
    },

    leaveIncorrectOrientation: function () {
        MainGame.orientated = true;
		if(MainGame.loadIncorrect) window.location.reload();
        document.getElementById('orientation').style.display = 'none';
    },

	changeOrientation: function () {

    }
};
