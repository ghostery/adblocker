/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { JSDOM } from 'jsdom';

import { querySelectorAll, matchPattern, matches } from '../src/eval';
import { parse } from '../src/parse';

// TODO - check if style:has-text() works (can select style?)

function testMatches(selector: string, html: string, target: string, expected: boolean): void {
  const {
    window: { document },
  } = new JSDOM(html);

  const ast = parse(selector);
  expect(ast).to.not.be.undefined;
  if (ast === undefined) {
    return;
  }

  const element = target === 'document' ? document : document.querySelector(target);
  expect(element).to.not.be.null;
  if (element !== null) {
    // NOTE: here we need to ignore the type warnings so that we can pass a
    // `Document` argument to test some edge cases (e.g. textContent returns
    // null on document).
    // @ts-ignore
    const result = matches(element, ast);
    expect(result).to.equal(expected);
  }
}

function testQuerySelectorAll(selector: string, html: string, resultSelector?: string): void {
  const {
    window: { document },
  } = new JSDOM(html);

  const ast = parse(selector);
  expect(ast).to.not.be.undefined;
  if (ast === undefined) {
    return;
  }

  const expected = Array.from(
    document.querySelectorAll(resultSelector !== undefined ? resultSelector : selector),
  );
  expect(expected).to.not.be.empty;
  expect(querySelectorAll(document.documentElement, ast)).to.have.members(expected);
}

