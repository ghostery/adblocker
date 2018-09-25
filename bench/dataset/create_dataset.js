#!/usr/bin/env node

const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const archiver = require('archiver');
const WebSocket = require('ws');
const stream = require('stream');

const hostnames = require('./hostnames.js');

function zipWebExtension(extensionPath) {
  const extensionZipPath = './ext.zip';
  const output = fs.createWriteStream(extensionZipPath);
  const archive = archiver('zip', {
    zlib: { level: 1 },
  });

  return new Promise((resolve, reject) => {
    // listen for all archive data to be written
    output.on('close', () => {
      resolve(extensionZipPath);
    });

    // good practice to catch this error explicitly
    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(extensionPath, false);
    archive.finalize();
  });
}

function createRequestStream() {
  class RequestStreamer extends stream.Readable {
    constructor(options) {
      super(options);

      this.totalRequests = 0;

      // Start listening for client
      this.wss = new WebSocket.Server({ port: 3000 });
      this.connections = new Set();

      this.wss.on('error', (err) => {
        // eslint-disable-next-line no-console
        console.error('WebSocket server', err);
      });

      this.wss.on('connection', (ws) => {
        this.connections.add(ws);
        ws.on('message', (message) => {
          this.totalRequests += 1;
          return this.push(`${message}\n`);
        });
      });
    }

    tearDown() {
      // Terminate WebSocket Server
      try { this.wss.close(); } catch (ex) { /* Ignore */ }

      // Terminate connections
      this.connections.forEach((ws) => {
        try { ws.close(); } catch (ex) { /* Ignore */ }
      });

      // Terminate stream
      try { this.push(null); } catch (ex) { /* Ignore */ }
    }

    _read() { /* Do nothing? */ }
  }

  return new RequestStreamer();
}

async function createDriver() {
  const extensionZipPath = await zipWebExtension('extension');
  const chromeOptions = new chrome.Options()
    .addExtensions(extensionZipPath);

  const service = new chrome.ServiceBuilder('./chromedriver').build();
  const driver = chrome.Driver.createSession(chromeOptions, service);
  const timeout = 20000;
  await driver.manage().setTimeouts({
    implicit: timeout,
    pageLoad: timeout,
    script: timeout,
  });
  return driver;
}

async function collectDataset(domains) {
  // Stream requests from browser to file
  const requestStream = createRequestStream();
  const outputStream = fs.createWriteStream('requests.json');
  requestStream.pipe(outputStream);

  // Create browser driver
  let driver = null;
  const reloadDriver = async () => {
    console.log('> Reload WebDriver');
    try { await driver.quit(); } catch (ex) { /* Ignore */ }
    driver = await createDriver();
  };
  await reloadDriver();

  const visitUrl = async ({ url, domain }) => {
    let urlToVisit = url;
    if (url === undefined) {
      urlToVisit = `http://www.${domain}`;
    }

    // Try to load page
    try {
      await driver.get(urlToVisit);
    } catch (ex) {
      console.log('Could not finish loading page');
    }

    // Check that the page was loaded
    try {
      if (!(await driver.getCurrentUrl()).includes(domain)) {
        await reloadDriver();
        return [];
      }
    } catch (ex) {
      console.log('Could not get url of tab');
      await reloadDriver();
      return [];
    }

    // Collect hrefs from the page
    let urlsInPage = [];
    try {
      urlsInPage = (await Promise.all(
        (await driver.findElements(webdriver.By.tagName('a')))
          .map(e => e.getAttribute('href')),
      )).filter(href => Boolean(href) && href.includes(domain));
    } catch (ex) {
      console.log('Coult not extra links');
    }

    if (urlsInPage.length === 0) {
      await reloadDriver();
      return [];
    }

    return urlsInPage;
  };

  const tearDown = async () => {
    try {
      requestStream.tearDown();
    } catch (ex) { /* Ignore */ }

    try {
      await driver.quit();
    } catch (ex) { /* Ignore */ }
  };

  process.on('SIGTERM', tearDown);

  for (let i = 0; i < domains.length; i += 1) {
    const domain = domains[i];
    try {
      // Visit home page of domain
      console.log(`Home page: ${domain}`);
      const linksOnPage = await visitUrl({ domain });

      // Visit N random URLs from the page
      if (linksOnPage.length > 0) {
        for (let j = 0; j < 3; j += 1) {
          const url = linksOnPage[Math.floor(Math.random() * linksOnPage.length)];
          console.log(`Sub-page: ${url}`);
          await visitUrl({ url, domain });
        }
      }

      const percent = Math.floor(i / domains.length * 100);
      console.log(`Process: ${domain} (${percent}%), total: ${requestStream.totalRequests} reqs`);
    } catch (ex) { console.error(`Error while processing: ${domain}`, ex); }
  }

  await tearDown();
}

collectDataset(hostnames);
