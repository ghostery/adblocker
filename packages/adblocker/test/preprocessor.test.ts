import { expect } from 'chai';
import 'mocha';
import { Env, evaluate } from '../src/preprocessor';
import FilterEngine from '../src/engine/engine';
import { Request, generateDiff } from '../adblocker';

describe('conditions', () => {
  it('resolves a condition', () => {
    const localEnv = new Env();

    expect(evaluate('false', localEnv), 'evaluates non-existing value to false').to.be.false;

    localEnv.set('ext_ghostery', true);

    expect(evaluate('ext_ghostery', localEnv), 'evaluates existing value to true').to.be.true;

    localEnv.set('ext_ubol', false);

    expect(evaluate('ext_ubol', localEnv), 'evaluates falsy value to false').to.be.false;
  });

  const env = new Env();

  env.set('ext_ghostery', true);
  env.set('ext_ublock', true);

  it('resolves AND conditions', () => {
    // For later performance reasons, we don't support directly calculating conditions with spaces
    expect(evaluate('ext_ghostery&&ext_ublock', env)).to.be.true;
    expect(evaluate('ext_ghostery&&false', env)).to.be.false;
    expect(evaluate('false&&ext_ghostery', env)).to.be.false;
    expect(evaluate('ext_ghostery&&false&&ext_ublock', env)).to.be.false;
  });

  it('resolves OR conditions', () => {
    expect(evaluate('ext_ghostery||ext_ublock', env)).to.be.true;
    expect(evaluate('ext_ghostery||false', env)).to.be.true;
    expect(evaluate('false||ext_ghostery', env)).to.be.true;
    expect(evaluate('ext_ghostery||false||ext_ublock', env)).to.be.true;
  });

  it('resolves mixed conditions', () => {
    expect(evaluate('ext_ghostery||false&&ext_ublock', env)).to.be.true;
    expect(evaluate('false||ext_ghostery||false', env)).to.be.true;
    expect(evaluate('somethingcannotexiststring&&ext_ublock||false', env)).to.be.false;
  });

  it('resolves parenthesis', () => {
    expect(evaluate('(true)', env)).to.be.true;
    expect(evaluate('((true))', env)).to.be.true;
    expect(evaluate('(true||false)&&true', env)).to.be.true;
  });

  it('drops invalid conditions', () => {
    expect(evaluate('', env)).to.be.false;
    expect(evaluate('||', env)).to.be.false;
    expect(evaluate('true&&', env)).to.be.false;
    expect(evaluate('&&true', env)).to.be.false;
    expect(evaluate('&&true&&', env)).to.be.false;
    expect(evaluate('*', env)).to.be.false;
    expect(evaluate('(', env)).to.be.false;
    expect(evaluate(')', env)).to.be.false;
    expect(evaluate('()', env)).to.be.false;
    expect(evaluate('true&&()', env)).to.be.false;
    expect(evaluate('true)', env)).to.be.false;
    expect(evaluate('(true', env)).to.be.false;
    expect(evaluate('((true)', env)).to.be.false;
    expect(evaluate('true((true)', env)).to.be.false;
  });
});

