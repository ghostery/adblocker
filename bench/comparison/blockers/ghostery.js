const path = require('path');

const tldts = require('tldts');

const { FiltersEngine, makeRequest } = require(path.resolve(__dirname, '../../../'));


module.exports = class Ghostery {
  static parse(rawLists) {
    return new Ghostery(FiltersEngine.parse(rawLists, { loadCosmeticFilters: false }));
  }

  constructor(engine) {
    this.engine = engine;
  }

  serialize() {
    return this.engine.serialize();
  }

  deserialize(serialized) {
    this.engine = FiltersEngine.deserialize(serialized);
  }

  match({ url, frameUrl, type }) {
    return this.engine.match(makeRequest({
      url,
      sourceUrl: frameUrl,
      type,
    }, tldts.parse)).match;
  }
};
