/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { allLists, loadResources, typedArrayEqual } from './utils.js';

import Config from '../src/config.js';
import { StaticDataView } from '../src/data-view.js';
import Engine from '../src/engine/engine.js';
import CosmeticFilter from '../src/filters/cosmetic.js';
import IFilter from '../src/filters/interface.js';
import NetworkFilter from '../src/filters/network.js';
import { parseFilters } from '../src/lists.js';

describe('Serialization', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(allLists, new Config({ debug: true }));

  describe('Config', () => {
    it('serializes with exact size', () => {
      const config = new Config();
      const buffer = StaticDataView.allocate(config.getSerializedSize(), config);
      config.serialize(buffer);

      // Check size
      expect(buffer.slice()).to.have.lengthOf(config.getSerializedSize());

      // Check deserialization
      buffer.seekZero();
      expect(Config.deserialize(buffer)).to.eql(config);
    });
  });

  describe('filters', () => {
    const buffer = StaticDataView.allocate(1000000, { enableCompression: false });
    const checkFilterSerialization = (
      Filter: { deserialize(buffer: StaticDataView): IFilter },
      filter: IFilter,
    ) => {
      // Keep track of original ID to make sure it's preserved after lazy
      // attributes are set and filter is serialized/deserialized.
      const originalId = filter.getId();

      // Serialize filter
      buffer.seekZero();
      filter.serialize(buffer);

      // Reload filter
      buffer.seekZero();
      const deserialized = Filter.deserialize(buffer);

      expect(deserialized).to.have.property('id').that.equals(undefined);
      expect(deserialized.getId()).to.equal(originalId);
      expect(deserialized).to.eql(filter);
    };

    it('cosmetic', () => {
      for (let i = 0; i < cosmeticFilters.length; i += 1) {
        checkFilterSerialization(CosmeticFilter, cosmeticFilters[i]);
      }
    });

    it('network', () => {
      for (let i = 0; i < networkFilters.length; i += 1) {
        checkFilterSerialization(NetworkFilter, networkFilters[i]);
      }
    });

    it('handles a filter mask with 32nd bit', () => {
      checkFilterSerialization(
        NetworkFilter,
        new NetworkFilter({
          filter: undefined,
          hostname: undefined,
          mask: 1 << 31,
          domains: undefined,
          denyallow: undefined,
          optionValue: undefined,
          rawLine: undefined,
          regex: undefined,
        }),
      );
    });
  });

  describe('Engine', () => {
    it('fails with wrong version', () => {
      const engine = Engine.parse('||domain');
      const serialized = engine.serialize();
      const version = serialized[0];
      serialized[0] = (serialized[0] + 1) % 256; // override version
      expect(() => {
        Engine.deserialize(serialized);
      }).to.throw();
      serialized[0] = version;
      expect(Engine.deserialize(serialized)).to.eql(engine);
    });

    it('check integrity', () => {
      const engine = Engine.parse('||domain', { integrityCheck: true });
      const serialized = engine.serialize();
      for (let i = 0; i < serialized.length; i += 1) {
        const value = serialized[i];
        let randomValue = value;
        while (randomValue === value) {
          randomValue = Math.floor(Math.random() * 255);
        }
        serialized[i] = randomValue;

        // Expect engine to throw
        expect(() => {
          Engine.deserialize(serialized);
        }).to.throw();

        serialized[i] = value;
      }

      expect(Engine.deserialize(serialized)).to.eql(engine);
    });

    it('disable integrity check', () => {
      const engine = Engine.parse('||domain', { integrityCheck: true });
      const serialized = engine.serialize();

      const end = serialized.length - 1;
      const value = serialized[end];
      serialized[end] += 1;

      expect(() => {
        Engine.deserialize(serialized);
      }).to.throw();

      serialized[end] = value;
      expect(Engine.deserialize(serialized)).to.eql(engine);
    });

    it('handles full engine', () => {
      const engine = new Engine();
      engine.updateResources(loadResources(), 'resources1');
      engine.lists.set('list1', 'checksum');
      engine.update({
        newCosmeticFilters: cosmeticFilters,
        newNetworkFilters: networkFilters,
      });

      const baseSerialized = engine.serialize();

      let deserialized = Engine.deserialize(baseSerialized);
      expect(deserialized).to.eql(engine);

      let serialized = deserialized.serialize();
      expect(typedArrayEqual(serialized, baseSerialized)).to.be.true;

      // Perform several deserializations in a row. Testing this is needed to
      // make sure the low-level typed array manipulation do not corrupt the
      // data.
      for (let i = 0; i < 3; i += 1) {
        deserialized = Engine.deserialize(serialized);
        serialized = deserialized.serialize();
        expect(typedArrayEqual(serialized, baseSerialized)).to.be.true;
      }
    });
  });
});
