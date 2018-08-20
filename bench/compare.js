const { FilterOptions } = require('ad-block');
const { parse } = require('tldjs');
const { types, typesToBrave } = require('./utils');

function compareResults(engine, braveEngine, requests) {
  const getBraveFilters = ({ cpt, sourceUrl, url }) => braveEngine.findMatchingFilters(
    url,
    typesToBrave[cpt] || FilterOptions.noFilterOption,
    parse(sourceUrl).domain,
  );

  const getFilters = (req) => {
    const {
      match, exception, filter,
    } = engine.match(req);
    return {
      matches: match,
      matchingFilter: match ? filter : undefined,
      matchingExceptionFilter: exception ? filter : undefined,
    };
  };

  for (let i = 0; i < requests.length; i += 1) {
    const request = requests[i % requests.length];
    if (request.sourceUrl === undefined) { continue; }
    const requestInfo = {
      cpt: types[request.cpt],
      sourceUrl: request.sourceUrl,
      url: request.url,
    };

    const match = getFilters(requestInfo);
    const braveMatch = getBraveFilters(requestInfo);

    if (match.matches !== braveMatch.matches) {
      console.log('Mismatch', {
        ...requestInfo,
        match,
        braveMatch,
      });
    }
  }
}

module.exports = {
  compareResults,
};
