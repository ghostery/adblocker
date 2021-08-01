/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { FilteringContext, pslInit, restart } = require('ubo-snfe/bundle.min.cjs');

class MockStorage {
  constructor(serialized) {
    this.map = new Map(serialized);
  }

  async put(assetKey, content) {
    this.map.set(assetKey, content);
    return ({ assetKey, content });
  }

  async get(assetKey) {
    return ({ assetKey, content: this.map.get(assetKey) });
  }

  *[Symbol.iterator]() {
    yield* this.map;
  }
}

module.exports = class UBlockOrigin {
  static async initialize() {
    pslInit();
  }

  static async parse(rawLists) {
    return new UBlockOrigin(restart([ { name: 'easylist', raw: rawLists } ]),
                            new FilteringContext());
  }

  constructor(engine, context) {
    this.engine = engine;
    this.context = context;
  }

  async serialize() {
    let storage = new MockStorage();
    await this.engine.toSelfie(storage, 'path');
    return JSON.stringify([...storage]);
  }

  async deserialize(serialized) {
    let storage = new MockStorage(JSON.parse(serialized));
    await this.engine.fromSelfie(storage, 'path');
  }

  match({ url, frameUrl, type }) {
    this.context.setDocOriginFromURL(frameUrl);
    this.context.setURL(url);
    this.context.setType(type);

    return this.engine.matchRequest(this.context) === 1;
  }
};
