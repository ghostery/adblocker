import Engine from '../src/engine/engine';
import { parseNetworkFilter } from '../src/parsing/network-filter';
import requests from './data/requests';

interface Dict {
  [s: string]: number;
}

const types: Dict = {
  // maps string (web-ext) to int (FF cpt)
  beacon: 19,
  csp_report: 17,
  font: 14,
  image: 3,
  imageset: 21,
  main_frame: 6,
  media: 15,
  object: 5,
  object_subrequest: 12,
  other: 1,
  ping: 10,
  script: 2,
  stylesheet: 4,
  sub_frame: 7,
  web_manifest: 22,
  websocket: 16,
  xbl: 9,
  xml_dtd: 13,
  xmlhttprequest: 11,
  xslt: 18,
};

function createEngine(filters: string) {
  const newEngine = new Engine({
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  newEngine.onUpdateFilters([{
    asset: 'filters',
    checksum: '',
    filters,
  }], new Set());

  return newEngine;
}

// TODO: test with/without optimizations enabled
describe('#FiltersEngine', () => {
  describe('all filters', () => {
    // Collect all filters
    const engine = createEngine(
      requests
      .map(({ filter, exception }) => `${filter || ''}\n${exception || ''}`)
      .join('\n'),
    );

    requests.forEach(({ filter, exception, cpt, url, sourceUrl }) => {
      it(`${filter}, ${exception}, ${cpt}, ${url}, ${sourceUrl}`, () => {
        const result = engine.match({
          cpt: types[cpt],
          sourceUrl,
          url,
        });

        // Check filter
        if (filter !== undefined) {
          // expect(result.filter).not.toBeUndefined();
          expect('' + result.filter).toEqual('' + parseNetworkFilter(filter));
        } else {
          expect(result.filter).toBeUndefined();
        }

        // Check exception
        if (exception !== undefined) {
          expect(result.exception).not.toBeUndefined();
          expect('' + result.exception).toEqual('' + parseNetworkFilter(exception));
        } else {
          expect(result.exception).toBeUndefined();
        }
      });
    });
  });

  it('one filter at a time', () => {
    requests.forEach(({ filter, exception, cpt, url, sourceUrl }) => {
      const engine = createEngine(`${filter || ''}\n${exception || ''}`);
      const result = engine.match({
        cpt: types[cpt],
        sourceUrl,
        url,
      });

      // Check filter
      if (filter !== undefined) {
        expect(result.filter).not.toBeUndefined();
        expect('' + result.filter).toEqual('' + parseNetworkFilter(filter));
      } else {
        expect(result.filter).toBeUndefined();
      }

      // Check exception
      if (exception !== undefined) {
        expect(result.exception).not.toBeUndefined();
        expect('' + result.exception).toEqual('' + parseNetworkFilter(exception));
      } else {
        expect(result.exception).toBeUndefined();
      }
    });
  });
});

function checkEngine() {
  const engine = new Engine({
    loadCosmeticFilters: true,
    loadNetworkFilters: false,
    optimizeAOT: false,
    version: 1,
  });

  engine.onUpdateFilters(
    [{ filters: '## .foo', checksum: '', asset: '' }],
    new Set(),
  );

  // TODO - check results
  engine.getCosmeticsFilters('', [['.foo']]);
}

describe('Engine Cosmetics', () => {
  it('TODO', () => {
    checkEngine();
  });
});
