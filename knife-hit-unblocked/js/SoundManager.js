var SoundManager = {
    AddSound: function() {
        buttonClickSound = game.sound.add('button_click_sound');
        bgMusic = game.sound.add('bg_music');
        obstacleCollideSound = game.sound.add('obstacle_collide_sound');
        knifeAttachSound = game.sound.add('knife_attach_sound');
    },

    PlayBgMusic: function() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            bgMusic.stop();
            bgMusic.play();
            bgMusic.loop = true;
            bgMusic.volume = 0.1;
        }
    },
    StopBgMusic: function() {
        bgMusic.stop();
    },

    PlayButtonClickSound: function() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            buttonClickSound.play();
        }
    },

    PlayKnifeAttachSound: function() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            knifeAttachSound.play();
        }
    },

    PlayObstacleCollideSound: function() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            obstacleCollideSound.play();
        }
    }
}