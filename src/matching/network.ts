import { NetworkFilter } from '../parsing/network-filter';
import Request from '../request';
import { fastStartsWith } from '../utils';

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
  return request.getUrl().indexOf(filter.getFilter()) !== -1;
}

// pattern|
function checkPatternRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  return request.getUrl().endsWith(filter.getFilter());
}

// |pattern
function checkPatternLeftAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  return fastStartsWith(request.getUrl(), filter.getFilter());
}

// |pattern|
function checkPatternLeftRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  return request.getUrl() === filter.getFilter();
}

// pattern*^
function checkPatternRegexFilter(
  filter: NetworkFilter,
  request: Request,
  startFrom: number = 0,
): boolean {
  let url = request.getUrl();
  if (startFrom > 0) {
    url = url.slice(startFrom);
  }
  return filter.getRegex().test(url);
}

// ||pattern*^
function checkPatternHostnameAnchorRegexFilter(filter: NetworkFilter, request: Request): boolean {
  const url = request.getUrl();
  const hostname = request.getHostname();
  if (isAnchoredByHostname(filter.getHostname(), hostname)) {
    return checkPatternRegexFilter(
      filter,
      request,
      url.indexOf(hostname) + filter.getHostname().length,
    );
  }

  return false;
}

// ||pattern|
function checkPatternHostnameRightAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  if (isAnchoredByHostname(filter.getHostname(), request.getHostname())) {
    // Since this is not a regex, the filter pattern must follow the hostname
    // with nothing in between. So we extract the part of the URL following
    // after hostname and will perform the matching on it.
    const urlAfterHostname = getUrlAfterHostname(request.getUrl(), filter.getHostname());

    // Since it must follow immediatly after the hostname and be a suffix of
    // the URL, we conclude that filter must be equal to the part of the
    // url following the hostname.
    return filter.getFilter() === urlAfterHostname;
  }

  return false;
}

// ||pattern
function checkPatternHostnameAnchorFilter(filter: NetworkFilter, request: Request): boolean {
  if (isAnchoredByHostname(filter.getHostname(), request.getHostname())) {
    // Since this is not a regex, the filter pattern must follow the hostname
    // with nothing in between. So we extract the part of the URL following
    // after hostname and will perform the matching on it.
    const urlAfterHostname = getUrlAfterHostname(request.getUrl(), filter.getHostname());
    return fastStartsWith(urlAfterHostname, filter.getFilter());
  }

  return false;
}

// ||pattern$fuzzy
function checkPatternHostnameAnchorFuzzyFilter(filter: NetworkFilter, request: Request) {
  if (isAnchoredByHostname(filter.getHostname(), request.getHostname())) {
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
    } else if (filter.isRightAnchor()) {
      return checkPatternHostnameRightAnchorFilter(filter, request);
    } else if (filter.isFuzzy()) {
      return checkPatternHostnameAnchorFuzzyFilter(filter, request);
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
  // This is really cheap and should be done first
  if (!filter.isCptAllowed(request.getCpt())) {
    return false;
  }

  // Url endpoint
  const isFirstParty = request.isFirstParty();

  // Check option $third-party
  // source domain and requested domain must be different
  if (!filter.firstParty() && isFirstParty) {
    return false;
  }

  // $~third-party
  // source domain and requested domain must be the same
  if (!filter.thirdParty() && !isFirstParty) {
    return false;
  }

  // URL must be among these domains to match
  if (filter.hasOptDomains()) {
    const optDomains = filter.getOptDomains();
    if (
      !optDomains.has(request.getSourceHostname()) &&
      !optDomains.has(request.getSourceDomain())
    ) {
      return false;
    }
  }

  // URL must not be among these domains to match
  if (filter.hasOptNotDomains()) {
    const optNotDomains = filter.getOptNotDomains();
    if (
      optNotDomains.has(request.getSourceHostname()) ||
      optNotDomains.has(request.getSourceDomain())
    ) {
      return false;
    }
  }

  return true;
}

export default function matchNetworkFilter(filter: NetworkFilter, request: Request): boolean {
  return checkOptions(filter, request) && checkPattern(filter, request);
}
