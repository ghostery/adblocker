/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { StaticDataView } from '../src/data-view';
import { getNaughtyStrings } from './utils';

describe('#StaticDataView', () => {
  describe('#slice', () => {
    it('returns empty buffer if no data and empty initial size', () => {
      const view = StaticDataView.empty({ enableCompression: false });
      expect(view.slice()).to.have.lengthOf(0);
    });

    it('returns empty buffer if no data', () => {
      const view = StaticDataView.allocate(10, { enableCompression: false });
      expect(view.slice()).to.have.lengthOf(0);
    });
  });

  describe('#pushASCII', () => {
    const view = StaticDataView.allocate(1000, { enableCompression: false });
    const checkString = (str: string): void => {
      view.seekZero();
      view.pushASCII(str);
      view.seekZero();
      expect(view.getASCII()).to.equal(str);
    };

    it('empty string', () => {
      checkString('');
    });

    [
      'expogrim.com',
      '/reklam/',
      '/playplugins/*/ga/ga.min.js',
      '.ad-text-blockA01',
      'ad.pandora.tv',
      '#header_ad_167',
      'a > img[src][style]',
      'stat.youku.com',
      'addEventListener-defuser.js, load, 2000',
      'table[width="952"][height="115"]',
      '#sb_left_tower',
      '#header_bottom',
      '.SimpleAcceptableTextAds',
      '.ads-right',
      '.bottom-slider-ads',
      'cnt.spbland.ru',
      'tracking.base.de',
      '.RGAdBoxMainDiv',
      'thumbnail-galleries.net',
      '/ad_campaigns/',
      '/product-ad/',
      '[href*=".an0n."]',
      '.code-block',
      '/media/flash/*.swf',
      'amunx.de',
      'infusionextreme.com',
      'pc-magazin.de',
      '/core/media/automatico/',
      'smartadserver.com',
      'button[onclick^="verivox_go("]',
      '/wrap?',
      'roarmyng.bid',
      '.fusion-ads',
      '/dist/assets/omniture/visitorapi.min.js',
    ].forEach((str) => {
      it(str, () => {
        checkString(str);
      });
    });
  });

  describe('#pushUTF8', () => {
    const view = StaticDataView.allocate(10000, { enableCompression: false });
    const checkString = (str: string): void => {
      view.seekZero();
      view.pushUTF8(str);
      view.seekZero();
      expect(view.getUTF8()).to.equal(str);
    };

    it('empty string', () => {
      checkString('');
    });

    [
      'expogrim.com',
      '/reklam/',
      '/playplugins/*/ga/ga.min.js',
      '.ad-text-blockA01',
      'ad.pandora.tv',
      '#header_ad_167',
      'a > img[src][style]',
      'stat.youku.com',
      'addEventListener-defuser.js, load, 2000',
      'table[width="952"][height="115"]',
      '#sb_left_tower',
      '#header_bottom',
      '.SimpleAcceptableTextAds',
      '.ads-right',
      '.bottom-slider-ads',
      'cnt.spbland.ru',
      'tracking.base.de',
      '.RGAdBoxMainDiv',
      'thumbnail-galleries.net',
      '/ad_campaigns/',
      '/product-ad/',
      '[href*=".an0n."]',
      '.code-block',
      '/media/flash/*.swf',
      'amunx.de',
      'infusionextreme.com',
      'pc-magazin.de',
      '/core/media/automatico/',
      'smartadserver.com',
      'button[onclick^="verivox_go("]',
      '/wrap?',
      'roarmyng.bid',
      '.fusion-ads',
      '/dist/assets/omniture/visitorapi.min.js',
      ...getNaughtyStrings(),
    ].forEach((str) => {
      it(str, () => {
        checkString(str);
      });
    });
  });

  describe('#getUint32ArrayView', () => {
    it('empty view', () => {
      const view = StaticDataView.allocate(0, { enableCompression: false });
      const v = view.getUint32ArrayView(0);
      expect(v).to.have.lengthOf(0);
      expect(view.slice()).to.have.lengthOf(0);
    });

    it('should allocate buffer of size 1', () => {
      const view = StaticDataView.allocate(4, { enableCompression: false });
      const v = view.getUint32ArrayView(1);
      expect(v).to.have.lengthOf(1);
      expect(view.slice()).to.have.lengthOf(4);
    });

    it('should align', () => {
      const view = StaticDataView.allocate(8, { enableCompression: false });
      view.setPos(3);
      const v = view.getUint32ArrayView(1);
      expect(v).to.have.lengthOf(1);
      expect(view.slice()).to.have.lengthOf(8);
    });

    it('should not align if already aligned', () => {
      const view = StaticDataView.allocate(8, { enableCompression: false });
      view.setPos(4);
      const v = view.getUint32ArrayView(1);
      expect(v).to.have.lengthOf(1);
      expect(view.slice()).to.have.lengthOf(8);
    });

    it('should write in original buffer', () => {
      const view = StaticDataView.allocate(4, { enableCompression: false });
      let v = view.getUint32ArrayView(1);
      v[0] = Number.MAX_SAFE_INTEGER >>> 0;
      view.seekZero();
      v = view.getUint32ArrayView(1);
      expect(v[0]).to.equal(Number.MAX_SAFE_INTEGER >>> 0);
      expect(view.pos).to.equal(4);
      expect(view.slice()).to.eql(new Uint8Array([255, 255, 255, 255]));
    });

    it('serialize/deserialize', () => {
      const view = StaticDataView.allocate(20, { enableCompression: false });
      view.pushBool(true);
      const v = view.getUint32ArrayView(4);
      v[0] = 1;
      v[1] = 2;
      v[2] = Number.MAX_SAFE_INTEGER >>> 0;
      v[3] = 3;
      const cropped = view.slice();
      expect(cropped).to.eql(
        new Uint8Array([1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 255, 255, 255, 255, 3, 0, 0, 0]),
      );

      // Reload
      const newView = StaticDataView.fromUint8Array(cropped, { enableCompression: false });
      expect(newView.getBool()).to.be.true;
      expect(newView.getUint32ArrayView(4)).to.eql(
        new Uint32Array([1, 2, Number.MAX_SAFE_INTEGER >>> 0, 3]),
      );
    });
  });
});
