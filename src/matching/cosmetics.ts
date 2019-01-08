import { CosmeticFilter } from '../parsing/cosmetic-filter';

/* Checks that hostnamePattern matches at the end of the hostname.
 * Partial matches are allowed, but hostname should be a valid
 * subdomain of hostnamePattern.
 */
function checkHostnamesPartialMatch(hostname: string, hostnamePattern: string): boolean {
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
  hostnameWithoutPublicSuffix: string | null,
  hostnamePattern: string,
): boolean {
  if (hostnamePattern.endsWith('.*')) {
    // Check if we have an entity match
    if (hostnameWithoutPublicSuffix !== null) {
      return checkHostnamesPartialMatch(hostnameWithoutPublicSuffix, hostnamePattern.slice(0, -2));
    }

    return false;
  }

  return checkHostnamesPartialMatch(hostname, hostnamePattern);
}

/**
 * Given a hostname and its domain, return the hostname without the public
 * suffix. We know that the domain, with one less label on the left, will be a
 * the public suffix; and from there we know which trailing portion of
 * `hostname` we should remove.
 */
export function getHostnameWithoutPublicSuffix(hostname: string, domain: string): string | null {
  let hostnameWithoutPublicSuffix: string | null = null;

  const indexOfDot = domain.indexOf('.');
  if (indexOfDot !== -1) {
    const publicSuffix = domain.slice(indexOfDot + 1);
    hostnameWithoutPublicSuffix = hostname.slice(0, -publicSuffix.length - 1);
  }

  return hostnameWithoutPublicSuffix;
}

export default function matchCosmeticFilter(
  filter: CosmeticFilter,
  hostname: string,
  domain: string,
): boolean {
  const hostnameWithoutPublicSuffix = getHostnameWithoutPublicSuffix(hostname, domain);

  // Check hostnames
  if (filter.hasHostnames()) {
    if (hostname) {
      const hostnames = filter.getHostnames();

      // Check for exceptions
      for (let i = 0; i < hostnames.length; i += 1) {
        const filterHostname = hostnames[i];
        if (
          filterHostname[0] === '~' &&
          matchHostname(hostname, hostnameWithoutPublicSuffix, filterHostname.slice(1))
        ) {
          return false;
        }
      }

      // Check for positive matches
      for (let i = 0; i < hostnames.length; i += 1) {
        const filterHostname = hostnames[i];
        if (
          filterHostname[0] !== '~' &&
          matchHostname(hostname, hostnameWithoutPublicSuffix, filterHostname)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  return true;
}
