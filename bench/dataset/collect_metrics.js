const fs = require('fs');
const path = require('path');
const readline = require('readline');

const adblocker = require(path.resolve(__dirname, '../../dist/adblocker.umd.js'));
const createUBlock = require(path.resolve(__dirname, './ublock.js'));
const createBrave = require(path.resolve(__dirname, './brave.js'));

const { getDomain, getHostname } = require('tldts');

function loadLists() {
  return {
    // lists: [
    //   fs.readFileSync('./offers_filters.txt', { encoding: 'utf-8' }),
    // ],
    // lists: [
    //   fs.readFileSync('./mobile_filters.txt', { encoding: 'utf-8' }),
    // ],
    lists: [
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
      'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
      'easylist-downloads.adblockplus.org/antiadblockfilters.txt',
      'easylist.to/easylistgermany/easylistgermany.txt',
      'easylist.to/easylist/easylist.txt',
      'pgl.yoyo.org/adservers/serverlist.txt',
      'easylist.to/easylist/easyprivacy.txt',
    ].map(asset => fs.readFileSync(path.resolve(__dirname, '../../assets/', asset), { encoding: 'utf-8' })),
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

function createEngine() {
  const { lists, resources } = loadLists();
  const engine = new adblocker.FiltersEngine({
    enableOptimizations: false,
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  engine.onUpdateResource([{ filters: resources, checksum: '' }]);
  engine.onUpdateFilters(
    lists.map((filters, i) => ({
      asset: `${i}`,
      checksum: '',
      filters,
    })),
    new Set(),
    true,
    true,
  );

  return engine;
}

async function main() {
  const engine = createEngine();
  const ublock = createUBlock(loadLists().lists.join('\n'));
  // const brave = createBrave(loadLists().lists.join('\n'));

  // const lines = fs
  //   .readFileSync(process.argv[process.argv.length - 1], { encoding: 'utf-8' })
  //   .split(/\n/g);
  const lines = readline.createInterface({
    input: fs.createReadStream(process.argv[process.argv.length - 1]),
    crlfDelay: Infinity,
  });

  // Collect network filters
  let index = 0;

  const minMatch = 100;
  const maxMatch = 0;
  const timeNoMatch = 0;
  const totalNoMatch = 0;

  const minNoMatch = 100;
  const maxNoMatch = 0;
  const timeMatch = 0;
  const totalMatch = 0;

  const reqMinFilterMatch = 1000000;
  const reqMaxFilterMatch = 0;
  const reqSumFilterMatch = 0;

  const reqMinFilterNoMatch = 1000000;
  const reqMaxFilterNoMatch = 0;
  const reqSumFilterNoMatch = 0;

  // const slowRequests = [];
  // const requests = [];

  const matchingFilters = [];
  const matchingExceptions = [];
  const testCases = [];

  const stripPart = (url, sep) => {
    const index = url.indexOf(sep);
    if (index !== -1) {
      return url.slice(0, index + 1);
    }
    return url;
  };

  const stripQuery = url => stripPart(url, '?');
  const stripFragment = url => stripPart(url, '#');
  const stripLastSlash = (url) => {
    if (!url) {
      return null;
    }

    if (url.endsWith('/') && url.split('/').length <= 3) {
      return null;
    }

    if (url.endsWith('/')) {
      return url.slice(0, -1);
    }

    const indexOfPath = url.lastIndexOf('/');
    if (indexOfPath !== -1) {
      return url.slice(0, indexOfPath + 1);
    }

    return null;
  };

  const trimOneLevel = (url) => {
    if (url.endsWith('#')) {
      return url.slice(0, -1);
    }
    let trimmed = stripFragment(url);
    if (trimmed !== url) {
      return trimmed;
    }

    if (url.endsWith('?')) {
      return url.slice(0, -1);
    }
    trimmed = stripQuery(trimmed);
    if (trimmed !== url) {
      return trimmed;
    }

    return stripLastSlash(trimmed);
  };

  const seenFilters = new Set();

  const getFilters = ({ cpt, sourceUrl, url }) => {
    const sourceHostname = getHostname(sourceUrl) || '';
    const sourceDomain = getDomain(sourceHostname) || '';
    const requestHostname = getHostname(url) || '';
    const requestDomain = getDomain(requestHostname) || '';

    //  const start = process.hrtime();
    const filters = new Set(
      [
        ...engine.matchAll({
          url,
          hostname: requestHostname,
          domain: requestDomain,

          sourceUrl,
          sourceHostname,
          sourceDomain,

          type: cpt,
        }),
      ].map(f => f.rawLine),
    );

    // const braveFilters = brave({ url, type: cpt, sourceHostname });
    // console.log('BRAVE', braveFilters);

    const ublockFilters = new Set(
      [
        ...ublock({
          requestURL: url,
          requestHostname,
          requestType: cpt,
          pageDomain: sourceDomain,
          pageHostname: sourceHostname,
        }),
      ].filter(
        f => !f.includes('popup')
          && !f.includes('||fls-*.amazon.*%')
          && !f.includes('||doubleclick.net^$third-party,image')
          && !f.includes('accountant|bid|click|club|com|cricket|date|download|faith|link|')
          && !f.includes('||collector-*.tvsquared.com')
          && !f.includes('||trafficjunky.net^$important,third-party'),
      ),
    );
    // const diff = process.hrtime(start);
    // const totalHighResolution = (diff[0] * 1000000000 + diff[1]) / 1000000;

    let check = false;
    if (filters.size !== ublockFilters.size) {
      check = true;
      console.error(
        'REQ',
        JSON.stringify(
          {
            url,
            sourceUrl,
            cpt,
          },
          undefined,
          2,
        ),
      );
      console.error('DIFF? us', JSON.stringify([...filters], undefined, 2));
      console.error('DIFF? ub', JSON.stringify([...ublockFilters], undefined, 2));
      // process.exit(0);
    }

    return {
      filters: [
        ...new Set(
          [...filters, ...ublockFilters]
            .filter(f => !seenFilters.has(f))
            .map(f => f.replace('~third-party', 'first-party')),
        ),
      ],
      check,
    };
  };

  const eq = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  lines.on('line', (line) => {
    // for (let i = 0; i < lines.length; i += 1) {
    //   const line = lines[i];
    if (index !== 0 && index % 10000 === 0) {
      console.log(`Processed ${index} requests`);
    }
    index += 1;

    let request = null;
    try {
      request = JSON.parse(line);
    } catch (ex) {
      return;
      // continue;
    }

    // Reduce sourceUrl and url to a minimum
    const { filters, check } = getFilters(request);
    let newRequest = request;

    // Trim sourceUrl
    while (filters.length > 0 && eq(filters, getFilters(newRequest).filters)) {
      request = newRequest;
      newRequest = {
        ...request,
        sourceUrl: trimOneLevel(request.sourceUrl),
      };

      if (newRequest.sourceUrl === null) {
        break;
      }
      if (newRequest.sourceUrl === request.sourceUrl) {
        break;
      }
    }

    newRequest = request;

    // Trim url
    while (filters.length > 0 && eq(filters, getFilters(newRequest).filters)) {
      request = newRequest;
      newRequest = {
        ...request,
        url: trimOneLevel(request.url),
      };

      if (newRequest.url === null) {
        break;
      }
      if (newRequest.url === request.url) {
        break;
      }
    }

    if (filters.length > 0 && request.url.length < 80) {
      filters.forEach((f) => {
        seenFilters.add(f);
      });

      testCases.push({
        check: check === true ? true : undefined,
        filters,
        sourceUrl: request.sourceUrl,
        type: request.cpt,
        url: request.url,
      });
    }
    // if (totalHighResolution > 1) {
    //   const filter = result.filter !== undefined ? result.filter.rawLine : null;
    //   const exception = result.exception !== undefined ? result.exception.rawLine : null;
    //   slowRequests.push({
    //     cumulTime: totalHighResolution,
    //     match: !!filter,
    //     filter,
    //     exception,
    //     cpt,
    //     url,
    //     sourceUrl,
    //   });
    // }

    // if (result.req.isSupported && result.req.filtersHit.length >= 10) {
    //   const tokens = result.req.getTokens();
    //   requests.push({
    //     url,
    //     tokensDup: tokens.length - [...new Set(tokens)].length,
    //     filtersDup: result.req.filtersHit.length - [...new Set(result.req.filtersHit)].length,
    //     tokens,
    //     filters: result.req.filtersHit,
    //     match: result.filter !== undefined,
    //   });
    // }

    // if (filters.length !== 0) {
    //   // }result.filter !== undefined) {
    //   totalMatch += 1;
    //   timeMatch += totalHighResolution;
    //   minMatch = Math.min(minMatch, totalHighResolution);
    //   maxMatch = Math.max(maxMatch, totalHighResolution);

    //   // reqMaxFilterMatch = Math.max(reqMaxFilterMatch, result.req.filtersHit.length);
    //   // reqMinFilterMatch = Math.min(reqMinFilterMatch, result.req.filtersHit.length);
    //   // reqSumFilterMatch += result.req.filtersHit.length;
    // } else {
    //   totalNoMatch += 1;
    //   timeNoMatch += totalHighResolution;
    //   minNoMatch = Math.min(minNoMatch, totalHighResolution);
    //   maxNoMatch = Math.max(maxNoMatch, totalHighResolution);

    //   // reqMaxFilterNoMatch = Math.max(reqMaxFilterNoMatch, result.req.filtersHit.length);
    //   // reqMinFilterNoMatch = Math.min(reqMinFilterNoMatch, result.req.filtersHit.length);
    //   // reqSumFilterNoMatch += result.req.filtersHit.length;
    // }
  });

  await new Promise((resolve) => {
    lines.on('close', resolve);
  });

  console.log('FILTERS', new Set(matchingFilters).size);
  console.log('EXCEPTIONS', new Set(matchingExceptions).size);

  console.log(`Total requests: ${totalNoMatch + totalMatch}`);
  console.log(`Total match: ${totalMatch}`);
  console.log(`Total no match: ${totalNoMatch}`);
  console.log();
  console.log(`Req Min filter match: ${reqMinFilterMatch}`);
  console.log(`Req Max filter match: ${reqMaxFilterMatch}`);
  console.log(`Req Avg filter match: ${reqSumFilterMatch / totalMatch}`);
  console.log();
  console.log(`Req Min filter no match: ${reqMinFilterNoMatch}`);
  console.log(`Req Max filter no match: ${reqMaxFilterNoMatch}`);
  console.log(`Req Avg filter no match: ${reqSumFilterNoMatch / totalNoMatch}`);
  console.log();
  console.log(`Min match: ${minMatch}`);
  console.log(`Max match: ${maxMatch}`);
  console.log(`Avg match: ${timeMatch / totalMatch}`);
  console.log();
  console.log(`Min no match: ${minNoMatch}`);
  console.log(`Max no match: ${maxNoMatch}`);
  console.log(`Avg no match: ${timeNoMatch / totalNoMatch}`);

  console.log('>>>>');

  fs.writeFileSync(
    'testCases.ts',
    `export default ${JSON.stringify(testCases, undefined, 2)};\n`,
    {
      encoding: 'utf-8',
    },
  );
  console.log('<<<<<');

  process.exit(0);
  return;

  // Collect stats
  const filterData = [];
  const bucketData = [];
  ['filters'].forEach((type) => {
    engine[type].index.index.forEach((bucket, token) => {
      let originalToken = null;
      bucket.filters.forEach((filter) => {
        // Collect filter data
        filterData.push({
          filter: filter.rawLine,
          id: filter.id,
          hit: filter.hit,
          match: filter.match,
          cumulTime: filter.cumulTime,
          hasHostname: filter.hasHostname(),
          hasFilter: filter.hasFilter(),
          filterSize:
            (filter.hasFilter() ? filter.getFilter().length : 0)
            + (filter.hasHostname() ? filter.getHostname().length : 0),
          optDomains: filter.getOptDomains().size,
          optNotDomains: filter.getOptNotDomains().size,
          isHostnameAnchor: filter.isHostnameAnchor(),
          isRightAnchor: filter.isRightAnchor(),
          isLeftAnchor: filter.isLeftAnchor(),
          isRegex: filter.isRegex(),
          isPlain: filter.isPlain(),
          fromAny: filter.fromAny(),
          thirdParty: filter.thirdParty(),
          firstParty: filter.firstParty(),
          // fromHttp: filter.fromHttp(),
          // fromHttps: filter.fromHttps(),
          fromImage: filter.fromImage(),
          fromMedia: filter.fromMedia(),
          fromObject: filter.fromObject(),
          fromObjectSubrequest: filter.fromObjectSubrequest(),
          fromOther: filter.fromOther(),
          fromPing: filter.fromPing(),
          fromScript: filter.fromScript(),
          fromStylesheet: filter.fromStylesheet(),
          fromSubdocument: filter.fromSubdocument(),
          fromWebsocket: filter.fromWebsocket(),
          fromXmlHttpRequest: filter.fromXmlHttpRequest(),
          fromFont: filter.fromFont(),
        });

        // Find original token for bucket
        filter.rawLine.split(/[^\w]+/g).forEach((t) => {
          if (adblocker.fastHash(t) === token) {
            originalToken = t;
          }
        });
      });

      bucketData.push({
        token: originalToken,
        hit: bucket.hit,
        match: bucket.match,
        cumulTime: bucket.cumulTime,
        length: bucket.filters.length,
        tokensHit: bucket.tokensHit,
        filters: bucket.filters.map(f => f.rawLine).sort(),
        filterIds: bucket.filters.map(f => f.id),
      });
    });
  });

  const sortByTokens = arr => arr.sort((r1, r2) => {
    if (r1.tokens.length < r2.tokens.length) {
      return 1;
    }
    if (r1.tokens.length > r2.tokens.length) {
      return -1;
    }
    return 0;
  });

  const sortByCumulTime = arr => arr.sort((r1, r2) => {
    if (r1.cumulTime < r2.cumulTime) {
      return 1;
    }
    if (r1.cumulTime > r2.cumulTime) {
      return -1;
    }
    return 0;
  });

  // fs.writeFileSync('requestData.json', JSON.stringify(sortByTokens(requests)), {
  //   encoding: 'utf-8',
  // });

  fs.writeFileSync('bucketData.json', JSON.stringify(sortByCumulTime(bucketData)), {
    encoding: 'utf-8',
  });

  fs.writeFileSync('filterData.json', JSON.stringify(sortByCumulTime(filterData)), {
    encoding: 'utf-8',
  });

  // fs.writeFileSync(
  //   'slowRequests.json',
  //   JSON.stringify(sortByCumulTime(slowRequests), undefined, 2),
  //   {
  //     encoding: 'utf-8',
  //   },
  // );
}

main();
