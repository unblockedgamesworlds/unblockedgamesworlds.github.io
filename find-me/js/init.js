(function () {
    var findMe1;
    var findMe2 = function () {};
    var findMe3 = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var findMe4 = findMe3['length'];
    var findMe5 = (window['console'] = window['console'] || {});
    while (findMe4--) {
        findMe1 = findMe3[findMe4];
        if (!findMe5[findMe1]) {
            findMe5[findMe1] = findMe2
        }
    }
}());

function checkContentHeight(findMe7) {
    var stageHeight = $(window)['height']();
    var findMe9 = (stageHeight / 2) - (findMe7['height']() / 2);
    return findMe9
}

function checkContentWidth(findMe7) {
    var stageWidth = $(window)['width']();
    var findMec = (stageWidth / 2) - (findMe7['width']() / 2);
    return findMec
}

function getDeviceVer() {
    var findMee = navigator['userAgent'];
    var findMef;
    if (findMee['match'](/(iPad|iPhone|iPod touch)/)) {
        userOS = 'iOS';
        findMef = findMee['indexOf']('OS ')
    } else {
        if (findMee['match'](/Android/)) {
            userOS = 'Android';
            findMef = findMee['indexOf']('Android ')
        } else {
            userOS = 'unknown'
        }
    };
    if (userOS === 'iOS' && findMef > -1) {
        userOSver = findMee['substr'](findMef + 3, 3)['replace']('_', '.')
    } else {
        if (userOS === 'Android' && findMef > -1) {
            userOSver = findMee['substr'](findMef + 8, 3)
        } else {
            userOSver = 'unknown'
        }
    };
    return Number(userOSver)
}

function shuffle(findMe11) {
    var findMe12 = findMe11['length'],
        findMe13, findMe14;
    while (0 !== findMe12) {
        findMe14 = Math['floor'](Math['random']() * findMe12);
        findMe12 -= 1;
        findMe13 = findMe11[findMe12];
        findMe11[findMe12] = findMe11[findMe14];
        findMe11[findMe14] = findMe13
    };
    return findMe11
}

function randomBoolean() {
    return Math['random']() < 0.5
}

function getDistance(findMe17, findMe18, findMe19, findMe1a) {
    var findMe1b = Math['sqrt'](Math['pow'](findMe17 - findMe19, 2) + Math['pow'](findMe18 - findMe1a, 2));
    return findMe1b
}

function sortOnObject(findMe11, findMe1d, findMe1e) {
    if (findMe1e) {
        findMe11['sort'](function (findMe1f, findMe20) {
            var findMe21 = findMe1f[findMe1d],
                findMe22 = findMe20[findMe1d];
            if (findMe21 == findMe22) {
                return 0
            };
            return findMe21 < findMe22 ? 1 : -1
        })
    } else {
        findMe11['sort'](function (findMe1f, findMe20) {
            var findMe21 = findMe1f[findMe1d],
                findMe22 = findMe20[findMe1d];
            if (findMe21 == findMe22) {
                return 0
            };
            return findMe21 > findMe22 ? 1 : -1
        })
    };
    return findMe11
}

function randomIntFromInterval(findMe24, findMe25) {
    return Math['floor'](Math['random']() * (findMe25 - findMe24 + 1) + findMe24)
}

function addCommas(findMe27) {
    findMe27 += '';
    x = findMe27['split']('.');
    x1 = x[0];
    x2 = x['length'] > 1 ? '.' + x[1] : '';
    var findMe28 = /(\d+)(\d{3})/;
    while (findMe28['test'](x1)) {
        x1 = x1['replace'](findMe28, '$1' + ',' + '$2')
    };
    return x1 + x2
}

function swapArray(findMe2a, findMe2b, findMe2c) {
    var findMe2d = findMe2a[findMe2b];
    findMe2a[findMe2b] = findMe2a[findMe2c];
    findMe2a[findMe2c] = findMe2d
}

function getCenterPosition(findMe2f, findMe30, findMe31, findMe32) {
    var findMe33 = {
        x: 0,
        y: 0
    };
    findMe33['x'] = (findMe2f + findMe31) / 2;
    findMe33['y'] = (findMe30 + findMe32) / 2;
    return findMe33
}

function isEven(findMe35) {
    if (findMe35 % 2 == 0) {
        return true
    } else {
        return false
    }
}

