/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { AttributeProvider, List } from '../src/engine/metadata/attributes.js';

function createList(entries: Array<[number, number]>): List {
  return new Map(entries);
}

describe('AttributeProvider', () => {
  it('adds filters and groups locations by list name', () => {
    const attributes = new AttributeProvider({});

    attributes.addFilter('ads', 1, 10);
    attributes.addFilter('trackers', 1, 20);

    expect(attributes.getAttribute(1)).to.eql({
      locations: [
        { name: 'ads', lineNumber: 10 },
        { name: 'trackers', lineNumber: 20 },
      ],
    });
  });

  it('updates an existing location when adding same filter twice', () => {
    const attributes = new AttributeProvider({});

    attributes.addFilter('ads', 1, 10);
    attributes.addFilter('ads', 1, 30);

    expect(attributes.getAttribute(1)).to.eql({
      locations: [{ name: 'ads', lineNumber: 30 }],
    });
  });

  it('removes only the requested list from a shared filter', () => {
    const attributes = new AttributeProvider({});

    attributes.addFilter('ads', 1, 10);
    attributes.addFilter('trackers', 1, 20);

    attributes.removeFilter('ads', 1);

    expect(attributes.getAttribute(1)).to.eql({
      locations: [{ name: 'trackers', lineNumber: 20 }],
    });
  });

  it('removes the reverse entry when last location is removed', () => {
    const attributes = new AttributeProvider({});

    attributes.addFilter('ads', 1, 10);
    attributes.removeFilter('ads', 1);

    expect(attributes.reverseIndex.has(1)).to.be.false;
    expect(attributes.getAttribute(1)).to.eql({ locations: [] });
  });

  it('overwrites a list and drops stale locations', () => {
    const attributes = new AttributeProvider({});

    attributes.addList(
      'ads',
      createList([
        [1, 10],
        [2, 20],
      ]),
    );
    attributes.addFilter('trackers', 2, 30);

    attributes.addList(
      'ads',
      createList([
        [2, 40],
        [3, 50],
      ]),
    );

    expect(attributes.lists.get('ads')).to.eql(
      createList([
        [2, 40],
        [3, 50],
      ]),
    );
    expect(attributes.getAttribute(1)).to.eql({ locations: [] });
    expect(attributes.getAttribute(2)).to.eql({
      locations: [
        { name: 'ads', lineNumber: 40 },
        { name: 'trackers', lineNumber: 30 },
      ],
    });
    expect(attributes.getAttribute(3)).to.eql({
      locations: [{ name: 'ads', lineNumber: 50 }],
    });
  });

  it('removes one list without touching the others', () => {
    const attributes = new AttributeProvider({});

    attributes.addList(
      'ads',
      createList([
        [1, 10],
        [2, 20],
      ]),
    );
    attributes.addList(
      'trackers',
      createList([
        [2, 30],
        [3, 40],
      ]),
    );

    attributes.removeList('ads');

    expect(attributes.lists.has('ads')).to.be.false;
    expect(attributes.getAttribute(1)).to.eql({ locations: [] });
    expect(attributes.getAttribute(2)).to.eql({
      locations: [{ name: 'trackers', lineNumber: 30 }],
    });
    expect(attributes.getAttribute(3)).to.eql({
      locations: [{ name: 'trackers', lineNumber: 40 }],
    });
  });
});
