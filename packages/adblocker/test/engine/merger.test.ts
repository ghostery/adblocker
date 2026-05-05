/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import xxhash from 'xxhash-wasm';
import FilterEngine from '../../src/engine/engine.js';
import Resources from '../../src/resources.js';
import { Metadata } from '../../src/engine/metadata.js';
import {
  binaryMerge,
  legacyMerge,
  mergeLists,
  mergeMetadata,
  mergePreprocessors,
} from '../../src/engine/merger.js';
import type { HashFunc } from '../../src/engine/merger.js';

describe('#mergeMetadata', () => {
  function createRawMetadata(key: string) {
    return {
      organizations: {
        [key]: {
          key,
          name: key,
          description: null,
          website_url: null,
          country: null,
          privacy_policy_url: null,
          privacy_contact: null,
          ghostery_id: null,
        },
      },
      categories: {
        [key]: {
          key,
          name: key,
          color: '#fff',
          description: key,
        },
      },
      patterns: {
        [key]: {
          key,
          name: key,
          category: key,
          organization: null,
          alias: null,
          website_url: null,
          ghostery_id: null,
          domains: [key],
          filters: [key],
        },
      },
    };
  }

  it('merges metadata from both engines', () => {
    const engine1 = FilterEngine.empty();
    engine1.metadata = new Metadata(createRawMetadata('foo'));
    const engine2 = FilterEngine.empty();
    engine2.metadata = new Metadata(createRawMetadata('bar'));

    const metadata = mergeMetadata([engine1, engine2]);
    expect(Object.keys(metadata.categories)).to.have.length(2);
    expect(Object.keys(metadata.organizations)).to.have.length(2);
    expect(Object.keys(metadata.patterns)).to.have.length(2);
  });

  it('removes duplicates', () => {
    const engine1 = FilterEngine.empty();
    engine1.metadata = new Metadata(createRawMetadata('foo'));
    const engine2 = FilterEngine.empty();
    engine2.metadata = new Metadata(createRawMetadata('foo'));

    const metadata = mergeMetadata([engine1, engine2]);
    expect(Object.keys(metadata.categories)).to.have.length(1);
    expect(Object.keys(metadata.organizations)).to.have.length(1);
    expect(Object.keys(metadata.patterns)).to.have.length(1);
  });
});

describe('#mergeLists', () => {
  it('merges lists from both engines', () => {
    const engine1 = new FilterEngine({ lists: new Map([['a', 'a']]) });
    const engine2 = new FilterEngine({ lists: new Map([['b', 'b']]) });

    expect(mergeLists([engine1, engine2])).to.deep.equal(
      new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]),
    );
    // Check that the original engines are not modified

    expect(engine1)
      .to.have.property('lists')
      .that.deep.equal(new Map([['a', 'a']]));

    expect(engine2)
      .to.have.property('lists')
      .that.deep.equal(new Map([['b', 'b']]));
  });

  it('removes duplicates', () => {
    const engine1 = new FilterEngine({ lists: new Map([['a', 'a']]) });
    const engine2 = new FilterEngine({ lists: new Map([['a', 'a']]) });

    expect(mergeLists([engine1, engine2])).to.deep.equal(new Map([['a', 'a']]));
  });
});

describe('#mergePreprocessors', () => {
  it('merges preprocessors from both engines', () => {
    const preprocessors = mergePreprocessors([
      FilterEngine.parse(
        `
          ###foo
          !#if env_test
          bar
          !#endif
        `,
        { loadPreprocessors: true },
      ),
      FilterEngine.parse(
        `
          !#if env_ghostery
          ###foo
          !#endif
          bar
        `,
        { loadPreprocessors: true },
      ),
    ]);

    expect(preprocessors).to.have.length(2);
  });

  it('removes duplicates', () => {
    const preprocessors = mergePreprocessors([
      FilterEngine.parse(
        `
          !#if env_ghostery
          bar
          !#endif
        `,
        { loadPreprocessors: true },
      ),
      FilterEngine.parse(
        `
          !#if env_ghostery
          ###foo
          !#endif
        `,
        { loadPreprocessors: true },
      ),
    ]);

    expect(preprocessors).to.have.length(1);
    expect(preprocessors[0].filterIDs).to.have.property('size', 2);
  });
});