function getDirection(findMe37, findMe38, findMe39, findMe3a) {
    var findMe3b = 180 / Math['PI'];
    var findMe3c = -(Math['atan2'](findMe39 - findMe37, findMe3a - findMe38)) * findMe3b;
    return Math['round'](findMe3c + 180)
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

function playSound(findMe47, findMe48) {
    if (soundOn) {
        var findMe49 = soundID;
        soundPushArr['push'](findMe49);
        soundID++;
        var findMe4a = findMe48 == undefined ? 1 : findMe48;
        $['sound'][findMe49] = createjs['Sound']['play'](findMe47);
        $['sound'][findMe49]['defaultVol'] = findMe4a;
        setSoundVolume(findMe49);
        $['sound'][findMe49]['removeAllEventListeners']();
        $['sound'][findMe49]['addEventListener']('complete', function () {
            var findMe4b = soundPushArr['indexOf'](findMe49);
            if (findMe4b != -1) {
                soundPushArr['splice'](findMe4b, 1)
            }
        })
    }
}

function playSoundLoop(findMe47) {
    if (soundOn) {
        if ($['sound'][findMe47] == null) {
            soundLoopPushArr['push'](findMe47);
            $['sound'][findMe47] = createjs['Sound']['play'](findMe47);
            $['sound'][findMe47]['defaultVol'] = 1;
            setSoundLoopVolume(findMe47);
            $['sound'][findMe47]['removeAllEventListeners']();
            $['sound'][findMe47]['addEventListener']('complete', function () {
                $['sound'][findMe47]['play']()
            })
        }
    }
}

function toggleSoundLoop(findMe47, findMe4e) {
    if (soundOn) {
        if ($['sound'][findMe47] != null) {
            if (findMe4e) {
                $['sound'][findMe47]['play']()
            } else {
                $['sound'][findMe47]['paused'] = true
            }
        }
    }
}

function stopSoundLoop(findMe47) {
    if (soundOn) {
        if ($['sound'][findMe47] != null) {
            $['sound'][findMe47]['stop']();
            $['sound'][findMe47] = null;
            var findMe50 = soundLoopPushArr['indexOf'](findMe47);
            if (findMe50 != -1) {
                soundLoopPushArr['splice'](findMe50, 1)
            }
        }
    }
}

function playMusicLoop(findMe47) {
    if (soundOn) {
        if ($['sound'][findMe47] == null) {
            musicPushArr['push'](findMe47);
            $['sound'][findMe47] = createjs['Sound']['play'](findMe47);
            $['sound'][findMe47]['defaultVol'] = 1;
            setMusicVolume(findMe47);
            $['sound'][findMe47]['removeAllEventListeners']();
            $['sound'][findMe47]['addEventListener']('complete', function () {
                $['sound'][findMe47]['play']()
            })
        }
    }
}

function toggleMusicLoop(findMe47, findMe4e) {
    if (soundOn) {
        if ($['sound'][findMe47] != null) {
            if (findMe4e) {
                $['sound'][findMe47]['play']()
            } else {
                $['sound'][findMe47]['paused'] = true
            }
        }
    }
}

function stopMusicLoop(findMe47) {
    if (soundOn) {
        if ($['sound'][findMe47] != null) {
            $['sound'][findMe47]['stop']();
            $['sound'][findMe47] = null;
            var findMe50 = musicPushArr['indexOf'](findMe47);
            if (findMe50 != -1) {
                musicPushArr['splice'](findMe50, 1)
            }
        }
    }
}

function stopSound() {
    createjs['Sound']['stop']()
}

function toggleSoundInMute(findMe4e) {
    if (soundOn) {
        soundMute = findMe4e;
        for (var findMe56 = 0; findMe56 < soundPushArr['length']; findMe56++) {
            setSoundVolume(soundPushArr[findMe56])
        };
        for (var findMe56 = 0; findMe56 < soundLoopPushArr['length']; findMe56++) {
            setSoundLoopVolume(soundLoopPushArr[findMe56])
        };
        setAudioVolume()
    }
}

function toggleMusicInMute(findMe4e) {
    if (soundOn) {
        musicMute = findMe4e;
        for (var findMe56 = 0; findMe56 < musicPushArr['length']; findMe56++) {
            setMusicVolume(musicPushArr[findMe56])
        }
    }
}

function setSoundVolume(findMe59, findMe48) {
    if (soundOn) {
        var findMe5a = soundPushArr['indexOf'](findMe59);
        if (findMe5a != -1) {
            var findMe4a = findMe48 == undefined ? $['sound'][soundPushArr[findMe5a]]['defaultVol'] : findMe48;
            var findMe5b = soundMute == false ? findMe4a : 0;
            $['sound'][soundPushArr[findMe5a]]['volume'] = findMe5b;
            $['sound'][soundPushArr[findMe5a]]['defaultVol'] = findMe4a
        }
    }
}

function setSoundLoopVolume(findMe5d, findMe48) {
    if (soundOn) {
        var findMe50 = soundLoopPushArr['indexOf'](findMe5d);
        if (findMe50 != -1) {
            var findMe4a = findMe48 == undefined ? $['sound'][soundLoopPushArr[findMe50]]['defaultVol'] : findMe48;
            var findMe5b = soundMute == false ? findMe4a : 0;
            $['sound'][soundLoopPushArr[findMe50]]['volume'] = findMe5b;
            $['sound'][soundLoopPushArr[findMe50]]['defaultVol'] = findMe4a
        }
    }
}

function setMusicVolume(findMe5d, findMe48) {
    if (soundOn) {
        var findMe5f = musicPushArr['indexOf'](findMe5d);
        if (findMe5f != -1) {
            var findMe4a = findMe48 == undefined ? $['sound'][musicPushArr[findMe5f]]['defaultVol'] : findMe48;
            var findMe5b = musicMute == false ? findMe4a : 0;
            $['sound'][musicPushArr[findMe5f]]['volume'] = findMe5b;
            $['sound'][musicPushArr[findMe5f]]['defaultVol'] = findMe4a
        }
    }
}
var audioFile = null;

function playAudio(findMe62, findMe63) {
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs['Sound']['play'](findMe62);
            setAudioVolume();
            audioFile['removeAllEventListeners']();
            audioFile['addEventListener']('complete', function (findMe64) {
                audioFile = null;
                if (typeof findMe63 == 'function') {
                    findMe63()
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
            var findMe5b = soundMute == false ? 1 : 0;
            audioFile['volume'] = findMe5b
        }
    }
}
var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(findMe6b, findMe6c) {
    var findMe6d = document['getElementById']('gameCanvas');
    findMe6d['width'] = findMe6b;
    findMe6d['height'] = findMe6c;
    canvasW = findMe6b;
    canvasH = findMe6c;
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
$['players'] = {};

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    buttonLocalContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    stageContainer = new createjs.Container();
    playersContainer = new createjs.Container();
    playerNameContainer = new createjs.Container();
    shadowContainer = new createjs.Container();
    timerContainer = new createjs.Container();
    statusContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    confirmContainer = new createjs.Container();
    bg = new createjs.Bitmap(loader['getResult']('background'));
    bgP = new createjs.Bitmap(loader['getResult']('backgroundP'));
    logo = new createjs.Bitmap(loader['getResult']('logo'));
    logoP = new createjs.Bitmap(loader['getResult']('logoP'));
    buttonStart = new createjs.Bitmap(loader['getResult']('buttonStart'));
    centerReg(buttonStart);
    buttonLocal = new createjs.Bitmap(loader['getResult']('buttonLocal'));
    centerReg(buttonLocal);
    buttonOnline = new createjs.Bitmap(loader['getResult']('buttonOnline'));
    centerReg(buttonOnline);
    timerShapeBg = new createjs.Shape();
    timerShape = new createjs.Shape();
    timerContainer['addChild'](timerShapeBg, timerShape);
    itemStatus = new createjs.Bitmap(loader['getResult']('itemStatus'));
    centerReg(itemStatus);
    for (var findMe56 = 0; findMe56 < gameData['multi']['max']; findMe56++) {
        $['players'][findMe56] = new createjs.Text();
        $['players'][findMe56]['font'] = '25px milky_bobaregular';
        $['players'][findMe56]['lineHeight'] = 25;
        $['players'][findMe56]['color'] = '#000';
        $['players'][findMe56]['textAlign'] = 'center';
        $['players'][findMe56]['textBaseline'] = 'middle';
        $['players'][findMe56]['text'] = ''
    };
    gameStatusTxt = new createjs.Text();
    gameStatusTxt['font'] = '30px milky_bobaregular';
    gameStatusTxt['lineHeight'] = 35;
    gameStatusTxt['color'] = '#fff';
    gameStatusTxt['textAlign'] = 'center';
    gameStatusTxt['textBaseline'] = 'middle';
    gameStatusTxt['text'] = '';
    gameStatusTxt['y'] = 2;
    gameMultiStatusTxt = new createjs.Text();
    gameMultiStatusTxt['font'] = '30px milky_bobaregular';
    gameMultiStatusTxt['lineHeight'] = 35;
    gameMultiStatusTxt['color'] = '#000';
    gameMultiStatusTxt['textAlign'] = 'center';
    gameMultiStatusTxt['textBaseline'] = 'middle';
    gameMultiStatusTxt['text'] = '';
    statusContainer['addChild'](itemStatus, gameStatusTxt);
    scoreTxt = new createjs.Text();
    scoreTxt['font'] = '50px milky_bobaregular';
    scoreTxt['lineHeight'] = 35;
    scoreTxt['color'] = '#000';
    scoreTxt['textAlign'] = 'center';
    scoreTxt['textBaseline'] = 'alphabetic';
    fade = new createjs.Bitmap(loader['getResult']('background'));
    fadeP = new createjs.Bitmap(loader['getResult']('backgroundP'));
    itemResult = new createjs.Bitmap(loader['getResult']('itemPop'));
    itemResultP = new createjs.Bitmap(loader['getResult']('itemPopP'));
    buttonContinue = new createjs.Bitmap(loader['getResult']('buttonContinue'));
    centerReg(buttonContinue);
    resultShareTxt = new createjs.Text();
    resultShareTxt['font'] = '30px milky_bobaregular';
    resultShareTxt['color'] = '#000';
    resultShareTxt['textAlign'] = 'center';
    resultShareTxt['textBaseline'] = 'alphabetic';
    resultShareTxt['text'] = textDisplay['share'];
    resultTitleTxt = new createjs.Text();
    resultTitleTxt['font'] = '58px milky_bobaregular';
    resultTitleTxt['color'] = '#000';
    resultTitleTxt['textAlign'] = 'center';
    resultTitleTxt['textBaseline'] = 'alphabetic';
    resultTitleTxt['text'] = textDisplay['resultTitle'];
    resultDescTxt = new createjs.Text();
    resultDescTxt['font'] = '75px milky_bobaregular';
    resultDescTxt['color'] = '#000';
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
    itemExit = new createjs.Bitmap(loader['getResult']('itemPop'));
    itemExitP = new createjs.Bitmap(loader['getResult']('itemPopP'));
    buttonConfirm = new createjs.Bitmap(loader['getResult']('buttonConfirm'));
    centerReg(buttonConfirm);
    buttonCancel = new createjs.Bitmap(loader['getResult']('buttonCancel'));
    centerReg(buttonCancel);
    popTitleTxt = new createjs.Text();
    popTitleTxt['font'] = '58px milky_bobaregular';
    popTitleTxt['color'] = '#000';
    popTitleTxt['textAlign'] = 'center';
    popTitleTxt['textBaseline'] = 'alphabetic';
    popTitleTxt['text'] = textDisplay['exitTitle'];
    popDescTxt = new createjs.Text();
    popDescTxt['font'] = '30px milky_bobaregular';
    popDescTxt['lineHeight'] = 35;
    popDescTxt['color'] = '#000';
    popDescTxt['textAlign'] = 'center';
    popDescTxt['textBaseline'] = 'alphabetic';
    popDescTxt['text'] = textDisplay['exitMessage'];
    confirmContainer['addChild'](itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
    confirmContainer['visible'] = false;
    roomContainer = new createjs.Container();
    nameContainer = new createjs.Container();
    bgRoom = new createjs.Shape();
    bgRoom['graphics']['beginFill']('#000')['drawRect'](-(landscapeSize['w'] / 2), -(portraitSize['h'] / 2), landscapeSize['w'], portraitSize['h']);
    bgRoom['alpha'] = 0.6;
    gameLogsTxt = new createjs.Text();
    gameLogsTxt['font'] = '30px milky_bobaregular';
    gameLogsTxt['color'] = '#000';
    gameLogsTxt['textAlign'] = 'center';
    gameLogsTxt['textBaseline'] = 'alphabetic';
    gameLogsTxt['text'] = '';
    if (guide) {
        guideline = new createjs.Shape();
        guideline['graphics']['setStrokeStyle'](2)['beginStroke']('red')['drawRect']((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    };
    buttonLocalContainer['addChild'](buttonLocal, buttonOnline);
    mainContainer['addChild'](logo, logoP, buttonStart, buttonLocalContainer);
    stageContainer['addChild'](shadowContainer, playersContainer, playerNameContainer);
    gameContainer['addChild'](fade, fadeP, timerContainer, statusContainer, gameMultiStatusTxt, scoreTxt);
    resultContainer['addChild'](itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);
    if (shareEnable) {
        resultContainer['addChild'](resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp)
    };
    canvasContainer['addChild'](bg, bgP, stageContainer, bgRoom, mainContainer, gameContainer, gameLogsTxt, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage['addChild'](canvasContainer);
    changeViewport(viewport['isLandscape']);
    resizeGameFunc()
}

function changeViewport(findMe83) {
    if (findMe83) {
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
        bgRoom['x'] = canvasW / 2;
        bgRoom['y'] = canvasH / 2;
        if (viewport['isLandscape']) {
            bg['visible'] = true;
            bgP['visible'] = false;
            logo['visible'] = true;
            logoP['visible'] = false;
            buttonStart['x'] = canvasW / 2;
            buttonStart['y'] = canvasH / 100 * 73;
            buttonLocal['x'] = canvasW / 2 - 90;
            buttonLocal['y'] = canvasH / 100 * 73;
            buttonOnline['x'] = canvasW / 2 + 90;
            buttonOnline['y'] = canvasH / 100 * 73;
            fade['visible'] = true;
            fadeP['visible'] = false;
            stageContainer['x'] = canvasW / 2;
            stageContainer['y'] = canvasH / 2;
            itemResult['visible'] = true;
            itemResultP['visible'] = false;
            buttonFacebook['x'] = canvasW / 100 * 44;
            buttonFacebook['y'] = canvasH / 100 * 57;
            buttonTwitter['x'] = canvasW / 2;
            buttonTwitter['y'] = canvasH / 100 * 57;
            buttonWhatsapp['x'] = canvasW / 100 * 56;
            buttonWhatsapp['y'] = canvasH / 100 * 57;
            buttonContinue['x'] = canvasW / 2;
            buttonContinue['y'] = canvasH / 100 * 67;
            resultShareTxt['x'] = canvasW / 2;
            resultShareTxt['y'] = canvasH / 100 * 52;
            resultTitleTxt['x'] = canvasW / 2;
            resultTitleTxt['y'] = canvasH / 100 * 37;
            resultDescTxt['x'] = canvasW / 2;
            resultDescTxt['y'] = canvasH / 100 * 45;
            itemExit['visible'] = true;
            itemExitP['visible'] = false;
            buttonConfirm['x'] = (canvasW / 2) - 78;
            buttonConfirm['y'] = (canvasH / 100 * 65);
            buttonCancel['x'] = (canvasW / 2) + 78;
            buttonCancel['y'] = (canvasH / 100 * 65);
            popTitleTxt['x'] = canvasW / 2;
            popTitleTxt['y'] = canvasH / 100 * 37;
            popDescTxt['x'] = canvasW / 2;
            popDescTxt['y'] = canvasH / 100 * 45;
            $('#roomWrapper')['removeClass']('forPortrait');
            $('#notificationHolder')['removeClass']('forPortrait');
            $('#roomlists')['attr']('size', 10);
            $('#namelists')['attr']('size', 10);
            $('#roomLogs')['attr']('rows', 10)
        } else {
            bg['visible'] = false;
            bgP['visible'] = true;
            logo['visible'] = false;
            logoP['visible'] = true;
            buttonStart['x'] = canvasW / 2;
            buttonStart['y'] = canvasH / 100 * 73;
            buttonLocal['x'] = canvasW / 2;
            buttonLocal['y'] = canvasH / 100 * 70;
            buttonOnline['x'] = canvasW / 2;
            buttonOnline['y'] = canvasH / 100 * 78;
            fade['visible'] = false;
            fadeP['visible'] = true;
            stageContainer['x'] = canvasW / 2;
            stageContainer['y'] = canvasH / 2;
            itemResult['visible'] = false;
            itemResultP['visible'] = true;
            buttonFacebook['x'] = canvasW / 100 * 40;
            buttonFacebook['y'] = canvasH / 100 * 56;
            buttonTwitter['x'] = canvasW / 2;
            buttonTwitter['y'] = canvasH / 100 * 56;
            buttonWhatsapp['x'] = canvasW / 100 * 60;
            buttonWhatsapp['y'] = canvasH / 100 * 56;
            buttonContinue['x'] = canvasW / 2;
            buttonContinue['y'] = canvasH / 100 * 63;
            resultShareTxt['x'] = canvasW / 2;
            resultShareTxt['y'] = canvasH / 100 * 52;
            resultTitleTxt['x'] = canvasW / 2;
            resultTitleTxt['y'] = canvasH / 100 * 40;
            resultDescTxt['x'] = canvasW / 2;
            resultDescTxt['y'] = canvasH / 100 * 46;
            itemExit['visible'] = false;
            itemExitP['visible'] = true;
            buttonConfirm['x'] = (canvasW / 2) - 78;
            buttonConfirm['y'] = (canvasH / 100 * 62);
            buttonCancel['x'] = (canvasW / 2) + 78;
            buttonCancel['y'] = (canvasH / 100 * 62);
            popTitleTxt['x'] = canvasW / 2;
            popTitleTxt['y'] = canvasH / 100 * 40;
            popDescTxt['x'] = canvasW / 2;
            popDescTxt['y'] = canvasH / 100 * 48;
            $('#roomWrapper')['addClass']('forPortrait');
            $('#notificationHolder')['addClass']('forPortrait');
            $('#roomlists')['attr']('size', 8);
            $('#namelists')['attr']('size', 8);
            $('#roomLogs')['attr']('rows', 6)
        }
    }
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings['x'] = (canvasW - offset['x']) - 50;
        buttonSettings['y'] = offset['y'] + 45;
        var findMe86 = 65;
        var findMe87 = 0;
        if (curPage != 'game') {
            buttonExit['visible'] = false;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + findMe86;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + findMe86;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (findMe86 * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (findMe86 * 2);
                findMe87 = 2
            } else {
                findMe87 = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (findMe86 * (findMe87 + 1))
        } else {
            buttonExit['visible'] = true;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + findMe86;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + findMe86;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (findMe86 * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (findMe86 * 2);
                findMe87 = 2
            } else {
                findMe87 = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (findMe86 * (findMe87 + 1));
            buttonExit['x'] = buttonSettings['x'];
            buttonExit['y'] = buttonSettings['y'] + (findMe86 * (findMe87 + 2))
        };
        resizeGameUI();
        resizeSocketLog()
    }
}

function removeGameCanvas() {
    stage['autoClear'] = true;
    stage['removeAllChildren']();
    stage['update']();
    createjs['Ticker']['removeEventListener']('tick', tick);
    createjs['Ticker']['removeEventListener']('tick', stage)
}

function tick(findMe64) {
    updateGame();
    stage['update'](findMe64)
}

function centerReg(findMe8b) {
    findMe8b['regX'] = findMe8b['image']['naturalWidth'] / 2;
    findMe8b['regY'] = findMe8b['image']['naturalHeight'] / 2
}

function createHitarea(findMe8b) {
    findMe8b['hitArea'] = new createjs.Shape(new createjs.Graphics()['beginFill']('#000')['drawRect'](0, 0, findMe8b['image']['naturalWidth'], findMe8b['image']['naturalHeight']))
}
var player_arr = [{
    src: 'assets/focusplayer0.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer1.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer2.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer3.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer4.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer5.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer6.png',
    regX: 30,
    regY: 95
}, {
    src: 'assets/focusplayer7.png',
    regX: 30,
    regY: 95
}];
var players_arr = [{
    src: 'assets/player0.png',
    regX: 30,
    regY: 95
}];
var stage_arr = [{
    timer: 15000,
    score: 100,
    total: 30,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5
}, {
    timer: 14000,
    score: 200,
    total: 35,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5
}, {
    timer: 13000,
    score: 300,
    total: 45,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5
}, {
    timer: 12000,
    score: 400,
    total: 50,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5
}, {
    timer: 11000,
    score: 500,
    total: 60,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5
}, {
    timer: 10000,
    score: 600,
    total: 65,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5
}, {
    timer: 9000,
    score: 700,
    total: 70,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.45
}, {
    timer: 8000,
    score: 800,
    total: 75,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.40
}, {
    timer: 7000,
    score: 900,
    total: 80,
    audio: [5, 10],
    idle: [1, 3],
    speed: 0.35
}, {
    timer: 6000,
    score: 1000,
    total: 100,
    audio: [5, 10],
    idle: [1, 3],
    speed: 0.30
}];
var multiSettings = {
    timer: 16000,
    score: 100,
    total: 50,
    audio: [10, 30],
    idle: [1, 5],
    speed: 0.5,
    findColor: '#000',
    activeColor: '#FF8000'
};
var gameSettings = {
    title: {
        total: 20,
        audio: [20, 50],
        idle: [1, 5],
        speed: 0.5
    },
    move: {
        landscape: {
            x: 500,
            y: 250
        },
        portrait: {
            x: 200,
            y: 300
        }
    },
    timer: {
        color: '#000',
        width: 400,
        height: 5,
        radius: 3
    },
    score: {
        speed: 1
    }
};
var textDisplay = {
    stage: 'Stage [NUMBER]',
    stageClear: 'Stage clear',
    score: '+[NUMBER]pts',
    round: 'Round [NUMBER]/[TOTAL]',
    roundComplete: 'Round over',
    activePlayer: '(YOU)',
    findPlayers: 'YOUR TURN:\x0AFind all players',
    hidePlayers: '[PLAYER] TURN:\x0AStay in the crowd',
    foundScore: '[NUMBER]/[TOTAL]',
    timesup: 'Time\'s up!',
    exitTitle: 'EXIT GAME',
    exitMessage: 'Are you sure\x0Ayou want to\x0Aquit the game?',
    share: 'SHARE YOUR SCORE',
    resultTitle: 'GAME OVER',
    resultDesc: '[NUMBER]pts'
};
var shareEnable = true;
var shareTitle = 'Highscore on Find Me is [SCORE]PTS';
var shareMessage = '[SCORE]PTS is mine new highscore on Find Me Game game! Try it now!';
$['editor'] = {
    enable: false
};
var playerData = {
    score: 0,
    stage: 0
};
var gameData = {
    paused: true,
    stageNum: 0,
    players: [],
    player: [],
    playerIndex: 0,
    totalPlayers: 0,
    shadow: [],
    playerAudio: 0,
    stage: {
        timer: 0,
        total: 0,
        speed: 0,
        rangeX: 0,
        rangeY: 0,
        audio: [10, 30]
    },
    multi: {
        max: 4,
        round: 0,
        found: 0,
        spaceX: 120,
        nameY: -80,
        players: []
    },
    begin: false,
    complete: false
};
var tweenData = {
    score: 0,
    tweenScore: 0
};
var timeData = {
    enable: false,
    startDate: null,
    sessionDate: null,
    nowDate: null,
    sessionTimer: 0,
    timer: 0,
    oldTimer: 0,
    accumulate: 0
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
    buttonLocal['cursor'] = 'pointer';
    buttonLocal['addEventListener']('click', function (findMe9b) {
        playSound('soundButton');
        socketData['online'] = false;
        goPage('game')
    });
    buttonOnline['cursor'] = 'pointer';
    buttonOnline['addEventListener']('click', function (findMe9b) {
        playSound('soundButton');
        checkQuickGameMode()
    });
    buttonStart['cursor'] = 'pointer';
    buttonStart['addEventListener']('click', function (findMe9b) {
        playSound('soundButton');
        if (typeof initSocket == 'function' && multiplayerSettings['enable']) {
            if (multiplayerSettings['localPlay']) {
                toggleMainButton('local')
            } else {
                checkQuickGameMode()
            }
        } else {
            goPage('game')
        }
    });
    itemExit['addEventListener']('click', function (findMe9b) {});
    buttonContinue['cursor'] = 'pointer';
    buttonContinue['addEventListener']('click', function (findMe9b) {
        playSound('soundButton');
        goPage('main')
    });
    buttonFacebook['cursor'] = 'pointer';
    buttonFacebook['addEventListener']('click', function (findMe9b) {
        share('facebook')
    });
    buttonTwitter['cursor'] = 'pointer';
    buttonTwitter['addEventListener']('click', function (findMe9b) {
        share('twitter')
    });
    buttonWhatsapp['cursor'] = 'pointer';
    buttonWhatsapp['addEventListener']('click', function (findMe9b) {
        share('whatsapp')
    });
    buttonSoundOff['cursor'] = 'pointer';
    buttonSoundOff['addEventListener']('click', function (findMe9b) {
        toggleSoundMute(true)
    });
    buttonSoundOn['cursor'] = 'pointer';
    buttonSoundOn['addEventListener']('click', function (findMe9b) {
        toggleSoundMute(false)
    });
    if (typeof buttonMusicOff != 'undefined') {
        buttonMusicOff['cursor'] = 'pointer';
        buttonMusicOff['addEventListener']('click', function (findMe9b) {
            toggleMusicMute(true)
        })
    };
    if (typeof buttonMusicOn != 'undefined') {
        buttonMusicOn['cursor'] = 'pointer';
        buttonMusicOn['addEventListener']('click', function (findMe9b) {
            toggleMusicMute(false)
        })
    };
    buttonFullscreen['cursor'] = 'pointer';
    buttonFullscreen['addEventListener']('click', function (findMe9b) {
        toggleFullScreen()
    });
    buttonExit['cursor'] = 'pointer';
    buttonExit['addEventListener']('click', function (findMe9b) {
        togglePop(true);
        toggleOption()
    });
    buttonSettings['cursor'] = 'pointer';
    buttonSettings['addEventListener']('click', function (findMe9b) {
        toggleOption()
    });
    buttonConfirm['cursor'] = 'pointer';
    buttonConfirm['addEventListener']('click', function (findMe9b) {
        playSound('soundButton');
        togglePop(false);
        stopAudio();
        stopGame();
        goPage('main');
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            exitSocketRoom()
        }
    });
    buttonCancel['cursor'] = 'pointer';
    buttonCancel['addEventListener']('click', function (findMe9b) {
        playSound('soundButton');
        togglePop(false)
    });
    stage['on']('stagemousedown', function (findMe9b) {
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            var findMe33 = playersContainer['globalToLocal'](findMe9b['stageX'], findMe9b['stageY']);
            if (socketData['gameIndex'] == gameData['multi']['round']) {
                directPlayers(socketData['gameIndex'], findMe33['x'], findMe33['y'])
            } else {
                postSocketUpdate('directplayer', {
                    index: socketData['gameIndex'],
                    x: findMe33['x'],
                    y: findMe33['y']
                })
            }
        }
    });
    for (var findMe56 = 0; findMe56 < player_arr['length']; findMe56++) {
        gameData['player']['push'](findMe56)
    };
    shuffle(gameData['player']);
    gameData['stage']['rangeX'] = gameSettings['move']['landscape']['x'];
    gameData['stage']['rangeY'] = gameSettings['move']['landscape']['y']
}

function toggleMainButton(findMe4e) {
    if (typeof initSocket == 'function' && multiplayerSettings['enable']) {
        gameLogsTxt['visible'] = true;
        gameLogsTxt['text'] = ''
    };
    buttonStart['visible'] = false;
    buttonLocalContainer['visible'] = false;
    if (findMe4e == 'start') {
        buttonStart['visible'] = true
    } else {
        if (findMe4e == 'local') {
            buttonLocalContainer['visible'] = true
        }
    }
}

function checkQuickGameMode() {
    socketData['online'] = true;
    if (!multiplayerSettings['enterName']) {
        buttonStart['visible'] = false;
        buttonLocalContainer['visible'] = false;
        addSocketRandomUser()
    } else {
        goPage('name')
    }
}

function resizeSocketLog() {
    if (curPage == 'main') {
        if (viewport['isLandscape']) {
            gameLogsTxt['x'] = canvasW / 2;
            gameLogsTxt['y'] = canvasH / 100 * 73
        } else {
            gameLogsTxt['x'] = canvasW / 2;
            gameLogsTxt['y'] = canvasH / 100 * 75
        }
    }
}

function togglePop(findMe4e) {
    confirmContainer['visible'] = findMe4e
}
var curPage = '';

function goPage(findMea2) {
    curPage = findMea2;
    $('#roomWrapper')['hide']();
    $('#roomWrapper .innerContent')['hide']();
    gameLogsTxt['visible'] = false;
    bgRoom['visible'] = false;
    mainContainer['visible'] = false;
    gameContainer['visible'] = false;
    resultContainer['visible'] = false;
    stopPlayers();
    stopSoundLoop('soundRunning');
    var findMea3 = null;
    switch (findMea2) {
    case 'main':
        findMea3 = mainContainer;
        gameData['stage']['total'] = gameSettings['title']['total'];
        gameData['stage']['speed'] = gameSettings['title']['speed'];
        gameData['stage']['audio'] = gameSettings['title']['audio'];
        gameData['stage']['idle'] = gameSettings['title']['idle'];
        if (typeof initSocket == 'function' && multiplayerSettings['enable']) {
            socketData['online'] = false
        };
        buildStage();
        toggleMainButton('start');
        break;
    case 'name':
        findMea3 = nameContainer;
        $('#roomWrapper')['show']();
        $('#roomWrapper .nameContent')['show']();
        $('#roomWrapper .fontNameError')['html']('');
        $('#enterName')['show']();
        bgRoom['visible'] = true;
        break;
    case 'room':
        findMea3 = roomContainer;
        $('#roomWrapper')['show']();
        $('#roomWrapper .roomContent')['show']();
        switchSocketRoomContent('lists');
        bgRoom['visible'] = true;
        break;
    case 'game':
        findMea3 = gameContainer;
        startGame();
        break;
    case 'result':
        findMea3 = resultContainer;
        stopGame();
        togglePop(false);
        playSound('soundResult');
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            playerData['score'] = $['players'][socketData['gameIndex']]['score']
        };
        tweenData['tweenScore'] = 0;
        TweenMax['to'](tweenData, 0.5, {
            tweenScore: playerData['score'],
            overwrite: true,
            onUpdate: function () {
                resultDescTxt['text'] = textDisplay['resultDesc']['replace']('[NUMBER]', addCommas(Math['floor'](tweenData['tweenScore'])))
            }
        });
        saveGame(playerData['score']);
        break
    };
    if (findMea3 != null) {
        findMea3['visible'] = true;
        findMea3['alpha'] = 0;
        TweenMax['to'](findMea3, 0.5, {
            alpha: 1,
            overwrite: true
        })
    };
    resizeCanvas()
}

function startGame() {
    gameData['stageNum'] = 0;
    gameMultiStatusTxt['text'] = '';
    statusContainer['alpha'] = 0;
    playerData['score'] = 0;
    playerData['stage'] = 0;
    fade['alpha'] = fadeP['alpha'] = 0;
    setupGameStage();
    if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
        gameData['multi']['round'] = 0;
        if (socketData['host']) {
            gameData['multi']['players'] = [];
            shuffle(gameData['player']);
            for (var findMe56 = 0; findMe56 < gameData['totalPlayers']; findMe56++) {
                gameData['multi']['players']['push'](gameData['player'][findMe56])
            };
            postSocketUpdate('prepare', {
                players: gameData['player'],
                multiplayers: gameData['multi']['players']
            })
        }
    } else {
        gameData['totalPlayers'] = 1;
        prepareStage()
    }
}

function stopGame() {
    toggleGameTimer(false);
    stopSoundLoop('soundRunning');
    gameData['paused'] = true;
    TweenMax['killAll'](false, true, false)
}

function saveGame(findMea7) {
    if (typeof toggleScoreboardSave == 'function') {
        $['scoreData']['score'] = findMea7;
        if (typeof type != 'undefined') {
            $['scoreData']['type'] = type
        };
        toggleScoreboardSave(true)
    }
}

function resizeGameUI() {
    if (viewport['isLandscape']) {
        statusContainer['x'] = canvasW / 2;
        statusContainer['y'] = canvasH / 100 * 85;
        gameMultiStatusTxt['x'] = canvasW / 2;
        gameMultiStatusTxt['y'] = canvasH / 100 * 60;
        timerShape['x'] = timerShapeBg['x'] = (canvasW / 2) - (gameSettings['timer']['width'] / 2);
        timerShape['y'] = timerShapeBg['y'] = canvasH / 100 * 85;
        scoreTxt['x'] = canvasW / 2;
        scoreTxt['y'] = canvasH / 100 * 84;
        gameData['stage']['rangeX'] = gameSettings['move']['landscape']['x'];
        gameData['stage']['rangeY'] = gameSettings['move']['landscape']['y']
    } else {
        statusContainer['x'] = canvasW / 2;
        statusContainer['y'] = canvasH / 100 * 86;
        gameMultiStatusTxt['x'] = canvasW / 2;
        gameMultiStatusTxt['y'] = canvasH / 100 * 63;
        timerShape['x'] = timerShapeBg['x'] = (canvasW / 2) - (gameSettings['timer']['width'] / 2);
        timerShape['y'] = timerShapeBg['y'] = canvasH / 100 * 86;
        scoreTxt['x'] = canvasW / 2;
        scoreTxt['y'] = canvasH / 100 * 85;
        gameData['stage']['rangeX'] = gameSettings['move']['portrait']['x'];
        gameData['stage']['rangeY'] = gameSettings['move']['portrait']['y']
    };
    positionLogoPlayer()
}

function positionLogoPlayer() {
    if (curPage == 'main') {
        if (gameData['players']['length'] > 0) {
            var findMeaa = gameData['players'][0];
            TweenMax['killTweensOf'](findMeaa);
            if (viewport['isLandscape']) {
                findMeaa['x'] = 60;
                findMeaa['y'] = 20
            } else {
                findMeaa['x'] = 0;
                findMeaa['y'] = 100
            }
        }
    }
}

function setupGameStage() {
    if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
        gameData['stage']['timer'] = multiSettings['timer'];
        gameData['stage']['total'] = multiSettings['total'];
        gameData['stage']['speed'] = multiSettings['speed'];
        gameData['stage']['audio'] = multiSettings['audio'];
        gameData['stage']['idle'] = multiSettings['idle'];
        gameData['stage']['score'] = multiSettings['score']
    } else {
        gameData['stage']['timer'] = stage_arr[gameData['stageNum']]['timer'];
        gameData['stage']['total'] = stage_arr[gameData['stageNum']]['total'];
        gameData['stage']['speed'] = stage_arr[gameData['stageNum']]['speed'];
        gameData['stage']['audio'] = stage_arr[gameData['stageNum']]['audio'];
        gameData['stage']['idle'] = stage_arr[gameData['stageNum']]['idle'];
        gameData['stage']['score'] = stage_arr[gameData['stageNum']]['score']
    };
    timeData['countdown'] = gameData['stage']['timer'];
    timeData['sessionTimer'] = timeData['countdown'];
    updateTimerBar();
    gameData['begin'] = false;
    if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
        gameData['paused'] = true
    } else {
        gameData['paused'] = false
    }
}

function showMultiPlayers() {
    playersContainer['removeAllChildren']();
    shadowContainer['removeAllChildren']();
    playerNameContainer['removeAllChildren']();
    gameData['players'] = [];
    gameData['shadow'] = [];
    var findMe33 = {
        x: 0,
        y: 0
    };
    var findMead = gameData['multi']['spaceX'];
    var findMeae = findMead * (gameData['totalPlayers'] - 1);
    findMe33['x'] = -(findMeae / 2);
    for (var findMe56 = 0; findMe56 < gameData['totalPlayers']; findMe56++) {
        var findMeaf = getSpriteSheet('player', findMe56);
        playersContainer['addChild'](findMeaf);
        findMeaf['x'] = findMe33['x'];
        findMeaf['y'] = findMe33['y'];
        findMeaf['data'] = findMe33;
        findMeaf['frame'] = '';
        findMeaf['focus'] = true;
        getPlayerFrame(findMeaf, 'stand');
        if (isEven(findMe56)) {
            findMeaf['y'] -= 50
        };
        findMe33['x'] += findMead;
        gameData['players']['push'](findMeaf);
        var findMeb0 = new createjs.Bitmap(loader['getResult']('itemShadow'));
        centerReg(findMeb0);
        findMeb0['x'] = findMeaf['x'];
        findMeb0['y'] = findMeaf['y'];
        shadowContainer['addChild'](findMeb0);
        gameData['shadow']['push'](findMeb0);
        posPlayerName(findMe56, findMeaf);
        playerNameContainer['addChild']($['players'][findMe56]);
        if (findMe56 == gameData['multi']['round']) {
            $['players'][findMe56]['color'] = multiSettings['activeColor']
        } else {
            $['players'][findMe56]['color'] = multiSettings['findColor']
        }
    };
    if (socketData['gameIndex'] == gameData['multi']['round']) {
        showMultiGameStatus('find')
    } else {
        showMultiGameStatus('hide')
    };
    showGameStatus('preround');
    TweenMax['to'](playersContainer, 4, {
        onComplete: function () {
            prepareStage()
        }
    })
}

function posPlayerName(findMeb2, findMeb3) {
    $['players'][findMeb2]['x'] = findMeb3['x'];
    $['players'][findMeb2]['y'] = (findMeb3['y'] - $['players'][findMeb2]['getMeasuredHeight']()) + gameData['multi']['nameY']
}

function prepareStage() {
    var findMeb5 = 0.5;
    var findMeb6 = 1;
    TweenMax['to'](fade, findMeb5, {
        alpha: 1,
        onComplete: function () {
            buildStage();
            TweenMax['to'](fade, findMeb6, {
                alpha: 0,
                onComplete: function () {}
            })
        }
    });
    TweenMax['to'](fadeP, findMeb5, {
        alpha: 1,
        onComplete: function () {
            TweenMax['to'](fadeP, findMeb6, {
                alpha: 0,
                onComplete: function () {}
            })
        }
    })
}

function buildStage() {
    playersContainer['removeAllChildren']();
    shadowContainer['removeAllChildren']();
    playerNameContainer['removeAllChildren']();
    gameData['players'] = [];
    gameData['shadow'] = [];
    gameData['playerAudio'] = 0;
    for (var findMe56 = 0; findMe56 < gameData['stage']['total']; findMe56++) {
        var findMeaf = getSpriteSheet('player', findMe56);
        playersContainer['addChild'](findMeaf);
        var findMe33 = getPlayerPos();
        findMeaf['x'] = findMe33['x'];
        findMeaf['y'] = findMe33['y'];
        findMeaf['data'] = findMe33;
        findMeaf['index'] = findMe56;
        findMeaf['frame'] = '';
        findMeaf['focus'] = false;
        findMeaf['moveX'] = findMe33['x'];
        findMeaf['moveY'] = findMe33['y'];
        getPlayerFrame(findMeaf, 'stand');
        var movePlayer = false;
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            if (findMe56 < gameData['totalPlayers']) {
                findMeaf['focus'] = true;
                playerNameContainer['addChild']($['players'][findMe56]);
                if (findMe56 == gameData['multi']['round']) {
                    $['players'][findMe56]['color'] = multiSettings['activeColor']
                } else {
                    $['players'][findMe56]['color'] = multiSettings['findColor']
                }
            };
            if (socketData['gameIndex'] == gameData['multi']['round']) {
                movePlayer = true
            }
        } else {
            if (findMe56 == 0) {
                findMeaf['focus'] = true
            };
            movePlayer = true
        };
        if (movePlayer) {
            var findMeb9 = curPage == 'game' ? 2 : 0;
            loopPlayerIdle(findMeaf, findMeb9)
        };
        gameData['players']['push'](findMeaf);
        findMeaf['cursor'] = 'pointer';
        findMeaf['addEventListener']('click', function (findMe9b) {
            checkFocusPlayer(findMe9b['target'])
        });
        var findMeb0 = new createjs.Bitmap(loader['getResult']('itemShadow'));
        centerReg(findMeb0);
        shadowContainer['addChild'](findMeb0);
        gameData['shadow']['push'](findMeb0)
    };
    scoreTxt['text'] = '';
    gameData['paused'] = false;
    gameData['complete'] = false;
    gameData['begin'] = false;
    gameData['multi']['found'] = 0;
    if (curPage == 'game') {
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            for (var findMe56 = 0; findMe56 < gameData['totalPlayers']; findMe56++) {
                var findMeaa = gameData['players'][findMe56];
                var findMeba = gameData['players'][findMe56 + 4];
                findMeaa['x'] = findMeba['x'];
                findMeaa['y'] = findMeba['y'] - 1;
                TweenMax['killTweensOf'](gameData['players'][findMe56]);
                if (socketData['gameIndex'] == gameData['multi']['round']) {
                    $['players'][findMe56]['visible'] = false;
                    if (socketData['gameIndex'] == findMe56) {
                        $['players'][findMe56]['visible'] = true
                    }
                };
                updateMultiScore()
            };
            showGameStatus('round')
        } else {
            var findMeaa = gameData['players'][0];
            var findMeba = gameData['players'][1];
            findMeaa['x'] = findMeba['x'];
            findMeaa['y'] = findMeba['y'] - 1;
            showGameStatus('stage')
        };
        playSound('soundStart');
        TweenMax['to'](timerContainer, 2, {
            onComplete: function () {
                gameData['begin'] = true;
                playSoundLoop('soundRunning');
                if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
                    if (socketData['gameIndex'] == gameData['multi']['round']) {
                        toggleGameTimer(true);
                        toggleGameSessionTimer(true)
                    }
                } else {
                    toggleGameTimer(true);
                    toggleGameSessionTimer(true)
                }
            }
        })
    } else {
        playSoundLoop('soundRunning')
    }
}

