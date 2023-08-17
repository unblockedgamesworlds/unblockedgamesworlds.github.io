/**
 * @return {undefined}
 */
function initSplash() {
	/** @type {string} */
	gameState = "splash";
	resizeCanvas();
	
	initGame();
}
/**
 * @return {undefined}
 */
function initGame() {
	var need_pause = false;
	saver = new Utils.saver();
	var restored_data = saver.restoreAll();
	/** @type {string} */
	if (restored_data.gameState == 'gameEnd') {
		restored_data = {};
	}
	gameState = restored_data.gameState || "game";
	/** @type {number} */
	gameTouchState = restored_data.gameTouchState || 0;
	/** @type {number} */
	shotsSinceLastPot = restored_data.shotsSinceLastPot || 1;
	gameTimer = restored_data.gameTimer || startTime;
	/** @type {number} */
	streak = restored_data.streak || 0;
	/** @type {number} */
	levelNum = restored_data.levelNum || 0;

	userInput.addHitArea("pause", butEventHandler, null, "rect", {
		aRect: [0, 0, 55, 55]
	}, true);
	userInput.addHitArea("timer", butEventHandler, null, "rect", {
		aRect: [420-55, 0, canvas.width-55, 55]
	}, true);
	userInput.addHitArea("gameTouch", butEventHandler, {
		isDraggable: true,
		multiTouch: true
	}, "rect", {
		aRect: [0, 0, canvas.width, canvas.height]
	}, true);
	hud = new Elements.Hud(assetLib.getData("hud"), assetLib.getData("timeNumbers"), assetLib.getData("tableNumbers"), restored_data.hud || {
		racks: 1,
		score: 0,
		multiplier: 10,
		balls: 0,
		streak: streak
	});
	hud.setTime(startTime);
	/** @type {Array} */
	var r = new Array;
	/** @type {Array} */
	aBalls = new Array;
	/** @type {Array} */
	aHoles = new Array;
	/** @type {number} */
	var startData = aLevelData[levelNum].aData;
	var i = 0;
	for (; i < startData.length; i++) {
		switch (startData[i].type) {
			case "cueBall": 
				if (restored_data.cueBall) break;
				cueBall = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {oData: {
					id: "cueBall",
					type: "cueBall",
					x: startData[i].p0.x,
					y: startData[i].p0.y
				}}, ballCallback, canvas.width, canvas.height);
				aBalls.push(cueBall);
				break;
			case "hole":
				aHoles.push({
					x: startData[i].p0.x,
					y: startData[i].p0.y
				});
				break;
			case "ball":
				if (restored_data.aBalls) break;
				var copies = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {oData: {
					id: "ball" + i,
					type: "ball",
					x: startData[i].p0.x,
					y: startData[i].p0.y
				}}, ballCallback, canvas.width, canvas.height);
				aBalls.push(copies);
				break;
			case "wall":
				r.push({
					p0: startData[i].p0,
					p1: startData[i].p1,
					b: 1,
					f: 1
				});
				break;
		}
	}
	if (restored_data.aBalls && restored_data.cueBall) {
		aBalls = [];
		if (restored_data.cueBall.state == 'indicating') {
			restored_data.cueBall.state = 'waiting';
		}
		cueBall = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), restored_data.cueBall, ballCallback, canvas.width, canvas.height);
		aBalls.push(cueBall);
		for (var i = 0; i < restored_data.aBalls.length; i++) {
			var new_ball = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), restored_data.aBalls[i], ballCallback, canvas.width, canvas.height);
			aBalls.push(new_ball);
		}
		if (gameState == 'game') {
			need_pause = true;
		}
	}
	oPosData = {
		prevBallX: cueBall.oData.x,
		prevBallY: cueBall.oData.y,
		stageX: -(levelWidth - canvas.width) / 2,
		stageY: -(levelHeight - canvas.height) / 2,
		targStageX: -(levelWidth - canvas.width) / 2,
		targStageY: -(levelHeight - canvas.height) / 2,
		startDragX: 0,
		startDragY: 0,
		startStageX: 0,
		startStageY: 0
	};
	linePredictor = new Utils.LinePredictor(r, aBalls, cueBall);
	table = new Elements.Table(assetLib.getData("table"), canvas.width, canvas.height);
	arrow = new Elements.Arrow(assetLib.getData("arrow"), assetLib.getData("cue"), canvas.width, canvas.height);
	aimX = targAimX = cueBall.startX;
	aimY = targAimY = cueBall.startY + oPosData.stageY;
	/** @type {boolean} */
	isBreakOff = true;
	oBonusData = {
		secType: 0,
		x: 0,
		y: 0,
		scale: 1,
		life: 0
	};
	physics2D = new Utils.Physics2D(r, aBalls);
	hideNewRackIntro(this);
	/** @type {number} */
	previousTime = (new Date).getTime();
	updateGameEvent();
	
	if (need_pause) {
		butEventHandler("pause");
	}
}
/**
 * @return {undefined}
 */
function initNewRack() {
	/** @type {number} */
	levelNum = (levelNum + 1) % aLevelData.length;
	hud.oData.racks++;
	gameTimer += 15;
	/** @type {Array} */
	aBalls = new Array;
	/** @type {number} */
	var i = 0;
	for (; i < aLevelData[levelNum].aData.length; i++) {
		if ("cueBall" == aLevelData[levelNum].aData[i].type) {
			cueBall = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {oData: {
				id: "cueBall",
				type: "cueBall",
				x: aLevelData[levelNum].aData[i].p0.x,
				y: aLevelData[levelNum].aData[i].p0.y
			}}, ballCallback, canvas.width, canvas.height);
			aBalls.push(cueBall);
		} else {
			if ("ball" == aLevelData[levelNum].aData[i].type) {
				var copies = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {oData: {
					id: "ball" + i,
					type: "ball",
					x: aLevelData[levelNum].aData[i].p0.x,
					y: aLevelData[levelNum].aData[i].p0.y
				}}, ballCallback, canvas.width, canvas.height);
				aBalls.push(copies);
			}
		}
	}
	/** @type {number} */
	gameTouchState = 0;
	oPosData = {
		prevBallX: cueBall.oData.x,
		prevBallY: cueBall.oData.y,
		stageX: -(levelWidth - canvas.width) / 2,
		stageY: -(levelHeight - canvas.height) / 2,
		targStageX: -(levelWidth - canvas.width) / 2,
		targStageY: -(levelHeight - canvas.height) / 2,
		startDragX: 0,
		startDragY: 0,
		startStageX: 0,
		startStageY: 0
	};
	aimX = targAimX = cueBall.startX;
	aimY = targAimY = cueBall.startY + oPosData.stageY;
	/** @type {boolean} */
	isBreakOff = true;
	oBonusData = {
		secType: 0,
		x: 0,
		y: 0,
		scale: 1,
		life: 0
	};
	arrow.renderFunc = arrow.renderAim;
	/** @type {Array} */
	linePredictor.aBalls = aBalls;
	linePredictor.cueBall = cueBall;
	/** @type {Array} */
	physics2D.aBalls = aBalls;
	showNewRackIntro();
}
/**
 * @return {undefined}
 */
function showNewRackIntro() {
	/** @type {boolean} */
	newRackStart = true;
	/** @type {number} */
	newRackY = -400;
	TweenLite.to(this, 0.5, {
		newRackY: 0,
		ease: "Back.easeOut",
		/** @type {function (Object): undefined} */
		onComplete: hideNewRackIntro,
		onCompleteParams: [this]
	});
}
/**
 * @param {Object} dataAndEvents
 * @return {undefined}
 */
function hideNewRackIntro(dataAndEvents) {
	/** @type {boolean} */
	newRackStart = true;
	/** @type {number} */
	newRackY = 0;
	TweenLite.to(dataAndEvents, 0.5, {
		delay: 0.5,
		newRackY: 800,
		ease: "Back.easeIn",
		/**
		 * @return {undefined}
		 */
		onComplete: function () {
			/** @type {boolean} */
			newRackStart = false;
		}
	});
}
/**
 * @param {?} perform
 * @param {?} state
 * @return {?}
 */
function butEventHandler(perform, state) {
	switch (perform) {
	case "startGame":
		userInput.removeHitArea("startGame");
		initGame();
		break;
	case "gameTouch":
		if (gameTouchState >= 3) {
			return;
		}
		if (state.isBeingDragged && !state.hasLeft) {
			if (2 == gameTouchState) {
				targAimX = state.x;
				targAimY = state.y;
			}
			/** @type {number} */
			arrow.alpha = 1;
		} else {
			if (state.isDown) {
				TweenLite.killTweensOf(oPosData);
				toggleHudButs(false);
				if (state.x < cueBall.x + 40) {
					if (state.x > cueBall.x - 40) {
						if (state.y < cueBall.y + 40) {
							if (state.y > cueBall.y - 40) {
								/** @type {number} */
								gameTouchState = 2;
								aimX = targAimX = state.x;
								aimY = targAimY = state.y;
								cueBall.changeState("aiming");
							}
						}
					}
				}
				/** @type {number} */
				arrow.alpha = state.hasLeft ? 0.5 : 1;
			} else {
				if (toggleHudButs(true), 2 == gameTouchState && arrow.scaleX > 0.05) {
					return gameTouchState = 3, void arrow.takeShot(cueBall);
				}
				/** @type {number} */
				gameTouchState = 0;
				if ("waiting" != cueBall.state) {
					cueBall.changeState("waiting");
				}
			}
		}
		break;
	case "quitFromEndLevel":
		userInput.removeHitArea("quitFromEndLevel");
		userInput.removeHitArea("nextGame");
		userInput.removeHitArea("moreGames");
		initStartScreen();
		break;
	case "nextGame":
		saver.clearAll();
		userInput.removeHitArea("quitFromEndLevel");
		userInput.removeHitArea("nextGame");
		userInput.removeHitArea("moreGames");
		initGame();
		break;
	case "timer":
		toggleTimer();
		break;
	case "pause":
		;
	case "resumeFromPause":
		toggleManualPause();
		break;
	case "quitFromPause":
		toggleManualPause();
		userInput.removeHitArea("timer");
		userInput.removeHitArea("pause");
		userInput.removeHitArea("gameTouch");
		userInput.removeHitArea("quitFromPause");
		userInput.removeHitArea("resumeFromPause");
		userInput.removeHitArea("moreGamesFromPause");
		initStartScreen();
	}
}
/**
 * @param {?} points
 * @return {undefined}
 */
function updateScore(points) {
	hud.oData.score += points;
}
/**
 * @return {undefined}
 */
function initGameEnd() {
	/** @type {string} */
	try {SocialModuleInstance && SocialModuleInstance.showSocial();} catch(e) {}
	gameState = "gameEnd";

	userInput.removeHitArea("timer");
	userInput.removeHitArea("pause");
	userInput.removeHitArea("gameTouch");
	var attributes = {
		oImgData: assetLib.getData("uiButs"),
		aPos: [345, 715],
		id: "play"
	};
	userInput.addHitArea("nextGame", butEventHandler, null, "image", attributes);
	/** @type {Array} */
	var record = new Array(attributes);
	panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), gameState, record, canvas.width, canvas.height);
	panel.oScoreData = hud.oData;
	panel.startTweenEndLevel();
	/** @type {number} */
	previousTime = (new Date).getTime();
	updateGameEndEvent();
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function isNearHole(a, b) {
	/** @type {number} */
	var z0 = a.trackX - b.x;
	/** @type {number} */
	var z1 = a.trackY - b.y;
	/** @type {number} */
	var s = z0 * z0 + z1 * z1;
	return 750 > s ? ("cueBall" != a.oData.type ? (curPotScore = 10 * hud.oData.multiplier, hud.oData.score += curPotScore, ++streak > hud.oData.streak && (hud.oData.streak = streak), hud.oData.multiplier += 1, (!disabledTimer && (gameTimer += 5)), shotsSinceLastPot = 0, hud.oData.balls++) : (hud.oData.multiplier = 10, (!disabledTimer && (gameTimer -= 10))), true) : false;
}
/**
 * @param {boolean} recurring
 * @return {undefined}
 */
function toggleHudButs(recurring) {
	if (recurring) {
		userInput.addHitArea("pause", butEventHandler, null, "rect", {
			aRect: [0, 0, 55, 55]
		}, true);
		userInput.addHitArea("timer", butEventHandler, null, "rect", {
			aRect: [420-55, 0, canvas.width-55, 55]
		}, true);
		userInput.addHitArea("gameTouch", butEventHandler, {
			isDraggable: true,
			multiTouch: true
		}, "rect", {
			aRect: [0, 0, canvas.width, canvas.height]
		}, true);
	} else {
		userInput.removeHitArea("pause");
	}
}
/**
 * @param {?} dataAndEvents
 * @param {(Function|number)} io
 * @return {undefined}
 */
function ballCallback(dataAndEvents, io) {
	switch ("undefined" == typeof io && (io = null), dataAndEvents) {
	case "moveEnded":
		/** @type {boolean} */
		var e = true;
		/** @type {number} */
		var i = 0;
		for (; i < aBalls.length; i++) {
			if ("moving" == aBalls[i].state) {
				/** @type {boolean} */
				e = false;
				break;
			}
		}
		if (e) {
			/** @type {boolean} */
			var s = true;
			/** @type {number} */
			i = 0;
			for (; i < aBalls.length; i++) {
				if ("waiting" == aBalls[i].state && "cueBall" != aBalls[i].oData.type || 1 == aBalls.length) {
					/** @type {boolean} */
					s = false;
					break;
				}
			}
			if (s) {
				return;
			}
			/** @type {number} */
			i = 0;
			for (; i < aBalls.length; i++) {
				if ("waiting" == aBalls[i].state) {
					if ("cueBall" == aBalls[i].oData.type) {
						aBalls[i].changeState("indicating");
					}
				}
			}
			aimX = targAimX = cueBall.x;
			aimY = targAimY = cueBall.y;
			arrow.renderFunc = arrow.renderAim;
			/** @type {number} */
			gameTouchState = 0;
			oPosData.prevBallX = cueBall.trackX;
			oPosData.prevBallY = cueBall.trackY;
			if (shotsSinceLastPot > 0) {
				/** @type {number} */
				hud.oData.multiplier = 10;
				/** @type {number} */
				streak = 0;
			}
			setRandomBonus();
			shotsSinceLastPot++;
		}
		break;
	case "holeEnded":
		/** @type {number} */
		i = 0;
		for (; i < aBalls.length; i++) {
			if (aBalls[i].removeMe) {
				if (!("cueBall" == aBalls[i].oData.type && aBalls.length > 1)) {
					aBalls.splice(i, 1);
					break;
				}
				/** @type {boolean} */
				var o = false;
				/** @type {number} */
				var r = 0;
				var startCueBallPos = {x: 0, y: 0};
				for (var j = 0; j < aLevelData[levelNum].aData.length; j++) {
					if (aLevelData[levelNum].aData[j].type == "cueBall") {
						startCueBallPos = aLevelData[levelNum].aData[j].p0;
						break;
					}
				}
				var startX = startCueBallPos.x;//aBalls[i].startX;
				var mouseY = startCueBallPos.y;//aBalls[i].startY;
				for (; !o;) {
					/** @type {number} */
					var i3 = 0;
					for (; i3 < aBalls.length; i3++) {
						if (startX > aBalls[i3].trackX - aBalls[i3].radius && (startX < aBalls[i3].trackX + aBalls[i3].radius && (mouseY > aBalls[i3].trackY - aBalls[i3].radius && mouseY < aBalls[i3].trackY + aBalls[i3].radius))) {
							/** @type {number} */
							startX = aBalls[i].startX + 160 * Math.random() - 80;
							/** @type {number} */
							mouseY = aBalls[i].startY + 160 * Math.random() - 80;
							/** @type {boolean} */
							o = false;
							break;
						}
						/** @type {boolean} */
						o = true;
					}
					if (++r >= 200) {
						/** @type {boolean} */
						o = true;
					}
				}
				aBalls[i].changeState("reset", {
					x: startX,
					y: mouseY
				});
				aBalls[i].changeState("indicating");
				aimX = targAimX = cueBall.x;
				aimY = targAimY = cueBall.y;
			}
		}
		if (1 == aBalls.length) {
			initNewRack();
		};
	}
}
/**
 * @return {undefined}
 */
