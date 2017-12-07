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

export function packInt32(int) {
  return String.fromCharCode(int & 65535) + String.fromCharCode(int >>> 16);
}

export function unpackInt32(str) {
  return str.charCodeAt(0) | (str.charCodeAt(1) << 16);
}

/**
 * Fast string hashing (*not cryptographic* and *not secure*), used to get ids
 * of filters. This should return only positive numbers.
 *
 * From: https://stackoverflow.com/a/41753979
 */
export function fastHash(str: string): number {
  if (!str) {
    return 0;
  }

  let hash: number = 5381;
  for (let i = 0, len = str.length; i < len; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  // For higher values, we cannot pack/unpack
  return hash >>> 0;
}

export function fastHashCombine(...args: number[]): number {
  let hash: number = 5381;
  for (let i = 0; i < args.length; i += 1) {
    hash = (hash * 33) ^ args[i];
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

function isAllowed(ch: number): boolean {
  return isDigit(ch) || isAlpha(ch);
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

function fastTokenizer(pattern, isAllowedCode, allowRegexSurround = false) {
  const tokens: number[] = [];
  let hash: number = 5381;
  let inside: boolean = false;

  for (let i: number = 0, len = pattern.length; i < len; i += 1) {
    const ch = pattern.charCodeAt(i);
    if (isAllowedCode(ch)) {
      hash = (hash * 33) ^ ch;
      inside = true;
    } else if (inside) {
      inside = false;
      // Should not be followed by '*'
      if (allowRegexSurround || ch !== 42) {
        tokens.push(hash >>> 0);
      }
      hash = 5381;
    }
  }

  if (inside) {
    tokens.push(hash >>> 0);
  }

  return tokens;
}

export function tokenize(pattern: string): number[] {
  return fastTokenizer(pattern, isAllowed);
}

export function tokenizeCSS(pattern: string): number[] {
  return fastTokenizer(pattern, isAllowedCSS, true);
}
