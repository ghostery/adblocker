/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { getRawTrackerDB } from '../utils';
import Request from '../../src/request';

import Engine from '../../src/engine/engine';
import { fastHash } from '../../src/utils';
import { StaticDataView } from '../../src/data-view';
import { Metadata } from '../../src/engine/metadata';
import {
  ITracker,
  createMap as createTrackersMap,
  deserialize as deserializeTracker,
  getKeys as getTrackerKeys,
  getSerializedSize as getTrackerSerializedSize,
  isValid as isValidTracker,
  serialize as serializeTracker,
} from '../../src/engine/metadata/trackers';

import {
  ICategory,
  createMap as createCategoriesMap,
  deserialize as deserializeCategory,
  getKey as getCategoryKey,
  getSerializedSize as getCategorySerializedSize,
  isValid as isValidCategory,
  serialize as serializeCategory,
} from '../../src/engine/metadata/categories';

import {
  IOrganization,
  createMap as createOrganizationsMap,
  deserialize as deserializeOrganization,
  getKey as getOrganizationKey,
  getSerializedSize as getOrganizationSerializedSize,
  isValid as isValidOrganization,
  serialize as serializeOrganization,
} from '../../src/engine/metadata/organizations';

import { CompactMap } from '../../src/engine/map';
import NetworkFilter from '../../src/filters/network';

const ZYPMEDIA: ITracker = {
  key: 'zypmedia',
  name: 'ZypMedia',
  category: 'advertising',
  organization: 'zypmedia',
  alias: null,
  website_url: 'http://www.zypmedia.com/',
  ghostery_id: '2742',
  domains: ['extend.tv'],
  filters: ['||sync.extend.tv^'],
};

const ZYPMEDIA_ORGANIZATION: IOrganization = {
  key: 'zypmedia',
  name: 'Zypmedia',
  description:
    'ZypLink connects local media companies, advertising agencies and advertisers with the widest array of premium video and display impressions across desktop, mobile and connected TVs. ZypLink applies advanced geographic, demographic, contextual, behavioral and other targeting utilizing the best 3rd party data sources, proprietary 1st party data collected and segmented by ZypMedia, and 1st data supplied by advertisers (when available).',
  website_url: 'http://www.zypmedia.com/',
  country: null,
  privacy_policy_url: 'http://www.zypmedia.com/privacy-policy',
  privacy_contact: 'privacy@zypmedia.com',
  ghostery_id: '4668',
};

const ADVERTISING_CATEGORY: ICategory = {
  key: 'advertising',
  name: 'Advertising',
  color: '#cb55cd',
  description:
    'Includes advertising services such as data collection, behavioral analysis or retargeting.',
};

function sortTrackers(trackers: ITracker[]): ITracker[] {
  return trackers.sort(
    (tracker1: ITracker, tracker2: ITracker): number =>
      fastHash(tracker1.name) - fastHash(tracker2.name),
  );
}

function sortCategories(categories: ICategory[]): ICategory[] {
  return categories.sort(
    (category1: ICategory, category2: ICategory): number =>
      fastHash(category1.name) - fastHash(category2.name),
  );
}

function sortOrganizations(organizations: IOrganization[]): IOrganization[] {
  return organizations.sort(
    (organization1: IOrganization, organization2: IOrganization): number =>
      fastHash(organization1.name) - fastHash(organization2.name),
  );
}

describe('#ITracker', () => {
  const view: StaticDataView = StaticDataView.allocate(100000, { enableCompression: false });

  it('serialization', () => {
    for (const [name, tracker] of Object.entries(getRawTrackerDB().patterns)) {
      expect(isValidTracker(tracker), name).to.be.true;
      if (isValidTracker(tracker)) {
        view.setPos(0);
        serializeTracker(tracker, view);
        expect(view.getPos(), name).to.eql(getTrackerSerializedSize(tracker));
        view.setPos(0);
        expect(deserializeTracker(view), name).to.eql(tracker);
      }
    }
  });

  it('stored in CompactMap', () => {
    const inputTrackers = Object.values(getRawTrackerDB().patterns) as ITracker[];

    const map = createTrackersMap(inputTrackers);

    // Make sure we can serialize and deserialize `map`
    const mapView = StaticDataView.allocate(1000000, { enableCompression: false });
    map.serialize(mapView);
    expect(mapView.getPos()).to.eql(map.getSerializedSize());
    mapView.setPos(0);
    const deserializedMap = CompactMap.deserialize(mapView, deserializeTracker);
    expect(deserializedMap).to.eql(map);

    // Make sure we get the original values back
    const trackers = map.getValues();

    sortTrackers(inputTrackers);
    sortTrackers(trackers);

    expect(trackers).to.eql(inputTrackers);

    for (const tracker of inputTrackers) {
      const keys = getTrackerKeys(tracker);
      for (const key of keys) {
        expect(map.get(key)).to.deep.include(tracker);
      }
    }
  });
});

