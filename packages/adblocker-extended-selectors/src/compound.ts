/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { AST, PseudoClass } from './types.js';

function findAncestorByDistance(element: Element, distance: number): Element | null {
  // sanity check, since the distance is provided as part of filter
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
    if (ancestor.matches(selector)) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }
  return null;
}

function navigateUpward(candidates: Element[], upward: PseudoClass): Element[] {
  if (upward.argument === undefined) {
    return [];
  }

  const ancestors = new Set<Element>();
  const distance = Number(upward.argument);
  const isDistanceNavigation = Number.isInteger(distance);
  for (const candidate of candidates) {
    const ancestor = isDistanceNavigation
      ? findAncestorByDistance(candidate, distance)
      : findAncestorBySelector(candidate, upward.argument);
    if (ancestor !== null) {
      ancestors.add(ancestor);
    }
  }
  return [...ancestors];
}

function trySplitUpward(
  compound: AST[],
): { before: AST[]; upward: PseudoClass; after: AST[] } | null {
  const upwardIndex = compound.findIndex((s) => s.type === 'pseudo-class' && s.name === 'upward');
  if (upwardIndex < 0) {
    return null;
  }
  const before = compound.slice(0, upwardIndex);
  const upward = compound[upwardIndex] as PseudoClass;
  const after = compound.slice(upwardIndex + 1);
  return { before, upward, after };
}

function proceedAfterUpwardNavigation(
  candidates: Element[],
  compound: AST[],
  matchesFn: (element: Element, selector: AST) => boolean,
): Element[] {
  if (compound.length === 0) {
    return candidates;
  }

  const upwardParts = trySplitUpward(compound);
  if (upwardParts) {
    const { before, upward, after } = upwardParts;
    const beforeCandidates = candidates.filter((e) => before.every((s) => matchesFn(e, s)));
    const afterCandidates = navigateUpward(beforeCandidates, upward);
    return proceedAfterUpwardNavigation(afterCandidates, after, matchesFn);
  }

  return candidates.filter((e) => compound.every((s) => matchesFn(e, s)));
}

export function handleCompoundSelector(
  element: Element,
  compound: AST[],
  matchesFn: (element: Element, selector: AST) => boolean,
  querySelectorAllFn: (element: Element, selector: AST) => Element[],
): Element[] {
  if (compound.length === 0) {
    return [];
  }

  const upwardParts = trySplitUpward(compound);
  if (upwardParts) {
    const { before, upward, after } = upwardParts;
    // :upward requires a two-phase approach because it changes search context
    // Phase 1: Find initial candidates matching 'before' selectors, then navigate up
    // to their ancestors using :upward
    // Phase 2: Filter down the ancestor candidates using 'after' selectors
    const beforeCandidates =
      before.length > 0
        ? querySelectorAllFn(element, { type: 'compound', compound: before })
        : [element];
    const afterCandidates = navigateUpward(beforeCandidates, upward);
    return proceedAfterUpwardNavigation(afterCandidates, after, matchesFn);
  }

  const [firstSelector, ...restSelectors] = compound;
  const candidates = querySelectorAllFn(element, firstSelector);

  return candidates.filter((e) => restSelectors.every((s) => matchesFn(e, s)));
}
