/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { loadResources } from './utils.js';

import { StaticDataView } from '../src/data-view.js';
import Resources, { ResourcesDistribution, wrapScriptletBody } from '../src/resources.js';

describe('#Resources', () => {
  it('parses empty resources', () => {
    const resources = Resources.parse('', { checksum: 'checksum' });
    expect(resources.checksum).to.equal('checksum');
    expect(resources.scriptletCaches).to.eql(new Map());
    expect(resources.resources).to.eql(new Map());
  });

  it('#serialize', () => {
    const resources = Resources.parse(loadResources(), { checksum: 'checksum' });
    expect(resources.checksum).to.equal('checksum');
    const buffer = StaticDataView.allocate(2000000, { enableCompression: false });
    resources.serialize(buffer);
    buffer.seekZero();
    expect(Resources.deserialize(buffer)).to.eql(resources);
  });

  context('#parse', () => {
    it('parses dependencies', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() { b() }',
            fnName: 'a',
            dependencies: ['b'],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
          {
            names: ['b'],
            content: 'function b() {}',
            fnName: 'b',
            dependencies: [],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.scriptletCaches.get('a')).to.be.eql(
        wrapScriptletBody(`function a() { b() }
function b() {}
a`),
      );
      expect(resources.scriptletCaches.get('b')).to.be.eql(
        wrapScriptletBody(`function b() {}
b`),
      );
    });

    it('parses dependencies without function wrapper', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() {}',
            fnName: 'a',
            dependencies: ['b'],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
          {
            names: ['b'],
            content: 'function b() {}',
            fnName: 'b',
            dependencies: [],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.scriptletCaches.get('a')).to.be.eql(
        wrapScriptletBody(`function a() {}
function b() {}
a`),
      );
      expect(resources.scriptletCaches.get('b')).to.be.eql(
        wrapScriptletBody(`function b() {}
b`),
      );
    });

    it('return safe circular dependencies', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() {}',
            fnName: 'a',
            dependencies: ['b'],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
          {
            names: ['b'],
            content: 'function b() {}',
            fnName: 'b',
            dependencies: ['a'],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.scriptletCaches.get('a')).to.be.eql(
        wrapScriptletBody(`function a() {}
function b() {}
a`),
      );
      expect(resources.scriptletCaches.get('b')).to.be.eql(
        wrapScriptletBody(`function b() {}
function a() {}
b`),
      );
    });

    it('detects unlocated dependencies', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() {}',
            fnName: 'a',
            dependencies: ['b'],
            executionWorld: 'MAIN',
            requiresTrust: false,
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.scriptletCaches.get('a')).to.be.eql(
        wrapScriptletBody(`function a() {}
a`),
      );
    });
  });
});
