import { expect } from 'chai';
import 'mocha';
import * as http from 'http';
import { EventEmitter } from 'events'
import * as getPort from 'get-port'
import fetch from 'node-fetch'
import * as tmp from 'tmp-promise'

import * as puppeteer from 'puppeteer';

import { fromPuppeteerDetails, getHostnameHashesFromLabelsBackward, PuppeteerBlocker } from '../adblocker';

describe('#fromPuppeteerDetails', () => {
  const baseFrame: Partial<puppeteer.Frame> = {
    url: () => 'https://sub.source.com',
  };

  const baseRequest: Partial<puppeteer.HTTPRequest> = {
    frame: () => baseFrame as puppeteer.Frame,
    resourceType: () => 'script',
    url: () => 'https://sub.url.com',
  };

  it('gets sourceUrl from frame', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.HTTPRequest)).to.deep.include({
      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.source.com', 'source.com'),
    });
  });

  it('gets type from resourceType', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.HTTPRequest)).to.deep.include({
      type: 'script',
    });
  });

  it('gets url from url', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.HTTPRequest)).to.deep.include({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',
    });
  });
});

/**
 * Overview of what these tests do:
 * - Start a server that serves a basic webpage. The webpage loads just one resource after the initial request: a stylesheet with a `Cache-Control` header indicating that it should be cached.
 * - Visit the webpage twice in a row, with or without the cache enabled, and count the total number of requests that the server handles to serve the visits to make sure the cache worked as intended.
 *   - Without the cache, there should be two server requests for each page visit. One for the main HTML and one for the CSS.
 *   - With the cache enabled, but starting empty, there should be two server requests on the first visit, and one on the second visit, after the CSS is cached.
 *
 * Chromium doesn't seem to allow entire HTML pages to be cached without revalidation, which is why the test uses a cached stylesheet, rather than trying to cache the main page.
 */
describe(`cacheSafe option`, () => {
  const serverRequestEvents = new EventEmitter() // used to notify the test about server requests so the test can count requests
  const requestReceivedEventName = `request received`
  const cachingServer = http.createServer((request, response) => {
    serverRequestEvents.emit(requestReceivedEventName)

    if (request.url == null) {
      response.writeHead(400)
      return response.end()
    }

    if (request.url.endsWith(`/`)) {
      response.end(`
        <head><link rel="stylesheet" href="/style.css"></head>
        <body>content</body>
      `)
    } else if (request.url.endsWith(`/style.css`)) {
      response.setHeader(`Cache-Control`, `max-age=3600`)
      response.end(`* { key: value }`)
    }
  })
  /** Starts the server on a randomly-chosen, available port and returns the URL that can be used to reach the server. */
  const pendingServerUrl = new Promise<string>(async (resolve, reject) => {
    try {
      const port = await getPort()

      cachingServer
        .listen(port, () => resolve(`http://localhost:${port}`))
        .once(`error`, reject)
    } catch(error: unknown) {
      reject(error)
    }
  })
  const getRandomTemporaryDirectory = async (): Promise<string> => (await tmp.dir({ unsafeCleanup: true })).path

  after(done => cachingServer.close(done))

  it(`is disabled by default, and no browser caching happens`, async () => {
    let serverRequestCount = 0
    serverRequestEvents.on(requestReceivedEventName, () => serverRequestCount += 1)

    const browser = await puppeteer.launch({
      userDataDir: await getRandomTemporaryDirectory()
    })
    const page = await browser.newPage()
    const blocker = await PuppeteerBlocker.fromPrebuiltAdsOnly(fetch)

    blocker.enableBlockingInPage(page)
    await page.goto(await pendingServerUrl)
    await page.goto(await pendingServerUrl)
    await browser.close()

    expect(serverRequestCount).to.equal(4)
  })

  it(`can be enabled, which causes the browser to cache resources`, async () => {
    let serverRequestCount = 0
    serverRequestEvents.on(requestReceivedEventName, () => serverRequestCount += 1)

    const browser = await puppeteer.launch({
      userDataDir: await getRandomTemporaryDirectory()
    })
    const page = await browser.newPage()
    const blocker = await PuppeteerBlocker.fromPrebuiltAdsOnly(fetch)

    blocker.enableBlockingInPage(page, { cacheSafe: true })
    await page.goto(await pendingServerUrl)
    await page.goto(await pendingServerUrl)
    await browser.close()

    expect(serverRequestCount).to.equal(3)
  })
})
