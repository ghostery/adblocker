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
            dependencies: ['b'],
          },
          {
            names: ['b'],
            content: 'function b() {}',
            dependencies: [],
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.getScriptlet('a')).to.be.eql(
        wrapScriptletBody('function a() { b() }', ['function b() {}']),
      );
      expect(resources.getScriptlet('b')).to.be.eql(wrapScriptletBody('function b() {}', []));
    });

    it('parses dependencies without function wrapper', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() {}',
            dependencies: ['b'],
          },
          {
            names: ['b'],
            content: 'function b() {}',
            dependencies: [],
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.getScriptlet('a')).to.be.eql(
        wrapScriptletBody('function a() {}', ['function b() {}']),
      );
      expect(resources.getScriptlet('b')).to.be.eql(wrapScriptletBody('function b() {}', []));
    });

    it('return safe circular dependencies', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() {}',
            dependencies: ['b'],
          },
          {
            names: ['b'],
            content: 'function b() {}',
            dependencies: ['a'],
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.getScriptlet('a')).to.be.eql(
        wrapScriptletBody('function a() {}', ['function b() {}', 'function a() {}']),
      );
      expect(resources.getScriptlet('b')).to.be.eql(
        wrapScriptletBody('function b() {}', ['function a() {}', 'function b() {}']),
      );
    });

    it('detects unlocated dependencies', () => {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            names: ['a'],
            content: 'function a() {}',
            dependencies: ['b'],
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });

      expect(resources.getScriptlet('a')).to.be.eql(
        wrapScriptletBody('function a() {}', [
          `console.warn('@ghostery/adblocker: cannot find dependency: "b" for scriptlet: "a"')`,
        ]),
      );
    });
  });
});
