// @ts-ignore
import { parse } from 'tldjs';

import { mkRequest } from './interface';

export interface IRawRequest {
  url: string;
  sourceUrl: string;
  cpt: number;
}

export function processRawRequest(request: IRawRequest) {
  // Extract hostname
  const url = request.url.toLowerCase();
  const { hostname, domain } = parse(url);

  // Process source url
  let sourceUrl = request.sourceUrl;
  let sourceHostname = '';
  let sourceDomain = '';

  if (sourceUrl) {
    // It can happen when source is not a valid URL, then we simply
    // leave `sourceHostname` and `sourceGD` as empty strings to allow
    // some filter matching on the request URL itself.
    sourceUrl = sourceUrl.toLowerCase();
    const sourceUrlParts = parse(sourceUrl);
    sourceHostname = sourceUrlParts.hostname || '';
    sourceDomain = sourceUrlParts.domain || '';
  }

  // Wrap informations needed to match the request
  return mkRequest({
    cpt: request.cpt,

    // SourceUrl
    sourceDomain,
    sourceHostname,

    // Url
    domain,
    hostname,
    url,
  });
}
