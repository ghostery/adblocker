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
 * Checks if an element complies with the given selector.
 * This function shouldn't handle any transposing as it's intended to check subtree not the parents.
 * @param element The subjective element
 * @param selector A selector
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
    return selector.compound.every((s) => matches(element, s));
  } else if (selector.type === 'pseudo-class') {
    if (selector.name === 'has' || selector.name === 'if') {
      // TODO - is this a querySelectorAll or matches here?
      return (
        selector.subtree !== undefined && querySelectorAll(element, selector.subtree).length !== 0
      );
    } else if (selector.name === 'not') {
      return selector.subtree !== undefined && matches(element, selector.subtree) === false;
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
 * Try transposing with a selector from the subjective element.
 * @param element The subjective element
 * @param selector A selector
 * @returns An array with and without singular element; we may support transposing to multiple targets in the future
 * but currently it's for the convenience to match return type.
 */
function transpose(element: Element, selector: AST): [] | [Element] {
  if (selector.type === 'pseudo-class') {
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

function handleComplexSelector(element: Element, selector: Complex): Element[] {
  const elements: Element[] = [];
  const leftElements =
    selector.left === undefined ? [element] : querySelectorAll(element, selector.left);

  switch (selector.combinator) {
    case ' ':
      for (const e of leftElements) {
        elements.push(...querySelectorAll(e, selector.right));
      }
      break;
    case '>':
      for (const e of leftElements) {
        elements.push(...Array.from(e.children).filter((child) => matches(child, selector.right)));
      }
      break;
    case '~':
      for (const e of leftElements) {
        let sibling: Element | null = e;
        while ((sibling = sibling.nextElementSibling) !== null) {
          if (matches(sibling, selector.right)) {
            elements.push(sibling);
          }
        }
      }
      break;
    case '+':
      for (const e of leftElements) {
        const next = e.nextElementSibling;
        if (next !== null && matches(next, selector.right)) {
          elements.push(next);
        }
      }
      break;
  }

  return elements;
}

/**
 * Handles compound selectors or a list of selectors for subjective element.
 * To handle multi-paths matching, this function create branches internally and validates each cases.
 * @param element The subjective element
 * @param selectors A list of selectors to sequentially validated
 * @returns A list of elements matches the list of selectors
 */
function handleCompoundSelector(element: Element, selectors: AST[]): Element[] {
  if (selectors.length === 0) {
    return [];
  }

  // Start with validating the subjective element with given selectors
  const branches: [Element, number][] = querySelectorAll(element, selectors[0]).map(
    function (element) {
      return [element, 1];
    },
  );
  const results: Element[] = [];

  while (branches.length) {
    const branch = branches.pop()!;
    const element = branch[0];
    let currentIndex = branch[1];
    for (let candidates: Element[]; currentIndex < selectors.length; currentIndex++) {
      // Handle transpose
      if ((candidates = transpose(element, selectors[currentIndex])).length !== 0) {
        const nextIndex = currentIndex + 1;
        branches.push(
          ...candidates.map<[Element, number]>(function (candidate) {
            return [candidate, nextIndex];
          }),
        );
        break;
      }
      // Handle consecutive selectors
      if (matches(element, selectors[currentIndex]) === false) {
        break;
      }
    }
    // Check if the loop was completed
    if (currentIndex === selectors.length && !results.includes(element)) {
      results.push(element);
    }
  }

  return results;
}

export function querySelectorAll(element: Element, selector: AST): Element[] {
  if (
    selector.type === 'id' ||
    selector.type === 'class' ||
    selector.type === 'type' ||
    selector.type === 'attribute'
  ) {
    return Array.from(element.querySelectorAll(selector.content));
  }

  if (selector.type === 'list') {
    return selector.list.flatMap((s) => querySelectorAll(element, s));
  }

  if (selector.type === 'compound') {
    return handleCompoundSelector(element, selector.compound);
  }

  if (selector.type === 'complex') {
    return handleComplexSelector(element, selector);
  }

  if (selector.type === 'pseudo-class') {
    return Array.from(element.querySelectorAll('*')).filter((e) => matches(e, selector));
  }

  return [];
}
