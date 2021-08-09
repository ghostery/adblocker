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
    await engine.deserialize(serialized);
  }

  match({ url, frameUrl, type }) {
    return engine.matchRequest({ url, originURL: frameUrl, type }) === 1;
  }
};
