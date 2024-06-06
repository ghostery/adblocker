/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { StaticNetFilteringEngine } = require('@gorhill/ubo-core/bundle.min.cjs');

let engine = null;

module.exports = class UBlockOrigin {
  static async initialize({ hostsOnly = false } = {}) {
    engine = await StaticNetFilteringEngine.create({ noPSL: hostsOnly });
  }

  static async parse(rawLists) {
    await engine.useLists([ { name: 'easylist', raw: rawLists } ]);
    return new UBlockOrigin();
  }

  async serialize() {
    return engine.serialize();
  }

  async deserialize(serialized) {
    return engine.deserialize(serialized);
  }

  matchRequest({ url, frameUrl, type }) {
    return engine.matchRequest({ url, originURL: frameUrl, type });
  }

  match(details) {
    return this.matchRequest(details) === 1;
  }

  matchDebug(details) {
    return this.matchRequest(details) !== 0 ? engine.toLogData().raw : null;
  }
};