function getPlayerPos() {
    var findMe33 = {
        x: 0,
        y: 0
    };
    findMe33['x'] = randomIntFromInterval(-gameData['stage']['rangeX'], gameData['stage']['rangeX']);
    findMe33['y'] = randomIntFromInterval(-gameData['stage']['rangeY'], gameData['stage']['rangeY']);
    return findMe33
}

function loopPlayerIdle(findMeb3, findMeb9) {
    var findMebd = randomIntFromInterval(gameData['stage']['idle'][0], gameData['stage']['idle'][1]) * 0.3;
    findMebd = !isNaN(findMeb9) == true ? findMeb9 : findMebd;
    TweenMax['to'](findMeb3, findMebd, {
        onComplete: movePlayer,
        onCompleteParams: [findMeb3]
    })
}

function movePlayer(findMeb3) {
    playPlayerAudio();
    var findMebe = getPlayerPos();
    var findMebf = getDistance(findMeb3['x'], findMeb3['y'], findMebe['x'], findMebe['y']) * (gameData['stage']['speed'] * 0.01);
    findMeb3['moveX'] = findMebe['x'];
    findMeb3['moveY'] = findMebe['y'];
    TweenMax['to'](findMeb3, findMebf, {
        x: findMebe['x'],
        y: findMebe['y'],
        ease: Linear['easeNone'],
        onComplete: loopPlayerIdle,
        onCompleteParams: [findMeb3]
    })
}

