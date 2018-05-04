import { compactTokens } from './compact-set';

/***************************************************************************
 *  Bitwise helpers
 * ************************************************************************* */

export function getBit(n: number, mask: number): boolean {
  return !!(n & mask);
}

export function setBit(n: number, mask: number): number {
  return n | mask;
}

export function clearBit(n: number, mask: number): number {
  return n & ~mask;
}

// TODO - depending on the filters we have in the lists, this hash function
// could result in collisions. One way to make sure it does not happen, would be
// to select a set of prime numbers for the seed and increment that do not
// generate collisions on our set of filters.
export function fastHash(str: string): number {
  if (!str) { return 0; }
  let hash = 5407;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31) ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

// https://jsperf.com/string-startswith/21
export function fastStartsWith(haystack: string, needle: string): boolean {
  if (haystack.length < needle.length) {
    return false;
  }

  const ceil = needle.length;
  for (let i = 0; i < ceil; i += 1) {
    if (haystack[i] !== needle[i]) {
      return false;
    }
  }

  return true;
}

export function fastStartsWithFrom(
  haystack: string,
  needle: string,
  start: number,
): boolean {
  if (haystack.length - start < needle.length) {
    return false;
  }

  const ceil = start + needle.length;
  for (let i = start; i < ceil; i += 1) {
    if (haystack[i] !== needle[i - start]) {
      return false;
    }
  }

  return true;
}

// const COSMETIC_SPLIT_RE = /[#.\w_-]{2,}/g;
// export function tokenizeCSS(selector) {
//   return selector.match(COSMETIC_SPLIT_RE) || [];
// }

// const TOKENIZE_RE = /[a-zA-Z0-9](?![*])/g;
// export function tokenize(pattern) {
//   return pattern.match(TOKENIZE_RE) || [];
// }

// Efficient manuel lexer
function isDigit(ch: number): boolean {
  // 48 == '0'
  // 57 == '9'
  return ch >= 48 && ch <= 57;
}

function isAlpha(ch: number): boolean {
  // Force to upper-case
  ch &= ~32;
  // 65 == 'A'
  // 90 == 'Z'
  return ch >= 65 && ch <= 90;
}

function isAlphaExtended(ch: number) {
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

function isAllowed(ch: number): boolean {
  return isDigit(ch) || isAlpha(ch) || isAlphaExtended(ch);
}

function isAllowedCSS(ch: number): boolean {
  return (
    isDigit(ch) ||
    isAlpha(ch) ||
    ch === 95 || // '_' (underscore)
    ch === 45 || // '-' (dash)
    ch === 46 || // '.' (dot)
    ch === 35 // '#' (sharp)
  );
}

function fastTokenizer(pattern: string, isAllowedCode: (ch: number) => boolean, allowRegexSurround = false) {
  const tokens: number[] = [];
  let inside: boolean = false;
  let start = 0;
  let length = 0;

  for (let i: number = 0, len = pattern.length; i < len; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch)) {
      if (!inside) {
        inside = true;
        start = i;
        length = 0;
      }
      length += 1;
    } else if (inside) {
      inside = false;
      // Should not be followed by '*'
      if (allowRegexSurround || ch !== 42) {
        tokens.push(fastHash(pattern.substr(start, length)));
      }
    }
  }

  if (inside) {
    tokens.push(fastHash(pattern.substr(start, length)));
  }

  return tokens;
}

export function tokenize(pattern: string): number[] {
  return fastTokenizer(pattern, isAllowed, false);
}

export function tokenizeCSS(pattern: string): number[] {
  return fastTokenizer(pattern, isAllowedCSS, true);
}

export function createFuzzySignature(pattern: string): Uint32Array {
  return compactTokens(new Uint32Array(tokenize(pattern)));
}
