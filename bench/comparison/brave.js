const { AdBlockClient, FilterOptions } = require('ad-block');

const BRAVE_OPTIONS = {
  script: FilterOptions.script,
  image: FilterOptions.image,
  stylesheet: FilterOptions.stylesheet,
  object: FilterOptions.object,
  xhr: FilterOptions.xmlHttpRequest,
  xmlHttpRequest: FilterOptions.xmlHttpRequest,
  objectSubrequest: FilterOptions.objectSubrequest,
  subdocument: FilterOptions.subdocument,
  document: FilterOptions.document,
  other: FilterOptions.other,
  collapse: FilterOptions.collapse,
  ping: FilterOptions.ping,
  popup: FilterOptions.popup,
  font: FilterOptions.font,
  media: FilterOptions.media,
  webrtc: FilterOptions.webrtc,
  websocket: FilterOptions.websocket,
};

module.exports = (rawLists) => {
  const client = new AdBlockClient();
  client.parse(rawLists);

  return ({ type, url, sourceDomain }) => client.matches(url, BRAVE_OPTIONS[type] || FilterOptions.noFilterOption, sourceDomain);
};
