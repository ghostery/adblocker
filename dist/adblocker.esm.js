import { factory } from 'tsmaz';
import { parse } from 'tldts';
import { __extends, __awaiter, __generator } from 'tslib';
import { ipcMain } from 'electron';

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
        ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
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

export { Config, CosmeticFilter, ENGINE_VERSION, ElectronBlocker, FilterEngine as FiltersEngine, NetworkFilter, PuppeteerBlocker, Request, ReverseIndex, WebExtensionBlocker, compactTokens, f, fetchLists, fetchResources, generateDiff, getLinesWithFilters, hasEmptyIntersection, injectCosmetics, makeRequest, mergeCompactSets, mergeDiffs, parseFilter, parseFilters, tokenize, updateResponseHeadersWithCSP };
