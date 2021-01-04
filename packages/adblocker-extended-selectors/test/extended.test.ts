/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import {
  classifySelector,
  SelectorType,
  PSEUDO_CLASSES,
  EXTENDED_PSEUDO_CLASSES,
} from '../src/extended';

describe('extended', () => {
  describe('#classifySelector', () => {
    it('id', () => {
      expect(classifySelector('#id')).to.equal(SelectorType.Normal);
      expect(classifySelector('#i_D')).to.equal(SelectorType.Normal);
    });

    it('class', () => {
      expect(classifySelector('.cls')).to.equal(SelectorType.Normal);
      expect(classifySelector('.cl_S')).to.equal(SelectorType.Normal);
    });

    for (const pseudo of Array.from(PSEUDO_CLASSES)) {
      it(`pseudo-class: ${pseudo}`, () => {
        expect(classifySelector(`div:${pseudo}(2)`)).to.equal(SelectorType.Normal);
        expect(classifySelector(`div:not(:${pseudo}(2))`)).to.equal(SelectorType.Normal);
      });
    }

    for (const pseudo of Array.from(EXTENDED_PSEUDO_CLASSES)) {
      it(`extended: ${pseudo}`, () => {
        expect(classifySelector(`.overlay:not(:${pseudo}(Welcome back)):not(body)`)).to.equal(
          SelectorType.Extended,
        );
      });
    }

    for (const pseudo of [
      '::-moz-progress-bar',
      '::-moz-range-progress',
      '::-moz-range-thumb',
      '::-moz-range-track',
      '::-webkit-progress-bar',
      '::-webkit-progress-value',
      '::-webkit-slider-runnable-track',
      '::-webkit-slider-thumb',
      '::after',
      '::backdrop',
      '::before',
      '::cue',
      '::cue-region',
      '::first-letter',
      '::first-line',
      '::grammar-error',
      '::marker',
      '::part()',
      '::placeholder',
      '::selection',
      '::slotted(*)',
      '::slotted(span)',
      '::spelling-error',
    ]) {
      it(`pseudo-element: ${pseudo}`, () => {
        expect(classifySelector(`div${pseudo}`)).to.equal(SelectorType.Normal);
      });
    }

    it('handles quotes', () => {
      expect(classifySelector('div:not(":has-text(foo)")')).to.equal(SelectorType.Normal);
      expect(classifySelector("div:not(':has-text(foo)')")).to.equal(SelectorType.Normal);
    });

    it('reject invalid pseudo-class', () => {
      expect(classifySelector(':woot()')).to.equal(SelectorType.Invalid);
    });

    it('reject invalid nested pseudo-class', () => {
      expect(classifySelector(':not(:woot())')).to.equal(SelectorType.Invalid);
    });
  });
});
