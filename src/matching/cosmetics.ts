import { getPublicSuffix } from 'tldts';

import { CosmeticFilter } from '../parsing/cosmetic-filter';

/* Checks that hostnamePattern matches at the end of the hostname.
 * Partial matches are allowed, but hostname should be a valid
 * subdomain of hostnamePattern.
 */
function checkHostnamesPartialMatch(
  hostname: string,
  hostnamePattern: string,
): boolean {
  if (hostname.endsWith(hostnamePattern)) {
    const patternIndex = hostname.length - hostnamePattern.length;
    if (patternIndex === 0 || hostname[patternIndex - 1] === '.') {
      return true;
    }
  }

  return false;
}

/* Checks if `hostname` matches `hostnamePattern`, which can appear as
 * a domain selector in a cosmetic filter: hostnamePattern##selector
 *
 * It takes care of the concept of entities introduced by uBlock: google.*
 * https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#entity-based-cosmetic-filters
 */
function matchHostname(
  hostname: string,
  hostnamePattern: string,
): boolean {
  if (hostnamePattern.endsWith('.*')) {
    // Match entity:
    const entity = hostnamePattern.slice(0, -2);

    // Ignore TLDs suffix
    const publicSuffix = getPublicSuffix(hostname);
    if (publicSuffix === null) {
      return false;
    }

    const hostnameWithoutSuffix = hostname.substr(0, hostname.length - publicSuffix.length - 1);

    if (hostnameWithoutSuffix.length > 0) {
      // Check if we have a match
      return checkHostnamesPartialMatch(hostnameWithoutSuffix, entity);
    }

    return false;
  }

  return checkHostnamesPartialMatch(hostname, hostnamePattern);
}

export default function matchCosmeticFilter(filter: CosmeticFilter, hostname: string): boolean {
  // Check hostnames
  if (filter.hasHostnames()) {
    if (hostname) {
      const hostnames = filter.getHostnames();

      // Check for exceptions
      for (let i = 0; i < hostnames.length; i += 1) {
        const filterHostname = hostnames[i];
        if (filterHostname[0] === '~' && matchHostname(hostname, filterHostname.slice(1))) {
          return false;
        }
      }

      // Check for positive matches
      for (let i = 0; i < hostnames.length; i += 1) {
        const filterHostname = hostnames[i];
        if (filterHostname[0] !== '~' && matchHostname(hostname, filterHostname)) {
          return true;
        }
      }
    }

    return false;
  }

  return true;
}
