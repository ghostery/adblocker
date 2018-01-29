import IFilter from '../parsing/interface';
import { getBit, tokenizeCSS } from '../utils';

/**
 * Masks used to store options of cosmetic filters in a bitmask.
 */
export const enum MASK {
  unhide = 1 << 0,
  scriptInject = 1 << 1,
  scriptBlock = 1 << 2,
}

/***************************************************************************
 *  Cosmetic filters parsing
 * ************************************************************************ */

export default class CosmeticFilter implements IFilter {
  public id: number;
  public mask: number;
  public selector: string;
  public hostnames: string;

  // For debug only
  public rawLine: string | null;

  private hostnamesArray: string[] | null;

  constructor({
    mask,
    selector,
    hostnames,
    id,
  }: {
    mask: number,
    selector: string,
    hostnames: string,
    id: number,
  }) {
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

  public getTokens(): number[][] {
    return [this.getTokensSelector()];
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
    return getBit(this.mask, MASK.unhide);
  }

  public isScriptInject(): boolean {
    return getBit(this.mask, MASK.scriptInject);
  }

  public isScriptBlock(): boolean {
    return getBit(this.mask, MASK.scriptBlock);
  }
}
