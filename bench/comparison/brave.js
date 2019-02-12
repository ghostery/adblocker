const { AdBlockClient, FilterOptions } = require('ad-block');

// This maps puppeteer types to Brave types
const BRAVE_OPTIONS = {
  // Consider document requests as sub_document. This is because the request
  // dataset does not contain sub_frame or main_frame but only 'document' and
  // different blockers have different behaviours.
  document: FilterOptions.subdocument,
  stylesheet: FilterOptions.stylesheet,
  image: FilterOptions.image,
  media: FilterOptions.media,
  font: FilterOptions.font,
  script: FilterOptions.script,
  xhr: FilterOptions.xmlHttpRequest,
  websocket: FilterOptions.websocket,

  // other
  fetch: FilterOptions.other,
  other: FilterOptions.other,
  eventsource: FilterOptions.other,
  manifest: FilterOptions.other,
  texttrack: FilterOptions.other,
};


module.exports = class Brave {
  static parse(rawLists) {
    const client = new AdBlockClient();
    client.parse(rawLists);
    return new Brave(client);
  }

  constructor(client) {
    this.client = client;
  }

  serialize() {
    return this.client.serialize();
  }

  deserialize(serialized) {
    this.client.deserialize(serialized);
  }

  match(type, { url, sourceDomain }) {
    return this.client.matches(url, BRAVE_OPTIONS[type] || FilterOptions.noFilterOption, sourceDomain);
  }
};
