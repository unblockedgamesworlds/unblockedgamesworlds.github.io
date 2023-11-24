"use strict";

! function() {
    var a, n, o, r, s, l, i, d, u, p, f, c, g, y, m, h, b, w, e = com.gt.Page,
        v = document,
        E = 0,
        L = 1e3,
        x = 850,
        M = 0,
        C = 0,
        T = 0,
        B = 1,
        U = "animationend",
        _ = "addEventListener",
        j = "removeEventListener",
        A = "animation",
        N = "",
        O = 0;

    function R() {
        if (r = E, E = Date.now(), s = Math.min(50, E - r), o)
            if (o < 2) {
                if (C = Math.min(C + .0015384615384615385 * s, M), y.style.width = 100 * C + "%", 1 <= C && i) {
                    o = 2, c.style[A] = "splash-text-update 0.2s ease-out, splash-text-to-off 0.4s ease-in 0.5s forwards", c.style.opacity = "1", c.innerHTML = "Let's Play!", g.style[A] = "splash-bar-to-off 0.4s ease-in 0.5s forwards";
                    var e = new DataView(l.response);
                    h = new Uint8Array(e.buffer, 4, e.getUint32(0)), b = h.length
                }
            } else if (o < 3) {
            if (x -= s, !w) {
                for (; Date.now() - E < 8;)
                    for (; O < b; O += 8192) N += String.fromCharCode.apply(null, h.subarray(O, Math.min(b, O + 8192)));
                if (b <= O) {
                    m = { js: N, buffer: l.response };
                    var t = new Blob([m.js], { type: "text/javascript" });
                    d = URL.createObjectURL(t), u = v.createElement("script"), u.onload = u.onerror = u.onabort = F, window[_]("error", F), u.src = d, v.head.appendChild(u), l = null, h = null, w = 1
                }
            }
            T && x < 0 && (o = 3)
        } else a.launch && (B = 0, a.launch(), f.style[A] = "splash-close 0.5s ease-in forwards");
        else L -= s, L < 0 && (o = 1, p = v.getElementById("gt-launcher"), f = v.getElementById("gt-splash"), c = f.getElementsByClassName("status")[0], g = f.getElementsByClassName("bar")[0], y = f.getElementsByClassName("fill")[0], f._o = "splash-close", c._o = "splash-text-to-off", g._o = "splash-bar-to-off", f[_](U, D), c[_](U, D), g[_](U, D), n = p.getAttribute("bundleSrc"), l = new XMLHttpRequest, l.open("GET", n), l.responseType = "arraybuffer", l.onabort = l.onerror = l.onprogress = l.onload = function(e) { "progress" == e.type ? M = e.total ? e.loaded / e.total : 0 : (l.onabort = l.onerror = l.onprogress = l.onload = null, "load" == e.type && 200 <= l.status && l.status < 300 ? (M = 1, i = 1) : H("Failed to load game bundle.", 1)) }, l.send());
        B && requestAnimationFrame(R)
    }

    function D(e) {
        var t = e.target;
        t == e.currentTarget && e.animationName == t._o && (t[j](U, D), t.style.display = "none", t.style.removeProperty(A))
    }

    function F(e) { u.onload = u.onerror = u.onabort = null, window[j]("error", F), URL.revokeObjectURL(d), d = null, e.target == u ? "load" == e.type ? (T = 1, a = com.gt.App, a.onError = H, a.initialize(m), m = null) : H("Failed to load bundle script.", 1) : ("" == e.filename || e.filename && 0 == e.filename.indexOf("blob:")) && H("Error evaluating bundle script.", 1) }

    function H(e, t) { B = 0, c.style.display = "block", c.style[A] = "splash-text-update 0.2s ease-out", c.style.opacity = "1", c.innerHTML = "Loading Failed :(", com.gt.Modal && com.gt.Modal.show("<h2>OH NO!</h2><p>There was an error.<br>Please try again later.</p>", [{ txt: "Try Again", cb: function() { document.location.reload() } }, { txt: "Dismiss" }], 0), t && self.gtag && gtag("event", e, { event_category: "launcher: error", event_label: n }), console.warn(e) }
    e.onStateChange.push(function() { 1 < e.state && R() }), 1 < e.state && R()
}();