/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { Engine, FilterSet } = require('adblock-rs');

module.exports = class Brave {
  static parse(rawLists) {
    const filterSet = new FilterSet(false);
    filterSet.addFilters(rawLists.split(/[\n\r]+/g));
    return new Brave(new Engine(filterSet, true));
  }

  constructor(client) {
    this.client = client;
  }

  serialize() {
    return this.client.serializeCompressed();
  }

  deserialize(serialized) {
    this.client.deserialize(serialized);
  }

  match({ type, url, frameUrl }) {
    return this.client.check(
      url,
      frameUrl,
      type,
    );
  }
};
