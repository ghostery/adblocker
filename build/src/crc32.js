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
export default function crc32(buf, start, end) {
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
