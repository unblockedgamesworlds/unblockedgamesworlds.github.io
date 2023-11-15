export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
    }

    preload() {
        this.loadAssests();
    }

    loadAssests() {
        //MENU
        this.load.image('menu_character_knife', 'assets/images/menu/menu_character_knife.png');
        this.load.image('character_shadow', 'assets/images/menu/character_shadow.png');
        this.load.spritesheet('menu_character', 'assets/images/menu/menu_character_spriteshet.png', { frameWidth: 527, frameHeight: 532 });

        this.load.image('character_glow', 'assets/images/menu/character_glow.png');
        this.load.image('play_button', 'assets/images/menu/play_button.png');
        this.load.image('title', 'assets/images/menu/title.png');
        this.load.image('title_knife', 'assets/images/menu/title_knife.png');
        //GAMEPLAY
        this.load.image('gameplay_bg', 'assets/images/gameplay/gameplay_bg.png');
        this.load.image('back_button', 'assets/images/gameplay/back_button.png');
        this.load.image('sound_on', 'assets/images/gameplay/sound_on.png');
        this.load.image('sound_off', 'assets/images/gameplay/sound_off.png');
        this.load.image('knife', 'assets/images/gameplay/knife.png');
        this.load.spritesheet('target', 'assets/images/gameplay/target.png', { frameWidth: 375, frameHeight: 381 });
        // this.load.spritesheet('target_break', 'assets/images/gameplay/target_break.png', { frameWidth: 761, frameHeight: 1344 });
        this.load.spritesheet('target_break', 'assets/images/gameplay/target_break.png', { frameWidth: 609, frameHeight: 1075 });
        this.load.image('knife_stand', 'assets/images/gameplay/knife_stand.png');
        this.load.image('knife_stand_knife_base', 'assets/images/gameplay/knife_stand_knife_base.png');
        
        this.load.image('stand_knife', 'assets/images/gameplay/stand_knife.png');
        this.load.image('obstacle_0', 'assets/images/gameplay/obstacle_0.png');
        this.load.image('obstacle_1', 'assets/images/gameplay/obstacle_1.png');

        //POPUP
        this.load.image('quit_base', 'assets/images/popup/quit_base.png');
        this.load.image('yes_button', 'assets/images/popup/yes_button.png');
        this.load.image('no_button', 'assets/images/popup/no_button.png');
        this.load.spritesheet('hand', 'assets/images/popup/hand.png', { frameWidth: 256, frameHeight: 256 });

        this.load.image('one_pixel_white', 'assets/one_pixel_white.png');
        this.load.image('one_pixel_black', 'assets/one_pixel_black.png');
        this.load.image('button_base', 'assets/button_base.png');
        this.load.image('popup_base', 'assets/popup_base.png');
        this.load.image('gameover_heading', 'assets/gameover_heading.png');

        //AUDIO
        this.load.audio('button_click_sound', 'sounds/button_click_sound.mp3');
        this.load.audio('knife_attach_sound', 'sounds/knife_attach_sound.mp3');
        this.load.audio('obstacle_collide_sound', 'sounds/obstacle_collide_sound.mp3');
        this.load.audio('bg_music', 'sounds/bg_music.mp3');

        this.load.start();
    }

    create() {
        var bg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "splash_bg", 0.5, 0.5, scaleFactor, scaleFactor);

        var logo = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 3.7), "logo", 0.5, 0.5, scaleFactor, scaleFactor);

        this.progressBase = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.25), "progress_base", 0.5, 0.5, scaleFactor, scaleFactor);

        this.progressBar = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.25), "progress_bar", 0.5, 0.5, scaleFactor, scaleFactor);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.loadingText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.2), "Loading: ", { fontFamily: 'Poppins_Bold', fontSize: '46px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
    }

    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    complete() {
        setTimeout(() => {
            SoundManager.AddSound();
            this.scene.start("TitleScene");
            // this.scene.start("GameScene");
        }, 1000);
    }

}