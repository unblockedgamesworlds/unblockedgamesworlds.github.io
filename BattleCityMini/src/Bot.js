Bot = function (game, vLayer, vX, vY, vM, vHp, vType, vXmin, vXmax, vBool) {
    this.game = game;

    this.layerTank = vLayer.add(game.add.group());
    this.layerTank.x = vX;
    this.layerTank.y = vY;

    this.type = vType;
    if(vType==0){
        this.tank = this.layerTank.add(game.add.image(0, 0, 'ss_main', 'tank1_run_0000'));
    }else{
        this.tank = this.layerTank.add(game.add.sprite(0, 0, 'ss_main'));
        this.tank.animations.add('tank1', Phaser.Animation.generateFrameNames('tank1_run_', 0, 8, '', 4), 30);
        this.tank.animations.add('tank2', Phaser.Animation.generateFrameNames('tank2_run_', 0, 8, '', 4), 30);
        this.tank.animations.add('tank3', Phaser.Animation.generateFrameNames('tank3_run_', 0, 8, '', 4), 30);
        this.tank.animations.add('tank4', Phaser.Animation.generateFrameNames('tank4_run_', 0, 8, '', 4), 30);
        this.tank.animations.add('tank5', Phaser.Animation.generateFrameNames('tank5_run_', 0, 8, '', 4), 30);
        this.tank.animations.add('tank6', Phaser.Animation.generateFrameNames('tank6_run_', 0, 8, '', 4), 30);
        this.tank.animations.play('tank1', 30, true);
        this.tank.animations.currentAnim.stop();
        this.tank.animations.currentAnim.frame = 0;

        this.minX = vXmin;
        this.maxX = vXmax;
    }

    this.tank.anchor.setTo(0.5, 0.5);

    this.health = vHp;
    this.hMultiplier = vM;

	//game.physics.enable(this.tank);
	//this.setBody(this.tank.body, 70, 80, 0, 5);

    var dY = -23;
    this.num1 = this.layerTank.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num1.anchor.setTo(0,0.5);
    this.num2 = this.layerTank.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num2.anchor.setTo(0,0.5);
    this.num3 = this.layerTank.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num3.anchor.setTo(0,0.5);
    this.num4 = this.layerTank.add(game.add.image(0, dY, 'ss_main', 'num_0_0000')); this.num4.anchor.setTo(0,0.5);

    this.updateHealth(this.health);

    this.link = this;

    this.flagDirection = vBool;
};

Bot.prototype.getDamage = function(vDmg) {
    this.health-=vDmg;
    if(this.health > 0){
        this.updateHealth(this.health);
    }else{
        this.tank.visible = false;
        this.num1.visible = false;
        this.num2.visible = false;
        this.num3.visible = false;
        this.num4.visible = false;
    }
};

Bot.prototype.updateHealth = function(vValue) {
    if(vValue<0) vValue = 0;
    var stringHealth = vValue.toString();
    var arrayOfNum = stringHealth.split('');

    this.num1.frameName = 'num_'+Number(arrayOfNum[0])+'_0000';
    this.num2.visible = false;
    this.num3.visible = false;
    this.num4.visible = false;

    this.num1.x = 10;

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
            }
        }
    }

    var dX = (arrayOfNum.length*10);
    this.num1.x -= dX;
    this.num2.x -= dX;
    this.num3.x -= dX;
    this.num4.x -= dX;

    //update color
    var frameNum = Math.ceil(vValue/this.hMultiplier);
    if(frameNum > 6) frameNum = 6;
    if(this.type == 0){
        this.tank.frameName = 'tank'+frameNum+'_run_0000';
    }else{
        this.tank.animations.play('tank'+frameNum, 30, true);
    }
}

Bot.prototype.setBody = function(vBody, vW, vH, vOffsetX, vOffsetY) {
	var newX = (vBody.width-vW)*0.5 + vOffsetX;
	var newY = (vBody.height-vH)*0.5 + vOffsetY;
	vBody.setSize(vW, vH, newX, newY);
}

Bot.prototype.changeAnimation = function(vAnim) {
	this.tank.animations.play(vAnim, 30, true);
}

Bot.prototype.setPosition = function(vX, vY) {
	this.tank.x = vX;
	this.tank.y = vY;
}

Bot.prototype.updateTank = function(vSpeed) {
    var speedX = vSpeed*0.5;
    if(this.flagDirection){
        this.layerTank.x += speedX;
        if(this.layerTank.x > this.maxX){
            this.layerTank.x = this.maxX;
            this.flagDirection = !this.flagDirection;
        }
    }else{
        this.layerTank.x -= speedX;
        if(this.layerTank.x < this.minX){
            this.layerTank.x = this.minX;
            this.flagDirection = !this.flagDirection;
        }
    }
}

Bot.prototype.update = function(vSpeed) {
    this.layerTank.y += vSpeed;
    if((this.health > 0) && (this.type>0)){
        this.updateTank(vSpeed);
    }
}

Bot.prototype.remove = function() {
    this.tank.destroy();
    this.layerTank.destroy();
}