function setRandomBonus() {
	if (0 == oBonusData.secType) {
		if (!disabledTimer && 5 * Math.random() < 1) {
			/** @type {number} */
			oBonusData.secType = Math.ceil(3 * Math.random());
			/** @type {number} */
			oBonusData.scale = 0;
			/** @type {number} */
			oBonusData.life = Math.ceil(3 * Math.random()) + 1;
			/** @type {boolean} */
			var t = false;
			/** @type {number} */
			var a = 0;
			/** @type {number} */
			var lon = 160 * Math.random() + 160;
			/** @type {number} */
			var cy = 480 * Math.random() + 160;
			for (; !t;) {
				if (lon > cueBall.x - 70 && (lon < cueBall.x + 70 && (cy > cueBall.y - 70 && cy < cueBall.x + 70))) {
					/** @type {number} */
					lon = 160 * Math.random() + 160;
					/** @type {number} */
					cy = 480 * Math.random() + 160;
					/** @type {boolean} */
					t = false;
					break;
				}
				/** @type {boolean} */
				t = true;
				if (++a >= 200) {
					/** @type {boolean} */
					t = true;
				}
			}
			/** @type {number} */
			oBonusData.x = lon;
			/** @type {number} */
			oBonusData.y = cy;
			TweenLite.to(oBonusData, 1, {
				scale: 1,
				ease: "Elastic.easeOut"
			});
		}
	} else {
		if (--oBonusData.life <= 0) {
			TweenLite.to(oBonusData, 0.5, {
				scale: 0,
				ease: "Quad.easeIn",
				/**
				 * @return {undefined}
				 */
				onComplete: function () {
					/** @type {number} */
					oBonusData.secType = 0;
				}
			});
		}
	}
}
/**
 * @return {undefined}
 */
function updateGameEvent() {
	if (!manualPause && (!rotatePause && "game" == gameState)) {
		var dt = getDelta();
		if (2 == gameTouchState ? (aimX = targAimX, aimY = targAimY) : oPosData.targStageY = 0, table.update(oPosData.stageX, oPosData.stageY, dt), table.render(ctx), 3 == gameTouchState && physics2D.update(dt), (!disabledTimer && (gameTimer -= dt)), hud.setTime(gameTimer), 0 > gameTimer && initGameEnd(), oBonusData.secType > 0) {
			/** @type {number} */
			var sectionLength = oBonusData.secType - 1;
			var img = assetLib.getData("bonus");
			/** @type {number} */
			var startX = sectionLength * img.oData.spriteWidth % img.img.width;
			/** @type {number} */
			var offsetY = Math.floor(sectionLength / (img.img.width / img.oData.spriteWidth)) * img.oData.spriteHeight;
			ctx.drawImage(img.img, startX, offsetY, img.oData.spriteWidth, img.oData.spriteHeight, oBonusData.x - img.oData.spriteWidth / 2 * oBonusData.scale, oBonusData.y - img.oData.spriteHeight / 2 * oBonusData.scale, img.oData.spriteWidth * oBonusData.scale, img.oData.spriteHeight * oBonusData.scale);
			if (oBonusData.secType < 4) {
				if (cueBall.x > oBonusData.x - 35) {
					if (cueBall.x < oBonusData.x + 35) {
						if (cueBall.y > oBonusData.y - 35) {
							if (cueBall.y < oBonusData.y + 35) {
								if (!disabledTimer) {
									gameTimer += 5 * oBonusData.secType;
								}
								/** @type {number} */
								oBonusData.secType = 4;
								/** @type {number} */
								oBonusData.scale = 3;
								TweenLite.to(oBonusData, 0.3, {
									scale: 0,
									ease: "Cubic.easeOut",
									/**
									 * @return {undefined}
									 */
									onComplete: function () {
										/** @type {number} */
										oBonusData.secType = 0;
									}
								});
							}
						}
					}
				}
			}
		}
		/** @type {number} */
		var id = 0;
		for (; id < aBalls.length; id++) {
			/** @type {number} */
			var i = 0;
			for (; i < aHoles.length; i++) {
				if ("moving" == aBalls[id].state && isNearHole(aBalls[id], aHoles[i])) {
					aBalls[id].changeState("holed", {
						x: aHoles[i].x,
						y: aHoles[i].y,
						score: curPotScore
					});
					break;
				}
			}
			aBalls[id].update(oPosData.stageX, oPosData.stageY, dt);
			renderSprite(aBalls[id]);
		}
		if (3 != gameTouchState && arrow.update(cueBall.x, cueBall.y, aimX, aimY, linePredictor.checkLine(cueBall.x, cueBall.y, aimX, aimY, oPosData.stageY), dt), arrow.render(ctx), newRackStart) {
			img = assetLib.getData("panels");
			/** @type {number} */
			sectionLength = 4;
			if (levelNum > 0) {
				/** @type {number} */
				sectionLength = 5;
			}
			/** @type {number} */
			startX = sectionLength * img.oData.spriteWidth % img.img.width;
			/** @type {number} */
			offsetY = Math.floor(sectionLength / (img.img.width / img.oData.spriteWidth)) * img.oData.spriteHeight;
			ctx.drawImage(img.img, startX, offsetY, img.oData.spriteWidth, img.oData.spriteHeight, 0, 0 + newRackY, img.oData.spriteWidth, img.oData.spriteHeight);
		}
		saver.saveAll();
		hud.update(oPosData.stageX, oPosData.stageY, dt);
		renderTimerBut();
		hud.render(ctx);
		requestAnimFrame(updateGameEvent);
	}
}
/**
 * @return {undefined}
 */
function updateGameEndEvent() {
	if (!rotatePause && "gameEnd" == gameState) {
		var dt = getDelta();
		panel.update(dt);
		panel.render(ctx);
		requestAnimFrame(updateGameEndEvent);
	}
}
/**
 * @return {?}
 */
function updateSplashScreenEvent() {
	if (!rotatePause && "splash" == gameState) {
		var dt = getDelta();
		if (splashTimer += dt, splashTimer > 2.5) {
			return void initStartScreen();
		}
		splash.render(ctx, dt);
		requestAnimFrame(updateSplashScreenEvent);
	}
}
/**
 * @return {?}
 */
function getDelta() {
	/** @type {number} */
	var time = (new Date).getTime();
	/** @type {number} */
	var s = (time - previousTime) / 1E3;
	return previousTime = time, s > 0.5 && (s = 0), s;
}
/**
 * @param {Object} obj
 * @return {undefined}
 */
function renderSprite(obj) {
	ctx.save();
	ctx.translate(obj.x, obj.y);
	ctx.rotate(obj.rotation);
	ctx.globalAlpha = obj.alpha;
	ctx.scale(obj.scaleX, obj.scaleY);
	obj.render(ctx);
	ctx.restore();
}
/**
 * @param {Object} me
 * @param {Object} point
 * @return {?}
 */
function checkSpriteCollision(me, point) {
	var cx = me.x;
	var cy = me.y;
	var px = point.x;
	var py = point.y;
	/** @type {number} */
	var b = (cx - px) * (cx - px) + (cy - py) * (cy - py);
	/** @type {number} */
	var a = me.radius * point.radius;
	return a > b ? true : false;
}
/**
 * @param {Object} item
 * @param {Array} options
 * @return {?}
 */
function getScaleImageToMax(item, options) {
	var e;
	return e = item.isSpriteSheet ? options[0] / item.oData.spriteWidth < options[1] / item.oData.spriteHeight ? Math.min(options[0] / item.oData.spriteWidth, 1) : Math.min(options[1] / item.oData.spriteHeight, 1) : options[0] / item.img.width < options[1] / item.img.height ? Math.min(options[0] / item.img.width, 1) : Math.min(options[1] / item.img.height, 1);
}
/**
 * @param {Array} dataAndEvents
 * @param {?} oInfo
 * @param {number} deepDataAndEvents
 * @return {?}
 */
function getCentreFromTopLeft(dataAndEvents, oInfo, deepDataAndEvents) {
	/** @type {Array} */
	var grafsOut = new Array;
	return grafsOut.push(dataAndEvents[0] + oInfo.oData.spriteWidth / 2 * deepDataAndEvents), grafsOut.push(dataAndEvents[1] + oInfo.oData.spriteHeight / 2 * deepDataAndEvents), grafsOut;
}
/**
 * @return {undefined}
 */
function loadPreAssets() {
	curLang = aLangs[0];
	preAssetLib = new Utils.AssetLoader(curLang, [{
		id: "preloadImage",
		file: "images/preloadImage.jpg"
  }], ctx, canvas.width, canvas.height, false);
	preAssetLib.onReady(initLoadAssets);
}
/**
 * @return {undefined}
 */
function initLoadAssets() {
	var img = preAssetLib.getData("preloadImage");
	ctx.drawImage(img.img, 0, 0);
	loadAssets();
}
/**
 * @return {undefined}
 */
function loadAssets() {
	assetLib = new Utils.AssetLoader(curLang, [{
		id: "background",
		file: "images/background.jpg"
  }, {
		id: "hud",
		file: "images/hud.png"
  }, {
		id: "uiButs",
		file: "images/uiButs.png",
		oAtlasData: {
			play: {
				x: 0,
				y: 0,
				width: 269,
				height: 161
			},
			back: {
				x: 225,
				y: 273,
				width: 172,
				height: 102
			}
		}
  }, {
		id: "panels",
		file: "images/panels_480x800.png"
  }, {
		id: "tableNumbers",
		file: "images/tableNumbers_14x22.png"
  }, {
		id: "timeNumbers",
		file: "images/timeNumbers_15x22.png"
  }, {
		id: "scoreNumbers",
		file: "images/scoreNumbers_40x51.png"
  }, {
		id: "muteBut",
		file: "images/mute_59x61.png"
  }, {
		id: "timerBut",
		file: "images/stopwatch.png"
  }, {
		id: "bonus",
		file: "images/bonus_72x76.png"
  }, {
		id: "ball",
		file: "images/balls_118x118.png",
		oAnims: {
			cueBallWaiting: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
			cueBallMoving: [19],
			ball0Waiting: [20],
			ball1Waiting: [21],
			ball2Waiting: [22],
			ball3Waiting: [23],
			ball4Waiting: [24],
			ball5Waiting: [25],
			ball6Waiting: [26],
			ball7Waiting: [27],
			ball8Waiting: [28],
			ball0Moving: [20],
			ball1Moving: [21],
			ball2Moving: [22],
			ball3Moving: [23],
			ball4Moving: [24],
			ball5Moving: [25],
			ball6Moving: [26],
			ball7Moving: [27],
			ball8Moving: [28],
			explode: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
		}
  }, {
		id: "table",
		file: "images/table.jpg"
  }, {
		id: "cue",
		file: "images/cue.png"
  }, {
		id: "arrow",
		file: "images/arrow_200x27.png"
  }], ctx, canvas.width, canvas.height);
	assetLib.onReady(initSplash);
}
/**
 * @return {undefined}
 */
function resizeCanvas() {
	/** @type {number} */
	var width = window.innerWidth;
	/** @type {number} */
	var height = window.innerHeight;
	if (width > 480) {
		width -= 1;
		height -= 1;
	}
	if (window.innerWidth > window.innerHeight && isMobile) {
		if ("loading" != gameState) {
			rotatePauseOn();
		}
		if (width / canvas.width < height / canvas.height) {
			/** @type {string} */
			canvas.style.width = width + "px";
			/** @type {string} */
			canvas.style.height = width / canvas.width * canvas.height + "px";
			/** @type {number} */
			canvasX = 0;
			/** @type {number} */
			canvasY = (height - width / canvas.width * canvas.height) / 2;
			/** @type {number} */
			canvasScaleX = canvasScaleY = canvas.width / width;
			/** @type {string} */
			div.style.marginTop = canvasY + "px";
			/** @type {string} */
			div.style.marginLeft = canvasX + "px";
		} else {
			/** @type {string} */
			canvas.style.width = height / canvas.height * canvas.width + "px";
			/** @type {string} */
			canvas.style.height = height + "px";
			/** @type {number} */
			canvasX = (width - height / canvas.height * canvas.width) / 2;
			/** @type {number} */
			canvasY = 0;
			/** @type {number} */
			canvasScaleX = canvasScaleY = canvas.height / height;
			/** @type {string} */
			div.style.marginTop = canvasY + "px";
			/** @type {string} */
			div.style.marginLeft = canvasX + "px";
		}
	} else {
		if (isMobile) {
			if (rotatePause) {
				rotatePauseOff();
			}
			if (width / canvas.width < height / canvas.height) {
				/** @type {string} */
				canvas.style.width = width + "px";
				/** @type {string} */
				canvas.style.height = width / canvas.width * canvas.height + "px";
				/** @type {number} */
				canvasX = 0;
				/** @type {number} */
				canvasY = (height - width / canvas.width * canvas.height) / 2;
				/** @type {number} */
				canvasScaleX = canvasScaleY = canvas.width / width;
				/** @type {string} */
				div.style.marginTop = canvasY + "px";
				/** @type {string} */
				div.style.marginLeft = canvasX + "px";
			} else {
				/** @type {string} */
				canvas.style.width = height / canvas.height * canvas.width + "px";
				/** @type {string} */
				canvas.style.height = height + "px";
				/** @type {number} */
				canvasX = (width - height / canvas.height * canvas.width) / 2;
				/** @type {number} */
				canvasY = 0;
				/** @type {number} */
				canvasScaleX = canvasScaleY = canvas.height / height;
				/** @type {string} */
				div.style.marginTop = canvasY + "px";
				/** @type {string} */
				div.style.marginLeft = canvasX + "px";
			}
		} else {
			if (rotatePause) {
				rotatePauseOff();
			}
			if (width / canvas.width < height / canvas.height) {
				/** @type {string} */
				canvas.style.width = width + "px";
				/** @type {string} */
				canvas.style.height = width / canvas.width * canvas.height + "px";
				/** @type {number} */
				canvasX = 0;
				/** @type {number} */
				canvasY = (height - width / canvas.width * canvas.height) / 2;
				/** @type {number} */
				canvasScaleX = canvasScaleY = canvas.width / width;
				/** @type {string} */
				div.style.marginTop = canvasY + "px";
				/** @type {string} */
				div.style.marginLeft = canvasX + "px";
			} else {
				/** @type {string} */
				canvas.style.width = height / canvas.height * canvas.width + "px";
				/** @type {string} */
				canvas.style.height = height + "px";
				/** @type {number} */
				canvasX = (width - height / canvas.height * canvas.width) / 2;
				/** @type {number} */
				canvasY = 0;
				/** @type {number} */
				canvasScaleX = canvasScaleY = canvas.height / height;
				/** @type {string} */
				div.style.marginTop = canvasY + "px";
				/** @type {string} */
				div.style.marginLeft = canvasX + "px";
			}
		}
	}
	userInput.setCanvas(canvasX, canvasY, canvasScaleX, canvasScaleY);
}

