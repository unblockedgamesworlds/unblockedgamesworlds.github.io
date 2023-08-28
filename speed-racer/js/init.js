(function () {
    var z;
    var sp1 = function () {};
    var sp2 = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var sp3 = sp2['length'];
    var sp4 = (window['console'] = window['console'] || {});
    while (sp3--) {
        sp5 = sp2[sp3];
        if (!sp4[sp5]) {
            sp4[sp5] = sp1
        }
    }
}());

function checkContentHeight(_0x939dx7) {
    var stageHeight = $(window)['height']();
    var sp6 = (stageHeight / 2) - (_0x939dx7['height']() / 2);
    return sp6
}

function checkContentWidth(_0x939dx7) {
    var stageWidth = $(window)['width']();
    var sp8 = (stageWidth / 2) - (_0x939dx7['width']() / 2);
    return sp8
}

function getDeviceVer() {
    var sp7 = navigator['userAgent'];
    var _0x939dxf;
    if (sp7['match'](/(iPad|iPhone|iPod touch)/)) {
        userOS = 'iOS';
        _0x939dxf = sp7['indexOf']('OS ')
    } else {
        if (sp7['match'](/Android/)) {
            userOS = 'Android';
            _0x939dxf = sp7['indexOf']('Android ')
        } else {
            userOS = 'unknown'
        }
    };
    if (userOS === 'iOS' && _0x939dxf > -1) {
        userOSver = sp7['substr'](_0x939dxf + 3, 3)['replace']('_', '.')
    } else {
        if (userOS === 'Android' && _0x939dxf > -1) {
            userOSver = sp7['substr'](_0x939dxf + 8, 3)
        } else {
            userOSver = 'unknown'
        }
    };
    return Number(userOSver)
}

function toInt(sp51, sp52) {
    if (sp51 !== null) {
        var sp53 = parseInt(sp51, 10);
        if (!isNaN(sp53)) {
            return sp53
        }
    };
    return toInt(sp52, 0)
}

function toFloat(sp51, sp52) {
    if (sp51 !== null) {
        var sp53 = parseFloat(sp51);
        if (!isNaN(sp53)) {
            return sp53
        }
    };
    return toFloat(sp52, 0.0)
}

function getLimit(sp56, sp57, sp58) {
    return Math['max'](sp57, Math['min'](sp56, sp58))
}

function randomInt(sp57, sp58) {
    return Math['round'](getInterpolate(sp57, sp58, Math['random']()))
}

function randomChoice(sp5b) {
    return sp5b[randomInt(0, sp5b['length'] - 1)]
}

function percentRemaining(sp5d, sp5e) {
    return (sp5d % sp5e) / sp5e
}

function getAccelerate(sp10, sp11, dt) {
    return sp10 + (sp11 * dt)
}

function getInterpolate(sp14, sp15, sp16) {
    return sp14 + (sp15 - sp14) * sp16
}

function easeIn(sp14, sp15, sp16) {
    return sp14 + (sp15 - sp14) * Math['pow'](sp16, 2)
}

function easeOut(sp14, sp15, sp16) {
    return sp14 + (sp15 - sp14) * (1 - Math['pow'](1 - sp16, 2))
}

function easeInOut(sp14, sp15, sp16) {
    return sp14 + (sp15 - sp14) * ((-Math['cos'](sp16 * Math['PI']) / 2) + 0.5)
}

function exponentialFog(sp1b, sp1c) {
    return 1 / (Math['pow'](Math.E, (sp1b * sp1b * sp1c)))
}

function getIncrease(sp1e, sp1f, sp58) {
    var sp20 = sp1e + sp1f;
    while (sp20 >= sp58) {
        sp20 -= sp58
    };
    while (sp20 < 0) {
        sp20 += sp58
    };
    return sp20
}

function getProject(sp22, sp23, sp24, sp25, sp26, sp27, sp28, sp29) {
    sp22['camera']['x'] = (sp22['world']['x'] || 0) - sp23;
    sp22['camera']['y'] = (sp22['world']['y'] || 0) - sp24;
    sp22['camera']['z'] = (sp22['world']['z'] || 0) - sp25;
    sp22['screen']['scale'] = sp26 / sp22['camera']['z'];
    sp22['screen']['x'] = Math['round']((sp27 / 2) + (sp22['screen']['scale'] * sp22['camera']['x'] * sp27 / 2));
    sp22['screen']['y'] = Math['round']((sp28 / 2) - (sp22['screen']['scale'] * sp22['camera']['y'] * sp28 / 2));
    sp22['screen']['w'] = Math['round']((sp22['screen']['scale'] * sp29 * sp27 / 2))
}

function getOverlap(sp2b, sp2c, sp2d, sp2e, sp16) {
    var sp2f = (sp16 || 1) / 2;
    var sp30 = sp2b - (sp2c * sp2f);
    var sp31 = sp2b + (sp2c * sp2f);
    var sp32 = sp2d - (sp2e * sp2f);
    var sp33 = sp2d + (sp2e * sp2f);
    return !((sp31 < sp32) || (sp30 > sp33))
}

function addCommas(sp35) {
    sp35 += '';
    x = sp35['split']('.');
    x1 = x[0];
    x2 = x['length'] > 1 ? '.' + x[1] : '';
    var sp36 = /(\d+)(\d{3})/;
    while (sp36['test'](x1)) {
        x1 = x1['replace'](sp36, '$1' + ',' + '$2')
    };
    return x1 + x2
}
var enableDesktopSound = true;
var enableMobileSound = true;
var soundOn;
var soundMute = false;
var musicMute = false;
$['sound'] = {};
var soundID = 0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];

function playSound(sp41, sp42) {
    if (soundOn) {
        var sp43 = soundID;
        soundPushArr['push'](sp43);
        soundID++;
        var sp44 = sp42 == undefined ? 1 : sp42;
        $['sound'][sp43] = createjs['Sound']['play'](sp41);
        $['sound'][sp43]['defaultVol'] = sp44;
        setSoundVolume(sp43);
        $['sound'][sp43]['removeAllEventListeners']();
        $['sound'][sp43]['addEventListener']('complete', function () {
            var sp45 = soundPushArr['indexOf'](sp43);
            if (sp45 != -1) {
                soundPushArr['splice'](sp45, 1)
            }
        })
    }
}

function playSoundLoop(sp41) {
    if (soundOn) {
        if ($['sound'][sp41] == null) {
            soundLoopPushArr['push'](sp41);
            $['sound'][sp41] = createjs['Sound']['play'](sp41);
            $['sound'][sp41]['defaultVol'] = 1;
            setSoundLoopVolume(sp41);
            $['sound'][sp41]['removeAllEventListeners']();
            $['sound'][sp41]['addEventListener']('complete', function () {
                $['sound'][sp41]['play']()
            })
        }
    }
}

function toggleSoundLoop(sp41, sp48) {
    if (soundOn) {
        if ($['sound'][sp41] != null) {
            if (sp48) {
                $['sound'][sp41]['play']()
            } else {
                $['sound'][sp41]['paused'] = true
            }
        }
    }
}

function stopSoundLoop(sp41) {
    if (soundOn) {
        if ($['sound'][sp41] != null) {
            $['sound'][sp41]['stop']();
            $['sound'][sp41] = null;
            var sp4a = soundLoopPushArr['indexOf'](sp41);
            if (sp4a != -1) {
                soundLoopPushArr['splice'](sp4a, 1)
            }
        }
    }
}

function playMusicLoop(sp41) {
    if (soundOn) {
        if ($['sound'][sp41] == null) {
            musicPushArr['push'](sp41);
            $['sound'][sp41] = createjs['Sound']['play'](sp41);
            $['sound'][sp41]['defaultVol'] = 1;
            setMusicVolume(sp41);
            $['sound'][sp41]['removeAllEventListeners']();
            $['sound'][sp41]['addEventListener']('complete', function () {
                $['sound'][sp41]['play']()
            })
        }
    }
}

function toggleMusicLoop(sp41, sp48) {
    if (soundOn) {
        if ($['sound'][sp41] != null) {
            if (sp48) {
                $['sound'][sp41]['play']()
            } else {
                $['sound'][sp41]['paused'] = true
            }
        }
    }
}

function stopMusicLoop(sp41) {
    if (soundOn) {
        if ($['sound'][sp41] != null) {
            $['sound'][sp41]['stop']();
            $['sound'][sp41] = null;
            var sp4a = musicPushArr['indexOf'](sp41);
            if (sp4a != -1) {
                musicPushArr['splice'](sp4a, 1)
            }
        }
    }
}

function stopSound() {
    createjs['Sound']['stop']()
}

function toggleSoundInMute(sp48) {
    if (soundOn) {
        soundMute = sp48;
        for (var sp5d = 0; sp5d < soundPushArr['length']; sp5d++) {
            setSoundVolume(soundPushArr[sp5d])
        };
        for (var sp5d = 0; sp5d < soundLoopPushArr['length']; sp5d++) {
            setSoundLoopVolume(soundLoopPushArr[sp5d])
        };
        setAudioVolume()
    }
}

function toggleMusicInMute(sp48) {
    if (soundOn) {
        musicMute = sp48;
        for (var sp5d = 0; sp5d < musicPushArr['length']; sp5d++) {
            setMusicVolume(musicPushArr[sp5d])
        }
    }
}

function setSoundVolume(_0x939dx62, sp42) {
    if (soundOn) {
        var _0x939dx63 = soundPushArr['indexOf'](_0x939dx62);
        if (_0x939dx63 != -1) {
            var sp44 = sp42 == undefined ? $['sound'][soundPushArr[_0x939dx63]]['defaultVol'] : sp42;
            var _0x939dx64 = soundMute == false ? sp44 : 0;
            $['sound'][soundPushArr[_0x939dx63]]['volume'] = _0x939dx64;
            $['sound'][soundPushArr[_0x939dx63]]['defaultVol'] = sp44
        }
    }
}

function setSoundLoopVolume(_0x939dx66, sp42) {
    if (soundOn) {
        var sp4a = soundLoopPushArr['indexOf'](_0x939dx66);
        if (sp4a != -1) {
            var sp44 = sp42 == undefined ? $['sound'][soundLoopPushArr[sp4a]]['defaultVol'] : sp42;
            var _0x939dx64 = soundMute == false ? sp44 : 0;
            $['sound'][soundLoopPushArr[sp4a]]['volume'] = _0x939dx64;
            $['sound'][soundLoopPushArr[sp4a]]['defaultVol'] = sp44
        }
    }
}

function setMusicVolume(_0x939dx66, sp42) {
    if (soundOn) {
        var _0x939dx68 = musicPushArr['indexOf'](_0x939dx66);
        if (_0x939dx68 != -1) {
            var sp44 = sp42 == undefined ? $['sound'][musicPushArr[_0x939dx68]]['defaultVol'] : sp42;
            var _0x939dx64 = musicMute == false ? sp44 : 0;
            $['sound'][musicPushArr[_0x939dx68]]['volume'] = _0x939dx64;
            $['sound'][musicPushArr[_0x939dx68]]['defaultVol'] = sp44
        }
    }
}
var audioFile = null;

function playAudio(_0x939dx6b, _0x939dx6c) {
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs['Sound']['play'](_0x939dx6b);
            setAudioVolume();
            audioFile['removeAllEventListeners']();
            audioFile['addEventListener']('complete', function (_0x939dx6d) {
                audioFile = null;
                if (typeof _0x939dx6c == 'function') {
                    _0x939dx6c()
                }
            })
        }
    }
}

function stopAudio() {
    if (soundOn) {
        if (audioFile != null) {
            audioFile['stop']();
            audioFile = null
        }
    }
}

function setAudioVolume() {
    if (soundOn) {
        if (audioFile != null) {
            var _0x939dx64 = soundMute == false ? 1 : 0;
            audioFile['volume'] = _0x939dx64
        }
    }
}

function playSoundID(sp41, _0x939dx6c) {
    if (soundOn) {
        if ($['sound'][sp41] == null) {
            soundPushArr['push'](sp41);
            $['sound'][sp41] = createjs['Sound']['play'](sp41);
            $['sound'][sp41]['defaultVol'] = 1;
            setSoundVolume(sp41);
            $['sound'][sp41]['removeAllEventListeners']();
            if (_0x939dx6c != undefined) {
                $['sound'][sp41]['addEventListener']('complete', _0x939dx6c)
            }
        }
    }
}

