import StaticDataView from '../data-view';
import { toASCII } from '../punycode';
import { RequestType } from '../request';
import Request from '../request';
import TokensBuffer from '../tokens-buffer';
import {
  binLookup,
  bitCount,
  clearBit,
  createFuzzySignature,
  fastHash,
  fastStartsWith,
  fastStartsWithFrom,
  getBit,
  hasUnicode,
  isAlpha,
  isDigit,
  setBit,
  tokenizeFilterInPlace,
  tokenizeInPlace,
} from '../utils';
import IFilter from './interface';

const TOKENS_BUFFER = new TokensBuffer(200);
const HTTP_HASH = fastHash('http');
const HTTPS_HASH = fastHash('https');

function isAllowedHostname(ch: number): boolean {
  return (
    isDigit(ch) || isAlpha(ch) || ch === 95 /* '_' */ || ch === 45 /* '-' */ || ch === 46 /* '.' */
  );
}

/**
 * Masks used to store options of network filters in a bitmask.
 */
export const enum NETWORK_FILTER_MASK {
  // Content Policy Type
  fromImage = 1 << 0,
  fromMedia = 1 << 1,
  fromObject = 1 << 2,
  fromOther = 1 << 3,
  fromPing = 1 << 4,
  fromScript = 1 << 5,
  fromStylesheet = 1 << 6,
  fromSubdocument = 1 << 7,
  fromWebsocket = 1 << 8, // e.g.: ws, wss
  fromXmlHttpRequest = 1 << 9,
  fromFont = 1 << 10,
  fromHttp = 1 << 11,
  fromHttps = 1 << 12,
  isImportant = 1 << 13,
  matchCase = 1 << 14,
  fuzzyMatch = 1 << 15,

  // Kind of patterns
  thirdParty = 1 << 16,
  firstParty = 1 << 17,
  isRegex = 1 << 18,
  isLeftAnchor = 1 << 19,
  isRightAnchor = 1 << 20,
  isHostnameAnchor = 1 << 21,
  isException = 1 << 22,
  isCSP = 1 << 23,
  isGenericHide = 1 << 24,
  isBadFilter = 1 << 25,
  isUnicode = 1 << 26,
}

/**
 * Mask used when a network filter can be applied on any content type.
 */
const FROM_ANY: number =
  NETWORK_FILTER_MASK.fromFont |
  NETWORK_FILTER_MASK.fromImage |
  NETWORK_FILTER_MASK.fromMedia |
  NETWORK_FILTER_MASK.fromObject |
  NETWORK_FILTER_MASK.fromOther |
  NETWORK_FILTER_MASK.fromPing |
  NETWORK_FILTER_MASK.fromScript |
  NETWORK_FILTER_MASK.fromStylesheet |
  NETWORK_FILTER_MASK.fromSubdocument |
  NETWORK_FILTER_MASK.fromWebsocket |
  NETWORK_FILTER_MASK.fromXmlHttpRequest;

/**
 * Map content type value to mask the corresponding mask.
 * ref: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
 */
const CPT_TO_MASK: {
  [s: number]: number;
} = {
  [RequestType.other]: NETWORK_FILTER_MASK.fromOther,
  [RequestType.script]: NETWORK_FILTER_MASK.fromScript,
  [RequestType.image]: NETWORK_FILTER_MASK.fromImage,
  [RequestType.stylesheet]: NETWORK_FILTER_MASK.fromStylesheet,
  [RequestType.object]: NETWORK_FILTER_MASK.fromObject,
  [RequestType.subdocument]: NETWORK_FILTER_MASK.fromSubdocument,
  [RequestType.ping]: NETWORK_FILTER_MASK.fromPing,
  [RequestType.beacon]: NETWORK_FILTER_MASK.fromPing,
  [RequestType.xmlhttprequest]: NETWORK_FILTER_MASK.fromXmlHttpRequest,
  [RequestType.font]: NETWORK_FILTER_MASK.fromFont,
  [RequestType.media]: NETWORK_FILTER_MASK.fromMedia,
  [RequestType.websocket]: NETWORK_FILTER_MASK.fromWebsocket,
  [RequestType.dtd]: NETWORK_FILTER_MASK.fromOther,
  [RequestType.fetch]: NETWORK_FILTER_MASK.fromOther,
  [RequestType.xlst]: NETWORK_FILTER_MASK.fromOther,
};

function computeFilterId(
  csp: string | undefined,
  mask: number,
  filter: string | undefined,
  hostname: string | undefined,
  optDomains: Uint32Array | undefined,
  optNotDomains: Uint32Array | undefined,
): number {
  let hash = (5408 * 33) ^ mask;

  if (csp !== undefined) {
    for (let i = 0; i < csp.length; i += 1) {
      hash = (hash * 33) ^ csp.charCodeAt(i);
    }
  }

  if (optDomains !== undefined) {
    for (let i = 0; i < optDomains.length; i += 1) {
      hash = (hash * 33) ^ optDomains[i];
    }
  }

  if (optNotDomains !== undefined) {
    for (let i = 0; i < optNotDomains.length; i += 1) {
      hash = (hash * 33) ^ optNotDomains[i];
    }
  }

  if (filter !== undefined) {
    for (let i = 0; i < filter.length; i += 1) {
      hash = (hash * 33) ^ filter.charCodeAt(i);
    }
  }

  if (hostname !== undefined) {
    for (let i = 0; i < hostname.length; i += 1) {
      hash = (hash * 33) ^ hostname.charCodeAt(i);
    }
  }

  return hash >>> 0;
}

