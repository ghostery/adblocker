/* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* From: https://github.com/SheetJS/js-crc32/ */

const T: Int32Array = (() => {
  let c: number = 0;
  const table: Int32Array = new Int32Array(256);

  for (let n: number = 0; n !== 256; n += 1) {
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

export default function crc32(buf: Uint8Array, start: number, end: number): number {
  let C: number = 0 ^ -1;
  const L: number = end - 7;
  let i: number = start;
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