function stopSoundID(sp41) {
    if (soundOn) {
        if ($['sound'][sp41] != null) {
            $['sound'][sp41]['stop']();
            $['sound'][sp41] = null;
            var _0x939dx63 = soundPushArr['indexOf'](sp41);
            if (_0x939dx63 != -1) {
                soundPushArr['splice'](_0x939dx63, 1)
            }
        }
    }
}
var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(_0x939dx76, _0x939dx77) {
    var _0x939dx78 = document['getElementById']('gameCanvas');
    _0x939dx78['width'] = _0x939dx76;
    _0x939dx78['height'] = _0x939dx77;
    canvasW = _0x939dx76;
    canvasH = _0x939dx77;
    stage = new createjs.Stage('gameCanvas');
    createjs['Touch']['enable'](stage);
    stage['enableMouseOver'](20);
    stage['mouseMoveOutside'] = true;
    createjs['Ticker']['framerate'] = 60;
    createjs['Ticker']['addEventListener']('tick', tick)
}
var guide = false;
var canvasContainer, mainContainer, gameContainer, statusContainer, gameStatusContainer, worldContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonStart, buttonRestart, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;
$['sprites'] = {};
$['background'] = {};

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    statusContainer = new createjs.Container();
    gameStatusContainer = new createjs.Container();
    worldContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    confirmContainer = new createjs.Container();
    bg = new createjs.Bitmap(loader['getResult']('background'));
    logo = new createjs.Bitmap(loader['getResult']('logo'));
    buttonStart = new createjs.Bitmap(loader['getResult']('buttonStart'));
    centerReg(buttonStart);
    buttonStart['x'] = canvasW / 2;
    buttonStart['y'] = canvasH / 100 * 55;
    for (var _0x939dx8e in spritesData) {
        if (spritesData[_0x939dx8e]['src'] != undefined) {
            spritesData[_0x939dx8e]['id'] = _0x939dx8e;
            $['sprites'][_0x939dx8e] = new createjs.Bitmap(loader['getResult'](_0x939dx8e));
            $['sprites'][_0x939dx8e]['y'] -= $['sprites'][_0x939dx8e]['image']['naturalHeight'];
            gameContainer['addChild']($['sprites'][_0x939dx8e]);
            spritesData[_0x939dx8e]['id'] = _0x939dx8e;
            spritesData[_0x939dx8e]['w'] = $['sprites'][_0x939dx8e]['image']['naturalWidth'];
            spritesData[_0x939dx8e]['h'] = $['sprites'][_0x939dx8e]['image']['naturalHeight']
        }
    };
    for (var _0x939dx8e in backgroundData) {
        if (backgroundData[_0x939dx8e]['src'] != undefined) {
            $['background'][_0x939dx8e] = new createjs.Bitmap(loader['getResult'](_0x939dx8e));
            $['background'][_0x939dx8e]['y'] -= $['background'][_0x939dx8e]['image']['naturalHeight'];
            gameContainer['addChild']($['background'][_0x939dx8e]);
            backgroundData[_0x939dx8e]['id'] = _0x939dx8e;
            backgroundData[_0x939dx8e]['w'] = $['background'][_0x939dx8e]['image']['naturalWidth'];
            backgroundData[_0x939dx8e]['h'] = $['background'][_0x939dx8e]['image']['naturalHeight']
        }
    };
    for (var _0x939dx8e in playerCarData) {
        if (playerCarData[_0x939dx8e]['src'] != undefined) {
            $['sprites'][_0x939dx8e] = new createjs.Bitmap(loader['getResult'](_0x939dx8e));
            $['sprites'][_0x939dx8e]['y'] -= $['sprites'][_0x939dx8e]['image']['naturalHeight'];
            gameContainer['addChild']($['sprites'][_0x939dx8e]);
            playerCarData[_0x939dx8e]['id'] = _0x939dx8e;
            playerCarData[_0x939dx8e]['w'] = $['sprites'][_0x939dx8e]['image']['naturalWidth'];
            playerCarData[_0x939dx8e]['h'] = $['sprites'][_0x939dx8e]['image']['naturalHeight']
        }
    };
    var _0x939dx8f = 70;
    var sp60 = 100;
    var sp61 = {
        "regX": 0,
        "regY": 0,
        "height": sp60,
        "count": 2,
        "width": _0x939dx8f
    };
    var sp62 = {
        animate: {
            frames: [0, 1],
            speed: 1
        }
    };
    smokeData = new createjs.SpriteSheet({
        "images": [loader['getResult']('itemSmoke')['src']],
        "frames": sp61,
        "animations": sp62
    });
    smokeAnimate = new createjs.Sprite(smokeData, 'animate');
    smokeAnimate['framerate'] = 20;
    smokeAnimate['x'] = -200;
    var _0x939dx8f = 155;
    var sp60 = 55;
    var sp61 = {
        "regX": 0,
        "regY": 0,
        "height": sp60,
        "count": 2,
        "width": _0x939dx8f
    };
    var sp62 = {
        animate: {
            frames: [0, 1],
            speed: 1
        }
    };
    fireData = new createjs.SpriteSheet({
        "images": [loader['getResult']('itemFire')['src']],
        "frames": sp61,
        "animations": sp62
    });
    fireAnimate = new createjs.Sprite(fireData, 'animate');
    fireAnimate['framerate'] = 20;
    fireAnimate['x'] = -200;
    scoreTxt = new createjs.Text();
    scoreTxt['font'] = '50px dimitriregular';
    scoreTxt['color'] = '#ffda00';
    scoreTxt['textAlign'] = 'left';
    scoreTxt['textBaseline'] = 'alphabetic';
    scoreTxt['text'] = scoreData['text'];
    scoreTxt['x'] = canvasW / 100 * 2;
    scoreTxt['y'] = canvasH / 100 * 5;
    scoreShadowTxt = new createjs.Text();
    scoreShadowTxt['font'] = '50px dimitri_swankregular';
    scoreShadowTxt['color'] = '#2f2f2f';
    scoreShadowTxt['textAlign'] = 'left';
    scoreShadowTxt['textBaseline'] = 'alphabetic';
    scoreShadowTxt['text'] = scoreData['text'];
    scoreShadowTxt['x'] = scoreTxt['x'] + 1;
    scoreShadowTxt['y'] = scoreTxt['y'];
    fuelTxt = new createjs.Text();
    fuelTxt['font'] = '30px dimitriregular';
    fuelTxt['color'] = '#cccccc';
    fuelTxt['textAlign'] = 'left';
    fuelTxt['textBaseline'] = 'alphabetic';
    fuelTxt['text'] = fuelData['text'];
    fuelTxt['x'] = canvasW / 100 * 2;
    fuelTxt['y'] = canvasH / 100 * 9;
    fuelShadowTxt = new createjs.Text();
    fuelShadowTxt['font'] = '30px dimitri_swankregular';
    fuelShadowTxt['color'] = '#2f2f2f';
    fuelShadowTxt['textAlign'] = 'left';
    fuelShadowTxt['textBaseline'] = 'alphabetic';
    fuelShadowTxt['text'] = fuelData['text'];
    fuelShadowTxt['x'] = fuelTxt['x'] + 1;
    fuelShadowTxt['y'] = fuelTxt['y'];
    fuelBarBackground = new createjs.Shape();
    fuelBarBackground['graphics']['beginFill'](fuelData['bar']['backgroundColor'])['drawRect'](0, 0, fuelData['bar']['width'], fuelData['bar']['height']);
    fuelBarBackground['x'] = canvasW / 100 * 12;
    fuelBarBackground['y'] = canvasH / 100 * 6.8;
    fuelBarEmpty = new createjs.Shape();
    fuelBarEmpty['graphics']['beginFill'](fuelData['bar']['blankColor'])['drawRect'](0, 0, fuelData['bar']['width'] - (fuelData['bar']['space'] * 2), fuelData['bar']['height'] - (fuelData['bar']['space'] * 4));
    fuelBarEmpty['x'] = fuelBarBackground['x'] + fuelData['bar']['space'];
    fuelBarEmpty['y'] = fuelBarBackground['y'] + fuelData['bar']['space'];
    fuelBarFill = new createjs.Shape();
    fuelBarFill['x'] = fuelBarBackground['x'] + fuelData['bar']['space'];
    fuelBarFill['y'] = fuelBarBackground['y'] + fuelData['bar']['space'];
    gameStatusTxt = new createjs.Text();
    gameStatusTxt['font'] = '90px dimitriregular';
    gameStatusTxt['color'] = '#fff';
    gameStatusTxt['textAlign'] = 'center';
    gameStatusTxt['textBaseline'] = 'alphabetic';
    gameStatusTxt['text'] = '';
    gameStatusTxt['x'] = canvasW / 2;
    gameStatusTxt['y'] = canvasH / 100 * 30;
    gameStatusShadowTxt = new createjs.Text();
    gameStatusShadowTxt['font'] = '90px dimitri_swankregular';
    gameStatusShadowTxt['color'] = '#2f2f2f';
    gameStatusShadowTxt['textAlign'] = 'center';
    gameStatusShadowTxt['textBaseline'] = 'alphabetic';
    gameStatusShadowTxt['text'] = '';
    gameStatusShadowTxt['x'] = gameStatusTxt['x'] + 1;
    gameStatusShadowTxt['y'] = gameStatusTxt['y'];
    instructionTxt = new createjs.Text();
    instructionTxt['font'] = '50px dimitriregular';
    instructionTxt['color'] = '#fff';
    instructionTxt['textAlign'] = 'center';
    instructionTxt['textBaseline'] = 'alphabetic';
    instructionTxt['text'] = intructionDisplayText;
    instructionTxt['x'] = canvasW / 2;
    instructionTxt['y'] = canvasH / 100 * 40;
    instructionShadowTxt = new createjs.Text();
    instructionShadowTxt['font'] = '50px dimitri_swankregular';
    instructionShadowTxt['color'] = '#2f2f2f';
    instructionShadowTxt['textAlign'] = 'center';
    instructionShadowTxt['textBaseline'] = 'alphabetic';
    instructionShadowTxt['text'] = intructionDisplayText;
    instructionShadowTxt['x'] = instructionTxt['x'] + 1;
    instructionShadowTxt['y'] = instructionTxt['y'];
    itemTouchUp = new createjs.Bitmap(loader['getResult']('itemTouchUp'));
    centerReg(itemTouchUp);
    createHitarea(itemTouchUp);
    itemTouchDown = new createjs.Bitmap(loader['getResult']('itemTouchDown'));
    centerReg(itemTouchDown);
    createHitarea(itemTouchDown);
    itemTouchLeft = new createjs.Bitmap(loader['getResult']('itemTouchLeft'));
    centerReg(itemTouchLeft);
    createHitarea(itemTouchLeft);
    itemTouchRight = new createjs.Bitmap(loader['getResult']('itemTouchRight'));
    centerReg(itemTouchRight);
    createHitarea(itemTouchRight);
    itemTouchUp['alpha'] = itemTouchDown['alpha'] = itemTouchLeft['alpha'] = itemTouchRight['alpha'] = 0.2;
    resultTitleTxt = new createjs.Text();
    resultTitleTxt['font'] = '90px dimitriregular';
    resultTitleTxt['color'] = '#fff';
    resultTitleTxt['textAlign'] = 'center';
    resultTitleTxt['textBaseline'] = 'alphabetic';
    resultTitleTxt['text'] = resultTitleText;
    resultTitleTxt['x'] = canvasW / 2;
    resultTitleTxt['y'] = canvasH / 100 * 30;
    resultTitleShadowTxt = new createjs.Text();
    resultTitleShadowTxt['font'] = '90px dimitri_swankregular';
    resultTitleShadowTxt['color'] = '#2f2f2f';
    resultTitleShadowTxt['textAlign'] = 'center';
    resultTitleShadowTxt['textBaseline'] = 'alphabetic';
    resultTitleShadowTxt['text'] = resultTitleText;
    resultTitleShadowTxt['x'] = resultTitleTxt['x'] + 1;
    resultTitleShadowTxt['y'] = resultTitleTxt['y'];
    resultScoreTxt = new createjs.Text();
    resultScoreTxt['font'] = '120px dimitriregular';
    resultScoreTxt['color'] = '#fada06';
    resultScoreTxt['textAlign'] = 'center';
    resultScoreTxt['textBaseline'] = 'alphabetic';
    resultScoreTxt['text'] = '1500PTS';
    resultScoreTxt['x'] = canvasW / 2;
    resultScoreTxt['y'] = canvasH / 100 * 48;
    resultScoreShadowTxt = new createjs.Text();
    resultScoreShadowTxt['font'] = '120px dimitri_swankregular';
    resultScoreShadowTxt['color'] = '#2f2f2f';
    resultScoreShadowTxt['textAlign'] = 'center';
    resultScoreShadowTxt['textBaseline'] = 'alphabetic';
    resultScoreShadowTxt['text'] = '1500PTS';
    resultScoreShadowTxt['x'] = resultScoreTxt['x'] + 1;
    resultScoreShadowTxt['y'] = resultScoreTxt['y'];
    resultScoreDescTxt = new createjs.Text();
    resultScoreDescTxt['font'] = '60px dimitriregular';
    resultScoreDescTxt['color'] = '#fada06';
    resultScoreDescTxt['textAlign'] = 'center';
    resultScoreDescTxt['textBaseline'] = 'alphabetic';
    resultScoreDescTxt['text'] = resultScoreText;
    resultScoreDescTxt['x'] = canvasW / 2;
    resultScoreDescTxt['y'] = canvasH / 100 * 38;
    resultScoreDescShadowTxt = new createjs.Text();
    resultScoreDescShadowTxt['font'] = '60px dimitri_swankregular';
    resultScoreDescShadowTxt['color'] = '#2f2f2f';
    resultScoreDescShadowTxt['textAlign'] = 'center';
    resultScoreDescShadowTxt['textBaseline'] = 'alphabetic';
    resultScoreDescShadowTxt['text'] = resultScoreText;
    resultScoreDescShadowTxt['x'] = resultScoreDescTxt['x'] + 1;
    resultScoreDescShadowTxt['y'] = resultScoreDescTxt['y'];
    resultShareTxt = new createjs.Text();
    resultShareTxt['font'] = '25px dimitriregular';
    resultShareTxt['color'] = '#fff';
    resultShareTxt['textAlign'] = 'center';
    resultShareTxt['textBaseline'] = 'alphabetic';
    resultShareTxt['text'] = shareText;
    resultShareTxt['x'] = canvasW / 2;
    resultShareTxt['y'] = canvasH / 100 * 63;
    resultShareShadowTxt = new createjs.Text();
    resultShareShadowTxt['font'] = '25px dimitri_swankregular';
    resultShareShadowTxt['color'] = '#2f2f2f';
    resultShareShadowTxt['textAlign'] = 'center';
    resultShareShadowTxt['textBaseline'] = 'alphabetic';
    resultShareShadowTxt['text'] = shareText;
    resultShareShadowTxt['x'] = resultShareTxt['x'] + 1;
    resultShareShadowTxt['y'] = resultShareTxt['y'];
    buttonFacebook = new createjs.Bitmap(loader['getResult']('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader['getResult']('buttonTwitter'));
    buttonWhatsapp = new createjs.Bitmap(loader['getResult']('buttonWhatsapp'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFacebook['x'] = canvasW / 100 * 36;
    buttonTwitter['x'] = canvasW / 2;
    buttonWhatsapp['x'] = canvasW / 100 * 64;
    buttonFacebook['y'] = buttonTwitter['y'] = buttonWhatsapp['y'] = canvasH / 100 * 69;
    buttonRestart = new createjs.Bitmap(loader['getResult']('buttonRestart'));
    centerReg(buttonRestart);
    createHitarea(buttonRestart);
    buttonRestart['x'] = canvasW / 2;
    buttonRestart['y'] = canvasH / 100 * 55;
    buttonFullscreen = new createjs.Bitmap(loader['getResult']('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader['getResult']('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader['getResult']('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn['visible'] = false;
    buttonMusicOn = new createjs.Bitmap(loader['getResult']('buttonMusicOn'));
    centerReg(buttonMusicOn);
    buttonMusicOff = new createjs.Bitmap(loader['getResult']('buttonMusicOff'));
    centerReg(buttonMusicOff);
    buttonMusicOn['visible'] = false;
    buttonExit = new createjs.Bitmap(loader['getResult']('buttonExit'));
    centerReg(buttonExit);
    buttonSettings = new createjs.Bitmap(loader['getResult']('buttonSettings'));
    centerReg(buttonSettings);
    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonMusicOn);
    createHitarea(buttonMusicOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    optionsContainer = new createjs.Container();
    optionsContainer['addChild'](buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
    optionsContainer['visible'] = false;
    itemExit = new createjs.Bitmap(loader['getResult']('itemExit'));
    buttonConfirm = new createjs.Bitmap(loader['getResult']('buttonConfirm'));
    centerReg(buttonConfirm);
    buttonConfirm['x'] = canvasW / 100 * 37;
    buttonConfirm['y'] = canvasH / 100 * 58;
    buttonCancel = new createjs.Bitmap(loader['getResult']('buttonCancel'));
    centerReg(buttonCancel);
    buttonCancel['x'] = canvasW / 100 * 66;
    buttonCancel['y'] = canvasH / 100 * 58;
    confirmMessageTxt = new createjs.Text();
    confirmMessageTxt['font'] = '35px dimitriregular';
    confirmMessageTxt['color'] = '#2f2f2f';
    confirmMessageTxt['textAlign'] = 'center';
    confirmMessageTxt['textBaseline'] = 'alphabetic';
    confirmMessageTxt['text'] = exitMessage;
    confirmMessageTxt['x'] = canvasW / 2;
    confirmMessageTxt['y'] = canvasH / 100 * 38;
    confirmContainer['addChild'](itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
    confirmContainer['visible'] = false;
    if (guide) {
        guideline = new createjs.Shape();
        guideline['graphics']['setStrokeStyle'](2)['beginStroke']('red')['drawRect']((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    };
    mainContainer['addChild'](logo, buttonStart);
    gameStatusContainer['addChild'](gameStatusShadowTxt, gameStatusTxt);
    gameContainer['addChild'](smokeAnimate, fireAnimate, gameStatusContainer, statusContainer, instructionShadowTxt, instructionTxt, itemTouchUp, itemTouchDown, itemTouchLeft, itemTouchRight);
    statusContainer['addChild'](scoreShadowTxt, scoreTxt, fuelShadowTxt, fuelTxt, fuelBarBackground, fuelBarEmpty, fuelBarFill);
    resultContainer['addChild'](resultTitleShadowTxt, resultTitleTxt, resultScoreDescShadowTxt, resultScoreDescTxt, resultScoreShadowTxt, resultScoreTxt, buttonRestart);
    if (shareEnable) {
        resultContainer['addChild'](resultShareShadowTxt, resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp)
    };
    canvasContainer['addChild'](bg, worldContainer, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage['addChild'](canvasContainer);
    resizeCanvas()
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        statusContainer['x'] = offset['x'];
        statusContainer['y'] = offset['y'];
        buttonSettings['x'] = (canvasW - offset['x']) - 60;
        buttonSettings['y'] = offset['y'] + 45;
        var sp64 = 60;
        var sp65 = 0;
        if (curPage != 'game') {
            buttonExit['visible'] = false;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + sp64;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + sp64;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (sp64 * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (sp64 * 2);
                sp65 = 2
            } else {
                sp65 = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (sp64 * (sp65 + 1))
        } else {
            buttonExit['visible'] = true;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + sp64;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + sp64;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (sp64 * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (sp64 * 2);
                sp65 = 2
            } else {
                sp65 = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (sp64 * (sp65 + 1));
            buttonExit['x'] = buttonSettings['x'];
            buttonExit['y'] = buttonSettings['y'] + (sp64 * (sp65 + 2))
        };
        itemTouchUp['x'] = (offset['x'] + 90);
        itemTouchUp['y'] = canvasH - (offset['y'] + 90);
        itemTouchDown['x'] = itemTouchUp['x'] + 110;
        itemTouchDown['y'] = itemTouchUp['y'];
        itemTouchRight['x'] = canvasW - (offset['x'] + 90);
        itemTouchRight['y'] = canvasH - (offset['y'] + 90);
        itemTouchLeft['x'] = itemTouchRight['x'] - 110;
        itemTouchLeft['y'] = itemTouchRight['y']
    }
}

function removeGameCanvas() {
    stage['autoClear'] = true;
    stage['removeAllChildren']();
    stage['update']();
    createjs['Ticker']['removeEventListener']('tick', tick);
    createjs['Ticker']['removeEventListener']('tick', stage)
}

function tick(_0x939dx6d) {
    updateGame();
    stage['update'](_0x939dx6d)
}

function centerReg(sp51) {
    sp51['regX'] = sp51['image']['naturalWidth'] / 2;
    sp51['regY'] = sp51['image']['naturalHeight'] / 2
}

function createHitarea(sp51) {
    sp51['hitArea'] = new createjs.Shape(new createjs.Graphics()['beginFill']('#000')['drawRect'](0, 0, sp51['image']['naturalWidth'], sp51['image']['naturalHeight']))
}
var backgroundData = {
    hills: {
        src: 'assets/background_hills.png'
    },
    sky: {
        src: 'assets/background_sky.png'
    },
    trees: {
        src: 'assets/background_trees.png'
    }
};
var roadData = {
    width: 1800,
    rumbleLength: 2,
    lanes: 3,
    fogDensity: 5,
    fog: '#045b4c',
    light: {
        road: '#434343',
        grass: '#509b50',
        rumble: '#7c4d29',
        lane: '#CCCCCC'
    },
    dark: {
        road: '#444',
        grass: '#5bae5d',
        rumble: '#7c4d29'
    }
};
var playerCarData = {
    left: {
        src: 'assets/car_left.png'
    },
    right: {
        src: 'assets/car_right.png'
    },
    straight: {
        src: 'assets/car_straight.png'
    },
    up_left: {
        src: 'assets/car_up_left.png'
    },
    up_right: {
        src: 'assets/car_up_right.png'
    },
    up_straight: {
        src: 'assets/car_up_straight.png'
    }
};
var spritesData = {
    BILLBOARD01: {
        src: 'assets/billboard_01.png'
    },
    BILLBOARD02: {
        src: 'assets/billboard_02.png'
    },
    BILLBOARD03: {
        src: 'assets/billboard_03.png'
    },
    TREE1: {
        src: 'assets/tree_01.png'
    },
    TREE2: {
        src: 'assets/tree_02.png'
    },
    TREE3: {
        src: 'assets/tree_03.png'
    },
    TREE4: {
        src: 'assets/tree_04.png'
    },
    TREE5: {
        src: 'assets/tree_05.png'
    },
    ROCK1: {
        src: 'assets/rock_01.png'
    },
    ROCK2: {
        src: 'assets/rock_02.png'
    },
    ROCK3: {
        src: 'assets/rock_03.png'
    },
    TRUCK01: {
        src: 'assets/truck_01.png'
    },
    TRUCK02: {
        src: 'assets/truck_02.png'
    },
    JEEP01: {
        src: 'assets/jeep_01.png'
    },
    CAR04: {
        src: 'assets/car_04.png'
    },
    CAR03: {
        src: 'assets/car_03.png'
    },
    CAR02: {
        src: 'assets/car_02.png'
    },
    CAR01: {
        src: 'assets/car_01.png'
    },
    NITRO: {
        src: 'assets/item_power_nitro.png'
    },
    COIN: {
        src: 'assets/item_power_coin.png'
    },
    FUEL: {
        src: 'assets/item_power_fuel.png'
    }
};
spritesData['PLANTS'] = [spritesData['TREE1'], spritesData['TREE2'], spritesData['TREE3'], spritesData['TREE4'], spritesData['TREE5'], spritesData['ROCK1'], spritesData['ROCK2'], spritesData['ROCK3']];
spritesData['CARS'] = [spritesData['CAR01'], spritesData['CAR02'], spritesData['CAR03'], spritesData['CAR04'], spritesData['JEEP01'], spritesData['TRUCK01'], spritesData['TRUCK02']];
spritesData['BILLBOARDS'] = [spritesData['BILLBOARD01'], spritesData['BILLBOARD02'], spritesData['BILLBOARD03']];
var intructionDisplayText = 'Press W,A,S,D to\x0Adrive the car.';
var keyboard_arr = {
    left: [65, 37],
    right: [68, 39],
    up: [87, 38],
    down: [83, 40]
};
var scoreData = {
    text: 'SCORE: [NUMBER]',
    coin: 500
};
var fuelData = {
    text: 'FUEL:',
    total: 100,
    add: 20,
    updateTime: 1,
    decrease: 3,
    bar: {
        width: 200,
        height: 28,
        backgroundColor: '#2f2f2f',
        blankColor: '#fff',
        fillColor: '#25bf1d',
        space: 3
    }
};
var nitroData = {
    maxSpeed: 20000,
    accel: 2800,
    cameraHeight: 1500,
    timer: 5
};
var statusData = {
    start: {
        text: 'GO',
        color: '#fff',
        size: 120
    },
    nitro: {
        text: 'TURBO',
        color: '#f68b1f',
        size: 70
    },
    fuel: {
        text: '+FUEL',
        color: '#39b54a',
        size: 70
    },
    score: {
        text: '+[NUMBER]',
        color: '#fcdb05',
        size: 70
    },
    penalty: {
        text: 'TIMEOUT:\x0A[NUMBER]',
        color: '#ec3e34',
        size: 70
    },
    lowFuel: {
        text: 'LOW FUEL',
        color: '#ff7f00',
        size: 70
    },
    noFuel: {
        text: 'OUT OF FUEL',
        color: '#ec3e34',
        size: 70
    }
};
var exitMessage = 'Are you sure\x0Ayou want to quit?';
var resultTitleText = 'GAME OVER';
var resultScoreText = 'BEST SCORE:';
var shareEnable = true;
var shareText = 'SHARE YOUR SCORE';
var shareTitle = 'Highscore on Speed Racer Game is [SCORE]PTS.';
var shareMessage = '[SCORE]PTS is mine new highscore on Speed Racer Game! Try it now!';
var dt;
var defaultData = {
    width: 768,
    height: 840,
    extraHeight: 184,
    scale: 0.00165,
    centrifugal: 0.3,
    skySpeed: 0.001,
    hillSpeed: 0.002,
    treeSpeed: 0.003,
    skyOffset: 0,
    hillOffset: 0,
    treeOffset: 0,
    segmentLength: 200,
    trackLength: null,
    fieldOfView: 100,
    cameraHeight: 800,
    cameraDepth: null,
    drawDistance: 300,
    playerX: 0,
    playerZ: 0,
    position: 0,
    speed: 0,
    maxSpeed: 0,
    accel: 0,
    breaking: 0,
    decel: 0,
    offRoadDecel: 0,
    offRoadLimit: 0,
    totalCars: 200,
    lastY: 0,
    turnSpeed: 3.5
};
var worldData = {};
var segments = [];
var cars = [];
var background = null;
var sprites = null;
var resolution = null;
var currentLapTime = 0;
var roadLengthData = {
    length: {
        none: 0,
        short: 25,
        medium: 50,
        long: 100
    },
    hill: {
        none: 0,
        low: 20,
        medium: 40,
        high: 60
    },
    curve: {
        none: 0,
        easy: 2,
        medium: 4,
        hard: 6
    }
};
var playerData = {
    score: 0,
    displayScore: 0
};
var gameData = {
    paused: true,
    nitroMode: false,
    nitroTimer: 0,
    fuel: 0,
    fuelUpdate: false,
    accel: false,
    penalty: false,
    penaltyTime: 0,
    brakeSound: false,
    accelSound: false,
    stopSound: false,
    ended: false
};
var keyData = {
    left: false,
    right: false,
    accelerate: false,
    brake: false
};

function buildGameButton() {
    $(window)['focus'](function () {
        if (!buttonSoundOn['visible']) {
            toggleSoundInMute(false)
        };
        if (typeof buttonMusicOn != 'undefined') {
            if (!buttonMusicOn['visible']) {
                toggleMusicInMute(false)
            }
        }
    });
    $(window)['blur'](function () {
        if (!buttonSoundOn['visible']) {
            toggleSoundInMute(true)
        };
        if (typeof buttonMusicOn != 'undefined') {
            if (!buttonMusicOn['visible']) {
                toggleMusicInMute(true)
            }
        }
    });
    itemTouchUp['visible'] = itemTouchDown['visible'] = itemTouchLeft['visible'] = itemTouchRight['visible'] = false;
    if ($['browser']['mobile'] || isTablet) {
        itemTouchUp['visible'] = itemTouchDown['visible'] = itemTouchLeft['visible'] = itemTouchRight['visible'] = true;
        itemTouchUp['addEventListener']('mousedown', function (_0x939dxb8) {
            if (gameData['paused']) {
                return
            };
            keyData['accelerate'] = true
        });
        itemTouchUp['addEventListener']('pressup', function (_0x939dxb8) {
            if (keyData['accelerate']) {
                keyData['accelerate'] = false
            }
        });
        itemTouchDown['addEventListener']('mousedown', function (_0x939dxb8) {
            if (gameData['paused']) {
                return
            };
            keyData['brake'] = true
        });
        itemTouchDown['addEventListener']('pressup', function (_0x939dxb8) {
            if (keyData['brake']) {
                keyData['brake'] = false
            }
        });
        itemTouchLeft['addEventListener']('mousedown', function (_0x939dxb8) {
            if (gameData['paused']) {
                return
            };
            keyData['left'] = true
        });
        itemTouchLeft['addEventListener']('pressup', function (_0x939dxb8) {
            if (keyData['left']) {
                keyData['left'] = false
            }
        });
        itemTouchRight['addEventListener']('mousedown', function (_0x939dxb8) {
            if (gameData['paused']) {
                return
            };
            keyData['right'] = true
        });
        itemTouchRight['addEventListener']('pressup', function (_0x939dxb8) {
            if (keyData['right']) {
                keyData['right'] = false
            }
        })
    } else {
        var _0x939dxb9 = (window['location'] != window['parent']['location']) ? true : false;
        if (_0x939dxb9) {
            this['document']['onkeydown'] = keydown;
            this['document']['onkeyup'] = keyup;
            $(window)['blur'](function () {
                appendFocusFrame()
            });
            appendFocusFrame()
        } else {
            this['document']['onkeydown'] = keydown;
            this['document']['onkeyup'] = keyup
        }
    };
    buttonStart['cursor'] = 'pointer';
    buttonStart['addEventListener']('click', function (_0x939dxb8) {
        playSound('soundClick');
        goPage('game')
    });
    buttonFacebook['cursor'] = 'pointer';
    buttonFacebook['addEventListener']('click', function (_0x939dxb8) {
        share('facebook')
    });
    buttonTwitter['cursor'] = 'pointer';
    buttonTwitter['addEventListener']('click', function (_0x939dxb8) {
        share('twitter')
    });
    buttonWhatsapp['cursor'] = 'pointer';
    buttonWhatsapp['addEventListener']('click', function (_0x939dxb8) {
        share('whatsapp')
    });
    buttonSoundOff['cursor'] = 'pointer';
    buttonSoundOff['addEventListener']('click', function (_0x939dxb8) {
        toggleSoundMute(true)
    });
    buttonSoundOn['cursor'] = 'pointer';
    buttonSoundOn['addEventListener']('click', function (_0x939dxb8) {
        toggleSoundMute(false)
    });
    if (typeof buttonMusicOff != 'undefined') {
        buttonMusicOff['cursor'] = 'pointer';
        buttonMusicOff['addEventListener']('click', function (_0x939dxb8) {
            toggleMusicMute(true)
        })
    };
    if (typeof buttonMusicOn != 'undefined') {
        buttonMusicOn['cursor'] = 'pointer';
        buttonMusicOn['addEventListener']('click', function (_0x939dxb8) {
            toggleMusicMute(false)
        })
    };
    buttonFullscreen['cursor'] = 'pointer';
    buttonFullscreen['addEventListener']('click', function (_0x939dxb8) {
        toggleFullScreen()
    });
    buttonExit['cursor'] = 'pointer';
    buttonExit['addEventListener']('click', function (_0x939dxb8) {
        playSound('soundClick');
        toggleConfirm(true)
    });
    buttonSettings['cursor'] = 'pointer';
    buttonSettings['addEventListener']('click', function (_0x939dxb8) {
        toggleOption()
    });
    buttonConfirm['cursor'] = 'pointer';
    buttonConfirm['addEventListener']('click', function (_0x939dxb8) {
        playSound('soundClick');
        toggleConfirm(false);
        stopGame(true);
        goPage('main')
    });
    buttonCancel['cursor'] = 'pointer';
    buttonCancel['addEventListener']('click', function (_0x939dxb8) {
        playSound('soundClick');
        toggleConfirm(false)
    });
    buttonRestart['cursor'] = 'pointer';
    buttonRestart['addEventListener']('click', function (_0x939dxb8) {
        playSound('soundClick');
        resetGame();
        goPage('game')
    });
    preventScrolling()
}

function preventScrolling() {
    var _0x939dxbb = [32, 38, 37, 40, 39];
    $(window)['on']('keydown', function (_0x939dx6d) {
        if (_0x939dxbb['indexOf'](_0x939dx6d['keyCode']) != -1) {
            _0x939dx6d['preventDefault']()
        }
    })
}

function appendFocusFrame() {
    $('#mainHolder')['prepend']('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
    $('#focus')['click'](function () {
        $('#focus')['remove']()
    })
}

function keydown(_0x939dx6d) {
    if (gameData['paused']) {
        return
    };
    if (keyboard_arr['left']['indexOf'](_0x939dx6d['keyCode']) != -1) {
        keyData['left'] = true
    };
    if (keyboard_arr['right']['indexOf'](_0x939dx6d['keyCode']) != -1) {
        keyData['right'] = true
    };
    if (keyboard_arr['up']['indexOf'](_0x939dx6d['keyCode']) != -1) {
        keyData['accelerate'] = true
    };
    if (keyboard_arr['down']['indexOf'](_0x939dx6d['keyCode']) != -1) {
        keyData['brake'] = true
    }
}

function keyup(_0x939dx6d) {
    if (gameData['paused']) {
        return
    };
    if (keyboard_arr['left']['indexOf'](_0x939dx6d['keyCode']) != -1 && keyData['left']) {
        keyData['left'] = false
    };
    if (keyboard_arr['right']['indexOf'](_0x939dx6d['keyCode']) != -1 && keyData['right']) {
        keyData['right'] = false
    };
    if (keyboard_arr['up']['indexOf'](_0x939dx6d['keyCode']) != -1 && keyData['accelerate']) {
        keyData['accelerate'] = false
    };
    if (keyboard_arr['down']['indexOf'](_0x939dx6d['keyCode']) != -1 && keyData['brake']) {
        keyData['brake'] = false
    }
}
var curPage = '';

function goPage(sp81) {
    curPage = sp81;
    mainContainer['visible'] = false;
    gameContainer['visible'] = false;
    resultContainer['visible'] = false;
    TweenMax['killTweensOf'](playerData);
    var sp82 = null;
    switch (sp81) {
    case 'main':
        sp82 = mainContainer;
        resetGame();
        break;
    case 'game':
        sp82 = gameContainer;
        startGame();
        break;
    case 'result':
        sp82 = resultContainer;
        stopGame(true);
        playSound('soundOver');
        TweenMax['to'](playerData, 1, {
            displayScore: playerData['score'],
            overwrite: true,
            onUpdate: function () {
                resultScoreTxt['text'] = addCommas(Math['floor'](playerData['displayScore']));
                resultScoreShadowTxt['text'] = addCommas(Math['floor'](playerData['displayScore']))
            }
        });
        saveGame(playerData['score']);
        break
    };
    if (sp82 != null) {
        sp82['visible'] = true;
        sp82['alpha'] = 0;
        TweenMax['to'](sp82, 0.5, {
            alpha: 1,
            overwrite: true
        })
    };
    resizeCanvas()
}

function toggleConfirm(sp48) {
    confirmContainer['visible'] = sp48;
    if (sp48) {
        TweenMax['pauseAll'](true, true);
        gameData['paused'] = true
    } else {
        TweenMax['resumeAll'](true, true);
        if (curPage == 'game') {
            gameData['paused'] = false
        }
    }
}

function startGame() {
    playerData['score'] = 0;
    gameData['nitroMode'] = false;
    gameData['fuel'] = fuelData['total'];
    gameData['fuelUpdate'] = false;
    gameData['paused'] = false;
    gameData['accel'] = false;
    gameData['penalty'] = false;
    gameData['brakeSound'] = false;
    gameData['accelSound'] = false;
    gameData['stopSound'] = false;
    gameData['ended'] = false;
    defaultData['playerX'] = 0;
    defaultData['speed'] = 0;
    instructionShadowTxt['visible'] = instructionTxt['visible'] = false;
    if ($['browser']['mobile'] || isTablet) {} else {
        instructionShadowTxt['visible'] = instructionTxt['visible'] = true
    };
    updateGameText(statusData['start']['text'], statusData['start']['color'], statusData['start']['size'], 0);
    updateGameStatus()
}

function stopGame() {
    gameData['paused'] = true;
    TweenMax['killAll']()
}

function saveGame(sp87) {
    if (typeof toggleScoreboardSave == 'function') {
        $['scoreData']['score'] = sp87;
        if (typeof type != 'undefined') {
            $['scoreData']['type'] = type
        };
        toggleScoreboardSave(true)
    }
}

function updateGame() {
    updateWorld();
    updateFuel();
    if (!gameData['paused']) {
        if (defaultData['speed'] > 0) {
            if (gameData['penalty']) {
                gameData['penalty'] = false;
                togglePenaltyTimer(false)
            };
            if (!gameData['accel']) {
                gameData['accel'] = true;
                instructionShadowTxt['visible'] = instructionTxt['visible'] = false;
                updateGameText('')
            }
        };
        if (defaultData['speed'] == 0 && gameData['accel'] && !gameData['penalty']) {
            gameData['penalty'] = true;
            togglePenaltyTimer(true)
        };
        playerData['score'] += Math['floor']((5 * Math['round'](defaultData['speed'] / 500)) * 0.03);
        updateGameStatus()
    }
}

function updateFuel() {
    if (defaultData['speed'] > 0 && !gameData['fuelUpdate']) {
        gameData['fuelUpdate'] = true;
        TweenMax['to'](fuelData, fuelData['updateTime'], {
            overwrite: true,
            onComplete: function () {
                gameData['fuel'] -= fuelData['decrease'];
                gameData['fuel'] = gameData['fuel'] < 0 ? 0 : gameData['fuel'];
                gameData['fuelUpdate'] = false;
                updateGameStatus()
            }
        })
    }
}

function togglePenaltyTimer(sp48) {
    if (sp48) {
        gameData['penaltyTime'] = 41;
        updatePenaltyTimer()
    } else {
        TweenMax['killTweensOf'](gameContainer);
        updateGameText('')
    }
}

function updatePenaltyTimer() {
    gameData['penaltyTime'] -= 1;
    var sp8c = false;
    if (gameData['penaltyTime'] < 31) {
        sp8c = true
    };
    if (String(gameData['penaltyTime'] * 0.1)['indexOf']('.') == -1 && sp8c) {
        playSound('soundTick')
    };
    if (gameData['penaltyTime'] <= 0) {
        updateGameText(statusData['penalty']['text']['replace']('[NUMBER]', '0.00'), statusData['penalty']['color'], statusData['penalty']['size'], 0);
        playSound('soundTickOver');
        endGame()
    } else {
        if (sp8c) {
            var sp8d = (String(gameData['penaltyTime'] * 0.1) + '000')['substring'](0, 4);
            updateGameText(statusData['penalty']['text']['replace']('[NUMBER]', sp8d), statusData['penalty']['color'], statusData['penalty']['size'], 0)
        };
        TweenMax['to'](gameContainer, 0.1, {
            overwrite: true,
            onComplete: updatePenaltyTimer
        })
    }
}

function updateWorld() {
    updateSprites();
    renderWorld()
}

function updateSprites() {
    var sp5d, _0x939dxd0, _0x939dxd1, _0x939dxd2, _0x939dxd3;
    var dt = (1 / 60);
    var _0x939dxd4 = findSegment((defaultData['position'] + defaultData['playerZ']));
    var _0x939dxd5 = playerCarData['straight']['w'] * defaultData['scale'];
    var _0x939dxd6 = defaultData['speed'] / worldData['maxSpeed'];
    var _0x939dxd7 = dt * defaultData['turnSpeed'] * _0x939dxd6;
    var _0x939dxd8 = defaultData['position'];
    updateCars(dt, _0x939dxd4, _0x939dxd5);
    defaultData['position'] = getIncrease(defaultData['position'], dt * defaultData['speed'], defaultData['trackLength']);
    if (keyData['left']) {
        defaultData['playerX'] = defaultData['playerX'] - _0x939dxd7
    } else {
        if (keyData['right']) {
            defaultData['playerX'] = defaultData['playerX'] + _0x939dxd7
        }
    };
    defaultData['playerX'] = defaultData['playerX'] - (_0x939dxd7 * _0x939dxd6 * _0x939dxd4['curve'] * defaultData['centrifugal']);
    if (keyData['accelerate']) {
        defaultData['speed'] = getAccelerate(defaultData['speed'], worldData['accel'], dt)
    } else {
        if (keyData['brake']) {
            defaultData['speed'] = getAccelerate(defaultData['speed'], defaultData['breaking'], dt)
        } else {
            defaultData['speed'] = getAccelerate(defaultData['speed'], defaultData['decel'], dt)
        }
    };
    if ((defaultData['playerX'] < -1) || (defaultData['playerX'] > 1)) {
        if (defaultData['speed'] > defaultData['offRoadLimit']) {
            defaultData['speed'] = getAccelerate(defaultData['speed'], defaultData['offRoadDecel'], dt)
        };
        for (sp5d = 0; sp5d < _0x939dxd4['sprites']['length']; sp5d++) {
            _0x939dxd2 = _0x939dxd4['sprites'][sp5d];
            _0x939dxd3 = _0x939dxd2['source']['w'] * defaultData['scale'];
            if (getOverlap(defaultData['playerX'], _0x939dxd5, _0x939dxd2['offset'] + _0x939dxd3 / 2 * (_0x939dxd2['offset'] > 0 ? 1 : -1), _0x939dxd3)) {
                defaultData['speed'] = worldData['maxSpeed'] / 5;
                defaultData['position'] = getIncrease(_0x939dxd4['p1']['world']['z'], -defaultData['playerZ'], defaultData['trackLength']);
                break
            }
        }
    };
    if (!gameData['paused']) {
        for (sp5d = 0; sp5d < _0x939dxd4['sprites']['length']; sp5d++) {
            _0x939dxd2 = _0x939dxd4['sprites'][sp5d];
            if (_0x939dxd2['active']) {
                _0x939dxd3 = _0x939dxd2['source']['w'] * defaultData['scale'];
                if (getOverlap(defaultData['playerX'], _0x939dxd5, _0x939dxd2['offset'] + _0x939dxd3 / 2 * (_0x939dxd2['offset'] > 0 ? 1 : -1), _0x939dxd3)) {
                    if (_0x939dxd2['source']['id'] == 'NITRO') {
                        _0x939dxd2['active'] = false;
                        startNitro()
                    } else {
                        if (_0x939dxd2['source']['id'] == 'COIN') {
                            _0x939dxd2['active'] = false;
                            addScore()
                        } else {
                            if (_0x939dxd2['source']['id'] == 'FUEL') {
                                _0x939dxd2['active'] = false;
                                addFuel()
                            }
                        }
                    }
                }
            }
        }
    };
    playCarSound();
    for (sp5d = 0; sp5d < _0x939dxd4['cars']['length']; sp5d++) {
        _0x939dxd0 = _0x939dxd4['cars'][sp5d];
        _0x939dxd1 = _0x939dxd0['sprite']['w'] * defaultData['scale'];
        if (defaultData['speed'] > _0x939dxd0['speed']) {
            if (getOverlap(defaultData['playerX'], _0x939dxd5, _0x939dxd0['offset'], _0x939dxd1, 0.8)) {
                playSound('soundImpact');
                defaultData['speed'] = _0x939dxd0['speed'] * (_0x939dxd0['speed'] / defaultData['speed']);
                defaultData['position'] = getIncrease(_0x939dxd0['z'], -defaultData['playerZ'], defaultData['trackLength']);
                break
            }
        }
    };
    defaultData['playerX'] = getLimit(defaultData['playerX'], -2, 2);
    defaultData['speed'] = getLimit(defaultData['speed'], 0, worldData['maxSpeed']);
    defaultData['skyOffset'] = getIncrease(defaultData['skyOffset'], defaultData['skySpeed'] * _0x939dxd4['curve'] * (defaultData['position'] - _0x939dxd8) / defaultData['segmentLength'], 1);
    defaultData['hillOffset'] = getIncrease(defaultData['hillOffset'], defaultData['hillSpeed'] * _0x939dxd4['curve'] * (defaultData['position'] - _0x939dxd8) / defaultData['segmentLength'], 1);
    defaultData['treeOffset'] = getIncrease(defaultData['treeOffset'], defaultData['treeSpeed'] * _0x939dxd4['curve'] * (defaultData['position'] - _0x939dxd8) / defaultData['segmentLength'], 1);
    if (defaultData['position'] > defaultData['playerZ']) {
        if (currentLapTime && (_0x939dxd8 < defaultData['playerZ'])) {
            resetCollectItems()
        } else {
            currentLapTime += dt
        }
    }
}

function playCarSound() {
    gameData['brakeSound'] = false;
    if (keyData['left'] || keyData['right'] || keyData['brake']) {
        gameData['brakeSound'] = true
    };
    if (keyData['accelerate']) {
        if (!gameData['accelSound']) {
            gameData['accelSound'] = true;
            playSoundID('soundSpeedUp', loopCarEngine);
            stopSoundID('soundSlowDown')
        }
    } else {
        if (gameData['accelSound']) {
            gameData['accelSound'] = false;
            stopSoundID('soundSpeedUp');
            playSoundID('soundSlowDown');
            stopSoundLoop('soundEngine')
        }
    };
    if (gameData['brakeSound'] && defaultData['speed'] > 0) {
        playSoundLoop('soundBrake')
    } else {
        stopSoundLoop('soundBrake')
    }
}

function loopCarEngine() {
    playSoundLoop('soundEngine')
}

function updateCars(dt, _0x939dxd4, _0x939dxd5) {
    var sp5d, _0x939dxd0, _0x939dxdc, _0x939dxdd;
    for (sp5d = 0; sp5d < cars['length']; sp5d++) {
        _0x939dxd0 = cars[sp5d];
        _0x939dxdc = findSegment(_0x939dxd0['z']);
        _0x939dxd0['offset'] = _0x939dxd0['offset'] + updateCarOffset(_0x939dxd0, _0x939dxdc, _0x939dxd4, _0x939dxd5);
        _0x939dxd0['z'] = getIncrease(_0x939dxd0['z'], dt * _0x939dxd0['speed'], defaultData['trackLength']);
        _0x939dxd0['percent'] = percentRemaining(_0x939dxd0['z'], defaultData['segmentLength']);
        _0x939dxdd = findSegment(_0x939dxd0['z']);
        if (_0x939dxdc != _0x939dxdd) {
            index = _0x939dxdc['cars']['indexOf'](_0x939dxd0);
            _0x939dxdc['cars']['splice'](index, 1);
            _0x939dxdd['cars']['push'](_0x939dxd0)
        }
    }
}

function updateCarOffset(_0x939dxd0, _0x939dxdf, _0x939dxd4, _0x939dxd5) {
    var sp70, sp71, sp72, sp73, sp74, sp75, sp76 = 20,
        _0x939dxd1 = _0x939dxd0['sprite']['w'] * defaultData['scale'];
    if ((_0x939dxdf['index'] - _0x939dxd4['index']) > defaultData['drawDistance']) {
        return 0
    };
    for (sp70 = 1; sp70 < sp76; sp70++) {
        sp73 = segments[(_0x939dxdf['index'] + sp70) % segments['length']];
        if ((sp73 === _0x939dxd4) && (_0x939dxd0['speed'] > defaultData['speed']) && (getOverlap(defaultData['playerX'], _0x939dxd5, _0x939dxd0['offset'], _0x939dxd1, 1.2))) {
            if (defaultData['playerX'] > 0.5) {
                sp72 = -1
            } else {
                if (defaultData['playerX'] < -0.5) {
                    sp72 = 1
                } else {
                    sp72 = (_0x939dxd0['offset'] > defaultData['playerX']) ? 1 : -1
                }
            };
            return sp72 * 1 / sp70 * (_0x939dxd0['speed'] - defaultData['speed']) / worldData['maxSpeed']
        };
        for (sp71 = 0; sp71 < sp73['cars']['length']; sp71++) {
            sp74 = sp73['cars'][sp71];
            sp75 = sp74['sprite']['w'] * defaultData['scale'];
            if ((_0x939dxd0['speed'] > sp74['speed']) && getOverlap(_0x939dxd0['offset'], _0x939dxd1, sp74['offset'], sp75, 1.2)) {
                if (sp74['offset'] > 0.5) {
                    sp72 = -1
                } else {
                    if (sp74['offset'] < -0.5) {
                        sp72 = 1
                    } else {
                        sp72 = (_0x939dxd0['offset'] > sp74['offset']) ? 1 : -1
                    }
                };
                return sp72 * 1 / sp70 * (_0x939dxd0['speed'] - sp74['speed']) / worldData['maxSpeed']
            }
        }
    };
    if (_0x939dxd0['offset'] < -0.9) {
        return 0.1
    } else {
        if (_0x939dxd0['offset'] > 0.9) {
            return -0.1
        } else {
            return 0
        }
    }
}

function renderWorld() {
    var sp78 = findSegment(defaultData['position']);
    var sp79 = percentRemaining(defaultData['position'], defaultData['segmentLength']);
    var _0x939dxd4 = findSegment(defaultData['position'] + defaultData['playerZ']);
    var sp7a = percentRemaining(defaultData['position'] + defaultData['playerZ'], defaultData['segmentLength']);
    var sp7b = getInterpolate(_0x939dxd4['p1']['world']['y'], _0x939dxd4['p2']['world']['y'], sp7a);
    var sp7c = defaultData['height'] + defaultData['extraHeight'];
    var sp53 = 0;
    var _0x939dxd7 = -(sp78['curve'] * sp79);
    worldContainer['removeAllChildren']();
    renderBackground(background, defaultData['width'], defaultData['height'], backgroundData['sky'], defaultData['skyOffset'], resolution * defaultData['skySpeed'] * sp7b);
    renderBackground(background, defaultData['width'], defaultData['height'], backgroundData['hills'], defaultData['hillOffset'], resolution * defaultData['hillSpeed'] * sp7b);
    renderBackground(background, defaultData['width'], defaultData['height'], backgroundData['trees'], defaultData['treeOffset'], resolution * defaultData['treeSpeed'] * sp7b);
    var sp5d, sp70, sp73, _0x939dxd0, _0x939dxd2, sp7d, sp7e, sp7f;
    for (sp5d = 0; sp5d < defaultData['drawDistance']; sp5d++) {
        sp73 = segments[(sp78['index'] + sp5d) % segments['length']];
        sp73['looped'] = sp73['index'] < sp78['index'];
        sp73['fog'] = exponentialFog(sp5d / defaultData['drawDistance'], roadData['fogDensity']);
        sp73['clip'] = sp7c;
        getProject(sp73['p1'], (defaultData['playerX'] * roadData['width']) - sp53, sp7b + worldData['cameraHeight'], defaultData['position'] - (sp73['looped'] ? defaultData['trackLength'] : 0), defaultData['cameraDepth'], defaultData['width'], defaultData['height'], roadData['width']);
        getProject(sp73['p2'], (defaultData['playerX'] * roadData['width']) - sp53 - _0x939dxd7, sp7b + worldData['cameraHeight'], defaultData['position'] - (sp73['looped'] ? defaultData['trackLength'] : 0), defaultData['cameraDepth'], defaultData['width'], defaultData['height'], roadData['width']);
        sp53 = sp53 + _0x939dxd7;
        _0x939dxd7 = _0x939dxd7 + sp73['curve'];
        if ((sp73['p1']['camera']['z'] <= defaultData['cameraDepth']) || (sp73['p2']['screen']['y'] >= sp73['p1']['screen']['y']) || (sp73['p2']['screen']['y'] >= sp7c)) {
            continue
        };
        defaultData['lastY'] = sp73['p1']['screen']['y'];
        renderSegment(defaultData['width'], roadData['lanes'], sp73['p1']['screen']['x'], sp73['p1']['screen']['y'], sp73['p1']['screen']['w'], sp73['p2']['screen']['x'], sp73['p2']['screen']['y'], sp73['p2']['screen']['w'], sp73['fog'], sp73['color']);
        sp7c = sp73['p1']['screen']['y']
    };
    for (sp5d = (defaultData['drawDistance'] - 1); sp5d > 0; sp5d--) {
        sp73 = segments[(sp78['index'] + sp5d) % segments['length']];
        for (sp70 = 0; sp70 < sp73['cars']['length']; sp70++) {
            _0x939dxd0 = sp73['cars'][sp70];
            _0x939dxd2 = _0x939dxd0['sprite'];
            sp7d = getInterpolate(sp73['p1']['screen']['scale'], sp73['p2']['screen']['scale'], _0x939dxd0['percent']);
            sp7e = getInterpolate(sp73['p1']['screen']['x'], sp73['p2']['screen']['x'], _0x939dxd0['percent']) + (sp7d * _0x939dxd0['offset'] * roadData['width'] * defaultData['width'] / 2);
            sp7f = getInterpolate(sp73['p1']['screen']['y'], sp73['p2']['screen']['y'], _0x939dxd0['percent']);
            renderSprite(defaultData['width'], defaultData['height'], resolution, roadData['width'], sprites, _0x939dxd0['sprite'], sp7d, sp7e, sp7f, -0.5, -1, sp73['clip'])
        };
        for (sp70 = 0; sp70 < sp73['sprites']['length']; sp70++) {
            _0x939dxd2 = sp73['sprites'][sp70];
            sp7d = sp73['p1']['screen']['scale'];
            sp7e = sp73['p1']['screen']['x'] + (sp7d * _0x939dxd2['offset'] * roadData['width'] * defaultData['width'] / 2);
            sp7f = sp73['p1']['screen']['y'];
            if (_0x939dxd2['active']) {
                renderSprite(defaultData['width'], defaultData['height'], resolution, roadData['width'], sprites, _0x939dxd2['source'], sp7d, sp7e, sp7f, (_0x939dxd2['offset'] < 0 ? -1 : 0), -1, sp73['clip'])
            }
        };
        if (sp73 == _0x939dxd4) {
            renderPlayer(defaultData['width'], defaultData['height'], resolution, roadData['width'], sprites, defaultData['speed'] / worldData['maxSpeed'], defaultData['cameraDepth'] / defaultData['playerZ'], defaultData['width'] / 2, (defaultData['height'] / 2) - (defaultData['cameraDepth'] / defaultData['playerZ'] * getInterpolate(_0x939dxd4['p1']['camera']['y'], _0x939dxd4['p2']['camera']['y'], sp7a) * defaultData['height'] / 2), defaultData['speed'] * (keyData['left'] ? -1 : keyData['right'] ? 1 : 0), _0x939dxd4['p2']['world']['y'] - _0x939dxd4['p1']['world']['y'])
        }
    }
}

function findSegment(_0x939dxf1) {
    return segments[Math['floor'](_0x939dxf1 / defaultData['segmentLength']) % segments['length']]
}

function getLastY() {
    return (segments['length'] == 0) ? 0 : segments[segments['length'] - 1]['p2']['world']['y']
}

function addSegment(_0x939dxf4, _0x939dxf5) {
    var sp5d = segments['length'];
    segments['push']({
        index: sp5d,
        p1: {
            world: {
                y: getLastY(),
                z: sp5d * defaultData['segmentLength']
            },
            camera: {},
            screen: {}
        },
        p2: {
            world: {
                y: _0x939dxf5,
                z: (sp5d + 1) * defaultData['segmentLength']
            },
            camera: {},
            screen: {}
        },
        curve: _0x939dxf4,
        sprites: [],
        cars: [],
        color: Math['floor'](sp5d / roadData['rumbleLength']) % 2 ? roadData['dark'] : roadData['light']
    })
}

function addSprite(sp5d, _0x939dxd2, offset) {
    segments[sp5d]['sprites']['push']({
        source: _0x939dxd2,
        offset: offset,
        active: true
    })
}

function addRoad(_0x939dxf9, _0x939dxfa, _0x939dxfb, _0x939dxf4, _0x939dxf5) {
    var _0x939dxfc = getLastY();
    var _0x939dxfd = _0x939dxfc + (toInt(_0x939dxf5, 0) * defaultData['segmentLength']);
    var sp5d, sp5e = _0x939dxf9 + _0x939dxfa + _0x939dxfb;
    for (sp5d = 0; sp5d < _0x939dxf9; sp5d++) {
        addSegment(easeIn(0, _0x939dxf4, sp5d / _0x939dxf9), easeInOut(_0x939dxfc, _0x939dxfd, sp5d / sp5e))
    };
    for (sp5d = 0; sp5d < _0x939dxfa; sp5d++) {
        addSegment(_0x939dxf4, easeInOut(_0x939dxfc, _0x939dxfd, (_0x939dxf9 + sp5d) / sp5e))
    };
    for (sp5d = 0; sp5d < _0x939dxfb; sp5d++) {
        addSegment(easeInOut(_0x939dxf4, 0, sp5d / _0x939dxfb), easeInOut(_0x939dxfc, _0x939dxfd, (_0x939dxf9 + _0x939dxfa + sp5d) / sp5e))
    }
}

function addRoadType(_0x939dxff, sp500, sp28, _0x939dxf4) {
    switch (_0x939dxff) {
    case 'straight':
        sp500 = sp500 || roadLengthData['length']['medium'];
        addRoad(sp500, sp500, sp500, 0, 0);
        break;
    case 'hill':
        sp500 = sp500 || roadLengthData['length']['medium'];
        sp28 = sp28 || roadLengthData['hill']['medium'];
        _0x939dxf4 = 0;
        addRoad(sp500, sp500, sp500, 0, sp28);
        break;
    case 'curve':
        sp500 = sp500 || roadLengthData['length']['medium'];
        _0x939dxf4 = _0x939dxf4 || roadLengthData['curve']['medium'];
        sp28 = sp28 || roadLengthData['hill']['none'];
        addRoad(sp500, sp500, sp500, _0x939dxf4, sp28);
        break;
    case 'lowRollingHills':
        sp500 = sp500 || roadLengthData['length']['short'];
        sp28 = sp28 || roadLengthData['hill']['low'];
        addRoad(sp500, sp500, sp500, 0, sp28 / 2);
        addRoad(sp500, sp500, sp500, 0, -sp28);
        addRoad(sp500, sp500, sp500, roadLengthData['curve']['easy'], sp28);
        addRoad(sp500, sp500, sp500, 0, 0);
        addRoad(sp500, sp500, sp500, -roadLengthData['curve']['easy'], sp28 / 2);
        addRoad(sp500, sp500, sp500, 0, 0);
        break;
    case 'sCurves':
        addRoad(roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['length']['medium'], -roadLengthData['curve']['easy'], roadLengthData['hill']['none']);
        addRoad(roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['curve']['medium'], roadLengthData['hill']['medium']);
        addRoad(roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['curve']['easy'], -roadLengthData['hill']['low']);
        addRoad(roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['length']['medium'], -roadLengthData['curve']['easy'], roadLengthData['hill']['medium']);
        addRoad(roadLengthData['length']['medium'], roadLengthData['length']['medium'], roadLengthData['length']['medium'], -roadLengthData['curve']['medium'], -roadLengthData['hill']['medium']);
        break;
    case 'bumps':
        addRoad(10, 10, 10, 0, 5);
        addRoad(10, 10, 10, 0, -2);
        addRoad(10, 10, 10, 0, -5);
        addRoad(10, 10, 10, 0, 8);
        addRoad(10, 10, 10, 0, 5);
        addRoad(10, 10, 10, 0, -7);
        addRoad(10, 10, 10, 0, 5);
        addRoad(10, 10, 10, 0, -2);
        break;
    case 'end':
        sp500 = sp500 || 200;
        addRoad(sp500, sp500, sp500, -roadLengthData['curve']['easy'], -getLastY() / defaultData['segmentLength']);
        break
    }
}

function resetGame() {
    resetWorld();
    resetRoad()
}

function resetWorld() {
    defaultData['maxSpeed'] = defaultData['segmentLength'] / (1 / 60);
    defaultData['accel'] = defaultData['maxSpeed'] / 5;
    defaultData['breaking'] = -defaultData['maxSpeed'];
    defaultData['decel'] = -defaultData['maxSpeed'] / 5;
    defaultData['offRoadDecel'] = -defaultData['maxSpeed'] / 2;
    defaultData['offRoadLimit'] = defaultData['maxSpeed'] / 4;
    defaultData['cameraDepth'] = 1 / Math['tan']((defaultData['fieldOfView'] / 2) * Math['PI'] / 180);
    defaultData['playerZ'] = (defaultData['cameraHeight'] * defaultData['cameraDepth']);
    resolution = defaultData['height'] / 1024;
    for (var _0x939dx8e in defaultData) {
        worldData[_0x939dx8e] = defaultData[_0x939dx8e]
    }
}

function resetRoad() {
    segments = [];
    addRoadType('straight', roadLengthData['length']['long']);
    for (var sp5d = 0; sp5d < 14; sp5d++) {
        var sp504 = Math['floor'](Math['random']() * 8) + 1;
        if (sp504 == 1) {
            addRoadType('lowRollingHills')
        } else {
            if (sp504 == 2) {
                addRoadType('sCurves')
            } else {
                if (sp504 == 3) {
                    addRoadType('bumps')
                } else {
                    if (sp504 == 4) {
                        addRoadType('curve', roadLengthData['length']['long'] * 2, roadLengthData['hill']['medium'], roadLengthData['curve']['medium'])
                    } else {
                        if (sp504 == 5) {
                            addRoadType('curve', roadLengthData['length']['long'], roadLengthData['hill']['none'], roadLengthData['curve']['medium'])
                        } else {
                            if (sp504 == 6) {
                                addRoadType('straight', '')
                            } else {
                                if (sp504 == 7) {
                                    addRoadType('hill', roadLengthData['length']['medium'], roadLengthData['hill']['hight'])
                                } else {
                                    if (sp504 == 8) {
                                        addRoadType('hill', roadLengthData['length']['long'], roadLengthData['hill']['medium'])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    addRoadType('end');
    resetSprites();
    resetCars();
    defaultData['trackLength'] = segments['length'] * defaultData['segmentLength']
}

function resetSprites() {
    for (var sp5d = 10; sp5d < segments['length']; sp5d += 3) {
        addSprite(sp5d, randomChoice(spritesData.PLANTS), randomChoice([1, -1]) * (1.2 + Math['random']() * 5))
    };
    if (spritesData['BILLBOARDS']['length'] > 0) {
        for (var sp5d = 100; sp5d < segments['length']; sp5d += (300 + Math['floor'](Math['random']() * 100))) {
            addSprite(sp5d, randomChoice(spritesData.BILLBOARDS), randomChoice([1, -1]) * (1.2))
        }
    };
    resetCollectItems()
}

function resetCollectItems() {
    for (var sp5d = 0; sp5d < segments['length']; sp5d++) {
        var sp507 = segments[sp5d];
        for (var sp508 = 0; sp508 < sp507['sprites']['length']; sp508++) {
            var _0x939dxd2 = sp507['sprites'][sp508];
            if (_0x939dxd2['source']['id'] == 'NITRO' || _0x939dxd2['source']['id'] == 'COIN' || _0x939dxd2['source']['id'] == 'FUEL') {
                sp507['sprites']['splice'](sp508, 1);
                sp508--
            }
        }
    };
    for (var sp5d = randomInt(300, 400); sp5d < segments['length']; sp5d += (750 + Math['floor'](Math['random']() * 200))) {
        addSprite(sp5d, spritesData.NITRO, randomChoice([1, -1]) * (0.1 + Math['random']() * 0.3))
    };
    for (var sp5d = randomInt(400, 500); sp5d < segments['length']; sp5d += (400 + Math['floor'](Math['random']() * 100))) {
        addSprite(sp5d, spritesData.FUEL, randomChoice([1, -1]) * (0.1 + Math['random']() * 0.3))
    };
    for (var sp5d = randomInt(20, 50); sp5d < segments['length']; sp5d += (300 + Math['floor'](Math['random']() * 50))) {
        addSprite(sp5d, spritesData.COIN, randomChoice([1, -1]) * (0.1 + Math['random']() * 0.3))
    }
}

function resetCars() {
    cars = [];
    var sp5d, _0x939dxd0, sp73, offset, _0x939dxf1, _0x939dxd2, sp50a;
    for (var sp5d = 0; sp5d < defaultData['totalCars']; sp5d++) {
        offset = Math['random']() * randomChoice([-0.8, 0.8]);
        _0x939dxf1 = Math['floor'](Math['random']() * segments['length']) * defaultData['segmentLength'];
        _0x939dxd2 = randomChoice(spritesData.CARS);
        sp50a = worldData['maxSpeed'] / 4 + Math['random']() * worldData['maxSpeed'] / (_0x939dxd2 == spritesData['SEMI'] ? 4 : 2);
        _0x939dxd0 = {
            offset: offset,
            z: _0x939dxf1,
            sprite: _0x939dxd2,
            speed: sp50a
        };
        sp73 = findSegment(_0x939dxd0['z']);
        sp73['cars']['push'](_0x939dxd0);
        cars['push'](_0x939dxd0)
    }
}

function renderPolygon(sp2b, sp50c, sp2d, sp50d, sp50e, sp50f, sp510, sp511, sp512) {
    var sp513 = new createjs.Shape();
    sp513['graphics']['beginFill'](sp512)['beginStroke']()['moveTo'](sp2b, sp50c)['lineTo'](sp2d, sp50d)['lineTo'](sp50e, sp50f)['lineTo'](sp510, sp511)['endStroke']();
    worldContainer['addChild'](sp513)
}

function renderSegment(sp27, sp515, sp2b, sp50c, sp2c, sp2d, sp50d, sp2e, sp516, sp512) {
    var sp517 = rumbleWidth(sp2c, sp515),
        sp518 = rumbleWidth(sp2e, sp515),
        sp519 = laneMarkerWidth(sp2c, sp515),
        sp51a = laneMarkerWidth(sp2e, sp515),
        sp51b, sp51c, sp51d, sp51e, sp51f;
    var sp513 = new createjs.Shape();
    sp513['graphics']['beginFill'](sp512['grass'])['drawRect'](0, sp50d, sp27, sp50c - sp50d);
    worldContainer['addChild'](sp513);
    renderPolygon(sp2b - sp2c - sp517, sp50c, sp2b - sp2c, sp50c, sp2d - sp2e, sp50d, sp2d - sp2e - sp518, sp50d, sp512['rumble']);
    renderPolygon(sp2b + sp2c + sp517, sp50c, sp2b + sp2c, sp50c, sp2d + sp2e, sp50d, sp2d + sp2e + sp518, sp50d, sp512['rumble']);
    renderPolygon(sp2b - sp2c, sp50c, sp2b + sp2c, sp50c, sp2d + sp2e, sp50d, sp2d - sp2e, sp50d, sp512['road']);
    if (sp512['lane']) {
        sp51b = sp2c * 2 / sp515;
        sp51c = sp2e * 2 / sp515;
        sp51d = sp2b - sp2c + sp51b;
        sp51e = sp2d - sp2e + sp51c;
        for (sp51f = 1; sp51f < sp515; sp51d += sp51b, sp51e += sp51c, sp51f++) {
            renderPolygon(sp51d - sp519 / 2, sp50c, sp51d + sp519 / 2, sp50c, sp51e + sp51a / 2, sp50d, sp51e - sp51a / 2, sp50d, sp512['lane'])
        }
    };
    renderFog(0, sp50c, sp27, sp50d - sp50c, sp516)
}

function renderBackground(background, sp27, sp28, sp521, sp522, offset) {
    var sp523 = $['background'][sp521['id']]['clone']();
    var sp524 = $['background'][sp521['id']]['clone']();
    sp522 = sp522 || 0;
    offset = offset || 0;
    sp523['x'] = sp522 * sp521['w'];
    if (sp522 > 0) {
        sp523['x'] = -(sp523['x'])
    } else {
        sp523['x'] = Math['abs'](sp523['x'])
    };
    var sp525 = (defaultData['lastY'] / defaultData['height']) * 20;
    sp523['y'] = sp525 + offset;
    worldContainer['addChild'](sp523, sp524);
    sp524['x'] = sp523['x'] + sp521['w'];
    sp524['y'] = sp523['y']
}

function renderSprite(sp27, sp28, resolution, sp29, sprites, _0x939dxd2, sp527, sp528, sp525, sp529, sp52a, sp52b) {
    var sp52c = $['sprites'][_0x939dxd2['id']]['clone']();
    var sp52d = (sp52c['image']['naturalWidth'] * sp527 * sp27 / 2) * (defaultData['scale'] * sp29);
    var sp52e = (sp52c['image']['naturalHeight'] * sp527 * sp27 / 2) * (defaultData['scale'] * sp29);
    sp528 = sp528 + (sp52d * (sp529 || 0));
    sp525 = sp525 + (sp52e * (sp52a || 0));
    var sp52f = sp52b ? Math['max'](0, sp525 + sp52e - sp52b) : 0;
    if (sp52f < sp52e) {
        sp52c['x'] = sp528;
        sp52c['y'] = sp525;
        sp52c['scaleX'] = sp52d / _0x939dxd2['w'];
        sp52c['scaleY'] = (sp52e - sp52f) / _0x939dxd2['h'];
        worldContainer['addChild'](sp52c)
    }
}

function renderPlayer(sp27, sp28, resolution, sp29, sprites, _0x939dxd6, sp527, sp528, sp525, sp531, sp532) {
    if (curPage == 'result') {
        return
    };
    var sp533 = (1.5 * Math['random']() * _0x939dxd6 * resolution) * randomChoice([-1, 1]);
    var _0x939dxd2;
    if (sp531 < 0) {
        _0x939dxd2 = (sp532 > 0) ? playerCarData['up_left'] : playerCarData['left']
    } else {
        if (sp531 > 0) {
            _0x939dxd2 = (sp532 > 0) ? playerCarData['up_right'] : playerCarData['right']
        } else {
            _0x939dxd2 = (sp532 > 0) ? playerCarData['up_straight'] : playerCarData['straight']
        }
    };
    renderCar(sp27, sp28, resolution, sp29, sprites, _0x939dxd2, sp527, sp528, sp525 + sp533, -0.5, -0.8)
}

function renderCar(sp27, sp28, resolution, sp29, sprites, _0x939dxd2, sp527, sp528, sp525, sp529, sp52a, sp52b) {
    var sp52c = $['sprites'][_0x939dxd2['id']]['clone']();
    var sp52d = (_0x939dxd2['w'] * sp527 * sp27 / 2) * (defaultData['scale'] * sp29);
    var sp52e = (_0x939dxd2['h'] * sp527 * sp27 / 2) * (defaultData['scale'] * sp29);
    sp528 = sp528 + (sp52d * (sp529 || 0));
    sp525 = sp525 + (sp52e * (sp52a || 0));
    var sp52f = sp52b ? Math['max'](0, sp525 + sp52e - sp52b) : 0;
    if (sp52f < sp52e) {
        sp52c['x'] = sp528;
        sp52c['y'] = sp525;
        sp52c['scaleX'] = sp52d / _0x939dxd2['w'];
        sp52c['scaleY'] = (sp52e - sp52f) / _0x939dxd2['h'];
        worldContainer['addChild'](sp52c);
        var sp535 = sp52d / _0x939dxd2['w'];
        var sp536 = false;
        var sp537 = false;
        var sp538 = 0;
        if (_0x939dxd2['id']['substring'](0, 3) == 'up_') {
            sp538 = 25
        };
        if (defaultData['playerX'] < -1.2) {
            sp536 = sp537 = true
        } else {
            if (defaultData['playerX'] < -0.9) {
                sp536 = true
            } else {
                if (defaultData['playerX'] > 1.2) {
                    sp536 = sp537 = true
                } else {
                    if (defaultData['playerX'] > 0.9) {
                        sp537 = true
                    }
                }
            }
        };
        if (sp536 && defaultData['speed'] > 0) {
            var sp539 = smokeAnimate['clone']();
            sp539['x'] = sp52c['x'] + (0 * sp535);
            sp539['y'] = sp52c['y'] + ((90 + sp538) * sp535);
            sp539['scaleX'] = sp52c['scaleX'];
            sp539['scaleY'] = sp52c['scaleY'];
            worldContainer['addChild'](sp539)
        };
        if (sp537 && defaultData['speed'] > 0) {
            var sp53a = smokeAnimate['clone']();
            sp53a['x'] = sp52c['x'] + (180 * sp535);
            sp53a['y'] = sp52c['y'] + ((90 + sp538) * sp535);
            sp53a['scaleX'] = sp52c['scaleX'];
            sp53a['scaleY'] = sp52c['scaleY'];
            worldContainer['addChild'](sp53a)
        };
        if (gameData['nitroMode']) {
            var sp53b = fireAnimate['clone']();
            sp53b['x'] = sp52c['x'] + (45 * sp535);
            sp53b['y'] = sp52c['y'] + ((85 + sp538) * sp535);
            sp53b['scaleX'] = sp52c['scaleX'];
            sp53b['scaleY'] = sp52c['scaleY'];
            worldContainer['addChild'](sp53b)
        }
    }
}

function renderFog(sp53, _0x939dxf5, sp27, sp28, sp516) {
    if (sp516 < 1) {
        var sp513 = new createjs.Shape();
        sp513['graphics']['beginFill'](roadData['fog'])['drawRect'](sp53, _0x939dxf5, sp27, sp28);
        sp513['alpha'] = (1 - sp516);
        worldContainer['addChild'](sp513)
    }
}

function rumbleWidth(sp53e, sp515) {
    return sp53e / Math['max'](6, 2 * sp515)
}

function laneMarkerWidth(sp53e, sp515) {
    return sp53e / Math['max'](32, 8 * sp515)
}

function startNitro() {
    if (!gameData['nitroMode']) {
        playSound('soundCollectTurbo');
        gameData['nitroMode'] = true;
        worldData['accel'] = nitroData['accel'];
        worldData['maxSpeed'] = nitroData['maxSpeed'];
        updateGameText(statusData['nitro']['text'], statusData['nitro']['color'], statusData['nitro']['size'], 1);
        TweenMax['to'](worldData, 2, {
            cameraHeight: nitroData['cameraHeight'],
            overwrite: true,
            onUpdate: updateCamera
        });
        TweenMax['to'](nitroData, nitroData['timer'], {
            overwrite: true,
            onComplete: stopNitro
        })
    }
}

function stopNitro() {
    if (gameData['nitroMode']) {
        gameData['nitroMode'] = false;
        worldData['accel'] = defaultData['accel'];
        worldData['maxSpeed'] = defaultData['maxSpeed'];
        updateGameText('');
        TweenMax['to'](worldData, 2, {
            cameraHeight: defaultData['cameraHeight'],
            overwrite: true,
            onUpdate: updateCamera
        })
    }
}

function updateCamera() {
    defaultData['playerZ'] = (worldData['cameraHeight'] * defaultData['cameraDepth'])
}

function addScore() {
    playSound('soundCollectCoin');
    playerData['score'] += scoreData['coin'];
    updateGameText(statusData['score']['text']['replace']('[NUMBER]', scoreData['coin']), statusData['score']['color'], statusData['score']['size'], 1)
}

function addFuel() {
    playSound('soundCollectFuel');
    gameData['fuel'] += fuelData['add'];
    gameData['fuel'] = gameData['fuel'] > fuelData['total'] ? fuelData['total'] : gameData['fuel'];
    updateGameText(statusData['fuel']['text'], statusData['fuel']['color'], statusData['fuel']['size'], 1)
}

function updateGameStatus() {
    scoreTxt['text'] = scoreShadowTxt['text'] = scoreData['text']['replace']('[NUMBER]', addCommas(playerData['score']));
    var sp546 = (gameData['fuel'] / fuelData['total']) * fuelData['bar']['width'] - (fuelData['bar']['space'] * 2);
    sp546 = sp546 < 0 ? 0 : sp546;
    fuelBarFill['graphics']['clear']();
    fuelBarFill['graphics']['beginFill'](fuelData['bar']['fillColor'])['drawRect'](0, 0, sp546, fuelData['bar']['height'] - (fuelData['bar']['space'] * 4));
    if (gameData['fuel'] < (fuelData['total'] / 100 * 25) && !gameData['penalty']) {
        updateGameText(statusData['lowFuel']['text'], statusData['lowFuel']['color'], statusData['lowFuel']['size'], 0)
    };
    if (!gameData['paused'] && gameData['fuel'] <= 0) {
        updateGameText(statusData['noFuel']['text'], statusData['noFuel']['color'], statusData['noFuel']['size'], 0);
        endGame()
    }
}

function updateGameText(sp548, sp512, sp549, sp54a) {
    gameStatusContainer['visible'] = true;
    gameStatusTxt['font'] = sp549 + 'px dimitriregular';
    gameStatusShadowTxt['font'] = sp549 + 'px dimitri_swankregular';
    gameStatusTxt['color'] = sp512;
    gameStatusTxt['text'] = sp548;
    gameStatusShadowTxt['text'] = sp548;
    if (sp54a > 0) {
        TweenMax['to'](gameStatusContainer, sp54a, {
            overwrite: true,
            onComplete: function () {
                gameStatusContainer['visible'] = false
            }
        })
    }
}

function endGame() {
    if (!gameData['ended']) {
        gameData['paused'] = true;
        gameData['ended'] = true;
        keyData['left'] = keyData['right'] = keyData['accelerate'] = keyData['brake'] = false;
        TweenMax['to'](resultContainer, 1, {
            overwrite: true,
            onComplete: function () {
                goPage('result')
            }
        })
    }
}

function toggleSoundMute(sp48) {
    buttonSoundOff['visible'] = false;
    buttonSoundOn['visible'] = false;
    toggleSoundInMute(sp48);
    if (sp48) {
        buttonSoundOn['visible'] = true
    } else {
        buttonSoundOff['visible'] = true
    }
}

function toggleMusicMute(sp48) {
    buttonMusicOff['visible'] = false;
    buttonMusicOn['visible'] = false;
    toggleMusicInMute(sp48);
    if (sp48) {
        buttonMusicOn['visible'] = true
    } else {
        buttonMusicOff['visible'] = true
    }
}

function toggleFullScreen() {
    if (!document['fullscreenElement'] && !document['mozFullScreenElement'] && !document['webkitFullscreenElement'] && !document['msFullscreenElement']) {
        if (document['documentElement']['requestFullscreen']) {
            document['documentElement']['requestFullscreen']()
        } else {
            if (document['documentElement']['msRequestFullscreen']) {
                document['documentElement']['msRequestFullscreen']()
            } else {
                if (document['documentElement']['mozRequestFullScreen']) {
                    document['documentElement']['mozRequestFullScreen']()
                } else {
                    if (document['documentElement']['webkitRequestFullscreen']) {
                        document['documentElement']['webkitRequestFullscreen'](Element.ALLOW_KEYBOARD_INPUT)
                    }
                }
            }
        }
    } else {
        if (document['exitFullscreen']) {
            document['exitFullscreen']()
        } else {
            if (document['msExitFullscreen']) {
                document['msExitFullscreen']()
            } else {
                if (document['mozCancelFullScreen']) {
                    document['mozCancelFullScreen']()
                } else {
                    if (document['webkitExitFullscreen']) {
                        document['webkitExitFullscreen']()
                    }
                }
            }
        }
    }
}

function toggleOption() {
    if (optionsContainer['visible']) {
        optionsContainer['visible'] = false
    } else {
        optionsContainer['visible'] = true
    }
}

function share(sp551) {
    gtag('event', 'click', {
        'event_category': 'share',
        'event_label': sp551
    });
    var sp552 = location['href'];
    sp552 = sp552['substring'](0, sp552['lastIndexOf']('/') + 1);
    var sp553 = '';
    var sp548 = '';
    sp553 = shareTitle['replace']('[SCORE]', addCommas(playerData['score']));
    sp548 = shareMessage['replace']('[SCORE]', addCommas(playerData['score']));
    var sp554 = '';
    if (sp551 == 'twitter') {
        sp554 = 'https://twitter.com/intent/tweet?url=' + sp552 + '&text=' + sp548
    } else {
        if (sp551 == 'facebook') {
            sp554 = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(sp552 + 'share.php?desc=' + sp548 + '&title=' + sp553 + '&url=' + sp552 + '&thumb=' + sp552 + 'share.jpg&width=590&height=300')
        } else {
            if (sp551 == 'google') {
                sp554 = 'https://plus.google.com/share?url=' + sp552
            } else {
                if (sp551 == 'whatsapp') {
                    sp554 = 'whatsapp://send?text=' + encodeURIComponent(sp548) + ' - ' + encodeURIComponent(sp552)
                }
            }
        }
    };
    window['open'](sp554)
}
var stageW = 768;
var stageH = 1024;
var contentW = 576;
var contentH = 900;

function initMain() {
    if (!$['browser']['mobile'] || !isTablet) {
        $('#canvasHolder')['show']()
    };
    initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();
    if (typeof buildScoreBoardCanvas == 'function') {
        buildScoreBoardCanvas()
    };
    playMusicLoop('musicGame');
    setSoundLoopVolume('soundEngine', 0);
    goPage('main');
    resizeCanvas()
}
var windowW = windowH = 0;
var scalePercent = 0;
var offset = {
    x: 0,
    y: 0,
    left: 0,
    top: 0
};

function resizeGameFunc() {
    setTimeout(function () {
        $('.mobileRotate')['css']('left', checkContentWidth($('.mobileRotate')));
        $('.mobileRotate')['css']('top', checkContentHeight($('.mobileRotate')));
        windowW = window['innerWidth'];
        windowH = window['innerHeight'];
        scalePercent = windowW / contentW;
        if ((contentH * scalePercent) > windowH) {
            scalePercent = windowH / contentH
        };
        scalePercent = scalePercent > 1 ? 1 : scalePercent;
        if (windowW > stageW && windowH > stageH) {
            if (windowW > stageW) {
                scalePercent = windowW / stageW;
                if ((stageH * scalePercent) > windowH) {
                    scalePercent = windowH / stageH
                }
            }
        };
        var sp55d = ((stageW) * scalePercent);
        var sp55e = ((stageH) * scalePercent);
        offset['left'] = 0;
        offset['top'] = 0;
        if (sp55d > windowW) {
            offset['left'] = -((sp55d) - windowW)
        } else {
            offset['left'] = windowW - (sp55d)
        };
        if (sp55e > windowH) {
            offset['top'] = -((sp55e) - windowH)
        } else {
            offset['top'] = windowH - (sp55e)
        };
        offset['x'] = 0;
        offset['y'] = 0;
        if (offset['left'] < 0) {
            offset['x'] = Math['abs']((offset['left'] / scalePercent) / 2)
        };
        if (offset['top'] < 0) {
            offset['y'] = Math['abs']((offset['top'] / scalePercent) / 2)
        };
        $('canvas')['css']('width', sp55d);
        $('canvas')['css']('height', sp55e);
        $('canvas')['css']('left', (offset['left'] / 2));
        $('canvas')['css']('top', (offset['top'] / 2));
        $(window)['scrollTop'](0);
        resizeCanvas();
        if (typeof resizeScore == 'function') {
            resizeScore()
        }
    }, 100)
}
var rotateInstruction = true;
var forPortrait = true;

function checkMobileEvent() {
    if ($['browser']['mobile'] || isTablet) {
        if (!rotateInstruction) {
            $('#canvasHolder')['show']();
            $('#rotateHolder')['hide']();
            return
        };
        $(window)['off']('orientationchange')['on']('orientationchange', function (_0x939dx6d) {
            $('#canvasHolder')['hide']();
            $('#rotateHolder')['hide']();
            setTimeout(function () {
                checkMobileOrientation()
            }, 1000)
        });
        checkMobileOrientation()
    }
}

function checkMobileOrientation() {
    var sp563 = window['orientation'];
    var sp564 = false;
    if (window['innerWidth'] > window['innerHeight']) {
        sp564 = true
    };
    var sp565 = false;
    if (!sp564) {
        if (forPortrait) {
            sp565 = true
        }
    } else {
        if (!forPortrait) {
            sp565 = true
        }
    };
    if (!sp565) {
        toggleRotate(true)
    } else {
        toggleRotate(false);
        $('#canvasHolder')['show']()
    }
}

function toggleRotate(sp48) {
    if (sp48) {
        $('#rotateHolder')['fadeIn']()
    } else {
        $('#rotateHolder')['fadeOut']()
    };
    resizeGameFunc()
}

function initPreload() {
    toggleLoader(true);
    checkMobileEvent();
    $(window)['resize'](function () {
        resizeGameFunc()
    });
    resizeGameFunc();
    loader = new createjs.LoadQueue(false);
    manifest = [{
        src: 'assets/background.png',
        id: 'background'
    }, {
        src: 'assets/logo.png',
        id: 'logo'
    }, {
        src: 'assets/button_start.png',
        id: 'buttonStart'
    }, {
        src: 'assets/smoke_Spritesheet2x1.png',
        id: 'itemSmoke'
    }, {
        src: 'assets/fire_Spritesheet2x1.png',
        id: 'itemFire'
    }, {
        src: 'assets/button_confirm.png',
        id: 'buttonConfirm'
    }, {
        src: 'assets/button_cancel.png',
        id: 'buttonCancel'
    }, {
        src: 'assets/item_confirm.png',
        id: 'itemExit'
    }, {
        src: 'assets/touch_up.png',
        id: 'itemTouchUp'
    }, {
        src: 'assets/touch_down.png',
        id: 'itemTouchDown'
    }, {
        src: 'assets/touch_left.png',
        id: 'itemTouchLeft'
    }, {
        src: 'assets/touch_right.png',
        id: 'itemTouchRight'
    }, {
        src: 'assets/button_restart.png',
        id: 'buttonRestart'
    }, {
        src: 'assets/button_facebook.png',
        id: 'buttonFacebook'
    }, {
        src: 'assets/button_twitter.png',
        id: 'buttonTwitter'
    }, {
        src: 'assets/button_whatsapp.png',
        id: 'buttonWhatsapp'
    }, {
        src: 'assets/button_fullscreen.png',
        id: 'buttonFullscreen'
    }, {
        src: 'assets/button_sound_on.png',
        id: 'buttonSoundOn'
    }, {
        src: 'assets/button_sound_off.png',
        id: 'buttonSoundOff'
    }, {
        src: 'assets/button_music_on.png',
        id: 'buttonMusicOn'
    }, {
        src: 'assets/button_music_off.png',
        id: 'buttonMusicOff'
    }, {
        src: 'assets/button_exit.png',
        id: 'buttonExit'
    }, {
        src: 'assets/button_settings.png',
        id: 'buttonSettings'
    }];
    for (var _0x939dx8e in spritesData) {
        if (spritesData[_0x939dx8e]['src'] != undefined) {
            manifest['push']({
                src: spritesData[_0x939dx8e]['src'],
                id: _0x939dx8e
            })
        }
    };
    for (var _0x939dx8e in backgroundData) {
        if (backgroundData[_0x939dx8e]['src'] != undefined) {
            manifest['push']({
                src: backgroundData[_0x939dx8e]['src'],
                id: _0x939dx8e
            })
        }
    };
    for (var _0x939dx8e in playerCarData) {
        if (playerCarData[_0x939dx8e]['src'] != undefined) {
            manifest['push']({
                src: playerCarData[_0x939dx8e]['src'],
                id: _0x939dx8e
            })
        }
    };
    if (typeof addScoreboardAssets == 'function') {
        addScoreboardAssets()
    };
    soundOn = true;
    if ($['browser']['mobile'] || isTablet) {
        if (!enableMobileSound) {
            soundOn = false
        }
    } else {
        if (!enableDesktopSound) {
            soundOn = false
        }
    };
    if (soundOn) {
        manifest['push']({
            src: 'assets/sounds/music.ogg',
            id: 'musicGame'
        });
        manifest['push']({
            src: 'assets/sounds/click.ogg',
            id: 'soundClick'
        });
        manifest['push']({
            src: 'assets/sounds/collect_fuel.ogg',
            id: 'soundCollectFuel'
        });
        manifest['push']({
            src: 'assets/sounds/collect_turbo.ogg',
            id: 'soundCollectTurbo'
        });
        manifest['push']({
            src: 'assets/sounds/collect_coin.ogg',
            id: 'soundCollectCoin'
        });
        manifest['push']({
            src: 'assets/sounds/impact.ogg',
            id: 'soundImpact'
        });
        manifest['push']({
            src: 'assets/sounds/over.ogg',
            id: 'soundOver'
        });
        manifest['push']({
            src: 'assets/sounds/brake.ogg',
            id: 'soundBrake'
        });
        manifest['push']({
            src: 'assets/sounds/engineloop.ogg',
            id: 'soundEngine'
        });
        manifest['push']({
            src: 'assets/sounds/tick.ogg',
            id: 'soundTick'
        });
        manifest['push']({
            src: 'assets/sounds/tickOver.ogg',
            id: 'soundTickOver'
        });
        manifest['push']({
            src: 'assets/sounds/slowDown.ogg',
            id: 'soundSlowDown'
        });
        manifest['push']({
            src: 'assets/sounds/speedUp.ogg',
            id: 'soundSpeedUp'
        });
        createjs['Sound']['alternateExtensions'] = ['mp3'];
        loader['installPlugin'](createjs.Sound)
    };
    loader['addEventListener']('complete', handleComplete);
    loader['addEventListener']('fileload', fileComplete);
    loader['addEventListener']('error', handleFileError);
    loader['on']('progress', handleProgress, this);
    loader['loadManifest'](manifest)
}

function fileComplete(_0x939dxb8) {
    var sp569 = _0x939dxb8['item']
}

function handleFileError(_0x939dxb8) {
    console['log']('error ', _0x939dxb8)
}

function handleProgress() {
    $('#mainLoader span')['html'](Math['round'](loader['progress'] / 1 * 100) + '%')
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(sp48) {
    if (sp48) {
        $('#mainLoader')['show']()
    } else {
        $('#mainLoader')['hide']()
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var sp56f = function () {
        try {
            if (createjs['WebAudioPlugin']['context']['state'] === 'suspended') {
                createjs['WebAudioPlugin']['context']['resume']();
                window['removeEventListener']('click', sp56f)
            }
        } catch (e) {
            console['error']('There was an error while trying to resume the SoundJS Web Audio context...');
            console['error'](e)
        }
    };
    window['addEventListener']('click', sp56f);
    if (window['location']['protocol']['substr'](0, 4) === 'file') {
        alert('To install the game just upload folder \'game\' to your server. The game won\'t run locally with some browser like Chrome due to some security mode.')
    };
    $(window)['resize'](function () {
        resizeLoaderFunc()
    });
    resizeLoaderFunc();
    checkBrowser()
});

function resizeLoaderFunc() {
    stageWidth = $(window)['width']();
    stageHeight = $(window)['height']();
    $('#mainLoader')['css']('left', checkContentWidth($('#mainLoader')));
    $('#mainLoader')['css']('top', checkContentHeight($('#mainLoader')))
}
var browserSupport = false;
var isTablet;

function checkBrowser() {
    isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i ['test'](navigator['userAgent']['toLowerCase']()));
    deviceVer = getDeviceVer();
    var sp574 = document['createElement']('canvas');
    if (sp574['getContext']) {
        browserSupport = true
    };
    if (browserSupport) {
        if (!isLoaded) {
            isLoaded = true;
            initPreload()
        }
    } else {
        $('#notSupportHolder')['show']()
    }
}