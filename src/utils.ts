import { compactTokens } from './compact-set';

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

function fastHashBetween(str: string, begin: number, end: number): number {
  let hash = 5381;

  for (let i = begin; i < end; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

export function fastHash(str: string): number {
  if (!str) {
    return 0;
  }
  return fastHashBetween(str, 0, str.length);
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

// Efficient manuel lexer
function isDigit(ch: number): boolean {
  // 48 == '0'
  // 57 == '9'
  return ch >= 48 && ch <= 57;
}

function isAlpha(ch: number): boolean {
  // Force to lower-case
  ch |= 32;
  // 65 == 'A'
  // 90 == 'Z'
  return ch >= 97 && ch <= 122;
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

function isAllowedFilter(ch: number): boolean {
  return (
    isDigit(ch) || isAlpha(ch) || isAlphaExtended(ch) || isCyrillic(ch) || ch === 37 /* '%' */
  );
}

function isAllowedHostname(ch: number): boolean {
  return isAllowedFilter(ch) || ch === 95 /* '_' */ || ch === 45 /* '-' */;
}

const TOKENS_BUFFER = new Uint32Array(200);

function fastTokenizerNoRegex(
  pattern: string,
  isAllowedCode: (ch: number) => boolean,
  skipFirstToken: boolean,
  skipLastToken: boolean,
): Uint32Array {
  let tokensBufferIndex = 0;
  let inside: boolean = false;
  let start = 0;
  let precedingCh = 0; // Used to check if a '*' is not just before a token

  for (let i: number = 0; i < pattern.length && tokensBufferIndex < TOKENS_BUFFER.length; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch)) {
      if (inside === false) {
        inside = true;
        start = i;

        // Keep track of character preceding token
        if (i > 0) {
          precedingCh = pattern.charCodeAt(i - 1);
        }
      }
    } else if (inside === true) {
      inside = false;
      // Should not be followed by '*'
      if (
        (skipFirstToken === false || start !== 0) &&
        i - start > 1 &&
        ch !== 42 &&
        precedingCh !== 42
      ) {
        TOKENS_BUFFER[tokensBufferIndex] = fastHashBetween(pattern, start, i);
        tokensBufferIndex += 1;
      }
    }
  }

  if (
    inside === true &&
    pattern.length - start > 1 &&
    precedingCh !== 42 &&
    skipLastToken === false
  ) {
    TOKENS_BUFFER[tokensBufferIndex] = fastHashBetween(pattern, start, pattern.length);
    tokensBufferIndex += 1;
  }

  return TOKENS_BUFFER.slice(0, tokensBufferIndex);
}

function fastTokenizer(pattern: string, isAllowedCode: (ch: number) => boolean): Uint32Array {
  let tokensBufferIndex = 0;
  let inside: boolean = false;
  let start = 0;

  for (let i: number = 0; i < pattern.length && tokensBufferIndex < TOKENS_BUFFER.length; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch)) {
      if (inside === false) {
        inside = true;
        start = i;
      }
    } else if (inside === true) {
      inside = false;
      TOKENS_BUFFER[tokensBufferIndex] = fastHashBetween(pattern, start, i);
      tokensBufferIndex += 1;
    }
  }

  if (inside === true) {
    TOKENS_BUFFER[tokensBufferIndex] = fastHashBetween(pattern, start, pattern.length);
    tokensBufferIndex += 1;
  }

  return TOKENS_BUFFER.slice(0, tokensBufferIndex);
}

export function tokenize(pattern: string): Uint32Array {
  return fastTokenizerNoRegex(pattern, isAllowedFilter, false, false);
}

export function tokenizeFilter(
  pattern: string,
  skipFirstToken: boolean,
  skipLastToken: boolean,
): Uint32Array {
  return fastTokenizerNoRegex(pattern, isAllowedFilter, skipFirstToken, skipLastToken);
}

export function tokenizeHostnames(pattern: string): Uint32Array {
  return fastTokenizer(pattern, isAllowedHostname);
}

export function createFuzzySignature(pattern: string): Uint32Array {
  return compactTokens(new Uint32Array(fastTokenizer(pattern, isAllowedFilter)));
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

export function updateResponseHeadersWithCSP(
  details: chrome.webRequest.WebResponseHeadersDetails,
  policies: string | undefined,
): chrome.webRequest.BlockingResponse {
  if (policies === undefined) {
    return {};
  }

  let responseHeaders = details.responseHeaders || [];
  const CSP_HEADER_NAME = 'content-security-policy';

  // Collect existing CSP headers from response
  responseHeaders.forEach(({ name, value }) => {
    if (name.toLowerCase() === CSP_HEADER_NAME) {
      policies += `; ${value}`;
    }
  });

  // Remove all CSP headers from response
  responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== CSP_HEADER_NAME);

  // Add updated CSP header
  responseHeaders.push({ name: CSP_HEADER_NAME, value: policies });

  return { responseHeaders };
}

const hasUnicodeRe = /[^\x00-\x7F]/;
export function hasUnicode(str: string): boolean {
  return hasUnicodeRe.test(str);
}
