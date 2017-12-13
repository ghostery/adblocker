import {
  clearBit,
  fastHash,
  fastStartsWith,
  fastStartsWithFrom,
  getBit,
  setBit,
  tokenize,
} from '../utils';

/**
 * Masks used to store options of network filters in a bitmask.
 */
const enum NETWORK_FILTER_MASK {
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

  // Kind of patterns
  thirdParty = 1 << 19,
  firstParty = 1 << 20,
  isHostname = 1 << 21,
  isPlain = 1 << 22,
  isRegex = 1 << 23,
  isLeftAnchor = 1 << 24,
  isRightAnchor = 1 << 25,
  isHostnameAnchor = 1 << 26,
  isException = 1 << 27,
}

/**
 * Mask used when a network filter can be applied on any content type.
 */
const FROM_ANY: number =
  NETWORK_FILTER_MASK.fromImage |
  NETWORK_FILTER_MASK.fromMedia |
  NETWORK_FILTER_MASK.fromObject |
  NETWORK_FILTER_MASK.fromObjectSubrequest |
  NETWORK_FILTER_MASK.fromOther |
  NETWORK_FILTER_MASK.fromPing |
  NETWORK_FILTER_MASK.fromScript |
  NETWORK_FILTER_MASK.fromStylesheet |
  NETWORK_FILTER_MASK.fromSubdocument |
  NETWORK_FILTER_MASK.fromWebsocket |
  NETWORK_FILTER_MASK.fromXmlHttpRequest |
  NETWORK_FILTER_MASK.fromFetch |
  NETWORK_FILTER_MASK.fromDTD |
  NETWORK_FILTER_MASK.fromFont |
  NETWORK_FILTER_MASK.fromXLST |
  NETWORK_FILTER_MASK.fromBeacon |
  NETWORK_FILTER_MASK.fromCSP;

/**
 * Map content type value to mask the corresponding mask.
 * ref: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
 */
const CPT_TO_MASK = {
  1: NETWORK_FILTER_MASK.fromOther,
  2: NETWORK_FILTER_MASK.fromScript,
  3: NETWORK_FILTER_MASK.fromImage,
  4: NETWORK_FILTER_MASK.fromStylesheet,
  5: NETWORK_FILTER_MASK.fromObject,
  7: NETWORK_FILTER_MASK.fromSubdocument,
  10: NETWORK_FILTER_MASK.fromPing,
  11: NETWORK_FILTER_MASK.fromXmlHttpRequest,
  12: NETWORK_FILTER_MASK.fromObjectSubrequest,
  13: NETWORK_FILTER_MASK.fromDTD,
  14: NETWORK_FILTER_MASK.fromFont,
  15: NETWORK_FILTER_MASK.fromMedia,
  16: NETWORK_FILTER_MASK.fromWebsocket,
  17: NETWORK_FILTER_MASK.fromCSP,
  18: NETWORK_FILTER_MASK.fromXLST,
  19: NETWORK_FILTER_MASK.fromBeacon,
  20: NETWORK_FILTER_MASK.fromFetch,
  21: NETWORK_FILTER_MASK.fromImage, // TYPE_IMAGESET
};

const SEPARATOR = /[/^*]/;

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
export class NetworkFilter {
  public id: number;
  public mask: number;
  public filter: string;
  public optDomains: string;
  public optNotDomains: string;
  public redirect: string;
  public hostname: string;

  // Set only in debug mode
  public rawLine: string | null;

  private regex: RegExp | null;
  private optDomainsSet: Set<string> | null;
  private optNotDomainsSet: Set<string> | null;

