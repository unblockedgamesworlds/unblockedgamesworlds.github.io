(function () {
    var wordleUN1;
    var wordleUN2 = function () {};
    var wordleUN3 = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var wordleUN4 = wordleUN3['length'];
    var wordleUN5 = (window['console'] = window['console'] || {});
    while (wordleUN4--) {
        wordleUN1 = wordleUN3[wordleUN4];
        if (!wordleUN5[wordleUN1]) {
            wordleUN5[wordleUN1] = wordleUN2
        }
    }
}());

function checkContentHeight(wordleUN7) {
    var stageHeight = $(window)['height']();
    var wordleUN9 = (stageHeight / 2) - (wordleUN7['height']() / 2);
    return wordleUN9
}

function checkContentWidth(wordleUN7) {
    var stageWidth = $(window)['width']();
    var wordleUNc = (stageWidth / 2) - (wordleUN7['width']() / 2);
    return wordleUNc
}

function getDeviceVer() {
    var wordleUNe = navigator['userAgent'];
    var wordleUNf;
    if (wordleUNe['match'](/(iPad|iPhone|iPod touch)/)) {
        userOS = 'iOS';
        wordleUNf = wordleUNe['indexOf']('OS ')
    } else {
        if (wordleUNe['match'](/Android/)) {
            userOS = 'Android';
            wordleUNf = wordleUNe['indexOf']('Android ')
        } else {
            userOS = 'unknown'
        }
    };
    if (userOS === 'iOS' && wordleUNf > -1) {
        userOSver = wordleUNe['substr'](wordleUNf + 3, 3)['replace']('_', '.')
    } else {
        if (userOS === 'Android' && wordleUNf > -1) {
            userOSver = wordleUNe['substr'](wordleUNf + 8, 3)
        } else {
            userOSver = 'unknown'
        }
    };
    return Number(userOSver)
}

function shuffle(wordleUN11) {
    var wordleUN12 = wordleUN11['length'],
        wordleUN13, wordleUN14;
    while (0 !== wordleUN12) {
        wordleUN14 = Math['floor'](Math['random']() * wordleUN12);
        wordleUN12 -= 1;
        wordleUN13 = wordleUN11[wordleUN12];
        wordleUN11[wordleUN12] = wordleUN11[wordleUN14];
        wordleUN11[wordleUN14] = wordleUN13
    };
    return wordleUN11
}

function randomBoolean() {
    return Math['random']() < 0.5
}

function getDistance(wordleUN17, wordleUN18, wordleUN19, wordleUN1a) {
    var wordleUN1b = Math['sqrt'](Math['pow'](wordleUN17 - wordleUN19, 2) + Math['pow'](wordleUN18 - wordleUN1a, 2));
    return wordleUN1b
}

function sortOnObject(wordleUN11, wordleUN1d, wordleUN1e) {
    if (wordleUN1e) {
        wordleUN11['sort'](function (wordleUN1f, wordleUN20) {
            var wordleUN21 = wordleUN1f[wordleUN1d],
                wordleUN22 = wordleUN20[wordleUN1d];
            if (wordleUN21 == wordleUN22) {
                return 0
            };
            return wordleUN21 < wordleUN22 ? 1 : -1
        })
    } else {
        wordleUN11['sort'](function (wordleUN1f, wordleUN20) {
            var wordleUN21 = wordleUN1f[wordleUN1d],
                wordleUN22 = wordleUN20[wordleUN1d];
            if (wordleUN21 == wordleUN22) {
                return 0
            };
            return wordleUN21 > wordleUN22 ? 1 : -1
        })
    };
    return wordleUN11
}

function randomIntFromInterval(wordleUN24, wordleUN25) {
    return Math['floor'](Math['random']() * (wordleUN25 - wordleUN24 + 1) + wordleUN24)
}

function addCommas(wordleUN27) {
    wordleUN27 += '';
    x = wordleUN27['split']('.');
    x1 = x[0];
    x2 = x['length'] > 1 ? '.' + x[1] : '';
    var wordleUN28 = /(\d+)(\d{3})/;
    while (wordleUN28['test'](x1)) {
        x1 = x1['replace'](wordleUN28, '$1' + ',' + '$2')
    };
    return x1 + x2
}

function swapArray(wordleUN2a, wordleUN2b, wordleUN2c) {
    var wordleUN2d = wordleUN2a[wordleUN2b];
    wordleUN2a[wordleUN2b] = wordleUN2a[wordleUN2c];
    wordleUN2a[wordleUN2c] = wordleUN2d
}

