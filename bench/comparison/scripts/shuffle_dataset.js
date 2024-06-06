/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const fs = require('fs');

// https://stackoverflow.com/a/2450976/1185079
function shuffle(array) {
  const copy = [...array];
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = copy[currentIndex];
    copy[currentIndex] = copy[randomIndex];
    copy[randomIndex] = temporaryValue;
  }

  return copy;
}

function main() {
  const content = fs.readFileSync(process.argv[process.argv.length - 1], { encoding: 'utf-8' }).trim();
  const lines = content.split(/\n/g);

  const pagesPerDomain = new Map();
  for (let i = 0; i < lines.length; i += 1) {
    const {
      domainId, pageId, frameUrl, url, cpt,
    } = JSON.parse(lines[i]);

    let requestsPerPage = pagesPerDomain.get(domainId);
    if (requestsPerPage === undefined) {
      requestsPerPage = new Map();
      pagesPerDomain.set(domainId, requestsPerPage);
    }

    let requestsForPage = requestsPerPage.get(pageId);
    if (requestsForPage === undefined) {
      requestsForPage = [];
      requestsPerPage.set(pageId, requestsForPage);
    }

    requestsForPage.push(JSON.stringify({ frameUrl, url, cpt }));
  }

  // Keep data only for 500 top domains
  const pageLoads = [];
  [...pagesPerDomain.keys()].sort((a, b) => a - b).slice(0, 500).forEach((domainId) => {
    pagesPerDomain.get(domainId).forEach((requestsForPage) => {
      pageLoads.push(requestsForPage);
    });
  });

  const requests = [];
  shuffle(pageLoads).forEach((requestsForPage) => {
    requests.push(...requestsForPage);
  });

  fs.writeFileSync('shuffled.json', requests.join('\n'), { encoding: 'utf-8' });
}

main();
