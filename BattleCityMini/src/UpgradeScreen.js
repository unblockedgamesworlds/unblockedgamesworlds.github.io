MainGame.UpgradeScreen = function (game) {

};

MainGame.UpgradeScreen.prototype = {
	create: function () {
		MainGame.state = this;
		MainGame.stateName = 'UpgradeScreen';

		this.layerBack = game.add.group();
		this.layerBack.x = MainGame.worldX;
		this.backTile = this.layerBack.add(game.add.tileSprite(0, 0, 1152, 1024, 'bg'));
		this.backTile.anchor.setTo(0.5, 0);

		this.layerBack = game.add.group(); this.layerBack.y = -5;
		this.layerMain = game.add.group();
		this.layerText = game.add.group();

		var text = MainGame.addText(1,320,5,MainGame.GAME_TEXT.your_points, this.layerMain, 26, '#FFFFFF', 0.5, 0); MainGame.updateTextWidth(text, 280);
		this.txtPoints = MainGame.addText(0,320,35,MainGame.points, this.layerMain, 30, '#FFFFFF', 0.5, 0);

		this.btnHome = new SimpleButton(game, this, this.layerMain, 320-270, 885, 'ss_menu', 'home_0000', this.clickMenu);
		this.btnPlay = new SimpleButton(game, this, this.layerMain, 320+270, 885, 'ss_menu', 'play_0000', this.clickStart);

		this.arBonusNames = [MainGame.GAME_TEXT.bonus_name1, MainGame.GAME_TEXT.bonus_name2, MainGame.GAME_TEXT.bonus_name3, MainGame.GAME_TEXT.bonus_name4, MainGame.GAME_TEXT.bonus_name5, MainGame.GAME_TEXT.bonus_name6, MainGame.GAME_TEXT.bonus_name7];

		this.updateUpgrade(-1);
	},

	getTextDesc:function(vNum, vValue){
		var str = "";
		if(vNum == 1){
			str = this.replaceText(MainGame.GAME_TEXT.bonus_description1, vValue);
		}else if(vNum == 2){
			str = this.replaceText(MainGame.GAME_TEXT.bonus_description2, vValue);
		}else if(vNum == 3){
			str = this.replaceText(MainGame.GAME_TEXT.bonus_description3, vValue);
		}
		return str;
	},

	replaceText: function (vText, vValue) {
		return vText.replace("#", vValue.toString());
	},

	updateUpgrade:function(vUp){
		var b1 = 10*(1+MainGame.bonusesLvl[0]);
		var b2 = (10*(1+MainGame.bonusesLvl[1])/100);
		var b3 = (10*(1+MainGame.bonusesLvl[2])/100);
		var b4 = (10*(1+MainGame.bonusesLvl[3])/100);
		var b5 = (10*(1+MainGame.bonusesLvl[4])/100);
		var b6 = (10*(1+MainGame.bonusesLvl[5])/100);
		var b7 = (10*(1+MainGame.bonusesLvl[6])/100);

		this.arBonusDesc = [this.getTextDesc(1,b1),this.getTextDesc(2,b2),this.getTextDesc(2,b3),this.getTextDesc(2,b4),this.getTextDesc(2,b5),this.getTextDesc(2,b6),this.getTextDesc(3,b7)];

		for (var i = 0; i < 7; i++) {
			this.addPlaha(i, 50, 90+105*i, vUp);
			this.addText(i, 50, 90+105*i, this.arBonusNames[i], this.arBonusDesc[i]);
		}
	},

	buyUpgrade:function(e){
		var id = e.id;
		var lvlB = MainGame.bonusesLvl[id];
		var price = MainGame.pricesBonus[lvlB];
		if((lvlB < 10) && (MainGame.points>=price)){
			this.layerText.removeAll();
			MainGame.points -= price;
			MainGame.bonusesLvl[id]++;
			this.updateUpgrade(id);
			this.txtPoints.setText(MainGame.points);
			MainGame.saveSaves();
			MainGame.playSound(8);
		}
	},

	addPlaha:function(vId, vX, vY, vUp) {
		var back = this.layerText.add(game.add.image(vX, vY, 'ss_menu', 'panel_credits_0000'));
		back.width = 550;
		back.height = 90;
		back.inputEnabled = true;
		back.id = vId;
		back.events.onInputDown.add(this.buyUpgrade, this);
		back.alpha = 0;

		var icon = this.layerText.add(game.add.image(5+vX+36, 7+vY+40, 'ss_menu', 'bonus'+Number(vId+1)+'_0000'));
		icon.anchor.setTo(0.5);

		if(vUp == vId){
			game.add.tween(icon.scale).to({ x:0.9, y:0.9 }, 150, 'Linear', true, 0, 0, true);
		}

		for (var i = 0; i < 10; i++) {
			if(MainGame.bonusesLvl[vId] <= i){
				this.layerText.add(game.add.image(vX+100+i*32, vY+70, 'ss_menu', 'up1_0000'));
			}else{
				this.layerText.add(game.add.image(vX+100+i*32, vY+70, 'ss_menu', 'up2_0000'));
			}
		}
	},

	addText:function(vId, vX, vY, vName, vDesc) {
		var text1 = MainGame.addText(1, 100+vX, 17+vY, vName, this.layerText, 20, '#FFFFFF', 0, 0.5); MainGame.updateTextWidth(text1, 325);
		var text2 = MainGame.addText(1, 100+vX, 50+vY, vDesc, this.layerText, 16, '#FFFFFF', 0, 0.5); MainGame.updateTextWidth(text2, 325);

		var lvlB = MainGame.bonusesLvl[vId];
		if(lvlB == 10){
			var text = MainGame.addText(1, 495+vX, 45+vY, MainGame.GAME_TEXT.max, this.layerText, 24, '#FFFFFF', 0.5, 0.5); MainGame.updateTextWidth(text, 120);
		}else{
			var text = MainGame.addText(1, 495+vX, 30+vY, MainGame.GAME_TEXT.buy, this.layerText, 22, '#FFFFFF', 0.5, 0.5); MainGame.updateTextWidth(text, 120);
			MainGame.addText(1, 495+vX, 60+vY, MainGame.pricesBonus[lvlB], this.layerText, 24, '#FFFFFF', 0.5, 0.5);
		}
	},

	clickMenu: function () {
		if(MainGame.isAPI) GamifiveSDK.hideMoreGamesButton();
		MainGame.goToState('Menu');
	},

	clickStart: function () {
		if(MainGame.isAPI) GamifiveSDK.hideMoreGamesButton();
		MainGame.goToState('Game');
	}
};
