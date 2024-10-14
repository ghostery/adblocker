/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';

import { loadResources } from './utils.js';

import { StaticDataView } from '../src/data-view.js';
import Resources, { ResourcesDistribution } from '../src/resources.js';

describe('#Resources', function () {
  it('#serialize', function () {
    const resources = Resources.parse(loadResources(), { checksum: 'checksum' });
    expect(resources.checksum).to.equal('checksum');
    const buffer = StaticDataView.allocate(2000000, { enableCompression: false });
    resources.serialize(buffer);
    buffer.seekZero();
    expect(Resources.deserialize(buffer)).to.eql(resources);
  });

  context('#parse', function () {
    it('parses dependencies', function () {
      const distribution: ResourcesDistribution = {
        redirects: [
          {
            name: 'x',
            aliases: [],
            body: '',
            contentType: '',
          },
        ],
        scriptlets: [
          {
            name: 'a',
            aliases: [],
            body: 'function a() { b() }',
            dependencies: ['b'],
          },
          {
            name: 'b',
            aliases: [],
            body: 'function b() {}',
            dependencies: [],
          },
        ],
      };
      const resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });
      expect(resources.resources).to.lengthOf(1);
      expect(resources.scriptlets).to.lengthOf(2);
    });
  });

  context('#updateAliases', function () {
    it('is called by the constructor', function () {
      const stub = sinon.stub(Resources.prototype, 'updateAliases');
      try {
        new Resources();
        sinon.assert.calledOnce(stub);
      } finally {
        stub.restore();
      }
    });

    it('throws error on duplicates', function () {
      expect(
        () =>
          new Resources({
            resources: [
              {
                name: 'test',
                aliases: [],
                body: '',
                contentType: '',
              },
              {
                name: 'test',
                aliases: [],
                body: '',
                contentType: '',
              },
            ],
          }),
      ).to.throw('Resource with a name or alias "test" already exists');

      expect(
        () =>
          new Resources({
            scriptlets: [
              {
                name: 'test',
                aliases: [],
                body: '',
                dependencies: [],
                executionWorld: 'ISOLATED',
                requiresTrust: false,
              },
              {
                name: 'test',
                aliases: [],
                body: '',
                dependencies: [],
                executionWorld: 'ISOLATED',
                requiresTrust: false,
              },
            ],
          }),
      ).to.throw('Scriptlet with a name or alias "test" already exists');
    });

    it('throws error missing dependencies', function () {
      expect(
        () =>
          new Resources({
            scriptlets: [
              {
                name: 'test',
                aliases: [],
                body: '',
                dependencies: ['dependency.fn'],
                executionWorld: 'ISOLATED',
                requiresTrust: false,
              },
            ],
          }),
      ).to.throw('Scriptlet with a name or alias "test" has a missing depencency "dependency.fn"');
    });

    it('ignores dependency order', function () {
      expect(
        () =>
          new Resources({
            scriptlets: [
              {
                name: 'test',
                aliases: [],
                body: '',
                dependencies: ['dependency.fn'],
                executionWorld: 'ISOLATED',
                requiresTrust: false,
              },
              {
                name: 'dependency.fn',
                aliases: [],
                body: '',
                dependencies: [],
                executionWorld: 'ISOLATED',
                requiresTrust: false,
              },
            ],
          }),
      ).to.not.throw(
        'Scriptlet with a name or alias "test" has a missing depencency "dependency.fn"',
      );
    });
  });

  context('#getScriptlet', function () {
    let resources: Resources;

    before(function () {
      const distribution: ResourcesDistribution = {
        redirects: [],
        scriptlets: [
          {
            name: 'b',
            aliases: [],
            body: 'function b() {}',
            dependencies: [],
          },
          {
            name: 'c',
            aliases: [],
            body: 'function c() {}',
            dependencies: ['b'],
          },
          {
            name: 'a',
            aliases: ['alias'],
            body: 'function a() {}',
            dependencies: ['b', 'b', 'c', 'missing'],
          },
          {
            name: 'd',
            aliases: [],
            body: 'function d() {}',
            dependencies: [],
          },
          {
            name: 'e.fn',
            aliases: [],
            body: 'function e() {}',
            dependencies: [],
          },
        ],
      };
      resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });
    });

    it('does not return scriptlets with .fn extension', function () {
      expect(resources.getScriptlet('e.fn')).to.equal(undefined);
    });

    it('supports .js extension', function () {
      expect(resources.getScriptlet('d')).to.exist;
      expect(resources.getScriptlet('d.js')).to.equal(resources.getScriptlet('d'));
    });

    it('includes scriptlet body', function () {
      const scriptlet = resources.scriptlets.find(
        (r) => r.name === 'a' || r.aliases.includes('a'),
      )!;
      expect(resources.getScriptlet('a')).to.include(scriptlet.body);
    });

    it('includes dependencies', function () {
      const dependency = resources.scriptlets.find(
        (r) => r.name === 'b' || r.aliases.includes('b'),
      )!;
      expect(resources.getScriptlet('a')).to.include(dependency.body);
    });

    it('handles aliases', function () {
      expect(resources.getScriptlet('a')).to.equal(resources.getScriptlet('alias'));
    });

    it('ignore duplicated dependencies', function () {
      const dependency = resources.scriptlets.find(
        (r) => r.name === 'b' || r.aliases.includes('b'),
      )!;
      // if a string is present in other string exactly once then it splits that other string into two parts
      expect(resources.getScriptlet('a')?.split(dependency.body)).to.have.lengthOf(2);
    });

    it('prepares scriptlet for argument injection', function () {
      expect(resources.getScriptlet('a')).to.include('{{1}}');
    });

    it('includes setup for scritplet globals', function () {
      expect(resources.getScriptlet('a')).to.include('var scriptletGlobals = {};');
    });
  });

  context('#getResource', function () {
    let resources: Resources;

    before(function () {
      const distribution: ResourcesDistribution = {
        redirects: [
          {
            name: 'a',
            aliases: ['alias'],
            contentType: 'text/plain',
            body: '',
          },
          {
            name: 'b',
            aliases: [],
            contentType: 'text/plain',
            body: '',
          },
        ],
        scriptlets: [],
      };
      resources = Resources.parse(JSON.stringify(distribution), { checksum: '' });
    });

    it('handles encoding', function () {
      expect(resources.getResource('a')).to.have.property('contentType').that.include('base64');
      expect(resources.getResource('b'))
        .to.have.property('contentType')
        .that.not.include('base64');
    });

    it('handles aliases', function () {
      expect(resources.getResource('a')).to.deep.equal(resources.getResource('alias'));
    });

    it('provides stubs for mime types', function () {
      const contentType = 'application/json';
      expect(resources.getResource(contentType))
        .to.have.property('contentType')
        .that.equals(contentType);
    });
  });
});
