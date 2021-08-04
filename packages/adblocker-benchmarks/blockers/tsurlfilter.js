/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {
  Engine,
  Request,
  RequestType,
  RuleStorage,
  StringRuleList,
  setConfiguration,
} = require('@adguard/tsurlfilter/dist/bundle.min.cjs');

const requestTypes = new Map([
  [ 'sub_frame', RequestType.Subdocument ],
  [ 'script', RequestType.Script ],
  [ 'stylesheet', RequestType.Stylesheet ],
  [ 'image', RequestType.Image ],
  [ 'xmlhttprequest', RequestType.XmlHttpRequest ],
  [ 'media', RequestType.Media ],
  [ 'font', RequestType.Font ],
  [ 'other', RequestType.Other ],
]);

module.exports = class TSUrlFilter {
  static async initialize() {
    setConfiguration({
      engine: 'extension',
      version: '1.0.0',
      verbose: true,
    });
  }

  static async parse(rawLists) {
    // The first argument is the list ID and must be unique
    const list = new StringRuleList(1, rawLists);
    const ruleStorage = new RuleStorage([ list ]);
    return new TSUrlFilter(new Engine(ruleStorage));
  }

  constructor(engine) {
    this.engine = engine;
  }

  match({ url, frameUrl, type }) {
    const requestType = requestTypes.get(type) || RequestType.Other;
    const request = new Request(url, frameUrl, requestType);
    const result = this.engine.matchRequest(request);
    const basicResult = result.getBasicResult();
    return basicResult !== null && !basicResult.whitelist;
  }
};
