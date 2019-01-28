const fs = require('fs');
const adblocker = require('../dist/adblocker.cjs.js');

function createEngine(lists, resources, options = {}, serialize = false) {
  const engine = adblocker.FiltersEngine.parse(
    lists.join('\n'),
    options,
  );

  engine.updateResources(resources, '');

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
  NANOSECS_PER_SEC,
  loadRequests,
  getFiltersFromLists,
};
