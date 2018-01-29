import {
  clearBit,
  fastHash,
  fastStartsWith,
  fastStartsWithFrom,
  getBit,
  setBit,
} from '../utils';

import NetworkFilter, { FROM_ANY, MASK } from '../types/filter';

const SEPARATOR = /[/^*]/;

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
  let mask: number = MASK.thirdParty | MASK.firstParty;

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
    mask = setBit(mask, MASK.isException);
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
          mask = setNetworkMask(mask, MASK.fromImage, !negation);
          break;
        case 'media':
          hasCptOption = true;
          mask = setNetworkMask(mask, MASK.fromMedia, !negation);
          break;
        case 'object':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromObject,
            !negation,
          );
          break;
        case 'object-subrequest':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromObjectSubrequest,
            !negation,
          );
          break;
        case 'other':
          hasCptOption = true;
          mask = setNetworkMask(mask, MASK.fromOther, !negation);
          break;
        case 'ping':
          hasCptOption = true;
          mask = setNetworkMask(mask, MASK.fromPing, !negation);
          break;
        case 'script':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromScript,
            !negation,
          );
          break;
        case 'stylesheet':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromStylesheet,
            !negation,
          );
          break;
        case 'subdocument':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromSubdocument,
            !negation,
          );
          break;
        case 'xmlhttprequest':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromXmlHttpRequest,
            !negation,
          );
          break;
        case 'websocket':
          hasCptOption = true;
          mask = setNetworkMask(
            mask,
            MASK.fromWebsocket,
            !negation,
          );
          break;
        case 'font':
          hasCptOption = true;
          mask = setNetworkMask(mask, MASK.fromFont, !negation);
          break;
        case 'important':
          // Note: `negation` should always be `false` here.
          if (negation) {
            return null;
          }

          mask = setBit(mask, MASK.isImportant);
          break;
        case 'match-case':
          // Note: `negation` should always be `false` here.
          if (negation) {
            return null;
          }

          mask = setBit(mask, MASK.matchCase);
          break;
        case 'third-party':
          if (negation) {
            // ~third-party means we should clear the flag
            mask = clearBit(mask, MASK.thirdParty);
          } else {
            // third-party means ~first-party
            mask = clearBit(mask, MASK.firstParty);
          }
          break;
        case 'first-party':
          if (negation) {
            // ~first-party means we should clear the flag
            mask = clearBit(mask, MASK.firstParty);
          } else {
            // first-party means ~third-party
            mask = clearBit(mask, MASK.thirdParty);
          }
          break;
        case 'fuzzy':
          mask = setBit(mask, MASK.fuzzyMatch);
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
    mask = clearBit(mask, MASK.isRegex);
    mask = setBit(mask, MASK.isHostname);
    mask = setBit(mask, MASK.isHostnameAnchor);
  } else {
    // TODO - can we have an out-of-bound here? (source: V8 profiler)
    if (line[filterIndexEnd - 1] === '|') {
      mask = setBit(mask, MASK.isRightAnchor);
      filterIndexEnd -= 1;
    }

    if (fastStartsWithFrom(line, '||', filterIndexStart)) {
      mask = setBit(mask, MASK.isHostnameAnchor);
      filterIndexStart += 2;
    } else if (line[filterIndexStart] === '|') {
      mask = setBit(mask, MASK.isLeftAnchor);
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
    mask = setNetworkMask(mask, MASK.isRegex, isRegex);

    const isHostnameAnchor = getBit(mask, MASK.isHostnameAnchor);

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
          mask = clearBit(mask, MASK.isRegex);
        } else {
          mask = setNetworkMask(
            mask,
            MASK.isRegex,
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
    getBit(mask, MASK.isHostnameAnchor) &&
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
