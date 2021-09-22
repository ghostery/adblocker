import { expect } from 'chai';
import 'mocha';

import * as puppeteer from 'puppeteer';
import * as http from 'http';

import {
  fromPuppeteerDetails,
  getHostnameHashesFromLabelsBackward,
  PuppeteerBlocker,
} from '../adblocker';
import { AddressInfo } from 'net';

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

describe('#stylesInjection', () => {
  let server: http.Server;
  let port: number;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  before(async () => {
    server = http
      .createServer((req, res) => {
        if (req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><title>Empty test HTML</title></html>');
        }
      })
      .listen(0, () => {
        const addressInfo = server.address() as AddressInfo;
        port = addressInfo.port;
        console.log('Test server listening on port', port);
      });
    browser = await puppeteer.launch();
    console.log('Puppeteer browser launched.');
    page = await browser.newPage();
    console.log('Puppeteer page opened.');
  });

  it('does not inject styles into original content', async () => {
    const url = `http://localhost:${port}`;
    const stylesInjectionPrefix = '<style';
    const blocker = await PuppeteerBlocker.parse('###Meebo\\:AdElement\\.Root');

    await blocker.enableBlockingInPage(page);
    await page.goto(url, { waitUntil: 'networkidle2' });
    const contentWithoutAds = await page.content();

    await blocker.disableBlockingInPage(page);
    await page.goto(url, { waitUntil: 'networkidle2' });
    const content = await page.content();

    expect(contentWithoutAds).to.contain(stylesInjectionPrefix);
    expect(content).not.to.contain(stylesInjectionPrefix);
  });

  after(async () => {
    await page.close();
    console.log('Puppeteer page closed.');
    await browser.close();
    console.log('Puppeteer browser closed.');
    server.close(() => {
      console.log('Test server closed.');
    });
  });
});
