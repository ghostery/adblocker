/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import StaticDataView from './data-view';

export default class Config {
  public static deserialize(buffer: StaticDataView): Config {
    return new Config({
      debug: buffer.getBool(),
      enableCompression: buffer.getBool(),
      enableMutationObserver: buffer.getBool(),
      enableOptimizations: buffer.getBool(),
      integrityCheck: buffer.getBool(),
      loadCosmeticFilters: buffer.getBool(),
      loadGenericCosmeticsFilters: buffer.getBool(),
      loadNetworkFilters: buffer.getBool(),
    });
  }

  public readonly debug: boolean;
  public readonly enableCompression: boolean;
  public readonly enableMutationObserver: boolean;
  public readonly enableOptimizations: boolean;
  public readonly integrityCheck: boolean;
  public readonly loadCosmeticFilters: boolean;
  public readonly loadGenericCosmeticsFilters: boolean;
  public readonly loadNetworkFilters: boolean;

  constructor({
    debug = false,
    enableCompression = false,
    enableMutationObserver = true,
    enableOptimizations = true,
    integrityCheck = true,
    loadCosmeticFilters = true,
    loadGenericCosmeticsFilters = true,
    loadNetworkFilters = true,
  }: Partial<Config> = {}) {
    this.debug = debug;
    this.enableCompression = enableCompression;
    this.enableMutationObserver = enableMutationObserver;
    this.enableOptimizations = enableOptimizations;
    this.integrityCheck = integrityCheck;
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadGenericCosmeticsFilters = loadGenericCosmeticsFilters;
    this.loadNetworkFilters = loadNetworkFilters;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushBool(this.debug);
    buffer.pushBool(this.enableCompression);
    buffer.pushBool(this.enableMutationObserver);
    buffer.pushBool(this.enableOptimizations);
    buffer.pushBool(this.integrityCheck);
    buffer.pushBool(this.loadCosmeticFilters);
    buffer.pushBool(this.loadGenericCosmeticsFilters);
    buffer.pushBool(this.loadNetworkFilters);
  }
}
