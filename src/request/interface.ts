import { tokenize } from '../utils';

export interface IRequest {
  url: string;
  tokens: number[];
  hostGD: string;
  hostname: string;

  sourceGD: string;
  sourceHostname: string;

  cpt: number;
}

export function mkRequest({
  url = '',
  hostname = '',
  domain = '',
  sourceHostname = '',
  sourceDomain = '',
  cpt = 6 },
): IRequest {
  return {
    cpt,
    tokens: tokenize(url),

    // SourceUrl
    sourceGD: sourceDomain,
    sourceHostname,

    // Url
    hostGD: domain,
    hostname,
    url: url.toLowerCase(),
  };
}
