import CosmeticFilter from '../types/cosmetics';
import NetworkFilter from '../types/filter';

function isAscii(str: string) {
    for (let i = 0; i < str.length; i += 1) {
      if (str.charCodeAt(i) > 255) {
        return false;
      }
    }
    return true;
}

export function convertCosmetics(cosmetics: CosmeticFilter) {
  if (cosmetics.isScriptBlock()) {
    return null;
  }

  if (cosmetics.isScriptInject()) {
    return null;
  }

  const trigger = {};

  if (cosmetics.hasHostnames()) {
    const domains: string[] = [];
    const notDomains: string[] = [];

    cosmetics.getHostnames().forEach((hostname) => {
      if (isAscii(hostname)) {
        if (hostname.indexOf('~') === 0) {
          notDomains.push('*' + hostname.substr(1).toLowerCase());
        } else {
          domains.push('*' + hostname.toLowerCase());
        }
      }
    });

    if (domains.length > 0 && notDomains.length > 0) {
      return null;
    }

    if (domains.length > 0) {
      trigger['if-domain'] = domains;
    }

    if (notDomains.length > 0) {
      trigger['unless-domain'] = notDomains;
    }
  }

  trigger['url-filter'] = '.*';

  return {
    action: {
      selector: cosmetics.getSelector(),
      type: 'css-display-none',
    },
    trigger,
  };
}

export function convertFilter(filter: NetworkFilter) {
  if (filter.isRedirect()) {
    return null;
  }

  if (filter.isRightAnchor()) {
    return null;
  }

  if (filter.isLeftAnchor()) {
    return null;
  }

  const trigger = {};

  // url-filter
  let urlFilter = '';
  if (filter.isPlain) {
    if (filter.hasHostname() && isAscii(filter.getHostname())) {
      urlFilter += '(.*)?' + filter.getHostname().toLowerCase() + '/';
    } else {
      return null;
    }
  }

  // Handle regex
  let str = filter.getFilter();

  // Escape special regex characters: |.$+?{}()[]\
  str = str.replace(/([|.$+?{}()[\]\\])/g, '\\$1');
  // * can match anything
  str = str.replace(/\*/g, '.*');
  // ^ can match any separator or the end of the pattern
  str = str.replace(/\^/g, '[,+|#/$?&;!*()]');

  urlFilter += str;

  // url-filter cannot be an empty string
  if (urlFilter === '') {
    trigger['url-filter'] = '.*';
  } else {
    trigger['url-filter'] = urlFilter;
  }

  // url-filter-is-case-sensitive
  trigger['url-filter-is-case-sensitive'] = filter.matchCase();

  // if-domain unless-domain
  // prepend a '*' before each domain to also match sub-domains
  if (filter.hasOptDomains() && filter.hasOptNotDomains()) {
    return null;
  } else if (filter.hasOptDomains()) {
    trigger['if-domain'] = [...filter.getOptDomains()].filter(isAscii).map(d => '*' + d.toLowerCase());
  } else if (filter.hasOptNotDomains()) {
    trigger['unless-domain'] = [...filter.getOptNotDomains()].filter(isAscii).map(d => '*' + d.toLowerCase());
  }

  // resource-type
  // NOTE - we currently do not support 'document' filters
  if (!filter.fromAny()) {
    const resourceTypes: string[] = [];
    if (filter.fromImage()) {
      resourceTypes.push('image');
    }
    if (filter.fromStylesheet()) {
      resourceTypes.push('style-sheet');
    }
    if (filter.fromScript()) {
      resourceTypes.push('script');
    }
    if (filter.fromFont()) {
      resourceTypes.push('font');
    }
    if (filter.fromMedia()) {
      resourceTypes.push('media');
    }
    if (filter.fromXmlHttpRequest()) {
      // - raw (Any untyped load, such as XMLHttpRequest)
      // TODO - investigate other types that could fit in 'raw'
      resourceTypes.push('raw');
    }
    // NOTE - currently not supported
    // if (filter.fromPopup()) {
    //   resourceTypes.push('popup');
    // }

    // Empty arrays are not allowed
    if (resourceTypes.length > 0) {
      trigger['resource-type'] = resourceTypes;
    }
  }

  // load-type
  const loadType: string[] = [];
  if (filter.firstParty() && !filter.thirdParty()) {
    loadType.push('first-party');
  } else if (!filter.firstParty() && filter.thirdParty()) {
    loadType.push('third-party');
  }

  // Empty arrays are not allowed
  if (loadType.length > 0) {
    trigger['load-type'] = loadType;
  }

  return {
    action: {
      type: filter.isException() ? 'ignore-previous-rules' : 'block',
    },
    trigger,
  };
}
