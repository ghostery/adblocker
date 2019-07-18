(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('electron')) :
    typeof define === 'function' && define.amd ? define(['exports', 'electron'], factory) :
    (global = global || self, factory(global.adblocker = {}, global.electron));
}(this, function (exports, electron) { 'use strict';

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var Config = /** @class */ (function () {
        function Config(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.debug, debug = _c === void 0 ? false : _c, _d = _b.enableCompression, enableCompression = _d === void 0 ? false : _d, _e = _b.enableOptimizations, enableOptimizations = _e === void 0 ? true : _e, _f = _b.integrityCheck, integrityCheck = _f === void 0 ? true : _f, _g = _b.loadCosmeticFilters, loadCosmeticFilters = _g === void 0 ? true : _g, _h = _b.loadGenericCosmeticsFilters, loadGenericCosmeticsFilters = _h === void 0 ? true : _h, _j = _b.loadNetworkFilters, loadNetworkFilters = _j === void 0 ? true : _j;
            this.debug = debug;
            this.enableCompression = enableCompression;
            this.enableOptimizations = enableOptimizations;
            this.integrityCheck = integrityCheck;
            this.loadCosmeticFilters = loadCosmeticFilters;
            this.loadGenericCosmeticsFilters = loadGenericCosmeticsFilters;
            this.loadNetworkFilters = loadNetworkFilters;
        }
        Config.deserialize = function (buffer) {
            return new Config({
                debug: buffer.getBool(),
                enableCompression: buffer.getBool(),
                enableOptimizations: buffer.getBool(),
                integrityCheck: buffer.getBool(),
                loadCosmeticFilters: buffer.getBool(),
                loadGenericCosmeticsFilters: buffer.getBool(),
                loadNetworkFilters: buffer.getBool()
            });
        };
        Config.prototype.serialize = function (buffer) {
            buffer.pushBool(this.debug);
            buffer.pushBool(this.enableCompression);
            buffer.pushBool(this.enableOptimizations);
            buffer.pushBool(this.integrityCheck);
            buffer.pushBool(this.loadCosmeticFilters);
            buffer.pushBool(this.loadGenericCosmeticsFilters);
            buffer.pushBool(this.loadNetworkFilters);
        };
        return Config;
    }());

    function m(e){for(var c={a:{},code:void 0},a=0;a<e.length;a+=1){for(var d=e[a],b=c,f=0;f<d.length;f+=1){var g=d[f];void 0===b.a[g]&&(b.a[g]={a:{},code:void 0});b=b.a[g];}b.code=a;}return c}var q=new Uint8Array(0),r=new Uint8Array(3E4),t=new Uint8Array(255);function u(e,c){if(1===e)r[c++]=254,r[c++]=t[0];else{r[c++]=255;r[c++]=e;for(var a=0;a<e;a+=1)r[c++]=t[a];}return c}
    function v(e){var c=m(e);return [function(a){if(0===a.length)return q;for(var d=0,b=0,f=0;f<a.length;){for(var g=-1,h=-1,k=c,l=f;l<a.length;l+=1){k=k.a[a[l]];if(void 0===k)break;void 0!==k.code&&(h=k.code,g=l+1);}-1===h?(t[b++]=a.charCodeAt(f++),255===b&&(d=u(b,d),b=0)):(0!==b&&(d=u(b,d),b=0),r[d++]=h,f=g);}0!==b&&(d=u(b,d));return r.subarray(0,d)},function(a){if(0===a.byteLength)return "";for(var d="",b=0;b<a.byteLength;)254===a[b]?(d+=String.fromCharCode(a[b+1]),b+=2):255===a[b]?(d+=String.fromCharCode.apply(null,
    a.subarray(b+2,b+a[b+1]+2)),b+=a[b+1]+2):(d+=e[a[b]],b+=1);return d}]}var z=v(' ;the;e;t;a;of;o;and;i;n;s;e ;r; th; t;in;he;th;h;he ;to;\r\n;l;s ;d; a;an;er;c; o;d ;on; of;re;of ;t ;, ;is;u;at;   ;n ;or;which;f;m;as;it;that;\n;was;en;  ; w;es; an; i;f ;g;p;nd; s;nd ;ed ;w;ed;http://;https://;for;te;ing;y ;The; c;ti;r ;his;st; in;ar;nt;,; to;y;ng; h;with;le;al;to ;b;ou;be;were; b;se;o ;ent;ha;ng ;their;";hi;from; f;in ;de;ion;me;v;.;ve;all;re ;ri;ro;is ;co;f t;are;ea;. ;her; m;er ; p;es ;by;they;di;ra;ic;not;s, ;d t;at ;ce;la;h ;ne;as ;tio;on ;n t;io;we; a ;om;, a;s o;ur;li;ll;ch;had;this;e t;g ; wh;ere; co;e o;a ;us; d;ss; be; e;s a;ma;one;t t;or ;but;el;so;l ;e s;s,;no;ter; wa;iv;ho;e a; r;hat;s t;ns;ch ;wh;tr;ut;/;have;ly ;ta; ha; on;tha;-; l;ati;en ;pe; re;there;ass;si; fo;wa;ec;our;who;its;z;fo;rs;ot;un;im;th ;nc;ate;ver;ad; we;ly;ee; n;id; cl;ac;il;rt; wi;e, ; it;whi; ma;ge;x;e c;men;.com'.split(";"));var factory=v;

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /* tslint:disable */
    var cosmeticSelectorCodebook = [
        "abort-on-property-read.js, app_vars.force_disable_adblock",
        "abort-current-inline-script.js, ",
        "abort-on-property-read.js, ",
        "abort-on-property-write.js, ",
        "addEventListener-defuser.js, ",
        "a[href^=\"http://",
        "setTimeout-defuser.js, ",
        "set-constant.js, ",
        "?",
        "window.open-defuser.js",
        "div[style=\"width:",
        "[href^=\"https://",
        "[cellspacing=\"0\"][cellpadding=\"0\"][border=\"0\"]",
        "M",
        "ontainer",
        "a[onmousedown^=\"this.href='https://paid.outbrain.com/network/redir?\"][target=\"_blank\"]",
        "w",
        "/^(?:click|mousedown|mousemove|touchstart|touchend|touchmove)$/, system.popunder",
        "7",
        "4",
        "decodeURIComponent",
        "nano-setInterval-booster.js",
        "L",
        "S",
        "1",
        "5",
        "R",
        "[",
        "T",
        "C",
        "z",
        ":",
        "^",
        ";",
        "j",
        "6",
        "9",
        "f",
        "3",
        "8",
        "banner",
        "b",
        "ad",
        "D",
        "div[style=\"",
        "setInterval-defuser.js, ",
        "0",
        "document.getElementById, ",
        "v",
        "x",
        "vertisement",
        "I",
        "sponsor",
        "[target=\"_blank\"]",
        "n",
        " ",
        "px; height:",
        "[width=\"",
        "y",
        "/",
        "A[href$=\".html\"][rel=\"nofollow norefferer noopener\"]",
        "content",
        "s",
        "/^(?:click|mousedown)$/, _0x",
        "bab-defuser.js",
        "A",
        "i",
        "]",
        "d",
        "u",
        "ight",
        "er",
        "block",
        "[href=\"http://",
        "Date.prototype.toUTCString",
        "bottom",
        "background-color:",
        "sidebar",
        "g",
        ".com/\"]",
        ":first-child",
        "[style=\"",
        "text-align:cent",
        "Math, zfglo",
        "google",
        "nowebrtc.js",
        "300x250",
        "widget",
        "http://paid.outbrain.com/network/redir?\"]",
        "String.fromCharCode, /\\/\\*[0-9a-f]{40}\\*\\//",
        "margin",
        "[href*=\"",
        "p",
        "B",
        "[valign=\"top\"]",
        "BlockDetected",
        "background",
        "[href^=\"http://",
        "nextFunction, 2",
        "W",
        "\"]",
        "article",
        "rectangle",
        "div[id^=\"",
        "[align=\"cent",
        "width:",
        "board",
        "in",
        "0px;",
        "div[class^=\"",
        "top",
        "encodeURIComponent",
        "wrapp",
        "*",
        ":last-child",
        "k",
        "s-dummy.js",
        "puShown , /doOpen|popundr/",
        "le",
        "text-align: cent",
        "a[href^=\"/",
        "AaDetector",
        "F",
        "parseInt, tabund",
        " > ",
        "skyscrap",
        "2",
        "l",
        "c",
        "Ad",
        ", noopFunc",
        ".com/",
        "affiliate",
        "re",
        "G",
        "click",
        "Content",
        "www.",
        "sense",
        "ide",
        "box",
        "horizontal",
        "iframe",
        "m",
        "728x90",
        ", true",
        "decodeURI, ",
        "text",
        "1px solid ",
        "div",
        "display",
        "=\"https://",
        "st",
        "O",
        "font-size:",
        "promo",
        "lo",
        "foot",
        "00",
        "on",
        "P",
        "he",
        "an",
        "-",
        "ent",
        "H",
        "[class",
        "ar",
        "at",
        "al",
        "ed",
        "Bottom",
        "=\"",
        "age",
        "or",
        "img",
        "s-",
        "olumn",
        "px;",
        "http://",
        "po",
        "lay",
        "id",
        "it",
        "rap",
        "space",
        " + ",
        "home",
        "se",
        "E",
        "tab",
        "h",
        "s_",
        "de",
        "e",
        "PlaceHold",
        ".net/",
        ".",
        "ExoLo",
        ".php",
        "N",
        "body",
        "_",
        ", ",
        "q",
        "ck",
        "ro",
        "t-",
        ".m",
        "am",
        "un",
        "ti",
        "down",
        "728",
        "ft",
        "script",
        ": ",
        "label",
        "place",
        "dfp-",
        "en",
        "Top",
        "-c",
        "view",
        "px ",
        ".c",
        "Box",
        ".p",
        "ut",
        "t",
        "250",
        "160x6",
        "sult",
        "468x60",
        "et",
        "li",
        "[src",
        "a",
        "hold",
        "_c",
        "ig",
        "#m",
        "#",
        "ail",
        "-m",
        "as",
        "pu",
        "o",
        "tr",
        "ch",
        "html",
        "ct",
        "r",
        "el"
    ];

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /* tslint:disable */
    var networkCSPCodebook = [
        "script-src 'self' *.leadpages.net *.gstatic.com *.google.com *.googleapis.com *.playwire.com *.facebook.com *.bootstrapcdn.com *.twitter.com *.spot.im",
        "script-src 'self' *.leadpages.net *.gstatic.com *.google.com *.googleapis.com *.playwire.com *.facebook.com *.bootstrapcdn.com",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: *.gstatic.com *.google-analytics.com *.google.com *.solvemedia.com *.scorecardresearch.com *.googletagmanager.com *.googletagservices.com; child-s",
        "script-src 'self' *.gstatic.com *.google.com *.googleapis.com *.facebook.com *.bootstrapcdn.com *.twitter.com *.spot.im",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: ",
        "script-src 'self' * 'unsafe-inline'",
        "*.google.com *.gstatic.com *.google-analytics.com *.jwpcdn.com *.twimg.com *.twitter.com *.hydrax.net *.facebook.com *.googleapis.com *.facebook.net *.iomovies.info",
        "script-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' data: *.air.tv *.b2c.com *.chartbeat.com *.cheezburger.com *.chzbgr.com *.complex.com *.facebook.net *.google-analytics.com *.google.com *.gstatic.com *",
        "default-src http://*.pcmag.com https://*.pcmag.com 'unsafe-inline' 'unsafe-eval' data: blob: bootstrapcdn.com *.bootstrapcdn.com disqus.com *.disqus.com disquscdn.com *.disquscdn.com facebook.com *.fa",
        "cebook.com googleapis.com *.googleapis.com gstatic.com *.gstatic.com ign.com *.ign.com pinterest.com *.pinterest.com reddit.com *.reddit.com truste.com *.truste.com youtube.com *.youtube.com youtube-n",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' data: *.youtube.com *.ytimg.com *.google-analytics.com *.facebook.net *.complex.com *.b2c.com *.chartbeat.com *.chzbgr.com *.scorecardresearch.com *.air",
        "*.hypable.com *.stat-rock.com *.wibbitz.com *.googletagservices.com *.googleapis.com *.twitter.com *.google.com *.facebook.com *.google-analytics.com *.gstatic.com *.facebook.net *.alooma.com",
        "*.google.com *.gstatic.com *.widgetpack.com *.jwpcdn.com *.google-analytics.com *.povwideo.net *.clipwatching.com *.vshare.io *.rapidvideo.com *.fastplay.to *.facebook.com *.fbcdn.net",
        " data: *.fbcdn.net *.facebook.com *.google-analytics.com *.facebook.net *.bwwstatic.com *.addthis.com *.cloudflare.com *.fontawesome.com *.onesignal.com *.googleapis.com",
        "blob: *.fbcdn.net *.gstatic.com *.google.com *.facebook.com *.disquscdn.com *.twitter.com https://disqus.com *.addthis.com *.facebook.net *.disqus.com *.kiss-anime.tv",
        "*.facebook.com *.searchiq.co *.cloudflare.com *.gstatic.com *.facebook.net *.google-analytics.com *.googletagmanager.com *.google.com *.googleapis.com *.twitter.com",
        ".instagram *.newrelic.com *.optimizely.com *.quantcount.com *.quantserve.com *.scorecardresearch.com *.spot.im *.twitter.com *.youtube.com *.ytimg.com",
        "blob: *.google.com *.facebook.com *.google-analytics.com *.googleapis.com *.gstatic.com *.facebook.net *.disquscdn.com https://disqus.com *.disqus.com",
        "ocookie.com *.youtube-nocookie.com zdbb.net *.zdbb.net ziffdavisinternet.com *.ziffdavisinternet.com ziffstatic.com *.ziffstatic.com",
        "child-src 'none';frame-src *;worker-src 'none';",
        ".com *.google-analytics.com",
        " *.google-analytics.com *.cloudflare.com *.gstatic.com *.google.com *.solvemedia.com",
        " *.googletagmanager.com *.cloudflare.com *.gstatic.com *.google.com *.solvemedia.com *.googlesyndication.com",
        "*.cloudflare.com *.google.com *.addthis.com *.addthisedge.com *.facebook.net *.twitter.com *.jquery.com",
        "script-src 'self' * blob: data:",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
        ".tv *.quantserve.com *.optimizely.com *.cheezburger.com *.quantcount.com *.newrelic.com *.spot.im",
        "worker-src 'none'",
        "*.zencdn.net *.fontawesome.com *.cloudflare.com *.googletagmanager.com *.bootstrapcdn.com",
        "rc 'self' *.solvemedia.com *.gstatic.com *.google.com",
        "script-src 'unsafe-inline' 'self' *.ytimg.com *.youtube.com",
        "script-src http: https: 'self' * 'unsafe-inline'",
        "*.jwpcdn.com *.gstatic.com *.googletagmanager.com *.addthis.com *.google.com",
        " *.googleapis.com *.cloudflare.com *.fluidplayer.com *.google.com *.gstatic",
        " 'unsafe-eval' *.googletagmanager.com *.jsdelivr.net http://mygoodstream.pw",
        " *.gstatic.com *.google.com *.googleapis.com",
        "*.google.com *.gstatic",
        "child-src 'self' *.camvideos.org *.cwtvembeds.com; script-src 'self' *",
        "script-src 'self' * disquscdn.com 'unsafe-inline'",
        "*.googletagmanager.com",
        "connect-src 'self' *.twitter.com *.disqus.com https://disqus.com",
        " *.googleapis.com *.gstatic.com *.google.com *.solvemedia.com",
        " 'unsafe-eval' *.hearstapps.com *.hearst.io *.hdmtools.com",
        "*.gstatic.com *.rawgit.com *.googleapis.com *.google.com",
        "disqus.com *.disqus.com disquscdn.com *.disquscdn.com",
        " *.cloudflare.com *.googleapis.com *.jsdelivr.net",
        "*.googleapis.com *.scorecardresearch.com *.disqus",
        "script-src 'unsafe-inline' 'unsafe-eval' data: *",
        "*.googleapis.com *.cloudflare.com *.bootstrapcdn",
        "*.jwplatform.com *.jwpcdn.com *.googletagmanager",
        "child-src 'self' *.onesignal.com *.facebook.com",
        " 'unsafe-eval' blob: *.gstatic.com *.cloudflare",
        "script-src 'self'",
        " 'unsafe-eval' *.sharethis.com *.facebook.com",
        " 'unsafe-eval' *.facebook.com *.facebook.net",
        " *.facebook.net *.facebook.com *.twitter.com",
        " 'unsafe-eval' *.jwpsrv.com *.jwplayer.com",
        " *.google.com *.msembed.net *.mystream.to",
        "child-src 'none'; frame-src ",
        " 'unsafe-eval'",
        " data: *.bootstrapcdn.com *.googleapis",
        " data: *.facebook.net *.facebook.com",
        "child-src 'none';frame-src 'self' *;",
        "default-src 'self' 'unsafe-inline'",
        " http: https: blob:",
        "*.bootstrapcdn.com *.cloudflare",
        "blob: *.peer5.com *.jwpcdn.com ",
        "child-src 'self'",
        " *.google.com *.cloudflare.com",
        " *.disquscdn.com *.disqus.com",
        " data: *.fbcdn.net *.facebook",
        " *.googleapis.com",
        " hcaptcha.com *.hcaptcha.com",
        " *.pinterest.com *.onesignal",
        "https://disqus.com *.disqus",
        "*.gstatic.com *.google.com ",
        " *.4cdn.org *.4channel.org",
        " *.addthis.com *.query.com",
        "*.facebook.com *.pinterest",
        "*.facebook.net *.facebook",
        " *.scorecardresearch.com",
        " * blob: 'unsafe-inline'",
        "connect-src https: http:",
        "*.google.com",
        "*.addthis.com *.disqus",
        " *.googletagservices",
        "*.cloudflare",
        " *.bootstrapcdn.com",
        ".com *.jsdelivr.net",
        " data:",
        "style-src 'self' *",
        "connect-src 'self'",
        " *.solvemedia.com ",
        " *.tickcounter.com",
        " *.updatetube.com",
        " *.wstream.video",
        " *.disquscdn.com",
        "*.facebook.com ",
        "*.gstatic",
        " *.statcounter",
        " *.addthis.com",
        " *.histats.com",
        " http: https:",
        ".com *.jquery",
        " *.yimg.com",
        " *.alotporn",
        "*.yandex.ru",
        " *.amung.us",
        ".com",
        "'self' *; ",
        "child-src ",
        " blob:",
        " *.google",
        " *",
        " ; ",
        "*; ",
        "o",
        ".",
        "c",
        " ",
        "e",
        "s",
        "t",
        "a",
        "i",
        "'",
        "*",
        "l",
        "r",
        "n",
        "m",
        "g",
        "p",
        "f",
        "-",
        "d",
        "u",
        "b",
        "w",
        "k",
        "y",
        ":",
        "v",
        "h",
        ";",
        "q",
        "j",
        "z",
        "/",
        "x",
        "4",
        "2",
        "5"
    ];

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /* tslint:disable */
    var networkFilterCodebook = [
        "/wp-content/uploads/",
        "/images/",
        "banner",
        "analytics",
        "/pagead/js/adsbygoogle.js",
        "/js/sdkloader/ima3.js",
        "/advertisement.js",
        "tracking",
        "/ad",
        ".js",
        "/wp-content/plugins",
        "/crossdomain.xml",
        "/cdn-cgi/pe/bag2?",
        "/www-static/js/",
        "track",
        "/ajax/libs/fuckadblock/*/fuckadblock",
        "s/",
        "3",
        ".php",
        "script",
        "er",
        "^*/",
        "/wp-content/",
        ".gif",
        "sponsor",
        "ad",
        "affiliate",
        "stat",
        "google",
        "content",
        "count",
        "in",
        ".jpg",
        "/asset",
        "video",
        "widget",
        ".html",
        "impression",
        "frame",
        "^",
        "image",
        "x",
        "300x250",
        "click",
        "re",
        "page",
        "/img/",
        "co",
        "play",
        "media",
        "background",
        "a",
        ".png",
        "pixel",
        "lo",
        "event",
        "/template",
        ".swf",
        "tion",
        "/j",
        "/p",
        "tisement",
        ":",
        "/www/deliv",
        ".aspx?",
        "te",
        "/",
        "ar",
        "en",
        "ic",
        "le",
        "view",
        "st",
        "campaign",
        "de",
        "or",
        "on",
        "an",
        "source",
        ".",
        "al",
        "/c",
        "id=",
        "/*",
        "romo",
        "728x90",
        "et",
        "/g",
        "s",
        "li",
        "as",
        "tag",
        "visit",
        "op",
        "/web",
        "^*",
        "skyscrap",
        "takeov",
        "at",
        "/m",
        "160x600",
        "right",
        "/f",
        "theme",
        "ro",
        "it",
        "e",
        "=",
        "/d",
        "120x60",
        "ch",
        "s_",
        "468x60",
        "im",
        "am",
        "html",
        "/w",
        "ho",
        "tis",
        "si",
        "ac",
        "ap",
        ".cgi?",
        "s-",
        "/embed",
        "type=",
        "up",
        "0",
        "okie",
        "se",
        "un",
        "00",
        "fault",
        "ve",
        "h",
        "w",
        "ub",
        "new",
        "lay",
        "/e",
        "?",
        "6",
        "ct",
        "bo",
        "i",
        ".m",
        "ck",
        "plug",
        "k",
        "ed",
        "ag",
        "web",
        "v",
        "&",
        "ut",
        "jax",
        "clu",
        "5",
        "il",
        "om",
        "t",
        "id",
        "g/",
        "ot",
        "/n",
        "sp",
        "ava",
        "el",
        "u",
        "m",
        "gi-b",
        ".htm",
        "zeige",
        "ur",
        "/?",
        "ff",
        "down",
        "us",
        "7",
        "xt",
        "*&",
        "qu",
        "http",
        "um",
        "d",
        "ra",
        "728",
        "468",
        "mp",
        "ss",
        "*",
        "/r",
        "8",
        "di",
        "s?",
        "odu",
        ";",
        "me",
        "ol",
        "ri",
        "tn",
        "f",
        "o",
        "_",
        "-",
        "20",
        "4",
        "2",
        "be",
        "g_",
        "p",
        "sk",
        "he",
        "j",
        "la",
        "fi",
        "z",
        "g",
        "/o",
        "sh",
        "sc",
        "t/",
        "e/",
        "9",
        "m/",
        ".xml",
        "b",
        "js",
        "n",
        "-m",
        "to",
        "pl",
        "/_",
        "1",
        "go",
        "gg",
        "ta",
        "y",
        "l",
        "c",
        "p-",
        "p?",
        "t_",
        "y/",
        "fo",
        "r",
        "ul",
        "25",
        "ma",
        "lug",
        "e_",
        "yn",
        "0_",
        "tr"
    ];

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /* tslint:disable */
    var networkHostnameCodebook = [
        ".com",
        "pagead2.googlesyndication",
        "cloudfront.net",
        "doubleclick.net",
        ".net",
        "imasdk.googleapis",
        ".bid",
        "analytics",
        "er",
        ".de",
        "media",
        "in",
        "google",
        ".co.uk",
        "ad",
        "track",
        "stat",
        "amazonaws",
        "or",
        "cdnjs.cloudflare",
        "affiliate",
        "re",
        "on",
        "an",
        "st",
        "click",
        "traffic",
        "s",
        "phncdn",
        "ar",
        "it",
        "en",
        "count",
        "at",
        "al",
        "et",
        "ic",
        "video",
        "ch",
        "am",
        "b",
        "es",
        "cdn",
        "lo",
        "c",
        "ro",
        "facebook",
        "el",
        "il",
        "im",
        "ap",
        "as",
        "web",
        "news",
        "is",
        ".ru",
        "ag",
        "ed",
        "to",
        "ac",
        "id",
        "e",
        "1",
        "us",
        "tube",
        "un",
        "ho",
        "mo",
        "fo",
        "sp",
        "ex",
        "ur",
        "li",
        "l",
        "d",
        "f",
        "p",
        "tr",
        "th",
        "ec",
        "z",
        "bo",
        "po",
        "u",
        "h",
        "ve",
        "le",
        "r",
        "ig",
        "ub",
        "tv",
        "io",
        "go",
        "do",
        "em",
        "pl",
        "ab",
        "o",
        "au",
        "ir",
        "q",
        "up",
        "um",
        "so",
        "se",
        "ay",
        "g",
        "ut",
        "a",
        "ew",
        "ip",
        "me",
        "ul",
        "ak",
        "sh",
        "av",
        "af",
        "iz",
        "az",
        "no",
        "de",
        "ck",
        "ti",
        "br",
        "be",
        ".fwmrm",
        "my",
        "t",
        "te",
        "ge",
        "gr",
        "ix",
        "fr",
        "di",
        "vi",
        "sc",
        "ol",
        "ajax.",
        "op",
        "ly",
        "ma",
        "ep",
        "ts",
        "yo",
        "sy",
        "eu",
        ".xyz",
        "ud",
        "bl",
        "sm",
        "n",
        "qu",
        "ik",
        "i",
        "cr",
        "om",
        "ss",
        "fl",
        "eb",
        "ld",
        "pr",
        "iv",
        "ff",
        "xx",
        ".p",
        "ot",
        "tn",
        "mp",
        "jo",
        "hd",
        "wn",
        "cl",
        "bu",
        "ks",
        "ce",
        ".za",
        "tw",
        "aw",
        "if",
        "ib",
        "ey",
        "ht",
        "ev",
        "yp",
        "w",
        "e-",
        "ta",
        "jp",
        "da",
        "sk",
        "ek",
        "uk",
        ".b",
        "nd",
        "ok",
        "ia",
        "ll",
        "j",
        "dr",
        "ef",
        "-",
        "dn",
        "sn",
        ".n",
        ".1",
        "y",
        "5",
        "tm",
        "si",
        "gu",
        "sr",
        "vo",
        "tu",
        ".s",
        "2",
        "7",
        "kr",
        "gg",
        "he",
        ".m",
        "cp",
        "dm",
        "fe",
        "ca",
        "24",
        "cn",
        "wp",
        "9",
        "ie",
        "wh",
        "v",
        "x",
        "fm",
        "we",
        "ds",
        "ft",
        "fa",
        "ps",
        "8",
        "du",
        "db",
        "yn",
        "m",
        "hu",
        "k",
        "4",
        "ws",
        "6",
        "gs",
        "ya",
        "0",
        "eo",
        ".",
        "3"
    ];

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /* tslint:disable */
    var networkRedirectCodebook = [
        "fuckadblock.js-3.2.0",
        "x2-transparent.png",
        "googlesyndication.com/adsbygoogle.js",
        "noopjs",
        "noopmp3-0.1s",
        "1x1-transparent.gif",
        "google-analytics.com/analytics.js",
        "googletagmanager.com/gtm.js",
        "noopmp4-1s",
        "nooptext",
        "ligatus.com/*/angular-tag.js",
        "d3pkae9owd2lcf.cloudfront.net/mb105.js",
        "amazon-adsystem.com/aax2/amzn_ads.js",
        "static.chartbeat.com/chartbeat.js",
        "widgets.outbrain.com/outbrain.js",
        "scorecardresearch.com/beacon.js",
        "google-analytics.com/cx/api.js",
        "addthis.com/addthis_widget.js",
        "32x32-transparent.png",
        "googletagservices.com/gpt.js",
        "google-analytics.com/ga.js",
        "hd-main.js",
        "noopframe",
        "silent-noeval.js",
        "popads-dummy.js",
        "fingerprint2.js",
        "popads.net.js",
        "none",
        "o",
        "n",
        "p",
        "s",
        "j",
        ".",
        "t",
        "a",
        "-",
        "e",
        "r",
        "g",
        "m",
        "c",
        "2",
        "x",
        "1",
        "3",
        "l",
        "d",
        "0",
        "k",
        "i",
        "f",
        "b",
        "u",
        "/",
        "4",
        "y",
        "h",
        "w",
        "*",
        "v",
        "_",
        "z",
        "9",
        "5"
    ];

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    // Cosmetic selectors
    var cosmeticSmaz = factory(cosmeticSelectorCodebook);
    var deflateCosmeticString = cosmeticSmaz[0];
    var inflateCosmeticString = cosmeticSmaz[1];
    // Network CSPs
    var networkCSPSmaz = factory(networkCSPCodebook);
    var deflateNetworkCSPString = networkCSPSmaz[0];
    var inflateNetworkCSPString = networkCSPSmaz[1];
    // Network redirects
    var networkRedirectSmaz = factory(networkRedirectCodebook);
    var deflateNetworkRedirectString = networkRedirectSmaz[0];
    var inflateNetworkRedirectString = networkRedirectSmaz[1];
    // Network hostnames
    var networkHostnameSmaz = factory(networkHostnameCodebook);
    var deflateNetworkHostnameString = networkHostnameSmaz[0];
    var inflateNetworkHostnameString = networkHostnameSmaz[1];
    // Network filters
    var networkFilterSmaz = factory(networkFilterCodebook);
    var deflateNetworkFilterString = networkFilterSmaz[0];
    var inflateNetworkFilterString = networkFilterSmaz[1];

    /* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
    /* From: https://github.com/SheetJS/js-crc32/ */
    var T = (function () {
        var c = 0;
        var table = new Int32Array(256);
        for (var n = 0; n !== 256; n += 1) {
            c = n;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
            table[n] = c;
        }
        return table;
    })();
    function crc32(buf, start, end) {
        var C = 0 ^ -1;
        var L = end - 7;
        var i = start;
        while (i < L) {
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
        }
        while (i < L + 7) {
            C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
        }
        return (C ^ -1) >>> 0;
    }

    /* ! Copyright Mathias Bynens <https://mathiasbynens.be/>
     *
     * Permission is hereby granted, free of charge, to any person obtaining
     * a copy of this software and associated documentation files (the
     * "Software"), to deal in the Software without restriction, including
     * without limitation the rights to use, copy, modify, merge, publish,
     * distribute, sublicense, and/or sell copies of the Software, and to
     * permit persons to whom the Software is furnished to do so, subject to
     * the following conditions:
     *
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
     * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
     * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
     * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     */
    /** Highest positive signed 32-bit float value */
    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
    /** Bootstring parameters */
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128; // 0x80
    var delimiter = '-'; // '\x2D'
    /** Regular expressions */
    var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
    var errors = {
        'invalid-input': 'Invalid input',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'overflow': 'Overflow: input needs wider integers to process'
    };
    /** Convenience shortcuts */
    var baseMinusTMin = base - tMin;
    /*--------------------------------------------------------------------------*/
    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error(type) {
        throw new RangeError(errors[type]);
    }
    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(str) {
        var output = [];
        var counter = 0;
        var length = str.length;
        while (counter < length) {
            var value = str.charCodeAt(counter++);
            if (value >= 0xd800 && value <= 0xdbff && counter < length) {
                // It's a high surrogate, and there is a next character.
                var extra = str.charCodeAt(counter++);
                if ((extra & 0xfc00) === 0xdc00) {
                    // Low surrogate.
                    output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
                }
                else {
                    // It's an unmatched surrogate; only append this code unit, in case the
                    // next code unit is the high surrogate of a surrogate pair.
                    output.push(value);
                    counter--;
                }
            }
            else {
                output.push(value);
            }
        }
        return output;
    }
    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    function basicToDigit(codePoint) {
        if (codePoint - 0x30 < 0x0a) {
            return codePoint - 0x16;
        }
        if (codePoint - 0x41 < 0x1a) {
            return codePoint - 0x41;
        }
        if (codePoint - 0x61 < 0x1a) {
            return codePoint - 0x61;
        }
        return base;
    }
    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26 ? 1 : 0) - ((flag !== 0 ? 1 : 0) << 5);
    }
    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
        delta += Math.floor(delta / numPoints);
        for (; /* no initialization */ delta > (baseMinusTMin * tMax) >> 1; k += base) {
            delta = Math.floor(delta / baseMinusTMin);
        }
        return Math.floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
    }
    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    function decode(input) {
        // Don't use UCS-2.
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
            basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
            // if it's not a basic code point
            if (input.charCodeAt(j) >= 0x80) {
                error('not-basic');
            }
            output.push(input.charCodeAt(j));
        }
        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength /* no final expression */;) {
            // `index` is the index of the next character to be consumed.
            // Decode a generalized variable-length integer into `delta`,
            // which gets added to `i`. The overflow checking is easier
            // if we increase `i` as we go, then subtract off its starting
            // value at the end to obtain `delta`.
            var oldi = i;
            for (var w = 1, k = base /* no condition */;; k += base) {
                if (index >= inputLength) {
                    error('invalid-input');
                }
                var digit = basicToDigit(input.charCodeAt(index++));
                if (digit >= base || digit > Math.floor((maxInt - i) / w)) {
                    error('overflow');
                }
                i += digit * w;
                var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (digit < t) {
                    break;
                }
                var baseMinusT = base - t;
                if (w > Math.floor(maxInt / baseMinusT)) {
                    error('overflow');
                }
                w *= baseMinusT;
            }
            var out = output.length + 1;
            bias = adapt(i - oldi, out, oldi === 0);
            // `i` was supposed to wrap around from `out` to `0`,
            // incrementing `n` each time, so we'll fix that now:
            if (Math.floor(i / out) > maxInt - n) {
                error('overflow');
            }
            n += Math.floor(i / out);
            i %= out;
            // Insert `n` at position `i` of the output.
            output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(null, output);
    }
    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    function encode(str) {
        var output = [];
        // Convert the input in UCS-2 to an array of Unicode code points.
        var input = ucs2decode(str);
        // Cache the length.
        var inputLength = input.length;
        // Initialize the state.
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        // Handle the basic code points.
        for (var i = 0; i < input.length; i += 1) {
            var currentValue = input[i];
            if (currentValue < 0x80) {
                output.push(String.fromCharCode(currentValue));
            }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.
        // Finish the basic string with a delimiter unless it's empty.
        if (basicLength) {
            output.push(delimiter);
        }
        // Main encoding loop:
        while (handledCPCount < inputLength) {
            // All non-basic code points < n have been handled already. Find the next
            // larger one:
            var m = maxInt;
            for (var i = 0; i < input.length; i += 1) {
                var currentValue = input[i];
                if (currentValue >= n && currentValue < m) {
                    m = currentValue;
                }
            }
            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
            // but guard against overflow.
            var handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > Math.floor((maxInt - delta) / handledCPCountPlusOne)) {
                error('overflow');
            }
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for (var i = 0; i < input.length; i += 1) {
                var currentValue = input[i];
                if (currentValue < n && ++delta > maxInt) {
                    error('overflow');
                }
                if (currentValue === n) {
                    // Represent delta as a generalized variable-length integer.
                    var q = delta;
                    for (var k = base /* no condition */;; k += base) {
                        var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                        if (q < t) {
                            break;
                        }
                        var qMinusT = q - t;
                        var baseMinusT = base - t;
                        output.push(String.fromCharCode(digitToBasic(t + (qMinusT % baseMinusT), 0)));
                        q = Math.floor(qMinusT / baseMinusT);
                    }
                    output.push(String.fromCharCode(digitToBasic(q, 0)));
                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
                    delta = 0;
                    ++handledCPCount;
                }
            }
            ++delta;
            ++n;
        }
        return output.join('');
    }
    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    function toASCII(input) {
        // Avoid `split(regex)` for IE8 compatibility. See #17.
        var labels = input.replace(regexSeparators, '\x2E').split('.');
        var encoded = [];
        for (var i = 0; i < labels.length; i += 1) {
            encoded.push(regexNonASCII.test(labels[i]) ? 'xn--' + encode(labels[i]) : labels[i]);
        }
        return encoded.join('.');
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var EMPTY_UINT8_ARRAY = new Uint8Array(0);
    var EMPTY_UINT32_ARRAY = new Uint32Array(0);
    // Check if current architecture is little endian
    var LITTLE_ENDIAN = new Int8Array(new Int16Array([1]).buffer)[0] === 1;
    /**
     * This abstraction allows to serialize efficiently low-level values of types:
     * String, uint8, uint16, uint32 while hiding the complexity of managing the
     * current offset and growing. It should always be instantiated with a
     * big-enough length because this will not allow for resizing.
     *
     * This class is also more efficient than the built-in `DataView`.
     *
     * The way this is used in practice is that you write pairs of function to
     * serialize (respectively) deserialize a given structure/class (with code being
     * pretty symetrical). In the serializer you `pushX` values, and in the
     * deserializer you use `getX` functions to get back the values.
     */
    var StaticDataView = /** @class */ (function () {
        function StaticDataView(buffer, _a) {
            var enableCompression = _a.enableCompression;
            if (LITTLE_ENDIAN === false) {
                // This check makes sure that we will not load the adblocker on a
                // big-endian system. This would not work since byte ordering is important
                // at the moment (mainly for performance reasons).
                throw new Error('Adblocker currently does not support Big-endian systems');
            }
            this.enableCompression = enableCompression;
            this.buffer = buffer;
            this.pos = 0;
        }
        /**
         * Return number of bytes needed to serialize `str` ASCII string.
         */
        StaticDataView.sizeOfASCII = function (str) {
            return StaticDataView.sizeOfLength(str.length) + str.length;
        };
        /**
         * Return number of bytes needed to serialize `str` UTF8 string.
         */
        StaticDataView.sizeOfUTF8 = function (str) {
            var encoded = encode(str);
            return StaticDataView.sizeOfLength(encoded.length) + encoded.length;
        };
        /**
         * Return number of bytes needed to serialize `array`.
         */
        StaticDataView.sizeOfUint32Array = function (array) {
            return array.byteLength + StaticDataView.sizeOfLength(array.length);
        };
        /**
         * Create an empty (i.e.: size = 0) StaticDataView.
         */
        StaticDataView.empty = function (options) {
            return StaticDataView.fromUint8Array(EMPTY_UINT8_ARRAY, options);
        };
        /**
         * Instantiate a StaticDataView instance from `array` of type Uint8Array.
         */
        StaticDataView.fromUint8Array = function (array, options) {
            return new StaticDataView(array, options);
        };
        /**
         * Instantiate a StaticDataView with given `capacity` number of bytes.
         */
        StaticDataView.allocate = function (capacity, options) {
            return new StaticDataView(new Uint8Array(capacity), options);
        };
        /**
         * Return number of bytes needed to serialize `length`.
         */
        StaticDataView.sizeOfLength = function (length) {
            return length <= 127 ? 1 : 5;
        };
        StaticDataView.prototype.checksum = function () {
            return crc32(this.buffer, 0, this.pos);
        };
        StaticDataView.prototype.dataAvailable = function () {
            return this.pos < this.buffer.byteLength;
        };
        StaticDataView.prototype.setPos = function (pos) {
            this.pos = pos;
        };
        StaticDataView.prototype.getPos = function () {
            return this.pos;
        };
        StaticDataView.prototype.seekZero = function () {
            this.pos = 0;
        };
        StaticDataView.prototype.slice = function () {
            this.checkSize();
            return this.buffer.slice(0, this.pos);
        };
        /**
         * Make sure that `this.pos` is aligned on a multiple of 4.
         */
        StaticDataView.prototype.align4 = function () {
            // From: https://stackoverflow.com/a/2022194
            this.pos = (this.pos + 3) & ~0x03;
        };
        StaticDataView.prototype.set = function (buffer) {
            this.buffer = new Uint8Array(buffer);
            this.seekZero();
        };
        StaticDataView.prototype.pushBool = function (bool) {
            this.pushByte(Number(bool));
        };
        StaticDataView.prototype.getBool = function () {
            return Boolean(this.getByte());
        };
        StaticDataView.prototype.setByte = function (pos, byte) {
            this.buffer[pos] = byte;
        };
        StaticDataView.prototype.pushByte = function (octet) {
            this.pushUint8(octet);
        };
        StaticDataView.prototype.getByte = function () {
            return this.getUint8();
        };
        StaticDataView.prototype.pushBytes = function (bytes, align) {
            if (align === void 0) { align = false; }
            this.pushLength(bytes.length);
            if (align === true) {
                this.align4();
            }
            this.buffer.set(bytes, this.pos);
            this.pos += bytes.byteLength;
        };
        StaticDataView.prototype.getBytes = function (align) {
            if (align === void 0) { align = false; }
            var numberOfBytes = this.getLength();
            if (align === true) {
                this.align4();
            }
            // TODO - using `subarray` here causes issue during updates. It is not
            // clear why that happens but it would be nice to investigate so that we
            // can continue to not copy any data while deserializing.
            //
            // const bytes = this.buffer.subarray(this.pos, this.pos + numberOfBytes);
            var bytes = this.buffer.slice(this.pos, this.pos + numberOfBytes);
            this.pos += numberOfBytes;
            return bytes;
        };
        /**
         * Allows row access to the internal buffer through a Uint32Array acting like
         * a view. This is used for super fast writing/reading of large chunks of
         * Uint32 numbers in the byte array.
         */
        StaticDataView.prototype.getUint32ArrayView = function (desiredSize) {
            // Round this.pos to next multiple of 4 for alignement
            this.align4();
            // Short-cut when empty array
            if (desiredSize === 0) {
                return EMPTY_UINT32_ARRAY;
            }
            // Create non-empty view
            var view = new Uint32Array(this.buffer.buffer, this.pos + this.buffer.byteOffset, desiredSize);
            this.pos += desiredSize * 4;
            return view;
        };
        StaticDataView.prototype.pushUint8 = function (uint8) {
            this.buffer[this.pos++] = uint8;
        };
        StaticDataView.prototype.getUint8 = function () {
            return this.buffer[this.pos++];
        };
        StaticDataView.prototype.pushUint16 = function (uint16) {
            this.buffer[this.pos++] = uint16 >>> 8;
            this.buffer[this.pos++] = uint16;
        };
        StaticDataView.prototype.getUint16 = function () {
            return ((this.buffer[this.pos++] << 8) | this.buffer[this.pos++]) >>> 0;
        };
        StaticDataView.prototype.pushUint32 = function (uint32) {
            this.buffer[this.pos++] = uint32 >>> 24;
            this.buffer[this.pos++] = uint32 >>> 16;
            this.buffer[this.pos++] = uint32 >>> 8;
            this.buffer[this.pos++] = uint32;
        };
        StaticDataView.prototype.getUint32 = function () {
            return ((((this.buffer[this.pos++] << 24) >>> 0) +
                ((this.buffer[this.pos++] << 16) |
                    (this.buffer[this.pos++] << 8) |
                    this.buffer[this.pos++])) >>>
                0);
        };
        StaticDataView.prototype.pushUint32Array = function (arr) {
            this.pushLength(arr.length);
            // TODO - use `set` to push the full buffer at once?
            for (var i = 0; i < arr.length; i += 1) {
                this.pushUint32(arr[i]);
            }
        };
        StaticDataView.prototype.getUint32Array = function () {
            var length = this.getLength();
            var arr = new Uint32Array(length);
            // TODO - use `subarray`?
            for (var i = 0; i < length; i += 1) {
                arr[i] = this.getUint32();
            }
            return arr;
        };
        StaticDataView.prototype.pushUTF8 = function (raw) {
            var str = encode(raw);
            this.pushLength(str.length);
            for (var i = 0; i < str.length; i += 1) {
                this.buffer[this.pos++] = str.charCodeAt(i);
            }
        };
        StaticDataView.prototype.getUTF8 = function () {
            var byteLength = this.getLength();
            this.pos += byteLength;
            return decode(String.fromCharCode.apply(null, 
            // @ts-ignore
            this.buffer.subarray(this.pos - byteLength, this.pos)));
        };
        StaticDataView.prototype.pushASCII = function (str) {
            this.pushLength(str.length);
            for (var i = 0; i < str.length; i += 1) {
                this.buffer[this.pos++] = str.charCodeAt(i);
            }
        };
        StaticDataView.prototype.getASCII = function () {
            var byteLength = this.getLength();
            this.pos += byteLength;
            // @ts-ignore
            return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
        };
        StaticDataView.prototype.pushNetworkRedirect = function (str) {
            if (this.enableCompression === true) {
                this.pushBytes(deflateNetworkRedirectString(str));
            }
            else {
                this.pushASCII(str);
            }
        };
        StaticDataView.prototype.getNetworkRedirect = function () {
            if (this.enableCompression === true) {
                return inflateNetworkRedirectString(this.getBytes());
            }
            return this.getASCII();
        };
        StaticDataView.prototype.pushNetworkHostname = function (str) {
            if (this.enableCompression === true) {
                this.pushBytes(deflateNetworkHostnameString(str));
            }
            else {
                this.pushASCII(str);
            }
        };
        StaticDataView.prototype.getNetworkHostname = function () {
            if (this.enableCompression === true) {
                return inflateNetworkHostnameString(this.getBytes());
            }
            return this.getASCII();
        };
        StaticDataView.prototype.pushNetworkCSP = function (str) {
            if (this.enableCompression === true) {
                this.pushBytes(deflateNetworkCSPString(str));
            }
            else {
                this.pushASCII(str);
            }
        };
        StaticDataView.prototype.getNetworkCSP = function () {
            if (this.enableCompression === true) {
                return inflateNetworkCSPString(this.getBytes());
            }
            return this.getASCII();
        };
        StaticDataView.prototype.pushNetworkFilter = function (str) {
            if (this.enableCompression === true) {
                this.pushBytes(deflateNetworkFilterString(str));
            }
            else {
                this.pushASCII(str);
            }
        };
        StaticDataView.prototype.getNetworkFilter = function () {
            if (this.enableCompression === true) {
                return inflateNetworkFilterString(this.getBytes());
            }
            return this.getASCII();
        };
        StaticDataView.prototype.pushCosmeticSelector = function (str) {
            if (this.enableCompression === true) {
                this.pushBytes(deflateCosmeticString(str));
            }
            else {
                this.pushASCII(str);
            }
        };
        StaticDataView.prototype.getCosmeticSelector = function () {
            if (this.enableCompression === true) {
                return inflateCosmeticString(this.getBytes());
            }
            return this.getASCII();
        };
        StaticDataView.prototype.checkSize = function () {
            if (this.pos !== 0 && this.pos > this.buffer.byteLength) {
                throw new Error("StaticDataView too small: " + this.buffer.byteLength + ", but required " + this.pos + " bytes");
            }
        };
        // Serialiez `length` with variable encoding to save space
        StaticDataView.prototype.pushLength = function (length) {
            if (length <= 127) {
                this.pushUint8(length);
            }
            else {
                this.pushUint8(128);
                this.pushUint32(length);
            }
        };
        StaticDataView.prototype.getLength = function () {
            var lengthShort = this.getUint8();
            return lengthShort === 128 ? this.getUint32() : lengthShort;
        };
        return StaticDataView;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    function compactTokens(tokens) {
        var sorted = tokens.sort();
        var lastIndex = 1;
        for (var i = 1; i < sorted.length; i += 1) {
            if (sorted[lastIndex - 1] !== sorted[i]) {
                sorted[lastIndex] = sorted[i];
                lastIndex += 1;
            }
        }
        return sorted.subarray(0, lastIndex);
    }
    function hasEmptyIntersection(s1, s2) {
        var i = 0;
        var j = 0;
        while (i < s1.length && j < s2.length && s1[i] !== s2[j]) {
            if (s1[i] < s2[j]) {
                i += 1;
            }
            else if (s2[j] < s1[i]) {
                j += 1;
            }
        }
        return !(i < s1.length && j < s2.length);
    }
    function concatTypedArrays(arrays) {
        var totalSize = 0;
        for (var i = 0; i < arrays.length; i += 1) {
            totalSize += arrays[i].length;
        }
        var result = new Uint32Array(totalSize);
        var index = 0;
        for (var i = 0; i < arrays.length; i += 1) {
            var array = arrays[i];
            for (var j = 0; j < array.length; j += 1) {
                result[index] = array[j];
                index += 1;
            }
        }
        return result;
    }
    function mergeCompactSets() {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        return compactTokens(concatTypedArrays(arrays));
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Thin abstraction around a Uint32Array which allows to push tokens
     * whithout caring for the offset. It is used as a way to avoid multiple
     * allocations while calling tokenization (mostly beneficitial for
     * `NetworkFilter.getTokens()`).
     */
    var TokensBuffer = /** @class */ (function () {
        function TokensBuffer(size) {
            this.size = size;
            this.pos = 0;
            this.buffer = new Uint32Array(size);
        }
        TokensBuffer.prototype.seekZero = function () {
            this.pos = 0;
        };
        TokensBuffer.prototype.slice = function () {
            if (this.pos !== 0 && this.pos > this.buffer.length) {
                throw new Error("StaticDataView too small: " + this.buffer.length + ", but required " + this.pos);
            }
            return this.buffer.slice(0, this.pos);
        };
        TokensBuffer.prototype.push = function (token) {
            this.buffer[this.pos++] = token;
        };
        return TokensBuffer;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /***************************************************************************
     *  Bitwise helpers
     * ************************************************************************* */
    // From: https://stackoverflow.com/a/43122214/1185079
    function bitCount(n) {
        n = n - ((n >> 1) & 0x55555555);
        n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
        return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
    }
    function getBit(n, mask) {
        return !!(n & mask);
    }
    function setBit(n, mask) {
        return n | mask;
    }
    function clearBit(n, mask) {
        return n & ~mask;
    }
    function fastHashBetween(str, begin, end) {
        var hash = 5381;
        for (var i = begin; i < end; i += 1) {
            hash = (hash * 33) ^ str.charCodeAt(i);
        }
        return hash >>> 0;
    }
    function fastHash(str) {
        if (!str) {
            return 0;
        }
        return fastHashBetween(str, 0, str.length);
    }
    function hashStrings(strings) {
        var result = new Uint32Array(strings.length);
        for (var i = 0; i < strings.length; i += 1) {
            result[i] = fastHash(strings[i]);
        }
        return result;
    }
    // https://jsperf.com/string-startswith/21
    function fastStartsWith(haystack, needle) {
        if (haystack.length < needle.length) {
            return false;
        }
        var ceil = needle.length;
        for (var i = 0; i < ceil; i += 1) {
            if (haystack[i] !== needle[i]) {
                return false;
            }
        }
        return true;
    }
    function fastStartsWithFrom(haystack, needle, start) {
        if (haystack.length - start < needle.length) {
            return false;
        }
        var ceil = start + needle.length;
        for (var i = start; i < ceil; i += 1) {
            if (haystack[i] !== needle[i - start]) {
                return false;
            }
        }
        return true;
    }
    // Efficient manuel lexer
    function isDigit(ch) {
        // 48 == '0'
        // 57 == '9'
        return ch >= 48 && ch <= 57;
    }
    function isAlpha(ch) {
        // Force to lower-case
        ch |= 32;
        // 65 == 'A'
        // 90 == 'Z'
        return ch >= 97 && ch <= 122;
    }
    function isAlphaExtended(ch) {
        // 192 -> 450
        // À  Á  Â  Ã  Ä  Å  Æ  Ç  È  É  Ê  Ë  Ì  Í  Î  Ï  Ð  Ñ  Ò  Ó  Ô  Õ  Ö  ×  Ø
        // Ù  Ú  Û  Ü  Ý  Þ  ß  à  á  â  ã  ä  å  æ  ç  è  é  ê  ë  ì  í  î  ï  ð  ñ
        // ò  ó  ô  õ  ö  ÷  ø  ù  ú  û  ü  ý  þ  ÿ  Ā  ā  Ă  ă  Ą  ą  Ć  ć  Ĉ  ĉ  Ċ
        // ċ  Č  č  Ď  ď  Đ  đ  Ē  ē  Ĕ  ĕ  Ė  ė  Ę  ę  Ě  ě  Ĝ  ĝ  Ğ  ğ  Ġ  ġ  Ģ  ģ
        // Ĥ  ĥ  Ħ  ħ  Ĩ  ĩ  Ī  ī  Ĭ  ĭ  Į  į  İ  ı  Ĳ  ĳ  Ĵ  ĵ  Ķ  ķ  ĸ  Ĺ  ĺ  Ļ  ļ
        // Ľ  ľ  Ŀ  ŀ  Ł  ł  Ń  ń  Ņ  ņ  Ň  ň  ŉ  Ŋ  ŋ  Ō  ō  Ŏ  ŏ  Ő  ő  Œ  œ  Ŕ  ŕ
        // Ŗ  ŗ  Ř  ř  Ś  ś  Ŝ  ŝ  Ş  ş  Š  š  Ţ  ţ  Ť  ť  Ŧ  ŧ  Ũ  ũ  Ū  ū  Ŭ  ŭ  Ů
        // ů  Ű  ű  Ų  ų  Ŵ  ŵ  Ŷ  ŷ  Ÿ  Ź  ź  Ż  ż  Ž  ž  ſ  ƀ  Ɓ  Ƃ  ƃ  Ƅ  ƅ  Ɔ  Ƈ
        // ƈ  Ɖ  Ɗ  Ƌ  ƌ  ƍ  Ǝ  Ə  Ɛ  Ƒ  ƒ  Ɠ  Ɣ  ƕ  Ɩ  Ɨ  Ƙ  ƙ  ƚ  ƛ  Ɯ  Ɲ  ƞ  Ɵ  Ơ
        // ơ  Ƣ  ƣ  Ƥ  ƥ  Ʀ  Ƨ  ƨ  Ʃ  ƪ  ƫ  Ƭ  ƭ  Ʈ  Ư  ư  Ʊ  Ʋ  Ƴ  ƴ  Ƶ  ƶ  Ʒ  Ƹ  ƹ
        // ƺ  ƻ  Ƽ  ƽ  ƾ  ƿ  ǀ  ǁ  ǂ
        return ch >= 192 && ch <= 450;
    }
    function isCyrillic(ch) {
        // 1024 -> 1279
        // Ѐ Ё Ђ Ѓ Є Ѕ І Ї Ј Љ Њ Ћ Ќ Ѝ Ў Џ А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х
        // Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы
        // ь э ю я ѐ ё ђ ѓ є ѕ і ї ј љ њ ћ ќ ѝ ў џ Ѡ ѡ Ѣ ѣ Ѥ ѥ Ѧ ѧ Ѩ ѩ Ѫ ѫ Ѭ ѭ Ѯ ѯ
        // Ѱ ѱ Ѳ ѳ Ѵ ѵ Ѷ ѷ Ѹ ѹ Ѻ ѻ Ѽ ѽ Ѿ ѿ Ҁ ҁ ҂ ҃ ҄ ҅ ҆ ҇ ҈ ҉ Ҋ ҋ Ҍ ҍ Ҏ ҏ Ґ ґ Ғ ғ Ҕ ҕ Җ җ Ҙ ҙ
        // Қ қ Ҝ ҝ Ҟ ҟ Ҡ ҡ Ң ң Ҥ ҥ Ҧ ҧ Ҩ ҩ Ҫ ҫ Ҭ ҭ Ү ү Ұ ұ Ҳ ҳ Ҵ ҵ Ҷ ҷ Ҹ ҹ Һ һ Ҽ ҽ Ҿ
        // ҿ Ӏ Ӂ ӂ Ӄ ӄ Ӆ ӆ Ӈ ӈ Ӊ ӊ Ӌ ӌ Ӎ ӎ ӏ Ӑ ӑ Ӓ ӓ Ӕ ӕ Ӗ ӗ Ә ә Ӛ ӛ Ӝ ӝ Ӟ ӟ Ӡ ӡ Ӣ ӣ Ӥ
        // ӥ Ӧ ӧ Ө ө Ӫ ӫ Ӭ ӭ Ӯ ӯ Ӱ ӱ Ӳ ӳ Ӵ ӵ Ӷ ӷ Ӹ ӹ Ӻ ӻ Ӽ ӽ Ӿ ӿ
        return ch >= 1024 && ch <= 1279;
    }
    function isAllowedFilter(ch) {
        return (isDigit(ch) || isAlpha(ch) || isAlphaExtended(ch) || isCyrillic(ch) || ch === 37 /* '%' */);
    }
    // Shared TokensBuffer used to avoid having to allocate many typed arrays
    var TOKENS_BUFFER = new TokensBuffer(200);
    function fastTokenizerNoRegex(pattern, isAllowedCode, skipFirstToken, skipLastToken, buffer) {
        var inside = false;
        var start = 0;
        var precedingCh = 0; // Used to check if a '*' is not just before a token
        for (var i = 0; i < pattern.length; i += 1) {
            var ch = pattern.charCodeAt(i);
            if (isAllowedCode(ch)) {
                if (inside === false) {
                    inside = true;
                    start = i;
                    // Keep track of character preceding token
                    if (i > 0) {
                        precedingCh = pattern.charCodeAt(i - 1);
                    }
                }
            }
            else if (inside === true) {
                inside = false;
                // Should not be followed by '*'
                if ((skipFirstToken === false || start !== 0) &&
                    i - start > 1 &&
                    ch !== 42 &&
                    precedingCh !== 42) {
                    buffer.push(fastHashBetween(pattern, start, i));
                    if (buffer.pos === buffer.size) {
                        return;
                    }
                }
            }
        }
        if (inside === true &&
            skipLastToken === false &&
            precedingCh !== 42 &&
            pattern.length - start > 1) {
            buffer.push(fastHashBetween(pattern, start, pattern.length));
        }
        return;
    }
    function fastTokenizer(pattern, isAllowedCode, buffer) {
        var inside = false;
        var start = 0;
        for (var i = 0; i < pattern.length; i += 1) {
            var ch = pattern.charCodeAt(i);
            if (isAllowedCode(ch)) {
                if (inside === false) {
                    inside = true;
                    start = i;
                }
            }
            else if (inside === true) {
                inside = false;
                buffer.push(fastHashBetween(pattern, start, i));
                if (buffer.pos === buffer.size) {
                    return;
                }
            }
        }
        if (inside === true) {
            buffer.push(fastHashBetween(pattern, start, pattern.length));
        }
    }
    function tokenizeInPlace(pattern, buffer) {
        fastTokenizerNoRegex(pattern, isAllowedFilter, false, false, buffer);
    }
    function tokenize(pattern) {
        TOKENS_BUFFER.seekZero();
        tokenizeInPlace(pattern, TOKENS_BUFFER);
        return TOKENS_BUFFER.slice();
    }
    function tokenizeFilterInPlace(pattern, skipFirstToken, skipLastToken, buffer) {
        fastTokenizerNoRegex(pattern, isAllowedFilter, skipFirstToken, skipLastToken, buffer);
    }
    function tokenizeFilter(pattern, skipFirstToken, skipLastToken) {
        TOKENS_BUFFER.seekZero();
        tokenizeFilterInPlace(pattern, skipFirstToken, skipLastToken, TOKENS_BUFFER);
        return TOKENS_BUFFER.slice();
    }
    function tokenizeRegexInPlace(selector, tokens) {
        var end = selector.length - 1;
        var begin = 1;
        var prev = 0;
        // Try to find the longest safe *prefix* that we can tokenize
        for (; begin < end; begin += 1) {
            var code = selector.charCodeAt(begin);
            // If we encounter '|' before any other opening bracket, then it's not safe
            // to tokenize this filter (e.g.: 'foo|bar'). Instead we abort tokenization
            // to be safe.
            if (code === 124 /* '|' */) {
                return;
            }
            if (code === 40 /* '(' */ ||
                code === 42 /* '*' */ ||
                code === 43 /* '+' */ ||
                code === 63 /* '?' */ ||
                code === 91 /* '[' */ ||
                code === 123 /* '{' */ ||
                (code === 46 /* '.' */ && prev !== 92) /* '\' */ ||
                (code === 92 /* '\' */ && isAlpha(selector.charCodeAt(begin + 1)))) {
                break;
            }
            prev = code;
        }
        // Try to find the longest safe *suffix* that we can tokenize
        prev = 0;
        for (; end >= begin; end -= 1) {
            var code = selector.charCodeAt(end);
            // If we encounter '|' before any other opening bracket, then it's not safe
            // to tokenize this filter (e.g.: 'foo|bar'). Instead we abort tokenization
            // to be safe.
            if (code === 124 /* '|' */) {
                return;
            }
            if (code === 41 /* ')' */ ||
                code === 42 /* '*' */ ||
                code === 43 /* '+' */ ||
                code === 63 /* '?' */ ||
                code === 93 /* ']' */ ||
                code === 125 /* '}' */ ||
                (code === 46 /* '.' */ && selector.charCodeAt(end - 1) !== 92) /* '\' */ ||
                (code === 92 /* '\' */ && isAlpha(prev))) {
                break;
            }
            prev = code;
        }
        if (end < begin) {
            // Full selector is safe
            var skipFirstToken = selector.charCodeAt(1) !== 94 /* '^' */;
            var skipLastToken = selector.charCodeAt(selector.length - 1) !== 36 /* '$' */;
            tokenizeFilterInPlace(selector.slice(1, selector.length - 1), skipFirstToken, skipLastToken, tokens);
        }
        else {
            // Tokenize prefix
            if (begin > 1) {
                tokenizeFilterInPlace(selector.slice(1, begin), selector.charCodeAt(1) !== 94 /* '^' */, // skipFirstToken
                true, tokens);
            }
            // Tokenize suffix
            if (end < selector.length - 1) {
                tokenizeFilterInPlace(selector.slice(end + 1, selector.length - 1), true, selector.charCodeAt(selector.length - 1) !== 94 /* '^' */, // skipLastToken
                tokens);
            }
        }
    }
    function createFuzzySignature(pattern) {
        TOKENS_BUFFER.seekZero();
        fastTokenizer(pattern, isAllowedFilter, TOKENS_BUFFER);
        return compactTokens(new Uint32Array(TOKENS_BUFFER.slice()));
    }
    function binSearch(arr, elt) {
        if (arr.length === 0) {
            return -1;
        }
        var low = 0;
        var high = arr.length - 1;
        while (low <= high) {
            var mid = (low + high) >>> 1;
            var midVal = arr[mid];
            if (midVal < elt) {
                low = mid + 1;
            }
            else if (midVal > elt) {
                high = mid - 1;
            }
            else {
                return mid;
            }
        }
        return -1;
    }
    function binLookup(arr, elt) {
        return binSearch(arr, elt) !== -1;
    }
    function updateResponseHeadersWithCSP(details, policies) {
        if (policies === undefined) {
            return {};
        }
        var responseHeaders = details.responseHeaders || [];
        var CSP_HEADER_NAME = 'content-security-policy';
        // Collect existing CSP headers from response
        responseHeaders.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            if (name.toLowerCase() === CSP_HEADER_NAME) {
                policies += "; " + value;
            }
        });
        // Remove all CSP headers from response
        responseHeaders = responseHeaders.filter(function (_a) {
            var name = _a.name;
            return name.toLowerCase() !== CSP_HEADER_NAME;
        });
        // Add updated CSP header
        responseHeaders.push({ name: CSP_HEADER_NAME, value: policies });
        return { responseHeaders: responseHeaders };
    }
    var hasUnicodeRe = /[^\u0000-\u00ff]/;
    function hasUnicode(str) {
        return hasUnicodeRe.test(str);
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var EMPTY_TOKENS = [EMPTY_UINT32_ARRAY];
    var DEFAULT_HIDDING_STYLE = 'display: none !important;';
    function hashHostnameBackward(hostname) {
        var hash = 5381;
        for (var j = hostname.length - 1; j >= 0; j -= 1) {
            hash = (hash * 33) ^ hostname.charCodeAt(j);
        }
        return hash >>> 0;
    }
    function getHashesFromLabelsBackward(hostname, end, startOfDomain) {
        var hashes = [];
        var hash = 5381;
        // Compute hash backward, label per label
        for (var i = end - 1; i >= 0; i -= 1) {
            // Process label
            if (hostname[i] === '.' && i < startOfDomain) {
                hashes.push(hash >>> 0);
            }
            // Update hash
            hash = (hash * 33) ^ hostname.charCodeAt(i);
        }
        hashes.push(hash >>> 0);
        return hashes;
    }
    function getEntityHashesFromLabelsBackward(hostname, domain) {
        var hostnameWithoutPublicSuffix = getHostnameWithoutPublicSuffix(hostname, domain);
        if (hostnameWithoutPublicSuffix !== null) {
            return getHashesFromLabelsBackward(hostnameWithoutPublicSuffix, hostnameWithoutPublicSuffix.length, hostnameWithoutPublicSuffix.length);
        }
        return [];
    }
    function getHostnameHashesFromLabelsBackward(hostname, domain) {
        return getHashesFromLabelsBackward(hostname, hostname.length, hostname.length - domain.length);
    }
    /**
     * Given a hostname and its domain, return the hostname without the public
     * suffix. We know that the domain, with one less label on the left, will be a
     * the public suffix; and from there we know which trailing portion of
     * `hostname` we should remove.
     */
    function getHostnameWithoutPublicSuffix(hostname, domain) {
        var hostnameWithoutPublicSuffix = null;
        var indexOfDot = domain.indexOf('.');
        if (indexOfDot !== -1) {
            var publicSuffix = domain.slice(indexOfDot + 1);
            hostnameWithoutPublicSuffix = hostname.slice(0, -publicSuffix.length - 1);
        }
        return hostnameWithoutPublicSuffix;
    }
    /**
     * Given a `selector` starting with either '#' or '.' check if what follows is
     * a simple CSS selector: /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/
     */
    function isSimpleSelector(selector) {
        for (var i = 1; i < selector.length; i += 1) {
            var code = selector.charCodeAt(i);
            if (!(code === 45 /* '-' */ ||
                code === 95 /* '_' */ ||
                (code >= 48 && code <= 57) /* [0-9] */ ||
                (code >= 65 && code <= 90) /* [A-Z] */ ||
                (code >= 97 && code <= 122)) /* [a-z] */) {
                if (i < selector.length - 1) {
                    // Check if what follows is a ' >' or ' ~' or ' +', in which case we
                    // also consider it a simple selector and the token this filter can be
                    // indexed with is the first selector.
                    var nextCode = selector.charCodeAt(i + 1);
                    if (code === 91 /* '[' */ ||
                        (code === 32 /* ' ' */ &&
                            (nextCode === 62 /* '>' */ ||
                                nextCode === 43 /* '+' */ ||
                                nextCode === 126 /* '~' */ ||
                                nextCode === 46 /* '.' */ ||
                                nextCode === 35)) /* '#' */) {
                        return true;
                    }
                }
                return false;
            }
        }
        return true;
    }
    /**
     * Given a `selector` starting with either 'a[' or '[', check if what follows
     * is a simple href attribute selector of the form: 'href^=' or 'href*='.
     */
    function isSimpleHrefSelector(selector, start) {
        return (selector.startsWith('href^="', start) ||
            selector.startsWith('href*="', start) ||
            selector.startsWith('href="', start));
    }
    /**
     * Validate CSS selector. There is a fast path for simple selectors (e.g.: #foo
     * or .bar) which are the most common case. For complex ones, we rely on
     * `Element.matches` (if available).
     */
    var isValidCss = (function () {
        var div = typeof document !== 'undefined'
            ? document.createElement('div')
            : {
                matches: function () {
                    /* noop */
                }
            };
        var matches = function (selector) { return div.matches(selector); };
        var validSelectorRe = /^[#.]?[\w-.]+$/;
        return function isValidCssImpl(selector) {
            if (validSelectorRe.test(selector)) {
                return true;
            }
            try {
                matches(selector);
            }
            catch (ex) {
                return false;
            }
            return true;
        };
    })();
    function computeFilterId(mask, selector, hostnames, entities, notHostnames, notEntities, style) {
        var hash = (5408 * 33) ^ mask;
        if (selector !== undefined) {
            for (var i = 0; i < selector.length; i += 1) {
                hash = (hash * 33) ^ selector.charCodeAt(i);
            }
        }
        if (hostnames !== undefined) {
            for (var i = 0; i < hostnames.length; i += 1) {
                hash = (hash * 33) ^ hostnames[i];
            }
        }
        if (entities !== undefined) {
            for (var i = 0; i < entities.length; i += 1) {
                hash = (hash * 33) ^ entities[i];
            }
        }
        if (notHostnames !== undefined) {
            for (var i = 0; i < notHostnames.length; i += 1) {
                hash = (hash * 33) ^ notHostnames[i];
            }
        }
        if (notEntities !== undefined) {
            for (var i = 0; i < notEntities.length; i += 1) {
                hash = (hash * 33) ^ notEntities[i];
            }
        }
        if (style !== undefined) {
            for (var i = 0; i < style.length; i += 1) {
                hash = (hash * 33) ^ style.charCodeAt(i);
            }
        }
        return hash >>> 0;
    }
    /***************************************************************************
     *  Cosmetic filters parsing
     * ************************************************************************ */
    var CosmeticFilter = /** @class */ (function () {
        function CosmeticFilter(_a) {
            var mask = _a.mask, selector = _a.selector, entities = _a.entities, hostnames = _a.hostnames, notEntities = _a.notEntities, notHostnames = _a.notHostnames, rawLine = _a.rawLine, style = _a.style;
            this.mask = mask;
            this.selector = selector;
            // Hostname constraints
            this.entities = entities;
            this.hostnames = hostnames;
            // Hostname exceptions
            this.notEntities = notEntities;
            this.notHostnames = notHostnames;
            this.style = style;
            this.id = undefined;
            this.rawLine = rawLine;
        }
        /**
         * Given a line that we know contains a cosmetic filter, create a CosmeticFiler
         * instance out of it. This function should be *very* efficient, as it will be
         * used to parse tens of thousands of lines.
         */
        CosmeticFilter.parse = function (line, debug) {
            if (debug === void 0) { debug = false; }
            // Mask to store attributes. Each flag (unhide, scriptInject, etc.) takes
            // only 1 bit at a specific offset defined in COSMETICS_MASK.  cf:
            // COSMETICS_MASK for the offset of each property
            var mask = 0;
            var selector;
            var hostnames;
            var notHostnames;
            var entities;
            var notEntities;
            var style;
            var sharpIndex = line.indexOf('#');
            // Start parsing the line
            var afterSharpIndex = sharpIndex + 1;
            var suffixStartIndex = afterSharpIndex + 1;
            // hostname1,hostname2#@#.selector
            //                    ^^ ^
            //                    || |
            //                    || suffixStartIndex
            //                    |afterSharpIndex
            //                    sharpIndex
            // Check if unhide
            if (line.length > afterSharpIndex && line[afterSharpIndex] === '@') {
                mask = setBit(mask, 1 /* unhide */);
                suffixStartIndex += 1;
            }
            // Parse hostnames and entitites as well as their negations.
            //
            // - ~hostname##.selector
            // - hostname##.selector
            // - entity.*##.selector
            // - ~entity.*##.selector
            //
            // Each kind will have its own Uint32Array containing hashes, sorted by
            // number of labels considered. This allows a compact representation of
            // hostnames and fast matching without any string copy.
            if (sharpIndex > 0) {
                var entitiesArray = [];
                var notEntitiesArray = [];
                var hostnamesArray = [];
                var notHostnamesArray = [];
                var parts = line.slice(0, sharpIndex).split(',');
                for (var i = 0; i < parts.length; i += 1) {
                    var hostname = parts[i];
                    if (hasUnicode(hostname)) {
                        hostname = toASCII(hostname);
                        mask = setBit(mask, 4 /* isUnicode */);
                    }
                    var negation = hostname.charCodeAt(0) === 126 /* '~' */;
                    var entity = hostname.charCodeAt(hostname.length - 1) === 42 /* '*' */ &&
                        hostname.charCodeAt(hostname.length - 2) === 46 /* '.' */;
                    var start = negation ? 1 : 0;
                    var end = entity ? hostname.length - 2 : hostname.length;
                    var hash = hashHostnameBackward(negation === true || entity === true ? hostname.slice(start, end) : hostname);
                    if (negation) {
                        if (entity) {
                            notEntitiesArray.push(hash);
                        }
                        else {
                            notHostnamesArray.push(hash);
                        }
                    }
                    else {
                        if (entity) {
                            entitiesArray.push(hash);
                        }
                        else {
                            hostnamesArray.push(hash);
                        }
                    }
                }
                if (entitiesArray.length !== 0) {
                    entities = new Uint32Array(entitiesArray).sort();
                }
                if (hostnamesArray.length !== 0) {
                    hostnames = new Uint32Array(hostnamesArray).sort();
                }
                if (notEntitiesArray.length !== 0) {
                    notEntities = new Uint32Array(notEntitiesArray).sort();
                }
                if (notHostnamesArray.length !== 0) {
                    notHostnames = new Uint32Array(notHostnamesArray).sort();
                }
            }
            // Deal with script:inject and script:contains
            if (line.length - suffixStartIndex > 7 &&
                line.charCodeAt(suffixStartIndex) === 115 /* 's' */ &&
                fastStartsWithFrom(line, 'script:', suffixStartIndex)) {
                //      script:inject(.......)
                //                    ^      ^
                //   script:contains(/......./)
                //                    ^      ^
                //    script:contains(selector[, args])
                //           ^        ^               ^^
                //           |        |          |    ||
                //           |        |          |    |selector.length
                //           |        |          |    scriptSelectorIndexEnd
                //           |        |          |scriptArguments
                //           |        scriptSelectorIndexStart
                //           scriptMethodIndex
                var scriptMethodIndex = suffixStartIndex + 7;
                var scriptSelectorIndexStart = scriptMethodIndex;
                var scriptSelectorIndexEnd = line.length - 1;
                if (fastStartsWithFrom(line, 'inject(', scriptMethodIndex)) {
                    mask = setBit(mask, 2 /* scriptInject */);
                    scriptSelectorIndexStart += 7;
                }
                selector = line.slice(scriptSelectorIndexStart, scriptSelectorIndexEnd);
            }
            else if (line.length - suffixStartIndex > 4 &&
                line.charCodeAt(suffixStartIndex) === 43 /* '+' */ &&
                fastStartsWithFrom(line, '+js(', suffixStartIndex)) {
                mask = setBit(mask, 2 /* scriptInject */);
                selector = line.slice(suffixStartIndex + 4, line.length - 1);
            }
            else {
                // Detect special syntax
                var indexOfColon = line.indexOf(':', suffixStartIndex);
                while (indexOfColon !== -1) {
                    var indexAfterColon = indexOfColon + 1;
                    if (fastStartsWithFrom(line, 'style', indexAfterColon)) {
                        // ##selector :style(...)
                        if (line[indexAfterColon + 5] === '(' && line[line.length - 1] === ')') {
                            selector = line.slice(suffixStartIndex, indexOfColon);
                            style = line.slice(indexAfterColon + 6, -1);
                        }
                        else {
                            return null;
                        }
                    }
                    else if (fastStartsWithFrom(line, '-abp-', indexAfterColon) ||
                        fastStartsWithFrom(line, 'contains', indexAfterColon) ||
                        fastStartsWithFrom(line, 'has', indexAfterColon) ||
                        fastStartsWithFrom(line, 'if', indexAfterColon) ||
                        fastStartsWithFrom(line, 'if-not', indexAfterColon) ||
                        fastStartsWithFrom(line, 'matches-css', indexAfterColon) ||
                        fastStartsWithFrom(line, 'matches-css-after', indexAfterColon) ||
                        fastStartsWithFrom(line, 'matches-css-before', indexAfterColon) ||
                        fastStartsWithFrom(line, 'not', indexAfterColon) ||
                        fastStartsWithFrom(line, 'properties', indexAfterColon) ||
                        fastStartsWithFrom(line, 'subject', indexAfterColon) ||
                        fastStartsWithFrom(line, 'xpath', indexAfterColon)) {
                        return null;
                    }
                    indexOfColon = line.indexOf(':', indexAfterColon);
                }
                // If we reach this point, filter is not extended syntax
                if (selector === undefined && suffixStartIndex < line.length) {
                    selector = line.slice(suffixStartIndex);
                }
                if (selector === undefined || !isValidCss(selector)) {
                    // Not a valid selector
                    return null;
                }
            }
            // Check if unicode appears in selector
            if (selector !== undefined) {
                if (hasUnicode(selector)) {
                    mask = setBit(mask, 4 /* isUnicode */);
                }
                var c0 = selector.charCodeAt(0);
                var c1 = selector.charCodeAt(1);
                var c2 = selector.charCodeAt(2);
                // Check if we have a specific case of simple selector (id, class or
                // href) These are the most common filters and will benefit greatly from
                // a custom dispatch mechanism.
                if (getBit(mask, 2 /* scriptInject */) === false) {
                    if (c0 === 46 /* '.' */ && isSimpleSelector(selector)) {
                        mask = setBit(mask, 8 /* isClassSelector */);
                    }
                    else if (c0 === 35 /* '#' */ && isSimpleSelector(selector)) {
                        mask = setBit(mask, 16 /* isIdSelector */);
                    }
                    else if (c0 === 97 /* a */ &&
                        c1 === 91 /* '[' */ &&
                        c2 === 104 /* 'h' */ &&
                        isSimpleHrefSelector(selector, 2)) {
                        mask = setBit(mask, 32 /* isHrefSelector */);
                    }
                    else if (c0 === 91 /* '[' */ &&
                        c1 === 104 /* 'h' */ &&
                        isSimpleHrefSelector(selector, 1)) {
                        mask = setBit(mask, 32 /* isHrefSelector */);
                    }
                }
            }
            return new CosmeticFilter({
                entities: entities,
                hostnames: hostnames,
                mask: mask,
                notEntities: notEntities,
                notHostnames: notHostnames,
                rawLine: debug === true ? line : undefined,
                selector: selector,
                style: style
            });
        };
        /**
         * Deserialize cosmetic filters. The code accessing the buffer should be
         * symetrical to the one in `serializeCosmeticFilter`.
         */
        CosmeticFilter.deserialize = function (buffer) {
            var mask = buffer.getUint8();
            var isUnicode = getBit(mask, 4 /* isUnicode */);
            var optionalParts = buffer.getUint8();
            var selector = isUnicode ? buffer.getUTF8() : buffer.getCosmeticSelector();
            // The order of these fields should be the same as when we serialize them.
            return new CosmeticFilter({
                // Mandatory fields
                mask: mask,
                selector: selector,
                // Optional fields
                entities: (optionalParts & 1) === 1 ? buffer.getUint32Array() : undefined,
                hostnames: (optionalParts & 2) === 2 ? buffer.getUint32Array() : undefined,
                notEntities: (optionalParts & 4) === 4 ? buffer.getUint32Array() : undefined,
                notHostnames: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
                rawLine: (optionalParts & 16) === 16
                    ? isUnicode
                        ? buffer.getUTF8()
                        : buffer.getASCII()
                    : undefined,
                style: (optionalParts & 32) === 32 ? buffer.getASCII() : undefined
            });
        };
        CosmeticFilter.prototype.isCosmeticFilter = function () {
            return true;
        };
        CosmeticFilter.prototype.isNetworkFilter = function () {
            return false;
        };
        /**
         * The format of a cosmetic filter is:
         *
         * | mask | selector length | selector... | hostnames length | hostnames...
         *   32     16                              16
         *
         * The header (mask) is 32 bits, then we have a total of 32 bits to store the
         * length of `selector` and `hostnames` (16 bits each).
         *
         * Improvements similar to the onces mentioned in `serializeNetworkFilters`
         * could be applied here, to get a more compact representation.
         */
        CosmeticFilter.prototype.serialize = function (buffer) {
            // Mandatory fields
            buffer.pushUint8(this.mask);
            var index = buffer.getPos();
            buffer.pushUint8(0);
            if (this.isUnicode()) {
                buffer.pushUTF8(this.selector);
            }
            else {
                buffer.pushCosmeticSelector(this.selector);
            }
            // This bit-mask indicates which optional parts of the filter were serialized.
            var optionalParts = 0;
            if (this.entities !== undefined) {
                optionalParts |= 1;
                buffer.pushUint32Array(this.entities);
            }
            if (this.hostnames !== undefined) {
                optionalParts |= 2;
                buffer.pushUint32Array(this.hostnames);
            }
            if (this.notEntities !== undefined) {
                optionalParts |= 4;
                buffer.pushUint32Array(this.notEntities);
            }
            if (this.notHostnames !== undefined) {
                optionalParts |= 8;
                buffer.pushUint32Array(this.notHostnames);
            }
            if (this.rawLine !== undefined) {
                optionalParts |= 16;
                if (this.isUnicode()) {
                    buffer.pushUTF8(this.rawLine);
                }
                else {
                    buffer.pushASCII(this.rawLine);
                }
            }
            if (this.style !== undefined) {
                optionalParts |= 32;
                buffer.pushASCII(this.style);
            }
            buffer.setByte(index, optionalParts);
        };
        /**
         * Return an estimation of the size (in bytes) needed to persist this filter
         * in a DataView. This does not need to be 100% accurate but should be an
         * upper-bound. It should also be as fast as possible.
         */
        CosmeticFilter.prototype.getSerializedSize = function () {
            var estimate = 1 + 1; // mask (1 byte) + optional parts (1 byte)
            if (this.isUnicode()) {
                estimate += StaticDataView.sizeOfUTF8(this.selector);
            }
            else {
                estimate += StaticDataView.sizeOfASCII(this.selector);
            }
            if (this.entities !== undefined) {
                estimate += StaticDataView.sizeOfUint32Array(this.entities);
            }
            if (this.hostnames !== undefined) {
                estimate += StaticDataView.sizeOfUint32Array(this.hostnames);
            }
            if (this.notHostnames !== undefined) {
                estimate += StaticDataView.sizeOfUint32Array(this.notHostnames);
            }
            if (this.notEntities !== undefined) {
                estimate += StaticDataView.sizeOfUint32Array(this.notEntities);
            }
            if (this.rawLine !== undefined) {
                if (this.isUnicode()) {
                    estimate += StaticDataView.sizeOfUTF8(this.rawLine);
                }
                else {
                    estimate += StaticDataView.sizeOfASCII(this.rawLine);
                }
            }
            if (this.style !== undefined) {
                estimate += StaticDataView.sizeOfASCII(this.style);
            }
            return estimate;
        };
        /**
         * Create a more human-readable version of this filter. It is mainly used for
         * debugging purpose, as it will expand the values stored in the bit mask.
         */
        CosmeticFilter.prototype.toString = function () {
            if (this.rawLine !== undefined) {
                return this.rawLine;
            }
            var filter = '';
            if (this.hostnames !== undefined ||
                this.entities !== undefined ||
                this.notHostnames !== undefined ||
                this.notEntities !== undefined) {
                filter += '<hostnames>';
            }
            if (this.isUnhide()) {
                filter += '#@#';
            }
            else {
                filter += '##';
            }
            if (this.isScriptInject()) {
                filter += '+js(';
                filter += this.selector;
                filter += ')';
            }
            else {
                filter += this.selector;
            }
            return filter;
        };
        CosmeticFilter.prototype.match = function (hostname, domain) {
            // Not constraint on hostname, match is true
            if (this.hasHostnameConstraint() === false) {
                return true;
            }
            // No `hostname` available but this filter has some constraints on hostname.
            if (!hostname && this.hasHostnameConstraint()) {
                return false;
            }
            var entitiesHashes = this.entities !== undefined || this.notEntities !== undefined
                ? getEntityHashesFromLabelsBackward(hostname, domain)
                : [];
            var hostnameHashes = this.hostnames !== undefined || this.notHostnames !== undefined
                ? getHostnameHashesFromLabelsBackward(hostname, domain)
                : [];
            // Check if `hostname` is blacklisted
            if (this.notHostnames !== undefined) {
                for (var i = 0; i < hostnameHashes.length; i += 1) {
                    if (binLookup(this.notHostnames, hostnameHashes[i])) {
                        return false;
                    }
                }
            }
            // Check if `hostname` is blacklisted by *entity*
            if (this.notEntities !== undefined) {
                for (var i = 0; i < entitiesHashes.length; i += 1) {
                    if (binLookup(this.notEntities, entitiesHashes[i])) {
                        return false;
                    }
                }
            }
            // Check if `hostname` is allowed
            if (this.hostnames !== undefined || this.entities !== undefined) {
                if (this.hostnames !== undefined) {
                    for (var i = 0; i < hostnameHashes.length; i += 1) {
                        if (binLookup(this.hostnames, hostnameHashes[i])) {
                            return true;
                        }
                    }
                }
                if (this.entities !== undefined) {
                    for (var i = 0; i < entitiesHashes.length; i += 1) {
                        if (binLookup(this.entities, entitiesHashes[i])) {
                            return true;
                        }
                    }
                }
                return false;
            }
            return true;
        };
        /**
         * Get tokens for this filter. It can be indexed multiple times if multiple
         * hostnames are specified (e.g.: host1,host2##.selector).
         */
        CosmeticFilter.prototype.getTokens = function () {
            var tokens = [];
            // Note, we do not need to use negated domains or entities as tokens here
            // since they will by definition not match on their own, unless accompanied
            // by a domain or entity. Instead, they are handled in
            // `CosmeticFilterBucket.getCosmeticsFilters`.
            if (this.hostnames !== undefined) {
                for (var i = 0; i < this.hostnames.length; i += 1) {
                    tokens.push(new Uint32Array([this.hostnames[i]]));
                }
            }
            if (this.entities !== undefined) {
                for (var i = 0; i < this.entities.length; i += 1) {
                    tokens.push(new Uint32Array([this.entities[i]]));
                }
            }
            // Here we only take selector into account if the filter is not unHide.
            // TODO - add more detailed comment
            if (tokens.length === 0 && this.isUnhide() === false) {
                if (this.isIdSelector() || this.isClassSelector()) {
                    var endOfSelector = this.selector.length;
                    // Check if there is a space or '['
                    var indexOfSpace = this.selector.indexOf(' ');
                    if (indexOfSpace !== -1) {
                        endOfSelector = indexOfSpace;
                    }
                    var indexOfBracket = this.selector.indexOf('[');
                    if (indexOfBracket !== -1 && indexOfBracket < endOfSelector) {
                        endOfSelector = indexOfBracket;
                    }
                    tokens.push(new Uint32Array([fastHash(this.selector.slice(1, endOfSelector))]));
                }
                else if (this.isHrefSelector()) {
                    var selector = this.getSelector();
                    // Locate 'href' in selector
                    var hrefIndex = selector.indexOf('href');
                    if (hrefIndex === -1) {
                        return EMPTY_TOKENS;
                    }
                    hrefIndex += 4;
                    // Tokenize optimally depending on the kind of selector: 'href=',
                    // 'href*=', 'href^='.
                    var skipFirstToken = false;
                    var skipLastToken = true;
                    if (selector.charCodeAt(hrefIndex) === 42 /* '*' */) {
                        // skip: '*'
                        skipFirstToken = true;
                        hrefIndex += 1;
                    }
                    else if (selector.charCodeAt(hrefIndex) === 94 /* '^' */) {
                        // skip: '^'
                        hrefIndex += 1;
                    }
                    else {
                        skipLastToken = false;
                    }
                    hrefIndex += 2; // skip:  '="'
                    // Locate end of href
                    var hrefEnd = selector.indexOf('"', hrefIndex);
                    if (hrefEnd === -1) {
                        // That cannot happen unless the filter is not well-formed. In this
                        // case, we just return no tokens, which will result in this filter
                        // ending up in the "wildcard" bucket of the index.
                        return EMPTY_TOKENS;
                    }
                    tokens.push(new Uint32Array(tokenizeFilter(this.selector.slice(hrefIndex, hrefEnd), skipFirstToken, skipLastToken)));
                }
            }
            if (tokens.length === 0) {
                return EMPTY_TOKENS;
            }
            return tokens;
        };
        CosmeticFilter.prototype.getScript = function (js) {
            var scriptName = this.getSelector();
            var scriptArguments = [];
            if (scriptName.indexOf(',') !== -1) {
                var parts = scriptName.split(',');
                scriptName = parts[0];
                scriptArguments = parts.slice(1).map(function (s) { return s.trim(); });
            }
            var script = js.get(scriptName);
            if (script !== undefined) {
                for (var i = 0; i < scriptArguments.length; i += 1) {
                    script = script.replace("{{" + (i + 1) + "}}", scriptArguments[i]);
                }
                return script;
            } // TODO - else throw an exception?
            return undefined;
        };
        CosmeticFilter.prototype.hasHostnameConstraint = function () {
            return (this.hostnames !== undefined ||
                this.entities !== undefined ||
                this.notEntities !== undefined ||
                this.notHostnames !== undefined);
        };
        CosmeticFilter.prototype.getId = function () {
            if (this.id === undefined) {
                this.id = computeFilterId(this.mask, this.selector, this.hostnames, this.entities, this.notHostnames, this.notEntities, this.style);
            }
            return this.id;
        };
        CosmeticFilter.prototype.hasCustomStyle = function () {
            return this.style !== undefined;
        };
        CosmeticFilter.prototype.getStyle = function () {
            return this.style || DEFAULT_HIDDING_STYLE;
        };
        CosmeticFilter.prototype.getSelector = function () {
            return this.selector;
        };
        CosmeticFilter.prototype.isUnhide = function () {
            return getBit(this.mask, 1 /* unhide */);
        };
        CosmeticFilter.prototype.isScriptInject = function () {
            return getBit(this.mask, 2 /* scriptInject */);
        };
        CosmeticFilter.prototype.isCSS = function () {
            return this.isScriptInject() === false;
        };
        CosmeticFilter.prototype.isIdSelector = function () {
            return getBit(this.mask, 16 /* isIdSelector */);
        };
        CosmeticFilter.prototype.isClassSelector = function () {
            return getBit(this.mask, 8 /* isClassSelector */);
        };
        CosmeticFilter.prototype.isHrefSelector = function () {
            return getBit(this.mask, 32 /* isHrefSelector */);
        };
        CosmeticFilter.prototype.isUnicode = function () {
            return getBit(this.mask, 4 /* isUnicode */);
        };
        // A generic hide cosmetic filter is one that:
        //
        // * Do not have a domain specified. "Hide this element on all domains"
        // * Have only domain exceptions specified. "Hide this element on all domains except example.com"
        //
        // For example: ~example.com##.ad  is a generic filter as well!
        CosmeticFilter.prototype.isGenericHide = function () {
            return this.hostnames === undefined && this.entities === undefined;
        };
        return CosmeticFilter;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var TOKENS_BUFFER$1 = new TokensBuffer(200);
    var HTTP_HASH = fastHash('http');
    var HTTPS_HASH = fastHash('https');
    function isAllowedHostname(ch) {
        return (isDigit(ch) || isAlpha(ch) || ch === 95 /* '_' */ || ch === 45 /* '-' */ || ch === 46 /* '.' */);
    }
    /**
     * Mask used when a network filter can be applied on any content type.
     */
    var FROM_ANY = 1 /* fromDocument */ |
        2 /* fromFont */ |
        16 /* fromImage */ |
        32 /* fromMedia */ |
        64 /* fromObject */ |
        128 /* fromOther */ |
        256 /* fromPing */ |
        512 /* fromScript */ |
        1024 /* fromStylesheet */ |
        2048 /* fromSubdocument */ |
        4096 /* fromWebsocket */ |
        8192 /* fromXmlHttpRequest */;
    /**
     * Map content type value to mask the corresponding mask.
     * ref: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
     */
    var REQUEST_TYPE_TO_MASK = {
        beacon: 256 /* fromPing */,
        document: 1 /* fromDocument */,
        fetch: 8192 /* fromXmlHttpRequest */,
        font: 2 /* fromFont */,
        image: 16 /* fromImage */,
        imageset: 16 /* fromImage */,
        mainFrame: 1 /* fromDocument */,
        main_frame: 1 /* fromDocument */,
        media: 32 /* fromMedia */,
        object: 64 /* fromObject */,
        object_subrequest: 64 /* fromObject */,
        ping: 256 /* fromPing */,
        script: 512 /* fromScript */,
        stylesheet: 1024 /* fromStylesheet */,
        subFrame: 2048 /* fromSubdocument */,
        sub_frame: 2048 /* fromSubdocument */,
        websocket: 4096 /* fromWebsocket */,
        xhr: 8192 /* fromXmlHttpRequest */,
        xmlhttprequest: 8192 /* fromXmlHttpRequest */,
        // Other
        csp_report: 128 /* fromOther */,
        eventsource: 128 /* fromOther */,
        manifest: 128 /* fromOther */,
        other: 128 /* fromOther */,
        speculative: 128 /* fromOther */,
        texttrack: 128 /* fromOther */,
        web_manifest: 128 /* fromOther */,
        xbl: 128 /* fromOther */,
        xml_dtd: 128 /* fromOther */,
        xslt: 128 /* fromOther */
    };
    function computeFilterId$1(csp, mask, filter, hostname, optDomains, optNotDomains, redirect) {
        var hash = (5408 * 33) ^ mask;
        if (csp !== undefined) {
            for (var i = 0; i < csp.length; i += 1) {
                hash = (hash * 33) ^ csp.charCodeAt(i);
            }
        }
        if (optDomains !== undefined) {
            for (var i = 0; i < optDomains.length; i += 1) {
                hash = (hash * 33) ^ optDomains[i];
            }
        }
        if (optNotDomains !== undefined) {
            for (var i = 0; i < optNotDomains.length; i += 1) {
                hash = (hash * 33) ^ optNotDomains[i];
            }
        }
        if (filter !== undefined) {
            for (var i = 0; i < filter.length; i += 1) {
                hash = (hash * 33) ^ filter.charCodeAt(i);
            }
        }
        if (hostname !== undefined) {
            for (var i = 0; i < hostname.length; i += 1) {
                hash = (hash * 33) ^ hostname.charCodeAt(i);
            }
        }
        if (redirect !== undefined) {
            for (var i = 0; i < redirect.length; i += 1) {
                hash = (hash * 33) ^ redirect.charCodeAt(i);
            }
        }
        return hash >>> 0;
    }
    /**
     * Compiles a filter pattern to a regex. This is only performed *lazily* for
     * filters containing at least a * or ^ symbol. Because Regexes are expansive,
     * we try to convert some patterns to plain filters.
     */
    function compileRegex(filter, isLeftAnchor, isRightAnchor, isFullRegex) {
        if (isFullRegex === true) {
            return new RegExp(filter.slice(1, filter.length - 1), 'i');
        }
        // Escape special regex characters: |.$+?{}()[]\
        filter = filter.replace(/([|.$+?{}()[\]\\])/g, '\\$1');
        // * can match anything
        filter = filter.replace(/\*/g, '.*');
        // ^ can match any separator or the end of the pattern
        filter = filter.replace(/\^/g, '(?:[^\\w\\d_.%-]|$)');
        // Should match end of url
        if (isRightAnchor) {
            filter = filter + "$";
        }
        if (isLeftAnchor) {
            filter = "^" + filter;
        }
        return new RegExp(filter, 'i');
    }
    var EMPTY_ARRAY = new Uint32Array([]);
    var MATCH_ALL = new RegExp('');
    var NetworkFilter = /** @class */ (function () {
        function NetworkFilter(_a) {
            var csp = _a.csp, filter = _a.filter, hostname = _a.hostname, mask = _a.mask, optDomains = _a.optDomains, optNotDomains = _a.optNotDomains, rawLine = _a.rawLine, redirect = _a.redirect, regex = _a.regex;
            this.csp = csp;
            this.filter = filter;
            this.hostname = hostname;
            this.mask = mask;
            this.optDomains = optDomains;
            this.optNotDomains = optNotDomains;
            this.redirect = redirect;
            this.rawLine = rawLine;
            this.id = undefined;
            this.fuzzySignature = undefined;
            this.regex = regex;
        }
        NetworkFilter.parse = function (line, debug) {
            if (debug === void 0) { debug = false; }
            // Represent options as a bitmask
            var mask = 16777216 /* thirdParty */ |
                16384 /* firstParty */ |
                8 /* fromHttps */ |
                4 /* fromHttp */;
            // Temporary masks for positive (e.g.: $script) and negative (e.g.: $~script)
            // content type options.
            var cptMaskPositive = 0;
            var cptMaskNegative = FROM_ANY;
            var hostname;
            var optDomains;
            var optNotDomains;
            var redirect;
            var csp;
            // Start parsing
            var filterIndexStart = 0;
            var filterIndexEnd = line.length;
            // @@filter == Exception
            if (line.charCodeAt(0) === 64 /* '@' */ && line.charCodeAt(1) === 64 /* '@' */) {
                filterIndexStart += 2;
                mask = setBit(mask, 262144 /* isException */);
            }
            // filter$options == Options
            // ^     ^
            // |     |
            // |     optionsIndex
            // filterIndexStart
            var optionsIndex = line.lastIndexOf('$');
            if (optionsIndex !== -1 && line.charCodeAt(optionsIndex + 1) !== 47 /* '/' */) {
                // Parse options and set flags
                filterIndexEnd = optionsIndex;
                // --------------------------------------------------------------------- //
                // parseOptions
                // --------------------------------------------------------------------- //
                var options = line.slice(optionsIndex + 1).split(',');
                for (var i = 0; i < options.length; i += 1) {
                    var rawOption = options[i];
                    var negation = rawOption.charCodeAt(0) === 126 /* '~' */;
                    var option = negation === true ? rawOption.slice(1) : rawOption;
                    // Check for options: option=value1|value2
                    var optionValue = '';
                    var indexOfEqual = option.indexOf('=');
                    if (indexOfEqual !== -1) {
                        optionValue = option.slice(indexOfEqual + 1);
                        option = option.slice(0, indexOfEqual);
                    }
                    switch (option) {
                        case 'domain': {
                            // domain list starting or ending with '|' is invalid
                            if (optionValue.charCodeAt(0) === 124 /* '|' */ ||
                                optionValue.charCodeAt(optionValue.length - 1) === 124 /* '|' */) {
                                return null;
                            }
                            var optionValues = optionValue.split('|');
                            var optDomainsArray = [];
                            var optNotDomainsArray = [];
                            for (var j = 0; j < optionValues.length; j += 1) {
                                var value = optionValues[j];
                                if (value) {
                                    if (value.charCodeAt(0) === 126 /* '~' */) {
                                        optNotDomainsArray.push(fastHash(value.slice(1)));
                                    }
                                    else {
                                        optDomainsArray.push(fastHash(value));
                                    }
                                }
                            }
                            if (optDomainsArray.length > 0) {
                                optDomains = new Uint32Array(optDomainsArray).sort();
                            }
                            if (optNotDomainsArray.length > 0) {
                                optNotDomains = new Uint32Array(optNotDomainsArray).sort();
                            }
                            break;
                        }
                        case 'badfilter':
                            mask = setBit(mask, 65536 /* isBadFilter */);
                            break;
                        case 'important':
                            // Note: `negation` should always be `false` here.
                            if (negation) {
                                return null;
                            }
                            mask = setBit(mask, 2097152 /* isImportant */);
                            break;
                        case 'match-case':
                            // Note: `negation` should always be `false` here.
                            if (negation) {
                                return null;
                            }
                            // We currently consider all filters to be case-insensitive.
                            break;
                        case '3p':
                        case 'third-party':
                            if (negation) {
                                // ~third-party means we should clear the flag
                                mask = clearBit(mask, 16777216 /* thirdParty */);
                            }
                            else {
                                // third-party means ~first-party
                                mask = clearBit(mask, 16384 /* firstParty */);
                            }
                            break;
                        case '1p':
                        case 'first-party':
                            if (negation) {
                                // ~first-party means we should clear the flag
                                mask = clearBit(mask, 16384 /* firstParty */);
                            }
                            else {
                                // first-party means ~third-party
                                mask = clearBit(mask, 16777216 /* thirdParty */);
                            }
                            break;
                        case 'fuzzy':
                            mask = setBit(mask, 32768 /* fuzzyMatch */);
                            break;
                        case 'collapse':
                            break;
                        case 'redirect':
                            // Negation of redirection doesn't make sense
                            if (negation) {
                                return null;
                            }
                            // Ignore this filter if no redirection resource is specified
                            if (optionValue.length === 0) {
                                return null;
                            }
                            redirect = optionValue;
                            break;
                        case 'csp':
                            mask = setBit(mask, 131072 /* isCSP */);
                            if (optionValue.length > 0) {
                                csp = optionValue;
                            }
                            break;
                        case 'elemhide':
                        case 'generichide':
                            mask = setBit(mask, 524288 /* isGenericHide */);
                            break;
                        default: {
                            // Handle content type options separatly
                            var optionMask = 0;
                            switch (option) {
                                case 'image':
                                    optionMask = 16 /* fromImage */;
                                    break;
                                case 'media':
                                    optionMask = 32 /* fromMedia */;
                                    break;
                                case 'object':
                                case 'object-subrequest':
                                    optionMask = 64 /* fromObject */;
                                    break;
                                case 'other':
                                    optionMask = 128 /* fromOther */;
                                    break;
                                case 'ping':
                                case 'beacon':
                                    optionMask = 256 /* fromPing */;
                                    break;
                                case 'script':
                                    optionMask = 512 /* fromScript */;
                                    break;
                                case 'css':
                                case 'stylesheet':
                                    optionMask = 1024 /* fromStylesheet */;
                                    break;
                                case 'frame':
                                case 'subdocument':
                                    optionMask = 2048 /* fromSubdocument */;
                                    break;
                                case 'xhr':
                                case 'xmlhttprequest':
                                    optionMask = 8192 /* fromXmlHttpRequest */;
                                    break;
                                case 'websocket':
                                    optionMask = 4096 /* fromWebsocket */;
                                    break;
                                case 'font':
                                    optionMask = 2 /* fromFont */;
                                    break;
                                case 'doc':
                                case 'document':
                                    optionMask = 1 /* fromDocument */;
                                    break;
                                default:
                                    // Disable this filter if we don't support all the options
                                    return null;
                            }
                            // We got a valid cpt option, update mask
                            if (negation) {
                                cptMaskNegative = clearBit(cptMaskNegative, optionMask);
                            }
                            else {
                                cptMaskPositive = setBit(cptMaskPositive, optionMask);
                            }
                            break;
                        }
                    }
                }
                // End of option parsing
                // --------------------------------------------------------------------- //
            }
            if (cptMaskPositive === 0) {
                mask |= cptMaskNegative;
            }
            else if (cptMaskNegative === FROM_ANY) {
                mask |= cptMaskPositive;
            }
            else {
                mask |= cptMaskPositive & cptMaskNegative;
            }
            // Identify kind of pattern
            var filter;
            // Detect Regexps (i.e.: /pattern/)
            if (filterIndexEnd - filterIndexStart >= 2 &&
                line.charCodeAt(filterIndexStart) === 47 /* '/' */ &&
                line.charCodeAt(filterIndexEnd - 1) === 47 /* '/' */) {
                // Some extra ideas which could be applied to RegExp filters:
                // * convert rules without any special RegExp syntax to plain patterns
                // * remove extra `isFullRegex` flag since `isRegex` might be enough
                // * apply some optimizations on the fly: /^https?:\\/\\/rest => isHttp + isHttps + rest
                filter = line.slice(filterIndexStart, filterIndexEnd);
                // Validate RegExp to make sure this rule is fine
                try {
                    compileRegex(filter, false /* isLeftAnchor */, false /* isRightAnchor */, true /* isFullRegex */);
                }
                catch (ex) {
                    return null; // invalid RegExp
                }
                mask = setBit(mask, 33554432 /* isFullRegex */);
            }
            else {
                // Deal with hostname pattern
                if (filterIndexEnd > 0 && line.charCodeAt(filterIndexEnd - 1) === 124 /* '|' */) {
                    mask = setBit(mask, 8388608 /* isRightAnchor */);
                    filterIndexEnd -= 1;
                }
                if (filterIndexStart < filterIndexEnd &&
                    line.charCodeAt(filterIndexStart) === 124 /* '|' */) {
                    if (filterIndexStart < filterIndexEnd - 1 &&
                        line.charCodeAt(filterIndexStart + 1) === 124 /* '|' */) {
                        mask = setBit(mask, 1048576 /* isHostnameAnchor */);
                        filterIndexStart += 2;
                    }
                    else {
                        mask = setBit(mask, 4194304 /* isLeftAnchor */);
                        filterIndexStart += 1;
                    }
                }
                // const isRegex = checkIsRegex(line, filterIndexStart, filterIndexEnd);
                // mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isRegex, isRegex);
                if (getBit(mask, 1048576 /* isHostnameAnchor */)) {
                    // Split at the first character which is not allowed in a hostname
                    var firstSeparator = filterIndexStart;
                    while (firstSeparator < filterIndexEnd &&
                        isAllowedHostname(line.charCodeAt(firstSeparator)) === true) {
                        firstSeparator += 1;
                    }
                    // No separator found so hostname has full length
                    if (firstSeparator === filterIndexEnd) {
                        hostname = line.slice(filterIndexStart, filterIndexEnd);
                        filterIndexStart = filterIndexEnd;
                        // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
                    }
                    else {
                        // Found a separator
                        hostname = line.slice(filterIndexStart, firstSeparator);
                        filterIndexStart = firstSeparator;
                        var separatorCode = line.charCodeAt(firstSeparator);
                        if (separatorCode === 94 /* '^' */) {
                            // If the only symbol remaining for the selector is '^' then ignore it
                            // but set the filter as right anchored since there should not be any
                            // other label on the right
                            if (filterIndexEnd - filterIndexStart === 1) {
                                filterIndexStart = filterIndexEnd;
                                mask = setBit(mask, 8388608 /* isRightAnchor */);
                            }
                            else {
                                mask = setBit(mask, 67108864 /* isRegex */);
                                mask = setBit(mask, 4194304 /* isLeftAnchor */);
                            }
                        }
                        else if (separatorCode === 42 /* '*' */) {
                            mask = setBit(mask, 67108864 /* isRegex */);
                            // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
                        }
                        else {
                            mask = setBit(mask, 4194304 /* isLeftAnchor */);
                        }
                    }
                }
                // Remove trailing '*'
                if (filterIndexEnd - filterIndexStart > 0 &&
                    line.charCodeAt(filterIndexEnd - 1) === 42 /* '*' */) {
                    filterIndexEnd -= 1;
                }
                // Remove leading '*' if the filter is not hostname anchored.
                if (getBit(mask, 1048576 /* isHostnameAnchor */) === false &&
                    filterIndexEnd - filterIndexStart > 0 &&
                    line.charCodeAt(filterIndexStart) === 42 /* '*' */) {
                    mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                    filterIndexStart += 1;
                }
                // Transform filters on protocol (http, https, ws)
                if (getBit(mask, 4194304 /* isLeftAnchor */)) {
                    if (filterIndexEnd - filterIndexStart === 5 &&
                        fastStartsWithFrom(line, 'ws://', filterIndexStart)) {
                        mask = setBit(mask, 4096 /* fromWebsocket */);
                        mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                        filterIndexStart = filterIndexEnd;
                    }
                    else if (filterIndexEnd - filterIndexStart === 7 &&
                        fastStartsWithFrom(line, 'http://', filterIndexStart)) {
                        mask = setBit(mask, 4 /* fromHttp */);
                        mask = clearBit(mask, 8 /* fromHttps */);
                        mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                        filterIndexStart = filterIndexEnd;
                    }
                    else if (filterIndexEnd - filterIndexStart === 8 &&
                        fastStartsWithFrom(line, 'https://', filterIndexStart)) {
                        mask = setBit(mask, 8 /* fromHttps */);
                        mask = clearBit(mask, 4 /* fromHttp */);
                        mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                        filterIndexStart = filterIndexEnd;
                    }
                    else if (filterIndexEnd - filterIndexStart === 8 &&
                        fastStartsWithFrom(line, 'http*://', filterIndexStart)) {
                        mask = setBit(mask, 8 /* fromHttps */);
                        mask = setBit(mask, 4 /* fromHttp */);
                        mask = clearBit(mask, 4194304 /* isLeftAnchor */);
                        filterIndexStart = filterIndexEnd;
                    }
                }
                if (filterIndexEnd - filterIndexStart > 0) {
                    filter = line.slice(filterIndexStart, filterIndexEnd).toLowerCase();
                    mask = setNetworkMask(mask, 134217728 /* isUnicode */, hasUnicode(filter));
                    if (getBit(mask, 67108864 /* isRegex */) === false) {
                        mask = setNetworkMask(mask, 67108864 /* isRegex */, checkIsRegex(filter, 0, filter.length));
                    }
                }
                // TODO
                // - ignore hostname anchor is not hostname provided
                if (hostname !== undefined) {
                    if (getBit(mask, 1048576 /* isHostnameAnchor */) &&
                        fastStartsWith(hostname, 'www.')) {
                        hostname = hostname.slice(4);
                    }
                    hostname = hostname.toLowerCase();
                    if (hasUnicode(hostname)) {
                        mask = setNetworkMask(mask, 134217728 /* isUnicode */, true);
                        hostname = toASCII(hostname);
                    }
                }
            }
            return new NetworkFilter({
                csp: csp,
                filter: filter,
                hostname: hostname,
                mask: mask,
                optDomains: optDomains,
                optNotDomains: optNotDomains,
                rawLine: debug === true ? line : undefined,
                redirect: redirect,
                regex: undefined
            });
        };
        /**
         * Deserialize network filters. The code accessing the buffer should be
         * symetrical to the one in `serializeNetworkFilter`.
         */
        NetworkFilter.deserialize = function (buffer) {
            var mask = buffer.getUint32();
            var optionalParts = buffer.getUint8();
            var isUnicode = getBit(mask, 134217728 /* isUnicode */);
            // The order of these statements is important. Since `buffer.getX()` will
            // internally increment the position of next byte to read, they need to be
            // retrieved in the exact same order they were serialized (check
            // `serializeNetworkFilter`).
            return new NetworkFilter({
                // Mandatory field
                mask: mask,
                // Optional parts
                csp: (optionalParts & 1) === 1 ? buffer.getNetworkCSP() : undefined,
                filter: (optionalParts & 2) === 2
                    ? isUnicode
                        ? buffer.getUTF8()
                        : buffer.getNetworkFilter()
                    : undefined,
                hostname: (optionalParts & 4) === 4 ? buffer.getNetworkHostname() : undefined,
                optDomains: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
                optNotDomains: (optionalParts & 16) === 16 ? buffer.getUint32Array() : undefined,
                rawLine: (optionalParts & 32) === 32
                    ? isUnicode
                        ? buffer.getUTF8()
                        : buffer.getASCII()
                    : undefined,
                redirect: (optionalParts & 64) === 64 ? buffer.getNetworkRedirect() : undefined,
                regex: undefined
            });
        };
        NetworkFilter.prototype.isCosmeticFilter = function () {
            return false;
        };
        NetworkFilter.prototype.isNetworkFilter = function () {
            return true;
        };
        NetworkFilter.prototype.match = function (request) {
            return checkOptions(this, request) && checkPattern(this, request);
        };
        /**
         * To allow for a more compact representation of network filters, the
         * representation is composed of a mandatory header, and some optional
         *
         * Header:
         * =======
         *
         *  | opt | mask
         *     8     32
         *
         * For an empty filter having no pattern, hostname, the minimum size is: 42 bits.
         *
         * Then for each optional part (filter, hostname optDomains, optNotDomains,
         * redirect), it takes 16 bits for the length of the string + the length of the
         * string in bytes.
         *
         * The optional parts are written in order of there number of occurrence in the
         * filter list used by the adblocker. The most common being `hostname`, then
         * `filter`, `optDomains`, `optNotDomains`, `redirect`.
         *
         * Example:
         * ========
         *
         * @@||cliqz.com would result in a serialized version:
         *
         * | 1 | mask | 9 | c | l | i | q | z | . | c | o | m  (16 bytes)
         *
         * In this case, the serialized version is actually bigger than the original
         * filter, but faster to deserialize. In the future, we could optimize the
         * representation to compact small filters better.
         *
         * Ideas:
         *  * variable length encoding for the mask (if not option, take max 1 byte).
         *  * first byte could contain the mask as well if small enough.
         *  * when packing ascii string, store several of them in each byte.
         */
        NetworkFilter.prototype.serialize = function (buffer) {
            buffer.pushUint32(this.mask);
            var index = buffer.getPos();
            buffer.pushUint8(0);
            // This bit-mask indicates which optional parts of the filter were serialized.
            var optionalParts = 0;
            if (this.csp !== undefined) {
                optionalParts |= 1;
                buffer.pushNetworkCSP(this.csp);
            }
            if (this.filter !== undefined) {
                optionalParts |= 2;
                if (this.isUnicode()) {
                    buffer.pushUTF8(this.filter);
                }
                else {
                    buffer.pushNetworkFilter(this.filter);
                }
            }
            if (this.hostname !== undefined) {
                optionalParts |= 4;
                buffer.pushNetworkHostname(this.hostname);
            }
            if (this.optDomains !== undefined) {
                optionalParts |= 8;
                buffer.pushUint32Array(this.optDomains);
            }
            if (this.optNotDomains !== undefined) {
                optionalParts |= 16;
                buffer.pushUint32Array(this.optNotDomains);
            }
            if (this.rawLine !== undefined) {
                optionalParts |= 32;
                if (this.isUnicode()) {
                    buffer.pushUTF8(this.rawLine);
                }
                else {
                    buffer.pushASCII(this.rawLine);
                }
            }
            if (this.redirect !== undefined) {
                optionalParts |= 64;
                buffer.pushNetworkRedirect(this.redirect);
            }
            buffer.setByte(index, optionalParts);
        };
        NetworkFilter.prototype.getSerializedSize = function () {
            var estimate = 4 + 1; // mask = 4 bytes // optional parts = 1 byte
            if (this.csp !== undefined) {
                estimate += StaticDataView.sizeOfASCII(this.csp);
            }
            if (this.filter !== undefined) {
                if (this.isUnicode()) {
                    estimate += StaticDataView.sizeOfUTF8(this.filter);
                }
                else {
                    estimate += StaticDataView.sizeOfASCII(this.filter);
                }
            }
            if (this.hostname !== undefined) {
                estimate += StaticDataView.sizeOfASCII(this.hostname);
            }
            if (this.optDomains !== undefined) {
                estimate += StaticDataView.sizeOfUint32Array(this.optDomains);
            }
            if (this.optNotDomains !== undefined) {
                estimate += StaticDataView.sizeOfUint32Array(this.optNotDomains);
            }
            if (this.rawLine !== undefined) {
                if (this.isUnicode()) {
                    estimate += StaticDataView.sizeOfUTF8(this.rawLine);
                }
                else {
                    estimate += StaticDataView.sizeOfASCII(this.rawLine);
                }
            }
            if (this.redirect !== undefined) {
                estimate += StaticDataView.sizeOfASCII(this.redirect);
            }
            return estimate;
        };
        /**
         * Tries to recreate the original representation of the filter (adblock
         * syntax) from the internal representation. If `rawLine` is set (when filters
         * are parsed in `debug` mode for example), then it is returned directly.
         * Otherwise, we try to stick as closely as possible to the original form;
         * there are things which cannot be recovered though, like domains options
         * of which only hashes are stored.
         */
        NetworkFilter.prototype.toString = function () {
            if (this.rawLine !== undefined) {
                return this.rawLine;
            }
            var filter = '';
            if (this.isException()) {
                filter += '@@';
            }
            if (this.isHostnameAnchor()) {
                filter += '||';
            }
            if (this.isLeftAnchor()) {
                filter += '|';
            }
            if (this.hasHostname()) {
                filter += this.getHostname();
                filter += '^';
            }
            if (!this.isRegex()) {
                filter += this.getFilter();
            }
            else {
                // Visualize the compiled regex
                filter += this.getRegex().source;
            }
            // Options
            var options = [];
            if (!this.fromAny()) {
                var numberOfCptOptions = bitCount(this.getCptMask());
                var numberOfNegatedOptions = bitCount(FROM_ANY) - numberOfCptOptions;
                if (numberOfNegatedOptions < numberOfCptOptions) {
                    if (!this.fromImage()) {
                        options.push('~image');
                    }
                    if (!this.fromMedia()) {
                        options.push('~media');
                    }
                    if (!this.fromObject()) {
                        options.push('~object');
                    }
                    if (!this.fromOther()) {
                        options.push('~other');
                    }
                    if (!this.fromPing()) {
                        options.push('~ping');
                    }
                    if (!this.fromScript()) {
                        options.push('~script');
                    }
                    if (!this.fromStylesheet()) {
                        options.push('~stylesheet');
                    }
                    if (!this.fromSubdocument()) {
                        options.push('~subdocument');
                    }
                    if (!this.fromWebsocket()) {
                        options.push('~websocket');
                    }
                    if (!this.fromXmlHttpRequest()) {
                        options.push('~xmlhttprequest');
                    }
                    if (!this.fromFont()) {
                        options.push('~font');
                    }
                }
                else {
                    if (this.fromImage()) {
                        options.push('image');
                    }
                    if (this.fromMedia()) {
                        options.push('media');
                    }
                    if (this.fromObject()) {
                        options.push('object');
                    }
                    if (this.fromOther()) {
                        options.push('other');
                    }
                    if (this.fromPing()) {
                        options.push('ping');
                    }
                    if (this.fromScript()) {
                        options.push('script');
                    }
                    if (this.fromStylesheet()) {
                        options.push('stylesheet');
                    }
                    if (this.fromSubdocument()) {
                        options.push('subdocument');
                    }
                    if (this.fromWebsocket()) {
                        options.push('websocket');
                    }
                    if (this.fromXmlHttpRequest()) {
                        options.push('xmlhttprequest');
                    }
                    if (this.fromFont()) {
                        options.push('font');
                    }
                }
            }
            if (this.isFuzzy()) {
                options.push('fuzzy');
            }
            if (this.isImportant()) {
                options.push('important');
            }
            if (this.isRedirect()) {
                options.push("redirect=" + this.getRedirect());
            }
            if (this.isCSP()) {
                options.push("csp=" + this.csp);
            }
            if (this.isGenericHide()) {
                options.push('generichide');
            }
            if (this.firstParty() !== this.thirdParty()) {
                if (this.firstParty()) {
                    options.push('first-party');
                }
                if (this.thirdParty()) {
                    options.push('third-party');
                }
            }
            if (this.hasOptDomains() || this.hasOptNotDomains()) {
                options.push('domain=<hashed>');
            }
            if (this.isBadFilter()) {
                options.push('badfilter');
            }
            if (options.length > 0) {
                filter += "$" + options.join(',');
            }
            if (this.isRightAnchor()) {
                filter += '|';
            }
            return filter;
        };
        // Public API (Read-Only)
        NetworkFilter.prototype.getIdWithoutBadFilter = function () {
            // This method computes the id ignoring the $badfilter option (which will
            // correspond to the ID of filters being discarded). This allows us to
            // eliminate bad filters by comparing IDs, which is more robust and faster
            // than string comparison.
            return computeFilterId$1(this.csp, this.mask & ~65536 /* isBadFilter */, this.filter, this.hostname, this.optDomains, this.optNotDomains, this.redirect);
        };
        NetworkFilter.prototype.getId = function () {
            if (this.id === undefined) {
                this.id = computeFilterId$1(this.csp, this.mask, this.filter, this.hostname, this.optDomains, this.optNotDomains, this.redirect);
            }
            return this.id;
        };
        NetworkFilter.prototype.hasFilter = function () {
            return this.filter !== undefined;
        };
        NetworkFilter.prototype.hasOptNotDomains = function () {
            return this.optNotDomains !== undefined;
        };
        NetworkFilter.prototype.getOptNotDomains = function () {
            return this.optNotDomains || EMPTY_ARRAY;
        };
        NetworkFilter.prototype.hasOptDomains = function () {
            return this.optDomains !== undefined;
        };
        NetworkFilter.prototype.getOptDomains = function () {
            return this.optDomains || EMPTY_ARRAY;
        };
        NetworkFilter.prototype.getMask = function () {
            return this.mask;
        };
        NetworkFilter.prototype.getCptMask = function () {
            return this.getMask() & FROM_ANY;
        };
        NetworkFilter.prototype.isRedirect = function () {
            return this.redirect !== undefined;
        };
        NetworkFilter.prototype.getRedirect = function () {
            return this.redirect || '';
        };
        NetworkFilter.prototype.hasHostname = function () {
            return this.hostname !== undefined;
        };
        NetworkFilter.prototype.getHostname = function () {
            return this.hostname || '';
        };
        NetworkFilter.prototype.getFilter = function () {
            return this.filter || '';
        };
        NetworkFilter.prototype.getRegex = function () {
            if (this.regex === undefined) {
                this.regex =
                    this.filter !== undefined && this.isRegex()
                        ? compileRegex(this.filter, this.isLeftAnchor(), this.isRightAnchor(), this.isFullRegex())
                        : MATCH_ALL;
            }
            return this.regex;
        };
        NetworkFilter.prototype.getFuzzySignature = function () {
            if (this.fuzzySignature === undefined) {
                this.fuzzySignature =
                    this.filter !== undefined && this.isFuzzy()
                        ? createFuzzySignature(this.filter)
                        : EMPTY_ARRAY;
            }
            return this.fuzzySignature;
        };
        NetworkFilter.prototype.getTokens = function () {
            TOKENS_BUFFER$1.seekZero();
            // If there is only one domain and no domain negation, we also use this
            // domain as a token.
            if (this.optDomains !== undefined &&
                this.optNotDomains === undefined &&
                this.optDomains.length === 1) {
                TOKENS_BUFFER$1.push(this.optDomains[0]);
            }
            // Get tokens from filter
            if (this.isFullRegex() === false) {
                if (this.filter !== undefined) {
                    var skipLastToken = this.isPlain() && !this.isRightAnchor() && !this.isFuzzy();
                    var skipFirstToken = !this.isLeftAnchor() && !this.isFuzzy();
                    tokenizeFilterInPlace(this.filter, skipFirstToken, skipLastToken, TOKENS_BUFFER$1);
                }
                // Append tokens from hostname, if any
                if (this.hostname !== undefined) {
                    tokenizeFilterInPlace(this.hostname, false, this.filter !== undefined && this.filter.charCodeAt(0) === 42 /* '*' */, TOKENS_BUFFER$1);
                }
            }
            else if (this.filter !== undefined) {
                tokenizeRegexInPlace(this.filter, TOKENS_BUFFER$1);
            }
            // If we got no tokens for the filter/hostname part, then we will dispatch
            // this filter in multiple buckets based on the domains option.
            if (TOKENS_BUFFER$1.pos === 0 &&
                this.optDomains !== undefined &&
                this.optNotDomains === undefined) {
                var result = [];
                for (var i = 0; i < this.optDomains.length; i += 1) {
                    result.push(new Uint32Array([this.optDomains[i]]));
                }
                return result;
            }
            // Add optional token for protocol
            if (this.fromHttp() === true && this.fromHttps() === false) {
                TOKENS_BUFFER$1.push(HTTP_HASH);
            }
            else if (this.fromHttps() === true && this.fromHttp() === false) {
                TOKENS_BUFFER$1.push(HTTPS_HASH);
            }
            return [TOKENS_BUFFER$1.slice()];
        };
        /**
         * Check if this filter should apply to a request with this content type.
         */
        NetworkFilter.prototype.isCptAllowed = function (cpt) {
            var mask = REQUEST_TYPE_TO_MASK[cpt];
            if (mask !== undefined) {
                return getBit(this.mask, mask);
            }
            // If content type is not supported (or not specified), we return `true`
            // only if the filter does not specify any resource type.
            return this.fromAny();
        };
        NetworkFilter.prototype.isFuzzy = function () {
            return getBit(this.mask, 32768 /* fuzzyMatch */);
        };
        NetworkFilter.prototype.isException = function () {
            return getBit(this.mask, 262144 /* isException */);
        };
        NetworkFilter.prototype.isHostnameAnchor = function () {
            return getBit(this.mask, 1048576 /* isHostnameAnchor */);
        };
        NetworkFilter.prototype.isRightAnchor = function () {
            return getBit(this.mask, 8388608 /* isRightAnchor */);
        };
        NetworkFilter.prototype.isLeftAnchor = function () {
            return getBit(this.mask, 4194304 /* isLeftAnchor */);
        };
        NetworkFilter.prototype.isImportant = function () {
            return getBit(this.mask, 2097152 /* isImportant */);
        };
        NetworkFilter.prototype.isFullRegex = function () {
            return getBit(this.mask, 33554432 /* isFullRegex */);
        };
        NetworkFilter.prototype.isRegex = function () {
            return (getBit(this.mask, 67108864 /* isRegex */) ||
                getBit(this.mask, 33554432 /* isFullRegex */));
        };
        NetworkFilter.prototype.isPlain = function () {
            return !this.isRegex();
        };
        NetworkFilter.prototype.isCSP = function () {
            return getBit(this.mask, 131072 /* isCSP */);
        };
        NetworkFilter.prototype.isGenericHide = function () {
            return getBit(this.mask, 524288 /* isGenericHide */);
        };
        NetworkFilter.prototype.isBadFilter = function () {
            return getBit(this.mask, 65536 /* isBadFilter */);
        };
        NetworkFilter.prototype.isUnicode = function () {
            return getBit(this.mask, 134217728 /* isUnicode */);
        };
        NetworkFilter.prototype.fromAny = function () {
            return this.getCptMask() === FROM_ANY;
        };
        NetworkFilter.prototype.thirdParty = function () {
            return getBit(this.mask, 16777216 /* thirdParty */);
        };
        NetworkFilter.prototype.firstParty = function () {
            return getBit(this.mask, 16384 /* firstParty */);
        };
        NetworkFilter.prototype.fromImage = function () {
            return getBit(this.mask, 16 /* fromImage */);
        };
        NetworkFilter.prototype.fromMedia = function () {
            return getBit(this.mask, 32 /* fromMedia */);
        };
        NetworkFilter.prototype.fromObject = function () {
            return getBit(this.mask, 64 /* fromObject */);
        };
        NetworkFilter.prototype.fromOther = function () {
            return getBit(this.mask, 128 /* fromOther */);
        };
        NetworkFilter.prototype.fromPing = function () {
            return getBit(this.mask, 256 /* fromPing */);
        };
        NetworkFilter.prototype.fromScript = function () {
            return getBit(this.mask, 512 /* fromScript */);
        };
        NetworkFilter.prototype.fromStylesheet = function () {
            return getBit(this.mask, 1024 /* fromStylesheet */);
        };
        NetworkFilter.prototype.fromDocument = function () {
            return getBit(this.mask, 1 /* fromDocument */);
        };
        NetworkFilter.prototype.fromSubdocument = function () {
            return getBit(this.mask, 2048 /* fromSubdocument */);
        };
        NetworkFilter.prototype.fromWebsocket = function () {
            return getBit(this.mask, 4096 /* fromWebsocket */);
        };
        NetworkFilter.prototype.fromHttp = function () {
            return getBit(this.mask, 4 /* fromHttp */);
        };
        NetworkFilter.prototype.fromHttps = function () {
            return getBit(this.mask, 8 /* fromHttps */);
        };
        NetworkFilter.prototype.fromXmlHttpRequest = function () {
            return getBit(this.mask, 8192 /* fromXmlHttpRequest */);
        };
        NetworkFilter.prototype.fromFont = function () {
            return getBit(this.mask, 2 /* fromFont */);
        };
        return NetworkFilter;
    }());
    // ---------------------------------------------------------------------------
    // Filter parsing
    // ---------------------------------------------------------------------------
    function setNetworkMask(mask, m, value) {
        if (value === true) {
            return setBit(mask, m);
        }
        return clearBit(mask, m);
    }
    /**
     * Check if the sub-string contained between the indices start and end is a
     * regex filter (it contains a '*' or '^' char).
     */
    function checkIsRegex(filter, start, end) {
        var indexOfSeparator = filter.indexOf('^', start);
        if (indexOfSeparator !== -1 && indexOfSeparator < end) {
            return true;
        }
        var indexOfWildcard = filter.indexOf('*', start);
        return indexOfWildcard !== -1 && indexOfWildcard < end;
    }
    /**
     * Handle hostname anchored filters, given 'hostname' from ||hostname and
     * request's hostname, check if there is a match. This is tricky because
     * filters authors rely and different assumptions. We can have prefix of suffix
     * matches of anchor.
     */
    function isAnchoredByHostname(filterHostname, hostname, isFollowedByWildcard) {
        // Corner-case, if `filterHostname` is empty, then it's a match
        if (filterHostname.length === 0) {
            return true;
        }
        // `filterHostname` cannot be longer than actual hostname
        if (filterHostname.length > hostname.length) {
            return false;
        }
        // If they have the same length, they should be equal
        if (filterHostname.length === hostname.length) {
            return filterHostname === hostname;
        }
        // Check if `filterHostname` appears anywhere in `hostname`
        var matchIndex = hostname.indexOf(filterHostname);
        // No match
        if (matchIndex === -1) {
            return false;
        }
        // `filterHostname` is a prefix of `hostname` and needs to match full a label.
        //
        // Examples (filterHostname, hostname):
        //   * (foo, foo.com)
        //   * (sub.foo, sub.foo.com)
        if (matchIndex === 0) {
            return (isFollowedByWildcard ||
                hostname.charCodeAt(filterHostname.length) === 46 ||
                filterHostname.charCodeAt(filterHostname.length - 1) === 46);
        }
        // `filterHostname` is a suffix of `hostname`.
        //
        // Examples (filterHostname, hostname):
        //    * (foo.com, sub.foo.com)
        //    * (com, foo.com)
        if (hostname.length === matchIndex + filterHostname.length) {
            return hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46;
        }
        // `filterHostname` is infix of `hostname` and needs match full labels
        return ((isFollowedByWildcard ||
            hostname.charCodeAt(filterHostname.length) === 46 ||
            filterHostname.charCodeAt(filterHostname.length - 1) === 46) &&
            (hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46));
    }
    // pattern$fuzzy
    function checkPatternFuzzyFilter(filter, request) {
        var signature = filter.getFuzzySignature();
        var requestSignature = request.getFuzzySignature();
        if (signature.length > requestSignature.length) {
            return false;
        }
        var lastIndex = 0;
        for (var i = 0; i < signature.length; i += 1) {
            var c = signature[i];
            // Find the occurrence of `c` in `requestSignature`
            var j = requestSignature.indexOf(c, lastIndex);
            if (j === -1) {
                return false;
            }
            lastIndex = j + 1;
        }
        return true;
    }
    /**
     * Specialize a network filter depending on its type. It allows for more
     * efficient matching function.
     */
    function checkPattern(filter, request) {
        var pattern = filter.getFilter();
        if (filter.isHostnameAnchor()) {
            // Make sure request is anchored by hostname before proceeding to matching
            var filterHostname = filter.getHostname();
            if (isAnchoredByHostname(filterHostname, request.hostname, filter.filter !== undefined && filter.filter.charCodeAt(0) === 42 /* '*' */) === false) {
                return false;
            }
            // At this point we know request is hostname anchored so we match the rest of the filter.
            if (filter.isRegex()) {
                // ||pattern*^
                return filter
                    .getRegex()
                    .test(request.url.slice(request.url.indexOf(filterHostname) + filterHostname.length));
            }
            else if (filter.isRightAnchor() && filter.isLeftAnchor()) {
                // |||pattern|
                // Since this is not a regex, the filter pattern must follow the hostname
                // with nothing in between. So we extract the part of the URL following
                // after hostname and will perform the matching on it.
                var urlAfterHostname = request.url.slice(request.url.indexOf(filterHostname) + filterHostname.length);
                // Since it must follow immediatly after the hostname and be a suffix of
                // the URL, we conclude that filter must be equal to the part of the
                // url following the hostname.
                return pattern === urlAfterHostname;
            }
            else if (filter.isRightAnchor()) {
                // ||pattern|
                var requestHostname = request.hostname;
                if (filter.hasFilter() === false) {
                    // In this specific case it means that the specified hostname should match
                    // at the end of the hostname of the request. This allows to prevent false
                    // positive like ||foo.bar which would match https://foo.bar.baz where
                    // ||foo.bar^ would not.
                    return (filterHostname.length === requestHostname.length ||
                        requestHostname.endsWith(filterHostname));
                }
                else {
                    // pattern|
                    return request.url.endsWith(pattern);
                }
            }
            else if (filter.isFuzzy()) {
                // ||pattern$fuzzy
                return checkPatternFuzzyFilter(filter, request);
            }
            else if (filter.isLeftAnchor()) {
                // ||pattern + left-anchor => This means that a plain pattern needs to appear
                // exactly after the hostname, with nothing in between.
                // Since this is not a regex, the filter pattern must follow the hostname
                // with nothing in between. So we extract the part of the URL following
                // after hostname and will perform the matching on it.
                return fastStartsWithFrom(request.url, pattern, request.url.indexOf(filterHostname) + filterHostname.length);
            }
            if (filter.hasFilter() === false) {
                return true;
            }
            // We consider this a match if the plain patter (i.e.: filter) appears anywhere.
            return (request.url.indexOf(pattern, request.url.indexOf(filterHostname) + filterHostname.length) !==
                -1);
        }
        else if (filter.isRegex()) {
            // pattern*^
            return filter.getRegex().test(request.url);
        }
        else if (filter.isLeftAnchor() && filter.isRightAnchor()) {
            // |pattern|
            return request.url === pattern;
        }
        else if (filter.isLeftAnchor()) {
            // |pattern
            return fastStartsWith(request.url, pattern);
        }
        else if (filter.isRightAnchor()) {
            // pattern|
            return request.url.endsWith(pattern);
        }
        else if (filter.isFuzzy()) {
            return checkPatternFuzzyFilter(filter, request);
        }
        // pattern
        if (filter.hasFilter() === false) {
            return true;
        }
        return request.url.indexOf(pattern) !== -1;
    }
    function checkOptions(filter, request) {
        // We first discard requests based on type, protocol and party. This is really
        // cheap and should be done first.
        if (filter.isCptAllowed(request.type) === false ||
            (request.isHttps === true && filter.fromHttps() === false) ||
            (request.isHttp === true && filter.fromHttp() === false) ||
            (filter.firstParty() === false && request.isFirstParty === true) ||
            (filter.thirdParty() === false && request.isThirdParty === true)) {
            return false;
        }
        // Source URL must be among these domains to match
        if (filter.hasOptDomains()) {
            var optDomains = filter.getOptDomains();
            if (binLookup(optDomains, request.sourceHostnameHash) === false &&
                binLookup(optDomains, request.sourceDomainHash) === false) {
                return false;
            }
        }
        // Source URL must not be among these domains to match
        if (filter.hasOptNotDomains()) {
            var optNotDomains = filter.getOptNotDomains();
            if (binLookup(optNotDomains, request.sourceHostnameHash) === true ||
                binLookup(optNotDomains, request.sourceDomainHash) === true) {
                return false;
            }
        }
        return true;
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Given a single line (string), checks if this would likely be a cosmetic
     * filter, a network filter or something that is not supported. This check is
     * performed before calling a more specific parser to create an instance of
     * `NetworkFilter` or `CosmeticFilter`.
     */
    function detectFilterType(line) {
        // Ignore empty line
        if (line.length === 0 || line.length === 1) {
            return 0 /* NOT_SUPPORTED */;
        }
        // Ignore comments
        var firstCharCode = line.charCodeAt(0);
        var secondCharCode = line.charCodeAt(1);
        if (firstCharCode === 33 /* '!' */ ||
            (firstCharCode === 35 /* '#' */ && secondCharCode <= 32) ||
            (firstCharCode === 91 /* '[' */ && fastStartsWith(line, '[Adblock'))) {
            return 0 /* NOT_SUPPORTED */;
        }
        // Fast heuristics to detect network filters
        var lastCharCode = line.charCodeAt(line.length - 1);
        if (firstCharCode === 36 /* '$' */ ||
            firstCharCode === 38 /* '&' */ ||
            firstCharCode === 42 /* '*' */ ||
            firstCharCode === 45 /* '-' */ ||
            firstCharCode === 46 /* '.' */ ||
            firstCharCode === 47 /* '/' */ ||
            firstCharCode === 58 /* ':' */ ||
            firstCharCode === 61 /* '=' */ ||
            firstCharCode === 63 /* '?' */ ||
            firstCharCode === 64 /* '@' */ ||
            firstCharCode === 95 /* '_' */ ||
            firstCharCode === 124 /* '|' */ ||
            lastCharCode === 124 /* '|' */) {
            return 1 /* NETWORK */;
        }
        // Ignore Adguard cosmetics
        // `$$` = HTML filtering rules
        var dollarIndex = line.indexOf('$');
        if (dollarIndex !== -1 && dollarIndex !== line.length - 1) {
            var afterDollarIndex = dollarIndex + 1;
            var afterDollarCharCode = line.charCodeAt(afterDollarIndex);
            // Ignore Adguard HTML rewrite rules
            if (afterDollarCharCode === 36 /* '$' */ ||
                (afterDollarCharCode === 64 /* '@' */ &&
                    fastStartsWithFrom(line, /* $@$ */ '@$', afterDollarIndex))) {
                return 0 /* NOT_SUPPORTED */;
            }
        }
        // Check if filter is cosmetics
        var sharpIndex = line.indexOf('#');
        if (sharpIndex !== -1 && sharpIndex !== line.length - 1) {
            var afterSharpIndex = sharpIndex + 1;
            var afterSharpCharCode = line.charCodeAt(afterSharpIndex);
            if (afterSharpCharCode === 35 /* '#'*/ ||
                (afterSharpCharCode === 64 /* '@' */ &&
                    fastStartsWithFrom(line, /* #@# */ '@#', afterSharpIndex))) {
                // Parse supported cosmetic filter
                // `##` `#@#`
                return 2 /* COSMETIC */;
            }
            else if ((afterSharpCharCode === 64 /* '@'*/ &&
                (fastStartsWithFrom(line, /* #@$# */ '@$#', afterSharpIndex) ||
                    fastStartsWithFrom(line, /* #@%# */ '@%#', afterSharpIndex))) ||
                (afterSharpCharCode === 37 /* '%' */ &&
                    fastStartsWithFrom(line, /* #%# */ '%#', afterSharpIndex)) ||
                (afterSharpCharCode === 36 /* '$' */ &&
                    fastStartsWithFrom(line, /* #$# */ '$#', afterSharpIndex)) ||
                (afterSharpCharCode === 63 /* '?' */ &&
                    fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex))) {
                // Ignore Adguard cosmetics
                // `#$#` `#@$#`
                // `#%#` `#@%#`
                // `#?#`
                return 0 /* NOT_SUPPORTED */;
            }
        }
        // Everything else is a network filter
        return 1 /* NETWORK */;
    }
    function parseFilter(filter) {
        var filterType = detectFilterType(filter);
        if (filterType === 1 /* NETWORK */) {
            return NetworkFilter.parse(filter, true);
        }
        else if (filterType === 2 /* COSMETIC */) {
            return CosmeticFilter.parse(filter, true);
        }
        return null;
    }
    function f(strings) {
        return parseFilter(strings[0]);
    }
    function parseFilters(list, config) {
        if (config === void 0) { config = new Config(); }
        config = new Config(config);
        var networkFilters = [];
        var cosmeticFilters = [];
        var lines = list.split('\n');
        for (var i = 0; i < lines.length; i += 1) {
            var line = lines[i];
            // Check if `line` should be trimmed before parsing
            var isTrimmingNeeded = line.length > 1 && (line.charCodeAt(0) <= 32 || line.charCodeAt(line.length - 1) <= 32);
            if (isTrimmingNeeded) {
                line = line.trim();
            }
            // Detect if filter is supported, network or cosmetic
            var filterType = detectFilterType(line);
            if (filterType === 1 /* NETWORK */ && config.loadNetworkFilters === true) {
                var filter = NetworkFilter.parse(line, config.debug);
                if (filter !== null) {
                    networkFilters.push(filter);
                }
            }
            else if (filterType === 2 /* COSMETIC */ && config.loadCosmeticFilters === true) {
                var filter = CosmeticFilter.parse(line, config.debug);
                if (filter !== null) {
                    if (config.loadGenericCosmeticsFilters === true || filter.isGenericHide() === false) {
                        cosmeticFilters.push(filter);
                    }
                }
            }
        }
        return { networkFilters: networkFilters, cosmeticFilters: cosmeticFilters };
    }
    function getFilters(list, config) {
        var _a = parseFilters(list, config), networkFilters = _a.networkFilters, cosmeticFilters = _a.cosmeticFilters;
        var filters = [];
        return filters.concat(networkFilters).concat(cosmeticFilters);
    }
    /**
     * Helper used to return a set of lines as strings where each line is
     * guaranteed to be a valid filter (i.e.: comments, empty lines and
     * un-supported filters are dropped).
     */
    function getLinesWithFilters(list, config) {
        if (config === void 0) { config = new Config(); }
        // Set config to `debug` so that we keep track of raw lines for each filter
        return new Set(getFilters(list, new Config(Object.assign({}, config, { debug: true }))).map(function (_a) {
            var rawLine = _a.rawLine;
            return rawLine;
        }));
    }
    /**
     * Given two versions of the same subscription (e.g.: EasyList) as a string,
     * generate a raw diff (i.e.: a list of filters added and filters removed, in
     * their raw string form).
     */
    function generateDiff(prevRevision, newRevision, config) {
        if (config === void 0) { config = new Config(); }
        // Set config to `debug` so that we keep track of raw lines for each filter
        var debugConfig = new Config(Object.assign({}, config, { debug: true }));
        var prevRevisionFilters = getFilters(prevRevision, debugConfig);
        var prevRevisionIds = new Set(prevRevisionFilters.map(function (filter) { return filter.getId(); }));
        var newRevisionFilters = getFilters(newRevision, debugConfig);
        var newRevisionIds = new Set(newRevisionFilters.map(function (filter) { return filter.getId(); }));
        // Check which filters were added, based on ID
        var added = new Set();
        for (var i = 0; i < newRevisionFilters.length; i += 1) {
            var filter = newRevisionFilters[i];
            if (!prevRevisionIds.has(filter.getId())) {
                added.add(filter.rawLine);
            }
        }
        // Check which filters were removed, based on ID
        var removed = new Set();
        for (var i = 0; i < prevRevisionFilters.length; i += 1) {
            var filter = prevRevisionFilters[i];
            if (!newRevisionIds.has(filter.getId())) {
                removed.add(filter.rawLine);
            }
        }
        return { added: Array.from(added), removed: Array.from(removed) };
    }
    /**
     * Merge several raw diffs into one, taking care of accumulating added and
     * removed filters, even if several diffs add/remove the same ones.
     */
    function mergeDiffs(diffs) {
        var addedCumul = new Set();
        var removedCumul = new Set();
        for (var i = 0; i < diffs.length; i += 1) {
            var _a = diffs[i], added = _a.added, removed = _a.removed;
            if (added !== undefined) {
                for (var j = 0; j < added.length; j += 1) {
                    var str = added[j];
                    if (removedCumul.has(str)) {
                        removedCumul["delete"](str);
                    }
                    addedCumul.add(str);
                }
            }
            if (removed !== undefined) {
                for (var j = 0; j < removed.length; j += 1) {
                    var str = removed[j];
                    if (addedCumul.has(str)) {
                        addedCumul["delete"](str);
                    }
                    removedCumul.add(str);
                }
            }
        }
        return {
            added: Array.from(addedCumul),
            removed: Array.from(removedCumul)
        };
    }

    function a(c,e){var d=0,f=c.length,g=!1;if(!1===e){for(;d<c.length&&32>=c.charCodeAt(d);)d+=1;for(;f>d+1&&32>=c.charCodeAt(f-1);)--f;if(47===c.charCodeAt(d)&&47===c.charCodeAt(d+1))d+=2;else if(e=c.indexOf(":/",d),-1!==e){var h=e-d,m=c.charCodeAt(d),n=c.charCodeAt(d+1),t=c.charCodeAt(d+2),K=c.charCodeAt(d+3),ca=c.charCodeAt(d+4);if(5!==h||104!==m||116!==n||116!==t||112!==K||115!==ca)if(4!==h||104!==m||116!==n||116!==t||112!==K)if(3!==h||119!==m||115!==n||115!==t)if(2!==h||119!==m||115!==
    n)for(h=d;h<e;h+=1)if(d=c.charCodeAt(h)|32,!1===(97<=d&&122>=d||48<=d&&57>=d||46===d||45===d||43===d))return null;for(d=e+2;47===c.charCodeAt(d);)d+=1;}n=m=e=-1;for(h=d;h<f;h+=1)if(t=c.charCodeAt(h),35===t||47===t||63===t){f=h;break}else 64===t?e=h:93===t?m=h:58===t?n=h:65<=t&&90>=t&&(g=!0);-1!==e&&e>d&&e<f&&(d=e+1);if(91===c.charCodeAt(d))return -1!==m?c.slice(d+1,m).toLowerCase():null;-1!==n&&n>d&&n<f&&(f=n);}for(;f>d+1&&46===c.charCodeAt(f-1);)--f;c=0!==d||f!==c.length?c.slice(d,f):c;return g?c.toLowerCase():
    c}function b(c){return 97<=c&&122>=c||48<=c&&57>=c||127<c}function k(c){if(255<c.length||0===c.length||!b(c.charCodeAt(0)))return !1;for(var e=-1,d=-1,f=c.length,g=0;g<f;g+=1){var h=c.charCodeAt(g);if(46===h){if(64<g-e||46===d||45===d||95===d)return !1;e=g;}else if(!b(h)&&45!==h&&95!==h)return !1;d=h;}return 63>=f-e-1&&45!==d}
    function l(c){var e=c.allowIcannDomains,d=c.allowPrivateDomains,f=c.detectIp,g=c.extractHostname,h=c.mixedInputs,m=c.validHosts;c=c.validateHostname;return {allowIcannDomains:void 0===e?!0:e,allowPrivateDomains:void 0===d?!1:d,detectIp:void 0===f?!0:f,extractHostname:void 0===g?!0:g,mixedInputs:void 0===h?!0:h,validHosts:void 0===m?null:m,validateHostname:void 0===c?!0:c}}var aa=l({});
    function p(c,e,d,f){var g=void 0===f?aa:l(f);f={domain:null,hostname:null,isIcann:null,isIp:null,isPrivate:null,publicSuffix:null,subdomain:null};if("string"!==typeof c)return f;f.hostname=!1===g.extractHostname?c:!0===g.mixedInputs?a(c,k(c)):a(c,!1);if(0===e||null===f.hostname)return f;if(!0===g.detectIp){c=f.hostname;a:if(39<c.length)var h=!1;else{h=!1;for(var m=0;m<c.length;m+=1){var n=c.charCodeAt(m);if(58===n)h=!0;else if(!1===(48<=n&&57>=n||97<=n&&102>=n)){h=!1;break a}}}if(!h)a:if(7>c.length||
    15<c.length)h=!1;else{for(m=h=0;m<c.length;m+=1)if(n=c.charCodeAt(m),46===n)h+=1;else if(48>n||57<n){h=!1;break a}h=3===h&&46!==c.charCodeAt(0)&&46!==c.charCodeAt(c.length-1);}f.isIp=h;if(!0===f.isIp)return f}if(!0===g.validateHostname&&!0===g.extractHostname&&!1===k(f.hostname))return f.hostname=null,f;d(f.hostname,g,f);if(2===e||null===f.publicSuffix)return f;a:{c=f.publicSuffix;d=f.hostname;if(null!==g.validHosts)for(g=g.validHosts,h=0;h<g.length;h+=1){m=g[h];n=d;var t=m;if(n.endsWith(t)&&(n.length===
    t.length||"."===n[n.length-t.length-1])){g=m;break a}}c.length===d.length?g=null:(g=d.lastIndexOf(".",d.length-c.length-2),g=-1===g?d:d.slice(g+1));}f.domain=g;if(3===e||null===f.domain)return f;e=f.hostname;g=f.domain;e=g.length===e.length?"":e.slice(0,-g.length-1);f.subdomain=e;return f}var q$1,r$1={$:1,succ:{}},u$1={$:0,succ:{city:r$1}};q$1={$:0,succ:{ck:{$:0,succ:{www:r$1}},jp:{$:0,succ:{kawasaki:u$1,kitakyushu:u$1,kobe:u$1,nagoya:u$1,sapporo:u$1,sendai:u$1,yokohama:u$1}}}};
    var v$1,w={$:1,succ:{}},x={$:1,succ:{com:w,edu:w,gov:w,net:w,mil:w,org:w}},y={$:2,succ:{}},z$1={$:1,succ:{blogspot:y}},A={$:1,succ:{gov:w}},B={$:0,succ:{"*":y}},C={$:0,succ:{"*":w}},D={$:1,succ:{com:w,edu:w,net:w,org:w,gov:w}},E={$:1,succ:{co:y}},F={$:1,succ:{ng:y}},G={$:0,succ:{s3:y}},H={$:0,succ:{dualstack:G}},I={$:0,succ:{s3:y,dualstack:G,"s3-website":y}},J={$:0,succ:{apps:y}},L={$:0,succ:{app:y}},M={$:1,succ:{com:w,edu:w,net:w,org:w}},N={$:1,succ:{ybo:y}},O={$:1,succ:{nom:y}},P={$:1,succ:{gov:w,blogspot:y,
    nym:y}},Q={$:0,succ:{cust:y}},R={$:1,succ:{edu:w,biz:w,net:w,org:w,gov:w,info:w,com:w}},S={$:1,succ:{blogspot:y,nym:y}},T$1={$:1,succ:{"for":y}},U={$:1,succ:{barsy:y}},V={$:0,succ:{forgot:y}},W={$:1,succ:{gs:w}},ba={$:0,succ:{nes:w}},X={$:1,succ:{k12:w,cc:w,lib:w}},Y={$:1,succ:{cc:w,lib:w}};
    v$1={$:0,succ:{ac:x,ad:{$:1,succ:{nom:w}},ae:{$:1,succ:{co:w,net:w,org:w,sch:w,ac:w,gov:w,mil:w,blogspot:y,nom:y}},aero:{$:1,succ:{"accident-investigation":w,"accident-prevention":w,aerobatic:w,aeroclub:w,aerodrome:w,agents:w,aircraft:w,airline:w,airport:w,"air-surveillance":w,airtraffic:w,"air-traffic-control":w,ambulance:w,amusement:w,association:w,author:w,ballooning:w,broker:w,caa:w,cargo:w,catering:w,certification:w,championship:w,charter:w,civilaviation:w,club:w,conference:w,consultant:w,consulting:w,
    control:w,council:w,crew:w,design:w,dgca:w,educator:w,emergency:w,engine:w,engineer:w,entertainment:w,equipment:w,exchange:w,express:w,federation:w,flight:w,freight:w,fuel:w,gliding:w,government:w,groundhandling:w,group:w,hanggliding:w,homebuilt:w,insurance:w,journal:w,journalist:w,leasing:w,logistics:w,magazine:w,maintenance:w,media:w,microlight:w,modelling:w,navigation:w,parachuting:w,paragliding:w,"passenger-association":w,pilot:w,press:w,production:w,recreation:w,repbody:w,res:w,research:w,rotorcraft:w,
    safety:w,scientist:w,services:w,show:w,skydiving:w,software:w,student:w,trader:w,trading:w,trainer:w,union:w,workinggroup:w,works:w}},af:{$:1,succ:{gov:w,com:w,org:w,net:w,edu:w,nom:y}},ag:{$:1,succ:{com:w,org:w,net:w,co:w,nom:w}},ai:{$:1,succ:{off:w,com:w,net:w,org:w,uwu:y,nom:y}},al:{$:1,succ:{com:w,edu:w,gov:w,mil:w,net:w,org:w,blogspot:y,nom:y}},am:{$:1,succ:{co:w,com:w,commune:w,net:w,org:w,blogspot:y}},ao:{$:1,succ:{ed:w,gv:w,og:w,co:w,pb:w,it:w}},aq:w,ar:{$:1,succ:{com:z$1,edu:w,gob:w,gov:w,
    "int":w,mil:w,musica:w,net:w,org:w,tur:w}},arpa:{$:1,succ:{e164:w,"in-addr":w,ip6:w,iris:w,uri:w,urn:w}},as:A,asia:{$:1,succ:{cloudns:y}},at:{$:1,succ:{ac:w,co:z$1,gv:w,or:w,futurecms:{$:0,succ:{"*":y,ex:B,"in":B}},futurehosting:y,futuremailing:y,ortsinfo:{$:0,succ:{ex:B,kunden:B}},biz:y,info:y,priv:y,"12hp":y,"2ix":y,"4lima":y,"lima-city":y}},au:{$:1,succ:{com:z$1,net:w,org:w,edu:{$:1,succ:{act:w,nsw:w,nt:w,qld:w,sa:w,tas:w,vic:w,wa:w}},gov:{$:1,succ:{qld:w,sa:w,tas:w,vic:w,wa:w}},asn:w,id:w,info:w,
    conf:w,oz:w,act:w,nsw:w,nt:w,qld:w,sa:w,tas:w,vic:w,wa:w}},aw:{$:1,succ:{com:w}},ax:w,az:{$:1,succ:{com:w,net:w,"int":w,gov:w,org:w,edu:w,info:w,pp:w,mil:w,name:w,pro:w,biz:w}},ba:{$:1,succ:{com:w,edu:w,gov:w,mil:w,net:w,org:w,blogspot:y}},bb:{$:1,succ:{biz:w,co:w,com:w,edu:w,gov:w,info:w,net:w,org:w,store:w,tv:w}},bd:C,be:{$:1,succ:{ac:w,webhosting:y,blogspot:y,transurl:B}},bf:A,bg:{$:1,succ:{0:w,1:w,2:w,3:w,4:w,5:w,6:w,7:w,8:w,9:w,a:w,b:w,c:w,d:w,e:w,f:w,g:w,h:w,i:w,j:w,k:w,l:w,m:w,n:w,o:w,p:w,
    q:w,r:w,s:w,t:w,u:w,v:w,w,x:w,y:w,z:w,blogspot:y,barsy:y}},bh:D,bi:{$:1,succ:{co:w,com:w,edu:w,or:w,org:w}},biz:{$:1,succ:{cloudns:y,dyndns:y,"for-better":y,"for-more":y,"for-some":y,"for-the":y,selfip:y,webhop:y,bpl:y,orx:y,mmafan:y,myftp:y,"no-ip":y,dscloud:y}},bj:{$:1,succ:{asso:w,barreau:w,gouv:w,blogspot:y}},bm:D,bn:{$:1,succ:{com:w,edu:w,gov:w,net:w,org:w,co:y}},bo:{$:1,succ:{com:w,edu:w,gob:w,"int":w,org:w,net:w,mil:w,tv:w,web:w,academia:w,agro:w,arte:w,blog:w,bolivia:w,ciencia:w,cooperativa:w,
    democracia:w,deporte:w,ecologia:w,economia:w,empresa:w,indigena:w,industria:w,info:w,medicina:w,movimiento:w,musica:w,natural:w,nombre:w,noticias:w,patria:w,politica:w,profesional:w,plurinacional:w,pueblo:w,revista:w,salud:w,tecnologia:w,tksat:w,transporte:w,wiki:w}},br:{$:1,succ:{"9guacu":w,abc:w,adm:w,adv:w,agr:w,aju:w,am:w,anani:w,aparecida:w,arq:w,art:w,ato:w,b:w,barueri:w,belem:w,bhz:w,bio:w,blog:w,bmd:w,boavista:w,bsb:w,campinagrande:w,campinas:w,caxias:w,cim:w,cng:w,cnt:w,com:z$1,contagem:w,
    coop:w,cri:w,cuiaba:w,curitiba:w,def:w,ecn:w,eco:w,edu:w,emp:w,eng:w,esp:w,etc:w,eti:w,far:w,feira:w,flog:w,floripa:w,fm:w,fnd:w,fortal:w,fot:w,foz:w,fst:w,g12:w,ggf:w,goiania:w,gov:{$:1,succ:{ac:w,al:w,am:w,ap:w,ba:w,ce:w,df:w,es:w,go:w,ma:w,mg:w,ms:w,mt:w,pa:w,pb:w,pe:w,pi:w,pr:w,rj:w,rn:w,ro:w,rr:w,rs:w,sc:w,se:w,sp:w,to:w}},gru:w,imb:w,ind:w,inf:w,jab:w,jampa:w,jdf:w,joinville:w,jor:w,jus:w,leg:{$:1,succ:{ac:y,al:y,am:y,ap:y,ba:y,ce:y,df:y,es:y,go:y,ma:y,mg:y,ms:y,mt:y,pa:y,pb:y,pe:y,pi:y,pr:y,
    rj:y,rn:y,ro:y,rr:y,rs:y,sc:y,se:y,sp:y,to:y}},lel:w,londrina:w,macapa:w,maceio:w,manaus:w,maringa:w,mat:w,med:w,mil:w,morena:w,mp:w,mus:w,natal:w,net:w,niteroi:w,nom:C,not:w,ntr:w,odo:w,ong:w,org:w,osasco:w,palmas:w,poa:w,ppg:w,pro:w,psc:w,psi:w,pvh:w,qsl:w,radio:w,rec:w,recife:w,ribeirao:w,rio:w,riobranco:w,riopreto:w,salvador:w,sampa:w,santamaria:w,santoandre:w,saobernardo:w,saogonca:w,sjc:w,slg:w,slz:w,sorocaba:w,srv:w,taxi:w,tc:w,teo:w,the:w,tmp:w,trd:w,tur:w,tv:w,udi:w,vet:w,vix:w,vlog:w,wiki:w,
    zlg:w}},bs:{$:1,succ:{com:w,net:w,org:w,edu:w,gov:w,we:y}},bt:D,bv:w,bw:{$:1,succ:{co:w,org:w}},by:{$:1,succ:{gov:w,mil:w,com:z$1,of:w,nym:y}},bz:{$:1,succ:{com:w,net:w,org:w,edu:w,gov:w,za:y,nym:y}},ca:{$:1,succ:{ab:w,bc:w,mb:w,nb:w,nf:w,nl:w,ns:w,nt:w,nu:w,on:w,pe:w,qc:w,sk:w,yk:w,gc:w,barsy:y,awdev:B,co:y,blogspot:y,"no-ip":y}},cat:w,cc:{$:1,succ:{cloudns:y,ftpaccess:y,"game-server":y,myphotos:y,scrapping:y,twmail:y,fantasyleague:y}},cd:A,cf:z$1,cg:w,ch:{$:1,succ:{square7:y,blogspot:y,"linkyard-cloud":y,
    dnsking:y,gotdns:y,"12hp":y,"2ix":y,"4lima":y,"lima-city":y}},ci:{$:1,succ:{org:w,or:w,com:w,co:w,edu:w,ed:w,ac:w,net:w,go:w,asso:w,"xn--aroport-bya":w,"a\u00e9roport":w,"int":w,presse:w,md:w,gouv:w,fin:y}},ck:C,cl:{$:1,succ:{gov:w,gob:w,co:w,mil:w,blogspot:y,nom:y}},cm:{$:1,succ:{co:w,com:w,gov:w,net:w}},cn:{$:1,succ:{ac:w,com:{$:1,succ:{amazonaws:{$:0,succ:{compute:B,eb:{$:0,succ:{"cn-north-1":y,"cn-northwest-1":y}},elb:B,"cn-north-1":G}}}},edu:w,gov:w,net:w,org:w,mil:w,"xn--55qx5d":w,"\u516c\u53f8":w,
    "xn--io0a7i":w,"\u7f51\u7edc":w,"xn--od0alg":w,"\u7db2\u7d61":w,ah:w,bj:w,cq:w,fj:w,gd:w,gs:w,gz:w,gx:w,ha:w,hb:w,he:w,hi:w,hl:w,hn:w,jl:w,js:w,jx:w,ln:w,nm:w,nx:w,qh:w,sc:w,sd:w,sh:w,sn:w,sx:w,tj:w,xj:w,xz:w,yn:w,zj:w,hk:w,mo:w,tw:w,instantcloud:y}},co:{$:1,succ:{arts:w,com:z$1,edu:w,firm:w,gov:w,info:w,"int":w,mil:w,net:w,nom:w,org:w,rec:w,web:w,"go-vip":y,carrd:y,crd:y,otap:B,leadpages:y,lpages:y,mypi:y,n4t:y,nodum:y,repl:y}},com:{$:1,succ:{amazonaws:{$:0,succ:{compute:B,"compute-1":B,"us-east-1":{$:2,
    succ:{dualstack:G}},elb:B,s3:y,"s3-ap-northeast-1":y,"s3-ap-northeast-2":y,"s3-ap-south-1":y,"s3-ap-southeast-1":y,"s3-ap-southeast-2":y,"s3-ca-central-1":y,"s3-eu-central-1":y,"s3-eu-west-1":y,"s3-eu-west-2":y,"s3-eu-west-3":y,"s3-external-1":y,"s3-fips-us-gov-west-1":y,"s3-sa-east-1":y,"s3-us-gov-west-1":y,"s3-us-east-2":y,"s3-us-west-1":y,"s3-us-west-2":y,"ap-northeast-2":I,"ap-south-1":I,"ca-central-1":I,"eu-central-1":I,"eu-west-2":I,"eu-west-3":I,"us-east-2":I,"ap-northeast-1":H,"ap-southeast-1":H,
    "ap-southeast-2":H,"eu-west-1":H,"sa-east-1":H,"s3-website-us-east-1":y,"s3-website-us-west-1":y,"s3-website-us-west-2":y,"s3-website-ap-northeast-1":y,"s3-website-ap-southeast-1":y,"s3-website-ap-southeast-2":y,"s3-website-eu-west-1":y,"s3-website-sa-east-1":y}},elasticbeanstalk:{$:2,succ:{"ap-northeast-1":y,"ap-northeast-2":y,"ap-northeast-3":y,"ap-south-1":y,"ap-southeast-1":y,"ap-southeast-2":y,"ca-central-1":y,"eu-central-1":y,"eu-west-1":y,"eu-west-2":y,"eu-west-3":y,"sa-east-1":y,"us-east-1":y,
    "us-east-2":y,"us-gov-west-1":y,"us-west-1":y,"us-west-2":y}},"on-aptible":y,myasustor:y,wpcomstaging:y,"balena-devices":y,betainabox:y,bplaced:y,ar:y,br:y,cn:y,de:y,eu:y,gb:y,hu:y,jpn:y,kr:y,mex:y,no:y,qc:y,ru:y,sa:y,uk:y,us:y,uy:y,za:y,africa:y,gr:y,co:y,xenapponazure:y,jdevcloud:y,wpdevcloud:y,cloudcontrolled:y,cloudcontrolapp:y,dattolocal:y,dattorelay:y,dattoweb:y,mydatto:y,drayddns:y,dreamhosters:y,mydrobo:y,"dyndns-at-home":y,"dyndns-at-work":y,"dyndns-blog":y,"dyndns-free":y,"dyndns-home":y,
    "dyndns-ip":y,"dyndns-mail":y,"dyndns-office":y,"dyndns-pics":y,"dyndns-remote":y,"dyndns-server":y,"dyndns-web":y,"dyndns-wiki":y,"dyndns-work":y,blogdns:y,cechire:y,dnsalias:y,dnsdojo:y,doesntexist:y,dontexist:y,doomdns:y,"dyn-o-saur":y,dynalias:y,"est-a-la-maison":y,"est-a-la-masion":y,"est-le-patron":y,"est-mon-blogueur":y,"from-ak":y,"from-al":y,"from-ar":y,"from-ca":y,"from-ct":y,"from-dc":y,"from-de":y,"from-fl":y,"from-ga":y,"from-hi":y,"from-ia":y,"from-id":y,"from-il":y,"from-in":y,"from-ks":y,
    "from-ky":y,"from-ma":y,"from-md":y,"from-mi":y,"from-mn":y,"from-mo":y,"from-ms":y,"from-mt":y,"from-nc":y,"from-nd":y,"from-ne":y,"from-nh":y,"from-nj":y,"from-nm":y,"from-nv":y,"from-oh":y,"from-ok":y,"from-or":y,"from-pa":y,"from-pr":y,"from-ri":y,"from-sc":y,"from-sd":y,"from-tn":y,"from-tx":y,"from-ut":y,"from-va":y,"from-vt":y,"from-wa":y,"from-wi":y,"from-wv":y,"from-wy":y,getmyip:y,gotdns:y,"hobby-site":y,homelinux:y,homeunix:y,iamallama:y,"is-a-anarchist":y,"is-a-blogger":y,"is-a-bookkeeper":y,
    "is-a-bulls-fan":y,"is-a-caterer":y,"is-a-chef":y,"is-a-conservative":y,"is-a-cpa":y,"is-a-cubicle-slave":y,"is-a-democrat":y,"is-a-designer":y,"is-a-doctor":y,"is-a-financialadvisor":y,"is-a-geek":y,"is-a-green":y,"is-a-guru":y,"is-a-hard-worker":y,"is-a-hunter":y,"is-a-landscaper":y,"is-a-lawyer":y,"is-a-liberal":y,"is-a-libertarian":y,"is-a-llama":y,"is-a-musician":y,"is-a-nascarfan":y,"is-a-nurse":y,"is-a-painter":y,"is-a-personaltrainer":y,"is-a-photographer":y,"is-a-player":y,"is-a-republican":y,
    "is-a-rockstar":y,"is-a-socialist":y,"is-a-student":y,"is-a-teacher":y,"is-a-techie":y,"is-a-therapist":y,"is-an-accountant":y,"is-an-actor":y,"is-an-actress":y,"is-an-anarchist":y,"is-an-artist":y,"is-an-engineer":y,"is-an-entertainer":y,"is-certified":y,"is-gone":y,"is-into-anime":y,"is-into-cars":y,"is-into-cartoons":y,"is-into-games":y,"is-leet":y,"is-not-certified":y,"is-slick":y,"is-uberleet":y,"is-with-theband":y,"isa-geek":y,"isa-hockeynut":y,issmarterthanyou:y,"likes-pie":y,likescandy:y,
    "neat-url":y,"saves-the-whales":y,selfip:y,"sells-for-less":y,"sells-for-u":y,servebbs:y,"simple-url":y,"space-to-rent":y,"teaches-yoga":y,writesthisblog:y,ddnsfree:y,ddnsgeek:y,giize:y,gleeze:y,kozow:y,loseyourip:y,ooguy:y,theworkpc:y,mytuleap:y,evennode:{$:0,succ:{"eu-1":y,"eu-2":y,"eu-3":y,"eu-4":y,"us-1":y,"us-2":y,"us-3":y,"us-4":y}},fbsbx:J,"fastly-terrarium":y,"fastvps-server":y,mydobiss:y,firebaseapp:y,flynnhub:y,"freebox-os":y,freeboxos:y,githubusercontent:y,"0emm":B,appspot:y,blogspot:y,
    codespot:y,googleapis:y,googlecode:y,pagespeedmobilizer:y,publishproxy:y,withgoogle:y,withyoutube:y,herokuapp:y,herokussl:y,myravendb:y,pixolino:y,joyent:{$:0,succ:{cns:B}},lpusercontent:y,lmpm:L,linode:{$:0,succ:{members:y,nodebalancer:y}},barsycenter:y,barsyonline:y,miniserver:y,meteorapp:{$:2,succ:{eu:y}},bitballoon:y,netlify:y,"4u":y,nfshost:y,"001www":y,ddnslive:y,myiphost:y,blogsyte:y,ciscofreak:y,damnserver:y,ditchyourip:y,dnsiskinky:y,dynns:y,geekgalaxy:y,"health-carereform":y,homesecuritymac:y,
    homesecuritypc:y,myactivedirectory:y,mysecuritycamera:y,"net-freaks":y,onthewifi:y,point2this:y,quicksytes:y,securitytactics:y,serveexchange:y,servehumour:y,servep2p:y,servesarcasm:y,stufftoread:y,unusualperson:y,workisboring:y,"3utilities":y,ddnsking:y,myvnc:y,servebeer:y,servecounterstrike:y,serveftp:y,servegame:y,servehalflife:y,servehttp:y,serveirc:y,servemp3:y,servepics:y,servequake:y,operaunite:y,outsystemscloud:y,ownprovider:y,pgfog:y,pagefrontapp:y,gotpantheon:y,prgmr:{$:0,succ:{xen:y}},qa2:y,
    "dev-myqnapcloud":y,"alpha-myqnapcloud":y,myqnapcloud:y,quipelements:B,rackmaze:y,rhcloud:y,render:L,onrender:y,logoip:y,scrysec:y,"firewall-gateway":y,myshopblocks:y,"1kapp":y,appchizi:y,applinzi:y,sinaapp:y,vipsinaapp:y,"bounty-full":{$:2,succ:{alpha:y,beta:y}},"stackhero-network":y,stdlib:{$:0,succ:{api:y}},"temp-dns":y,dsmynas:y,familyds:y,thingdustdata:y,bloxcms:y,"townnews-staging":y,hk:y,wafflecell:y,remotewd:y,xnbay:{$:2,succ:{u2:y,"u2-local":y}},yolasite:y}},coop:w,cr:{$:1,succ:{ac:w,co:w,
    ed:w,fi:w,go:w,or:w,sa:w}},cu:{$:1,succ:{com:w,edu:w,org:w,net:w,gov:w,inf:w}},cv:z$1,cw:M,cx:{$:1,succ:{gov:w,ath:y,info:y}},cy:{$:1,succ:{ac:w,biz:w,com:z$1,ekloges:w,gov:w,ltd:w,name:w,net:w,org:w,parliament:w,press:w,pro:w,tm:w}},cz:{$:1,succ:{co:y,realm:y,e4:y,blogspot:y,metacentrum:{$:0,succ:{cloud:y,custom:y}},muni:{$:0,succ:{cloud:{$:0,succ:{flt:y,usr:y}}}}}},de:{$:1,succ:{bplaced:y,square7:y,com:y,cosidns:{$:0,succ:{dyn:y}},"dynamisches-dns":y,dnsupdater:y,"internet-dns":y,"l-o-g-i-n":y,dnshome:y,
    fuettertdasnetz:y,isteingeek:y,istmein:y,lebtimnetz:y,leitungsen:y,traeumtgerade:y,ddnss:{$:2,succ:{dyn:y,dyndns:y}},dyndns1:y,"dyn-ip24":y,"home-webserver":{$:2,succ:{dyn:y}},"myhome-server":y,goip:y,blogspot:y,"dyn-berlin":y,"in-berlin":y,"in-brb":y,"in-butter":y,"in-dsl":y,"in-vpn":y,"mein-iserv":y,"test-iserv":y,keymachine:y,"git-repos":y,"lcube-server":y,"svn-repos":y,barsy:y,logoip:y,"firewall-gateway":y,"my-gateway":y,"my-router":y,spdns:y,speedpartner:{$:0,succ:{customer:y}},"taifun-dns":y,
    "12hp":y,"2ix":y,"4lima":y,"lima-city":y,"dd-dns":y,"dray-dns":y,draydns:y,"dyn-vpn":y,dynvpn:y,"mein-vigor":y,"my-vigor":y,"my-wan":y,"syno-ds":y,"synology-diskstation":y,"synology-ds":y,uberspace:B,virtualuser:y,"virtual-user":y}},dj:w,dk:{$:1,succ:{biz:y,co:y,firm:y,reg:y,store:y,blogspot:y}},dm:D,"do":{$:1,succ:{art:w,com:w,edu:w,gob:w,gov:w,mil:w,net:w,org:w,sld:w,web:w}},dz:{$:1,succ:{com:w,org:w,net:w,gov:w,edu:w,asso:w,pol:w,art:w}},ec:{$:1,succ:{com:w,info:w,net:w,fin:w,k12:w,med:w,pro:w,
    org:w,edu:w,gov:w,gob:w,mil:w}},edu:{$:1,succ:{rit:{$:0,succ:{"git-pages":y}}}},ee:{$:1,succ:{edu:w,gov:w,riik:w,lib:w,med:w,com:z$1,pri:w,aip:w,org:w,fie:w}},eg:{$:1,succ:{com:z$1,edu:w,eun:w,gov:w,mil:w,name:w,net:w,org:w,sci:w}},er:C,es:{$:1,succ:{com:z$1,nom:w,org:w,gob:w,edu:w}},et:{$:1,succ:{com:w,gov:w,org:w,edu:w,biz:w,name:w,info:w,net:w}},eu:{$:1,succ:{mycd:y,cloudns:y,barsy:y,wellbeingzone:y,spdns:y,transurl:B,diskstation:y}},fi:{$:1,succ:{aland:w,dy:y,blogspot:y,"xn--hkkinen-5wa":y,"h\u00e4kkinen":y,
    iki:y}},fj:C,fk:C,fm:w,fo:w,fr:{$:1,succ:{asso:w,com:w,gouv:w,nom:w,prd:w,tm:w,aeroport:w,avocat:w,avoues:w,cci:w,chambagri:w,"chirurgiens-dentistes":w,"experts-comptables":w,"geometre-expert":w,greta:w,"huissier-justice":w,medecin:w,notaires:w,pharmacien:w,port:w,veterinaire:w,"fbx-os":y,fbxos:y,"freebox-os":y,freeboxos:y,blogspot:y,"on-web":y,"chirurgiens-dentistes-en-france":y}},ga:w,gb:w,gd:O,ge:{$:1,succ:{com:w,edu:w,gov:w,org:w,mil:w,net:w,pvt:w,nom:y}},gf:w,gg:{$:1,succ:{co:w,net:w,org:w,kaas:y,
    cya:y}},gh:{$:1,succ:{com:w,edu:w,gov:w,org:w,mil:w}},gi:{$:1,succ:{com:w,ltd:w,gov:w,mod:w,edu:w,org:w}},gl:{$:1,succ:{co:w,com:w,edu:w,net:w,org:w,biz:y,nom:y}},gm:w,gn:{$:1,succ:{ac:w,com:w,edu:w,gov:w,org:w,net:w}},gov:w,gp:{$:1,succ:{com:w,net:w,mobi:w,edu:w,org:w,asso:w}},gq:w,gr:{$:1,succ:{com:w,edu:w,net:w,org:w,gov:w,blogspot:y,nym:y}},gs:w,gt:{$:1,succ:{com:w,edu:w,gob:w,ind:w,mil:w,net:w,org:w,nom:y}},gu:{$:1,succ:{com:w,edu:w,gov:w,guam:w,info:w,net:w,org:w,web:w}},gw:w,gy:{$:1,succ:{co:w,
    com:w,edu:w,gov:w,net:w,org:w,nym:y}},hk:{$:1,succ:{com:w,edu:w,gov:w,idv:w,net:w,org:w,"xn--55qx5d":w,"\u516c\u53f8":w,"xn--wcvs22d":w,"\u6559\u80b2":w,"xn--lcvr32d":w,"\u654e\u80b2":w,"xn--mxtq1m":w,"\u653f\u5e9c":w,"xn--gmqw5a":w,"\u500b\u4eba":w,"xn--ciqpn":w,"\u4e2a\u4eba":w,"xn--gmq050i":w,"\u7b87\u4eba":w,"xn--zf0avx":w,"\u7db2\u7edc":w,"xn--io0a7i":w,"\u7f51\u7edc":w,"xn--mk0axi":w,"\u7ec4\u7e54":w,"xn--od0alg":w,"\u7db2\u7d61":w,"xn--od0aq3b":w,"\u7f51\u7d61":w,"xn--tn0ag":w,"\u7ec4\u7ec7":w,
    "xn--uc0atv":w,"\u7d44\u7e54":w,"xn--uc0ay4a":w,"\u7d44\u7ec7":w,blogspot:y,ltd:y,inc:y}},hm:w,hn:{$:1,succ:{com:w,edu:w,org:w,net:w,mil:w,gob:w,nom:y}},hr:{$:1,succ:{iz:w,from:w,name:w,com:w,blogspot:y,free:y}},ht:{$:1,succ:{com:w,shop:w,firm:w,info:w,adult:w,net:w,pro:w,org:w,med:w,art:w,coop:w,pol:w,asso:w,edu:w,rel:w,gouv:w,perso:w}},hu:{$:1,succ:{2E3:w,co:w,info:w,org:w,priv:w,sport:w,tm:w,agrar:w,bolt:w,casino:w,city:w,erotica:w,erotika:w,film:w,forum:w,games:w,hotel:w,ingatlan:w,jogasz:w,konyvelo:w,
    lakas:w,media:w,news:w,reklam:w,sex:w,shop:w,suli:w,szex:w,tozsde:w,utazas:w,video:w,blogspot:y}},id:{$:1,succ:{ac:w,biz:w,co:z$1,desa:w,go:w,mil:w,my:w,net:w,or:w,ponpes:w,sch:w,web:w,zone:y}},ie:P,il:{$:1,succ:{ac:w,co:z$1,gov:w,idf:w,k12:w,muni:w,net:w,org:w}},im:{$:1,succ:{ac:w,co:{$:1,succ:{ltd:w,plc:w}},com:w,net:w,org:w,tt:w,tv:w,ro:y,nom:y}},"in":{$:1,succ:{co:w,firm:w,net:w,org:w,gen:w,ind:w,nic:w,ac:w,edu:w,res:w,gov:w,mil:w,cloudns:y,blogspot:y,barsy:y}},info:{$:1,succ:{cloudns:y,"dynamic-dns":y,
    dyndns:y,"barrel-of-knowledge":y,"barrell-of-knowledge":y,"for-our":y,"groks-the":y,"groks-this":y,"here-for-more":y,knowsitall:y,selfip:y,webhop:y,barsy:y,mayfirst:y,forumz:y,nsupdate:y,dvrcam:y,ilovecollege:y,"no-ip":y,"v-info":y}},"int":{$:1,succ:{eu:w}},io:{$:1,succ:{2038:y,com:w,apigee:y,"b-data":y,backplaneapp:y,banzaicloud:L,boxfuse:y,browsersafetymark:y,bigv:{$:0,succ:{uk0:y}},cleverapps:y,dedyn:y,drud:y,definima:y,enonic:{$:2,succ:{customer:y}},github:y,gitlab:y,"hasura-app":y,moonscale:B,
    loginline:y,barsy:y,azurecontainer:y,ngrok:y,nodeart:{$:0,succ:{stage:y}},nodum:y,nid:y,pantheonsite:y,dyn53:y,protonet:y,vaporcloud:y,"on-rio":B,readthedocs:y,resindevice:y,resinstaging:{$:0,succ:{devices:y}},hzc:y,sandcats:y,s5y:B,shiftedit:y,"mo-siemens":y,lair:J,stolos:B,spacekit:y,utwente:y,applicationcloud:y,scapp:y,telebit:y,thingdust:{$:0,succ:{dev:Q,disrec:Q,prod:Q,testing:Q}},wedeploy:y,basicserver:y,virtualserver:y}},iq:x,ir:{$:1,succ:{ac:w,co:w,gov:w,id:w,net:w,org:w,sch:w,"xn--mgba3a4f16a":w,
    "\u0627\u06cc\u0631\u0627\u0646":w,"xn--mgba3a4fra":w,"\u0627\u064a\u0631\u0627\u0646":w}},is:{$:1,succ:{net:w,com:w,edu:w,gov:w,org:w,"int":w,cupcake:y,blogspot:y}},it:{$:1,succ:{gov:w,edu:w,abr:w,abruzzo:w,"aosta-valley":w,aostavalley:w,bas:w,basilicata:w,cal:w,calabria:w,cam:w,campania:w,"emilia-romagna":w,emiliaromagna:w,emr:w,"friuli-v-giulia":w,"friuli-ve-giulia":w,"friuli-vegiulia":w,"friuli-venezia-giulia":w,"friuli-veneziagiulia":w,"friuli-vgiulia":w,"friuliv-giulia":w,"friulive-giulia":w,
    friulivegiulia:w,"friulivenezia-giulia":w,friuliveneziagiulia:w,friulivgiulia:w,fvg:w,laz:w,lazio:w,lig:w,liguria:w,lom:w,lombardia:w,lombardy:w,lucania:w,mar:w,marche:w,mol:w,molise:w,piedmont:w,piemonte:w,pmn:w,pug:w,puglia:w,sar:w,sardegna:w,sardinia:w,sic:w,sicilia:w,sicily:w,taa:w,tos:w,toscana:w,"trentin-sud-tirol":w,"xn--trentin-sd-tirol-rzb":w,"trentin-s\u00fcd-tirol":w,"trentin-sudtirol":w,"xn--trentin-sdtirol-7vb":w,"trentin-s\u00fcdtirol":w,"trentin-sued-tirol":w,"trentin-suedtirol":w,
    "trentino-a-adige":w,"trentino-aadige":w,"trentino-alto-adige":w,"trentino-altoadige":w,"trentino-s-tirol":w,"trentino-stirol":w,"trentino-sud-tirol":w,"xn--trentino-sd-tirol-c3b":w,"trentino-s\u00fcd-tirol":w,"trentino-sudtirol":w,"xn--trentino-sdtirol-szb":w,"trentino-s\u00fcdtirol":w,"trentino-sued-tirol":w,"trentino-suedtirol":w,trentino:w,"trentinoa-adige":w,trentinoaadige:w,"trentinoalto-adige":w,trentinoaltoadige:w,"trentinos-tirol":w,trentinostirol:w,"trentinosud-tirol":w,"xn--trentinosd-tirol-rzb":w,
    "trentinos\u00fcd-tirol":w,trentinosudtirol:w,"xn--trentinosdtirol-7vb":w,"trentinos\u00fcdtirol":w,"trentinosued-tirol":w,trentinosuedtirol:w,"trentinsud-tirol":w,"xn--trentinsd-tirol-6vb":w,"trentins\u00fcd-tirol":w,trentinsudtirol:w,"xn--trentinsdtirol-nsb":w,"trentins\u00fcdtirol":w,"trentinsued-tirol":w,trentinsuedtirol:w,tuscany:w,umb:w,umbria:w,"val-d-aosta":w,"val-daosta":w,"vald-aosta":w,valdaosta:w,"valle-aosta":w,"valle-d-aosta":w,"valle-daosta":w,valleaosta:w,"valled-aosta":w,valledaosta:w,
    "vallee-aoste":w,"xn--valle-aoste-ebb":w,"vall\u00e9e-aoste":w,"vallee-d-aoste":w,"xn--valle-d-aoste-ehb":w,"vall\u00e9e-d-aoste":w,valleeaoste:w,"xn--valleaoste-e7a":w,"vall\u00e9eaoste":w,valleedaoste:w,"xn--valledaoste-ebb":w,"vall\u00e9edaoste":w,vao:w,vda:w,ven:w,veneto:w,ag:w,agrigento:w,al:w,alessandria:w,"alto-adige":w,altoadige:w,an:w,ancona:w,"andria-barletta-trani":w,"andria-trani-barletta":w,andriabarlettatrani:w,andriatranibarletta:w,ao:w,aosta:w,aoste:w,ap:w,aq:w,aquila:w,ar:w,arezzo:w,
    "ascoli-piceno":w,ascolipiceno:w,asti:w,at:w,av:w,avellino:w,ba:w,"balsan-sudtirol":w,"xn--balsan-sdtirol-nsb":w,"balsan-s\u00fcdtirol":w,"balsan-suedtirol":w,balsan:w,bari:w,"barletta-trani-andria":w,barlettatraniandria:w,belluno:w,benevento:w,bergamo:w,bg:w,bi:w,biella:w,bl:w,bn:w,bo:w,bologna:w,"bolzano-altoadige":w,bolzano:w,"bozen-sudtirol":w,"xn--bozen-sdtirol-2ob":w,"bozen-s\u00fcdtirol":w,"bozen-suedtirol":w,bozen:w,br:w,brescia:w,brindisi:w,bs:w,bt:w,"bulsan-sudtirol":w,"xn--bulsan-sdtirol-nsb":w,
    "bulsan-s\u00fcdtirol":w,"bulsan-suedtirol":w,bulsan:w,bz:w,ca:w,cagliari:w,caltanissetta:w,"campidano-medio":w,campidanomedio:w,campobasso:w,"carbonia-iglesias":w,carboniaiglesias:w,"carrara-massa":w,carraramassa:w,caserta:w,catania:w,catanzaro:w,cb:w,ce:w,"cesena-forli":w,"xn--cesena-forl-mcb":w,"cesena-forl\u00ec":w,cesenaforli:w,"xn--cesenaforl-i8a":w,"cesenaforl\u00ec":w,ch:w,chieti:w,ci:w,cl:w,cn:w,co:w,como:w,cosenza:w,cr:w,cremona:w,crotone:w,cs:w,ct:w,cuneo:w,cz:w,"dell-ogliastra":w,dellogliastra:w,
    en:w,enna:w,fc:w,fe:w,fermo:w,ferrara:w,fg:w,fi:w,firenze:w,florence:w,fm:w,foggia:w,"forli-cesena":w,"xn--forl-cesena-fcb":w,"forl\u00ec-cesena":w,forlicesena:w,"xn--forlcesena-c8a":w,"forl\u00eccesena":w,fr:w,frosinone:w,ge:w,genoa:w,genova:w,go:w,gorizia:w,gr:w,grosseto:w,"iglesias-carbonia":w,iglesiascarbonia:w,im:w,imperia:w,is:w,isernia:w,kr:w,"la-spezia":w,laquila:w,laspezia:w,latina:w,lc:w,le:w,lecce:w,lecco:w,li:w,livorno:w,lo:w,lodi:w,lt:w,lu:w,lucca:w,macerata:w,mantova:w,"massa-carrara":w,
    massacarrara:w,matera:w,mb:w,mc:w,me:w,"medio-campidano":w,mediocampidano:w,messina:w,mi:w,milan:w,milano:w,mn:w,mo:w,modena:w,"monza-brianza":w,"monza-e-della-brianza":w,monza:w,monzabrianza:w,monzaebrianza:w,monzaedellabrianza:w,ms:w,mt:w,na:w,naples:w,napoli:w,no:w,novara:w,nu:w,nuoro:w,og:w,ogliastra:w,"olbia-tempio":w,olbiatempio:w,or:w,oristano:w,ot:w,pa:w,padova:w,padua:w,palermo:w,parma:w,pavia:w,pc:w,pd:w,pe:w,perugia:w,"pesaro-urbino":w,pesarourbino:w,pescara:w,pg:w,pi:w,piacenza:w,pisa:w,
    pistoia:w,pn:w,po:w,pordenone:w,potenza:w,pr:w,prato:w,pt:w,pu:w,pv:w,pz:w,ra:w,ragusa:w,ravenna:w,rc:w,re:w,"reggio-calabria":w,"reggio-emilia":w,reggiocalabria:w,reggioemilia:w,rg:w,ri:w,rieti:w,rimini:w,rm:w,rn:w,ro:w,roma:w,rome:w,rovigo:w,sa:w,salerno:w,sassari:w,savona:w,si:w,siena:w,siracusa:w,so:w,sondrio:w,sp:w,sr:w,ss:w,suedtirol:w,"xn--sdtirol-n2a":w,"s\u00fcdtirol":w,sv:w,ta:w,taranto:w,te:w,"tempio-olbia":w,tempioolbia:w,teramo:w,terni:w,tn:w,to:w,torino:w,tp:w,tr:w,"trani-andria-barletta":w,
    "trani-barletta-andria":w,traniandriabarletta:w,tranibarlettaandria:w,trapani:w,trento:w,treviso:w,trieste:w,ts:w,turin:w,tv:w,ud:w,udine:w,"urbino-pesaro":w,urbinopesaro:w,va:w,varese:w,vb:w,vc:w,ve:w,venezia:w,venice:w,verbania:w,vercelli:w,verona:w,vi:w,"vibo-valentia":w,vibovalentia:w,vicenza:w,viterbo:w,vr:w,vs:w,vt:w,vv:w,blogspot:y,"16-b":y,"32-b":y,"64-b":y,syncloud:y}},je:{$:1,succ:{co:w,net:w,org:w}},jm:C,jo:{$:1,succ:{com:w,org:w,net:w,edu:w,sch:w,gov:w,mil:w,name:w}},jobs:w,jp:{$:1,succ:{ac:w,
    ad:w,co:w,ed:w,go:w,gr:w,lg:w,ne:{$:1,succ:{gehirn:y}},or:w,aichi:{$:1,succ:{aisai:w,ama:w,anjo:w,asuke:w,chiryu:w,chita:w,fuso:w,gamagori:w,handa:w,hazu:w,hekinan:w,higashiura:w,ichinomiya:w,inazawa:w,inuyama:w,isshiki:w,iwakura:w,kanie:w,kariya:w,kasugai:w,kira:w,kiyosu:w,komaki:w,konan:w,kota:w,mihama:w,miyoshi:w,nishio:w,nisshin:w,obu:w,oguchi:w,oharu:w,okazaki:w,owariasahi:w,seto:w,shikatsu:w,shinshiro:w,shitara:w,tahara:w,takahama:w,tobishima:w,toei:w,togo:w,tokai:w,tokoname:w,toyoake:w,toyohashi:w,
    toyokawa:w,toyone:w,toyota:w,tsushima:w,yatomi:w}},akita:{$:1,succ:{akita:w,daisen:w,fujisato:w,gojome:w,hachirogata:w,happou:w,higashinaruse:w,honjo:w,honjyo:w,ikawa:w,kamikoani:w,kamioka:w,katagami:w,kazuno:w,kitaakita:w,kosaka:w,kyowa:w,misato:w,mitane:w,moriyoshi:w,nikaho:w,noshiro:w,odate:w,oga:w,ogata:w,semboku:w,yokote:w,yurihonjo:w}},aomori:{$:1,succ:{aomori:w,gonohe:w,hachinohe:w,hashikami:w,hiranai:w,hirosaki:w,itayanagi:w,kuroishi:w,misawa:w,mutsu:w,nakadomari:w,noheji:w,oirase:w,owani:w,
    rokunohe:w,sannohe:w,shichinohe:w,shingo:w,takko:w,towada:w,tsugaru:w,tsuruta:w}},chiba:{$:1,succ:{abiko:w,asahi:w,chonan:w,chosei:w,choshi:w,chuo:w,funabashi:w,futtsu:w,hanamigawa:w,ichihara:w,ichikawa:w,ichinomiya:w,inzai:w,isumi:w,kamagaya:w,kamogawa:w,kashiwa:w,katori:w,katsuura:w,kimitsu:w,kisarazu:w,kozaki:w,kujukuri:w,kyonan:w,matsudo:w,midori:w,mihama:w,minamiboso:w,mobara:w,mutsuzawa:w,nagara:w,nagareyama:w,narashino:w,narita:w,noda:w,oamishirasato:w,omigawa:w,onjuku:w,otaki:w,sakae:w,sakura:w,
    shimofusa:w,shirako:w,shiroi:w,shisui:w,sodegaura:w,sosa:w,tako:w,tateyama:w,togane:w,tohnosho:w,tomisato:w,urayasu:w,yachimata:w,yachiyo:w,yokaichiba:w,yokoshibahikari:w,yotsukaido:w}},ehime:{$:1,succ:{ainan:w,honai:w,ikata:w,imabari:w,iyo:w,kamijima:w,kihoku:w,kumakogen:w,masaki:w,matsuno:w,matsuyama:w,namikata:w,niihama:w,ozu:w,saijo:w,seiyo:w,shikokuchuo:w,tobe:w,toon:w,uchiko:w,uwajima:w,yawatahama:w}},fukui:{$:1,succ:{echizen:w,eiheiji:w,fukui:w,ikeda:w,katsuyama:w,mihama:w,minamiechizen:w,
    obama:w,ohi:w,ono:w,sabae:w,sakai:w,takahama:w,tsuruga:w,wakasa:w}},fukuoka:{$:1,succ:{ashiya:w,buzen:w,chikugo:w,chikuho:w,chikujo:w,chikushino:w,chikuzen:w,chuo:w,dazaifu:w,fukuchi:w,hakata:w,higashi:w,hirokawa:w,hisayama:w,iizuka:w,inatsuki:w,kaho:w,kasuga:w,kasuya:w,kawara:w,keisen:w,koga:w,kurate:w,kurogi:w,kurume:w,minami:w,miyako:w,miyama:w,miyawaka:w,mizumaki:w,munakata:w,nakagawa:w,nakama:w,nishi:w,nogata:w,ogori:w,okagaki:w,okawa:w,oki:w,omuta:w,onga:w,onojo:w,oto:w,saigawa:w,sasaguri:w,
    shingu:w,shinyoshitomi:w,shonai:w,soeda:w,sue:w,tachiarai:w,tagawa:w,takata:w,toho:w,toyotsu:w,tsuiki:w,ukiha:w,umi:w,usui:w,yamada:w,yame:w,yanagawa:w,yukuhashi:w}},fukushima:{$:1,succ:{aizubange:w,aizumisato:w,aizuwakamatsu:w,asakawa:w,bandai:w,date:w,fukushima:w,furudono:w,futaba:w,hanawa:w,higashi:w,hirata:w,hirono:w,iitate:w,inawashiro:w,ishikawa:w,iwaki:w,izumizaki:w,kagamiishi:w,kaneyama:w,kawamata:w,kitakata:w,kitashiobara:w,koori:w,koriyama:w,kunimi:w,miharu:w,mishima:w,namie:w,nango:w,nishiaizu:w,
    nishigo:w,okuma:w,omotego:w,ono:w,otama:w,samegawa:w,shimogo:w,shirakawa:w,showa:w,soma:w,sukagawa:w,taishin:w,tamakawa:w,tanagura:w,tenei:w,yabuki:w,yamato:w,yamatsuri:w,yanaizu:w,yugawa:w}},gifu:{$:1,succ:{anpachi:w,ena:w,gifu:w,ginan:w,godo:w,gujo:w,hashima:w,hichiso:w,hida:w,higashishirakawa:w,ibigawa:w,ikeda:w,kakamigahara:w,kani:w,kasahara:w,kasamatsu:w,kawaue:w,kitagata:w,mino:w,minokamo:w,mitake:w,mizunami:w,motosu:w,nakatsugawa:w,ogaki:w,sakahogi:w,seki:w,sekigahara:w,shirakawa:w,tajimi:w,
    takayama:w,tarui:w,toki:w,tomika:w,wanouchi:w,yamagata:w,yaotsu:w,yoro:w}},gunma:{$:1,succ:{annaka:w,chiyoda:w,fujioka:w,higashiagatsuma:w,isesaki:w,itakura:w,kanna:w,kanra:w,katashina:w,kawaba:w,kiryu:w,kusatsu:w,maebashi:w,meiwa:w,midori:w,minakami:w,naganohara:w,nakanojo:w,nanmoku:w,numata:w,oizumi:w,ora:w,ota:w,shibukawa:w,shimonita:w,shinto:w,showa:w,takasaki:w,takayama:w,tamamura:w,tatebayashi:w,tomioka:w,tsukiyono:w,tsumagoi:w,ueno:w,yoshioka:w}},hiroshima:{$:1,succ:{asaminami:w,daiwa:w,etajima:w,
    fuchu:w,fukuyama:w,hatsukaichi:w,higashihiroshima:w,hongo:w,jinsekikogen:w,kaita:w,kui:w,kumano:w,kure:w,mihara:w,miyoshi:w,naka:w,onomichi:w,osakikamijima:w,otake:w,saka:w,sera:w,seranishi:w,shinichi:w,shobara:w,takehara:w}},hokkaido:{$:1,succ:{abashiri:w,abira:w,aibetsu:w,akabira:w,akkeshi:w,asahikawa:w,ashibetsu:w,ashoro:w,assabu:w,atsuma:w,bibai:w,biei:w,bifuka:w,bihoro:w,biratori:w,chippubetsu:w,chitose:w,date:w,ebetsu:w,embetsu:w,eniwa:w,erimo:w,esan:w,esashi:w,fukagawa:w,fukushima:w,furano:w,
    furubira:w,haboro:w,hakodate:w,hamatonbetsu:w,hidaka:w,higashikagura:w,higashikawa:w,hiroo:w,hokuryu:w,hokuto:w,honbetsu:w,horokanai:w,horonobe:w,ikeda:w,imakane:w,ishikari:w,iwamizawa:w,iwanai:w,kamifurano:w,kamikawa:w,kamishihoro:w,kamisunagawa:w,kamoenai:w,kayabe:w,kembuchi:w,kikonai:w,kimobetsu:w,kitahiroshima:w,kitami:w,kiyosato:w,koshimizu:w,kunneppu:w,kuriyama:w,kuromatsunai:w,kushiro:w,kutchan:w,kyowa:w,mashike:w,matsumae:w,mikasa:w,minamifurano:w,mombetsu:w,moseushi:w,mukawa:w,muroran:w,
    naie:w,nakagawa:w,nakasatsunai:w,nakatombetsu:w,nanae:w,nanporo:w,nayoro:w,nemuro:w,niikappu:w,niki:w,nishiokoppe:w,noboribetsu:w,numata:w,obihiro:w,obira:w,oketo:w,okoppe:w,otaru:w,otobe:w,otofuke:w,otoineppu:w,oumu:w,ozora:w,pippu:w,rankoshi:w,rebun:w,rikubetsu:w,rishiri:w,rishirifuji:w,saroma:w,sarufutsu:w,shakotan:w,shari:w,shibecha:w,shibetsu:w,shikabe:w,shikaoi:w,shimamaki:w,shimizu:w,shimokawa:w,shinshinotsu:w,shintoku:w,shiranuka:w,shiraoi:w,shiriuchi:w,sobetsu:w,sunagawa:w,taiki:w,takasu:w,
    takikawa:w,takinoue:w,teshikaga:w,tobetsu:w,tohma:w,tomakomai:w,tomari:w,toya:w,toyako:w,toyotomi:w,toyoura:w,tsubetsu:w,tsukigata:w,urakawa:w,urausu:w,uryu:w,utashinai:w,wakkanai:w,wassamu:w,yakumo:w,yoichi:w}},hyogo:{$:1,succ:{aioi:w,akashi:w,ako:w,amagasaki:w,aogaki:w,asago:w,ashiya:w,awaji:w,fukusaki:w,goshiki:w,harima:w,himeji:w,ichikawa:w,inagawa:w,itami:w,kakogawa:w,kamigori:w,kamikawa:w,kasai:w,kasuga:w,kawanishi:w,miki:w,minamiawaji:w,nishinomiya:w,nishiwaki:w,ono:w,sanda:w,sannan:w,sasayama:w,
    sayo:w,shingu:w,shinonsen:w,shiso:w,sumoto:w,taishi:w,taka:w,takarazuka:w,takasago:w,takino:w,tamba:w,tatsuno:w,toyooka:w,yabu:w,yashiro:w,yoka:w,yokawa:w}},ibaraki:{$:1,succ:{ami:w,asahi:w,bando:w,chikusei:w,daigo:w,fujishiro:w,hitachi:w,hitachinaka:w,hitachiomiya:w,hitachiota:w,ibaraki:w,ina:w,inashiki:w,itako:w,iwama:w,joso:w,kamisu:w,kasama:w,kashima:w,kasumigaura:w,koga:w,miho:w,mito:w,moriya:w,naka:w,namegata:w,oarai:w,ogawa:w,omitama:w,ryugasaki:w,sakai:w,sakuragawa:w,shimodate:w,shimotsuma:w,
    shirosato:w,sowa:w,suifu:w,takahagi:w,tamatsukuri:w,tokai:w,tomobe:w,tone:w,toride:w,tsuchiura:w,tsukuba:w,uchihara:w,ushiku:w,yachiyo:w,yamagata:w,yawara:w,yuki:w}},ishikawa:{$:1,succ:{anamizu:w,hakui:w,hakusan:w,kaga:w,kahoku:w,kanazawa:w,kawakita:w,komatsu:w,nakanoto:w,nanao:w,nomi:w,nonoichi:w,noto:w,shika:w,suzu:w,tsubata:w,tsurugi:w,uchinada:w,wajima:w}},iwate:{$:1,succ:{fudai:w,fujisawa:w,hanamaki:w,hiraizumi:w,hirono:w,ichinohe:w,ichinoseki:w,iwaizumi:w,iwate:w,joboji:w,kamaishi:w,kanegasaki:w,
    karumai:w,kawai:w,kitakami:w,kuji:w,kunohe:w,kuzumaki:w,miyako:w,mizusawa:w,morioka:w,ninohe:w,noda:w,ofunato:w,oshu:w,otsuchi:w,rikuzentakata:w,shiwa:w,shizukuishi:w,sumita:w,tanohata:w,tono:w,yahaba:w,yamada:w}},kagawa:{$:1,succ:{ayagawa:w,higashikagawa:w,kanonji:w,kotohira:w,manno:w,marugame:w,mitoyo:w,naoshima:w,sanuki:w,tadotsu:w,takamatsu:w,tonosho:w,uchinomi:w,utazu:w,zentsuji:w}},kagoshima:{$:1,succ:{akune:w,amami:w,hioki:w,isa:w,isen:w,izumi:w,kagoshima:w,kanoya:w,kawanabe:w,kinko:w,kouyama:w,
    makurazaki:w,matsumoto:w,minamitane:w,nakatane:w,nishinoomote:w,satsumasendai:w,soo:w,tarumizu:w,yusui:w}},kanagawa:{$:1,succ:{aikawa:w,atsugi:w,ayase:w,chigasaki:w,ebina:w,fujisawa:w,hadano:w,hakone:w,hiratsuka:w,isehara:w,kaisei:w,kamakura:w,kiyokawa:w,matsuda:w,minamiashigara:w,miura:w,nakai:w,ninomiya:w,odawara:w,oi:w,oiso:w,sagamihara:w,samukawa:w,tsukui:w,yamakita:w,yamato:w,yokosuka:w,yugawara:w,zama:w,zushi:w}},kochi:{$:1,succ:{aki:w,geisei:w,hidaka:w,higashitsuno:w,ino:w,kagami:w,kami:w,
    kitagawa:w,kochi:w,mihara:w,motoyama:w,muroto:w,nahari:w,nakamura:w,nankoku:w,nishitosa:w,niyodogawa:w,ochi:w,okawa:w,otoyo:w,otsuki:w,sakawa:w,sukumo:w,susaki:w,tosa:w,tosashimizu:w,toyo:w,tsuno:w,umaji:w,yasuda:w,yusuhara:w}},kumamoto:{$:1,succ:{amakusa:w,arao:w,aso:w,choyo:w,gyokuto:w,kamiamakusa:w,kikuchi:w,kumamoto:w,mashiki:w,mifune:w,minamata:w,minamioguni:w,nagasu:w,nishihara:w,oguni:w,ozu:w,sumoto:w,takamori:w,uki:w,uto:w,yamaga:w,yamato:w,yatsushiro:w}},kyoto:{$:1,succ:{ayabe:w,fukuchiyama:w,
    higashiyama:w,ide:w,ine:w,joyo:w,kameoka:w,kamo:w,kita:w,kizu:w,kumiyama:w,kyotamba:w,kyotanabe:w,kyotango:w,maizuru:w,minami:w,minamiyamashiro:w,miyazu:w,muko:w,nagaokakyo:w,nakagyo:w,nantan:w,oyamazaki:w,sakyo:w,seika:w,tanabe:w,uji:w,ujitawara:w,wazuka:w,yamashina:w,yawata:w}},mie:{$:1,succ:{asahi:w,inabe:w,ise:w,kameyama:w,kawagoe:w,kiho:w,kisosaki:w,kiwa:w,komono:w,kumano:w,kuwana:w,matsusaka:w,meiwa:w,mihama:w,minamiise:w,misugi:w,miyama:w,nabari:w,shima:w,suzuka:w,tado:w,taiki:w,taki:w,tamaki:w,
    toba:w,tsu:w,udono:w,ureshino:w,watarai:w,yokkaichi:w}},miyagi:{$:1,succ:{furukawa:w,higashimatsushima:w,ishinomaki:w,iwanuma:w,kakuda:w,kami:w,kawasaki:w,marumori:w,matsushima:w,minamisanriku:w,misato:w,murata:w,natori:w,ogawara:w,ohira:w,onagawa:w,osaki:w,rifu:w,semine:w,shibata:w,shichikashuku:w,shikama:w,shiogama:w,shiroishi:w,tagajo:w,taiwa:w,tome:w,tomiya:w,wakuya:w,watari:w,yamamoto:w,zao:w}},miyazaki:{$:1,succ:{aya:w,ebino:w,gokase:w,hyuga:w,kadogawa:w,kawaminami:w,kijo:w,kitagawa:w,kitakata:w,
    kitaura:w,kobayashi:w,kunitomi:w,kushima:w,mimata:w,miyakonojo:w,miyazaki:w,morotsuka:w,nichinan:w,nishimera:w,nobeoka:w,saito:w,shiiba:w,shintomi:w,takaharu:w,takanabe:w,takazaki:w,tsuno:w}},nagano:{$:1,succ:{achi:w,agematsu:w,anan:w,aoki:w,asahi:w,azumino:w,chikuhoku:w,chikuma:w,chino:w,fujimi:w,hakuba:w,hara:w,hiraya:w,iida:w,iijima:w,iiyama:w,iizuna:w,ikeda:w,ikusaka:w,ina:w,karuizawa:w,kawakami:w,kiso:w,kisofukushima:w,kitaaiki:w,komagane:w,komoro:w,matsukawa:w,matsumoto:w,miasa:w,minamiaiki:w,
    minamimaki:w,minamiminowa:w,minowa:w,miyada:w,miyota:w,mochizuki:w,nagano:w,nagawa:w,nagiso:w,nakagawa:w,nakano:w,nozawaonsen:w,obuse:w,ogawa:w,okaya:w,omachi:w,omi:w,ookuwa:w,ooshika:w,otaki:w,otari:w,sakae:w,sakaki:w,saku:w,sakuho:w,shimosuwa:w,shinanomachi:w,shiojiri:w,suwa:w,suzaka:w,takagi:w,takamori:w,takayama:w,tateshina:w,tatsuno:w,togakushi:w,togura:w,tomi:w,ueda:w,wada:w,yamagata:w,yamanouchi:w,yasaka:w,yasuoka:w}},nagasaki:{$:1,succ:{chijiwa:w,futsu:w,"goto":w,hasami:w,hirado:w,iki:w,isahaya:w,
    kawatana:w,kuchinotsu:w,matsuura:w,nagasaki:w,obama:w,omura:w,oseto:w,saikai:w,sasebo:w,seihi:w,shimabara:w,shinkamigoto:w,togitsu:w,tsushima:w,unzen:w}},nara:{$:1,succ:{ando:w,gose:w,heguri:w,higashiyoshino:w,ikaruga:w,ikoma:w,kamikitayama:w,kanmaki:w,kashiba:w,kashihara:w,katsuragi:w,kawai:w,kawakami:w,kawanishi:w,koryo:w,kurotaki:w,mitsue:w,miyake:w,nara:w,nosegawa:w,oji:w,ouda:w,oyodo:w,sakurai:w,sango:w,shimoichi:w,shimokitayama:w,shinjo:w,soni:w,takatori:w,tawaramoto:w,tenkawa:w,tenri:w,uda:w,
    yamatokoriyama:w,yamatotakada:w,yamazoe:w,yoshino:w}},niigata:{$:1,succ:{aga:w,agano:w,gosen:w,itoigawa:w,izumozaki:w,joetsu:w,kamo:w,kariwa:w,kashiwazaki:w,minamiuonuma:w,mitsuke:w,muika:w,murakami:w,myoko:w,nagaoka:w,niigata:w,ojiya:w,omi:w,sado:w,sanjo:w,seiro:w,seirou:w,sekikawa:w,shibata:w,tagami:w,tainai:w,tochio:w,tokamachi:w,tsubame:w,tsunan:w,uonuma:w,yahiko:w,yoita:w,yuzawa:w}},oita:{$:1,succ:{beppu:w,bungoono:w,bungotakada:w,hasama:w,hiji:w,himeshima:w,hita:w,kamitsue:w,kokonoe:w,kuju:w,
    kunisaki:w,kusu:w,oita:w,saiki:w,taketa:w,tsukumi:w,usa:w,usuki:w,yufu:w}},okayama:{$:1,succ:{akaiwa:w,asakuchi:w,bizen:w,hayashima:w,ibara:w,kagamino:w,kasaoka:w,kibichuo:w,kumenan:w,kurashiki:w,maniwa:w,misaki:w,nagi:w,niimi:w,nishiawakura:w,okayama:w,satosho:w,setouchi:w,shinjo:w,shoo:w,soja:w,takahashi:w,tamano:w,tsuyama:w,wake:w,yakage:w}},okinawa:{$:1,succ:{aguni:w,ginowan:w,ginoza:w,gushikami:w,haebaru:w,higashi:w,hirara:w,iheya:w,ishigaki:w,ishikawa:w,itoman:w,izena:w,kadena:w,kin:w,kitadaito:w,
    kitanakagusuku:w,kumejima:w,kunigami:w,minamidaito:w,motobu:w,nago:w,naha:w,nakagusuku:w,nakijin:w,nanjo:w,nishihara:w,ogimi:w,okinawa:w,onna:w,shimoji:w,taketomi:w,tarama:w,tokashiki:w,tomigusuku:w,tonaki:w,urasoe:w,uruma:w,yaese:w,yomitan:w,yonabaru:w,yonaguni:w,zamami:w}},osaka:{$:1,succ:{abeno:w,chihayaakasaka:w,chuo:w,daito:w,fujiidera:w,habikino:w,hannan:w,higashiosaka:w,higashisumiyoshi:w,higashiyodogawa:w,hirakata:w,ibaraki:w,ikeda:w,izumi:w,izumiotsu:w,izumisano:w,kadoma:w,kaizuka:w,kanan:w,
    kashiwara:w,katano:w,kawachinagano:w,kishiwada:w,kita:w,kumatori:w,matsubara:w,minato:w,minoh:w,misaki:w,moriguchi:w,neyagawa:w,nishi:w,nose:w,osakasayama:w,sakai:w,sayama:w,sennan:w,settsu:w,shijonawate:w,shimamoto:w,suita:w,tadaoka:w,taishi:w,tajiri:w,takaishi:w,takatsuki:w,tondabayashi:w,toyonaka:w,toyono:w,yao:w}},saga:{$:1,succ:{ariake:w,arita:w,fukudomi:w,genkai:w,hamatama:w,hizen:w,imari:w,kamimine:w,kanzaki:w,karatsu:w,kashima:w,kitagata:w,kitahata:w,kiyama:w,kouhoku:w,kyuragi:w,nishiarita:w,
    ogi:w,omachi:w,ouchi:w,saga:w,shiroishi:w,taku:w,tara:w,tosu:w,yoshinogari:w}},saitama:{$:1,succ:{arakawa:w,asaka:w,chichibu:w,fujimi:w,fujimino:w,fukaya:w,hanno:w,hanyu:w,hasuda:w,hatogaya:w,hatoyama:w,hidaka:w,higashichichibu:w,higashimatsuyama:w,honjo:w,ina:w,iruma:w,iwatsuki:w,kamiizumi:w,kamikawa:w,kamisato:w,kasukabe:w,kawagoe:w,kawaguchi:w,kawajima:w,kazo:w,kitamoto:w,koshigaya:w,kounosu:w,kuki:w,kumagaya:w,matsubushi:w,minano:w,misato:w,miyashiro:w,miyoshi:w,moroyama:w,nagatoro:w,namegawa:w,
    niiza:w,ogano:w,ogawa:w,ogose:w,okegawa:w,omiya:w,otaki:w,ranzan:w,ryokami:w,saitama:w,sakado:w,satte:w,sayama:w,shiki:w,shiraoka:w,soka:w,sugito:w,toda:w,tokigawa:w,tokorozawa:w,tsurugashima:w,urawa:w,warabi:w,yashio:w,yokoze:w,yono:w,yorii:w,yoshida:w,yoshikawa:w,yoshimi:w}},shiga:{$:1,succ:{aisho:w,gamo:w,higashiomi:w,hikone:w,koka:w,konan:w,kosei:w,koto:w,kusatsu:w,maibara:w,moriyama:w,nagahama:w,nishiazai:w,notogawa:w,omihachiman:w,otsu:w,ritto:w,ryuoh:w,takashima:w,takatsuki:w,torahime:w,toyosato:w,
    yasu:w}},shimane:{$:1,succ:{akagi:w,ama:w,gotsu:w,hamada:w,higashiizumo:w,hikawa:w,hikimi:w,izumo:w,kakinoki:w,masuda:w,matsue:w,misato:w,nishinoshima:w,ohda:w,okinoshima:w,okuizumo:w,shimane:w,tamayu:w,tsuwano:w,unnan:w,yakumo:w,yasugi:w,yatsuka:w}},shizuoka:{$:1,succ:{arai:w,atami:w,fuji:w,fujieda:w,fujikawa:w,fujinomiya:w,fukuroi:w,gotemba:w,haibara:w,hamamatsu:w,higashiizu:w,ito:w,iwata:w,izu:w,izunokuni:w,kakegawa:w,kannami:w,kawanehon:w,kawazu:w,kikugawa:w,kosai:w,makinohara:w,matsuzaki:w,minamiizu:w,
    mishima:w,morimachi:w,nishiizu:w,numazu:w,omaezaki:w,shimada:w,shimizu:w,shimoda:w,shizuoka:w,susono:w,yaizu:w,yoshida:w}},tochigi:{$:1,succ:{ashikaga:w,bato:w,haga:w,ichikai:w,iwafune:w,kaminokawa:w,kanuma:w,karasuyama:w,kuroiso:w,mashiko:w,mibu:w,moka:w,motegi:w,nasu:w,nasushiobara:w,nikko:w,nishikata:w,nogi:w,ohira:w,ohtawara:w,oyama:w,sakura:w,sano:w,shimotsuke:w,shioya:w,takanezawa:w,tochigi:w,tsuga:w,ujiie:w,utsunomiya:w,yaita:w}},tokushima:{$:1,succ:{aizumi:w,anan:w,ichiba:w,itano:w,kainan:w,
    komatsushima:w,matsushige:w,mima:w,minami:w,miyoshi:w,mugi:w,nakagawa:w,naruto:w,sanagochi:w,shishikui:w,tokushima:w,wajiki:w}},tokyo:{$:1,succ:{adachi:w,akiruno:w,akishima:w,aogashima:w,arakawa:w,bunkyo:w,chiyoda:w,chofu:w,chuo:w,edogawa:w,fuchu:w,fussa:w,hachijo:w,hachioji:w,hamura:w,higashikurume:w,higashimurayama:w,higashiyamato:w,hino:w,hinode:w,hinohara:w,inagi:w,itabashi:w,katsushika:w,kita:w,kiyose:w,kodaira:w,koganei:w,kokubunji:w,komae:w,koto:w,kouzushima:w,kunitachi:w,machida:w,meguro:w,
    minato:w,mitaka:w,mizuho:w,musashimurayama:w,musashino:w,nakano:w,nerima:w,ogasawara:w,okutama:w,ome:w,oshima:w,ota:w,setagaya:w,shibuya:w,shinagawa:w,shinjuku:w,suginami:w,sumida:w,tachikawa:w,taito:w,tama:w,toshima:w}},tottori:{$:1,succ:{chizu:w,hino:w,kawahara:w,koge:w,kotoura:w,misasa:w,nanbu:w,nichinan:w,sakaiminato:w,tottori:w,wakasa:w,yazu:w,yonago:w}},toyama:{$:1,succ:{asahi:w,fuchu:w,fukumitsu:w,funahashi:w,himi:w,imizu:w,inami:w,johana:w,kamiichi:w,kurobe:w,nakaniikawa:w,namerikawa:w,nanto:w,
    nyuzen:w,oyabe:w,taira:w,takaoka:w,tateyama:w,toga:w,tonami:w,toyama:w,unazuki:w,uozu:w,yamada:w}},wakayama:{$:1,succ:{arida:w,aridagawa:w,gobo:w,hashimoto:w,hidaka:w,hirogawa:w,inami:w,iwade:w,kainan:w,kamitonda:w,katsuragi:w,kimino:w,kinokawa:w,kitayama:w,koya:w,koza:w,kozagawa:w,kudoyama:w,kushimoto:w,mihama:w,misato:w,nachikatsuura:w,shingu:w,shirahama:w,taiji:w,tanabe:w,wakayama:w,yuasa:w,yura:w}},yamagata:{$:1,succ:{asahi:w,funagata:w,higashine:w,iide:w,kahoku:w,kaminoyama:w,kaneyama:w,kawanishi:w,
    mamurogawa:w,mikawa:w,murayama:w,nagai:w,nakayama:w,nanyo:w,nishikawa:w,obanazawa:w,oe:w,oguni:w,ohkura:w,oishida:w,sagae:w,sakata:w,sakegawa:w,shinjo:w,shirataka:w,shonai:w,takahata:w,tendo:w,tozawa:w,tsuruoka:w,yamagata:w,yamanobe:w,yonezawa:w,yuza:w}},yamaguchi:{$:1,succ:{abu:w,hagi:w,hikari:w,hofu:w,iwakuni:w,kudamatsu:w,mitou:w,nagato:w,oshima:w,shimonoseki:w,shunan:w,tabuse:w,tokuyama:w,toyota:w,ube:w,yuu:w}},yamanashi:{$:1,succ:{chuo:w,doshi:w,fuefuki:w,fujikawa:w,fujikawaguchiko:w,fujiyoshida:w,
    hayakawa:w,hokuto:w,ichikawamisato:w,kai:w,kofu:w,koshu:w,kosuge:w,"minami-alps":w,minobu:w,nakamichi:w,nanbu:w,narusawa:w,nirasaki:w,nishikatsura:w,oshino:w,otsuki:w,showa:w,tabayama:w,tsuru:w,uenohara:w,yamanakako:w,yamanashi:w}},"xn--4pvxs":w,"\u6803\u6728":w,"xn--vgu402c":w,"\u611b\u77e5":w,"xn--c3s14m":w,"\u611b\u5a9b":w,"xn--f6qx53a":w,"\u5175\u5eab":w,"xn--8pvr4u":w,"\u718a\u672c":w,"xn--uist22h":w,"\u8328\u57ce":w,"xn--djrs72d6uy":w,"\u5317\u6d77\u9053":w,"xn--mkru45i":w,"\u5343\u8449":w,
    "xn--0trq7p7nn":w,"\u548c\u6b4c\u5c71":w,"xn--8ltr62k":w,"\u9577\u5d0e":w,"xn--2m4a15e":w,"\u9577\u91ce":w,"xn--efvn9s":w,"\u65b0\u6f5f":w,"xn--32vp30h":w,"\u9752\u68ee":w,"xn--4it797k":w,"\u9759\u5ca1":w,"xn--1lqs71d":w,"\u6771\u4eac":w,"xn--5rtp49c":w,"\u77f3\u5ddd":w,"xn--5js045d":w,"\u57fc\u7389":w,"xn--ehqz56n":w,"\u4e09\u91cd":w,"xn--1lqs03n":w,"\u4eac\u90fd":w,"xn--qqqt11m":w,"\u4f50\u8cc0":w,"xn--kbrq7o":w,"\u5927\u5206":w,"xn--pssu33l":w,"\u5927\u962a":w,"xn--ntsq17g":w,"\u5948\u826f":w,
    "xn--uisz3g":w,"\u5bae\u57ce":w,"xn--6btw5a":w,"\u5bae\u5d0e":w,"xn--1ctwo":w,"\u5bcc\u5c71":w,"xn--6orx2r":w,"\u5c71\u53e3":w,"xn--rht61e":w,"\u5c71\u5f62":w,"xn--rht27z":w,"\u5c71\u68a8":w,"xn--djty4k":w,"\u5ca9\u624b":w,"xn--nit225k":w,"\u5c90\u961c":w,"xn--rht3d":w,"\u5ca1\u5c71":w,"xn--klty5x":w,"\u5cf6\u6839":w,"xn--kltx9a":w,"\u5e83\u5cf6":w,"xn--kltp7d":w,"\u5fb3\u5cf6":w,"xn--uuwu58a":w,"\u6c96\u7e04":w,"xn--zbx025d":w,"\u6ecb\u8cc0":w,"xn--ntso0iqx3a":w,"\u795e\u5948\u5ddd":w,"xn--elqq16h":w,
    "\u798f\u4e95":w,"xn--4it168d":w,"\u798f\u5ca1":w,"xn--klt787d":w,"\u798f\u5cf6":w,"xn--rny31h":w,"\u79cb\u7530":w,"xn--7t0a264c":w,"\u7fa4\u99ac":w,"xn--5rtq34k":w,"\u9999\u5ddd":w,"xn--k7yn95e":w,"\u9ad8\u77e5":w,"xn--tor131o":w,"\u9ce5\u53d6":w,"xn--d5qv7z876c":w,"\u9e7f\u5150\u5cf6":w,kawasaki:C,kitakyushu:C,kobe:C,nagoya:C,sapporo:C,sendai:C,yokohama:C,usercontent:y,blogspot:y}},ke:{$:1,succ:{ac:w,co:z$1,go:w,info:w,me:w,mobi:w,ne:w,or:w,sc:w,nom:y}},kg:x,kh:C,ki:R,km:{$:1,succ:{org:w,nom:w,gov:w,
    prd:w,tm:w,edu:w,mil:w,ass:w,com:w,coop:w,asso:w,presse:w,medecin:w,notaires:w,pharmaciens:w,veterinaire:w,gouv:w}},kn:{$:1,succ:{net:w,org:w,edu:w,gov:w}},kp:{$:1,succ:{com:w,edu:w,gov:w,org:w,rep:w,tra:w}},kr:{$:1,succ:{ac:w,co:w,es:w,go:w,hs:w,kg:w,mil:w,ms:w,ne:w,or:w,pe:w,re:w,sc:w,busan:w,chungbuk:w,chungnam:w,daegu:w,daejeon:w,gangwon:w,gwangju:w,gyeongbuk:w,gyeonggi:w,gyeongnam:w,incheon:w,jeju:w,jeonbuk:w,jeonnam:w,seoul:w,ulsan:w,blogspot:y}},kw:{$:1,succ:{com:w,edu:w,emb:w,gov:w,ind:w,
    net:w,org:w}},ky:D,kz:{$:1,succ:{org:w,edu:w,net:w,gov:w,mil:w,com:w,nym:y}},la:{$:1,succ:{"int":w,net:w,info:w,edu:w,gov:w,per:w,com:w,org:w,bnr:y,c:y,nym:y}},lb:D,lc:{$:1,succ:{com:w,net:w,co:w,org:w,edu:w,gov:w,nym:y,oy:y}},li:{$:1,succ:{blogspot:y,caa:y,nom:y,nym:y}},lk:{$:1,succ:{gov:w,sch:w,net:w,"int":w,com:w,org:w,edu:w,ngo:w,soc:w,web:w,ltd:w,assn:w,grp:w,hotel:w,ac:w}},lr:D,ls:{$:1,succ:{ac:w,biz:w,co:w,edu:w,gov:w,info:w,net:w,org:w,sc:w}},lt:P,lu:S,lv:{$:1,succ:{com:w,edu:w,gov:w,org:w,
    mil:w,id:w,net:w,asn:w,conf:w}},ly:{$:1,succ:{com:w,net:w,gov:w,plc:w,edu:w,sch:w,med:w,org:w,id:w}},ma:{$:1,succ:{co:w,net:w,gov:w,org:w,ac:w,press:w}},mc:{$:1,succ:{tm:w,asso:w}},md:z$1,me:{$:1,succ:{co:w,net:w,org:w,edu:w,ac:w,gov:w,its:w,priv:w,c66:y,daplie:{$:2,succ:{localhost:y}},filegear:y,"filegear-au":y,"filegear-de":y,"filegear-gb":y,"filegear-ie":y,"filegear-jp":y,"filegear-sg":y,glitch:y,ravendb:y,barsy:y,nctu:y,soundcast:y,tcp4:y,brasilia:y,ddns:y,dnsfor:y,hopto:y,loginto:y,noip:y,webhop:y,
    nym:y,diskstation:y,dscloud:y,i234:y,myds:y,synology:y,wedeploy:y,yombo:y,nohost:y}},mg:{$:1,succ:{org:w,nom:w,gov:w,prd:w,tm:w,edu:w,mil:w,com:w,co:w}},mh:w,mil:w,mk:{$:1,succ:{com:w,org:w,net:w,edu:w,gov:w,inf:w,name:w,blogspot:y,nom:y}},ml:{$:1,succ:{com:w,edu:w,gouv:w,gov:w,net:w,org:w,presse:w}},mm:C,mn:{$:1,succ:{gov:w,edu:w,org:w,nyc:y,nym:y}},mo:D,mobi:{$:1,succ:{barsy:y,dscloud:y}},mp:w,mq:w,mr:{$:1,succ:{gov:w,blogspot:y}},ms:{$:1,succ:{com:w,edu:w,gov:w,net:w,org:w,lab:y}},mt:{$:1,succ:{com:z$1,
    edu:w,net:w,org:w}},mu:{$:1,succ:{com:w,net:w,org:w,gov:w,ac:w,co:w,or:w}},museum:{$:1,succ:{academy:w,agriculture:w,air:w,airguard:w,alabama:w,alaska:w,amber:w,ambulance:w,american:w,americana:w,americanantiques:w,americanart:w,amsterdam:w,and:w,annefrank:w,anthro:w,anthropology:w,antiques:w,aquarium:w,arboretum:w,archaeological:w,archaeology:w,architecture:w,art:w,artanddesign:w,artcenter:w,artdeco:w,arteducation:w,artgallery:w,arts:w,artsandcrafts:w,asmatart:w,assassination:w,assisi:w,association:w,
    astronomy:w,atlanta:w,austin:w,australia:w,automotive:w,aviation:w,axis:w,badajoz:w,baghdad:w,bahn:w,bale:w,baltimore:w,barcelona:w,baseball:w,basel:w,baths:w,bauern:w,beauxarts:w,beeldengeluid:w,bellevue:w,bergbau:w,berkeley:w,berlin:w,bern:w,bible:w,bilbao:w,bill:w,birdart:w,birthplace:w,bonn:w,boston:w,botanical:w,botanicalgarden:w,botanicgarden:w,botany:w,brandywinevalley:w,brasil:w,bristol:w,british:w,britishcolumbia:w,broadcast:w,brunel:w,brussel:w,brussels:w,bruxelles:w,building:w,burghof:w,
    bus:w,bushey:w,cadaques:w,california:w,cambridge:w,can:w,canada:w,capebreton:w,carrier:w,cartoonart:w,casadelamoneda:w,castle:w,castres:w,celtic:w,center:w,chattanooga:w,cheltenham:w,chesapeakebay:w,chicago:w,children:w,childrens:w,childrensgarden:w,chiropractic:w,chocolate:w,christiansburg:w,cincinnati:w,cinema:w,circus:w,civilisation:w,civilization:w,civilwar:w,clinton:w,clock:w,coal:w,coastaldefence:w,cody:w,coldwar:w,collection:w,colonialwilliamsburg:w,coloradoplateau:w,columbia:w,columbus:w,
    communication:w,communications:w,community:w,computer:w,computerhistory:w,"xn--comunicaes-v6a2o":w,"comunica\u00e7\u00f5es":w,contemporary:w,contemporaryart:w,convent:w,copenhagen:w,corporation:w,"xn--correios-e-telecomunicaes-ghc29a":w,"correios-e-telecomunica\u00e7\u00f5es":w,corvette:w,costume:w,countryestate:w,county:w,crafts:w,cranbrook:w,creation:w,cultural:w,culturalcenter:w,culture:w,cyber:w,cymru:w,dali:w,dallas:w,database:w,ddr:w,decorativearts:w,delaware:w,delmenhorst:w,denmark:w,depot:w,
    design:w,detroit:w,dinosaur:w,discovery:w,dolls:w,donostia:w,durham:w,eastafrica:w,eastcoast:w,education:w,educational:w,egyptian:w,eisenbahn:w,elburg:w,elvendrell:w,embroidery:w,encyclopedic:w,england:w,entomology:w,environment:w,environmentalconservation:w,epilepsy:w,essex:w,estate:w,ethnology:w,exeter:w,exhibition:w,family:w,farm:w,farmequipment:w,farmers:w,farmstead:w,field:w,figueres:w,filatelia:w,film:w,fineart:w,finearts:w,finland:w,flanders:w,florida:w,force:w,fortmissoula:w,fortworth:w,foundation:w,
    francaise:w,frankfurt:w,franziskaner:w,freemasonry:w,freiburg:w,fribourg:w,frog:w,fundacio:w,furniture:w,gallery:w,garden:w,gateway:w,geelvinck:w,gemological:w,geology:w,georgia:w,giessen:w,glas:w,glass:w,gorge:w,grandrapids:w,graz:w,guernsey:w,halloffame:w,hamburg:w,handson:w,harvestcelebration:w,hawaii:w,health:w,heimatunduhren:w,hellas:w,helsinki:w,hembygdsforbund:w,heritage:w,histoire:w,historical:w,historicalsociety:w,historichouses:w,historisch:w,historisches:w,history:w,historyofscience:w,
    horology:w,house:w,humanities:w,illustration:w,imageandsound:w,indian:w,indiana:w,indianapolis:w,indianmarket:w,intelligence:w,interactive:w,iraq:w,iron:w,isleofman:w,jamison:w,jefferson:w,jerusalem:w,jewelry:w,jewish:w,jewishart:w,jfk:w,journalism:w,judaica:w,judygarland:w,juedisches:w,juif:w,karate:w,karikatur:w,kids:w,koebenhavn:w,koeln:w,kunst:w,kunstsammlung:w,kunstunddesign:w,labor:w,labour:w,lajolla:w,lancashire:w,landes:w,lans:w,"xn--lns-qla":w,"l\u00e4ns":w,larsson:w,lewismiller:w,lincoln:w,
    linz:w,living:w,livinghistory:w,localhistory:w,london:w,losangeles:w,louvre:w,loyalist:w,lucerne:w,luxembourg:w,luzern:w,mad:w,madrid:w,mallorca:w,manchester:w,mansion:w,mansions:w,manx:w,marburg:w,maritime:w,maritimo:w,maryland:w,marylhurst:w,media:w,medical:w,medizinhistorisches:w,meeres:w,memorial:w,mesaverde:w,michigan:w,midatlantic:w,military:w,mill:w,miners:w,mining:w,minnesota:w,missile:w,missoula:w,modern:w,moma:w,money:w,monmouth:w,monticello:w,montreal:w,moscow:w,motorcycle:w,muenchen:w,
    muenster:w,mulhouse:w,muncie:w,museet:w,museumcenter:w,museumvereniging:w,music:w,national:w,nationalfirearms:w,nationalheritage:w,nativeamerican:w,naturalhistory:w,naturalhistorymuseum:w,naturalsciences:w,nature:w,naturhistorisches:w,natuurwetenschappen:w,naumburg:w,naval:w,nebraska:w,neues:w,newhampshire:w,newjersey:w,newmexico:w,newport:w,newspaper:w,newyork:w,niepce:w,norfolk:w,north:w,nrw:w,nuernberg:w,nuremberg:w,nyc:w,nyny:w,oceanographic:w,oceanographique:w,omaha:w,online:w,ontario:w,openair:w,
    oregon:w,oregontrail:w,otago:w,oxford:w,pacific:w,paderborn:w,palace:w,paleo:w,palmsprings:w,panama:w,paris:w,pasadena:w,pharmacy:w,philadelphia:w,philadelphiaarea:w,philately:w,phoenix:w,photography:w,pilots:w,pittsburgh:w,planetarium:w,plantation:w,plants:w,plaza:w,portal:w,portland:w,portlligat:w,"posts-and-telecommunications":w,preservation:w,presidio:w,press:w,project:w,"public":w,pubol:w,quebec:w,railroad:w,railway:w,research:w,resistance:w,riodejaneiro:w,rochester:w,rockart:w,roma:w,russia:w,
    saintlouis:w,salem:w,salvadordali:w,salzburg:w,sandiego:w,sanfrancisco:w,santabarbara:w,santacruz:w,santafe:w,saskatchewan:w,satx:w,savannahga:w,schlesisches:w,schoenbrunn:w,schokoladen:w,school:w,schweiz:w,science:w,scienceandhistory:w,scienceandindustry:w,sciencecenter:w,sciencecenters:w,"science-fiction":w,sciencehistory:w,sciences:w,sciencesnaturelles:w,scotland:w,seaport:w,settlement:w,settlers:w,shell:w,sherbrooke:w,sibenik:w,silk:w,ski:w,skole:w,society:w,sologne:w,soundandvision:w,southcarolina:w,
    southwest:w,space:w,spy:w,square:w,stadt:w,stalbans:w,starnberg:w,state:w,stateofdelaware:w,station:w,steam:w,steiermark:w,stjohn:w,stockholm:w,stpetersburg:w,stuttgart:w,suisse:w,surgeonshall:w,surrey:w,svizzera:w,sweden:w,sydney:w,tank:w,tcm:w,technology:w,telekommunikation:w,television:w,texas:w,textile:w,theater:w,time:w,timekeeping:w,topology:w,torino:w,touch:w,town:w,transport:w,tree:w,trolley:w,trust:w,trustee:w,uhren:w,ulm:w,undersea:w,university:w,usa:w,usantiques:w,usarts:w,uscountryestate:w,
    usculture:w,usdecorativearts:w,usgarden:w,ushistory:w,ushuaia:w,uslivinghistory:w,utah:w,uvic:w,valley:w,vantaa:w,versailles:w,viking:w,village:w,virginia:w,virtual:w,virtuel:w,vlaanderen:w,volkenkunde:w,wales:w,wallonie:w,war:w,washingtondc:w,watchandclock:w,"watch-and-clock":w,western:w,westfalen:w,whaling:w,wildlife:w,williamsburg:w,windmill:w,workshop:w,york:w,yorkshire:w,yosemite:w,youth:w,zoological:w,zoology:w,"xn--9dbhblg6di":w,"\u05d9\u05e8\u05d5\u05e9\u05dc\u05d9\u05dd":w,"xn--h1aegh":w,
    "\u0438\u043a\u043e\u043c":w}},mv:{$:1,succ:{aero:w,biz:w,com:w,coop:w,edu:w,gov:w,info:w,"int":w,mil:w,museum:w,name:w,net:w,org:w,pro:w}},mw:{$:1,succ:{ac:w,biz:w,co:w,com:w,coop:w,edu:w,gov:w,"int":w,museum:w,net:w,org:w}},mx:{$:1,succ:{com:w,org:w,gob:w,edu:w,net:w,blogspot:y,nym:y}},my:{$:1,succ:{com:w,net:w,org:w,gov:w,edu:w,mil:w,name:w,blogspot:y}},mz:{$:1,succ:{ac:w,adv:w,co:w,edu:w,gov:w,mil:w,net:w,org:w}},na:{$:1,succ:{info:w,pro:w,name:w,school:w,or:w,dr:w,us:w,mx:w,ca:w,"in":w,cc:w,
    tv:w,ws:w,mobi:w,co:w,com:w,org:w}},name:{$:1,succ:{her:V,his:V}},nc:{$:1,succ:{asso:w,nom:w}},ne:w,net:{$:1,succ:{alwaysdata:y,cloudfront:y,t3l3p0rt:y,"go-vip":y,myfritz:y,blackbaudcdn:y,boomla:y,bplaced:y,square7:y,gb:y,hu:y,jp:y,se:y,uk:y,"in":y,cloudaccess:y,"cdn77-ssl":y,cdn77:{$:0,succ:{r:y}},cloudeity:y,"feste-ip":y,"knx-server":y,"static-access":y,cryptonomic:B,dattolocal:y,mydatto:y,debian:y,"at-band-camp":y,blogdns:y,"broke-it":y,buyshouses:y,dnsalias:y,dnsdojo:y,"does-it":y,dontexist:y,
    dynalias:y,dynathome:y,endofinternet:y,"from-az":y,"from-co":y,"from-la":y,"from-ny":y,"gets-it":y,"ham-radio-op":y,homeftp:y,homeip:y,homelinux:y,homeunix:y,"in-the-band":y,"is-a-chef":y,"is-a-geek":y,"isa-geek":y,"kicks-ass":y,"office-on-the":y,podzone:y,"scrapper-site":y,selfip:y,"sells-it":y,servebbs:y,serveftp:y,thruhere:y,webhop:y,definima:y,casacam:y,dynu:y,dynv6:y,twmail:y,ru:y,channelsdvr:y,fastlylb:{$:2,succ:{map:y}},fastly:{$:0,succ:{freetls:y,map:y,prod:{$:0,succ:{a:y,global:y}},ssl:{$:0,
    succ:{a:y,b:y,global:y}}}},flynnhosting:y,cloudfunctions:y,moonscale:y,"in-dsl":y,"in-vpn":y,ipifony:y,kinghost:y,uni5:y,barsy:y,memset:y,azurewebsites:y,"azure-mobile":y,cloudapp:y,dnsup:y,hicam:y,"now-dns":y,ownip:y,vpndns:y,"eating-organic":y,mydissent:y,myeffect:y,mymediapc:y,mypsx:y,mysecuritycamera:y,nhlfan:y,"no-ip":y,pgafan:y,privatizehealthinsurance:y,bounceme:y,ddns:y,redirectme:y,serveblog:y,serveminecraft:y,sytes:y,cloudycluster:y,rackmaze:y,schokokeks:y,"firewall-gateway":y,siteleaf:y,
    srcf:{$:0,succ:{soc:y,user:y}},dsmynas:y,familyds:y,za:y}},nf:{$:1,succ:{com:w,net:w,per:w,rec:w,web:w,arts:w,firm:w,info:w,other:w,store:w}},ng:{$:1,succ:{com:z$1,edu:w,gov:w,i:w,mil:w,mobi:w,name:w,net:w,org:w,sch:w,col:y,gen:y,ltd:y}},ni:{$:1,succ:{ac:w,biz:w,co:w,com:w,edu:w,gob:w,"in":w,info:w,"int":w,mil:w,net:w,nom:w,org:w,web:w}},nl:{$:1,succ:{virtueeldomein:y,co:y,"hosting-cluster":y,blogspot:y,khplay:y,transurl:B,cistron:y,demon:y}},no:{$:1,succ:{fhs:w,vgs:w,fylkesbibl:w,folkebibl:w,museum:w,
    idrett:w,priv:w,mil:w,stat:w,dep:w,kommune:w,herad:w,aa:W,ah:W,bu:W,fm:W,hl:W,hm:W,"jan-mayen":W,mr:W,nl:W,nt:W,of:W,ol:W,oslo:W,rl:W,sf:W,st:W,svalbard:W,tm:W,tr:W,va:W,vf:W,akrehamn:w,"xn--krehamn-dxa":w,"\u00e5krehamn":w,algard:w,"xn--lgrd-poac":w,"\u00e5lg\u00e5rd":w,arna:w,brumunddal:w,bryne:w,bronnoysund:w,"xn--brnnysund-m8ac":w,"br\u00f8nn\u00f8ysund":w,drobak:w,"xn--drbak-wua":w,"dr\u00f8bak":w,egersund:w,fetsund:w,floro:w,"xn--flor-jra":w,"flor\u00f8":w,fredrikstad:w,hokksund:w,honefoss:w,
    "xn--hnefoss-q1a":w,"h\u00f8nefoss":w,jessheim:w,jorpeland:w,"xn--jrpeland-54a":w,"j\u00f8rpeland":w,kirkenes:w,kopervik:w,krokstadelva:w,langevag:w,"xn--langevg-jxa":w,"langev\u00e5g":w,leirvik:w,mjondalen:w,"xn--mjndalen-64a":w,"mj\u00f8ndalen":w,"mo-i-rana":w,mosjoen:w,"xn--mosjen-eya":w,"mosj\u00f8en":w,nesoddtangen:w,orkanger:w,osoyro:w,"xn--osyro-wua":w,"os\u00f8yro":w,raholt:w,"xn--rholt-mra":w,"r\u00e5holt":w,sandnessjoen:w,"xn--sandnessjen-ogb":w,"sandnessj\u00f8en":w,skedsmokorset:w,slattum:w,
    spjelkavik:w,stathelle:w,stavern:w,stjordalshalsen:w,"xn--stjrdalshalsen-sqb":w,"stj\u00f8rdalshalsen":w,tananger:w,tranby:w,vossevangen:w,afjord:w,"xn--fjord-lra":w,"\u00e5fjord":w,agdenes:w,al:w,"xn--l-1fa":w,"\u00e5l":w,alesund:w,"xn--lesund-hua":w,"\u00e5lesund":w,alstahaug:w,alta:w,"xn--lt-liac":w,"\u00e1lt\u00e1":w,alaheadju:w,"xn--laheadju-7ya":w,"\u00e1laheadju":w,alvdal:w,amli:w,"xn--mli-tla":w,"\u00e5mli":w,amot:w,"xn--mot-tla":w,"\u00e5mot":w,andebu:w,andoy:w,"xn--andy-ira":w,"and\u00f8y":w,
    andasuolo:w,ardal:w,"xn--rdal-poa":w,"\u00e5rdal":w,aremark:w,arendal:w,"xn--s-1fa":w,"\u00e5s":w,aseral:w,"xn--seral-lra":w,"\u00e5seral":w,asker:w,askim:w,askvoll:w,askoy:w,"xn--asky-ira":w,"ask\u00f8y":w,asnes:w,"xn--snes-poa":w,"\u00e5snes":w,audnedaln:w,aukra:w,aure:w,aurland:w,"aurskog-holand":w,"xn--aurskog-hland-jnb":w,"aurskog-h\u00f8land":w,austevoll:w,austrheim:w,averoy:w,"xn--avery-yua":w,"aver\u00f8y":w,balestrand:w,ballangen:w,balat:w,"xn--blt-elab":w,"b\u00e1l\u00e1t":w,balsfjord:w,
    bahccavuotna:w,"xn--bhccavuotna-k7a":w,"b\u00e1hccavuotna":w,bamble:w,bardu:w,beardu:w,beiarn:w,bajddar:w,"xn--bjddar-pta":w,"b\u00e1jddar":w,baidar:w,"xn--bidr-5nac":w,"b\u00e1id\u00e1r":w,berg:w,bergen:w,berlevag:w,"xn--berlevg-jxa":w,"berlev\u00e5g":w,bearalvahki:w,"xn--bearalvhki-y4a":w,"bearalv\u00e1hki":w,bindal:w,birkenes:w,bjarkoy:w,"xn--bjarky-fya":w,"bjark\u00f8y":w,bjerkreim:w,bjugn:w,bodo:w,"xn--bod-2na":w,"bod\u00f8":w,badaddja:w,"xn--bdddj-mrabd":w,"b\u00e5d\u00e5ddj\u00e5":w,budejju:w,
    bokn:w,bremanger:w,bronnoy:w,"xn--brnny-wuac":w,"br\u00f8nn\u00f8y":w,bygland:w,bykle:w,barum:w,"xn--brum-voa":w,"b\u00e6rum":w,telemark:{$:0,succ:{bo:w,"xn--b-5ga":w,"b\u00f8":w}},nordland:{$:0,succ:{bo:w,"xn--b-5ga":w,"b\u00f8":w,heroy:w,"xn--hery-ira":w,"her\u00f8y":w}},bievat:w,"xn--bievt-0qa":w,"biev\u00e1t":w,bomlo:w,"xn--bmlo-gra":w,"b\u00f8mlo":w,batsfjord:w,"xn--btsfjord-9za":w,"b\u00e5tsfjord":w,bahcavuotna:w,"xn--bhcavuotna-s4a":w,"b\u00e1hcavuotna":w,dovre:w,drammen:w,drangedal:w,dyroy:w,
    "xn--dyry-ira":w,"dyr\u00f8y":w,donna:w,"xn--dnna-gra":w,"d\u00f8nna":w,eid:w,eidfjord:w,eidsberg:w,eidskog:w,eidsvoll:w,eigersund:w,elverum:w,enebakk:w,engerdal:w,etne:w,etnedal:w,evenes:w,evenassi:w,"xn--eveni-0qa01ga":w,"even\u00e1\u0161\u0161i":w,"evje-og-hornnes":w,farsund:w,fauske:w,fuossko:w,fuoisku:w,fedje:w,fet:w,finnoy:w,"xn--finny-yua":w,"finn\u00f8y":w,fitjar:w,fjaler:w,fjell:w,flakstad:w,flatanger:w,flekkefjord:w,flesberg:w,flora:w,fla:w,"xn--fl-zia":w,"fl\u00e5":w,folldal:w,forsand:w,
    fosnes:w,frei:w,frogn:w,froland:w,frosta:w,frana:w,"xn--frna-woa":w,"fr\u00e6na":w,froya:w,"xn--frya-hra":w,"fr\u00f8ya":w,fusa:w,fyresdal:w,forde:w,"xn--frde-gra":w,"f\u00f8rde":w,gamvik:w,gangaviika:w,"xn--ggaviika-8ya47h":w,"g\u00e1\u014bgaviika":w,gaular:w,gausdal:w,gildeskal:w,"xn--gildeskl-g0a":w,"gildesk\u00e5l":w,giske:w,gjemnes:w,gjerdrum:w,gjerstad:w,gjesdal:w,gjovik:w,"xn--gjvik-wua":w,"gj\u00f8vik":w,gloppen:w,gol:w,gran:w,grane:w,granvin:w,gratangen:w,grimstad:w,grong:w,kraanghke:w,"xn--kranghke-b0a":w,
    "kr\u00e5anghke":w,grue:w,gulen:w,hadsel:w,halden:w,halsa:w,hamar:w,hamaroy:w,habmer:w,"xn--hbmer-xqa":w,"h\u00e1bmer":w,hapmir:w,"xn--hpmir-xqa":w,"h\u00e1pmir":w,hammerfest:w,hammarfeasta:w,"xn--hmmrfeasta-s4ac":w,"h\u00e1mm\u00e1rfeasta":w,haram:w,hareid:w,harstad:w,hasvik:w,aknoluokta:w,"xn--koluokta-7ya57h":w,"\u00e1k\u014boluokta":w,hattfjelldal:w,aarborte:w,haugesund:w,hemne:w,hemnes:w,hemsedal:w,"more-og-romsdal":{$:0,succ:{heroy:w,sande:w}},"xn--mre-og-romsdal-qqb":{$:0,succ:{"xn--hery-ira":w,
    sande:w}},"m\u00f8re-og-romsdal":{$:0,succ:{"her\u00f8y":w,sande:w}},hitra:w,hjartdal:w,hjelmeland:w,hobol:w,"xn--hobl-ira":w,"hob\u00f8l":w,hof:w,hol:w,hole:w,holmestrand:w,holtalen:w,"xn--holtlen-hxa":w,"holt\u00e5len":w,hornindal:w,horten:w,hurdal:w,hurum:w,hvaler:w,hyllestad:w,hagebostad:w,"xn--hgebostad-g3a":w,"h\u00e6gebostad":w,hoyanger:w,"xn--hyanger-q1a":w,"h\u00f8yanger":w,hoylandet:w,"xn--hylandet-54a":w,"h\u00f8ylandet":w,ha:w,"xn--h-2fa":w,"h\u00e5":w,ibestad:w,inderoy:w,"xn--indery-fya":w,
    "inder\u00f8y":w,iveland:w,jevnaker:w,jondal:w,jolster:w,"xn--jlster-bya":w,"j\u00f8lster":w,karasjok:w,karasjohka:w,"xn--krjohka-hwab49j":w,"k\u00e1r\u00e1\u0161johka":w,karlsoy:w,galsa:w,"xn--gls-elac":w,"g\u00e1ls\u00e1":w,karmoy:w,"xn--karmy-yua":w,"karm\u00f8y":w,kautokeino:w,guovdageaidnu:w,klepp:w,klabu:w,"xn--klbu-woa":w,"kl\u00e6bu":w,kongsberg:w,kongsvinger:w,kragero:w,"xn--krager-gya":w,"krager\u00f8":w,kristiansand:w,kristiansund:w,krodsherad:w,"xn--krdsherad-m8a":w,"kr\u00f8dsherad":w,
    kvalsund:w,rahkkeravju:w,"xn--rhkkervju-01af":w,"r\u00e1hkker\u00e1vju":w,kvam:w,kvinesdal:w,kvinnherad:w,kviteseid:w,kvitsoy:w,"xn--kvitsy-fya":w,"kvits\u00f8y":w,kvafjord:w,"xn--kvfjord-nxa":w,"kv\u00e6fjord":w,giehtavuoatna:w,kvanangen:w,"xn--kvnangen-k0a":w,"kv\u00e6nangen":w,navuotna:w,"xn--nvuotna-hwa":w,"n\u00e1vuotna":w,kafjord:w,"xn--kfjord-iua":w,"k\u00e5fjord":w,gaivuotna:w,"xn--givuotna-8ya":w,"g\u00e1ivuotna":w,larvik:w,lavangen:w,lavagis:w,loabat:w,"xn--loabt-0qa":w,"loab\u00e1t":w,
    lebesby:w,davvesiida:w,leikanger:w,leirfjord:w,leka:w,leksvik:w,lenvik:w,leangaviika:w,"xn--leagaviika-52b":w,"lea\u014bgaviika":w,lesja:w,levanger:w,lier:w,lierne:w,lillehammer:w,lillesand:w,lindesnes:w,lindas:w,"xn--linds-pra":w,"lind\u00e5s":w,lom:w,loppa:w,lahppi:w,"xn--lhppi-xqa":w,"l\u00e1hppi":w,lund:w,lunner:w,luroy:w,"xn--lury-ira":w,"lur\u00f8y":w,luster:w,lyngdal:w,lyngen:w,ivgu:w,lardal:w,lerdal:w,"xn--lrdal-sra":w,"l\u00e6rdal":w,lodingen:w,"xn--ldingen-q1a":w,"l\u00f8dingen":w,lorenskog:w,
    "xn--lrenskog-54a":w,"l\u00f8renskog":w,loten:w,"xn--lten-gra":w,"l\u00f8ten":w,malvik:w,masoy:w,"xn--msy-ula0h":w,"m\u00e5s\u00f8y":w,muosat:w,"xn--muost-0qa":w,"muos\u00e1t":w,mandal:w,marker:w,marnardal:w,masfjorden:w,meland:w,meldal:w,melhus:w,meloy:w,"xn--mely-ira":w,"mel\u00f8y":w,meraker:w,"xn--merker-kua":w,"mer\u00e5ker":w,moareke:w,"xn--moreke-jua":w,"mo\u00e5reke":w,midsund:w,"midtre-gauldal":w,modalen:w,modum:w,molde:w,moskenes:w,moss:w,mosvik:w,malselv:w,"xn--mlselv-iua":w,"m\u00e5lselv":w,
    malatvuopmi:w,"xn--mlatvuopmi-s4a":w,"m\u00e1latvuopmi":w,namdalseid:w,aejrie:w,namsos:w,namsskogan:w,naamesjevuemie:w,"xn--nmesjevuemie-tcba":w,"n\u00e5\u00e5mesjevuemie":w,laakesvuemie:w,nannestad:w,narvik:w,narviika:w,naustdal:w,"nedre-eiker":w,akershus:ba,buskerud:ba,nesna:w,nesodden:w,nesseby:w,unjarga:w,"xn--unjrga-rta":w,"unj\u00e1rga":w,nesset:w,nissedal:w,nittedal:w,"nord-aurdal":w,"nord-fron":w,"nord-odal":w,norddal:w,nordkapp:w,davvenjarga:w,"xn--davvenjrga-y4a":w,"davvenj\u00e1rga":w,
    "nordre-land":w,nordreisa:w,raisa:w,"xn--risa-5na":w,"r\u00e1isa":w,"nore-og-uvdal":w,notodden:w,naroy:w,"xn--nry-yla5g":w,"n\u00e6r\u00f8y":w,notteroy:w,"xn--nttery-byae":w,"n\u00f8tter\u00f8y":w,odda:w,oksnes:w,"xn--ksnes-uua":w,"\u00f8ksnes":w,oppdal:w,oppegard:w,"xn--oppegrd-ixa":w,"oppeg\u00e5rd":w,orkdal:w,orland:w,"xn--rland-uua":w,"\u00f8rland":w,orskog:w,"xn--rskog-uua":w,"\u00f8rskog":w,orsta:w,"xn--rsta-fra":w,"\u00f8rsta":w,hedmark:{$:0,succ:{os:w,valer:w,"xn--vler-qoa":w,"v\u00e5ler":w}},
    hordaland:{$:0,succ:{os:w}},osen:w,osteroy:w,"xn--ostery-fya":w,"oster\u00f8y":w,"ostre-toten":w,"xn--stre-toten-zcb":w,"\u00f8stre-toten":w,overhalla:w,"ovre-eiker":w,"xn--vre-eiker-k8a":w,"\u00f8vre-eiker":w,oyer:w,"xn--yer-zna":w,"\u00f8yer":w,oygarden:w,"xn--ygarden-p1a":w,"\u00f8ygarden":w,"oystre-slidre":w,"xn--ystre-slidre-ujb":w,"\u00f8ystre-slidre":w,porsanger:w,porsangu:w,"xn--porsgu-sta26f":w,"pors\u00e1\u014bgu":w,porsgrunn:w,radoy:w,"xn--rady-ira":w,"rad\u00f8y":w,rakkestad:w,rana:w,
    ruovat:w,randaberg:w,rauma:w,rendalen:w,rennebu:w,rennesoy:w,"xn--rennesy-v1a":w,"rennes\u00f8y":w,rindal:w,ringebu:w,ringerike:w,ringsaker:w,rissa:w,risor:w,"xn--risr-ira":w,"ris\u00f8r":w,roan:w,rollag:w,rygge:w,ralingen:w,"xn--rlingen-mxa":w,"r\u00e6lingen":w,rodoy:w,"xn--rdy-0nab":w,"r\u00f8d\u00f8y":w,romskog:w,"xn--rmskog-bya":w,"r\u00f8mskog":w,roros:w,"xn--rros-gra":w,"r\u00f8ros":w,rost:w,"xn--rst-0na":w,"r\u00f8st":w,royken:w,"xn--ryken-vua":w,"r\u00f8yken":w,royrvik:w,"xn--ryrvik-bya":w,
    "r\u00f8yrvik":w,rade:w,"xn--rde-ula":w,"r\u00e5de":w,salangen:w,siellak:w,saltdal:w,salat:w,"xn--slt-elab":w,"s\u00e1l\u00e1t":w,"xn--slat-5na":w,"s\u00e1lat":w,samnanger:w,vestfold:{$:0,succ:{sande:w}},sandefjord:w,sandnes:w,sandoy:w,"xn--sandy-yua":w,"sand\u00f8y":w,sarpsborg:w,sauda:w,sauherad:w,sel:w,selbu:w,selje:w,seljord:w,sigdal:w,siljan:w,sirdal:w,skaun:w,skedsmo:w,ski:w,skien:w,skiptvet:w,skjervoy:w,"xn--skjervy-v1a":w,"skjerv\u00f8y":w,skierva:w,"xn--skierv-uta":w,"skierv\u00e1":w,skjak:w,
    "xn--skjk-soa":w,"skj\u00e5k":w,skodje:w,skanland:w,"xn--sknland-fxa":w,"sk\u00e5nland":w,skanit:w,"xn--sknit-yqa":w,"sk\u00e1nit":w,smola:w,"xn--smla-hra":w,"sm\u00f8la":w,snillfjord:w,snasa:w,"xn--snsa-roa":w,"sn\u00e5sa":w,snoasa:w,snaase:w,"xn--snase-nra":w,"sn\u00e5ase":w,sogndal:w,sokndal:w,sola:w,solund:w,songdalen:w,sortland:w,spydeberg:w,stange:w,stavanger:w,steigen:w,steinkjer:w,stjordal:w,"xn--stjrdal-s1a":w,"stj\u00f8rdal":w,stokke:w,"stor-elvdal":w,stord:w,stordal:w,storfjord:w,omasvuotna:w,
    strand:w,stranda:w,stryn:w,sula:w,suldal:w,sund:w,sunndal:w,surnadal:w,sveio:w,svelvik:w,sykkylven:w,sogne:w,"xn--sgne-gra":w,"s\u00f8gne":w,somna:w,"xn--smna-gra":w,"s\u00f8mna":w,"sondre-land":w,"xn--sndre-land-0cb":w,"s\u00f8ndre-land":w,"sor-aurdal":w,"xn--sr-aurdal-l8a":w,"s\u00f8r-aurdal":w,"sor-fron":w,"xn--sr-fron-q1a":w,"s\u00f8r-fron":w,"sor-odal":w,"xn--sr-odal-q1a":w,"s\u00f8r-odal":w,"sor-varanger":w,"xn--sr-varanger-ggb":w,"s\u00f8r-varanger":w,"matta-varjjat":w,"xn--mtta-vrjjat-k7af":w,
    "m\u00e1tta-v\u00e1rjjat":w,sorfold:w,"xn--srfold-bya":w,"s\u00f8rfold":w,sorreisa:w,"xn--srreisa-q1a":w,"s\u00f8rreisa":w,sorum:w,"xn--srum-gra":w,"s\u00f8rum":w,tana:w,deatnu:w,time:w,tingvoll:w,tinn:w,tjeldsund:w,dielddanuorri:w,tjome:w,"xn--tjme-hra":w,"tj\u00f8me":w,tokke:w,tolga:w,torsken:w,tranoy:w,"xn--trany-yua":w,"tran\u00f8y":w,tromso:w,"xn--troms-zua":w,"troms\u00f8":w,tromsa:w,romsa:w,trondheim:w,troandin:w,trysil:w,trana:w,"xn--trna-woa":w,"tr\u00e6na":w,trogstad:w,"xn--trgstad-r1a":w,
    "tr\u00f8gstad":w,tvedestrand:w,tydal:w,tynset:w,tysfjord:w,divtasvuodna:w,divttasvuotna:w,tysnes:w,tysvar:w,"xn--tysvr-vra":w,"tysv\u00e6r":w,tonsberg:w,"xn--tnsberg-q1a":w,"t\u00f8nsberg":w,ullensaker:w,ullensvang:w,ulvik:w,utsira:w,vadso:w,"xn--vads-jra":w,"vads\u00f8":w,cahcesuolo:w,"xn--hcesuolo-7ya35b":w,"\u010d\u00e1hcesuolo":w,vaksdal:w,valle:w,vang:w,vanylven:w,vardo:w,"xn--vard-jra":w,"vard\u00f8":w,varggat:w,"xn--vrggt-xqad":w,"v\u00e1rgg\u00e1t":w,vefsn:w,vaapste:w,vega:w,vegarshei:w,
    "xn--vegrshei-c0a":w,"veg\u00e5rshei":w,vennesla:w,verdal:w,verran:w,vestby:w,vestnes:w,"vestre-slidre":w,"vestre-toten":w,vestvagoy:w,"xn--vestvgy-ixa6o":w,"vestv\u00e5g\u00f8y":w,vevelstad:w,vik:w,vikna:w,vindafjord:w,volda:w,voss:w,varoy:w,"xn--vry-yla5g":w,"v\u00e6r\u00f8y":w,vagan:w,"xn--vgan-qoa":w,"v\u00e5gan":w,voagat:w,vagsoy:w,"xn--vgsy-qoa0j":w,"v\u00e5gs\u00f8y":w,vaga:w,"xn--vg-yiab":w,"v\u00e5g\u00e5":w,ostfold:{$:0,succ:{valer:w}},"xn--stfold-9xa":{$:0,succ:{"xn--vler-qoa":w}},"\u00f8stfold":{$:0,
    succ:{"v\u00e5ler":w}},co:y,blogspot:y}},np:C,nr:R,nu:{$:1,succ:{merseine:y,mine:y,shacknet:y,nom:y,builder:{$:0,succ:{site:y}},enterprisecloud:y}},nz:{$:1,succ:{ac:w,co:z$1,cri:w,geek:w,gen:w,govt:w,health:w,iwi:w,kiwi:w,maori:w,mil:w,"xn--mori-qsa":w,"m\u0101ori":w,net:w,org:w,parliament:w,school:w,nym:y}},om:{$:1,succ:{co:w,com:w,edu:w,gov:w,med:w,museum:w,net:w,org:w,pro:w}},onion:w,org:{$:1,succ:{amune:{$:0,succ:{tele:y}},pimienta:y,poivron:y,potager:y,sweetpepper:y,ae:y,us:y,certmgr:y,cdn77:{$:0,
    succ:{c:y,rsc:y}},"cdn77-secure":{$:0,succ:{origin:{$:0,succ:{ssl:y}}}},cloudns:y,duckdns:y,tunk:y,dyndns:{$:2,succ:{go:y,home:y}},blogdns:y,blogsite:y,boldlygoingnowhere:y,dnsalias:y,dnsdojo:y,doesntexist:y,dontexist:y,doomdns:y,dvrdns:y,dynalias:y,endofinternet:y,endoftheinternet:y,"from-me":y,"game-host":y,gotdns:y,"hobby-site":y,homedns:y,homeftp:y,homelinux:y,homeunix:y,"is-a-bruinsfan":y,"is-a-candidate":y,"is-a-celticsfan":y,"is-a-chef":y,"is-a-geek":y,"is-a-knight":y,"is-a-linux-user":y,"is-a-patsfan":y,
    "is-a-soxfan":y,"is-found":y,"is-lost":y,"is-saved":y,"is-very-bad":y,"is-very-evil":y,"is-very-good":y,"is-very-nice":y,"is-very-sweet":y,"isa-geek":y,"kicks-ass":y,misconfused:y,podzone:y,readmyblog:y,selfip:y,sellsyourhome:y,servebbs:y,serveftp:y,servegame:y,"stuff-4-sale":y,webhop:y,ddnss:y,accesscam:y,camdvr:y,freeddns:y,mywire:y,webredirect:y,eu:{$:2,succ:{al:y,asso:y,at:y,au:y,be:y,bg:y,ca:y,cd:y,ch:y,cn:y,cy:y,cz:y,de:y,dk:y,edu:y,ee:y,es:y,fi:y,fr:y,gr:y,hr:y,hu:y,ie:y,il:y,"in":y,"int":y,
    is:y,it:y,jp:y,kr:y,lt:y,lu:y,lv:y,mc:y,me:y,mk:y,mt:y,my:y,net:y,ng:y,nl:y,no:y,nz:y,paris:y,pl:y,pt:y,"q-a":y,ro:y,ru:y,se:y,si:y,sk:y,tr:y,uk:y,us:y}},twmail:y,fedorainfracloud:y,fedorapeople:y,fedoraproject:{$:0,succ:{cloud:y,os:L,stg:{$:0,succ:{os:L}}}},freedesktop:y,hepforge:y,"in-dsl":y,"in-vpn":y,js:y,uklugs:y,barsy:y,mayfirst:y,"mozilla-iot":y,bmoattachments:y,dynserv:y,"now-dns":y,"cable-modem":y,collegefan:y,couchpotatofries:y,mlbfan:y,mysecuritycamera:y,nflfan:y,"read-books":y,ufcfan:y,
    hopto:y,myftp:y,"no-ip":y,zapto:y,"my-firewall":y,myfirewall:y,spdns:y,dsmynas:y,familyds:y,edugit:y,tuxfamily:y,diskstation:y,hk:y,wmflabs:y,za:y}},pa:{$:1,succ:{ac:w,gob:w,com:w,org:w,sld:w,edu:w,net:w,ing:w,abo:w,med:w,nom:w}},pe:{$:1,succ:{edu:w,gob:w,nom:w,mil:w,org:w,com:w,net:w,blogspot:y,nym:y}},pf:{$:1,succ:{com:w,org:w,edu:w}},pg:C,ph:{$:1,succ:{com:w,net:w,org:w,gov:w,edu:w,ngo:w,mil:w,i:w}},pk:{$:1,succ:{com:w,net:w,edu:w,org:w,fam:w,biz:w,web:w,gov:w,gob:w,gok:w,gon:w,gop:w,gos:w,info:w}},
    pl:{$:1,succ:{com:w,net:w,org:w,aid:w,agro:w,atm:w,auto:w,biz:w,edu:w,gmina:w,gsm:w,info:w,mail:w,miasta:w,media:w,mil:w,nieruchomosci:w,nom:w,pc:w,powiat:w,priv:w,realestate:w,rel:w,sex:w,shop:w,sklep:w,sos:w,szkola:w,targi:w,tm:w,tourism:w,travel:w,turystyka:w,gov:{$:1,succ:{ap:w,ic:w,is:w,us:w,kmpsp:w,kppsp:w,kwpsp:w,psp:w,wskr:w,kwp:w,mw:w,ug:w,um:w,umig:w,ugim:w,upow:w,uw:w,starostwo:w,pa:w,po:w,psse:w,pup:w,rzgw:w,sa:w,so:w,sr:w,wsa:w,sko:w,uzs:w,wiih:w,winb:w,pinb:w,wios:w,witd:w,wzmiuw:w,
    piw:w,wiw:w,griw:w,wif:w,oum:w,sdn:w,zp:w,uppo:w,mup:w,wuoz:w,konsulat:w,oirm:w}},augustow:w,"babia-gora":w,bedzin:w,beskidy:w,bialowieza:w,bialystok:w,bielawa:w,bieszczady:w,boleslawiec:w,bydgoszcz:w,bytom:w,cieszyn:w,czeladz:w,czest:w,dlugoleka:w,elblag:w,elk:w,glogow:w,gniezno:w,gorlice:w,grajewo:w,ilawa:w,jaworzno:w,"jelenia-gora":w,jgora:w,kalisz:w,"kazimierz-dolny":w,karpacz:w,kartuzy:w,kaszuby:w,katowice:w,kepno:w,ketrzyn:w,klodzko:w,kobierzyce:w,kolobrzeg:w,konin:w,konskowola:w,kutno:w,lapy:w,
    lebork:w,legnica:w,lezajsk:w,limanowa:w,lomza:w,lowicz:w,lubin:w,lukow:w,malbork:w,malopolska:w,mazowsze:w,mazury:w,mielec:w,mielno:w,mragowo:w,naklo:w,nowaruda:w,nysa:w,olawa:w,olecko:w,olkusz:w,olsztyn:w,opoczno:w,opole:w,ostroda:w,ostroleka:w,ostrowiec:w,ostrowwlkp:w,pila:w,pisz:w,podhale:w,podlasie:w,polkowice:w,pomorze:w,pomorskie:w,prochowice:w,pruszkow:w,przeworsk:w,pulawy:w,radom:w,"rawa-maz":w,rybnik:w,rzeszow:w,sanok:w,sejny:w,slask:w,slupsk:w,sosnowiec:w,"stalowa-wola":w,skoczow:w,starachowice:w,
    stargard:w,suwalki:w,swidnica:w,swiebodzin:w,swinoujscie:w,szczecin:w,szczytno:w,tarnobrzeg:w,tgory:w,turek:w,tychy:w,ustka:w,walbrzych:w,warmia:w,warszawa:w,waw:w,wegrow:w,wielun:w,wlocl:w,wloclawek:w,wodzislaw:w,wolomin:w,wroclaw:w,zachpomor:w,zagan:w,zarow:w,zgora:w,zgorzelec:w,beep:y,krasnik:y,leczna:y,lubartow:y,lublin:y,poniatowa:y,swidnik:y,co:y,art:y,gliwice:y,krakow:y,poznan:y,wroc:y,zakopane:y,gda:y,gdansk:y,gdynia:y,med:y,sopot:y}},pm:{$:1,succ:{own:y}},pn:{$:1,succ:{gov:w,co:w,org:w,edu:w,
    net:w}},post:w,pr:{$:1,succ:{com:w,net:w,org:w,gov:w,edu:w,isla:w,pro:w,biz:w,info:w,name:w,est:w,prof:w,ac:w}},pro:{$:1,succ:{aaa:w,aca:w,acct:w,avocat:w,bar:w,cpa:w,eng:w,jur:w,law:w,med:w,recht:w,cloudns:y,dnstrace:{$:0,succ:{bci:y}},barsy:y}},ps:{$:1,succ:{edu:w,gov:w,sec:w,plo:w,com:w,org:w,net:w}},pt:{$:1,succ:{net:w,gov:w,org:w,edu:w,"int":w,publ:w,com:w,nome:w,blogspot:y,nym:y}},pw:{$:1,succ:{co:w,ne:w,or:w,ed:w,go:w,belau:w,cloudns:y,x443:y,nom:y}},py:{$:1,succ:{com:w,coop:w,edu:w,gov:w,
    mil:w,net:w,org:w}},qa:{$:1,succ:{com:w,edu:w,gov:w,mil:w,name:w,net:w,org:w,sch:w,blogspot:y,nom:y}},re:{$:1,succ:{asso:w,com:w,nom:w,blogspot:y}},ro:{$:1,succ:{arts:w,com:w,firm:w,info:w,nom:w,nt:w,org:w,rec:w,store:w,tm:w,www:w,shop:y,blogspot:y,nym:y}},rs:{$:1,succ:{ac:w,co:w,edu:w,gov:w,"in":w,org:w,blogspot:y,ua:y,nom:y,ox:y}},ru:{$:1,succ:{ac:w,edu:w,gov:w,"int":w,mil:w,test:w,adygeya:y,bashkiria:y,bir:y,cbg:y,com:y,dagestan:y,grozny:y,kalmykia:y,kustanai:y,marine:y,mordovia:y,msk:y,mytis:y,
    nalchik:y,nov:y,pyatigorsk:y,spb:y,vladikavkaz:y,vladimir:y,blogspot:y,myjino:{$:2,succ:{hosting:B,landing:B,spectrum:B,vps:B}},cldmail:{$:0,succ:{hb:y}},net:y,org:y,pp:y,ras:y}},rw:{$:1,succ:{ac:w,co:w,coop:w,gov:w,mil:w,net:w,org:w}},sa:{$:1,succ:{com:w,net:w,org:w,gov:w,med:w,pub:w,edu:w,sch:w}},sb:D,sc:D,sd:{$:1,succ:{com:w,net:w,org:w,edu:w,med:w,tv:w,gov:w,info:w}},se:{$:1,succ:{a:w,ac:w,b:w,bd:w,brand:w,c:w,d:w,e:w,f:w,fh:w,fhsk:w,fhv:w,g:w,h:w,i:w,k:w,komforb:w,kommunalforbund:w,komvux:w,
    l:w,lanbib:w,m:w,n:w,naturbruksgymn:w,o:w,org:w,p:w,parti:w,pp:w,press:w,r:w,s:w,t:w,tm:w,u:w,w,x:w,y:w,z:w,com:y,blogspot:y,conf:y}},sg:{$:1,succ:{com:w,net:w,org:w,gov:w,edu:w,per:w,blogspot:y}},sh:{$:1,succ:{com:w,net:w,gov:w,org:w,mil:w,hashbang:y,platform:B,wedeploy:y,now:y}},si:{$:1,succ:{blogspot:y,nom:y}},sj:w,sk:S,sl:D,sm:w,sn:{$:1,succ:{art:w,com:w,edu:w,gouv:w,org:w,perso:w,univ:w,blogspot:y}},so:{$:1,succ:{com:w,net:w,org:w,sch:y}},sr:w,st:{$:1,succ:{co:w,com:w,consulado:w,edu:w,embaixada:w,
    gov:w,mil:w,net:w,org:w,principe:w,saotome:w,store:w,nom:y,noho:y}},su:{$:1,succ:{abkhazia:y,adygeya:y,aktyubinsk:y,arkhangelsk:y,armenia:y,ashgabad:y,azerbaijan:y,balashov:y,bashkiria:y,bryansk:y,bukhara:y,chimkent:y,dagestan:y,"east-kazakhstan":y,exnet:y,georgia:y,grozny:y,ivanovo:y,jambyl:y,kalmykia:y,kaluga:y,karacol:y,karaganda:y,karelia:y,khakassia:y,krasnodar:y,kurgan:y,kustanai:y,lenug:y,mangyshlak:y,mordovia:y,msk:y,murmansk:y,nalchik:y,navoi:y,"north-kazakhstan":y,nov:y,obninsk:y,penza:y,
    pokrovsk:y,sochi:y,spb:y,tashkent:y,termez:y,togliatti:y,troitsk:y,tselinograd:y,tula:y,tuva:y,vladikavkaz:y,vladimir:y,vologda:y,nym:y}},sv:{$:1,succ:{com:w,edu:w,gob:w,org:w,red:w}},sx:{$:1,succ:{gov:w,nym:y}},sy:x,sz:{$:1,succ:{co:w,ac:w,org:w}},tc:w,td:z$1,tel:w,tf:w,tg:w,th:{$:1,succ:{ac:w,co:w,go:w,"in":w,mi:w,net:w,or:w,online:y,shop:y}},tj:{$:1,succ:{ac:w,biz:w,co:w,com:w,edu:w,go:w,gov:w,"int":w,mil:w,name:w,net:w,nic:w,org:w,test:w,web:w,nom:y}},tk:w,tl:A,tm:{$:1,succ:{com:w,co:w,org:w,net:w,
    nom:w,gov:w,mil:w,edu:w}},tn:{$:1,succ:{com:w,ens:w,fin:w,gov:w,ind:w,intl:w,nat:w,net:w,org:w,info:w,perso:w,tourism:w,edunet:w,rnrt:w,rns:w,rnu:w,mincom:w,agrinet:w,defense:w,turen:w}},to:{$:1,succ:{com:w,gov:w,net:w,org:w,edu:w,mil:w,vpnplus:y}},tr:{$:1,succ:{av:w,bbs:w,bel:w,biz:w,com:z$1,dr:w,edu:w,gen:w,gov:w,info:w,mil:w,k12:w,kep:w,name:w,net:w,org:w,pol:w,tel:w,tsk:w,tv:w,web:w,nc:A}},tt:{$:1,succ:{co:w,com:w,org:w,net:w,biz:w,info:w,pro:w,"int":w,coop:w,jobs:w,mobi:w,travel:w,museum:w,aero:w,
    name:w,gov:w,edu:w}},tv:{$:1,succ:{dyndns:y,"better-than":y,"on-the-web":y,"worse-than":y}},tw:{$:1,succ:{edu:w,gov:w,mil:w,com:{$:1,succ:{mymailer:y}},net:w,org:w,idv:w,game:w,ebiz:w,club:w,"xn--zf0ao64a":w,"\u7db2\u8def":w,"xn--uc0atv":w,"\u7d44\u7e54":w,"xn--czrw28b":w,"\u5546\u696d":w,url:y,blogspot:y,nym:y}},tz:{$:1,succ:{ac:w,co:w,go:w,hotel:w,info:w,me:w,mil:w,mobi:w,ne:w,or:w,sc:w,tv:w}},ua:{$:1,succ:{com:w,edu:w,gov:w,"in":w,net:w,org:w,cherkassy:w,cherkasy:w,chernigov:w,chernihiv:w,chernivtsi:w,
    chernovtsy:w,ck:w,cn:w,cr:w,crimea:w,cv:w,dn:w,dnepropetrovsk:w,dnipropetrovsk:w,dominic:w,donetsk:w,dp:w,"if":w,"ivano-frankivsk":w,kh:w,kharkiv:w,kharkov:w,kherson:w,khmelnitskiy:w,khmelnytskyi:w,kiev:w,kirovograd:w,km:w,kr:w,krym:w,ks:w,kv:w,kyiv:w,lg:w,lt:w,lugansk:w,lutsk:w,lv:w,lviv:w,mk:w,mykolaiv:w,nikolaev:w,od:w,odesa:w,odessa:w,pl:w,poltava:w,rivne:w,rovno:w,rv:w,sb:w,sebastopol:w,sevastopol:w,sm:w,sumy:w,te:w,ternopil:w,uz:w,uzhgorod:w,vinnica:w,vinnytsia:w,vn:w,volyn:w,yalta:w,zaporizhzhe:w,
    zaporizhzhia:w,zhitomir:w,zhytomyr:w,zp:w,zt:w,cc:y,inf:y,ltd:y,biz:y,co:y,pp:y}},ug:{$:1,succ:{co:w,or:w,ac:w,sc:w,go:w,ne:w,com:w,org:w,blogspot:y,nom:y}},uk:{$:1,succ:{ac:w,co:{$:1,succ:{bytemark:{$:0,succ:{dh:y,vm:y}},blogspot:y,barsy:y,barsyonline:y,"nh-serv":y,"no-ip":y,wellbeingzone:y,gwiddle:y}},gov:{$:1,succ:{service:y,homeoffice:y}},ltd:w,me:w,net:w,nhs:w,org:{$:1,succ:{glug:y,lug:y,lugs:y}},plc:w,police:w,sch:C,barsy:y}},us:{$:1,succ:{dni:w,fed:w,isa:w,kids:w,nsn:w,ak:X,al:X,ar:X,as:X,
    az:X,ca:X,co:X,ct:X,dc:X,de:{$:1,succ:{k12:w,cc:w,lib:y}},fl:X,ga:X,gu:X,hi:Y,ia:X,id:X,il:X,"in":X,ks:X,ky:X,la:X,ma:{$:1,succ:{k12:{$:1,succ:{pvt:w,chtr:w,paroch:w}},cc:w,lib:w}},md:X,me:X,mi:{$:1,succ:{k12:w,cc:w,lib:w,"ann-arbor":w,cog:w,dst:w,eaton:w,gen:w,mus:w,tec:w,washtenaw:w}},mn:X,mo:X,ms:X,mt:X,nc:X,nd:Y,ne:X,nh:X,nj:X,nm:X,nv:X,ny:X,oh:X,ok:X,or:X,pa:X,pr:X,ri:X,sc:X,sd:Y,tn:X,tx:X,ut:X,vi:X,vt:X,va:X,wa:X,wi:X,wv:{$:1,succ:{cc:w}},wy:X,cloudns:y,drud:y,"is-by":y,"land-4-sale":y,"stuff-4-sale":y,
    freeddns:y,golffan:y,noip:y,pointto:y}},uy:{$:1,succ:{com:z$1,edu:w,gub:w,mil:w,net:w,org:w,nom:y}},uz:{$:1,succ:{co:w,com:w,net:w,org:w}},va:w,vc:{$:1,succ:{com:w,net:w,org:w,gov:w,mil:w,edu:w,nom:y}},ve:{$:1,succ:{arts:w,co:w,com:w,e12:w,edu:w,firm:w,gob:w,gov:w,info:w,"int":w,mil:w,net:w,org:w,rec:w,store:w,tec:w,web:w}},vg:O,vi:{$:1,succ:{co:w,com:w,k12:w,net:w,org:w}},vn:{$:1,succ:{com:w,net:w,org:w,edu:w,gov:w,"int":w,ac:w,biz:w,info:w,name:w,pro:w,health:w,blogspot:y}},vu:M,wf:w,ws:{$:1,succ:{com:w,
    net:w,org:w,gov:w,edu:w,advisor:B,cloud66:y,dyndns:y,mypets:y}},yt:w,"xn--mgbaam7a8h":w,"\u0627\u0645\u0627\u0631\u0627\u062a":w,"xn--y9a3aq":w,"\u0570\u0561\u0575":w,"xn--54b7fta0cc":w,"\u09ac\u09be\u0982\u09b2\u09be":w,"xn--90ae":w,"\u0431\u0433":w,"xn--90ais":w,"\u0431\u0435\u043b":w,"xn--fiqs8s":w,"\u4e2d\u56fd":w,"xn--fiqz9s":w,"\u4e2d\u570b":w,"xn--lgbbat1ad8j":w,"\u0627\u0644\u062c\u0632\u0627\u0626\u0631":w,"xn--wgbh1c":w,"\u0645\u0635\u0631":w,"xn--e1a4c":w,"\u0435\u044e":w,"xn--node":w,
    "\u10d2\u10d4":w,"xn--qxam":w,"\u03b5\u03bb":w,"xn--j6w193g":{$:1,succ:{"xn--55qx5d":w,"xn--wcvs22d":w,"xn--mxtq1m":w,"xn--gmqw5a":w,"xn--od0alg":w,"xn--uc0atv":w}},"\u9999\u6e2f":{$:1,succ:{"\u516c\u53f8":w,"\u6559\u80b2":w,"\u653f\u5e9c":w,"\u500b\u4eba":w,"\u7db2\u7d61":w,"\u7d44\u7e54":w}},"xn--2scrj9c":w,"\u0cad\u0cbe\u0cb0\u0ca4":w,"xn--3hcrj9c":w,"\u0b2d\u0b3e\u0b30\u0b24":w,"xn--45br5cyl":w,"\u09ad\u09be\u09f0\u09a4":w,"xn--h2breg3eve":w,"\u092d\u093e\u0930\u0924\u092e\u094d":w,"xn--h2brj9c8c":w,
    "\u092d\u093e\u0930\u094b\u0924":w,"xn--mgbgu82a":w,"\u0680\u0627\u0631\u062a":w,"xn--rvc1e0am3e":w,"\u0d2d\u0d3e\u0d30\u0d24\u0d02":w,"xn--h2brj9c":w,"\u092d\u093e\u0930\u0924":w,"xn--mgbbh1a":w,"\u0628\u0627\u0631\u062a":w,"xn--mgbbh1a71e":w,"\u0628\u06be\u0627\u0631\u062a":w,"xn--fpcrj9c3d":w,"\u0c2d\u0c3e\u0c30\u0c24\u0c4d":w,"xn--gecrj9c":w,"\u0aad\u0abe\u0ab0\u0aa4":w,"xn--s9brj9c":w,"\u0a2d\u0a3e\u0a30\u0a24":w,"xn--45brj9c":w,"\u09ad\u09be\u09b0\u09a4":w,"xn--xkc2dl3a5ee0h":w,"\u0b87\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bbe":w,
    "xn--mgba3a4f16a":w,"\u0627\u06cc\u0631\u0627\u0646":w,"xn--mgba3a4fra":w,"\u0627\u064a\u0631\u0627\u0646":w,"xn--mgbtx2b":w,"\u0639\u0631\u0627\u0642":w,"xn--mgbayh7gpa":w,"\u0627\u0644\u0627\u0631\u062f\u0646":w,"xn--3e0b707e":w,"\ud55c\uad6d":w,"xn--80ao21a":w,"\u049b\u0430\u0437":w,"xn--fzc2c9e2c":w,"\u0dbd\u0d82\u0d9a\u0dcf":w,"xn--xkc2al3hye2a":w,"\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8":w,"xn--mgbc0a9azcg":w,"\u0627\u0644\u0645\u063a\u0631\u0628":w,"xn--d1alf":w,"\u043c\u043a\u0434":w,"xn--l1acc":w,
    "\u043c\u043e\u043d":w,"xn--mix891f":w,"\u6fb3\u9580":w,"xn--mix082f":w,"\u6fb3\u95e8":w,"xn--mgbx4cd0ab":w,"\u0645\u0644\u064a\u0633\u064a\u0627":w,"xn--mgb9awbf":w,"\u0639\u0645\u0627\u0646":w,"xn--mgbai9azgqp6j":w,"\u067e\u0627\u06a9\u0633\u062a\u0627\u0646":w,"xn--mgbai9a5eva00b":w,"\u067e\u0627\u0643\u0633\u062a\u0627\u0646":w,"xn--ygbi2ammx":w,"\u0641\u0644\u0633\u0637\u064a\u0646":w,"xn--90a3ac":{$:1,succ:{"xn--o1ac":w,"xn--c1avg":w,"xn--90azh":w,"xn--d1at":w,"xn--o1ach":w,"xn--80au":w}},"\u0441\u0440\u0431":{$:1,
    succ:{"\u043f\u0440":w,"\u043e\u0440\u0433":w,"\u043e\u0431\u0440":w,"\u043e\u0434":w,"\u0443\u043f\u0440":w,"\u0430\u043a":w}},"xn--p1ai":w,"\u0440\u0444":w,"xn--wgbl6a":w,"\u0642\u0637\u0631":w,"xn--mgberp4a5d4ar":w,"\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629":w,"xn--mgberp4a5d4a87g":w,"\u0627\u0644\u0633\u0639\u0648\u062f\u06cc\u0629":w,"xn--mgbqly7c0a67fbc":w,"\u0627\u0644\u0633\u0639\u0648\u062f\u06cc\u06c3":w,"xn--mgbqly7cvafr":w,"\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0647":w,"xn--mgbpl2fh":w,
    "\u0633\u0648\u062f\u0627\u0646":w,"xn--yfro4i67o":w,"\u65b0\u52a0\u5761":w,"xn--clchc0ea0b2g2a9gcd":w,"\u0b9a\u0bbf\u0b99\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd":w,"xn--ogbpf8fl":w,"\u0633\u0648\u0631\u064a\u0629":w,"xn--mgbtf8fl":w,"\u0633\u0648\u0631\u064a\u0627":w,"xn--o3cw4h":{$:1,succ:{"xn--12c1fe0br":w,"xn--12co0c3b4eva":w,"xn--h3cuzk1di":w,"xn--o3cyx2a":w,"xn--m3ch0j3a":w,"xn--12cfi8ixb8l":w}},"\u0e44\u0e17\u0e22":{$:1,succ:{"\u0e28\u0e36\u0e01\u0e29\u0e32":w,"\u0e18\u0e38\u0e23\u0e01\u0e34\u0e08":w,
    "\u0e23\u0e31\u0e10\u0e1a\u0e32\u0e25":w,"\u0e17\u0e2b\u0e32\u0e23":w,"\u0e40\u0e19\u0e47\u0e15":w,"\u0e2d\u0e07\u0e04\u0e4c\u0e01\u0e23":w}},"xn--pgbs0dh":w,"\u062a\u0648\u0646\u0633":w,"xn--kpry57d":w,"\u53f0\u7063":w,"xn--kprw13d":w,"\u53f0\u6e7e":w,"xn--nnx388a":w,"\u81fa\u7063":w,"xn--j1amh":w,"\u0443\u043a\u0440":w,"xn--mgb2ddes":w,"\u0627\u0644\u064a\u0645\u0646":w,xxx:w,ye:C,za:{$:0,succ:{ac:w,agric:w,alt:w,co:z$1,edu:w,gov:w,grondar:w,law:w,mil:w,net:w,ngo:w,nis:w,nom:w,org:w,school:w,tm:w,
    web:w}},zm:{$:1,succ:{ac:w,biz:w,co:w,com:w,edu:w,gov:w,info:w,mil:w,net:w,org:w,sch:w}},zw:{$:1,succ:{ac:w,co:w,gov:w,mil:w,org:w}},aaa:w,aarp:w,abarth:w,abb:w,abbott:w,abbvie:w,abc:w,able:w,abogado:w,abudhabi:w,academy:{$:1,succ:{official:y}},accenture:w,accountant:w,accountants:w,aco:w,actor:w,adac:w,ads:w,adult:w,aeg:w,aetna:w,afamilycompany:w,afl:w,africa:w,agakhan:w,agency:w,aig:w,aigo:w,airbus:w,airforce:w,airtel:w,akdn:w,alfaromeo:w,alibaba:w,alipay:w,allfinanz:w,allstate:w,ally:w,alsace:w,
    alstom:w,americanexpress:w,americanfamily:w,amex:w,amfam:w,amica:w,amsterdam:w,analytics:w,android:w,anquan:w,anz:w,aol:w,apartments:w,app:{$:1,succ:{wnext:y,run:{$:2,succ:{a:y}},hasura:y,loginline:y,telebit:y}},apple:w,aquarelle:w,arab:w,aramco:w,archi:w,army:w,art:w,arte:w,asda:w,associates:w,athleta:w,attorney:w,auction:w,audi:w,audible:w,audio:w,auspost:w,author:w,auto:w,autos:w,avianca:w,aws:w,axa:w,azure:w,baby:w,baidu:w,banamex:w,bananarepublic:w,band:w,bank:w,bar:w,barcelona:w,barclaycard:w,
    barclays:w,barefoot:w,bargains:w,baseball:w,basketball:w,bauhaus:w,bayern:w,bbc:w,bbt:w,bbva:w,bcg:w,bcn:w,beats:w,beauty:w,beer:w,bentley:w,berlin:w,best:w,bestbuy:w,bet:w,bharti:w,bible:w,bid:w,bike:w,bing:w,bingo:w,bio:w,black:w,blackfriday:w,blockbuster:w,blog:w,bloomberg:w,blue:w,bms:w,bmw:w,bnl:w,bnpparibas:w,boats:w,boehringer:w,bofa:w,bom:w,bond:w,boo:w,book:w,booking:w,bosch:w,bostik:w,boston:w,bot:w,boutique:w,box:w,bradesco:w,bridgestone:w,broadway:w,broker:w,brother:w,brussels:w,budapest:w,
    bugatti:w,build:w,builders:w,business:E,buy:w,buzz:w,bzh:w,cab:w,cafe:w,cal:w,call:w,calvinklein:w,cam:w,camera:w,camp:w,cancerresearch:w,canon:w,capetown:w,capital:w,capitalone:w,car:w,caravan:w,cards:w,care:w,career:w,careers:w,cars:w,cartier:w,casa:{$:1,succ:{nabu:{$:0,succ:{ui:y}}}},"case":w,caseih:w,cash:w,casino:w,catering:w,catholic:w,cba:w,cbn:w,cbre:w,cbs:w,ceb:w,center:w,ceo:w,cern:w,cfa:w,cfd:w,chanel:w,channel:w,charity:w,chase:w,chat:w,cheap:w,chintai:w,christmas:w,chrome:w,chrysler:w,
    church:w,cipriani:w,circle:w,cisco:w,citadel:w,citi:w,citic:w,city:F,cityeats:w,claims:w,cleaning:w,click:w,clinic:w,clinique:w,clothing:w,cloud:{$:1,succ:{statics:B,linkyard:y,magentosite:B,vapor:y,"on-rancher":B,sensiosite:B,trafficplex:y,voorloper:y}},club:{$:1,succ:{cloudns:y,barsy:y,pony:y}},clubmed:w,coach:w,codes:w,coffee:w,college:w,cologne:w,comcast:w,commbank:w,community:{$:1,succ:{ravendb:y}},company:w,compare:w,computer:w,comsec:w,condos:w,construction:w,consulting:w,contact:w,contractors:w,
    cooking:w,cookingchannel:w,cool:{$:1,succ:{de:y}},corsica:w,country:w,coupon:w,coupons:w,courses:w,credit:w,creditcard:w,creditunion:w,cricket:w,crown:w,crs:w,cruise:w,cruises:w,csc:w,cuisinella:w,cymru:w,cyou:w,dabur:w,dad:w,dance:w,data:w,date:w,dating:w,datsun:w,day:w,dclk:w,dds:w,deal:w,dealer:w,deals:w,degree:w,delivery:w,dell:w,deloitte:w,delta:w,democrat:w,dental:w,dentist:w,desi:w,design:{$:1,succ:{bss:y}},dev:{$:1,succ:{lcl:B,stg:B,workers:y,loginline:y}},dhl:w,diamonds:w,diet:w,digital:{$:1,
    succ:{cloudapps:{$:2,succ:{london:y}}}},direct:{$:1,succ:{fastpanel:y}},directory:w,discount:w,discover:w,dish:w,diy:w,dnp:w,docs:w,doctor:w,dodge:w,dog:w,domains:w,dot:w,download:w,drive:w,dtv:w,dubai:w,duck:w,dunlop:w,duns:w,dupont:w,durban:w,dvag:w,dvr:w,earth:{$:1,succ:{dapps:{$:0,succ:{"*":y,bzz:B}}}},eat:w,eco:w,edeka:w,education:E,email:w,emerck:w,energy:w,engineer:w,engineering:w,enterprises:w,epson:w,equipment:w,ericsson:w,erni:w,esq:w,estate:{$:1,succ:{compute:B}},esurance:w,etisalat:w,
    eurovision:w,eus:{$:1,succ:{party:{$:0,succ:{user:y}}}},events:E,everbank:w,exchange:w,expert:w,exposed:w,express:w,extraspace:w,fage:w,fail:w,fairwinds:w,faith:N,family:w,fan:w,fans:w,farm:{$:1,succ:{storj:y}},farmers:w,fashion:{$:1,succ:{of:y,on:y}},fast:w,fedex:w,feedback:w,ferrari:w,ferrero:w,fiat:w,fidelity:w,fido:w,film:w,"final":w,finance:w,financial:E,fire:w,firestone:w,firmdale:w,fish:w,fishing:w,fit:{$:1,succ:{ptplus:y}},fitness:w,flickr:w,flights:w,flir:w,florist:w,flowers:w,fly:w,foo:w,
    food:w,foodnetwork:w,football:{$:1,succ:{of:y}},ford:w,forex:w,forsale:w,forum:w,foundation:w,fox:w,free:w,fresenius:w,frl:w,frogans:w,frontdoor:w,frontier:w,ftr:w,fujitsu:w,fujixerox:w,fun:w,fund:w,furniture:w,futbol:w,fyi:w,gal:w,gallery:w,gallo:w,gallup:w,game:w,games:w,gap:w,garden:w,gbiz:w,gdn:{$:1,succ:{cnpy:y}},gea:w,gent:w,genting:w,george:w,ggee:w,gift:w,gifts:w,gives:w,giving:w,glade:w,glass:w,gle:w,global:w,globo:w,gmail:w,gmbh:w,gmo:w,gmx:w,godaddy:w,gold:w,goldpoint:w,golf:w,goo:w,goodyear:w,
    goog:{$:1,succ:{cloud:y}},google:w,gop:w,got:w,grainger:w,graphics:w,gratis:w,green:w,gripe:w,grocery:w,group:{$:1,succ:{discourse:y}},guardian:w,gucci:w,guge:w,guide:w,guitars:w,guru:w,hair:w,hamburg:w,hangout:w,haus:w,hbo:w,hdfc:w,hdfcbank:w,health:w,healthcare:w,help:w,helsinki:w,here:w,hermes:w,hgtv:w,hiphop:w,hisamitsu:w,hitachi:w,hiv:w,hkt:w,hockey:w,holdings:w,holiday:w,homedepot:w,homegoods:w,homes:w,homesense:w,honda:w,honeywell:w,horse:w,hospital:w,host:{$:1,succ:{cloudaccess:y,freesite:y,
    pcloud:y,half:y}},hosting:{$:1,succ:{opencraft:y}},hot:w,hoteles:w,hotels:w,hotmail:w,house:w,how:w,hsbc:w,hughes:w,hyatt:w,hyundai:w,ibm:w,icbc:w,ice:w,icu:w,ieee:w,ifm:w,ikano:w,imamat:w,imdb:w,immo:w,immobilien:w,inc:w,industries:w,infiniti:w,ing:w,ink:F,institute:w,insurance:w,insure:w,intel:w,international:w,intuit:w,investments:w,ipiranga:w,irish:w,iselect:w,ismaili:w,ist:w,istanbul:w,itau:w,itv:w,iveco:w,jaguar:w,java:w,jcb:w,jcp:w,jeep:w,jetzt:w,jewelry:w,jio:w,jll:w,jmp:w,jnj:w,joburg:w,
    jot:w,joy:w,jpmorgan:w,jprs:w,juegos:w,juniper:w,kaufen:w,kddi:w,kerryhotels:w,kerrylogistics:w,kerryproperties:w,kfh:w,kia:w,kim:w,kinder:w,kindle:w,kitchen:w,kiwi:w,koeln:w,komatsu:w,kosher:w,kpmg:w,kpn:w,krd:{$:1,succ:{co:y,edu:y}},kred:w,kuokgroup:w,kyoto:w,lacaixa:w,ladbrokes:w,lamborghini:w,lamer:w,lancaster:w,lancia:w,lancome:w,land:{$:1,succ:{"static":{$:2,succ:{dev:y,sites:y}}}},landrover:w,lanxess:w,lasalle:w,lat:w,latino:w,latrobe:w,law:w,lawyer:w,lds:w,lease:w,leclerc:w,lefrak:w,legal:w,
    lego:w,lexus:w,lgbt:w,liaison:w,lidl:w,life:w,lifeinsurance:w,lifestyle:w,lighting:w,like:w,lilly:w,limited:w,limo:w,lincoln:w,linde:w,link:{$:1,succ:{cyon:y,mypep:y,dweb:B}},lipsy:w,live:w,living:w,lixil:w,llc:w,loan:w,loans:w,locker:w,locus:w,loft:w,lol:w,london:{$:1,succ:{"in":y,of:y}},lotte:w,lotto:w,love:w,lpl:w,lplfinancial:w,ltd:w,ltda:w,lundbeck:w,lupin:w,luxe:w,luxury:w,macys:w,madrid:w,maif:w,maison:w,makeup:w,man:w,management:{$:1,succ:{router:y}},mango:w,map:w,market:w,marketing:w,markets:w,
    marriott:w,marshalls:w,maserati:w,mattel:w,mba:w,mckinsey:w,med:w,media:w,meet:w,melbourne:w,meme:w,memorial:w,men:T$1,menu:U,merckmsd:w,metlife:w,miami:w,microsoft:w,mini:w,mint:w,mit:w,mitsubishi:w,mlb:w,mls:w,mma:w,mobile:w,mobily:w,moda:w,moe:w,moi:w,mom:{$:1,succ:{and:y,"for":y}},monash:w,money:w,monster:w,mopar:w,mormon:w,mortgage:w,moscow:w,moto:w,motorcycles:w,mov:w,movie:w,movistar:w,msd:w,mtn:w,mtr:w,mutual:w,nab:w,nadex:w,nagoya:w,nationwide:w,natura:w,navy:w,nba:w,nec:w,netbank:w,netflix:w,
    network:{$:1,succ:{alces:B,co:y,arvo:y,azimuth:y}},neustar:w,"new":w,newholland:w,news:w,next:w,nextdirect:w,nexus:w,nfl:w,ngo:w,nhk:w,nico:w,nike:w,nikon:w,ninja:w,nissan:w,nissay:w,nokia:w,northwesternmutual:w,norton:w,now:w,nowruz:w,nowtv:w,nra:w,nrw:w,ntt:w,nyc:w,obi:w,observer:w,off:w,office:w,okinawa:w,olayan:w,olayangroup:w,oldnavy:w,ollo:w,omega:w,one:{$:1,succ:{onred:{$:2,succ:{staging:y}},"for":y,homelink:y}},ong:w,onl:w,online:U,onyourside:w,ooo:w,open:w,oracle:w,orange:w,organic:w,origins:w,
    osaka:w,otsuka:w,ott:w,ovh:{$:1,succ:{nerdpol:y}},page:{$:1,succ:{prvcy:y}},panasonic:w,paris:w,pars:w,partners:w,parts:w,party:N,passagens:w,pay:w,pccw:w,pet:w,pfizer:w,pharmacy:w,phd:w,philips:w,phone:w,photo:w,photography:w,photos:w,physio:w,piaget:w,pics:w,pictet:w,pictures:{$:1,succ:{1337:y}},pid:w,pin:w,ping:w,pink:w,pioneer:w,pizza:w,place:E,play:w,playstation:w,plumbing:w,plus:w,pnc:w,pohl:w,poker:w,politie:w,porn:w,pramerica:w,praxi:w,press:w,prime:w,prod:w,productions:w,prof:w,progressive:w,
    promo:w,properties:w,property:w,protection:w,pru:w,prudential:w,pub:U,pwc:w,qpon:w,quebec:w,quest:w,qvc:w,racing:w,radio:w,raid:w,read:w,realestate:w,realtor:w,realty:w,recipes:w,red:w,redstone:w,redumbrella:w,rehab:w,reise:w,reisen:w,reit:w,reliance:w,ren:w,rent:w,rentals:w,repair:w,report:w,republican:w,rest:w,restaurant:w,review:N,reviews:w,rexroth:w,rich:w,richardli:w,ricoh:w,rightathome:w,ril:w,rio:w,rip:{$:1,succ:{clan:y}},rmit:w,rocher:w,rocks:{$:1,succ:{myddns:y,"lima-city":y,webspace:y}},
    rodeo:w,rogers:w,room:w,rsvp:w,rugby:w,ruhr:w,run:{$:1,succ:{development:y,ravendb:y,repl:y}},rwe:w,ryukyu:w,saarland:w,safe:w,safety:w,sakura:w,sale:T$1,salon:w,samsclub:w,samsung:w,sandvik:w,sandvikcoromant:w,sanofi:w,sap:w,sarl:w,sas:w,save:w,saxo:w,sbi:w,sbs:w,sca:w,scb:w,schaeffler:w,schmidt:w,scholarships:w,school:w,schule:w,schwarz:w,science:N,scjohnson:w,scor:w,scot:w,search:w,seat:w,secure:w,security:w,seek:w,select:w,sener:w,services:{$:1,succ:{loginline:y}},ses:w,seven:w,sew:w,sex:w,sexy:w,
    sfr:w,shangrila:w,sharp:w,shaw:w,shell:w,shia:w,shiksha:w,shoes:w,shop:U,shopping:w,shouji:w,show:w,showtime:w,shriram:w,silk:w,sina:w,singles:w,site:{$:1,succ:{cyon:y,loginline:y,barsy:y,platformsh:B,byen:y}},ski:w,skin:w,sky:w,skype:w,sling:w,smart:w,smile:w,sncf:w,soccer:w,social:w,softbank:w,software:w,sohu:w,solar:w,solutions:w,song:w,sony:w,soy:w,space:{$:1,succ:{linkitools:y,uber:y,xs4all:y}},sport:w,spot:w,spreadbetting:w,srl:w,srt:w,stada:w,staples:w,star:w,starhub:w,statebank:w,statefarm:w,
    stc:w,stcgroup:w,stockholm:w,storage:w,store:w,stream:w,studio:w,study:w,style:w,sucks:w,supplies:w,supply:w,support:U,surf:w,surgery:w,suzuki:w,swatch:w,swiftcover:w,swiss:w,sydney:w,symantec:w,systems:{$:1,succ:{knightpoint:y}},tab:w,taipei:w,talk:w,taobao:w,target:w,tatamotors:w,tatar:w,tattoo:w,tax:w,taxi:w,tci:w,tdk:w,team:w,tech:w,technology:E,telefonica:w,temasek:w,tennis:w,teva:w,thd:w,theater:w,theatre:w,tiaa:w,tickets:w,tienda:w,tiffany:w,tips:w,tires:w,tirol:w,tjmaxx:w,tjx:w,tkmaxx:w,tmall:w,
    today:w,tokyo:w,tools:w,top:{$:1,succ:{"now-dns":y,ntdll:y}},toray:w,toshiba:w,total:w,tours:w,town:w,toyota:w,toys:w,trade:N,trading:w,training:w,travel:w,travelchannel:w,travelers:w,travelersinsurance:w,trust:w,trv:w,tube:w,tui:w,tunes:w,tushu:w,tvs:w,ubank:w,ubs:w,uconnect:w,unicom:w,university:w,uno:w,uol:w,ups:w,vacations:w,vana:w,vanguard:w,vegas:w,ventures:w,verisign:w,versicherung:w,vet:w,viajes:w,video:w,vig:w,viking:w,villas:w,vin:w,vip:w,virgin:w,visa:w,vision:w,vistaprint:w,viva:w,vivo:w,
    vlaanderen:w,vodka:w,volkswagen:w,volvo:w,vote:w,voting:w,voto:w,voyage:w,vuelos:w,wales:w,walmart:w,walter:w,wang:w,wanggou:w,warman:w,watch:w,watches:w,weather:w,weatherchannel:w,webcam:w,weber:w,website:w,wed:w,wedding:w,weibo:w,weir:w,whoswho:w,wien:w,wiki:w,williamhill:w,win:w,windows:w,wine:w,winners:w,wme:w,wolterskluwer:w,woodside:w,work:{$:1,succ:{of:y,to:y}},works:w,world:w,wow:w,wtc:w,wtf:w,xbox:w,xerox:w,xfinity:w,xihuan:w,xin:w,"xn--11b4c3d":w,"\u0915\u0949\u092e":w,"xn--1ck2e1b":w,"\u30bb\u30fc\u30eb":w,
    "xn--1qqw23a":w,"\u4f5b\u5c71":w,"xn--30rr7y":w,"\u6148\u5584":w,"xn--3bst00m":w,"\u96c6\u56e2":w,"xn--3ds443g":w,"\u5728\u7ebf":w,"xn--3oq18vl8pn36a":w,"\u5927\u4f17\u6c7d\u8f66":w,"xn--3pxu8k":w,"\u70b9\u770b":w,"xn--42c2d9a":w,"\u0e04\u0e2d\u0e21":w,"xn--45q11c":w,"\u516b\u5366":w,"xn--4gbrim":w,"\u0645\u0648\u0642\u0639":w,"xn--55qw42g":w,"\u516c\u76ca":w,"xn--55qx5d":w,"\u516c\u53f8":w,"xn--5su34j936bgsg":w,"\u9999\u683c\u91cc\u62c9":w,"xn--5tzm5g":w,"\u7f51\u7ad9":w,"xn--6frz82g":w,"\u79fb\u52a8":w,
    "xn--6qq986b3xl":w,"\u6211\u7231\u4f60":w,"xn--80adxhks":w,"\u043c\u043e\u0441\u043a\u0432\u0430":w,"xn--80aqecdr1a":w,"\u043a\u0430\u0442\u043e\u043b\u0438\u043a":w,"xn--80asehdb":w,"\u043e\u043d\u043b\u0430\u0439\u043d":w,"xn--80aswg":w,"\u0441\u0430\u0439\u0442":w,"xn--8y0a063a":w,"\u8054\u901a":w,"xn--9dbq2a":w,"\u05e7\u05d5\u05dd":w,"xn--9et52u":w,"\u65f6\u5c1a":w,"xn--9krt00a":w,"\u5fae\u535a":w,"xn--b4w605ferd":w,"\u6de1\u9a6c\u9521":w,"xn--bck1b9a5dre4c":w,"\u30d5\u30a1\u30c3\u30b7\u30e7\u30f3":w,
    "xn--c1avg":w,"\u043e\u0440\u0433":w,"xn--c2br7g":w,"\u0928\u0947\u091f":w,"xn--cck2b3b":w,"\u30b9\u30c8\u30a2":w,"xn--cg4bki":w,"\uc0bc\uc131":w,"xn--czr694b":w,"\u5546\u6807":w,"xn--czrs0t":w,"\u5546\u5e97":w,"xn--czru2d":w,"\u5546\u57ce":w,"xn--d1acj3b":w,"\u0434\u0435\u0442\u0438":w,"xn--eckvdtc9d":w,"\u30dd\u30a4\u30f3\u30c8":w,"xn--efvy88h":w,"\u65b0\u95fb":w,"xn--estv75g":w,"\u5de5\u884c":w,"xn--fct429k":w,"\u5bb6\u96fb":w,"xn--fhbei":w,"\u0643\u0648\u0645":w,"xn--fiq228c5hs":w,"\u4e2d\u6587\u7f51":w,
    "xn--fiq64b":w,"\u4e2d\u4fe1":w,"xn--fjq720a":w,"\u5a31\u4e50":w,"xn--flw351e":w,"\u8c37\u6b4c":w,"xn--fzys8d69uvgm":w,"\u96fb\u8a0a\u76c8\u79d1":w,"xn--g2xx48c":w,"\u8d2d\u7269":w,"xn--gckr3f0f":w,"\u30af\u30e9\u30a6\u30c9":w,"xn--gk3at1e":w,"\u901a\u8ca9":w,"xn--hxt814e":w,"\u7f51\u5e97":w,"xn--i1b6b1a6a2e":w,"\u0938\u0902\u0917\u0920\u0928":w,"xn--imr513n":w,"\u9910\u5385":w,"xn--io0a7i":w,"\u7f51\u7edc":w,"xn--j1aef":w,"\u043a\u043e\u043c":w,"xn--jlq61u9w7b":w,"\u8bfa\u57fa\u4e9a":w,"xn--jvr189m":w,
    "\u98df\u54c1":w,"xn--kcrx77d1x4a":w,"\u98de\u5229\u6d66":w,"xn--kpu716f":w,"\u624b\u8868":w,"xn--kput3i":w,"\u624b\u673a":w,"xn--mgba3a3ejt":w,"\u0627\u0631\u0627\u0645\u0643\u0648":w,"xn--mgba7c0bbn0a":w,"\u0627\u0644\u0639\u0644\u064a\u0627\u0646":w,"xn--mgbaakc7dvf":w,"\u0627\u062a\u0635\u0627\u0644\u0627\u062a":w,"xn--mgbab2bd":w,"\u0628\u0627\u0632\u0627\u0631":w,"xn--mgbb9fbpob":w,"\u0645\u0648\u0628\u0627\u064a\u0644\u064a":w,"xn--mgbca7dzdo":w,"\u0627\u0628\u0648\u0638\u0628\u064a":w,"xn--mgbi4ecexp":w,
    "\u0643\u0627\u062b\u0648\u0644\u064a\u0643":w,"xn--mgbt3dhd":w,"\u0647\u0645\u0631\u0627\u0647":w,"xn--mk1bu44c":w,"\ub2f7\ucef4":w,"xn--mxtq1m":w,"\u653f\u5e9c":w,"xn--ngbc5azd":w,"\u0634\u0628\u0643\u0629":w,"xn--ngbe9e0a":w,"\u0628\u064a\u062a\u0643":w,"xn--ngbrx":w,"\u0639\u0631\u0628":w,"xn--nqv7f":w,"\u673a\u6784":w,"xn--nqv7fs00ema":w,"\u7ec4\u7ec7\u673a\u6784":w,"xn--nyqy26a":w,"\u5065\u5eb7":w,"xn--otu796d":w,"\u62db\u8058":w,"xn--p1acf":w,"\u0440\u0443\u0441":w,"xn--pbt977c":w,"\u73e0\u5b9d":w,
    "xn--pssy2u":w,"\u5927\u62ff":w,"xn--q9jyb4c":w,"\u307f\u3093\u306a":w,"xn--qcka1pmc":w,"\u30b0\u30fc\u30b0\u30eb":w,"xn--rhqv96g":w,"\u4e16\u754c":w,"xn--rovu88b":w,"\u66f8\u7c4d":w,"xn--ses554g":w,"\u7f51\u5740":w,"xn--t60b56a":w,"\ub2f7\ub137":w,"xn--tckwe":w,"\u30b3\u30e0":w,"xn--tiq49xqyj":w,"\u5929\u4e3b\u6559":w,"xn--unup4y":w,"\u6e38\u620f":w,"xn--vermgensberater-ctb":w,"verm\u00f6gensberater":w,"xn--vermgensberatung-pwb":w,"verm\u00f6gensberatung":w,"xn--vhquv":w,"\u4f01\u4e1a":w,"xn--vuq861b":w,
    "\u4fe1\u606f":w,"xn--w4r85el8fhu5dnra":w,"\u5609\u91cc\u5927\u9152\u5e97":w,"xn--w4rs40l":w,"\u5609\u91cc":w,"xn--xhq521b":w,"\u5e7f\u4e1c":w,"xn--zfr164b":w,"\u653f\u52a1":w,xyz:{$:1,succ:{blogsite:y,fhapp:y,crafting:y,zapto:y,telebit:B}},yachts:w,yahoo:w,yamaxun:w,yandex:w,yodobashi:w,yoga:w,yokohama:w,you:w,youtube:w,yun:w,zappos:w,zara:w,zero:w,zip:w,zone:{$:1,succ:{cloud66:y,triton:B,lima:y}},zuerich:w}};
    function da(c,e,d,f){for(var g=null;void 0!==e;){0!==(e.$&f)&&(g={index:d+1,isIcann:1===e.$,isPrivate:2===e.$});if(-1===d)break;e=(e=e.succ)&&(e[c[d]]||e["*"]);--d;}return g}
    function Z(c,e,d){if(!1===e.allowPrivateDomains&&3<c.length){var f=c.length-1,g=c.charCodeAt(f),h=c.charCodeAt(f-1),m=c.charCodeAt(f-2);f=c.charCodeAt(f-3);if(109===g&&111===h&&99===m&&46===f){d.isIcann=!0;d.isPrivate=!1;d.publicSuffix="com";return}if(103===g&&114===h&&111===m&&46===f){d.isIcann=!0;d.isPrivate=!1;d.publicSuffix="org";return}if(117===g&&100===h&&101===m&&46===f){d.isIcann=!0;d.isPrivate=!1;d.publicSuffix="edu";return}if(118===g&&111===h&&103===m&&46===f){d.isIcann=!0;d.isPrivate=!1;
    d.publicSuffix="gov";return}if(116===g&&101===h&&110===m&&46===f){d.isIcann=!0;d.isPrivate=!1;d.publicSuffix="net";return}if(101===g&&100===h&&46===m){d.isIcann=!0;d.isPrivate=!1;d.publicSuffix="de";return}}c=c.split(".");e=(!0===e.allowPrivateDomains?2:0)|(!0===e.allowIcannDomains?1:0);g=da(c,q$1,c.length-1,e);null!==g?(d.isIcann=g.isIcann,d.isPrivate=g.isPrivate,d.publicSuffix=c.slice(g.index+1).join(".")):(e=da(c,v$1,c.length-1,e),null!==e?(d.isIcann=e.isIcann,d.isPrivate=e.isPrivate,d.publicSuffix=
    c.slice(e.index).join(".")):(d.isIcann=!1,d.isPrivate=!1,d.publicSuffix=c[c.length-1]));}var parse=function(c,e){return p(c,5,Z,e)};

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var TLDTS_OPTIONS = {
        extractHostname: true,
        mixedInputs: false,
        validateHostname: false
    };
    var TOKENS_BUFFER$2 = new TokensBuffer(300);
    var Request = /** @class */ (function () {
        function Request(_a) {
            var type = _a.type, domain = _a.domain, hostname = _a.hostname, url = _a.url, sourceDomain = _a.sourceDomain, sourceHostname = _a.sourceHostname;
            this.type = type;
            this.url = url;
            this.hostname = hostname;
            this.domain = domain;
            this.sourceHostname = sourceHostname;
            this.sourceDomain = sourceDomain;
            this.sourceHostnameHash = fastHash(this.sourceHostname);
            this.sourceDomainHash = fastHash(this.sourceDomain);
            // Decide on party
            this.isThirdParty = this.sourceDomain.length === 0 ? false : this.sourceDomain !== this.domain;
            this.isFirstParty = !this.isThirdParty;
            // Check protocol
            this.isSupported = true;
            if (this.url.startsWith('http:')) {
                this.isHttp = true;
                this.isHttps = false;
            }
            else if (this.url.startsWith('https:')) {
                this.isHttps = true;
                this.isHttp = false;
            }
            else if (this.url.startsWith('ws:') || this.url.startsWith('wss:')) {
                this.isHttp = false;
                this.isHttps = false;
                this.type = 'websocket';
                this.isSupported = true;
            }
            else {
                this.isHttp = false;
                this.isHttps = false;
                this.isSupported = false;
            }
            // Lazy attributes
            this.tokens = undefined;
            this.fuzzySignature = undefined;
        }
        /**
         * Create an instance of `Request` from raw request details.
         */
        Request.fromRawDetails = function (_a) {
            var _b = _a.url, url = _b === void 0 ? '' : _b, hostname = _a.hostname, domain = _a.domain, _c = _a.sourceUrl, sourceUrl = _c === void 0 ? '' : _c, sourceHostname = _a.sourceHostname, sourceDomain = _a.sourceDomain, _d = _a.type, type = _d === void 0 ? 'main_frame' : _d;
            url = url.toLowerCase();
            if (hostname === undefined || domain === undefined) {
                var parsed = parse(url, TLDTS_OPTIONS);
                hostname = hostname || parsed.hostname || '';
                domain = domain || parsed.domain || '';
            }
            // Initialize source URL
            if (sourceHostname === undefined || sourceDomain === undefined) {
                var parsed = parse(sourceUrl, TLDTS_OPTIONS);
                sourceHostname = sourceHostname || parsed.hostname || '';
                sourceDomain = sourceDomain || parsed.domain || '';
            }
            // source URL
            return new Request({
                domain: domain,
                hostname: hostname,
                url: url,
                sourceDomain: sourceDomain,
                sourceHostname: sourceHostname,
                sourceUrl: sourceUrl,
                type: type
            });
        };
        /**
         * Create an instance of `Request` from `chrome.webRequest.WebRequestDetails`.
         */
        Request.fromWebRequestDetails = function (details) {
            return Request.fromRawDetails({
                sourceUrl: details.initiator || details.originUrl || details.documentUrl,
                type: details.type,
                url: details.url
            });
        };
        /**
         * Create an instance of `Request` from `puppeteer.Request`.
         */
        Request.fromPuppeteerDetails = function (details) {
            var frame = details.frame();
            return Request.fromRawDetails({
                sourceUrl: frame !== null ? frame.url() : undefined,
                type: details.resourceType(),
                url: details.url()
            });
        };
        /**
         * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
         */
        Request.fromElectronDetails = function (_a) {
            var url = _a.url, resourceType = _a.resourceType, referrer = _a.referrer;
            return Request.fromRawDetails({
                sourceUrl: referrer,
                type: (resourceType || 'other'),
                url: url
            });
        };
        Request.prototype.getTokens = function () {
            if (this.tokens === undefined) {
                TOKENS_BUFFER$2.seekZero();
                if (this.sourceDomain) {
                    TOKENS_BUFFER$2.push(fastHash(this.sourceDomain));
                }
                if (this.sourceHostname) {
                    TOKENS_BUFFER$2.push(fastHash(this.sourceHostname));
                }
                tokenizeInPlace(this.url, TOKENS_BUFFER$2);
                this.tokens = TOKENS_BUFFER$2.slice();
            }
            return this.tokens;
        };
        Request.prototype.getFuzzySignature = function () {
            if (this.fuzzySignature === undefined) {
                this.fuzzySignature = createFuzzySignature(this.url);
            }
            return this.fuzzySignature;
        };
        return Request;
    }());
    /**
     * Kept for backward compatibility. The recommended way is to call
     * `Request.fromRawDetails` directly.
     */
    function makeRequest(details) {
        return Request.fromRawDetails(details);
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Abstraction on top of resources.txt used for redirections as well as script
     * injections. It contains logic to parse, serialize and get resources by name
     * for use in the engine.
     */
    var Resources = /** @class */ (function () {
        function Resources(_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.checksum, checksum = _c === void 0 ? '' : _c, _d = _b.js, js = _d === void 0 ? new Map() : _d, _e = _b.resources, resources = _e === void 0 ? new Map() : _e;
            this.checksum = checksum;
            this.js = js;
            this.resources = resources;
        }
        Resources.deserialize = function (buffer) {
            var checksum = buffer.getASCII();
            // Deserialize `resources`
            var resources = new Map();
            var numberOfResources = buffer.getUint8();
            for (var i = 0; i < numberOfResources; i += 1) {
                resources.set(buffer.getASCII(), {
                    contentType: buffer.getASCII(),
                    data: buffer.getASCII()
                });
            }
            // Deserialize `js`
            var js = new Map();
            resources.forEach(function (_a, name) {
                var contentType = _a.contentType, data = _a.data;
                if (contentType === 'application/javascript') {
                    js.set(name, data);
                }
            });
            return new Resources({
                checksum: checksum,
                js: js,
                resources: resources
            });
        };
        Resources.parse = function (data, _a) {
            var checksum = _a.checksum;
            var typeToResource = new Map();
            var trimComments = function (str) { return str.replace(/^\s*#.*$/gm, ''); };
            var chunks = data.split('\n\n');
            for (var i = 0; i < chunks.length; i += 1) {
                var resource = trimComments(chunks[i]).trim();
                if (resource.length !== 0) {
                    var firstNewLine = resource.indexOf('\n');
                    var split = resource.slice(0, firstNewLine).split(/\s+/);
                    var name_1 = split[0];
                    var type = split[1];
                    var body = resource.slice(firstNewLine + 1);
                    if (name_1 === undefined || type === undefined || body === undefined) {
                        continue;
                    }
                    if (!typeToResource.has(type)) {
                        typeToResource.set(type, new Map());
                    }
                    typeToResource.get(type).set(name_1, body);
                }
            }
            // the resource containing javascirpts to be injected
            var js = typeToResource.get('application/javascript');
            // Create a mapping from resource name to { contentType, data }
            // used for request redirection.
            var resourcesByName = new Map();
            typeToResource.forEach(function (resources, contentType) {
                resources.forEach(function (resource, name) {
                    resourcesByName.set(name, {
                        contentType: contentType,
                        data: resource
                    });
                });
            });
            return new Resources({
                checksum: checksum,
                js: js,
                resources: resourcesByName
            });
        };
        Resources.prototype.getResource = function (name) {
            return this.resources.get(name);
        };
        Resources.prototype.serialize = function (buffer) {
            // Serialize `checksum`
            buffer.pushASCII(this.checksum);
            // Serialize `resources`
            buffer.pushUint8(this.resources.size);
            this.resources.forEach(function (_a, name) {
                var contentType = _a.contentType, data = _a.data;
                buffer.pushASCII(name);
                buffer.pushASCII(contentType);
                buffer.pushASCII(data);
            });
        };
        return Resources;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    function processRegex(r) {
        return "(?:" + r.source + ")";
    }
    function escape(s) {
        return "(?:" + s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + ")";
    }
    function setWithDefault(map, key, value) {
        var bucket = map.get(key);
        if (bucket === undefined) {
            bucket = [];
            map.set(key, bucket);
        }
        bucket.push(value);
    }
    function groupBy(filters, criteria) {
        var grouped = new Map();
        for (var i = 0; i < filters.length; i += 1) {
            var filter = filters[i];
            setWithDefault(grouped, criteria(filter), filter);
        }
        return Array.from(grouped.values());
    }
    function splitBy(filters, condition) {
        var positive = [];
        var negative = [];
        for (var i = 0; i < filters.length; i += 1) {
            var filter = filters[i];
            if (condition(filter)) {
                positive.push(filter);
            }
            else {
                negative.push(filter);
            }
        }
        return {
            negative: negative,
            positive: positive
        };
    }
    var OPTIMIZATIONS = [
        // TODO - add filter deduplication
        {
            description: 'Group idential filter with same mask but different domains in single filters',
            fusion: function (filters) {
                var domains = new Set();
                var notDomains = new Set();
                for (var i = 0; i < filters.length; i += 1) {
                    var _a = filters[i], optDomains = _a.optDomains, optNotDomains = _a.optNotDomains;
                    if (optDomains !== undefined) {
                        optDomains.forEach(function (d) {
                            domains.add(d);
                        });
                    }
                    if (optNotDomains !== undefined) {
                        optNotDomains.forEach(function (d) {
                            notDomains.add(d);
                        });
                    }
                }
                return new NetworkFilter(Object.assign({}, filters[0], {
                    optDomains: domains.size > 0 ? new Uint32Array(domains).sort() : undefined,
                    optNotDomains: notDomains.size > 0 ? new Uint32Array(notDomains).sort() : undefined,
                    rawLine: filters[0].rawLine !== undefined
                        ? filters.map(function (_a) {
                            var rawLine = _a.rawLine;
                            return rawLine;
                        }).join(' <+> ')
                        : undefined
                }));
            },
            groupByCriteria: function (filter) {
                return filter.getHostname() + filter.getFilter() + filter.getMask() + filter.getRedirect();
            },
            select: function (filter) {
                return !filter.isFuzzy() &&
                    !filter.isCSP() &&
                    (filter.hasOptDomains() || filter.hasOptNotDomains());
            }
        },
        {
            description: 'Group simple patterns, into a single filter',
            fusion: function (filters) {
                var patterns = [];
                for (var i = 0; i < filters.length; i += 1) {
                    var f = filters[i];
                    if (f.isRegex()) {
                        patterns.push(processRegex(f.getRegex()));
                    }
                    else if (f.isRightAnchor()) {
                        patterns.push(escape(f.getFilter()) + "$");
                    }
                    else if (f.isLeftAnchor()) {
                        patterns.push("^" + escape(f.getFilter()));
                    }
                    else {
                        patterns.push(escape(f.getFilter()));
                    }
                }
                return new NetworkFilter(Object.assign({}, filters[0], {
                    mask: setBit(filters[0].mask, 67108864 /* isRegex */),
                    rawLine: filters[0].rawLine !== undefined
                        ? filters.map(function (_a) {
                            var rawLine = _a.rawLine;
                            return rawLine;
                        }).join(' <+> ')
                        : undefined,
                    regex: new RegExp(patterns.join('|'))
                }));
            },
            groupByCriteria: function (filter) { return '' + filter.getMask(); },
            select: function (filter) {
                return !filter.isFuzzy() &&
                    !filter.hasOptDomains() &&
                    !filter.hasOptNotDomains() &&
                    !filter.isHostnameAnchor() &&
                    !filter.isRedirect() &&
                    !filter.isCSP();
            }
        },
    ];
    /**
     * Optimizer which returns the list of original filters.
     */
    function noopOptimizeNetwork(filters) {
        return filters;
    }
    function noopOptimizeCosmetic(filters) {
        return filters;
    }
    /**
     * Fusion a set of `filters` by applying optimizations sequentially.
     */
    function optimizeNetwork(filters) {
        var fused = [];
        var toFuse = filters;
        OPTIMIZATIONS.forEach(function (_a) {
            var select = _a.select, fusion = _a.fusion, groupByCriteria = _a.groupByCriteria;
            var _b = splitBy(toFuse, select), positive = _b.positive, negative = _b.negative;
            toFuse = negative;
            groupBy(positive, groupByCriteria).forEach(function (group) {
                if (group.length > 1) {
                    fused.push(fusion(group));
                }
                else {
                    toFuse.push(group[0]);
                }
            });
        });
        for (var i = 0; i < toFuse.length; i += 1) {
            fused.push(toFuse[i]);
        }
        return fused;
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    // https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
    function nextPow2(v) {
        v--;
        v |= v >> 1;
        v |= v >> 2;
        v |= v >> 4;
        v |= v >> 8;
        v |= v >> 16;
        v++;
        return v;
    }
    /**
     * Counter implemented on top of Map.
     */
    var Counter = /** @class */ (function () {
        function Counter() {
            this.counter = new Map();
        }
        Counter.prototype.incr = function (key) {
            this.counter.set(key, (this.counter.get(key) || 0) + 1);
        };
        Counter.prototype.get = function (key) {
            return this.counter.get(key) || 0;
        };
        Counter.prototype.set = function (key, value) {
            this.counter.set(key, value);
        };
        return Counter;
    }());
    /**
     * Generate unique IDs for requests, which is used to avoid matching the same
     * buckets multiple times on the same request (which can happen if a token
     * appears more than once in a URL).
     */
    var UID = 1;
    function getNextId() {
        var id = UID;
        UID = (UID + 1) % 1000000000;
        return id;
    }
    var EMPTY_BUCKET = Number.MAX_SAFE_INTEGER >>> 0;
    /**
     * The ReverseIndex is an accelerating data structure which allows finding a
     * subset of the filters given a list of token seen in a URL. It is the core of
     * the adblocker's matching capabilities.
     *
     * It has mainly two caracteristics:
     * 1. It should be very compact and be able to load fast.
     * 2. It should be *very fast* in finding potential candidates.
     *
     * Conceptually, the reverse index dispatches filters in "buckets" (an array of
     * one or more filters). Filters living in the same bucket are guaranteed to
     * share at least one of their tokens (appearing in the pattern). For example:
     *
     *   - Bucket 1 (ads):
     *       - /ads.js
     *       - /script/ads/tracking.js
     *       - /ads/
     *   - Bucket 2 (tracking)
     *       - /tracking.js
     *       - ||tracking.com/cdn
     *
     * We see that filters in "Bucket 1" are indexed using the token "ads" and
     * "Bucket 2" using token "tracking".
     *
     * This property allows to quickly discard most of the filters when we match a
     * URL. To achieve this, the URL is tokenized in the same way filters are
     * tokenized and for each token, we check if there are some filters available.
     *
     * For example:
     *
     *  URL "https://tracking.com/" has the following tokens: "https", "tracking"
     *  and "com". We immediatly see that we only check the two filters in the
     *  "tracking" bucket since they are the only ones having a common token with
     *  the URL.
     *
     * How do we pick the token for each filter?
     * =========================================
     *
     * Each filter is only indexed *once*, which means that we need to pick one of
     * the tokens appearing in the pattern. We choose the token such has each filter
     * is indexed using the token which was the *least seen* globally. In other
     * words, we pick the most discriminative token for each filter. This is done
     * using the following algorithm:
     *   1. Tokenize all the filters which will be stored in the index
     *   2. Compute a histogram of frequency of each token (globally)
     *   3. Select the best token for each filter (lowest frequency)
     */
    var ReverseIndex = /** @class */ (function () {
        function ReverseIndex(_a) {
            var deserialize = _a.deserialize, filters = _a.filters, optimize = _a.optimize, config = _a.config, 
            // These arguments are only used while initializing the reverse index from
            // its serialized representation. By default they are initialized such as
            // the index is empty (no filter).
            bucketsIndex = _a.bucketsIndex, tokensLookupIndex = _a.tokensLookupIndex, view = _a.view;
            // Function used to load a filter (e.g.: CosmeticFilter or NetworkFilter)
            // from its compact representation. Each filter exposes a `serialize` method
            // which is used to store it in `this.view`. While matching we need to
            // retrieve the instance of the filter to perform matching and use
            // `this.deserializeFilter` to do so.
            this.deserializeFilter = deserialize;
            // Optional function which will be used to optimize a list of filters
            // in-memory. Typically this is used while matching when a list of filters
            // are loaded in memory and stored in `this.cache`. Before using the bucket,
            // we can `this.optimize` on the list of filters to allow some optimizations
            // to be performed (e.g.: fusion of similar filters, etc.). Have a look into
            // `./src/engine/optimizer.ts` for examples of such optimizations.
            this.optimize = optimize;
            this.config = config;
            // Cache deserialized buckets in memory for faster retrieval. It is a
            // mapping from token to `Bucket`.
            this.cache = new Map();
            // Compact representation of the reverse index (described at the top level
            // comment of this class). It contains three distinct parts:
            //
            // 1. The list of all filters contained in this index, serialized
            // contiguously (one after the other) in the typed array starting at index
            // 0. This would look like: |f1|f2|f3|...|fn| Note that not all filters use
            // the same amount of memory (or number of bytes) so the only way to
            // navigate the compact representation at this point is to iterate through
            // all of them from first to last. Which is why we need a small "index" to
            // help us navigate this compact representation and leads us to the second
            // section of `this.view`.
            //
            // 2. buckets index which conceptually can be understood as a way to group
            // several buckets in the same neighborhood of the typed array. It could
            // look something like: |bucket1|bucket2|bucket3|...| each bucket could
            // contain multiple filters. In reality, for each section of this bucket
            // index, we know how many filters there are and the filters for multiple
            // buckets are interleaved. For example if the index starts with a section
            // containing |bucket1|bucket2|bucket3| and these bucket have tokens `tok1`,
            // `tok2` and `tok3` respectively, then the final representation in memory
            // could be: |tok1|f1|tok2|f2|tok1|f3|tok3|f4|tok2|f5| (where `f1`, `f2`,
            // etc. are indices to the serialized representation of each filter, in the
            // same array, described in 1. above).
            //
            // 3. The last part is called "tokens lookup index" and allows to locate the
            // bucket given a suffix of the indexing token. If the binary representation
            // of the token for bucket1 is 101010 and prefix has size 3, then we would
            // lookup the "tokens lookup index" using the last 3 bits "010" which would
            // give us the offset in our typed array where we can start reading the
            // filters of buckets having a token ending with the same 3 bits.
            // Optionaly initialize the index with given filters.
            this.bucketsIndex = bucketsIndex || EMPTY_UINT32_ARRAY;
            this.tokensLookupIndex = tokensLookupIndex || EMPTY_UINT32_ARRAY;
            this.view = view || StaticDataView.empty(config);
            if (filters.length !== 0) {
                this.update(filters, undefined);
            }
        }
        ReverseIndex.deserialize = function (buffer, deserialize, optimize, config) {
            var tokensLookupIndexSize = buffer.getUint32();
            var tokensLookupIndexStart = buffer.getUint32();
            var bucketsIndexSize = buffer.getUint32();
            // Alignement to 4 bytes is important here since `view` (Uint8Array) can
            // appear at any offset of `buffer`. But to be sure we can read back
            // Uint32Array directly from raw buffer, the alignement has to be a multiple
            // of 4. The same alignement is taken care of in `serialize`.
            var view = StaticDataView.fromUint8Array(buffer.getBytes(true /* align */), config);
            // Read Uint32Array views on top of byte array for fast access.
            view.setPos(tokensLookupIndexStart);
            var tokensLookupIndex = view.getUint32ArrayView(tokensLookupIndexSize);
            var bucketsIndex = view.getUint32ArrayView(bucketsIndexSize);
            view.seekZero();
            return new ReverseIndex({
                config: config,
                deserialize: deserialize,
                filters: [],
                optimize: optimize,
                // Packed internal representation
                bucketsIndex: bucketsIndex,
                tokensLookupIndex: tokensLookupIndex,
                view: view
            });
        };
        /**
         * Load all filters from this index in memory (i.e.: deserialize them from the
         * byte array into NetworkFilter or CosmeticFilter instances).
         */
        ReverseIndex.prototype.getFilters = function () {
            var view = this.view;
            view.seekZero();
            var numberOfFilters = view.getUint32();
            var filters = [];
            for (var i = 0; i < numberOfFilters; i += 1) {
                filters.push(this.deserializeFilter(view));
            }
            return filters;
        };
        /**
         * Return an array of all the tokens currently used as keys of the index.
         */
        ReverseIndex.prototype.getTokens = function () {
            var tokens = new Set();
            for (var i = 0; i < this.bucketsIndex.length; i += 2) {
                tokens.add(this.bucketsIndex[i]);
            }
            return new Uint32Array(tokens);
        };
        /**
         * Dump this index to `buffer`.
         */
        ReverseIndex.prototype.serialize = function (buffer) {
            buffer.pushUint32(this.tokensLookupIndex.length);
            buffer.pushUint32(this.tokensLookupIndex.byteOffset);
            buffer.pushUint32(this.bucketsIndex.length);
            // Aligmenent is crucial here, see comment in `deserialize` for more info.
            buffer.pushBytes(this.view.buffer, true /* align */);
        };
        /**
         * Iterate on all filters found in buckets associated with the given list of
         * tokens. The callback is called on each of them. Early termination can be
         * achieved if the callback returns `false`.
         *
         * This will not check if each filter returned would match a given request but
         * is instead used as a list of potential candidates (much smaller than the
         * total set of filters; typically between 5 and 10 filters will be checked).
         */
        ReverseIndex.prototype.iterMatchingFilters = function (tokens, cb) {
            // Each request is assigned an ID so that we can keep track of the last
            // request seen by each bucket in the reverse index. This provides a cheap
            // way to prevent filters from being inspected more than once per request
            // (which could happen if the same token appears more than once in the URL).
            var requestId = getNextId();
            for (var i = 0; i < tokens.length; i += 1) {
                if (this.iterBucket(tokens[i], requestId, cb) === false) {
                    return;
                }
            }
            // Fallback to 0 (i.e.: wildcard bucket) bucket if nothing was found before.
            this.iterBucket(0, requestId, cb);
        };
        /**
         * Re-create the internal data-structure of the reverse index *in-place*. It
         * needs to be called with a list of new filters and optionally a list of ids
         * (as returned by either NetworkFilter.getId() or CosmeticFilter.getId())
         * which need to be removed from the index.
         */
        ReverseIndex.prototype.update = function (newFilters, removedFilters) {
            var totalNumberOfTokens = 0;
            var totalNumberOfIndexedFilters = 0;
            var filtersTokens = [];
            var histogram = new Counter();
            // Compute tokens for all filters (the ones already contained in the index
            // *plus* the new ones *minus* the ones removed ).
            var filters = this.getFilters();
            for (var i = 0; i < newFilters.length; i += 1) {
                filters.push(newFilters[i]);
            }
            // When we run in `debug` mode, we enable fully deterministic updates of
            // internal data-structure. To this effect, we sort all filters before
            // insertion.
            if (this.config.debug === true) {
                filters.sort(function (f1, f2) { return f1.getId() - f2.getId(); });
            }
            for (var i = 0; i < filters.length; i += 1) {
                var filter = filters[i];
                if (removedFilters === undefined || removedFilters.has(filter.getId()) === false) {
                    var multiTokens = filter.getTokens();
                    filtersTokens.push({
                        filter: filter,
                        multiTokens: multiTokens
                    });
                    for (var j = 0; j < multiTokens.length; j += 1) {
                        var tokens = multiTokens[j];
                        totalNumberOfIndexedFilters += 1;
                        for (var k = 0; k < tokens.length; k += 1) {
                            totalNumberOfTokens += 1;
                            histogram.incr(tokens[k]);
                        }
                    }
                }
            }
            // No filters given; reset to empty bucket
            if (filtersTokens.length === 0) {
                this.bucketsIndex = EMPTY_UINT32_ARRAY;
                this.tokensLookupIndex = EMPTY_UINT32_ARRAY;
                this.view = StaticDataView.empty(this.config);
                this.cache = new Map();
                return;
            }
            // Add an heavy weight on these common patterns because they appear in
            // almost all URLs. If there is a choice, then filters should use other
            // tokens than those.
            histogram.set(fastHash('http'), totalNumberOfTokens);
            histogram.set(fastHash('https'), totalNumberOfTokens);
            histogram.set(fastHash('www'), totalNumberOfTokens);
            histogram.set(fastHash('com'), totalNumberOfTokens);
            // Prepare tokensLookupIndex. This is an array where keys are suffixes of N
            // bits from tokens (the ones used to index filters in the index) and values
            // are indices to compact representation of buckets. Each bucket contains a
            // list of filters associated with a token with identical N bits suffix.
            // This allows to quickly identify the potential filters given a query
            // token.
            var tokensLookupIndexSize = Math.max(2, nextPow2(totalNumberOfIndexedFilters));
            var mask = tokensLookupIndexSize - 1;
            var prefixes = [];
            for (var i = 0; i < tokensLookupIndexSize; i += 1) {
                prefixes.push([]);
            }
            // This byte array contains all the filters serialized consecutively.
            // Having them separately from the reverse index structure allows filters
            // to be indexed more than once while not paying extra storage cost.
            // `buffer` is a contiguous chunk of memory which will be used to store 3
            // kinds of data:
            // 1. The first section contains all the filters stored in the index
            // 2. The second section contains the compact buckets where filters having
            // their indexing token sharing the last N bits are grouped together.
            //
            // TODO - estimate size needed for this bucket (based on filters in
            // `filtersToken` + tokensLookupIndexSize + bucketsIndexSize). This would
            // allow to avoid having to pre-allocate a huge buffer up-front.
            var buffer = StaticDataView.allocate(8000000, this.config);
            buffer.pushUint32(filtersTokens.length);
            // Keep track of the final size of the buckets index
            var bucketsIndexSize = 0;
            // For each filter, find the best token (least seen)
            for (var i = 0; i < filtersTokens.length; i += 1) {
                var _a = filtersTokens[i], filter = _a.filter, multiTokens = _a.multiTokens;
                // Serialize this filter and keep track of its index in the byte array
                var filterIndex = buffer.pos;
                filter.serialize(buffer);
                // Index the filter once per "tokens"
                for (var j = 0; j < multiTokens.length; j += 1) {
                    var tokens = multiTokens[j];
                    // Find best token (least seen) from `tokens` using `histogram`.
                    var bestToken = 0;
                    var minCount = totalNumberOfTokens + 1;
                    for (var k = 0; k < tokens.length; k += 1) {
                        var tokenCount = histogram.get(tokens[k]);
                        if (tokenCount <= minCount) {
                            minCount = tokenCount;
                            bestToken = tokens[k];
                            // Fast path, if the current token has only been seen once, we can
                            // stop iterating since we will not find better!
                            if (minCount === 1) {
                                break;
                            }
                        }
                    }
                    // `bestToken & mask` represents the N last bits of `bestToken`. We
                    // group all filters indexed with a token sharing the same N bits.
                    bucketsIndexSize += 2;
                    prefixes[bestToken & mask].push({
                        index: filterIndex,
                        token: bestToken
                    });
                }
            }
            // TODO - if we estimate size of filters exactly then we could store this
            // section first, this would allow a forward progression of accesses in
            // memory instead of having to go back.
            // We finished dumping all the filters so now starts the buckets index section
            var tokensLookupIndexStart = buffer.getPos();
            var tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
            var bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
            var indexInBucketsIndex = 0;
            for (var i = 0; i < tokensLookupIndexSize; i += 1) {
                var filtersForMask = prefixes[i];
                tokensLookupIndex[i] = indexInBucketsIndex;
                for (var j = 0; j < filtersForMask.length; j += 1) {
                    var _b = filtersForMask[j], token = _b.token, index = _b.index;
                    bucketsIndex[indexInBucketsIndex++] = token;
                    bucketsIndex[indexInBucketsIndex++] = index;
                }
            }
            this.view = StaticDataView.fromUint8Array(buffer.slice(), this.config);
            this.cache = new Map();
            // Also keep Uint32Array views sharing the same buffer as `this.view` (only
            // needed for faster access while matching but does not need to be
            // serialized).  NOTE: it's important that these indices point to
            // `this.view` and not `buffer`, otherwise we will be leaking memory.
            this.view.setPos(tokensLookupIndexStart);
            this.tokensLookupIndex = this.view.getUint32ArrayView(tokensLookupIndexSize);
            this.bucketsIndex = this.view.getUint32ArrayView(bucketsIndexSize);
            this.view.seekZero();
        };
        /**
         * If a bucket exists for the given token, call the callback on each filter
         * found inside. An early termination mechanism is built-in, to stop iterating
         * as soon as `false` is returned from the callback.
         */
        ReverseIndex.prototype.iterBucket = function (token, requestId, cb) {
            var bucket = this.cache.get(token);
            // Lazily create bucket if it does not yet exist in memory. Lookup the
            // compact bucket representation and find all filters being associated with
            // `token`. Create a `Bucket` out of them and store them in cache.
            if (bucket === undefined) {
                var offset = token & (this.tokensLookupIndex.length - 1);
                var startOfBucket = this.tokensLookupIndex[offset];
                // We do not have any filters for this token
                if (startOfBucket === EMPTY_BUCKET) {
                    return true;
                }
                // Since we do not store explicitly the number of filters in each
                // "bucket", we check the index of the next one and use it to infer the
                // number of filters (each filter being stored as a token + index to the
                // "filters store")
                var endOfBucket = offset === this.tokensLookupIndex.length - 1
                    ? this.bucketsIndex.length
                    : this.tokensLookupIndex[offset + 1];
                // Get indices of filters indexed with `token`, if any.
                var filtersIndices = [];
                for (var i = startOfBucket; i < endOfBucket; i += 2) {
                    var currentToken = this.bucketsIndex[i];
                    if (currentToken === token) {
                        filtersIndices.push(this.bucketsIndex[i + 1]);
                    }
                }
                // No filter indexed with `token`.
                if (filtersIndices.length === 0) {
                    return true; // continue looking for a match
                }
                // If we have filters for `token` then deserialize filters in memory and
                // create a `Bucket` instance to hold them for future access.
                var filters = [];
                for (var i = 0; i < filtersIndices.length; i += 1) {
                    this.view.setPos(filtersIndices[i]);
                    filters.push(this.deserializeFilter(this.view));
                }
                // Create new bucket with found filters (only optimize if we have more
                // than one filter).
                bucket = {
                    filters: filters.length > 1 ? this.optimize(filters) : filters,
                    lastRequestSeen: 0
                };
                this.cache.set(token, bucket);
            }
            // Look for matching filter in this bucket
            if (bucket.lastRequestSeen !== requestId) {
                bucket.lastRequestSeen = requestId;
                var filters = bucket.filters;
                for (var i = 0; i < filters.length; i += 1) {
                    // Break the loop if the callback returns `false`
                    if (cb(filters[i]) === false) {
                        // Whenever we get a match from a filter, we also swap it one
                        // position up in the list. This way, over time, popular filters will
                        // be first and might match earlier. This should decrease the time
                        // needed to get a match.
                        if (i > 0) {
                            var filter = filters[i];
                            filters[i] = filters[i - 1];
                            filters[i - 1] = filter;
                        }
                        return false;
                    }
                }
            }
            return true;
        };
        return ReverseIndex;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    // Empty filters is 4 bytes because we need at least one 32 bits number to keep
    // track of the number of filters in the container. If there is no filter then
    // the number will be 0.
    var EMPTY_FILTERS = new Uint8Array(4);
    /**
     * Generic filters container (for both CosmeticFilter and NetworkFilter
     * instances). This abstracts away some of the logic to serialize/lazy-load
     * lists of filters (which is useful for things like generic cosmetic filters
     * or $badfilter).
     */
    var FiltersContainer = /** @class */ (function () {
        function FiltersContainer(_a) {
            var config = _a.config, deserialize = _a.deserialize, filters = _a.filters;
            this.deserialize = deserialize;
            this.filters = EMPTY_FILTERS;
            this.config = config;
            if (filters.length !== 0) {
                this.update(filters, undefined);
            }
        }
        FiltersContainer.deserialize = function (buffer, deserialize, config) {
            var container = new FiltersContainer({ deserialize: deserialize, config: config, filters: [] });
            container.filters = buffer.getBytes();
            return container;
        };
        /**
         * Update filters based on `newFilters` and `removedFilters`.
         */
        FiltersContainer.prototype.update = function (newFilters, removedFilters) {
            // Estimate size of the buffer we will need to store filters. This avoids
            // having to allocate a big chunk of memory up-front if it's not needed.
            // We start with the current size of `this.filters` then update it with
            // removed/added filters.
            var bufferSizeEstimation = this.filters.byteLength;
            var selected = [];
            // Add existing rules (removing the ones with ids in `removedFilters`)
            var currentFilters = this.getFilters();
            if (currentFilters.length !== 0) {
                // If no filter was removed (we only add new ones), we don't need to
                // filter out removed existing filters. So we just assign the array to
                // `selected` directly to save a bit of effort.
                if (removedFilters === undefined || removedFilters.size === 0) {
                    selected = currentFilters;
                }
                else {
                    // There might be some removed selected filters, so we iterate through
                    // them and make sure we keep only the ones not having been deleted.
                    for (var i = 0; i < currentFilters.length; i += 1) {
                        var filter = currentFilters[i];
                        if (removedFilters.has(filter.getId()) === false) {
                            selected.push(filter);
                        }
                        else {
                            bufferSizeEstimation -= filter.getSerializedSize();
                        }
                    }
                }
            }
            // If `selected` and `currentFilters` have the same length then no filter was removed.
            var storedFiltersRemoved = selected.length !== currentFilters.length;
            // Add new rules.
            var numberOfExistingFilters = selected.length;
            for (var i = 0; i < newFilters.length; i += 1) {
                var filter = newFilters[i];
                bufferSizeEstimation += filter.getSerializedSize();
                selected.push(filter);
            }
            // Check if any new filter was added in `selected` (from `newFilters`).
            var storedFiltersAdded = selected.length > numberOfExistingFilters;
            // If selected changed, then update the compact representation of filters.
            if (selected.length === 0) {
                this.filters = EMPTY_FILTERS;
            }
            else if (storedFiltersAdded === true || storedFiltersRemoved === true) {
                // Store filters in their compact form
                var buffer = StaticDataView.allocate(bufferSizeEstimation, this.config);
                buffer.pushUint32(selected.length);
                // When we run in `debug` mode, we enable fully deterministic updates of
                // internal data-structure. To this effect, we sort all filters before
                // insertion.
                if (this.config.debug === true) {
                    selected.sort(function (f1, f2) { return f1.getId() - f2.getId(); });
                }
                for (var i = 0; i < selected.length; i += 1) {
                    selected[i].serialize(buffer);
                }
                // Update internals
                this.filters = buffer.buffer;
            }
        };
        FiltersContainer.prototype.serialize = function (buffer) {
            buffer.pushBytes(this.filters);
        };
        FiltersContainer.prototype.getFilters = function () {
            // No filter stored in the container
            if (this.filters.byteLength <= 4) {
                return [];
            }
            // Load all filters in memory and store them in `cache`
            var filters = [];
            var buffer = StaticDataView.fromUint8Array(this.filters, this.config);
            var numberOfFilters = buffer.getUint32();
            for (var i = 0; i < numberOfFilters; i += 1) {
                filters.push(this.deserialize(buffer));
            }
            return filters;
        };
        return FiltersContainer;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Given a list of CSS selectors, create a valid stylesheet ready to be
     * injected in the page. This also takes care to no create rules with too many
     * selectors for Chrome, see: https://crbug.com/804179
     */
    function createStylesheet(rules, style) {
        if (rules.length === 0) {
            return '';
        }
        var maximumNumberOfSelectors = 1024;
        var parts = [];
        var styleStr = " { " + style + " }";
        for (var i = 0; i < rules.length; i += maximumNumberOfSelectors) {
            // Accumulate up to `maximumNumberOfSelectors` selectors into `selector`.
            // We use string concatenation here since it's faster than using
            // `Array.prototype.join`.
            var selector = rules[i];
            for (var j = i + 1, end = Math.min(rules.length, i + maximumNumberOfSelectors); j < end; j += 1) {
                selector += ',\n' + rules[j];
            }
            // Insert CSS after last selector (e.g.: `{ display: none }`)
            selector += styleStr;
            // If `rules` has less then the limit, we can short-circuit here
            if (rules.length < maximumNumberOfSelectors) {
                return selector;
            }
            // Keep track of this chunk and process next ones
            parts.push(selector);
        }
        // Join all chunks together
        return parts.join('\n');
    }
    /**
     * If at least one filter from `rules` has a custom style (e.g.: `##.foo
     * :style(...)`) then we fallback to `createStylesheetFromRulesWithCustomStyles`
     * which is slower then `createStylesheetFromRules`.
     */
    function createStylesheetFromRulesWithCustomStyles(rules) {
        var selectorsPerStyle = new Map();
        for (var i = 0; i < rules.length; i += 1) {
            var rule = rules[i];
            var style = rule.getStyle();
            var selectors = selectorsPerStyle.get(style);
            if (selectors === undefined) {
                selectorsPerStyle.set(style, [rule.getSelector()]);
            }
            else {
                selectors.push(rule.getSelector());
            }
        }
        var stylesheets = [];
        var selectorsPerStyleArray = Array.from(selectorsPerStyle.entries());
        for (var i = 0; i < selectorsPerStyleArray.length; i += 1) {
            var style = selectorsPerStyleArray[i][0];
            var selectors = selectorsPerStyleArray[i][1];
            stylesheets.push(createStylesheet(selectors, style));
        }
        return stylesheets.join('\n\n');
    }
    /**
     * Given a list of cosmetic filters, create a stylesheet ready to be injected.
     * This function is optimistic and will assume there is no `:style` filter in
     * `rules`. In case one is found on the way, we fallback to the slower
     * `createStylesheetFromRulesWithCustomStyles` function.
     */
    function createStylesheetFromRules(rules) {
        var selectors = [];
        for (var i = 0; i < rules.length; i += 1) {
            var rule = rules[i];
            if (rule.hasCustomStyle()) {
                return createStylesheetFromRulesWithCustomStyles(rules);
            }
            selectors.push(rule.selector);
        }
        return createStylesheet(selectors, DEFAULT_HIDDING_STYLE);
    }
    function createLookupTokens(hostname, domain) {
        var hostnamesHashes = getHostnameHashesFromLabelsBackward(hostname, domain);
        var entitiesHashes = getEntityHashesFromLabelsBackward(hostname, domain);
        var tokens = new Uint32Array(hostnamesHashes.length + entitiesHashes.length);
        var index = 0;
        for (var i = 0; i < hostnamesHashes.length; i += 1) {
            tokens[index++] = hostnamesHashes[i];
        }
        for (var i = 0; i < entitiesHashes.length; i += 1) {
            tokens[index++] = entitiesHashes[i];
        }
        return tokens;
    }
    /**
     * Efficient container for CosmeticFilter instances. Allows to quickly
     * retrieved scripts and stylesheets to inject in pages for a specific
     * hostname/domain.
     */
    var CosmeticFilterBucket = /** @class */ (function () {
        function CosmeticFilterBucket(_a) {
            var _b = _a.filters, filters = _b === void 0 ? [] : _b, config = _a.config;
            this.genericRules = new FiltersContainer({
                config: config,
                deserialize: CosmeticFilter.deserialize,
                filters: []
            });
            this.unhideIndex = new ReverseIndex({
                config: config,
                deserialize: CosmeticFilter.deserialize,
                filters: [],
                optimize: noopOptimizeCosmetic
            });
            this.hostnameIndex = new ReverseIndex({
                config: config,
                deserialize: CosmeticFilter.deserialize,
                filters: [],
                optimize: noopOptimizeCosmetic
            });
            this.classesIndex = new ReverseIndex({
                config: config,
                deserialize: CosmeticFilter.deserialize,
                filters: [],
                optimize: noopOptimizeCosmetic
            });
            this.idsIndex = new ReverseIndex({
                config: config,
                deserialize: CosmeticFilter.deserialize,
                filters: [],
                optimize: noopOptimizeCosmetic
            });
            this.hrefsIndex = new ReverseIndex({
                config: config,
                deserialize: CosmeticFilter.deserialize,
                filters: [],
                optimize: noopOptimizeCosmetic
            });
            // In-memory cache, lazily initialized
            this.baseStylesheet = null;
            this.extraGenericRules = null;
            if (filters.length !== 0) {
                this.update(filters, undefined);
            }
        }
        CosmeticFilterBucket.deserialize = function (buffer, config) {
            var bucket = new CosmeticFilterBucket({ config: config });
            bucket.genericRules = FiltersContainer.deserialize(buffer, CosmeticFilter.deserialize, config);
            bucket.unhideIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
            bucket.hostnameIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
            // DOM indices
            bucket.classesIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
            bucket.idsIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
            bucket.hrefsIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
            return bucket;
        };
        CosmeticFilterBucket.prototype.getFilters = function () {
            var filters = [];
            return filters.concat(this.classesIndex.getFilters(), this.genericRules.getFilters(), this.hostnameIndex.getFilters(), this.hrefsIndex.getFilters(), this.idsIndex.getFilters(), this.unhideIndex.getFilters());
        };
        CosmeticFilterBucket.prototype.update = function (newFilters, removedFilters) {
            var unHideRules = [];
            var genericHideRules = [];
            var hostnameSpecificRules = [];
            var classSelectors = [];
            var idSelectors = [];
            var hrefSelectors = [];
            for (var i = 0; i < newFilters.length; i += 1) {
                var rule = newFilters[i];
                if (rule.isUnhide()) {
                    unHideRules.push(rule);
                }
                else if (rule.isGenericHide()) {
                    if (rule.isClassSelector()) {
                        classSelectors.push(rule);
                    }
                    else if (rule.isIdSelector()) {
                        idSelectors.push(rule);
                    }
                    else if (rule.isHrefSelector()) {
                        hrefSelectors.push(rule);
                    }
                    else {
                        genericHideRules.push(rule);
                    }
                }
                else {
                    hostnameSpecificRules.push(rule);
                }
            }
            this.genericRules.update(genericHideRules, removedFilters);
            this.unhideIndex.update(unHideRules, removedFilters);
            this.hostnameIndex.update(hostnameSpecificRules, removedFilters);
            this.classesIndex.update(classSelectors, removedFilters);
            this.idsIndex.update(idSelectors, removedFilters);
            this.hrefsIndex.update(hrefSelectors, removedFilters);
        };
        CosmeticFilterBucket.prototype.serialize = function (buffer) {
            this.genericRules.serialize(buffer);
            this.unhideIndex.serialize(buffer);
            this.hostnameIndex.serialize(buffer);
            this.classesIndex.serialize(buffer);
            this.idsIndex.serialize(buffer);
            this.hrefsIndex.serialize(buffer);
        };
        /**
         * Request cosmetics and scripts to inject in a page.
         */
        CosmeticFilterBucket.prototype.getCosmeticsFilters = function (_a) {
            var domain = _a.domain, hostname = _a.hostname, _b = _a.classes, classes = _b === void 0 ? [] : _b, _c = _a.hrefs, hrefs = _c === void 0 ? [] : _c, _d = _a.ids, ids = _d === void 0 ? [] : _d, _e = _a.allowGenericHides, allowGenericHides = _e === void 0 ? true : _e, 
            // Allows to specify which rules to return
            _f = _a.getBaseRules, 
            // Allows to specify which rules to return
            getBaseRules = _f === void 0 ? true : _f, _g = _a.getInjectionRules, getInjectionRules = _g === void 0 ? true : _g, _h = _a.getRulesFromDOM, getRulesFromDOM = _h === void 0 ? true : _h, _j = _a.getRulesFromHostname, getRulesFromHostname = _j === void 0 ? true : _j;
            // Tokens from `hostname` and `domain` which will be used to lookup filters
            // from the reverse index. The same tokens are re-used for multiple indices.
            var hostnameTokens = createLookupTokens(hostname, domain);
            var rules = [];
            // =======================================================================
            // Rules: hostname-specific
            // =======================================================================
            // Collect matching rules which specify a hostname constraint.
            if (getRulesFromHostname === true) {
                this.hostnameIndex.iterMatchingFilters(hostnameTokens, function (rule) {
                    if (rule.match(hostname, domain)) {
                        rules.push(rule);
                    }
                    return true;
                });
            }
            // =======================================================================
            // Rules: generic hide
            // =======================================================================
            // Optionally, collect genericHide rules. We need to make sure the `rule`
            // matches the hostname and domain since some generic rules can specify
            // negated hostnames and entities (e.g.: ~foo.*##generic).
            if (allowGenericHides === true && getRulesFromHostname === true) {
                var genericRules = this.getGenericRules();
                for (var i = 0; i < genericRules.length; i += 1) {
                    var rule = genericRules[i];
                    if (rule.match(hostname, domain) === true) {
                        rules.push(rule);
                    }
                }
            }
            // =======================================================================
            // Class selector based
            // =======================================================================
            if (allowGenericHides === true && getRulesFromDOM === true && classes.length !== 0) {
                this.classesIndex.iterMatchingFilters(hashStrings(classes), function (rule) {
                    if (rule.match(hostname, domain)) {
                        rules.push(rule);
                    }
                    return true;
                });
            }
            // =======================================================================
            // Id selector based
            // =======================================================================
            if (allowGenericHides === true && getRulesFromDOM === true && ids.length !== 0) {
                this.idsIndex.iterMatchingFilters(hashStrings(ids), function (rule) {
                    if (rule.match(hostname, domain)) {
                        rules.push(rule);
                    }
                    return true;
                });
            }
            // =======================================================================
            // Href selector based
            // =======================================================================
            if (allowGenericHides === true && getRulesFromDOM === true && hrefs.length !== 0) {
                this.hrefsIndex.iterMatchingFilters(compactTokens(concatTypedArrays(hrefs.map(function (href) { return tokenizeFilter(href, false, true); }))), function (rule) {
                    if (rule.match(hostname, domain)) {
                        rules.push(rule);
                    }
                    return true;
                });
            }
            var injections = [];
            var styles = [];
            // If we found at least one candidate, check if we have unhidden rules,
            // apply them and dispatch rules into `injections` (i.e.: '+js(...)') and
            // `styles` (i.e.: '##rule').
            if (rules.length !== 0) {
                // =======================================================================
                // Rules: unhide
                // =======================================================================
                // Collect unhidden selectors. They will be used to filter-out canceled
                // rules from other indices.
                var disabledRules_1 = new Set();
                this.unhideIndex.iterMatchingFilters(hostnameTokens, function (rule) {
                    if (rule.match(hostname, domain)) {
                        disabledRules_1.add(rule.getSelector());
                    }
                    return true;
                });
                // Apply unhide rules + dispatch
                for (var i = 0; i < rules.length; i += 1) {
                    var rule = rules[i];
                    // Make sure `rule` is not un-hidden by a #@# filter
                    if (disabledRules_1.size !== 0 && disabledRules_1.has(rule.getSelector())) {
                        continue;
                    }
                    // Dispatch rules in `injections` or `styles` depending on type
                    if (getInjectionRules === true && rule.isScriptInject()) {
                        injections.push(rule);
                    }
                    else {
                        styles.push(rule);
                    }
                }
            }
            // Create final stylesheet
            var stylesheet = getBaseRules === false || allowGenericHides === false ? '' : this.getBaseStylesheet();
            if (styles.length !== 0) {
                if (stylesheet.length !== 0) {
                    stylesheet += '\n\n';
                }
                stylesheet += createStylesheetFromRules(styles);
            }
            return {
                injections: injections,
                stylesheet: stylesheet
            };
        };
        /**
         * Return the list of filters which can potentially be un-hidden by another
         * rule currently contained in the cosmetic bucket.
         */
        CosmeticFilterBucket.prototype.getGenericRules = function () {
            if (this.extraGenericRules === null) {
                return this.lazyPopulateGenericRulesCache().genericRules;
            }
            return this.extraGenericRules;
        };
        /**
         * The base stylesheet is made of generic filters (not specific to any
         * hostname) which cannot be hidden (i.e.: there is currently no rule which
         * might hide their selector). This means that it will never change and is
         * the same for all sites. We generate it once and re-use it any-time we want
         * to inject it.
         */
        CosmeticFilterBucket.prototype.getBaseStylesheet = function () {
            if (this.baseStylesheet === null) {
                return this.lazyPopulateGenericRulesCache().baseStylesheet;
            }
            return this.baseStylesheet;
        };
        /**
         * This is used to lazily generate both the list of generic rules which can
         * *potentially be un-hidden* (i.e.: there exists at least once unhide rule
         * for the selector) and a stylesheet containing all selectors which cannot
         * be un-hidden. Since this list will not change between updates we can
         * generate once and use many times.
         */
        CosmeticFilterBucket.prototype.lazyPopulateGenericRulesCache = function () {
            if (this.baseStylesheet === null || this.extraGenericRules === null) {
                // Collect all selectors which can be subjected to an unhide rule
                var unHideRules = this.unhideIndex.getFilters();
                var canBeHiddenSelectors = new Set();
                for (var i = 0; i < unHideRules.length; i += 1) {
                    canBeHiddenSelectors.add(unHideRules[i].getSelector());
                }
                // Split generic rules into two groups:
                // 1. Rules which cannot be hidden
                // 2. Rules which can be hidden on some domains
                //
                // This allows to create a base stylesheet which we know will never
                // change then keep a minority of rules in-memory which can potentially
                // be hidden.
                var genericRules = this.genericRules.getFilters();
                var cannotBeHiddenRules = [];
                var canBeHiddenRules = [];
                for (var i = 0; i < genericRules.length; i += 1) {
                    var rule = genericRules[i];
                    if (rule.hasCustomStyle() ||
                        rule.isScriptInject() ||
                        rule.hasHostnameConstraint() ||
                        canBeHiddenSelectors.has(rule.getSelector())) {
                        canBeHiddenRules.push(rule);
                    }
                    else {
                        cannotBeHiddenRules.push(rule);
                    }
                }
                this.baseStylesheet = createStylesheetFromRules(cannotBeHiddenRules);
                this.extraGenericRules = canBeHiddenRules;
            }
            return {
                baseStylesheet: this.baseStylesheet,
                genericRules: this.extraGenericRules
            };
        };
        return CosmeticFilterBucket;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Accelerating data structure for network filters matching.
     */
    var NetworkFilterBucket = /** @class */ (function () {
        function NetworkFilterBucket(_a) {
            var _b = _a.filters, filters = _b === void 0 ? [] : _b, config = _a.config;
            this.index = new ReverseIndex({
                config: config,
                deserialize: NetworkFilter.deserialize,
                filters: [],
                optimize: config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork
            });
            this.badFiltersIds = null;
            this.badFilters = new FiltersContainer({
                config: config,
                deserialize: NetworkFilter.deserialize,
                filters: []
            });
            if (filters.length !== 0) {
                this.update(filters, undefined);
            }
        }
        NetworkFilterBucket.deserialize = function (buffer, config) {
            var bucket = new NetworkFilterBucket({ config: config });
            bucket.index = ReverseIndex.deserialize(buffer, NetworkFilter.deserialize, config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork, config);
            bucket.badFilters = FiltersContainer.deserialize(buffer, NetworkFilter.deserialize, config);
            return bucket;
        };
        NetworkFilterBucket.prototype.getFilters = function () {
            var filters = [];
            return filters.concat(this.badFilters.getFilters(), this.index.getFilters());
        };
        NetworkFilterBucket.prototype.update = function (newFilters, removedFilters) {
            var badFilters = [];
            var remaining = [];
            for (var i = 0; i < newFilters.length; i += 1) {
                var filter = newFilters[i];
                if (filter.isBadFilter()) {
                    badFilters.push(filter);
                }
                else {
                    remaining.push(filter);
                }
            }
            this.badFilters.update(badFilters, removedFilters);
            this.index.update(remaining, removedFilters);
            this.badFiltersIds = null;
        };
        NetworkFilterBucket.prototype.serialize = function (buffer) {
            this.index.serialize(buffer);
            this.badFilters.serialize(buffer);
        };
        NetworkFilterBucket.prototype.matchAll = function (request) {
            var _this = this;
            var filters = [];
            this.index.iterMatchingFilters(request.getTokens(), function (filter) {
                if (filter.match(request) && _this.isFilterDisabled(filter) === false) {
                    filters.push(filter);
                }
                return true;
            });
            return filters;
        };
        NetworkFilterBucket.prototype.match = function (request) {
            var _this = this;
            var match;
            this.index.iterMatchingFilters(request.getTokens(), function (filter) {
                if (filter.match(request) && _this.isFilterDisabled(filter) === false) {
                    match = filter;
                    return false;
                }
                return true;
            });
            return match;
        };
        /**
         * Given a matching filter, check if it is disabled by a $badfilter
         */
        NetworkFilterBucket.prototype.isFilterDisabled = function (filter) {
            // Lazily load information about bad filters in memory. The only thing we
            // keep in memory is the list of IDs from $badfilter (ignoring the
            // $badfilter option from mask). This allows to check if a matching filter
            // should be ignored just by doing a lookup in a set of IDs.
            if (this.badFiltersIds === null) {
                var badFilters = this.badFilters.getFilters();
                // Shortcut if there is no badfilter in this bucket
                if (badFilters.length === 0) {
                    return false;
                }
                // Create in-memory list of disabled filter IDs
                var badFiltersIds = new Set();
                for (var i = 0; i < badFilters.length; i += 1) {
                    badFiltersIds.add(badFilters[i].getIdWithoutBadFilter());
                }
                this.badFiltersIds = badFiltersIds;
            }
            return this.badFiltersIds.has(filter.getId());
        };
        return NetworkFilterBucket;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var ENGINE_VERSION = 29;
    // Polyfill for `btoa`
    function btoaPolyfill(buffer) {
        if (typeof btoa !== 'undefined') {
            return btoa(buffer);
        }
        else if (typeof Buffer !== 'undefined') {
            return Buffer.from(buffer).toString('base64');
        }
        return buffer;
    }
    var FilterEngine = /** @class */ (function () {
        function FilterEngine(_a) {
            var _b = _a === void 0 ? {} : _a, 
            // Optionally initialize the engine with filters
            _c = _b.cosmeticFilters, 
            // Optionally initialize the engine with filters
            cosmeticFilters = _c === void 0 ? [] : _c, _d = _b.networkFilters, networkFilters = _d === void 0 ? [] : _d, _e = _b.config, config = _e === void 0 ? new Config() : _e, _f = _b.lists, lists = _f === void 0 ? new Map() : _f;
            this.config = config;
            // Subscription management: disabled by default
            this.lists = lists;
            // $csp=
            this.csp = new NetworkFilterBucket({ config: this.config });
            // $generichide
            this.genericHides = new NetworkFilterBucket({ config: this.config });
            // @@filter
            this.exceptions = new NetworkFilterBucket({ config: this.config });
            // $important
            this.importants = new NetworkFilterBucket({ config: this.config });
            // $redirect
            this.redirects = new NetworkFilterBucket({ config: this.config });
            // All other filters
            this.filters = new NetworkFilterBucket({ config: this.config });
            // Cosmetic filters
            this.cosmetics = new CosmeticFilterBucket({ config: this.config });
            // Injections
            this.resources = new Resources();
            if (networkFilters.length !== 0 || cosmeticFilters.length !== 0) {
                this.update({
                    newCosmeticFilters: cosmeticFilters,
                    newNetworkFilters: networkFilters
                });
            }
        }
        FilterEngine.parse = function (filters, options) {
            if (options === void 0) { options = {}; }
            var config = new Config(options);
            return new this(Object.assign({}, parseFilters(filters, config), { config: config }));
        };
        FilterEngine.deserialize = function (serialized) {
            var buffer = StaticDataView.fromUint8Array(serialized, {
                enableCompression: false
            });
            // Before starting deserialization, we make sure that the version of the
            // serialized engine is the same as the current source code. If not, we
            // start fresh and create a new engine from the lists.
            var serializedEngineVersion = buffer.getUint8();
            if (ENGINE_VERSION !== serializedEngineVersion) {
                throw new Error("serialized engine version mismatch, expected " + ENGINE_VERSION + " but got " + serializedEngineVersion);
            }
            // Create a new engine with same options
            var config = Config.deserialize(buffer);
            // Optionally turn compression ON
            if (config.enableCompression) {
                buffer.enableCompression = true;
            }
            // Also make sure that the built-in checksum is correct. This allows to
            // detect data corruption and start fresh if the serialized version was
            // altered.
            if (config.integrityCheck) {
                var currentPos = buffer.pos;
                buffer.pos = serialized.length - 4;
                var checksum = buffer.checksum();
                var expected = buffer.getUint32();
                if (checksum !== expected) {
                    throw new Error("serialized engine checksum mismatch, expected " + expected + " but got " + checksum);
                }
                buffer.pos = currentPos;
            }
            var engine = new this({ config: config });
            // Deserialize resources
            engine.resources = Resources.deserialize(buffer);
            // Deserialize lists
            var lists = new Map();
            var numberOfLists = buffer.getUint16();
            for (var i = 0; i < numberOfLists; i += 1) {
                lists.set(buffer.getASCII(), buffer.getASCII());
            }
            engine.lists = lists;
            // Deserialize buckets
            engine.filters = NetworkFilterBucket.deserialize(buffer, config);
            engine.exceptions = NetworkFilterBucket.deserialize(buffer, config);
            engine.importants = NetworkFilterBucket.deserialize(buffer, config);
            engine.redirects = NetworkFilterBucket.deserialize(buffer, config);
            engine.csp = NetworkFilterBucket.deserialize(buffer, config);
            engine.genericHides = NetworkFilterBucket.deserialize(buffer, config);
            engine.cosmetics = CosmeticFilterBucket.deserialize(buffer, config);
            return engine;
        };
        /**
         * Creates a binary representation of the full engine. It can be stored
         * on-disk for faster loading of the adblocker. The `deserialize` static
         * method of Engine can be used to restore the engine.
         */
        FilterEngine.prototype.serialize = function (array) {
            // Create a big buffer! It should always be bigger than the serialized
            // engine since `StaticDataView` will neither resize it nor detect overflows
            // (for efficiency purposes).
            var buffer = StaticDataView.fromUint8Array(array || new Uint8Array(9000000), this.config);
            buffer.pushUint8(ENGINE_VERSION);
            // Config
            this.config.serialize(buffer);
            // Resources (js, resources)
            this.resources.serialize(buffer);
            // Serialize the state of lists (names and checksums)
            buffer.pushUint16(this.lists.size);
            var entries = Array.from(this.lists.entries()).sort();
            for (var i = 0; i < entries.length; i += 1) {
                buffer.pushASCII(entries[i][0]);
                buffer.pushASCII(entries[i][1]);
            }
            // Filters buckets
            this.filters.serialize(buffer);
            this.exceptions.serialize(buffer);
            this.importants.serialize(buffer);
            this.redirects.serialize(buffer);
            this.csp.serialize(buffer);
            this.genericHides.serialize(buffer);
            this.cosmetics.serialize(buffer);
            // Append a checksum at the end
            if (this.config.integrityCheck) {
                buffer.pushUint32(buffer.checksum());
            }
            return buffer.slice();
        };
        /**
         * Update engine with new filters or resources.
         */
        FilterEngine.prototype.loadedLists = function () {
            return Array.from(this.lists.keys());
        };
        FilterEngine.prototype.hasList = function (name, checksum) {
            return this.lists.has(name) && this.lists.get(name) === checksum;
        };
        /**
         * Update engine with `resources.txt` content.
         */
        FilterEngine.prototype.updateResources = function (data, checksum) {
            if (this.resources.checksum === checksum) {
                return false;
            }
            this.resources = Resources.parse(data, { checksum: checksum });
            return true;
        };
        FilterEngine.prototype.getFilters = function () {
            var cosmeticFilters = [];
            var networkFilters = [];
            return {
                cosmeticFilters: cosmeticFilters.concat(this.cosmetics.getFilters()),
                networkFilters: networkFilters.concat(this.filters.getFilters(), this.exceptions.getFilters(), this.importants.getFilters(), this.redirects.getFilters(), this.csp.getFilters(), this.genericHides.getFilters())
            };
        };
        /**
         * Update engine with new filters as well as optionally removed filters.
         */
        FilterEngine.prototype.update = function (_a) {
            var _b = _a.newNetworkFilters, newNetworkFilters = _b === void 0 ? [] : _b, _c = _a.newCosmeticFilters, newCosmeticFilters = _c === void 0 ? [] : _c, _d = _a.removedCosmeticFilters, removedCosmeticFilters = _d === void 0 ? [] : _d, _e = _a.removedNetworkFilters, removedNetworkFilters = _e === void 0 ? [] : _e;
            var updated = false;
            // Update cosmetic filters
            if (this.config.loadCosmeticFilters &&
                (newCosmeticFilters.length !== 0 || removedCosmeticFilters.length !== 0)) {
                updated = true;
                this.cosmetics.update(newCosmeticFilters, removedCosmeticFilters.length === 0 ? undefined : new Set(removedCosmeticFilters));
            }
            // Update network filters
            if (this.config.loadNetworkFilters &&
                (newNetworkFilters.length !== 0 || removedNetworkFilters.length !== 0)) {
                updated = true;
                var filters = [];
                var csp = [];
                var exceptions = [];
                var importants = [];
                var redirects = [];
                var genericHides = [];
                for (var i = 0; i < newNetworkFilters.length; i += 1) {
                    var filter = newNetworkFilters[i];
                    // NOTE: it's important to check for $generichide and $csp before
                    // exceptions and important as we store all of them in the same filter
                    // bucket. The check for exceptions is done at match-time directly.
                    if (filter.isCSP()) {
                        csp.push(filter);
                    }
                    else if (filter.isGenericHide()) {
                        genericHides.push(filter);
                    }
                    else if (filter.isException()) {
                        exceptions.push(filter);
                    }
                    else if (filter.isImportant()) {
                        importants.push(filter);
                    }
                    else if (filter.isRedirect()) {
                        redirects.push(filter);
                    }
                    else {
                        filters.push(filter);
                    }
                }
                var removedNetworkFiltersSet = removedNetworkFilters.length === 0 ? undefined : new Set(removedNetworkFilters);
                // Update buckets in-place
                this.filters.update(filters, removedNetworkFiltersSet);
                this.csp.update(csp, removedNetworkFiltersSet);
                this.exceptions.update(exceptions, removedNetworkFiltersSet);
                this.importants.update(importants, removedNetworkFiltersSet);
                this.redirects.update(redirects, removedNetworkFiltersSet);
                this.genericHides.update(genericHides, removedNetworkFiltersSet);
            }
            return updated;
        };
        FilterEngine.prototype.updateFromDiff = function (_a) {
            var added = _a.added, removed = _a.removed;
            var newCosmeticFilters = [];
            var newNetworkFilters = [];
            var removedCosmeticFilters = [];
            var removedNetworkFilters = [];
            if (removed !== undefined && removed.length !== 0) {
                var _b = parseFilters(removed.join('\n'), this.config), networkFilters = _b.networkFilters, cosmeticFilters = _b.cosmeticFilters;
                Array.prototype.push.apply(removedCosmeticFilters, cosmeticFilters);
                Array.prototype.push.apply(removedNetworkFilters, networkFilters);
            }
            if (added !== undefined && added.length !== 0) {
                var _c = parseFilters(added.join('\n'), this.config), networkFilters = _c.networkFilters, cosmeticFilters = _c.cosmeticFilters;
                Array.prototype.push.apply(newCosmeticFilters, cosmeticFilters);
                Array.prototype.push.apply(newNetworkFilters, networkFilters);
            }
            return this.update({
                newCosmeticFilters: newCosmeticFilters,
                newNetworkFilters: newNetworkFilters,
                removedCosmeticFilters: removedCosmeticFilters.map(function (f) { return f.getId(); }),
                removedNetworkFilters: removedNetworkFilters.map(function (f) { return f.getId(); })
            });
        };
        /**
         * Matching APIs. The following methods are used to retrieve matching filters
         * either to apply cosmetics on a page or alter network requests.
         */
        FilterEngine.prototype.getGenericCosmetics = function () {
            return {
                active: false,
                extended: [],
                scripts: [],
                styles: ''
            };
        };
        /**
         * Given `hostname` and `domain` of a page (or frame), return the list of
         * styles and scripts to inject in the page.
         */
        FilterEngine.prototype.getCosmeticsFilters = function (_a) {
            var 
            // Page information
            url = _a.url, hostname = _a.hostname, domain = _a.domain, 
            // DOM information
            classes = _a.classes, hrefs = _a.hrefs, ids = _a.ids, 
            // Allows to specify which rules to return
            _b = _a.getBaseRules, 
            // Allows to specify which rules to return
            getBaseRules = _b === void 0 ? true : _b, _c = _a.getInjectionRules, getInjectionRules = _c === void 0 ? true : _c, _d = _a.getRulesFromDOM, getRulesFromDOM = _d === void 0 ? true : _d, _e = _a.getRulesFromHostname, getRulesFromHostname = _e === void 0 ? true : _e;
            if (this.config.loadCosmeticFilters === false) {
                return {
                    active: false,
                    extended: [],
                    scripts: [],
                    styles: ''
                };
            }
            // Check if there is some generichide
            var genericHides = this.genericHides.matchAll(Request.fromRawDetails({
                domain: domain || '',
                hostname: hostname,
                url: url,
                sourceDomain: '',
                sourceHostname: '',
                sourceUrl: ''
            }));
            // Get $generichide filter with highest priority:
            // $generichide,important > $generichide > @@$generichide
            var genericHideFilter = null;
            var currentScore = 0;
            for (var i = 0; i < genericHides.length; i += 1) {
                var filter = genericHides[i];
                // To encode priority between filters, we create a bitmask with the following:
                // $important,generichide = 100 (takes precedence)
                // $generichide           = 010 (exception to @@$generichide)
                // @@$generichide         = 001 (forbids generic hide filters)
                var score = (filter.isImportant() ? 4 : 0) | (filter.isException() ? 1 : 2);
                // Highest `score` has precedence
                if (score > currentScore) {
                    currentScore = score;
                    genericHideFilter = filter;
                }
            }
            // Check that there is at least one $generichide match and no exception
            var allowGenericHides = genericHideFilter === null || genericHideFilter.isException() === false;
            // Lookup injections as well as stylesheets
            var _f = this.cosmetics.getCosmeticsFilters({
                domain: domain || '',
                hostname: hostname,
                classes: classes,
                hrefs: hrefs,
                ids: ids,
                allowGenericHides: allowGenericHides,
                getBaseRules: getBaseRules,
                getInjectionRules: getInjectionRules,
                getRulesFromDOM: getRulesFromDOM,
                getRulesFromHostname: getRulesFromHostname
            }), injections = _f.injections, stylesheet = _f.stylesheet;
            // Perform interpolation for injected scripts
            var scripts = [];
            for (var i = 0; i < injections.length; i += 1) {
                var script = injections[i].getScript(this.resources.js);
                if (script !== undefined) {
                    scripts.push(script);
                }
            }
            return {
                active: true,
                extended: [],
                scripts: scripts,
                styles: stylesheet
            };
        };
        /**
         * Given a `request`, return all matching network filters found in the engine.
         */
        FilterEngine.prototype.matchAll = function (request) {
            var filters = [];
            if (request.isSupported) {
                Array.prototype.push.apply(filters, this.importants.matchAll(request));
                Array.prototype.push.apply(filters, this.filters.matchAll(request));
                Array.prototype.push.apply(filters, this.exceptions.matchAll(request));
                Array.prototype.push.apply(filters, this.csp.matchAll(request));
                Array.prototype.push.apply(filters, this.genericHides.matchAll(request));
                Array.prototype.push.apply(filters, this.redirects.matchAll(request));
            }
            return new Set(filters);
        };
        /**
         * Given a "main_frame" request, check if some content security policies
         * should be injected in the page.
         */
        FilterEngine.prototype.getCSPDirectives = function (request) {
            if (!this.config.loadNetworkFilters) {
                return undefined;
            }
            if (request.isSupported !== true || request.type !== 'main_frame') {
                return undefined;
            }
            var matches = this.csp.matchAll(request);
            // No $csp filter found
            if (matches.length === 0) {
                return undefined;
            }
            // Collect all CSP directives and keep track of exceptions
            var disabledCsp = new Set();
            var enabledCsp = new Set();
            for (var i = 0; i < matches.length; i += 1) {
                var filter = matches[i];
                if (filter.isException()) {
                    if (filter.csp === undefined) {
                        // All CSP directives are disabled for this site
                        return undefined;
                    }
                    disabledCsp.add(filter.csp);
                }
                else {
                    enabledCsp.add(filter.csp);
                }
            }
            // Combine all CSPs (except the black-listed ones)
            return (Array.from(enabledCsp)
                .filter(function (csp) { return !disabledCsp.has(csp); })
                .join('; ') || undefined);
        };
        /**
         * Decide if a network request (usually from WebRequest API) should be
         * blocked, redirected or allowed.
         */
        FilterEngine.prototype.match = function (request) {
            if (!this.config.loadNetworkFilters) {
                return { match: false, redirect: undefined, exception: undefined, filter: undefined };
            }
            var filter;
            var exception;
            var redirect;
            if (request.isSupported) {
                // Check the filters in the following order:
                // 1. $important (not subject to exceptions)
                // 2. redirection ($redirect=resource)
                // 3. normal filters
                // 4. exceptions
                filter = this.importants.match(request);
                if (filter === undefined) {
                    // Check if there is a redirect or a normal match
                    filter = this.redirects.match(request);
                    if (filter === undefined) {
                        filter = this.filters.match(request);
                    }
                    // If we found something, check for exceptions
                    if (filter !== undefined) {
                        exception = this.exceptions.match(request);
                    }
                }
                // If there is a match
                if (filter !== undefined) {
                    if (filter.isRedirect()) {
                        var redirectResource = this.resources.getResource(filter.getRedirect());
                        if (redirectResource !== undefined) {
                            var data = redirectResource.data, contentType = redirectResource.contentType;
                            var dataUrl = void 0;
                            if (contentType.indexOf(';') !== -1) {
                                dataUrl = "data:" + contentType + "," + data;
                            }
                            else {
                                dataUrl = "data:" + contentType + ";base64," + btoaPolyfill(data);
                            }
                            redirect = {
                                body: data,
                                contentType: contentType,
                                dataUrl: dataUrl.trim()
                            };
                        } // TODO - else, throw an exception
                    }
                }
            }
            return {
                exception: exception,
                filter: filter,
                match: exception === undefined && filter !== undefined,
                redirect: redirect
            };
        };
        return FilterEngine;
    }());

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    function fetchResource(url) {
        return fetch(url).then(function (response) { return response.text(); });
    }
    var lists = [
        {
            category: 2 /* Unbreak */,
            enabledByDefault: true,
            url: 'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt'
        },
        {
            category: 4 /* Country */,
            country: 'de',
            enabledByDefault: true,
            url: 'https://easylist-downloads.adblockplus.org/easylistgermany.txt'
        },
        {
            category: 1 /* Ads */,
            enabledByDefault: true,
            url: 'https://easylist.to/easylist/easylist.txt'
        },
        {
            category: 0 /* Privacy */,
            enabledByDefault: false,
            url: 'https://easylist.to/easylist/easyprivacy.txt'
        },
        {
            category: 1 /* Ads */,
            enabledByDefault: true,
            url: 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=1&mimetype=plaintext'
        },
        {
            category: 5 /* Misc */,
            enabledByDefault: true,
            url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt'
        },
        {
            category: 1 /* Ads */,
            enabledByDefault: true,
            url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt'
        },
        {
            category: 0 /* Privacy */,
            enabledByDefault: false,
            url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt'
        },
        {
            category: 5 /* Misc */,
            enabledByDefault: true,
            url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt'
        },
        {
            category: 2 /* Unbreak */,
            enabledByDefault: true,
            url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt'
        },
        // Adguard filters
        {
            category: 1 /* Ads */,
            description: 'English filters',
            enabledByDefault: false,
            url: 'https://filters.adtidy.org/extension/chromium/filters/2.txt'
        },
        {
            category: 0 /* Privacy */,
            description: 'Spyware filters',
            enabledByDefault: false,
            url: 'https://filters.adtidy.org/extension/chromium/filters/3.txt'
        },
        {
            category: 1 /* Ads */,
            description: 'German filters',
            enabledByDefault: false,
            url: 'https://filters.adtidy.org/extension/chromium/filters/6.txt'
        },
        {
            category: 1 /* Ads */,
            description: 'Mobile ads filters',
            enabledByDefault: false,
            url: 'https://filters.adtidy.org/extension/chromium/filters/11.txt'
        },
    ];
    /**
     * Fetch latest version of enabledByDefault blocking lists.
     */
    function fetchLists() {
        return Promise.all(lists.filter(function (_a) {
            var enabledByDefault = _a.enabledByDefault;
            return enabledByDefault;
        }).map(function (_a) {
            var url = _a.url;
            return fetchResource(url);
        }));
    }
    /**
     * Fetch latest version of uBlock Origin's resources, used to inject scripts in
     * the page or redirect request to data URLs.
     */
    function fetchResources() {
        return fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt');
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
     * methods to interface with WebExtension APIs needed to block ads.
     */
    var WebExtensionBlocker = /** @class */ (function (_super) {
        __extends(WebExtensionBlocker, _super);
        function WebExtensionBlocker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
         */
        WebExtensionBlocker.prototype.onBeforeRequest = function (details) {
            var request = Request.fromWebRequestDetails(details);
            var _a = this.match(request), redirect = _a.redirect, match = _a.match;
            if (redirect !== undefined) {
                return { redirectUrl: redirect.dataUrl };
            }
            else if (match === true) {
                return { cancel: true };
            }
            return {};
        };
        /**
         *
         */
        WebExtensionBlocker.prototype.onHeadersReceived = function (details) {
            return updateResponseHeadersWithCSP(details, this.getCSPDirectives(Request.fromWebRequestDetails(details)));
        };
        WebExtensionBlocker.prototype.onRuntimeMessage = function (msg, sender, sendResponse) {
            if (sender.tab === undefined || sender.tab.id === undefined || sender.frameId === undefined) {
                return;
            }
            // Make sure we only listen to messages coming from our content-script
            // based on the value of `action`.
            if (msg.action === 'getCosmeticsFilters') {
                // Extract hostname from sender's URL
                var _a = sender.url, url = _a === void 0 ? '' : _a, frameId = sender.frameId;
                var parsed = parse(url);
                var hostname = parsed.hostname || '';
                var domain = parsed.domain || '';
                // Once per tab/page load we inject base stylesheets. These are always
                // the same for all frames of a given page because they do not depend on
                // a particular domain and cannot be cancelled using unhide rules.
                // Because of this, we specify `allFrames: true` when injecting them so
                // that we do not need to perform this operation for sub-frames.
                if (frameId === 0 && msg.lifecycle === 'start') {
                    var _b = this.getCosmeticsFilters({
                        domain: domain,
                        hostname: hostname,
                        url: url,
                        classes: msg.classes,
                        hrefs: msg.hrefs,
                        ids: msg.ids,
                        // This needs to be done only once per tab
                        getBaseRules: true,
                        getInjectionRules: false,
                        getRulesFromDOM: false,
                        getRulesFromHostname: false
                    }), active = _b.active, styles = _b.styles;
                    if (active === false) {
                        return;
                    }
                    this.injectStylesWebExtension(styles, { tabId: sender.tab.id, allFrames: true });
                }
                // Separately, requests cosmetics which depend on the page it self
                // (either because of the hostname or content of the DOM). Content script
                // logic is responsible for returning information about lists of classes,
                // ids and hrefs observed in the DOM. MutationObserver is also used to
                // make sure we can react to changes.
                {
                    var _c = this.getCosmeticsFilters({
                        domain: domain,
                        hostname: hostname,
                        url: url,
                        classes: msg.classes,
                        hrefs: msg.hrefs,
                        ids: msg.ids,
                        // This needs to be done only once per frame
                        getBaseRules: false,
                        getInjectionRules: msg.lifecycle === 'start',
                        getRulesFromHostname: msg.lifecycle === 'start',
                        // This will be done every time we get information about DOM mutation
                        getRulesFromDOM: msg.lifecycle === 'dom-update'
                    }), active = _c.active, styles = _c.styles, scripts = _c.scripts;
                    if (active === false) {
                        return;
                    }
                    this.injectStylesWebExtension(styles, { tabId: sender.tab.id, frameId: frameId });
                    // Inject scripts from content script
                    var responseFromBackground = {
                        active: active,
                        extended: [],
                        scripts: scripts,
                        styles: ''
                    };
                    sendResponse(responseFromBackground);
                }
            }
        };
        WebExtensionBlocker.prototype.injectStylesWebExtension = function (styles, _a) {
            var tabId = _a.tabId, frameId = _a.frameId, _b = _a.allFrames, allFrames = _b === void 0 ? false : _b;
            if (styles.length > 0 &&
                typeof chrome !== 'undefined' &&
                chrome.tabs &&
                chrome.tabs.insertCSS) {
                chrome.tabs.insertCSS(tabId, {
                    allFrames: allFrames,
                    code: styles,
                    cssOrigin: 'user',
                    frameId: frameId,
                    matchAboutBlank: true,
                    runAt: 'document_start'
                }, function () {
                    if (chrome.runtime.lastError) {
                        console.error('Error while injecting CSS', chrome.runtime.lastError.message);
                    }
                });
            }
        };
        return WebExtensionBlocker;
    }(FilterEngine));

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var magic = Math.abs((Date.now() * 524287) ^ ((Math.random() * 524287) >>> 0)).toString(16);
    /**
     * WARNING: this function should be self-contained and not rely on any global
     * symbol. That constraint needs to be fulfilled because this function can
     * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
     * more details).
     */
    function extractFeaturesFromDOM(elements) {
        var ignoredTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
        var classes = new Set();
        var hrefs = new Set();
        var ids = new Set();
        for (var i = 0; i < elements.length; i += 1) {
            var element = elements[i];
            if (element.nodeType !== 1 /* Node.ELEMENT_NODE */) {
                continue;
            }
            if (ignoredTags.has(element.localName)) {
                continue;
            }
            // Update ids
            var id = element.id;
            if (id) {
                ids.add(id);
            }
            // Update classes
            var classList = element.classList;
            for (var j = 0; j < classList.length; j += 1) {
                classes.add(classList[j]);
            }
            // Update href
            // @ts-ignore
            var href = element.href;
            if (href) {
                hrefs.add(href);
            }
        }
        return {
            classes: Array.from(classes),
            hrefs: Array.from(hrefs),
            ids: Array.from(ids)
        };
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Wrap a self-executing script into a block of custom logic to remove the
     * script tag once execution is terminated. This can be useful to not leave
     * traces in the DOM after injections.
     */
    function autoRemoveScript(script) {
        return "\ntry {\n  " + script + "\n} catch (ex) { }\n\n(function() {\n  var currentScript = document.currentScript;\n  var parent = currentScript && currentScript.parentNode;\n\n  if (parent) {\n    parent.removeChild(currentScript);\n  }\n})();\n  ";
    }
    function injectCSSRule(rule, doc) {
        var parent = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
        if (parent !== null) {
            var css = doc.createElement('style');
            css.type = 'text/css';
            css.id = 'cliqz-adblokcer-css-rules';
            css.appendChild(doc.createTextNode(rule));
            parent.appendChild(css);
        }
    }
    function injectScript(s, doc) {
        var script = doc.createElement('script');
        script.type = 'text/javascript';
        script.id = 'cliqz-adblocker-script';
        script.async = false;
        script.appendChild(doc.createTextNode(autoRemoveScript(s)));
        // Insert node
        var parent = doc.head || doc.documentElement;
        if (parent !== null) {
            parent.appendChild(script);
        }
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
     */
    var PuppeteerBlocker = /** @class */ (function (_super) {
        __extends(PuppeteerBlocker, _super);
        function PuppeteerBlocker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PuppeteerBlocker.prototype.enableBlockingInPage = function (page) {
            var _this = this;
            // Make sure request interception is enabled for `page` before proceeding
            return page.setRequestInterception(true).then(function () {
                // NOTE - page.setBypassCSP(enabled) might be needed to perform injections on some pages
                // NOTE - we currently do not perform CSP headers injection as there is
                // currently no way to modify responses in puppeteer. This feature could
                // easily be added if puppeteer implements the required capability.
                // Register callback for network requets filtering
                page.on('request', function (request) {
                    _this.onRequest(request);
                });
                // Register callback to cosmetics injection (CSS + scriptlets)
                page.on('framenavigated', function (frame) { return __awaiter(_this, void 0, void 0, function () {
                    var ex_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.onFrame(frame)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                ex_1 = _a.sent();
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
        PuppeteerBlocker.prototype.onFrame = function (frame) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, ids, hrefs, classes, url, parsed, hostname, domain, _b, active, scripts, styles, i;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, frame.$$eval('[id],[class],[href]', extractFeaturesFromDOM)];
                        case 1:
                            _a = _c.sent(), ids = _a.ids, hrefs = _a.hrefs, classes = _a.classes;
                            url = frame.url();
                            parsed = parse(url);
                            hostname = parsed.hostname || '';
                            domain = parsed.domain || '';
                            _b = this.getCosmeticsFilters({
                                domain: domain,
                                hostname: hostname,
                                url: url,
                                // DOM information
                                classes: classes,
                                hrefs: hrefs,
                                ids: ids
                            }), active = _b.active, scripts = _b.scripts, styles = _b.styles;
                            // Abort if cosmetics are disabled
                            if (active === true) {
                                // Inject scripts
                                for (i = 0; i < scripts.length; i += 1) {
                                    frame
                                        .addScriptTag({
                                        content: autoRemoveScript(scripts[i])
                                    })["catch"](function () {
                                        // Ignore
                                    });
                                }
                                // Inject CSS
                                if (styles.length !== 0) {
                                    frame
                                        .addStyleTag({
                                        content: styles
                                    })["catch"](function () {
                                        // Ignore
                                    });
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        PuppeteerBlocker.prototype.onRequest = function (request) {
            var _a = this.match(Request.fromPuppeteerDetails(request)), redirect = _a.redirect, match = _a.match;
            if (redirect !== undefined) {
                var body = redirect.body, contentType = redirect.contentType;
                request.respond({
                    body: body,
                    contentType: contentType
                });
            }
            else if (match === true) {
                request.abort('blockedbyclient');
            }
            else {
                request["continue"]();
            }
        };
        return PuppeteerBlocker;
    }(FilterEngine));

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    /**
     * Wrap `FiltersEngine` into a Electron-friendly helper class.
     */
    var ElectronBlocker = /** @class */ (function (_super) {
        __extends(ElectronBlocker, _super);
        function ElectronBlocker() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.onGetCosmeticFilters = function (e, id, msg) {
                // Extract hostname from sender's URL
                var url = e.sender.getURL();
                var parsed = parse(url);
                var hostname = parsed.hostname || '';
                var domain = parsed.domain || '';
                // Once per tab/page load we inject base stylesheets. These are always
                // the same for all frames of a given page because they do not depend on
                // a particular domain and cannot be cancelled using unhide rules.
                // Because of this, we specify `allFrames: true` when injecting them so
                // that we do not need to perform this operation for sub-frames.
                if (msg.lifecycle === 'start') {
                    var _a = _this.getCosmeticsFilters({
                        domain: domain,
                        hostname: hostname,
                        url: url,
                        classes: msg.classes,
                        hrefs: msg.hrefs,
                        ids: msg.ids,
                        // This needs to be done only once per tab
                        getBaseRules: true,
                        getInjectionRules: false,
                        getRulesFromDOM: false,
                        getRulesFromHostname: false
                    }), active = _a.active, styles = _a.styles;
                    if (active === false) {
                        return;
                    }
                    _this.injectStyles(e.sender, styles);
                }
                // Separately, requests cosmetics which depend on the page it self
                // (either because of the hostname or content of the DOM). Content script
                // logic is responsible for returning information about lists of classes,
                // ids and hrefs observed in the DOM. MutationObserver is also used to
                // make sure we can react to changes.
                {
                    var _b = _this.getCosmeticsFilters({
                        domain: domain,
                        hostname: hostname,
                        url: url,
                        classes: msg.classes,
                        hrefs: msg.hrefs,
                        ids: msg.ids,
                        // This needs to be done only once per frame
                        getBaseRules: false,
                        getInjectionRules: msg.lifecycle === 'start',
                        getRulesFromHostname: msg.lifecycle === 'start',
                        // This will be done every time we get information about DOM mutation
                        getRulesFromDOM: msg.lifecycle === 'dom-update'
                    }), active = _b.active, styles = _b.styles, scripts = _b.scripts;
                    if (active === false) {
                        return;
                    }
                    _this.injectStyles(e.sender, styles);
                    // Inject scripts from content script
                    var responseFromBackground = {
                        active: active,
                        extended: [],
                        scripts: scripts,
                        styles: ''
                    };
                    e.sender.send("get-cosmetic-filters-" + id, responseFromBackground);
                }
            };
            _this.onRequest = function (details, callback) {
                var _a = _this.match(Request.fromElectronDetails(details)), redirect = _a.redirect, match = _a.match;
                if (redirect) {
                    var dataUrl = redirect.dataUrl;
                    callback({ redirectURL: dataUrl });
                }
                else {
                    callback({ cancel: match });
                }
            };
            return _this;
        }
        ElectronBlocker.prototype.enableBlockingInSession = function (ses) {
            ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onRequest);
            ses.setPreloads(["content.js"]);
            electron.ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
        };
        ElectronBlocker.prototype.injectStyles = function (sender, styles) {
            if (sender && styles.length > 0) {
                sender.insertCSS(styles);
            }
        };
        return ElectronBlocker;
    }(FilterEngine));

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */
    var ACTIVE = true;
    var MUTATION_OBSERVER = null;
    function unload() {
        if (MUTATION_OBSERVER !== null) {
            MUTATION_OBSERVER.disconnect();
            MUTATION_OBSERVER = null;
        }
    }
    function handleResponseFromBackground(window, _a) {
        var active = _a.active, scripts = _a.scripts, styles = _a.styles;
        if (active === false) {
            ACTIVE = false;
            unload();
            return;
        }
        else {
            ACTIVE = true;
        }
        // Inject scripts
        if (scripts) {
            var _loop_1 = function (i) {
                setTimeout(function () { return injectScript(scripts[i], window.document); }, 0);
            };
            for (var i = 0; i < scripts.length; i += 1) {
                _loop_1(i);
            }
        }
        // Normal CSS
        if (styles && styles.length > 0) {
            setTimeout(function () { return injectCSSRule(styles, window.document); }, 0);
        }
        // Extended CSS
        // if (extended && extended.length > 0) {
        // }
    }
    /**
     * Takes care of injecting cosmetic filters in a given window. Responsabilities:
     * - Inject scripts.
     * - Block scripts.
     * - Inject CSS rules.
     *
     * All this happens by communicating with the background through the
     * `backgroundAction` function (to trigger request the sending of new rules
     * based on a domain or node selectors) and the `handleResponseFromBackground`
     * callback to apply new rules.
     */
    function injectCosmetics(window, getCosmeticsFilters, enableMutationObserver) {
        // Invoked as soon as content-script is injected to ask for background to
        // inject cosmetics and scripts as soon as possible. Some extra elements
        // might be inserted later whenever we know more about the content of the
        // page.
        getCosmeticsFilters({ lifecycle: 'start', ids: [], classes: [], hrefs: [] }).then(function (response) {
            return handleResponseFromBackground(window, response);
        });
        // On DOMContentLoaded, start monitoring the DOM. This means that we will
        // first check which ids and classes exist in the DOM as a one-off operation;
        // this will allow the injection of selectors which have a chance to match.
        // We also register a MutationObserver which will monitor the addition of new
        // classes and ids, and might trigger extra filters on a per-need basis.
        window.addEventListener('DOMContentLoaded', function () {
            // Keep track of values already seen and processed in this frame
            var knownIds = new Set();
            var knownClasses = new Set();
            var knownHrefs = new Set();
            // Given a list of `nodes` (i.e.: instances of `Element` class), extract
            // a list of class names and ids which we never saw before. These will be
            // used to request extra cosmetics to inject if needed.
            var handleNodes = function (nodes) {
                var _a = extractFeaturesFromDOM(nodes), classes = _a.classes, ids = _a.ids, hrefs = _a.hrefs;
                var newIds = [];
                var newClasses = [];
                var newHrefs = [];
                // Update ids
                for (var i = 0; i < ids.length; i += 1) {
                    var id = ids[i];
                    if (knownIds.has(id) === false) {
                        newIds.push(id);
                        knownIds.add(id);
                    }
                }
                for (var i = 0; i < classes.length; i += 1) {
                    var cls = classes[i];
                    if (knownClasses.has(cls) === false) {
                        newClasses.push(cls);
                        knownClasses.add(cls);
                    }
                }
                for (var i = 0; i < hrefs.length; i += 1) {
                    var href = hrefs[i];
                    if (knownHrefs.has(href) === false) {
                        newHrefs.push(href);
                        knownHrefs.add(href);
                    }
                }
                if (newIds.length !== 0 || newClasses.length !== 0 || newHrefs.length !== 0) {
                    // TODO - we might want to throttle that?
                    getCosmeticsFilters({
                        classes: newClasses,
                        hrefs: newHrefs,
                        ids: newIds,
                        lifecycle: 'dom-update'
                    }).then(function (response) { return handleResponseFromBackground(window, response); });
                }
            };
            // Since we did not start observing before, start by getting the list of
            // all ids and classes in the DOM at this point of time (DOMContentLoaded
            // event). Afterwards, we will rely on the mutation observer to detect
            // changes.
            handleNodes(Array.from(window.document.querySelectorAll('[id],[class],[href]')));
            // Start observing mutations to detect new ids and classes which would
            // need to be hidden.
            if (ACTIVE && enableMutationObserver && window.MutationObserver) {
                MUTATION_OBSERVER = new window.MutationObserver(function (mutations) {
                    // Accumulate all nodes which were updated in `nodes`
                    var nodes = [];
                    for (var i = 0; i < mutations.length; i += 1) {
                        var mutation = mutations[i];
                        if (mutation.type === 'attributes') {
                            nodes.push(mutation.target);
                        }
                        else if (mutation.type === 'childList') {
                            var addedNodes = mutation.addedNodes;
                            for (var j = 0; j < addedNodes.length; j += 1) {
                                var addedNode = addedNodes[j];
                                nodes.push(addedNode);
                                if (addedNode.querySelectorAll !== undefined) {
                                    var children = addedNode.querySelectorAll('[id],[class],[href]');
                                    for (var k = 0; k < children.length; k += 1) {
                                        nodes.push(children[k]);
                                    }
                                }
                            }
                        }
                    }
                    handleNodes(nodes);
                });
                MUTATION_OBSERVER.observe(window.document.documentElement, {
                    attributeFilter: ['class', 'id', 'href'],
                    attributes: true,
                    childList: true,
                    subtree: true
                });
            }
        }, { once: true, passive: true });
        // Clean-up afterwards
        window.addEventListener('unload', unload, { once: true, passive: true });
    }

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */

    /*!
     * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
     *
     * This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at https://mozilla.org/MPL/2.0/.
     */

    exports.Config = Config;
    exports.CosmeticFilter = CosmeticFilter;
    exports.ENGINE_VERSION = ENGINE_VERSION;
    exports.ElectronBlocker = ElectronBlocker;
    exports.FiltersEngine = FilterEngine;
    exports.NetworkFilter = NetworkFilter;
    exports.PuppeteerBlocker = PuppeteerBlocker;
    exports.Request = Request;
    exports.ReverseIndex = ReverseIndex;
    exports.WebExtensionBlocker = WebExtensionBlocker;
    exports.compactTokens = compactTokens;
    exports.f = f;
    exports.fetchLists = fetchLists;
    exports.fetchResources = fetchResources;
    exports.generateDiff = generateDiff;
    exports.getLinesWithFilters = getLinesWithFilters;
    exports.hasEmptyIntersection = hasEmptyIntersection;
    exports.injectCosmetics = injectCosmetics;
    exports.makeRequest = makeRequest;
    exports.mergeCompactSets = mergeCompactSets;
    exports.mergeDiffs = mergeDiffs;
    exports.parseFilter = parseFilter;
    exports.parseFilters = parseFilters;
    exports.tokenize = tokenize;
    exports.updateResponseHeadersWithCSP = updateResponseHeadersWithCSP;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
