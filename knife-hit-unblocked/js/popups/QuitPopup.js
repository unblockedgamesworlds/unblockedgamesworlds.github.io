class QuitPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateQuitPopup() {
        this.quitPopupGroup = this.scene.add.group();

        this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        this.overlay.alpha = 0.6;

        this.base = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "quit_base", 0.5, 0.5, scaleFactor, scaleFactor);

        var quitTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '56px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.quitText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 2.27), "DO YOU WANT TO QUIT ?", quitTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.yesButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 3.27), Math.round(game.config.height / 1.8), "yes_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.YesButtonPressed, this.YesButtonReleased);

        this.noButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 1.44), Math.round(game.config.height / 1.8), "no_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.NoButtonPressed, this.NoButtonReleased);

        this.quitPopupGroup.add(this.overlay);
        this.quitPopupGroup.add(this.base);
        this.quitPopupGroup.add(this.quitText);
        this.quitPopupGroup.add(this.yesButton);
        this.quitPopupGroup.add(this.noButton);

        this.base.setAlpha(0);
        this.quitPopupGroup.setDepth(2);

        this.scene.quitPopup.ShowQuitPopup(this.base);
    }

    OverlayPressed() {}

    YesButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.quitPopup.yesButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }

    YesButtonReleased() {
        setTimeout(() => {
            game.scene.stop('GameScene');
            game.scene.start('TitleScene');
            SoundManager.StopBgMusic();
        }, 100);
    }

    NoButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.quitPopup.noButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }

    NoButtonReleased() {
        // setTimeout(() => {
        this.scene.scene.quitPopup.HideQuitPopup();
        // }, 100);
    }



    ShowQuitPopup(_refImage) {
        // console.log("this scene: ", this.scene);
        // var alphaTween = this.scene.add.tween({
        //     targets: [this.scene.quitPopup.quitPopupGroup],
        //     alpha: 1,
        //     ease: 'Linear',
        //     duration: 300
        // });

        var alphaTween = this.scene.add.tween({
            targets: [_refImage],
            alpha: 1,
            ease: 'Linear',
            duration: 300
        });
    }
    HideQuitPopup() {
        var alphaTween = this.scene.add.tween({
            targets: [this.scene.quitPopup.quitPopupGroup],
            alpha: 0,
            ease: 'Linear',
            duration: 300,
            onComplete: this.onHideQuitPopup
        });
    }

    onHideQuitPopup(_this) {
        this.parent.scene.quitPopup.quitPopupGroup.setVisible(false);
        // this.parent.scene.quitPopup.quitPopupGroup.destroy();
    }

};

export default QuitPopup;