describe('#legacyMerge', () => {
  it('throws with no or one engine', () => {
    const error = 'merging engines requires at least two engines';
    // @ts-expect-error Expected to throw an error
    expect(() => legacyMerge.call(FilterEngine)).to.throw(error);
    expect(() => legacyMerge.call(FilterEngine, [])).to.throw(error);
    expect(() => legacyMerge.call(FilterEngine, [FilterEngine.empty()])).to.throw(error);
  });

  it('merges empty engines', () => {
    const filters = legacyMerge
      .call(FilterEngine, [FilterEngine.empty(), FilterEngine.empty()])
      .getFilters();
    expect(filters).to.have.property('networkFilters').that.have.length(0);
    expect(filters).to.have.property('cosmeticFilters').that.have.length(0);
  });

  context('with network filters', () => {
    it('merges filters from both engines', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('foo'), FilterEngine.parse('bar')])
        .getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(2);
    });

    it('removes duplicates', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('foo$third-party'), FilterEngine.parse('foo$3p')])
        .getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(1);
    });

    it('merges $removeparam', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('foo$removeparam=zar'), FilterEngine.parse('bar')])
        .getFilters();
      expect(filters).to.have.property('networkFilters').that.have.length(2);
    });
  });

  context('with cosmetic filters', () => {
    it('merges filters from both engines', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('###foo'), FilterEngine.parse('###bar')])
        .getFilters();
      expect(filters).to.have.property('cosmeticFilters').that.have.length(2);
    });

    it('removes duplicates', () => {
      const filters = legacyMerge
        .call(FilterEngine, [FilterEngine.parse('###foo'), FilterEngine.parse('###foo')])
        .getFilters();
      expect(filters).to.have.property('cosmeticFilters').that.have.length(1);
    });
  });

  context('configs', () => {
    it('does not throw with different configs - takes values from first', () => {
      const engine1 = FilterEngine.empty({ loadCosmeticFilters: true });
      const engine2 = FilterEngine.empty({ loadCosmeticFilters: false });
      const engine = FilterEngine.merge([engine1, engine2]);
      expect(engine.config).to.have.property('loadCosmeticFilters').that.equal(true);
    });

    it('throws on inconsistent compression', () => {
      const engine1 = FilterEngine.empty({ enableCompression: true });
      const engine2 = FilterEngine.empty({ enableCompression: false });
      expect(() => FilterEngine.merge([engine1, engine2])).to.throw(
        'compression of all merged engines must match with the first one: "true" but got: "false"',
      );
    });

    it('allows config override', () => {
      const engine1 = FilterEngine.empty({ enableCompression: false });
      const engine2 = FilterEngine.empty({ enableCompression: false });
      const engine = FilterEngine.merge([engine1, engine2], {
        overrideConfig: { enableCompression: true },
      });
      expect(engine.config).to.have.property('enableCompression').that.equal(true);
    });
  });

  context('with resources', () => {
    it('throws with different checksums', () => {
      const engine1 = FilterEngine.empty();
      const engine2 = FilterEngine.empty();
      engine1.resources = new Resources({ checksum: '1' });
      engine2.resources = new Resources({ checksum: '2' });
      expect(() => FilterEngine.merge([engine1, engine2])).to.throw(
        'resource checksum of all merged engines must match with the first one: "1" but got: "2"',
      );
    });
  });
});

