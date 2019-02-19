const { URL } = require('url');

module.exports = class Url {
  static parse() {
    return new Url();
  }

  match({ url, frameUrl }) {
    return new URL(url) && new URL(frameUrl);
  }
};
