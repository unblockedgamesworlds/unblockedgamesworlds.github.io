var canvas, ctx, w, h, world;
var scaleX = 50,
    scaleY = -50;
var holder_arr;
var physicsData = {
    paused: true
};

function initPhysics() {
    world = new p2.World({
        gravity: [0, -10]
    })
}
var ballPhysics_arr = [];
var hitPhysics_arr = [];

function createPhysics() {
    var pwLottere = new p2.Material();
    var pwLotterf = new p2.Material();
    for (var pwLotter10 = 0; pwLotter10 < gameData['ballsArray']['length']; pwLotter10++) {
        ballPhysics_arr['push']({
            shape: '',
            body: '',
            material: '',
            property: {
                radius: (ballRadius / scaleX) / 2
            },
            position: [0, 0]
        });
        ballPhysics_arr[pwLotter10]['shape'] = new p2.Circle(ballPhysics_arr[pwLotter10]['property']);
        ballPhysics_arr[pwLotter10]['material'] = pwLottere;
        ballPhysics_arr[pwLotter10]['shape']['material'] = ballPhysics_arr[pwLotter10]['material'];
        ballPhysics_arr[pwLotter10]['body'] = new p2.Body({
            mass: 1,
            position: ballPhysics_arr[pwLotter10]['position']
        });
        ballPhysics_arr[pwLotter10]['body']['addShape'](ballPhysics_arr[pwLotter10]['shape']);
        ballPhysics_arr[pwLotter10]['body']['position'][0] = ((gameData['ballsArray'][pwLotter10]['obj']['x']) - (canvasW / 2)) / scaleX;
        ballPhysics_arr[pwLotter10]['body']['position'][1] = ((gameData['ballsArray'][pwLotter10]['obj']['y']) - canvasH) / scaleY;
        ballPhysics_arr[pwLotter10]['body']['contactType'] = 'ball';
        ballPhysics_arr[pwLotter10]['body']['velocityTimer'] = 0;
        ballPhysics_arr[pwLotter10]['body']['index'] = pwLotter10;
        resetBallTimer(ballPhysics_arr[pwLotter10]['body']);
        world['addBody'](ballPhysics_arr[pwLotter10]['body'])
    };
    for (var pwLotter10 = 0; pwLotter10 < gameData['cageArray']['length']; pwLotter10++) {
        hitPhysics_arr['push']({
            shape: '',
            body: '',
            material: '',
            property: {
                radius: (10 / scaleX) / 2
            },
            position: [0, 0]
        });
        hitPhysics_arr[pwLotter10]['shape'] = new p2.Circle(hitPhysics_arr[pwLotter10]['property']);
        hitPhysics_arr[pwLotter10]['material'] = pwLotterf;
        hitPhysics_arr[pwLotter10]['shape']['material'] = hitPhysics_arr[pwLotter10]['material'];
        hitPhysics_arr[pwLotter10]['body'] = new p2.Body({
            mass: 0,
            position: hitPhysics_arr[pwLotter10]['position']
        });
        hitPhysics_arr[pwLotter10]['body']['addShape'](hitPhysics_arr[pwLotter10]['shape']);
        hitPhysics_arr[pwLotter10]['body']['position'][0] = ((gameData['cageArray'][pwLotter10]['x']) - (canvasW / 2)) / scaleX;
        hitPhysics_arr[pwLotter10]['body']['position'][1] = ((gameData['cageArray'][pwLotter10]['y']) - canvasH) / scaleY;
        hitPhysics_arr[pwLotter10]['body']['contactType'] = 'cage';
        world['addBody'](hitPhysics_arr[pwLotter10]['body'])
    };
    holder_arr = [{
        shape: '',
        body: '',
        property: {
            width: 1.3,
            height: 1
        },
        position: [0, 0]
    }];
    for (var pwLotter10 = 0; pwLotter10 < holder_arr['length']; pwLotter10++) {
        holder_arr[pwLotter10]['shape'] = new p2.Box(holder_arr[pwLotter10]['property']);
        holder_arr[pwLotter10]['body'] = new p2.Body({
            mass: 0,
            position: holder_arr[pwLotter10]['position']
        });
        holder_arr[pwLotter10]['body']['position'][0] = ((gameData['sphereX']) - (canvasW / 2)) / scaleX;
        holder_arr[pwLotter10]['body']['position'][1] = ((gameData['sphereY'] + 200) - canvasH) / scaleY;
        holder_arr[pwLotter10]['body']['addShape'](holder_arr[pwLotter10]['shape']);
        holder_arr[pwLotter10]['body']['contactType'] = 'cage';
        world['addBody'](holder_arr[pwLotter10]['body'])
    };
    world['on']('beginContact', function (pwLotter11) {
        if (pwLotter11['bodyA']['contactType'] == 'ball' && pwLotter11['bodyB']['contactType'] == 'cage') {
            setBallVelocity(pwLotter11['bodyA'])
        } else {
            if (pwLotter11['bodyA']['contactType'] == 'cage' && pwLotter11['bodyB']['contactType'] == 'ball') {
                setBallVelocity(pwLotter11['bodyB'])
            }
        }
    });
    world['on']('preSolve', function (pwLotter11) {
        for (var pwLotter12 = 0; pwLotter12 < pwLotter11['contactEquations']['length']; pwLotter12++) {
            var pwLotter13 = pwLotter11['contactEquations'][pwLotter12];
            pwLotter13['enabled'] = checkCollision(pwLotter13);
            if (pwLotter13['bodyA']['contactType'] == 'ball' && pwLotter13['bodyB']['contactType'] == 'cage') {
                setBallVelocity(pwLotter13['bodyA'])
            } else {
                if (pwLotter13['bodyA']['contactType'] == 'cage' && pwLotter13['bodyB']['contactType'] == 'ball') {
                    setBallVelocity(pwLotter13['bodyB'])
                }
            }
        };
        for (var pwLotter12 = 0; pwLotter12 < pwLotter11['frictionEquations']['length']; pwLotter12++) {
            var pwLotter13 = pwLotter11['frictionEquations'][pwLotter12];
            pwLotter13['enabled'] = checkCollision(pwLotter13);
            if (pwLotter13['bodyA']['contactType'] == 'ball' && pwLotter13['bodyB']['contactType'] == 'cage') {
                setBallVelocity(pwLotter13['bodyA'])
            } else {
                if (pwLotter13['bodyA']['contactType'] == 'cage' && pwLotter13['bodyB']['contactType'] == 'ball') {
                    setBallVelocity(pwLotter13['bodyB'])
                }
            }
        }
    });
    world['on']('endContact', function (pwLotter11) {})
}

function checkCollision(pwLotter13) {
    var pwLotter15 = true;
    if ((pwLotter13['bodyA']['contactType'] === 'ball' && pwLotter13['bodyB']['contactType'] === 'cage' && gameData['winArray']['indexOf'](pwLotter13['bodyA']['index']) != -1)) {
        pwLotter15 = false
    } else {
        if ((pwLotter13['bodyA']['contactType'] === 'ball' && pwLotter13['bodyB']['contactType'] === 'cage' && gameData['winArray']['indexOf'](pwLotter13['bodyA']['index']) != -1)) {
            pwLotter15 = false
        } else {
            if ((pwLotter13['bodyA']['contactType'] === 'cage' && pwLotter13['bodyB']['contactType'] === 'ball' && gameData['winArray']['indexOf'](pwLotter13['bodyB']['index']) != -1)) {
                pwLotter15 = false
            } else {
                if ((pwLotter13['bodyA']['contactType'] === 'ball' && pwLotter13['bodyB']['contactType'] === 'ball')) {
                    pwLotter15 = false
                }
            }
        }
    };
    return pwLotter15
}

function renderPhysics() {
    for (var pwLotter10 = 0; pwLotter10 < ballPhysics_arr['length']; pwLotter10++) {
        if (gameData['winArray']['indexOf'](pwLotter10) != -1) {
            ballPhysics_arr[pwLotter10]['body']['velocity'][0] = 0;
            ballPhysics_arr[pwLotter10]['body']['velocity'][1] = 0
        } else {
            ballPhysics_arr[pwLotter10]['body']['velocityTimer']--;
            var pwLotter17 = ballPhysics_arr[pwLotter10]['body']['position'][0],
                pwLotter18 = ballPhysics_arr[pwLotter10]['body']['position'][1];
            var pwLotter19 = gameData['ballsArray'][pwLotter10]['obj'];
            pwLotter19['x'] = (canvasW / 2) + (pwLotter17 * scaleX);
            pwLotter19['y'] = canvasH + (pwLotter18 * scaleY);
            pwLotter19['rotation'] = (ballPhysics_arr[pwLotter10]['body']['angle']) * 180 / Math['PI']
        };
        updateBallRotate(pwLotter10, ballPhysics_arr[pwLotter10]['body']['velocity'][0], ballPhysics_arr[pwLotter10]['body']['velocity'][1], ballPhysics_arr[pwLotter10]['body']['angle'])
    };
    for (var pwLotter10 = 0; pwLotter10 < hitPhysics_arr['length']; pwLotter10++) {
        var pwLotter1a = gameData['cageArray'][pwLotter10];
        hitPhysics_arr[pwLotter10]['body']['position'][0] = ((pwLotter1a['x']) - (canvasW / 2)) / scaleX;
        hitPhysics_arr[pwLotter10]['body']['position'][1] = ((pwLotter1a['y']) - canvasH) / scaleY
    }
}

function resetBallTimer(pwLotter1c) {
    pwLotter1c['velocityTimer'] = randomIntFromInterval(30, 100)
}

function resetBallsTimer() {
    for (var pwLotter10 = 0; pwLotter10 < ballPhysics_arr['length']; pwLotter10++) {
        ballPhysics_arr[pwLotter10]['body']['position'][0] = ((gameData['ballsArray'][pwLotter10]['obj']['x']) - (canvasW / 2)) / scaleX;
        ballPhysics_arr[pwLotter10]['body']['position'][1] = ((gameData['ballsArray'][pwLotter10]['obj']['y']) - canvasH) / scaleY;
        resetBallTimer(ballPhysics_arr[pwLotter10]['body'])
    }
}

function setBallVelocity(pwLotter1c) {
    if (gameData['winArray']['indexOf'](pwLotter1c['index']) != -1) {
        return
    };
    if (pwLotter1c['velocityTimer'] < 0) {
        var pwLotter1f = 0;
        var pwLotter20 = 0;
        if (radiusTweenData['radius'] < 3) {
            pwLotter1f = randomIntFromInterval(-3, 3);
            pwLotter20 = randomIntFromInterval(2, 5)
        } else {
            if (radiusTweenData['radius'] < 8) {
                pwLotter1f = randomIntFromInterval(-3, 5);
                pwLotter20 = randomIntFromInterval(5, 10)
            } else {
                pwLotter1f = randomIntFromInterval(-3, 10);
                pwLotter20 = randomIntFromInterval(10, 20)
            }
        };
        pwLotter1c['velocity'][0] += pwLotter1f;
        pwLotter1c['velocity'][1] += pwLotter20;
        resetBallTimer(pwLotter1c)
    }
}

function updatePhysics() {
    world['step'](1 / 60);
    renderPhysics()
}(function () {
    var pwLotter22;
    var pwLotter23 = function () {};
    var pwLotter24 = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var pwLotter25 = pwLotter24['length'];
    var pwLotter26 = (window['console'] = window['console'] || {});
    while (pwLotter25--) {
        pwLotter22 = pwLotter24[pwLotter25];
        if (!pwLotter26[pwLotter22]) {
            pwLotter26[pwLotter22] = pwLotter23
        }
    }
}());

