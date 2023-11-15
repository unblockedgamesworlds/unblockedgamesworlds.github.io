export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');

    }

    preload() {
        //SPLASH
        this.load.image('splash_bg', 'assets/images/splash/splash_bg.png');
        this.load.image('logo', 'assets/images/splash/logo.png');
        this.load.image('progress_base', 'assets/images/splash/progress_base.png');
        this.load.image('progress_bar', 'assets/images/splash/progress_bar.png');

        for (var i = 0; i < 3; i++) {
            this.load.image('shape_' + i, 'assets/images/gameplay/shape_' + i + '.png');
        }
    }

    create() {
        this.scene.start("PreloadScene");
    }

}