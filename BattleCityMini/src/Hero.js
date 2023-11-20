Hero = function (game, vLayer, vX, vY) {
    this.game = game;

    this.shield = vLayer.add(game.add.sprite(-100, -100, 'ss_main'));
    this.shield.animations.add('shield', Phaser.Animation.generateFrameNames('sheild_', 0, 7, '', 4), 30);
    this.shield.animations.currentAnim.stop();
    this.shield.animations.currentAnim.frame = 0;
    this.shield.anchor.setTo(0.55, 0.5);
    this.shield.visible = false;

	this.tank = vLayer.add(game.add.sprite(vX, vY, 'ss_main'));
	this.tank.animations.add('hero', Phaser.Animation.generateFrameNames('hero_', 0, 6, '', 4), 30);
	this.tank.animations.add('hero_shield', Phaser.Animation.generateFrameNames('hero_sheild_', 0, 6, '', 4), 30);
	this.tank.animations.add('hero2', Phaser.Animation.generateFrameNames('hero2_', 0, 6, '', 4), 30);
	this.tank.animations.add('hero3', Phaser.Animation.generateFrameNames('hero3_', 0, 6, '', 4), 30);
	this.tank.animations.add('hero4', Phaser.Animation.generateFrameNames('hero4_', 0, 6, '', 4), 30);
	//this.tank.animations.add('heroStop', Phaser.Animation.generateFrameNames('gg_stop_', 0, 9, '', 4), 30);
	this.tank.animations.play('hero', 30, true);
	this.tank.anchor.setTo(0.5, 0.5);
};

Hero.prototype.setBody = function(vBody, vW, vH, vOffsetX, vOffsetY) {
	var newX = (vBody.width-vW)*0.5 + vOffsetX;
	var newY = (vBody.height-vH)*0.5 + vOffsetY;
	vBody.setSize(vW, vH, newX, newY);
}

Hero.prototype.changeAnimation = function(vAnim) {
	this.tank.animations.play(vAnim, 30, true);
}

Hero.prototype.setPosition = function(vX, vY) {
	this.tank.x = vX;
	this.tank.y = vY;
    if(this.shield.visible){
        this.shield.x = this.tank.x;
        this.shield.y = this.tank.y;
    }
}

Hero.prototype.deactivate = function() {
    this.tank.animations.play('hero', 30, true);
    this.shield.animations.currentAnim.stop();
    this.shield.animations.currentAnim.frame = 0;
    this.shield.visible = false;
},

Hero.prototype.activateShield = function() {
	this.tank.animations.play('hero_shield', 30, true);
	this.shield.animations.play('shield', 30, true);
    this.shield.visible = true;
}

Hero.prototype.update = function() {

}

Hero.prototype.remove = function() {
    this.deactivate();
	this.tank.destroy();
}
