  "use strict";

    function gtag() {
        dataLayer.push(arguments)
    }
    window.com = window.com || {}, window.com.gt = window.com.gt || {},
        function() {
            var e = function() {
                function e() {
                    var e = null;
                    try {
                        e = JSON.parse(localStorage.getItem("com.gt.PrivacySettings"))
                    } catch (t) {
                        e = null
                    }(null === e || "object" != typeof e || location.search.indexOf("resetPrivacy") >= 0) && (e = {});
                    var n = !0,
                        a = (new Date).getTimezoneOffset() / -60,
                        o = a >= -2 && 4 >= a || location.search.indexOf("forceEEA") >= 0 ? !0 : !1;
                    o && (n = !1), "boolean" != typeof e.functional && (e.functional = n), "boolean" != typeof e.analytics && (e.analytics = n), "boolean" != typeof e.ads && (e.ads = n), ("number" != typeof e.lastModified || e.lastModified > Date.now() || e.lastModified < 0) && (e.lastModified = 0), c.functional = e.functional, c.analytics = e.analytics, c.ads = e.ads, c.lastModified = e.lastModified
                }

                function t() {
                    c.lastModified = Date.now();
                    var e = {
                        functional: c.functional,
                        analytics: c.analytics,
                        ads: c.ads,
                        lastModified: c.lastModified
                    };
                    try {
                        localStorage.setItem("com.gt.PrivacySettings", JSON.stringify(e))
                    } catch (t) {}
                    i(!1), window.com.gt.Ads.onPrivacyChange()
                }

                function n() {
                    c.functional = c.analytics = c.ads = !0, t()
                }

                function a() {
                    c.functional = c.analytics = c.ads = !1, t()
                }

                function o() {
                    return c.functional && c.analytics && c.ads
                }

                function i(e) {
                    gtag("consent", e ? "default" : "update", {
                        ad_storage: c.ads ? "granted" : "denied",
                        analytics_storage: c.analytics ? "granted" : "denied"
                    })
                }
                var c = {
                    functional: null,
                    analytics: null,
                    ads: null,
                    lastModified: 0,
                    isFullConsent: o,
                    save: t,
                    allowAll: n,
                    denyAll: a,
                    gtagUpdate: i
                };
                return e(), c
            }();
            window.com.gt.Privacy = e
        }(),
        window.dataLayer = window.dataLayer || [], window.com.gt.Privacy.gtagUpdate(!0), gtag("js", new Date), gtag("config", "UA-122842685-2"),
        function() {
            function e() {
                var a, o = n.state,
                    i = t.readyState,
                    c = "complete" == i ? 2 : "interactive" == i ? 1 : o;
                if (o != c) {
                    if (1 > o) {
                        n.state = 1;
                        for (var s = 0, l = n.onStateChange; s < l.length; s++)(a = l[s])()
                    }
                    if (c > 1) {
                        n.state = 2;
                        for (var d = 0, r = n.onStateChange; d < r.length; d++)(a = r[d])()
                    }
                }
                2 > c && requestAnimationFrame(e)
            }
            var t = document,
                n = {
                    state: 0,
                    onStateChange: []
                };
            window.com.gt.Page = n, e()
        }()