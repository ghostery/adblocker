/*
 * CRC32/IEEE implementation optimized with slicing-by-8.
 * Original legacy CRC32 implementation from SheetJS js-crc32.
 * Slicing-by-8 technique from Kounavis and Berry,
 * "A Systematic Approach to Building High Performance Software-Based CRC Generators", ISCC 2005.
 */

const POLY = 0xedb88320;
const [T0, T1, T2, T3, T4, T5, T6, T7] = (() => {
  const tables = Array.from({ length: 8 }, () => new Int32Array(256));
  let c = 0;
  let n = 0;
  let k = 0;

  for (; n !== 256; n += 1) {
    c = n;
    for (k = 0; k !== 8; k += 1) {
      c = c & 1 ? POLY ^ (c >>> 1) : c >>> 1;
    }
    tables[0][n] = c;
  }

  for (let i = 0; i !== 256; i += 1) {
    c = tables[0][i];
    for (n = 1; n !== tables.length; n += 1) {
      c = (c >>> 8) ^ tables[0][c & 0xff];
      tables[n][i] = c;
    }
  }

  return tables;
})();

export default function crc32(buf: Uint8Array, start: number, end: number): number {
  const L = end - 7;
  let C = -1;
  let i = start;

  while (i < L) {
    C ^= buf[i] | (buf[i + 1] << 8) | (buf[i + 2] << 16) | (buf[i + 3] << 24);
    C =
      T7[C & 0xff] ^
      T6[(C >>> 8) & 0xff] ^
      T5[(C >>> 16) & 0xff] ^
      T4[C >>> 24] ^
      T3[buf[i + 4]] ^
      T2[buf[i + 5]] ^
      T1[buf[i + 6]] ^
      T0[buf[i + 7]];
    i += 8;
  }

  while (i < end) {
    C = (C >>> 8) ^ T0[(C ^ buf[i]) & 0xff];
    i += 1;
  }

  return (C ^ -1) >>> 0;
}
