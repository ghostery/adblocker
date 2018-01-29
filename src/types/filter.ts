import IFilter from '../parsing/interface';
import {
  clearBit,
  createFuzzySignature,
  getBit,
  setBit,
  tokenize,
} from '../utils';

/**
 * Masks used to store options of network filters in a bitmask.
 */
export const enum MASK {
  // Content Policy Type
  fromImage = 1 << 0,
  fromMedia = 1 << 1,
  fromObject = 1 << 2,
  fromObjectSubrequest = 1 << 3,
  fromOther = 1 << 4,
  fromPing = 1 << 5,
  fromScript = 1 << 6,
  fromStylesheet = 1 << 7,
  fromSubdocument = 1 << 8,
  fromWebsocket = 1 << 9,
  fromXmlHttpRequest = 1 << 10,
  fromFetch = 1 << 11,
  fromDTD = 1 << 12,
  fromFont = 1 << 13,
  fromXLST = 1 << 14,
  fromBeacon = 1 << 15,
  fromCSP = 1 << 16,
  isImportant = 1 << 17,
  matchCase = 1 << 18,
  fuzzyMatch = 1 << 19,

  // Kind of patterns
  thirdParty = 1 << 20,
  firstParty = 1 << 21,
  isHostname = 1 << 22,
  isPlain = 1 << 23,
  isRegex = 1 << 24,
  isLeftAnchor = 1 << 25,
  isRightAnchor = 1 << 26,
  isHostnameAnchor = 1 << 27,
  isException = 1 << 28,
}

/**
 * Mask used when a network filter can be applied on any content type.
 */
export const FROM_ANY: number =
  MASK.fromImage |
  MASK.fromMedia |
  MASK.fromObject |
  MASK.fromObjectSubrequest |
  MASK.fromOther |
  MASK.fromPing |
  MASK.fromScript |
  MASK.fromStylesheet |
  MASK.fromSubdocument |
  MASK.fromWebsocket |
  MASK.fromXmlHttpRequest |
  MASK.fromFetch |
  MASK.fromDTD |
  MASK.fromFont |
  MASK.fromXLST |
  MASK.fromBeacon |
  MASK.fromCSP;

/**
 * Map content type value to mask the corresponding mask.
 * ref: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
 */
const CPT_TO_MASK = {
  1: MASK.fromOther,
  2: MASK.fromScript,
  3: MASK.fromImage,
  4: MASK.fromStylesheet,
  5: MASK.fromObject,
  7: MASK.fromSubdocument,
  10: MASK.fromPing,
  11: MASK.fromXmlHttpRequest,
  12: MASK.fromObjectSubrequest,
  13: MASK.fromDTD,
  14: MASK.fromFont,
  15: MASK.fromMedia,
  16: MASK.fromWebsocket,
  17: MASK.fromCSP,
  18: MASK.fromXLST,
  19: MASK.fromBeacon,
  20: MASK.fromFetch,
  21: MASK.fromImage, // TYPE_IMAGESET
};

/**
 * Compiles a filter pattern to a regex. This is only performed *lazily* for
 * filters containing at least a * or ^ symbol. Because Regexes are expansive,
 * we try to convert some patterns to plain filters.
 */
function compileRegex(
  filterStr: string,
  isRightAnchor: boolean,
  isLeftAnchor: boolean,
  matchCase: boolean,
): RegExp {
  let filter = filterStr;

  // Escape special regex characters: |.$+?{}()[]\
  filter = filter.replace(/([|.$+?{}()[\]\\])/g, '\\$1');

  // * can match anything
  filter = filter.replace(/\*/g, '.*');
  // ^ can match any separator or the end of the pattern
  filter = filter.replace(/\^/g, '(?:[^\\w\\d_.%-]|$)');

  // Should match end of url
  if (isRightAnchor) {
    filter = `${filter}$`;
  }

  if (isLeftAnchor) {
    filter = `^${filter}`;
  }

  // we will throw an exception if it fails. We need to remove the console
  // dependency here since we need to use it in the workers
  if (matchCase) {
    return new RegExp(filter);
  }
  return new RegExp(filter, 'i');
}

