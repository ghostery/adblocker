// @ts-ignore
import { getPublicSuffix } from 'tldjs';

import { CosmeticFilter } from '../parsing/cosmetic-filter';
import { fastStartsWith } from '../utils';

/* Checks that hostnamePattern matches at the end of the hostname.
 * Partial matches are allowed, but hostname should be a valid
 * subdomain of hostnamePattern.
 */
function checkHostnamesPartialMatch(
  hostname: string,
  hostnamePattern: string,
): boolean {
  let pattern = hostnamePattern;
  if (fastStartsWith(hostnamePattern, '~')) {
    pattern = pattern.substr(1);
  }

  if (hostname.endsWith(pattern)) {
    const patternIndex = hostname.length - pattern.length;
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
function matchHostname(hostname: string, hostnamePattern: string): boolean {
  if (hostnamePattern.endsWith('.*')) {
    // Match entity:
    const entity = hostnamePattern.slice(0, -2);

    // Ignore TLDs suffix
    const publicSuffix = getPublicSuffix(hostname);
    if (!publicSuffix) {
      return false;
    }

    const hostnameWithoutSuffix = hostname.substr(
      0,
      hostname.length - publicSuffix.length - 1,
    );

    if (hostnameWithoutSuffix.length > 0) {
      // Check if we have a match
      return checkHostnamesPartialMatch(hostnameWithoutSuffix, entity);
    }

    return false;
  }

  return checkHostnamesPartialMatch(hostname, hostnamePattern);
}

export default function matchCosmeticFilter(
  filter: CosmeticFilter,
  hostname: string,
): { hostname: string } | null {
  // Check hostnames
  if (filter.hasHostnames() && hostname) {
    const hostnames = filter.getHostnames();
    for (let i = 0; i < hostnames.length; i += 1) {
      if (matchHostname(hostname, hostnames[i])) {
        return { hostname: hostnames[i] };
      }
    }

    // No hostname match
    return null;
  }

  return { hostname: '' };
}