describe('#binaryMerge', () => {
  let hashFunc: HashFunc;

  before(async () => {
    // Having custom hash function is unavoidable in the real world scenario and
    // it's nice to have an example in the test code.
    const hasher = await xxhash();
    hashFunc = (arr: Uint8Array, beg: number, end: number) => {
      return hasher.h64Raw(arr.subarray(beg, end));
    };
  });

  it('throws with no or one engine', () => {
    const error = 'merging engines requires at least two engines';
    // @ts-expect-error Expected to throw an error
    expect(() => binaryMerge.call(FilterEngine)).to.throw(error);
    expect(() => binaryMerge.call(FilterEngine, [], { hashFunc })).to.throw(error);
    expect(() => binaryMerge.call(FilterEngine, [FilterEngine.empty()], { hashFunc })).to.throw(
      error,
    );
  });

  it('merges empty engines', () => {
    const filters = binaryMerge
      .call(FilterEngine, [FilterEngine.empty(), FilterEngine.empty()], { hashFunc })
      .getFilters();
    expect(filters).to.have.property('networkFilters').that.have.length(0);
    expect(filters).to.have.property('cosmeticFilters').that.have.length(0);
  });

  context('with filters', () => {
    // Detailed filter merging and deduplication behavior is covered by
    // test/reverse-index.test.ts and test/engine/bucket/filters.test.ts;
    // this test belongs here because it verifies FilterEngine-level binaryMerge
    // orchestration, bucket wiring, and hashFunc forwarding.
    it('merges representative filter buckets through binary bucket mergers', () => {
      let hashCalls = 0;
      const recordingHashFunc: HashFunc = (arr, beg, end) => {
        hashCalls += 1;

        return hashFunc(arr, beg, end);
      };
      const filters = binaryMerge
        .call(
          FilterEngine,
          [
            FilterEngine.parse('foo\nfoo$removeparam=bar\n###ad'),
            FilterEngine.parse('bar\nfoo$removeparam=bar\n###ad'),
          ],
          { hashFunc: recordingHashFunc },
        )
        .getFilters();

      expect(filters).to.have.property('networkFilters').that.have.length(3);
      expect(filters).to.have.property('cosmeticFilters').that.have.length(1);
      expect(hashCalls).to.be.greaterThan(0);
    });
  });

  context('configs', () => {
    it('does not throw with different configs - takes values from first', () => {
      const engine1 = FilterEngine.empty({ loadCosmeticFilters: true });
      const engine2 = FilterEngine.empty({ loadCosmeticFilters: false });
      const engine = binaryMerge.call(FilterEngine, [engine1, engine2], { hashFunc });
      expect(engine.config).to.have.property('loadCosmeticFilters').that.equal(true);
    });

    it('throws on inconsistent compression', () => {
      const engine1 = FilterEngine.empty({ enableCompression: true });
      const engine2 = FilterEngine.empty({ enableCompression: false });
      expect(() => binaryMerge.call(FilterEngine, [engine1, engine2], { hashFunc })).to.throw(
        'compression of all merged engines must match with the first one: "true" but got: "false"',
      );
    });

    it('throws with debug source engine', () => {
      const engine1 = FilterEngine.empty({ debug: true });
      const engine2 = FilterEngine.empty();
      expect(() => binaryMerge.call(FilterEngine, [engine1, engine2], { hashFunc })).to.throw(
        'merging engines with binaryMerge method is not allowed with debug mode strictly!',
      );
    });

    it('throws on debug config override', () => {
      const engine1 = FilterEngine.empty();
      const engine2 = FilterEngine.empty();
      expect(() =>
        binaryMerge.call(FilterEngine, [engine1, engine2], {
          hashFunc,
          overrideConfig: { debug: true },
        }),
      ).to.throw(
        'the resulting engine cannot have debug or compression when merging engines with binaryMerge method!',
      );
    });

    it('throws on compression config override', () => {
      const engine1 = FilterEngine.empty();
      const engine2 = FilterEngine.empty();
      expect(() =>
        binaryMerge.call(FilterEngine, [engine1, engine2], {
          hashFunc,
          overrideConfig: { enableCompression: true },
        }),
      ).to.throw(
        'the resulting engine cannot have debug or compression when merging engines with binaryMerge method!',
      );
    });

    it('allows config override', () => {
      const engine1 = FilterEngine.empty({ loadCosmeticFilters: true });
      const engine2 = FilterEngine.empty({ loadCosmeticFilters: true });
      const engine = binaryMerge.call(FilterEngine, [engine1, engine2], {
        hashFunc,
        overrideConfig: { loadCosmeticFilters: false },
      });
      expect(engine.config).to.have.property('loadCosmeticFilters').that.equal(false);
    });
  });

  context('with resources', () => {
    it('throws with different checksums', () => {
      const engine1 = FilterEngine.empty();
      const engine2 = FilterEngine.empty();
      engine1.resources = new Resources({ checksum: '1' });
      engine2.resources = new Resources({ checksum: '2' });
      expect(() => binaryMerge.call(FilterEngine, [engine1, engine2], { hashFunc })).to.throw(
        'resource checksum of all merged engines must match with the first one: "1" but got: "2"',
      );
    });
  });
});
