const fs = require('fs');
const path = require('path');
const readline = require('readline');

const adblocker = require(path.resolve(__dirname, '../../dist/adblocker.umd.min.js'));
const { getPublicSuffix, getDomain } = require('tldts');
const top50kDomains = require('./hostnames');

function getHostnameWithoutSuffix(hostname) {
  const publicSuffix = getPublicSuffix(hostname);
  if (publicSuffix === null) {
    return hostname;
  }

  const hostnameWithoutSuffix = hostname.substr(0, hostname.length - publicSuffix.length - 1);

  if (hostnameWithoutSuffix.length === 0) {
    return hostname;
  }

  return hostnameWithoutSuffix;
}

const top50kDomainsEntities = new Map();
top50kDomains.forEach((domain) => {
  const entity = getHostnameWithoutSuffix(domain);
  if (top50kDomainsEntities.has(entity)) {
    top50kDomainsEntities.get(entity).push(domain);
  } else {
    top50kDomainsEntities.set(entity, [domain]);
  }
});

function loadLists() {
  return {
    lists: [
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
      'easylist-downloads.adblockplus.org/antiadblockfilters.txt',
      'easylist.to/easylistgermany/easylistgermany.txt',
      'easylist.to/easylist/easylist.txt',
      'pgl.yoyo.org/adservers/serverlist.txt',
    ].map(asset => fs
      .readFileSync(path.resolve(__dirname, '../../assets/', asset), { encoding: 'utf-8' })
      .replace(/[+]js[(]/g, 'script:inject(')),
    resources: fs.readFileSync(
      path.resolve(
        __dirname,
        '../../assets/',
        'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt',
      ),
      { encoding: 'utf-8' },
    ),
  };
}

function createEngine(lists, resources) {
  const engine = new adblocker.FiltersEngine({
    enableOptimizations: false,
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  engine.onUpdateResource([{ filters: resources, checksum: '' }]);
  const serialized = engine.onUpdateFilters(
    lists.map((filters, i) => ({
      asset: `${i}`,
      checksum: '',
      filters,
    })),
    new Set(),
    true,
    true,
  );

  return {
    engine,
    serialized,
  };
}

const types = {
  // maps string (web-ext) to int (FF cpt)
  beacon: 19,
  csp_report: 17,
  font: 14,
  image: 3,
  imageset: 21,
  main_frame: 6,
  media: 15,
  object: 5,
  object_subrequest: 12,
  other: 1,
  ping: 10,
  script: 2,
  stylesheet: 4,
  sub_frame: 7,
  web_manifest: 22,
  websocket: 16,
  xbl: 9,
  xml_dtd: 13,
  xmlhttprequest: 11,
  xslt: 18,
};

function removeExtraEntities(filter) {
  let raw = filter.rawLine;
  if (filter.hasHostnames()) {
    filter.getHostnames().forEach((hostname) => {
      if (hostname.endsWith('.*')) {
        if (!top50kDomainsEntities.has(hostname.slice(0, -2))) {
          raw.replace(hostname, '');
        }
      } else if (!top50kDomains.has(hostname)) {
        raw = raw.replace(hostname, '');
      }
    });
  }
  return raw
    .replace(/[,]+/g, ',')
    .replace(/^[,]+/g, '')
    .replace(/[,]+#/g, '#');
}

function removeExtraHostnames(filter) {
  let raw = filter.rawLine;

  let log = false;
  if (raw.includes('google-analytics.com/analytics.js')) {
    log = true;
    console.log('>>> RAW', raw);
  }

  if (filter.hasOptDomains()) {
    filter.getOptDomains().forEach((domain) => {
      if (log) {
        console.log('>>> ??', domain, top50kDomains.has(domain));
      }
      if (!top50kDomains.has(domain)) {
        raw = raw.replace(domain, '');
      }
    });
  }

  return raw
    .replace(/(?!^)[|]+/g, '|')
    .replace('=|', '=')
    .replace(/[|]$/g, '')
    .replace('|,', ',');
}

function sortByIncreasingLength(strings) {
  return strings.sort((f1, f2) => {
    if (f1.length < f2.length) {
      return -1;
    }
    if (f1.length > f2.length) {
      return 1;
    }
    return 0;
  });
}

async function getFiltersUsedForEachDomain() {
  const { lists, resources } = loadLists();
  const { engine } = createEngine(lists, resources);
  const filtersPerDomains = new Map();

  const addFilter = (domain, filter) => {
    if (filtersPerDomains.has(domain)) {
      filtersPerDomains.get(domain).add(filter);
    } else {
      filtersPerDomains.set(domain, new Set([filter]));
    }
  };

  console.log('Extracting subset of cosmetic filters...');
  let cosmeticFilters = 0;
  engine.lists.forEach(({ cosmetics }) => {
    cosmetics.forEach((filter) => {
      if (filter.isScriptBlock() || filter.isScriptInject()) {
        filter.getHostnames().forEach((hostname) => {
          if (hostname.endsWith('.*') && top50kDomainsEntities.has(hostname.slice(0, -2))) {
            top50kDomainsEntities.get(hostname.slice(0, -2)).forEach((domain) => {
              cosmeticFilters += 1;
              const reducedFilter = removeExtraEntities(filter);
              addFilter(domain, reducedFilter);
            });
          } else if (top50kDomains.has(hostname)) {
            cosmeticFilters += 1;
            addFilter(hostname, removeExtraEntities(filter));
          }
        });
      }
    });
  });

  console.log(`Found ${cosmeticFilters} filters`);

  console.log('Extracting subset of network filters...');
  const networkFilters = new Set();
  const slowRequests = [];

  const lines = readline.createInterface({
    input: fs.createReadStream(process.argv[process.argv.length - 1]),
    crlfDelay: Infinity,
  });

  // Collect network filters
  let index = 0;
  lines.on('line', (line) => {
    if (index !== 0 && index % 5000 === 0) {
      console.log(`Processed ${index} requests`);
    }
    index += 1;

    let request = null;
    try {
      request = JSON.parse(line);
    } catch (ex) {
      console.error('ERROR', ex);
      return;
    }

    const { cpt, sourceUrl, url } = request;

    if (cpt === 'document' || url.length > 200) {
      return;
    }

    const t0 = Date.now();
    const { exception, filter } = engine.match({
      cpt: types[cpt.toLowerCase()],
      sourceUrl,
      url,
    });
    const total = Date.now() - t0;
    const sourceDomain = getDomain(sourceUrl);

    if (total > 5) {
      console.log('SLOW', total, cpt, sourceUrl, url.slice(0, 25), '...');
      slowRequests.push(request);
    }

    if (filter !== undefined && !networkFilters.has(filter.rawLine)) {
      networkFilters.add(filter.rawLine);
      // console.log('> f', removeExtraHostnames(filter));
      addFilter(sourceDomain, removeExtraHostnames(filter));
    }

    if (exception !== undefined && !networkFilters.has(exception.rawLine)) {
      networkFilters.add(exception.rawLine);
      // console.log('> e', removeExtraHostnames(exception));
      addFilter(sourceDomain, removeExtraHostnames(exception));
    }
  });

  await new Promise((resolve) => {
    lines.on('close', resolve);
  });

  console.log(`Found  ${networkFilters.size} network filters`);
  console.log('Slow requests', slowRequests.length);
  return filtersPerDomains;
}

async function main() {
  const filtersPerDomains = await getFiltersUsedForEachDomain();

  const objFiltersPerDomains = {};
  filtersPerDomains.forEach((filters, domain) => {
    objFiltersPerDomains[domain] = [...filters];
  });

  fs.writeFileSync('filters_per_domains.json', JSON.stringify(objFiltersPerDomains), {
    encoding: 'utf-8',
  });

  const top50kHW = fs.readFileSync('top50k.txt', { encoding: 'utf-8' }).split('\n');
  const filters = new Set();
  top50kHW.forEach((domain, i) => {
    const domainFilters = objFiltersPerDomains[domain];
    if (domainFilters !== undefined) {
      domainFilters.forEach((f) => {
        filters.add(f);
      });
    } else {
      console.error('No filter for domain', domain);
    }

    const topN = i + 1;
    console.log(`> ${topN} found ${filters.size} filters`);

    if (topN % 1000 === 0) {
      fs.writeFileSync(
        `mobile_filters/mobile_filters_${topN}.txt`,
        sortByIncreasingLength([...filters]).join('\n'),
        { encoding: 'utf-8' },
      );
    }
  });

  fs.writeFileSync('mobile_filters.txt', sortByIncreasingLength([...filters]).join('\n'), {
    encoding: 'utf-8',
  });
}

main();
