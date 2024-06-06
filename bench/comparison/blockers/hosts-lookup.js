/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { FastHostsLookup } = require('fast-hosts-lookup');

const { extractHostname } = require('./utils.js');

// This is an implementation of the most basic hosts-based blocking.
module.exports = class HostsLookup {
  static parse(rawLists) {
    return new HostsLookup(rawLists);
  }

  constructor(rawLists) {
    this.lookup = new FastHostsLookup();

    for (let line of rawLists.split(/\n/g)) {
      line = line.trim();

      if (line[line.length - 1] === '^') {
        let exception = false;

        if (line[0] === '@' && line[1] === '@') {
          exception = true;
          line = line.substr(2);
        }

        if (line[0] === '|' && line[1] === '|') {
          const hostname = line.slice(2, -1);
          if (exception) {
            this.lookup.addException(hostname);
          } else {
            this.lookup.add(hostname);
          }
        }
      }
    }
  }

  match({ url }) {
    return this.lookup.has(extractHostname(url));
  }
};
