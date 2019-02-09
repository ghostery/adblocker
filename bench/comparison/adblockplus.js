const { CombinedMatcher } = require('./adblockpluscore/lib/matcher.js');
const { Filter } = require('./adblockpluscore/lib/filterClasses.js');

const TYPE_MAP = {
  other: 1,
  script: 2,
  image: 4,
  stylesheet: 8,
  object: 16,
  sub_frame: 32,
  main_frame: 64,
  websocket: 128,
  webrtc: 256,
  csp_report: 512,
  xbl: 1,
  ping: 1024,
  xmlhttprequest: 2048,
  xhr: 2048,
  dtd: 1,
  media: 16384,
  font: 32768,
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

  match({
    url, rawType, sourceDomain, domain,
  }) {
    const match = this.matcher.matchesAny(url, TYPE_MAP[rawType], sourceDomain, sourceDomain !== domain, null, false);
    return (match !== null && !match.text.startsWith('@@'));
  }
};