function checkContentHeight(pwLotter28) {
    var stageHeight = $(window)['height']();
    var pwLotter2a = (stageHeight / 2) - (pwLotter28['height']() / 2);
    return pwLotter2a
}

function checkContentWidth(pwLotter28) {
    var stageWidth = $(window)['width']();
    var pwLotter2d = (stageWidth / 2) - (pwLotter28['width']() / 2);
    return pwLotter2d
}

function getDeviceVer() {
    var pwLotter2f = navigator['userAgent'];
    var pwLotter30;
    if (pwLotter2f['match'](/(iPad|iPhone|iPod touch)/)) {
        userOS = 'iOS';
        pwLotter30 = pwLotter2f['indexOf']('OS ')
    } else {
        if (pwLotter2f['match'](/Android/)) {
            userOS = 'Android';
            pwLotter30 = pwLotter2f['indexOf']('Android ')
        } else {
            userOS = 'unknown'
        }
    };
    if (userOS === 'iOS' && pwLotter30 > -1) {
        userOSver = pwLotter2f['substr'](pwLotter30 + 3, 3)['replace']('_', '.')
    } else {
        if (userOS === 'Android' && pwLotter30 > -1) {
            userOSver = pwLotter2f['substr'](pwLotter30 + 8, 3)
        } else {
            userOSver = 'unknown'
        }
    };
    return Number(userOSver)
}

function shuffle(pwLotter32) {
    var pwLotter33 = pwLotter32['length'],
        pwLotter34, pwLotter35;
    while (0 !== pwLotter33) {
        pwLotter35 = Math['floor'](Math['random']() * pwLotter33);
        pwLotter33 -= 1;
        pwLotter34 = pwLotter32[pwLotter33];
        pwLotter32[pwLotter33] = pwLotter32[pwLotter35];
        pwLotter32[pwLotter35] = pwLotter34
    };
    return pwLotter32
}

function randomBoolean() {
    return Math['random']() < 0.5
}

function sortOnObject(pwLotter32, pwLotter38, pwLotter39) {
    if (pwLotter39) {
        pwLotter32['sort'](function (pwLotter3a, pwLotter3b) {
            var pwLotter3c = pwLotter3a[pwLotter38],
                pwLotter3d = pwLotter3b[pwLotter38];
            if (pwLotter3c == pwLotter3d) {
                return 0
            };
            return pwLotter3c < pwLotter3d ? 1 : -1
        })
    } else {
        pwLotter32['sort'](function (pwLotter3a, pwLotter3b) {
            var pwLotter3c = pwLotter3a[pwLotter38],
                pwLotter3d = pwLotter3b[pwLotter38];
            if (pwLotter3c == pwLotter3d) {
                return 0
            };
            return pwLotter3c > pwLotter3d ? 1 : -1
        })
    };
    return pwLotter32
}

function randomIntFromInterval(pw11, pw11) {
    return Math['floor'](Math['random']() * (pw11 - pw11 + 1) + pw11)
}

function isEven(pw9) {
    return !(pw9 % 2)
}

function getDistance(pw6, pw7) {
    var pw5 = pw6['x'] - pw7['x'];
    var pw8 = pw6['y'] - pw7['y'];
    var pw10 = Math['floor'](Math['sqrt']((pw5 * pw5) + (pw8 * pw8)));
    return pw10
}

function getDistanceByValue(pw1, pw2, pw3, pw4) {
    var pw5 = pw1 - pw3;
    var pw8 = pw2 - pw4;
    var pw10 = Math['floor'](Math['sqrt']((pw5 * pw5) + (pw8 * pw8)));
    return pw10
}

function addCommas(pwLotter4f) {
    pwLotter4f += '';
    x = pwLotter4f['split']('.');
    x1 = x[0];
    x2 = x['length'] > 1 ? '.' + x[1] : '';
    var pwLotter50 = /(\d+)(\d{3})/;
    while (pwLotter50['test'](x1)) {
        x1 = x1['replace'](pwLotter50, '$1' + ',' + '$2')
    };
    return x1 + x2
}

function unique(pwLotter52) {
    var pwLotter53 = [];
    $['each'](pwLotter52, function (pwLotter12, pwLotter54) {
        if ($['inArray'](pwLotter54, pwLotter53) == -1) {
            pwLotter53['push'](pwLotter54)
        }
    });
    return pwLotter53
}

function getCenterPosition(pwLotter56, pwLotter57, pwLotter58, pwLotter59) {
    var pwLotter5a = {
        x: 0,
        y: 0
    };
    pwLotter5a['x'] = (pwLotter56 + pwLotter58) / 2;
    pwLotter5a['y'] = (pwLotter57 + pwLotter59) / 2;
    return pwLotter5a
}

function getAnglePosition(pwLotter5c, pwLotter5d, pwLotter5e) {
    var pwLotter5a = {
        x: 0,
        y: 0
    };
    pwLotter5a['x'] = pwLotter5c['x'] + pwLotter5d * Math['cos'](pwLotter5e * Math['PI'] / 180);
    pwLotter5a['y'] = pwLotter5c['y'] + pwLotter5d * Math['sin'](pwLotter5e * Math['PI'] / 180);
    return pwLotter5a
}

function getAnglePositionByValue(pwLotter17, pwLotter18, pwLotter5d, pwLotter5e) {
    var pwLotter5a = {
        x: 0,
        y: 0
    };
    pwLotter5a['x'] = pwLotter17 + pwLotter5d * Math['cos'](pwLotter5e * Math['PI'] / 180);
    pwLotter5a['y'] = pwLotter18 + pwLotter5d * Math['sin'](pwLotter5e * Math['PI'] / 180);
    return pwLotter5a
}

function getDirection(pw1, pw2, pw3, pw4) {
    var pwLotter61 = 180 / Math['PI'];
    var pwLotter62 = -(Math['atan2'](pw3 - pw1, pw4 - pw2)) * pwLotter61;
    return pwLotter62 + 180
}

