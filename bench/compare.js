const { FilterOptions } = require('ad-block');
const { getHostname } = require('tldts');
const adblocker = require('../adblocker.umd.js');
const {
  types, typesToBrave, createBraveClient, createEngine, loadRequests, getFiltersFromLists,
} = require('./utils');
const fs = require('fs');

function compareResults(lists, resources) {
  // Create mapping from id to original filter
  const id2Filter = new Map();
  const filters = getFiltersFromLists(lists).map(f => f.trim()).filter(f => f);
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    const id = adblocker.fastHash(filter);
    // if (id2Filter.has(id)) {
    //   throw new Error(`Already seen filter with id ${id} ${id2Filter.get(id)}`);
    // }

    id2Filter.set(id, filter);
  }

  const { engine } = createEngine(lists, resources, {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
    optimizeAOT: true,
  });

  // const braveEngine = createBraveClient(lists);

  const requests = loadRequests();

  // const getBraveFilters = ({ cpt, sourceUrl, url }) => braveEngine.findMatchingFilters(
  //   url,
  //   typesToBrave[cpt] || FilterOptions.noFilterOption,
  //   getHostname(sourceUrl),
  // );

  const getFilters = (req) => {
    // console.log('>>>', req);
    try {
      const {
        match, exception, filter,
      } = engine.match(req);
      return {
        matches: match,
        matchingFilter: filter,
        matchingExceptionFilter: exception,
      };
    } catch (ex) {
      return {
        matches: false,
      };
    }
  };

  const blocked = {};
  const exceptions = {};
  const notBlocked = [];

  const stripPart = (url, sep) => {
    const index = url.indexOf(sep);
    if (index !== -1) {
      return url.substring(0, index);
    }
    return url;
  };

  const stripQuery = url => stripPart(url, '?');
  const stripFragment = url => stripPart(url, '#');

  const stripLastSlash = (url) => {
    if (!url) { return null; }
    if (url.split('/').length <= 3) { return null; }

    if (url.endsWith('/')) {
      return url.substring(0, url.length - 1);
    }

    const indexOfPath = url.lastIndexOf('/');
    if (indexOfPath !== -1) {
      return url.substring(0, indexOfPath + 1);
    }

    return null;
  };

  for (let i = 0; i < requests.length; i += 1) {
    const request = requests[i % requests.length];

    if (request.sourceUrl === undefined) { continue; }

    // Strip fragment/query parts
    request.url = stripQuery(stripFragment(request.url));
    request.sourceUrl = stripQuery(stripFragment(request.sourceUrl));

    const requestInfo = {
      cpt: types[request.cpt],
      sourceUrl: request.sourceUrl,
      url: request.url,
    };

    let match = getFilters(requestInfo);

    if (match.matchingFilter || match.matchingExceptionFilter) {
      let requestInfo1 = requestInfo;
      let newMatch = match;
      let newRequest = requestInfo1;

      // Strip path on sourceUrl as long as the resulting match is the same
      while (newMatch.matchingFilter || newMatch.matchingExceptionFilter) {
        match = newMatch;
        requestInfo1 = newRequest;
        newRequest = Object.assign({}, requestInfo1, {
          sourceUrl: stripLastSlash(requestInfo1.sourceUrl),
        });
        if (!newRequest.sourceUrl) { break; }
        newMatch = getFilters(newRequest);
      }

      request.sourceUrl = requestInfo1.sourceUrl;
      newMatch = match;
      newRequest = requestInfo1;

      // Strip path on url as long as the resulting match is the same
      while (newMatch.matchingFilter || newMatch.matchingExceptionFilter) {
        match = newMatch;
        requestInfo1 = newRequest;
        newRequest = Object.assign({}, requestInfo1, {
          url: stripLastSlash(requestInfo1.url),
        });
        if (!newRequest.url) { break; }
        newMatch = getFilters(newRequest);
      }

      request.url = requestInfo1.url;
    }


    // const braveMatch = getBraveFilters(requestInfo);
    if (match.matchingExceptionFilter) {
      // exception
      const exception = id2Filter.get(match.matchingExceptionFilter.id);
      const filter = id2Filter.get(match.matchingFilter.id);
      if (exceptions[exception] === undefined) {
        exceptions[exception] = [];
      }
      exceptions[exception].push({
        filter,
        ...request,
      });
    } else if (match.matchingFilter) {
      // normal filter
      const filter = id2Filter.get(match.matchingFilter.id);
      if (blocked[filter] === undefined) {
        blocked[filter] = [];
      }
      blocked[filter].push(request);
    } else {
      // Keep track of not blocked request
      notBlocked.push(request);
    }

    // if (i > 50000) { break; }
    continue;

    const matchingFilter = match.matchingFilter ? match.matchingFilter.toString() : '';
    if (
      match.matches !== braveMatch.matches
      // Brave does not seem to detect the exception for this one
      && braveMatch.matchingFilter !== '.com/ads/'
      // We do not support csp option
      && braveMatch.matchingFilter !== 'wikia.com^'
      // We apply filters in a case-insensitive way by default, Brave is stricter
      && matchingFilter !== '/adserver/'
      && matchingFilter !== '||adform.net^/banners/$third-party'
      && matchingFilter !== '/adimg/'
      && matchingFilter !== '/adserver.$image,media,object,object-subrequest,other,ping,script,stylesheet,subdocument,websocket,font'
      && matchingFilter !== '/advertorial/'
      && matchingFilter !== '/advertisments/'
      && matchingFilter !== '&advertiserid='
      && matchingFilter !== '/adserv/'
      && matchingFilter !== '/realmedia/ads/'
      && matchingFilter !== '/advertise_'
      && matchingFilter !== '/advert/'
      && matchingFilter !== '&adtype='
      && matchingFilter !== '/initlayeredwelcomead-'
      && matchingFilter !== '/exitpopup.'
      && matchingFilter !== '.com/ad?'
      && matchingFilter !== '/dynamicad/'
      && matchingFilter !== '.com/ads/$image,object,subdocument'
      && matchingFilter !== '/textad?'
      // Dump all lower/upper case issues
      // && !(!request.url.includes(matchingFilter) && request.url.toLowerCase().includes(matchingFilter))

      // Brave does not detect this one, maybe third-party option not detected?
      && matchingFilter !== '||2mdn.net^$image,media,object,other,ping,script,stylesheet,subdocument,websocket,xmlhttprequest,font,third-party'

      // Brave does not seem to support ~domain options
      && (match.matchingFilter && !match.matchingFilter.hasOptNotDomains())

      // ?
      && braveMatch.matchingFilter !== '/adservice.'

      // This seems to be a bug in Brave where they ignore the $generichide option
      // Original filter is: @@||softonic.com^$generichide
      && braveMatch.matchingExceptionFilter !== 'softonic.com^'
      // Original filter is: @@||flvto.biz^$generichide
      && braveMatch.matchingExceptionFilter !== 'flvto.biz^'
      // @@||phonearena.com^$generichide
      && braveMatch.matchingExceptionFilter !== 'phonearena.com^'
      // @@||nbc.com^$generichide
      && braveMatch.matchingExceptionFilter !== 'nbc.com^'

      // Bug in Brave? Seems like the following filter is applied even though it
      // should only work for a first-party: @@||adfox.ru^$~third-party
      && braveMatch.matchingExceptionFilter !== 'adfox.ru^'

      // Bug? Seems like this exception triggers on Brave for the following request.
      // @@||phncdn.com^$image,object-subrequest,other,domain=pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com
      // cpt: 7,
      // sourceUrl: 'https://www.redtube.com/yyyyyy',
      // url: 'https://cdn1d-static-shared.phncdn.com/iframe-1.1.5.html'
      && braveMatch.matchingExceptionFilter !== 'phncdn.com^'

      // Bug? This exception triggers on Brave: @@||thumbs-cdn.redtube.com^$image,domain=redtube.com|redtube.com.br
      // Although the request is a script (cpt === 2)
      && braveMatch.matchingExceptionFilter !== 'thumbs-cdn.redtube.com^'

      // Bug?
      // @@||g.doubleclick.net/gampad/ads?gdfp_req=1&$script,domain=gamespot.com|v3.co.uk
      // This exception triggers on Brave ignoring the $script option?
      && braveMatch.matchingExceptionFilter !== 'g.doubleclick.net/gampad/ads?gdfp_req=1&'

      // Bug?
      // @@||imasdk.googleapis.com/js/core/bridge*.html$subdocument,domain=~spotify.com
      // cpt: 11,
      // sourceUrl: 'https://video.repubblica.it/sport/yyyyy',
      // url: 'https://imasdk.googleapis.com/js/core/bridge3.226.3_it.html',
      && braveMatch.matchingExceptionFilter !== 'imasdk.googleapis.com/js/core/bridge*.html'

      // Bug?
      // @@||g.doubleclick.net/gampad/ads?$script,domain=gizmodo.com
      // Should not match for cpt 11
      && braveMatch.matchingExceptionFilter !== 'g.doubleclick.net/gampad/ads?'

      // Bug? Seems like Brave does not pick up this filter for some reason
      // $script,third-party,domain=kissanime.ru
      && match.matchingFilter.id !== 4168600423
      // ||cloudfront.net^$image,script,subdocument,domain=tubeoffline.com
      && match.matchingFilter.id !== 337409634

      // Bug?
      // cpt is ignored for exception
      // @@||tvn.adocean.pl^$object-subrequest
      && braveMatch.matchingExceptionFilter !== 'tvn.adocean.pl^'
      // @@||amazon-adsystem.com/widgets/q?$image
      && braveMatch.matchingExceptionFilter !== 'amazon-adsystem.com/widgets/q?'

      // We do not support $genericblock
      && braveMatch.matchingExceptionFilter !== 'streamango.com^'

      // Bug?
      // ||o333o.com^$third-party
      // cpt: 7,
      // sourceUrl: 'https://www.sunporno.com/videos/yyy/yyy',
      // url: 'https://a.o333o.com/api/spots/11160?p=1',
      && matchingFilter !== '||o333o.com^$third-party'

      // Bug? Brave does not match the following filter: /120x240_
      // On request:
      // cpt: 3,
      // sourceUrl: 'http://www.blogsky.com/terms',
      // url: 'http://ad.utop.ir/b/120X240_La-982.gif'
      // Is there a bug with the 'image' type?
      && matchingFilter !== '/120x240_'
      && matchingFilter !== '/adroll.'
      && matchingFilter !== '_300x250_'
      && matchingFilter !== '/300x250_'
      && matchingFilter !== '_js_ads/'

      // Bug?
      // ||gemini.yahoo.com^*^syndication^
      // cpt: 2,
      // sourceUrl: 'https://www.sina.com.tw/',
      // url: 'https://n.gemini.yahoo.com/ssi?ui=syndication&cc=
      && request.url.includes('https://n.gemini.yahoo.com/ssi?ui=syndication&cc=')

      // Bug? third-party not supported?
      // ||contentabc.com^$third-party seems like ||adocean.pl works fine
      && matchingFilter !== '||contentabc.com^$third-party'

      // Ignore all third-party filters
      // We have enough examples of this
      // && (match.matchingFilter && !match.matchingFilter.thirdParty())

      // Bug?
      // ||adocean.pl^$third-party
      // exception: @@||adocean.pl^*^aocodetype=$object-subrequest,domain=~superfilm.pl
      // cpt seems to be ignored
      && braveMatch.matchingExceptionFilter !== 'adocean.pl^*^aocodetype='

      // Bug?
      // cpt: 4,
      // sourceUrl: 'https://www.loverslab.com/#',
      // url: 'https://vz-cdn.contentabc.com/delivery/mobile_video_v2/adtool_mobile_video_player.min.css'
      && matchingFilter !== '||contentabc.com^$third-party'

      // Bug?
      // cpt: 11,
      // sourceUrl: 'https://www.grunge.com/8608/pro-athletes-really-weird-hobbies/?utm_source=zergnet.com&utm_medium=referral&utm_campaign=zergnet_3190628&utm_content=5',
      // url: 'https://cdn.vidible.tv/prod/player/ad/advertisers/advertisers.txt'
      // cpt ignored on exception?
      && braveMatch.matchingExceptionFilter !== 'vidible.tv/prod/'

      // Bug?
      // |http*://$image,script,subdocument,third-party,xmlhttprequest,domain=gorillavid.in
      // Not picked-up by Brave
      && matchingFilter !== '|^http.*:\\/\\/$image,script,subdocument,xmlhttprequest,third-party,domain=gorillavid.in'
      && matchingFilter !== '|^http.*:\\/\\/$image,other,third-party,domain=daclips.in|dropapk.com|gorillavid.in|movpod.in|mp3clan.one|powvideo.net|speedvid.net|stream2watch.org|streamplay.to|vidto.me|vidtudu.com|vodlock.co'
    ) {
      console.log('Mismatch', {
        ...requestInfo,
        matchingFilter,
        match,
        braveMatch,
      });
    }
  }

  // fs.writeFileSync('splitRequests.json', JSON.stringify({
  //  blocked,
  //  notBlocked,
  //  exceptions,
  // }), { encoding: 'utf-8' });

  // Compute most popular filters
  const counts = [];
  Object.keys(blocked).forEach((filter) => {
    counts.push([blocked[filter].length, filter]);
  });
  Object.keys(exceptions).forEach((filter) => {
    counts.push([exceptions[filter].length, filter]);
  });
  counts.sort((a, b) => {
    if (a[0] < b[0]) { return 1; }
    if (a[0] > b[0]) { return -1; }
    return 0;
  });

  for (let i = 0; i < Math.min(1000, counts.length); i += 1) {
    console.log(`# ${i + 1} => count: ${counts[i][0]}, filter: ${counts[i][1].slice(0, 100)}`);
  }

  // Prepare test dataset
  const testSet = [];
  [[blocked, 'filter'], [exceptions, 'exception']].forEach(([matches, key]) => {
    Object.keys(matches).forEach((filter) => {
      const matchRequests = matches[filter];
      // Get shortest first
      matchRequests.sort((r1, r2) => {
        if (r1.url.length < r2.url.length) { return -1; }
        if (r1.url.length > r2.url.length) { return 1; }
        return 0;
      });

      // Get one of each cpt
      const seenCpt = new Set();
      for (let i = 0; i < matchRequests.length; i += 1) {
        const request = matchRequests[i];
        if (!seenCpt.has(request.cpt)) {
          seenCpt.add(request.cpt);
          testSet.push({
            [key]: filter,
            ...request,
          });
        }
      }
    });
  });

  fs.writeFileSync('testSet.json', JSON.stringify(testSet), { encoding: 'utf-8' });
}

module.exports = {
  compareResults,
};
