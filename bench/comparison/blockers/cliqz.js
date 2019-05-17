/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require('path');

const tldts = require('tldts');

const { FiltersEngine, makeRequest } = require(path.resolve(__dirname, '../../../'));


module.exports = class Cliqz {
  static parse(rawLists) {
    return new Cliqz(FiltersEngine.parse(rawLists, { loadCosmeticFilters: false }));
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
