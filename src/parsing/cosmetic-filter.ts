import {
  fastHash,
  fastStartsWith,
  fastStartsWithFrom,
  getBit,
  setBit,
  tokenizeCSS,
} from '../utils';

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

export class CosmeticFilter {
  public id: number;
  public mask: number;
  public selector: string;
  public hostnames: string;

  // For debug only
  public rawLine: string | null;

  private hostnamesArray: string[] | null;

  constructor({ mask, selector, hostnames, id }) {
    this.id = id;
    this.mask = mask;
    this.selector = selector;
    this.hostnames = hostnames;

    // Lazily set when needed
    this.hostnamesArray = null;

    // Only in debug mode
    this.rawLine = null;
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

  public getTokensSelector(): number[] {
    if (this.isScriptInject() || this.isScriptBlock()) {
      return [];
    }

    // Only keep the part after the last '>'
    const sepIndex = this.selector.lastIndexOf('>');
    if (sepIndex !== -1) {
      return tokenizeCSS(this.selector.substr(sepIndex));
    }

    return tokenizeCSS(this.selector);
  }

  public getSelector(): string {
    return this.selector;
  }

  public hasHostnames(): boolean {
    return !!this.hostnames;
  }

  public getHostnames(): string[] {
    if (this.hostnamesArray === null) {
      if (this.hasHostnames()) {
        // Sort them from longer hostname to shorter.
        // This is to make sure that we will always start by the most specific
        // when matching.
        this.hostnamesArray = this.hostnames.split(',').sort((h1, h2) => {
          if (h1.length > h2.length) {
            return -1;
          } else if (h1.length < h2.length) {
            return 1;
          }

          return 0;
        });
      } else {
        this.hostnamesArray = [];
      }
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
  let selector: string = '';
  let hostnames: string = ''; // Coma-separated list of hostnames
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
  if (line[afterSharpIndex] === '@') {
    mask = setBit(mask, COSMETICS_MASK.unhide);
    suffixStartIndex += 1;
  }

  // Parse hostnames
  if (sharpIndex > 0) {
    hostnames = line.substring(0, sharpIndex);
  }

  // Parse selector
  // TODO - avoid the double call to substring
  selector = line.substr(suffixStartIndex);

  // Deal with script:inject and script:contains
  if (fastStartsWith(selector, 'script:')) {
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
    const scriptMethodIndex = 'script:'.length;
    let scriptSelectorIndexStart = scriptMethodIndex;
    let scriptSelectorIndexEnd = selector.length - 1;

    if (fastStartsWithFrom(selector, 'inject(', scriptMethodIndex)) {
      mask = setBit(mask, COSMETICS_MASK.scriptInject);
      scriptSelectorIndexStart += 'inject('.length;
    } else if (fastStartsWithFrom(selector, 'contains(', scriptMethodIndex)) {
      mask = setBit(mask, COSMETICS_MASK.scriptBlock);
      scriptSelectorIndexStart += 'contains('.length;

      // If it's a regex
      if (
        selector[scriptSelectorIndexStart] === '/' &&
        selector[scriptSelectorIndexEnd - 1] === '/'
      ) {
        scriptSelectorIndexStart += 1;
        scriptSelectorIndexEnd -= 1;
      }
    }

    selector = selector.substring(
      scriptSelectorIndexStart,
      scriptSelectorIndexEnd,
    );
  }

  // Exceptions
  if (
    selector === null ||
    selector.length === 0 ||
    selector.endsWith('}') ||
    selector.indexOf('##') !== -1 ||
    (getBit(mask, COSMETICS_MASK.unhide) && hostnames.length === 0)
  ) {
    return null;
  }

  const id = fastHash(line);

  return new CosmeticFilter({
    hostnames,
    id,
    mask,
    selector,
  });
}