/**
 * Compiles a filter pattern to a regex. This is only performed *lazily* for
 * filters containing at least a * or ^ symbol. Because Regexes are expansive,
 * we try to convert some patterns to plain filters.
 */
function compileRegex(filterStr: string, isRightAnchor: boolean, isLeftAnchor: boolean): RegExp {
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

  return new RegExp(filter);
}

const EMPTY_ARRAY = new Uint32Array([]);
const MATCH_ALL = new RegExp('');

// TODO:
// 1. Options not supported yet:
//  - inline-script
//  - popup
//  - popunder
//  - genericblock
// 2. Replace `split` with `substr`
export default class NetworkFilter implements IFilter {
  public static parse(line: string, debug: boolean = false): NetworkFilter | null {
    // Represent options as a bitmask
    let mask: number =
      NETWORK_FILTER_MASK.thirdParty |
      NETWORK_FILTER_MASK.firstParty |
      NETWORK_FILTER_MASK.fromHttps |
      NETWORK_FILTER_MASK.fromHttp;

    // Temporary masks for positive (e.g.: $script) and negative (e.g.: $~script)
    // content type options.
    let cptMaskPositive: number = 0;
    let cptMaskNegative: number = FROM_ANY;

    let hostname: string | undefined;

    let optDomains: Uint32Array | undefined;
    let optNotDomains: Uint32Array | undefined;
    let redirect: string | undefined;
    let csp: string | undefined;

    // Start parsing
    let filterIndexStart: number = 0;
    let filterIndexEnd: number = line.length;

    // @@filter == Exception
    if (line.charCodeAt(0) === 64 /* '@' */ && line.charCodeAt(1) === 64 /* '@' */) {
      filterIndexStart += 2;
      mask = setBit(mask, NETWORK_FILTER_MASK.isException);
    }

    // filter$options == Options
    // ^     ^
    // |     |
    // |     optionsIndex
    // filterIndexStart
    const optionsIndex: number = line.lastIndexOf('$');
    if (optionsIndex !== -1) {
      // Parse options and set flags
      filterIndexEnd = optionsIndex;

      // --------------------------------------------------------------------- //
      // parseOptions
      // --------------------------------------------------------------------- //
      const options = line.slice(optionsIndex + 1).split(',');
      for (let i = 0; i < options.length; i += 1) {
        const rawOption = options[i];
        const negation = rawOption.charCodeAt(0) === 126 /* '~' */;
        let option = negation === true ? rawOption.slice(1) : rawOption;

        // Check for options: option=value1|value2
        let optionValue: string = '';
        const indexOfEqual: number = option.indexOf('=');
        if (indexOfEqual !== -1) {
          optionValue = option.slice(indexOfEqual + 1);
          option = option.slice(0, indexOfEqual);
        }

        switch (option) {
          case 'domain': {
            const optionValues: string[] = optionValue.split('|');
            const optDomainsArray: number[] = [];
            const optNotDomainsArray: number[] = [];

            for (let j = 0; j < optionValues.length; j += 1) {
              const value: string = optionValues[j];
              if (value) {
                if (value.charCodeAt(0) === 126 /* '~' */) {
                  optNotDomainsArray.push(fastHash(value.slice(1)));
                } else {
                  optDomainsArray.push(fastHash(value));
                }
              }
            }

            if (optDomainsArray.length > 0) {
              optDomains = new Uint32Array(optDomainsArray).sort();
            }

            if (optNotDomainsArray.length > 0) {
              optNotDomains = new Uint32Array(optNotDomainsArray).sort();
            }

            break;
          }
          case 'badfilter':
            mask = setBit(mask, NETWORK_FILTER_MASK.isBadFilter);
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
          case '3p':
          case 'third-party':
            if (negation) {
              // ~third-party means we should clear the flag
              mask = clearBit(mask, NETWORK_FILTER_MASK.thirdParty);
            } else {
              // third-party means ~first-party
              mask = clearBit(mask, NETWORK_FILTER_MASK.firstParty);
            }
            break;
          case '1p':
          case 'first-party':
            if (negation) {
              // ~first-party means we should clear the flag
              mask = clearBit(mask, NETWORK_FILTER_MASK.firstParty);
            } else {
              // first-party means ~third-party
              mask = clearBit(mask, NETWORK_FILTER_MASK.thirdParty);
            }
            break;
          case 'fuzzy':
            mask = setBit(mask, NETWORK_FILTER_MASK.fuzzyMatch);
            break;
          case 'collapse':
            break;
          case 'redirect':
            // Negation of redirection doesn't make sense
            if (negation) {
              return null;
            }

            // Ignore this filter if no redirection resource is specified
            if (optionValue.length === 0) {
              return null;
            }

            redirect = optionValue;
            break;
          case 'csp':
            mask = setBit(mask, NETWORK_FILTER_MASK.isCSP);
            if (optionValue.length > 0) {
              csp = optionValue;
            }
            break;
          case 'elemhide':
          case 'generichide':
            mask = setBit(mask, NETWORK_FILTER_MASK.isGenericHide);
            break;
          default: {
            // Handle content type options separatly
            let optionMask: number = 0;
            switch (option) {
              case 'image':
                optionMask = NETWORK_FILTER_MASK.fromImage;
                break;
              case 'media':
                optionMask = NETWORK_FILTER_MASK.fromMedia;
                break;
              case 'object':
                optionMask = NETWORK_FILTER_MASK.fromObject;
                break;
              case 'object-subrequest':
                optionMask = NETWORK_FILTER_MASK.fromObject;
                break;
              case 'other':
                optionMask = NETWORK_FILTER_MASK.fromOther;
                break;
              case 'ping':
              case 'beacon':
                optionMask = NETWORK_FILTER_MASK.fromPing;
                break;
              case 'script':
                optionMask = NETWORK_FILTER_MASK.fromScript;
                break;
              case 'css':
              case 'stylesheet':
                optionMask = NETWORK_FILTER_MASK.fromStylesheet;
                break;
              case 'subdocument':
                optionMask = NETWORK_FILTER_MASK.fromSubdocument;
                break;
              case 'xmlhttprequest':
              case 'xhr':
                optionMask = NETWORK_FILTER_MASK.fromXmlHttpRequest;
                break;
              case 'websocket':
                optionMask = NETWORK_FILTER_MASK.fromWebsocket;
                break;
              case 'font':
                optionMask = NETWORK_FILTER_MASK.fromFont;
                break;
              default:
                // Disable this filter if we don't support all the options
                return null;
            }

            // We got a valid cpt option, update mask
            if (negation) {
              cptMaskNegative = clearBit(cptMaskNegative, optionMask);
            } else {
              cptMaskPositive = setBit(cptMaskPositive, optionMask);
            }
            break;
          }
        }
      }
      // End of option parsing
      // --------------------------------------------------------------------- //
    }

    if (cptMaskPositive === 0) {
      mask |= cptMaskNegative;
    } else if (cptMaskNegative === FROM_ANY) {
      mask |= cptMaskPositive;
    } else {
      mask |= cptMaskPositive & cptMaskNegative;
    }

    // Detect and drop Regexps
    if (
      filterIndexEnd - filterIndexStart >= 2 &&
      line.charCodeAt(filterIndexStart) === 47 /* '/' */ &&
      line.charCodeAt(filterIndexEnd - 1) === 47 /* '/' */
    ) {
      return null;
    }

    // Identify kind of pattern

    // Deal with hostname pattern
    if (filterIndexEnd > 0 && line.charCodeAt(filterIndexEnd - 1) === 124 /* '|' */) {
      mask = setBit(mask, NETWORK_FILTER_MASK.isRightAnchor);
      filterIndexEnd -= 1;
    }

    if (filterIndexStart < filterIndexEnd && line.charCodeAt(filterIndexStart) === 124 /* '|' */) {
      if (
        filterIndexStart < filterIndexEnd - 1 &&
        line.charCodeAt(filterIndexStart + 1) === 124 /* '|' */
      ) {
        mask = setBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor);
        filterIndexStart += 2;
      } else {
        mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
        filterIndexStart += 1;
      }
    }

