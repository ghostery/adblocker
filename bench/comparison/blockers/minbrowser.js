/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {
  parse,
  matches,
  getUrlHost,
} = require('./min/abp-filter-parser');

// This maps webRequest types to MinBrowser types
const MIN_OPTIONS = {
  script: 'script',
  image: 'image',
  stylesheet: 'stylesheet',
  sub_frame: 'subdocument',
  xmlhttprequest: 'xmlhttprequest',
  websocket: 'websocket',

  // other
  media: 'other',
  font: 'other',
  other: 'other',
};

module.exports = class MinBrowser {
  static parse(rawLists) {
    const parsed = {};
    parse(rawLists, parsed, null, { async: false });
    return new MinBrowser(parsed);
  }

  constructor(parsed) {
    this.parsed = parsed;
  }

  match({ url, type, frameUrl }) {
    return matches(this.parsed, url, {
      domain: getUrlHost(frameUrl),
      elementType: MIN_OPTIONS[type],
    });
  }
};
