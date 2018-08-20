const { AdBlockClient } = require('ad-block');
const adblocker = require('../adblocker.umd.js');

const types = {
  // maps string (web-ext) to int (FF cpt)
  beacon: 19,
  csp_report: 17,
  font: 14,
  image: 3,
  imageset: 21,
  main_frame: 6,
  media: 15,
  object: 5,
  object_subrequest: 12,
  other: 1,
  ping: 10,
  script: 2,
  stylesheet: 4,
  sub_frame: 7,
  web_manifest: 22,
  websocket: 16,
  xbl: 9,
  xml_dtd: 13,
  xmlhttprequest: 11,
  xslt: 18,
};

function createEngine(lists, resources, options = {}, serialize = false) {
  const engine = new adblocker.FiltersEngine({
    ...options,
    version: 1,
  });

  engine.onUpdateResource([{ filters: resources, checksum: '' }]);
  const serialized = engine.onUpdateFilters(lists.map((list, i) => ({
    asset: `${i}`,
    checksum: '',
    filters: lists[i],
  })), new Set(), serialize);

  return {
    engine,
    serialized,
  };
}


function createBraveClient(lists) {
  const client = new AdBlockClient();
  client.parse(lists.join('\n'));
  return client;
}


module.exports = {
  createEngine,
  createBraveClient,
  types,
};