    // const isRegex = checkIsRegex(line, filterIndexStart, filterIndexEnd);
    // mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isRegex, isRegex);

    if (getBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor)) {
      // Split at the first character which is not allowed in a hostname
      let firstSeparator = filterIndexStart;
      while (
        firstSeparator < filterIndexEnd &&
        isAllowedHostname(line.charCodeAt(firstSeparator)) === true
      ) {
        firstSeparator += 1;
      }

      // No separator found so hostname has full length
      if (firstSeparator === filterIndexEnd) {
        hostname = line.slice(filterIndexStart, filterIndexEnd);
        filterIndexStart = filterIndexEnd;
        // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
      } else {
        // Found a separator
        hostname = line.slice(filterIndexStart, firstSeparator);
        filterIndexStart = firstSeparator;
        const separatorCode = line.charCodeAt(firstSeparator);

        if (separatorCode === 94 /* '^' */) {
          // If the only symbol remaining for the selector is '^' then ignore it
          // but set the filter as right anchored since there should not be any
          // other label on the right
          if (filterIndexEnd - filterIndexStart === 1) {
            filterIndexStart = filterIndexEnd;
            mask = setBit(mask, NETWORK_FILTER_MASK.isRightAnchor);
          } else {
            mask = setBit(mask, NETWORK_FILTER_MASK.isRegex);
            mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
          }
        } else if (separatorCode === 42 /* '*' */) {
          mask = setBit(mask, NETWORK_FILTER_MASK.isRegex);
        } else {
          mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
        }
      }
    }

    // Remove trailing '*'
    if (
      filterIndexEnd - filterIndexStart > 0 &&
      line.charCodeAt(filterIndexEnd - 1) === 42 /* '*' */
    ) {
      filterIndexEnd -= 1;
    }

    // Remove leading '*' if the filter is not hostname anchored.
    if (
      filterIndexEnd - filterIndexStart > 0 &&
      line.charCodeAt(filterIndexStart) === 42 /* '*' */
    ) {
      mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
      filterIndexStart += 1;
    }

    // Transform filters on protocol (http, https, ws)
    if (getBit(mask, NETWORK_FILTER_MASK.isLeftAnchor)) {
      if (
        filterIndexEnd - filterIndexStart === 5 &&
        fastStartsWithFrom(line, 'ws://', filterIndexStart)
      ) {
        mask = setBit(mask, NETWORK_FILTER_MASK.fromWebsocket);
        mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
        filterIndexStart = filterIndexEnd;
      } else if (
        filterIndexEnd - filterIndexStart === 7 &&
        fastStartsWithFrom(line, 'http://', filterIndexStart)
      ) {
        mask = setBit(mask, NETWORK_FILTER_MASK.fromHttp);
        mask = clearBit(mask, NETWORK_FILTER_MASK.fromHttps);
        mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
        filterIndexStart = filterIndexEnd;
      } else if (
        filterIndexEnd - filterIndexStart === 8 &&
        fastStartsWithFrom(line, 'https://', filterIndexStart)
      ) {
        mask = setBit(mask, NETWORK_FILTER_MASK.fromHttps);
        mask = clearBit(mask, NETWORK_FILTER_MASK.fromHttp);
        mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
        filterIndexStart = filterIndexEnd;
      } else if (
        filterIndexEnd - filterIndexStart === 8 &&
        fastStartsWithFrom(line, 'http*://', filterIndexStart)
      ) {
        mask = setBit(mask, NETWORK_FILTER_MASK.fromHttps);
        mask = setBit(mask, NETWORK_FILTER_MASK.fromHttp);
        mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
        filterIndexStart = filterIndexEnd;
      }
    }

    let filter: string | undefined;
    if (filterIndexEnd - filterIndexStart > 0) {
      filter = line.slice(filterIndexStart, filterIndexEnd).toLowerCase();

      mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isUnicode, hasUnicode(filter));
      if (getBit(mask, NETWORK_FILTER_MASK.isRegex) === false) {
        mask = setNetworkMask(
          mask,
          NETWORK_FILTER_MASK.isRegex,
          checkIsRegex(filter, 0, filter.length),
        );
      }
    }

    // TODO
    // - ignore hostname anchor is not hostname provided

    if (hostname !== undefined) {
      if (getBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor) && fastStartsWith(hostname, 'www.')) {
        hostname = hostname.slice(4);
      }
      hostname = hostname.toLowerCase();
      if (hasUnicode(hostname)) {
        mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isUnicode, true);
        hostname = toASCII(hostname);
      }
    }

    return new NetworkFilter({
      csp,
      filter,
      hostname,
      mask,
      optDomains,
      optNotDomains,
      rawLine: debug === true ? line : undefined,
      redirect,
    });
  }

  /**
   * Deserialize network filters. The code accessing the buffer should be
   * symetrical to the one in `serializeNetworkFilter`.
   */
  public static deserialize(buffer: StaticDataView): NetworkFilter {
    const mask = buffer.getUint32();
    const optionalParts = buffer.getUint8();
    const isUnicode = getBit(mask, NETWORK_FILTER_MASK.isUnicode);

    // The order of these statements is important. Since `buffer.getX()` will
    // internally increment the position of next byte to read, they need to be
    // retrieved in the exact same order they were serialized (check
    // `serializeNetworkFilter`).
    return new NetworkFilter({
      // Mandatory field
      mask,

      // Optional parts
      csp: (optionalParts & 1) === 1 ? buffer.getASCII() : undefined,
      filter:
        (optionalParts & 2) === 2 ? (isUnicode ? buffer.getUTF8() : buffer.getASCII()) : undefined,
      hostname: (optionalParts & 4) === 4 ? buffer.getASCII() : undefined,
      optDomains: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
      optNotDomains: (optionalParts & 16) === 16 ? buffer.getUint32Array() : undefined,
      rawLine:
        (optionalParts & 32) === 32
          ? isUnicode
            ? buffer.getUTF8()
            : buffer.getASCII()
          : undefined,
      redirect: (optionalParts & 64) === 64 ? buffer.getASCII() : undefined,
    });
  }

  public readonly mask: number;
  public readonly filter?: string;
  public readonly optDomains?: Uint32Array;
  public readonly optNotDomains?: Uint32Array;
  public readonly redirect?: string;
  public readonly hostname?: string;
  public readonly csp?: string;

  // Set only in debug mode
  public rawLine?: string;

  // Lazy attributes
  public id?: number;
  private fuzzySignature?: Uint32Array;
  private regex?: RegExp;

  constructor({
    csp,
    filter,
    hostname,
    mask,
    optDomains,
    optNotDomains,
    rawLine,
    redirect,
    regex,
  }: { mask: number; regex?: RegExp } & Partial<NetworkFilter>) {
    this.csp = csp;
    this.filter = filter;
    this.hostname = hostname;
    this.mask = mask;
    this.optDomains = optDomains;
    this.optNotDomains = optNotDomains;
    this.rawLine = rawLine;
    this.redirect = redirect;
    this.regex = regex;
  }

  public isCosmeticFilter() {
    return false;
  }
  public isNetworkFilter() {
    return true;
  }

  public match(request: Request): boolean {
    return checkOptions(this, request) && checkPattern(this, request);
  }

  /**
   * To allow for a more compact representation of network filters, the
   * representation is composed of a mandatory header, and some optional
   *
   * Header:
   * =======
   *
   *  | opt | mask
   *     8     32
   *
   * For an empty filter having no pattern, hostname, the minimum size is: 42 bits.
   *
   * Then for each optional part (filter, hostname optDomains, optNotDomains,
   * redirect), it takes 16 bits for the length of the string + the length of the
   * string in bytes.
   *
   * The optional parts are written in order of there number of occurrence in the
   * filter list used by the adblocker. The most common being `hostname`, then
   * `filter`, `optDomains`, `optNotDomains`, `redirect`.
   *
   * Example:
   * ========
   *
   * @@||cliqz.com would result in a serialized version:
   *
   * | 1 | mask | 9 | c | l | i | q | z | . | c | o | m  (16 bytes)
   *
   * In this case, the serialized version is actually bigger than the original
   * filter, but faster to deserialize. In the future, we could optimize the
   * representation to compact small filters better.
   *
   * Ideas:
   *  * variable length encoding for the mask (if not option, take max 1 byte).
   *  * first byte could contain the mask as well if small enough.
   *  * when packing ascii string, store several of them in each byte.
   */
  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32(this.mask);

    const index = buffer.getPos();
    buffer.pushUint8(0);

    // This bit-mask indicates which optional parts of the filter were serialized.
    let optionalParts = 0;

    if (this.csp !== undefined) {
      optionalParts |= 1;
      buffer.pushASCII(this.csp);
    }

    if (this.filter !== undefined) {
      optionalParts |= 2;
      if (this.isUnicode()) {
        buffer.pushUTF8(this.filter);
      } else {
        buffer.pushASCII(this.filter);
      }
    }

    if (this.hostname !== undefined) {
      optionalParts |= 4;
      buffer.pushASCII(this.hostname);
    }

    if (this.optDomains) {
      optionalParts |= 8;
      buffer.pushUint32Array(this.optDomains);
    }

    if (this.optNotDomains !== undefined) {
      optionalParts |= 16;
      buffer.pushUint32Array(this.optNotDomains);
    }

    if (this.rawLine !== undefined) {
      optionalParts |= 32;
      if (this.isUnicode()) {
        buffer.pushUTF8(this.rawLine);
      } else {
        buffer.pushASCII(this.rawLine);
      }
    }

    if (this.redirect !== undefined) {
      optionalParts |= 64;
      buffer.pushASCII(this.redirect);
    }

    buffer.setByte(index, optionalParts);
  }

  public getSerializedSize(): number {
    let estimate: number = 4 + 1; // mask = 4 bytes // optional parts = 1 byte

    if (this.csp !== undefined) {
      estimate += StaticDataView.sizeOfASCII(this.csp);
    }

    if (this.filter !== undefined) {
      if (this.isUnicode()) {
        estimate += StaticDataView.sizeOfUTF8(this.filter);
      } else {
        estimate += StaticDataView.sizeOfASCII(this.filter);
      }
    }

    if (this.hostname !== undefined) {
      estimate += StaticDataView.sizeOfASCII(this.hostname);
    }

    if (this.optDomains !== undefined) {
      estimate += StaticDataView.sizeOfUint32Array(this.optDomains);
    }

    if (this.optNotDomains !== undefined) {
      estimate += StaticDataView.sizeOfUint32Array(this.optNotDomains);
    }

    if (this.rawLine !== undefined) {
      if (this.isUnicode()) {
        estimate += StaticDataView.sizeOfUTF8(this.rawLine);
      } else {
        estimate += StaticDataView.sizeOfASCII(this.rawLine);
      }
    }

    if (this.redirect !== undefined) {
      estimate += StaticDataView.sizeOfASCII(this.redirect);
    }

    return estimate;
  }

  /**
   * Tries to recreate the original representation of the filter (adblock
   * syntax) from the internal representation. If `rawLine` is set (when filters
   * are parsed in `debug` mode for example), then it is returned directly.
   * Otherwise, we try to stick as closely as possible to the original form;
   * there are things which cannot be recovered though, like domains options
   * of which only hashes are stored.
   */
  public toString() {
    if (this.rawLine !== undefined) {
      return this.rawLine;
    }

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
      const numberOfCptOptions = bitCount(this.getCptMask());
      const numberOfNegatedOptions = bitCount(FROM_ANY) - numberOfCptOptions;

      if (numberOfNegatedOptions < numberOfCptOptions) {
        if (!this.fromImage()) {
          options.push('~image');
        }
        if (!this.fromMedia()) {
          options.push('~media');
        }
        if (!this.fromObject()) {
          options.push('~object');
        }
        if (!this.fromOther()) {
          options.push('~other');
        }
        if (!this.fromPing()) {
          options.push('~ping');
        }
        if (!this.fromScript()) {
          options.push('~script');
        }
        if (!this.fromStylesheet()) {
          options.push('~stylesheet');
        }
        if (!this.fromSubdocument()) {
          options.push('~subdocument');
        }
        if (!this.fromWebsocket()) {
          options.push('~websocket');
        }
        if (!this.fromXmlHttpRequest()) {
          options.push('~xmlhttprequest');
        }
        if (!this.fromFont()) {
          options.push('~font');
        }
      } else {
        if (this.fromImage()) {
          options.push('image');
        }
        if (this.fromMedia()) {
          options.push('media');
        }
        if (this.fromObject()) {
          options.push('object');
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
    }

    if (this.isFuzzy()) {
      options.push('fuzzy');
    }

    if (this.isImportant()) {
      options.push('important');
    }

    if (this.isRedirect()) {
      options.push(`redirect=${this.getRedirect()}`);
    }

    if (this.isCSP()) {
      options.push(`csp=${this.csp}`);
    }

    if (this.isGenericHide()) {
      options.push('generichide');
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
      options.push('domain=<hashed>');
    }

    if (this.isBadFilter()) {
      options.push('badfilter');
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
  public getIdWithoutBadFilter(): number {
    // This method computes the id ignoring the $badfilter option (which will
    // correspond to the ID of filters being discarded). This allows us to
    // eliminate bad filters by comparing IDs, which is more robust and faster
    // than string comparison.
    return computeFilterId(
      this.csp,
      this.mask & ~NETWORK_FILTER_MASK.isBadFilter,
      this.filter,
      this.hostname,
      this.optDomains,
      this.optNotDomains,
    );
  }

  public getId(): number {
    if (this.id === undefined) {
      this.id = computeFilterId(
        this.csp,
        this.mask,
        this.filter,
        this.hostname,
        this.optDomains,
        this.optNotDomains,
      );
    }
    return this.id;
  }

  public hasFilter(): boolean {
    return this.filter !== undefined;
  }

  public hasOptNotDomains(): boolean {
    return this.optNotDomains !== undefined;
  }

  public getOptNotDomains(): Uint32Array {
    return this.optNotDomains || EMPTY_ARRAY;
  }

  public hasOptDomains(): boolean {
    return this.optDomains !== undefined;
  }

  public getOptDomains(): Uint32Array {
    return this.optDomains || EMPTY_ARRAY;
  }

  public getMask(): number {
    return this.mask;
  }

  public getCptMask(): number {
    return this.getMask() & FROM_ANY;
  }

  public isRedirect(): boolean {
    return this.redirect !== undefined;
  }

  public getRedirect(): string {
    return this.redirect || '';
  }

  public hasHostname(): boolean {
    return this.hostname !== undefined;
  }

  public getHostname(): string {
    return this.hostname || '';
  }

  public getFilter(): string {
    return this.filter || '';
  }

  public getRegex(): RegExp {
    if (this.regex === undefined) {
      this.regex =
        this.filter !== undefined && this.isRegex()
          ? compileRegex(this.filter, this.isRightAnchor(), this.isLeftAnchor())
          : MATCH_ALL;
    }
    return this.regex;
  }

  public getFuzzySignature(): Uint32Array {
    if (this.fuzzySignature === undefined) {
      this.fuzzySignature =
        this.filter !== undefined && this.isFuzzy()
          ? createFuzzySignature(this.filter)
          : EMPTY_ARRAY;
    }
    return this.fuzzySignature;
  }

  public getTokens(): Uint32Array[] {
    TOKENS_BUFFER.seekZero();

    // If there is only one domain and no domain negation, we also use this
    // domain as a token.
    if (
      this.optDomains !== undefined &&
      this.optNotDomains === undefined &&
      this.optDomains.length === 1
    ) {
      TOKENS_BUFFER.push(this.optDomains[0]);
    }

    // Get tokens from filter
    if (this.filter !== undefined) {
      const skipLastToken = this.isPlain() && !this.isRightAnchor() && !this.isFuzzy();
      const skipFirstToken = this.isRightAnchor();
      tokenizeFilterInPlace(this.filter, skipFirstToken, skipLastToken, TOKENS_BUFFER);
    }

    // Append tokens from hostname, if any
    if (this.hostname !== undefined) {
      tokenizeInPlace(this.hostname, TOKENS_BUFFER);
    }

    // If we got no tokens for the filter/hostname part, then we will dispatch
    // this filter in multiple buckets based on the domains option.
    if (
      TOKENS_BUFFER.pos === 0 &&
      this.optDomains !== undefined &&
      this.optNotDomains === undefined
    ) {
      const result: Uint32Array[] = [];
      for (let i = 0; i < this.optDomains.length; i += 1) {
        result.push(new Uint32Array([this.optDomains[i]]));
      }
      return result;
    }

    // Add optional token for protocol
    if (this.fromHttp() === true && this.fromHttps() === false) {
      TOKENS_BUFFER.push(HTTP_HASH);
    } else if (this.fromHttps() === true && this.fromHttp() === false) {
      TOKENS_BUFFER.push(HTTPS_HASH);
    }

    return [TOKENS_BUFFER.slice()];
  }

  /**
   * Check if this filter should apply to a request with this content type.
   */
  public isCptAllowed(cpt: RequestType): boolean {
    const mask = CPT_TO_MASK[cpt];
    if (mask !== undefined) {
      return getBit(this.mask, mask);
    }

    // If content type is not supported (or not specified), we return `true`
    // only if the filter does not specify any resource type.
    return this.fromAny();
  }

  public isFuzzy() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fuzzyMatch);
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

  public isCSP() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isCSP);
  }

  public isGenericHide() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isGenericHide);
  }

  public isBadFilter() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isBadFilter);
  }

  public isUnicode() {
    return getBit(this.mask, NETWORK_FILTER_MASK.isUnicode);
  }

  public fromAny() {
    return this.getCptMask() === FROM_ANY;
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

  public fromHttp() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromHttp);
  }

  public fromHttps() {
    return getBit(this.mask, NETWORK_FILTER_MASK.fromHttps);
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
  if (value === true) {
    return setBit(mask, m);
  }

  return clearBit(mask, m);
}

