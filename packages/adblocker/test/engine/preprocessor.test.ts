import { expect } from 'chai';
import 'mocha';
import { FiltersEngine, Request } from '../../adblocker';
import { PRECONFIGURED_ENV } from '../../src/preprocessor';

describe('preprocessor', () => {
  const request = Request.fromRawDetails({ url: 'https://foo.com' });

  const createEngine = () =>
    new FiltersEngine({
      config: {
        loadPreprocessors: true,
      },
      env: PRECONFIGURED_ENV,
    });

  const testCondition = (condition: string, result: boolean) => {
    const engine = createEngine();
    engine.updateFromDiff({
      added: [
        `!#if ${condition}
||foo.com^
foo.com###test
!#endif`,
      ],
    });

    if (result) {
      expect(engine.match(request).match).to.be.true;
      expect(engine.getCosmeticsFilters(request).styles).include('#test');
    } else {
      expect(engine.match(request).match).to.be.false;
      expect(engine.getCosmeticsFilters(request).styles).to.eql('');
    }
  };

  it('evaluates a condition', () => {
    [
      'ext_ghostery',
      'ext_mv3',
      'env_chromium',
      'env_firefox',
      'env_safari',
      'env_mobile',
      'cap_html_filtering',
      'cap_user_stylesheet',
    ].forEach((condition) => testCondition(condition, true));

    ['adguard', 'false'].forEach((condition) => testCondition(condition, false));
  });

  it('evalutes conditions', () => {
    ['ext_ghostery && adguard', 'ext_ghostery && false'].forEach((condition) =>
      testCondition(condition, false),
    );
    ['adguard && ext_ghostery', 'false && ext_ghostery'].forEach((condition) =>
      testCondition(condition, false),
    );

    ['ext_ghostery || adguard', 'ext_ghostery || false'].forEach((condition) =>
      testCondition(condition, true),
    );
    ['adguard || ext_ghostery', 'false || ext_ghostery'].forEach((condition) =>
      testCondition(condition, true),
    );

    testCondition('false || ext_ghostery && cap_html_filtering || false && ext_mv3', true);
  });
});
