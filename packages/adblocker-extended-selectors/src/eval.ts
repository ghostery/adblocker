/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { AST, Complex } from './types.js';

function parseRegex(str: string): RegExp {
  if (str.startsWith('/') && str.lastIndexOf('/') > 0) {
    const lastSlashIndex = str.lastIndexOf('/');
    const pattern = str.slice(1, lastSlashIndex);
    const flags = str.slice(lastSlashIndex + 1);

    if (!/^[gimsuyd]*$/.test(flags)) {
      throw new Error(`Invalid regex flags: ${flags}`);
    }

    return new RegExp(pattern, flags);
  } else {
    // Treat as raw pattern string, no flags
    return new RegExp(str);
  }
}

function stripsWrappingQuotes(str: string): string {
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    return str.slice(1, -1);
  }
  return str;
}

export function matchPattern(pattern: string, text: string): boolean {
  // TODO - support 'm' RegExp argument
  if (pattern.startsWith('/') && (pattern.endsWith('/') || pattern.endsWith('/i'))) {
    let caseSensitive = true;
    pattern = pattern.slice(1);

    if (pattern.endsWith('/')) {
      pattern = pattern.slice(0, -1);
    } else {
      pattern = pattern.slice(0, -2);
      caseSensitive = false;
    }

    return new RegExp(pattern, caseSensitive === false ? 'i' : undefined).test(text);
  }

  return text.includes(pattern);
}

/**
 * Checks if the given element complies with the given selector.
 * @param element The subjective element.
 * @param selector The selector.
 */
export function match(element: Element, selector: AST): boolean {
  if (
    selector.type === 'id' ||
    selector.type === 'class' ||
    selector.type === 'type' ||
    selector.type === 'attribute'
  ) {
    return element.matches(selector.content);
  } else if (selector.type === 'list') {
    return selector.list.some((s) => match(element, s));
  } else if (selector.type === 'compound') {
    // Type of `complex` cannot be one of `compound` as it splits selectors by left-side and right-side.
    return selector.compound.every((s) => match(element, s));
  } else if (selector.type === 'pseudo-class') {
    if (selector.name === 'has') {
      // The subjective element of `:has` check may be the given element or its children:
      // - e.g. `html:has(body)`, `body` is the expected subjective to be filtered by `traverse`.
      // - e.g. `html:has(>body)`, `html` is the subjective element to be filtered by `branch` then `traverse`.
      // `querySelectorAll` already describes the all.
      return (
        selector.subtree !== undefined && querySelectorAll(element, selector.subtree).length !== 0
      );
    } else if (selector.name === 'not') {
      // Unlike `:has`, `:not` assumes the subtree to be the condition for the given element.
      return selector.subtree !== undefined && traverse(element, [selector.subtree]).length === 0;
    } else if (selector.name === 'has-text') {
      const { argument } = selector;
      if (argument === undefined) {
        return false;
      }

      const text = element.textContent;
      if (text === null) {
        return false;
      }

      return matchPattern(argument, text);
    } else if (selector.name === 'min-text-length') {
      const minLength = Number(selector.argument);
      if (Number.isNaN(minLength) || minLength < 0) {
        return false;
      }

      const text = element.textContent;
      if (text === null) {
        return false;
      }

      return text.length >= minLength;
    } else if (selector.name === 'matches-path') {
      const { argument } = selector;
      if (argument === undefined) {
        return false;
      }

      const window = element.ownerDocument?.defaultView;
      if (!window) {
        return false;
      }

      // Get both pathname and search (query parameters)
      const path = window.location.pathname;
      const search = window.location.search;
      const fullUrl = path + search;
      const regex = parseRegex(argument);
      return regex.test(fullUrl);
    } else if (selector.name === 'matches-attr') {
      const { argument } = selector;
      if (argument === undefined) {
        return false;
      }

      const indexOfEqual = argument.indexOf('=');
      let namePattern: string;
      let valuePattern: string | undefined;
      if (indexOfEqual === -1) {
        namePattern = argument;
      } else {
        namePattern = argument.slice(0, indexOfEqual);
        valuePattern = argument.slice(indexOfEqual + 1);
      }

      namePattern = stripsWrappingQuotes(namePattern);
      valuePattern = valuePattern ? stripsWrappingQuotes(valuePattern) : undefined;

      const valueRegex =
        valuePattern?.startsWith('/') && valuePattern.lastIndexOf('/') > 0
          ? parseRegex(valuePattern)
          : undefined;

      if (namePattern.startsWith('/') && namePattern.lastIndexOf('/') > 0) {
        // matching attribute name by regex
        const regex = parseRegex(namePattern);
        const matchingAttrs = [...element.attributes].filter((attr) => regex.test(attr.name));

        // If no value pattern, return true if any attribute matches the name pattern
        if (!valuePattern) {
          return matchingAttrs.length > 0;
        }

        // Check if any of the matching attributes have the specified value
        return matchingAttrs.some((attr) =>
          valueRegex ? valueRegex.test(attr.value) : attr.value === valuePattern,
        );
      } else {
        // matching attribute name by string
        const value = element.getAttribute(namePattern);
        // null means the attribute is not present
        if (value === null) {
          return false;
        }

        // early exit if no value pattern is provided
        if (!valuePattern) {
          return true;
        }

        return valueRegex ? valueRegex.test(value) : value === valuePattern;
      }
    }
  }

  return false;
}

