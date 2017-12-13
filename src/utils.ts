import { fast1a32 } from 'fnv-plus';

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

export function fastHash(str) {
  return fast1a32(str);
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

function fastTokenizer(pattern, isAllowedCode, allowRegexSurround = false, hash = false) {
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
        tokens.push(pattern.substr(start, length));
      }
    }
  }

  if (inside) {
    tokens.push(pattern.substr(start, length));
  }

  if (hash) {
    return tokens.map(fastHash);
  }

  return tokens;
}

export function tokenize(pattern: string, hash = true): number[] {
  return fastTokenizer(pattern, isAllowed, false, hash);
}

export function tokenizeCSS(pattern: string, hash = true): number[] {
  return fastTokenizer(pattern, isAllowedCSS, true, hash);
}
