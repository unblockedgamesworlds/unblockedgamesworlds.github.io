MainGame.Game = function (game) {
	this.layerMain = null;
};

MainGame.Game.prototype = {
	create: function () {
		MainGame.state = this;
		MainGame.stateName = 'ScreenGame';

		this.layerBack = game.add.group();
		this.layerBack.x = MainGame.worldX;

		this.layerMain = game.add.group();
		this.layerAliens = this.layerMain.add(game.add.group());
		this.layerBullets = this.layerMain.add(game.add.group());
		this.layerTop = game.add.group();
		this.layerPause = game.add.group();

		this.isGameOver = false;
		this.isPaused = false;

		this.createLevel();
		this.createPanel();

		//control
		if(game.device.desktop){
			this.cursors = game.input.keyboard.createCursorKeys();
		}
		game.input.onDown.add(this.clickStage, this);

		MainGame.resizeGame();
		MainGame.fadeOut();

		if(MainGame.isAPI) GamifiveSDK.startSession();

		//if(!game.device.firefox) MainGame.showFPS = true;
		//if(MainGame.showFPS) MainGame.showFps(20,20);

		MainGame.playMusic(0);
	},

	createLevel: function () {
		this.backTile = this.layerBack.add(game.add.tileSprite(0, 0, 1152, 1024, 'bg'));
		this.backTile.anchor.setTo(0.5, 0);

		this.initSettings();
		this.addPlayer(320,760);
	},

	createPanel: function () {
		this.btnPause = this.layerTop.add(game.add.image(610, 30, 'ss_main', 'btn_pause_0000'));
		this.btnPause.anchor.setTo(0.5, 0.5);

		this.btnMute = this.layerTop.add(game.add.image(548, 31, 'ss_main', 'btn_sound_0000'));
		this.btnMute.anchor.setTo(0.5, 0.5);
		if(MainGame.isMusicMuted) this.btnMute.frameName = 'btn_sound_0001';

		var dY = 30;
		this.num1 = this.layerTop.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num1.anchor.setTo(0,0.5);
		this.num2 = this.layerTop.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num2.anchor.setTo(0,0.5);
		this.num3 = this.layerTop.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num3.anchor.setTo(0,0.5);
		this.num4 = this.layerTop.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num4.anchor.setTo(0,0.5);
		this.num5 = this.layerTop.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num5.anchor.setTo(0,0.5);
		this.num6 = this.layerTop.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num6.anchor.setTo(0,0.5);
		this.num2.visible = false;
		this.num3.visible = false;
		this.num4.visible = false;
		this.num5.visible = false;
		this.num6.visible = false;

		this.iconX2 = this.layerTop.add(game.add.image(360, dY-3, 'ss_main', 'x2_0000')); this.iconX2.anchor.setTo(0.5,0.5);
		this.iconX2.tint = 0xFF0000;
		this.iconX2.visible = false;

		this.updateScore(this.score);

		/*
		var btnY = 900;
		var btn1 = this.addButton(70+82*0, btnY, 'bonus1_0000', this.activateUp1);
		var btn2 = this.addButton(70+82*1, btnY, 'bonus2_0000', this.activateUp2);
		var btn3 = this.addButton(70+82*2, btnY, 'bonus3_0000', this.activateUp3);
		var btn4 = this.addButton(70+82*3, btnY, 'bonus4_0000', this.activateUp4);
		var btn5 = this.addButton(70+82*4, btnY, 'bonus5_0000', this.activateUp5);
		var btn6 = this.addButton(70+82*5, btnY, 'bonus6_0000', this.activateUp6);
		var btn7 = this.addButton(70+82*6, btnY, 'bonus7_0000', this.activateUp7);
		//*/

		var vY = 200;
		var backPP = this.layerPause.add(game.add.image(320, vY, 'ss_menu', 'panel2_0000'));
		backPP.anchor.setTo(0.5, 0);
		backPP.scale.setTo(2);

		var redLine1 = this.layerPause.add(game.add.image(320, vY+55, 'ss_menu', 'redLine_0000')); redLine1.anchor.setTo(0.5);
		var redLine2 = this.layerPause.add(game.add.image(320, vY+175, 'ss_menu', 'redLine_0000')); redLine2.anchor.setTo(0.5);

		this.btnPauseHome = this.layerPause.add(game.add.image(320-170, vY+320, 'ss_menu', 'home_0000')); 		this.btnPauseHome.anchor.setTo(0.5);
		this.btnPausePlay = this.layerPause.add(game.add.image(320, vY+320, 'ss_menu', 'playB_0000')); 			this.btnPausePlay.anchor.setTo(0.5);
		this.btnPauseReplay = this.layerPause.add(game.add.image(320+170, vY+320, 'ss_menu', 'replay_0000')); 	this.btnPauseReplay.anchor.setTo(0.5);

		this.gamePaused = MainGame.addText(1,320,vY+95,MainGame.GAME_TEXT.pause, this.layerPause, 32, '#FFFFFF', 0.5, 0);
		MainGame.updateTextWidth(this.gamePaused.text, 250);
		this.layerPause.visible = false;
	},

	addButton: function(vX, vY, vImage, vFunction){
		var btn = this.layerTop.add(game.add.image(vX, vY, 'ss_main', vImage));
		btn.anchor.setTo(0.5);
		btn.inputEnabled = true;
		btn.events.onInputDown.add(vFunction, this);
		return btn;
	},

	initSettings: function(){
		// MainGame.upgradeFirerate = 11// MAX x2 LEVEL = 22 MAX
		this.score = 0;
		this.timeWave = 180;
		this.NUM_BULLETS = 9;
		this.aliens = [];
		this.arrBullets = [];
		this.bulletTime = 0;
		this.numPlayerBullet = 0;
		this.backTile.tilePosition.y = 0;
		this.countAliens = 0;
		this.countWave = 0;
		this.waveBonus = 0;
		this.levelDiff = 1;
		this.isFirstBonus = true;
		this.typeWave = 0;
		this.timeType = 0;

		this.TIMER_BONUS = 5000;
		this.deactivateBonuses(false);

		this.bonusUp1 = 1+(10*(MainGame.bonusesLvl[0])/100);
		this.bonusUp2 = (100*(MainGame.bonusesLvl[1]));
		this.bonusUp3 = (100*(MainGame.bonusesLvl[2]));
		this.bonusUp4 = (100*(MainGame.bonusesLvl[3]));
		this.bonusUp5 = (100*(MainGame.bonusesLvl[4]));
		this.bonusUp6 = (100*(MainGame.bonusesLvl[5]));
		this.bonusUp7 = (10*(MainGame.bonusesLvl[6])/100);

		this.bombDamage = Math.round(this.damage*2*this.bonusUp1);
	},

	deactivateBonuses: function(vBool){
		if(vBool) {
			this.player.deactivate();
			if(!this.isGameOver) MainGame.playSound(4);
		}
		this.isBonusTime = false;
		this.isShield = false;
		this.damage = 1+MainGame.upgradeDamage;
		this.fireRate = 320-(MainGame.upgradeFirerate)*10;
		//console.log('fireRate:',this.fireRate);

		if(this.isDamageX2){
			var obj;
			for (var i = 0; i < this.NUM_BULLETS; i++) {
				obj = this.arrBullets[i];
				if(obj) obj.frameName = 'bullet1_0000';
			}
		}

		this.isDamageX2 = false;
		this.isBullet3 = false;
		this.isBonusCoins = false;
		if(this.iconX2) this.iconX2.visible = false;
		this.cointCoins = 1;
		this.SPEED = 6;
		this.TIMER_WAVE = 2;
		this.SPEED_XM = 9;
		this.SPEED_XK = this.SPEED*1.5;
		this.SPEED_BULLET = this.SPEED*3;
	},

	timerBonus: function(vTime){
		this.isBonusTime = true;
		var time = this.TIMER_BONUS+vTime;
		game.add.tween(this.player.tank).to({ alpha:0 }, 250, 'Linear', true, time-1750, 2, true);
		game.time.events.add(time, this.deactivateBonuses, this, true).autoDestroy = true;
	},

	activateUp:function(vNum){
		switch (vNum) {
			case 1: this.activateUp1();	break;
			case 2: this.activateUp2();	break;
			case 3: this.activateUp3();	break;
			case 4: this.activateUp4();	break;
			case 5: this.activateUp5();	break;
			case 6: this.activateUp6();	break;
			case 7: this.activateUp7();	break;
		}
	},

	activateUp1: function(){//boom
		if(this.isGameOver) return;
		var ship;
		for (var i = 0; i < this.countAliens; i++){
			ship = this.aliens[i];
			if ((ship.layerTank.y > 0) && (ship.tank.visible)){
				var doneDmg = 0;
				if(ship.health >= this.bombDamage){
					doneDmg = this.bombDamage;
				}else{
					doneDmg = ship.health;
				}
				this.score += Math.round(doneDmg);
				this.updateScore(this.score);

				ship.getDamage(this.bombDamage);
				if(ship.health <= 0){
					this.addEffect(0, ship.layerTank, 7, -24);
					MainGame.playSound(11);
				}
			}
		}
		game.camera.shake(0.01, 400);
	},

	activateUp2: function(){//shield
		if(this.isGameOver || this.isBonusTime) return;
		this.timerBonus(this.bonusUp2);

		this.player.activateShield();
		this.isShield = true;
	},

	activateUp3: function(){//bullet 3
		if(this.isGameOver || this.isBonusTime) return;
		this.timerBonus(this.bonusUp3);
		this.player.changeAnimation('hero2');
		this.isBullet3 = true;
	},

	activateUp4: function(){//damage
		if(this.isGameOver || this.isBonusTime) return;
		this.timerBonus(this.bonusUp4);
		this.player.changeAnimation('hero3');
		this.damage = (1+MainGame.upgradeDamage)*2;
		this.isDamageX2 = true;

		var obj
		for (var i = 0; i < this.NUM_BULLETS; i++) {
			obj = this.arrBullets[i];
			obj.frameName = 'bullet2_0000';
		}
	},

	activateUp5: function(){// firerate
		if(this.isGameOver || this.isBonusTime) return;
		this.timerBonus(this.bonusUp5);
		this.player.changeAnimation('hero4');
		this.fireRate = 320-((MainGame.upgradeFirerate+1)*2)*10;
		//console.log('fireRate:',this.fireRate);
	},

	activateUp6: function(){//slow move
		if(this.isGameOver || this.isBonusTime) return;
		this.timerBonus(this.bonusUp6);
		this.SPEED = 3;
		this.TIMER_WAVE = 1;
		this.SPEED_XM = 18;
		this.SPEED_XK = this.SPEED*1.5;
		this.SPEED_BULLET = this.SPEED*3;
	},

	activateUp7: function(){//more coins
		if(this.isGameOver || this.isBonusTime) return;
		this.timerBonus(0);
		this.cointCoins = 2+this.bonusUp7;
		this.isBonusCoins = true;
		if(this.iconX2) {
			this.iconX2.visible = true;
			var stringValue = this.score.toString();
			var arrayOfNum = stringValue.split('');
			var dX = (arrayOfNum.length*10);
			this.iconX2.x = 350+dX;
		}
	},

	clickStage: function(){
		var pX = this.game.input.worldX;
		var pY = this.game.input.worldY;

		var _isPause = pX > (this.btnPause.x-22) && pX < (this.btnPause.x+22) && pY > (this.btnPause.y-22) && pY < (this.btnPause.y+22);
		if((_isPause) && (!this.isGameOver)) {
			this.clickPause();
			return;
		}

		if(pX > (this.btnMute.x-22) && pX < (this.btnMute.x+22) && pY > (this.btnMute.y-22) && pY < (this.btnMute.y+22)) {
			if(!MainGame.isMusicMuted) {
				MainGame.muteSounds(this.btnMute);
				if(!MainGame.isMusicMuted) MainGame.muteSounds(this.btnMute);
			}else{
				MainGame.muteSounds(this.btnMute);
			}
		}

		if(this.isPaused){
			_isPause = pX > (this.btnPausePlay.x-65) && pX < (this.btnPausePlay.x+65) && pY > (this.btnPausePlay.y-70) && pY < (this.btnPausePlay.y+70);
			if(_isPause) {
				this.clickPause();
				return;
			}

			if(pX > (this.btnPauseHome.x-50) && pX < (this.btnPauseHome.x+50) && pY > (this.btnPauseHome.y-50) && pY < (this.btnPauseHome.y+50)) {
				game.paused = false;
				MainGame.goToState('Menu');
			}else if(pX > (this.btnPauseReplay.x-50) && pX < (this.btnPauseReplay.x+50) && pY > (this.btnPauseReplay.y-50) && pY < (this.btnPauseReplay.y+50)) {
				game.paused = false;
				MainGame.goToState('Game');
			}
		}
	},

	clickPause: function(vBool){
		this.isPaused = !this.isPaused;
		if(this.isPaused){
			if(MainGame.isAPI) GamifiveSDK.showMoreGamesButton();
		}else{
			if(MainGame.isAPI) GamifiveSDK.hideMoreGamesButton();
		}
		this.layerPause.visible = this.isPaused;
		game.paused = this.isPaused;
	},

	addPlayer: function(vX, vY){
		this.playerX = vX;

		for (var i = 0; i < this.NUM_BULLETS; i++) {
			var obj = this.layerBullets.add(game.add.image(10, -100, 'ss_main', 'bullet1_0000'));
			obj.anchor.setTo(0.5, 0.5);
			this.arrBullets.push(obj);
		}

		this.bonus = this.layerMain.add(game.add.image(10, -100, 'ss_main', 'bonus1_0000'));
		this.bonus.anchor.setTo(0.5);
		this.bonus.visible = false;

		this.player = new Hero(game, this.layerMain, vX, vY);
	},

	/*
	render: function () {
		if(this.player) game.debug.body(this.player);
		if(this.bullet1) game.debug.body(this.bullet1);
	},
	//*/

	addBot: function(vX, vY, vM, vHp, vType, vXmin, vXmax){
		var bot = new Bot(game, this.layerAliens, vX, vY, vM, vHp, vType, vXmin, vXmax);
		this.aliens.push(bot);
		this.countAliens = this.aliens.length;
		return bot;
	},

	addWave: function(){
		if(this.isGameOver) return;

		var hMultiplier = this.levelDiff+(MainGame.upgradeFirerate + MainGame.upgradeDamage);

		var arHealths = [1,2,3,4,5,6];
		MyMath.shuffleArr(arHealths);

		var posY = -100;//-100

		this.timeType++;
		if(this.timeType >= 5) {
			this.typeWave = MyMath.getRandomInt(1,3);
			this.timeType = 0;
		}

		if(this.typeWave == 1){
			var b = MyMath.getRandomBool();
			this.addBot(60+130*MyMath.getRandomInt(0,4), posY, hMultiplier, hMultiplier*arHealths[0], 1, 60, 580, b);
			this.typeWave = 0;
		}else if(this.typeWave == 2){
			var r = MyMath.getRandomInt(0,3);
			var b = MyMath.getRandomBool();
			this.addBot(60+130*r, posY, hMultiplier, hMultiplier*arHealths[0], 1, 60, 450, b);
			this.addBot(60+130*(r+1), posY, hMultiplier, hMultiplier*arHealths[1], 1, 190, 580, b);
			this.typeWave = 0;
		}else if(this.typeWave == 3){
			var r = MyMath.getRandomInt(0,2);
			var b = MyMath.getRandomBool();
			this.addBot(60+130*r, posY, hMultiplier, hMultiplier*arHealths[0], 1, 60, 320, b);
			this.addBot(60+130*(r+1), posY, hMultiplier, hMultiplier*arHealths[1], 1, 190, 450, b);
			this.addBot(60+130*(r+2), posY, hMultiplier, hMultiplier*arHealths[2], 1, 320, 580, b);
			this.typeWave = 0;
		}else{
			this.addBot(60+130*0, posY, hMultiplier, hMultiplier*arHealths[0], 0);
			this.addBot(60+130*1, posY, hMultiplier, hMultiplier*arHealths[1], 0);
			this.addBot(60+130*2, posY, hMultiplier, hMultiplier*arHealths[2], 0);
			this.addBot(60+130*3, posY, hMultiplier, hMultiplier*arHealths[3], 0);
			this.addBot(60+130*4, posY, hMultiplier, hMultiplier*arHealths[4], 0);
		}

		this.countWave++;
		this.waveBonus++;

		this.levelDiff = Math.ceil(this.countWave/4);

		if((this.waveBonus >= 6) && (!this.isBonusTime)){
			this.addBonus();
			this.waveBonus = 0;
		}
	},

	addBonus: function(){
		this.bonus.visible = true;
		var typeBonus = MyMath.getRandomInt(1,7);
		if(this.isFirstBonus){
			typeBonus = MainGame.firstBonus;
			MainGame.firstBonus++;
			if(MainGame.firstBonus > 7){
				MainGame.firstBonus = 1;
			}
			this.isFirstBonus = false;
		}

		this.bonus.type = typeBonus;
		this.bonus.x = 60+130*MyMath.getRandomInt(0,4);
		this.bonus.y = -350;
		this.bonus.frameName = 'bonus'+typeBonus+'_0000';
		MainGame.playSound(2);
	},

	updateScore: function(vValue) {
		var stringValue = vValue.toString();
		var arrayOfNum = stringValue.split('');
		this.num1.frameName = 'num_'+Number(arrayOfNum[0])+'_0000';

		this.num1.x = 320;

		if(vValue >= 10){
			this.num2.frameName = 'num_'+Number(arrayOfNum[1])+'_0000';
			this.num2.visible = true;
			this.num2.x = this.num1.x+this.num1.width;
			if(vValue >= 100){
				this.num3.frameName = 'num_'+Number(arrayOfNum[2])+'_0000';
				this.num3.visible = true;
				this.num3.x = this.num2.x+this.num2.width;
				if(vValue >= 1000){
					this.num4.frameName = 'num_'+Number(arrayOfNum[3])+'_0000';
					this.num4.visible = true;
					this.num4.x = this.num3.x+this.num3.width;
					if(vValue >= 10000){
						this.num5.frameName = 'num_'+Number(arrayOfNum[4])+'_0000';
						this.num5.visible = true;
						this.num5.x = this.num4.x+this.num4.width;
						if(vValue >= 100000){
							this.num6.frameName = 'num_'+Number(arrayOfNum[5])+'_0000';
							this.num6.visible = true;
							this.num6.x = this.num5.x+this.num5.width;
						}
					}
				}
			}
		}

		var dX = (arrayOfNum.length*10);
	    this.num1.x -= dX;
	    this.num2.x -= dX;
	    this.num3.x -= dX;
	    this.num4.x -= dX;
	    this.num5.x -= dX;
	    this.num6.x -= dX;

		if(this.isBonusCoins && this.iconX2){
			this.iconX2.x = 350+dX;
			game.add.tween(this.iconX2.scale).to({ x:1.25, y:1.25 }, 90, 'Linear', true, 0, 0, true);
		}
	},

	update: function () {
		if(MainGame.showFPS) MainGame.textFPS.setText("FPS: " + game.time.fps);
		if(this.isPaused) return;
		if(!this.isGameOver) {
			this.timeWave += this.TIMER_WAVE;
			if(this.timeWave >= 260){
				this.addWave();
				this.timeWave = 0;
			}
			this.backTile.tilePosition.y += this.SPEED;

			if(game.device.desktop){
				if (this.cursors.left.isDown){
					this.playerX -= this.SPEED_XK;
				}else if (this.cursors.right.isDown){
					this.playerX += this.SPEED_XK;
				}
			}

			if(game.input.activePointer.isDown && game.input.y > 50) {
				this.playerX -= ((this.playerX - game.input.worldX) / this.SPEED_XM);
			}

			if(this.playerX < 40) this.playerX = 40;
			if(this.playerX > 600) this.playerX = 600;
			this.player.setPosition(this.playerX, 760);

			this.strikeBullet();
			this.updateShips();
			this.updateBonus();
		}
		this.updateBullets();
	},

	goShake: function () {
		var properties = {x: MyMath.getRandomInt(-5,5), y: -MyMath.getRandomInt(-5,5)};
		var duration = 50;
		var repeat = 1;
		var ease = Phaser.Easing.Bounce.InOut;
		var autoStart = true;
		var delay = 0;
		var yoyo = true;

		game.add.tween(this.layerMain).to(properties, duration, ease, autoStart, delay, repeat, yoyo);
	},

	updateBonus: function(){
		if(!this.bonus.visible) return;
		this.bonus.y += this.SPEED;
		var dist;
		dist = MyMath.distanceTwoPoints(this.player.tank.x, this.bonus.x, this.player.tank.y, this.bonus.y);
		if(dist < 6000){
			this.addEffect(2, this.layerMain, this.bonus.x, this.bonus.y);
			this.bonus.visible = false;
			this.activateUp(this.bonus.type);
			MainGame.playSound(1);
		}else if(this.bonus.y > 1000){
			this.bonus.visible = false;
		}

	},

	updateShips: function(){
		var alien;
		var dist;
		for (var i = 0; i < this.countAliens; i++){
			ship = this.aliens[i];
			ship.update(this.SPEED);
			dist = MyMath.distanceTwoPoints(this.player.tank.x, ship.layerTank.x, this.player.tank.y, ship.layerTank.y);
			if((dist < 6000) && (ship.health>0)){
				if(this.isShield){
					this.score += ship.health;
					this.updateScore(this.score);

					ship.health = 0;
					ship.getDamage(1);
					this.addEffect(0, ship.layerTank, 7, -24);
					MainGame.playSound(11);
					game.camera.shake(0.005, 300);
				}else{
					this.gameOver();
				}
			}
		}
		for (var i = 0; i < this.countAliens; i++){
			if(ship.layerTank.y > 1000){
				ship.remove();
				this.aliens.splice(i,1);
				this.countAliens = this.aliens.length;
			}
		}
	},

	gameOver: function(){
		MainGame.points += this.score;
		this.isGameOver = true;
		this.player.remove();
		this.addEffect(0, this.layerMain, this.player.tank.x, this.player.tank.y-20);
		MainGame.playSound(12);
		game.camera.shake(0.01, 400);
		game.time.events.add(1400, this.finishGame, this);//1400
		//this.btnPause.visible = false;
		MainGame.saveSaves();
		MainGame.stopMusic();
	},

	updateBullets: function(){
		var bullet;
		var alien;
		for (var i = 0; i < this.NUM_BULLETS; i++) {
			bullet = this.arrBullets[i];

			bullet.x += this.SPEED_BULLET  * Math.cos(bullet.angleM * 0.01745);
			bullet.y -= this.SPEED_BULLET * Math.sin(bullet.angleM * 0.01745);

			if(bullet.y < 0) continue;

			if(!this.isGameOver){
				for (var j=0; j<this.countAliens; j++) {
					alien = this.aliens[j];
					if((alien.health > 0) && (MyMath.distanceTwoPoints(bullet.x, alien.layerTank.x, bullet.y, alien.layerTank.y-20)<2600)){
						this.bulletHitAlien(bullet, alien);
					}
				}
			}
		}
	},

	bulletHitAlien: function(bullet, alien){
		if(bullet.y < 0 || bullet.isHitted) return;
		bullet.isHitted = true;
		bullet.visible = false;
		var doneDmg = 0;
		if(alien.health >= this.damage){
			doneDmg = this.damage;
		}else{
			doneDmg = alien.health;
		}
		this.addEffect(1, alien.layerTank, bullet.x-alien.layerTank.x, bullet.y-alien.layerTank.y);
		alien.getDamage(this.damage);
		if(alien.health <= 0){
			this.addEffect(0, alien.layerTank, 7, -24);
			MainGame.playSound(11);
		}
		this.score += Math.round(doneDmg*this.cointCoins);
		this.updateScore(this.score);
	},

	strikeBullet: function(){
		if (game.time.now > this.bulletTime) {
			this.fireBullet();
		}
	},

	fireBullet: function(){
		if(this.isBullet3){
			this.addBullet(this.player.tank.x, 720, 80);
			this.addBullet(this.player.tank.x, 720, 90);
			this.addBullet(this.player.tank.x, 720, 100);
		}else{
			this.addBullet(this.player.tank.x, 720, 90);
		}

		this.bulletTime = game.time.now + this.fireRate;
		MainGame.playSound(13);
	},

	addBullet: function(vX, vY, vAngle){
		var _bullet = this.arrBullets[this.numPlayerBullet];
		_bullet.x = vX;
		_bullet.y = vY;
		_bullet.isHitted = false;
		_bullet.visible = true;
		_bullet.angleM = vAngle;

		this.numPlayerBullet++;
		if(this.numPlayerBullet >= this.NUM_BULLETS) this.numPlayerBullet = 0;

		this.stat_shots++;
	},

	finishGame: function() {
		this.num1.visible = false;
		this.num2.visible = false;
		this.num3.visible = false;
		this.num4.visible = false;
		this.num5.visible = false;
		this.num6.visible = false;

		var plashka = this.layerTop.add(game.add.group());

		var vY = 140;
		var backPP = plashka.add(game.add.image(320, vY+20, 'ss_menu', 'panel2_0000'));
		backPP.anchor.setTo(0.5, 0);
		backPP.scale.setTo(2.4,2.6);

		var redLine1 = plashka.add(game.add.image(320, vY+55, 'ss_menu', 'redLine_0000')); redLine1.anchor.setTo(0.5);
		var redLine2 = plashka.add(game.add.image(320, vY+175, 'ss_menu', 'redLine_0000')); redLine2.anchor.setTo(0.5);

		var btnHome = new SimpleButton(game, this, plashka, 320-100, vY+520, 'ss_menu', 'home_0000', this.clickMenu);
		var btnReplay = new SimpleButton(game, this, plashka, 320+100, vY+520, 'ss_menu', 'replayB_0000', this.clickReplay);

		var text = MainGame.addText(1,320,vY+5+55,MainGame.GAME_TEXT.your_points, plashka, 26, '#FFFFFF', 0.5, 0); MainGame.updateTextWidth(text, 340);
		this.txtPoints = MainGame.addText(0,320,vY+35+55,MainGame.points, plashka, 30, '#FFFFFF', 0.5, 0);
		MainGame.addText(0,320,vY+35+55+40, '+'+this.score, plashka, 30, '#FFFFFF', 0.5, 0);

		this.showUpgradePanel(plashka, vY+320);

		plashka.y = -600;
		game.add.tween(plashka).to({ y:0 }, 1000, Phaser.Easing.Elastic.Out).start();

		MainGame.playSound(14);

		if(MainGame.isAPI) GamifiveSDK.endSession({score: this.score, level: 0});
		// if(MainGame.isAPI) GamifiveSDK.endSession({score: this.countWave, level: 0});
	},

	showUpgradePanel: function(vLayer, vY){
		this.txtPriceUP1 = MainGame.addText(0,320-210, vY+65, 0, vLayer, 26, '#FFFFFF', 0.5, 0);//565
		var text = MainGame.addText(1,320-210, vY-125, MainGame.GAME_TEXT.fire_rate, vLayer, 20, '#28CBFF', 0.5, 0); MainGame.updateTextWidth(text, 200);
		this.txtPriceLvl1 = MainGame.addText(1,320-210, vY-103, '', vLayer, 20, '#28CBFF', 0.5, 0);

		this.txtPriceUP2 = MainGame.addText(0,320+210, vY+65, 0, vLayer, 26, '#FFFFFF', 0.5, 0);
		var text = MainGame.addText(1,320+210, vY-125, MainGame.GAME_TEXT.fire_damage, vLayer, 20, '#FF3300', 0.5, 0); MainGame.updateTextWidth(text, 200);
		this.txtPriceLvl2 = MainGame.addText(1,320+210, vY-103, '', vLayer, 20, '#FF3300', 0.5, 0);

		var textUB = MainGame.addText(1,320, vY-125, MainGame.GAME_TEXT.upgrade_bonus, vLayer, 20, '#C3E4FB', 0.5, 0); MainGame.updateTextWidth(textUB, 200);
		textUB.lineSpacing = -5;

		this.upgrade3 = vLayer.add(game.add.image(320, vY, 'ss_menu', 'upgrade3_0000')); this.upgrade3.anchor.setTo(0.5);
		this.upgrade3.inputEnabled = true;
		this.upgrade3.events.onInputDown.add(this.clickUpgrade3, this);

		this.upgrade1_up = vLayer.add(game.add.sprite(320-210, vY, 'ss_menu'));
		this.upgrade1_up.animations.add('anim', Phaser.Animation.generateFrameNames('upgrade1_up_', 0, 18, '', 4), 30);
		this.upgrade1_up.animations.play('anim', 30, false);
		this.upgrade1_up.anchor.setTo(0.5);
		this.upgrade1_up.animations.currentAnim.stop();
		this.upgrade1_up.animations.currentAnim.frame = 0;
		this.upgrade1_up.inputEnabled = true;
		this.upgrade1_up.events.onInputDown.add(this.clickUpgrade1, this);

		this.upgrade2_up = vLayer.add(game.add.sprite(320+210, vY, 'ss_menu'));
		this.upgrade2_up.animations.add('anim', Phaser.Animation.generateFrameNames('upgrade2_up_', 0, 18, '', 4), 30);
		this.upgrade2_up.animations.play('anim', 30, false);
		this.upgrade2_up.anchor.setTo(0.5);
		this.upgrade2_up.animations.currentAnim.stop();
		this.upgrade2_up.animations.currentAnim.frame = 0;
		this.upgrade2_up.inputEnabled = true;
		this.upgrade2_up.events.onInputDown.add(this.clickUpgrade2, this);

		this.updateValues();
	},

	updateValues: function(){
		if(MainGame.upgradeFirerate < 11){
			this.txtPriceUP1.setText(MainGame.priceUp1[MainGame.upgradeFirerate]);
		}else{
			this.txtPriceUP1.setText(MainGame.GAME_TEXT.max);
		}

		if(MainGame.upgradeDamage < 11){
			this.txtPriceUP2.setText(MainGame.priceUp2[MainGame.upgradeDamage]);
		}else{
			this.txtPriceUP2.setText(MainGame.GAME_TEXT.max);
		}

		this.txtPriceLvl1.setText(Number(MainGame.upgradeFirerate)+' '+MainGame.GAME_TEXT.level);
		this.txtPriceLvl2.setText(Number(MainGame.upgradeDamage)+' '+MainGame.GAME_TEXT.level);

		this.txtPoints.setText(MainGame.points);
	},

	clickUpgrade1: function(){
		if(MainGame.upgradeFirerate < 11){
			var price = MainGame.priceUp1[MainGame.upgradeFirerate];
			if(MainGame.points >= price){
				this.upgrade1_up.animations.play('anim', 30, false);
				MainGame.points -= price;
				MainGame.upgradeFirerate++;
				this.updateValues();
				MainGame.playSound(8);
			}
		}
	},

	clickUpgrade2: function(){
		if(MainGame.upgradeDamage < 11){
			var price = MainGame.priceUp2[MainGame.upgradeDamage];
			if(MainGame.points >= price){
				this.upgrade2_up.animations.play('anim', 30, false);
				MainGame.points -= price;
				MainGame.upgradeDamage++;
				this.updateValues();
				MainGame.playSound(8);
			}
		}
	},

	clickUpgrade3: function(){
		MainGame.goToState('UpgradeScreen');
	},

	addEffect: function (vNum, vLayer, vX, vY, vAnchorX, vAnchorY) {
		if (typeof vAnchorX === 'undefined') vAnchorX = 0.5;
		if (typeof vAnchorY === 'undefined') vAnchorY = 0.5;
		var cframes = [28,9,9];
		var obj;
		var nameEffect;
		switch(vNum){
			case 0:
				nameEffect = 'exp';
			break;
			case 1:
				nameEffect = 'shoot2';
			break;
			case 2:
				nameEffect = 'bonus0';
			break;
		}
		obj = vLayer.add(game.add.sprite(vX, vY, 'ss_main'));
		obj.anchor.setTo(vAnchorX, vAnchorY);
		obj.animations.add(nameEffect, Phaser.Animation.generateFrameNames(nameEffect+'_', 0, cframes[vNum], '', 4), 30);
		obj.animations.play(nameEffect, 30, false);
		obj.events.onAnimationComplete.add(this.onEffectAnimationComplete, this);
		return obj;
	},

	onEffectAnimationComplete: function (sprite, animation) {
		sprite.destroy();
	},

	clickReplay: function(){
		MainGame.goToState('Game');
	},

	clickMenu: function(){
		MainGame.goToState('Menu');
	}
};
