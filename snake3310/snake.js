var oggs = Array("bip")
  , sounds = Array(oggs.length)
  , keys = {
    87: "up",
    68: "right",
    83: "down",
    65: "left",
    38: "up",
    39: "right",
    40: "down",
    37: "left"
}
  , levels = [{
    level: 5,
    speed: 130
}, {
    level: 9,
    speed: 90
}, {
    level: 13,
    speed: 60
}]
  , mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  , clicktouch = mobile ? "ontouchstart" : "onclick"
  , s = {
    init: function() {
        window.addEventListener("resize", function() {
            setTimeout(s.resizeScreen, 16)
        }, !1),
        setTimeout(s.resizeScreen, 100)
        for (var e = 0; e < oggs.length; e++)
            sounds[e] = new Audio(""),
            sounds[e].src = "" + oggs[e] + ".mp3",
            sounds[e].volume = .1
        $("#keypad").html('<div style="top:400px;left:156px;" class="mobilebutton" id="upkey"></div><div style="top:540px;left:155px;" class="mobilebutton" id="downkey"></div><div style="top:453px;left:16px;" class="mobilebutton" id="leftkey"></div><div style="top:453px;left:294px;" class="mobilebutton" id="rightkey"></div>'),
        $(".mobilebutton").bind("touchstart", function(e) {
            s.changedir(this.id.replace("key", ""), e)
        }),
        s.showTitle()
    },
    showTitle: function() {
        s.destroy(),
        s.paused = !1,
        s.gaming = !1,
        /\d/.test(location.host) && (s.showInfo(),
        $(document).keydown(function(e) {
            keys[e.keyCode] && s.gaming && s.changedir(keys[e.keyCode], e)
        }))
    },
    showInfo: function() {
        $("#container").html('<div id="info"><img src="logo.png" style="margin-top:-5px;height:106px;"><div ' + clicktouch + '="setTimeout(s.showMode,mobile?100:1);" class="menubutton">New Game</div><a href="https://classroom-6x.org/" target="_BLANK"><div class="menubutton">More Games</div></a>' + (mobile ? "" : '<div id="menubutton"><div class="menubutton" onclick="s.showEmbed();">Add to your website</div></div>') + "</div>"),
        mobile && $(".menubutton").css("marginTop", 17)
    },
    showEmbed: function() {
        $("#info").html('<br>Copy and paste the code below:<br><input type="text" value="<iframe src=https://classroom-6x.org?embed=snake2&quot; style=&quot;width:415px;height:676px;border:none;&quot; frameborder=&quot;0&quot; scrolling=&quot;no&quot;></iframe>" onclick="this.select();"><br><div class="menubutton" onclick="s.showInfo();">< Back to menu</div>')
    },
    showMode: function() {
        $("#container").html('<div id="info" style="margin-top:6px;">Select Mode:<br><br><table style="width:100%;"><tr><td><span class="menubutton" ' + clicktouch + '="s.startGame(0);">EASY</span></td><td><span class="menubutton" ' + clicktouch + '="s.startGame(1);">MEDIUM</span></td><td><span class="menubutton" ' + clicktouch + '="s.startGame(2);">HARD</span></td></tr><table><br>' + (mobile ? "Control snake using 2/4/6/8 keys" : "Control snake using arrow keys or WASD") + "</div>")
    },
    resizeScreen: function() {
        var e = $("#container").width()
          , s = $("#container").height()
          , d = window.innerHeight
          , t = window.innerWidth
          , i = d / s
          , o = t / e
        o / i > 1.2 && (o = i),
        $("#game").css("transform", "scale(" + o + ", " + i + ")")
    },
    startGame: function(e) {
        s.createGameDOM(),
        s.adder = [],
        s.adder[0] = new s.setSection(9,5,"head","right")
        for (var d = 6; d; d--)
            s.addSection()
        s.level = levels[e].level,
        s.speed = levels[e].speed,
        s.score = 0,
        s.refreshScore(),
        s.scoreCount = 0,
        s.setFood(),
        s.bug = {
            x: 0,
            y: 0
        },
        s.bugFree = !1,
        s.bugCount = -1,
        s.reanude(),
        s.gaming = !0
    },
    destroy: function() {
        $(document).unbind("keydown"),
        $("#container").html(""),
        s.pause()
    },
    createGameDOM: function() {
        for (var e = "", s = 9; s; s--)
            for (var d = 1; 21 > d; d++)
                e += '<div id="x' + d + "y" + s + '"></div>'
        $("#container").html("").append($("<div>", {
            id: "score"
        }).append($("<div>", {
            id: "left",
            "class": "scores"
        }).append($("<div>", {
            id: "n1"
        })).append($("<div>", {
            id: "n2"
        })).append($("<div>", {
            id: "n3"
        })).append($("<div>", {
            id: "n4"
        }))).append($("<div>", {
            id: "right",
            "class": "scores"
        }).append($("<div>", {
            id: "b1"
        })).append($("<div>", {
            id: "b2"
        })).append($("<div>", {
            id: "b3"
        })).append($("<div>", {
            id: "b4"
        })))).append($("<div>", {
            id: "box",
            html: e
        }))
    },
    animate: function() {
        var e = (new Date).getTime()
        s.time || (s.time = e),
        e - s.time > s.speed && (s.time = e,
        s.move(),
        s.checkFood(),
        s.checkHit() || s.refresh())
    },
    move: function() {
        var e = []
          , d = []
        for (i in s.adder)
            i = parseInt(i),
            e[i] = new s.setSection(s.adder[i].x,s.adder[i].y,s.adder[i].type,s.adder[i].dir,s.adder[i].bola),
            0 == i ? ("up" == s.adder[i].dir ? s.adder[i].y = s.adder[i].y + 1 > 9 ? 1 : s.adder[i].y + 1 : "right" == s.adder[i].dir ? s.adder[i].x = s.adder[i].x + 1 > 20 ? 1 : s.adder[i].x + 1 : "down" == s.adder[i].dir ? s.adder[i].y = s.adder[i].y - 1 < 1 ? 9 : s.adder[i].y - 1 : "left" == s.adder[i].dir && (s.adder[i].x = s.adder[i].x - 1 < 1 ? 20 : s.adder[i].x - 1),
            s.adder[i].bola = "") : (s.adder[i].x = e[i - 1].x,
            s.adder[i].y = e[i - 1].y,
            s.adder[i].dir = /((?:left$)|(?:right$)|(?:up$)|(?:down$))/.exec(e[i - 1].dir)[0],
            s.adder[i].bola = e[i - 1].bola,
            "corner" == e[i - 1].type && (s.adder[i - 1].type = "body")),
            d[i] = s.adder[i].dir
        for (i in s.adder)
            i = parseInt(i),
            d[i] && d[i + 1] && d[i] != d[i + 1] && (s.adder[i].type = "corner",
            s.adder[i].dir = d[i + 1] + d[i])
        s.bugFree && s.bugCount--,
        0 == s.bugCount && s.bugOut()
    },
    checkFood: function() {
        var e = s.adder[0]
          , d = e.x
          , t = e.y
        "up" == e.dir ? t++ : "down" == e.dir ? t-- : "right" == e.dir ? d++ : "left" == e.dir && d--,
        s.food.x == d && s.food.y == t || s.bugFree && (d == s.bug.x || d == s.bug.x + 1) && t == s.bug.y ? s.adder[0].type = "eath" : s.adder[0].type = "head",
        !s.bugFree || e.x != s.bug.x && e.x != s.bug.x + 1 || e.y != s.bug.y || (s.addSection(),
        s.adder[0].bola = "bola",
        s.score += s.level * s.bugCount,
        sounds[0].play(),
        s.bugOut(),
        s.refreshScore()),
        s.food.x == e.x && s.food.y == e.y && (s.setFood(),
        s.addSection(),
        s.adder[0].bola = "bola",
        s.score += s.level,
        sounds[0].play(),
        s.scoreCount++ % 5 == 4 && s.setBug(),
        s.refreshScore())
    },
    checkHit: function() {
        var e = s.adder[0]
          , d = e.x
          , t = e.y
        for (i in s.adder)
            if ("0" != i && s.adder[i].x == d && s.adder[i].y == t)
                return s.crash(),
                !0
        return !1
    },
    crash: function() {
        s.gaming = !1,
        s.paused = !0
        for (var e = 450; 4050 > e; e += 900)
            setTimeout("$('.snake').css('opacity', 0);", e),
            setTimeout("$('.snake').css('opacity', 1);", e + 450)
        setTimeout("s.showTitle();", 4450),
        s.pause()
    },
    showGameOver: function() {
        $(".snake").css("opacity", 0),
        $("#container").append('<div id="gameover">GAME OVER!<br>You scored ' + s.score + '<br><div class="menubutton" ' + clicktouch + '="s.showTitle();">CONTINUE</div>')
    },
    pause: function() {
        clearInterval(s.timer)
    },
    reanude: function() {
        s.refresh(),
        setTimeout(function() {
            s.timer = setInterval(s.animate, 10)
        }, 500)
    },
    setFood: function() {
        s.food = {
            x: parseInt(20 * Math.random()) + 1,
            y: parseInt(9 * Math.random()) + 1
        }
        for (i in s.adder)
            (s.adder[i].x == s.food.x && s.adder[i].y == s.food.y || s.bugFree && (s.food.x == s.bug.x || s.food.x == s.bug.x + 1) && s.food.y == s.bug.y) && s.setFood()
    },
    setBug: function() {
        s.bug = {
            x: parseInt(19 * Math.random()) + 1,
            y: parseInt(9 * Math.random()) + 1,
            type: parseInt(5 * Math.random()) + 1
        }
        for (i in s.adder)
            if ((s.adder[i].x == s.bug.x || s.adder[i].x == s.bug.x + 1) && s.adder[i].y == s.bug.y || (s.food.x == s.bug.x || s.food.x == s.bug.x + 1) && s.food.y == s.bug.y)
                return s.setBug(),
                !1
        s.bugFree = !0,
        s.bugCount = 21
    },
    bugOut: function() {
        s.bugFree = !1,
        s.bugCount = -1,
        $("#right div").removeAttr("class")
    },
    changedir: function(e, d) {
        d.preventDefault()
        var t = s.adder[0].dir
        return e == t ? !1 : s.dirChanged ? void (("left" == t && "right" != e || "right" == t && "left" != e || "up" == t && "down" != e || "down" == t && "up" != e) && (s.adder[0].dir = e,
        s.dirChanged = !1)) : (setTimeout(function() {
            s.changedir(e, d)
        }, 5),
        !1)
    },
    refresh: function() {
        if ($("#box div[class!=]").removeAttr("class"),
        $("#x" + s.food.x + "y" + s.food.y).addClass("food"),
        s.bugFree) {
            $("#x" + s.bug.x + "y" + s.bug.y + ",#b1").attr("class", "bixo a" + s.bug.type),
            $("#x" + (s.bug.x + 1) + "y" + s.bug.y + ",#b2").attr("class", "bixo b" + s.bug.type)
            for (var e = s.bugCount + ""; e.length < 2; )
                e = "0" + e
            $("#b3").attr("class", "p" + e.substr(0, 1)),
            $("#b4").attr("class", "p" + e.substr(1, 1))
        }
        for (i in s.adder)
            $("#x" + s.adder[i].x + "y" + s.adder[i].y).addClass(s.adder[i].type + "-" + s.adder[i].dir + " " + s.adder[i].bola + " snake")
        s.dirChanged = !0
    },
    refreshScore: function() {
        for (var e = s.score + ""; e.length < 4; )
            e = "0" + e
        $("#n1").attr("class", "p" + e.substr(e.length - 4, 1)),
        $("#n2").attr("class", "p" + e.substr(e.length - 3, 1)),
        $("#n3").attr("class", "p" + e.substr(e.length - 2, 1)),
        $("#n4").attr("class", "p" + e.substr(e.length - 1, 1))
    },
    addSection: function() {
        var e = s.adder.length - 1
          , d = s.adder[e]
          , t = d.x
          , i = d.y
        return e > 100 ? !1 : ("right" == d.dir ? t-- : "left" == d.dir ? t++ : "up" == d.dir ? i-- : "down" == d.dir && i++,
        e > 0 && (s.adder[e].type = "body"),
        void (s.adder[e + 1] = new s.setSection(t,i,"tail",d.dir)))
    },
    adder: [],
    setSection: function(e, s, d, t, i) {
        this.x = e,
        this.y = s,
        this.type = d,
        this.dir = t,
        this.bola = i || ""
    },
    time: 0,
    timer: 0
}
$(function() {
    s.init()
})
