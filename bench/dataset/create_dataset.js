#!/usr/bin/env node

const fs = require('fs');
const createPuppeteerPool = require('puppeteer-pool');

const stream = require('stream');

const hostnames = [...require('./hostnames.js')];

class RequestStreamer extends stream.Readable {
  constructor(options) {
    super(options);

    this.totalRequests = 0;
  }

  onRequest(request) {
    this.totalRequests += 1;
    this.push(`${JSON.stringify(request)}\n`);
  }

  tearDown() {
    // Terminate stream
    try {
      this.push(null);
    } catch (ex) {
      /* Ignore */
    }
  }

  _read() {
    /* Do nothing? */
  }
}

async function collectDataset(domains) {
  // Stream requests to file
  const requestStream = new RequestStreamer();
  const outputStream = fs.createWriteStream('requests.json');
  requestStream.pipe(outputStream);

  const visitUrl = async (browser, { url, domain }) => {
    let urlToVisit = url;
    if (url === undefined) {
      urlToVisit = `http://www.${domain}`;
    }

    const page = await browser.newPage();
    try {
      await page.emulate({
        name: 'Galaxy S5',
        userAgent: 'Mozilla/5.0 (Android 6.0.99; Mobile; rv:61.0) Gecko/61.0 Firefox/61.0',
        viewport: {
          width: 360,
          height: 640,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          isLandscape: false,
        },
      });

      // Collect all requests used to load the page
      page.on('request', (request) => {
        requestStream.onRequest({
          sourceUrl: page.mainFrame().url(),
          url: request.url(),
          method: request.method(),
          cpt: request.resourceType(),
        });
      });

      const status = await page.goto(urlToVisit);
      if (!status.ok) {
        return [];
      }

      // Collect hrefs from the page
      return (await page.evaluate(() => [...document.querySelectorAll('a')].map(a => a.href))).filter(href => Boolean(href) && href.includes(domain));
    } catch (ex) {
      return [];
    } finally {
      await page.close();
    }
  };

  const processDomain = async (browser, domain) => {
    try {
      // Visit home page of domain
      console.log(`Home page: ${domain}`);
      const linksOnPage = await visitUrl(browser, { domain });

      // Visit 3 random URLs from the page
      if (linksOnPage.length > 0) {
        for (let j = 0; j < Math.min(5, linksOnPage.length); j += 1) {
          const url = linksOnPage[Math.floor(Math.random() * linksOnPage.length)];
          console.log(`Sub-page: ${url}`);
          await visitUrl(browser, { url, domain });
        }
      }

      console.log(`Process: ${domain}, total: ${requestStream.totalRequests} reqs`);
    } catch (ex) {
      console.error(`Error while processing: ${domain}`, ex);
    }
  };

  // Create pool of browsers
  const pool = createPuppeteerPool({
    max: 50,
    maxUses: 20,
  });

  const tearDown = async () => {
    try {
      await pool.drain();
    } catch (ex) {
      /* Ignore */
    }

    try {
      await pool.clear();
    } catch (ex) {
      /* Ignore */
    }

    try {
      requestStream.tearDown();
    } catch (ex) {
      /* Ignore */
    }
  };

  process.on('SIGTERM', tearDown);

  for (let i = 0; i < domains.length; i += 1) {
    pool.use(async browser => processDomain(browser, domains[i]));
  }

  await tearDown();
}

collectDataset(hostnames);
