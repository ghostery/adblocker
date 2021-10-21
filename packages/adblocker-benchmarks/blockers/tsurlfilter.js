/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {
  DnsEngine,
  Engine,
  Request,
  RequestType,
  RuleStorage,
  StringRuleList,
  setConfiguration,
} = require('@adguard/tsurlfilter/dist/tsurlfilter.umd.min.js');

const { extractHostname } = require('./utils.js');

const requestTypes = new Map([
  [ 'sub_frame', RequestType.Subdocument ],
  [ 'script', RequestType.Script ],
  [ 'stylesheet', RequestType.Stylesheet ],
  [ 'image', RequestType.Image ],
  [ 'xmlhttprequest', RequestType.XmlHttpRequest ],
  [ 'media', RequestType.Media ],
  [ 'font', RequestType.Font ],
  [ 'ping', RequestType.Ping ],
  [ 'other', RequestType.Other ],
]);

module.exports = class TSUrlFilter {
  static hostsOnly = false;

  static async initialize({ hostsOnly }) {
    TSUrlFilter.hostsOnly = hostsOnly;

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
    const engine = TSUrlFilter.hostsOnly ?
                     new DnsEngine(ruleStorage) :
                     new Engine(ruleStorage);
    return new TSUrlFilter(engine);
  }

  constructor(engine) {
    this.engine = engine;
  }

  match({ url, frameUrl, type }) {
    const result = TSUrlFilter.hostsOnly ?
                     this.matchHostname(url) :
                     this.matchRequest({ url, frameUrl, type });
    return result !== null && !result.whitelist;
  }

  matchHostname(url) {
    const hostname = extractHostname(url);
    const result = this.engine.match(hostname);
    return result.basicRule;
  }

  matchRequest({ url, frameUrl, type }) {
    const requestType = requestTypes.get(type) || RequestType.Other;
    const request = new Request(url, frameUrl, requestType);
    const result = this.engine.matchRequest(request);
    return result.getBasicResult();
  }

  matchDebug({ url, frameUrl, type }) {
    const result = TSUrlFilter.hostsOnly ?
                     this.matchHostname(url) :
                     this.matchRequest({ url, frameUrl, type });
    return result === null ? null : result.ruleText;
  }
};