function directPlayers(findMeb2, findMec1, findMec2) {
    if (!gameData['begin']) {
        return
    };
    var findMeb3 = gameData['players'][findMeb2];
    if (findMeb3['focus'] && !gameData['complete'] && curPage == 'game') {
        var findMebf = getDistance(findMeb3['x'], findMeb3['y'], findMec1, findMec2) * (gameData['stage']['speed'] * 0.01);
        findMeb3['moveX'] = findMec1;
        findMeb3['moveY'] = findMec2;
        TweenMax['to'](findMeb3, findMebf, {
            x: findMec1,
            y: findMec2,
            ease: Linear['easeNone']
        })
    }
}

function moveAwayPlayer(findMeb3, findMeaa, findMe4e) {
    playPlayerAudio();
    TweenMax['killTweensOf'](findMeb3);
    var findMec4 = randomIntFromInterval(50, gameData['stage']['rangeX'] / 3);
    var findMec5 = randomIntFromInterval(50, gameData['stage']['rangeY'] / 3);
    var findMebe = {
        x: findMec4,
        y: findMec5
    };
    if (findMeb3['x'] < findMeaa['x']) {
        findMebe['x'] = -(findMebe['x']);
        findMeb3['x'] -= 1
    } else {
        findMeb3['x'] += 1
    };
    if (findMeb3['y'] < findMeaa['y']) {
        findMebe['y'] = -(findMebe['y']);
        findMeb3['y'] -= 1
    } else {
        findMeb3['y'] += 1
    };
    findMebe['x'] = findMeb3['x'] + findMebe['x'];
    findMebe['y'] = findMeb3['y'] + findMebe['y'];
    findMeb3['moveX'] = findMebe['x'];
    findMeb3['moveY'] = findMebe['y'];
    var findMebf = getDistance(findMeb3['x'], findMeb3['y'], findMebe['x'], findMebe['y']) * (gameData['stage']['speed'] * 0.01);
    if (findMe4e) {
        TweenMax['to'](findMeb3, findMebf, {
            x: findMebe['x'],
            y: findMebe['y'],
            ease: Linear['easeNone'],
            onComplete: loopPlayerIdle,
            onCompleteParams: [findMeb3]
        })
    } else {
        TweenMax['to'](findMeb3, findMebf, {
            x: findMebe['x'],
            y: findMebe['y'],
            ease: Linear['easeNone'],
            onComplete: pointToPlayer,
            onCompleteParams: [findMeb3, findMeaa]
        })
    }
}