  constructor({
    mask,
    filter,
    optDomains,
    optNotDomains,
    redirect,
    hostname,
    id,
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
    this.regex = null;
    this.optDomainsSet = null;
    this.optNotDomainsSet = null;

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

    if (!this.isRegex()) {
      if (this.hasHostname()) {
        filter += this.getHostname();
        filter += '^';
      }
      filter += this.getFilter();
    } else {
      // Visualize the compiled regex
      filter += this.getRegex().source;
    }

    // Options
    const options: string[] = [];

    if (!this.fromAny()) {
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
  public setRegex(re) {
    this.regex = re;
    this.mask = setBit(this.mask, NETWORK_FILTER_MASK.isRegex);
    this.mask = clearBit(this.mask, NETWORK_FILTER_MASK.isPlain);
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

  public getTokens() {
    return tokenize(this.filter).concat(tokenize(this.hostname));
  }

  /**
   * Check if this filter should apply to a request with this content type.
   */
  public isCptAllowed(cpt) {
    const mask = CPT_TO_MASK[cpt];
    if (mask !== undefined) {
      return getBit(this.mask, mask);
    }

    return false;
  }

  public isException() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isException);
  }

  public isHostnameAnchor() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isHostnameAnchor);
  }

  public isRightAnchor() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isRightAnchor);
  }

  public isLeftAnchor() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isLeftAnchor);
  }

  public matchCase() {
    return getBit(this.mask, NETWORK_FILTER_MASK.matchCase);
  }

  public isImportant() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isImportant);
  }

  public isRegex() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isRegex);
  }

  public isPlain() {
    return !getBit(this.mask, NETWORK_FILTER_MASK.isRegex);
  }

  public isHostname() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isHostname);
  }

  public fromAny() {
    return (this.mask & FROM_ANY) === FROM_ANY;
  }

  public thirdParty() {
    return getBit(this.mask, NETWORK_FILTER_MASK.thirdParty);
  }

  public firstParty() {
    return getBit(this.mask, NETWORK_FILTER_MASK.firstParty);
  }

  public fromImage() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromImage);
  }

  public fromMedia() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromMedia);
  }

  public fromObject() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromObject);
  }

  public fromObjectSubrequest() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromObjectSubrequest);
  }

  public fromOther() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromOther);
  }

  public fromPing() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromPing);
  }

  public fromScript() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromScript);
  }

  public fromStylesheet() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromStylesheet);
  }

  public fromSubdocument() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromSubdocument);
  }

  public fromWebsocket() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromWebsocket);
  }

  public fromXmlHttpRequest() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromXmlHttpRequest);
  }

  public fromFont() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromFont);
  }
}

// ---------------------------------------------------------------------------
// Filter parsing
// ---------------------------------------------------------------------------

function setNetworkMask(mask: number, m: number, value: boolean): number {
  if (value) {
    return setBit(mask, m);
  }

  return clearBit(mask, m);
}

/**
 * Check if the sub-string contained between the indices start and end is a
 * regex filter (it contains a '*' or '^' char). Here we are limited by the
 * capability of javascript to check the presence of a pattern between two
 * indices (same for Regex...).
 * // TODO - we could use sticky regex here
 */
function checkIsRegex(filter: string, start: number, end: number): boolean {
  const starIndex = filter.indexOf('*', start);
  const separatorIndex = filter.indexOf('^', start);
  return (
    (starIndex !== -1 && starIndex < end) ||
    (separatorIndex !== -1 && separatorIndex < end)
  );
}

/**
 * Parse a line containing a network filter into a NetworkFilter object.
 * This must be *very* efficient.
 */
