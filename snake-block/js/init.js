(function () {
    var snk1;
    var snk2 = function () {};
    var snk3 = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var snk4 = snk3['length'];
    var snk5 = (window['console'] = window['console'] || {});
    while (snk4--) {
        snk1 = snk3[snk4];
        if (!snk5[snk1]) {
            snk5[snk1] = snk2
        }
    }
}());

function checkContentHeight(_0xda06x7) {
    var stageHeight = $(window)['height']();
    var _0xda06x9 = (stageHeight / 2) - (_0xda06x7['height']() / 2);
    return _0xda06x9
}

function checkContentWidth(_0xda06x7) {
    var stageWidth = $(window)['width']();
    var _0xda06xc = (stageWidth / 2) - (_0xda06x7['width']() / 2);
    return _0xda06xc
}

function getDeviceVer() {
    var snk6 = navigator['userAgent'];
    var snk7;
    if (snk6['match'](/(iPad|iPhone|iPod touch)/)) {
        userOS = 'iOS';
        snk7 = snk6['indexOf']('OS ')
    } else {
        if (snk6['match'](/Android/)) {
            userOS = 'Android';
            snk7 = snk6['indexOf']('Android ')
        } else {
            userOS = 'unknown'
        }
    };
    if (userOS === 'iOS' && snk7 > -1) {
        userOSver = snk6['substr'](snk7 + 3, 3)['replace']('_', '.')
    } else {
        if (userOS === 'Android' && snk7 > -1) {
            userOSver = snk6['substr'](snk7 + 8, 3)
        } else {
            userOSver = 'unknown'
        }
    };
    return Number(userOSver)
}

function shuffle(snk11) {
    var snk12 = snk11['length'],
        snk13, snk14;
    while (0 !== snk12) {
        snk14 = Math['floor'](Math['random']() * snk12);
        snk12 -= 1;
        snk13 = snk11[snk12];
        snk11[snk12] = snk11[snk14];
        snk11[snk14] = snk13
    };
    return snk11
}

function randomBoolean() {
    return Math['random']() < 0.5
}

function sortOnObject(snk11, snk17, snk18) {
    if (snk18) {
        snk11['sort'](function (snk19, snk1a) {
            var snk1b = snk19[snk17],
                snk1c = snk1a[snk17];
            if (snk1b == snk1c) {
                return 0
            };
            return snk1b < snk1c ? 1 : -1
        })
    } else {
        snk11['sort'](function (snk19, snk1a) {
            var snk1b = snk19[snk17],
                snk1c = snk1a[snk17];
            if (snk1b == snk1c) {
                return 0
            };
            return snk1b > snk1c ? 1 : -1
        })
    };
    return snk11
}

function randomIntFromInterval(snk1e, snk1f) {
    return Math['floor'](Math['random']() * (snk1f - snk1e + 1) + snk1e)
}

function getDistance(snk21, snk22) {
    var snk23 = snk21['x'] - snk22['x'];
    var snk24 = snk21['y'] - snk22['y'];
    var snk25 = Math['floor'](Math['sqrt']((snk23 * snk23) + (snk24 * snk24)));
    return snk25
}

function getAnglePosition(snk27, snk28, snk29, snk2a) {
    var snk2b = {
        x: 0,
        y: 0
    };
    snk2b['x'] = snk27 + snk29 * Math['cos'](snk2a * Math['PI'] / 180);
    snk2b['y'] = snk28 + snk29 * Math['sin'](snk2a * Math['PI'] / 180);
    return snk2b
}

function getDirection(snk2d, snk2e) {
    var snk2a = Math['atan2'](snk2e['y'] - snk2d['y'], snk2e['x'] - snk2d['x']);
    return snk2a * 180 / Math['PI']
}

function sortNumber(snk19, snk1a) {
    return snk19 - snk1a
}
var enableMobileSound = true;
var soundOn;

function playSound(_0xda06x7, snk33) {
    if (soundOn) {
        var snk34;
        if (snk33) {
            snk34 = -1;
            createjs['Sound']['stop']();
            musicLoop = createjs['Sound']['play'](_0xda06x7, createjs['Sound'].INTERRUPT_NONE, 0, 0, snk34, 1);
            if (musicLoop == null || musicLoop['playState'] == createjs['Sound']['PLAY_FAILED']) {
                return
            } else {
                musicLoop['removeAllEventListeners']();
                musicLoop['addEventListener']('complete', function (snk35) {})
            }
        } else {
            snk34 = 0;
            createjs['Sound']['play'](_0xda06x7)
        }
    }
}

function stopSound() {
    createjs['Sound']['stop']()
}
$['sound'] = {};

function playSoundLoop(snk38) {
    if (soundOn) {
        if ($['sound'][snk38] == null) {
            $['sound'][snk38] = createjs['Sound']['play'](snk38);
            $['sound'][snk38]['removeAllEventListeners']();
            $['sound'][snk38]['addEventListener']('complete', function () {
                $['sound'][snk38]['play']()
            })
        }
    }
}

function stopSoundLoop(snk38) {
    if (soundOn) {
        if ($['sound'][snk38] != null) {
            $['sound'][snk38]['stop']();
            $['sound'][snk38] = null
        }
    }
}

function setSoundVolume(snk38, snk3b) {
    if (soundOn) {
        if ($['sound'][snk38] != null) {
            $['sound'][snk38]['volume'] = snk3b
        }
    }
}

