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

import { HTMLSelector } from './filters/cosmetic';

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

export function extractSelectorsFromRules(selectors: HTMLSelector[]): [string[], RegExp[]] {
  const patterns: string[] = [];
  const regexps: RegExp[] = [];

  for (let i = 0; i < selectors.length; i += 1) {
    const selector = selectors[i][1][0];
    if (selector !== undefined) {
      if (selector.charCodeAt(0) === 47 /* '/' */) {
        if (selector.endsWith('/')) {
          regexps.push(new RegExp(selector.slice(1, -1)));
        } else if (selector.endsWith('/i')) {
          regexps.push(new RegExp(selector.slice(1, -2), 'i'));
        }
      } else {
        patterns.push(selector);
      }
    }
  }

  return [patterns, regexps];
}

export function selectTagsToRemove(
  patterns: string[],
  regexps: RegExp[],
  tags: [number, string][],
): [number, string][] {
  const toRemove: [number, string][] = [];

  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i];
    let found = false;
    for (let j = 0; j < patterns.length; j += 1) {
      if (tag[1].indexOf(patterns[j]) !== -1) {
        toRemove.push(tag);
        found = true;
        break;
      }
    }

    if (found === false) {
      for (let j = 0; j < regexps.length; j += 1) {
        if (regexps[j].test(tag[1]) === true) {
          toRemove.push(tag);
          break;
        }
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
  for (let i = 0; i < toRemove.length; i += 1) {
    const [index, tag] = toRemove[i];
    filteredHtml = filteredHtml.slice(0, index) + filteredHtml.slice(index + tag.length);
  }

  return filteredHtml;
}

export default class StreamingHtmlFilter {
  private buffer: string;
  private readonly patterns: string[];
  private readonly regexps: RegExp[];

  constructor(selectors: HTMLSelector[]) {
    this.buffer = '';

    // Prepare patterns
    const extracted = extractSelectorsFromRules(selectors);
    this.patterns = extracted[0];
    this.regexps = extracted[1];
  }

  public flush(): string {
    return this.buffer;
  }

  public write(chunk: string): string {
    // If there are no valid selectors, we can directly write `data`.
    if (this.patterns.length === 0 && this.regexps.length === 0) {
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
    return removeTagsFromHtml(parsed, selectTagsToRemove(this.patterns, this.regexps, tags));
  }
}