describe('#ICategory', () => {
  const view: StaticDataView = StaticDataView.allocate(100000, { enableCompression: false });

  it('serialization', () => {
    for (const [name, category] of Object.entries(getRawTrackerDB().categories)) {
      expect(isValidCategory(category), name).to.be.true;
      if (isValidCategory(category)) {
        view.setPos(0);
        serializeCategory(category, view);
        expect(view.getPos(), name).to.eql(getCategorySerializedSize(category));
        view.setPos(0);
        expect(deserializeCategory(view), name).to.eql(category);
      }
    }
  });

  it('stored in CompactMap', () => {
    const inputCategories = Object.values(getRawTrackerDB().categories) as ICategory[];

    const map = createCategoriesMap(inputCategories);

    // Make sure we can serialize and deserialize `map`
    const mapView = StaticDataView.allocate(1000000, { enableCompression: false });
    map.serialize(mapView);
    expect(mapView.getPos()).to.eql(map.getSerializedSize());
    mapView.setPos(0);
    const deserializedMap = CompactMap.deserialize(mapView, deserializeCategory);
    expect(deserializedMap).to.eql(map);

    // Make sure we get the original values back
    const categories = map.getValues();

    sortCategories(inputCategories);
    sortCategories(categories);

    expect(categories).to.eql(inputCategories);

    for (const category of inputCategories) {
      expect(map.get(getCategoryKey(category))).to.deep.include(category);
    }
  });
});

describe('#IOrganization', () => {
  const view: StaticDataView = StaticDataView.allocate(100000, { enableCompression: false });

  it('serialization', () => {
    for (const [name, organization] of Object.entries(getRawTrackerDB().organizations)) {
      expect(isValidOrganization(organization), name).to.be.true;
      if (isValidOrganization(organization)) {
        view.setPos(0);
        serializeOrganization(organization, view);
        expect(view.getPos(), name).to.eql(getOrganizationSerializedSize(organization));
        view.setPos(0);
        expect(deserializeOrganization(view), name).to.eql(organization);
      }
    }
  });

  it('stored in CompactMap', () => {
    const inputOrganization = Object.values(getRawTrackerDB().organizations) as IOrganization[];

    const map = createOrganizationsMap(inputOrganization);

    // Make sure we can serialize and deserialize `map`
    const mapView = StaticDataView.allocate(1000000, { enableCompression: false });
    map.serialize(mapView);
    expect(mapView.getPos()).to.eql(map.getSerializedSize());
    mapView.setPos(0);
    const deserializedMap = CompactMap.deserialize(mapView, deserializeOrganization);
    expect(deserializedMap).to.eql(map);

    // Make sure we get the original values back
    const organizations = map.getValues();

    sortOrganizations(inputOrganization);
    sortOrganizations(organizations);

    expect(organizations).to.eql(inputOrganization);

    for (const organization of inputOrganization) {
      expect(map.get(getOrganizationKey(organization))).to.deep.include(organization);
    }
  });
});

