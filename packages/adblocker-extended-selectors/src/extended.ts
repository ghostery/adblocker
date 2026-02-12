/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { tokenize, RECURSIVE_PSEUDO_CLASSES } from './parse.js';

import type { AST, PseudoClass } from './types.js';

export const EXTENDED_PSEUDO_CLASSES = new Set([
  // '-abp-contains',
  // '-abp-has',
  // '-abp-properties',
  'has-text',
  'matches-path',
  'matches-attr',
  'matches-css',
  'matches-css-after',
  'matches-css-before',
  'upward',
  'xpath',
  // 'if',
  // 'if-not',
  // 'min-text-length',
  // 'nth-ancestor',
  // 'watch-attr',
  // 'watch-attrs',
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
  'has',
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

// Pseudo directives are pseudo-classes containing actions. It is
// still not a standard CSS spec but defines custom action.
export const PSEUDO_DIRECTIVES = new Set(['remove', 'remove-attr', 'remove-class']);

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
      if (EXTENDED_PSEUDO_CLASSES.has(name) === true || PSEUDO_DIRECTIVES.has(name) === true) {
        foundSupportedExtendedSelector = true;
      } else if (
        PSEUDO_CLASSES.has(name) === false &&
        PSEUDO_ELEMENTS.has(name) === false
        // `PSEUDO_DIRECTIVES.has(name)` is always `false` here.
      ) {
        return SelectorType.Invalid;
      }

      // Check for nested :has selectors (which are not supported by standard CSS)
      if (
        name === 'has' &&
        token.argument !== undefined &&
        token.argument.indexOf(':has(') !== -1
      ) {
        foundSupportedExtendedSelector = true;
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

/**
 * Exposes ASTs per purpose. For an instance, it distinguishes
 * a directive selector from element selectors.
 * @returns "element" AST and "directive" AST; no "element" AST
 * means there's no selector, no "directive" AST means there's no
 * pseudo-directive.
 */
export function destructAST(ast: AST): { element: AST; directive: PseudoClass | null } {
  // If the root AST type is 'pseudo-class', it means the
  // selector starts like `:pseudo-class()` without any other
  // types of selectors. We need to check if the AST is pseudo-
  // directive. Currently, this is not possible as we drop these
  // filters from the parsing phase.
  // if (ast.type === 'pseudo-class' && PSEUDO_DIRECTIVES.has(ast.name)) {
  //   return {
  //     element: null,
  //     directive: ast,
  //   };
  // }

  // If the root AST type is 'compound', it means there's
  // multiple AST nodes before the pseudo-directive. A compound
  // cannot hold another compound as its children thanks to the
  // parser characteristic. Also, the parser will group every
  // other selectors such as 'complex', simplyfying the AST. It
  // will look like 'some-selectors...:pseudo-class()`.
  if (ast.type === 'compound') {
    // We pick-up the last node and check if that's a pseudo-
    // directive.
    const last = ast.compound[ast.compound.length - 1];
    if (last.type === 'pseudo-class' && PSEUDO_DIRECTIVES.has(last.name)) {
      // Compound selectors have >=2 elements. When the length is
      // 2: e.g. ['a', ':directive'], return 'a'. When the length
      // is 3 or bigger: e.g. ['a', 'b', ':directive'], return
      // ['a', 'b'] as a compound selector.
      if (ast.compound.length < 3) {
        return {
          element: ast.compound[0],
          directive: last,
        };
      }
      return {
        element: {
          type: 'compound',
          compound: ast.compound.slice(0, -1),
        },
        directive: last,
      };
    }
  }

  // If there's no pseudo-directive, everything else would be
  // the element selector.
  return {
    element: ast,
    directive: null,
  };
}

/**
 * Finds a position of a pseudo directive from the complete CSS
 * selector. You can split the selector into normal or extended
 * selector and pseudo directive using this function.
 * @returns The position of a pseudo directive, or -1
 */
export function indexOfPseudoDirective(selector: string): number {
  // Directives are not chainable. We manually parse from the
  // backwards and break the process down into multiple loops for
  // optimised code path.
  let i = selector.lastIndexOf(')');
  let c = -1; // Character code.

  if (i === -1) {
    return -1;
  }

  // Look for the potential quoting.
  while (i--) {
    c = selector.charCodeAt(i);

    // Skip control and whitespace characters.
    if (c < 33) continue;

    if (c === 39 /* `'` */ || c === 34 /* '"' */ || c === 96 /* '`' */) {
      // Run the first loop with the quoting expection.
      while (i--) {
        if (selector.charCodeAt(i) === c) {
          break;
        }
      }

      break;
    }
  }

  // If it was not a quoting, we try to find the parenthesis.
  if (i < 0) i = selector.length;

  while (i--) {
    if (selector.charCodeAt(i) === 40 /* '(' */) {
      break;
    }
  }

  // Look for the last definition character ':'.
  c = selector.lastIndexOf(':', i);

  // We stored the position of `:` in `c` and the position of `(`
  // in `i`, so we can check the name of the pseudo directive.
  if (PSEUDO_DIRECTIVES.has(selector.slice(c + 1, i))) {
    return c;
  }

  return -1;
}