function playPlayerAudio() {
    if (gameData['playerAudio'] <= 0) {
        gameData['playerAudio'] = randomIntFromInterval(gameData['stage']['audio'][0], gameData['stage']['audio'][1]);
        var findMec7 = Math['floor'](Math['random']() * 5);
        playSound('soundPlayer' + (findMec7 + 1))
    }
}

function animateBounce(findMeb3) {
    TweenMax['to'](findMeb3, 0.5, {
        scaleX: 1.2,
        scaleY: 1.2,
        overwrite: true,
        onComplete: function () {
            TweenMax['to'](findMeb3, 0.5, {
                scaleX: 1,
                scaleY: 1,
                overwrite: true,
                onComplete: animateBounce,
                onCompleteParams: [findMeb3]
            })
        }
    })
}

function checkFocusPlayer(findMeb3) {
    if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
        if (socketData['gameIndex'] == gameData['multi']['round'] && !gameData['complete'] && curPage == 'game') {
            if (findMeb3['index'] != socketData['gameIndex'] && findMeb3['focus']) {
                findMeb3['focus'] = false;
                getPlayerFrame(findMeb3, 'wave');
                $['players'][findMeb3['index']]['visible'] = true;
                postSocketUpdate('caughtplayer', findMeb3['index'])
            };
            var findMeca = 0;
            for (var findMe56 = 0; findMe56 < gameData['totalPlayers']; findMe56++) {
                var findMecb = gameData['players'][findMe56];
                if (findMecb['focus'] == false) {
                    findMeca++
                }
            };
            if (findMeca == gameData['totalPlayers'] - 1) {
                gameData['complete'] = true;
                socketData['loaded'] = 0;
                toggleGameSessionTimer(false);
                toggleGameTimer(false);
                postSocketUpdate('endround', timeData['sessionTimer'])
            }
        }
    } else {
        if (findMeb3['focus'] && !gameData['complete'] && curPage == 'game') {
            calculateScore();
            toggleGameSessionTimer(false);
            toggleGameTimer(false);
            allPlayersPointToPlayer()
        }
    }
}

