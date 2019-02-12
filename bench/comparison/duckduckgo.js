const abp = require('abp-filter-parser');

// This maps puppeteer types to DuckDuckGo types
const DDG_OPTIONS = {
  // Consider document requests as sub_document. This is because the request
  // dataset does not contain sub_frame or main_frame but only 'document' and
  // different blockers have different behaviours.
  document: abp.elementTypes.SUBDOCUMENT,
  stylesheet: abp.elementTypes.STYLESHEET,
  image: abp.elementTypes.IMAGE,
  script: abp.elementTypes.SCRIPT,
  xhr: abp.elementTypes.XMLHTTPREQUEST,

  // other
  media: abp.elementTypes.OTHER,
  font: abp.elementTypes.OTHER,
  websocket: abp.elementTypes.OTHER,
  fetch: abp.elementTypes.OTHER,
  other: abp.elementTypes.OTHER,
  eventsource: abp.elementTypes.OTHER,
  manifest: abp.elementTypes.OTHER,
  texttrack: abp.elementTypes.OTHER,
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

  match(type, { url, sourceDomain }) {
    return abp.matches(this.parsed, url, {
      domain: sourceDomain,
      elementTypeMask: DDG_OPTIONS[type],
    });
  }
};
