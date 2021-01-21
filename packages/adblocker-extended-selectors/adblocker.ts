/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export { parse, tokenize } from './src/parse';
export { querySelectorAll, matches } from './src/eval';
export * from './src/types';
export {
  EXTENDED_PSEUDO_CLASSES,
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  SelectorType,
  classifySelector,
} from './src/extended';
