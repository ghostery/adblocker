/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { AST } from './types.js';

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

      // Get the current URL path
      const path = globalThis.window.location.pathname;

      // Convert the argument to a RegExp pattern
      // Remove leading and trailing slashes from the argument
      const pattern = argument.replace(/^\/|\/$/g, '');
      const regex = new RegExp(pattern);

      return regex.test(path);
    } else if (selector.name === 'matches-attr') {
      const { argument } = selector;
      if (argument === undefined) {
        return false;
      }

      // Parse the attribute name and pattern from the argument
      // Format: attrName="pattern"
      const match = argument.match(/^([^=]+)="([^"]+)"$/);
      if (!match) {
        return false;
      }

      const [, attrName, pattern] = match;
      const value = element.getAttribute(attrName);
      if (value === null) {
        return false;
      }

      // Convert the pattern to a RegExp
      // Escape special characters except for regex patterns
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedPattern);

      return regex.test(value);
    } else if (selector.name === 'upward') {
      // :upward is handled in querySelectorAll
      return false;
    }
  }

  return false;
}

export function querySelectorAll(element: Element, selector: AST): Element[] {
  const elements: Element[] = [];

  if (
    selector.type === 'id' ||
    selector.type === 'class' ||
    selector.type === 'type' ||
    selector.type === 'attribute'
  ) {
    elements.push(...element.querySelectorAll(selector.content));
  } else if (selector.type === 'list') {
    for (const subSelector of selector.list) {
      elements.push(...querySelectorAll(element, subSelector));
    }
  } else if (selector.type === 'compound') {
    if (selector.compound.length !== 0) {
      // Find the first :upward selector in the compound
      const upwardIndex = selector.compound.findIndex(
        (s) => s.type === 'pseudo-class' && s.name === 'upward',
      );
      if (upwardIndex === -1) {
        // No :upward, use original logic
        const firstSelector = selector.compound[0];
        const restSelectors = selector.compound.slice(1);
        elements.push(
          ...querySelectorAll(element, firstSelector).filter((e) =>
            restSelectors.every((s) => matches(e, s)),
          ),
        );
      } else {
        // Split at first :upward
        const before = selector.compound.slice(0, upwardIndex);
        const upward = selector.compound[upwardIndex];
        const after = selector.compound.slice(upwardIndex + 1);

        // Get initial candidates
        const candidates: Element[] =
          before.length > 0
            ? querySelectorAll(element, { type: 'compound', compound: before })
            : [element];

        // For each candidate, apply upward logic
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
          if (!Number.isNaN(n)) {
            if (n <= 0 || n >= 256) {
              // Invalid numeric argument, return empty array
              return [];
            }
            let ancestor: Element | null = c;
            for (let j = 0; j < n; j++) {
              ancestor = ancestor.parentElement;
              if (ancestor === null) {
                break;
              }
            }
            if (ancestor !== null) {
              ancestors.push(ancestor);
            }
          } else {
            let ancestor: Element | null = c.parentElement;
            let found = false;
            while (ancestor !== null) {
              if (ancestor.matches && ancestor.matches(argument)) {
                ancestors.push(ancestor);
                found = true;
                break;
              }
              ancestor = ancestor.parentElement;
            }
            if (!found) {
              // No matching ancestor, return empty array
              return [];
            }
          }
        }

        if (ancestors.length === 0) {
          return [];
        }

        if (after.length > 0) {
          // If the next selector is another :upward, recursively process
          if (after[0].type === 'pseudo-class' && after[0].name === 'upward') {
            let results: Element[] = [];
            for (const a of ancestors) {
              results = results.concat(querySelectorAll(a, { type: 'compound', compound: after }));
            }
            return results;
          } else {
            // Otherwise, filter the ancestors with the remaining selectors using matches
            return ancestors.filter((a) => after.every((s) => matches(a, s)));
          }
        } else {
          return ancestors;
        }
      }
    }
  } else if (selector.type === 'complex') {
    const elements2 =
      selector.left === undefined ? [element] : querySelectorAll(element, selector.left);

    if (selector.combinator === ' ') {
      for (const element2 of elements2) {
        elements.push(...querySelectorAll(element2, selector.right));
      }
    } else if (selector.combinator === '>') {
      for (const element2 of elements2) {
        for (const child of element2.children) {
          if (matches(child, selector.right) === true) {
            elements.push(child);
          }
        }
      }
    } else if (selector.combinator === '~') {
      for (const element2 of elements2) {
        let sibling: Element | null = element2;
        while ((sibling = sibling.nextElementSibling) !== null) {
          if (matches(sibling, selector.right) === true) {
            elements.push(sibling);
          }
        }
      }
    } else if (selector.combinator === '+') {
      for (const element2 of elements2) {
        const nextElementSibling = element2.nextElementSibling;
        if (nextElementSibling !== null && matches(nextElementSibling, selector.right) === true) {
          elements.push(nextElementSibling);
        }
      }
    }
  } else if (selector.type === 'pseudo-class') {
    if (selector.name === 'upward') {
      const { argument } = selector;
      if (argument === undefined) {
        return elements;
      }
      const n = Number(argument);
      if (!Number.isNaN(n)) {
        if (n <= 0 || n >= 256) {
          return [];
        }
        let ancestor: Element | null = element;
        for (let i = 0; i < n; i++) {
          ancestor = ancestor.parentElement;
          if (ancestor === null) {
            return [];
          }
        }
        elements.push(ancestor);
      } else {
        let ancestor: Element | null = element.parentElement;
        let found = false;
        while (ancestor !== null) {
          if (ancestor.matches && ancestor.matches(argument)) {
            elements.push(ancestor);
            found = true;
            break;
          }
          ancestor = ancestor.parentElement;
        }
        if (!found) {
          return [];
        }
      }
    } else {
      for (const subElement of element.querySelectorAll('*')) {
        if (matches(subElement, selector) === true) {
          elements.push(subElement);
        }
      }
    }
  }

  return elements;
}