function parseDomainsOption(domains: string): Set<string> {
  return new Set(domains ? domains.split('|') : []);
}

// TODO:
// 1. Options not supported yet:
//  - popup
//  - popunder
//  - generichide
//  - genericblock
export default class NetworkFilter implements IFilter {
  public id: number;
  public mask: number;
  public filter: string;
  public optDomains: string;
  public optNotDomains: string;
  public redirect: string;
  public hostname: string;

  // Set only in debug mode
  public rawLine: string | null;

  private fuzzySignature: Uint32Array | null;
  private optDomainsSet: Set<string> | null;
  private optNotDomainsSet: Set<string> | null;
  private regex: RegExp | null;

  constructor({
    mask,
    filter,
    optDomains,
    optNotDomains,
    redirect,
    hostname,
    id,
  }: {
    mask: number,
    filter: string,
    optDomains: string,
    optNotDomains: string,
    redirect: string,
    hostname: string,
    id: number,
  }) {
    // Those fields should not be mutated.
    this.id = id;
    this.mask = mask;
    this.filter = filter;
    this.optDomains = optDomains;
    this.optNotDomains = optNotDomains;
    this.redirect = redirect;
    this.hostname = hostname;

    // Lazy private attributes
    this.fuzzySignature = null;
    this.optDomainsSet = null;
    this.optNotDomainsSet = null;
    this.regex = null;

    // Set only in debug mode
    this.rawLine = null;
  }

  public isCosmeticFilter() {
    return false;
  }
  public isNetworkFilter() {
    return true;
  }

  /**
   * Tries to recreate the original representation of the filter (adblock
   * syntax) from the internal representation.
   */
  public toString() {
    let filter = '';

    if (this.isException()) {
      filter += '@@';
    }
    if (this.isHostnameAnchor()) {
      filter += '||';
    }
    if (this.isLeftAnchor()) {
      filter += '|';
    }

    if (this.hasHostname()) {
      filter += this.getHostname();
      filter += '^';
    }

    if (!this.isRegex()) {
      filter += this.getFilter();
    } else {
      // Visualize the compiled regex
      filter += this.getRegex().source;
    }

    // Options
    const options: string[] = [];

    if (!this.fromAny()) {
      if (this.isFuzzy()) {
        options.push('fuzzy');
      }
      if (this.fromImage()) {
        options.push('image');
      }
      if (this.fromMedia()) {
        options.push('media');
      }
      if (this.fromObject()) {
        options.push('object');
      }
      if (this.fromObjectSubrequest()) {
        options.push('object-subrequest');
      }
      if (this.fromOther()) {
        options.push('other');
      }
      if (this.fromPing()) {
        options.push('ping');
      }
      if (this.fromScript()) {
        options.push('script');
      }
      if (this.fromStylesheet()) {
        options.push('stylesheet');
      }
      if (this.fromSubdocument()) {
        options.push('subdocument');
      }
      if (this.fromWebsocket()) {
        options.push('websocket');
      }
      if (this.fromXmlHttpRequest()) {
        options.push('xmlhttprequest');
      }
      if (this.fromFont()) {
        options.push('font');
      }
    }

    if (this.isImportant()) {
      options.push('important');
    }
    if (this.isRedirect()) {
      options.push(`redirect=${this.getRedirect()}`);
    }
    if (this.firstParty() !== this.thirdParty()) {
      if (this.firstParty()) {
        options.push('first-party');
      }
      if (this.thirdParty()) {
        options.push('third-party');
      }
    }

    if (this.hasOptDomains() || this.hasOptNotDomains()) {
      const domains = [...this.getOptDomains()];
      this.getOptNotDomains().forEach(nd => domains.push(`~${nd}`));
      options.push(`domain=${domains.join('|')}`);
    }

    if (options.length > 0) {
      filter += `$${options.join(',')}`;
    }

    if (this.isRightAnchor()) {
      filter += '|';
    }

    return filter;
  }

  // Public API (Read-Only)

  public hasFilter() {
    return !!this.filter;
  }

  public hasOptNotDomains() {
    return !!this.optNotDomains;
  }

