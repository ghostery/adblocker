const { getHostname } = require('tldts');

const { types } = require('./utils');


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


function benchMatching({ engine, requests }) {
  return benchMatchingImpl(
    req => engine.match(req).match,
    requests,
  );
}


function benchTldsBaseline({ requests }) {
  return benchMatchingImpl(
    ({ url, sourceUrl }) => ((getHostname(url || '') || '').length + (getHostname(sourceUrl || '') || '').length) > 0,
    requests,
  );
}


module.exports = {
  benchMatching,
  benchTldsBaseline,
};