function getCenterPosition(wordleUN2f, wordleUN30, wordleUN31, wordleUN32) {
    var wordleUN33 = {
        x: 0,
        y: 0
    };
    wordleUN33['x'] = (wordleUN2f + wordleUN31) / 2;
    wordleUN33['y'] = (wordleUN30 + wordleUN32) / 2;
    return wordleUN33
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

function playSound(wordleUN3e, wordleUN3f) {
    if (soundOn) {
        var wordleUN40 = soundID;
        soundPushArr['push'](wordleUN40);
        soundID++;
        var wordleUN41 = wordleUN3f == undefined ? 1 : wordleUN3f;
        $['sound'][wordleUN40] = createjs['Sound']['play'](wordleUN3e);
        $['sound'][wordleUN40]['defaultVol'] = wordleUN41;
        setSoundVolume(wordleUN40);
        $['sound'][wordleUN40]['removeAllEventListeners']();
        $['sound'][wordleUN40]['addEventListener']('complete', function () {
            var wordleUN42 = soundPushArr['indexOf'](wordleUN40);
            if (wordleUN42 != -1) {
                soundPushArr['splice'](wordleUN42, 1)
            }
        })
    }
}

function playSoundLoop(wordleUN3e) {
    if (soundOn) {
        if ($['sound'][wordleUN3e] == null) {
            soundLoopPushArr['push'](wordleUN3e);
            $['sound'][wordleUN3e] = createjs['Sound']['play'](wordleUN3e);
            $['sound'][wordleUN3e]['defaultVol'] = 1;
            setSoundLoopVolume(wordleUN3e);
            $['sound'][wordleUN3e]['removeAllEventListeners']();
            $['sound'][wordleUN3e]['addEventListener']('complete', function () {
                $['sound'][wordleUN3e]['play']()
            })
        }
    }
}

function toggleSoundLoop(wordleUN3e, wordleUN45) {
    if (soundOn) {
        if ($['sound'][wordleUN3e] != null) {
            if (wordleUN45) {
                $['sound'][wordleUN3e]['play']()
            } else {
                $['sound'][wordleUN3e]['paused'] = true
            }
        }
    }
}

function stopSoundLoop(wordleUN3e) {
    if (soundOn) {
        if ($['sound'][wordleUN3e] != null) {
            $['sound'][wordleUN3e]['stop']();
            $['sound'][wordleUN3e] = null;
            var wordleUN47 = soundLoopPushArr['indexOf'](wordleUN3e);
            if (wordleUN47 != -1) {
                soundLoopPushArr['splice'](wordleUN47, 1)
            }
        }
    }
}

function playMusicLoop(wordleUN3e) {
    if (soundOn) {
        if ($['sound'][wordleUN3e] == null) {
            musicPushArr['push'](wordleUN3e);
            $['sound'][wordleUN3e] = createjs['Sound']['play'](wordleUN3e);
            $['sound'][wordleUN3e]['defaultVol'] = 1;
            setMusicVolume(wordleUN3e);
            $['sound'][wordleUN3e]['removeAllEventListeners']();
            $['sound'][wordleUN3e]['addEventListener']('complete', function () {
                $['sound'][wordleUN3e]['play']()
            })
        }
    }
}

function toggleMusicLoop(wordleUN3e, wordleUN45) {
    if (soundOn) {
        if ($['sound'][wordleUN3e] != null) {
            if (wordleUN45) {
                $['sound'][wordleUN3e]['play']()
            } else {
                $['sound'][wordleUN3e]['paused'] = true
            }
        }
    }
}

function stopMusicLoop(wordleUN3e) {
    if (soundOn) {
        if ($['sound'][wordleUN3e] != null) {
            $['sound'][wordleUN3e]['stop']();
            $['sound'][wordleUN3e] = null;
            var wordleUN47 = musicPushArr['indexOf'](wordleUN3e);
            if (wordleUN47 != -1) {
                musicPushArr['splice'](wordleUN47, 1)
            }
        }
    }
}

function stopSound() {
    createjs['Sound']['stop']()
}

function toggleSoundInMute(wordleUN45) {
    if (soundOn) {
        soundMute = wordleUN45;
        for (var wordleUN4d = 0; wordleUN4d < soundPushArr['length']; wordleUN4d++) {
            setSoundVolume(soundPushArr[wordleUN4d])
        };
        for (var wordleUN4d = 0; wordleUN4d < soundLoopPushArr['length']; wordleUN4d++) {
            setSoundLoopVolume(soundLoopPushArr[wordleUN4d])
        };
        setAudioVolume()
    }
}

function toggleMusicInMute(wordleUN45) {
    if (soundOn) {
        musicMute = wordleUN45;
        for (var wordleUN4d = 0; wordleUN4d < musicPushArr['length']; wordleUN4d++) {
            setMusicVolume(musicPushArr[wordleUN4d])
        }
    }
}

function setSoundVolume(wordleUN50, wordleUN3f) {
    if (soundOn) {
        var wordleUN51 = soundPushArr['indexOf'](wordleUN50);
        if (wordleUN51 != -1) {
            var wordleUN41 = wordleUN3f == undefined ? $['sound'][soundPushArr[wordleUN51]]['defaultVol'] : wordleUN3f;
            var wordleUN52 = soundMute == false ? wordleUN41 : 0;
            $['sound'][soundPushArr[wordleUN51]]['volume'] = wordleUN52;
            $['sound'][soundPushArr[wordleUN51]]['defaultVol'] = wordleUN41
        }
    }
}

function setSoundLoopVolume(wordleUN54, wordleUN3f) {
    if (soundOn) {
        var wordleUN47 = soundLoopPushArr['indexOf'](wordleUN54);
        if (wordleUN47 != -1) {
            var wordleUN41 = wordleUN3f == undefined ? $['sound'][soundLoopPushArr[wordleUN47]]['defaultVol'] : wordleUN3f;
            var wordleUN52 = soundMute == false ? wordleUN41 : 0;
            $['sound'][soundLoopPushArr[wordleUN47]]['volume'] = wordleUN52;
            $['sound'][soundLoopPushArr[wordleUN47]]['defaultVol'] = wordleUN41
        }
    }
}

function setMusicVolume(wordleUN54, wordleUN3f) {
    if (soundOn) {
        var wordleUN56 = musicPushArr['indexOf'](wordleUN54);
        if (wordleUN56 != -1) {
            var wordleUN41 = wordleUN3f == undefined ? $['sound'][musicPushArr[wordleUN56]]['defaultVol'] : wordleUN3f;
            var wordleUN52 = musicMute == false ? wordleUN41 : 0;
            $['sound'][musicPushArr[wordleUN56]]['volume'] = wordleUN52;
            $['sound'][musicPushArr[wordleUN56]]['defaultVol'] = wordleUN41
        }
    }
}
var audioFile = null;

function playAudio(wordleUN59, wordleUN5a) {
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs['Sound']['play'](wordleUN59);
            setAudioVolume();
            audioFile['removeAllEventListeners']();
            audioFile['addEventListener']('complete', function (wordleUN5b) {
                audioFile = null;
                if (typeof wordleUN5a == 'function') {
                    wordleUN5a()
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
            var wordleUN52 = soundMute == false ? 1 : 0;
            audioFile['volume'] = wordleUN52
        }
    }
}
var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(wordleUN62, wordleUN63) {
    var wordleUN64 = document['getElementById']('gameCanvas');
    wordleUN64['width'] = wordleUN62;
    wordleUN64['height'] = wordleUN63;
    canvasW = wordleUN62;
    canvasH = wordleUN63;
    stage = new createjs.Stage('gameCanvas');
    createjs['Touch']['enable'](stage);
    stage['enableMouseOver'](20);
    stage['mouseMoveOutside'] = true;
    createjs['Ticker']['framerate'] = 60;
    createjs['Ticker']['addEventListener']('tick', tick)
}
var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;
$['key'] = {};
$['word'] = {};

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    titleContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    selectContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    wordsContainer = new createjs.Container();
    wordsListContainer = new createjs.Container();
    keyboardContainer = new createjs.Container();
    totalContainer = new createjs.Container();
    scoreContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    confirmContainer = new createjs.Container();
    bg = new createjs.Bitmap(loader['getResult']('background'));
    bgP = new createjs.Bitmap(loader['getResult']('backgroundP'));
    buttonStart = new createjs.Bitmap(loader['getResult']('buttonStart'));
    centerReg(buttonStart);
    loadingTxt = new createjs.Text();
    loadingTxt['font'] = '20px comfortaabold';
    loadingTxt['color'] = '#fff';
    loadingTxt['textAlign'] = 'center';
    loadingTxt['textBaseline'] = 'alphabetic';
    loadingTxt['text'] = textDisplay['loading'];
    buttonLetter = new createjs.Bitmap(loader['getResult']('buttonLetter'));
    centerReg(buttonLetter);
    letterTxt = new createjs.Text();
    letterTxt['font'] = '20px comfortaabold';
    letterTxt['color'] = '#fff';
    letterTxt['textAlign'] = 'center';
    letterTxt['textBaseline'] = 'alphabetic';
    letterTxt['y'] += 8;
    buttonArrowL = new createjs.Bitmap(loader['getResult']('buttonArrow'));
    centerReg(buttonArrowL);
    buttonArrowR = new createjs.Bitmap(loader['getResult']('buttonArrow'));
    centerReg(buttonArrowR);
    buttonArrowL['scaleX'] = -1;
    buttonArrowL['x'] = -120;
    buttonArrowR['x'] = 120;
    selectContainer['addChild'](buttonLetter, letterTxt, buttonArrowL, buttonArrowR);
    gameStatusTxt = new createjs.Text();
    gameStatusTxt['font'] = '25px comfortaabold';
    gameStatusTxt['color'] = '#fff';
    gameStatusTxt['textAlign'] = 'center';
    gameStatusTxt['textBaseline'] = 'alphabetic';
    gameStatusTxt['text'] = textDisplay['noword'];
    gameScoreTxt = new createjs.Text();
    gameScoreTxt['font'] = '25px comfortaabold';
    gameScoreTxt['color'] = '#fff';
    gameScoreTxt['textAlign'] = 'center';
    gameScoreTxt['textBaseline'] = 'alphabetic';
    gameScoreTxt['text'] = '';
    gameScoreBg = new createjs.Shape();
    gameScore = new createjs.Shape();
    gameScore['barW'] = 0;
    gameScoreBg['y'] = gameScore['y'] = 20;
    scoreContainer['addChild'](gameScoreTxt, gameScoreBg, gameScore);
    gameTotalTxt = new createjs.Text();
    gameTotalTxt['font'] = '25px comfortaabold';
    gameTotalTxt['color'] = '#fff';
    gameTotalTxt['textAlign'] = 'center';
    gameTotalTxt['textBaseline'] = 'alphabetic';
    gameTotalTxt['text'] = '';
    totalContainer['addChild'](gameTotalTxt);
    itemResult = new createjs.Bitmap(loader['getResult']('itemPop2'));
    itemResultP = new createjs.Bitmap(loader['getResult']('itemPopP2'));
    buttonContinue = new createjs.Bitmap(loader['getResult']('buttonContinue'));
    centerReg(buttonContinue);
    resultShareTxt = new createjs.Text();
    resultShareTxt['font'] = '20px comfortaabold';
    resultShareTxt['color'] = '#fff';
    resultShareTxt['textAlign'] = 'center';
    resultShareTxt['textBaseline'] = 'alphabetic';
    resultShareTxt['text'] = textDisplay['share'];
    resultTitleTxt = new createjs.Text();
    resultTitleTxt['font'] = '45px comfortaabold';
    resultTitleTxt['color'] = '#fff';
    resultTitleTxt['textAlign'] = 'center';
    resultTitleTxt['textBaseline'] = 'alphabetic';
    resultTitleTxt['text'] = '';
    resultTimerTxt = new createjs.Text();
    resultTimerTxt['font'] = '30px comfortaabold';
    resultTimerTxt['color'] = '#fff';
    resultTimerTxt['textAlign'] = 'center';
    resultTimerTxt['textBaseline'] = 'alphabetic';
    resultTimerTxt['text'] = '';
    resultDescTxt = new createjs.Text();
    resultDescTxt['font'] = '40px comfortaabold';
    resultDescTxt['color'] = '#12B882';
    resultDescTxt['textAlign'] = 'center';
    resultDescTxt['textBaseline'] = 'alphabetic';
    resultDescTxt['text'] = '';
    buttonFacebook = new createjs.Bitmap(loader['getResult']('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader['getResult']('buttonTwitter'));
    buttonWhatsapp = new createjs.Bitmap(loader['getResult']('buttonWhatsapp'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFullscreen = new createjs.Bitmap(loader['getResult']('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader['getResult']('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader['getResult']('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn['visible'] = false;
    buttonExit = new createjs.Bitmap(loader['getResult']('buttonExit'));
    centerReg(buttonExit);
    buttonSettings = new createjs.Bitmap(loader['getResult']('buttonSettings'));
    centerReg(buttonSettings);
    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    optionsContainer = new createjs.Container();
    optionsContainer['addChild'](buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
    optionsContainer['visible'] = false;
    buttonResultArrowL = new createjs.Bitmap(loader['getResult']('buttonArrow'));
    centerReg(buttonResultArrowL);
    buttonResultArrowR = new createjs.Bitmap(loader['getResult']('buttonArrow'));
    centerReg(buttonResultArrowR);
    buttonResultArrowL['scaleX'] = -1;
    itemExit = new createjs.Bitmap(loader['getResult']('itemPop'));
    itemExitP = new createjs.Bitmap(loader['getResult']('itemPopP'));
    buttonConfirm = new createjs.Bitmap(loader['getResult']('buttonConfirm'));
    centerReg(buttonConfirm);
    buttonCancel = new createjs.Bitmap(loader['getResult']('buttonCancel'));
    centerReg(buttonCancel);
    popTitleTxt = new createjs.Text();
    popTitleTxt['font'] = '45px comfortaabold';
    popTitleTxt['color'] = '#fff';
    popTitleTxt['textAlign'] = 'center';
    popTitleTxt['textBaseline'] = 'alphabetic';
    popTitleTxt['text'] = textDisplay['exitTitle'];
    popDescTxt = new createjs.Text();
    popDescTxt['font'] = '30px comfortaabold';
    popDescTxt['lineHeight'] = 35;
    popDescTxt['color'] = '#fff';
    popDescTxt['textAlign'] = 'center';
    popDescTxt['textBaseline'] = 'alphabetic';
    popDescTxt['text'] = textDisplay['exitMessage'];
    confirmContainer['addChild'](itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
    confirmContainer['visible'] = false;
    if (guide) {
        guideline = new createjs.Shape();
        guideline['graphics']['setStrokeStyle'](2)['beginStroke']('red')['drawRect']((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    };
    mainContainer['addChild'](titleContainer, buttonStart, loadingTxt, selectContainer);
    wordsContainer['addChild'](wordsListContainer, gameStatusTxt);
    gameContainer['addChild'](scoreContainer, wordsContainer, keyboardContainer, totalContainer);
    resultContainer['addChild'](itemResult, itemResultP, buttonResultArrowL, buttonResultArrowR, buttonContinue, resultTitleTxt, resultDescTxt, resultTimerTxt);
    if (shareEnable) {
        resultContainer['addChild'](resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp)
    };
    canvasContainer['addChild'](bg, bgP, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage['addChild'](canvasContainer);
    changeViewport(viewport['isLandscape']);
    resizeGameFunc()
}

function changeViewport(wordleUN7a) {
    if (wordleUN7a) {
        stageW = landscapeSize['w'];
        stageH = landscapeSize['h'];
        contentW = landscapeSize['cW'];
        contentH = landscapeSize['cH']
    } else {
        stageW = portraitSize['w'];
        stageH = portraitSize['h'];
        contentW = portraitSize['cW'];
        contentH = portraitSize['cH']
    };
    gameCanvas['width'] = stageW;
    gameCanvas['height'] = stageH;
    canvasW = stageW;
    canvasH = stageH;
    changeCanvasViewport()
}

function changeCanvasViewport() {
    if (canvasContainer != undefined) {
        if (viewport['isLandscape']) {
            bg['visible'] = true;
            bgP['visible'] = false;
            titleContainer['x'] = canvasW / 2;
            titleContainer['y'] = canvasH / 2;
            titleContainer['scaleX'] = titleContainer['scaleY'] = 1;
            buttonStart['x'] = loadingTxt['x'] = selectContainer['x'] = canvasW / 2;
            buttonStart['y'] = loadingTxt['y'] = selectContainer['y'] = canvasH / 100 * 73;
            wordsContainer['x'] = canvasW / 2;
            wordsContainer['y'] = canvasH / 100 * 17;
            keyboardContainer['x'] = canvasW / 2;
            keyboardContainer['y'] = canvasH / 100 * 81;
            scoreContainer['x'] = canvasW / 2 + 350;
            scoreContainer['y'] = canvasH / 100 * 50;
            itemResult['visible'] = true;
            itemResultP['visible'] = false;
            buttonFacebook['x'] = canvasW / 100 * 45;
            buttonFacebook['y'] = canvasH / 100 * 62;
            buttonTwitter['x'] = canvasW / 2;
            buttonTwitter['y'] = canvasH / 100 * 62;
            buttonWhatsapp['x'] = canvasW / 100 * 55;
            buttonWhatsapp['y'] = canvasH / 100 * 62;
            buttonResultArrowL['x'] = canvasW / 2 - 210;
            buttonResultArrowL['y'] = canvasH / 100 * 50;
            buttonResultArrowR['x'] = canvasW / 2 + 210;
            buttonResultArrowR['y'] = canvasH / 100 * 50;
            buttonContinue['x'] = canvasW / 2;
            buttonContinue['y'] = canvasH / 100 * 72;
            resultShareTxt['x'] = canvasW / 2;
            resultShareTxt['y'] = canvasH / 100 * 57;
            resultTitleTxt['x'] = canvasW / 2;
            resultTitleTxt['y'] = canvasH / 100 * 37;
            resultDescTxt['x'] = canvasW / 2;
            resultDescTxt['y'] = canvasH / 100 * 51;
            resultTimerTxt['x'] = canvasW / 2;
            resultTimerTxt['y'] = canvasH / 100 * 45;
            itemExit['visible'] = true;
            itemExitP['visible'] = false;
            buttonConfirm['x'] = (canvasW / 2) - 83;
            buttonConfirm['y'] = (canvasH / 100 * 70);
            buttonCancel['x'] = (canvasW / 2) + 83;
            buttonCancel['y'] = (canvasH / 100 * 70);
            popTitleTxt['x'] = canvasW / 2;
            popTitleTxt['y'] = canvasH / 100 * 37;
            popDescTxt['x'] = canvasW / 2;
            popDescTxt['y'] = canvasH / 100 * 48
        } else {
            bg['visible'] = false;
            bgP['visible'] = true;
            titleContainer['x'] = canvasW / 2;
            titleContainer['y'] = canvasH / 2;
            titleContainer['scaleX'] = titleContainer['scaleY'] = 0.7;
            buttonStart['x'] = loadingTxt['x'] = selectContainer['x'] = canvasW / 2;
            buttonStart['y'] = loadingTxt['y'] = selectContainer['y'] = canvasH / 100 * 73;
            wordsContainer['x'] = canvasW / 2;
            wordsContainer['y'] = canvasH / 100 * 15;
            keyboardContainer['x'] = canvasW / 2;
            keyboardContainer['y'] = canvasH / 100 * 85;
            scoreContainer['x'] = canvasW / 2;
            scoreContainer['y'] = canvasH / 100 * 10;
            itemResult['visible'] = false;
            itemResultP['visible'] = true;
            buttonFacebook['x'] = canvasW / 100 * 40;
            buttonFacebook['y'] = canvasH / 100 * 60;
            buttonTwitter['x'] = canvasW / 2;
            buttonTwitter['y'] = canvasH / 100 * 60;
            buttonWhatsapp['x'] = canvasW / 100 * 60;
            buttonWhatsapp['y'] = canvasH / 100 * 60;
            buttonResultArrowL['x'] = canvasW / 2 - 210;
            buttonResultArrowL['y'] = canvasH / 100 * 50;
            buttonResultArrowR['x'] = canvasW / 2 + 210;
            buttonResultArrowR['y'] = canvasH / 100 * 50;
            buttonContinue['x'] = canvasW / 2;
            buttonContinue['y'] = canvasH / 100 * 67;
            resultShareTxt['x'] = canvasW / 2;
            resultShareTxt['y'] = canvasH / 100 * 56;
            resultTitleTxt['x'] = canvasW / 2;
            resultTitleTxt['y'] = canvasH / 100 * 40;
            resultDescTxt['x'] = canvasW / 2;
            resultDescTxt['y'] = canvasH / 100 * 51;
            resultTimerTxt['x'] = canvasW / 2;
            resultTimerTxt['y'] = canvasH / 100 * 47;
            itemExit['visible'] = false;
            itemExitP['visible'] = true;
            buttonConfirm['x'] = (canvasW / 2) - 83;
            buttonConfirm['y'] = (canvasH / 100 * 67);
            buttonCancel['x'] = (canvasW / 2) + 83;
            buttonCancel['y'] = (canvasH / 100 * 67);
            popTitleTxt['x'] = canvasW / 2;
            popTitleTxt['y'] = canvasH / 100 * 40;
            popDescTxt['x'] = canvasW / 2;
            popDescTxt['y'] = canvasH / 100 * 49
        }
    }
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings['x'] = (canvasW - offset['x']) - 50;
        buttonSettings['y'] = offset['y'] + 45;
        var wordleUN7d = 55;
        var wordleUN7e = 0;
        if (curPage != 'game') {
            buttonExit['visible'] = false;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + wordleUN7d;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + wordleUN7d;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (wordleUN7d * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (wordleUN7d * 2);
                wordleUN7e = 2
            } else {
                wordleUN7e = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (wordleUN7d * (wordleUN7e + 1))
        } else {
            buttonExit['visible'] = true;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + wordleUN7d;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + wordleUN7d;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (wordleUN7d * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (wordleUN7d * 2);
                wordleUN7e = 2
            } else {
                wordleUN7e = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (wordleUN7d * (wordleUN7e + 1));
            buttonExit['x'] = buttonSettings['x'];
            buttonExit['y'] = buttonSettings['y'] + (wordleUN7d * (wordleUN7e + 2))
        };
        if (curPage == 'game') {
            totalContainer['x'] = offset['x'] + 50;
            totalContainer['y'] = offset['y'] + 50;
            resizeWordLists()
        }
    }
}

function removeGameCanvas() {
    stage['autoClear'] = true;
    stage['removeAllChildren']();
    stage['update']();
    createjs['Ticker']['removeEventListener']('tick', tick);
    createjs['Ticker']['removeEventListener']('tick', stage)
}

function tick(wordleUN5b) {
    updateGame();
    stage['update'](wordleUN5b)
}

function centerReg(wordleUN82) {
    wordleUN82['regX'] = wordleUN82['image']['naturalWidth'] / 2;
    wordleUN82['regY'] = wordleUN82['image']['naturalHeight'] / 2
}

function createHitarea(wordleUN82) {
    wordleUN82['hitArea'] = new createjs.Shape(new createjs.Graphics()['beginFill']('#000')['drawRect'](0, 0, wordleUN82['image']['naturalWidth'], wordleUN82['image']['naturalHeight']))
}
var words_arr = [{
    file: '4letters.json',
    name: '4 LETTERS',
    letters: 4
}, {
    file: '5letters.json',
    name: '5 LETTERS',
    letters: 5
}, {
    file: '6letters.json',
    name: '6 LETTERS',
    letters: 6
}];
var titleSettings = {
    title: [
        ['g', 'u', 'e', 's', 's'],
        ['w', 'o', 'r', 'd']
    ],
    width: 150,
    height: 150,
    round: 10,
    spaceY: 10,
    spaceX: 10,
    fontSize: 80,
    offsetY: 28,
    color: '#fff',
    bgColor: '#202938',
    bgColorCorrect: '#12B882',
    bgColorPosition: '#F79C0C'
};
var wordsSettings = {
    width: 80,
    height: 80,
    round: 5,
    spaceY: 10,
    spaceX: 10,
    fontSize: 40,
    offsetY: 12,
    color: '#fff',
    bgColor: '#202938',
    bgColorCorrect: '#12B882',
    bgColorPosition: '#F79C0C',
    bgColorNotExist: '#0F0F1E',
    chances: 6,
    point: 100,
    pointBar: {
        height: 10,
        round: 5,
        color: '#14396c',
        bgColor: '#1f2938'
    },
    giveup: true,
    hint: true,
    hintTotal: 10,
    totalWordPlay: 5,
    autoClear: true
};
var key_arr = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['delete', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter']
];
var keyboardSettings = {
    width: 48,
    height: 48,
    widthEnter: 100,
    widthDelete: 60,
    widthGiveup: 130,
    widthHint: 130,
    enterCode: 'enter',
    enterKeyCode: 13,
    deleteCode: 'delete',
    deleteKeyCode: 8,
    spaceY: 5,
    spaceX: 5,
    round: 5,
    fontSize: 20,
    offsetY: 8,
    color: '#fff',
    bgColor: '#202938',
    bgColorPress: '#374660'
};
var textDisplay = {
    loading: 'LOADING WORDS...',
    noWord: 'No word in dictionary.',
    wordComplete: 'Word Complete!',
    noChances: 'You tried all chances!',
    wordReveal: 'The answer was "[WORD]".',
    giveup: 'GIVE UP',
    hint: 'HINT',
    point: '[NUMBER]PTS',
    total: '[NUMBER]/[TOTAL]',
    exitTitle: 'EXIT GAME',
    exitMessage: 'ARE YOU SURE\x0AYOU WANT TO\x0AQUIT THE GAME?',
    share: 'SHARE YOUR SCORE',
    resultTitleComplete: 'COMPLETE',
    resultTitleOver: 'GAME OVER',
    resultTimer: 'TIME : [NUMBER]',
    resultDesc: 'SCORE : [NUMBER]PTS',
    resultWord: 'WORD [NUMBER]'
};
var shareEnable = true;
var shareTitle = 'Highscore on Guess Word is [SCORE]PTS';
var shareMessage = '[SCORE]PTS is mine new highscore on Guess Word game! Try it now!';
$['editor'] = {
    enable: false
};
var playerData = {
    score: 0,
    scores: []
};
var gameData = {
    paused: true,
    wordCount: 0,
    animating: false,
    wordNum: 0,
    words: [],
    letters: [],
    score: [],
    chances: 0,
    complete: false,
    keyboard: {
        correct: [],
        position: [],
        notexist: []
    },
    resultNum: 0,
    resultSound: false,
    hint: []
};
var tweenData = {
    score: 0,
    tweenScore: 0
};
var timeData = {
    enable: false,
    startDate: null,
    nowDate: null,
    timer: 0,
    oldTimer: 0
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
    if ($['browser']['mobile'] || isTablet) {} else {
        var wordleUN92 = (window['location'] != window['parent']['location']) ? true : false;
        if (wordleUN92) {
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
    buttonStart['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        buttonStart['visible'] = false;
        selectContainer['visible'] = true
    });
    buttonLetter['cursor'] = 'pointer';
    buttonLetter['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        goPage('game')
    });
    buttonArrowL['cursor'] = 'pointer';
    buttonArrowL['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        toggleLetters(false)
    });
    buttonArrowR['cursor'] = 'pointer';
    buttonArrowR['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        toggleLetters(true)
    });
    itemExit['addEventListener']('click', function (wordleUN93) {});
    buttonContinue['cursor'] = 'pointer';
    buttonContinue['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        goPage('main')
    });
    buttonFacebook['cursor'] = 'pointer';
    buttonFacebook['addEventListener']('click', function (wordleUN93) {
        share('facebook')
    });
    buttonTwitter['cursor'] = 'pointer';
    buttonTwitter['addEventListener']('click', function (wordleUN93) {
        share('twitter')
    });
    buttonWhatsapp['cursor'] = 'pointer';
    buttonWhatsapp['addEventListener']('click', function (wordleUN93) {
        share('whatsapp')
    });
    buttonSoundOff['cursor'] = 'pointer';
    buttonSoundOff['addEventListener']('click', function (wordleUN93) {
        toggleSoundMute(true)
    });
    buttonSoundOn['cursor'] = 'pointer';
    buttonSoundOn['addEventListener']('click', function (wordleUN93) {
        toggleSoundMute(false)
    });
    if (typeof buttonMusicOff != 'undefined') {
        buttonMusicOff['cursor'] = 'pointer';
        buttonMusicOff['addEventListener']('click', function (wordleUN93) {
            toggleMusicMute(true)
        })
    };
    if (typeof buttonMusicOn != 'undefined') {
        buttonMusicOn['cursor'] = 'pointer';
        buttonMusicOn['addEventListener']('click', function (wordleUN93) {
            toggleMusicMute(false)
        })
    };
    buttonFullscreen['cursor'] = 'pointer';
    buttonFullscreen['addEventListener']('click', function (wordleUN93) {
        toggleFullScreen()
    });
    buttonExit['cursor'] = 'pointer';
    buttonExit['addEventListener']('click', function (wordleUN93) {
        togglePop(true);
        toggleOption()
    });
    buttonSettings['cursor'] = 'pointer';
    buttonSettings['addEventListener']('click', function (wordleUN93) {
        toggleOption()
    });
    buttonConfirm['cursor'] = 'pointer';
    buttonConfirm['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        togglePop(false);
        stopAudio();
        stopGame();
        goPage('main')
    });
    buttonCancel['cursor'] = 'pointer';
    buttonCancel['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        togglePop(false)
    });
    buttonResultArrowL['cursor'] = 'pointer';
    buttonResultArrowL['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        toggleResult(false)
    });
    buttonResultArrowR['cursor'] = 'pointer';
    buttonResultArrowR['addEventListener']('click', function (wordleUN93) {
        playSound('soundButton');
        toggleResult(true)
    });
    buildTitle();
    buildKeyboard();
    toggleLetters(true);
    toggleLetters(false);
    preventScrolling()
}

function toggleResult(wordleUN45) {
    if (wordleUN45) {
        gameData['resultNum']++;
        gameData['resultNum'] = gameData['resultNum'] > wordsSettings['totalWordPlay'] - 1 ? wordsSettings['totalWordPlay'] - 1 : gameData['resultNum']
    } else {
        gameData['resultNum']--;
        gameData['resultNum'] = gameData['resultNum'] < -1 ? -1 : gameData['resultNum']++
    };
    showResultStats()
}

function toggleLetters(wordleUN45) {
    if (wordleUN45) {
        gameData['wordNum']++;
        gameData['wordNum'] = gameData['wordNum'] >= words_arr['length'] ? words_arr['length'] - 1 : gameData['wordNum']
    } else {
        gameData['wordNum']--;
        gameData['wordNum'] = gameData['wordNum'] < 0 ? 0 : gameData['wordNum']++
    };
    letterTxt['text'] = words_arr[gameData['wordNum']]['name']
}

function buildTitle() {
    gameData['title'] = [];
    var wordleUN33 = {
        startX: 0,
        startY: 0
    };
    var wordleUN97 = (titleSettings['height'] * titleSettings['title']['length']);
    wordleUN97 = wordleUN97 + (titleSettings['spaceY'] * (titleSettings['title']['length'] - 1));
    wordleUN33['startY'] = -(wordleUN97 / 2);
    for (var wordleUN4d = 0; wordleUN4d < titleSettings['title']['length']; wordleUN4d++) {
        var wordleUN98 = titleSettings['width'] * (titleSettings['title'][wordleUN4d]['length']);
        wordleUN98 = wordleUN98 + (titleSettings['spaceX'] * (titleSettings['title'][wordleUN4d]['length'] - 1));
        wordleUN33['startX'] = -(wordleUN98 / 2);
        for (var wordleUN99 = 0; wordleUN99 < titleSettings['title'][wordleUN4d]['length']; wordleUN99++) {
            var wordleUN9a = titleSettings['width'];
            var wordleUN9b = titleSettings['height'];
            wordleUN33['startX'] += (wordleUN9a / 2);
            $['word'][wordleUN4d + '_title_' + wordleUN99] = new createjs.Container();
            $['word'][wordleUN4d + '_title_' + wordleUN99]['x'] = wordleUN33['startX'];
            $['word'][wordleUN4d + '_title_' + wordleUN99]['y'] = wordleUN33['startY'];
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_bg'] = new createjs.Shape();
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_bg']['fillCommand'] = $['word'][wordleUN4d + '_title_' + wordleUN99 + '_bg']['graphics']['beginFill'](titleSettings['bgColor'])['command'];
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_bg']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, titleSettings['round'], titleSettings['round'], titleSettings['round'], titleSettings['round']);
            $['word'][wordleUN4d + '_title_' + wordleUN99]['bg'] = $['word'][wordleUN4d + '_title_' + wordleUN99 + '_bg'];
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text'] = new createjs.Text();
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']['font'] = titleSettings['fontSize'] + 'px comfortaabold';
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']['color'] = titleSettings['color'];
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']['textAlign'] = 'center';
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']['textBaseline'] = 'alphabetic';
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']['text'] = titleSettings['title'][wordleUN4d][wordleUN99]['toUpperCase']();
            $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']['y'] = titleSettings['offsetY'];
            gameData['title']['push']($['word'][wordleUN4d + '_title_' + wordleUN99]);
            $['word'][wordleUN4d + '_title_' + wordleUN99]['addChild']($['word'][wordleUN4d + '_title_' + wordleUN99 + '_bg'], $['word'][wordleUN4d + '_title_' + wordleUN99 + '_press'], $['word'][wordleUN4d + '_title_' + wordleUN99 + '_text']);
            titleContainer['addChild']($['word'][wordleUN4d + '_title_' + wordleUN99]);
            wordleUN33['startX'] += (wordleUN9a / 2) + titleSettings['spaceX']
        };
        wordleUN33['startY'] += titleSettings['height'] + titleSettings['spaceY']
    }
}

function buildKeyboard() {
    var wordleUN33 = {
        startX: 0,
        startY: 0
    };
    var wordleUN97 = (keyboardSettings['height'] * key_arr['length']);
    wordleUN97 = wordleUN97 + (keyboardSettings['spaceY'] * (key_arr['length'] - 1));
    wordleUN33['startY'] = -(wordleUN97 / 2);
    for (var wordleUN4d = 0; wordleUN4d < key_arr['length']; wordleUN4d++) {
        var wordleUN98 = keyboardSettings['width'] * (key_arr[wordleUN4d]['length']);
        wordleUN98 = wordleUN98 + (keyboardSettings['spaceX'] * (key_arr[wordleUN4d]['length'] - 1));
        if (key_arr[wordleUN4d]['indexOf'](keyboardSettings['enterCode']) != -1) {
            wordleUN98 -= keyboardSettings['width'];
            wordleUN98 += keyboardSettings['widthEnter']
        };
        if (key_arr[wordleUN4d]['indexOf'](keyboardSettings['deleteCode']) != -1) {
            wordleUN98 -= keyboardSettings['width'];
            wordleUN98 += keyboardSettings['widthDelete']
        };
        wordleUN33['startX'] = -(wordleUN98 / 2);
        for (var wordleUN99 = 0; wordleUN99 < key_arr[wordleUN4d]['length']; wordleUN99++) {
            var wordleUN9a = keyboardSettings['width'];
            var wordleUN9b = keyboardSettings['height'];
            if (key_arr[wordleUN4d][wordleUN99] == keyboardSettings['enterCode']) {
                wordleUN9a = keyboardSettings['widthEnter']
            };
            if (key_arr[wordleUN4d][wordleUN99] == keyboardSettings['deleteCode']) {
                wordleUN9a = keyboardSettings['widthDelete']
            };
            wordleUN33['startX'] += (wordleUN9a / 2);
            $['key'][wordleUN4d + '_' + wordleUN99] = new createjs.Container();
            $['key'][wordleUN4d + '_' + wordleUN99]['x'] = wordleUN33['startX'];
            $['key'][wordleUN4d + '_' + wordleUN99]['y'] = wordleUN33['startY'];
            $['key'][wordleUN4d + '_' + wordleUN99]['letter'] = key_arr[wordleUN4d][wordleUN99];
            $['key'][wordleUN4d + '_' + wordleUN99 + '_bg'] = new createjs.Shape();
            $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand'] = $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['graphics']['beginFill'](keyboardSettings['bgColor'])['command'];
            $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round']);
            $['key'][wordleUN4d + '_' + wordleUN99 + '_press'] = new createjs.Shape();
            $['key'][wordleUN4d + '_' + wordleUN99 + '_press']['fillCommand'] = $['key'][wordleUN4d + '_' + wordleUN99 + '_press']['graphics']['beginFill'](keyboardSettings['bgColorPress'])['command'];
            $['key'][wordleUN4d + '_' + wordleUN99 + '_press']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round']);
            $['key'][wordleUN4d + '_' + wordleUN99 + '_press']['alpha'] = 0;
            $['key'][wordleUN4d + '_' + wordleUN99]['bg'] = $['key'][wordleUN4d + '_' + wordleUN99 + '_bg'];
            $['key'][wordleUN4d + '_' + wordleUN99]['bgPress'] = $['key'][wordleUN4d + '_' + wordleUN99 + '_press'];
            if (key_arr[wordleUN4d][wordleUN99] == keyboardSettings['deleteCode']) {
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text'] = new createjs.Bitmap(loader['getResult']('itemDel'));
                centerReg($['key'][wordleUN4d + '_' + wordleUN99 + '_text'])
            } else {
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text'] = new createjs.Text();
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text']['font'] = keyboardSettings['fontSize'] + 'px comfortaabold';
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text']['color'] = keyboardSettings['color'];
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text']['textAlign'] = 'center';
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text']['textBaseline'] = 'alphabetic';
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text']['text'] = key_arr[wordleUN4d][wordleUN99]['toUpperCase']();
                $['key'][wordleUN4d + '_' + wordleUN99 + '_text']['y'] = keyboardSettings['offsetY']
            };
            if (key_arr[wordleUN4d][wordleUN99] != keyboardSettings['deleteCode'] && key_arr[wordleUN4d][wordleUN99] != keyboardSettings['enterCode']) {
                gameData['hint']['push'](key_arr[wordleUN4d][wordleUN99])
            };
            $['key'][wordleUN4d + '_' + wordleUN99]['cursor'] = 'pointer';
            $['key'][wordleUN4d + '_' + wordleUN99]['addEventListener']('click', function (wordleUN93) {
                matchKeyboard(wordleUN93['currentTarget']['letter'])
            });
            $['key'][wordleUN4d + '_' + wordleUN99]['addChild']($['key'][wordleUN4d + '_' + wordleUN99 + '_bg'], $['key'][wordleUN4d + '_' + wordleUN99 + '_press'], $['key'][wordleUN4d + '_' + wordleUN99 + '_text']);
            keyboardContainer['addChild']($['key'][wordleUN4d + '_' + wordleUN99]);
            wordleUN33['startX'] += (wordleUN9a / 2) + keyboardSettings['spaceX']
        };
        wordleUN33['startY'] += keyboardSettings['height'] + keyboardSettings['spaceY']
    };
    var wordleUN9a = keyboardSettings['widthGiveup'];
    var wordleUN9b = keyboardSettings['height'];
    $['key']['giveup'] = new createjs.Container();
    $['key']['giveup']['letter'] = 'giveup';
    $['key']['giveup_bg'] = new createjs.Shape();
    $['key']['giveup_bg']['fillCommand'] = $['key']['giveup_bg']['graphics']['beginFill'](keyboardSettings['bgColor'])['command'];
    $['key']['giveup_bg']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round']);
    $['key']['giveup_press'] = new createjs.Shape();
    $['key']['giveup_press']['fillCommand'] = $['key']['giveup_press']['graphics']['beginFill'](keyboardSettings['bgColorPress'])['command'];
    $['key']['giveup_press']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round']);
    $['key']['giveup_press']['alpha'] = 0;
    $['key']['giveup']['bg'] = $['key']['giveup_bg'];
    $['key']['giveup']['bgPress'] = $['key']['giveup_press'];
    $['key']['giveup_text'] = new createjs.Text();
    $['key']['giveup_text']['font'] = keyboardSettings['fontSize'] + 'px comfortaabold';
    $['key']['giveup_text']['color'] = keyboardSettings['color'];
    $['key']['giveup_text']['textAlign'] = 'center';
    $['key']['giveup_text']['textBaseline'] = 'alphabetic';
    $['key']['giveup_text']['text'] = textDisplay['giveup'];
    $['key']['giveup_text']['y'] = keyboardSettings['offsetY'];
    $['key']['giveup']['cursor'] = 'pointer';
    $['key']['giveup']['addEventListener']('click', function (wordleUN93) {
        matchKeyboard(wordleUN93['currentTarget']['letter'])
    });
    $['key']['giveup']['addChild']($['key']['giveup_bg'], $['key']['giveup_press'], $['key']['giveup_text']);
    var wordleUN9a = keyboardSettings['widthHint'];
    var wordleUN9b = keyboardSettings['height'];
    $['key']['hint'] = new createjs.Container();
    $['key']['hint']['letter'] = 'hint';
    $['key']['hint_bg'] = new createjs.Shape();
    $['key']['hint_bg']['fillCommand'] = $['key']['hint_bg']['graphics']['beginFill'](keyboardSettings['bgColor'])['command'];
    $['key']['hint_bg']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round']);
    $['key']['hint_press'] = new createjs.Shape();
    $['key']['hint_press']['fillCommand'] = $['key']['hint_press']['graphics']['beginFill'](keyboardSettings['bgColorPress'])['command'];
    $['key']['hint_press']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round'], keyboardSettings['round']);
    $['key']['hint_press']['alpha'] = 0;
    $['key']['hint']['bg'] = $['key']['hint_bg'];
    $['key']['hint']['bgPress'] = $['key']['hint_press'];
    $['key']['hint_text'] = new createjs.Text();
    $['key']['hint_text']['font'] = keyboardSettings['fontSize'] + 'px comfortaabold';
    $['key']['hint_text']['color'] = keyboardSettings['color'];
    $['key']['hint_text']['textAlign'] = 'center';
    $['key']['hint_text']['textBaseline'] = 'alphabetic';
    $['key']['hint_text']['text'] = textDisplay['hint'];
    $['key']['hint_text']['y'] = keyboardSettings['offsetY'];
    $['key']['hint']['cursor'] = 'pointer';
    $['key']['hint']['addEventListener']('click', function (wordleUN93) {
        matchKeyboard(wordleUN93['currentTarget']['letter'])
    });
    $['key']['hint']['addChild']($['key']['hint_bg'], $['key']['hint_press'], $['key']['hint_text']);
    gameContainer['addChild']($['key']['giveup'], $['key']['hint'])
}

function buildWordLists() {
    wordsListContainer['removeAllChildren']();
    var wordleUN33 = {
        startX: 0,
        startY: 0
    };
    var wordleUN97 = (wordsSettings['height'] / 2);
    wordleUN33['startY'] = wordleUN97;
    for (var wordleUN4d = 0; wordleUN4d < wordsSettings['chances']; wordleUN4d++) {
        var wordleUN98 = wordsSettings['width'] * (gameData['totalLetters']);
        wordleUN98 = wordleUN98 + (wordsSettings['spaceX'] * (gameData['totalLetters'] - 1));
        wordleUN33['startX'] = -(wordleUN98 / 2);
        for (var wordleUN99 = 0; wordleUN99 < gameData['totalLetters']; wordleUN99++) {
            var wordleUN9a = wordsSettings['width'];
            var wordleUN9b = wordsSettings['height'];
            wordleUN33['startX'] += (wordleUN9a / 2);
            $['word'][wordleUN4d + '_' + wordleUN99] = new createjs.Container();
            $['word'][wordleUN4d + '_' + wordleUN99]['x'] = wordleUN33['startX'];
            $['word'][wordleUN4d + '_' + wordleUN99]['y'] = $['word'][wordleUN4d + '_' + wordleUN99]['oriY'] = wordleUN33['startY'];
            $['word'][wordleUN4d + '_' + wordleUN99 + '_bg'] = new createjs.Shape();
            $['word'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand'] = $['word'][wordleUN4d + '_' + wordleUN99 + '_bg']['graphics']['beginFill'](wordsSettings['bgColor'])['command'];
            $['word'][wordleUN4d + '_' + wordleUN99 + '_bg']['graphics']['drawRoundRectComplex'](-(wordleUN9a / 2), -(wordleUN9b / 2), wordleUN9a, wordleUN9b, wordsSettings['round'], wordsSettings['round'], wordsSettings['round'], wordsSettings['round']);
            $['word'][wordleUN4d + '_' + wordleUN99]['bg'] = $['word'][wordleUN4d + '_' + wordleUN99 + '_bg'];
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text'] = new createjs.Text();
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['font'] = wordsSettings['fontSize'] + 'px comfortaabold';
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['color'] = wordsSettings['color'];
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['textAlign'] = 'center';
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['textBaseline'] = 'alphabetic';
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['text'] = '';
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['x'] = 0;
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['y'] = wordsSettings['offsetY'];
            $['word'][wordleUN4d + '_' + wordleUN99]['addChild']($['word'][wordleUN4d + '_' + wordleUN99 + '_bg'], $['word'][wordleUN4d + '_' + wordleUN99 + '_text']);
            wordsListContainer['addChild']($['word'][wordleUN4d + '_' + wordleUN99]);
            wordleUN33['startX'] += (wordleUN9a / 2) + wordsSettings['spaceX']
        };
        wordleUN33['startY'] += wordsSettings['height'] + wordsSettings['spaceY']
    }
}

function preventScrolling() {
    var wordleUN9f = [32, 38, 37, 40, 39];
    $(window)['on']('keydown', function (wordleUN5b) {
        if (wordleUN9f['indexOf'](wordleUN5b['keyCode']) != -1) {
            wordleUN5b['preventDefault']()
        }
    })
}

function appendFocusFrame() {
    $('#mainHolder')['prepend']('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
    $('#focus')['click'](function () {
        $('#focus')['remove']()
    })
}

function keydown(wordleUN5b) {
    var wordleUNa2 = String['fromCharCode'](wordleUN5b['which']);
    if (wordleUN5b['keyCode'] == keyboardSettings['enterKeyCode']) {
        wordleUNa2 = keyboardSettings['enterCode']
    } else {
        if (wordleUN5b['keyCode'] == keyboardSettings['deleteKeyCode']) {
            wordleUNa2 = keyboardSettings['deleteCode']
        } else {
            if (wordleUN5b['keyCode'] == keyboardSettings['upKeyCode']) {
                wordleUNa2 = keyboardSettings['upCode']
            } else {
                if (wordleUN5b['keyCode'] == keyboardSettings['downKeyCode']) {
                    wordleUNa2 = keyboardSettings['downCode']
                }
            }
        }
    };
    matchKeyboard(wordleUNa2['toLowerCase']())
}

function keyup(wordleUN5b) {}

function togglePop(wordleUN45) {
    confirmContainer['visible'] = wordleUN45
}
var curPage = '';

function goPage(wordleUNa7) {
    curPage = wordleUNa7;
    mainContainer['visible'] = false;
    gameContainer['visible'] = false;
    resultContainer['visible'] = false;
    toggleTitleFlip(false);
    var wordleUNa8 = null;
    switch (wordleUNa7) {
    case 'main':
        wordleUNa8 = mainContainer;
        toggleTitleFlip(true);
        buttonStart['visible'] = true;
        selectContainer['visible'] = false;
        break;
    case 'game':
        wordleUNa8 = gameContainer;
        startGame();
        break;
    case 'result':
        wordleUNa8 = resultContainer;
        stopGame();
        togglePop(false);
        gameData['resultNum'] = -1;
        gameData['resultSound'] = false;
        showResultStats();
        saveGame(playerData['score']);
        break
    };
    if (wordleUNa8 != null) {
        wordleUNa8['visible'] = true;
        wordleUNa8['alpha'] = 0;
        TweenMax['to'](wordleUNa8, 0.5, {
            alpha: 1,
            overwrite: true
        })
    };
    resizeCanvas()
}

function showResultStats() {
    resultDescTxt['text'] = 0;
    tweenData['tweenScore'] = 0;
    var wordleUNaa = 0;
    var wordleUNab = 0;
    var wordleUNac = true;
    if (gameData['resultNum'] == -1) {
        for (var wordleUN4d = 0; wordleUN4d < playerData['scores']['length']; wordleUN4d++) {
            wordleUNaa += playerData['scores'][wordleUN4d]['score'];
            wordleUNab += playerData['scores'][wordleUN4d]['timer'];
            if (!playerData['scores'][wordleUN4d]['complete']) {
                wordleUNac = false
            }
        };
        playerData['score'] = wordleUNaa;
        if (wordleUNac) {
            if (!gameData['resultSound']) {
                gameData['resultSound'] = true;
                playSound('soundComplete')
            };
            resultTitleTxt['text'] = textDisplay['resultTitleComplete']
        } else {
            if (!gameData['resultSound']) {
                gameData['resultSound'] = true;
                playSound('soundOver')
            };
            resultTitleTxt['text'] = textDisplay['resultTitleOver']
        }
    } else {
        wordleUNaa = playerData['scores'][gameData['resultNum']]['score'];
        wordleUNab = playerData['scores'][gameData['resultNum']]['timer'];
        resultTitleTxt['text'] = textDisplay['resultWord']['replace']('[NUMBER]', gameData['resultNum'] + 1)
    };
    TweenMax['to'](tweenData, 0.5, {
        tweenScore: wordleUNaa,
        overwrite: true,
        onUpdate: function () {
            resultDescTxt['text'] = textDisplay['resultDesc']['replace']('[NUMBER]', Math['round'](tweenData['tweenScore']))
        }
    });
    resultTimerTxt['text'] = textDisplay['resultTimer']['replace']('[NUMBER]', millisecondsToTimeGame(wordleUNab));
    buttonResultArrowL['visible'] = false;
    buttonResultArrowR['visible'] = false;
    if (playerData['scores']['length'] > 1) {
        if (gameData['resultNum'] >= 0) {
            buttonResultArrowL['visible'] = true
        };
        if (gameData['resultNum'] < playerData['scores']['length'] - 1) {
            buttonResultArrowR['visible'] = true
        }
    }
}

function toggleTitleFlip(wordleUN45) {
    if (wordleUN45) {
        TweenMax['to'](titleContainer, 1, {
            overwrite: true,
            onComplete: function () {
                var wordleUN82 = gameData['title'][Math['floor'](Math['random']() * gameData['title']['length'])];
                animateTitleFlip(wordleUN82);
                toggleTitleFlip(true)
            }
        })
    } else {
        for (var wordleUN4d = 0; wordleUN4d < gameData['title']['length']; wordleUN4d++) {
            gameData['title'][wordleUN4d]['bg']['fillCommand']['style'] = titleSettings['bgColor'];
            gameData['title'][wordleUN4d]['scaleX'] = gameData['title'][wordleUN4d]['scaleY'] = 1;
            TweenMax['killTweensOf'](gameData['title'][wordleUN4d])
        };
        TweenMax['killTweensOf'](titleContainer)
    }
}

function animateTitleFlip(wordleUN82) {
    titleContainer['setChildIndex'](wordleUN82, titleContainer['numChildren'] - 1);
    TweenMax['to'](wordleUN82, 0.2, {
        scaleY: 0,
        overwrite: true,
        onComplete: function () {
            var wordleUNaf = randomIntFromInterval(1, 3);
            if (wordleUNaf == 1) {
                wordleUN82['bg']['fillCommand']['style'] = titleSettings['bgColor']
            } else {
                if (wordleUNaf == 2) {
                    wordleUN82['bg']['fillCommand']['style'] = titleSettings['bgColorPosition']
                } else {
                    if (wordleUNaf == 3) {
                        wordleUN82['bg']['fillCommand']['style'] = titleSettings['bgColorCorrect']
                    }
                }
            };
            TweenMax['to'](wordleUN82, 1, {
                scaleY: 1,
                overwrite: true,
                ease: Elastic['easeOut']['config'](1, 0.3),
                onComplete: function () {}
            })
        }
    })
}

function startGame() {
    gameData['totalLetters'] = words_arr[gameData['wordNum']]['letters'];
    gameData['wordCount'] = 0;
    playerData['scores'] = [];
    buildWordLists();
    findWord()
}

function stopGame() {
    gameData['paused'] = true;
    TweenMax['killAll'](false, true, false)
}

function saveGame(wordleUNb3) {
    if (typeof toggleScoreboardSave == 'function') {
        $['scoreData']['score'] = wordleUNb3;
        if (typeof type != 'undefined') {
            $['scoreData']['type'] = type
        };
        toggleScoreboardSave(true)
    }
}

function findWord() {
    gameData['paused'] = false;
    $['key']['giveup']['visible'] = wordsSettings['giveup'];
    $['key']['hint']['visible'] = wordsSettings['hint'];
    gameData['complete'] = false;
    gameData['chances'] = 0;
    gameData['letters'] = [];
    gameData['score'] = [];
    gameData['animating'] = false;
    gameData['keyboard']['correct'] = [];
    gameData['keyboard']['position'] = [];
    gameData['keyboard']['notexist'] = [];
    for (var wordleUN4d = 0; wordleUN4d < key_arr['length']; wordleUN4d++) {
        for (var wordleUN99 = 0; wordleUN99 < key_arr[wordleUN4d]['length']; wordleUN99++) {
            $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['alpha'] = 1;
            $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand']['style'] = keyboardSettings['bgColor']
        }
    };
    for (var wordleUN4d = 0; wordleUN4d < wordsSettings['chances']; wordleUN4d++) {
        for (var wordleUN99 = 0; wordleUN99 < gameData['totalLetters']; wordleUN99++) {
            $['word'][wordleUN4d + '_' + wordleUN99 + '_text']['text'] = '';
            $['word'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand']['style'] = wordsSettings['bgColor'];
            $['word'][wordleUN4d + '_' + wordleUN99]['bg']['nextColor'] = '';
            $['word'][wordleUN4d + '_' + wordleUN99]['y'] = $['word'][wordleUN4d + '_' + wordleUN99]['oriY'];
            $['word'][wordleUN4d + '_' + wordleUN99]['scaleX'] = $['word'][wordleUN4d + '_' + wordleUN99]['scaleY'] = 1
        }
    };
    gameData['answer'] = gameData['words'][gameData['wordNum']][Math['floor'](Math['random']() * gameData['words'][gameData['wordNum']]['length'])];
    console['log'](gameData['answer']);
    resizeWordLists();
    playerData['score'] = wordsSettings['point'];
    updateScore();
    updateTotal();
    gameStatusTxt['alpha'] = 0;
    toggleGameTimer(true);
    wordsContainer['alpha'] = 0;
    TweenMax['to'](wordsContainer, 0.5, {
        alpha: 1,
        overwrite: true,
        onUpdate: function () {}
    })
}

function resizeWordLists() {
    wordsContainer['scaleX'] = wordsContainer['scaleY'] = 1;
    keyboardContainer['scaleX'] = keyboardContainer['scaleY'] = 1;
    var wordleUNb6 = wordsSettings['chances'] * wordsSettings['height'];
    wordleUNb6 += (wordsSettings['chances'] - 1) * wordsSettings['spaceY'];
    $['key']['giveup']['y'] = wordleUNb6 + 190;
    $['key']['hint']['y'] = wordleUNb6 + 190;
    $['key']['giveup']['scaleX'] = $['key']['giveup']['scaleY'] = 1;
    $['key']['hint']['scaleX'] = $['key']['hint']['scaleY'] = 1;
    gameStatusTxt['y'] = wordleUNb6 + 35;
    var wordleUNb7 = 1;
    if (viewport['isLandscape']) {
        $['key']['hint']['y'] = scoreContainer['y'] + 60;
        $['key']['giveup']['y'] = scoreContainer['y'] + 60;
        var scalePercent = 370 / wordleUNb6;
        wordsContainer['scaleX'] = wordsContainer['scaleY'] = scalePercent;
        wordleUNb7 = 0.8;
        keyboardContainer['scaleX'] = keyboardContainer['scaleY'] = wordleUNb7;
        $['key']['giveup']['scaleX'] = $['key']['giveup']['scaleY'] = wordleUNb7;
        $['key']['hint']['scaleX'] = $['key']['hint']['scaleY'] = wordleUNb7
    };
    if ($['key']['giveup']['visible'] && $['key']['hint']['visible']) {
        $['key']['giveup']['x'] = scoreContainer['x'] + (((keyboardSettings['widthGiveup'] / 2) + 10) * wordleUNb7);
        $['key']['hint']['x'] = scoreContainer['x'] - (((keyboardSettings['widthHint'] / 2) + 10) * wordleUNb7)
    } else {
        $['key']['giveup']['x'] = scoreContainer['x'];
        $['key']['hint']['x'] = scoreContainer['x']
    };
    updateScore()
}

function updateScore() {
    var wordleUNba = gameData['totalLetters'] * wordsSettings['width'];
    wordleUNba += (gameData['totalLetters'] - 1) * wordsSettings['spaceX'];
    var wordleUNbb = wordsSettings['pointBar']['height'];
    if (viewport['isLandscape']) {
        wordleUNba = wordleUNba / 3
    };
    gameScoreBg['graphics']['clear']();
    gameScoreBg['graphics']['beginFill'](wordsSettings['pointBar']['bgColor'])['drawRoundRectComplex'](-(wordleUNba / 2), -(wordleUNbb / 2), wordleUNba, wordleUNbb, wordsSettings['pointBar']['round'], wordsSettings['pointBar']['round'], wordsSettings['pointBar']['round'], wordsSettings['pointBar']['round']);
    TweenMax['to'](gameScore, 0.5, {
        barW: playerData['score'],
        overwrite: true,
        onUpdate: function () {
            gameScoreTxt['text'] = textDisplay['point']['replace']('[NUMBER]', Math['round'](gameScore['barW']));
            var wordleUNbc = gameScore['barW'] / 100 * wordleUNba;
            wordleUNbc = wordleUNbc < 10 ? 10 : wordleUNbc;
            gameScore['graphics']['clear']()['beginFill'](wordsSettings['pointBar']['color'])['drawRoundRectComplex'](-(wordleUNba / 2), -(wordleUNbb / 2), wordleUNbc, wordleUNbb, wordsSettings['pointBar']['round'], wordsSettings['pointBar']['round'], wordsSettings['pointBar']['round'], wordsSettings['pointBar']['round'])
        }
    })
}

function updateTotal() {
    var wordleUNbe = textDisplay['total']['replace']('[NUMBER]', gameData['wordCount'] + 1);
    wordleUNbe = wordleUNbe['replace']('[TOTAL]', wordsSettings['totalWordPlay']);
    gameTotalTxt['text'] = wordleUNbe;
    if (wordsSettings['totalWordPlay'] == 1) {
        totalContainer['visible'] = false
    }
}

function matchKeyboard(wordleUNa2) {
    if (gameData['paused']) {
        return
    };
    if (gameData['animating']) {
        return
    };
    for (var wordleUN4d = 0; wordleUN4d < key_arr['length']; wordleUN4d++) {
        for (var wordleUN99 = 0; wordleUN99 < key_arr[wordleUN4d]['length']; wordleUN99++) {
            if (wordleUNa2 == key_arr[wordleUN4d][wordleUN99]['toLowerCase']()) {
                if (wordleUNa2 == keyboardSettings['enterCode']) {
                    playSound('soundEnter')
                } else {
                    playSound('soundKey')
                };
                animateKeyboard($['key'][wordleUN4d + '_' + wordleUN99]['bgPress']);
                updateLetter(wordleUNa2)
            }
        }
    };
    if (wordleUNa2 == 'giveup') {
        gameData['complete'] = false;
        playSound('soundEnter');
        animateKeyboard($['key']['giveup']['bgPress']);
        playerData['score'] = 0;
        updateScore();
        $['key']['giveup']['visible'] = false;
        $['key']['hint']['visible'] = false;
        displayStatus('giveup');
        endGame(3)
    };
    if (wordleUNa2 == 'hint') {
        playSound('soundEnter');
        animateKeyboard($['key']['hint']['bgPress']);
        $['key']['hint']['visible'] = false;
        resizeWordLists();
        showWordHint()
    }
}

function showWordHint() {
    shuffle(gameData['hint']);
    var wordleUNc1 = [];
    for (var wordleUN4d = 0; wordleUN4d < gameData['answer']['length']; wordleUN4d++) {
        wordleUNc1['push'](gameData['answer']['substring'](wordleUN4d, wordleUN4d + 1))
    };
    var wordleUNc2 = wordsSettings['hintTotal'];
    for (var wordleUN4d = 0; wordleUN4d < gameData['hint']['length']; wordleUN4d++) {
        var wordleUNc3 = gameData['hint'][wordleUN4d];
        if (wordleUNc1['indexOf'](wordleUNc3) == -1 && gameData['keyboard']['notexist']['indexOf'](wordleUNc3) == -1) {
            gameData['keyboard']['notexist']['push'](wordleUNc3);
            wordleUNc2--
        };
        if (wordleUNc2 == 0) {
            wordleUN4d = gameData['hint']['length']
        }
    };
    highlightKeyboard();
    var wordleUNc4 = Math['floor'](wordsSettings['point'] / 100 * ((wordsSettings['chances'] - gameData['chances']) * 2));
    playerData['score'] -= wordleUNc4;
    updateScore()
}

function animateKeyboard(wordleUN82) {
    var wordleUNc6 = 0.2;
    wordleUN82['alpha'] = 0;
    TweenMax['to'](wordleUN82, wordleUNc6, {
        alpha: 1,
        overwrite: true,
        onComplete: function () {
            TweenMax['to'](wordleUN82, wordleUNc6, {
                alpha: 0,
                overwrite: true,
                onComplete: function () {}
            })
        }
    })
}

function updateLetter(wordleUNa2) {
    if (wordleUNa2 == keyboardSettings['enterCode']) {
        if (gameData['letters']['length'] == gameData['totalLetters']) {
            checkWord()
        }
    } else {
        if (wordleUNa2 == keyboardSettings['deleteCode']) {
            if (gameData['letters']['length'] > 0) {
                $['word'][gameData['chances'] + '_' + (gameData['letters']['length'] - 1) + '_text']['text'] = '';
                gameData['letters']['splice'](gameData['letters']['length'] - 1, 1)
            }
        } else {
            if (gameData['letters']['length'] < gameData['totalLetters']) {
                gameData['letters']['push'](wordleUNa2);
                $['word'][gameData['chances'] + '_' + (gameData['letters']['length'] - 1) + '_text']['text'] = wordleUNa2['toUpperCase']()
            }
        }
    }
}

function checkWord() {
    var wordleUNc9 = '';
    for (var wordleUN4d = 0; wordleUN4d < gameData['letters']['length']; wordleUN4d++) {
        wordleUNc9 += gameData['letters'][wordleUN4d]
    };
    if (gameData['words'][gameData['wordNum']]['indexOf'](wordleUNc9) != -1) {
        highlightWord(wordleUNc9)
    } else {
        if (wordsSettings['autoClear']) {
            for (var wordleUN99 = 0; wordleUN99 < gameData['totalLetters']; wordleUN99++) {
                $['word'][gameData['chances'] + '_' + wordleUN99 + '_text']['text'] = ''
            };
            gameData['letters'] = []
        };
        playSound('soundError');
        displayStatus('error')
    }
}

function displayStatus(wordleUNcb) {
    var wordleUNcc = '';
    if (wordleUNcb == 'error') {
        wordleUNcc = textDisplay['noWord']
    } else {
        if (wordleUNcb == 'complete') {
            wordleUNcc = textDisplay['wordComplete']
        } else {
            if (wordleUNcb == 'chances') {
                wordleUNcc = textDisplay['noChances']
            } else {
                if (wordleUNcb == 'giveup') {
                    wordleUNcc = textDisplay['wordReveal']['replace']('[WORD]', gameData['answer']['toUpperCase']())
                }
            }
        }
    };
    gameStatusTxt['text'] = wordleUNcc;
    gameStatusTxt['alpha'] = 0;
    TweenMax['to'](gameStatusTxt, 0.5, {
        alpha: 1,
        overwrite: true,
        onComplete: function () {
            TweenMax['to'](gameStatusTxt, 0.5, {
                delay: 1.5,
                alpha: 0,
                overwrite: true,
                onComplete: function () {}
            })
        }
    });
    TweenMax['to']($['key']['giveup'], 0.5, {
        alpha: 0,
        overwrite: true,
        onComplete: function () {
            TweenMax['to']($['key']['giveup'], 0.5, {
                delay: 1.5,
                alpha: 1,
                overwrite: true,
                onComplete: function () {}
            })
        }
    });
    TweenMax['to']($['key']['hint'], 0.5, {
        alpha: 0,
        overwrite: true,
        onComplete: function () {
            TweenMax['to']($['key']['hint'], 0.5, {
                delay: 1.5,
                alpha: 1,
                overwrite: true,
                onComplete: function () {}
            })
        }
    })
}

function highlightWord(wordleUNc9) {
    var wordleUNce = Math['floor'](wordsSettings['point'] / wordsSettings['chances']);
    var wordleUNcf = Math['floor'](wordleUNce / gameData['totalLetters']);
    var wordleUNd0 = Math['floor'](wordleUNcf / 2);
    playerData['score'] -= wordleUNce;
    var wordleUNd1 = [];
    var wordleUNd2 = [];
    var wordleUNd3 = 0;
    for (var wordleUN4d = 0; wordleUN4d < gameData['totalLetters']; wordleUN4d++) {
        if (wordleUNc9['substring'](wordleUN4d, wordleUN4d + 1) == gameData['answer']['substring'](wordleUN4d, wordleUN4d + 1)) {
            wordleUNd1['push'](wordleUN4d);
            $['word'][gameData['chances'] + '_' + wordleUN4d + '_bg']['nextColor'] = wordsSettings['bgColorCorrect'];
            gameData['keyboard']['correct']['push'](gameData['answer']['substring'](wordleUN4d, wordleUN4d + 1));
            wordleUNd3++;
            if (gameData['score']['indexOf'](wordleUN4d) == -1) {
                gameData['score']['push'](wordleUN4d)
            };
            playerData['score'] += wordleUNcf
        } else {
            wordleUNd2['push'](gameData['answer']['substring'](wordleUN4d, wordleUN4d + 1))
        }
    };
    for (var wordleUN4d = 0; wordleUN4d < gameData['totalLetters']; wordleUN4d++) {
        if (wordleUNd1['indexOf'](wordleUN4d) == -1) {
            var wordleUNd4 = wordleUNd2['indexOf'](wordleUNc9['substring'](wordleUN4d, wordleUN4d + 1));
            if (wordleUNd4 != -1) {
                playerData['score'] += wordleUNd0;
                wordleUNd2['splice'](wordleUNd4, 1);
                wordleUNd1['push'](wordleUN4d);
                $['word'][gameData['chances'] + '_' + wordleUN4d + '_bg']['nextColor'] = wordsSettings['bgColorPosition'];
                gameData['keyboard']['position']['push'](wordleUNc9['substring'](wordleUN4d, wordleUN4d + 1))
            }
        }
    };
    for (var wordleUN4d = 0; wordleUN4d < gameData['totalLetters']; wordleUN4d++) {
        if (wordleUNd1['indexOf'](wordleUN4d) == -1) {
            $['word'][gameData['chances'] + '_' + wordleUN4d + '_bg']['nextColor'] = wordsSettings['bgColorNotExist'];
            gameData['keyboard']['notexist']['push'](wordleUNc9['substring'](wordleUN4d, wordleUN4d + 1))
        }
    };
    if (wordleUNd3 == gameData['totalLetters']) {
        $['key']['giveup']['visible'] = false;
        $['key']['hint']['visible'] = false;
        if (gameData['chances'] == 0) {
            playerData['score'] = wordsSettings['point']
        };
        gameData['complete'] = true;
        gameData['completeAnimation'] = false
    };
    playSound('soundNothing');
    animateWords('flip')
}

function highlightKeyboard() {
    for (var wordleUN4d = 0; wordleUN4d < key_arr['length']; wordleUN4d++) {
        for (var wordleUN99 = 0; wordleUN99 < key_arr[wordleUN4d]['length']; wordleUN99++) {
            if (gameData['keyboard']['notexist']['indexOf'](key_arr[wordleUN4d][wordleUN99]) != -1) {
                $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand']['style'] = wordsSettings['bgColorNotExist'];
                $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['alpha'] = 0;
                TweenMax['to']($['key'][wordleUN4d + '_' + wordleUN99 + '_bg'], 0.5, {
                    alpha: 1,
                    overwrite: true
                })
            }
        }
    };
    for (var wordleUN4d = 0; wordleUN4d < key_arr['length']; wordleUN4d++) {
        for (var wordleUN99 = 0; wordleUN99 < key_arr[wordleUN4d]['length']; wordleUN99++) {
            if (gameData['keyboard']['position']['indexOf'](key_arr[wordleUN4d][wordleUN99]) != -1) {
                $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand']['style'] = wordsSettings['bgColorPosition'];
                $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['alpha'] = 0;
                TweenMax['to']($['key'][wordleUN4d + '_' + wordleUN99 + '_bg'], 0.5, {
                    alpha: 1,
                    overwrite: true
                })
            }
        }
    };
    for (var wordleUN4d = 0; wordleUN4d < key_arr['length']; wordleUN4d++) {
        for (var wordleUN99 = 0; wordleUN99 < key_arr[wordleUN4d]['length']; wordleUN99++) {
            if (gameData['keyboard']['correct']['indexOf'](key_arr[wordleUN4d][wordleUN99]) != -1) {
                $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['fillCommand']['style'] = wordsSettings['bgColorCorrect'];
                $['key'][wordleUN4d + '_' + wordleUN99 + '_bg']['alpha'] = 0;
                TweenMax['to']($['key'][wordleUN4d + '_' + wordleUN99 + '_bg'], 0.5, {
                    alpha: 1,
                    overwrite: true
                })
            }
        }
    }
}

function animateWords(wordleUN45) {
    gameData['animating'] = true;
    gameData['animateCount'] = 0;
    for (var wordleUN4d = 0; wordleUN4d < gameData['totalLetters']; wordleUN4d++) {
        if (wordleUN45 == 'flip') {
            animateFlip($['word'][gameData['chances'] + '_' + wordleUN4d], wordleUN4d * 0.2)
        } else {
            animateBounce($['word'][gameData['chances'] + '_' + wordleUN4d], wordleUN4d * 0.2)
        }
    }
}

function animateFlip(wordleUN82, wordleUNd8) {
    TweenMax['to'](wordleUN82, 0.2, {
        delay: wordleUNd8,
        scaleY: 0,
        overwrite: true,
        onComplete: function () {
            if (wordleUN82['bg']['nextColor'] != '') {
                wordleUN82['bg']['fillCommand']['style'] = wordleUN82['bg']['nextColor']
            };
            TweenMax['to'](wordleUN82, 1, {
                scaleY: 1,
                overwrite: true,
                ease: Elastic['easeOut']['config'](1, 0.3),
                onComplete: function () {
                    animateLetterComplete()
                }
            })
        }
    })
}

function animateBounce(wordleUN82, wordleUNd8) {
    TweenMax['to'](wordleUN82, 0.2, {
        delay: wordleUNd8,
        y: wordleUN82['oriY'] - 20,
        overwrite: true,
        onComplete: function () {
            if (wordleUN82['bg']['nextColor'] != '') {
                wordleUN82['bg']['fillCommand']['style'] = wordleUN82['bg']['nextColor']
            };
            TweenMax['to'](wordleUN82, 1, {
                y: wordleUN82['oriY'],
                overwrite: true,
                ease: Elastic['easeOut']['config'](1, 0.3),
                onComplete: function () {
                    animateLetterComplete()
                }
            })
        }
    })
}

function animateLetterComplete() {
    gameData['animateCount']++;
    if (gameData['animateCount'] >= gameData['totalLetters']) {
        gameData['animating'] = false;
        if (gameData['complete']) {
            if (gameData['completeAnimation']) {
                endGame(2)
            } else {
                gameData['completeAnimation'] = true;
                playSound('soundSuccess');
                displayStatus('complete');
                animateWords('bounce')
            }
        } else {
            playSound('soundSomething');
            highlightKeyboard();
            gameData['chances']++;
            gameData['letters'] = [];
            updateScore();
            if (gameData['chances'] >= wordsSettings['chances']) {
                displayStatus('chances');
                endGame(3)
            }
        }
    }
}

function toggleGameTimer(wordleUN45) {
    if (wordleUN45) {
        timeData['startDate'] = new Date()
    } else {};
    timeData['enable'] = wordleUN45
}

function updateGame() {
    if (!gameData['paused']) {
        if (timeData['enable']) {
            timeData['nowDate'] = new Date();
            timeData['elapsedTime'] = Math['floor']((timeData['nowDate']['getTime']() - timeData['startDate']['getTime']()));
            timeData['timer'] = (timeData['elapsedTime'])
        }
    }
}

function endGame(wordleUNde) {
    gameData['paused'] = true;
    toggleGameTimer(false);
    playerData['scores']['push']({
        timer: timeData['timer'],
        score: playerData['score'],
        complete: gameData['complete']
    });
    gameData['wordCount']++;
    TweenMax['to'](gameContainer, wordleUNde, {
        overwrite: true,
        onComplete: function () {
            if (gameData['wordCount'] >= wordsSettings['totalWordPlay']) {
                goPage('result')
            } else {
                findWord()
            }
        }
    })
}

function millisecondsToTimeGame(wordleUNe0) {
    var wordleUNe1 = wordleUNe0 % 1000;
    var wordleUNe2 = Math['floor']((wordleUNe0 / 1000) % 60);
    var wordleUNe3 = Math['floor']((wordleUNe0 / (60 * 1000)) % 60);
    if (wordleUNe2 < 10) {
        wordleUNe2 = '0' + wordleUNe2
    };
    if (wordleUNe3 < 10) {
        wordleUNe3 = '0' + wordleUNe3
    };
    return wordleUNe3 + ':' + wordleUNe2
}

function toggleOption() {
    if (optionsContainer['visible']) {
        optionsContainer['visible'] = false
    } else {
        optionsContainer['visible'] = true
    }
}

function loadJSON() {
    buttonStart['visible'] = false;
    loadingTxt['visible'] = true;
    loopJSONFile()
}

function loopJSONFile() {
    $['getJSON'](words_arr[gameData['wordNum']]['file'], function (wordleUNe7) {
        gameData['words']['push']([]);
        gameData['words'][gameData['wordNum']] = wordleUNe7;
        console['log'](gameData['words'][gameData['wordNum']]['length']);
        gameData['wordNum']++;
        if (gameData['wordNum'] < words_arr['length']) {
            loopJSONFile()
        } else {
            gameData['wordNum'] = 0;
            buttonStart['visible'] = true;
            loadingTxt['visible'] = false
        }
    })['fail'](function () {})
}

function toggleSoundMute(wordleUN45) {
    buttonSoundOff['visible'] = false;
    buttonSoundOn['visible'] = false;
    toggleSoundInMute(wordleUN45);
    if (wordleUN45) {
        buttonSoundOn['visible'] = true
    } else {
        buttonSoundOff['visible'] = true
    }
}

function toggleMusicMute(wordleUN45) {
    buttonMusicOff['visible'] = false;
    buttonMusicOn['visible'] = false;
    toggleMusicInMute(wordleUN45);
    if (wordleUN45) {
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

function share(wordleUNec) {
    gtag('event', 'click', {
        'event_category': 'share',
        'event_label': wordleUNec
    });
    var wordleUNed = location['href'];
    wordleUNed = wordleUNed['substring'](0, wordleUNed['lastIndexOf']('/') + 1);
    var wordleUNee = '';
    var wordleUNef = '';
    wordleUNee = shareTitle['replace']('[SCORE]', playerData['score']);
    wordleUNef = shareMessage['replace']('[SCORE]', playerData['score']);
    var wordleUNf0 = '';
    if (wordleUNec == 'twitter') {
        wordleUNf0 = 'https://twitter.com/intent/tweet?url=' + wordleUNed + '&text=' + wordleUNef
    } else {
        if (wordleUNec == 'facebook') {
            wordleUNf0 = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(wordleUNed + 'share.php?desc=' + wordleUNef + '&title=' + wordleUNee + '&url=' + wordleUNed + '&thumb=' + wordleUNed + 'share.jpg&width=590&height=300')
        } else {
            if (wordleUNec == 'google') {
                wordleUNf0 = 'https://plus.google.com/share?url=' + wordleUNed
            } else {
                if (wordleUNec == 'whatsapp') {
                    wordleUNf0 = 'whatsapp://send?text=' + encodeURIComponent(wordleUNef) + ' - ' + encodeURIComponent(wordleUNed)
                }
            }
        }
    };
    window['open'](wordleUNf0)
}
var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;
var viewport = {
    isLandscape: true
};
var landscapeSize = {
    w: stageW,
    h: stageH,
    cW: contentW,
    cH: contentH
};
var portraitSize = {
    w: 768,
    h: 1024,
    cW: 576,
    cH: 900
};

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
    goPage('main');
    loadJSON();
    checkMobileOrientation();
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
        var wordleUNfc = ((stageW) * scalePercent);
        var wordleUNfd = ((stageH) * scalePercent);
        offset['left'] = 0;
        offset['top'] = 0;
        if (wordleUNfc > windowW) {
            offset['left'] = -((wordleUNfc) - windowW)
        } else {
            offset['left'] = windowW - (wordleUNfc)
        };
        if (wordleUNfd > windowH) {
            offset['top'] = -((wordleUNfd) - windowH)
        } else {
            offset['top'] = windowH - (wordleUNfd)
        };
        offset['x'] = 0;
        offset['y'] = 0;
        if (offset['left'] < 0) {
            offset['x'] = Math['abs']((offset['left'] / scalePercent) / 2)
        };
        if (offset['top'] < 0) {
            offset['y'] = Math['abs']((offset['top'] / scalePercent) / 2)
        };
        $('canvas')['css']('width', wordleUNfc);
        $('canvas')['css']('height', wordleUNfd);
        $('canvas')['css']('left', (offset['left'] / 2));
        $('canvas')['css']('top', (offset['top'] / 2));
        $(window)['scrollTop'](0);
        resizeCanvas();
        if (typeof resizeScore == 'function') {
            resizeScore()
        }
    }, 100)
}
var resizeTimer;

function checkMobileEvent() {
    if ($['browser']['mobile'] || isTablet) {
        $(window)['off']('orientationchange')['on']('orientationchange', function (wordleUN5b) {
            $('#canvasHolder')['hide']();
            $('#rotateHolder')['hide']();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkMobileOrientation, 1000)
        });
        checkMobileOrientation()
    }
}

function checkMobileOrientation() {
    var wordleUN7a = false;
    if (window['innerWidth'] > window['innerHeight']) {
        wordleUN7a = true
    };
    if ($['editor']['enable']) {
        viewport['isLandscape'] = edit['isLandscape']
    } else {
        viewport['isLandscape'] = wordleUN7a
    };
    changeViewport(viewport['isLandscape']);
    resizeGameFunc();
    $('#canvasHolder')['show']()
}

function toggleRotate(wordleUN45) {
    if (wordleUN45) {
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
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMobileOrientation, 1000)
    });
    resizeGameFunc();
    loader = new createjs.LoadQueue(false);
    manifest = [{
        src: 'assets/background.png',
        id: 'background'
    }, {
        src: 'assets/background_p.png',
        id: 'backgroundP'
    }, {
        src: 'assets/button_start.png',
        id: 'buttonStart'
    }, {
        src: 'assets/item_del.png',
        id: 'itemDel'
    }, {
        src: 'assets/button_arrow.png',
        id: 'buttonArrow'
    }, {
        src: 'assets/button_letter.png',
        id: 'buttonLetter'
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
        src: 'assets/button_continue.png',
        id: 'buttonContinue'
    }, {
        src: 'assets/item_pop.png',
        id: 'itemPop'
    }, {
        src: 'assets/item_pop_p.png',
        id: 'itemPopP'
    }, {
        src: 'assets/item_pop2.png',
        id: 'itemPop2'
    }, {
        src: 'assets/item_pop_p2.png',
        id: 'itemPopP2'
    }, {
        src: 'assets/button_confirm.png',
        id: 'buttonConfirm'
    }, {
        src: 'assets/button_cancel.png',
        id: 'buttonCancel'
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
        src: 'assets/button_exit.png',
        id: 'buttonExit'
    }, {
        src: 'assets/button_settings.png',
        id: 'buttonSettings'
    }];
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
            src: 'assets/sounds/sound_click.ogg',
            id: 'soundButton'
        });
        manifest['push']({
            src: 'assets/sounds/sound_over.ogg',
            id: 'soundOver'
        });
        manifest['push']({
            src: 'assets/sounds/sound_complete.ogg',
            id: 'soundComplete'
        });
        manifest['push']({
            src: 'assets/sounds/sound_enter.ogg',
            id: 'soundKey'
        });
        manifest['push']({
            src: 'assets/sounds/sound_key.ogg',
            id: 'soundEnter'
        });
        manifest['push']({
            src: 'assets/sounds/sound_nothing.ogg',
            id: 'soundNothing'
        });
        manifest['push']({
            src: 'assets/sounds/sound_something.ogg',
            id: 'soundSomething'
        });
        manifest['push']({
            src: 'assets/sounds/sound_success.ogg',
            id: 'soundSuccess'
        });
        manifest['push']({
            src: 'assets/sounds/sound_error.ogg',
            id: 'soundError'
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

function fileComplete(wordleUN93) {
    var wordleUN104 = wordleUN93['item']
}

function handleFileError(wordleUN93) {
    console['log']('error ', wordleUN93)
}

function handleProgress() {
    $('#mainLoader span')['html'](Math['round'](loader['progress'] / 1 * 100) + '%')
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(wordleUN45) {
    if (wordleUN45) {
        $('#mainLoader')['show']()
    } else {
        $('#mainLoader')['hide']()
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var wordleUN10a = function () {
        try {
            if (createjs['WebAudioPlugin']['context']['state'] === 'suspended') {
                createjs['WebAudioPlugin']['context']['resume']();
                window['removeEventListener']('click', wordleUN10a)
            }
        } catch (e) {
            console['error']('There was an error while trying to resume the SoundJS Web Audio context...');
            console['error'](e)
        }
    };
    window['addEventListener']('click', wordleUN10a);
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
    var wordleUN10f = document['createElement']('canvas');
    if (wordleUN10f['getContext']) {
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