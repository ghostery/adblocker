/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { FiltersEngine, Request } = require('@cliqz/adblocker/dist/adblocker.umd.min.js');

module.exports = class Cliqz {
  static parse(rawLists, enableCompression) {
    return new Cliqz(FiltersEngine.parse(rawLists, {
      enableCompression,
      integrityCheck: false,
      loadCosmeticFilters: false,
    }));
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
    return this.engine.match(Request.fromRawDetails({
      url,
      sourceUrl: frameUrl,
      type,
    })).match;
  }
};
