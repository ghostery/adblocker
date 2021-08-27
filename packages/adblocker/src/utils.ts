/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { TokensBuffer, TOKENS_BUFFER } from './tokens-buffer';

export const HASH_SEED = 7877;

/***************************************************************************
 *  Bitwise helpers
 * ************************************************************************* */

// From: https://stackoverflow.com/a/43122214/1185079
export function bitCount(n: number): number {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

export function getBit(n: number, mask: number): boolean {
  return !!(n & mask);
}

export function setBit(n: number, mask: number): number {
  return n | mask;
}

export function clearBit(n: number, mask: number): number {
  return n & ~mask;
}

export function fastHashBetween(str: string, begin: number, end: number): number {
  let hash = HASH_SEED;

  for (let i = begin; i < end; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

export function fastHash(str: string): number {
  if (typeof str !== 'string') {
    return HASH_SEED;
  }

  if (str.length === 0) {
    return HASH_SEED;
  }

  return fastHashBetween(str, 0, str.length);
}

export function hashStrings(strings: string[]): Uint32Array {
  const result = new Uint32Array(strings.length);
  let index = 0;
  for (const str of strings) {
    result[index++] = fastHash(str);
  }
  return result;
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

export function fastStartsWithFrom(haystack: string, needle: string, start: number): boolean {
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

export function isDigit(ch: number): boolean {
  // 48 == '0'
  // 57 == '9'
  return ch >= 48 && ch <= 57;
}

export function isAlpha(ch: number): boolean {
  // 65 == 'A'
  // 90 == 'Z'
  // 97 == 'a'
  // 122 === 'z'
  return (ch >= 97 && ch <= 122) || (ch >= 65 && ch <= 90);
}

function isAlphaExtended(ch: number): boolean {
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

function isCyrillic(ch: number): boolean {
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

function isAllowedCode(ch: number): boolean {
  return (
    isAlpha(ch) || isDigit(ch) || ch === 37 /* '%' */ || isAlphaExtended(ch) || isCyrillic(ch)
  );
}

export function tokenizeWithWildcardsInPlace(
  pattern: string,
  skipFirstToken: boolean,
  skipLastToken: boolean,
  buffer: TokensBuffer,
): void {
  // TODO maybe better to check if buffer is full?
  // Otherwise we are under-using the space.
  const len = Math.min(pattern.length, buffer.remaining() * 2);
  let inside = false;
  let precedingCh = 0;
  let start = 0;
  let hash = HASH_SEED;

  for (let i = 0; i < len; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch) === true) {
      if (inside === false) {
        hash = HASH_SEED;
        inside = true;
        start = i;
      }
      hash = (hash * 33) ^ ch;
    } else {
      if (inside === true) {
        inside = false;

        if (
          i - start > 1 && // Ignore tokens of 1 character
          ch !== 42 && // Ignore tokens followed by a '*'
          precedingCh !== 42 && // Ignore tokens preceeded by a '*'
          (skipFirstToken === false || start !== 0)
        ) {
          buffer.push(hash >>> 0);
        }
      }

      precedingCh = ch;
    }
  }

  if (
    skipLastToken === false &&
    inside === true &&
    precedingCh !== 42 && // Ignore tokens preceeded by a '*'
    pattern.length - start > 1 && // Ignore tokens of 1 character
    buffer.full() === false
  ) {
    buffer.push(hash >>> 0);
  }
}

export function tokenizeInPlace(
  pattern: string,
  skipFirstToken: boolean,
  skipLastToken: boolean,
  buffer: TokensBuffer,
): void {
  const len = Math.min(pattern.length, buffer.remaining() * 2);
  let inside = false;
  let start = 0;
  let hash = HASH_SEED;

  for (let i = 0; i < len; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch) === true) {
      if (inside === false) {
        hash = HASH_SEED;
        inside = true;
        start = i;
      }
      hash = (hash * 33) ^ ch;
    } else if (inside === true) {
      inside = false;
      if (
        i - start > 1 && // Ignore tokens of 1 character
        (skipFirstToken === false || start !== 0)
      ) {
        buffer.push(hash >>> 0);
      }
    }
  }

  if (
    inside === true &&
    skipLastToken === false &&
    pattern.length - start > 1 && // Ignore tokens of 1 character
    buffer.full() === false
  ) {
    buffer.push(hash >>> 0);
  }
}

export function tokenizeNoSkipInPlace(pattern: string, buffer: TokensBuffer): void {
  const len = Math.min(pattern.length, buffer.remaining() * 2);
  let inside = false;
  let start = 0;
  let hash = HASH_SEED;

  for (let i = 0; i < len; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch) === true) {
      if (inside === false) {
        hash = HASH_SEED;
        inside = true;
        start = i;
      }
      hash = (hash * 33) ^ ch;
    } else if (inside === true) {
      inside = false;
      if (i - start > 1) {
        buffer.push(hash >>> 0);
      }
    }
  }

  if (inside === true && pattern.length - start > 1 && buffer.full() === false) {
    buffer.push(hash >>> 0);
  }
}

export function tokenizeNoSkip(pattern: string): Uint32Array {
  TOKENS_BUFFER.reset();
  tokenizeNoSkipInPlace(pattern, TOKENS_BUFFER);
  return TOKENS_BUFFER.slice();
}

export function tokenizeWithWildcards(
  pattern: string,
  skipFirstToken: boolean,
  skipLastToken: boolean,
): Uint32Array {
  TOKENS_BUFFER.reset();
  tokenizeWithWildcardsInPlace(pattern, skipFirstToken, skipLastToken, TOKENS_BUFFER);
  return TOKENS_BUFFER.slice();
}

export function tokenize(
  pattern: string,
  skipFirstToken: boolean,
  skipLastToken: boolean,
): Uint32Array {
  TOKENS_BUFFER.reset();
  tokenizeInPlace(pattern, skipFirstToken, skipLastToken, TOKENS_BUFFER);
  return TOKENS_BUFFER.slice();
}

export function tokenizeRegexInPlace(selector: string, tokens: TokensBuffer): void {
  let end = selector.length - 1;
  let begin = 1;
  let prev: number = 0;

  // Try to find the longest safe *prefix* that we can tokenize
  for (; begin < end; begin += 1) {
    const code = selector.charCodeAt(begin);

    // If we encounter '|' before any other opening bracket, then it's not safe
    // to tokenize this filter (e.g.: 'foo|bar'). Instead we abort tokenization
    // to be safe.
    if (code === 124 /* '|' */) {
      return;
    }

    if (
      code === 40 /* '(' */ ||
      code === 42 /* '*' */ ||
      code === 43 /* '+' */ ||
      code === 63 /* '?' */ ||
      code === 91 /* '[' */ ||
      code === 123 /* '{' */ ||
      (code === 46 /* '.' */ && prev !== 92) /* '\' */ ||
      (code === 92 /* '\' */ && isAlpha(selector.charCodeAt(begin + 1)))
    ) {
      break;
    }

    prev = code;
  }

  // Try to find the longest safe *suffix* that we can tokenize
  prev = 0;
  for (; end >= begin; end -= 1) {
    const code = selector.charCodeAt(end);

    // If we encounter '|' before any other opening bracket, then it's not safe
    // to tokenize this filter (e.g.: 'foo|bar'). Instead we abort tokenization
    // to be safe.
    if (code === 124 /* '|' */) {
      return;
    }

    if (
      code === 41 /* ')' */ ||
      code === 42 /* '*' */ ||
      code === 43 /* '+' */ ||
      code === 63 /* '?' */ ||
      code === 93 /* ']' */ ||
      code === 125 /* '}' */ ||
      (code === 46 /* '.' */ && selector.charCodeAt(end - 1) !== 92) /* '\' */ ||
      (code === 92 /* '\' */ && isAlpha(prev))
    ) {
      break;
    }

    prev = code;
  }

  if (end < begin) {
    // Full selector is safe
    const skipFirstToken: boolean = selector.charCodeAt(1) !== 94; /* '^' */
    const skipLastToken: boolean = selector.charCodeAt(selector.length - 1) !== 36; /* '$' */
    tokenizeInPlace(selector.slice(1, selector.length - 1), skipFirstToken, skipLastToken, tokens);
  } else {
    // Tokenize prefix
    if (begin > 1) {
      tokenizeInPlace(
        selector.slice(1, begin),
        selector.charCodeAt(1) !== 94 /* '^' */, // skipFirstToken
        true,
        tokens,
      );
    }

    // Tokenize suffix
    if (end < selector.length - 1) {
      tokenizeInPlace(
        selector.slice(end + 1, selector.length - 1),
        true,
        selector.charCodeAt(selector.length - 1) !== 94 /* '^' */, // skipLastToken
        tokens,
      );
    }
  }
}

export function binSearch(arr: Uint32Array, elt: number): number {
  if (arr.length === 0) {
    return -1;
  }

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    const midVal = arr[mid];
    if (midVal < elt) {
      low = mid + 1;
    } else if (midVal > elt) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

export function binLookup(arr: Uint32Array, elt: number): boolean {
  return binSearch(arr, elt) !== -1;
}

const hasUnicodeRe = /[^\u0000-\u00ff]/;
export function hasUnicode(str: string): boolean {
  return hasUnicodeRe.test(str);
}
