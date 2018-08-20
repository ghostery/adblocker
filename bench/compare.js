const { FilterOptions } = require('ad-block');
const { getHostname } = require('tldjs');
const {
  types, typesToBrave, createBraveClient, createEngine, loadRequests,
} = require('./utils');

function compareResults(lists, resources) {
  const { engine } = createEngine(lists, resources, {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
    optimizeAOT: true,
  });

  const braveEngine = createBraveClient(lists);

  const requests = loadRequests();

  const getBraveFilters = ({ cpt, sourceUrl, url }) => braveEngine.findMatchingFilters(
    url,
    typesToBrave[cpt] || FilterOptions.noFilterOption,
    getHostname(sourceUrl),
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