function allPlayersPointToPlayer() {
    stopSoundLoop('soundRunning');
    gameData['complete'] = true;
    var findMeaa = [];
    for (var findMe56 = 0; findMe56 < gameData['players']['length']; findMe56++) {
        var findMecb = gameData['players'][findMe56];
        TweenMax['killTweensOf'](findMecb);
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            var findMecd = false;
            if (findMe56 < gameData['totalPlayers'] && findMe56 != gameData['multi']['round']) {
                findMecd = true
            };
            if (findMecd) {
                getPlayerFrame(findMecb, 'wave');
                animateBounce(findMecb);
                findMeaa['push'](findMecb);
                $['players'][findMe56]['visible'] = true
            } else {
                getPlayerFrame(findMecb, 'stand');
                var findMece = Math['floor'](Math['random']() * findMeaa['length']);
                pointToPlayer(findMecb, findMeaa[findMece])
            }
        } else {
            if (findMe56 != 0) {
                getPlayerFrame(findMecb, 'stand');
                var findMecf = getDistance(findMeaa[0]['x'], findMeaa[0]['y'], findMecb['x'], findMecb['y']);
                if (findMecf <= 150) {
                    moveAwayPlayer(findMecb, findMeaa[0], false)
                } else {
                    pointToPlayer(findMecb, findMeaa[0])
                }
            } else {
                getPlayerFrame(findMecb, 'wave');
                animateBounce(findMecb);
                findMeaa['push'](findMecb)
            }
        }
    }
}

function pointToPlayer(findMeb3, findMeaa) {
    if (findMeaa == undefined) {
        return
    };
    var findMed1 = getDirection(findMeb3['x'], findMeb3['y'], findMeaa['x'], findMeaa['y']);
    var findMebf = randomIntFromInterval(1, 8) * 0.1;
    TweenMax['to'](findMeb3, findMebf, {
        onComplete: function () {
            if (findMeb3['x'] < findMeaa['x']) {
                if (findMed1 < 45) {
                    findMeb3['gotoAndPlay']('pointrightup')
                } else {
                    if (findMed1 > 94) {
                        findMeb3['gotoAndPlay']('pointrightdown')
                    } else {
                        findMeb3['gotoAndPlay']('pointright')
                    }
                }
            } else {
                if (findMed1 > 315) {
                    findMeb3['gotoAndPlay']('pointleftup')
                } else {
                    if (findMed1 < 225) {
                        findMeb3['gotoAndPlay']('pointleftdown')
                    } else {
                        findMeb3['gotoAndPlay']('pointleft')
                    }
                }
            }
        }
    })
}

function stopPlayers() {
    for (var findMe56 = 0; findMe56 < gameData['players']['length']; findMe56++) {
        var findMecb = gameData['players'][findMe56];
        TweenMax['killTweensOf'](findMecb)
    }
}

function getSpriteSheet(findMed4, findMeb2) {
    var findMed5 = 1;
    var findMed6 = 60;
    var findMed7 = 100;
    var findMed8 = findMed6 / 2;
    var findMed9 = findMed7 / 2;
    var findMeda = 44;
    var findMedb = {};
    var findMedc = '';
    var findMedd = '';
    if (findMed4 == 'player') {
        var findMede = Math['floor'](Math['random']() * (players_arr['length']));
        findMed8 = players_arr[findMede]['regX'];
        findMed9 = players_arr[findMede]['regY'];
        findMedc = 'players' + findMede;
        var findMedf = false;
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            if (findMeb2 < gameData['totalPlayers']) {
                gameData['playerIndex'] = gameData['multi']['players'][findMeb2];
                findMedf = true
            }
        } else {
            if (findMeb2 == 0) {
                findMedf = true
            }
        };
        if (findMedf) {
            if (curPage == 'main') {
                gameData['playerIndex']++;
                if (gameData['playerIndex'] > player_arr['length'] - 1) {
                    shuffle(gameData['player']);
                    gameData['playerIndex'] = 0
                }
            };
            findMede = gameData['player'][gameData['playerIndex']];
            findMed8 = player_arr[findMede]['regX'];
            findMed9 = player_arr[findMede]['regY'];
            findMedc = 'player' + findMede
        };
        findMedb = {
            stand: {
                frames: [10],
                speed: findMed5
            },
            runleft: {
                frames: [0, 1, 2, 3, 4, 3, 2, 1],
                speed: findMed5
            },
            runright: {
                frames: [5, 6, 7, 8, 9, 8, 7, 6],
                speed: findMed5
            },
            pointleft: {
                frames: [11, 12, 13],
                speed: findMed5,
                next: 'pointleftstill'
            },
            pointleftstill: {
                frames: [13, 13, 13, 14],
                speed: findMed5
            },
            pointleftup: {
                frames: [21, 22, 23],
                speed: findMed5,
                next: 'pointleftupstill'
            },
            pointleftupstill: {
                frames: [23, 23, 23, 24],
                speed: findMed5
            },
            pointleftdown: {
                frames: [31, 32, 33],
                speed: findMed5,
                next: 'pointleftdownstill'
            },
            pointleftdownstill: {
                frames: [33, 33, 33, 34],
                speed: findMed5
            },
            pointright: {
                frames: [16, 17, 18],
                speed: findMed5,
                next: 'pointrightstill'
            },
            pointrightstill: {
                frames: [18, 18, 18, 19],
                speed: findMed5
            },
            pointrightup: {
                frames: [26, 27, 28],
                speed: findMed5,
                next: 'pointrightupstill'
            },
            pointrightupstill: {
                frames: [28, 28, 28, 29],
                speed: findMed5
            },
            pointrightdown: {
                frames: [36, 37, 38],
                speed: findMed5,
                next: 'pointrightdownstill'
            },
            pointrightdownstill: {
                frames: [38, 38, 38, 39],
                speed: findMed5
            },
            wave: {
                frames: [40, 41, 42, 43, 42, 41],
                speed: findMed5
            }
        };
        findMedd = 'stand'
    };
    var findMedd = {
        "regX": findMed8,
        "regY": findMed9,
        "height": findMed7,
        "width": findMed6,
        "count": findMeda
    };
    var findMee0 = new createjs.SpriteSheet({
        "images": [loader['getResult'](findMedc)],
        "frames": findMedd,
        "animations": findMedb
    });
    var findMee1 = new createjs.Sprite(findMee0, findMedd);
    findMee1['framerate'] = 20;
    return findMee1
}

