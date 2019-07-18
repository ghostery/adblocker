/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as puppeteer from 'puppeteer';
import Engine from '../engine/engine';
/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
export default class PuppeteerBlocker extends Engine {
    enableBlockingInPage(page: puppeteer.Page): Promise<void>;
    private onFrame;
    private onRequest;
}
