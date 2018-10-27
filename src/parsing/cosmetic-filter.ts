import { computeFilterId, fastStartsWithFrom, getBit, setBit, tokenizeCSS } from '../utils';
import IFilter from './interface';

/**
 * Masks used to store options of cosmetic filters in a bitmask.
 */
const enum COSMETICS_MASK {
  unhide = 1 << 0,
  scriptInject = 1 << 1,
  scriptBlock = 1 << 2,
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
  public mask: number;
  public selector?: string;
  public hostnames?: string;

  // For debug only
  public rawLine?: string;

  private id?: number;
  private hostnamesArray?: string[];

  constructor({
    mask,
    selector,
    hostnames,
  }: {
    mask: number;
    selector?: string;
    hostnames?: string;
  }) {
    this.mask = mask;
    this.selector = selector;
    this.hostnames = hostnames;
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

  public getId(): number {
    if (this.id === undefined) {
      this.id = computeFilterId(this.mask, this.selector, this.hostnames);
    }
    return this.id;
  }

  public getTokens(): number[][] {
    return [this.getTokensSelector()];
  }

  public getTokensSelector(): number[] {
    // These filters are only matched based on their domains, not selectors
    if (this.isScriptInject() || this.isScriptBlock()) {
      return [];
    }

    const selector = this.selector || '';

    // Only keep the part after the last combinator: '>', '+', '~'
    let sepIndex = 0;
    for (let i = selector.length - 1; i >= 0; i -= 1) {
      const code = selector.charCodeAt(i);
      if (
        code === 43 || // '+'
        code === 62 || // '>'
        code === 126 // '~'
      ) {
        sepIndex = i;
        break;
      }
    }

    // We do not want to take styles contained in brackets () into account while
    // extracting the tokens, so we loop over the selector and ignore these
    // parts.
    let inside = 0; // number of brackets openings seen, allows to handle multiple levels of depth
    let start = sepIndex;
    const tokens: number[] = [];

    for (let i = sepIndex, len = selector.length; i < len; i += 1) {
      const code = selector.charCodeAt(i);
      if (code === 91) {
        // '['
        if (inside === 0 && start < i) {
          tokens.push(...tokenizeCSS(selector.slice(start, i)));
        }
        inside += 1;
      } else if (code === 93) {
        // ']'
        inside -= 1;
        start = i + 1;
      }
    }

    if (inside === 0 && start < selector.length) {
      tokens.push(...tokenizeCSS(selector.slice(start, selector.length)));
    }

    return tokens;
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
  } else if (suffixStartIndex < line.length) {
    selector = line.slice(suffixStartIndex);
  }

  // Exceptions
  if (
    selector === undefined ||
    selector.length === 0 ||
    selector.endsWith('}') ||
    selector.indexOf('##') !== -1 ||
    (getBit(mask, COSMETICS_MASK.unhide) && hostnames === undefined)
  ) {
    return null;
  }

  return new CosmeticFilter({
    hostnames,
    mask,
    selector,
  });
}
