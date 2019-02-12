const { CombinedMatcher } = require('./adblockpluscore/lib/matcher.js');
const { Filter, RegExpFilter } = require('./adblockpluscore/lib/filterClasses.js');

// This maps puppeteer types to Adblock Plus types
const TYPE_MAP = {
  // Consider document requests as sub_document. This is because the request
  // dataset does not contain sub_frame or main_frame but only 'document' and
  // different blockers have different behaviours.
  document: RegExpFilter.typeMap.SUBDOCUMENT,
  stylesheet: RegExpFilter.typeMap.STYLESHEET,
  image: RegExpFilter.typeMap.IMAGE,
  media: RegExpFilter.typeMap.MEDIA,
  font: RegExpFilter.typeMap.FONT,
  script: RegExpFilter.typeMap.SCRIPT,
  xhr: RegExpFilter.typeMap.XMLHTTPREQUEST,
  websocket: RegExpFilter.typeMap.WEBSOCKET,

  // other
  fetch: RegExpFilter.typeMap.OTHER,
  other: RegExpFilter.typeMap.OTHER,
  eventsource: RegExpFilter.typeMap.OTHER,
  manifest: RegExpFilter.typeMap.OTHER,
  texttrack: RegExpFilter.typeMap.OTHER,
};

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

  match(type, { url, sourceDomain, domain }) {
    const match = this.matcher.matchesAny(
      url,
      TYPE_MAP[type],
      sourceDomain,
      sourceDomain !== domain,
      null,
      false,
    );
    return match !== null && !match.text.startsWith('@@');
  }
};
