! function(e) {
    function n(n) { for (var t, r, s = n[0], m = n[1], d = n[2], u = 0, l = []; u < s.length; u++) r = s[u], i[r] && l.push(i[r][0]), i[r] = 0; for (t in m) Object.prototype.hasOwnProperty.call(m, t) && (e[t] = m[t]); for (c && c(n); l.length;) l.shift()(); return a.push.apply(a, d || []), o() }

    function o() { for (var e, n = 0; n < a.length; n++) { for (var o = a[n], t = !0, s = 1; s < o.length; s++) { var m = o[s];
                0 !== i[m] && (t = !1) } t && (a.splice(n--, 1), e = r(r.s = o[0])) } return e } var t = {},
        i = { 1: 0 },
        a = [];

    function r(n) { if (t[n]) return t[n].exports; var o = t[n] = { i: n, l: !1, exports: {} }; return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports } r.m = e, r.c = t, r.d = function(e, n, o) { r.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o }) }, r.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, r.t = function(e, n) { if (1 & n && (e = r(e)), 8 & n) return e; if (4 & n && "object" == typeof e && e && e.__esModule) return e; var o = Object.create(null); if (r.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & n && "string" != typeof e)
            for (var t in e) r.d(o, t, function(n) { return e[n] }.bind(null, t)); return o }, r.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return r.d(n, "a", n), n }, r.o = function(e, n) { return Object.prototype.hasOwnProperty.call(e, n) }, r.p = "/"; var s = window.webpackJsonp = window.webpackJsonp || [],
        m = s.push.bind(s);
    s.push = n, s = s.slice(); for (var d = 0; d < s.length; d++) n(s[d]); var c = m;
    a.push([123, 0, 7]), o() }({ 123: function(e, n, o) { "use strict";
        o.r(n),
            function(e) { o(124), o(310);
                o(39), window.gameMemory.initMemory(); var n = o(311); if (n.init({ force: !0 }), n.init({ hacks: window.viewportUnitsBuggyfillHacks }), window.viewportUnitsBuggyfill = n, window.mobilecheck = function() { var e, n = !1; return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (n = !0), n }, e(document).ready((function() { o(312) })), !window.mobilecheck() && "undefined" != typeof navigationPosition) { switch (navigationPosition) {
                        case "gamemenu":
                            document.querySelector("#game__menu").classList.add("nomouse"), window.gameMenu = new function() { var n = this;
                                this.pos = 0, this.maxPos = 4, this.games = [e("#password"), e("#phishing"), e("#smartphone"), e("#securisation"), e("#payment")], this.names = ["password", "phishing", "smartphone", "securisation", "payment"], this.next = function() { var e = n.pos;
                                    n.pos === n.maxPos ? n.pos = 0 : n.pos += 1, n.games[e].removeClass("selected"), n.games[n.pos].addClass("selected") }, this.prev = function() { var e = n.pos;
                                    0 === n.pos ? n.pos = n.maxPos : n.pos -= 1, n.games[e].removeClass("selected"), n.games[n.pos].addClass("selected") }, this.updatePos = function(e) { n.games[n.pos].removeClass("selected"), n.pos = e, n.games[n.pos].addClass("selected") }, this.enter = function() { window.location.href = "/fr/particuliers/gerer-au-quotidien/internet-et-securite-bancaire/quizz-securite/games/" + n.names[n.pos] +"/index.html" } }, window.gameMenu.games[0].addClass("selected") } switch (navigationPosition) {
                        case "gamemenu":
                            e(document).ready((function() { var n = document.getElementById("game__menu"),
                                    o = e(n);
                                n.addEventListener("mouseover", (function(e) { o.removeClass("nomouse") })), n.addEventListener("mouseleave", (function(e) { o.addClass("nomouse") })), window.gameMenu.games.forEach((function(e) { e.on("mouseover", (function(n) { var o = Number(e.attr("game-nbr"));
                                        window.gameMenu.updatePos(o) })) })) })) } if (document.addEventListener("keyup", (function(e) { if (!e.defaultPrevented) { var n = e.key || e.keyCode; switch (navigationPosition) {
                                    case "home":
                                        "Enter" !== n && 13 !== n || (window.location.href = "/fr/particuliers/gerer-au-quotidien/internet-et-securite-bancaire/quizz-securite/introduction/index.html"); break;
                                    case "introduction":
                                        "Enter" !== n && 13 !== n || (window.location.href = "/fr/particuliers/gerer-au-quotidien/internet-et-securite-bancaire/quizz-securite/games/index.html"); break;
                                    case "gamemenu":
                                        "ArrowLeft" === n || 37 === n ? window.gameMenu.prev() : "ArrowRight" === n || 39 === n ? window.gameMenu.next() : "Enter" !== n && 13 !== n || window.gameMenu.enter() } } })), "gamemenu" === navigationPosition) { window.gameMemory.unsetAllAltFrame(); var t = window.gameMemory.allMemories(),
                            i = 0;
                        t.forEach((function(n) { n.mem.finished && (i += 1, e("#".concat(n.name)).addClass("over")) })), "false" === window.gameMemory.getFinalGameOver() && 5 === i && e(document).ready((function() { e("#winbox-wrapper").removeClass("hidden") })) } } try { var a = { get passive() {!0 } };
                    window.addEventListener("test", a, a), window.removeEventListener("test", a, a) } catch (e) {!1 } document.addEventListener("touchmove", (function(e) { 1 !== e.scale && e.preventDefault() }), !1); var r = 0;
                document.addEventListener("touchend", (function(e) { var n = (new Date).getTime();
                    n - r <= 300 && e.preventDefault(), r = n }), !1), window.hideWin = function() { var n = e("#winbox-wrapper");
                    window.gameMemory.setFinalGameOver(), n.addClass("hidden") } }.call(this, o(16)) }, 310: function(e, n, o) {}, 312: function(e, n, o) {
        (function(e) {
            function n(n) { return e("li[link-id=".concat(n, "]")) } window.Sidebar = new function() { var o = this;
                this.toggle = function(n) { var t = e(n),
                        i = e("#sidebar");
                    o.open = !o.open, 1 == o.open ? (t.addClass("opened"), i.addClass("opened")) : (t.removeClass("opened"), i.removeClass("opened")) }, this.down = function() { var e = 0;
                    e = o.pos === o.maxPos ? 0 : o.pos + 1, o.updatePos(e) }, this.up = function() { var e = 0;
                    e = 0 === o.pos ? o.maxPos : o.pos - 1, o.updatePos(e) }, this.go = function() { var e = n(o.pos).find("a").attr("href");
                    window.location.href = e }, this.updatePos = function(e) { var t = n(o.pos);
                    t.removeClass("active"), o.pos = e,
                        function(e) { e.addClass("active") }(n(o.pos)) }, this.open = !1, this.pos = 0, this.maxPos = 5 }, null !== document.documentElement.ontouchstart && void 0 !== document.documentElementontouchstart || document.addEventListener("keyup", (function(e) { if (!e.defaultPrevented) { var n = e.key || e.keyCode; "Escape" === n || "Esc" === n || 27 === n ? window.Sidebar.toggle(document.getElementById("hamburger")) : window.Sidebar.open && ("ArrowUp" === n || 38 === n ? window.Sidebar.up() : "ArrowDown" === n || 40 === n ? window.Sidebar.down() : "Enter" !== n && 13 !== n || window.Sidebar.go()) } })), e(document).ready((function() { var n = e("#sidebar__menu");
                n.find("li").toArray().forEach((function(n) { var o = e(n);
                    o.on("mouseover", (function(e) { var n = Number(o.attr("link-id"));
                        window.Sidebar.updatePos(n) })) })), n.on("mouseover", (function(e) { n.removeClass("nomouse") })), n.on("mouseleave", (function(e) { n.addClass("nomouse") })) })) }).call(this, o(16)) }, 39: function(e, n, o) { "use strict";
        o.r(n); var t = sessionStorage,
            i = JSON.stringify({ answers: [], altFrame: !1, finished: !1 }),
            a = ["password", "phishing", "smartphone", "securisation", "payment"];

        function r(e, n) { s(e); var o = JSON.stringify(n);
            sessionStorage.setItem(e, o) }

        function s(e) { var n = sessionStorage.getItem(e); return JSON.parse(n) }

        function m(e) { var n = s(e);
            null != n && (n.altFrame = !1, r(e, n)) } var d = { initMemory: function() { return new Promise((function(e, n) { "true" !== t.getItem("memoryInitialized") && (t.setItem("gameOver", !1), a.forEach((function(e) { t.setItem(e, i) })), t.setItem("memoryInitialized", "true")), e(!0) })) }, getMemory: s, allMemories: function() { return a.map((function(e) { return { name: e, mem: s(e) } })) }, addAnswer: function(e, n) { var o = s(e);
                o.answers.push(n), r(e, o) }, unsetAltFrame: m, unsetAllAltFrame: function() { a.forEach((function(e) { m(e) })) }, isAltFrame: function(e) { return s(e).altFrame }, isGameOver: function(e) { return s(e).finished }, getFinalGameOver: function() { return t.getItem("gameOver") }, setFinalGameOver: function() { t.setItem("gameOver", !0) }, setGameOver: function(e) { var n = s(e);
                n.finished = !0, n.altFrame = !0, r(e, n) } };
        n.default = d, window.gameMemory = d } });

/*-- Google Tag Manager --*/
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KKZVK4C');
/* --End Google Tag Manager  --*/