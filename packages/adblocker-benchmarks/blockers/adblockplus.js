/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { contentTypes, CombinedMatcher, Filter, parseURL } = require('adblockpluscore/lib/bundle.min.cjs');

// Map of content types reported by the browser to the respecitve content types
// used by Adblock Plus. Other content types are simply mapped to OTHER.
const resourceTypes = new Map(
  (function* resourceTypesGenerator() {
    for (const type in contentTypes) yield [type.toLowerCase(), type];

    yield ['sub_frame', 'SUBDOCUMENT'];

    // Treat navigator.sendBeacon() the same as <a ping>, it's essentially the
    // same concept - merely generalized.
    yield ['beacon', 'PING'];

    // Treat <img srcset> and <picture> the same as other images.
    yield ['imageset', 'IMAGE'];
  }()),
);

module.exports = class AdblockPlus {
  static parse(rawLists) {
    // Clear internal cache
    Filter.knownFilters.clear();

    const lines = rawLists.split(/\n/g);

    const filters = [];
    const matcher = new CombinedMatcher();

    for (let line of lines) {
      line = Filter.normalize(line);

      if (line) {
        const filter = Filter.fromText(line);
        if (filter.type === 'blocking' || filter.type === 'allowing') {
          filters.push(filter);
          matcher.add(filter);
        }
      }
    }

    return new AdblockPlus(matcher, filters);
  }

  serialize() {
    return JSON.stringify(this.filters.map(({ text }) => text));
  }

  deserialize(serialized) {
    // Clear internal cache
    Filter.knownFilters.clear();

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
    const text = this.matchDebug(request);
    return text !== null && !text.startsWith('@@');
  }

  matchDebug(request) {
    const url = parseURL(request.url);
    const sourceURL = parseURL(request.frameUrl);
    const filter = this.matcher.match(
      url,
      contentTypes[resourceTypes.get(request.type) || 'OTHER'],
      sourceURL.hostname,
      null,
      false,
    );

    return filter === null ? null : filter.text;
  }
};