/**
 * @return {undefined}
 */
function toggleTimer() {
	/** @type {boolean} */
	disabledTimer = !disabledTimer;
	localStorage['disabledTimer'] = disabledTimer ? '1' : '0';
	if (!disabledTimer) {
		gameTimer = startTime;
	}
	renderTimerBut();
}

/**
 * @return {undefined}
 */
function renderTimerBut() {
	var img = assetLib.getData("timerBut");
	ctx.drawImage(img.img, disabledTimer ? img.img.width / 2 : 0, 0, img.oData.spriteWidth / 2, img.oData.spriteHeight, 366, 3, img.oData.spriteWidth / 2, img.oData.spriteHeight);
}
/**
 * @return {undefined}
 */
function toggleManualPause() {
	if (manualPause) {
		/** @type {boolean} */
		manualPause = false;
		userInput.removeHitArea("quitFromPause");
		userInput.removeHitArea("resumeFromPause");
		userInput.removeHitArea("moreGamesFromPause");
		pauseCoreOff();
	} else {
		/** @type {boolean} */
		manualPause = true;
		pauseCoreOn();
		var attributes = {
			oImgData: assetLib.getData("uiButs"),
			aPos: [canvas.width / 2, canvas.height / 2],
			id: "play"
		};
		/** @type {Array} */
		var record = new Array(attributes);
		userInput.addHitArea("resumeFromPause", butEventHandler, null, "image", attributes);
		panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), "pause", record, canvas.width, canvas.height);
		renderTimerBut();
		panel.render(ctx);
		userInput.addHitArea("pause", butEventHandler, null, "rect", {
			aRect: [0, 0, 55, 55]
		}, true);
	}
}
/**
 * @return {undefined}
 */
function rotatePauseOn() {
	/** @type {boolean} */
	rotatePause = true;
	ctx.drawImage(assetLib.getImg("rotateDeviceMessage"), 0, 0);
	/** @type {boolean} */
	userInput.pauseIsOn = true;
	pauseCoreOn();
}
/**
 * @return {undefined}
 */
function rotatePauseOff() {
	/** @type {boolean} */
	rotatePause = false;
	userInput.removeHitArea("quitFromPause");
	userInput.removeHitArea("resumeFromPause");
	userInput.removeHitArea("moreGamesFromPause");
	pauseCoreOff();
}
/**
 * @return {undefined}
 */
function pauseCoreOn() {
	switch (gameState) {
	case "game":
		userInput.removeHitArea("gameTouch");
		userInput.removeHitArea("timer");
		break;
	case "end":
		;
	}
}
/**
 * @return {undefined}
 */
