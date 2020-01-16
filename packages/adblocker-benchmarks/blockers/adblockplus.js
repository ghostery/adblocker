/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { CombinedMatcher } = require('./adblockpluscore/lib/matcher.js');
const { Filter, RegExpFilter } = require('./adblockpluscore/lib/filterClasses.js');
const { parseURL } = require('./adblockpluscore/lib/url.js');

// Chrome can't distinguish between OBJECT_SUBREQUEST and OBJECT requests.
RegExpFilter.typeMap.OBJECT_SUBREQUEST = RegExpFilter.typeMap.OBJECT;

// Map of content types reported by the browser to the respecitve content types
// used by Adblock Plus. Other content types are simply mapped to OTHER.
const resourceTypes = new Map(
  (function* resourceTypesGenerator() {
    for (const type in RegExpFilter.typeMap) yield [type.toLowerCase(), type];

    yield ['sub_frame', 'SUBDOCUMENT'];

    // Treat navigator.sendBeacon() the same as <a ping>, it's essentially the
    // same concept - merely generalized.
    yield ['beacon', 'PING'];

    // Treat <img srcset> and <picture> the same as other images.
    yield ['imageset', 'IMAGE'];
  }()),
);

module.exports = class AdBlockPlus {
  static parse(rawLists) {
    const lines = rawLists.split(/\n/g);

    const filters = [];
    const matcher = new CombinedMatcher();

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i].trim();
      if (line.length !== 0 && line[0] !== '!') {
        const filter = Filter.fromText(line);
        if (filter.type === 'blocking' || filter.type === 'whitelist') {
          filters.push(filter);
          matcher.add(filter);
        }
      }
    }

    return new AdBlockPlus(matcher, filters);
  }

  serialize() {
    return JSON.stringify(this.filters.map(({ text }) => text));
  }

  deserialize(serialized) {
    const lines = JSON.parse(serialized);
    const filters = [];
    const matcher = new CombinedMatcher();

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const filter = Filter.fromText(line);
      filters.push(filter);
      matcher.add(filter);
    }

    this.matcher = matcher;
    this.filters = filters;
  }

  constructor(matcher, filters) {
    this.matcher = matcher;
    this.filters = filters;
  }

  match(request) {
    const url = parseURL(request.url);
    const sourceURL = parseURL(request.frameUrl);
    const filter = this.matcher.matchesAny(
      url,
      RegExpFilter.typeMap[resourceTypes.get(request.type) || 'OTHER'],
      sourceURL.hostname,
      null,
      false,
    );

    return filter !== null && !filter.text.startsWith('@@');
  }
};
