/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// This module implements an extremely efficient stream HTML filtering engine
// which is able to consume an HTML document over time and filter part of it
// using adblocker selectors.

export type HTMLSelector = readonly ['script', readonly string[]];

export function extractHTMLSelectorFromRule(rule: string): HTMLSelector | undefined {
  if (rule.startsWith('^script') === false) {
    return undefined;
  }

  const prefix = ':has-text(';
  const selectors: string[] = [];

  let index = 7;
  // ^script:has-text
  //        ^ 7

  // Prepare for finding one or more ':has-text(' selectors in a row
  while (rule.startsWith(prefix, index)) {
    index += prefix.length;
    let currentParsingDepth = 1;
    const startOfSelectorIndex = index;
    let prev = -1; // previous character
    for (; index < rule.length && currentParsingDepth !== 0; index += 1) {
      const code = rule.charCodeAt(index);

      if (prev !== 92 /* '\' */) {
        if (code === 40 /* '(' */) {
          currentParsingDepth += 1;
        }

        if (code === 41 /* ')' */) {
          currentParsingDepth -= 1;
        }
      }

      prev = code;
    }

    selectors.push(rule.slice(startOfSelectorIndex, index - 1));
  }

  if (index !== rule.length) {
    return undefined;
  }

  return ['script', selectors];
}

export function extractTagsFromHtml(
  html: string,
  tag: string,
): [[number, string][], string, string] {
  const tags: [number, string][] = [];
  const prefix = `<${tag}`;
  const suffix = `</${tag}>`;

  // Keep track of the beginning of current identified tag
  let index = html.indexOf(prefix);
  // Keep tracks of index immediately following last extracted tag
  let endOfLastTag = 0;

  while (index !== -1) {
    // Find index of end of current tag. If we do not find it, it could be
    // because it will come in the next chunk and we should try parsing it
    // again then.
    const endOfTagIndex = html.indexOf('>', index + prefix.length);
    if (endOfTagIndex === -1) {
      return [tags, html.slice(0, index), html.slice(index)];
    }

    // Handle short tag form <tag/> which will not have a closing tag.
    if (html.charCodeAt(endOfTagIndex - 1) === 47 /* '/' */) {
      endOfLastTag = endOfTagIndex + 1;
      tags.push([index, html.slice(index, endOfLastTag)]);
    } else {
      // Find index of closing tag '</tag>'. If we do not find it, again, it
      // could mean that it will come in next chunk and we need to try parsing
      // it again with more input.
      const indexOfClosingTag = html.indexOf(suffix, endOfTagIndex);
      if (indexOfClosingTag === -1) {
        return [tags, html.slice(0, index), html.slice(index)];
      }

      tags.push([index, html.slice(index, indexOfClosingTag + suffix.length)]);
      endOfLastTag = indexOfClosingTag + suffix.length;
    }

    index = html.indexOf(prefix, endOfLastTag);
  }

  // Make sure we consume as much input as possible so that we do not parse the
  // same portion of HTML again next time and we can stream chunks as early as
  // possible.
  //
  // We check if there is at least one '<' char after the end of the last
  // extracted tag; this would indicate that the next chunk might contain the
  // remaining of a valid tag. We then look up to N characters after this '<'
  // character, where N is the size of 'prefix'. The rational is that if we
  // reached this part of the code, then it cannot be a match otherwise we
  // would have returned earlier (from the loop).
  let lastClosingTagIndex = html.lastIndexOf('>');
  if (lastClosingTagIndex === -1) {
    lastClosingTagIndex = endOfLastTag;
  }

  const indexOfNextTag = html.indexOf('<', lastClosingTagIndex);
  // If no '<' in the remaining of input, then it means we can count this chunk
  // as fully parsed (i.e.: next chunk can be parsed independently without
  // missing a tag which would start in this one).
  if (indexOfNextTag === -1) {
    return [tags, html, ''];
  }

  // In case of a partial tag ending this 'html' chunk. Then check if we have
  // enough information to discard it already based on the kind of tags we are
  // looking for.
  if (
    html.length - indexOfNextTag >= prefix.length ||
    prefix.startsWith(html.slice(indexOfNextTag)) === false
  ) {
    return [tags, html, ''];
  }

  return [tags, html.slice(0, indexOfNextTag), html.slice(indexOfNextTag)];
}

