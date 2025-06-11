/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { AST, Complex } from './types.js';

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

      const path = globalThis.window.location.pathname;

      let pattern = argument;
      if (pattern.startsWith('/') && pattern.endsWith('/')) {
        pattern = pattern.slice(1, -1);
      }

      const regex = new RegExp(pattern);
      return regex.test(path);
    } else if (selector.name === 'matches-attr') {
      const { argument } = selector;
      if (argument === undefined) {
        return false;
      }

      const indexOfEqual = argument.indexOf('=');
      let namePattern, valuePattern;
      if (indexOfEqual === -1) {
        namePattern = argument;
      } else {
        namePattern = argument.slice(0, indexOfEqual);
        valuePattern = argument.slice(indexOfEqual + 1);
      }

      let attrName = namePattern;
      if (namePattern.startsWith('/') && namePattern.endsWith('/')) {
        const regex = new RegExp(namePattern.slice(1, -1));
        for (const attr of element.attributes) {
          if (regex.test(attr.name)) {
            attrName = attr.name;
            break;
          }
        }
        // could not find a matching attribute name
        if (attrName === namePattern) {
          return false;
        }
      }

      if (!valuePattern) {
        return element.hasAttribute(attrName);
      }

      const value = element.getAttribute(attrName);

      if (value === null) {
        return false;
      }

      if (valuePattern.startsWith('"') && valuePattern.endsWith('"')) {
        valuePattern = valuePattern.slice(1, -1);
      }

      if (valuePattern.startsWith('/') && valuePattern.endsWith('/')) {
        const regex = new RegExp(valuePattern.slice(1, -1));
        return regex.test(value);
      } else {
        return value === valuePattern;
      }
    } else if (selector.name === 'upward') {
      // :upward is handled in querySelectorAll
      return false;
    }
  }

  return false;
}

function findAncestorByDistance(element: Element, distance: number): Element | null {
  if (distance <= 0 || distance >= 256) {
    return null;
  }
  let ancestor: Element | null = element;
  for (let i = 0; i < distance; i++) {
    ancestor = ancestor.parentElement;
    if (ancestor === null) {
      return null;
    }
  }
  return ancestor;
}

function findAncestorBySelector(element: Element, selector: string): Element | null {
  let ancestor: Element | null = element.parentElement;
  while (ancestor !== null) {
    if (ancestor.matches && ancestor.matches(selector)) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }
  return null;
}

function handleCompoundSelector(element: Element, compound: AST[]): Element[] {
  if (compound.length === 0) {
    return [];
  }

  const upwardIndex = compound.findIndex((s) => s.type === 'pseudo-class' && s.name === 'upward');

  if (upwardIndex === -1) {
    const firstSelector = compound[0];
    const restSelectors = compound.slice(1);
    return querySelectorAll(element, firstSelector).filter((e) =>
      restSelectors.every((s) => matches(e, s)),
    );
  }

  const before = compound.slice(0, upwardIndex);
  const upward = compound[upwardIndex];
  const after = compound.slice(upwardIndex + 1);

  const candidates =
    before.length > 0
      ? querySelectorAll(element, { type: 'compound', compound: before })
      : [element];

  const ancestors: Element[] = [];

  for (const c of candidates) {
    if (upward.type !== 'pseudo-class' || upward.name !== 'upward') {
      continue;
    }
    const { argument } = upward;
    if (argument === undefined) {
      continue;
    }

    const n = Number(argument);
    const ancestor = !Number.isNaN(n)
      ? findAncestorByDistance(c, n)
      : findAncestorBySelector(c, argument);

    if (ancestor === null) {
      continue;
    }
    ancestors.push(ancestor);
  }

  if (ancestors.length === 0) {
    return [];
  }

  if (after.length > 0) {
    if (after[0].type === 'pseudo-class' && after[0].name === 'upward') {
      return ancestors.flatMap((a) => querySelectorAll(a, { type: 'compound', compound: after }));
    }
    return ancestors.filter((a) => after.every((s) => matches(a, s)));
  }

  return ancestors;
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
    if (selector.name === 'upward') {
      const { argument } = selector;
      if (argument === undefined) {
        return [];
      }

      const n = Number(argument);
      const ancestor = !Number.isNaN(n)
        ? findAncestorByDistance(element, n)
        : findAncestorBySelector(element, argument);

      return ancestor !== null ? [ancestor] : [];
    }

    return Array.from(element.querySelectorAll('*')).filter((e) => matches(e, selector));
  }

  return [];
}