/**
 * Check if the sub-string contained between the indices start and end is a
 * regex filter (it contains a '*' or '^' char).
 */
function checkIsRegex(filter: string, start: number, end: number): boolean {
  const indexOfSeparator = filter.indexOf('^', start);
  if (indexOfSeparator !== -1 && indexOfSeparator < end) {
    return true;
  }

  const indexOfWildcard = filter.indexOf('*', start);
  return indexOfWildcard !== -1 && indexOfWildcard < end;
}

/**
 * Handle hostname anchored filters, given 'hostname' from ||hostname and
 * request's hostname, check if there is a match. This is tricky because filters
 * authors rely and different assumption. We can have prefix of suffix matches
 * of anchor.
 */
export function isAnchoredByHostname(filterHostname: string, hostname: string): boolean {
  // Corner-case, if `filterHostname` is empty, then it's a match
  if (filterHostname.length === 0) {
    return true;
  }

  // `filterHostname` cannot be longer than actual hostname
  if (filterHostname.length > hostname.length) {
    return false;
  }

  // If they have the same length, they should be equal
  if (filterHostname.length === hostname.length) {
    return filterHostname === hostname;
  }

  // Check if `filterHostname` appears anywhere in `hostname`
  const matchIndex = hostname.indexOf(filterHostname);

  // No match
  if (matchIndex === -1) {
    return false;
  }

  // `filterHostname` is a prefix of `hostname` and needs to match full a label.
  //
  // Examples (filterHostname, hostname):
  //   * (foo, foo.com)
  //   * (sub.foo, sub.foo.com)
  if (matchIndex === 0) {
    return (
      hostname.charCodeAt(filterHostname.length) === 46 ||
      filterHostname.charCodeAt(filterHostname.length - 1) === 46
    );
  }

  // `filterHostname` is a suffix of `hostname`.
  //
  // Examples (filterHostname, hostname):
  //    * (foo.com, sub.foo.com)
  //    * (com, foo.com)
  if (hostname.length === matchIndex + filterHostname.length) {
    return hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46;
  }

  // `filterHostname` is infix of `hostname` and needs match full labels
  return (
    (hostname.charCodeAt(filterHostname.length) === 46 ||
      filterHostname.charCodeAt(filterHostname.length - 1) === 46) &&
    (hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46)
  );
}

