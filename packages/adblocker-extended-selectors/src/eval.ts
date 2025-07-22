/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { AST, Complex } from './types.js';

/**
 * Evaluates an XPath expression and returns matching Element nodes.
 * @param element - The context element for XPath evaluation
 * @param xpathExpression - The XPath expression to evaluate
 * @returns Array of Element nodes that match the XPath expression
 */
function handleXPathSelector(element: Element, xpathExpression: string): Element[] {
  try {
    if (typeof Node === 'undefined' || typeof XPathResult === 'undefined') {
      return []; // unsupported (not running in the browser)
    }

    const result = element.ownerDocument.evaluate(
      xpathExpression,
      element,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null,
    );

    if (result.resultType !== XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
      return [];
    }

    const elements: Element[] = [];
    for (let i = 0; i < result.snapshotLength; i++) {
      const node = result.snapshotItem(i);
      if (node?.nodeType === Node.ELEMENT_NODE) {
        elements.push(node as Element);
      }
    }

    return elements;
  } catch (e) {
    return [];
  }
}

function parseCSSValue(cssValue: string): { property: string; value: string; isRegex: boolean } {
  const firstColonIndex = cssValue.indexOf(':');

  if (firstColonIndex === -1) {
    throw new Error('Invalid CSS value format: no colon found');
  }

  const property = cssValue.slice(0, firstColonIndex).trim();
  const value = cssValue.slice(firstColonIndex + 1).trim();
  const isRegex = value.startsWith('/') && value.lastIndexOf('/') > 0;

  return { property, value, isRegex };
}

function matchCSSProperty(element: Element, cssValue: string, pseudoElement?: string): boolean {
  const { property, value, isRegex } = parseCSSValue(cssValue);

  const win = element.ownerDocument && element.ownerDocument.defaultView;
  if (!win) throw new Error('No window context for element');
  const computedStyle = win.getComputedStyle(element, pseudoElement);

  const actualValue = computedStyle[property as keyof CSSStyleDeclaration] as string;

  if (isRegex) {
    const regex = parseRegex(value);
    return regex.test(actualValue);
  }

  return actualValue === value;
}

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
  pattern = stripsWrappingQuotes(pattern);
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
export function matches(element: Element, selector: AST): boolean {
  if (
    selector.type === 'id' ||
    selector.type === 'class' ||
    selector.type === 'type' ||
    selector.type === 'attribute'
  ) {
    return element.matches(selector.content);
  } else if (selector.type === 'list') {
    return selector.list.some((s) => matches(element, s));
  } else if (selector.type === 'compound') {
    // Compound selectors contain only simple selectors (id, class, type, attribute, pseudo-class)
    // that must all match the same element. Complex selectors (with combinators like >, +, ~)
    // are processed at a higher level by the parser, so they can never be children of compound selectors.
    return selector.compound.every((s) => matches(element, s));
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

      return matchPattern(argument, text.trim());
    } else if (selector.name === 'min-text-length') {
      const minLength = Number(selector.argument);
      if (Number.isNaN(minLength) || minLength < 0) {
        return false;
      }

      const text = element.textContent ?? '';
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

      let valueRegex: RegExp | null = null;
      if (valuePattern?.startsWith('/') && valuePattern.lastIndexOf('/') > 0) {
        valueRegex = parseRegex(valuePattern);
      }

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
    } else if (selector.name === 'matches-css') {
      return selector.argument !== undefined && matchCSSProperty(element, selector.argument);
    } else if (selector.name === 'matches-css-after') {
      return (
        selector.argument !== undefined && matchCSSProperty(element, selector.argument, '::after')
      );
    } else if (selector.name === 'matches-css-before') {
      return (
        selector.argument !== undefined && matchCSSProperty(element, selector.argument, '::before')
      );
    }
  }

  return false;
}

/**
 * Describes CSS combinator behaviors from the given element.
 * @param element The current subjective element.
 * @param selector A complex selector.
 */
