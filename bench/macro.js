const { parse } = require('tldjs');
const { FilterOptions } = require('ad-block');

const { types, typesToBrave } = require('./utils');

function benchMatchingImpl(match, requests) {
  let dummy = 0;

  for (let i = 0; i < requests.length; i += 1) {
    const request = requests[i];
    if (match({
      cpt: types[request.cpt],
      sourceUrl: request.sourceUrl,
      url: request.url,
    })) {
      dummy += 1;
    }
  }

  return dummy;
}


function benchBraveMatching({ braveEngine, requests }) {
  return benchMatchingImpl(
    ({ cpt, sourceUrl, url }) => braveEngine.matches(
      url,
      typesToBrave[cpt] || FilterOptions.noFilterOption,
      parse(sourceUrl).domain,
    ),
    requests,
  );
}

function benchMatching({ engine, requests }) {
  return benchMatchingImpl(
    req => engine.match(req).match,
    requests,
  );
}

function benchTldsBaseline({ requests }) {
  return benchMatchingImpl(
    ({ url, sourceUrl }) => ((parse(url).domain || '').length + (parse(sourceUrl).domain || '').length) > 0,
    requests,
  );
}

module.exports = {
  benchMatching,
  benchBraveMatching,
  benchTldsBaseline,
};
