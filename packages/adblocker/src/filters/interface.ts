/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { StaticDataView } from '../data-view';
import { IPreprocessor } from '../preprocessor';

export default interface IFilter {
  mask: number;
  preprocessor: IPreprocessor | undefined;
  getId: () => number;
  getTokens: () => Uint32Array[];
  serialize: (buffer: StaticDataView) => void;
  getSerializedSize(compression: boolean): number;
}
