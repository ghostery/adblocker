const fs = require('fs');
const adblocker = require('../dist/adblocker.umd.min.js');

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
  engine.onUpdateFilters(lists.map((list, i) => ({
    asset: `${i}`,
    checksum: '',
    filters: lists[i],
  })), new Set());

  return {
    engine,
    serialized: serialize ? engine.serialize() : undefined,
  };
}


const NANOSECS_PER_SEC = 1e9;

function loadRequests() {
  const requestsPath = process.argv[process.argv.length - 1];
  return fs.readFileSync(requestsPath, { encoding: 'utf-8' })
    .split(/\n/g)
    .map((line) => {
      try { return JSON.parse(line); } catch (ex) { return null; }
    })
    .filter(r => r !== null);
}


function getFiltersFromLists(lists) {
  const filters = [];

  for (let i = 0; i < lists.length; i += 1) {
    const splitted = lists[i].split(/\n/g);
    for (let j = 0; j < splitted.length; j += 1) {
      filters.push(splitted[j]);
    }
  }

  return filters;
}


module.exports = {
  createEngine,
  types,
  NANOSECS_PER_SEC,
  loadRequests,
  getFiltersFromLists,
};