function getUrlAfterHostname(url: string, hostname: string): string {
  return url.slice(url.indexOf(hostname) + hostname.length);
}

// pattern$fuzzy
function checkPatternFuzzyFilter(filter: NetworkFilter, request: Request) {
  const signature = filter.getFuzzySignature();
  const requestSignature = request.getFuzzySignature();

  if (signature.length > requestSignature.length) {
    return false;
  }

  let lastIndex = 0;
  for (let i = 0; i < signature.length; i += 1) {
    const c = signature[i];
    // Find the occurrence of `c` in `requestSignature`
    const j = requestSignature.indexOf(c, lastIndex);
    if (j === -1) {
      return false;
    }
    lastIndex = j + 1;
  }

  return true;
}

// pattern
function checkPatternPlainFilter(filter: NetworkFilter, request: Request): boolean {
  if (filter.hasFilter() === false) {
    return true;
  }

  return request.url.indexOf(filter.getFilter()) !== -1;
}

// pattern|
function checkPatternRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  return request.url.endsWith(filter.getFilter());
}

// |pattern
function checkPatternLeftAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  return fastStartsWith(request.url, filter.getFilter());
}

// |pattern|
function checkPatternLeftRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  return request.url === filter.getFilter();
}

// pattern*^
function checkPatternRegexFilter(
  filter: NetworkFilter,
  request: Request,
  startFrom: number = 0,
): boolean {
  let url = request.url;
  if (startFrom > 0) {
    url = url.slice(startFrom);
  }
  return filter.getRegex().test(url);
}

