MainGame.Menu = function (game) {

};

MainGame.Menu.prototype = {
	create: function () {
		MainGame.state = this;
		MainGame.stateName = 'Menu';

		MainGame.GAME_TEXT = MainGame.TEXT_FILE[MainGame.languages[MainGame.language]];

		this.layerBack = game.add.group();
		this.layerBack.x = MainGame.worldX;
		this.backTile = this.layerBack.add(game.add.tileSprite(0, 0, 1152, 1024, 'bg'));
		this.backTile.anchor.setTo(0.5, 0);

		this.layerBack = game.add.group(); this.layerBack.y = -5;
		this.layerMain = game.add.group();

		var logoBandai = this.layerMain.add(game.add.image(560, 70, 'bandai_logo')); logoBandai.anchor.setTo(0.5);

		var logo = this.layerMain.add(game.add.image(320, 130, 'ss_menu', 'logo_0000')); logo.anchor.setTo(0.5);
		logo.anchor.setTo(0.5,0);
		//==============================================================================
		this.layerTank = this.layerMain.add(game.add.group());
		var tank = this.layerTank.add(game.add.sprite(320, 740, 'ss_menu'));//760
		tank.animations.add('hero', Phaser.Animation.generateFrameNames('hero_', 0, 6, '', 4), 30);
		tank.animations.play('hero', 30, true);
		tank.anchor.setTo(0.5, 0.5);

		var text = MainGame.addText(1,320,5,MainGame.GAME_TEXT.your_points, this.layerMain, 26, '#FFFFFF', 0.5, 0); MainGame.updateTextWidth(text, 280);
		this.txtPoints = MainGame.addText(0,320,35,MainGame.points, this.layerMain, 30, '#FFFFFF', 0.5, 0);

		if(MainGame.points <= 0) {
			tank.y -= 45;
			this.layerTank.x = -150;
			var tut_arm = this.layerTank.add(game.add.image(320, 765, 'ss_menu', 'tut_arm_0000'));
			tut_arm.anchor.setTo(0.5, 0.5);

			var txtHowToPlay = MainGame.addText(1,320,550-20,MainGame.GAME_TEXT.how_to_play, this.layerMain, 26, '#FFFFFF', 0.5, 0.5);
			MainGame.updateTextWidth(txtHowToPlay, 340);

			var txtHoldToMove = MainGame.addText(1,320,600-20,MainGame.GAME_TEXT.hold_to_move, this.layerMain, 26, '#FFFFFF', 0.5, 0.5);
			MainGame.updateTextWidth(txtHoldToMove, 340);

			game.add.tween(this.layerTank).to({ x:150}, 1600, Phaser.Easing.Back.Out, true, 0, -1, true);
		}else{
			this.showUpgradePanel(this.layerMain, 565);
		}


		//==============================================================================
		this.btnLanguage = new SimpleButton(game, this, this.layerMain, 50, 40, 'ss_menu', 'language_00'+MainGame.languagesN[MainGame.language], this.openLanguage);

		this.panelLanguage = this.layerMain.add(game.add.group());
		var panelLB = this.panelLanguage.add(game.add.image(7, 14, 'ss_menu', 'panel_language_0000'));
		panelLB.scale.setTo(2);
		panelLB.height = 500;

		this.btnCloseLanguage = new SimpleButton(game, this, this.panelLanguage, 50, 40, 'ss_menu', 'btn_close_0000', this.closeLanguage);

		var arrL = ['EN','IT','ES','PT','TR','RU','FR','JP','AR'];
		var arrC = ['00','01','02','03','04','07','08','09','10'];
		arrL.splice(MainGame.language,1);
		arrC.splice(MainGame.language,1);

		this.btnLang_1 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*0, 'ss_menu', 'language_00'+arrC[0], this['changeLang'+arrL[0]]);
		this.btnLang_2 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*1, 'ss_menu', 'language_00'+arrC[1], this['changeLang'+arrL[1]]);
		this.btnLang_3 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*2, 'ss_menu', 'language_00'+arrC[2], this['changeLang'+arrL[2]]);
		this.btnLang_4 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*3, 'ss_menu', 'language_00'+arrC[3], this['changeLang'+arrL[3]]);
		this.btnLang_5 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*4, 'ss_menu', 'language_00'+arrC[4], this['changeLang'+arrL[4]]);
		this.btnLang_6 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*5, 'ss_menu', 'language_00'+arrC[5], this['changeLang'+arrL[5]]);
		this.btnLang_7 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*6, 'ss_menu', 'language_00'+arrC[6], this['changeLang'+arrL[6]]);
		this.btnLang_8 = new SimpleButton(game, this, this.panelLanguage, 50, 90+55*7, 'ss_menu', 'language_00'+arrC[7], this['changeLang'+arrL[7]]);

		this.panelLanguage.visible = false;
		//*/
		//==============================================================================

		//var btnTap = MainGame.addButton(this, this.layerMain, 320, 830, this.clickStart, MainGame.GAME_TEXT.tap_to_start, 270, 50, 26);
		var btnTap = MainGame.addText(1,320,830,MainGame.GAME_TEXT.tap_to_start, this.layerMain, 30, '#FFFFFF', 0.5, 0.5);
		MainGame.updateTextWidth(btnTap, 340);

		this.layerCredits = game.add.group();
		var backCredits = this.layerCredits.add(game.add.image(320, 620, 'ss_menu', 'panel_credits_0000'));
		backCredits.anchor.setTo(0.5, 0.5);
		backCredits.scale.setTo(2);
		backCredits.inputEnabled = true;

		this.isCreditsShown = false;
		this.layerCredits.visible = false;

		var text = MainGame.addText(1,320,555,MainGame.GAME_TEXT.credits, this.layerCredits, 30, '#FFFFFF', 0.5, 0.5); MainGame.updateTextWidth(text, 300);
		var text = MainGame.addText(1,320,630,MainGame.GAME_TEXT.developed_by, this.layerCredits, 22, '#FFFFFF', 0.5, 0.5); MainGame.updateTextWidth(text, 300);
		MainGame.addText(1,320,680,'tinydobbins', this.layerCredits, 26, '#F34901', 0.5, 0.5);

		this.creditsClose = new SimpleButton(game, this, this.layerCredits, 520, 540, 'ss_menu', 'btn_close_0000', this.showCredits);

		this.creditsBtn = new SimpleButton(game, this, this.layerMain, 600, 870, 'ss_menu', 'btn_credits_0000', this.showCredits);

		this.musicButton = this.layerMain.add(game.add.image(602, 815, 'ss_menu', 'btn_sound_0000'));
		this.musicButton.smoothed = true;
		this.musicButton.anchor.setTo(0.5, 0.5);
		this.musicButton.inputEnabled = true;
		this.musicButton.events.onInputDown.add(MainGame.muteSounds, this);
		if(MainGame.isMusicMuted) this.musicButton.frameName = 'btn_sound_0001';
		if(MainGame.firstGo) {
			this.musicButton.frameName = 'btn_sound_0001';
		}else{
			MainGame.playMusic(0);
		}
		game.input.onDown.addOnce(this.playOnce, this);

		MainGame.addText(0,320,920,'BATTLECITY    MINI      2018 BANDAI NAMCO Entertainment Inc.', this.layerMain, 24, '#9C9C9C', 0.5, 0.5, MainGame.styleText2);

		var cpr1 = this.layerMain.add(game.add.image(135, 918, 'ss_menu', 'copyright1_0000')); cpr1.anchor.setTo(0.5);
		var cpr2 = this.layerMain.add(game.add.image(211, 918, 'ss_menu', 'copyright2_0000')); cpr2.anchor.setTo(0.5);
		cpr1.tint = 0x9C9C9C;
		cpr2.tint = 0x9C9C9C;
		this.cpr1 = cpr1;
		this.cpr2 = cpr2;

		MainGame.resizeGame();

		MainGame.fadeOut();

		if(MainGame.isAPI) GamifiveSDK.showMoreGamesButton();

		this.SPEED = 6;

		game.input.onDown.add(this.clickStage, this);
	},

	playOnce: function () {
		if(!MainGame.firstGo) return;
		MainGame.firstGo = false;
		this.musicButton.frameName = 'btn_sound_0000';
		MainGame.playMusic(0);
	},

	showUpgradePanel: function(vLayer, vY){
		this.txtPriceUP1 = MainGame.addText(0,320-210, vY+65, 0, vLayer, 26, '#FFFFFF', 0.5, 0);//565
		var text = MainGame.addText(1,320-210, vY-125, MainGame.GAME_TEXT.fire_rate, vLayer, 20, '#28CBFF', 0.5, 0); MainGame.updateTextWidth(text, 200);
		this.txtPriceLvl1 = MainGame.addText(1,320-210, vY-103, '', vLayer, 20, '#28CBFF', 0.5, 0);

		this.txtPriceUP2 = MainGame.addText(0,320+210, vY+65, 0, vLayer, 26, '#FFFFFF', 0.5, 0);
		var text = MainGame.addText(1,320+210, vY-125, MainGame.GAME_TEXT.fire_damage, vLayer, 20, '#FF3300', 0.5, 0); MainGame.updateTextWidth(text, 200);
		this.txtPriceLvl2 = MainGame.addText(1,320+210, vY-103, '', vLayer, 20, '#FF3300', 0.5, 0);

		var textUB = MainGame.addText(1,320, vY-125, MainGame.GAME_TEXT.upgrade_bonus, vLayer, 20, '#C3E4FB', 0.5, 0);  MainGame.updateTextWidth(textUB, 200);
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
				MainGame.saveSaves();
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
				MainGame.saveSaves();
				MainGame.playSound(8);
			}
		}
	},

	clickUpgrade3: function(){
		MainGame.goToState('UpgradeScreen');
	},

	clickStage: function(){
		var clickPosX = this.game.input.worldX;
		var clickPosY = this.game.input.worldY;
		// console.log(clickPosX, clickPosY);
		if((clickPosY > 665) && (clickPosY < 845) && (clickPosX < 550)){
			if(!this.layerCredits.visible) this.clickStart();
		}
	},

	openLanguage: function () {
		this.btnLanguage.buttonC.visible = false;
		this.panelLanguage.visible = true;
		this.panelLanguage.x = -400;
		game.add.tween(this.panelLanguage).to({ x:0 }, 400, 'Back.easeOut').start();
	},

	closeLanguage: function () {
		game.add.tween(this.panelLanguage).to({ x:-400 }, 400, 'Back.easeIn', true).onComplete.add(function() {
			MainGame.state.panelLanguage.visible = false;
		});
		this.btnLanguage.buttonC.visible = true;
	},

	changeLangEN: function () {this.updateLanguage(0);},
	changeLangIT: function () {this.updateLanguage(1);},
	changeLangES: function () {this.updateLanguage(2);},
	changeLangPT: function () {this.updateLanguage(3);},
	changeLangTR: function () {this.updateLanguage(4);},
	// changeLangDE: function () {this.updateLanguage(5);},
	// changeLangBR: function () {this.updateLanguage(6);},
	changeLangRU: function () {this.updateLanguage(5);},
	changeLangFR: function () {this.updateLanguage(6);},
	changeLangJP: function () {this.updateLanguage(7);},
	changeLangAR: function () {this.updateLanguage(8);},
	// changeLangCH: function () {this.updateLanguage(11);},

	updateLanguage: function (vPar) {
		MainGame.language = vPar;
		MainGame.goToState('Menu');
	},

	update: function(){
		this.backTile.tilePosition.y += this.SPEED;
	},

	showCredits: function () {
		this.isCreditsShown = !this.isCreditsShown;
		if(this.isCreditsShown){
			this.layerCredits.visible = true;
			this.layerCredits.y = 500;
			game.add.tween(this.layerCredits).to({ y:100 }, 400, 'Back.easeOut', true);
		}else{
			game.add.tween(this.layerCredits).to({ y:500 }, 400, 'Back.easeIn', true).onComplete.add(function() {
				MainGame.state.layerCredits.visible = false;
			});
		}
	},

	clickStart: function () {
		if(MainGame.isAPI) GamifiveSDK.hideMoreGamesButton();
		MainGame.goToState('Game');
	}
};
