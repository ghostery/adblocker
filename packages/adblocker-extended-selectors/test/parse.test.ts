/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { parse, replace, isEscaped, gobbleParens, gobbleQuotes } from '../src/parse';

describe('parse', () => {
  describe('#replace', () => {
    for (const quote of ['"', "'"] as const) {
      it(`handles ${quote} quotes`, () => {
        expect(
          replace(`${quote}foo${quote}`, '§', quote, (text: string, start: number) =>
            gobbleQuotes(text, quote, start),
          ),
        ).to.eql([[{ start: 0, str: `${quote}foo${quote}` }], `${quote}§§§${quote}`]);
      });

      it(`handles complex ${quote} quotes`, () => {
        expect(
          replace(
            `span:has-text(/partial l${quote}application/)`,
            '§',
            quote,
            (text: string, start: number) => gobbleQuotes(text, quote, start),
          ),
        ).to.eql([[], `span:has-text(/partial l${quote}application/)`]);
      });
    }

    it('handles parentheses', () => {
      expect(replace('(foo) (bar) (((b)az)', '¶', '(', gobbleParens)).to.eql([
        [
          {
            'start': 0,
            'str': '(foo)',
          },
          {
            'start': 6,
            'str': '(bar)',
          },
        ],
        '(¶¶¶) (¶¶¶) (((b)az)',
      ]);

      expect(replace('(foo) (bar) (((b)az', '¶', '(', gobbleParens)).to.eql([
        [
          {
            'start': 0,
            'str': '(foo)',
          },
          {
            'start': 6,
            'str': '(bar)',
          },
        ],
        '(¶¶¶) (¶¶¶) (((b)az',
      ]);

      expect(replace('(foo) (bar) (((b)a)z)', '¶', '(', gobbleParens)).to.eql([
        [
          {
            'start': 0,
            'str': '(foo)',
          },
          {
            'start': 6,
            'str': '(bar)',
          },
          {
            'start': 12,
            'str': '(((b)a)z)',
          },
        ],
        '(¶¶¶) (¶¶¶) (¶¶¶¶¶¶¶)',
      ]);
    });
  });

  describe('#isEscaped', () => {
    it('handle no backslash', () => {
      expect(isEscaped('foo', 0)).to.be.false;
      expect(isEscaped('foo', 1)).to.be.false;
    });

    it('handle one backslash', () => {
      expect(isEscaped('\\foo', 1)).to.be.true;
      expect(isEscaped('f\\oo', 2)).to.be.true;
      expect(isEscaped('\\foo', 0)).to.be.false;
      expect(isEscaped('\\foo', 2)).to.be.false;
    });

    it('handle two backslashes', () => {
      expect(isEscaped('\\\\foo', 0)).to.be.false;
      expect(isEscaped('\\\\foo', 1)).to.be.true;
      expect(isEscaped('\\\\foo', 2)).to.be.false;
      expect(isEscaped('\\\\foo', 3)).to.be.false;
    });

    it('handle three backslashes', () => {
      expect(isEscaped('\\\\\\foo', 0)).to.be.false;
      expect(isEscaped('\\\\\\foo', 1)).to.be.true;
      expect(isEscaped('\\\\\\foo', 2)).to.be.false;
      expect(isEscaped('\\\\\\foo', 3)).to.be.true;
      expect(isEscaped('\\\\\\foo', 4)).to.be.false;
    });
  });

  describe('#parse', () => {
    it('deal with escaped quotes', () => {
      expect(parse('[data*="\\"ei\\":\\""]')).to.eql({
        'caseSensitive': undefined,
        'content': '[data*="\\"ei\\":\\""]',
        'length': 19,
        'name': 'data',
        'namespace': undefined,
        'operator': '*=',
        'pos': [0, 19],
        'type': 'attribute',
        'value': '"\\"ei\\":\\""',
      });
    });

    it('id', () => {
      expect(parse('#some_id')).to.eql({
        'content': '#some_id',
        'name': 'some_id',
        'length': 8,
        'pos': [0, 8],
        'type': 'id',
      });
    });

    it('class', () => {
      expect(parse('.some_class')).to.eql({
        'content': '.some_class',
        'length': 11,
        'name': 'some_class',
        'pos': [0, 11],
        'type': 'class',
      });
    });

    it('type', () => {
      expect(parse('*[href^="https://"]')).to.eql({
        'compound': [
          {
            'content': '*',
            'length': 1,
            'name': undefined,
            'namespace': undefined,
            'pos': [0, 1],
            'type': 'type',
          },
          {
            'caseSensitive': undefined,
            'content': '[href^="https://"]',
            'length': 18,
            'name': 'href',
            'namespace': undefined,
            'operator': '^=',
            'pos': [1, 19],
            'type': 'attribute',
            'value': '"https://"',
          },
        ],
        'type': 'compound',
      });
    });

    it('attribute', () => {
      expect(parse('a[attr="abcde"][attr="123"]')).to.eql({
        'type': 'compound',
        'compound': [
          {
            'content': 'a',
            'length': 1,
            'name': 'a',
            'pos': [0, 1],
            'type': 'type',
            'namespace': undefined,
          },
          {
            'content': '[attr="abcde"]',
            'length': 14,
            'name': 'attr',
            'operator': '=',
            'pos': [1, 15],
            'type': 'attribute',
            'namespace': undefined,
            'caseSensitive': undefined,
            'value': '"abcde"',
          },
          {
            'content': '[attr="123"]',
            'length': 12,
            'name': 'attr',
            'operator': '=',
            'pos': [15, 27],
            'type': 'attribute',
            'namespace': undefined,
            'caseSensitive': undefined,
            'value': '"123"',
          },
        ],
      });
    });
  });

  describe('procedural', () => {
    it(':remove', () => {
      expect(parse('.cls:remove()')).to.eql({
        'compound': [
          {
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
            'type': 'class',
          },
          {
            'argument': '',
            'content': ':remove()',
            'length': 9,
            'name': 'remove',
            'pos': [4, 13],
            'subtree': undefined,
            'type': 'pseudo-class',
          },
        ],
        'type': 'compound',
      });
    });

    it(':style', () => {
      expect(
        parse('.cls:has-text(2):style(left-3000px !important;position:absolute !important)'),
      ).to.eql({
        'type': 'compound',
        'compound': [
          {
            'type': 'class',
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
          },
          {
            'type': 'pseudo-class',
            'subtree': undefined,
            'argument': '2',
            'content': ':has-text(2)',
            'length': 12,
            'name': 'has-text',
            'pos': [4, 16],
          },
          {
            'type': 'pseudo-class',
            'subtree': undefined,
            'argument': 'left-3000px !important;position:absolute !important',
            'content': ':style(left-3000px !important;position:absolute !important)',
            'length': 59,
            'name': 'style',
            'pos': [16, 75],
          },
        ],
      });
    });

    it(':xpath', () => {
      expect(parse('.cls:xpath(..)')).to.eql({
        'type': 'compound',
        'compound': [
          {
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
            'type': 'class',
          },
          {
            'argument': '..',
            'content': ':xpath(..)',
            'length': 10,
            'name': 'xpath',
            'pos': [4, 14],
            'subtree': undefined,
            'type': 'pseudo-class',
          },
        ],
      });
    });

    it(':has', () => {
      expect(
        parse(
          'table.tborder > tbody:has(:scope > tr > .alt1 > table > tbody > tr > td > a):has(strong):has(span > font > strong)',
        ),
      ).to.eql({
        'combinator': '>',
        'left': {
          'compound': [
            {
              'content': 'table',
              'length': 5,
              'name': 'table',
              'pos': [0, 5],
              'type': 'type',
              'namespace': undefined,
            },
            {
              'content': '.tborder',
              'length': 8,
              'name': 'tborder',
              'pos': [5, 13],
              'type': 'class',
            },
          ],
          'type': 'compound',
        },
        'right': {
          'compound': [
            {
              'content': 'tbody',
              'length': 5,
              'name': 'tbody',
              'pos': [16, 21],
              'type': 'type',
              'namespace': undefined,
            },
            {
              'argument': ':scope > tr > .alt1 > table > tbody > tr > td > a',
              'content': ':has(:scope > tr > .alt1 > table > tbody > tr > td > a)',
              'length': 55,
              'name': 'has',
              'pos': [21, 76],
              'subtree': {
                'combinator': '>',
                'left': {
                  'combinator': '>',
                  'left': {
                    'combinator': '>',
                    'left': {
                      'combinator': '>',
                      'left': {
                        'combinator': '>',
                        'left': {
                          'combinator': '>',
                          'left': {
                            'combinator': '>',
                            'left': {
                              'argument': undefined,
                              'content': ':scope',
                              'length': 6,
                              'name': 'scope',
                              'pos': [0, 6],
                              'subtree': undefined,
                              'type': 'pseudo-class',
                            },
                            'right': {
                              'content': 'tr',
                              'length': 2,
                              'name': 'tr',
                              'pos': [9, 11],
                              'type': 'type',
                              'namespace': undefined,
                            },
                            'type': 'complex',
                          },
                          'right': {
                            'content': '.alt1',
                            'length': 5,
                            'name': 'alt1',
                            'pos': [14, 19],
                            'type': 'class',
                          },
                          'type': 'complex',
                        },
                        'right': {
                          'content': 'table',
                          'length': 5,
                          'name': 'table',
                          'pos': [22, 27],
                          'type': 'type',
                          'namespace': undefined,
                        },
                        'type': 'complex',
                      },
                      'right': {
                        'content': 'tbody',
                        'length': 5,
                        'name': 'tbody',
                        'pos': [30, 35],
                        'type': 'type',
                        'namespace': undefined,
                      },
                      'type': 'complex',
                    },
                    'right': {
                      'content': 'tr',
                      'length': 2,
                      'name': 'tr',
                      'pos': [38, 40],
                      'type': 'type',
                      'namespace': undefined,
                    },
                    'type': 'complex',
                  },
                  'right': {
                    'content': 'td',
                    'length': 2,
                    'name': 'td',
                    'pos': [43, 45],
                    'type': 'type',
                    'namespace': undefined,
                  },
                  'type': 'complex',
                },
                'right': {
                  'content': 'a',
                  'length': 1,
                  'name': 'a',
                  'pos': [48, 49],
                  'type': 'type',
                  'namespace': undefined,
                },
                'type': 'complex',
              },
              'type': 'pseudo-class',
            },
            {
              'argument': 'strong',
              'content': ':has(strong)',
              'length': 12,
              'name': 'has',
              'pos': [76, 88],
              'subtree': {
                'content': 'strong',
                'length': 6,
                'name': 'strong',
                'pos': [0, 6],
                'type': 'type',
                'namespace': undefined,
              },
              'type': 'pseudo-class',
            },
            {
              'argument': 'span > font > strong',
              'content': ':has(span > font > strong)',
              'length': 26,
              'name': 'has',
              'pos': [88, 114],
              'subtree': {
                'combinator': '>',
                'left': {
                  'combinator': '>',
                  'left': {
                    'content': 'span',
                    'length': 4,
                    'name': 'span',
                    'pos': [0, 4],
                    'type': 'type',
                    'namespace': undefined,
                  },
                  'right': {
                    'content': 'font',
                    'length': 4,
                    'name': 'font',
                    'pos': [7, 11],
                    'type': 'type',
                    'namespace': undefined,
                  },
                  'type': 'complex',
                },
                'right': {
                  'content': 'strong',
                  'length': 6,
                  'name': 'strong',
                  'pos': [14, 20],
                  'type': 'type',
                  'namespace': undefined,
                },
                'type': 'complex',
              },
              'type': 'pseudo-class',
            },
          ],
          'type': 'compound',
        },
        'type': 'complex',
      });

      expect(parse('.cls:has([href*="?utm_source="])')).to.eql({
        'compound': [
          {
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
            'type': 'class',
          },
          {
            'argument': '[href*="?utm_source="]',
            'content': ':has([href*="?utm_source="])',
            'length': 28,
            'name': 'has',
            'pos': [4, 32],
            'subtree': {
              'content': '[href*="?utm_source="]',
              'length': 22,
              'name': 'href',
              'operator': '*=',
              'pos': [0, 22],
              'type': 'attribute',
              'namespace': undefined,
              'caseSensitive': undefined,
              'value': '"?utm_source="',
            },
            'type': 'pseudo-class',
          },
        ],
        'type': 'compound',
      });

      expect(parse('.cls > a > div[class^="foo"]:has(button[class^="bar"])')).to.eql({
        'combinator': '>',
        'left': {
          'combinator': '>',
          'left': {
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
            'type': 'class',
          },
          'right': {
            'content': 'a',
            'length': 1,
            'name': 'a',
            'pos': [7, 8],
            'type': 'type',
            'namespace': undefined,
          },
          'type': 'complex',
        },
        'right': {
          'compound': [
            {
              'content': 'div',
              'length': 3,
              'name': 'div',
              'pos': [11, 14],
              'type': 'type',
              'namespace': undefined,
            },
            {
              'content': '[class^="foo"]',
              'length': 14,
              'name': 'class',
              'operator': '^=',
              'pos': [14, 28],
              'type': 'attribute',
              'namespace': undefined,
              'caseSensitive': undefined,
              'value': '"foo"',
            },
            {
              'argument': 'button[class^="bar"]',
              'content': ':has(button[class^="bar"])',
              'length': 26,
              'name': 'has',
              'pos': [28, 54],
              'subtree': {
                'compound': [
                  {
                    'content': 'button',
                    'length': 6,
                    'name': 'button',
                    'pos': [0, 6],
                    'type': 'type',
                    'namespace': undefined,
                  },
                  {
                    'content': '[class^="bar"]',
                    'length': 14,
                    'name': 'class',
                    'operator': '^=',
                    'pos': [6, 20],
                    'type': 'attribute',
                    'namespace': undefined,
                    'caseSensitive': undefined,
                    'value': '"bar"',
                  },
                ],
                'type': 'compound',
              },
              'type': 'pseudo-class',
            },
          ],
          'type': 'compound',
        },
        'type': 'complex',
      });
    });

    it.skip(':upward', () => {
      // With integer argument
      expect(parse('.cls:upward(4)')).to.eql({
        'type': 'compound',
        'compound': [
          {
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
            'type': 'class',
          },
          {
            'argument': '4',
            'content': ':upward(4)',
            'length': 10,
            'name': 'upward',
            'pos': [4, 14],
            'type': 'pseudo-class',
          },
        ],
      });

      // With selector argument
      expect(parse('.cls:upward(.foo.bar)')).to.eql({
        'type': 'compound',
        'compound': [
          {
            'type': 'class',
            'content': '.cls',
            'length': 4,
            'name': 'cls',
            'pos': [0, 4],
          },
          {
            'type': 'pseudo-class',
            'argument': '.foo.bar',
            'content': ':upward(.foo.bar)',
            'length': 17,
            'name': 'upward',
            'pos': [4, 21],
          },
        ],
      });
    });

    it('has-text', () => {
      expect(parse('.cls1 > div > div:has-text(/foo bar/i)')).to.eql({
        'type': 'complex',
        'combinator': '>',
        'left': {
          'combinator': '>',
          'left': {
            'type': 'class',
            'content': '.cls1',
            'length': 5,
            'name': 'cls1',
            'pos': [0, 5],
          },
          'right': {
            'type': 'type',
            'namespace': undefined,
            'content': 'div',
            'length': 3,
            'name': 'div',
            'pos': [8, 11],
          },
          'type': 'complex',
        },
        'right': {
          'type': 'compound',
          'compound': [
            {
              'type': 'type',
              'namespace': undefined,
              'content': 'div',
              'length': 3,
              'name': 'div',
              'pos': [14, 17],
            },
            {
              'type': 'pseudo-class',
              'argument': '/foo bar/i',
              'content': ':has-text(/foo bar/i)',
              'length': 21,
              'name': 'has-text',
              'subtree': undefined,
              'pos': [17, 38],
            },
          ],
        },
      });
    });
  });
});