export function parseNetworkFilter(rawLine: string): NetworkFilter | null {
  const line: string = rawLine;

  // Represent options as a bitmask
  let mask: number = NETWORK_FILTER_MASK.thirdParty | NETWORK_FILTER_MASK.firstParty;

  // Get rid of those and just return `null` when possible
  let filter: string | null = null;
  let hostname: string | null = null;

  let optDomains: string = '';
  let optNotDomains: string = '';
  let redirect: string = '';

  // Check if this filter had at least one option constraining the acceptable
  // content policy type. If this remains false, then the filter will have the
  // value of FROM_ANY and will be applied on any request.
  let hasCptOption: boolean = false;

  // Start parsing
  let filterIndexStart: number = 0;
  let filterIndexEnd: number = line.length;

  // @@filter == Exception
  if (fastStartsWith(line, '@@')) {
    filterIndexStart += 2;
    mask = setBit(mask, NETWORK_FILTER_MASK.isException);
  }

  // filter$options == Options
  // ^     ^
  // |     |
  // |     optionsIndex
  // filterIndexStart
  const optionsIndex: number = line.indexOf('$', filterIndexStart);
  if (optionsIndex !== -1) {
    // Parse options and set flags
    filterIndexEnd = optionsIndex;

    // --------------------------------------------------------------------- //
    // parseOptions
    // TODO: This could be implemented without string copy,
    // using indices, like in main parsing functions.
    const rawOptions = line.substr(optionsIndex + 1);
    const options = rawOptions.split(',');
    for (let i = 0; i < options.length; i += 1) {
      const rawOption = options[i];
      let negation = false;
      let option = rawOption;

      // Check for negation: ~option
      if (fastStartsWith(option, '~')) {
        negation = true;
        option = option.substr(1);
      } else {
        negation = false;
      }

      // Check for options: option=value1|value2
      let optionValues: string[] = [];
      if (option.indexOf('=') !== -1) {
        const optionAndValues = option.split('=', 2);
        option = optionAndValues[0];
        optionValues = optionAndValues[1].split('|');
      }

      switch (option) {
        case 'domain': {
          const optDomainsArray: string[] = [];
          const optNotDomainsArray: string[] = [];

          for (let j = 0; j < optionValues.length; j += 1) {
            const value: string = optionValues[j];
            if (value) {
              if (fastStartsWith(value, '~')) {
                optNotDomainsArray.push(value.substr(1));
              } else {
                optDomainsArray.push(value);
              }
            }
          }

          if (optDomainsArray.length > 0) {
            optDomains = optDomainsArray.join('|');
          }

          if (optNotDomainsArray.length > 0) {
            optNotDomains = optNotDomainsArray.join('|');
          }

          break;
        }
        case 'image':
          hasCptOption = true;
          mask = setNetworkMask(mask, NETWORK_FILTER_MASK.fromImage, !negation);
          break;
        case 'media':
          hasCptOption = true;
          mask = setNetworkMask(mask, NETWORK_FILTER_MASK.fromMedia, !negation);
          break;
        case 'object':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromObject,
            !negation,
          );
          break;
        case 'object-subrequest':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromObjectSubrequest,
            !negation,
          );
          break;
        case 'other':
          hasCptOption = true;
          mask = setNetworkMask(mask, NETWORK_FILTER_MASK.fromOther, !negation);
          break;
        case 'ping':
          hasCptOption = true;
          mask = setNetworkMask(mask, NETWORK_FILTER_MASK.fromPing, !negation);
          break;
        case 'script':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromScript,
            !negation,
          );
          break;
        case 'stylesheet':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromStylesheet,
            !negation,
          );
          break;
        case 'subdocument':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromSubdocument,
            !negation,
          );
          break;
        case 'xmlhttprequest':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromXmlHttpRequest,
            !negation,
          );
          break;
        case 'websocket':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.fromWebsocket,
            !negation,
          );
          break;
        case 'font':
          hasCptOption = true;
          mask = setNetworkMask(mask, NETWORK_FILTER_MASK.fromFont, !negation);
          break;
        case 'important':
          // Note: `negation` should always be `false` here.
          if (negation) {
            return null;
          }

          mask = setBit(mask, NETWORK_FILTER_MASK.isImportant);
          break;
        case 'match-case':
          // Note: `negation` should always be `false` here.
          if (negation) {
            return null;
          }

          mask = setBit(mask, NETWORK_FILTER_MASK.matchCase);
          break;
        case 'third-party':
          if (negation) {
            // ~third-party means we should clear the flag
            mask = clearBit(mask, NETWORK_FILTER_MASK.thirdParty);
          } else {
            // third-party means ~first-party
            mask = clearBit(mask, NETWORK_FILTER_MASK.firstParty);
          }
          break;
        case 'first-party':
          if (negation) {
            // ~first-party means we should clear the flag
            mask = clearBit(mask, NETWORK_FILTER_MASK.firstParty);
          } else {
            // first-party means ~third-party
            mask = clearBit(mask, NETWORK_FILTER_MASK.thirdParty);
          }
          break;
        case 'collapse':
          break;
        case 'redirect':
          // Negation of redirection doesn't make sense
          if (negation) {
            return null;
          }

          // Ignore this filter if no redirection resource is specified
          if (optionValues.length === 0) {
            return null;
          }

          redirect = optionValues[0];
          break;
        default:
          // Disable this filter if we don't support all the options
          return null;
      }
    }
    // End of option parsing
    // --------------------------------------------------------------------- //
  }

  // Apply mask to the internal state.
  if (hasCptOption === false) {
    mask = setBit(mask, FROM_ANY);
  }

  // Identify kind of pattern

  // Deal with hostname pattern
  if (fastStartsWith(line, '127.0.0.1')) {
    hostname = line.substr(line.lastIndexOf(' ') + 1);
    filter = '';
    mask = clearBit(mask, NETWORK_FILTER_MASK.isRegex);
    mask = setBit(mask, NETWORK_FILTER_MASK.isHostname);
    mask = setBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor);
  } else {
    // TODO - can we have an out-of-bound here? (source: V8 profiler)
    if (line[filterIndexEnd - 1] === '|') {
      mask = setBit(mask, NETWORK_FILTER_MASK.isRightAnchor);
      filterIndexEnd -= 1;
    }

    if (fastStartsWithFrom(line, '||', filterIndexStart)) {
      mask = setBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor);
      filterIndexStart += 2;
    } else if (line[filterIndexStart] === '|') {
      mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
      filterIndexStart += 1;
    }

    // If pattern ends with "*", strip it as it often can be
    // transformed into a "plain pattern" this way.
    // TODO: add a test
    if (
      line.charAt(filterIndexEnd - 1) === '*' &&
      filterIndexEnd - filterIndexStart > 1
    ) {
      filterIndexEnd -= 1;
    }

    // Is regex?
    const isRegex = checkIsRegex(line, filterIndexStart, filterIndexEnd);
    mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isRegex, isRegex);

    const isHostnameAnchor = getBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor);

    // Extract hostname to match it more easily
    // NOTE: This is the most common case of filters
    if (!isRegex && isHostnameAnchor) {
      // Look for next /
      const slashIndex = line.indexOf('/', filterIndexStart);
      if (slashIndex !== -1) {
        hostname = line.substring(filterIndexStart, slashIndex);
        filterIndexStart = slashIndex;
      } else {
        hostname = line.substring(filterIndexStart, filterIndexEnd);
        filter = '';
      }
    } else if (isRegex && isHostnameAnchor) {
      // Split at the first '/', '*' or '^' character to get the hostname
      // and then the pattern.
      // TODO - this could be made more efficient if we could match between two
      // indices. Once again, we have to do more work than is really needed.
      const firstSeparator = line.search(SEPARATOR);

      if (firstSeparator !== -1) {
        hostname = line.substring(filterIndexStart, firstSeparator);
        filterIndexStart = firstSeparator;
        if (
          filterIndexEnd - filterIndexStart === 1 &&
          line.charAt(filterIndexStart) === '^'
        ) {
          filter = '';
          mask = clearBit(mask, NETWORK_FILTER_MASK.isRegex);
        } else {
          mask = setNetworkMask(
            mask,
            NETWORK_FILTER_MASK.isRegex,
            checkIsRegex(line, filterIndexStart, filterIndexEnd),
          );
        }
      }
    }
  }

  if (filter === null) {
    filter = line.substring(filterIndexStart, filterIndexEnd).toLowerCase();
  }

  let finalHostname = '';
  if (hostname !== null) {
    finalHostname = hostname;
  }

  let finalFilter = '';
  if (filter !== null) {
    finalFilter = filter;
  }

  // Strip www from hostname if present
  if (
    getBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor) &&
    fastStartsWith(finalHostname, 'www.')
  ) {
    finalHostname = finalHostname.slice(4);
  }

  if (finalHostname !== '') {
    finalHostname = finalHostname.toLowerCase();
  }

  // Compute id of the filter
  const id = fastHash(line);

  return new NetworkFilter({
    filter: finalFilter,
    hostname: finalHostname,
    id,
    mask,
    optDomains,
    optNotDomains,
    redirect,
  });
}