/**
 * Tranposes the given element with a selector.
 * @param element The subjective element
 * @param selector A selector
 * @returns An array with and without singular element; we may support transposing to multiple targets in the future
 * but currently it's for the convenience to match return type.
 */
function transpose(element: Element, selector: AST): Element[] {
  // The difference between `complex` handlers in `querySelectorAll` and `transpose` is nothing.
  // However, it's also handled here to clarify and reduce complexity in the code flow.
  // `querySelectorAll` is not used in `traverse` to avoid changing the subjective element unintentionally.
  // Unlike this function, it assumes the subjective element to be guessed for other selectors.
  // Also, we don't want to handle other selectors unless required as others are not *actually* transposable selectors.
  // Since `traverse` assumes the subjective element to be the given element, we don't transpose to that.
  // For an instance, type of `attribute` is to validate the subjective element has an `attribute`,
  // not to select and transpose to the selector in a row.
  // However, we want to do actual *transpose* not *match* with the selector type of `complex`
  // as it could be mixed in the `compound` type selector and we want to move the target.
  // e.g. This compound: `html>body` involes *transposing*, but not this compound: `html[lang*="en"]` (only *matching*).
  // Therefore, this describes the behavior within the children nodes of the `compound` selector.
  if (selector.type === 'complex') {
    return branch(element, selector);
  } else if (selector.type === 'pseudo-class') {
    if (selector.name === 'upward') {
      if (selector.argument === undefined) {
        return [];
      }
      const literalOrNumeric = stripsWrappingQuotes(selector.argument);
      let number = parseInt(literalOrNumeric, 10);
      let parentElement: Element | null = element;
      if (!Number.isInteger(number)) {
        while ((parentElement = parentElement.parentElement) !== null) {
          if (parentElement.matches(literalOrNumeric)) {
            return [parentElement];
          }
        }
      } else {
        if (number <= 0 || number >= 256) {
          return [];
        }
        while ((parentElement = parentElement.parentElement) !== null) {
          if (--number === 0) {
            return [parentElement];
          }
        }
      }
    }
  }
  return [];
}

/**
 * Describes CSS combinator behaviors from the given element.
 * @param element The current subjective element.
 * @param selector A complex selector.
 */
function branch(element: Element, selector: Complex): Element[] {
  // The *left* part of the given selector is not queried by the previous step.
  // If there's no *left* part, we fallback to the current element.
  const leftElements: Element[] =
    selector.left === undefined ? [element] : querySelectorAll(element, selector.left);
  // The *right* part of the given selector is always *singular*.
  // The understanding of `compound` selector behavior differs by `match` and `querySelectorAll`.
  // The `compound` handler in `querySelectorAll` assume the subjective to be queried.
  // However, our *actual* subjective elements are coming from *left* part of the selector.
  // Therefore, we unmarshal the `compound` selector and directly use `traversal` which will involve `compound` handling in `match`.
  const selectors =
    selector.right.type === 'compound' ? selector.right.compound : [selector.right];
  const results: Element[] = [];
  if (selector.combinator === ' ') {
    // Look for all children *in any depth* of the all `leftElements` and filter them by `traversal`.
    for (const leftElement of leftElements) {
      for (const child of leftElement.querySelectorAll('*')) {
        for (const result of traverse(child, selectors)) {
          if (!results.includes(result)) {
            results.push(result);
          }
        }
      }
    }
  } else if (selector.combinator === '+') {
    // Look for a next sibiling of the all `leftElements` and filter them by `traversal`.
    for (const leftElement of leftElements) {
      if (leftElement.nextElementSibling === null) {
        continue;
      }
      for (const result of traverse(leftElement.nextElementSibling, selectors)) {
        if (!results.includes(result)) {
          results.push(result);
        }
      }
    }
  } else if (selector.combinator === '>') {
    // Look for all children of the all `leftElements` and filter them by `traversal`.
    for (const leftElement of leftElements) {
      for (const child of leftElement.children) {
        for (const result of traverse(child, selectors)) {
          if (!results.includes(result)) {
            results.push(result);
          }
        }
      }
    }
  } else if (selector.combinator === '~') {
    // Look for all siblings of the all `leftElements` and filter them by `traversal`.
    for (const leftElement of leftElements) {
      let sibling: Element | null = leftElement;
      while ((sibling = sibling.nextElementSibling) !== null) {
        for (const result of traverse(sibling, selectors)) {
          if (!results.includes(result)) {
            results.push(result);
          }
        }
      }
    }
  }
  return results;
}

