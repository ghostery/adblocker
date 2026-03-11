/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  CompatibilityTypes,
  DnsEngine,
  Engine,
  Request,
  RequestType,
  RuleStorage,
  StringRuleList,
  setConfiguration,
} from '@adguard/tsurlfilter';
import { extractHostname } from './utils.js';

const requestTypes = new Map([
  ['sub_frame', RequestType.Subdocument],
  ['script', RequestType.Script],
  ['stylesheet', RequestType.Stylesheet],
  ['image', RequestType.Image],
  ['xmlhttprequest', RequestType.XmlHttpRequest],
  ['media', RequestType.Media],
  ['font', RequestType.Font],
  ['ping', RequestType.Ping],
  ['other', RequestType.Other],
]);

export default class TSUrlFilter {
  static hostsOnly = false;

  static async initialize({ hostsOnly }) {
    TSUrlFilter.hostsOnly = hostsOnly;

    setConfiguration({
      engine: 'extension',
      version: '1.0.0',
      verbose: true,
      compatibility: hostsOnly
        ? CompatibilityTypes.Extension | CompatibilityTypes.Dns
        : CompatibilityTypes.Extension,
    });
  }

  static async parse(rawLists) {
    // The first argument is the list ID and must be unique
    const list = new StringRuleList(1, rawLists);
    if (TSUrlFilter.hostsOnly) {
      const ruleStorage = new RuleStorage([list]);
      const engine = new DnsEngine(ruleStorage);
      return new TSUrlFilter(engine, ruleStorage);
    }

    const engine = Engine.createSync({
      filters: [{ id: 1, content: rawLists }],
    });
    return new TSUrlFilter(engine);
  }

  constructor(engine, ruleStorage = null) {
    this.engine = engine;
    this.ruleStorage = ruleStorage;
  }

  match({ url, frameUrl, type }) {
    const result = TSUrlFilter.hostsOnly
      ? this.matchHostname(url)
      : this.matchRequest({ url, frameUrl, type });
    return result !== null && (typeof result.isAllowlist !== 'function' || !result.isAllowlist());
  }

  matchHostname(url) {
    const hostname = extractHostname(url);
    const result = this.engine.match(hostname);
    return result.basicRule || result.hostRules[0] || null;
  }

  matchRequest({ url, frameUrl, type }) {
    const requestType = requestTypes.get(type) || RequestType.Other;
    const request = new Request(url, frameUrl, requestType);
    const result = this.engine.matchRequest(request);
    return result.getBasicResult();
  }

  matchDebug({ url, frameUrl, type }) {
    const result = TSUrlFilter.hostsOnly
      ? this.matchHostname(url)
      : this.matchRequest({ url, frameUrl, type });
    return result === null ? null : this.getRuleText(result);
  }

  getRuleText(rule) {
    const ruleText = rule.getText();
    if (ruleText !== undefined) {
      return ruleText;
    }

    if (TSUrlFilter.hostsOnly) {
      return this.ruleStorage.retrieveRuleText(rule.getFilterListId(), rule.getIndex());
    }

    return this.engine.retrieveRuleText(rule.getFilterListId(), rule.getIndex());
  }
}
