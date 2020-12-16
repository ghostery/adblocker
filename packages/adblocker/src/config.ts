/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { StaticDataView, sizeOfBool } from './data-view';

export default class Config {
  public static deserialize(buffer: StaticDataView): Config {
    return new Config({
      debug: buffer.getBool(),
      enableCompression: buffer.getBool(),
      enableHtmlFiltering: buffer.getBool(),
      enableInMemoryCache: buffer.getBool(),
      enableMutationObserver: buffer.getBool(),
      enableOptimizations: buffer.getBool(),
      guessRequestTypeFromUrl: buffer.getBool(),
      integrityCheck: buffer.getBool(),
      loadCSPFilters: buffer.getBool(),
      loadCosmeticFilters: buffer.getBool(),
      loadExceptionFilters: buffer.getBool(),
      loadGenericCosmeticsFilters: buffer.getBool(),
      loadNetworkFilters: buffer.getBool(),
    });
  }

  public readonly debug: boolean;
  public readonly enableCompression: boolean;
  public readonly enableHtmlFiltering: boolean;
  public readonly enableInMemoryCache: boolean;
  public readonly enableMutationObserver: boolean;
  public readonly enableOptimizations: boolean;
  public readonly guessRequestTypeFromUrl: boolean;
  public readonly integrityCheck: boolean;
  public readonly loadCSPFilters: boolean;
  public readonly loadCosmeticFilters: boolean;
  public readonly loadExceptionFilters: boolean;
  public readonly loadGenericCosmeticsFilters: boolean;
  public readonly loadNetworkFilters: boolean;

  constructor({
    debug = false,
    enableCompression = false,
    enableHtmlFiltering = false,
    enableInMemoryCache = true,
    enableMutationObserver = true,
    enableOptimizations = true,
    guessRequestTypeFromUrl = false,
    integrityCheck = true,
    loadCSPFilters = true,
    loadCosmeticFilters = true,
    loadExceptionFilters = true,
    loadGenericCosmeticsFilters = true,
    loadNetworkFilters = true,
  }: Partial<Config> = {}) {
    this.debug = debug;
    this.enableCompression = enableCompression;
    this.enableHtmlFiltering = enableHtmlFiltering;
    this.enableInMemoryCache = enableInMemoryCache;
    this.enableMutationObserver = enableMutationObserver;
    this.enableOptimizations = enableOptimizations;
    this.guessRequestTypeFromUrl = guessRequestTypeFromUrl;
    this.integrityCheck = integrityCheck;
    this.loadCSPFilters = loadCSPFilters;
    this.loadCosmeticFilters = loadCosmeticFilters;
    this.loadExceptionFilters = loadExceptionFilters;
    this.loadGenericCosmeticsFilters = loadGenericCosmeticsFilters;
    this.loadNetworkFilters = loadNetworkFilters;
  }

  public getSerializedSize(): number {
    // NOTE: this should always be the number of attributes and needs to be
    // updated when `Config` changes.
    return 13 * sizeOfBool();
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushBool(this.debug);
    buffer.pushBool(this.enableCompression);
    buffer.pushBool(this.enableHtmlFiltering);
    buffer.pushBool(this.enableInMemoryCache);
    buffer.pushBool(this.enableMutationObserver);
    buffer.pushBool(this.enableOptimizations);
    buffer.pushBool(this.guessRequestTypeFromUrl);
    buffer.pushBool(this.integrityCheck);
    buffer.pushBool(this.loadCSPFilters);
    buffer.pushBool(this.loadCosmeticFilters);
    buffer.pushBool(this.loadExceptionFilters);
    buffer.pushBool(this.loadGenericCosmeticsFilters);
    buffer.pushBool(this.loadNetworkFilters);
  }
}
