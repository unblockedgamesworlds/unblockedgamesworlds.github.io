class InstructionPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateInstructionPopup() {
        this.instructionPopupGroup = this.scene.add.group();

        this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_black", 0, 0, 3000, 3000, "true", this.OverlayPressed);
        this.overlay.alpha = 0.6;

        var tapTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '65px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.tapText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.5), "TAP TO THROW THE KNIFE", tapTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.hand = this.scene.add.sprite(Math.round(game.config.width / 1.9), Math.round(game.config.height / 1.2), "hand").setScale(scaleFactor, scaleFactor);
        this.scene.anims.create({
            key: "hand_tap",
            frameRate: 15,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("hand", { start: 0, end: 11 }),
        });
        setTimeout(() => {
            this.hand.play("hand_tap");
        }, 500);

        this.instructionPopupGroup.add(this.overlay);
        this.instructionPopupGroup.add(this.tapText);
        this.instructionPopupGroup.add(this.hand);

        this.instructionPopupGroup.setDepth(2);

        // this.instructionPopupGroup.setAlpha(0);
        // this.scene.instructionPopup.ShowInstructionPopup();
    }

    OverlayPressed() {
        this.scene.scene.instructionPopup.HideInstructionPopup();
    }

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
        this.scene.scene.instructionPopup.HideInstructionPopup();
        // }, 100);
    }



    // ShowInstructionPopup() {
    //     // console.log("this scene: ", this.scene);
    //     var alphaTween = this.scene.add.tween({
    //         targets: [this.scene.instructionPopup.instructionPopupGroup],
    //         alpha: 1,
    //         ease: 'Linear',
    //         duration: 300
    //     });

    //     // setTimeout(() => {
    //     //     // this.scene.instructionPopup.scene.anims.play("hand_tap");
    //     //     console.log("snim: ", this.scene);
    //     //     // this.scene.scene.instructionPopup.animHand.play("hand_tap");
    //     // }, 200);

    //     // var alphaTween = this.scene.add.tween({
    //     //     targets: [_refImage],
    //     //     alpha: 1,
    //     //     ease: 'Linear',
    //     //     duration: 300
    //     // });
    // }
    HideInstructionPopup() {
        var alphaTween = this.scene.add.tween({
            targets: [this.scene.instructionPopup.instructionPopupGroup],
            alpha: 0,
            ease: 'Linear',
            duration: 300,
            onComplete: this.onHideInstructionPopup
        });
    }

    onHideInstructionPopup(_this) {
        this.parent.scene.instructionPopup.instructionPopupGroup.setVisible(false);
        // this.parent.scene.quitPopup.quitPopupGroup.destroy();
    }

};

export default InstructionPopup;