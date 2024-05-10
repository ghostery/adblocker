/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { Fetch, fetchWithRetry } from '../src/fetch';

describe('#fetchWithRetry', () => {
  const fakeFetchFactory = (numberOfFailures: number): Fetch => {
    return async (_: string) => {
      if (numberOfFailures > 0) {
        numberOfFailures -= 1;
        throw new Error(`Failed: ${numberOfFailures + 1}`);
      }

      return {
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(`${numberOfFailures}`),
      };
    };
  };

  it('succeeds on first try', async () => {
    const response = await fetchWithRetry(fakeFetchFactory(0), 'https://example.com');
    expect(await response.text()).to.equal('0');
  });

  it('succeeds on second try', async () => {
    const response = await fetchWithRetry(fakeFetchFactory(1), 'https://example.com');
    expect(await response.text()).to.equal('0');
  });

  it('succeeds on third try', async () => {
    const response = await fetchWithRetry(fakeFetchFactory(2), 'https://example.com');
    expect(await response.text()).to.equal('0');
  });

  it('succeeds on fourth try', async () => {
    const response = await fetchWithRetry(fakeFetchFactory(3), 'https://example.com');
    expect(await response.text()).to.equal('0');
  });

  it('fails on fifth try', async () => {
    try {
      await fetchWithRetry(fakeFetchFactory(4), 'https://example.com');
      throw new Error('should not reach this point');
    } catch (e) {
      expect(e).to.have.property('message').that.eql('Failed: 1');
    }
  });
});
