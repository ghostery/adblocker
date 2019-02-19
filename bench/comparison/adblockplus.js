/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */

const { URL } = require('url');

const { CombinedMatcher } = require('./adblockpluscore/lib/matcher.js');
const { Filter, RegExpFilter } = require('./adblockpluscore/lib/filterClasses.js');
const { isThirdParty } = require('./adblockpluscore/lib/domain.js');

// Chrome can't distinguish between OBJECT_SUBREQUEST and OBJECT requests.
RegExpFilter.typeMap.OBJECT_SUBREQUEST = RegExpFilter.typeMap.OBJECT;

// Map of content types reported by the browser to the respecitve content types
// used by Adblock Plus. Other content types are simply mapped to OTHER.
const resourceTypes = new Map(
  (function* () {
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
        filters.push(filter);
        matcher.add(filter);
      }
    }

    return new AdBlockPlus(matcher, filters);
  }

  serialize() {
    return [JSON.stringify(this.filters.map(({ text }) => text))];
  }

  deserialize([serialized]) {
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
    const url = new URL(request.url);
    const sourceURL = new URL(request.frameUrl);
    const thirdParty = isThirdParty(url, sourceURL.hostname);
    const filter = this.matcher.matchesAny(
      url.href,
      RegExpFilter.typeMap[resourceTypes.get(request.type) || 'OTHER'],
      sourceURL.hostname,
      thirdParty,
      null,
      false,
    );

    return filter !== null && !filter.text.startsWith('@@');
  }
};