  public getOptNotDomains() {
    this.optNotDomainsSet =
      this.optNotDomainsSet || parseDomainsOption(this.optNotDomains);
    return this.optNotDomainsSet;
  }

  public hasOptDomains() {
    return !!this.optDomains;
  }

  public getOptDomains() {
    this.optDomainsSet =
      this.optDomainsSet || parseDomainsOption(this.optDomains);
    return this.optDomainsSet;
  }

  public getMask() {
    return this.mask;
  }

  public isRedirect() {
    return !!this.redirect;
  }

  public getRedirect() {
    return this.redirect;
  }

  public hasHostname() {
    return !!this.hostname;
  }

  public getHostname() {
    return this.hostname;
  }

  public getFilter() {
    return this.filter;
  }

  /**
   * Special method, should only be used by the filter optimizer
   */
  public setRegex(re: RegExp) {
    this.regex = re;
    this.mask = setBit(this.mask, MASK.isRegex);
    this.mask = clearBit(this.mask, MASK.isPlain);
  }

  public getRegex() {
    if (this.regex === null) {
      this.regex = compileRegex(
        this.filter,
        this.isRightAnchor(),
        this.isLeftAnchor(),
        this.matchCase(),
      );
    }

    return this.regex;
  }

  public getFuzzySignature(): Uint32Array {
    if (this.fuzzySignature === null) {
      this.fuzzySignature = createFuzzySignature(this.filter);
    }

    return this.fuzzySignature;
  }

  public getTokens(): number[][] {
    return [tokenize(this.filter).concat(tokenize(this.hostname))];
  }

  /**
   * Check if this filter should apply to a request with this content type.
   */
  public isCptAllowed(cpt: number) {
    const mask = CPT_TO_MASK[cpt];
    if (mask !== undefined) {
      return getBit(this.mask, mask);
    }

    return true;
  }

  public isFuzzy() {
    return getBit(this.mask, MASK.fuzzyMatch);
  }

  public isException() {
    return getBit(this.mask, MASK.isException);
  }

  public isHostnameAnchor() {
    return getBit(this.mask, MASK.isHostnameAnchor);
  }

  public isRightAnchor() {
    return getBit(this.mask, MASK.isRightAnchor);
  }

  public isLeftAnchor() {
    return getBit(this.mask, MASK.isLeftAnchor);
  }

  public matchCase() {
    return getBit(this.mask, MASK.matchCase);
  }

  public isImportant() {
    return getBit(this.mask, MASK.isImportant);
  }

  public isRegex() {
    return getBit(this.mask, MASK.isRegex);
  }

  public isPlain() {
    return !getBit(this.mask, MASK.isRegex);
  }

  public isHostname() {
    return getBit(this.mask, MASK.isHostname);
  }

  public fromAny() {
    return (this.mask & FROM_ANY) === FROM_ANY;
  }

  public thirdParty() {
    return getBit(this.mask, MASK.thirdParty);
  }

  public firstParty() {
    return getBit(this.mask, MASK.firstParty);
  }

  public fromImage() {
    return getBit(this.mask, MASK.fromImage);
  }

  public fromMedia() {
    return getBit(this.mask, MASK.fromMedia);
  }

  public fromObject() {
    return getBit(this.mask, MASK.fromObject);
  }

  public fromObjectSubrequest() {
    return getBit(this.mask, MASK.fromObjectSubrequest);
  }

  public fromOther() {
    return getBit(this.mask, MASK.fromOther);
  }

  public fromPing() {
    return getBit(this.mask, MASK.fromPing);
  }

  public fromScript() {
    return getBit(this.mask, MASK.fromScript);
  }

  public fromStylesheet() {
    return getBit(this.mask, MASK.fromStylesheet);
  }

  public fromSubdocument() {
    return getBit(this.mask, MASK.fromSubdocument);
  }

  public fromWebsocket() {
    return getBit(this.mask, MASK.fromWebsocket);
  }

  public fromXmlHttpRequest() {
    return getBit(this.mask, MASK.fromXmlHttpRequest);
  }

  public fromFont() {
    return getBit(this.mask, MASK.fromFont);
  }
}