/**
 * Checks elements by traversing from the given element.
 * You need to decide the subjective element candidates manually.
 * It doesn't look for the children of the given element.
 * @param root The subjective element.
 * @param selectors The selector list to validate with.
 * @returns If the given element and all followed candidate fails, it returns an empty array.
 */
function traverse(root: Element, selectors: AST[]): Element[] {
  const traversals: Array<{ element: Element; index: number }> = [{ element: root, index: 0 }];
  const results: Element[] = [];
  const selectorsCount = selectors.length;
  while (traversals.length) {
    const traversal = traversals.pop()!;
    let candidates: Element[];
    for (; traversal.index < selectorsCount; traversal.index++) {
      if ((candidates = transpose(traversal.element, selectors[traversal.index])).length !== 0) {
        for (const candidate of candidates) {
          traversals.push({
            element: candidate,
            index: traversal.index + 1,
          });
        }
      }
      if (match(traversal.element, selectors[traversal.index]) === false) {
        break;
      }
    }
    if (traversal.index === selectorsCount && !results.includes(traversal.element)) {
      results.push(traversal.element);
    }
  }
  return results;
}

export function querySelectorAll(element: Element, selector: AST): Element[] {
  // Type of `attribute`, `class`, `id`, and `type` are to express simple selectors.
  // e.g. `[attr]` is `attribute` type, `.cls` is `class` type, `#lure` is `id` type, and `div` is `type` type.
  if (
    selector.type === 'attribute' ||
    selector.type === 'class' ||
    selector.type === 'id' ||
    selector.type === 'type'
  ) {
    // Try to support literal `html` selector with type of `type`.
    // if (element instanceof HTMLHtmlElement && selector.content === 'html') {
    //   return [element];
    // }
    return Array.from(element.querySelectorAll(selector.content));
  }
  // Type of `complex` is used to express CSS combinators: ` `, `>`, `+`, `~`.
  // The `branch` function describes the behavior per combinator.
  if (selector.type === 'complex') {
    return branch(element, selector);
  }
  // Type of `list` is sets of selector trees.
  // We just join all the results.
  // e.g. `p, span`
  if (selector.type === 'list') {
    const results: Element[] = [];
    for (const item of selector.list) {
      for (const result of querySelectorAll(element, item)) {
        if (!results.includes(result)) {
          results.push(result);
        }
      }
    }
    return results;
  }
  // Type of `compound` is a set of consecutive selectors.
  // They're in chained form like `p:has(span)` and works as logical AND.
  if (selector.type === 'compound') {
    const results: Element[] = [];
    // Figure out the subjective element.
    // If omitted, it will fallback to `pseudo-class` branch of `querySelectorAll`:
    // - e.g. `:has(body)`, subjective is `html`.
    // If given, it will run `querySelectorAll` on first selector:
    // - e.g. `html:has(body)`, subjective is given.
    const selectors = selector.compound.slice(1);
    for (const subjective of querySelectorAll(element, selector.compound[0])) {
      for (const result of traverse(subjective, selectors)) {
        if (!results.includes(result)) {
          results.push(result);
        }
      }
    }
    return results;
  }
  // `querySelectorAll` is assumed as an entrypoint function and intended to run the first selector of the AST.
  // Otherwise, we will run `traversals` directly by diciding the subjective element specifically.
  // If `pseudo-class` is the first selector, it means `html` or the given element is omitted.
  if (selector.type === 'pseudo-class') {
    if (match(element, selector)) {
      return [element];
    }
    return [];
  }
  return [];
}
