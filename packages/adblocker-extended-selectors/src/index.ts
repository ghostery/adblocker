/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export { parse, tokenize } from './parse.js';
export { querySelectorAll, matches } from './eval.js';
export * from './types.js';
export {
  EXTENDED_PSEUDO_CLASSES,
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  SelectorType,
  classifySelector,
} from './extended.js';
import { EXTENDED_PSEUDO_CLASSES } from './extended.js';
import { parse, walk } from './parse.js';

export function isSafeHasSelector(selector: string) {
  const ast = parse(selector);

  try {
    walk(ast, (node) => {
      if (
        node.type === 'pseudo-class' &&
        node.name !== undefined &&
        EXTENDED_PSEUDO_CLASSES.has(node.name) &&
        node.name !== 'has'
      ) {
        throw new Error('not a :has');
      }
    });
  } catch (e) {
    // stop travesing the ast once pseudo class different from :has is detected
    return false;
  }

  return true;
}
