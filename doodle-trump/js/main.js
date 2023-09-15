function Platform() {
	this.width = 70, this.height = 17, this.x = Math.random() * (width - this.width), this.y = position, position += height / platformCount, this.flag = 0, this.state = 0, this.cx = 0, this.cy = 0, this.cwidth = 105, this.cheight = 31, this.draw = function () {
		try {
			1 == this.type ? this.cy = 0 : 2 == this.type ? this.cy = 61 : 3 == this.type && 0 === this.flag ? this.cy = 31 : 3 == this.type && 1 == this.flag ? this.cy = 1e3 : 4 == this.type && 0 === this.state ? this.cy = 90 : 4 == this.type && 1 == this.state && (this.cy = 1e3), ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
		} catch (e) {}
	}, this.types = score >= 5e3 ? [2, 3, 3, 3, 4, 4, 4, 4] : score >= 2e3 && score < 5e3 ? [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4] : score >= 1e3 && score < 2e3 ? [2, 2, 2, 3, 3, 3, 3, 3] : score >= 500 && score < 1e3 ? [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3] : score >= 100 && score < 500 ? [1, 1, 1, 1, 2, 2] : [1], this.type = this.types[Math.floor(Math.random() * this.types.length)], 3 == this.type && broken < 1 ? broken++ : 3 == this.type && broken >= 1 && (this.type = 1, broken = 0), this.moved = 0, this.vx = 1
}

function init() {
	function e() {
		ctx.clearRect(0, 0, width, height)
	}

	function t() {
		"left" == o ? (player.dir = "left", player.vy < -7 && player.vy > -15 && (player.dir = "left_land")) : "right" == o && (player.dir = "right", player.vy < -7 && player.vy > -15 && (player.dir = "right_land")), document.onkeydown = function (e) {
			var t = e.keyCode;
			37 == t ? (o = "left", player.isMovingLeft = !0) : 39 == t && (o = "right", player.isMovingRight = !0), 32 == t && (!0 === firstRun ? init() : reset())
		}, document.onkeyup = function (e) {
			var t = e.keyCode;
			37 == t ? (o = "left", player.isMovingLeft = !1) : 39 == t && (o = "right", player.isMovingRight = !1)
		}, !0 === player.isMovingLeft ? (player.x += player.vx, player.vx -= .15) : (player.x += player.vx, player.vx < 0 && (player.vx += .1)), !0 === player.isMovingRight ? (player.x += player.vx, player.vx += .15) : (player.x += player.vx, player.vx > 0 && (player.vx -= .1)), player.vx > 8 ? player.vx = 8 : player.vx < -8 && (player.vx = -8), player.y + player.height > base.y && base.y < height && player.jump(), base.y > height && player.y + player.height > height && "lol" != player.isDead && (player.isDead = !0), player.x > width ? player.x = 0 - player.width : player.x < 0 - player.width && (player.x = width), player.y >= height / 2 - player.height / 2 ? (player.y += player.vy, player.vy += gravity) : (platforms.forEach(function (e, t) {
			player.vy < 0 && (e.y -= player.vy), e.y > height && (platforms[t] = new Platform, platforms[t].y = e.y - height)
		}), base.y -= player.vy, player.vy += gravity, player.vy >= 0 && (player.y += player.vy, player.vy += gravity), score++), r(), !0 === player.isDead && h()
	}

	function i() {
		var e = Spring,
			t = platforms[0];
		1 == t.type || 2 == t.type ? (e.x = t.x + t.width / 2 - e.width / 2, e.y = t.y - t.height - 10, e.y > height / 1.1 && (e.state = 0), e.draw()) : (e.x = 0 - e.width, e.y = 0 - e.height)
	}

	function a() {
		var e = platform_broken_substitute;
		platforms.forEach(function (t, i) {
			2 == t.type && ((t.x < 0 || t.x + t.width > width) && (t.vx *= -1), t.x += t.vx), 1 == t.flag && !1 === e.appearance && 0 === y && (e.x = t.x, e.y = t.y, e.appearance = !0, y++), t.draw()
		}), !0 === e.appearance && (e.draw(), e.y += 8), e.y > height && (e.appearance = !1)
	}

	function r() {
		platforms.forEach(function (e, t) {
			if (player.vy > 0 && 0 === e.state && player.x + 15 < e.x + e.width && player.x + player.width - 15 > e.x && player.y + player.height > e.y && player.y + player.height < e.y + e.height) {
				if (3 == e.type && 0 === e.flag) return e.flag = 1, void(y = 0);
				if (4 == e.type && 0 === e.state) player.jump(), e.state = 1;
				else {
					if (1 == e.flag) return;
					player.jump()
				}
			}
		});
		var e = Spring;
		player.vy > 0 && 0 === e.state && player.x + 15 < e.x + e.width && player.x + player.width - 15 > e.x && player.y + player.height > e.y && player.y + player.height < e.y + e.height && (e.state = 1, player.jumpHigh(), china.play())
	}

	function n() {
		var e = document.getElementById("score");
		e.textContent = score
	}

	function h() {
		platforms.forEach(function (e, t) {
			e.y -= 12, greatWall.play()
		}), player.y > height / 2 && 0 === flag ? (player.y -= 8, player.vy = 0) : player.y < height / 2 ? flag = 1 : player.y + player.height > height && (showGoMenu(), hideScore(), player.isDead = "lol")
	}

	function s() {
		e(), a(), i(), t(), player.draw(), base.draw(), n()
	}
	var o = "left",
		y = 0;
	firstRun = !1, menuLoop = function () {}, animloop = function () {
		s(), requestAnimFrame(animloop)
	}, animloop(), hideMenu(), showScore()
}

