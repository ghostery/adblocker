/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { tokenize, RECURSIVE_PSEUDO_CLASSES } from './parse';

export const EXTENDED_PSEUDO_CLASSES = new Set([
  // '-abp-contains',
  // '-abp-has',
  // '-abp-properties',
  'has',
  'has-text',
  'if',
  // 'if-not',
  // 'matches-css',
  // 'matches-css-after',
  // 'matches-css-before',
  // 'min-text-length',
  // 'nth-ancestor',
  // 'upward',
  // 'watch-attr',
  // 'watch-attrs',
  // 'xpath',
]);

export const PSEUDO_CLASSES = new Set([
  'active',
  'any',
  'any-link',
  'blank',
  'checked',
  'default',
  'defined',
  'dir',
  'disabled',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'focus',
  'focus-visible',
  'focus-within',
  'fullscreen',
  'host',
  'host-context',
  'hover',
  'in-range',
  'indeterminate',
  'invalid',
  'is',
  'lang',
  'last-child',
  'last-of-type',
  'left',
  'link',
  'matches',
  // NOTE: by default we consider `:not(...)` to be a normal CSS selector since,
  // we are only interested in cases where the argument is an extended selector.
  // If that is the case, it will still be detected as such.
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  'right',
  'root',
  'scope',
  'target',
  'valid',
  'visited',
  'where',
]);

// NOTE: here we only need to list the pseudo-elements which can appear with a
// single colon (e.g. :after or ::after are valid for backward compatibility
// reasons). They can be misinterpreted as pseudo-classes by the tokenizer for
// this reason.
export const PSEUDO_ELEMENTS = new Set(['after', 'before', 'first-letter', 'first-line']);

export enum SelectorType {
  Normal,
  Extended,
  Invalid,
}

export function classifySelector(selector: string): SelectorType {
  // In most cases there is no pseudo-anything so we can quickly exit.
  if (selector.indexOf(':') === -1) {
    return SelectorType.Normal;
  }

  const tokens = tokenize(selector);

  // Detect pseudo-classes
  let foundSupportedExtendedSelector = false;
  for (const token of tokens) {
    if (token.type === 'pseudo-class') {
      const { name } = token;
      if (EXTENDED_PSEUDO_CLASSES.has(name) === true) {
        foundSupportedExtendedSelector = true;
      } else if (PSEUDO_CLASSES.has(name) === false && PSEUDO_ELEMENTS.has(name) === false) {
        return SelectorType.Invalid;
      }

      // Recursively
      if (
        foundSupportedExtendedSelector === false &&
        token.argument !== undefined &&
        RECURSIVE_PSEUDO_CLASSES.has(name) === true
      ) {
        const argumentType = classifySelector(token.argument);
        if (argumentType === SelectorType.Invalid) {
          return argumentType;
        } else if (argumentType === SelectorType.Extended) {
          foundSupportedExtendedSelector = true;
        }
      }
    }
  }

  if (foundSupportedExtendedSelector === true) {
    return SelectorType.Extended;
  }

  return SelectorType.Normal;
}
