import { NetworkFilter } from '../parsing/network-filter';
import Request from '../request';
import { fastStartsWith, fastStartsWithFrom } from '../utils';

export function isAnchoredByHostname(filterHostname: string, hostname: string): boolean {
  // Corner-case, if `filterHostname` is empty, then it's a match
  if (filterHostname.length === 0) {
    return true;
  }

  // `filterHostname` cannot be longer than actual hostname
  if (filterHostname.length > hostname.length) {
    return false;
  }

  // Check if `filterHostname` appears anywhere in `hostname`
  const matchIndex = hostname.indexOf(filterHostname);

  // No match
  if (matchIndex === -1) {
    return false;
  }

  // Either start at beginning of hostname or be preceded by a '.'
  return (
    // Prefix match
    (matchIndex === 0 &&
      // This means `filterHostname` is equal to `hostname`
      (hostname.length === filterHostname.length ||
        // This means that `filterHostname` is a prefix of `hostname` (ends with a '.')
        filterHostname[filterHostname.length - 1] === '.' ||
        hostname[filterHostname.length] === '.')) ||
    // Suffix or infix match
    ((hostname[matchIndex - 1] === '.' || filterHostname[0] === '.') &&
      // `filterHostname` is a full suffix of `hostname`
      (hostname.length - matchIndex === filterHostname.length ||
        // This means that `filterHostname` is infix of `hostname` (ends with a '.')
        filterHostname[filterHostname.length - 1] === '.' ||
        hostname[matchIndex + filterHostname.length] === '.'))
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
  if (filter.hasFilter() === false) {
    return true;
  }

  return request.url.endsWith(filter.getFilter());
}

// |pattern
function checkPatternLeftAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  if (filter.hasFilter() === false) {
    return true;
  }

  return fastStartsWith(request.url, filter.getFilter());
}

// |pattern|
function checkPatternLeftRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  if (filter.hasFilter() === false) {
    return true;
  }
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
  if (isAnchoredByHostname(filter.getHostname(), request.hostname)) {
    return checkPatternRightAnchorFilter(filter, request);
  }

  return false;
}

// |||pattern|
function checkPatternHostnameLeftRightAnchorFilter(
  filter: NetworkFilter,
  request: Request,
): boolean {
  if (isAnchoredByHostname(filter.getHostname(), request.hostname)) {
    if (filter.hasFilter() === false) {
      return true;
    }

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
  if (isAnchoredByHostname(filter.getHostname(), request.hostname)) {
    if (filter.hasFilter() === false) {
      return true;
    }

    // Since this is not a regex, the filter pattern must follow the hostname
    // with nothing in between. So we extract the part of the URL following
    // after hostname and will perform the matching on it.
    return fastStartsWithFrom(
      request.url,
      filter.getFilter(),
      request.url.indexOf(filter.getHostname()) + filter.getHostname().length,
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
    if (!optDomains.has(request.sourceHostnameHash) && !optDomains.has(request.sourceDomainHash)) {
      return false;
    }
  }

  // Source URL must not be among these domains to match
  if (filter.hasOptNotDomains()) {
    const optNotDomains = filter.getOptNotDomains();
    if (
      optNotDomains.has(request.sourceHostnameHash) ||
      optNotDomains.has(request.sourceDomainHash)
    ) {
      return false;
    }
  }

  return true;
}

export default function matchNetworkFilter(filter: NetworkFilter, request: Request): boolean {
  return checkOptions(filter, request) && checkPattern(filter, request);
}
