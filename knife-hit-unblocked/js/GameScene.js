import GameOverPopup from "../js/popups/GameOverPopup.js";
import QuitPopup from "../js/popups/QuitPopup.js";
import InstructionPopup from "../js/popups/InstructionPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
        this.quitPopup = new QuitPopup(this);
        this.instructionPopup = new InstructionPopup(this);
    }
    preload() {}

    create() {
        this.isGameOver = false;
        this.canThrow = true;
        this.currentRotationSpeed = gameOptions.rotationSpeed;
        this.newRotationSpeed = gameOptions.rotationSpeed;
        this.score = 0;
        this.knifeCounter = 0;
        this.knifeBasketArray = [];
        this.knifeStandKnifeArray=[];
        this.standKnifePos = [{ x: Math.round(game.config.width / 10.3), y: Math.round(game.config.height / 1.11) },
            { x: Math.round(game.config.width / 6.53), y: Math.round(game.config.height / 1.123) },
            { x: Math.round(game.config.width / 5.11), y: Math.round(game.config.height / 1.132) },
            { x: Math.round(game.config.width / 4.14), y: Math.round(game.config.height / 1.1252) },
            { x: Math.round(game.config.width / 3.42), y: Math.round(game.config.height / 1.113) },
            { x: Math.round(game.config.width / 1.421), y: Math.round(game.config.height / 1.11) },
            { x: Math.round(game.config.width / 1.322), y: Math.round(game.config.height / 1.123) },
            { x: Math.round(game.config.width / 1.247), y: Math.round(game.config.height / 1.132) },
            { x: Math.round(game.config.width / 1.178), y: Math.round(game.config.height / 1.1252) },
            { x: Math.round(game.config.width / 1.116), y: Math.round(game.config.height / 1.113) }
        ];
        this.standKnifeAngle = [-17, -11, 0, 11, 17, -17, -11, 0, 11, 17];

        this.woodXpos = [Math.round(game.config.width / 2) - 100, Math.round(game.config.width / 2) - 50, Math.round(game.config.width / 2), Math.round(game.config.width / 2) + 50, Math.round(game.config.width / 2) + 100];
        this.woodRotation = [25, 23, 18, 21, 24];
        this.woodSpeed = [1000, 930, 900, 970, 950];
        this.woodFiveArray = [];
        this.woodArray = [];
        this.woodCounter = 0;

        this.CreateTopItem();

        this.knifeGroup = this.add.group();
        this.obstacleGroup = this.add.group();

        this.CreateKnife();
        this.CreateTarget();
        this.CreateObstcle();

        this.CreateWoodenPiece();

        this.CreateKnifeBasket();
        this.CreateKnifeStand();

        this.CreateUserInput();
        this.CreateTimerEvent();

        SoundManager.PlayBgMusic();

        this.instructionPopup.CreateInstructionPopup();
    }

    CreateTopItem() {
        this.gameplayBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "gameplay_bg", 0.5, 0.5, scaleFactor, scaleFactor);

        var scoreTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '90px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 22), this.score, scoreTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.backButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 12), Math.round(game.config.height / 20), "back_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.BackButtonPressed, this.BackButtonReleased);
        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.09), Math.round(game.config.height / 20), "sound_on", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.DefaultSoundButton();
    }

    BackButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.backButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    BackButtonReleased() {
        setTimeout(() => {
            this.quitPopup.CreateQuitPopup();
            SoundManager.StopBgMusic();
        }, 100);
    }

    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }

    DefaultSoundButton() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == 1) {
            this.soundButton.setTexture("sound_on");
        } else {
            this.soundButton.setTexture("sound_off");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == 1) {
            localStorage.setItem("hit_it_right_is_sound_on", 0);
            this.soundButton.setTexture("sound_off");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
            this.soundButton.setTexture("sound_on");
            SoundManager.PlayBgMusic();
        }
    }

    CreateUserInput() {
        this.gameplayBg.setInteractive();
        this.gameplayBg.on("pointerdown", this.ThrowKnife, this);
    }

    GetRandomNumber(_min, _max) {
        var rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    }

    //######################################################################################
    CreateTarget() {
        if (this.target != null) {
            this.target.destroy();
        } else {}
        // var rnd = this.GetRandomNumber(0, 4);
        // this.target = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 3.6), "target_" + rnd).setScale(scaleFactor, scaleFactor);

        this.target = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 3.6), "target").setScale(scaleFactor, scaleFactor);
        this.target.depth = 1;
        this.target.setAlpha(0);

        this.anims.create({
            key: "hit_target",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("target", { start: 1, end: 10 }),
        });

        this.targetBreak = this.add.sprite(Math.round(game.config.width / 1.86), Math.round(game.config.height / 2.55), "target_break").setScale(scaleFactor, scaleFactor);
        this.targetBreak.depth = 1;
        this.targetBreak.setVisible(false);
        this.anims.create({
            key: "break_target",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("target_break", { start: 0, end: 14 }),
        });
        this.tweens.add({
            targets: [this.target],
            alpha: 1,
            duration: 300,
        });
    }

    RotateTheTarget(_t, _dt) {
        this.target.angle += this.currentRotationSpeed;
        this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, _dt / 1000);
    }

    CreateTimerEvent() {
        var timedEvent = this.time.addEvent({
            delay: gameOptions.changeTime,
            callback: this.ChangeRotationSpeed,
            callbackScope: this,
            loop: true
        });
    }
    ChangeRotationSpeed() {
        var sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;
        var variation = Phaser.Math.FloatBetween(-gameOptions.rotationVariation, gameOptions.rotationVariation);
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -gameOptions.maxRotationSpeed, gameOptions.maxRotationSpeed);
    }

    //######################################################################################


    //######################################################################################
    CreateKnife() {
        this.knife = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.294), "knife").setScale(scaleFactor, scaleFactor);
        this.CreateKnifeAnimation();
    }
    CreateKnifeAnimation() {
        this.tweens.add({
            targets: [this.knife],
            y: this.knife.y - 20,
            duration: 500,
            callbackScope: this,
            yoyo: true,
            repeat: -1,
            delay: 50,
            onComplete: function(tween) {}
        });
    }

    ThrowKnife() {
        if (this.canThrow) {
            this.canThrow = false;
            this.tweens.add({
                targets: [this.knife],
                y: this.target.y + this.target.width / 1.7,
                duration: gameOptions.throwSpeed,
                callbackScope: this,
                onComplete: function(tween) {
                    this.DisableKnifeFromBasket();
                    var isLegalHit = true;

                    var children = this.knifeGroup.getChildren();
                    for (var i = 0; i < children.length; i++) {
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < gameOptions.minAngle) {
                            isLegalHit = false;
                            break;
                        }
                    }

                    var obstacle = this.obstacleGroup.getChildren();
                    for (var i = 0; i < obstacle.length; i++) {
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - obstacle[i].startAngle)) < gameOptions.minAngle && !obstacle[i].hit) {
                            isLegalHit = false;
                            break;
                        }
                    }

                    if (isLegalHit) {
                        // if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - this.apple.startAngle)) < gameOptions.minAngle && !this.apple.hit) {
                        //     this.apple.hit = true;
                        //     this.apple.setFrame(1);
                        //     var slice = this.add.sprite(this.apple.x, this.apple.y, "apple", 2);
                        //     slice.angle = this.apple.angle;
                        //     slice.setOrigin(0.5, 1);

                        //     this.tweens.add({
                        //         targets: [this.apple, slice],
                        //         y: game.config.height + this.apple.height,
                        //         x: {
                        //             // running a function to get different x ends for each slice according to frame number
                        //             getEnd: function(target, key, value) {
                        //                 return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (target.frame.name - 1));
                        //             }
                        //         },
                        //         angle: 45,
                        //         duration: gameOptions.throwSpeed * 6,
                        //         callbackScope: this,
                        //         onComplete: function(tween) {
                        //             // this.scene.start("GameScene")
                        //         }
                        //     });
                        // }
                        SoundManager.PlayKnifeAttachSound();
                        this.SelectAndFallFiveWoodenPiece();
                        this.target.play("hit_target");
                        this.canThrow = true;
                        var knife = this.add.sprite(this.knife.x, this.knife.y, "knife");
                        knife.impactAngle = this.target.angle;
                        this.knifeGroup.add(knife);
                        this.knife.y = Math.round(game.config.height / 1.294);
                        this.IncrementScore();

                    } else {
                        //Throw the knife to downwards
                        SoundManager.PlayObstacleCollideSound();
                        // this.knife.destroy();

                        this.canThrow = false;
                        this.isGameOver = true;
                        this.gameplayBg.disableInteractive();

                        this.tweens.add({
                            targets: [this.knife],
                            y: game.config.height + this.knife.height,
                            rotation: 5,
                            duration: gameOptions.throwSpeed * 4,
                            callbackScope: this,
                            onComplete: function(tween) {
                                SoundManager.StopBgMusic();
                                this.knife.destroy();
                                setTimeout(() => {
                                    this.gameOverPopup.CreateGameOverPopup(this.score);
                                }, 100);
                            }
                        });
                    }
                }
            });
        }
    }

    IncrementScore() {
        this.score++;
        this.scoreText.text = this.score;
    }

    RotateTheKnifeWithTarget() {
        var children = this.knifeGroup.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].angle += this.currentRotationSpeed;

            var radians = Phaser.Math.DegToRad(children[i].angle + 90);
            children[i].x = this.target.x + (this.target.width / 1.7) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 1.7) * Math.sin(radians);
        }
    }

    //######################################################################################


    //######################################################################################

    CreateObstcle() {
        if (this.score > 9) {
            var howMany = this.GetRandomNumber(1, 4);
            console.log("how many: " + howMany);
            for (var i = 0; i < howMany; i++) {
                // var imgNum = this.GetRandomNumber(0, howMany);
                var imgNum = this.GetRandomNumber(0, 2);

                if (imgNum == 0) {
                    var imageName = "obstacle_0";

                } else {
                    var imageName = "obstacle_1";
                }
                var obstacleAngle = Phaser.Math.Between(0, 360);
                var radians = Phaser.Math.DegToRad(obstacleAngle - 90);
                this.obstacle = this.add.sprite(this.target.x + (this.target.width / 3) * Math.cos(radians), this.target.y + (this.target.width / 3) * Math.sin(radians), imageName).setScale(scaleFactor, scaleFactor);
                // this.obstacle = this.add.sprite(this.target.x + (this.target.width / 3) * Math.cos(radians), this.target.y + (this.target.width / 3) * Math.sin(radians), "obstacle_" + imgNum).setScale(scaleFactor, scaleFactor);
                this.obstacle.flipY = true;
                this.obstacle.setOrigin(0.5, 1);
                this.obstacle.angle = obstacleAngle;
                this.obstacle.startAngle = obstacleAngle;
                this.obstacle.hit = false;
                this.obstacleGroup.add(this.obstacle);
            }
        }
    }

    RotateTheObstacleWithTarget() {
        for (var i = 0; i < this.obstacleGroup.getChildren().length; i++) {
            if (!this.obstacleGroup.children.entries[i].hit) {
                this.obstacleGroup.children.entries[i].angle += this.currentRotationSpeed;
                var radians = Phaser.Math.DegToRad(this.obstacleGroup.children.entries[i].angle - 90);
                this.obstacleGroup.children.entries[i].x = this.target.x + (this.target.width / 3) * Math.cos(radians);
                this.obstacleGroup.children.entries[i].y = this.target.y + (this.target.width / 3) * Math.sin(radians);
            } else {}
        }
    }

    //######################################################################################

    //######################################################################################
    CreateKnifeStand() {
        if (this.knifeStand != null) {
            this.knifeStand.destroy();
        } else {}
        this.knifeStand = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.11), "knife_stand", 0.5, 0.5, scaleFactor, scaleFactor);

        for (var i = 0; i < 10; i++) {
            var knifeBase = this.add.sprite(Math.round(game.config.width / 4.8) + (i * Math.round(game.config.width / 15.4)), Math.round(game.config.height / 1.111), "knife_stand_knife_base").setScale(scaleFactor, scaleFactor);
            this.knifeStandKnifeArray.push(knifeBase);
        }
    }

    CreateKnifeBasket() {
        for (var i = 0; i < 10; i++) {
            // var knife = this.add.sprite(225 + (i * 70), 1728, "stand_knife").setScale(scaleFactor, scaleFactor);
            var knife = this.add.sprite(Math.round(game.config.width / 4.8) + (i * Math.round(game.config.width / 15.4)), Math.round(game.config.height / 1.111), "stand_knife").setScale(scaleFactor, scaleFactor);
            knife.setAlpha(1);
            this.knifeBasketArray.push(knife);
        }
    }

    AnimCom(_th) {
        console.log("this", this);
        this.scene.target.destroy();
        this.scene.obstacleGroup.clear(true);

        this.scene.knifeCounter = 0;
        this.scene.knifeBasketArray = [];
        this.scene.knifeGroup.clear(true);

        setTimeout(() => {
            this.scene.CreateKnifeBasket();
            this.scene.CreateTarget();
            this.scene.CreateObstcle();
        }, 500);
    }
    DisableKnifeFromBasket() {
        for (var i = 0; i < this.knifeBasketArray.length; i++) {
            if (this.knifeCounter < 10) {
                this.knifeBasketArray[this.knifeCounter].destroy();
            } else {}
        }

        this.knifeCounter++;

        if (this.knifeCounter >= 10) {
            if (!this.isGameOver) {
                setTimeout(() => {
                    this.target.setVisible(false);
                    for (var i = 0; i < this.knifeGroup.length; i++) {
                        this.knifeGroup[i].setVisible(false);
                    }
                    this.knifeGroup.clear(true);
                }, 100);
                setTimeout(() => {
                    this.targetBreak.setVisible(true);
                    this.targetBreak.play("break_target");
                    this.targetBreak.on('animationcomplete', this.AnimCom);
                }, 200);
            }
        }
    }

    CreateWoodenPiece() {
        for (var i = 0; i < 20; i++) {
            var rnd = this.GetRandomNumber(0, 3);
            var woodPiece = this.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 2.75), "shape_" + rnd).setScale(scaleFactor, scaleFactor);
            woodPiece.setAlpha(0);
            this.woodArray.push(woodPiece);
        }
    }

    SelectAndFallFiveWoodenPiece() {
        this.woodFiveArray = [];
        if (this.woodCounter == this.woodArray.length) {
            this.woodCounter = 0;
        }
        if (this.woodCounter < this.woodArray.length) {
            for (var j = 0; j < 5; j++) {
                this.woodFiveArray.push(this.woodArray[this.woodCounter]);
                this.woodCounter++;
            }
        } else {}
        this.FallWoodenPiece();
    }

    FallWoodenPiece() {
        for (var i = 0; i < this.woodFiveArray.length; i++) {
            this.woodFiveArray[i].setAlpha(1);
            this.tweens.add({
                targets: this.woodFiveArray[i],
                x: this.woodXpos[i],
                y: Math.round(game.config.height / 1.3),
                rotation: this.woodRotation[i],
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: this.woodSpeed[i],
                callbackScope: this,
                onComplete: this.TweenOnComplete,
            });
        }
    }

    TweenOnComplete(_tween, _target, _image) {
        _target[0].setPosition(Math.round(game.config.width / 2), Math.round(game.config.height / 2.75));
    }

    //########################################################################################

    update(t, dt) {
        if (!this.isGameOver) {
            this.RotateTheTarget(t, dt);
            this.RotateTheKnifeWithTarget();
            this.RotateTheObstacleWithTarget();
        }

    }


}