// ||pattern*^
function checkPatternHostnameAnchorRegexFilter(filter: NetworkFilter, request: Request): boolean {
  const url = request.url;
  const hostname = request.hostname;
  const filterHostname = filter.getHostname();
  if (isAnchoredByHostname(filterHostname, hostname)) {
    return checkPatternRegexFilter(
      filter,
      request,
      url.indexOf(filterHostname) + filterHostname.length,
    );
  }

  return false;
}

// ||pattern|
function checkPatternHostnameRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  const filterHostname = filter.getHostname();
  const requestHostname = request.hostname;
  if (isAnchoredByHostname(filterHostname, requestHostname)) {
    if (filter.hasFilter() === false) {
      // In this specific case it means that the specified hostname should match
      // at the end of the hostname of the request. This allows to prevent false
      // positive like ||foo.bar which would match https://foo.bar.baz where
      // ||foo.bar^ would not.
      return (
        filterHostname.length === requestHostname.length ||
        requestHostname.endsWith(filterHostname)
      );
    } else {
      return checkPatternRightAnchorFilter(filter, request);
    }
  }

  return false;
}

// |||pattern|
function checkPatternHostnameLeftRightAnchorFilter(
  filter: NetworkFilter,
  request: Request,
): boolean {
  if (isAnchoredByHostname(filter.getHostname(), request.hostname)) {
    // Since this is not a regex, the filter pattern must follow the hostname
    // with nothing in between. So we extract the part of the URL following
    // after hostname and will perform the matching on it.
    const urlAfterHostname = getUrlAfterHostname(request.url, filter.getHostname());

    // Since it must follow immediatly after the hostname and be a suffix of
    // the URL, we conclude that filter must be equal to the part of the
    // url following the hostname.
    return filter.getFilter() === urlAfterHostname;
  }

  return false;
}

