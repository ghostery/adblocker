/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { loadAllLists, loadResources, typedArrayEqual } from './utils';

import Config from '../src/config';
import StaticDataView from '../src/data-view';
import Engine from '../src/engine/engine';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';

describe('Serialization', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(
    loadAllLists(),
    new Config({ debug: true }),
  );

  describe('Config', () => {
    it('serializes with exact size', () => {
      const config = new Config();
      const buffer = StaticDataView.allocate(config.getSerializedSize(), config);
      config.serialize(buffer);

      // Check size
      expect(buffer.slice()).toHaveLength(config.getSerializedSize());

      // Check deserialization
      buffer.seekZero();
      expect(Config.deserialize(buffer)).toEqual(config);
    });
  });

  describe('filters', () => {
    const buffer = StaticDataView.allocate(1000000, { enableCompression: false });
    const checkFilterSerialization = (Filter: any, filter: IFilter) => {
      // Keep track of original ID to make sure it's preserved after lazy
      // attributes are set and filter is serialized/deserialized.
      const originalId = filter.getId();

      // Serialize filter
      buffer.seekZero();
      filter.serialize(buffer);
      buffer.seekZero();

      // Reload filter
      const deserialized = Filter.deserialize(buffer);
      expect(deserialized.id).toBeUndefined();
      expect(deserialized.getId()).toBe(originalId);
      expect(deserialized).toEqual(filter);
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
  });

  describe('Engine', () => {
    it('fails with wrong version', () => {
      const engine = Engine.parse('||domain');
      const serialized = engine.serialize();
      const version = serialized[0];
      serialized[0] = 1; // override version
      expect(() => {
        Engine.deserialize(serialized);
      }).toThrow();
      serialized[0] = version;
      expect(Engine.deserialize(serialized)).toEqual(engine);
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
        }).toThrow();

        serialized[i] = value;
      }

      expect(Engine.deserialize(serialized)).toEqual(engine);
    });

    it('disable integrity check', () => {
      const engine = Engine.parse('||domain', { integrityCheck: true });
      const serialized = engine.serialize();

      const end = serialized.length - 1;
      const value = serialized[end];
      serialized[end] = 0;

      expect(() => {
        Engine.deserialize(serialized);
      }).toThrow();

      serialized[end] = value;
      expect(Engine.deserialize(serialized)).toEqual(engine);
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
      expect(deserialized).toEqual(engine);

      let serialized = deserialized.serialize();
      expect(typedArrayEqual(serialized, baseSerialized)).toBe(true);

      // Perform several deserializations in a row. Testing this is needed to
      // make sure the low-level typed array manipulation do not corrupt the
      // data.
      for (let i = 0; i < 3; i += 1) {
        deserialized = Engine.deserialize(serialized);
        serialized = deserialized.serialize();
        expect(typedArrayEqual(serialized, baseSerialized)).toBe(true);
      }
    });
  });
});
