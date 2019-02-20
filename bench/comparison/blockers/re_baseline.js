

const HOSTNAME_RE = /^(?:[^:]+:)(?:\/\/(?:[^\/]*@)?(\[[^\]]*\]|[^:\/]+))?/;
function extractHostname(url) {
  const [, hostname] = HOSTNAME_RE.exec(url) || [];
  return hostname;
}


module.exports = class Re {
  static parse() {
    return new Re();
  }

  match({ url, frameUrl }) {
    return extractHostname(url) && extractHostname(frameUrl);
  }
};