describe('preprocessors', () => {
  const requests = {
    foo: Request.fromRawDetails({ url: 'https://foo.com' }),
    bar: Request.fromRawDetails({ url: 'https://bar.com' }),
  };

  const env = new Env();
  env.set('ext_ghostery', true);
  env.set('ext_devbuild', true);

  const doTest = (filters: string, thisEnv = env) => {
    const customErrorMessage = (request: Request, filters: string, env: Env) => {
      return `Engine should match request ${request.url} for filters: \n\n${filters}\n\n with env \n\n${JSON.stringify(env, null, 2)}\n\n`;
    };

    const engine1 = FilterEngine.parse(filters, {
      loadPreprocessors: true,
    });
    engine1.updateEnv(thisEnv);

    expect(
      engine1.match(requests.foo),
      customErrorMessage(requests.foo, filters, thisEnv),
    ).to.have.property('match', true);
    expect(
      engine1.match(requests.bar),
      customErrorMessage(requests.bar, filters, thisEnv),
    ).to.have.property('match', false);

    const engine2 = new FilterEngine({ config: { loadPreprocessors: true } });
    const diff = generateDiff('', filters, engine2.config);
    engine2.updateFromDiff(diff, thisEnv);

    expect(
      engine2.match(requests.foo),
      customErrorMessage(requests.foo, filters, thisEnv),
    ).to.have.property('match', true);
    expect(
      engine2.match(requests.bar),
      customErrorMessage(requests.bar, filters, thisEnv),
    ).to.have.property('match', false);
  };

  // Testing `!#else` means we already aware of parenthesis.
  it('resolves a condition', () => {
    doTest(`!#if ext_ghostery
||foo.com^
!#else
||bar.com^
!#endif`);
    doTest(`!#if false
||bar.com^
!#else
||foo.com^
!#endif`);
  });

  it('resolves multiple conditions', () => {
    doTest(`!#if ext_ghostery && ext_devbuild
||foo.com^
!#else
||bar.com^
!#endif`);
    doTest(`!#if false || ext_devbuild
||foo.com^
!#else
||bar.com^
!#endif`);
    doTest(`!#if ext_devbuild || false
||foo.com^
!#else
||bar.com^
!#endif`);
  });

  it('resolves conditions with spaces', () => {
    doTest(`!#if ext_ghostery      && ext_devbuild
||foo.com^
!#else
||bar.com^
!#endif`);
  });

  it('resolves nested conditions', () => {
    doTest(`!#if ext_ghostery
||foo.com^
!#if false
||bar.com^
!#endif
!#endif`);
    doTest(`!#if ext_ghostery
!#if ext_devbuild
||foo.com^
!#else
||bar.com^
!#endif
!#endif`);
    doTest(`!#if false
||bar.com^
!#else
!#if ext_ghostery
||foo.com^
!#endif
!#endif`);
  });

  it('resolves spread conditions', () => {
    doTest(`!#if ext_ghostery
!#if false
||bar.com^
!#endif
!#if ext_devbuild
||foo.com^
!#endif
!#endif`);
  });

  it('ignores all conditions with empty env', () => {
    const emptyEnv = new Env();

    emptyEnv.set('true', false);

    doTest(
      `||foo.com^
!#if false
||bar.com^
!#endif
!#if ext_devbuild
@@||foo.com^
!#endif
!#if true
@@||foo.com^
!#endif`,
      emptyEnv,
    );
  });

  it('rejects a filter even any of conditions fail', () => {
    doTest(
      `||foo.com^
!#if ext_ghostery
@@||foo.com^
!#endif
!#if false
@@||foo.com^
!#endif`,
    );
  });

  it('rejects filter with conflicting conditions', () => {
    doTest(
      `||foo.com^
!#if ext_ghostery
||bar.com^
!#else
||bar.com^
!#endif`,
    );

    doTest(
      `||foo.com^
!#if !ext_ghostery
||bar.com^
!#endif
!#if ext_ghostery
||bar.com^
!#endif`,
    );
  });
});

describe('updating', () => {
  it('correctly distinguishes filters and filters with conditions', () => {
    const engine = FilterEngine.parse(`||foo.com^`, {
      loadPreprocessors: true,
    });

    engine.updateFromDiff({
      preprocessors: {
        true: {
          added: ['||foo.com^'],
        },
      },
    });

    expect(engine.getFilters().networkFilters.length).to.be.eql(1);

    engine.updateFromDiff({
      preprocessors: {
        true: {
          removed: ['||foo.com^'],
        },
      },
    });

    expect(engine.getFilters().networkFilters.length).to.be.eql(1);

    const youtubeFilter = 'youtube.com##+js(test)';
    engine.updateFromDiff({
      added: [youtubeFilter],
      preprocessors: {
        true: {
          added: [youtubeFilter],
        },
      },
    });

    expect(engine.cosmetics.getFilters()).to.have.length(1);
  });
});