describe('#Metadata', () => {
  describe('#fromDomain', () => {
    const metadata = new Metadata({
      patterns: {
        zypmedia: ZYPMEDIA,
      },
      organizations: {
        zypmedia: ZYPMEDIA_ORGANIZATION,
      },
      categories: {
        advertising: ADVERTISING_CATEGORY,
      },
    });

    it('retrieves existing metadata', () => {
      expect(metadata.fromDomain('extend.tv')).to.eql([
        {
          tracker: ZYPMEDIA,
          organization: ZYPMEDIA_ORGANIZATION,
          category: ADVERTISING_CATEGORY,
        },
      ]);
    });

    it('returns undefined otherwise', () => {
      expect(metadata.fromDomain('foo.com')).to.eql([]);
    });

    it('handles empty string', () => {
      expect(metadata.fromDomain('')).to.eql([]);
    });

    it('handles invalid input', () => {
      expect(metadata.fromDomain('$foo')).to.eql([]);
    });
  });

  describe('#fromFilter', () => {
    const metadata = new Metadata({
      patterns: {
        zypmedia: ZYPMEDIA,
      },
      organizations: {
        zypmedia: ZYPMEDIA_ORGANIZATION,
      },
      categories: {
        advertising: ADVERTISING_CATEGORY,
      },
    });

    it('retrieves existing metadata', () => {
      expect(
        metadata.fromFilter(NetworkFilter.parse('||sync.extend.tv^') as NetworkFilter),
      ).to.eql([
        {
          tracker: ZYPMEDIA,
          organization: ZYPMEDIA_ORGANIZATION,
          category: ADVERTISING_CATEGORY,
        },
      ]);
    });

    it('returns undefined otherwise', () => {
      expect(metadata.fromFilter(NetworkFilter.parse('||foo.com^') as NetworkFilter)).to.eql([]);
    });
  });

  describe('#fromId', () => {
    const metadata = new Metadata({
      patterns: {
        zypmedia: ZYPMEDIA,
      },
      organizations: {
        zypmedia: ZYPMEDIA_ORGANIZATION,
      },
      categories: {
        advertising: ADVERTISING_CATEGORY,
      },
    });

    it('retrieves existing metadata', () => {
      expect(metadata.fromId(NetworkFilter.parse('||sync.extend.tv^')?.getId() || 0)).to.eql([
        {
          tracker: ZYPMEDIA,
          organization: ZYPMEDIA_ORGANIZATION,
          category: ADVERTISING_CATEGORY,
        },
      ]);
    });

    it('returns undefined otherwise', () => {
      expect(metadata.fromId(NetworkFilter.parse('||foo.com^')?.getId() || 0)).to.eql([]);
    });
  });

  describe('integration with FiltersEngine', () => {
    it('loads trackerdb dump', () => {
      const rawTrackerDB = getRawTrackerDB();
      const engine = Engine.fromTrackerDB(rawTrackerDB);
      const trackers: ITracker[] = Object.values(rawTrackerDB.patterns);
      const categories: ICategory[] = Object.values(rawTrackerDB.categories);
      const organizations: IOrganization[] = Object.values(rawTrackerDB.organizations);

      // Make sure we can serialize and load the engine with metadata
      const serialized = engine.serialize();
      // expect(metadata.getSerializedSize()).to.eql(view.getPos());
      const deserialized = Engine.deserialize(serialized);
      expect(deserialized).to.eql(engine);

      // Make sure values stored can be retrieved
      expect(deserialized.metadata).to.not.be.undefined;
      if (deserialized.metadata !== undefined) {
        expect(sortTrackers(deserialized.metadata.getTrackers())).to.eql(sortTrackers(trackers));
        expect(sortCategories(deserialized.metadata.getCategories())).to.eql(
          sortCategories(categories),
        );
        expect(sortOrganizations(deserialized.metadata.getOrganizations())).to.eql(
          sortOrganizations(organizations),
        );
      }

      // domains: ['extend.tv'],
      const filter = NetworkFilter.parse('||extend.tv^');
      filter?.getId();
      expect(
        engine.match(
          Request.fromRawDetails({ url: 'https://extend.tv/' }),
          true /* withMetadata */,
        ),
      ).to.eql({
        exception: undefined,
        filter,
        match: true,
        metadata: [
          {
            'category': ADVERTISING_CATEGORY,
            'organization': ZYPMEDIA_ORGANIZATION,
            'tracker': ZYPMEDIA,
          },
        ],
        redirect: undefined,
      });

      expect(
        engine.getTrackerMetadata(Request.fromRawDetails({ url: 'https://extend.tv/' })),
      ).to.eql([
        {
          'category': ADVERTISING_CATEGORY,
          'organization': ZYPMEDIA_ORGANIZATION,
          'tracker': ZYPMEDIA,
        },
      ]);
    });
  });

  describe('e2e', () => {
    it('loads trackerdb dump', () => {
      const rawTrackerDB = getRawTrackerDB();
      const trackers: ITracker[] = Object.values(rawTrackerDB.patterns);
      const categories: ICategory[] = Object.values(rawTrackerDB.categories);
      const organizations: IOrganization[] = Object.values(rawTrackerDB.organizations);

      const metadata = new Metadata(rawTrackerDB);

      // Make sure we can serialize and load the metadata
      const view = StaticDataView.allocate(2000000, { enableCompression: false });
      metadata.serialize(view);
      // expect(metadata.getSerializedSize()).to.eql(view.getPos());
      view.setPos(0);
      const deserializedMetadata = Metadata.deserialize(view);
      expect(deserializedMetadata).to.eql(metadata);

      // Make sure values stored can be retrieved
      expect(sortTrackers(deserializedMetadata.getTrackers())).to.eql(sortTrackers(trackers));
      expect(sortCategories(deserializedMetadata.getCategories())).to.eql(
        sortCategories(categories),
      );
      expect(sortOrganizations(deserializedMetadata.getOrganizations())).to.eql(
        sortOrganizations(organizations),
      );

      for (const tracker of trackers) {
        const organization: IOrganization | null = tracker.organization
          ? rawTrackerDB.organizations[tracker.organization]
          : null;
        const category: ICategory = rawTrackerDB.categories[tracker.category];

        for (const domain of tracker.domains) {
          expect(metadata.fromDomain(domain), domain).to.deep.include({
            tracker,
            organization,
            category,
          });
        }

        for (const filter of tracker.filters) {
          const parsedFilter = NetworkFilter.parse(filter);
          if (parsedFilter !== null) {
            expect(metadata.fromFilter(parsedFilter)).to.deep.include({
              tracker,
              organization,
              category,
            });
          }
        }
      }
    });
  });
});
