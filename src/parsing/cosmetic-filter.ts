import * as punycode from 'punycode';
import { fastStartsWithFrom, getBit, hasUnicode, setBit, tokenizeHostnames } from '../utils';
import IFilter from './interface';

/**
 * Validate CSS selector. There is a fast path for simple selectors (e.g.: #foo
 * or .bar) which are the most common case. For complex ones, we rely on
 * `Element.matches` (if available).
 */
const isValidCss = (() => {
  const div =
    typeof document !== 'undefined'
      ? document.createElement('div')
      : {
          matches: () => {
            /* noop */
          },
        };
  const matches = (selector: string): void | boolean => div.matches(selector);
  const validSelectorRe = /^[#.]?[\w-.]+$/;

  return function isValidCssImpl(selector: string): boolean {
    if (validSelectorRe.test(selector)) {
      return true;
    }

    try {
      matches(selector);
    } catch (ex) {
      return false;
    }

    return true;
  };
})();

/**
 * Masks used to store options of cosmetic filters in a bitmask.
 */
const enum COSMETICS_MASK {
  unhide = 1 << 0,
  scriptInject = 1 << 1,
  scriptBlock = 1 << 2,
}

function computeFilterId(
  mask: number,
  selector: string | undefined,
  hostnames: string | undefined,
): number {
  let hash = (5408 * 33) ^ mask;

  if (selector !== undefined) {
    for (let j = 0; j < selector.length; j += 1) {
      hash = (hash * 33) ^ selector.charCodeAt(j);
    }
  }

  if (hostnames !== undefined) {
    for (let j = 0; j < hostnames.length; j += 1) {
      hash = (hash * 33) ^ hostnames.charCodeAt(j);
    }
  }

  return hash >>> 0;
}

/***************************************************************************
 *  Cosmetic filters parsing
 * ************************************************************************ */

/**
 * TODO: Make sure these are implemented properly and write tests.
 * - -abp-contains
 * - -abp-has
 * - contains
 * - has
 * - has-text
 * - if
 * - if-not
 * - matches-css
 * - matches-css-after
 * - matches-css-before
 * - xpath
 */
export class CosmeticFilter implements IFilter {
  public readonly mask: number;
  public readonly selector: string;
  public readonly hostnames?: string;
  public readonly style?: string;

  public id?: number;
  public rawLine?: string;
  private hostnamesArray?: string[];

  constructor({
    hostnames,
    id,
    mask,
    selector,
    style,
  }: Partial<CosmeticFilter> & { mask: number; selector: string }) {
    this.id = id;
    this.mask = mask;
    this.selector = selector;
    this.hostnames = hostnames;
    this.style = style;
  }

  public isCosmeticFilter(): boolean {
    return true;
  }
  public isNetworkFilter(): boolean {
    return false;
  }

  /**
   * Create a more human-readable version of this filter. It is mainly used for
   * debugging purpose, as it will expand the values stored in the bit mask.
   */
  public toString(): string {
    let filter = '';

    if (this.hasHostnames()) {
      filter += this.hostnames;
    }

    if (this.isUnhide()) {
      filter += '#@#';
    } else {
      filter += '##';
    }

    if (this.isScriptInject()) {
      filter += 'script:inject(';
      filter += this.selector;
      filter += ')';
    } else if (this.isScriptBlock()) {
      filter += 'script:contains(';
      filter += this.selector;
      filter += ')';
    } else {
      filter += this.selector;
    }

    return filter;
  }

  public getTokens(): Uint32Array[] {
    if (this.hostnames !== undefined) {
      return this.hostnames.split(',').map(tokenizeHostnames);
    }
    return [];
  }

  public getScript(js: Map<string, string>): string | undefined {
    let scriptName = this.getSelector();
    let scriptArguments: string[] = [];
    if (scriptName.indexOf(',') !== -1) {
      const parts = scriptName.split(',');
      scriptName = parts[0];
      scriptArguments = parts.slice(1).map((s) => s.trim());
    }

    let script = js.get(scriptName);
    if (script !== undefined) {
      for (let i = 0; i < scriptArguments.length; i += 1) {
        script = script.replace(`{{${i + 1}}}`, scriptArguments[i]);
      }

      return script;
    } // TODO - else throw an exception?

    return undefined;
  }

  public getId(): number {
    if (this.id === undefined) {
      this.id = computeFilterId(this.mask, this.selector, this.hostnames);
    }
    return this.id;
  }

  public getStyle(): string {
    return this.style || 'display: none !important;';
  }

  public getSelector(): string {
    return this.selector || '';
  }

  public hasHostnames(): boolean {
    return this.hostnames !== undefined;
  }

  public getHostnames(): string[] {
    if (this.hostnamesArray === undefined) {
      // Sort them from longer hostname to shorter.
      // This is to make sure that we will always start by the most specific
      // when matching.
      this.hostnamesArray =
        this.hostnames === undefined
          ? []
          : this.hostnames.split(',').sort((h1, h2) => {
              if (h1.length > h2.length) {
                return -1;
              } else if (h1.length < h2.length) {
                return 1;
              }

              return 0;
            });
    }

    return this.hostnamesArray;
  }

  public isUnhide(): boolean {
    return getBit(this.mask, COSMETICS_MASK.unhide);
  }

  public isScriptInject(): boolean {
    return getBit(this.mask, COSMETICS_MASK.scriptInject);
  }

  public isScriptBlock(): boolean {
    return getBit(this.mask, COSMETICS_MASK.scriptBlock);
  }
}

/**
 * Given a line that we know contains a cosmetic filter, create a CosmeticFiler
 * instance out of it. This function should be *very* efficient, as it will be
 * used to parse tens of thousands of lines.
 */
export function parseCosmeticFilter(line: string): CosmeticFilter | null {
  // Mask to store attributes
  // Each flag (unhide, scriptInject, etc.) takes only 1 bit
  // at a specific offset defined in COSMETICS_MASK.
  // cf: COSMETICS_MASK for the offset of each property
  let mask = 0;
  let selector: string | undefined;
  let hostnames: string | undefined;
  let style: string | undefined;
  const sharpIndex = line.indexOf('#');

  // Start parsing the line
  const afterSharpIndex = sharpIndex + 1;
  let suffixStartIndex = afterSharpIndex + 1;

  // hostname1,hostname2#@#.selector
  //                    ^^ ^
  //                    || |
  //                    || suffixStartIndex
  //                    |afterSharpIndex
  //                    sharpIndex

  // Check if unhide
  if (line.length > afterSharpIndex && line[afterSharpIndex] === '@') {
    mask = setBit(mask, COSMETICS_MASK.unhide);
    suffixStartIndex += 1;
  }

  // Parse hostnames
  if (sharpIndex > 0) {
    hostnames = line.slice(0, sharpIndex);
    if (hasUnicode(hostnames)) {
      hostnames = punycode.encode(hostnames);
    }
  }

  // We should not have unhide without any hostname
  if (getBit(mask, COSMETICS_MASK.unhide) && hostnames === undefined) {
    return null;
  }

  // Deal with script:inject and script:contains
  if (fastStartsWithFrom(line, 'script:', suffixStartIndex)) {
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
    const scriptMethodIndex = suffixStartIndex + 7;
    let scriptSelectorIndexStart = scriptMethodIndex;
    let scriptSelectorIndexEnd = line.length - 1;

    if (fastStartsWithFrom(line, 'inject(', scriptMethodIndex)) {
      mask = setBit(mask, COSMETICS_MASK.scriptInject);
      scriptSelectorIndexStart += 7;
    } else if (fastStartsWithFrom(line, 'contains(', scriptMethodIndex)) {
      mask = setBit(mask, COSMETICS_MASK.scriptBlock);
      scriptSelectorIndexStart += 9;

      // If it's a regex
      if (line[scriptSelectorIndexStart] === '/' && line[scriptSelectorIndexEnd - 1] === '/') {
        scriptSelectorIndexStart += 1;
        scriptSelectorIndexEnd -= 1;
      }
    }

    selector = line.slice(scriptSelectorIndexStart, scriptSelectorIndexEnd);
  } else if (fastStartsWithFrom(line, '+js(', suffixStartIndex)) {
    mask = setBit(mask, COSMETICS_MASK.scriptInject);
    selector = line.slice(suffixStartIndex + 4, line.length - 1);
  } else {
    // Detect special syntax
    let indexOfColon = line.indexOf(':', suffixStartIndex);
    while (indexOfColon !== -1) {
      const indexAfterColon = indexOfColon + 1;
      if (fastStartsWithFrom(line, 'style', indexAfterColon)) {
        // ##selector :style(...)
        if (line[indexAfterColon + 5] === '(' && line[line.length - 1] === ')') {
          selector = line.slice(suffixStartIndex, indexOfColon);
          style = line.slice(indexAfterColon + 6, -1);
        } else {
          console.error('?????', line, indexAfterColon);
          return null;
        }
      } else if (
        fastStartsWithFrom(line, '-abp-', indexAfterColon) ||
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
        fastStartsWithFrom(line, 'xpath', indexAfterColon)
      ) {
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

  return new CosmeticFilter({
    hostnames,
    mask,
    selector,
    style,
  });
}
