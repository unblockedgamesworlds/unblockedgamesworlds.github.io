class GameOverPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateGameOverPopup(_score) {

        this.gameOverPopupGroup = this.scene.add.group();


        this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        this.overlay.alpha = 0.6;

        this.base = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "popup_base", 0.5, 0.5, scaleFactor, scaleFactor);

        this.gameoverHeading = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 2), Math.round(game.config.height / 3.2), "gameover_heading", 0.5, 0.5, 0.8 * scaleFactor, 0.8 * scaleFactor);

        var yourScoreTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '60px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.yourScoreText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.85), "YOUR SCORE : " + _score, yourScoreTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.replayButtonContainer = this.scene.add.container(0, 0);
        this.replayButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 1.5), Math.round(game.config.height / 1.4), "button_base", 0.5, 0.5, 0.6 * scaleFactor, 0.6 * scaleFactor, "true", this.ReplayButtonPressed, this.ReplayButtonReleased);
        var replayTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#001754', fontStyle: 'bold', align: 'center' };
        this.replayText = this.scene.add.text(Math.round(game.config.width / 1.5), Math.round(game.config.height / 1.4), "REPLAY", replayTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.replayButtonContainer.add([this.replayButton, this.replayText]);

        this.menuButtonContainer = this.scene.add.container(0, 0);
        this.menuButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 3), Math.round(game.config.height / 1.4), "button_base", 0.5, 0.5, 0.6 * scaleFactor, 0.6 * scaleFactor, "true", this.MenuButtonPressed, this.MenuButtonReleased);
        var menuTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#001754', fontStyle: 'bold', align: 'center' };
        this.menuText = this.scene.add.text(Math.round(game.config.width / 3), Math.round(game.config.height / 1.4), "MENU", menuTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.menuButtonContainer.add([this.menuButton, this.menuText]);

        this.gameOverPopupGroup.add(this.overlay);
        this.gameOverPopupGroup.add(this.base);
        this.gameOverPopupGroup.add(this.gameoverHeading);
        this.gameOverPopupGroup.add(this.yourScoreText);
        this.gameOverPopupGroup.add(this.replayButtonContainer);
        this.gameOverPopupGroup.add(this.menuButtonContainer);

        this.base.setAlpha(0);
        this.gameOverPopupGroup.setDepth(2);
        this.scene.gameOverPopup.ShowPopup(this.base)

    }

    ShowPopup(_refImage) {

        var alphaTween = this.scene.add.tween({
            targets: [_refImage],
            alpha: 1,
            ease: 'Linear',
            duration: 300
        });
    }

    HideGameOverPopup() {
        this.gameOverPopupGroup.setVisible(false);
    }


    ReplayButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.gameOverPopup.replayButton, 0.6 * scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.gameOverPopup.replayText, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }

    ReplayButtonReleased() {
        setTimeout(() => {
            this.scene.scene.gameOverPopup.HideGameOverPopup();
            game.scene.stop('GameScene');
            game.scene.start('GameScene');
        }, 100);
    }

    MenuButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.gameOverPopup.menuButton, 0.6 * scaleFactor);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.gameOverPopup.menuText, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }

    MenuButtonReleased() {
        setTimeout(() => {
            this.scene.scene.gameOverPopup.HideGameOverPopup();
            game.scene.stop('GameScene');
            game.scene.start('TitleScene');
        }, 100);
    }

    OverlayPressed() {}

};

export default GameOverPopup;