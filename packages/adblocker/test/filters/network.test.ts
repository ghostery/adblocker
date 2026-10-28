/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';
import { FiltersEngine, NetworkFilter, Request, RequestType } from '../../src/index.js';

describe('NetworkFilter', function () {
  context('#getId', function () {
    it('handles $match-case', function () {
      const a = NetworkFilter.parse('/foo/$match-case')!;
      const b = NetworkFilter.parse('/foo/')!;

      expect(a.getId()).not.to.be.eq(b.getId());
      expect(a.getIdWithoutBadFilter()).not.to.be.eq(b.getIdWithoutBadFilter());
    });
  });
  context('#getRegex', function () {
    const regexSource = (line: string) => NetworkFilter.parse(line)!.getRegex().source;

    it('does not compile a leading wildcard into `.*`', function () {
      expect(regexSource('||yandex.*/count/')).to.equal(String.raw`\/count\/`);
      expect(regexSource('||yandex.*/clck/$~ping')).to.equal(String.raw`\/clck\/`);
      expect(regexSource('||example.*/a/*.js')).to.equal(String.raw`\/a\/.*\.js`);
      expect(regexSource('**/ads/')).to.equal(String.raw`\/ads\/`);
    });

    it('keeps separators, anchors and full regex filters untouched', function () {
      expect(regexSource('*^ads^*')).to.equal(String.raw`(?:[^\w\d_.%-]|$)ads(?:[^\w\d_.%-]|$)`);
      expect(regexSource('|foo*bar|')).to.equal(String.raw`^foo.*bar$`);
      expect(regexSource(String.raw`/^https?:\/\/.*\/count\//`)).to.equal(
        String.raw`^https?:\/\/.*\/count\/`,
      );
    });

    it('matches the same requests without the leading wildcard', function () {
      const engine = FiltersEngine.parse('||yandex.*/count/\n||example.*/a/*.js$script', {
        loadCosmeticFilters: false,
      });
      const matches = (url: string, type: RequestType = 'xmlhttprequest') =>
        engine.match(Request.fromRawDetails({ url, sourceUrl: 'https://pikabu.ru/', type })).match;

      expect(matches('https://yandex.ru/count/x')).to.be.true;
      expect(matches('https://an.yandex.ru/ads/count/x?y=1')).to.be.true;
      expect(matches('https://yandex.ru/counter/x')).to.be.false;
      expect(matches('https://yandexx.ru/count/x')).to.be.false;
      expect(matches('https://example.com/count/x')).to.be.false;
      expect(matches('https://example.com/a/b.js', 'script')).to.be.true;
      expect(matches('https://example.com/a/b.css', 'script')).to.be.false;
    });

    it('matches a 10 KB URL in linear time', function () {
      const engine = FiltersEngine.parse('||yandex.*/count/', { loadCosmeticFilters: false });
      const request = Request.fromRawDetails({
        url: `https://yandex.ru/adfox/getBulk/v2?count=1&grab=${'x'.repeat(10_000)}`,
        sourceUrl: 'https://pikabu.ru/',
        type: 'xmlhttprequest',
      });

      engine.match(request);
      const start = performance.now();
      for (let i = 0; i < 10; i++) {
        engine.match(request);
      }
      expect(performance.now() - start).to.be.below(50);
    });
  });
});
