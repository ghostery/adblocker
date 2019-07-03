/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { Engine } = require('adblock-rs');

module.exports = class Brave {
  static parse(rawLists) {
    return new Brave(new Engine(rawLists.split(/[\n\r]+/g)));
  }

  constructor(client) {
    this.client = client;
  }

  serialize() {
    return this.client.serialize();
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
