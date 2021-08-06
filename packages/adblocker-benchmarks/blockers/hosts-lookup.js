/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { FastHostsLookup } = require('fast-hosts-lookup');

const HOSTNAME_RE = /^[^:]+:(?:\/\/(?:[^\/]*@)?(\[[^\]]*\]|[^:\/]+))?/;
function extractHostname(url) {
  const [, hostname] = HOSTNAME_RE.exec(url) || [, ''];
  return hostname;
}

// This is an implementation of the most basic hosts-based blocking.
module.exports = class HostsLookup {
  static parse(rawLists) {
    return new HostsLookup(rawLists);
  }

  constructor(rawLists) {
    this.lookup = new FastHostsLookup();

    for (let line of rawLists.split(/\n/g)) {
      if (line[0] === '|' && line[1] === '|' && line[line.length - 1] === '^') {
        this.lookup.add(line.slice(2, -1));
      }
    }
  }

  match({ url }) {
    return this.lookup.has(extractHostname(url));
  }
};
