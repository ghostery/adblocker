/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { JSDOM } from 'jsdom';

import { querySelectorAll, matchPattern, matches } from '../../src/eval.js';
import { parse } from '../../src/parse.js';

// TODO - check if style:has-text() works (can select style?)

function testMatches(selector: string, html: string, target: string, expected: boolean): void {
  const {
    window: { document, Element },
  } = new JSDOM(html);

  const ast = parse(selector);
  expect(ast).to.not.be.undefined;
  if (ast === undefined) {
    return;
  }

  const element = document.querySelector(target);
  expect(element).to.be.instanceOf(Element);
  if (element instanceof Element) {
    const result = matches(element, ast);
    expect(result).to.equal(expected);
  }
}

function testQuerySelectorAll(selector: string, html: string, expectedSelectors: string[]): void {
  const {
    window: { document },
  } = new JSDOM(html, { url: 'https://example.com' });

  const ast = parse(selector);
  expect(ast).to.not.be.undefined;
  if (ast === undefined) {
    return;
  }

  const actual = querySelectorAll(document.documentElement, ast);
  const expected = expectedSelectors.flatMap((s) => Array.from(document.querySelectorAll(s)));
  expect(actual).to.have.members(expected);
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
    });

    describe(':matches-path', () => {
      afterEach(() => {
        globalThis.window = undefined!;
      });

      it('matches current path', () => {
        const html = '<div>Test</div>';
        const jsdom = new JSDOM(html, { url: 'https://example.com/home' });
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div')!;
        const ast = parse(':matches-path(/h(.*){2}e$/)')!;
        const result = matches(element, ast);
        expect(result).to.be.true;
      });

      it('matches current path with regex flags', () => {
        const html = '<div>Test</div>';
        const jsdom = new JSDOM(html, { url: 'https://example.com/home' });
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div')!;
        const ast = parse(':matches-path(/home/i)')!;
        const result = matches(element, ast);
        expect(result).to.be.true;
      });

      it('combines with other selectors', () => {
        const html = `
          <div class="content">Test 2</div>
        `;
        const jsdom = new JSDOM(html, { url: 'https://example.com/content' });
        globalThis.window = jsdom.window as any;
        const ast = parse(':matches-path(/content$/) .content')!;
        const actual = querySelectorAll(jsdom.window.document.documentElement, ast);
        const expected = Array.from(jsdom.window.document.querySelectorAll('.content'));
        expect(expected.length).to.equal(1);
        expect(actual).to.have.members(expected);
      });

      it('matches current path with query params', () => {
        const html = '<div>Test</div>';
        const jsdom = new JSDOM(html, { url: 'https://example.com/search/results?q=foo' });
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div')!;
        const ast = parse(':matches-path(/q=foo/)')!;
        const result = matches(element, ast);
        expect(result).to.be.true;
      });

      it('does not match different path', () => {
        const html = '<div>Test</div>';
        const jsdom = new JSDOM(html, { url: 'https://example.com/home' });
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div')!;
        const ast = parse(':matches-path(/search/)')!;
        const result = matches(element, ast);
        expect(result).to.be.false;
      });
    });

    describe(':matches-attr', () => {
      it('matches attribute value', () => {
        testMatches(':matches-attr(href="test")', '<a href="test">Link</a>', 'a', true);
      });

      it('accepts optional wrapping quotes', () => {
        testMatches(':matches-attr("href"="test")', '<a href="test">Link</a>', 'a', true);
      });

      it('matches attribute name', () => {
        testMatches(':matches-attr(href)', '<a href="test">Link</a>', 'a', true);
        testMatches(':matches-attr(href)', '<a ref="test">Link</a>', 'a', false);
      });

      it('does not match different attribute value', () => {
        testMatches(':matches-attr(href="test")', '<a href="different">Link</a>', 'a', false);
      });

      it('handles regex patterns', () => {
        testMatches(':matches-attr(href=/1.*4$/)', '<a href="1234">Link</a>', 'a', true);
        testMatches(':matches-attr(href=/1.*3$/)', '<a href="1234">Link</a>', 'a', false);
      });

      it('handles regex attribute name', () => {
        testMatches(':matches-attr(/h?ref/)', '<a href="test">Link</a>', 'a', true);
        testMatches(':matches-attr(/h?ref/)', '<a ref="test">Link</a>', 'a', true);
      });

      it('with multiple attribute name matches it looks for matching value', () => {
        testMatches(
          ':matches-attr(/h?ref/=test)',
          '<a href="miss" ref="test">Link</a>',
          'a',
          true,
        );
      });

      it('handles regex for both attribute name and value', () => {
        testMatches(':matches-attr(/h?ref/=/1.*4$/)', '<a href="1234">Link</a>', 'a', true);
        testMatches(':matches-attr(/h?ref/=/1.*3$/)', '<a ref="1234">Link</a>', 'a', false);
      });
    });

    describe(':matches-css', () => {
      afterEach(() => {
        globalThis.window = undefined as any;
      });

      it('matches element with exact CSS property value', () => {
        const html = `
          <style>
            div {
              color: red;
            }
          </style>
          <div>Test</div>
        `;
        const jsdom = new JSDOM(html);
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div');
        expect(element).to.not.be.null;
        if (element !== null) {
          const ast = parse(':matches-css(color: rgb(255, 0, 0))');
          expect(ast).to.not.be.undefined;
          if (ast !== undefined) {
            const result = matches(element, ast);
            expect(result).to.be.true;
          }
        }
      });

      it('does not match element with different CSS property value', () => {
        const html = `
          <style>
            div {
              color: blue;
            }
          </style>
          <div>Test</div>
        `;
        const jsdom = new JSDOM(html);
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div');
        expect(element).to.not.be.null;
        if (element !== null) {
          const ast = parse(':matches-css(color: rgb(255, 0, 0))');
          expect(ast).to.not.be.undefined;
          if (ast !== undefined) {
            const result = matches(element, ast);
            expect(result).to.be.false;
          }
        }
      });

      it('handles invalid CSS value format', () => {
        const html = '<div>Test</div>';
        const jsdom = new JSDOM(html);
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div');
        expect(element).to.not.be.null;
        if (element !== null) {
          const ast = parse(':matches-css(invalid)');
          expect(ast).to.not.be.undefined;
          if (ast !== undefined) {
            expect(() => matches(element, ast)).to.throw(
              'Invalid CSS value format: no colon found',
            );
          }
        }
      });

      it('matches element with regex CSS property value', () => {
        const html = `
          <style>
            div {
              display: block;
            }
          </style>
          <div>Test</div>
        `;
        const jsdom = new JSDOM(html);
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div');
        expect(element).to.not.be.null;
        if (element !== null) {
          const ast = parse(':matches-css(display: /loc/)');
          expect(ast).to.not.be.undefined;
          if (ast !== undefined) {
            const result = matches(element, ast);
            expect(result).to.be.true;
          }
        }
      });

      it('matches element with regex CSS property value with flags', () => {
        const html = `
          <style>
            div {
              display: BLOCK;
            }
          </style>
          <div>Test</div>
        `;
        const jsdom = new JSDOM(html);
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div');
        expect(element).to.not.be.null;
        if (element !== null) {
          const ast = parse(':matches-css(display: /block/i)');
          expect(ast).to.not.be.undefined;
          if (ast !== undefined) {
            const result = matches(element, ast);
            expect(result).to.be.true;
          }
        }
      });

      it('does not match element with regex CSS property value when pattern does not match', () => {
        const html = `
          <style>
            div {
              display: inline;
            }
          </style>
          <div>Test</div>
        `;
        const jsdom = new JSDOM(html);
        globalThis.window = jsdom.window as any;
        const element = jsdom.window.document.querySelector('div');
        expect(element).to.not.be.null;
        if (element !== null) {
          const ast = parse(':matches-css(display: /block/)');
          expect(ast).to.not.be.undefined;
          if (ast !== undefined) {
            const result = matches(element, ast);
            expect(result).to.be.false;
          }
        }
      });
    });
  });

  describe('#querySelectorAll', () => {
    context('deduplicates', () => {
      it('type of `list`', () => {
        testQuerySelectorAll('p>a,a', `<p><a/></p>`, ['a']);
      });
    });

    it('#id', () => {
      testQuerySelectorAll('#some_id', '<!DOCTYPE html><p id="some_id">Hello world</p>', [
        '#some_id',
      ]);
    });

    it('.class', () => {
      testQuerySelectorAll('.some_class', '<!DOCTYPE html><p class="some_class">Hello world</p>', [
        '.some_class',
      ]);
    });

    it('type (span)', () => {
      testQuerySelectorAll(
        'span',
        '<!DOCTYPE html><p class="some_class"><span>Hello</span> <span>world</span></p>',
        ['span'],
      );
    });

    it('attribute', () => {
      testQuerySelectorAll(
        'a[attr1="abcde"][attr2="123"]',
        '<!DOCTYPE html><p class="some_class"><a attr1="abcde" attr2="123" href="https://foo.com">Hello</a> <span>world</span></p>',
        ['a[attr1="abcde"][attr2="123"]'],
      );
    });

    it('comma', () => {
      testQuerySelectorAll(
        '#id, .cls',
        '<!DOCTYPE html><p class="cls">Hello <span id="id">world</span></p>',
        ['#id', '.cls'],
      );
    });

    it('compound', () => {
      testQuerySelectorAll('.cls1.cls2', '<!DOCTYPE html><p class="cls1 cls2">Hello world</p>', [
        '.cls1.cls2',
      ]);
    });

    it('complex: <space>', () => {
      testQuerySelectorAll(
        '.cls1 .cls2',
        '<!DOCTYPE html><p class="cls1">Hello <span class="cls2">world</span></p>',
        ['.cls2'],
      );
    });

    it('complex: >', () => {
      testQuerySelectorAll(
        '.cls1 > .cls2',
        '<!DOCTYPE html><p class="cls1">Hello <span class="cls2">world</span><span class="cls2">!</span></p>',
        ['.cls1 > .cls2'],
      );
    });

    it('complex: ~', () => {
      testQuerySelectorAll(
        '.cls2 ~ .cls3',
        '<!DOCTYPE html><p class="cls1">Hello <span class="cls2">world</span><span class="cls3">!</span></p>',
        ['.cls3'],
      );
    });

    it('complex: +', () => {
      testQuerySelectorAll(
        '.cls2 + .cls3',
        '<!DOCTYPE html><p class="cls1"><span class="cls2">Hello</span><span class="cls3">world!</span></p>',
        ['.cls3'],
      );
    });

    describe(':has', () => {
      it('*:has', () => {
        testQuerySelectorAll(
          `*:has(a[href^="https://"]):not(body):not(p)`,
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
          ['#res'],
        );
      });

      it('simple :has', () => {
        testQuerySelectorAll(
          `div:has(.banner)`,
          [
            '<div>Do not select this div</div>',
            '<div id="res">Select this div<span class="banner"></span></div>',
          ].join('\n'),
          ['#res'],
        );

        testQuerySelectorAll(
          `:has(.banner):not(body)`,
          [
            '<div>Do not select this div</div>',
            '<div id="res">Select this div<span class="banner"></span></div>',
          ].join('\n'),
          ['#res'],
        );
      });

      it('nested :has', () => {
        testQuerySelectorAll(
          `div:has(> .banner)`,
          [
            '<div>Do not select this div</div>',
            '<div id="res">Select this div<span class="banner"></span></div>',
            '<div>Select this div<div id="res"><span class="banner"></span></div></div>',
          ].join('\n'),
          ['#res'],
        );
      });

      it('compound has', () => {
        testQuerySelectorAll(
          `h2 :has(span.foo)`,
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
          ['#res'],
        );
      });

      it('compound 2 :has', () => {
        testQuerySelectorAll(
          `body > div:has(img[alt="Foo"])`,
          '<!DOCTYPE html><head></head><body><div id="res"><img alt="Foo"></div></body>',
          ['#res'],
        );
      });
    });

    describe(':not', () => {
      it('not paragraph', () => {
        testQuerySelectorAll(
          ':not(p):not(body):not(head)',
          [
            '<!DOCTYPE html>',
            '<head></head>',
            '<body>',
            '  <div id="res">',
            '    <img id="res" alt="Foo">',
            '  </div>',
            '</body>',
          ].join('\n'),
          ['#res'],
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
          ['#res'],
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
          ['#res'],
        );
      });
    });

    describe(':upward', () => {
      it('handles numeric argument', () => {
        testQuerySelectorAll('span:upward(2)', '<div><p><span>Test</span></p></div>', ['div']);
      });

      it('handles selector argument', () => {
        testQuerySelectorAll(
          'span:upward([role="article"])',
          '<div role="article"><p><span>Test</span></p></div>',
          ['div[role="article"]'],
        );
      });

      it('handles compound selectors after upward', () => {
        testQuerySelectorAll(
          'span:upward(2).highlight',
          '<div class="highlight"><p><span>Test</span></p></div>',
          ['div.highlight'],
        );
      });

      it('handles multiple upward selectors', () => {
        testQuerySelectorAll('span:upward(1):upward(1)', '<div><p><span>Test</span></p></div>', [
          'div',
        ]);
      });

      it('returns empty array for invalid numeric argument', () => {
        testQuerySelectorAll('span:upward(0)', '<div><p><span>Test</span></p></div>', []);
      });

      it('returns empty array for non-matching selector argument', () => {
        testQuerySelectorAll(
          'span:upward([role="article"])',
          '<div><p><span>Test</span></p></div>',
          [],
        );
      });

      it('handles nested upward selectors', () => {
        testQuerySelectorAll('span:upward(p):upward(div)', '<div><p><span>Test</span></p></div>', [
          'div',
        ]);
      });

      it('should continue processing when some candidates have no valid ancestor', () => {
        const html1 = `
          <div class="target">
            <div class="lure"></div>
          </div>
          <div>
            <div class="lure"></div>
          </div>
        `;
        testQuerySelectorAll('.lure:upward(.target)', html1, ['.target']);
        const html2 = `
          <div>
            <div class="lure"></div>
          </div>
          <div class="target">
            <div class="lure"></div>
          </div>
        `;
        testQuerySelectorAll('.lure:upward(.target)', html2, ['.target']);
      });

      describe('should support chaining', () => {
        it('with multiple navigations', () => {
          const html = `
            <div class="target">
              <div class="hop2">
                <div class="hop1">
                  <div class="lure"></div>
                </div>
              </div>
            </div>
          `;
          testQuerySelectorAll('.lure:upward(3)', html, ['.target']);
          testQuerySelectorAll('.lure:upward(1):upward(2)', html, ['.target']);
          testQuerySelectorAll('.lure:upward(1):upward(1):upward(1)', html, ['.target']);
          testQuerySelectorAll('.lure:upward(.hop1):upward(.hop2):upward(div)', html, ['.target']);
        });

        it('with :has between :upward', () => {
          const html = `
            <div class="target">
              <div>
                <span class="lure"></span>
                <span class="child"></span>
              </div>
            </div>
          `;
          testQuerySelectorAll('.lure:upward(1):has(.child):upward(1)', html, ['.target']);
          testQuerySelectorAll('.lure:upward(1):upward(1)', html, ['.target']);
          testQuerySelectorAll('.lure:upward(2)', html, ['.target']);
        });

        it('with navigations (:upward) intersected with non-navigations (:has)', () => {
          const html = `
            <div class="target">
              <div id="after_upward2">
                <div id="after_has_lure">
                  <span class="lure"></span>
                </div>
              </div>
            </div>
          `;
          testQuerySelectorAll('.lure:upward(2):has(.lure):has(div):upward(1)', html, ['.target']);
          testQuerySelectorAll('.lure:upward(2):has(.lure):not(:has(a)):upward(1)', html, [
            '.target',
          ]);
        });
      });

      it('should return unique ancestors when multiple candidates share the same ancestor', () => {
        const html = `
          <div class="target">
            <p>
              <span class="lure">First</span>
              <span class="lure">Second</span>
            </p>
          </div>
        `;
        testQuerySelectorAll('.lure:upward(.target)', html, ['.target']);
      });

      describe('combinators', () => {
        context('combinator of ` `', () => {
          it('should respect ` ` combinator before pseudo-selector', () => {
            // `p`: Seek for all `p`
            // ` `: Select every element has children
            // `:upward(1)`: Look parent at depth of 1
            testQuerySelectorAll(
              'p :upward(1)',
              `<article>
                <p id="res"><a></a></p>
                <p></p>
              </article>`,
              ['#res'],
            );

            // `p`: Seek for all `p`
            // ` `: Select every element has children
            // `a`: Select every element has children of `a`
            // `:upward(1)`: Look parent at depth of 1
            testQuerySelectorAll(
              'p a:upward(1)',
              `<article>
                <p id="res"><a></a></p>
                <p></p>
              </article>`,
              ['#res'],
            );

            // `p`: Seek for all `p`
            // `:has(span)`: Select every element has `span`
            // ` `: Select every element has children
            // `:upward(1)`: Look parent at depth of 1
            testQuerySelectorAll(
              'p:has(span) :upward(1)',
              `<p id="res"><span /></p>
<p />`,
              ['#res'],
            );

            // `p`: Select every element is `p`
            // `:upward(div)`: Look parent with tag name of `div`
            // ` `: Select every children at any depth
            // `:has(:upward(a))`: Select every element has children which can look parent with tag name of `a`
            // - From (whitespace) combinator, we select "p", "a", and "span". However, "span" cannot be selected
            //   because it doesn't have a child element, making `:has` ineffective
            testQuerySelectorAll(
              'p:upward(div) :has(:upward(a))',
              `<article>
                <div>
                  <p id="res1">
                    <a id="res2"><span /></a>
                  </p>
                </div>
                <div><p /></div>
              </article>
              <article>
                <div>
                  <p><a /></p>
                </div>
                <div><p /></div>
              </article>`,
              ['#res1', '#res2'],
            );
          });
        });

        context('combinator of `+`', () => {
          it('should respect `+` combinator before pseudo-selector', () => {
            // `p`: Seek for all `p`
            // `+`: Select every next siblings
            // `p:not(:has(a))`: Select every element is `p` but don't have children of `a`
            // `:upward(1)`: Look parent at depth of 1
            testQuerySelectorAll(
              'p+p:not(:has(a)):upward(1)',
              `<article id="res">
                <p><a></a></p>
                <p></p>
              </article>`,
              ['#res'],
            );
          });
        });

        context('combinator of `>`', () => {
          it('should respect `>` combinator before pseudo-selector', () => {
            // `article`: Seek for all `article`
            // `>`: Select every children at depth of 1
            // `p:not(:has(a))`: Select every element is `p` but don't have children of `a`
            // `:upward(1)`: Look parent at depth of 1
            testQuerySelectorAll(
              'article>p:not(:has(a)):upward(1)',
              `<article id="res">
                <p><a></a></p>
                <p></p>
              </article>`,
              ['#res'],
            );
          });
        });

        context('combinator of `~`', () => {
          it('should respect `~` combinator before pseudo-selector', () => {
            // `p`: Seek for all `p`
            // `~`: Select every siblings
            // `p:not(:has(a))`: Select every element is `p` but don't have children of `a`
            // `:upward(1)`: Look parent at depth of 1
            testQuerySelectorAll(
              'p~p:not(:has(a)):upward(1)',
              `<article id="res">
                <p><a></a></p>
                <p></p>
              </article>`,
              ['#res'],
            );
          });
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
          ['#n1'],
        );
      });
    });
  });
});