function reset() {
	hideGoMenu(), showScore(), player.isDead = !1, flag = 0, position = 0, score = 0, base = new Base, player = new Player, Spring = new spring, platform_broken_substitute = new Platform_broken_substitute, platforms = [];
	for (var e = 0; e < platformCount; e++) platforms.push(new Platform)
}

function hideMenu() {
	var e = document.getElementById("mainMenu");
	e.style.zIndex = -1
}

function showGoMenu() {
	var e = document.getElementById("gameOverMenu");
	e.style.zIndex = 1, e.style.visibility = "visible";
	var t = document.getElementById("go_score");
	t.textContent = score;
	var i = parseInt(localStorage.best_score) || 0;
	i < score && (localStorage.best_score = score, document.getElementById("go_best_score").textContent = score)
}

function hideGoMenu() {
	var e = document.getElementById("gameOverMenu");
	e.style.zIndex = -1, e.style.visibility = "hidden"
}

function showScore() {
	var e = document.getElementById("scoreBoard");
	e.style.zIndex = 1
}

function hideScore() {
	var e = document.getElementById("scoreBoard");
	e.style.zIndex = -1
}

function playerJump() {
	player.y += player.vy, player.vy += gravity, player.vy > 0 && player.x + 15 < 260 && player.x + player.width - 15 > 155 && player.y + player.height > 475 && player.y + player.height < 500 && player.jump(), "left" == dir ? (player.dir = "left", player.vy < -7 && player.vy > -15 && (player.dir = "left_land")) : "right" == dir && (player.dir = "right", player.vy < -7 && player.vy > -15 && (player.dir = "right_land")), document.onkeydown = function (e) {
		var t = e.keyCode;
		37 == t ? (dir = "left", player.isMovingLeft = !0) : 39 == t && (dir = "right", player.isMovingRight = !0), 32 == t && (!0 === firstRun ? (init(), firstRun = !1) : reset())
	}, document.onkeyup = function (e) {
		var t = e.keyCode;
		37 == t ? (dir = "left", player.isMovingLeft = !1) : 39 == t && (dir = "right", player.isMovingRight = !1)
	}, !0 === player.isMovingLeft ? (player.x += player.vx, player.vx -= .15) : (player.x += player.vx, player.vx < 0 && (player.vx += .1)), !0 === player.isMovingRight ? (player.x += player.vx, player.vx += .15) : (player.x += player.vx, player.vx > 0 && (player.vx -= .1)), player.y + player.height > base.y && base.y < height && player.jump(), player.x > width ? player.x = 0 - player.width : player.x < 0 - player.width && (player.x = width), player.draw()
}

function update() {
	ctx.clearRect(0, 0, width, height), playerJump()
}
window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
	window.setTimeout(function () {
		e()
	}, 1e3 / 60)
};
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = 422,
	height = 552;
