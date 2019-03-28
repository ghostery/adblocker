const adblocker = require('../');

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
  getFiltersFromLists,
};