function pauseCoreOff() {
	switch (previousTime = (new Date).getTime(), userInput.pauseIsOn = false, gameState) {
	case "splash":
		updateSplashScreenEvent();
		break;
	case "game":
		/** @type {boolean} */
		manualPause = false;
		userInput.addHitArea("gameTouch", butEventHandler, {
			isDraggable: true,
			multiTouch: true
		}, "rect", {
			aRect: [0, 0, canvas.width, canvas.height]
		}, true);
		userInput.addHitArea("timer", butEventHandler, null, "rect", {
			aRect: [420-55, 0, canvas.width-55, 55]
		}, true);
		updateGameEvent();
		break;
	case "gameEnd":
		initGameEnd();
	}
}
var Utils;
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} dataAndEvents
		 * @param {Array} codeSegments
		 * @param {Object} e
		 * @param {number} canvasWidth
		 * @param {Function} canvasHeight
		 * @param {boolean} io
		 * @return {undefined}
		 */
		function saver() {
			
		}
		return saver.prototype.saveAll = function (item) {
			var saved_aBalls = [];
			var saved_cueBall = null;
			var saved_hud = null;
			for (var i = 0; i < aBalls.length; i++) {
				var data = aBalls[i].getData();
				
				if (data.oData.type == 'cueBall') {
					saved_cueBall = data;
				}
				else if (data.oData.x != 0 && data.oData.y != 0) {
					saved_aBalls.push(data);
				}
			}
			localStorage['saved_aBalls'] = JSON.stringify(saved_aBalls);
			localStorage['saved_cueBall'] = JSON.stringify(saved_cueBall);
			localStorage['saved_levelNum'] = levelNum;
			localStorage['saved_hud'] = JSON.stringify(hud.oData);
			localStorage['saved_gameTimer'] = gameTimer;
			
			localStorage['saved_gameState'] = gameState;
			localStorage['saved_gameTouchState'] = gameTouchState;
			localStorage['saved_shotsSinceLastPot'] = shotsSinceLastPot;
			localStorage['saved_streak'] = streak;
		}, saver.prototype.restoreAll = function () {
			try {
				return {
					aBalls: JSON.parse(localStorage['saved_aBalls']),
					cueBall: JSON.parse(localStorage['saved_cueBall']),
					levelNum: localStorage['saved_levelNum'],
					hud: JSON.parse(localStorage['saved_hud']),
					gameTimer: localStorage['saved_gameTimer'],
					
					gameState: localStorage['saved_gameState'],
					gameTouchState: localStorage['saved_gameTouchState'],
					shotsSinceLastPot: localStorage['saved_shotsSinceLastPot'],
					streak: localStorage['saved_streak']
				};
			}
			catch (e) {
				return {};
			}
		}, saver.prototype.clearAll = function () {
			delete localStorage['saved_aBalls'];
			delete localStorage['saved_cueBall'];
			delete localStorage['saved_levelNum'];
			delete localStorage['saved_hud'];
			delete localStorage['saved_gameTimer'];
			delete localStorage['saved_gameState'];
			delete localStorage['saved_gameTouchState'];
			delete localStorage['saved_shotsSinceLastPot'];
			delete localStorage['saved_streak'];
		}, saver;
	}();
	eventHandle.saver = elem;
}(Utils || (Utils = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} dataAndEvents
		 * @param {Array} codeSegments
		 * @param {Object} e
		 * @param {number} canvasWidth
		 * @param {Function} canvasHeight
		 * @param {boolean} io
		 * @return {undefined}
		 */
		function canvas_onclick_func(dataAndEvents, codeSegments, e, canvasWidth, canvasHeight, io) {
			if ("undefined" == typeof io) {
				/** @type {boolean} */
				io = true;
			}
			this.oAssetData = {};
			/** @type {number} */
			this.assetsLoaded = 0;
			this.totalAssets = codeSegments.length;
			/** @type {Object} */
			this.ctx = e;
			/** @type {number} */
			this.canvasWidth = canvasWidth;
			/** @type {Function} */
			this.canvasHeight = canvasHeight;
			/** @type {boolean} */
			this.showBar = io;
			/** @type {number} */
			this.topLeftX = this.canvasWidth / 2 - canvasWidth / 4;
			/** @type {number} */
			this.topLeftY = 425;
			if (this.showBar) {
				/** @type {string} */
				ctx.strokeStyle = "#333646";
				/** @type {number} */
				ctx.lineWidth = 2;
				/** @type {string} */
				ctx.fillStyle = "#F5A343";
				ctx.moveTo(this.topLeftX, this.topLeftY);
				ctx.lineTo(this.topLeftX + canvasWidth / 2, this.topLeftY + 0);
				ctx.lineTo(this.topLeftX + canvasWidth / 2, this.topLeftY + 20);
				ctx.lineTo(this.topLeftX + 0, this.topLeftY + 20);
				ctx.lineTo(this.topLeftX + 0, this.topLeftY + 0);
				ctx.stroke();
			}
			/** @type {number} */
			var i = 0;
			for (; i < codeSegments.length; i++) {
				this.loadImage(codeSegments[i]);
			}
		}
		return canvas_onclick_func.prototype.loadImage = function (item) {
			var self = this;
			/** @type {Image} */
			var img = new Image;
			/**
			 * @return {undefined}
			 */
			img.onload = function () {
				self.oAssetData[item.id] = {};
				/** @type {Image} */
				self.oAssetData[item.id].img = img;
				self.oAssetData[item.id].oData = {};
				var spriteWidth = self.getSpriteSize(item.file);
				if (0 != spriteWidth[0]) {
					self.oAssetData[item.id].oData.spriteWidth = spriteWidth[0];
					self.oAssetData[item.id].oData.spriteHeight = spriteWidth[1];
				} else {
					self.oAssetData[item.id].oData.spriteWidth = self.oAssetData[item.id].img.width;
					self.oAssetData[item.id].oData.spriteHeight = self.oAssetData[item.id].img.height;
				}
				if (item.oAnims) {
					self.oAssetData[item.id].oData.oAnims = item.oAnims;
				}
				self.oAssetData[item.id].oData.oAtlasData = item.oAtlasData ? item.oAtlasData : {
					none: {
						x: 0,
						y: 0,
						width: self.oAssetData[item.id].oData.spriteWidth,
						height: self.oAssetData[item.id].oData.spriteHeight
					}
				};
				++self.assetsLoaded;
				if (self.showBar) {
					ctx.fillRect(self.topLeftX + 2, self.topLeftY + 2, (self.canvasWidth / 2 - 4) / self.totalAssets * self.assetsLoaded, 16);
				}
				self.checkLoadComplete();
			};
			img.src = item.file;
		}, canvas_onclick_func.prototype.getSpriteSize = function (tail) {
			/** @type {Array} */
			var other = new Array;
			/** @type {string} */
			var h = "";
			/** @type {string} */
			var str = "";
			/** @type {number} */
			var s = 0;
			var length = tail.lastIndexOf(".");
			/** @type {boolean} */
			var r = true;
			for (; r;) {
				length--;
				if (0 == s && this.isNumber(tail.charAt(length))) {
					h = tail.charAt(length) + h;
				} else {
					if (0 == s && (h.length > 0 && "x" == tail.charAt(length))) {
						length--;
						/** @type {number} */
						s = 1;
						str = tail.charAt(length) + str;
					} else {
						if (1 == s && this.isNumber(tail.charAt(length))) {
							str = tail.charAt(length) + str;
						} else {
							if (1 == s && (str.length > 0 && "_" == tail.charAt(length))) {
								/** @type {boolean} */
								r = false;
								/** @type {Array} */
								other = [parseInt(str), parseInt(h)];
							} else {
								/** @type {boolean} */
								r = false;
								/** @type {Array} */
								other = [0, 0];
							}
						}
					}
				}
			}
			return other;
		}, canvas_onclick_func.prototype.isNumber = function (n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}, canvas_onclick_func.prototype.checkLoadComplete = function () {
			if (this.assetsLoaded == this.totalAssets) {
				this.loadedCallback();
			}
		}, canvas_onclick_func.prototype.onReady = function (options) {
			/** @type {Function} */
			this.loadedCallback = options;
		}, canvas_onclick_func.prototype.getImg = function (key) {
			return this.oAssetData[key].img;
		}, canvas_onclick_func.prototype.getData = function (name) {
			return this.oAssetData[name];
		}, canvas_onclick_func;
	}();
	eventHandle.AssetLoader = elem;
}(Utils || (Utils = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} far
		 * @param {Blob} fps
		 * @param {Blob} radius
		 * @param {string} near
		 * @return {undefined}
		 */
		function Camera(far, fps, radius, near) {
			/** @type {number} */
			this.x = 0;
			/** @type {number} */
			this.y = 0;
			/** @type {number} */
			this.rotation = 0;
			/** @type {number} */
			this.radius = 10;
			/** @type {boolean} */
			this.removeMe = false;
			/** @type {number} */
			this.frameInc = 0;
			/** @type {string} */
			this.animType = "loop";
			/** @type {number} */
			this.offsetX = 0;
			/** @type {number} */
			this.offsetY = 0;
			/** @type {number} */
			this.scaleX = 1;
			/** @type {number} */
			this.scaleY = 1;
			this.oImgData = far;
			this.oAnims = this.oImgData.oData.oAnims;
			/** @type {Blob} */
			this.fps = fps;
			/** @type {Blob} */
			this.radius = radius;
			/** @type {string} */
			this.animId = near;
		}
		return Camera.prototype.updateAnimation = function (oldAnimation) {
			this.frameInc += this.fps * oldAnimation;
		}, Camera.prototype.resetAnim = function () {
			/** @type {number} */
			this.frameInc = 0;
		}, Camera.prototype.setFrame = function (args) {
			/** @type {number} */
			this.fixedFrame = args;
		}, Camera.prototype.setAnimType = function (callback, name, e) {
			switch ("undefined" == typeof e && (e = true), this.animId = name, this.animType = callback, e && this.resetAnim(), callback) {
			case "loop":
				break;
			case "once":
				/** @type {number} */
				this.maxIdx = this.oAnims[this.animId].length - 1;
			}
		}, Camera.prototype.render = function (ctx) {
			if (null != this.animId) {
				var spaces1 = this.oAnims[this.animId].length;
				/** @type {number} */
				var num1 = Math.floor(this.frameInc);
				var sectionLength = this.oAnims[this.animId][num1 % spaces1];
				/** @type {number} */
				var startX = sectionLength * this.oImgData.oData.spriteWidth % this.oImgData.img.width;
				/** @type {number} */
				var offsetY = Math.floor(sectionLength / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
				if ("once" == this.animType && num1 > this.maxIdx) {
					this.fixedFrame = this.oAnims[this.animId][spaces1 - 1];
					/** @type {null} */
					this.animId = null;
					this.animEndedFunc();
					/** @type {number} */
					startX = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
				}
			} else {
				/** @type {number} */
				startX = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
			}
			ctx.drawImage(this.oImgData.img, startX, offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight);
		}, Camera;
	}();
	eventHandle.AnimSprite = elem;
}(Utils || (Utils = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} far
		 * @param {Blob} radius
		 * @param {number} args
		 * @return {undefined}
		 */
		function Camera(far, radius, args) {
			if ("undefined" == typeof args) {
				/** @type {number} */
				args = 0;
			}
			/** @type {number} */
			this.x = 0;
			/** @type {number} */
			this.y = 0;
			/** @type {number} */
			this.rotation = 0;
			/** @type {number} */
			this.radius = 10;
			/** @type {boolean} */
			this.removeMe = false;
			/** @type {number} */
			this.offsetX = 0;
			/** @type {number} */
			this.offsetY = 0;
			/** @type {number} */
			this.scaleX = 1;
			/** @type {number} */
			this.scaleY = 1;
			this.oImgData = far;
			/** @type {Blob} */
			this.radius = radius;
			this.setFrame(args);
		}
		return Camera.prototype.setFrame = function (args) {
			/** @type {number} */
			this.frameNum = args;
		}, Camera.prototype.render = function (ctx) {
			/** @type {number} */
			var startX = this.frameNum * this.oImgData.oData.spriteWidth % this.oImgData.img.width;
			/** @type {number} */
			var offsetY = Math.floor(this.frameNum / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
			ctx.drawImage(this.oImgData.img, startX, offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight);
		}, Camera;
	}();
	eventHandle.BasicSprite = elem;
}(Utils || (Utils = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {HTMLElement} el
		 * @param {?} e
		 * @return {undefined}
		 */
		function onTouchStart(el, e) {
			var self = this;
			/** @type {number} */
			this.canvasX = 0;
			/** @type {number} */
			this.canvasY = 0;
			/** @type {number} */
			this.canvasScaleX = 1;
			/** @type {number} */
			this.canvasScaleY = 1;
			/** @type {number} */
			this.prevHitTime = 0;
			/** @type {boolean} */
			this.pauseIsOn = false;
			/** @type {boolean} */
			this.isDown = false;
			/** @type {boolean} */
			this.isDetectingKeys = false;
			this.isBugBrowser = e;
			el.addEventListener("touchstart", function (e) {
				/** @type {number} */
				var i = 0;
				for (; i < e.changedTouches.length; i++) {
					self.hitDown(e, e.changedTouches[i].pageX, e.changedTouches[i].pageY, e.changedTouches[i].identifier);
				}
			}, false);
			el.addEventListener("touchend", function (e) {
				/** @type {number} */
				var i = 0;
				for (; i < e.changedTouches.length; i++) {
					self.hitUp(e, e.changedTouches[i].pageX, e.changedTouches[i].pageY, e.changedTouches[i].identifier);
				}
			}, false);
			el.addEventListener("touchmove", function (e) {
				/** @type {number} */
				var i = 0;
				for (; i < self.aHitAreas.length; i++) {
					self.move(e, e.changedTouches[i].pageX, e.changedTouches[i].pageY, e.changedTouches[i].identifier, true);
				}
			}, false);
			el.addEventListener("mousedown", function (event) {
				/** @type {boolean} */
				self.isDown = true;
				self.hitDown(event, event.pageX, event.pageY, 1);
			}, false);
			el.addEventListener("mouseup", function (event) {
				/** @type {boolean} */
				self.isDown = false;
				self.hitUp(event, event.pageX, event.pageY, 1);
			}, false);
			el.addEventListener("mousemove", function (e) {
				self.move(e, e.pageX, e.pageY, 1, self.isDown);
			}, false);
			/** @type {Array} */
			this.aHitAreas = new Array;
			/** @type {Array} */
			this.aKeys = new Array;
		}
		return onTouchStart.prototype.setCanvas = function (canvasX, canvasY, lanyardCanvas, dataAndEvents) {
			/** @type {number} */
			this.canvasX = canvasX;
			/** @type {number} */
			this.canvasY = canvasY;
			/** @type {number} */
			this.canvasScaleX = lanyardCanvas;
			/** @type {number} */
			this.canvasScaleY = dataAndEvents;
		}, onTouchStart.prototype.hitDown = function (event, x, y, ensure) {
			if (!this.pauseIsOn) {
				/** @type {number} */
				var prevHitTime = (new Date).getTime();
				if (!(prevHitTime - this.prevHitTime < 500 && isBugBrowser)) {
					/** @type {number} */
					this.prevHitTime = prevHitTime;
					event.preventDefault();
					event.stopPropagation();
					/** @type {number} */
					x = (x - this.canvasX) * this.canvasScaleX;
					/** @type {number} */
					y = (y - this.canvasY) * this.canvasScaleY;
					/** @type {number} */
					var i = 0;
					for (; i < this.aHitAreas.length; i++) {
						if (this.aHitAreas[i].rect && (x > this.aHitAreas[i].area[0] && (y > this.aHitAreas[i].area[1] && (x < this.aHitAreas[i].area[2] && y < this.aHitAreas[i].area[3])))) {
							this.aHitAreas[i].aTouchIdentifiers.push(ensure);
							/** @type {boolean} */
							this.aHitAreas[i].oData.hasLeft = false;
							if (!this.aHitAreas[i].oData.isDown) {
								/** @type {boolean} */
								this.aHitAreas[i].oData.isDown = true;
								/** @type {number} */
								this.aHitAreas[i].oData.x = x;
								/** @type {number} */
								this.aHitAreas[i].oData.y = y;
								this.aHitAreas[i].callback(this.aHitAreas[i].id, this.aHitAreas[i].oData);
							}
							break;
						}
					}
				}
			}
		}, onTouchStart.prototype.hitUp = function (event, hour, minute, dataAndEvents) {
			if (!this.pauseIsOn) {
				event.preventDefault();
				event.stopPropagation();
				/** @type {number} */
				hour = (hour - this.canvasX) * this.canvasScaleX;
				/** @type {number} */
				minute = (minute - this.canvasY) * this.canvasScaleY;
				/** @type {number} */
				var ind = 0;
				for (; ind < this.aHitAreas.length; ind++) {
					if (this.aHitAreas[ind].rect && (hour > this.aHitAreas[ind].area[0] && (minute > this.aHitAreas[ind].area[1] && (hour < this.aHitAreas[ind].area[2] && minute < this.aHitAreas[ind].area[3])))) {
						/** @type {number} */
						var i = 0;
						for (; i < this.aHitAreas[ind].aTouchIdentifiers.length; i++) {
							if (this.aHitAreas[ind].aTouchIdentifiers[i] == dataAndEvents) {
								this.aHitAreas[ind].aTouchIdentifiers.splice(i, 1);
								i -= 1;
							}
						}
						if (0 == this.aHitAreas[ind].aTouchIdentifiers.length) {
							/** @type {boolean} */
							this.aHitAreas[ind].oData.isDown = false;
							if (this.aHitAreas[ind].oData.multiTouch) {
								this.aHitAreas[ind].callback(this.aHitAreas[ind].id, this.aHitAreas[ind].oData);
							}
						}
						break;
					}
				}
			}
		}, onTouchStart.prototype.move = function (edge, x, y, row, dataAndEvents) {
			if (!this.pauseIsOn && dataAndEvents) {
				/** @type {number} */
				x = (x - this.canvasX) * this.canvasScaleX;
				/** @type {number} */
				y = (y - this.canvasY) * this.canvasScaleY;
				/** @type {number} */
				var i = 0;
				for (; i < this.aHitAreas.length; i++) {
					if (this.aHitAreas[i].rect) {
						if (x > this.aHitAreas[i].area[0] && (y > this.aHitAreas[i].area[1] && (x < this.aHitAreas[i].area[2] && y < this.aHitAreas[i].area[3]))) {
							/** @type {boolean} */
							this.aHitAreas[i].oData.hasLeft = false;
							if (!this.aHitAreas[i].oData.isDown) {
								/** @type {boolean} */
								this.aHitAreas[i].oData.isDown = true;
								/** @type {number} */
								this.aHitAreas[i].oData.x = x;
								/** @type {number} */
								this.aHitAreas[i].oData.y = y;
								this.aHitAreas[i].aTouchIdentifiers.push(row);
								if (this.aHitAreas[i].oData.multiTouch) {
									this.aHitAreas[i].callback(this.aHitAreas[i].id, this.aHitAreas[i].oData);
								}
							}
							if (this.aHitAreas[i].oData.isDraggable) {
								/** @type {boolean} */
								this.aHitAreas[i].oData.isBeingDragged = true;
								/** @type {number} */
								this.aHitAreas[i].oData.x = x;
								/** @type {number} */
								this.aHitAreas[i].oData.y = y;
								this.aHitAreas[i].callback(this.aHitAreas[i].id, this.aHitAreas[i].oData);
								/** @type {boolean} */
								this.aHitAreas[i].oData.isBeingDragged = false;
							}
						} else {
							if (this.aHitAreas[i].oData.isDown && !this.aHitAreas[i].oData.hasLeft) {
								/** @type {number} */
								var n = 0;
								for (; n < this.aHitAreas[i].aTouchIdentifiers.length; n++) {
									if (this.aHitAreas[i].aTouchIdentifiers[n] == row) {
										this.aHitAreas[i].aTouchIdentifiers.splice(n, 1);
										n -= 1;
									}
								}
								if (0 == this.aHitAreas[i].aTouchIdentifiers.length) {
									/** @type {boolean} */
									this.aHitAreas[i].oData.hasLeft = true;
									if (this.aHitAreas[i].oData.multiTouch) {
										this.aHitAreas[i].callback(this.aHitAreas[i].id, this.aHitAreas[i].oData);
									}
								}
							}
						}
					}
				}
			}
		}, onTouchStart.prototype.keyDown = function (ev) {
			/** @type {number} */
			var i = 0;
			for (; i < this.aKeys.length; i++) {
				if (ev.keyCode == this.aKeys[i].keyCode) {
					/** @type {boolean} */
					this.aKeys[i].oData.isDown = true;
					this.aKeys[i].callback(this.aKeys[i].id, this.aKeys[i].oData);
				}
			}
		}, onTouchStart.prototype.keyUp = function (e) {
			/** @type {number} */
			var i = 0;
			for (; i < this.aKeys.length; i++) {
				if (e.keyCode == this.aKeys[i].keyCode) {
					/** @type {boolean} */
					this.aKeys[i].oData.isDown = false;
					this.aKeys[i].callback(this.aKeys[i].id, this.aKeys[i].oData);
				}
			}
		}, onTouchStart.prototype.addKey = function (sessionId, callback, value, key) {
			var self = this;
			if (!this.isDetectingKeys) {
				window.addEventListener("keydown", function (ev) {
					self.keyDown(ev);
				}, false);
				window.addEventListener("keyup", function (e) {
					self.keyUp(e);
				}, false);
				/** @type {boolean} */
				this.isDetectingKeys = true;
			}
			if (null == value) {
				/** @type {Object} */
				value = new Object;
			}
			this.aKeys.push({
				id: sessionId,
				/** @type {Function} */
				callback: callback,
				oData: value,
				keyCode: key
			});
		}, onTouchStart.prototype.removeKey = function (value) {
			/** @type {number} */
			var i = 0;
			for (; i < this.aKeys.length; i++) {
				if (this.aKeys[i].id == value) {
					this.aKeys.splice(i, 1);
					i -= 1;
				}
			}
		}, onTouchStart.prototype.addHitArea = function (key, callback, min1, type, opt_attributes, dataAndEvents) {
			if ("undefined" == typeof dataAndEvents) {
				/** @type {boolean} */
				dataAndEvents = false;
			}
			if (null == min1) {
				/** @type {Object} */
				min1 = new Object;
			}
			if (dataAndEvents) {
				this.removeHitArea(key);
			}
			if (!opt_attributes.scale) {
				/** @type {number} */
				opt_attributes.scale = 1;
			}
			/** @type {Array} */
			var other = new Array;
			switch (type) {
			case "image":
				var val;
				/** @type {Array} */
				val = new Array(opt_attributes.aPos[0] - opt_attributes.oImgData.oData.oAtlasData[opt_attributes.id].width / 2 * opt_attributes.scale, opt_attributes.aPos[1] - opt_attributes.oImgData.oData.oAtlasData[opt_attributes.id].height / 2 * opt_attributes.scale, opt_attributes.aPos[0] + opt_attributes.oImgData.oData.oAtlasData[opt_attributes.id].width / 2 * opt_attributes.scale, opt_attributes.aPos[1] + opt_attributes.oImgData.oData.oAtlasData[opt_attributes.id].height / 2 * opt_attributes.scale);
				this.aHitAreas.push({
					id: key,
					aTouchIdentifiers: other,
					/** @type {Function} */
					callback: callback,
					oData: min1,
					rect: true,
					area: val
				});
				break;
			case "rect":
				this.aHitAreas.push({
					id: key,
					aTouchIdentifiers: other,
					/** @type {Function} */
					callback: callback,
					oData: min1,
					rect: true,
					area: opt_attributes.aRect
				});
			}
		}, onTouchStart.prototype.removeHitArea = function (key) {
			/** @type {number} */
			var i = 0;
			for (; i < this.aHitAreas.length; i++) {
				if (this.aHitAreas[i].id == key) {
					this.aHitAreas.splice(i, 1);
					i -= 1;
				}
			}
		}, onTouchStart;
	}();
	eventHandle.UserInput = elem;
}(Utils || (Utils = {}));
! function (dataAndEvents) {
	var FpsMeter = function () {
		/**
		 * @param {Function} rows
		 * @return {undefined}
		 */
		function render(rows) {
			/** @type {number} */
			this.updateFreq = 10;
			/** @type {number} */
			this.updateInc = 0;
			/** @type {number} */
			this.frameAverage = 0;
			/** @type {number} */
			this.display = 1;
			/** @type {string} */
			this.log = "";
			/**
			 * @param {CanvasRenderingContext2D} context
			 * @return {undefined}
			 */
			this.render = function (context) {
				this.frameAverage += this.delta / this.updateFreq;
				if (++this.updateInc >= this.updateFreq) {
					/** @type {number} */
					this.updateInc = 0;
					this.display = this.frameAverage;
					/** @type {number} */
					this.frameAverage = 0;
				}
				/** @type {string} */
				context.textAlign = "left";
				/** @type {string} */
				ctx.font = "10px Helvetica";
				/** @type {string} */
				context.fillStyle = "#333333";
				context.beginPath();
				context.rect(0, this.canvasHeight - 15, 40, 15);
				context.closePath();
				context.fill();
				/** @type {string} */
				context.fillStyle = "#ffffff";
				context.fillText(Math.round(1E3 / (1E3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5);
			};
			/** @type {Function} */
			this.canvasHeight = rows;
		}
		return render.prototype.update = function (dt) {
			this.delta = dt;
		}, render;
	}();
	dataAndEvents.FpsMeter = FpsMeter;
}(Utils || (Utils = {}));
var Elements;
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} line
		 * @param {?} _arg
		 * @param {?} parentEl
		 * @return {undefined}
		 */
		function Text(line, _arg, parentEl) {
			/** @type {number} */
			this.x = 0;
			/** @type {number} */
			this.y = 0;
			/** @type {number} */
			this.targY = 0;
			/** @type {number} */
			this.incY = 0;
			/** @type {number} */
			this.posY = 0;
			this.oImgData = line;
			this.canvasWidth = _arg;
			this.canvasHeight = parentEl;
		}
		return Text.prototype.updateScroll = function (y) {
			this.incY += 5 * y;
			this.posY -= 8 * this.posY * y;
		}, Text.prototype.renderScroll = function (ctx) {
			/** @type {number} */
			var scale = 40;
			ctx.drawImage(this.oImgData.img, 0, 0);
			/** @type {number} */
			var col = 0;
			for (; scale > col; col++) {
				ctx.drawImage(this.oImgData.img, col * (this.canvasWidth / scale), 0, this.canvasWidth / scale, this.canvasHeight, col * (this.canvasWidth / scale), 2 * Math.sin(this.incY + col / 5) - this.posY, this.canvasWidth / scale, this.canvasHeight);
			}
		}, Text.prototype.render = function (ctx) {
			ctx.drawImage(this.oImgData.img, 0, 0);
		}, Text;
	}();
	eventHandle.Background = elem;
}(Elements || (Elements = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} contentHTML
		 * @param {?} canvasWidth
		 * @param {?} canvasHeight
		 * @return {undefined}
		 */
		function initialize(contentHTML, canvasWidth, canvasHeight) {
			/** @type {number} */
			this.inc = 0;
			this.oSplashScreenImgData = contentHTML;
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
			/** @type {number} */
			this.posY = -this.canvasHeight;
			TweenLite.to(this, 0.5, {
				posY: 0
			});
		}
		return initialize.prototype.render = function (ctx, delta) {
			this.inc += 5 * delta;
			ctx.drawImage(this.oSplashScreenImgData.img, 0, 0 - this.posY);
		}, initialize;
	}();
	eventHandle.Splash = elem;
}(Elements || (Elements = {}));
! function (Stopwatch) {
	var stopwatchPanel = function () {
		/**
		 * @param {?} initialState
		 * @param {?} debugMode
		 * @param {?} round
		 * @param {?} sock
		 * @param {number} canvasWidth
		 * @param {?} canvasHeight
		 * @return {undefined}
		 */
		function Game(initialState, debugMode, round, sock, canvasWidth, canvasHeight) {
			/** @type {number} */
			this.timer = 0.3;
			/** @type {number} */
			this.endTime = 0;
			/** @type {number} */
			this.posY = 0;
			/** @type {number} */
			this.numberSpace = 28;
			/** @type {number} */
			this.incY = 0;
			this.oPanelsImgData = initialState;
			this.oNumbersImgData = debugMode;
			this.panelType = round;
			this.aButs = sock;
			/** @type {number} */
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
		}
		return Game.prototype.update = function (dt) {
			this.incY += 5 * dt;
		}, Game.prototype.startTween1 = function () {
			/** @type {number} */
			this.posY = 800;
			TweenLite.to(this, 0.8, {
				posY: 0,
				ease: "Back.easeOut"
			});
		}, Game.prototype.startTween2 = function () {
			/** @type {number} */
			this.posY = 800;
			TweenLite.to(this, 0.5, {
				posY: 0,
				ease: "Quad.easeOut"
			});
		}, Game.prototype.startTweenEndLevel = function () {
			/** @type {Array} */
			this.aStarPos = new Array;
			/** @type {number} */
			var i = 0;
			for (; i < this.oScoreData.stars; i++) {
				this.aStarPos.push({
					posY: -400,
					scaleY: 2
				});
				TweenLite.to(this.aStarPos[i], 1.5, {
					posY: 0,
					scaleY: 1,
					ease: "Bounce.easeOut",
					delay: 0.3 * i
				});
			}
			/** @type {number} */
			this.posY = 800;
			TweenLite.to(this, 0.8, {
				posY: 0,
				ease: "Back.easeOut"
			});
		}, Game.prototype.render = function (ctx, size) {
			switch ("undefined" == typeof size && (size = true), size || this.addButs(ctx), this.panelType) {
			case "start":
				/** @type {number} */
				var width = 0;
				/** @type {number} */
				var startX = width * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width;
				/** @type {number} */
				var offsetY = Math.floor(width / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
				ctx.drawImage(this.oPanelsImgData.img, startX, offsetY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
				break;
			case "credits":
				/** @type {number} */
				width = 3;
				/** @type {number} */
				startX = width * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(width / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
				ctx.drawImage(this.oPanelsImgData.img, startX, offsetY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
				break;
			case "gameEnd":
				/** @type {number} */
				width = 2;
				/** @type {number} */
				startX = width * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(width / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
				ctx.drawImage(this.oPanelsImgData.img, startX, offsetY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
				var score = this.oScoreData.score;
				/** @type {number} */
				var n = 0;
				for (; n < score.toString().length; n++) {
					/** @type {number} */
					width = parseFloat(score.toString().charAt(n));
					/** @type {number} */
					startX = width * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(width / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
					ctx.drawImage(this.oNumbersImgData.img, startX, offsetY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 300 + n * this.numberSpace, 285 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight);
				}
				score = this.oScoreData.racks;
				/** @type {number} */
				n = 0;
				for (; n < score.toString().length; n++) {
					/** @type {number} */
					width = parseFloat(score.toString().charAt(n));
					/** @type {number} */
					startX = width * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(width / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
					ctx.drawImage(this.oNumbersImgData.img, startX, offsetY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 307 + n * this.numberSpace / 2, 439 + this.posY, this.oNumbersImgData.oData.spriteWidth / 2, this.oNumbersImgData.oData.spriteHeight / 2);
				}
				score = this.oScoreData.balls;
				/** @type {number} */
				n = 0;
				for (; n < score.toString().length; n++) {
					/** @type {number} */
					width = parseFloat(score.toString().charAt(n));
					/** @type {number} */
					startX = width * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(width / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
					ctx.drawImage(this.oNumbersImgData.img, startX, offsetY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 307 + n * this.numberSpace / 2, 486 + this.posY, this.oNumbersImgData.oData.spriteWidth / 2, this.oNumbersImgData.oData.spriteHeight / 2);
				}
				score = this.oScoreData.streak;
				/** @type {number} */
				n = 0;
				for (; n < score.toString().length; n++) {
					/** @type {number} */
					width = parseFloat(score.toString().charAt(n));
					/** @type {number} */
					startX = width * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(width / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
					ctx.drawImage(this.oNumbersImgData.img, startX, offsetY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 307 + n * this.numberSpace / 2, 535 + this.posY, this.oNumbersImgData.oData.spriteWidth / 2, this.oNumbersImgData.oData.spriteHeight / 2);
				}
				break;
			case "tutorial":
				/** @type {number} */
				width = 1;
				/** @type {number} */
				startX = width * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(width / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
				ctx.drawImage(this.oPanelsImgData.img, startX, offsetY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
				break;
			case "pause":
				/** @type {string} */
				ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
				ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
			}
			if (size) {
				this.addButs(ctx);
			}
		}, Game.prototype.addButs = function (context) {
			/** @type {number} */
			var i = 0;
			for (; i < this.aButs.length; i++) {
				var w = this.posY;
				/** @type {number} */
				var y = 0;
				if (!this.aButs[i].noFloat) {
					/** @type {number} */
					y = 3 * Math.sin(this.incY + 45 * i);
				}
				if (!this.aButs[i].scale) {
					/** @type {number} */
					this.aButs[i].scale = 1;
				}
				var _x = this.aButs[i].oImgData.oData.oAtlasData[this.aButs[i].id].x;
				var py = this.aButs[i].oImgData.oData.oAtlasData[this.aButs[i].id].y;
				var sw = this.aButs[i].oImgData.oData.oAtlasData[this.aButs[i].id].width;
				var sh = this.aButs[i].oImgData.oData.oAtlasData[this.aButs[i].id].height;
				context.drawImage(this.aButs[i].oImgData.img, _x, py, sw, sh, this.aButs[i].aPos[0] - sw / 2 * this.aButs[i].scale + w, this.aButs[i].aPos[1] - sh / 2 * this.aButs[i].scale - y, sw * this.aButs[i].scale, sh * this.aButs[i].scale);
			}
		}, Game;
	}();
	Stopwatch.Panel = stopwatchPanel;
}(Elements || (Elements = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {?} event
		 * @param {?} dy
		 * @param {?} isGlobal
		 * @param {Object} oData
		 * @return {undefined}
		 */
		function w(event, dy, isGlobal, oData) {
			/** @type {number} */
			this.x = 0;
			/** @type {number} */
			this.y = 0;
			/** @type {number} */
			this.letterSpace = 13;
			/** @type {number} */
			this.prevSecs = 0;
			this.oHudImgData = event;
			this.oTimeNumbersImgData = dy;
			this.oTableNumbersImgData = isGlobal;
			/** @type {Object} */
			this.oData = oData;
			/** @type {Array} */
			this.oData.aTime = new Array;
		}
		return w.prototype.update = function (dt, yPosition) {
			/** @type {number} */
			this.x = dt;
			/** @type {number} */
			this.y = yPosition;
		}, w.prototype.render = function (ctx) {
			ctx.drawImage(this.oHudImgData.img, 0, 0);
			/** @type {number} */
			var p = 0;
			if (!disabledTimer) {
				for (; p < this.oData.aTime.length; p++) {
					var val = this.oData.aTime[p];
					/** @type {number} */
					var startX = val * this.oTimeNumbersImgData.oData.spriteWidth % this.oTimeNumbersImgData.img.width;
					/** @type {number} */
					var offsetY = Math.floor(val / (this.oTimeNumbersImgData.img.width / this.oTimeNumbersImgData.oData.spriteWidth)) * this.oTimeNumbersImgData.oData.spriteHeight;
					ctx.drawImage(this.oTimeNumbersImgData.img, startX, offsetY, this.oTimeNumbersImgData.oData.spriteWidth, this.oTimeNumbersImgData.oData.spriteHeight, 245 + p * this.letterSpace, 5 + this.y, this.oTimeNumbersImgData.oData.spriteWidth, this.oTimeNumbersImgData.oData.spriteHeight);
				}
			} else {
				ctx.fillStyle = "white";
				ctx.font = "28px Arial";
				ctx.fillText('-:--', 254, 26);
			}
			/** @type {number} */
			p = 0;
			for (; p < this.oData.racks.toString().length; p++) {
				/** @type {number} */
				val = parseFloat(this.oData.racks.toString().charAt(p));
				/** @type {number} */
				startX = val * this.oTableNumbersImgData.oData.spriteWidth % this.oTableNumbersImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(val / (this.oTableNumbersImgData.img.width / this.oTableNumbersImgData.oData.spriteWidth)) * this.oTableNumbersImgData.oData.spriteHeight;
				ctx.drawImage(this.oTableNumbersImgData.img, startX, offsetY, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight, 245 + p * this.letterSpace, 61 + this.y, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight);
			}
			/** @type {number} */
			var dstUri = Math.floor(this.oData.multiplier);
			/** @type {number} */
			p = 0;
			for (; p <= dstUri.toString().length; p++) {
				/** @type {number} */
				val = parseFloat(dstUri.toString().charAt(p));
				/** @type {number} */
				startX = val * this.oTableNumbersImgData.oData.spriteWidth % this.oTableNumbersImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(val / (this.oTableNumbersImgData.img.width / this.oTableNumbersImgData.oData.spriteWidth)) * this.oTableNumbersImgData.oData.spriteHeight;
				ctx.drawImage(this.oTableNumbersImgData.img, startX, offsetY, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight, 273 + p * (this.letterSpace + 6), 712 + this.y, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight);
			}
			/** @type {number} */
			p = 0;
			for (; p < this.oData.score.toString().length; p++) {
				/** @type {number} */
				val = parseFloat(this.oData.score.toString().charAt(p));
				/** @type {number} */
				startX = val * this.oTableNumbersImgData.oData.spriteWidth % this.oTableNumbersImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(val / (this.oTableNumbersImgData.img.width / this.oTableNumbersImgData.oData.spriteWidth)) * this.oTableNumbersImgData.oData.spriteHeight;
				ctx.drawImage(this.oTableNumbersImgData.img, startX, offsetY, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight, 245 + p * this.letterSpace, 769 + this.y, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight);
			}
		}, w.prototype.setTime = function (value) {
			/** @type {number} */
			var stddev = Math.floor(value / 60);
			/** @type {number} */
			var ratio = Math.floor((value - 60 * stddev) / 10);
			/** @type {number} */
			var aTime = Math.floor(value - 60 * stddev - 10 * ratio);
			/** @type {Array} */
			this.oData.aTime = [stddev, 10, ratio, aTime];

			/** @type {number} */
			this.prevSecs = aTime;
		}, w;
	}();
	eventHandle.Hud = elem;
}(Elements || (Elements = {}));
! function (exports) {
	var Table = function () {
		/**
		 * @param {?} initialState
		 * @param {number} canvasWidth
		 * @param {Function} canvasHeight
		 * @return {undefined}
		 */
		function Game(initialState, canvasWidth, canvasHeight) {
			/** @type {number} */
			this.radian = Math.PI / 180;
			this.oLevelImgData = initialState;
			/** @type {number} */
			this.canvasWidth = canvasWidth;
			/** @type {Function} */
			this.canvasHeight = canvasHeight;
		}
		return Game.prototype.update = function (dt, yPosition) {
			/** @type {number} */
			this.x = dt;
			/** @type {number} */
			this.y = yPosition;
		}, Game.prototype.render = function (ctx) {
			ctx.drawImage(this.oLevelImgData.img, -this.x, -this.y, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight);
		}, Game;
	}();
	exports.Table = Table;
}(Elements || (Elements = {}));
/** @type {function (Function, Function): undefined} */
var __extends = this.__extends || function (d, b) {
	/**
	 * @return {undefined}
	 */
	function __() {
		/** @type {Function} */
		this.constructor = d;
	}
	__.prototype = b.prototype;
	d.prototype = new __;
};
! function (exports) {
	var Ball = function (_super) {
		/**
		 * @param {?} game
		 * @param {?} initial
		 * @param {Object} model
		 * @param {?} MAX_X
		 * @param {?} canvasWidth
		 * @param {Function} canvasHeight
		 * @return {undefined}
		 */
		function Ship(game, initial, model, MAX_X, canvasWidth, canvasHeight) {
			_super.call(this, game, 24, 26, model.oData.id + "Waiting");
			/** @type {number} */
			this.radian = model.radian !== undefined ? model.radian : Math.PI / 180;
			/** @type {number} */
			this.angle = model.angle !== undefined ? model.angle : 0;
			/** @type {number} */
			this.inc = model.inc !== undefined ? model.inc : 0;
			/** @type {number} */
			this.ballRadius = model.ballRadius !== undefined ? model.ballRadius : 14;
			/** @type {number} */
			this.vx = model.vx !== undefined ? model.vx : 0;
			/** @type {number} */
			this.vy = model.vy !== undefined ? model.vy : 0;
			/** @type {number} */
			this.m = model.m !== undefined ? model.m : 1;
			/** @type {number} */
			this.f = model.f !== undefined ? model.f : 1;
			/** @type {number} */
			this.b = model.b !== undefined ? model.b : 1;
			this.oNumbersImgData = initial;
			/** @type {Object} */
			this.oData = model.oData;
			this.ballCallback = MAX_X;
			this.trackX = this.startX = this.oData.x;
			this.trackY = this.startY = this.oData.y;
			this.p0 = {
				x: this.trackX,
				y: this.trackY
			};
			this.p1 = {
				x: this.trackX,
				y: this.trackY
			};
			this.canvasWidth = canvasWidth;
			/** @type {Function} */
			this.canvasHeight = canvasHeight;
			this.renderFunc = this.renderBall;
			this.changeState(model.state || "waiting", model);
		}
		return __extends(Ship, _super), Ship.prototype.getData = function () {
			var odata = JSON.parse(JSON.stringify(this.oData));
			odata.x = this.x;
			odata.y = this.y;
			return {
				state: this.state,
				radian: this.radian,
				angle: this.angle,
				inc: this.inc,
				ballRadius: this.ballRadius,
				vx: this.vx,
				vy: this.vy,
				m: this.m,
				f: this.f,
				b: this.b,
				oData: odata
			};
		}, Ship.prototype.changeState = function (eventName, data) {
			switch ("undefined" == typeof data && (data = null), eventName) {
			case "reset":
				/** @type {number} */
				this.fps = 24;
				/** @type {string} */
				this.state = "reset";
				this.updateFunc = this.updateWaiting;
				this.renderFunc = this.renderBall;
				/** @type {boolean} */
				this.removeMe = false;
				this.trackX = data.x;
				this.trackY = data.y;
				this.x = this.trackX;
				this.y = this.trackY;
				this.p0 = {
					x: this.trackX,
					y: this.trackY
				};
				this.p1 = {
					x: this.trackX,
					y: this.trackY
				};
				/** @type {number} */
				this.scaleX = this.scaleY = 1;
				break;
			case "waiting":
				/** @type {string} */
				this.state = "waiting";
				this.updateFunc = this.updateWaiting;
				break;
			case "indicating":
				/** @type {string} */
				this.state = "indicating";
				this.setAnimType("loop", this.oData.id + "Waiting");
				break;
			case "aiming":
				/** @type {string} */
				this.state = "aiming";
				this.updateFunc = this.updateWaiting;
				this.setAnimType("loop", this.oData.id + "Moving");
				break;
			case "moving":
				/** @type {string} */
				this.state = "moving";
				/** @type {number} */
				this.vx = data.vx !== undefined ? data.vx : data.power / 10 * Math.cos(data.angle);
				/** @type {number} */
				this.vy = data.vy !== undefined ? data.vy : data.power / 10 * Math.sin(data.angle);
				/** @type {number} */
				this.vz = 1;
				/** @type {number} */
				this.dec = 1;
				this.setAnimType("loop", this.oData.id + "Moving");
				this.p0 = {
					x: this.trackX,
					y: this.trackY
				};
				this.p1 = {
					x: this.trackX,
					y: this.trackY
				};
				this.updateFunc = this.updateMoving;
				break;
			case "rebound":
				/** @type {string} */
				this.state = "moving";
				/** @type {number} */
				this.vz = 1;
				/** @type {number} */
				this.dec = 1;
				this.setAnimType("loop", this.oData.id + "Moving");
				this.p0 = {
					x: this.trackX,
					y: this.trackY
				};
				this.p1 = {
					x: this.trackX,
					y: this.trackY
				};
				this.updateFunc = this.updateMoving;
				break;
			case "holed":
				/** @type {string} */
				if (data.oData) data = data.oData;
				this.state = "holed";
				this.oData.score = data.score;
				this.trackX = data.x;
				this.trackY = data.y;
				/** @type {number} */
				this.scaleX = this.scaleY = 2;
				/** @type {number} */
				this.fps = 18;
				this.setAnimType("once", "explode");
				/**
				 * @return {undefined}
				 */
				this.animEndedFunc = function () {
					this.ballHoled();
				};
				this.updateFunc = this.updateWaiting;
				this.renderFunc = this.renderHoling;
				break;
			case "scoring1":
				/** @type {string} */
				this.state = "holed";
				/** @type {number} */
				this.scaleX = this.scaleY = 1;
				this.scoreX = this.x;
				/** @type {number} */
				this.scoreY = this.y - this.oNumbersImgData.oData.spriteHeight / 2;
				/** @type {number} */
				this.x = this.y = 0;
				/** @type {number} */
				this.scoreScale = 0.5;
				this.tween = TweenLite.to(this, 1, {
					scoreY: this.scoreY - 5,
					scoreScale: 1,
					ease: "Back.easeOut",
					onComplete: this.scoreEnded1,
					onCompleteParams: [this]
				});
				this.updateFunc = this.updateScoring;
				this.renderFunc = this.renderScoring;
				break;
			case "scoring2":
				/** @type {string} */
				this.state = "holed";
				/** @type {number} */
				this.scoreScale = 1;
				this.tween = TweenLite.to(this, 0.5, {
					scoreX: this.canvasWidth + 100,
					scoreScale: 2,
					ease: "Back.easeIn",
					onComplete: this.scoreEnded2,
					onCompleteParams: [this]
				});
			}
		}, Ship.prototype.moveEnded = function (self) {
			self.changeState("waiting");
			self.ballCallback("moveEnded");
		}, Ship.prototype.ballHoled = function (dataAndEvents) {
			if ("undefined" == typeof dataAndEvents) {
				dataAndEvents = this;
			}
			if ("cueBall" != dataAndEvents.oData.type) {
				dataAndEvents.changeState("scoring1");
			} else {
				dataAndEvents.scoreEnded2(dataAndEvents);
			}
			dataAndEvents.ballCallback("moveEnded");
		}, Ship.prototype.scoreEnded1 = function (dataAndEvents) {
			dataAndEvents.changeState("scoring2");
		}, Ship.prototype.scoreEnded2 = function (dataAndEvents) {
			/** @type {boolean} */
			dataAndEvents.removeMe = true;
			dataAndEvents.ballCallback("holeEnded");
		}, Ship.prototype.update = function (dt, array, delta) {
			this.updateFunc(dt, array, delta);
		}, Ship.prototype.updateMoving = function (x, bytes, delta) {
			_super.prototype.updateAnimation.call(this, delta);
			this.vx *= 0.98;
			this.vy *= 0.98;
			if (Math.abs(this.vx) < 0.05) {
				if (Math.abs(this.vy) < 0.05) {
					this.moveEnded(this);
				}
			}
			this.x = this.trackX + x;
			this.y = this.trackY + bytes;
		}, Ship.prototype.updateScoring = function () {}, Ship.prototype.updateWaiting = function (x, bytes, delta) {
			_super.prototype.updateAnimation.call(this, delta);
			this.x = this.trackX + x;
			this.y = this.trackY + bytes;
		}, Ship.prototype.render = function (ctx) {
			this.renderFunc(ctx);
		}, Ship.prototype.renderBall = function (env) {
			_super.prototype.render.call(this, env);
		}, Ship.prototype.renderHoling = function (env) {
			_super.prototype.render.call(this, env);
		}, Ship.prototype.renderScoring = function (ctx) {
			var score = this.oData.score || 0;
			/** @type {number} */
			var n = 0;
			for (; n < score.toString().length; n++) {
				/** @type {number} */
				var month = parseFloat(score.toString().charAt(n));
				if (isNaN(month)) {
					/** @type {number} */
					month = 10;
				}
				/** @type {number} */
				var startX = month * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width;
				/** @type {number} */
				var offsetY = Math.floor(month / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
				ctx.drawImage(this.oNumbersImgData.img, startX, offsetY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, this.scoreX + 28 * n - 28 * score.toString().length / 2 - 10, this.scoreY, this.oNumbersImgData.oData.spriteWidth * this.scoreScale, this.oNumbersImgData.oData.spriteHeight / this.scoreScale);
			}
		}, Ship;
	}(Utils.AnimSprite);
	exports.Ball = Ball;
}(Elements || (Elements = {}));
! function (G) {
	var Arrow = function () {
		/**
		 * @param {?} far
		 * @param {?} near
		 * @param {number} canvasWidth
		 * @param {?} canvasHeight
		 * @return {undefined}
		 */
		function Camera(far, near, canvasWidth, canvasHeight) {
			/** @type {number} */
			this.x = 0;
			/** @type {number} */
			this.y = 0;
			/** @type {number} */
			this.scaleX = 0;
			/** @type {number} */
			this.scaleY = 1;
			/** @type {number} */
			this.alpha = 1;
			/** @type {number} */
			this.maxLength = 100;
			this.oArrowImgData = far;
			this.oCueImgData = near;
			/** @type {number} */
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
			this.renderFunc = this.renderAim;
		}
		return Camera.prototype.takeShot = function (dataAndEvents) {
			this.renderFunc = this.renderShot;
			this.shotHyp = this.hyp;
			this.shotRot = this.rotation;
			this.tween = TweenLite.to(this, 0.15, {
				shotHyp: 0,
				ease: "Quad.easeIn",
				onComplete: this.shotEnded,
				onCompleteParams: [this, dataAndEvents]
			});
		}, Camera.prototype.shotEnded = function (dataAndEvents, self) {
			if (isBreakOff) {
				dataAndEvents.hyp *= 1.5;
				/** @type {boolean} */
				isBreakOff = false;
			}
			self.changeState("moving", {
				power: dataAndEvents.hyp,
				angle: dataAndEvents.shotRot
			});
		}, Camera.prototype.update = function (dt, yPosition, x, y, data) {
			this.oLineData = data;
			/** @type {number} */
			this.x = dt;
			/** @type {number} */
			this.y = yPosition;
			/** @type {number} */
			this.lengthX = this.x - x;
			/** @type {number} */
			this.lengthY = this.y - y;
			/** @type {number} */
			this.hyp = Math.min(data.hyp, this.maxLength);
			/** @type {number} */
			this.scaleX = Math.min(this.hyp / this.maxLength, 1);
			this.rotation = data.aimRot;
		}, Camera.prototype.render = function (ctx) {
			this.renderFunc(ctx);
		}, Camera.prototype.renderAim = function (ctx) {
			if (!(this.scaleX < 0.1)) {
				if (this.oLineData.targBall) {
					ctx.save();
					/** @type {number} */
					ctx.globalAlpha = this.alpha - (1 - this.scaleX);
					ctx.translate(this.oLineData.targBall.x, this.oLineData.targBall.y);
					ctx.rotate(this.oLineData.targBallRot);
					/** @type {number} */
					var startX = 2 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width;
					/** @type {number} */
					var offsetY = Math.floor(2 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
					ctx.drawImage(this.oArrowImgData.img, startX, offsetY, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, -this.oArrowImgData.oData.spriteWidth / 2, -this.oArrowImgData.oData.spriteHeight / 2, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight);
					ctx.restore();
					ctx.save();
					/** @type {number} */
					ctx.globalAlpha = this.alpha - (1 - this.scaleX);
					ctx.translate(this.oLineData.bounceX, this.oLineData.bounceY);
					ctx.rotate(this.oLineData.bounceRot);
					/** @type {number} */
					startX = 0 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(0 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
					ctx.drawImage(this.oArrowImgData.img, startX, offsetY, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, -this.oArrowImgData.oData.spriteWidth / 2, -this.oArrowImgData.oData.spriteHeight / 2, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight);
					ctx.restore();
				} else {
					ctx.save();
					/** @type {number} */
					ctx.globalAlpha = this.alpha - (1 - this.scaleX);
					ctx.translate(this.oLineData.bounceX, this.oLineData.bounceY);
					ctx.rotate(this.oLineData.bounceRot);
					/** @type {number} */
					startX = 3 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width;
					/** @type {number} */
					offsetY = Math.floor(3 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
					ctx.drawImage(this.oArrowImgData.img, startX, offsetY, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, -this.oArrowImgData.oData.spriteWidth / 2, -this.oArrowImgData.oData.spriteHeight / 2, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight);
					ctx.restore();
				}
				/** @type {number} */
				var z0 = this.x - this.oLineData.bounceX;
				/** @type {number} */
				var z1 = this.y - this.oLineData.bounceY;
				/** @type {number} */
				var linesPerPage = Math.sqrt(z0 * z0 + z1 * z1);
				ctx.save();
				/** @type {number} */
				ctx.globalAlpha = this.alpha - (1 - this.scaleX);
				ctx.translate(this.x, this.y);
				ctx.rotate(this.rotation);
				/** @type {number} */
				startX = 1 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width;
				/** @type {number} */
				offsetY = Math.floor(1 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
				ctx.drawImage(this.oArrowImgData.img, startX, offsetY, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, 0, -this.oArrowImgData.oData.spriteHeight / 2, Math.max(linesPerPage - 13, 1), this.oArrowImgData.oData.spriteHeight);
				ctx.restore();
				ctx.save();
				ctx.globalAlpha = this.alpha;
				ctx.translate(this.x, this.y);
				ctx.rotate(this.rotation);
				ctx.drawImage(this.oCueImgData.img, 0, 0, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight, -this.hyp - this.oCueImgData.oData.spriteWidth - 5, -this.oCueImgData.oData.spriteHeight / 2, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight);
				ctx.restore();
			}
		}, Camera.prototype.renderShot = function (ctx) {
			if (0 != this.shotHyp) {
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.rotate(this.rotation);
				ctx.drawImage(this.oCueImgData.img, 0, 0, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight, -this.shotHyp - this.oCueImgData.oData.spriteWidth - 5, -this.oCueImgData.oData.spriteHeight / 2, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight);
				ctx.restore();
			}
		}, Camera;
	}();
	G.Arrow = Arrow;
}(Elements || (Elements = {}));
! function (eventHandle) {
	var elem = function (_super) {
		/**
		 * @param {?} clock
		 * @param {?} allBindingsAccessor
		 * @param {?} stopHere
		 * @param {number} canvasWidth
		 * @param {?} canvasHeight
		 * @return {undefined}
		 */
		function update(clock, allBindingsAccessor, stopHere, canvasWidth, canvasHeight) {
			_super.call(this, clock, 22, 20, "running");
			/** @type {boolean} */
			this.canHit = true;
			this.oNumbersImgData = allBindingsAccessor;
			this.ballCallback = stopHere;
			/** @type {number} */
			this.canvasWidth = canvasWidth;
			this.canvasHeight = canvasHeight;
			this.reset();
			/** @type {number} */
			this.frameInc = Math.ceil(100 * Math.random());
			this.animEndedFunc = this.showScore;
		}
		return __extends(update, _super), update.prototype.reset = function () {
			/** @type {number} */
			this.trackX = 550 * Math.random() + 130;
			/** @type {number} */
			this.trackY = 247 * Math.random() + 120;
			/** @type {number} */
			this.scaleX = this.scaleY = 0;
			this.setAnimType("loop", "running");
			TweenLite.to(this, 0.5, {
				scaleX: 1,
				scaleY: 1,
				ease: "Quad.easeOut"
			});
			/** @type {boolean} */
			this.removeMe = false;
			/** @type {boolean} */
			this.canHit = true;
			this.setPos();
		}, update.prototype.setPos = function (element) {
			if ("undefined" == typeof element) {
				element = this;
			}
			/** @type {number} */
			var x2 = 550 * Math.random() + 130;
			/** @type {number} */
			var y2 = 247 * Math.random() + 120;
			element.tween = TweenLite.to(element, 2 * Math.random() + 2, {
				trackX: x2,
				trackY: y2,
				ease: "Quad.easeInOut",
				onComplete: element.setPos,
				onCompleteParams: [element]
			});
			/** @type {number} */
			element.rotation = Math.atan2(y2 - element.trackY, x2 - element.trackX);
			this.updateFunc = this.updateMoving;
			this.renderFunc = this.renderMoving;
		}, update.prototype.hit = function () {
			this.tween.kill();
			/** @type {boolean} */
			this.canHit = false;
			this.setAnimType("once", "explode");
			this.ballCallback("hitRoach", {
				roach: this
			});
		}, update.prototype.showScore = function () {
			/** @type {number} */
			this.scoreScale = 0.5;
			this.y -= 75;
			this.tween = TweenLite.to(this, 1, {
				y: this.y - 5,
				scoreScale: 1,
				ease: "Back.easeOut",
				onComplete: this.scoreEnded1,
				onCompleteParams: [this]
			});
			/** @type {number} */
			this.rotation = 0;
			this.updateFunc = this.updateScoring;
			this.renderFunc = this.renderScoring;
		}, update.prototype.scoreEnded1 = function (dataAndEvents) {
			if ("undefined" == typeof dataAndEvents) {
				dataAndEvents = this;
			}
			/** @type {number} */
			dataAndEvents.scoreScale = 1;
			dataAndEvents.tween = TweenLite.to(dataAndEvents, 0.5, {
				x: dataAndEvents.canvasWidth + 100,
				scoreScale: 2,
				ease: "Back.easeIn",
				onComplete: dataAndEvents.scoreEnded2,
				onCompleteParams: [dataAndEvents]
			});
		}, update.prototype.scoreEnded2 = function (dataAndEvents) {
			/** @type {boolean} */
			dataAndEvents.removeMe = true;
		}, update.prototype.update = function (dt, array, delta) {
			this.updateFunc(dt, array, delta);
		}, update.prototype.updateMoving = function (x, bytes, delta) {
			_super.prototype.updateAnimation.call(this, delta);
			this.x = this.trackX + x;
			this.y = this.trackY + bytes;
		}, update.prototype.updateScoring = function () {}, update.prototype.render = function (ctx) {
			this.renderFunc(ctx);
		}, update.prototype.renderMoving = function (env) {
			_super.prototype.render.call(this, env);
		}, update.prototype.renderScoring = function (ctx) {
			var dstUri = this.roachScore;
			/** @type {number} */
			var n = 0;
			for (; n < dstUri.toString().length; n++) {
				/** @type {number} */
				var hue = parseFloat(dstUri.toString().charAt(n));
				/** @type {number} */
				var startX = hue * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width;
				/** @type {number} */
				var offsetY = Math.floor(hue / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
				ctx.drawImage(this.oNumbersImgData.img, startX, offsetY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 0 + 30 * n - 30 * dstUri.toString().length / 2 - 10, 0, this.oNumbersImgData.oData.spriteWidth * this.scoreScale, this.oNumbersImgData.oData.spriteHeight / this.scoreScale);
			}
		}, update;
	}(Utils.AnimSprite);
	eventHandle.Roach = elem;
}(Elements || (Elements = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {Array} state
		 * @param {Array} blockHolder
		 * @return {undefined}
		 */
		function $(state, blockHolder) {
			/** @type {Array} */
			this.aLines = new Array;
			/** @type {Array} */
			this.aBalls = new Array;
			/** @type {Array} */
			this.aLines = state;
			/** @type {Array} */
			this.aBalls = blockHolder;
			/** @type {number} */
			var conditionIndex = 0;
			for (; conditionIndex < this.aLines.length; conditionIndex++) {
				this.updateVector(this.aLines[conditionIndex], null, true);
			}
		}
		return $.prototype.drawAll = function (type) {
			/** @type {number} */
			var i = 0;
			for (; i < this.aBalls.length; i++) {
				if ("moving" == this.aBalls[i].state) {
					var p = this.aBalls[i];
					p.trackX = p.p1.x;
					p.trackY = p.p1.y;
					p.p0 = p.p1;
					this.updateVector(p, type);
				}
			}
		}, $.prototype.update = function (dt) {
			var s;
			/** @type {number} */
			s = 0;
			for (; s < this.aBalls.length; s++) {
				var self = this.aBalls[s];
				if ("moving" == self.state) {
					this.updateVector(self, dt);
					/** @type {number} */
					var conditionIndex = 0;
					for (; conditionIndex < this.aLines.length; conditionIndex++) {
						this.fi = this.findIntersection(self, this.aLines[conditionIndex]);
						this.updateVector(this.fi, dt, false);
						/** @type {number} */
						var factor = self.radius - this.fi.len;
						if (factor >= 0) {
							self.p1.x += this.fi.dx * factor;
							self.p1.y += this.fi.dy * factor;
							var out = {
								dx: this.fi.lx,
								dy: this.fi.ly,
								lx: this.fi.dx,
								ly: this.fi.dy,
								b: 1,
								f: 1
							};
							var p = this.bounce(self, out);
							self.vx = p.vx;
							self.vy = p.vy;
						}
					}
					/** @type {number} */
					var j = 0;
					for (; j < this.aBalls.length; j++) {
						if (s != j && "holed" != this.aBalls[j].state) {
							var player = this.aBalls[j];
							this.vc = {};
							this.vc.p0 = self.p0;
							this.vc.p1 = player.p0;
							this.updateVector(this.vc, dt, true);
							var now = self.ballRadius + player.ballRadius;
							/** @type {number} */
							var distance = now - this.vc.len;
							if (distance >= 0) {
								self.p1.x -= this.vc.dx * distance;
								self.p1.y -= this.vc.dy * distance;
								var result = this.bounceBalls(self, player, this.vc);
								self.vx = result.vx1;
								self.vy = result.vy1;
								player.vx = result.vx2;
								player.vy = result.vy2;
								self.changeState("rebound");
								player.changeState("rebound");
							} else {
								if (distance >= -50) {
									/** @type {Object} */
									this.v3 = new Object;
									this.v3.p0 = self.p0;
									this.v3.p1 = {
										x: 0,
										y: 0
									};
									/** @type {number} */
									this.v3.vx = self.vx - player.vx;
									/** @type {number} */
									this.v3.vy = self.vy - player.vy;
									this.updateVector(this.v3, dt);
									var particle = this.projectVector(this.vc, this.v3.dx, this.v3.dy);
									this.vn = {};
									var logo_center = {
										x: self.p0.x + particle.vx,
										y: self.p0.y + particle.vy
									};
									this.vn.p0 = logo_center;
									this.vn.p1 = player.p0;
									this.updateVector(this.vn, dt, true);
									/** @type {number} */
									var span = now - this.vn.len;
									if (span > 0) {
										/** @type {number} */
										var i = Math.sqrt(now * now - this.vn.len * this.vn.len);
										if (this.p3 = {
												x: this.vn.p0.x - i * this.v3.dx,
												y: this.vn.p0.y - i * this.v3.dy
											}, this.v4 = {
												p0: self.p0,
												p1: this.p3
											}, this.updateVector(this.v4, dt, true), this.v4.len <= this.v3.len && this.dotP(this.v4, self) > 0) {
											/** @type {number} */
											var y = this.v4.len / this.v3.len;
											self.p1 = {
												x: self.p0.x + y * self.vx,
												y: self.p0.y + y * self.vy
											};
											player.p1 = {
												x: player.p0.x + y * player.vx,
												y: player.p0.y + y * player.vy
											};
											this.vc = {
												p0: self.p1,
												p1: player.p1
											};
											this.updateVector(this.vc, dt, true);
											result = this.bounceBalls(self, player, this.vc);
											self.vx = result.vx1;
											self.vy = result.vy1;
											player.vx = result.vx2;
											player.vy = result.vy2;
											this.makeVector(player);
											this.makeVector(self);
											self.changeState("rebound");
											player.changeState("rebound");
										}
									}
								}
							}
						}
					}
				}
			}
			this.drawAll(dt);
		}, $.prototype.updateVector = function (p, t, recurring) {
			if ("undefined" == typeof recurring) {
				/** @type {boolean} */
				recurring = false;
			}
			/** @type {number} */
			t = 0.0167;
			if (1 == recurring) {
				/** @type {number} */
				p.vx = p.p1.x - p.p0.x;
				/** @type {number} */
				p.vy = p.p1.y - p.p0.y;
			} else {
				p.p1.x = p.p0.x + 60 * p.vx * t;
				p.p1.y = p.p0.y + 60 * p.vy * t;
			}
			this.makeVector(p);
		}, $.prototype.makeVector = function (obj) {
			/** @type {number} */
			obj.len = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);
			if (obj.len > 0) {
				/** @type {number} */
				obj.dx = obj.vx / obj.len;
				/** @type {number} */
				obj.dy = obj.vy / obj.len;
			} else {
				/** @type {number} */
				obj.dx = 0;
				/** @type {number} */
				obj.dy = 0;
			}
			/** @type {number} */
			obj.rx = -obj.dy;
			obj.ry = obj.dx;
			obj.lx = obj.dy;
			/** @type {number} */
			obj.ly = -obj.dx;
		}, $.prototype.dotP = function (obj, self) {
			/** @type {number} */
			var dotP = obj.vx * self.vx + obj.vy * self.vy;
			return dotP;
		}, $.prototype.projectVector = function (p, dt, vy) {
			/** @type {number} */
			var vx = p.vx * dt + p.vy * vy;
			var dot = {};
			return dot.vx = vx * dt, dot.vy = vx * vy, dot;
		}, $.prototype.bounceBalls = function (obj, props, matrix) {
			var self = this.projectVector(obj, matrix.dx, matrix.dy);
			var p = this.projectVector(obj, matrix.lx, matrix.ly);
			var that = this.projectVector(props, matrix.dx, matrix.dy);
			var options = this.projectVector(props, matrix.lx, matrix.ly);
			/** @type {number} */
			var cur = obj.m * self.vx + props.m * that.vx;
			/** @type {number} */
			var d = self.vx - that.vx;
			/** @type {number} */
			var index = (cur + d * obj.m) / (obj.m + props.m);
			/** @type {number} */
			var y = index - d;
			/** @type {number} */
			cur = obj.m * self.vy + props.m * that.vy;
			/** @type {number} */
			d = self.vy - that.vy;
			/** @type {number} */
			var x = (cur + d * obj.m) / (obj.m + props.m);
			/** @type {number} */
			var diff = x - d;
			var style = {};
			return style.vx1 = p.vx + y, style.vy1 = p.vy + diff, style.vx2 = options.vx + index, style.vy2 = options.vy + x, style;
		}, $.prototype.bounce = function (p, matrix) {
			var ps = this.projectVector(p, matrix.dx, matrix.dy);
			var obj = this.projectVector(p, matrix.lx, matrix.ly);
			var A = {};
			return obj.len = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy), obj.vx = matrix.lx * obj.len, obj.vy = matrix.ly * obj.len, A.vx = p.f * matrix.f * ps.vx + p.b * matrix.b * obj.vx, A.vy = p.f * matrix.f * ps.vy + p.b * matrix.b * obj.vy, A;
		}, $.prototype.findIntersection = function (state, p) {
			var path = {};
			var particle = {};
			/** @type {number} */
			particle.vx = state.p1.x - p.p0.x;
			/** @type {number} */
			particle.vy = state.p1.y - p.p0.y;
			/** @type {number} */
			var s = particle.vx * p.dx + particle.vy * p.dy;
			if (0 > s) {
				path = particle;
			} else {
				var obj = {};
				/** @type {number} */
				obj.vx = state.p1.x - p.p1.x;
				/** @type {number} */
				obj.vy = state.p1.y - p.p1.y;
				/** @type {number} */
				s = obj.vx * p.dx + obj.vy * p.dy;
				path = s > 0 ? obj : this.projectVector(particle, p.lx, p.ly);
			}
			return path.p0 = {
				x: 0,
				y: 0
			}, path.p1 = {
				x: 0,
				y: 0
			}, path;
		}, $;
	}();
	eventHandle.Physics2D = elem;
}(Utils || (Utils = {}));
! function (eventHandle) {
	var elem = function () {
		/**
		 * @param {Array} far
		 * @param {Array} near
		 * @param {Object} _game
		 * @return {undefined}
		 */
		function Scene(far, near, _game) {
			/** @type {Array} */
			this.aLines = new Array;
			/** @type {Array} */
			this.aBalls = new Array;
			this.oLineData = {
				targBall: null,
				targBallRot: 0,
				bounceX: 0,
				bounceY: 0,
				bounceRot: 0,
				hyp: 0,
				aimRot: 0
			};
			/** @type {Array} */
			this.aLines = far;
			/** @type {Array} */
			this.aBalls = near;
			/** @type {Object} */
			this.cueBall = _game;
		}
		return Scene.prototype.checkLine = function (x2, dataAndEvents, x1, y1, line) {
			/** @type {number} */
			var x = this.cueBall.x - x1;
			/** @type {number} */
			var y = this.cueBall.y - y1;
			/** @type {number} */
			var n = Math.abs(x / y);
			/** @type {number} */
			this.oLineData.hyp = Math.sqrt(x * x + y * y);
			/** @type {number} */
			this.oLineData.aimRot = Math.atan2(y, x);
			if (Math.abs(x) > Math.abs(y)) {
				/** @type {number} */
				x = x > 0 ? 1 : -1;
				/** @type {number} */
				y = y > 0 ? 1 / n : -1 / n;
			} else {
				/** @type {number} */
				y = y > 0 ? 1 : -1;
				/** @type {number} */
				x = x > 0 ? 1 * n : -1 * n;
			}
			this.checkPosX = this.cueBall.x;
			this.checkPosY = this.cueBall.y;
			/** @type {null} */
			this.oLineData.targBall = null;
			/** @type {number} */
			var h = 0;
			for (; 700 > h; h++) {
				/** @type {null} */
				this.oLineData.targBall = null;
				/** @type {number} */
				var i = 0;
				for (; i < this.aBalls.length; i++) {
					if (this.aBalls[i] != this.cueBall) {
						/** @type {number} */
						var z0 = this.checkPosX - this.aBalls[i].x;
						/** @type {number} */
						var z1 = this.checkPosY - this.aBalls[i].y;
						/** @type {number} */
						var u = z0 * z0 + z1 * z1;
						if (784 > u) {
							this.oLineData.targBall = this.aBalls[i];
							this.oLineData.bounceX = this.checkPosX;
							this.oLineData.bounceY = this.checkPosY;
							/** @type {number} */
							this.oLineData.targBallRot = Math.atan2(-z1, -z0);
							if (this.oLineData.targBallRot - this.oLineData.aimRot > Math.PI) {
								this.oLineData.targBallRot -= 2 * Math.PI;
							} else {
								if (this.oLineData.targBallRot - this.oLineData.aimRot < -Math.PI) {
									this.oLineData.targBallRot += 2 * Math.PI;
								}
							}
							/** @type {number} */
							this.oLineData.bounceRot = this.oLineData.targBallRot > this.oLineData.aimRot ? this.oLineData.targBallRot - Math.PI / 2 : this.oLineData.targBallRot + Math.PI / 2;
						}
					}
				}
				if (null != this.oLineData.targBall) {
					break;
				}
				if (this.checkPosX > 375 || (this.checkPosX < 105 || (this.checkPosY < 109 + line || this.checkPosY > 691 + line))) {
					this.oLineData.bounceX = this.checkPosX;
					this.oLineData.bounceY = this.checkPosY;
					break;
				}
				this.checkPosX += x;
				this.checkPosY += y;
			}
			return this.oLineData;
		}, Scene;
	}();
	eventHandle.LinePredictor = elem;
}(Utils || (Utils = {}));
var requestAnimFrame = function () {
	return window.requestAnimationFrame || (window.webkitRequestAnimationFrame || (window.mozRequestAnimationFrame || (window.oRequestAnimationFrame || (window.msRequestAnimationFrame || function (after) {
		window.setTimeout(function() { after(); }, 1E3 / 60, (new Date).getTime());
	}))));
}();
var previousTime;
/** @type {(HTMLElement|null)} */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480, canvas.height = 800;
var canvasX;
var canvasY;
var canvasScaleX;
var canvasScaleY;
/** @type {(HTMLElement|null)} */
var div = document.getElementById("viewporter");

/** @type {boolean} */
var disabledTimer = localStorage['disabledTimer'] === '1';
var splash;
/** @type {number} */
var splashTimer = 0;
var assetLib;
var preAssetLib;
/** @type {boolean} */
var rotatePause = false;
/** @type {boolean} */
var manualPause = false;
/** @type {boolean} */
var isMobile = false;
/** @type {string} */
var gameState = "loading";
/** @type {Array} */
var aLangs = new Array("EN");
/** @type {string} */
var curLang = "";
/** @type {boolean} */
var isBugBrowser = false;
/** @type {boolean} */
var isIE10 = false;
if (navigator.userAgent.match(/MSIE\s([\d]+)/)) {
	/** @type {boolean} */
	isIE10 = true;
}
/** @type {string} */
var deviceAgent = navigator.userAgent.toLowerCase();
var userInput = new Utils.UserInput(canvas, isBugBrowser);
resizeCanvas(), window.onresize = function () {
	setTimeout(function () {
		resizeCanvas();
	}, 1);
}, window.addEventListener("load", function () {
	setTimeout(function () {
		resizeCanvas();
	}, 0);
	window.addEventListener("orientationchange", function () {
		resizeCanvas();
	}, false);
});
var panel;
var hud;
var background;
var table;
var cueBall;
var arrow;
var physics2D;
var gameTouchState;
var oPosData = {
	prevBallX: 0,
	prevBallY: 0,
	stageX: 0,
	stageY: 0,
	targStageX: 0,
	targStageY: 0,
	startDragX: 0,
	startDragY: 0,
	startStageX: 0,
	startStageY: 0
};
var shotsSinceLastPot;
/** @type {number} */
var startTime = 120;
/** @type {number} */
var levelWidth = 480;
/** @type {number} */
var levelHeight = 800;
var levelNum;
var aimX;
var aimY;
var targAimX;
var targAimY;
/** @type {Array} */
var aHolePos = new Array;
/** @type {number} */
var buffer = 0;
var aBalls;
var aHoles;
var gameTimer;
var curPotScore;
var streak;
var newRackStart;
var newRackY;
var isBreakOff;
var linePredictor;
var saver;
var oBonusData = {
	secType: 0,
	x: 0,
	y: 0,
	scale: 1,
	life: 0
};
/** @type {Array} */
var aLevelData = new Array({
	aData: [{
		type: "ball",
		p0: {
			x: 261,
			y: 206
		},
		p1: {
			x: 261,
			y: 206
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 185
		},
		p1: {
			x: 240,
			y: 185
		}
  }, {
		type: "ball",
		p0: {
			x: 261,
			y: 249
		},
		p1: {
			x: 261,
			y: 249
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 270
		},
		p1: {
			x: 240,
			y: 270
		}
  }, {
		type: "ball",
		p0: {
			x: 218,
			y: 249
		},
		p1: {
			x: 218,
			y: 249
		}
  }, {
		type: "ball",
		p0: {
			x: 218,
			y: 206
		},
		p1: {
			x: 218,
			y: 206
		}
  }, {
		type: "ball",
		p0: {
			x: 197,
			y: 228
		},
		p1: {
			x: 197,
			y: 228
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 228
		},
		p1: {
			x: 240,
			y: 228
		}
  }, {
		type: "ball",
		p0: {
			x: 282,
			y: 228
		},
		p1: {
			x: 282,
			y: 228
		}
  }, {
		type: "cueBall",
		p0: {
			x: 240,
			y: 591
		},
		p1: {
			x: 240,
			y: 591
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 106
		},
		p1: {
			x: 384,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 400,
			y: 400
		},
		p1: {
			x: 400,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 693
		},
		p1: {
			x: 384,
			y: 693
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 106
		},
		p1: {
			x: 97,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 80,
			y: 400
		},
		p1: {
			x: 80,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 693
		},
		p1: {
			x: 97,
			y: 693
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 90
		},
		p1: {
			x: 354,
			y: 90
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 710
		},
		p1: {
			x: 354,
			y: 710
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 365
		},
		p1: {
			x: 400,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 663
		},
		p1: {
			x: 400,
			y: 435
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 365
		},
		p1: {
			x: 80,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 663
		},
		p1: {
			x: 80,
			y: 435
		}
  }]
}, {
	aData: [{
		type: "ball",
		p0: {
			x: 219,
			y: 269
		},
		p1: {
			x: 219,
			y: 269
		}
  }, {
		type: "ball",
		p0: {
			x: 262,
			y: 227
		},
		p1: {
			x: 262,
			y: 227
		}
  }, {
		type: "ball",
		p0: {
			x: 283,
			y: 206
		},
		p1: {
			x: 283,
			y: 206
		}
  }, {
		type: "ball",
		p0: {
			x: 198,
			y: 290
		},
		p1: {
			x: 198,
			y: 290
		}
  }, {
		type: "ball",
		p0: {
			x: 262,
			y: 269
		},
		p1: {
			x: 262,
			y: 269
		}
  }, {
		type: "ball",
		p0: {
			x: 241,
			y: 248
		},
		p1: {
			x: 241,
			y: 248
		}
  }, {
		type: "ball",
		p0: {
			x: 219,
			y: 227
		},
		p1: {
			x: 219,
			y: 227
		}
  }, {
		type: "ball",
		p0: {
			x: 198,
			y: 206
		},
		p1: {
			x: 198,
			y: 206
		}
  }, {
		type: "ball",
		p0: {
			x: 283,
			y: 290
		},
		p1: {
			x: 283,
			y: 290
		}
  }, {
		type: "cueBall",
		p0: {
			x: 241,
			y: 592
		},
		p1: {
			x: 241,
			y: 592
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 106
		},
		p1: {
			x: 384,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 400,
			y: 400
		},
		p1: {
			x: 400,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 693
		},
		p1: {
			x: 384,
			y: 693
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 106
		},
		p1: {
			x: 97,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 80,
			y: 400
		},
		p1: {
			x: 80,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 693
		},
		p1: {
			x: 97,
			y: 693
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 90
		},
		p1: {
			x: 354,
			y: 90
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 710
		},
		p1: {
			x: 354,
			y: 710
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 365
		},
		p1: {
			x: 400,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 663
		},
		p1: {
			x: 400,
			y: 435
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 365
		},
		p1: {
			x: 80,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 663
		},
		p1: {
			x: 80,
			y: 435
		}
  }]
}, {
	aData: [{
		type: "ball",
		p0: {
			x: 291,
			y: 228
		},
		p1: {
			x: 291,
			y: 228
		}
  }, {
		type: "ball",
		p0: {
			x: 315,
			y: 198
		},
		p1: {
			x: 315,
			y: 198
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 258
		},
		p1: {
			x: 240,
			y: 258
		}
  }, {
		type: "ball",
		p0: {
			x: 210,
			y: 258
		},
		p1: {
			x: 210,
			y: 258
		}
  }, {
		type: "ball",
		p0: {
			x: 188,
			y: 228
		},
		p1: {
			x: 188,
			y: 228
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 173
		},
		p1: {
			x: 240,
			y: 173
		}
  }, {
		type: "ball",
		p0: {
			x: 165,
			y: 198
		},
		p1: {
			x: 165,
			y: 198
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 218
		},
		p1: {
			x: 240,
			y: 218
		}
  }, {
		type: "ball",
		p0: {
			x: 270,
			y: 258
		},
		p1: {
			x: 270,
			y: 258
		}
  }, {
		type: "cueBall",
		p0: {
			x: 240,
			y: 591
		},
		p1: {
			x: 240,
			y: 591
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 106
		},
		p1: {
			x: 384,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 400,
			y: 400
		},
		p1: {
			x: 400,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 693
		},
		p1: {
			x: 384,
			y: 693
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 106
		},
		p1: {
			x: 97,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 80,
			y: 400
		},
		p1: {
			x: 80,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 693
		},
		p1: {
			x: 97,
			y: 693
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 90
		},
		p1: {
			x: 354,
			y: 90
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 710
		},
		p1: {
			x: 354,
			y: 710
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 365
		},
		p1: {
			x: 400,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 663
		},
		p1: {
			x: 400,
			y: 435
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 365
		},
		p1: {
			x: 80,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 663
		},
		p1: {
			x: 80,
			y: 435
		}
  }]
}, {
	aData: [{
		type: "ball",
		p0: {
			x: 285,
			y: 229
		},
		p1: {
			x: 285,
			y: 229
		}
  }, {
		type: "ball",
		p0: {
			x: 270,
			y: 199
		},
		p1: {
			x: 270,
			y: 199
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 274
		},
		p1: {
			x: 240,
			y: 274
		}
  }, {
		type: "ball",
		p0: {
			x: 210,
			y: 259
		},
		p1: {
			x: 210,
			y: 259
		}
  }, {
		type: "ball",
		p0: {
			x: 195,
			y: 229
		},
		p1: {
			x: 195,
			y: 229
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 184
		},
		p1: {
			x: 240,
			y: 184
		}
  }, {
		type: "ball",
		p0: {
			x: 210,
			y: 199
		},
		p1: {
			x: 210,
			y: 199
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 229
		},
		p1: {
			x: 240,
			y: 229
		}
  }, {
		type: "ball",
		p0: {
			x: 270,
			y: 259
		},
		p1: {
			x: 270,
			y: 259
		}
  }, {
		type: "cueBall",
		p0: {
			x: 240,
			y: 591
		},
		p1: {
			x: 240,
			y: 591
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 106
		},
		p1: {
			x: 384,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 400,
			y: 400
		},
		p1: {
			x: 400,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 693
		},
		p1: {
			x: 384,
			y: 693
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 106
		},
		p1: {
			x: 97,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 80,
			y: 400
		},
		p1: {
			x: 80,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 693
		},
		p1: {
			x: 97,
			y: 693
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 90
		},
		p1: {
			x: 354,
			y: 90
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 710
		},
		p1: {
			x: 354,
			y: 710
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 365
		},
		p1: {
			x: 400,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 663
		},
		p1: {
			x: 400,
			y: 435
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 365
		},
		p1: {
			x: 80,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 663
		},
		p1: {
			x: 80,
			y: 435
		}
  }]
}, {
	aData: [{
		type: "ball",
		p0: {
			x: 225,
			y: 245
		},
		p1: {
			x: 225,
			y: 245
		}
  }, {
		type: "ball",
		p0: {
			x: 256,
			y: 245
		},
		p1: {
			x: 256,
			y: 245
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 219
		},
		p1: {
			x: 240,
			y: 219
		}
  }, {
		type: "ball",
		p0: {
			x: 210,
			y: 219
		},
		p1: {
			x: 210,
			y: 219
		}
  }, {
		type: "ball",
		p0: {
			x: 271,
			y: 219
		},
		p1: {
			x: 271,
			y: 219
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 400
		},
		p1: {
			x: 240,
			y: 400
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 333
		},
		p1: {
			x: 240,
			y: 333
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 160
		},
		p1: {
			x: 240,
			y: 160
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 272
		},
		p1: {
			x: 240,
			y: 272
		}
  }, {
		type: "cueBall",
		p0: {
			x: 240,
			y: 591
		},
		p1: {
			x: 240,
			y: 591
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 106
		},
		p1: {
			x: 384,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 400,
			y: 400
		},
		p1: {
			x: 400,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 693
		},
		p1: {
			x: 384,
			y: 693
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 106
		},
		p1: {
			x: 97,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 80,
			y: 400
		},
		p1: {
			x: 80,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 693
		},
		p1: {
			x: 97,
			y: 693
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 90
		},
		p1: {
			x: 354,
			y: 90
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 710
		},
		p1: {
			x: 354,
			y: 710
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 365
		},
		p1: {
			x: 400,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 663
		},
		p1: {
			x: 400,
			y: 435
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 365
		},
		p1: {
			x: 80,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 663
		},
		p1: {
			x: 80,
			y: 435
		}
  }]
}, {
	aData: [{
		type: "ball",
		p0: {
			x: 210,
			y: 200
		},
		p1: {
			x: 210,
			y: 200
		}
  }, {
		type: "ball",
		p0: {
			x: 270,
			y: 200
		},
		p1: {
			x: 270,
			y: 200
		}
  }, {
		type: "ball",
		p0: {
			x: 300,
			y: 210
		},
		p1: {
			x: 300,
			y: 210
		}
  }, {
		type: "ball",
		p0: {
			x: 180,
			y: 210
		},
		p1: {
			x: 180,
			y: 210
		}
  }, {
		type: "ball",
		p0: {
			x: 150,
			y: 220
		},
		p1: {
			x: 150,
			y: 220
		}
  }, {
		type: "ball",
		p0: {
			x: 330,
			y: 220
		},
		p1: {
			x: 330,
			y: 220
		}
  }, {
		type: "ball",
		p0: {
			x: 120,
			y: 230
		},
		p1: {
			x: 120,
			y: 230
		}
  }, {
		type: "ball",
		p0: {
			x: 360,
			y: 230
		},
		p1: {
			x: 360,
			y: 230
		}
  }, {
		type: "ball",
		p0: {
			x: 240,
			y: 190
		},
		p1: {
			x: 240,
			y: 190
		}
  }, {
		type: "cueBall",
		p0: {
			x: 240,
			y: 591
		},
		p1: {
			x: 240,
			y: 591
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 106
		},
		p1: {
			x: 384,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 400,
			y: 400
		},
		p1: {
			x: 400,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 384,
			y: 693
		},
		p1: {
			x: 384,
			y: 693
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 106
		},
		p1: {
			x: 97,
			y: 106
		}
  }, {
		type: "hole",
		p0: {
			x: 80,
			y: 400
		},
		p1: {
			x: 80,
			y: 400
		}
  }, {
		type: "hole",
		p0: {
			x: 97,
			y: 693
		},
		p1: {
			x: 97,
			y: 693
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 90
		},
		p1: {
			x: 354,
			y: 90
		}
  }, {
		type: "wall",
		p0: {
			x: 127,
			y: 710
		},
		p1: {
			x: 354,
			y: 710
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 365
		},
		p1: {
			x: 400,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 401,
			y: 663
		},
		p1: {
			x: 400,
			y: 435
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 365
		},
		p1: {
			x: 80,
			y: 137
		}
  }, {
		type: "wall",
		p0: {
			x: 81,
			y: 663
		},
		p1: {
			x: 80,
			y: 435
		}
  }]
});
loadPreAssets();