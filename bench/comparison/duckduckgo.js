const abp = require('abp-filter-parser');

const DDG_OPTIONS = {
  script: abp.elementTypes.SCRIPT,
  image: abp.elementTypes.IMAGE,
  stylesheet: abp.elementTypes.STYLESHEET,
  object: abp.elementTypes.OBJECT,
  xhr: abp.elementTypes.XMLHTTPREQUEST,
  objectSubrequest: abp.elementTypes.OBJECTSUBREQUEST,
  subdocument: abp.elementTypes.SUBDOCUMENT,
  document: abp.elementTypes.DOCUMENT,
  other: abp.elementTypes.OTHER,
};


module.exports = (rawLists) => {
  const parsed = {};
  abp.parse(rawLists, parsed);

  return ({ url, type, sourceDomain }) => abp.matches(parsed, url, {
    domain: sourceDomain,
    elementTypeMask: DDG_OPTIONS[type],
  });
};
