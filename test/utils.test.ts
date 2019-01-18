import { List } from '../src/lists';
import {
  binSearch,
  fastHash,
  hasUnicode,
  tokenize,
  updateResponseHeadersWithCSP,
} from '../src/utils';
import requests from './data/requests';
import { loadAllLists } from './utils';

function t(tokens: string[]): Uint32Array {
  return new Uint32Array(tokens.map(fastHash));
}

expect.extend({
  toNotCollideWithOtherFilter(filter: { getId: () => number }, map) {
    const found = map.get(filter.getId());
    if (found !== undefined && found !== filter.toString()) {
      return {
        message: () =>
          `expected ${filter.toString()} to not collide, found ${found} (${filter.getId()})`,
        pass: false,
      };
    }

    return {
      message: () => 'Ok',
      pass: true,
    };
  },
});

function checkCollisions(filters: any[]) {
  const hashes = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    // @ts-ignore
    expect(filter).toNotCollideWithOtherFilter(hashes);
    hashes.set(filter.getId(), filters[i].toString());
  }
}

describe('Utils', () => {
  describe('#fastHash', () => {
    it('does not produce collision on network filters', () => {
      checkCollisions(List.parse(loadAllLists()).getNetworkFilters());
    });

    it('does not produce collision on requests dataset', () => {
      // Collect all raw filters
      checkCollisions(
        List.parse(
          requests.map(({ filters }) => filters.join('\n')).join('\n'),
        ).getNetworkFilters(),
      );
    });

    it('does not produce collision on cosmetic filters', () => {
      checkCollisions(List.parse(loadAllLists()).getCosmeticFilters());
    });
  });

  it('#tokenize', () => {
    expect(tokenize('')).toEqual(t([]));
    expect(tokenize('foo')).toEqual(t(['foo']));
    expect(tokenize('foo/bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo-bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo.bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo.barƬ')).toEqual(t(['foo', 'barƬ']));
  });

  it('#hasUnicode', () => {
    for (let i = 0; i < 127; i += 1) {
      expect(hasUnicode(`foo${String.fromCharCode(i)}`)).toBeFalsy();
    }

    expect(hasUnicode('｡◕ ∀ ◕｡)')).toBeTruthy();
    expect(hasUnicode('｀ｨ(´∀｀∩')).toBeTruthy();
    expect(hasUnicode('__ﾛ(,_,*)')).toBeTruthy();
    expect(hasUnicode('・(￣∀￣)・:*:')).toBeTruthy();
    expect(hasUnicode('ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ')).toBeTruthy();
    expect(hasUnicode(',。・:*:・゜’( ☻ ω ☻ )。・:*:・゜’')).toBeTruthy();
    expect(hasUnicode('(╯°□°）╯︵ ┻━┻)')).toBeTruthy();
    expect(hasUnicode('(ﾉಥ益ಥ）ﾉ ┻━┻')).toBeTruthy();
    expect(hasUnicode('┬─┬ノ( º _ ºノ)')).toBeTruthy();
    expect(hasUnicode('( ͡° ͜ʖ ͡°)')).toBeTruthy();
    expect(hasUnicode('¯_(ツ)_/¯')).toBeTruthy();
  });

  describe('#binSearch', () => {
    it('returns -1 on empty array', () => {
      expect(binSearch(new Uint32Array(0), 42)).toBe(-1);
    });

    it('handles array of one element', () => {
      expect(binSearch(new Uint32Array([1]), 42)).toBe(-1);
      expect(binSearch(new Uint32Array([42]), 42)).toBe(0);
    });

    it('handles array of two elements', () => {
      expect(binSearch(new Uint32Array([0, 1]), 42)).toBe(-1);
      expect(binSearch(new Uint32Array([1, 42]), 42)).toBe(1);
      expect(binSearch(new Uint32Array([42, 1]), 42)).toBe(0);
      expect(binSearch(new Uint32Array([42, 42]), 42)).not.toBe(-1);
    });

    it('handles no match', () => {
      expect(binSearch(new Uint32Array(10000), 42)).toBe(-1);
    });

    it('handles match on first element', () => {
      const array = new Uint32Array(10000);
      for (let i = 1; i < array.length; i += 1) {
        array[i] = 1;
      }
      expect(binSearch(array, 0)).toBe(0);
    });

    it('handles match on last element', () => {
      const array = new Uint32Array(10000);
      array[array.length - 1] = 42;
      expect(binSearch(array, 42)).toBe(array.length - 1);
    });
  });

  describe('#updateResponseHeadersWithCSP', () => {
    const baseDetails: chrome.webRequest.WebResponseHeadersDetails = {
      frameId: 42,
      method: 'POST',
      parentFrameId: 42,
      requestId: '42',
      statusCode: 200,
      statusLine: '',
      tabId: 42,
      timeStamp: 0,
      type: 'main_frame',
      url: 'https://foo.com',
    };

    it('does not update if no policies', () => {
      expect(updateResponseHeadersWithCSP(baseDetails, undefined)).toEqual({});
    });

    it('creates headers if they do not exist', () => {
      expect(updateResponseHeadersWithCSP(baseDetails, 'CSP')).toEqual({
        responseHeaders: [{ name: 'content-security-policy', value: 'CSP' }],
      });
    });

    it('create csp header if not exist', () => {
      expect(updateResponseHeadersWithCSP({ ...baseDetails, responseHeaders: [] }, 'CSP')).toEqual(
        {
          responseHeaders: [{ name: 'content-security-policy', value: 'CSP' }],
        },
      );
    });

    it('leaves other headers unchanged', () => {
      expect(
        updateResponseHeadersWithCSP(
          { ...baseDetails, responseHeaders: [{ name: 'header1', value: 'value1' }] },
          'CSP',
        ),
      ).toEqual({
        responseHeaders: [
          { name: 'header1', value: 'value1' },
          { name: 'content-security-policy', value: 'CSP' },
        ],
      });
    });

    it('updates existing csp policies', () => {
      // Lower-case header name
      expect(
        updateResponseHeadersWithCSP(
          {
            ...baseDetails,
            responseHeaders: [{ name: 'cOnTeNt-Security-policy', value: 'CSP1' }],
          },
          'CSP',
        ),
      ).toEqual({
        responseHeaders: [{ name: 'content-security-policy', value: 'CSP; CSP1' }],
      });
    });
  });
});