describe('eval', () => {
  describe('#matchPattern', () => {
    it('handles plain pattern', () => {
      expect(matchPattern('bar', 'foo bar baz')).to.be.true;
    });

    it('matching is case sensitive', () => {
      expect(matchPattern('bar', 'foo Bar baz')).to.be.false;
      expect(matchPattern('BAR', 'foo bar baz')).to.be.false;
    });

    it('handle literal regex', () => {
      expect(matchPattern('/ba[a-z]/', 'foo baz')).to.be.true;
    });

    it('handle case-insensitive literal regex', () => {
      expect(matchPattern('/ba[a-z]/i', 'foo BAZ')).to.be.true;
    });
  });

  describe('#matches', () => {
    describe('attribute', () => {
      it('exact match', () => {
        testMatches(
          '[attr1="abcde"]',
          '<!DOCTYPE html><p class="some_class"><a attr1="abcde" attr2="123" href="https://foo.com">Hello</a> <span>world</span></p>',
          '[attr1="abcde"]',
          true,
        );
      });
    });

    describe('type (span)', () => {
      it('exact match', () => {
        testMatches(
          'span',
          '<!DOCTYPE html><p class="some_cls">Hello <span>world</span></p>',
          'span',
          true,
        );
      });

      it('no match', () => {
        testMatches(
          'p',
          '<!DOCTYPE html><p class="some_cls">Hello <span>world</span></p>',
          'span',
          false,
        );
      });
    });

    describe('#id', () => {
      it('exact match', () => {
        testMatches(
          '#some_id',
          '<!DOCTYPE html><p id="some_id">Hello world</p>',
          '#some_id',
          true,
        );
      });

      it('does not match if #id is different', () => {
        testMatches(
          '#some_id2',
          '<!DOCTYPE html><p id="some_id">Hello world</p>',
          '#some_id',
          false,
        );
      });

      it('does not match if #id is nested', () => {
        testMatches(
          '#some_id2',
          '<!DOCTYPE html><p id="some_id">Hello <span id="some_id2">world</span></p>',
          '#some_id',
          false,
        );
      });
    });

    describe('.class', () => {
      it('exact match', () => {
        testMatches(
          '.some_cls',
          '<!DOCTYPE html><p class="some_cls">Hello world</p>',
          '.some_cls',
          true,
        );
      });

      it('does not match if .class is different', () => {
        testMatches(
          '.some_cls2',
          '<!DOCTYPE html><p class="some_cls">Hello world</p>',
          '.some_cls',
          false,
        );
      });

      it('does not match if .class is nested', () => {
        testMatches(
          '.some_cls2',
          '<!DOCTYPE html><p class="some_cls">Hello <span class="some_cls2">world</span></p>',
          '.some_cls',
          false,
        );
      });
    });

    describe('list (,)', () => {
      it('handle two selectors', () => {
        testMatches(
          '.some_cls1,.some_cls2',
          '<!DOCTYPE html><p class="some_cls1">Hello <span class="some_cls2">world</span></p>',
          '.some_cls1',
          true,
        );

        testMatches(
          '.some_cls1,.some_cls2',
          '<!DOCTYPE html><p class="some_cls1">Hello <span class="some_cls2">world</span></p>',
          '.some_cls2',
          true,
        );
      });
    });

    describe(':min-text-length', () => {
      it('match if text has right size', () => {
        testMatches(
          ':min-text-length(11)',
          '<!DOCTYPE html><p class="some_cls">Hello <span class="some_cls2">world</span></p>',
          '.some_cls',
          true,
        );
      });

      it('does not match if text size it too small', () => {
        testMatches(
          ':min-text-length(12)',
          '<!DOCTYPE html><p class="some_cls">Hello <span class="some_cls2">world</span></p>',
          '.some_cls',
          false,
        );
      });

      it('does not match if text is null', () => {
        testMatches(
          ':min-text-length(1)',
          '<!DOCTYPE html><p class="some_cls">Hello <span class="some_cls2">world</span></p>',
          'document',
          false,
        );
      });

      it('does not match if length is negative', () => {
        testMatches(
          ':min-text-length(-1)',
          '<!DOCTYPE html><p class="some_cls">Hello <span class="some_cls2">world</span></p>',
          '.some_cls',
          false,
        );
      });

      it('does not match if length is not a number', () => {
        testMatches(
          ':min-text-length(foo)',
          '<!DOCTYPE html><p class="some_cls">Hello <span class="some_cls2">world</span></p>',
          '.some_cls',
          false,
        );
      });
    });

    describe(':has-text', () => {
      it('missing pattern matches no element', () => {
        testMatches(
          '.cls:has-text',
          [
            '<!DOCTYPE html>',
            '<head></head>',
            '<body>',
            '<div id="n1" class="cls"><span>foo bar baz</span></div>',
            '<p id="n2" class="cls">Go to the pub!</p>',
            '</body>',
          ].join('\n'),
          '#n1',
          false,
        );
      });

      it('empty pattern matches any element', () => {
        testMatches(
          '.cls:has-text()',
          [
            '<!DOCTYPE html>',
            '<head></head>',
            '<body>',
            '<div id="n1" class="cls"><span>foo bar baz</span></div>',
            '<p id="n2" class="cls">Go to the pub!</p>',
            '</body>',
          ].join('\n'),
          '#n1',
          true,
        );
      });

      it('does not match against document directly because textContent is null', () => {
        testMatches(
          ':has-text()',
          [
            '<!DOCTYPE html>',
            '<head></head>',
            '<body>',
            '<div id="n1" class="cls"><span>foo bar baz</span></div>',
            '<p id="n2" class="cls">Go to the pub!</p>',
            '</body>',
          ].join('\n'),
          'document',
          false,
        );
      });
    });
  });

  describe('#querySelectorAll', () => {
    it('#id', () => {
      testQuerySelectorAll('#some_id', '<!DOCTYPE html><p id="some_id">Hello world</p>');
    });

    it('.class', () => {
      testQuerySelectorAll('.some_class', '<!DOCTYPE html><p class="some_class">Hello world</p>');
    });

    it('type (span)', () => {
      testQuerySelectorAll(
        'span',
        '<!DOCTYPE html><p class="some_class"><span>Hello</span> <span>world</span></p>',
      );
    });

    it('attribute', () => {
      testQuerySelectorAll(
        'a[attr1="abcde"][attr2="123"]',
        '<!DOCTYPE html><p class="some_class"><a attr1="abcde" attr2="123" href="https://foo.com">Hello</a> <span>world</span></p>',
      );
    });

    it('comma', () => {
      testQuerySelectorAll(
        '#id, .cls',
        '<!DOCTYPE html><p class="cls">Hello <span id="id">world</span></p>',
      );

      testQuerySelectorAll(
        'span, p',
        '<!DOCTYPE html><p class="some_class"><span>Hello</span> <span>world</span></p>',
      );
    });

    it('compound', () => {
      testQuerySelectorAll('.cls1.cls2', '<!DOCTYPE html><p class="cls1 cls2">Hello world</p>');
    });

    it('complex: <space>', () => {
      testQuerySelectorAll(
        '.cls1 .cls2',
        '<!DOCTYPE html><p class="cls1">Hello <span class="cls2">world</span></p>',
      );
    });

    it('complex: >', () => {
      testQuerySelectorAll(
        '.cls1 > .cls2',
        '<!DOCTYPE html><p class="cls1">Hello <span class="cls2">world</span><span class="cls2">!</span></p>',
      );
    });

    it('complex: ~', () => {
      testQuerySelectorAll(
        '.cls2 ~ .cls3',
        '<!DOCTYPE html><p class="cls1">Hello <span class="cls2">world</span><span class="cls3">!</span></p>',
      );
    });

    it('complex: +', () => {
      testQuerySelectorAll(
        '.cls2 + .cls3',
        '<!DOCTYPE html><p class="cls1"><span class="cls2">Hello</span><span class="cls3">world!</span></p>',
      );
    });

    describe(':has', () => {
      for (const has of ['has', 'if']) {
        it(`*:${has}`, () => {
          testQuerySelectorAll(
            `*:${has}(a[href^="https://"]):not(html):not(body):not(p)`,
            [
              '<!DOCTYPE html>',
              '<p class="cls1">',
              '  <span id="res" class="cls2">',
              '    <a href="https://foo.com">Hello</a>',
              '  </span>',
              '  <span class="cls3">',
              '    <a href="http://baz.com">world</a>!',
              '  </span>',
              '</p>',
            ].join('\n'),
            '#res',
          );
        });

        it(`simple :${has}`, () => {
          testQuerySelectorAll(
            `div:${has}(.banner)`,
            [
              '<div>Do not select this div</div>',
              '<div id="res">Select this div<span class="banner"></span></div>',
            ].join('\n'),
            '#res',
          );

          testQuerySelectorAll(
            `:${has}(.banner):not(body)`,
            [
              '<div>Do not select this div</div>',
              '<div id="res">Select this div<span class="banner"></span></div>',
            ].join('\n'),
            '#res',
          );
        });

        it(`nested :${has}`, () => {
          testQuerySelectorAll(
            `div:${has}(> .banner)`,
            [
              '<div>Do not select this div</div>',
              '<div id="res">Select this div<span class="banner"></span></div>',
              '<div>Select this div<div id="res"><span class="banner"></span></div></div>',
            ].join('\n'),
            '#res',
          );
        });

        it(`compound ${has}`, () => {
          testQuerySelectorAll(
            `h2 :${has}(span.foo)`,
            [
              '<p>I am a paragraph.</p>',
              '<p class="fancy">I am so very fancy!</p>',
              '<div>I am NOT a paragraph.</div>',
              '<h2>',
              '  <div id="res">',
              '    <span class="foo">foo inside h2</span>',
              '    <span class="bar">bar inside h2</span>',
              '  </div>',
              '</h2>',
            ].join('\n'),
            '#res',
          );
        });

        it(`compound 2 :${has}`, () => {
          testQuerySelectorAll(
            `body > div:${has}(img[alt="Foo"])`,
            '<!DOCTYPE html><head></head><body><div id="res"><img alt="Foo"></div></body>',
            '#res',
          );
        });
      }
    });

    describe(':not', () => {
      it('not paragraph', () => {
        testQuerySelectorAll(
          ':not(p):not(body):not(html):not(head)',
          [
            '<!DOCTYPE html>',
            '<head></head>',
            '<body>',
            '  <div id="res">',
            '    <img id="res" alt="Foo">',
            '  </div>',
            '</body>',
          ].join('\n'),
          '#res',
        );
      });

      it('compound', () => {
        testQuerySelectorAll(
          'h2 :not(span.foo)',
          [
            '<p>I am a paragraph.</p>',
            '<p class="fancy">I am so very fancy!</p>',
            '<div>I am NOT a paragraph.</div>',
            '<h2>',
            '  <span class="foo">foo inside h2</span>',
            '  <span id="res" class="bar">bar inside h2</span>',
            '</h2>',
          ].join('\n'),
          '#res',
        );
      });

      it('nested', () => {
        testQuerySelectorAll(
          'h2 :not(:has(span.foo))',
          [
            '<p>I am a paragraph.</p>',
            '<p class="fancy">I am so very fancy!</p>',
            '<div>I am NOT a paragraph.</div>',
            '<h2>',
            '  <div><span id="res" class="foo">inside</span> h2</div>',
            '  <div id="res" class="bar">bar inside h2</div>',
            '</h2>',
          ].join('\n'),
          '#res',
        );
      });
    });

    describe.skip(':upward', () => {
      describe('argument is a number', () => {
        it('ignored if 0 or negative', () => {
          testQuerySelectorAll(
            'span:upward(1)',
            [
              '<p>I am a paragraph.</p>',
              '<p class="fancy">I am so very fancy!</p>',
              '<div>I am NOT a paragraph.</div>',
              '<h2>',
              '  <div id="res"><span>inside</span> h2</div>',
              '  <div>bar inside h2</div>',
              '</h2>',
            ].join('\n'),
            '#res',
          );
        });
      });
    });

    describe(':has-text', () => {
      it('simple literal pattern', () => {
        testQuerySelectorAll(
          '.cls:has-text(bar)',
          [
            '<!DOCTYPE html>',
            '<head></head>',
            '<body>',
            '<div id="n1" class="cls"><span>foo bar baz</span></div>',
            '<p id="n2" class="cls">Go to the pub!</p>',
            '</body>',
          ].join('\n'),
          '#n1',
        );
      });
    });
  });
});