function toggleGameTimer(findMe4e) {
    if (findMe4e) {
        timeData['startDate'] = new Date()
    } else {};
    timeData['enable'] = findMe4e
}

function toggleGameSessionTimer(findMe4e) {
    if (findMe4e) {
        timerShape['alpha'] = 1;
        timeData['oldTimer'] = -1;
        timeData['accumulate'] = 0;
        timeData['sessionDate'] = new Date()
    } else {
        timeData['accumulate'] = timeData['countdown'] - timeData['sessionTimer']
    };
    timeData['enable'] = findMe4e
}

function updateGame() {
    if (!gameData['paused']) {
        if (timeData['enable']) {
            timeData['nowDate'] = new Date();
            timeData['elapsedTime'] = Math['floor']((timeData['nowDate']['getTime']() - timeData['startDate']['getTime']()));
            timeData['timer'] = (timeData['elapsedTime']);
            timeData['elapsedTime'] = Math['floor']((timeData['nowDate']['getTime']() - timeData['sessionDate']['getTime']()));
            timeData['sessionTimer'] = Math['floor']((timeData['countdown']) - (timeData['elapsedTime']));
            if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
                postSocketUpdate('updatetimer', timeData['sessionTimer'])
            } else {
                updateTimer()
            }
        };
        loopPlayerAnimation();
        updateChildrenIndex();
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            if (curPage == 'game' && !gameData['complete']) {
                var findMee5 = [];
                for (var findMe56 = 0; findMe56 < gameData['players']['length']; findMe56++) {
                    var findMecb = gameData['players'][findMe56];
                    findMee5['push']({
                        x: findMecb['x'],
                        y: findMecb['y'],
                        frame: findMecb['frame'],
                        moveX: findMecb['moveX'],
                        moveY: findMecb['moveY']
                    })
                };
                postSocketUpdate('updateplayers', findMee5)
            }
        }
    }
}

function updateTimer() {
    if (timeData['oldTimer'] == -1) {
        timeData['oldTimer'] = timeData['sessionTimer']
    };
    if (timeData['sessionTimer'] <= 0) {
        timeData['sessionTimer'] = 0;
        playSound('soundTimerEnd');
        showGameStatus('timesup');
        if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
            if (socketData['gameIndex'] == gameData['multi']['round']) {
                gameData['complete'] = true;
                toggleGameSessionTimer(false);
                toggleGameTimer(false);
                allPlayersPointToPlayer();
                socketData['loaded'] = 0
            };
            postSocketUpdate('timesup')
        } else {
            endGame()
        }
    } else {
        if ((timeData['oldTimer'] - timeData['sessionTimer']) > 1000) {
            if (timeData['sessionTimer'] < 5000) {
                animateTimer();
                playSound('soundTimer')
            };
            timeData['oldTimer'] = timeData['sessionTimer']
        }
    };
    updateTimerBar()
}

function animateTimer() {
    var findMebf = 0.8;
    timerShape['alpha'] = 0.2;
    TweenMax['to'](timerShape, findMebf, {
        alpha: 1
    });
    timerShapeBg['alpha'] = 0;
    TweenMax['to'](timerShapeBg, findMebf, {
        alpha: 0.3
    })
}

function updateTimerBar() {
    timerShape['graphics']['clear']();
    timerShape['graphics']['beginFill'](gameSettings['timer']['color']);
    timerShapeBg['graphics']['clear']();
    timerShapeBg['graphics']['beginFill'](gameSettings['timer']['color']);
    timerShapeBg['alpha'] = 0.3;
    var findMeae = timeData['sessionTimer'] / timeData['countdown'] * gameSettings['timer']['width'];
    findMeae = findMeae < 5 ? 5 : findMeae;
    var findMee9 = gameSettings['timer']['radius'];
    timerShape['graphics']['drawRoundRectComplex'](0, 0, findMeae, gameSettings['timer']['height'], findMee9, findMee9, findMee9, findMee9);
    timerShapeBg['graphics']['drawRoundRectComplex'](0, 0, gameSettings['timer']['width'], gameSettings['timer']['height'], findMee9, findMee9, findMee9, findMee9)
}

function loopPlayerAnimation() {
    var findMeeb = true;
    if (findMeeb) {
        if (gameData['playerAudio'] > 0) {
            gameData['playerAudio']--
        };
        var findMeaa;
        if (gameData['players']['length'] > 0) {
            findMeaa = gameData['players'][0]
        };
        for (var findMe56 = 0; findMe56 < gameData['players']['length']; findMe56++) {
            var findMecb = gameData['players'][findMe56];
            var findMeec = true;
            if (gameData['complete'] && findMecb == findMeaa) {
                findMeec = false
            };
            if (findMeec) {
                if (findMecb['x'] == findMecb['data']['x'] && findMecb['y'] == findMecb['data']['y']) {
                    getPlayerFrame(findMecb, 'stand')
                } else {
                    var findMed1 = 'right';
                    if (findMecb['x'] < findMecb['data']['x']) {
                        findMed1 = 'left'
                    };
                    getPlayerFrame(findMecb, 'run' + findMed1)
                }
            };
            findMecb['data']['x'] = findMecb['x'];
            findMecb['data']['y'] = findMecb['y'];
            var findMeed = gameData['shadow'][findMe56];
            findMeed['x'] = findMecb['x'];
            findMeed['y'] = findMecb['y'];
            if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
                if (findMe56 < gameData['totalPlayers']) {
                    posPlayerName(findMe56, findMecb)
                }
            };
            if (findMe56 != 0 && curPage == 'main') {
                var findMecf = getDistance(findMeaa['x'], findMeaa['y'], findMecb['x'], findMecb['y']);
                if (findMecf <= 150) {
                    moveAwayPlayer(findMecb, findMeaa, true)
                }
            }
        }
    }
}

function getPlayerFrame(findMeb3, findMeef) {
    if (findMeb3['frame'] != findMeef) {
        findMeb3['frame'] = findMeef;
        findMeb3['gotoAndPlay'](findMeef)
    }
}

function updateChildrenIndex() {
    playersContainer['sortChildren'](sortFunction)
}
var sortFunction = function (findMef2, findMef3, findMef4) {
    if (findMef2['y'] > findMef3['y']) {
        return 1
    };
    if (findMef2['y'] < findMef3['y']) {
        return -1
    };
    return 0
};

function calculateScore() {
    playSound('soundClear');
    playSound('soundScore');
    var findMef6 = gameData['stage']['score'] / gameData['stage']['timer'];
    TweenMax['to'](timeData, gameSettings['score']['speed'], {
        sessionTimer: 0,
        overwrite: true,
        onUpdate: function () {
            var findMef7 = timeData['countdown'] - timeData['sessionTimer'];
            var findMef8 = Math['floor']((findMef7 - timeData['accumulate']) * findMef6);
            scoreTxt['text'] = textDisplay['score']['replace']('[NUMBER]', addCommas(findMef8));
            updateTimerBar()
        },
        onComplete: function () {
            var findMef7 = timeData['countdown'] - timeData['sessionTimer'];
            var findMef8 = Math['floor']((findMef7 - timeData['accumulate']) * findMef6);
            playerData['score'] += findMef8;
            TweenMax['to'](timerContainer, 1, {
                overwrite: true,
                onComplete: function () {
                    scoreTxt['text'] = '';
                    if (typeof initSocket == 'function' && multiplayerSettings['enable'] && socketData['online']) {
                        if (socketData['gameIndex'] == gameData['multi']['round']) {
                            $['players'][gameData['multi']['round']]['score'] = playerData['score']
                        };
                        postSocketUpdate('playersready')
                    } else {
                        showGameStatus('clear');
                        TweenMax['to'](timerContainer, 2, {
                            overwrite: true,
                            onComplete: function () {
                                proceedNextStage()
                            }
                        })
                    }
                }
            })
        }
    })
}

function updateMultiScore() {
    var findMefa = textDisplay['foundScore']['replace']('[NUMBER]', gameData['multi']['found']);
    findMefa = findMefa['replace']('[TOTAL]', gameData['totalPlayers'] - 1);
    scoreTxt['text'] = findMefa
}

function showGameStatus(findMe4e) {
    var findMeb9 = 2;
    if (findMe4e == 'timesup') {
        gameStatusTxt['text'] = textDisplay['timesup']
    } else {
        if (findMe4e == 'stage') {
            findMeb9 = 1;
            gameStatusTxt['text'] = textDisplay['stage']['replace']('[NUMBER]', playerData['stage'] + 1)
        } else {
            if (findMe4e == 'clear') {
                findMeb9 = 1;
                gameStatusTxt['text'] = textDisplay['stageClear']
            } else {
                if (findMe4e == 'round') {
                    findMeb9 = 1;
                    var findMefc = textDisplay['round']['replace']('[NUMBER]', gameData['multi']['round'] + 1);
                    findMefc = findMefc['replace']('[TOTAL]', gameData['totalPlayers']);
                    gameStatusTxt['text'] = findMefc
                } else {
                    if (findMe4e == 'preround') {
                        findMeb9 = 4;
                        var findMefc = textDisplay['round']['replace']('[NUMBER]', gameData['multi']['round'] + 1);
                        findMefc = findMefc['replace']('[TOTAL]', gameData['totalPlayers']);
                        gameStatusTxt['text'] = findMefc
                    } else {
                        if (findMe4e == 'roundcomplete') {
                            findMeb9 = 1;
                            gameStatusTxt['text'] = textDisplay['roundComplete']
                        }
                    }
                }
            }
        }
    };
    statusContainer['alpha'] = 0;
    TweenMax['to'](statusContainer, 0.5, {
        alpha: 1,
        overwrite: true,
        onComplete: function () {
            TweenMax['to'](statusContainer, 0.5, {
                delay: findMeb9,
                alpha: 0,
                overwrite: true
            })
        }
    })
}

