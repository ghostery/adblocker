/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const abp = require('abp-filter-parser');
const { getHostname } = require('tldts-experimental');

// This maps webRequest types to DuckDuckGo types
const DDG_OPTIONS = {
  sub_frame: abp.elementTypes.SUBDOCUMENT,
  stylesheet: abp.elementTypes.STYLESHEET,
  image: abp.elementTypes.IMAGE,
  script: abp.elementTypes.SCRIPT,
  xmlhttprequest: abp.elementTypes.XMLHTTPREQUEST,

  // other
  media: abp.elementTypes.OTHER,
  font: abp.elementTypes.OTHER,
  websocket: abp.elementTypes.OTHER,
  other: abp.elementTypes.OTHER,
};


module.exports = class DuckDuckGo {
  static parse(rawLists) {
    const parsed = {};
    abp.parse(rawLists, parsed);
    return new DuckDuckGo(parsed);
  }

  constructor(parsed) {
    this.parsed = parsed;
  }

  match({ url, type, frameUrl }) {
    return abp.matches(this.parsed, url, {
      domain: getHostname(frameUrl),
      elementTypeMask: DDG_OPTIONS[type],
    });
  }
};
