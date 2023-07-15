 (function() {
     window.google = {
         kEI: 'zvE-Xq3cBYzyapb0lPgB',
         kEXPI: '31',
         kBL: 'YUnL'
     };
     google.sn = 'web';
     google.kHL = 'en-MA';
 })();
 (function() {
     google.lc = [];
     google.li = 0;
     google.getEI = function(a) {
         for (var b; a && (!a.getAttribute || !(b = a.getAttribute("eid")));) a = a.parentNode;
         return b || google.kEI
     };
     google.getLEI = function(a) {
         for (var b = null; a && (!a.getAttribute || !(b = a.getAttribute("leid")));) a = a.parentNode;
         return b
     };
     google.ml = function() {
         return null
     };
     google.time = function() {
         return Date.now()
     };
     google.log = function(a, b, e, c, g) {
         if (a = google.logUrl(a, b, e, c, g)) {
             b = new Image;
             var d = google.lc,
                 f = google.li;
             d[f] = b;
             b.onerror = b.onload = b.onabort = function() {
                 delete d[f]
             };
             google.vel && google.vel.lu && google.vel.lu(a);
             b.src = a;
             google.li = f + 1
         }
     };
     google.logUrl = function(a, b, e, c, g) {
         var d = "",
             f = google.ls || "";
         e || -1 != b.search("&ei=") || (d = "&ei=" + google.getEI(c), -1 == b.search("&lei=") && (c = google.getLEI(c)) && (d += "&lei=" + c));
         c = "";
         !e && google.cshid && -1 == b.search("&cshid=") && "slh" != a && (c = "&cshid=" + google.cshid);
         a = e || "/" + (g || "gen_204") + "?atyp=i&ct=" + a + "&cad=" + b + d + f + "&zx=" + google.time() + c;
         /^http:/i.test(a) && "https:" == window.location.protocol && (google.ml(Error("a"), !1, {
             src: a,
             glmm: 1
         }), a = "");
         return a
     };
 }).call(this);
 (function() {
     google.y = {};
     google.x = function(a, b) {
         if (a) var c = a.id;
         else {
             do c = Math.random(); while (google.y[c])
         }
         google.y[c] = [a, b];
         return !1
     };
     google.lm = [];
     google.plm = function(a) {
         google.lm.push.apply(google.lm, a)
     };
     google.lq = [];
     google.load = function(a, b, c) {
         google.lq.push([
             [a], b, c
         ])
     };
     google.loadAll = function(a, b) {
         google.lq.push([a, b])
     };
 }).call(this);
 google.f = {};
 (function() {
     document.documentElement.addEventListener("submit", function(b) {
         var a;
         if (a = b.target) {
             var c = a.getAttribute("data-submitfalse");
             a = "1" == c || "q" == c && !a.elements.q.value ? !0 : !1
         } else a = !1;
         a && (b.preventDefault(), b.stopPropagation())
     }, !0);
     document.documentElement.addEventListener("click", function(b) {
         var a;
         a: {
             for (a = b.target; a && a != document.documentElement; a = a.parentElement)
                 if ("A" == a.tagName) {
                     a = "1" == a.getAttribute("data-nohref");
                     break a
                 }
             a = !1
         }
         a && b.preventDefault()
     }, !0);
 }).call(this);
 (function() {
     google.hs = {
         h: true,
         sie: false
     };
 })();
 (function() {
     var b = [];
     google.jsc = {
         xx: b,
         x: function(a) {
             b.push(a)
         },
         mm: [],
         m: function(a) {
             google.jsc.mm.length || (google.jsc.mm = a)
         }
     };
 }).call(this);
 (function() {
     google.em = [];
     google.emn = 3;
     google.snet = true;
     google.spjs = false;
     google.lgm = '';
     google.emw = false;
     google.eme = false;
     google.pdt = 0;
 })();
 (function() {
     var f = ['sb_wiz', 'aa', 'abd', 'aspn', 'async', 'bgd', 'dvl', 'foot', 'kyn', 'lu', 'm', 'mUpTid', 'mpck', 'mu', 'sf', 'tl', 'vs'];
     var c = '{\x22Fkg7bd\x22:{},\x22HcFEGb\x22:{},\x22IvlUe\x22:{},\x22MC8mtf\x22:{},\x22OF7gzc\x22:{},\x22RMhBfe\x22:{},\x22T4BAC\x22:{},\x22TJw5qb\x22:{},\x22TbaHGc\x22:{},\x22Y33vzc\x22:{},\x22ZyRBae\x22:{},\x22aa\x22:{},\x22abd\x22:{\x22abd\x22:false,\x22deb\x22:false,\x22det\x22:false},\x22aspn\x22:{},\x22async\x22:{},\x22bgd\x22:{\x22ac\x22:true,\x22as\x22:true,\x22at\x22:0,\x22ea\x22:true,\x22ed\x22:0,\x22ei\x22:true,\x22el\x22:true,\x22ep\x22:true,\x22er\x22:true,\x22et\x22:0,\x22eu\x22:false,\x22wl\x22:false},\x22cdos\x22:{\x22cdobsel\x22:false},\x22cr\x22:{\x22qir\x22:false,\x22rctj\x22:true,\x22ref\x22:false,\x22uff\x22:false},\x22csi\x22:{},\x22d\x22:{},\x22ddls\x22:{},\x22dvl\x22:{\x22cookie_secure\x22:true,\x22cookie_timeout\x22:86400,\x22driver_ui_type\x22:2,\x22jsc\x22:\x22[null,null,null,30000,null,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[\\\x2286400000\\\x22,\\\x22604800000\\\x22,2.0]\\n,null,1]\\n\x22,\x22mnr_crd\x22:\x221\x22,\x22msg_err\x22:\x22Location unavailable\x22,\x22msg_gps\x22:\x22Using GPS\x22,\x22msg_unk\x22:\x22Unknown\x22,\x22msg_upd\x22:\x22Update location\x22,\x22msg_use\x22:\x22Use precise location\x22},\x22foot\x22:{\x22pf\x22:true,\x22po\x22:true,\x22qe\x22:false},\x22gf\x22:{\x22pid\x22:196,\x22si\x22:true},\x22hsm\x22:{},\x22iDPoPb\x22:{},\x22jsa\x22:{\x22csi\x22:true,\x22csir\x22:100},\x22kyn\x22:{},\x22llc\x22:{},\x22lu\x22:{},\x22m\x22:{},\x22mUpTid\x22:{},\x22mpck\x22:{\x22me\x22:false},\x22mu\x22:{\x22murl\x22:\x22https://adservice.google.com/adsid/google/ui\x22},\x22mvYTse\x22:{},\x22sb_wiz\x22:{\x22rfs\x22:[],\x22stok\x22:\x22PzxmhUVP_lTJBd3XHYBtuFufji8\x22,\x22ueh\x22:\x229817c073_aa991a9d_cde5ff8a_d79830ee_a5344768\x22},\x22sf\x22:{},\x22tg8oTe\x22:{},\x22tl\x22:{\x22rvkey\x22:\x22AIzaSyC_9Rt88UMjzgg5pIVArnfuIVkJx4zCdTY\x22},\x22uz938c\x22:{},\x22vWNDde\x22:{},\x22vs\x22:{},\x22ws9Tlc\x22:{},\x22yQ43ff\x22:{}}';
     google.pmc = JSON.parse(c);
     google.plm(f);
     if (window.agsa_ext && window.agsa_ext.setNativeUiState) {
         window.agsa_ext.setNativeUiState(0, 0);
     }
 })();
 google.x(null, function() {
     (function() {
         google.drty && google.drty();
     })();
 });
 (function() {
     var b = [function() {
         google.tick && google.tick("load", "dcl")
     }];
     google.dclc = function(a) {
         b.length ? b.push(a) : a()
     };

     function c() {
         for (var a; a = b.shift();) a()
     }
     window.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)) : window.attachEvent && window.attachEvent("onload", c);
 }).call(this);
 (function() {
     var f = this || self,
         h = Date.now || function() {
             return +new Date
         };
     var x = {};
     var aa = function(a, c) {
         if (null === c) return !1;
         if ("contains" in a && 1 == c.nodeType) return a.contains(c);
         if ("compareDocumentPosition" in a) return a == c || !!(a.compareDocumentPosition(c) & 16);
         for (; c && a != c;) c = c.parentNode;
         return c == a
     };
     var ba = function(a, c) {
             return function(d) {
                 d || (d = window.event);
                 return c.call(a, d)
             }
         },
         z = function(a) {
             a = a.target || a.srcElement;
             !a.getAttribute && a.parentNode && (a = a.parentNode);
             return a
         },
         A = "undefined" != typeof navigator && /Macintosh/.test(navigator.userAgent),
         ca = "undefined" != typeof navigator && !/Opera/.test(navigator.userAgent) && /WebKit/.test(navigator.userAgent),
         da = {
             A: 1,
             INPUT: 1,
             TEXTAREA: 1,
             SELECT: 1,
             BUTTON: 1
         },
         ea = function() {
             this._mouseEventsPrevented = !0
         },
         F = {
             A: 13,
             BUTTON: 0,
             CHECKBOX: 32,
             COMBOBOX: 13,
             FILE: 0,
             GRIDCELL: 13,
             LINK: 13,
             LISTBOX: 13,
             MENU: 0,
             MENUBAR: 0,
             MENUITEM: 0,
             MENUITEMCHECKBOX: 0,
             MENUITEMRADIO: 0,
             OPTION: 0,
             RADIO: 32,
             RADIOGROUP: 32,
             RESET: 0,
             SUBMIT: 0,
             SWITCH: 32,
             TAB: 0,
             TREE: 13,
             TREEITEM: 13
         },
         G = {
             CHECKBOX: !0,
             FILE: !0,
             OPTION: !0,
             RADIO: !0
         },
         H = {
             COLOR: !0,
             DATE: !0,
             DATETIME: !0,
             "DATETIME-LOCAL": !0,
             EMAIL: !0,
             MONTH: !0,
             NUMBER: !0,
             PASSWORD: !0,
             RANGE: !0,
             SEARCH: !0,
             TEL: !0,
             TEXT: !0,
             TEXTAREA: !0,
             TIME: !0,
             URL: !0,
             WEEK: !0
         },
         fa = {
             A: !0,
             AREA: !0,
             BUTTON: !0,
             DIALOG: !0,
             IMG: !0,
             INPUT: !0,
             LINK: !0,
             MENU: !0,
             OPTGROUP: !0,
             OPTION: !0,
             PROGRESS: !0,
             SELECT: !0,
             TEXTAREA: !0
         };
     var I = function() {
             this.h = this.a = null
         },
         K = function(a, c) {
             var d = J;
             d.a = a;
             d.h = c;
             return d
         };
     I.prototype.g = function() {
         var a = this.a;
         this.a && this.a != this.h ? this.a = this.a.__owner || this.a.parentNode : this.a = null;
         return a
     };
     var L = function() {
         this.i = [];
         this.a = 0;
         this.h = null;
         this.j = !1
     };
     L.prototype.g = function() {
         if (this.j) return J.g();
         if (this.a != this.i.length) {
             var a = this.i[this.a];
             this.a++;
             a != this.h && a && a.__owner && (this.j = !0, K(a.__owner, this.h));
             return a
         }
         return null
     };
     var J = new I,
         M = new L;
     var O = function() {
             this.o = [];
             this.a = [];
             this.g = [];
             this.j = {};
             this.h = null;
             this.i = [];
             N(this, "_custom")
         },
         ha = "undefined" != typeof navigator && /iPhone|iPad|iPod/.test(navigator.userAgent),
         P = String.prototype.trim ? function(a) {
             return a.trim()
         } : function(a) {
             return a.replace(/^\s+/, "").replace(/\s+$/, "")
         },
         ia = /\s*;\s*/,
         ma = function(a, c) {
             return function p(b, g) {
                 g = void 0 === g ? !0 : g;
                 var m = c;
                 if ("_custom" == m) {
                     m = b.detail;
                     if (!m || !m._type) return;
                     m = m._type
                 }
                 if ("click" == m && (A && b.metaKey || !A && b.ctrlKey || 2 == b.which || null == b.which &&
                         4 == b.button || b.shiftKey)) m = "clickmod";
                 else {
                     var l = b.which || b.keyCode;
                     ca && 3 == l && (l = 13);
                     if (13 != l && 32 != l) l = !1;
                     else {
                         var e = z(b),
                             n;
                         (n = "keydown" != b.type || !!(!("getAttribute" in e) || (e.getAttribute("type") || e.tagName).toUpperCase() in H || "BUTTON" == e.tagName.toUpperCase() || e.type && "FILE" == e.type.toUpperCase() || e.isContentEditable) || b.ctrlKey || b.shiftKey || b.altKey || b.metaKey || (e.getAttribute("type") || e.tagName).toUpperCase() in G && 32 == l) || ((n = e.tagName in da) || (n = e.getAttributeNode("tabindex"), n = null != n && n.specified), n = !(n && !e.disabled));
                         if (n) l = !1;
                         else {
                             n = (e.getAttribute("role") || e.type || e.tagName).toUpperCase();
                             var q = !(n in F) && 13 == l;
                             e = "INPUT" != e.tagName.toUpperCase() || !!e.type;
                             l = (0 == F[n] % l || q) && e
                         }
                     }
                     l && (m = "clickkey")
                 }
                 e = b.srcElement || b.target;
                 l = Q(m, b, e, "", null);
                 b.path ? (M.i = b.path, M.a = 0, M.h = this, M.j = !1, n = M) : n = K(e, this);
                 for (; q = n.g();) {
                     var k = q;
                     var r = void 0;
                     var u = k;
                     q = m;
                     var t = u.__jsaction;
                     if (!t) {
                         var y;
                         t = null;
                         "getAttribute" in u && (t = u.getAttribute("jsaction"));
                         if (y = t) {
                             t = x[y];
                             if (!t) {
                                 t = {};
                                 for (var B = y.split(ia), ja = B ? B.length : 0, C = 0; C < ja; C++) {
                                     var w = B[C];
                                     if (w) {
                                         var D = w.indexOf(":"),
                                             R = -1 != D,
                                             ka = R ? P(w.substr(0, D)) : "click";
                                         w = R ? P(w.substr(D + 1)) : w;
                                         t[ka] = w
                                     }
                                 }
                                 x[y] = t
                             }
                             u.__jsaction = t
                         } else t = la, u.__jsaction = t
                     }
                     u = t;
                     "maybe_click" == q && u.click ? (r = q, q = "click") : "clickkey" == q ? q = "click" : "click" != q || u.click || (q = "clickonly");
                     r = {
                         m: r ? r : q,
                         action: u[q] || "",
                         event: null,
                         s: !1
                     };
                     l = Q(r.m, r.event || b, e, r.action || "", k, l.timeStamp);
                     if (r.s || r.action) break
                 }
                 l && "touchend" == l.eventType && (l.event._preventMouseEvents = ea);
                 if (r && r.action) {
                     if (e = "clickkey" == m) e = z(b), e = (e.type ||
                         e.tagName).toUpperCase(), (e = 32 == (b.which || b.keyCode) && "CHECKBOX" != e) || (e = z(b), n = e.tagName.toUpperCase(), r = (e.getAttribute("role") || "").toUpperCase(), e = "BUTTON" === n || "BUTTON" === r ? !0 : !(e.tagName.toUpperCase() in fa) || "A" === n || "SELECT" === n || (e.getAttribute("type") || e.tagName).toUpperCase() in G || (e.getAttribute("type") || e.tagName).toUpperCase() in H ? !1 : !0);
                     e && (b.preventDefault ? b.preventDefault() : b.returnValue = !1);
                     if ("mouseenter" == m || "mouseleave" == m)
                         if (e = b.relatedTarget, !("mouseover" == b.type && "mouseenter" ==
                                 m || "mouseout" == b.type && "mouseleave" == m) || e && (e === k || aa(k, e))) l.action = "", l.actionElement = null;
                         else {
                             m = {};
                             for (var v in b) "function" !== typeof b[v] && "srcElement" !== v && "target" !== v && (m[v] = b[v]);
                             m.type = "mouseover" == b.type ? "mouseenter" : "mouseleave";
                             m.target = m.srcElement = k;
                             m.bubbles = !1;
                             l.event = m;
                             l.targetElement = k
                         }
                 } else l.action = "", l.actionElement = null;
                 k = l;
                 a.h && !k.event.a11ysgd && (v = Q(k.eventType, k.event, k.targetElement, k.action, k.actionElement, k.timeStamp), "clickonly" == v.eventType && (v.eventType = "click"), a.h(v, !0));
                 if (k.actionElement) {
                     if (a.h) {
                         if (!k.actionElement || "A" != k.actionElement.tagName || "click" != k.eventType && "clickmod" != k.eventType || (b.preventDefault ? b.preventDefault() : b.returnValue = !1), (b = a.h(k)) && g) {
                             p.call(this, b, !1);
                             return
                         }
                     } else {
                         if ((g = f.document) && !g.createEvent && g.createEventObject) try {
                             var E = g.createEventObject(b)
                         } catch (pa) {
                             E = b
                         } else E = b;
                         k.event = E;
                         a.i.push(k)
                     }
                     if ("touchend" == k.event.type && k.event._mouseEventsPrevented) {
                         b = k.event;
                         for (var qa in b);
                         h()
                     }
                 }
             }
         },
         Q = function(a, c, d, b, g, p) {
             return {
                 eventType: a,
                 event: c,
                 targetElement: d,
                 action: b,
                 actionElement: g,
                 timeStamp: p || h()
             }
         },
         la = {},
         na = function(a, c) {
             return function(d) {
                 var b = a,
                     g = c,
                     p = !1;
                 "mouseenter" == b ? b = "mouseover" : "mouseleave" == b && (b = "mouseout");
                 if (d.addEventListener) {
                     if ("focus" == b || "blur" == b || "error" == b || "load" == b) p = !0;
                     d.addEventListener(b, g, p)
                 } else d.attachEvent && ("focus" == b ? b = "focusin" : "blur" == b && (b = "focusout"), g = ba(d, g), d.attachEvent("on" + b, g));
                 return {
                     m: b,
                     l: g,
                     capture: p
                 }
             }
         },
         N = function(a, c) {
             if (!a.j.hasOwnProperty(c)) {
                 var d = ma(a, c),
                     b = na(c, d);
                 a.j[c] = d;
                 a.o.push(b);
                 for (d = 0; d < a.a.length; ++d) {
                     var g = a.a[d];
                     g.g.push(b.call(null, g.a))
                 }
                 "click" == c && N(a, "keydown")
             }
         };
     O.prototype.l = function(a) {
         return this.j[a]
     };
     var V = function(a, c) {
             var d = new oa(c);
             a: {
                 for (var b = 0; b < a.a.length; b++)
                     if (S(a.a[b], c)) {
                         c = !0;
                         break a
                     }
                 c = !1
             }
             if (c) return a.g.push(d), d;
             T(a, d);
             a.a.push(d);
             U(a);
             return d
         },
         U = function(a) {
             for (var c = a.g.concat(a.a), d = [], b = [], g = 0; g < a.a.length; ++g) {
                 var p = a.a[g];
                 W(p, c) ? (d.push(p), X(p)) : b.push(p)
             }
             for (g = 0; g < a.g.length; ++g) p = a.g[g], W(p, c) ? d.push(p) : (b.push(p), T(a, p));
             a.a = b;
             a.g = d
         },
         T = function(a, c) {
             var d = c.a;
             ha && (d.style.cursor = "pointer");
             for (d = 0; d < a.o.length; ++d) c.g.push(a.o[d].call(null, c.a))
         },
         Y = function(a, c) {
             a.h = c;
             a.i && (0 < a.i.length && c(a.i), a.i = null)
         },
         oa = function(a) {
             this.a = a;
             this.g = []
         },
         S = function(a, c) {
             for (a = a.a; a != c && c.parentNode;) c = c.parentNode;
             return a == c
         },
         W = function(a, c) {
             for (var d = 0; d < c.length; ++d)
                 if (c[d].a != a.a && S(c[d], a.a)) return !0;
             return !1
         },
         X = function(a) {
             for (var c = 0; c < a.g.length; ++c) {
                 var d = a.a,
                     b = a.g[c];
                 d.removeEventListener ? d.removeEventListener(b.m, b.l, b.capture) : d.detachEvent && d.detachEvent("on" + b.m, b.l)
             }
             a.g = []
         };
     var Z = new O;
     V(Z, window.document.documentElement);
     N(Z, "click");
     N(Z, "focus");
     N(Z, "focusin");
     N(Z, "blur");
     N(Z, "focusout");
     N(Z, "error");
     N(Z, "load");
     N(Z, "change");
     N(Z, "dblclick");
     N(Z, "input");
     N(Z, "keyup");
     N(Z, "keydown");
     N(Z, "keypress");
     N(Z, "mousedown");
     N(Z, "mouseenter");
     N(Z, "mouseleave");
     N(Z, "mouseout");
     N(Z, "mouseover");
     N(Z, "mouseup");
     N(Z, "paste");
     N(Z, "touchstart");
     N(Z, "touchend");
     N(Z, "touchcancel");
     N(Z, "speech");
     (function(a) {
         google.jsad = function(c) {
             Y(a, c)
         };
         google.jsaac = function(c) {
             return V(a, c)
         };
         google.jsarc = function(c) {
             X(c);
             for (var d = !1, b = 0; b < a.a.length; ++b)
                 if (a.a[b] === c) {
                     a.a.splice(b, 1);
                     d = !0;
                     break
                 }
             if (!d)
                 for (d = 0; d < a.g.length; ++d)
                     if (a.g[d] === c) {
                         a.g.splice(d, 1);
                         break
                     }
             U(a)
         }
     })(Z);
     window.gws_wizbind = function(a) {
         return {
             trigger: function(c) {
                 var d = a.l(c.type);
                 d || (N(a, c.type), d = a.l(c.type));
                 var b = c.target || c.srcElement;
                 d && d.call(b.ownerDocument.documentElement, c)
             },
             bind: function(c) {
                 Y(a, c)
             }
         }
     }(Z);
 }).call(this);