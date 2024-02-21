import { expect } from 'chai';
import 'mocha';
import { Env, evaluate } from '../src/preprocessor';
import FilterEngine from '../src/engine/engine';
import { Config, Request } from '../adblocker';

describe('conditions', () => {
  const env = new Env();

  it('resolves a condition', () => {
    expect(evaluate('false', env), 'evaluates non-existing value to false').to.be.false;

    env.set('ext_ghostery', true);

    expect(evaluate('ext_ghostery', env), 'evaluates existing value to true').to.be.true;

    env.set('ext_ubol', false);

    expect(evaluate('ext_ubol', env), 'evaluates falsy value to false').to.be.false;
  });

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

  const config = new Config({
    loadPreprocessors: true,
  });

  const env = new Env();

  env.set('ext_ghostery', true);
  env.set('ext_devbuild', true);

  const engine = new FilterEngine({ env, config });

  const doTest = (filters: string) => {
    engine.updateFromDiff({ added: [filters] });

    expect(engine.match(requests.foo).match).to.be.true;
    expect(engine.match(requests.bar).match).to.be.false;

    engine.updateFromDiff({ removed: [filters] });
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
!#if ext_ghostery
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
    // If there're multiple conditions spread, the conditions will be merged
    doTest(`!#if ext_ghostery
||foo.com^
!#endif
!#if ext_devbuild
||foo.com^
!#endif
!#if false
||bar.com^
!#endif
!#if ext_ghostery
||bar.com^
!#endif`);
  });
});
