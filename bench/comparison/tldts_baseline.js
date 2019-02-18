const { parse } = require('tldts');

module.exports = class Tldts {
  static parse() {
    return new Tldts();
  }

  match({ url, frameUrl }) {
    return parse(url) && parse(frameUrl);
  }
};