function showMultiGameStatus(findMe4e) {
    var findMeb9 = 3;
    if (findMe4e == 'find') {
        gameMultiStatusTxt['text'] = textDisplay['findPlayers']['replace']('[TOTAL]', gameData['totalPlayers'] - 1)
    } else {
        if (findMe4e == 'hide') {
            gameMultiStatusTxt['text'] = textDisplay['hidePlayers']['replace']('[PLAYER]', $['players'][gameData['multi']['round']]['player'])
        }
    };
    gameMultiStatusTxt['alpha'] = 0;
    TweenMax['to'](gameMultiStatusTxt, 0.5, {
        alpha: 1,
        overwrite: true,
        onComplete: function () {
            TweenMax['to'](gameMultiStatusTxt, 0.5, {
                delay: findMeb9,
                alpha: 0,
                overwrite: true
            })
        }
    })
}

function proceedNextStage() {
    playerData['stage']++;
    gameData['stageNum']++;
    gameData['stageNum'] = gameData['stageNum'] > stage_arr['length'] - 1 ? stage_arr['length'] - 1 : gameData['stageNum'];
    setupGameStage();
    prepareStage()
}

function endGame() {
    toggleGameSessionTimer(false);
    toggleGameTimer(false);
    allPlayersPointToPlayer();
    playSound('soundFail');
    TweenMax['to'](gameContainer, 3, {
        overwrite: true,
        onComplete: function () {
            goPage('result')
        }
    })
}

function millisecondsToTimeGame(findMe101) {
    var findMe102 = findMe101 % 1000;
    var findMe103 = Math['floor']((findMe101 / 1000) % 60);
    var findMe104 = Math['floor']((findMe101 / (60 * 1000)) % 60);
    if (findMe103 < 10) {
        findMe103 = '0' + findMe103
    };
    if (findMe104 < 10) {
        findMe104 = '0' + findMe104
    };
    return findMe104 + ':' + findMe103
}

function toggleOption() {
    if (optionsContainer['visible']) {
        optionsContainer['visible'] = false
    } else {
        optionsContainer['visible'] = true
    }
}

function toggleSoundMute(findMe4e) {
    buttonSoundOff['visible'] = false;
    buttonSoundOn['visible'] = false;
    toggleSoundInMute(findMe4e);
    if (findMe4e) {
        buttonSoundOn['visible'] = true
    } else {
        buttonSoundOff['visible'] = true
    }
}

function toggleMusicMute(findMe4e) {
    buttonMusicOff['visible'] = false;
    buttonMusicOn['visible'] = false;
    toggleMusicInMute(findMe4e);
    if (findMe4e) {
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

function share(findMe10a) {
    gtag('event', 'click', {
        'event_category': 'share',
        'event_label': findMe10a
    });
    var findMe10b = location['href'];
    findMe10b = findMe10b['substring'](0, findMe10b['lastIndexOf']('/') + 1);
    var findMe10c = '';
    var findMe10d = '';
    findMe10c = shareTitle['replace']('[SCORE]', addCommas(playerData['score']));
    findMe10d = shareMessage['replace']('[SCORE]', addCommas(playerData['score']));
    var findMe10e = '';
    if (findMe10a == 'twitter') {
        findMe10e = 'https://twitter.com/intent/tweet?url=' + findMe10b + '&text=' + findMe10d
    } else {
        if (findMe10a == 'facebook') {
            findMe10e = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(findMe10b + 'share.php?desc=' + findMe10d + '&title=' + findMe10c + '&url=' + findMe10b + '&thumb=' + findMe10b + 'share.jpg&width=590&height=300')
        } else {
            if (findMe10a == 'google') {
                findMe10e = 'https://plus.google.com/share?url=' + findMe10b
            } else {
                if (findMe10a == 'whatsapp') {
                    findMe10e = 'whatsapp://send?text=' + encodeURIComponent(findMe10d) + ' - ' + encodeURIComponent(findMe10b)
                }
            }
        }
    };
    window['open'](findMe10e)
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
    if (typeof initSocket == 'function' && multiplayerSettings['enable']) {
        initSocket()
    };
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
        var findMe11b = ((stageW) * scalePercent);
        var findMe11c = ((stageH) * scalePercent);
        offset['left'] = 0;
        offset['top'] = 0;
        if (findMe11b > windowW) {
            offset['left'] = -((findMe11b) - windowW)
        } else {
            offset['left'] = windowW - (findMe11b)
        };
        if (findMe11c > windowH) {
            offset['top'] = -((findMe11c) - windowH)
        } else {
            offset['top'] = windowH - (findMe11c)
        };
        offset['x'] = 0;
        offset['y'] = 0;
        if (offset['left'] < 0) {
            offset['x'] = Math['abs']((offset['left'] / scalePercent) / 2)
        };
        if (offset['top'] < 0) {
            offset['y'] = Math['abs']((offset['top'] / scalePercent) / 2)
        };
        $('canvas')['css']('width', findMe11b);
        $('canvas')['css']('height', findMe11c);
        $('canvas')['css']('left', (offset['left'] / 2));
        $('canvas')['css']('top', (offset['top'] / 2));
        if (typeof initSocket == 'function' && multiplayerSettings['enable']) {
            $('.resizeFont')['each'](function (findMeb2, findMe11d) {
                $(this)['css']('font-size', Math['round'](Number($(this)['attr']('data-fontsize')) * scalePercent))
            });
            $('#roomWrapper')['css']('width', findMe11b);
            $('#roomWrapper')['css']('height', findMe11c);
            $('#roomWrapper')['css']('left', (offset['left'] / 2));
            $('#roomWrapper')['css']('top', (offset['top'] / 2));
            $('#notificationHolder')['css']('width', findMe11b);
            $('#notificationHolder')['css']('height', findMe11c);
            $('#notificationHolder')['css']('left', (offset['left'] / 2));
            $('#notificationHolder')['css']('top', (offset['top'] / 2))
        };
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
        $(window)['off']('orientationchange')['on']('orientationchange', function (findMe64) {
            $('#canvasHolder')['hide']();
            $('#rotateHolder')['hide']();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkMobileOrientation, 1000)
        });
        checkMobileOrientation()
    }
}

function checkMobileOrientation() {
    var findMe83 = false;
    if (window['innerWidth'] > window['innerHeight']) {
        findMe83 = true
    };
    if ($['editor']['enable']) {
        viewport['isLandscape'] = edit['isLandscape']
    } else {
        viewport['isLandscape'] = findMe83
    };
    changeViewport(viewport['isLandscape']);
    resizeGameFunc();
    $('#canvasHolder')['show']()
}

function toggleRotate(findMe4e) {
    if (findMe4e) {
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
        src: 'assets/logo.png',
        id: 'logo'
    }, {
        src: 'assets/logo_p.png',
        id: 'logoP'
    }, {
        src: 'assets/button_local.png',
        id: 'buttonLocal'
    }, {
        src: 'assets/button_online.png',
        id: 'buttonOnline'
    }, {
        src: 'assets/button_start.png',
        id: 'buttonStart'
    }, {
        src: 'assets/item_status.png',
        id: 'itemStatus'
    }, {
        src: 'assets/shadow.png',
        id: 'itemShadow'
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
    for (var findMe56 = 0; findMe56 < player_arr['length']; findMe56++) {
        manifest['push']({
            src: player_arr[findMe56]['src'],
            id: 'player' + findMe56
        })
    };
    for (var findMe56 = 0; findMe56 < players_arr['length']; findMe56++) {
        manifest['push']({
            src: players_arr[findMe56]['src'],
            id: 'players' + findMe56
        })
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
            src: 'assets/sounds/sound_click.ogg',
            id: 'soundButton'
        });
        manifest['push']({
            src: 'assets/sounds/sound_score.ogg',
            id: 'soundScore'
        });
        manifest['push']({
            src: 'assets/sounds/sound_timer.ogg',
            id: 'soundTimer'
        });
        manifest['push']({
            src: 'assets/sounds/sound_timer_end.ogg',
            id: 'soundTimerEnd'
        });
        manifest['push']({
            src: 'assets/sounds/sound_result.ogg',
            id: 'soundResult'
        });
        manifest['push']({
            src: 'assets/sounds/sound_clear.ogg',
            id: 'soundClear'
        });
        manifest['push']({
            src: 'assets/sounds/sound_fail.ogg',
            id: 'soundFail'
        });
        manifest['push']({
            src: 'assets/sounds/sound_start.ogg',
            id: 'soundStart'
        });
        manifest['push']({
            src: 'assets/sounds/sound_player1.ogg',
            id: 'soundPlayer1'
        });
        manifest['push']({
            src: 'assets/sounds/sound_player2.ogg',
            id: 'soundPlayer2'
        });
        manifest['push']({
            src: 'assets/sounds/sound_player3.ogg',
            id: 'soundPlayer3'
        });
        manifest['push']({
            src: 'assets/sounds/sound_player4.ogg',
            id: 'soundPlayer4'
        });
        manifest['push']({
            src: 'assets/sounds/sound_player5.ogg',
            id: 'soundPlayer5'
        });
        manifest['push']({
            src: 'assets/sounds/sound_running.ogg',
            id: 'soundRunning'
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

function fileComplete(findMe9b) {
    var findMe124 = findMe9b['item']
}

function handleFileError(findMe9b) {
    console['log']('error ', findMe9b)
}

function handleProgress() {
    $('#mainLoader span')['html'](Math['round'](loader['progress'] / 1 * 100) + '%')
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(findMe4e) {
    if (findMe4e) {
        $('#mainLoader')['show']()
    } else {
        $('#mainLoader')['hide']()
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var findMe12a = function () {
        try {
            if (createjs['WebAudioPlugin']['context']['state'] === 'suspended') {
                createjs['WebAudioPlugin']['context']['resume']();
                window['removeEventListener']('click', findMe12a)
            }
        } catch (e) {
            console['error']('There was an error while trying to resume the SoundJS Web Audio context...');
            console['error'](e)
        }
    };
    window['addEventListener']('click', findMe12a);
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
    var findMe12f = document['createElement']('canvas');
    if (findMe12f['getContext']) {
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