// ||pattern + left-anchor => This means that a plain pattern needs to appear
// exactly after the hostname, with nothing in between.
function checkPatternHostnameLeftAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  const filterHostname = filter.getHostname();
  if (isAnchoredByHostname(filterHostname, request.hostname)) {
    // Since this is not a regex, the filter pattern must follow the hostname
    // with nothing in between. So we extract the part of the URL following
    // after hostname and will perform the matching on it.
    return fastStartsWithFrom(
      request.url,
      filter.getFilter(),
      request.url.indexOf(filterHostname) + filterHostname.length,
    );
  }

  return false;
}

// ||pattern
function checkPatternHostnameAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  const filterHostname = filter.getHostname();
  if (isAnchoredByHostname(filterHostname, request.hostname)) {
    if (filter.hasFilter() === false) {
      return true;
    }

    // We consider this a match if the plain patter (i.e.: filter) appears anywhere.
    return (
      request.url.indexOf(
        filter.getFilter(),
        request.url.indexOf(filterHostname) + filterHostname.length,
      ) !== -1
    );
  }

  return false;
}

// ||pattern$fuzzy
function checkPatternHostnameAnchorFuzzyFilter(filter: NetworkFilter, request: Request) {
  if (isAnchoredByHostname(filter.getHostname(), request.hostname)) {
    return checkPatternFuzzyFilter(filter, request);
  }

  return false;
}

