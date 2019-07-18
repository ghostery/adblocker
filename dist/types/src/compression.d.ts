/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export declare const deflateCosmeticString: (str: string) => Uint8Array;
export declare const inflateCosmeticString: (arr: Uint8Array) => string;
export declare const deflateNetworkCSPString: (str: string) => Uint8Array;
export declare const inflateNetworkCSPString: (arr: Uint8Array) => string;
export declare const deflateNetworkRedirectString: (str: string) => Uint8Array;
export declare const inflateNetworkRedirectString: (arr: Uint8Array) => string;
export declare const deflateNetworkHostnameString: (str: string) => Uint8Array;
export declare const inflateNetworkHostnameString: (arr: Uint8Array) => string;
export declare const deflateNetworkFilterString: (str: string) => Uint8Array;
export declare const inflateNetworkFilterString: (arr: Uint8Array) => string;