type Patterns = readonly [readonly string[], readonly RegExp[]][];

export function extractSelectorsFromRules(filter: HTMLSelector[]): Patterns {
  const patterns: [string[], RegExp[]][] = [];

  for (const [_, selectors] of filter) {
    const plainPatterns: string[] = [];
    const regexpPatterns: RegExp[] = [];

    for (const selector of selectors) {
      if (selector.charCodeAt(0) === 47 /* '/' */) {
        if (selector.endsWith('/')) {
          regexpPatterns.push(new RegExp(selector.slice(1, -1)));
        } else if (selector.endsWith('/i')) {
          regexpPatterns.push(new RegExp(selector.slice(1, -2), 'i'));
        }
      } else {
        plainPatterns.push(selector);
      }
    }

    if (plainPatterns.length !== 0 || regexpPatterns.length !== 0) {
      patterns.push([plainPatterns, regexpPatterns]);
    }
  }

  return patterns;
}

/**
 * Check if `tag` should be removed from HTML based on `plainPatterns` and
 * `regexpPatterns`. For a tag to be removed, all elements from `plainPatterns`
 * and `regexpPatterns` must match.
 */
function tagShouldBeRemoved(
  tag: string,
  plainPatterns: readonly string[],
  regexpPatterns: readonly RegExp[],
): boolean {
  for (const pattern of plainPatterns) {
    if (tag.indexOf(pattern) === -1) {
      return false;
    }
  }

  for (const pattern of regexpPatterns) {
    if (pattern.test(tag) === false) {
      return false;
    }
  }

  return true;
}

export function selectTagsToRemove(
  patterns: Patterns,
  tags: [number, string][],
): [number, string][] {
  const toRemove: [number, string][] = [];

  for (const tag of tags) {
    for (const [plainPatterns, regexpPatterns] of patterns) {
      if (tagShouldBeRemoved(tag[1], plainPatterns, regexpPatterns)) {
        toRemove.push(tag);
        break;
      }
    }
  }

  return toRemove;
}

export function removeTagsFromHtml(html: string, toRemove: [number, string][]): string {
  if (toRemove.length === 0) {
    return html;
  }

  let filteredHtml = html;
  toRemove.reverse(); // make sure to remove from last to first tag (preserve indices)
  for (const [index, tag] of toRemove) {
    filteredHtml = filteredHtml.slice(0, index) + filteredHtml.slice(index + tag.length);
  }

  return filteredHtml;
}

export default class StreamingHtmlFilter {
  private buffer: string;
  private readonly patterns: Patterns;

  constructor(selectors: HTMLSelector[]) {
    this.buffer = '';
    this.patterns = extractSelectorsFromRules(selectors);
  }

  public flush(): string {
    return this.buffer;
  }

  public write(chunk: string): string {
    // If there are no valid selectors, abort.
    if (this.patterns.length === 0) {
      return chunk;
    }

    // If given an empty string, abort.
    if (chunk.length === 0) {
      return chunk;
    }

    // Accumulate buffer + new data
    this.buffer += chunk;

    // Parse tags from `this.buffer`
    const [tags, parsed, rest] = extractTagsFromHtml(this.buffer, 'script');
    this.buffer = rest;

    // If no tags were found, just return the parsed version
    if (tags.length === 0) {
      return parsed;
    }

    // Perform tags filtering using `this.patterns` and `this.regexps`.
    return removeTagsFromHtml(parsed, selectTagsToRemove(this.patterns, tags));
  }
}
