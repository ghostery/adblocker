const { AdBlockClient, FilterOptions } = require('ad-block');
const { getHostname } = require('tldts');

// This maps webRequest types to Brave types
const BRAVE_OPTIONS = {
  sub_frame: FilterOptions.subdocument,
  stylesheet: FilterOptions.stylesheet,
  image: FilterOptions.image,
  media: FilterOptions.media,
  font: FilterOptions.font,
  script: FilterOptions.script,
  xmlhttprequest: FilterOptions.xmlHttpRequest,
  websocket: FilterOptions.websocket,
  other: FilterOptions.other,
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
    return [this.client.serialize()];
  }

  deserialize([serialized]) {
    this.client.deserialize(serialized);
  }

  match({ type, url, frameUrl }) {
    return this.client.matches(
      url,
      BRAVE_OPTIONS[type] || FilterOptions.noFilterOption,
      getHostname(frameUrl),
    );
  }
};