function pad(pwLotter64, pw11) {
    pwLotter64 = pwLotter64.toString();
    return pwLotter64['length'] < pw11 ? pad('0' + pwLotter64, pw11) : pwLotter64
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

function playSound(pwLotter6f, pwLotter70) {
    if (soundOn) {
        var pwLotter71 = soundID;
        soundPushArr['push'](pwLotter71);
        soundID++;
        var pwLotter72 = pwLotter70 == undefined ? 1 : pwLotter70;
        $['sound'][pwLotter71] = createjs['Sound']['play'](pwLotter6f);
        $['sound'][pwLotter71]['defaultVol'] = pwLotter72;
        setSoundVolume(pwLotter71);
        $['sound'][pwLotter71]['removeAllEventListeners']();
        $['sound'][pwLotter71]['addEventListener']('complete', function () {
            var pwLotter73 = soundPushArr['indexOf'](pwLotter71);
            if (pwLotter73 != -1) {
                soundPushArr['splice'](pwLotter73, 1)
            }
        })
    }
}

function playSoundLoop(pwLotter6f) {
    if (soundOn) {
        if ($['sound'][pwLotter6f] == null) {
            soundLoopPushArr['push'](pwLotter6f);
            $['sound'][pwLotter6f] = createjs['Sound']['play'](pwLotter6f);
            $['sound'][pwLotter6f]['defaultVol'] = 1;
            setSoundLoopVolume(pwLotter6f);
            $['sound'][pwLotter6f]['removeAllEventListeners']();
            $['sound'][pwLotter6f]['addEventListener']('complete', function () {
                $['sound'][pwLotter6f]['play']()
            })
        }
    }
}

function toggleSoundLoop(pwLotter6f, pwLotter76) {
    if (soundOn) {
        if ($['sound'][pwLotter6f] != null) {
            if (pwLotter76) {
                $['sound'][pwLotter6f]['play']()
            } else {
                $['sound'][pwLotter6f]['paused'] = true
            }
        }
    }
}

function stopSoundLoop(pwLotter6f) {
    if (soundOn) {
        if ($['sound'][pwLotter6f] != null) {
            $['sound'][pwLotter6f]['stop']();
            $['sound'][pwLotter6f] = null;
            var pwLotter78 = soundLoopPushArr['indexOf'](pwLotter6f);
            if (pwLotter78 != -1) {
                soundLoopPushArr['splice'](pwLotter78, 1)
            }
        }
    }
}

function playMusicLoop(pwLotter6f) {
    if (soundOn) {
        if ($['sound'][pwLotter6f] == null) {
            musicPushArr['push'](pwLotter6f);
            $['sound'][pwLotter6f] = createjs['Sound']['play'](pwLotter6f);
            $['sound'][pwLotter6f]['defaultVol'] = 1;
            setMusicVolume(pwLotter6f);
            $['sound'][pwLotter6f]['removeAllEventListeners']();
            $['sound'][pwLotter6f]['addEventListener']('complete', function () {
                $['sound'][pwLotter6f]['play']()
            })
        }
    }
}

function toggleMusicLoop(pwLotter6f, pwLotter76) {
    if (soundOn) {
        if ($['sound'][pwLotter6f] != null) {
            if (pwLotter76) {
                $['sound'][pwLotter6f]['play']()
            } else {
                $['sound'][pwLotter6f]['paused'] = true
            }
        }
    }
}

function stopMusicLoop(pwLotter6f) {
    if (soundOn) {
        if ($['sound'][pwLotter6f] != null) {
            $['sound'][pwLotter6f]['stop']();
            $['sound'][pwLotter6f] = null;
            var pwLotter78 = musicPushArr['indexOf'](pwLotter6f);
            if (pwLotter78 != -1) {
                musicPushArr['splice'](pwLotter78, 1)
            }
        }
    }
}

function stopSound() {
    createjs['Sound']['stop']()
}

function toggleSoundInMute(pwLotter76) {
    if (soundOn) {
        soundMute = pwLotter76;
        for (var pwLotter10 = 0; pwLotter10 < soundPushArr['length']; pwLotter10++) {
            setSoundVolume(soundPushArr[pwLotter10])
        };
        for (var pwLotter10 = 0; pwLotter10 < soundLoopPushArr['length']; pwLotter10++) {
            setSoundLoopVolume(soundLoopPushArr[pwLotter10])
        };
        setAudioVolume()
    }
}

function toggleMusicInMute(pwLotter76) {
    if (soundOn) {
        musicMute = pwLotter76;
        for (var pwLotter10 = 0; pwLotter10 < musicPushArr['length']; pwLotter10++) {
            setMusicVolume(musicPushArr[pwLotter10])
        }
    }
}

function setSoundVolume(pwLotter80, pwLotter70) {
    if (soundOn) {
        var pwLotter81 = soundPushArr['indexOf'](pwLotter80);
        if (pwLotter81 != -1) {
            var pwLotter72 = pwLotter70 == undefined ? $['sound'][soundPushArr[pwLotter81]]['defaultVol'] : pwLotter70;
            var pwLotter82 = soundMute == false ? pwLotter72 : 0;
            $['sound'][soundPushArr[pwLotter81]]['volume'] = pwLotter82;
            $['sound'][soundPushArr[pwLotter81]]['defaultVol'] = pwLotter72
        }
    }
}

function setSoundLoopVolume(pwLotter84, pwLotter70) {
    if (soundOn) {
        var pwLotter78 = soundLoopPushArr['indexOf'](pwLotter84);
        if (pwLotter78 != -1) {
            var pwLotter72 = pwLotter70 == undefined ? $['sound'][soundLoopPushArr[pwLotter78]]['defaultVol'] : pwLotter70;
            var pwLotter82 = soundMute == false ? pwLotter72 : 0;
            $['sound'][soundLoopPushArr[pwLotter78]]['volume'] = pwLotter82;
            $['sound'][soundLoopPushArr[pwLotter78]]['defaultVol'] = pwLotter72
        }
    }
}

function setMusicVolume(pwLotter84, pwLotter70) {
    if (soundOn) {
        var pwLotter86 = musicPushArr['indexOf'](pwLotter84);
        if (pwLotter86 != -1) {
            var pwLotter72 = pwLotter70 == undefined ? $['sound'][musicPushArr[pwLotter86]]['defaultVol'] : pwLotter70;
            var pwLotter82 = musicMute == false ? pwLotter72 : 0;
            $['sound'][musicPushArr[pwLotter86]]['volume'] = pwLotter82;
            $['sound'][musicPushArr[pwLotter86]]['defaultVol'] = pwLotter72
        }
    }
}
var audioFile = null;

function playAudio(pwLotter89, pwLotter8a) {
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs['Sound']['play'](pwLotter89);
            setAudioVolume();
            audioFile['removeAllEventListeners']();
            audioFile['addEventListener']('complete', function (pwLotter8b) {
                audioFile = null;
                if (typeof pwLotter8a == 'function') {
                    pwLotter8a()
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
            var pwLotter82 = soundMute == false ? 1 : 0;
            audioFile['volume'] = pwLotter82
        }
    }
}
var stage;
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(w, h) {
    var pwLotter92 = document['getElementById']('gameCanvas');
    pwLotter92['width'] = w;
    pwLotter92['height'] = h;
    canvasW = w;
    canvasH = h;
    stage = new createjs.Stage('gameCanvas');
    createjs['Touch']['enable'](stage);
    stage['enableMouseOver'](20);
    stage['mouseMoveOutside'] = true;
    createjs['Ticker']['framerate'] = 60;
    createjs['Ticker']['addEventListener']('tick', tick)
}
var guide = false;
var canvasContainer, mainContainer, gameContainer, confirmContainer, resultContainer;
var guideline, bg, logo, buttonStart, buttonContinue, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;
$['prize'] = {};

function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    ballsContainer = new createjs.Container();
    ballsRevealContainer = new createjs.Container();
    ballsSelectContainer = new createjs.Container();
    cardContainer = new createjs.Container();
    tableContainer = new createjs.Container();
    confirmContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    starContainer = new createjs.Container();
    bg = new createjs.Bitmap(loader['getResult']('background'));
    logo = new createjs.Bitmap(loader['getResult']('logo'));
    buttonStart = new createjs.Bitmap(loader['getResult']('buttonStart'));
    centerReg(buttonStart);
    buttonStart['x'] = canvasW / 2;
    buttonStart['y'] = canvasH / 100 * 77;
    itemBall = new createjs.Bitmap(loader['getResult']('itemBall'));
    centerReg(itemBall);
    itemBall['x'] = -500;
    itemBallBg = new createjs.Bitmap(loader['getResult']('itemBallBg'));
    itemBallBg['x'] = -500;
    itemBallShadow = new createjs.Bitmap(loader['getResult']('itemBallShadow'));
    centerReg(itemBallShadow);
    itemBallShadow['x'] = -500;
    itemBallDim = new createjs.Bitmap(loader['getResult']('itemBallDim'));
    centerReg(itemBallDim);
    itemBallDim['x'] = -500;
    itemBallGuess = new createjs.Bitmap(loader['getResult']('itemBallGuess'));
    centerReg(itemBallGuess);
    itemBallGuess['x'] = -500;
    itemBallBonus = new createjs.Bitmap(loader['getResult']('itemBallBonus'));
    centerReg(itemBallBonus);
    itemBallBonus['x'] = -500;
    itemBallHit = new createjs.Bitmap(loader['getResult']('itemBallHit'));
    centerReg(itemBallHit);
    itemBallHit['x'] = -500;
    itemSphere = new createjs.Bitmap(loader['getResult']('itemSphere'));
    centerReg(itemSphere);
    itemStick = new createjs.Bitmap(loader['getResult']('itemStick'));
    centerReg(itemStick);
    itemShine = new createjs.Bitmap(loader['getResult']('itemShine'));
    centerReg(itemShine);
    itemSphere['x'] = gameData['sphereX'];
    itemSphere['y'] = gameData['sphereY'] + 25;
    itemStick['x'] = gameData['sphereX'];
    itemStick['y'] = gameData['sphereY'];
    itemShine['x'] = gameData['sphereX'];
    itemShine['y'] = gameData['sphereY'];
    itemBar = new createjs.Bitmap(loader['getResult']('itemBar'));
    centerReg(itemBar);
    itemBar['x'] = gameData['sphereX'];
    itemBar['y'] = canvasH / 100 * 81;
    itemBarBonus = new createjs.Bitmap(loader['getResult']('itemBarBonus'));
    centerReg(itemBarBonus);
    itemBarBonus['x'] = gameData['sphereX'];
    itemBarBonus['y'] = canvasH / 100 * 81;
    buttonSphereStart = new createjs.Bitmap(loader['getResult']('buttonSphereStart'));
    centerReg(buttonSphereStart);
    buttonSphereStart['x'] = gameData['sphereX'];
    buttonSphereStart['y'] = gameData['sphereY'];
    itemCard = new createjs.Bitmap(loader['getResult']('itemCard'));
    centerReg(itemCard);
    itemCard['x'] = canvasW / 100 * 68;
    itemCard['y'] = canvasH / 100 * 51;
    itemBarUser = new createjs.Bitmap(loader['getResult']('itemBar'));
    centerReg(itemBarUser);
    itemBarUser['x'] = itemCard['x'];
    itemBarUser['y'] = canvasH / 100 * 81;
    buttonLucky = new createjs.Bitmap(loader['getResult']('buttonLucky'));
    centerReg(buttonLucky);
    buttonLucky['x'] = itemCard['x'];
    buttonLucky['y'] = canvasH / 100 * 81;
    itemNumberBg = new createjs.Bitmap(loader['getResult']('itemNumberBg'));
    centerReg(itemNumberBg);
    itemNumberSelectBg = new createjs.Bitmap(loader['getResult']('itemNumberSelectBg'));
    centerReg(itemNumberSelectBg);
    itemNumberBg['x'] = -500;
    itemNumberSelectBg['x'] = -500;
    itemTable = new createjs.Bitmap(loader['getResult']('itemTable'));
    centerReg(itemTable);
    itemTable['x'] = itemCard['x'];
    itemTable['y'] = canvasH / 100 * 48;
    selectTitleTxt = new createjs.Text();
    selectTitleTxt['font'] = '35px quantifybold';
    selectTitleTxt['color'] = '#deb868';
    selectTitleTxt['textAlign'] = 'center';
    selectTitleTxt['textBaseline'] = 'alphabetic';
    selectTitleTxt['text'] = 'STAGE 1 COMPLETE';
    selectTitleTxt['x'] = itemBarUser['x'];
    selectTitleTxt['y'] = canvasH / 100 * 28;
    numberTitleTxt = new createjs.Text();
    numberTitleTxt['font'] = '35px quantifybold';
    numberTitleTxt['color'] = '#deb868';
    numberTitleTxt['textAlign'] = 'center';
    numberTitleTxt['textBaseline'] = 'alphabetic';
    numberTitleTxt['text'] = numberTextDisplay;
    numberTitleTxt['x'] = itemBarUser['x'];
    numberTitleTxt['y'] = canvasH / 100 * 74;
    var pwLotter56 = itemBarUser['x'];
    var pwLotter57 = canvasH / 100 * 32;
    var pwLottera5 = 43;
    var pwLottera6 = bonusBall == true ? 1 : 0;
    var pwLottera7 = score_arr['length'] + pwLottera6;
    for (var pwLotter10 = 0; pwLotter10 < score_arr['length'] + pwLottera6; pwLotter10++) {
        $['prize']['bg' + pwLotter10] = new createjs.Bitmap(loader['getResult']('itemPrizeBg'));
        centerReg($['prize']['bg' + pwLotter10]);
        $['prize']['bg' + pwLotter10]['x'] = pwLotter56;
        $['prize']['bg' + pwLotter10]['y'] = pwLotter57;
        $['prize']['bgselect' + pwLotter10] = new createjs.Bitmap(loader['getResult']('itemPrizeSelectBg'));
        centerReg($['prize']['bgselect' + pwLotter10]);
        $['prize']['bgselect' + pwLotter10]['x'] = pwLotter56;
        $['prize']['bgselect' + pwLotter10]['y'] = pwLotter57;
        $['prize']['text' + pwLotter10] = new createjs.Text();
        $['prize']['text' + pwLotter10]['font'] = '25px quantifybold';
        $['prize']['text' + pwLotter10]['color'] = '#8d6d2c';
        $['prize']['text' + pwLotter10]['textAlign'] = 'left';
        $['prize']['text' + pwLotter10]['textBaseline'] = 'alphabetic';
        $['prize']['text' + pwLotter10]['x'] = itemBarUser['x'] - 180;
        $['prize']['text' + pwLotter10]['y'] = pwLotter57 + 10;
        $['prize']['score' + pwLotter10] = new createjs.Text();
        $['prize']['score' + pwLotter10]['font'] = '28px quantifybold';
        $['prize']['score' + pwLotter10]['color'] = '#8d6d2c';
        $['prize']['score' + pwLotter10]['textAlign'] = 'right';
        $['prize']['score' + pwLotter10]['textBaseline'] = 'alphabetic';
        $['prize']['score' + pwLotter10]['x'] = itemBarUser['x'] + 180;
        $['prize']['score' + pwLotter10]['y'] = pwLotter57 + 10;
        var pwLottera8 = '';
        var pwLottera9 = '';
        var pwLotteraa = '';
        if (bonusBall) {
            if (pwLotter10 == 0) {
                pwLottera7--;
                pwLottera8 = matchTextDisplay['replace']('[NUMBER]', pwLottera7);
                pwLottera9 = scoreTextDisplay['replace']('[NUMBER]', addCommas(score_arr[pwLottera7 - 1]['prize']));
                pwLotteraa = score_arr[pwLottera7 - 1]['prize']
            } else {
                if (pwLotter10 == 1) {
                    pwLottera8 = bonusTextDisplay['replace']('[NUMBER]', pwLottera7);
                    pwLottera9 = scoreTextDisplay['replace']('[NUMBER]', addCommas(bonusScore[0]['prize']));
                    pwLotteraa = bonusScore[0]['prize'];
                    pwLottera7++
                } else {
                    pwLottera8 = matchTextDisplay['replace']('[NUMBER]', pwLottera7);
                    pwLottera9 = scoreTextDisplay['replace']('[NUMBER]', addCommas(score_arr[pwLottera7 - 1]['prize']));
                    pwLotteraa = score_arr[pwLottera7 - 1]['prize']
                }
            }
        } else {
            pwLottera8 = matchTextDisplay['replace']('[NUMBER]', pwLottera7);
            pwLottera9 = scoreTextDisplay['replace']('[NUMBER]', addCommas(score_arr[pwLottera7 - 1]['prize']));
            pwLotteraa = score_arr[pwLottera7 - 1]['prize']
        };
        $['prize']['text' + pwLotter10]['text'] = pwLottera8;
        $['prize']['score' + pwLotter10]['text'] = pwLottera9;
        $['prize']['score' + pwLotter10]['score'] = pwLotteraa;
        pwLottera7--;
        pwLotter57 += pwLottera5;
        tableContainer['addChild']($['prize']['bgselect' + pwLotter10], $['prize']['bg' + pwLotter10], $['prize']['text' + pwLotter10], $['prize']['score' + pwLotter10])
    };
    tableContainer['addChild'](numberTitleTxt);
    buttonLeft = new createjs.Bitmap(loader['getResult']('buttonLeft'));
    centerReg(buttonLeft);
    buttonLeft['x'] = itemCard['x'] - 170;
    buttonLeft['y'] = canvasH / 100 * 26;
    buttonRight = new createjs.Bitmap(loader['getResult']('buttonRight'));
    centerReg(buttonRight);
    buttonRight['x'] = itemCard['x'] + 170;
    buttonRight['y'] = canvasH / 100 * 26;
    cardContainer['addChild'](buttonLeft, buttonRight);
    itemResult = new createjs.Bitmap(loader['getResult']('itemResult'));
    resultTitleTxt = new createjs.Text();
    resultTitleTxt['font'] = '50px quantifybold';
    resultTitleTxt['color'] = '#ddb867';
    resultTitleTxt['textAlign'] = 'center';
    resultTitleTxt['textBaseline'] = 'alphabetic';
    resultTitleTxt['text'] = 'STAGE 1 COMPLETE';
    resultTitleTxt['x'] = canvasW / 2;
    resultTitleTxt['y'] = canvasH / 100 * 45;
    resultShareTxt = new createjs.Text();
    resultShareTxt['font'] = '30px quantifybold';
    resultShareTxt['color'] = '#8e6c2b';
    resultShareTxt['textAlign'] = 'center';
    resultShareTxt['textBaseline'] = 'alphabetic';
    resultShareTxt['text'] = shareText;
    resultShareTxt['x'] = canvasW / 2;
    resultShareTxt['y'] = canvasH / 100 * 52;
    buttonFacebook = new createjs.Bitmap(loader['getResult']('buttonFacebook'));
    buttonTwitter = new createjs.Bitmap(loader['getResult']('buttonTwitter'));
    buttonWhatsapp = new createjs.Bitmap(loader['getResult']('buttonWhatsapp'));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFacebook['x'] = canvasW / 100 * 45;
    buttonTwitter['x'] = canvasW / 2;
    buttonWhatsapp['x'] = canvasW / 100 * 55;
    buttonFacebook['y'] = buttonTwitter['y'] = buttonWhatsapp['y'] = canvasH / 100 * 58;
    buttonContinue = new createjs.Bitmap(loader['getResult']('buttonContinue'));
    centerReg(buttonContinue);
    createHitarea(buttonContinue);
    buttonContinue['x'] = canvasW / 2;
    buttonContinue['y'] = canvasH / 100 * 70;
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
    itemExit = new createjs.Bitmap(loader['getResult']('itemExit'));
    buttonConfirm = new createjs.Bitmap(loader['getResult']('buttonConfirm'));
    centerReg(buttonConfirm);
    buttonConfirm['x'] = canvasW / 100 * 39;
    buttonConfirm['y'] = canvasH / 100 * 67;
    buttonCancel = new createjs.Bitmap(loader['getResult']('buttonCancel'));
    centerReg(buttonCancel);
    buttonCancel['x'] = canvasW / 100 * 61;
    buttonCancel['y'] = canvasH / 100 * 67;
    confirmMessageTxt = new createjs.Text();
    confirmMessageTxt['font'] = '40px quantifybold';
    confirmMessageTxt['color'] = '#ddb867';
    confirmMessageTxt['textAlign'] = 'center';
    confirmMessageTxt['textBaseline'] = 'alphabetic';
    confirmMessageTxt['text'] = exitMessage;
    confirmMessageTxt['lineHeight'] = 40;
    confirmMessageTxt['x'] = canvasW / 2;
    confirmMessageTxt['y'] = canvasH / 100 * 47;
    confirmContainer['addChild'](itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
    confirmContainer['visible'] = false;
    if (guide) {
        guideline = new createjs.Shape();
        guideline['graphics']['setStrokeStyle'](2)['beginStroke']('red')['drawRect']((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH)
    };
    mainContainer['addChild'](logo, buttonStart);
    gameContainer['addChild'](itemBallBg, itemBallShadow, itemBall, itemBallDim, itemBallGuess, itemBallBonus, itemBallHit, itemNumberBg, itemNumberSelectBg, ballsContainer, itemStick, itemSphere, itemShine, buttonSphereStart, itemBar, itemBarBonus, ballsRevealContainer, itemCard, itemBarUser, ballsSelectContainer, buttonLucky, cardContainer, tableContainer, selectTitleTxt);
    resultContainer['addChild'](itemResult, resultTitleTxt, buttonContinue);
    if (shareEnable) {
        resultContainer['addChild'](resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp)
    };
    canvasContainer['addChild'](bg, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage['addChild'](canvasContainer);
    resizeCanvas()
}

function resizeCanvas() {
    if (canvasContainer != undefined) {
        buttonSettings['x'] = (canvasW - offset['x']) - 60;
        buttonSettings['y'] = offset['y'] + 45;
        var pwLotterac = 50;
        var pwLotterad = 0;
        if (curPage != 'game') {
            buttonExit['visible'] = false;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + pwLotterac;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + pwLotterac;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (pwLotterac * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (pwLotterac * 2);
                pwLotterad = 2
            } else {
                pwLotterad = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (pwLotterac * (pwLotterad + 1))
        } else {
            buttonExit['visible'] = true;
            buttonSoundOn['x'] = buttonSoundOff['x'] = buttonSettings['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + pwLotterac;
            buttonSoundOn['x'] = buttonSoundOff['x'];
            buttonSoundOn['y'] = buttonSoundOff['y'] = buttonSettings['y'] + pwLotterac;
            if (typeof buttonMusicOn != 'undefined') {
                buttonMusicOn['x'] = buttonMusicOff['x'] = buttonSettings['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (pwLotterac * 2);
                buttonMusicOn['x'] = buttonMusicOff['x'];
                buttonMusicOn['y'] = buttonMusicOff['y'] = buttonSettings['y'] + (pwLotterac * 2);
                pwLotterad = 2
            } else {
                pwLotterad = 1
            };
            buttonFullscreen['x'] = buttonSettings['x'];
            buttonFullscreen['y'] = buttonSettings['y'] + (pwLotterac * (pwLotterad + 1));
            buttonExit['x'] = buttonSettings['x'];
            buttonExit['y'] = buttonSettings['y'] + (pwLotterac * (pwLotterad + 2))
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

function tick(pwLotter8b) {
    updateGame();
    stage['update'](pwLotter8b)
}

function centerReg(pwLotter5c) {
    pwLotter5c['regX'] = pwLotter5c['image']['naturalWidth'] / 2;
    pwLotter5c['regY'] = pwLotter5c['image']['naturalHeight'] / 2
}

function createHitarea(pwLotter5c) {
    pwLotter5c['hitArea'] = new createjs.Shape(new createjs.Graphics()['beginFill']('#000')['drawRect'](0, 0, pwLotter5c['image']['naturalWidth'], pwLotter5c['image']['naturalHeight']))
}
var selectTextDisplay = 'Select [NUMBER] Numbers';
var ballRadius = 60;
var totalBall = 36;
var rotateBall = true;
var numberStartZero = false;
var spinDirection = true;
var spinStartSpeed = 5;
var spinEndSpeed = 5;
var spinSpeed = 10;
var revealTimer = 6;
var prizeTableDisplay = 'Score Table';
var numberTextDisplay = 'Your Numbers';
var matchTextDisplay = 'MATCH [NUMBER]';
var scoreTextDisplay = '[NUMBER]PTS';
var bonusBall = true;
var bonusTextDisplay = 'MATCH [NUMBER] + BONUS';
var enablePercentage = false;
var score_arr = [{
    prize: 50,
    percent: 25
}, {
    prize: 100,
    percent: 20
}, {
    prize: 500,
    percent: 15
}, {
    prize: 1000,
    percent: 10
}, {
    prize: 10000,
    percent: 5
}, {
    prize: 100000,
    percent: 1
}];
var bonusScore = [{
    prize: 50000,
    percent: 3
}];
var exitMessage = 'ARE YOUR SURE\x0AYOU WANT TO QUIT THE GAME?';
var resultCompleteText = 'YOU WON [NUMBER]PTS!';
var resultFailText = 'YOU DIDN"T WIN!';
var shareEnable = true;
var shareText = 'SHARE THIS GAME';
var shareTitle = 'Highscore on Lottery Numbers Game is [SCORE]PTS.';
var shareMessage = '[SCORE]PTS is mine new highscore on Lottery Numbers Game! Try it now!';
var playerData = {
    score: 0
};
var gameData = {
    paused: true,
    sphereX: 400,
    sphereY: 325,
    cageRadius: 225,
    radius: 0,
    spin: false,
    selectNum: 0,
    numberNum: 0,
    numberArray: [],
    selectArray: [],
    winArray: [],
    buttonArray: [],
    indexArray: [],
    dimArray: [],
    matchNum: 0,
    ballsArray: [],
    cageArray: [],
    revealArray: [],
    totalBall: [],
    ballNumber: []
};
var radiusTweenData = {
    radius: 0
};
var soundTweenData = {
    volume: 0
};
var optimizeData = {
    balls: 40
};
var cardData = {
    max: 36,
    page: 1,
    maxPage: 0
};
var ballData = {
    radius: 60,
    scale: 1
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
        var pwLotterd4 = (window['location'] != window['parent']['location']) ? true : false;
        if (pwLotterd4) {
            $(window)['blur'](function () {
                appendFocusFrame()
            });
            appendFocusFrame()
        }
    };
    if (enablePercentage) {
        createPercentage()
    };
    buttonStart['cursor'] = 'pointer';
    buttonStart['addEventListener']('click', function (pwLotter11) {
        playSound('soundClick');
        goPage('game')
    });
    buttonContinue['cursor'] = 'pointer';
    buttonContinue['addEventListener']('click', function (pwLotter11) {
        playSound('soundClick');
        goPage('main')
    });
    buttonFacebook['cursor'] = 'pointer';
    buttonFacebook['addEventListener']('click', function (pwLotter11) {
        share('facebook')
    });
    buttonTwitter['cursor'] = 'pointer';
    buttonTwitter['addEventListener']('click', function (pwLotter11) {
        share('twitter')
    });
    buttonWhatsapp['cursor'] = 'pointer';
    buttonWhatsapp['addEventListener']('click', function (pwLotter11) {
        share('whatsapp')
    });
    buttonSoundOff['cursor'] = 'pointer';
    buttonSoundOff['addEventListener']('click', function (pwLotter11) {
        toggleSoundMute(true)
    });
    buttonSoundOn['cursor'] = 'pointer';
    buttonSoundOn['addEventListener']('click', function (pwLotter11) {
        toggleSoundMute(false)
    });
    if (typeof buttonMusicOff != 'undefined') {
        buttonMusicOff['cursor'] = 'pointer';
        buttonMusicOff['addEventListener']('click', function (pwLotter11) {
            toggleMusicMute(true)
        })
    };
    if (typeof buttonMusicOn != 'undefined') {
        buttonMusicOn['cursor'] = 'pointer';
        buttonMusicOn['addEventListener']('click', function (pwLotter11) {
            toggleMusicMute(false)
        })
    };
    buttonFullscreen['cursor'] = 'pointer';
    buttonFullscreen['addEventListener']('click', function (pwLotter11) {
        toggleFullScreen()
    });
    buttonExit['cursor'] = 'pointer';
    buttonExit['addEventListener']('click', function (pwLotter11) {
        toggleConfirm(true)
    });
    buttonSettings['cursor'] = 'pointer';
    buttonSettings['addEventListener']('click', function (pwLotter11) {
        toggleOption()
    });
    buttonConfirm['cursor'] = 'pointer';
    buttonConfirm['addEventListener']('click', function (pwLotter11) {
        toggleConfirm(false);
        stopGame();
        goPage('main')
    });
    buttonCancel['cursor'] = 'pointer';
    buttonCancel['addEventListener']('click', function (pwLotter11) {
        toggleConfirm(false)
    });
    buttonLucky['cursor'] = 'pointer';
    buttonLucky['addEventListener']('click', function (pwLotter11) {
        playSound('soundRandom');
        randomizeNumber()
    });
    buttonSphereStart['cursor'] = 'pointer';
    buttonSphereStart['addEventListener']('click', function (pwLotter11) {
        startSpin()
    });
    buttonLeft['cursor'] = 'pointer';
    buttonLeft['addEventListener']('click', function (pwLotter11) {
        playSound('soundClick');
        toggleNumberCard(false)
    });
    buttonRight['cursor'] = 'pointer';
    buttonRight['addEventListener']('click', function (pwLotter11) {
        playSound('soundClick');
        toggleNumberCard(true)
    })
}

function appendFocusFrame() {
    $('#mainHolder')['prepend']('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
    $('#focus')['click'](function () {
        $('#focus')['remove']()
    })
}
var curPage = '';

function goPage(pwLotterd8) {
    curPage = pwLotterd8;
    mainContainer['visible'] = false;
    gameContainer['visible'] = false;
    resultContainer['visible'] = false;
    var pwLotterd9 = null;
    switch (pwLotterd8) {
    case 'main':
        pwLotterd9 = mainContainer;
        break;
    case 'game':
        pwLotterd9 = gameContainer;
        startGame();
        break;
    case 'result':
        pwLotterd9 = resultContainer;
        stopGame();
        if (gameData['matchNum'] != -1) {
            playSound('soundComplete');
            resultTitleTxt['text'] = resultCompleteText['replace']('[NUMBER]', addCommas(playerData['score']));
            saveGame(playerData['score'])
        } else {
            playSound('soundFail');
            resultTitleTxt['text'] = resultFailText;
            saveGame(0)
        };
        break
    };
    if (pwLotterd9 != null) {
        pwLotterd9['visible'] = true;
        pwLotterd9['alpha'] = 0;
        TweenMax['to'](pwLotterd9, 0.5, {
            alpha: 1,
            overwrite: true
        })
    };
    resizeCanvas()
}

function toggleConfirm(pwLotter76) {
    confirmContainer['visible'] = pwLotter76;
    if (pwLotter76) {
        TweenMax['pauseAll'](true, true);
        gameData['paused'] = true
    } else {
        TweenMax['resumeAll'](true, true);
        gameData['paused'] = false
    }
}

function startGame() {
    playerData['score'] = 0;
    gameData['spin'] = false;
    gameData['selectArray'] = [];
    gameData['winArray'] = [];
    gameData['radius'] = 0;
    gameData['matchNum'] = -1;
    gameData['numberNum'] = 0;
    radiusTweenData['radius'] = 0;
    resetCard();
    shuffle(gameData['numberArray']);
    shuffle(gameData['indexArray']);
    var pwLotterdc = totalBall > optimizeData['balls'] ? optimizeData['balls'] : totalBall;
    for (var pwLotter10 = 0; pwLotter10 < pwLotterdc; pwLotter10++) {
        var pwLotterdd = gameData['indexArray'][pwLotter10];
        var pwLotter19 = gameData['ballsArray'][pwLotterdd]['obj'];
        pwLotter19['scaleX'] = pwLotter19['scaleY'] = ballData['scale'] * 0.9;
        pwLotter19['x'] = randomIntFromInterval(gameData['sphereX'] - 100, gameData['sphereX'] + 100);
        pwLotter19['y'] = gameData['sphereY'];
        ballsContainer['setChildIndex'](pwLotter19, pwLotter10)
    };
    resetBallsTimer();
    gameData['ballNumber'] = [];
    shuffle(gameData['totalBall']);
    for (var pwLotter10 = 0; pwLotter10 < gameData['ballsArray']['length']; pwLotter10++) {
        var pwLotterde = Number(gameData['totalBall'][pwLotter10]);
        gameData['ballNumber']['push']({
            index: pwLotter10,
            number: pwLotterde,
            status: false
        });
        if (numberStartZero) {
            pwLotterde = pad(pwLotterde, 2)
        } else {
            pwLotterde = pad(pwLotterde + 1, 2)
        };
        for (var pwLotterdf = 0; pwLotterdf < gameData['ballsArray'][pwLotter10]['text']['length']; pwLotterdf++) {
            gameData['ballsArray'][pwLotter10]['text'][pwLotterdf]['text'] = pwLotterde;
            gameData['ballsArray'][pwLotter10]['rotate']['cache'](-30, -30, 120, 120)
        }
    };
    var pwLottera6 = bonusBall == true ? 1 : 0;
    var pwLottera7 = score_arr['length'] + pwLottera6;
    for (var pwLotter10 = 0; pwLotter10 < pwLottera7; pwLotter10++) {
        $['prize']['bg' + pwLotter10]['alpha'] = 1;
        $['prize']['bgselect' + pwLotter10]['alpha'] = 1;
        $['prize']['text' + pwLotter10]['color'] = $['prize']['score' + pwLotter10]['color'] = '#8d6d2c'
    };
    itemBarUser['visible'] = false;
    buttonSphereStart['visible'] = true;
    buttonLucky['visible'] = true;
    cardContainer['visible'] = true;
    tableContainer['visible'] = false;
    gameData['paused'] = false;
    setRevealBalls();
    playSoundLoop('soundBalls');
    setSoundLoopVolume('soundBalls', 0.1);
    playSoundLoop('soundCage');
    setSoundLoopVolume('soundCage', 0.1);
    selectTitleTxt['text'] = selectTextDisplay['replace']('[NUMBER]', score_arr['length']);
    cardData['page'] = 1;
    toggleNumberCard(false);
    displayNumberCard()
}

function startSpin() {
    if (typeof memberData != 'undefined' && memberSettings['enableMembership'] && !memberData['ready']) {
        return
    };
    gameData['selectArray'] = [];
    for (var pwLotter10 = 0; pwLotter10 < totalBall; pwLotter10++) {
        var pwLottere1 = gameData['buttonArray'][pwLotter10]['bg'];
        if (pwLottere1['isSelected']) {
            gameData['selectArray']['push'](pwLotter10)
        }
    };
    if (gameData['selectArray']['length'] == score_arr['length']) {
        if (typeof memberData != 'undefined' && memberSettings['enableMembership'] && !memberData['ready']) {
            return
        };
        if (typeof memberData != 'undefined' && memberSettings['enableMembership']) {
            if (!checkMemberGameType()) {
                goMemberPage('user');
                return
            } else {
                playerData['chance']--;
                updateUserPoint('proceedStartSpin')
            }
        } else {
            proceedStartSpin()
        }
    }
}

function proceedStartSpin() {
    playSound('soundStartSpin');
    itemBarUser['visible'] = true;
    buttonSphereStart['visible'] = false;
    buttonLucky['visible'] = false;
    cardContainer['visible'] = false;
    tableContainer['visible'] = true;
    selectTitleTxt['text'] = prizeTableDisplay;
    shuffle(gameData['numberArray']);
    setSelectBalls();
    gameData['spin'] = true;
    if (gameData['revealArray']['length'] == 0 && enablePercentage) {
        getResultOnPercent()
    };
    if (gameData['revealArray']['length'] == 0) {
        var pwLottera6 = bonusBall == true ? 1 : 0;
        for (var pwLotter3b = 0; pwLotter3b < score_arr['length'] + pwLottera6; pwLotter3b++) {
            gameData['revealArray']['push'](gameData['numberArray'][pwLotter3b])
        }
    };
    for (var pwLotter10 = 0; pwLotter10 < gameData['revealArray']['length']; pwLotter10++) {
        var pwLotterde = gameData['revealArray'][pwLotter10];
        for (var pwLotterdf = 0; pwLotterdf < gameData['ballNumber']['length']; pwLotterdf++) {
            if (pwLotterde == gameData['ballNumber'][pwLotterdf]['number']) {
                gameData['ballNumber'][pwLotterdf]['status'] = true
            }
        }
    };
    TweenMax['to'](radiusTweenData, spinStartSpeed, {
        radius: spinSpeed,
        overwrite: true,
        onComplete: beginWinNumberTimer
    });
    TweenMax['to'](soundTweenData, spinStartSpeed, {
        volume: 1,
        overwrite: true,
        onUpdate: updateBallsVolume
    })
}

function updateBallsVolume() {
    setSoundLoopVolume('soundBalls', soundTweenData['volume']);
    setSoundLoopVolume('soundCage', soundTweenData['volume'])
}

function stopGame() {
    stopSoundLoop('soundBalls');
    stopSoundLoop('soundCage');
    gameData['paused'] = true;
    gameData['spin'] = false;
    gameData['selectArray'] = [];
    gameData['winArray'] = [];
    gameData['revealArray'] = [];
    gameData['radius'] = 0;
    radiusTweenData['radius'] = 0;
    TweenMax['killAll']();
    ballsSelectContainer['removeAllChildren']();
    ballsRevealContainer['removeAllChildren']()
}

function saveGame(pwLottere6) {
    if (typeof toggleScoreboardSave == 'function') {
        $['scoreData']['score'] = pwLottere6;
        if (typeof type != 'undefined') {
            $['scoreData']['type'] = type
        };
        toggleScoreboardSave(true)
    }
}

function readyGame() {
    var pwLotter56 = 707;
    var pwLotter57 = 260;
    var pwLottere8 = pwLotter56;
    var pwLottere9 = pwLotter57;
    var pwLotterea = 65;
    var pwLottera5 = 55;
    var pwLottereb = 0;
    var pwLotterec = 0;
    for (var pwLotter10 = 0; pwLotter10 < totalBall; pwLotter10++) {
        gameData['totalBall']['push'](pwLotter10);
        var pwLottered = itemNumberBg['clone']();
        var pwLotteree = itemNumberSelectBg['clone']();
        pwLottered['x'] = pwLottere8;
        pwLottered['y'] = pwLottere9;
        pwLotteree['x'] = pwLottere8;
        pwLotteree['y'] = pwLottere9;
        var pwLotteref = new createjs.Text();
        pwLotteref['font'] = '35px quantifybold';
        pwLotteref['color'] = '#000';
        pwLotteref['textAlign'] = 'center';
        pwLotteref['textBaseline'] = 'alphabetic';
        if (numberStartZero) {
            pwLotteref['text'] = pad(pwLotter10, 2)
        } else {
            pwLotteref['text'] = pad(pwLotter10 + 1, 2)
        };
        pwLotteref['x'] = pwLottere8;
        pwLotteref['y'] = pwLottere9 + 11;
        pwLottered['highlight'] = pwLotteree;
        pwLottered['text'] = pwLotteref;
        cardContainer['addChild'](pwLottered, pwLotteree, pwLotteref);
        gameData['buttonArray']['push']({
            bg: pwLottered,
            select: pwLotteree,
            text: pwLotteref
        });
        pwLottered['cursor'] = 'pointer';
        pwLottered['addEventListener']('click', function (pwLotter11) {
            if (!gameData['spin']) {
                playSound('soundNumber');
                toggleNumber(pwLotter11['target'])
            }
        });
        pwLottere8 += pwLotterea;
        pwLottereb++;
        if (pwLottereb > 5) {
            pwLottereb = 0;
            pwLottere8 = pwLotter56;
            pwLottere9 += pwLottera5
        };
        pwLotterec++;
        if (pwLotterec >= cardData['max']) {
            pwLotterec = 0;
            pwLottere8 = pwLotter56;
            pwLottere9 = pwLotter57
        };
        gameData['numberArray']['push'](pwLotter10)
    };
    var pwLotterdc = totalBall > optimizeData['balls'] ? optimizeData['balls'] : totalBall;
    for (var pwLotter10 = 0; pwLotter10 < pwLotterdc; pwLotter10++) {
        gameData['indexArray']['push'](pwLotter10);
        createBall(pwLotter10)
    };
    itemBarBonus['visible'] = false;
    if (bonusBall) {
        itemBar['visible'] = false;
        itemBarBonus['visible'] = true
    };
    cardData['maxPage'] = totalBall / cardData['max'];
    if (String(cardData['maxPage'])['indexOf']('.') > -1) {
        cardData['maxPage'] = Math['floor'](cardData['maxPage']) + 1
    };
    createCages();
    createPhysics()
}

function toggleNumber(pwLotter5c) {
    if (!pwLotter5c['highlight']['visible']) {
        if (gameData['selectNum'] < score_arr['length']) {
            pwLotter5c['isSelected'] = true;
            if (pwLotter5c['visible']) {
                pwLotter5c['highlight']['visible'] = true;
                pwLotter5c['text']['color'] = '#fff'
            };
            gameData['selectNum']++
        }
    } else {
        pwLotter5c['isSelected'] = false;
        if (pwLotter5c['visible']) {
            pwLotter5c['highlight']['visible'] = false;
            pwLotter5c['text']['color'] = '#000'
        };
        gameData['selectNum']--
    }
}

function toggleNumberCard(pwLotter76) {
    if (pwLotter76) {
        cardData['page']++;
        cardData['page'] = cardData['page'] > cardData['maxPage'] ? cardData['maxPage'] : cardData['page']
    } else {
        cardData['page']--;
        cardData['page'] = cardData['page'] < 1 ? 1 : cardData['page']
    };
    buttonLeft['visible'] = false;
    if (cardData['page'] > 1) {
        buttonLeft['visible'] = true
    };
    buttonRight['visible'] = false;
    if (cardData['page'] != cardData['maxPage'] && cardData['maxPage'] > 1) {
        buttonRight['visible'] = true
    };
    displayNumberCard()
}

function displayNumberCard() {
    var pwLotterf3 = (cardData['page'] - 1) * cardData['max'];
    var pwLotterf4 = pwLotterf3 + cardData['max'];
    for (var pwLotter10 = 0; pwLotter10 < gameData['buttonArray']['length']; pwLotter10++) {
        gameData['buttonArray'][pwLotter10]['text']['color'] = '#000';
        gameData['buttonArray'][pwLotter10]['bg']['visible'] = false;
        gameData['buttonArray'][pwLotter10]['select']['visible'] = false;
        gameData['buttonArray'][pwLotter10]['text']['visible'] = false;
        if (pwLotter10 >= pwLotterf3 && pwLotter10 < pwLotterf4) {
            gameData['buttonArray'][pwLotter10]['bg']['visible'] = true;
            gameData['buttonArray'][pwLotter10]['text']['visible'] = true;
            if (gameData['buttonArray'][pwLotter10]['bg']['isSelected']) {
                gameData['buttonArray'][pwLotter10]['select']['visible'] = true;
                gameData['buttonArray'][pwLotter10]['text']['color'] = '#fff'
            }
        }
    }
}

function resetCard() {
    gameData['selectNum'] = 0;
    for (var pwLotter10 = 0; pwLotter10 < totalBall; pwLotter10++) {
        var pwLottere1 = gameData['buttonArray'][pwLotter10]['bg'];
        pwLottere1['isSelected'] = false;
        pwLottere1['highlight']['visible'] = false;
        pwLottere1['text']['color'] = '#000'
    }
}

function randomizeNumber() {
    resetCard();
    shuffle(gameData['numberArray']);
    for (var pwLotter10 = 0; pwLotter10 < score_arr['length']; pwLotter10++) {
        toggleNumber(gameData['buttonArray'][gameData['numberArray'][pwLotter10]]['bg'])
    }
}

function updateGame() {
    spinCage();
    updatePhysics();
    if (spinDirection) {
        gameData['radius'] -= radiusTweenData['radius'];
        gameData['radius'] = gameData['radius'] < -360 ? 0 : gameData['radius']
    } else {
        gameData['radius'] += radiusTweenData['radius'];
        gameData['radius'] = gameData['radius'] > 360 ? 0 : gameData['radius']
    };
    itemStick['rotation'] = itemShine['rotation'] = gameData['radius']
}

function createBall(pwLotterf9) {
    var pwLotterfa = new createjs.Container();
    var pwLotterfb = itemBallBg['clone']();
    pwLotterfb['x'] = 0;
    pwLotterfb['y'] = 0;
    pwLotterfb['regX'] = 30;
    pwLotterfb['regY'] = 30;
    var pwLotterfc = itemBallShadow['clone']();
    pwLotterfc['x'] = 0;
    pwLotterfc['y'] = 0;
    var pwLotterfd;
    if (numberStartZero) {
        pwLotterfd = pad(pwLotterf9, 2)
    } else {
        pwLotterfd = pad(pwLotterf9 + 1, 2)
    };
    var pwLotterfe = 53;
    var pwLotteref = new createjs.Text();
    pwLotteref['font'] = '25px quantifybold';
    pwLotteref['color'] = '#000';
    pwLotteref['textAlign'] = 'center';
    pwLotteref['textBaseline'] = 'alphabetic';
    pwLotteref['text'] = pwLotterfd;
    pwLotteref['x'] = 0;
    pwLotteref['y'] = 10;
    var pwLotterff = new createjs.Text();
    pwLotterff['font'] = '25px quantifybold';
    pwLotterff['color'] = '#000';
    pwLotterff['textAlign'] = 'center';
    pwLotterff['textBaseline'] = 'alphabetic';
    pwLotterff['text'] = pwLotterfd;
    pwLotterff['x'] = pwLotterfe;
    pwLotterff['y'] = 10;
    var pwLotter100 = new createjs.Text();
    pwLotter100['font'] = '25px quantifybold';
    pwLotter100['color'] = '#000';
    pwLotter100['textAlign'] = 'center';
    pwLotter100['textBaseline'] = 'alphabetic';
    pwLotter100['text'] = pwLotterfd;
    pwLotter100['x'] = 0;
    pwLotter100['y'] = pwLotterfe + 10;
    var pwLotter101 = new createjs.Text();
    pwLotter101['font'] = '25px quantifybold';
    pwLotter101['color'] = '#000';
    pwLotter101['textAlign'] = 'center';
    pwLotter101['textBaseline'] = 'alphabetic';
    pwLotter101['text'] = pwLotterfd;
    pwLotter101['x'] = pwLotterfe;
    pwLotter101['y'] = pwLotterfe + 10;
    var pwLotter102 = new createjs.Container();
    pwLotter102['addChild'](pwLotterfb, pwLotteref, pwLotterff, pwLotter100, pwLotter101);
    var pwLotter103 = new createjs.Shape();
    pwLotter103['graphics']['beginFill']('red')['drawCircle'](0, 0, 30);
    pwLotter102['cache'](-30, -30, 120, 120);
    pwLotter102['mask'] = pwLotter103;
    ballData['scale'] = ballRadius / ballData['radius'];
    pwLotterfa['x'] = randomIntFromInterval(gameData['sphereX'] - 150, gameData['sphereX'] + 150);
    pwLotterfa['y'] = gameData['sphereY'];
    pwLotterfa['addChild'](pwLotterfc, pwLotter102);
    pwLotterfa['scaleX'] = pwLotterfa['scaleY'] = ballData['scale'];
    ballsContainer['addChild'](pwLotterfa);
    gameData['ballsArray']['push']({
        obj: pwLotterfa,
        rotate: pwLotter102,
        text: [pwLotteref, pwLotterff, pwLotter100, pwLotter101]
    })
}

function updateBallRotate(pw9, pwLotter105, pwLotter106, pwLotter5e) {
    if (!rotateBall) {
        return
    };
    var pwLotter19 = gameData['ballsArray'][pw9]['obj'];
    var pwLotter107 = gameData['ballsArray'][pw9]['rotate'];
    pwLotter107['x'] += pwLotter105;
    pwLotter107['y'] += pwLotter106;
    var pwLotter108 = -53;
    pwLotter107['x'] = pwLotter107['x'] > 0 ? pwLotter108 : pwLotter107['x'];
    pwLotter107['x'] = pwLotter107['x'] < pwLotter108 ? 0 : pwLotter107['x'];
    pwLotter107['y'] = pwLotter107['y'] > 0 ? pwLotter108 : pwLotter107['y'];
    pwLotter107['y'] = pwLotter107['y'] < pwLotter108 ? 0 : pwLotter107['y']
}

function createCages() {
    var pwLottera7 = 35;
    var pwLotter10a = 360 / pwLottera7;
    for (var pwLotter10 = 0; pwLotter10 < pwLottera7; pwLotter10++) {
        var pwLotter10b = pwLotter10a * pwLotter10;
        var pwLotter10c = getAnglePositionByValue(gameData['sphereX'], gameData['sphereY'], gameData['cageRadius'], pwLotter10b);
        var pwLotter10d = itemBallHit['clone']();
        pwLotter10d['x'] = pwLotter10c['x'];
        pwLotter10d['y'] = pwLotter10c['y'];
        pwLotter10d['radius'] = pwLotter10b;
        gameData['cageArray']['push'](pwLotter10d)
    }
}

function spinCage() {
    for (var pwLotter10 = 0; pwLotter10 < gameData['cageArray']['length']; pwLotter10++) {
        var pwLotter1a = gameData['cageArray'][pwLotter10];
        var pwLotter10c = getAnglePositionByValue(gameData['sphereX'], gameData['sphereY'], gameData['cageRadius'], pwLotter1a['radius'] + gameData['radius']);
        pwLotter1a['x'] = pwLotter10c['x'];
        pwLotter1a['y'] = pwLotter10c['y']
    }
}

function beginWinNumberTimer() {
    TweenMax['to'](ballsContainer, revealTimer, {
        overwrite: true,
        onComplete: revealWinNumber
    })
}

function revealWinNumber() {
    var pwLotter111 = gameData['revealArray'][gameData['numberNum']];
    var pwLotter112 = gameData['revealArray'][gameData['numberNum']];
    var pwLotter113 = false;
    for (var pwLotterdf = 0; pwLotterdf < gameData['ballNumber']['length']; pwLotterdf++) {
        if (pwLotter111 == gameData['ballNumber'][pwLotterdf]['number']) {
            pwLotter113 = true;
            pwLotter111 = gameData['ballNumber'][pwLotterdf]['index'];
            pwLotterdf = gameData['ballNumber']['length']
        }
    };
    if (!pwLotter113) {
        for (var pwLotterdf = 0; pwLotterdf < gameData['ballNumber']['length']; pwLotterdf++) {
            if (!gameData['ballNumber'][pwLotterdf]['status']) {
                gameData['ballNumber'][pwLotterdf]['status'] = true;
                pwLotter111 = gameData['ballNumber'][pwLotterdf]['index'];
                pwLotterdf = gameData['ballNumber']['length']
            }
        }
    };
    gameData['revealIndex'] = pwLotter111;
    gameData['winArray']['push'](pwLotter111);
    var pwLotter19 = gameData['ballsArray'][pwLotter111]['obj'];
    var pwLotter114 = gameData['ballsArray'][pwLotter111]['rotate'];
    var pwLotterde = gameData['revealArray'][gameData['numberNum']];
    if (numberStartZero) {
        pwLotterde = pad(pwLotterde, 2)
    } else {
        pwLotterde = pad(pwLotterde + 1, 2)
    };
    for (var pwLotterdf = 0; pwLotterdf < gameData['ballsArray'][pwLotter111]['text']['length']; pwLotterdf++) {
        gameData['ballsArray'][pwLotter111]['text'][pwLotterdf]['text'] = pwLotterde;
        gameData['ballsArray'][pwLotter111]['rotate']['cache'](-30, -30, 120, 120)
    };
    gameData['numberNum']++;
    playSound('soundSuck');
    TweenMax['to'](pwLotter114, 0.5, {
        x: 0,
        y: 0,
        rotation: 0,
        overwrite: true
    });
    TweenMax['to'](pwLotter19, 0.5, {
        x: gameData['sphereX'],
        y: canvasH / 100 * 71,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        overwrite: true,
        onComplete: function () {
            playSound('soundReveal');
            setRevealBalls();
            matchWinBalls(pwLotter112);
            TweenMax['to'](pwLotter19, 0.2, {
                delay: 1,
                x: gameData['sphereX'],
                y: canvasH / 100 * 80,
                rotation: 0,
                overwrite: true
            })
        }
    });
    var pwLottera6 = bonusBall == true ? 1 : 0;
    if (gameData['numberNum'] < score_arr['length'] + pwLottera6) {
        beginWinNumberTimer()
    } else {
        endGame()
    }
}

function setRevealBalls() {
    ballsRevealContainer['removeAllChildren']();
    var pwLottera6 = bonusBall == true ? 1 : 0;
    var pwLotter116 = score_arr['length'] + pwLottera6;
    var pwLotter117 = Math['floor'](pwLotter116 / 2);
    var pwLotterea = 65;
    var pwLotter56 = itemBar['x'] - (pwLotterea * pwLotter117);
    if (isEven(pwLotter116)) {
        pwLotter56 += pwLotterea / 2
    };
    if (bonusBall) {
        pwLotter56 -= pwLotterea / 5
    };
    var pwLotter57 = itemBar['y'] - 3;
    for (var pwLotter10 = 0; pwLotter10 < score_arr['length']; pwLotter10++) {
        if (pwLotter10 < gameData['winArray']['length']) {
            var pwLotter118 = gameData['ballsArray'][gameData['winArray'][pwLotter10]]['rotate'];
            pwLotter118['x'] = pwLotter118['y'] = 0;
            var pwLotter119 = gameData['ballsArray'][gameData['winArray'][pwLotter10]]['obj']['clone'](true);
            pwLotter119['x'] = pwLotter56;
            pwLotter119['y'] = pwLotter57
        } else {
            var pwLotter119 = itemBallGuess['clone']();
            pwLotter119['x'] = pwLotter56;
            pwLotter119['y'] = pwLotter57
        };
        ballsRevealContainer['addChild'](pwLotter119);
        pwLotter56 += pwLotterea
    };
    if (bonusBall) {
        pwLotter56 += pwLotterea / 3;
        if (gameData['winArray']['length'] > score_arr['length']) {
            var pwLotter118 = gameData['ballsArray'][gameData['winArray'][gameData['winArray']['length'] - 1]]['rotate'];
            pwLotter118['x'] = pwLotter118['y'] = 0;
            var pwLotter119 = gameData['ballsArray'][gameData['winArray'][gameData['winArray']['length'] - 1]]['obj']['clone'](true);
            pwLotter119['x'] = pwLotter56;
            pwLotter119['y'] = pwLotter57
        } else {
            var pwLotter119 = itemBallBonus['clone']();
            pwLotter119['x'] = pwLotter56;
            pwLotter119['y'] = pwLotter57
        };
        ballsRevealContainer['addChild'](pwLotter119)
    }
}

function setSelectBalls() {
    ballsSelectContainer['removeAllChildren']();
    gameData['dimArray'] = [];
    var pwLotter117 = Math['floor'](score_arr['length'] / 2);
    var pwLotterea = 65;
    var pwLotter56 = itemBarUser['x'] - (pwLotterea * pwLotter117);
    if (isEven(score_arr['length'])) {
        pwLotter56 += pwLotterea / 2
    };
    var pwLotter57 = itemBarUser['y'] - 3;
    var pwLotter11b = gameData['ballsArray'][0]['text'][0]['text'];
    for (var pwLotter10 = 0; pwLotter10 < gameData['selectArray']['length']; pwLotter10++) {
        var pwLotter118 = gameData['ballsArray'][0]['rotate'];
        pwLotter118['x'] = pwLotter118['y'] = 0;
        var pwLotterde = gameData['selectArray'][pwLotter10];
        if (numberStartZero) {
            pwLotterde = pad(pwLotterde, 2)
        } else {
            pwLotterde = pad(pwLotterde + 1, 2)
        };
        for (var pwLotterdf = 0; pwLotterdf < gameData['ballsArray'][pwLotter10]['text']['length']; pwLotterdf++) {
            gameData['ballsArray'][0]['text'][pwLotterdf]['text'] = pwLotterde;
            gameData['ballsArray'][0]['rotate']['cache'](-30, -30, 120, 120)
        };
        var pwLotter119 = gameData['ballsArray'][0]['obj']['clone'](true);
        pwLotter119['scaleX'] = pwLotter119['scaleY'] = 1;
        pwLotter119['x'] = pwLotter56;
        pwLotter119['y'] = pwLotter57;
        pwLotter119['rotation'] = 0;
        var pwLotter11c = itemBallDim['clone']();
        pwLotter11c['x'] = pwLotter56;
        pwLotter11c['y'] = pwLotter57;
        pwLotter11c['active'] = true;
        pwLotter11c['selectNumber'] = gameData['selectArray'][pwLotter10];
        gameData['dimArray']['push'](pwLotter11c);
        pwLotter56 += pwLotterea;
        ballsSelectContainer['addChild'](pwLotter119, pwLotter11c)
    };
    for (var pwLotterdf = 0; pwLotterdf < gameData['ballsArray'][pwLotter10]['text']['length']; pwLotterdf++) {
        gameData['ballsArray'][0]['text'][pwLotterdf]['text'] = pwLotter11b;
        gameData['ballsArray'][0]['rotate']['cache'](-30, -30, 120, 120)
    }
}

function matchWinBalls(pwLotterf9) {
    var pwLotter11e = gameData['matchNum'];
    for (var pwLotter10 = 0; pwLotter10 < gameData['selectArray']['length']; pwLotter10++) {
        if (gameData['dimArray'][pwLotter10]['selectNumber'] == pwLotterf9) {
            if (gameData['dimArray'][pwLotter10]['active']) {
                gameData['matchNum']++;
                gameData['dimArray'][pwLotter10]['active'] = false;
                animateHighlight(gameData['dimArray'][pwLotter10])
            }
        }
    };
    if (pwLotter11e == gameData['matchNum']) {
        return
    };
    var pwLottera6 = bonusBall == true ? 1 : 0;
    var pwLotter11f = score_arr['length'] + pwLottera6;
    pwLotter11f--;
    for (var pwLotter10 = 0; pwLotter10 < score_arr['length']; pwLotter10++) {
        if (gameData['matchNum'] == pwLotter10) {
            var pwLotter120 = pwLotter11f - pwLotter10;
            if (bonusBall && gameData['matchNum'] == (score_arr['length'] - 1)) {
                if (gameData['winArray']['length'] > score_arr['length']) {} else {
                    pwLotter120 = 0
                }
            };
            TweenMax['to']($['prize']['bg' + pwLotter120], 1, {
                overwrite: true,
                onComplete: animatePrize,
                onCompleteParams: [pwLotter120]
            })
        }
    }
}

function animatePrize(pw9) {
    var pwLottera6 = bonusBall == true ? 1 : 0;
    for (var pwLotter10 = 0; pwLotter10 < score_arr['length'] + pwLottera6; pwLotter10++) {
        $['prize']['bg' + pwLotter10]['alpha'] = 1;
        $['prize']['bgselect' + pwLotter10]['alpha'] = 1;
        $['prize']['text' + pwLotter10]['color'] = $['prize']['score' + pwLotter10]['color'] = '#8d6d2c'
    };
    playSound('soundWin');
    animateHighlight($['prize']['bg' + pw9]);
    $['prize']['text' + pw9]['color'] = $['prize']['score' + pw9]['color'] = '#fff';
    playerData['score'] = $['prize']['score' + pw9]['score']
}

function animateHighlight(pwLotter5c) {
    TweenMax['to'](pwLotter5c, 0.1, {
        alpha: 0.2,
        overwrite: true,
        onComplete: function () {
            TweenMax['to'](pwLotter5c, 0.1, {
                alpha: 1,
                overwrite: true,
                onComplete: function () {
                    TweenMax['to'](pwLotter5c, 0.1, {
                        alpha: 0.2,
                        overwrite: true,
                        onComplete: function () {
                            TweenMax['to'](pwLotter5c, 0.1, {
                                alpha: 1,
                                overwrite: true,
                                onComplete: function () {
                                    TweenMax['to'](pwLotter5c, 0.1, {
                                        alpha: 0,
                                        overwrite: true,
                                        onComplete: function () {}
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function endGame() {
    TweenMax['to'](radiusTweenData, spinEndSpeed, {
        radius: 0,
        overwrite: true
    });
    TweenMax['to'](soundTweenData, spinEndSpeed, {
        volume: 0.1,
        overwrite: true,
        onUpdate: updateBallsVolume
    });
    TweenMax['to'](ballsContainer, 4, {
        overwrite: true,
        onComplete: function () {
            if (typeof memberData != 'undefined' && memberSettings['enableMembership']) {
                updateUserPoint('proceedGoResult')
            } else {
                goPage('result')
            }
        }
    })
}

function proceedGoResult() {
    goPage('result')
}

function createPercentage() {
    gameData['percentageArray'] = [];
    var pwLottera6 = bonusBall == true ? 1 : 0;
    var pwLottera7 = score_arr['length'] + pwLottera6;
    var totalBall = 0;
    var pwLotter126 = 0;
    var pwLotter127 = false;
    for (var pwLotter10 = 0; pwLotter10 < score_arr['length'] + pwLottera6; pwLotter10++) {
        pwLotter127 = false;
        if (bonusBall) {
            if (pwLotter10 == 0) {
                pwLottera7--;
                totalBall = pwLottera7;
                pwLotter126 = score_arr[pwLottera7 - 1]['percent']
            } else {
                if (pwLotter10 == 1) {
                    totalBall = pwLottera7;
                    pwLotter126 = bonusScore[0]['percent'];
                    pwLottera7++;
                    pwLotter127 = true
                } else {
                    totalBall = pwLottera7;
                    pwLotter126 = score_arr[pwLottera7 - 1]['percent']
                }
            }
        } else {
            totalBall = pwLottera7;
            pwLotter126 = score_arr[pwLottera7 - 1]['percent']
        };
        pwLottera7--;
        if (!isNaN(pwLotter126)) {
            if (pwLotter126 > 0) {
                for (var pwLotterdf = 0; pwLotterdf < pwLotter126; pwLotterdf++) {
                    gameData['percentageArray']['push']({
                        total: totalBall,
                        bonus: pwLotter127
                    })
                }
            }
        }
    };
    for (var pwLotter10 = gameData['percentageArray']['length']; pwLotter10 < 100; pwLotter10++) {
        gameData['percentageArray']['push']({
            total: 0,
            bonus: false
        })
    }
}

function getResultOnPercent() {
    shuffle(gameData['percentageArray']);
    var pwLotter129 = [];
    var pwLotter12a = [];
    for (var pwLotter10 = 0; pwLotter10 < gameData['selectArray']['length']; pwLotter10++) {
        pwLotter129['push'](gameData['selectArray'][pwLotter10])
    };
    shuffle(pwLotter129);
    var pwLottera6 = bonusBall == true ? 1 : 0;
    var pwLotter12b = 0;
    for (var pwLotter3b = 0; pwLotter3b < score_arr['length']; pwLotter3b++) {
        if (pwLotter129['indexOf'](gameData['numberArray'][pwLotter12b]) == -1) {
            gameData['revealArray']['push'](gameData['numberArray'][pwLotter12b])
        } else {
            pwLotter3b--
        };
        pwLotter12b++
    };
    var pwLotter12c = 0;
    if (gameData['percentageArray'][0]['total'] > 0) {
        for (var pwLotter10 = 0; pwLotter10 < gameData['percentageArray'][0]['total']; pwLotter10++) {
            gameData['revealArray'][pwLotter10] = pwLotter129[pwLotter10];
            if (gameData['percentageArray'][0]['bonus'] && pwLotter10 == gameData['percentageArray'][0]['total'] - 1) {
                pwLotter12c = pwLotter129[pwLotter10 + 1]
            }
        };
        shuffle(gameData['revealArray'])
    };
    if (pwLottera6) {
        if (gameData['percentageArray'][0]['bonus']) {
            gameData['revealArray']['push'](pwLotter12c)
        } else {
            for (var pwLotter3b = 0; pwLotter3b < 1; pwLotter3b++) {
                if (pwLotter129['indexOf'](gameData['numberArray'][pwLotter12b]) == -1) {
                    gameData['revealArray']['push'](gameData['numberArray'][pwLotter12b])
                } else {
                    pwLotter3b--
                };
                pwLotter12b++
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

function toggleSoundMute(pwLotter76) {
    buttonSoundOff['visible'] = false;
    buttonSoundOn['visible'] = false;
    toggleSoundInMute(pwLotter76);
    if (pwLotter76) {
        buttonSoundOn['visible'] = true
    } else {
        buttonSoundOff['visible'] = true
    }
}

function toggleMusicMute(pwLotter76) {
    buttonMusicOff['visible'] = false;
    buttonMusicOn['visible'] = false;
    toggleMusicInMute(pwLotter76);
    if (pwLotter76) {
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

function share(pwLotter132) {
    gtag('event', 'click', {
        'event_category': 'share',
        'event_label': pwLotter132
    });
    var pwLotter133 = location['href'];
    pwLotter133 = pwLotter133['substring'](0, pwLotter133['lastIndexOf']('/') + 1);
    var pwLotter134 = shareTitle;
    var pwLotter135 = shareMessage;
    pwLotter134 = shareTitle['replace']('[SCORE]', addCommas(playerData['score']));
    pwLotter135 = shareMessage['replace']('[SCORE]', addCommas(playerData['score']));
    var pwLotter136 = '';
    if (pwLotter132 == 'twitter') {
        pwLotter136 = 'https://twitter.com/intent/tweet?url=' + pwLotter133 + '&text=' + pwLotter135
    } else {
        if (pwLotter132 == 'facebook') {
            pwLotter136 = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pwLotter133 + 'share.php?desc=' + pwLotter135 + '&title=' + pwLotter134 + '&url=' + pwLotter133 + '&thumb=' + pwLotter133 + 'share.jpg&width=590&height=300')
        } else {
            if (pwLotter132 == 'google') {
                pwLotter136 = 'https://plus.google.com/share?url=' + pwLotter133
            } else {
                if (pwLotter132 == 'whatsapp') {
                    pwLotter136 = 'whatsapp://send?text=' + encodeURIComponent(pwLotter135) + ' - ' + encodeURIComponent(pwLotter133)
                }
            }
        }
    };
    window['open'](pwLotter136)
}
var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;

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
    initPhysics();
    if (typeof memberData != 'undefined' && memberSettings['enableMembership']) {
        buildMemberRewardCanvas()
    };
    readyGame();
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
        var pwLotter140 = ((stageW) * scalePercent);
        var pwLotter141 = ((stageH) * scalePercent);
        offset['left'] = 0;
        offset['top'] = 0;
        if (pwLotter140 > windowW) {
            offset['left'] = -((pwLotter140) - windowW)
        } else {
            offset['left'] = windowW - (pwLotter140)
        };
        if (pwLotter141 > windowH) {
            offset['top'] = -((pwLotter141) - windowH)
        } else {
            offset['top'] = windowH - (pwLotter141)
        };
        offset['x'] = 0;
        offset['y'] = 0;
        if (offset['left'] < 0) {
            offset['x'] = Math['abs']((offset['left'] / scalePercent) / 2)
        };
        if (offset['top'] < 0) {
            offset['y'] = Math['abs']((offset['top'] / scalePercent) / 2)
        };
        $('canvas')['css']('width', pwLotter140);
        $('canvas')['css']('height', pwLotter141);
        $('canvas')['css']('left', (offset['left'] / 2));
        $('canvas')['css']('top', (offset['top'] / 2));
        $(window)['scrollTop'](0);
        resizeCanvas();
        if (typeof resizeScore == 'function') {
            resizeScore()
        };
        if (typeof memberData != 'undefined' && memberSettings['enableMembership']) {
            resizeMemberReward()
        }
    }, 100)
}
var rotateInstruction = true;
var forPortrait = false;

function checkMobileEvent() {
    if ($['browser']['mobile'] || isTablet) {
        if (!rotateInstruction) {
            $('#canvasHolder')['show']();
            $('#rotateHolder')['hide']();
            return
        };
        $(window)['focus'](function () {
            checkMobileOrientation()
        });
        $(window)['off']('orientationchange')['on']('orientationchange', function (pwLotter8b) {
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
    var pwLotter146 = window['orientation'];
    var pwLotter147 = false;
    if (window['innerWidth'] > window['innerHeight']) {
        pwLotter147 = true
    };
    var pwLotter148 = false;
    if (!pwLotter147) {
        if (forPortrait) {
            pwLotter148 = true
        }
    } else {
        if (!forPortrait) {
            pwLotter148 = true
        }
    };
    if (!pwLotter148) {
        toggleRotate(true)
    } else {
        toggleRotate(false);
        $('#canvasHolder')['show']()
    }
}

function toggleRotate(pwLotter76) {
    if (pwLotter76) {
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
        src: 'assets/item_ball.png',
        id: 'itemBall'
    }, {
        src: 'assets/item_ball_dim.png',
        id: 'itemBallDim'
    }, {
        src: 'assets/item_ball_guess.png',
        id: 'itemBallGuess'
    }, {
        src: 'assets/item_ball_bonus.png',
        id: 'itemBallBonus'
    }, {
        src: 'assets/item_ball_hit.png',
        id: 'itemBallHit'
    }, {
        src: 'assets/item_ball_bg.png',
        id: 'itemBallBg'
    }, {
        src: 'assets/item_ball_shadow.png',
        id: 'itemBallShadow'
    }, {
        src: 'assets/item_sphere.png',
        id: 'itemSphere'
    }, {
        src: 'assets/item_stick.png',
        id: 'itemStick'
    }, {
        src: 'assets/item_shine.png',
        id: 'itemShine'
    }, {
        src: 'assets/item_bar.png',
        id: 'itemBar'
    }, {
        src: 'assets/item_bar_bonus.png',
        id: 'itemBarBonus'
    }, {
        src: 'assets/item_card.png',
        id: 'itemCard'
    }, {
        src: 'assets/item_number_bg.png',
        id: 'itemNumberBg'
    }, {
        src: 'assets/item_number_select_bg.png',
        id: 'itemNumberSelectBg'
    }, {
        src: 'assets/button_lucky.png',
        id: 'buttonLucky'
    }, {
        src: 'assets/button_sphere.png',
        id: 'buttonSphereStart'
    }, {
        src: 'assets/item_table.png',
        id: 'itemTable'
    }, {
        src: 'assets/item_prize_bg.png',
        id: 'itemPrizeBg'
    }, {
        src: 'assets/item_prize_select_bg.png',
        id: 'itemPrizeSelectBg'
    }, {
        src: 'assets/button_confirm.png',
        id: 'buttonConfirm'
    }, {
        src: 'assets/button_cancel.png',
        id: 'buttonCancel'
    }, {
        src: 'assets/item_exit.png',
        id: 'itemExit'
    }, {
        src: 'assets/item_result.png',
        id: 'itemResult'
    }, {
        src: 'assets/button_continue.png',
        id: 'buttonContinue'
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
        src: 'assets/button_exit.png',
        id: 'buttonExit'
    }, {
        src: 'assets/button_settings.png',
        id: 'buttonSettings'
    }, {
        src: 'assets/button_left.png',
        id: 'buttonLeft'
    }, {
        src: 'assets/button_right.png',
        id: 'buttonRight'
    }];
    if (typeof memberData != 'undefined' && memberSettings['enableMembership']) {
        addMemberRewardAssets()
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
            src: 'assets/sounds/click.ogg',
            id: 'soundClick'
        });
        manifest['push']({
            src: 'assets/sounds/balls.ogg',
            id: 'soundBalls'
        });
        manifest['push']({
            src: 'assets/sounds/reveal.ogg',
            id: 'soundReveal'
        });
        manifest['push']({
            src: 'assets/sounds/startspin.ogg',
            id: 'soundStartSpin'
        });
        manifest['push']({
            src: 'assets/sounds/win.ogg',
            id: 'soundWin'
        });
        manifest['push']({
            src: 'assets/sounds/suck.ogg',
            id: 'soundSuck'
        });
        manifest['push']({
            src: 'assets/sounds/complete.ogg',
            id: 'soundComplete'
        });
        manifest['push']({
            src: 'assets/sounds/number.ogg',
            id: 'soundNumber'
        });
        manifest['push']({
            src: 'assets/sounds/random.ogg',
            id: 'soundRandom'
        });
        manifest['push']({
            src: 'assets/sounds/cage.ogg',
            id: 'soundCage'
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

function fileComplete(pwLotter11) {
    var pwLotter14c = pwLotter11['item']
}

function handleFileError(pwLotter11) {
    console['log']('error ', pwLotter11)
}

function handleProgress() {
    $('#mainLoader span')['html'](Math['round'](loader['progress'] / 1 * 100) + '%')
}

function handleComplete() {
    toggleLoader(false);
    initMain()
}

function toggleLoader(pwLotter76) {
    if (pwLotter76) {
        $('#mainLoader')['show']()
    } else {
        $('#mainLoader')['hide']()
    }
}
var stageWidth, stageHeight = 0;
var isLoaded = false;
$(function () {
    var pwLotter152 = function () {
        try {
            if (createjs['WebAudioPlugin']['context']['state'] === 'suspended') {
                createjs['WebAudioPlugin']['context']['resume']();
                window['removeEventListener']('click', pwLotter152)
            }
        } catch (e) {
            console['error']('There was an error while trying to resume the SoundJS Web Audio context...');
            console['error'](e)
        }
    };
    window['addEventListener']('click', pwLotter152);
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
    var pwLotter157 = document['createElement']('canvas');
    if (pwLotter157['getContext']) {
        browserSupport = true
    };
    if (browserSupport) {
        if (!isLoaded) {
            isLoaded = true;
            if (typeof memberData != 'undefined' && memberSettings['enableMembership']) {
                initGameSettings()
            } else {
                initPreload()
            }
        }
    } else {
        $('#notSupportHolder')['show']()
    }
}