/**
 * Specialize a network filter depending on its type. It allows for more
 * efficient matching function.
 */
function checkPattern(filter: NetworkFilter, request: Request): boolean {
  if (filter.isHostnameAnchor()) {
    if (filter.isRegex()) {
      return checkPatternHostnameAnchorRegexFilter(filter, request);
    } else if (filter.isRightAnchor() && filter.isLeftAnchor()) {
      return checkPatternHostnameLeftRightAnchorFilter(filter, request);
    } else if (filter.isRightAnchor()) {
      return checkPatternHostnameRightAnchorFilter(filter, request);
    } else if (filter.isFuzzy()) {
      return checkPatternHostnameAnchorFuzzyFilter(filter, request);
    } else if (filter.isLeftAnchor()) {
      return checkPatternHostnameLeftAnchorFilter(filter, request);
    }
    return checkPatternHostnameAnchorFilter(filter, request);
  } else if (filter.isRegex()) {
    return checkPatternRegexFilter(filter, request);
  } else if (filter.isLeftAnchor() && filter.isRightAnchor()) {
    return checkPatternLeftRightAnchorFilter(filter, request);
  } else if (filter.isLeftAnchor()) {
    return checkPatternLeftAnchorFilter(filter, request);
  } else if (filter.isRightAnchor()) {
    return checkPatternRightAnchorFilter(filter, request);
  } else if (filter.isFuzzy()) {
    return checkPatternFuzzyFilter(filter, request);
  }

  return checkPatternPlainFilter(filter, request);
}

function checkOptions(filter: NetworkFilter, request: Request): boolean {
  // We first discard requests based on type, protocol and party. This is really
  // cheap and should be done first.
  if (
    filter.isCptAllowed(request.type) === false ||
    (request.isHttps === true && filter.fromHttps() === false) ||
    (request.isHttp === true && filter.fromHttp() === false) ||
    (!filter.firstParty() && request.isFirstParty === true) ||
    (!filter.thirdParty() && request.isThirdParty === true)
  ) {
    return false;
  }

  // Source URL must be among these domains to match
  if (filter.hasOptDomains()) {
    const optDomains = filter.getOptDomains();
    if (
      binLookup(optDomains, request.sourceHostnameHash) === false &&
      binLookup(optDomains, request.sourceDomainHash) === false
    ) {
      return false;
    }
  }

  // Source URL must not be among these domains to match
  if (filter.hasOptNotDomains()) {
    const optNotDomains = filter.getOptNotDomains();
    if (
      binLookup(optNotDomains, request.sourceHostnameHash) === true ||
      binLookup(optNotDomains, request.sourceDomainHash) === true
    ) {
      return false;
    }
  }

  return true;
}