canvas.width = width, canvas.height = height;
var china = new Audio;
china.src = "audio/china.mp3", china.play();
var greatWall = new Audio;
greatWall.src = "audio/greatWall.mp3";
var bing01 = new Audio;
bing01.src = "audio/bing01.mp3";
var bing02 = new Audio;
bing02.src = "audio/bing02.mp3";
var bing03 = new Audio;
bing03.src = "audio/bing03.mp3";
var bing04 = new Audio;
bing04.src = "audio/bing04.mp3";
var bing05 = new Audio;
bing05.src = "audio/bing05.mp3";
var bing06 = new Audio;
bing06.src = "audio/bing06.mp3";
var bing07 = new Audio;
bing07.src = "audio/bing07.mp3";
var bing08 = new Audio;
bing08.src = "audio/bing08.mp3";
var bing09 = new Audio;
bing09.src = "audio/bing09.mp3";
var player, animloop, menuloop, dir, platforms = [],
	image = document.getElementById("sprite"),
	platformCount = 10,
	position = 0,
	gravity = .2,
	flag = 0,
	broken = 0,
	score = 0,
	firstRun = !0,
	gameCount = parseInt(localStorage.gameCount) || 0,
	sentToFlappyTrump = parseInt(localStorage.sentToFlappyTrump) || 0,
	Base = function () {
		this.height = 5, this.width = width, this.cx = 0, this.cy = 614, this.cwidth = 100, this.cheight = 5, this.moved = 0, this.x = 0, this.y = height - this.height, this.draw = function () {
			try {
				ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
			} catch (e) {}
		}
	},
	base = new Base,
	Player = function () {
		this.vy = 11, this.vx = 0, this.isMovingLeft = !1, this.isMovingRight = !1, this.isDead = !1, this.width = 55, this.height = 40, this.cx = 0, this.cy = 0, this.cwidth = 110, this.cheight = 80, this.dir = "left", this.x = width / 2 - this.width / 2, this.y = height, this.draw = function () {
			try {
				"right" == this.dir ? this.cy = 121 : "left" == this.dir ? this.cy = 201 : "right_land" == this.dir ? this.cy = 289 : "left_land" == this.dir && (this.cy = 371), ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
			} catch (e) {}
		};
		var e = 0;
		this.jump = function () {
			switch (this.vy = -8, e += 1, e) {
				case 0:
					break;
				case 1:
					bing01.play();
					break;
				case 2:
					bing02.play();
					break;
				case 3:
					bing03.play();
					break;
				case 4:
					bing04.play();
					break;
				case 5:
					bing05.play();
					break;
				case 6:
					bing06.play();
					break;
				case 7:
					bing07.play();
					break;
				case 8:
					bing08.play();
					break;
				case 9:
					bing09.play(), e = 0
			}
		}, this.jumpHigh = function () {
			this.vy = -16
		}
	};
player = new Player;
for (var i = 0; i < platformCount; i++) platforms.push(new Platform);
var Platform_broken_substitute = function () {
		this.height = 30, this.width = 70, this.x = 0, this.y = 0, this.cx = 0, this.cy = 554, this.cwidth = 105, this.cheight = 60, this.appearance = !1, this.draw = function () {
			try {
				if (!0 !== this.appearance) return;
				ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
			} catch (e) {}
		}
	},
	platform_broken_substitute = new Platform_broken_substitute,
	spring = function () {
		this.x = 0, this.y = 0, this.width = 26, this.height = 30, this.cx = 0, this.cy = 0, this.cwidth = 45, this.cheight = 53, this.state = 0, this.draw = function () {
			try {
				0 === this.state ? this.cy = 445 : 1 == this.state && (this.cy = 501), ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
			} catch (e) {}
		}
	},
	Spring = new spring;
menuLoop = function () {
	update(), requestAnimFrame(menuLoop)
}, document.addEventListener("DOMContentLoaded", function (e) {
	for (var t = document.querySelectorAll("[l_content]"), i = 0; i < t.length; i++) t[i].textContent = chrome.i18n.getMessage(t[i].getAttribute("l_content"));
	var a = parseInt(localStorage.best_score) || 0;
	document.getElementById("best_score").textContent = a, document.getElementById("go_best_score").textContent = a, menuLoop(), document.getElementById("start_btn").addEventListener("click", function () {
		init()
	}), document.getElementById("restart_btn").addEventListener("click", function () {
		reset()
	})
});