function handleComplexSelector(element: Element, selector: Complex): Element[] {
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
  const results: Set<Element> = new Set();
  switch (selector.combinator) {
    case ' ':
      // Look for all children *in any depth* of the all `leftElements` and filter them by `traversal`.
      for (const leftElement of leftElements) {
        for (const child of leftElement.querySelectorAll('*')) {
          for (const result of traverse(child, selectors)) {
            results.add(result);
          }
        }
      }
      break;
    case '>':
      // Look for all children of the all `leftElements` and filter them by `traversal`.
      for (const leftElement of leftElements) {
        for (const child of leftElement.children) {
          for (const result of traverse(child, selectors)) {
            results.add(result);
          }
        }
      }
      break;
    case '~':
      // Look for all siblings of the all `leftElements` and filter them by `traversal`.
      for (const leftElement of leftElements) {
        let sibling: Element | null = leftElement;
        while ((sibling = sibling.nextElementSibling) !== null) {
          for (const result of traverse(sibling, selectors)) {
            results.add(result);
          }
        }
      }
      break;
    case '+':
      // Look for a next sibiling of the all `leftElements` and filter them by `traversal`.
      for (const leftElement of leftElements) {
        if (leftElement.nextElementSibling === null) {
          continue;
        }
        for (const result of traverse(leftElement.nextElementSibling, selectors)) {
          results.add(result);
        }
      }
      break;
  }
  return Array.from(results);
}

/**
 * Transposes the given element with a selector.
 * @param element The subjective element
 * @param selector A selector
 * @returns An array of elements or null if not a transpose operator.
 */
function transpose(element: Element, selector: AST): Element[] | null {
  if (selector.type === 'pseudo-class') {
    if (selector.name === 'upward') {
      if (selector.argument === undefined) {
        return [];
      }

      const argument = stripsWrappingQuotes(selector.argument);
      let parentElement: Element | null = element;
      let number = Number(argument);

      if (Number.isInteger(number)) {
        if (number <= 0 || number >= 256) {
          return [];
        }
        while ((parentElement = parentElement.parentElement) !== null) {
          if (--number === 0) {
            return [parentElement];
          }
        }
      } else {
        while ((parentElement = parentElement.parentElement) !== null) {
          if (parentElement.matches(argument)) {
            return [parentElement];
          }
        }
      }
      return [];
    } else if (selector.name === 'xpath') {
      if (selector.argument === undefined) {
        return [];
      }
      return handleXPathSelector(element, selector.argument);
    }
  }

  return null;
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
  if (selectors.length === 0) {
    return [];
  }

  const traversals = [{ element: root, index: 0 }];
  const results: Element[] = [];

  while (traversals.length) {
    const traversal = traversals.pop()!;
    const { element } = traversal;
    let { index } = traversal;
    for (; index < selectors.length; index++) {
      const candidates = transpose(element, selectors[index]);
      const isTransposeOperator = candidates !== null;
      if (isTransposeOperator) {
        traversals.push(...candidates.map((element) => ({ element, index: index + 1 })));
        break;
      } else if (matches(element, selectors[index]) === false) {
        // no maches found - stop processing the branch
        break;
      }
    }
    // Check if the loop was completed
    if (index === selectors.length && !results.includes(element)) {
      results.push(element);
    }
  }

  return results;
}

export function querySelectorAll(element: Element, selector: AST): Element[] {
  // Type of `attribute`, `class`, `id`, and `type` are to express simple selectors.
  // e.g. `[attr]` is `attribute` type, `.cls` is `class` type, `#lure` is `id` type, and `div` is `type` type.
  if (
    selector.type === 'id' ||
    selector.type === 'class' ||
    selector.type === 'type' ||
    selector.type === 'attribute'
  ) {
    return Array.from(element.querySelectorAll(selector.content));
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
    const [first, ...rest] = selector.compound;
    for (const subjective of querySelectorAll(element, first)) {
      for (const result of traverse(subjective, rest)) {
        if (!results.includes(result)) {
          results.push(result);
        }
      }
    }
    return results;
  }

  // Type of `complex` is used to express CSS combinators: ` `, `>`, `+`, `~`.
  // The `branch` function describes the behavior per combinator.
  if (selector.type === 'complex') {
    return handleComplexSelector(element, selector);
  }

  if (selector.type === 'pseudo-class') {
    const results: Element[] = [];
    // This code is intended to be matched with `document.documentElement.querySelectorAll`.
    // Since `document` is at the higher position rather `document.documentElement`,
    // it can't select `html` for an instance.
    for (const subjective of element.querySelectorAll('*')) {
      for (const result of traverse(subjective, [selector])) {
        if (!results.includes(result)) {
          results.push(result);
        }
      }
    }
    return results;
  }

  return [];
}
