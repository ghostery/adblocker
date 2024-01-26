import { expect } from 'chai';
import 'mocha';
import { FiltersEngine, Request } from '../../adblocker';
import { PRECONFIGURED_ENV } from '../../src/preprocessor';

describe('preprocessor', () => {
  const fooRequest = Request.fromRawDetails({ url: 'https://foo.com' });
  const barRequest = Request.fromRawDetails({ url: 'https://bar.com' });

  const createEngine = (filters: string) => {
    const engine = new FiltersEngine({
      config: {
        debug: true,
        loadPreprocessors: true,
      },
      env: PRECONFIGURED_ENV,
    });

    engine.updateFromDiff({ added: [filters] });

    return engine;
  };

  const testCondition = (condition: string, result: boolean) => {
    const engine = createEngine(`!#if ${condition}
||foo.com^
foo.com###test
!#else
||bar.com^
bar.com###test
!#endif`);

    if (result) {
      expect(engine.match(fooRequest).match).to.be.true;
      expect(engine.getCosmeticsFilters(fooRequest).styles).include('#test');

      expect(engine.match(barRequest).match).to.be.false;
      expect(engine.getCosmeticsFilters(barRequest).styles).to.eql('');
    } else {
      expect(engine.match(fooRequest).match).to.be.false;
      expect(engine.getCosmeticsFilters(fooRequest).styles).to.eql('');

      expect(engine.match(barRequest).match).to.be.true;
      expect(engine.getCosmeticsFilters(barRequest).styles).include('#test');
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

  it('evaluates conditions', () => {
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

    // Complex condition mixing AND and OR conditions
    testCondition('false || ext_ghostery && cap_html_filtering || false && ext_mv3', true);
    testCondition('ext_ghostery && ext_mv3 || false && cap_html_filtering || false', true);
  });

  it('handles multiple preprocessors', () => {
    const engine = createEngine(`!#if ext_ghostery
||foo.com^
!#endif

!#if ext_mv3
||bar.com^
!#endif`);
    expect(engine.preprocessors.invertMap().size).to.eql(2);
  });

  it('handles duplicate preprocessors', () => {
    const engine = createEngine(`!#if ext_ghostery
||foo.com^
!#endif

!#if ext_ghostery
||bar.com^
!#endif`);
    expect(engine.preprocessors.invertMap().size).to.eql(1);
  });

  it('preserves filter if assigned in other preprocessor', () => {
    const engine = createEngine(`!#if ext_ghostery
||foo.com^
!#else
||bar.com^
!#endif`);

    engine.updateFromDiff({
      removed: [
        `!#if ext_ghostery && false
||foo.com^
!#else
||bar.com^
!#endif`,
      ],
    });
    expect(engine.preprocessors.invertMap().size).to.eql(2);
    expect(engine.match(fooRequest).match).to.be.true;
  });
});