function toggleMute(snk3d) {
    createjs['Sound']['setMute'](snk3d)
}
var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(snk42, snk43) {
    var snk44 = document['getElementById']('gameCanvas');
    snk44['width'] = snk42;
    snk44['height'] = snk43;
    canvasW = snk42;
    canvasH = snk43;
    stage = new createjs.Stage('gameCanvas');
    createjs['Touch']['enable'](stage);
    stage['enableMouseOver'](20);
    stage['mouseMoveOutside'] = true;
    createjs['Ticker']['framerate'] = 60;
    createjs['Ticker']['addEventListener']('tick', tick)
}
var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer;
var guideline, bg, logo, buttonStart, buttonReplay, buttonFacebook, buttonTwitter, buttonGoogle, buttonFullscreen, buttonSoundOn, buttonSoundOff;

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    shapeContainer = new createjs.Container();
    blockContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    backgroundWhite = new createjs.Bitmap(loader['getResult']('backgroundWhite'));
    backgroundWhite['alpha'] = 0;
    bg = new createjs.Bitmap(loader['getResult']('background'));
    logo = new createjs.Bitmap(loader['getResult']('logo'));
    buttonStart = new createjs.Bitmap(loader['getResult']('buttonStart'));
    centerReg(buttonStart);
    buttonStart['x'] = canvasW / 2;
    buttonStart['y'] = canvasH / 100 * 55;
    gradient = new createjs.Bitmap(loader['getResult']('gradient'));
    itemHeadHit = new createjs.Bitmap(loader['getResult']('itemHeadHit'));
    centerReg(itemHeadHit);
    itemHeadHit['x'] = -500;
    var snk56 = 39;
    var snk57 = 51;
    var snk58 = {
        "regX": 20,
        "regY": 33,
        "height": snk57,
        "count": 2,
        "width": snk56
    };
    var snk59 = {
        static: {
            frames: [0],
            speed: 1
        },
        power: {
            frames: [1],
            speed: 1
        }
    };
    itemHeadData = new createjs.SpriteSheet({
        "images": [loader['getResult']('itemHead')['src']],
        "frames": snk58,
        "animations": snk59
    });
    itemHeadAnimate = new createjs.Sprite(itemHeadData, 'static');
    itemHeadAnimate['framerate'] = 20;
    itemHeadAnimate['x'] = -100;
    itemTail1 = new createjs.Bitmap(loader['getResult']('itemTail1'));
    centerReg(itemTail1);
    itemTail2 = new createjs.Bitmap(loader['getResult']('itemTail2'));
    centerReg(itemTail2);
    itemTail3 = new createjs.Bitmap(loader['getResult']('itemTail3'));
    centerReg(itemTail3);
    itemTail1['x'] = itemTail2['x'] = itemTail3['x'] = -500;
    itemBlockWhite = new createjs.Bitmap(loader['getResult']('itemBlockWhite'));
    centerReg(itemBlockWhite);
    itemBlock1 = new createjs.Bitmap(loader['getResult']('itemBlock1'));
    centerReg(itemBlock1);
    itemBlock2 = new createjs.Bitmap(loader['getResult']('itemBlock2'));
    centerReg(itemBlock2);
    itemBlock3 = new createjs.Bitmap(loader['getResult']('itemBlock3'));
    centerReg(itemBlock3);
    itemBlockWhite['x'] = itemBlock1['x'] = itemBlock2['x'] = itemBlock3['x'] = -500;
    itemDivider = new createjs.Bitmap(loader['getResult']('itemDivider'));
    centerReg(itemDivider);
    iconShield = new createjs.Bitmap(loader['getResult']('iconShield'));
    centerReg(iconShield);
    iconTail = new createjs.Bitmap(loader['getResult']('iconTail'));
    centerReg(iconTail);
    iconExplode = new createjs.Bitmap(loader['getResult']('iconExplode'));
    centerReg(iconExplode);
    iconMagnet = new createjs.Bitmap(loader['getResult']('iconMagnet'));
    centerReg(iconMagnet);
    iconShield['x'] = iconTail['x'] = iconExplode['x'] = iconMagnet['x'] = -500;
    itemPowerShield = new createjs.Bitmap(loader['getResult']('itemPowerShield'));
    centerReg(itemPowerShield);
    itemPowerMagnet = new createjs.Bitmap(loader['getResult']('itemPowerMagnet'));
    centerReg(itemPowerMagnet);
    itemDivider['x'] = iconShield['x'] = iconTail['x'] = iconExplode['x'] = itemPowerShield['x'] = itemPowerMagnet['x'] = -500;
    itemSide = new createjs.Bitmap(loader['getResult']('itemSide'));
    scoreTxt = new createjs.Text();
    scoreTxt['font'] = '45px aspergitbold';
    scoreTxt['color'] = '#fff';
    scoreTxt['textAlign'] = 'center';
    scoreTxt['textBaseline'] = 'alphabetic';
    scoreTxt['text'] = '';
    scoreTxt['x'] = canvasW / 2;
    headScoreTxt = new createjs.Text();
    headScoreTxt['font'] = '35px aspergitbold';
    headScoreTxt['color'] = '#fff';
    headScoreTxt['textAlign'] = 'center';
    headScoreTxt['textBaseline'] = 'alphabetic';
    headScoreTxt['text'] = '';
    resultTitleTxt = new createjs.Text();
    resultTitleTxt['font'] = '50px aspergitbold';
    resultTitleTxt['color'] = '#fff';
    resultTitleTxt['textAlign'] = 'center';
    resultTitleTxt['textBaseline'] = 'alphabetic';
    resultTitleTxt['text'] = resultTitleText;
    resultTitleTxt['x'] = canvasW / 2;
    resultTitleTxt['y'] = canvasH / 100 * 32;
    resultScoreTxt = new createjs.Text();
    resultScoreTxt['font'] = '120px aspergitbold';
    resultScoreTxt['color'] = '#51B9AD';
    resultScoreTxt['textAlign'] = 'center';
    resultScoreTxt['textBaseline'] = 'alphabetic';
    resultScoreTxt['text'] = resultScoreText;
    resultScoreTxt['x'] = canvasW / 2;
    resultScoreTxt['y'] = canvasH / 100 * 44;
    resultShareTxt = new createjs.Text();
    resultShareTxt['font'] = '25px aspergitbold';
    resultShareTxt['color'] = '#DDDDDC';
    resultShareTxt['textAlign'] = 'center';
    resultShareTxt['textBaseline'] = 'alphabetic';
    resultShareTxt['text'] = shareText;
    resultShareTxt['x'] = canvasW / 2;
    resultShareTxt['y'] = canvasH / 100 * 65;
    buttonFacebook = new createjs.Bitmap(loader['getResult']('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader['getResult']('buttonTwitter'));
    buttonGoogle = new createjs.Bitmap(loader['getResult']('buttonGoogle'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonGoogle);
    createHitarea(buttonGoogle);
    buttonFacebook['x'] = canvasW / 100 * 35;
    buttonTwitter['x'] = canvasW / 2;
    buttonGoogle['x'] = canvasW / 100 * 65;
    buttonFacebook['y'] = buttonTwitter['y'] = buttonGoogle['y'] = canvasH / 100 * 72;
    buttonReplay = new createjs.Bitmap(loader['getResult']('buttonReplay'));
    centerReg(buttonReplay);
    createHitarea(buttonReplay);
    buttonReplay['x'] = canvasW / 2;
    buttonReplay['y'] = canvasH / 100 * 55;
    buttonFullscreen = new createjs.Bitmap(loader['getResult']('buttonFullscreen'));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs.Bitmap(loader['getResult']('buttonSoundOn'));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs.Bitmap(loader['getResult']('buttonSoundOff'));
    centerReg(buttonSoundOff);
    buttonSoundOn['visible'] = false;
    if (guide) {
        guideline = new createjs.Shape();
        guideline['graphics']['setStrokeStyle'](2)['beginStroke']('red')['drawRect']((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    };
    mainContainer['addChild'](logo, buttonStart);
    gameContainer['addChild'](itemSide, itemHeadAnimate, itemHeadHit, itemTail1, itemTail2, itemTail3, itemBlock1, itemBlock2, itemBlock3, itemDivider, iconShield, iconTail, iconExplode, iconMagnet, blockContainer, shapeContainer, gradient, scoreTxt);
    resultContainer['addChild'](resultTitleTxt, resultScoreTxt, buttonReplay);
    if (shareEnable) {
        resultContainer['addChild'](resultShareTxt, buttonFacebook, buttonTwitter, buttonGoogle)
    };
    canvasContainer['addChild'](bg, backgroundWhite, mainContainer, gameContainer, resultContainer, buttonFullscreen, buttonSoundOn, buttonSoundOff, guideline);
    stage['addChild'](canvasContainer);
    resizeCanvas()
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        gradient['y'] = offset['y'];
        scoreTxt['y'] = offset['y'] + 60;
        buttonSoundOn['x'] = buttonSoundOff['x'] = canvasW - offset['x'];
        buttonSoundOn['y'] = buttonSoundOff['y'] = offset['y'];
        buttonSoundOn['x'] = buttonSoundOff['x'] -= 40;
        buttonSoundOn['y'] = buttonSoundOff['y'] += 30;
        buttonFullscreen['x'] = buttonSoundOn['x'] - 50;
        buttonFullscreen['y'] = buttonSoundOn['y']
    }
}

function removeGameCanvas() {
    stage['autoClear'] = true;
    stage['removeAllChildren']();
    stage['update']();
    createjs['Ticker']['removeEventListener']('tick', tick);
    createjs['Ticker']['removeEventListener']('tick', stage)
}

function tick(snk5d) {
    updateGame();
    stage['update'](snk5d)
}

function centerReg(snk2d) {
    snk2d['regX'] = snk2d['image']['naturalWidth'] / 2;
    snk2d['regY'] = snk2d['image']['naturalHeight'] / 2
}

function createHitarea(snk2d) {
    snk2d['hitArea'] = new createjs.Shape(new createjs.Graphics()['beginFill']('#000')['drawRect'](0, 0, snk2d['image']['naturalWidth'], snk2d['image']['naturalHeight']))
}
var snakeHeadW = 22;
var snakeTailW = 14;
var dividerW = 5;
var blockW = 100;
var snakePositionY = 600;
var gameScoreText = '[NUMBER]PTS';
var levelData = {
    number: 5,
    block_arr: [4, 5, 3, 2, 4, 5],
    divider_arr: [1, 2, 3, 1, 2],
    powerTimer: 15000,
    powerTimer_arr: [0, 5000, 0, 8000],
    gap_arr: [4, 3, 4, 3, 2],
    moveSpeed: 3,
    numberIncrease: 1,
    moveSpeedIncrease: 0.5,
    gridNextLevel: 10
};
var scoreData = {
    grid: 10,
    power: 30
};
var resultTitleText = 'GAME OVER';
var resultScoreText = '[NUMBER]PTS';
var shareEnable = true;
var shareText = 'SHARE YOUR SCORE';
var shareTitle = 'Highscore on Snake VS Block Game is [SCORE]PTS.';
var shareMessage = '[SCORE]PTS is mine new highscore on Snake VS Block Game! Try it now!';
var playerData = {
    score: 0
};
var gameData = {
    touch: false,
    distanceX: 0,
    stageX: 0,
    stageY: 0,
    body_arr: [],
    block_arr: [],
    divider_arr: [],
    power_arr: [],
    move: true,
    moveSpeed: 1,
    hit: false,
    powerShowTimer: 0,
    timer: 0,
    powerType: [0, 0, 0],
    powerTypeTimer: [0, 0, 0, 0],
    powerNum: 0,
    powerType_arr: [1, 2, 3],
    gridCount: 0,
    number: 0,
    tailCount: 0,
    create: false,
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0,
    blockSpaceX: 114,
    blockSpaceY: 114,
    dividerHeight: 120,
    blockNum: 0,
    lineNum: 0,
    gapNum: 0,
    gridNum: 0,
    gridY: 0,
    gridType: 1,
    desktop: true,
    paused: true
};
var collisionMethod = ndgmr['checkRectCollision'];
var shapeOffset = {
    x: 0,
    y: 0
};

function buildGameButton() {
    buttonStart['cursor'] = 'pointer';
    buttonStart['addEventListener']('click', function (_0xda06x73) {
        playSound('soundCoin');
        goPage('game')
    });
    buttonReplay['cursor'] = 'pointer';
    buttonReplay['addEventListener']('click', function (_0xda06x73) {
        playSound('soundCoin');
        goPage('game')
    });
    buttonFacebook['cursor'] = 'pointer';
    buttonFacebook['addEventListener']('click', function (_0xda06x73) {
        share('facebook')
    });
    buttonTwitter['cursor'] = 'pointer';
    buttonTwitter['addEventListener']('click', function (_0xda06x73) {
        share('twitter')
    });
    buttonGoogle['cursor'] = 'pointer';
    buttonGoogle['addEventListener']('click', function (_0xda06x73) {
        share('google')
    });
    buttonSoundOff['cursor'] = 'pointer';
    buttonSoundOff['addEventListener']('click', function (_0xda06x73) {
        toggleGameMute(true)
    });
    buttonSoundOn['cursor'] = 'pointer';
    buttonSoundOn['addEventListener']('click', function (_0xda06x73) {
        toggleGameMute(false)
    });
    buttonFullscreen['cursor'] = 'pointer';
    buttonFullscreen['addEventListener']('click', function (_0xda06x73) {
        toggleFullScreen()
    })
}
var curPage = '';

function goPage(_0xda06x76) {
    curPage = _0xda06x76;
    mainContainer['visible'] = false;
    gameContainer['visible'] = false;
    resultContainer['visible'] = false;
    animateButton(buttonStart, false);
    animateButton(buttonReplay, false);
    stopSoundLoop('musicMain');
    TweenMax['killTweensOf'](resultScoreTxt);
    var _0xda06x77 = null;
    switch (_0xda06x76) {
    case 'main':
        _0xda06x77 = mainContainer;
        animateButton(buttonStart, true);
        playSoundLoop('musicMain');
        break;
    case 'game':
        _0xda06x77 = gameContainer;
        startGame();
        break;
    case 'result':
        _0xda06x77 = resultContainer;
        resultScoreTxt['text'] = resultScoreText['replace']('[NUMBER]', playerData['score']);
        stopGame();
        animateButton(buttonReplay, true);
        playSound('soundFail');
        TweenMax['to'](resultScoreTxt, 3.5, {
            overwrite: true,
            onComplete: function () {
                playSoundLoop('musicMain')
            }
        });
        saveGame(playerData['score']);
        break
    };
    if (_0xda06x77 != null) {
        _0xda06x77['visible'] = true;
        _0xda06x77['alpha'] = 0;
        TweenMax['to'](_0xda06x77, 0.5, {
            alpha: 1,
            overwrite: true
        })
    }
}

function animateButton(snk2d, snk3d, _0xda06x79) {
    var _0xda06x7a = 0.1;
    if (snk3d) {
        var _0xda06x7b = 1;
        if (_0xda06x79) {
            _0xda06x79 = false;
            _0xda06x7b = 0.3
        } else {
            _0xda06x79 = true
        };
        TweenMax['to'](snk2d, _0xda06x7a, {
            alpha: _0xda06x7b,
            overwrite: true,
            onComplete: animateButton,
            onCompleteParams: [snk2d, snk3d, _0xda06x79]
        })
    } else {
        TweenMax['to'](snk2d, _0xda06x7a, {
            alpha: 1,
            overwrite: true
        })
    }
}

function startGame() {
    gameData['paused'] = false;
    playerData['score'] = 0;
    backgroundWhite['alpha'] = 0;
    if (gameData['desktop']) {
        gameData['touch'] = true
    } else {
        gameData['touch'] = false
    };
    gameData['body_arr'] = [];
    gameData['block_arr'] = [];
    gameData['divider_arr'] = [];
    gameData['power_arr'] = [];
    gameData['move'] = false;
    gameData['hit'] = false;
    gameData['powerShowTimer'] = 0;
    gameData['powerType'] = [0, 0, 0, 0];
    gameData['powerTypeTimer'] = [0, 0, 0, 0];
    gameData['tailCount'] = 1;
    gameData['create'] = false;
    gameData['gridType'] = 1;
    gameData['timer'] = new Date();
    gameData['moveSpeed'] = levelData['moveSpeed'];
    gameData['gridCount'] = 0;
    gameData['number'] = levelData['number'];
    blockContainer['y'] = shapeContainer['y'] = 0;
    shapeOffset['y'] = shapeContainer['y'];
    resetPowerShowTimer();
    createSnakeHead();
    createSnakeTails(4);
    setupLevel();
    createLevelGrid()
}

function stopGame() {
    TweenMax['killAll']();
    gameData['paused'] = true;
    backgroundWhite['alpha'] = 0;
    gameData['touch'] = false;
    gameData['body_arr'] = [];
    gameData['block_arr'] = [];
    gameData['divider_arr'] = [];
    gameData['power_arr'] = [];
    gameData['move'] = false;
    gameData['hit'] = false;
    gameData['powerShowTimer'] = 0;
    gameData['create'] = false;
    shapeContainer['removeAllChildren']();
    blockContainer['removeAllChildren']()
}

function saveGame(_0xda06x7f) {}

function setupTouchEvents() {
    if ($['browser']['mobile'] || isTablet) {
        gameData['desktop'] = false
    };
    stage['on']('stagemousedown', function (_0xda06x73) {
        if (!gameData['desktop']) {
            gameData['touch'] = true
        };
        gameData['stageX'] = _0xda06x73['stageX'];
        gameData['stageY'] = _0xda06x73['stageY'];
        gameData['stageX'] = gameData['stageX'] < canvasW / 100 * 15 ? canvasW / 100 * 15 : gameData['stageX'];
        gameData['stageX'] = gameData['stageX'] > canvasW / 100 * 85 ? canvasW / 100 * 85 : gameData['stageX']
    });
    stage['on']('stagemousemove', function (_0xda06x73) {
        if (gameData['touch']) {
            gameData['stageX'] = _0xda06x73['stageX'];
            gameData['stageY'] = _0xda06x73['stageY'];
            gameData['stageX'] = gameData['stageX'] < canvasW / 100 * 15 ? canvasW / 100 * 15 : gameData['stageX'];
            gameData['stageX'] = gameData['stageX'] > canvasW / 100 * 85 ? canvasW / 100 * 85 : gameData['stageX']
        }
    });
    stage['on']('stagemouseup', function (_0xda06x73) {
        if (!gameData['desktop']) {
            gameData['touch'] = false
        }
    })
}

function createSnakeHead() {
    var _0xda06x82 = itemHeadHit['clone']();
    _0xda06x82['x'] = gameData['stageX'] = gameData['distanceX'] = canvasW / 2;
    _0xda06x82['y'] = snakePositionY;
    _0xda06x82['visible'] = false;
    itemHeadAnimate['gotoAndStop']('static');
    itemPowerShield['visible'] = false;
    itemPowerMagnet['visible'] = false;
    shapeContainer['addChild'](_0xda06x82, itemHeadAnimate, itemPowerShield, itemPowerMagnet, headScoreTxt);
    gameData['body_arr']['push'](_0xda06x82)
}

function createSnakeTails(_0xda06x84) {
    var _0xda06x85 = gameData['body_arr'][gameData['body_arr']['length'] - 1];
    for (var _0xda06x86 = 0; _0xda06x86 < _0xda06x84; _0xda06x86++) {
        var _0xda06x87;
        _0xda06x87 = this['itemTail' + gameData['tailCount']]['clone']();
        _0xda06x87['x'] = _0xda06x85['x'];
        _0xda06x87['y'] = _0xda06x85['y'];
        shapeContainer['addChild'](_0xda06x87);
        gameData['body_arr']['push'](_0xda06x87);
        gameData['tailCount']++;
        gameData['tailCount'] = gameData['tailCount'] > 3 ? 1 : gameData['tailCount']
    };
    shapeContainer['setChildIndex'](itemHeadAnimate, shapeContainer['numChildren'] - 1);
    shapeContainer['setChildIndex'](itemPowerMagnet, shapeContainer['numChildren'] - 1);
    shapeContainer['setChildIndex'](itemPowerShield, shapeContainer['numChildren'] - 1);
    shapeContainer['setChildIndex'](headScoreTxt, shapeContainer['numChildren'] - 1)
}

function removeTails() {
    if (gameData['body_arr']['length'] == 1) {
        goPage('result')
    } else {
        var _0xda06x85 = gameData['body_arr'][gameData['body_arr']['length'] - 1];
        shapeContainer['removeChild'](_0xda06x85);
        gameData['body_arr']['splice'](gameData['body_arr']['length'] - 1, 1);
        gameData['tailCount']--;
        gameData['tailCount'] = gameData['tailCount'] < 1 ? 3 : gameData['tailCount']
    }
}

function createBlock(_0xda06x8a, _0xda06x8b, _0xda06x8c) {
    var _0xda06x8d;
    _0xda06x8d = this['itemBlock3']['clone']();
    if (_0xda06x8c <= Math['floor'](Number(gameData['number']) / 2)) {
        _0xda06x8d = this['itemBlock1']['clone']()
    } else {
        if (_0xda06x8c <= Number(gameData['number'])) {
            _0xda06x8d = this['itemBlock2']['clone']()
        }
    };
    _0xda06x8d['x'] = _0xda06x8a;
    _0xda06x8d['y'] = _0xda06x8b;
    _0xda06x8d['hitNumber'] = _0xda06x8c;
    var _0xda06x8e = new createjs.Text();
    _0xda06x8e['font'] = '50px aspergitbold';
    _0xda06x8e['color'] = '#fff';
    _0xda06x8e['textAlign'] = 'center';
    _0xda06x8e['textBaseline'] = 'alphabetic';
    _0xda06x8e['text'] = _0xda06x8c;
    _0xda06x8e['x'] = _0xda06x8a;
    _0xda06x8e['y'] = _0xda06x8b + 20;
    blockContainer['addChild'](_0xda06x8d, _0xda06x8e);
    gameData['block_arr']['push']({
        obj: _0xda06x8d,
        text: _0xda06x8e,
        x: _0xda06x8d['x'],
        distance: 0
    })
}

function createDivider(_0xda06x8a, _0xda06x8b) {
    var _0xda06x90 = itemDivider['clone']();
    _0xda06x90['x'] = _0xda06x8a;
    _0xda06x90['y'] = _0xda06x8b;
    blockContainer['addChild'](_0xda06x90);
    gameData['divider_arr']['push']({
        obj: _0xda06x90,
        x: _0xda06x90['x']
    })
}

function createPower(_0xda06x8a, _0xda06x8b, _0xda06x92, _0xda06x8c) {
    if (randomBoolean()) {
        _0xda06x8a -= 33
    } else {
        _0xda06x8a += 33
    };
    var _0xda06x8e = new createjs.Text();
    _0xda06x8e['font'] = '25px aspergitbold';
    _0xda06x8e['color'] = '#fff';
    _0xda06x8e['textAlign'] = 'center';
    _0xda06x8e['textBaseline'] = 'alphabetic';
    _0xda06x8e['text'] = _0xda06x8c;
    _0xda06x8e['x'] = _0xda06x8a;
    _0xda06x8e['y'] = _0xda06x8b - 25;
    var _0xda06x93;
    if (_0xda06x92 == 0) {
        _0xda06x93 = iconTail['clone']()
    } else {
        if (_0xda06x92 == 1) {
            _0xda06x93 = iconShield['clone']();
            _0xda06x8e['visible'] = false
        } else {
            if (_0xda06x92 == 2) {
                _0xda06x93 = iconExplode['clone']();
                _0xda06x8e['visible'] = false
            } else {
                if (_0xda06x92 == 3) {
                    _0xda06x93 = iconMagnet['clone']();
                    _0xda06x8e['visible'] = false
                }
            }
        }
    };
    _0xda06x93['x'] = _0xda06x8a;
    _0xda06x93['y'] = _0xda06x8b;
    _0xda06x93['hitNumber'] = _0xda06x8c;
    animateButton(_0xda06x93, true);
    blockContainer['addChild'](_0xda06x93, _0xda06x8e);
    gameData['power_arr']['push']({
        obj: _0xda06x93,
        text: _0xda06x8e,
        type: _0xda06x92
    })
}

function updateGame() {
    if (!gameData['paused']) {
        gameData['timer'] = new Date();
        loopSnakeTails();
        scoreTxt['text'] = gameScoreText['replace']('[NUMBER]', playerData['score']);
        headScoreTxt['text'] = gameData['body_arr']['length'];
        if (gameData['move']) {
            shapeContainer['y'] += gameData['moveSpeed'];
            blockContainer['y'] = shapeContainer['y'];
            shapeOffset['y'] = shapeContainer['y']
        };
        checkPowerTimer();
        loopLevelScreen()
    }
}

function loopSnakeTails() {
    var _0xda06x96 = 0;
    var snk2a = 0;
    var _0xda06x97 = 0;
    var _0xda06x98 = Math['abs'](gameData['distanceX'] - gameData['stageX']);
    var _0xda06x99 = gameData['distanceX'] > gameData['stageX'] ? false : true;
    var _0xda06x9a = 50;
    if (_0xda06x98 < 50) {
        gameData['distanceX'] = gameData['stageX']
    } else {
        if (_0xda06x99) {
            gameData['distanceX'] += _0xda06x9a
        } else {
            gameData['distanceX'] -= _0xda06x9a
        }
    };
    for (var _0xda06x86 = 0; _0xda06x86 < gameData['body_arr']['length']; _0xda06x86++) {
        var _0xda06x9b = gameData['body_arr'][_0xda06x86];
        if (_0xda06x86 == 0) {
            var _0xda06x9c = _0xda06x9b['x'] - gameData['distanceX'];
            snk2a = _0xda06x9c / (canvasW / 2) * 60;
            itemHeadAnimate['rotation'] = -snk2a;
            detectObjectRange(_0xda06x9b, gameData['distanceX'], snakeHeadW, true);
            detectBlockCollision(_0xda06x9b);
            detectPowerCollision(_0xda06x9b);
            itemHeadAnimate['x'] = itemPowerShield['x'] = itemPowerMagnet['x'] = headScoreTxt['x'] = _0xda06x9b['x'];
            if (gameData['move']) {
                _0xda06x9b['y'] = (snakePositionY) - shapeOffset['y'];
                itemHeadAnimate['y'] = itemPowerShield['y'] = itemPowerMagnet['y'] = _0xda06x9b['y'];
                headScoreTxt['y'] = _0xda06x9b['y'] - 45
            }
        } else {
            snk2a = getDirection(_0xda06x9b, _0xda06x96);
            if (_0xda06x86 == 1) {
                _0xda06x97 = getAnglePosition(_0xda06x96['x'], _0xda06x96['y'], ((snakeHeadW - 5) * 2), snk2a + 180)
            } else {
                _0xda06x97 = getAnglePosition(_0xda06x96['x'], _0xda06x96['y'], (snakeTailW * 2), snk2a + 180)
            };
            detectObjectRange(_0xda06x9b, _0xda06x97['x'], snakeTailW);
            _0xda06x9b['y'] = _0xda06x97['y'];
            _0xda06x9b['rotation'] = snk2a + 90
        };
        _0xda06x96 = _0xda06x9b
    }
}

function detectBlockCollision(snk2d) {
    var _0xda06x9e = false;
    for (var _0xda06x86 = 0; _0xda06x86 < gameData['block_arr']['length']; _0xda06x86++) {
        var _0xda06x9f = gameData['block_arr'][_0xda06x86]['obj'];
        gameData['block_arr'][_0xda06x86]['distance'] = getDistance(snk2d, _0xda06x9f)
    };
    sortOnObject(gameData['block_arr'], 'distance', false);
    for (var _0xda06x86 = 0; _0xda06x86 < gameData['block_arr']['length']; _0xda06x86++) {
        var _0xda06x9f = gameData['block_arr'][_0xda06x86]['obj'];
        var _0xda06xa0 = collisionMethod(snk2d, _0xda06x9f);
        var _0xda06xa1 = getObjY(_0xda06x9f['y']);
        var _0xda06xa2 = getObjY(snk2d['y']);
        var _0xda06xa3 = (gameData['blockSpaceY'] / 3) + (snakeHeadW / 2);
        if (_0xda06xa0 && _0xda06x9f['visible'] && _0xda06xa2 <= (_0xda06xa1 - _0xda06xa3)) {
            _0xda06x9e = true;
            gameData['move'] = false;
            startHitBlockAnimation(_0xda06x86)
        }
    };
    if (!_0xda06x9e) {
        gameData['move'] = true
    }
}

function detectPowerCollision(snk2d) {
    for (var _0xda06x86 = 0; _0xda06x86 < gameData['power_arr']['length']; _0xda06x86++) {
        var _0xda06xa5 = gameData['power_arr'][_0xda06x86]['obj'];
        var _0xda06xa6 = gameData['power_arr'][_0xda06x86]['text'];
        var _0xda06xa0 = collisionMethod(snk2d, _0xda06xa5);
        if (_0xda06xa5['visible']) {
            if (_0xda06xa0) {
                _0xda06xa5['visible'] = _0xda06xa6['visible'] = false;
                startHitPowerAnimation(_0xda06x86)
            } else {
                if (gameData['powerType'][3] == 1) {
                    var _0xda06xa7 = getDistance(snk2d, _0xda06xa5);
                    if (_0xda06xa7 < 200) {
                        var _0xda06x7a = 0.2;
                        if (gameData['moveSpeed'] < 5) {
                            _0xda06x7a = 0.4
                        };
                        TweenMax['to'](_0xda06xa5, _0xda06x7a, {
                            x: snk2d['x'],
                            y: snk2d['y'],
                            overwrite: true,
                            onComplete: function () {}
                        })
                    } else {
                        TweenMax['killTweensOf'](_0xda06xa5);
                        animateButton(_0xda06xa5, true)
                    }
                }
            }
        }
    }
}

function startHitPowerAnimation(_0xda06xa9) {
    var _0xda06xa5 = gameData['power_arr'][_0xda06xa9]['obj'];
    var _0xda06xaa = gameData['power_arr'][_0xda06xa9]['type'];
    _0xda06xa5['visible'] = false;
    playerData['score'] += scoreData['power'];
    gameData['powerType'][_0xda06xaa] = 1;
    playSound('soundCoin');
    gameData['powerTypeTimer'][_0xda06xaa] = new Date();
    if (_0xda06xaa == 0) {
        createSnakeTails(_0xda06xa5['hitNumber'])
    } else {
        if (_0xda06xaa == 1) {
            itemHeadAnimate['gotoAndStop']('power');
            itemPowerShield['visible'] = true;
            playSound('soundPower')
        } else {
            if (_0xda06xaa == 2) {
                playSound('soundClear');
                backgroundWhite['alpha'] = 1;
                TweenMax['to'](backgroundWhite, 0.2, {
                    alpha: 0,
                    overwrite: true,
                    onComplete: function () {}
                })
            } else {
                if (_0xda06xaa == 3) {
                    playSound('soundPower');
                    itemPowerMagnet['visible'] = true
                }
            }
        }
    }
}

function checkPowerTimer() {
    if (gameData['powerType'][1] == 1) {
        var _0xda06xac = (gameData['timer']['getTime']() - gameData['powerTypeTimer'][1]['getTime']());
        if (_0xda06xac >= levelData['powerTimer_arr'][1]) {
            itemHeadAnimate['gotoAndStop']('static');
            itemPowerShield['visible'] = false;
            gameData['powerType'][1] = 0
        } else {
            itemPowerShield['rotation']++
        }
    } else {
        if (gameData['powerType'][3] == 1) {
            var _0xda06xac = (gameData['timer']['getTime']() - gameData['powerTypeTimer'][3]['getTime']());
            if (_0xda06xac >= levelData['powerTimer_arr'][3]) {
                itemPowerMagnet['visible'] = false;
                gameData['powerType'][3] = 0
            } else {
                itemPowerMagnet['rotation']++
            }
        }
    }
}

function resetPowerShowTimer() {
    gameData['powerShowTimer'] = new Date()
}

function startHitBlockAnimation(_0xda06xa9) {
    if (!gameData['hit']) {
        gameData['hit'] = true;
        var _0xda06x9f = gameData['block_arr'][_0xda06xa9]['obj'];
        var _0xda06xa6 = gameData['block_arr'][_0xda06xa9]['text'];
        var _0xda06xaf = Number(_0xda06x9f['hitNumber']);
        blockContainer['addChild'](itemBlockWhite);
        itemBlockWhite['x'] = _0xda06x9f['x'];
        itemBlockWhite['y'] = _0xda06x9f['y'];
        itemBlockWhite['alpha'] = 1;
        playSound('soundHit');
        if (gameData['powerType'][1] == 1) {
            _0xda06x9f['visible'] = _0xda06xa6['visible'] = false;
            gameData['hit'] = false;
            gameData['move'] = true;
            TweenMax['to'](itemBlockWhite, 0.2, {
                alpha: 0,
                overwrite: true
            })
        } else {
            _0xda06xaf--;
            if (_0xda06xaf >= 0) {
                removeTails();
                _0xda06xa6['text'] = _0xda06xaf;
                _0xda06x9f['hitNumber'] = _0xda06xaf;
                if (_0xda06xaf <= 0) {
                    _0xda06x9f['visible'] = _0xda06xa6['visible'] = false;
                    gameData['hit'] = false;
                    gameData['move'] = true;
                    TweenMax['to'](itemBlockWhite, 0.2, {
                        alpha: 0,
                        overwrite: true
                    })
                } else {
                    TweenMax['to'](itemBlockWhite, 0.2, {
                        alpha: 0,
                        overwrite: true,
                        onComplete: function () {
                            gameData['hit'] = false
                        }
                    })
                }
            }
        }
    }
}

function detectObjectRange(snk2d, _0xda06xb1, _0xda06xb2, snk3d) {
    var _0xda06x9e = false;
    for (var _0xda06x86 = 0; _0xda06x86 < gameData['block_arr']['length']; _0xda06x86++) {
        var _0xda06x9f = gameData['block_arr'][_0xda06x86]['obj'];
        var _0xda06xa1 = getObjY(_0xda06x9f['y']);
        var _0xda06xa2 = getObjY(snk2d['y']);
        var _0xda06xa3 = (gameData['blockSpaceY'] / 2) + (_0xda06xb2 / 2);
        if (_0xda06xa2 >= (_0xda06xa1 - _0xda06xa3) && _0xda06xa2 <= (_0xda06xa1 + _0xda06xa3)) {
            if (snk2d['x'] <= _0xda06x9f['x'] - (_0xda06xb2 + (blockW / 2)) && _0xda06xb1 >= _0xda06x9f['x'] - (_0xda06xb2 + (blockW / 2))) {
                _0xda06x86 = gameData['block_arr']['length'];
                _0xda06x9e = true;
                snk2d['x'] = _0xda06x9f['x'] - (_0xda06xb2 + (blockW / 2));
                if (snk3d) {
                    gameData['distanceX'] = snk2d['x']
                }
            };
            if (snk2d['x'] >= _0xda06x9f['x'] + (_0xda06xb2 + (blockW / 2)) && _0xda06xb1 <= _0xda06x9f['x'] + (_0xda06xb2 + (blockW / 2))) {
                _0xda06x86 = gameData['block_arr']['length'];
                _0xda06x9e = true;
                snk2d['x'] = _0xda06x9f['x'] + (_0xda06xb2 + (blockW / 2));
                if (snk3d) {
                    gameData['distanceX'] = snk2d['x']
                }
            }
        }
    };
    for (var _0xda06x86 = 0; _0xda06x86 < gameData['divider_arr']['length']; _0xda06x86++) {
        var _0xda06xb3 = gameData['divider_arr'][_0xda06x86]['obj'];
        var _0xda06xb4 = getObjY(_0xda06xb3['y']);
        var _0xda06xa2 = getObjY(snk2d['y']);
        var _0xda06xa3 = (gameData['dividerHeight'] / 2) + (_0xda06xb2 / 2);
        if (_0xda06xa2 >= (_0xda06xb4 - _0xda06xa3) && _0xda06xa2 <= (_0xda06xb4 + _0xda06xa3)) {
            if (snk2d['x'] <= _0xda06xb3['x'] - (_0xda06xb2 + dividerW) && _0xda06xb1 >= _0xda06xb3['x'] - (_0xda06xb2 + dividerW)) {
                _0xda06x86 = gameData['divider_arr']['length'];
                _0xda06x9e = true;
                snk2d['x'] = _0xda06xb3['x'] - (_0xda06xb2 + dividerW);
                if (snk3d) {
                    gameData['distanceX'] = snk2d['x']
                }
            };
            if (snk2d['x'] >= _0xda06xb3['x'] + (_0xda06xb2 + dividerW) && _0xda06xb1 <= _0xda06xb3['x'] + (_0xda06xb2 + dividerW)) {
                _0xda06x86 = gameData['divider_arr']['length'];
                _0xda06x9e = true;
                snk2d['x'] = _0xda06xb3['x'] + (_0xda06xb2 + dividerW);
                if (snk3d) {
                    gameData['distanceX'] = snk2d['x']
                }
            };
            var _0xda06x9c = snk2d['x'] - _0xda06xb3['x'];
            if (Math['abs'](_0xda06x9c) < (_0xda06xb2 + dividerW)) {
                _0xda06x86 = gameData['divider_arr']['length'];
                _0xda06x9e = true;
                if (_0xda06x9c >= 0) {
                    snk2d['x'] = _0xda06xb3['x'] + (_0xda06xb2 + dividerW)
                } else {
                    snk2d['x'] = _0xda06xb3['x'] - (_0xda06xb2 + dividerW)
                };
                if (snk3d) {
                    gameData['distanceX'] = snk2d['x']
                }
            }
        }
    };
    if (!_0xda06x9e) {
        snk2d['x'] = _0xda06xb1
    }
}

function setupLevel() {
    gameData['create'] = false;
    gameData['startX'] = canvasW / 100 * 20.5;
    gameData['startY'] = canvasH / 100 * 10;
    levelData['curX'] = gameData['startX'];
    gameData['curY'] = gameData['startY'];
    gameData['blockNum'] = 0;
    shuffle(levelData['block_arr']);
    gameData['gapNum'] = 0;
    shuffle(levelData['gap_arr']);
    gameData['lineNum'] = 0;
    shuffle(levelData['divider_arr']);
    gameData['powerNum'] = 0;
    shuffle(gameData['powerType_arr']);
    gameData['gridNum'] = 0
}

function loopLevelScreen() {
    if (getObjY(gameData['gridY']) <= 1000) {
        if (gameData['create']) {
            createLevelGrid()
        }
    };
    var _0xda06xb7 = -100;
    if (gameData['powerType'][2] == 1) {
        _0xda06xb7 = 850;
        gameData['powerType'][2] = 0
    };
    var _0xda06xb8 = 0;
    var _0xda06xb9 = 10;
    for (var _0xda06xba = 0; _0xda06xba < _0xda06xb9; _0xda06xba++) {
        _0xda06xb8 = 0;
        for (var _0xda06x86 = 0; _0xda06x86 < gameData['block_arr']['length']; _0xda06x86++) {
            var _0xda06x9f = gameData['block_arr'][_0xda06x86]['obj'];
            var _0xda06xa6 = gameData['block_arr'][_0xda06x86]['text'];
            if (getObjY(_0xda06x9f['y']) <= _0xda06xb7) {
                blockContainer['removeChild'](_0xda06x9f);
                blockContainer['removeChild'](_0xda06xa6);
                gameData['block_arr']['splice'](_0xda06x86, 1);
                _0xda06xb8++
            }
        };
        for (var _0xda06x86 = 0; _0xda06x86 < gameData['divider_arr']['length']; _0xda06x86++) {
            var _0xda06xb3 = gameData['divider_arr'][_0xda06x86]['obj'];
            if (getObjY(_0xda06xb3['y']) <= _0xda06xb7) {
                blockContainer['removeChild'](_0xda06xb3);
                gameData['divider_arr']['splice'](_0xda06x86, 1);
                _0xda06xb8++
            }
        };
        for (var _0xda06x86 = 0; _0xda06x86 < gameData['power_arr']['length']; _0xda06x86++) {
            var _0xda06xa5 = gameData['power_arr'][_0xda06x86]['obj'];
            var _0xda06xa6 = gameData['power_arr'][_0xda06x86]['text'];
            if (getObjY(_0xda06xa5['y']) <= _0xda06xb7) {
                TweenMax['killTweensOf'](_0xda06xa5);
                blockContainer['removeChild'](_0xda06xa5);
                blockContainer['removeChild'](_0xda06xa6);
                gameData['power_arr']['splice'](_0xda06x86, 1);
                _0xda06xb8++
            }
        };
        if (_0xda06xb8 == 0) {
            _0xda06xba = _0xda06xb9
        }
    }
}

function createLevelGrid() {
    if (gameData['gridType'] == 0) {
        createLevelBlocks();
        gameData['gridType'] = 1
    } else {
        createLevelSpacing();
        gameData['gridType'] = 0
    };
    gameData['gridNum']++;
    gameData['gridCount']++;
    gameData['create'] = true;
    if (gameData['gridNum'] > 0) {
        playerData['score'] += scoreData['grid']
    };
    if (gameData['gridCount'] >= levelData['gridNextLevel']) {
        gameData['gridCount'] = 0;
        gameData['moveSpeed'] += levelData['moveSpeedIncrease'];
        gameData['number'] += levelData['numberIncrease']
    }
}

function createLevelBlocks() {
    var _0xda06xbd = [];
    var _0xda06xbe = [];
    var _0xda06xbf = gameData['number'];
    for (var _0xda06x86 = 0; _0xda06x86 < 5; _0xda06x86++) {
        if (_0xda06x86 == 0 && randomBoolean()) {
            _0xda06xbe['push'](Math['floor'](Math['random']() * (_0xda06xbf * 2)) + 1)
        } else {
            _0xda06xbe['push'](Math['floor'](Math['random']() * _0xda06xbf) + 1)
        };
        if (gameData['gridNum'] == 1) {
            if (_0xda06x86 < Math['floor'](Math['random']() * 3) + 1) {
                _0xda06xbd['push'](1)
            }
        } else {
            if (_0xda06x86 < levelData['block_arr'][gameData['blockNum']]) {
                _0xda06xbd['push'](1)
            } else {
                _0xda06xbd['push'](0)
            }
        }
    };
    shuffle(_0xda06xbe);
    shuffle(_0xda06xbd);
    var _0xda06xc0 = 1;
    for (var _0xda06x86 = 0; _0xda06x86 < 5; _0xda06x86++) {
        if (_0xda06xbd[_0xda06x86] == 1) {
            createBlock(levelData['curX'], gameData['curY'], Number(_0xda06xbe[_0xda06x86]))
        };
        levelData['curX'] += gameData['blockSpaceX'];
        _0xda06xc0++;
        if (_0xda06xc0 > 5) {
            _0xda06xc0 = 1;
            levelData['curX'] = gameData['startX'];
            gameData['curY'] -= gameData['blockSpaceX'];
            gameData['gridY'] = gameData['curY']
        }
    };
    gameData['blockNum']++;
    if (gameData['blockNum'] > levelData['block_arr']['length'] - 1) {
        gameData['blockNum'] = 0;
        shuffle(levelData['block_arr'])
    }
}

function createLevelSpacing() {
    var _0xda06xc2 = [];
    var _0xda06xc3 = Math['floor'](Math['random']() * levelData['gap_arr'][gameData['gapNum']]);
    for (var _0xda06x86 = 0; _0xda06x86 < 5; _0xda06x86++) {
        if (_0xda06x86 < levelData['divider_arr'][gameData['lineNum']]) {
            _0xda06xc2['push'](1)
        } else {
            _0xda06xc2['push'](0)
        }
    };
    shuffle(_0xda06xc2);
    var _0xda06xc4 = 0;
    var _0xda06xc0 = 1;
    var _0xda06x84 = 1 * levelData['gap_arr'][gameData['gapNum']];
    _0xda06x84 = _0xda06x84 * 5;
    var _0xda06xc5 = Math['floor'](Math['random']() * 3);
    var _0xda06xc6 = 0;
    var _0xda06xac = (gameData['timer']['getTime']() - gameData['powerShowTimer']['getTime']());
    if (_0xda06xac >= levelData['powerTimer']) {
        _0xda06xc6 = 1;
        resetPowerShowTimer()
    };
    if (gameData['gridNum'] == 0) {
        _0xda06xc5 = 2
    };
    var _0xda06xc7 = _0xda06xc5 + _0xda06xc6;
    var _0xda06xc8 = [];
    var _0xda06xc9 = 0;
    for (var _0xda06x86 = 0; _0xda06x86 < _0xda06xc7; _0xda06x86++) {
        if (_0xda06x86 < _0xda06xc5) {
            _0xda06xc8['push'](0)
        } else {
            _0xda06xc8['push'](gameData['powerType_arr'][gameData['powerNum']]);
            gameData['powerNum']++
        }
    };
    var _0xda06xca = [];
    for (var _0xda06x86 = 0; _0xda06x86 < _0xda06x84; _0xda06x86++) {
        _0xda06xca['push'](_0xda06x86)
    };
    shuffle(_0xda06xca);
    _0xda06xca['splice'](_0xda06xc7, _0xda06xca['length'] - _0xda06xc7);
    _0xda06xca['sort'](sortNumber);
    for (var _0xda06x86 = 0; _0xda06x86 < _0xda06x84; _0xda06x86++) {
        if (_0xda06xc2[_0xda06xc0 - 1] == 1 && _0xda06xc4 >= 1) {
            createDivider(levelData['curX'], gameData['curY'])
        } else {
            if (randomBoolean() && _0xda06xc3 > 0 && _0xda06xc4 >= 1) {
                _0xda06xc3--;
                createDivider(levelData['curX'], gameData['curY'])
            }
        };
        if (_0xda06x86 == Number(_0xda06xca[_0xda06xc9])) {
            var _0xda06xcb = Math['floor'](Math['random']() * (levelData['number'] / 2)) + 1;
            createPower(levelData['curX'], gameData['curY'], _0xda06xc8[_0xda06xc9], _0xda06xcb);
            _0xda06xc9++
        };
        levelData['curX'] += gameData['blockSpaceX'];
        _0xda06xc0++;
        if (_0xda06xc0 > 5) {
            _0xda06xc0 = 1;
            levelData['curX'] = gameData['startX'];
            gameData['curY'] -= gameData['blockSpaceX'];
            gameData['gridY'] = gameData['curY'];
            _0xda06xc4++
        }
    };
    gameData['lineNum']++;
    if (gameData['lineNum'] > levelData['divider_arr']['length'] - 1) {
        gameData['lineNum'] = 0;
        shuffle(levelData['divider_arr'])
    };
    if (gameData['powerNum'] > gameData['powerType_arr']['length'] - 1) {
        console['log']('shuffle');
        gameData['powerNum'] = 0;
        shuffle(gameData['powerType_arr'])
    };
    gameData['gapNum']++;
    if (gameData['gapNum'] > levelData['gap_arr']['length'] - 1) {
        gameData['gapNum'] = 0;
        shuffle(levelData['gap_arr'])
    }
}

function getObjY(_0xda06xcd) {
    return canvasH - (shapeOffset['y'] + _0xda06xcd)
}

function toggleGameMute(snk3d) {
    buttonSoundOff['visible'] = false;
    buttonSoundOn['visible'] = false;
    toggleMute(snk3d);
    if (snk3d) {
        buttonSoundOn['visible'] = true
    } else {
        buttonSoundOff['visible'] = true
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

function share(_0xda06xd1) {
    var _0xda06xd2 = location['href'];
    _0xda06xd2 = _0xda06xd2['substring'](0, _0xda06xd2['lastIndexOf']('/') + 1);
    var _0xda06xd3 = '';
    var _0xda06xd4 = '';
    _0xda06xd3 = shareTitle['replace']('[SCORE]', playerData['score']);
    _0xda06xd4 = shareMessage['replace']('[SCORE]', playerData['score']);
    var _0xda06xd5 = '';
    if (_0xda06xd1 == 'twitter') {
        _0xda06xd5 = 'https://twitter.com/intent/tweet?url=' + _0xda06xd2 + '&text=' + _0xda06xd4
    } else {
        if (_0xda06xd1 == 'facebook') {
            _0xda06xd5 = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(_0xda06xd2 + 'share.php?desc=' + _0xda06xd4 + '&title=' + _0xda06xd3 + '&url=' + _0xda06xd2 + '&thumb=' + _0xda06xd2 + 'share.jpg&width=590&height=300')
        } else {
            if (_0xda06xd1 == 'google') {
                _0xda06xd5 = 'https://plus.google.com/share?url=' + _0xda06xd2
            }
        }
    };
    window['open'](_0xda06xd5)
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
        buildScoreBoardCanvas();
    }
    setupTouchEvents();
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
        var _0xda06xdf = !!navigator['userAgent']['match'](/Version\/[\d\.]+.*Safari/);
        var snk60 = 0;
        windowW = $(window)['width']();
        windowH = $(window)['height']();
        if (_0xda06xdf) {
            windowW = window['innerWidth'];
            windowH = window['innerHeight'];
            snk60 = $(window)['height']() - window['innerHeight']
        };
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
        var snk61 = (stageW * scalePercent);
        var snk62 = (stageH * scalePercent);
        offset['left'] = 0;
        offset['top'] = 0;
        if (snk61 > windowW) {
            offset['left'] = -((snk61) - windowW)
        } else {
            offset['left'] = windowW - (snk61)
        };
        if (snk62 > windowH) {
            offset['top'] = -((snk62) - windowH)
        } else {
            offset['top'] = windowH - (snk62)
        };
        offset['x'] = 0;
        offset['y'] = 0;
        if (offset['left'] < 0) {
            offset['x'] = Math['abs']((offset['left'] / scalePercent) / 2)
        };
        if (offset['top'] < 0) {
            offset['y'] = Math['abs']((offset['top'] / scalePercent) / 2)
        };
        $('canvas')['css']('width', snk61);
        $('canvas')['css']('height', snk62);
        $('canvas')['css']('left', (offset['left'] / 2));
        $('canvas')['css']('top', (offset['top'] / 2));
        if (_0xda06xdf) {
            $(window)['scrollTop'](1000)
        };
        resizeCanvas()
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
        $(window)['off']('orientationchange')['on']('orientationchange', function (snk5d) {
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
    var snk67 = window['orientation'];
    var snk68 = false;
    if (window['innerWidth'] > window['innerHeight']) {
        snk68 = true
    };
    var snk69 = false;
    if (!snk68) {
        if (forPortrait) {
            snk69 = true
        }
    } else {
        if (!forPortrait) {
            snk69 = true
        }
    };
    if (!snk69) {
        toggleRotate(true)
    } else {
        toggleRotate(false);
        $('#canvasHolder')['show']()
    }
}

function toggleRotate(snk3d) {
    if (snk3d) {
        $('#rotateHolder')['fadeIn']()
    } else {
        $('#rotateHolder')['fadeOut']()
    }
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
        src: 'assets/background_white.png',
        id: 'backgroundWhite'
    }, {
        src: 'assets/logo.png',
        id: 'logo'
    }, {
        src: 'assets/button_start.png',
        id: 'buttonStart'
    }, {
        src: 'assets/side_line.png',
        id: 'itemSide'
    }, {
        src: 'assets/item_head.png',
        id: 'itemHead'
    }, {
        src: 'assets/item_head_hit.png',
        id: 'itemHeadHit'
    }, {
        src: 'assets/item_tail1.png',
        id: 'itemTail1'
    }, {
        src: 'assets/item_tail2.png',
        id: 'itemTail2'
    }, {
        src: 'assets/item_tail3.png',
        id: 'itemTail3'
    }, {
        src: 'assets/item_block1.png',
        id: 'itemBlock1'
    }, {
        src: 'assets/item_block2.png',
        id: 'itemBlock2'
    }, {
        src: 'assets/item_block3.png',
        id: 'itemBlock3'
    }, {
        src: 'assets/item_block_white.png',
        id: 'itemBlockWhite'
    }, {
        src: 'assets/item_divider.png',
        id: 'itemDivider'
    }, {
        src: 'assets/item_power_shield.png',
        id: 'itemPowerShield'
    }, {
        src: 'assets/item_power_magnet.png',
        id: 'itemPowerMagnet'
    }, {
        src: 'assets/icon_shield.png',
        id: 'iconShield'
    }, {
        src: 'assets/icon_tail.png',
        id: 'iconTail'
    }, {
        src: 'assets/icon_explode.png',
        id: 'iconExplode'
    }, {
        src: 'assets/icon_magnet.png',
        id: 'iconMagnet'
    }, {
        src: 'assets/gradient.png',
        id: 'gradient'
    }, {
        src: 'assets/button_replay.png',
        id: 'buttonReplay'
    }, {
        src: 'assets/button_facebook.png',
        id: 'buttonFacebook'
    }, {
        src: 'assets/button_twitter.png',
        id: 'buttonTwitter'
    }, {
        src: 'assets/button_google.png',
        id: 'buttonGoogle'
    }, {
        src: 'assets/button_fullscreen.png',
        id: 'buttonFullscreen'
    }, {
        src: 'assets/button_sound_on.png',
        id: 'buttonSoundOn'
    }, {
        src: 'assets/button_sound_off.png',
        id: 'buttonSoundOff'
    }];
    soundOn = true;
    if ($['browser']['mobile'] || isTablet) {
        if (!enableMobileSound) {
            soundOn = false
        }
    };
    if (soundOn) {
        manifest['push']({
            src: 'assets/sounds/music.ogg',
            id: 'musicMain'
        });
        manifest['push']({
            src: 'assets/sounds/clear.ogg',
            id: 'soundClear'
        });
        manifest['push']({
            src: 'assets/sounds/hit.ogg',
            id: 'soundHit'
        });
        manifest['push']({
            src: 'assets/sounds/coin.ogg',
            id: 'soundCoin'
        });
        manifest['push']({
            src: 'assets/sounds/power.ogg',
            id: 'soundPower'
        });
        manifest['push']({
            src: 'assets/sounds/fail.ogg',
            id: 'soundFail'
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

function fileComplete(_0xda06x73) {
    var snk6d = _0xda06x73['item']
}

function handleFileError(_0xda06x73) {
    console['log']('error ', _0xda06x73)
}

function handleProgress() {
    $('#mainLoader span')['html'](Math['round'](loader['progress'] / 1 * 100) + '%')
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(snk3d) {
    if (snk3d) {
        $('#mainLoader')['show']()
    } else {
        $('#mainLoader')['hide']()
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var snk73 = function () {
        try {
            if (createjs['WebAudioPlugin']['context']['state'] === 'suspended') {
                createjs['WebAudioPlugin']['context']['resume']();
                window['removeEventListener']('click', snk73)
            }
        } catch (e) {
            console['error']('There was an error while trying to resume the SoundJS Web Audio context...');
            console['error'](e)
        }
    };
    window['addEventListener']('click', snk73);
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
    var snk78 = document['createElement']('canvas');
    if (snk78['getContext']) {
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