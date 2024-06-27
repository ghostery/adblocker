import { expect } from 'chai';
import 'mocha';

import * as http from 'node:http';
import * as e2e from '../e2e';

async function request(url: string | URL) {
  return new Promise<{
    statusCode: number;
    headers: http.IncomingHttpHeaders;
    body: string;
  }>((resolve, reject) => {
    let buffer = '';

    http.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk: Buffer | string) => {
        buffer += chunk.toString();
      });
      res.once('end', () => {
        resolve({
          statusCode: res.statusCode || -1,
          headers: res.headers,
          body: buffer,
        });
      });
      res.once('error', (error: Error) => {
        reject(error);
      });
    });
  });
}

describe('#createServer', () => {
  let server: http.Server;
  let address: string;

  before(async () => {
    server = e2e.createServer();
    address = await new Promise<string>((resolve, reject) => {
      server.listen(0, '127.0.0.1', () => {
        const addressInfo = server.address();

        if (typeof addressInfo === 'string') {
          resolve(addressInfo);
        } else if (addressInfo !== null) {
          resolve(`http://${addressInfo.address}:${addressInfo.port}/`);
        } else {
          reject(new Error('Failed to initialise the test server!'));
        }
      });
    });
    console.log('Test server listening at', address);
  });

  it('handles index file', async () => {
    const response = await request(address);

    expect(response.statusCode).to.be.eql(200);
    expect(response.headers['content-type']).to.be.eql('text/html');
  });

  it('handles typescript compilation', async () => {
    const url = new URL(address);
    url.pathname = '/script.ts';

    const response = await request(url);

    expect(response.statusCode).to.be.eql(200);
    expect(response.headers['content-type']).to.be.eql('text/javascript');
    // Check if the transpilation is done for browsers
    expect(response.body).not.to.include('Object.defineProperty(exports');
  });

  after(async () => {
    server.close(() => {
      console.log('Test server closed.');
    });
  });
});
