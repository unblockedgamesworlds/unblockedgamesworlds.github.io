export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
    }

    create() {
        var menuBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "splash_bg", 0.5, 0.5, scaleFactor, scaleFactor);

        this.titleKnife = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2.06), -Math.round(game.config.height / 6.3), "title_knife", 0.5, 0.5, scaleFactor, scaleFactor);

        this.title = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2.9), Math.round(game.config.height / 1.8), "title", 0.5, 0.5, scaleFactor, scaleFactor);
        this.title.setScale(0, 0);

        this.menuCharacterContainer = this.add.container(-Math.round(game.config.width / 1.5), 0);

        this.characterShadow = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2.45), Math.round(game.config.height / 1.27), "character_shadow", 0.5, 0.5, scaleFactor, scaleFactor);

        this.character = this.add.sprite(Math.round(game.config.width / 2.5), Math.round(game.config.height / 1.55), "menu_character").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
        this.anims.create({
            key: "throw_knife",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("menu_character", { start: 0, end: 12 }),
        });

        this.characterKnife = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 3.18), Math.round(game.config.height / 1.88), "menu_character_knife", 0.5, 0.5, scaleFactor, scaleFactor);
        this.characterKnife.setVisible(false);
        this.menuCharacterContainer.add([this.characterShadow, this.character, this.characterKnife]);

        this.characterGlow = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.8), Math.round(game.config.height / 1.28), "character_glow", 0.5, 0.5, scaleFactor, scaleFactor);

        this.playButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 4), "play_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.PlayButtonPressed, this.PlayButtonReleased);
        // this.playButton.setScale(0, 0);
        this.playButton.setAlpha(0);

        this.ShowCharacter();
    }

    ShowCharacter() {
        this.tweens.add({
            targets: [this.menuCharacterContainer],
            x: 0,
            ease: 'Bounce.Out',
            duration: 300,
            delay: 100,
            callbackScope: this,
            onComplete: function(tween) {
                this.ShowTitle();
            }
        });
    }

    ShowTitle() {
        this.tweens.add({
            targets: [this.title],
            x: Math.round(game.config.width / 2),
            y: Math.round(game.config.height / 4.5),
            scaleX: scaleFactor * 0.8,
            scaleY: scaleFactor * 0.8,
            ease: 'Back.easeInOut',
            duration: 500,
            callbackScope: this,
            onComplete: function(tween) {
                this.character.play("throw_knife");
                this.character.on('animationcomplete', this.onCompleteCharacterAnimation);
            }
        });
    }
    onCompleteCharacterAnimation(_this, y, z) {
        this.scene.ThrowCharacterKnife();
    }

    ThrowCharacterKnife() {
        this.characterKnife.setVisible(true);
        this.tweens.add({
            targets: [this.characterKnife],
            y: -Math.round(game.config.height / 10),
            rotation: 15,
            ease: 'Sine.easeInOut',
            duration: 800,
            callbackScope: this,
            onComplete: function(tween) {
                this.ShowTitleKnife();
            }
        });
    }

    ShowTitleKnife() {
        this.tweens.add({
            targets: [this.titleKnife],
            y: Math.round(game.config.height / 5.7),
            ease: 'Back.easeInOut',
            duration: 400,
            callbackScope: this,
            onComplete: function(tween) {

            }
        });
        setTimeout(() => {
            this.JerkTheTitle();
        }, 230);
    }

    JerkTheTitle() {
        this.tweens.add({
            targets: [this.title],
            y: this.title.y + 20,
            ease: 'Back.easeIn',
            duration: 150,
            yoyo: true,
            callbackScope: this,
            onComplete: function(tween) {
                this.ShowPlayButton();
            }
        });
    }

    ShowPlayButton() {
        this.tweens.add({
            targets: [this.playButton],
            y: Math.round(game.config.height / 1.14),
            // scaleX: scaleFactor,
            // scaleY: scaleFactor,
            alpha: 1,
            // ease: 'Sine.easeInOut',
            ease: 'Back.easeInOut',
            duration: 800,
            callbackScope: this,
            onComplete: function(tween) {}
        });
    }

    PlayButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playButton, scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playText, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    PlayButtonReleased() {
        setTimeout(() => {
            game.scene.stop('TitleScene');
            game.scene.start('GameScene');
        }, 100);
    }

}