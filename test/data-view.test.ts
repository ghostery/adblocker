import StaticDataView from '../src/data-view';

describe('#StaticDataView', () => {
  describe('#slice', () => {
    it('returns empty buffer if no data and empty initial size', () => {
      const view = new StaticDataView(0);
      expect(view.slice()).toHaveLength(0);
    });

    it('returns empty buffer if no data', () => {
      const view = new StaticDataView(10);
      expect(view.slice()).toHaveLength(0);
    });
  });

  describe('#getUint32ArrayView', () => {
    it('empty view', () => {
      const view = new StaticDataView(0);
      const v = view.getUint32ArrayView(0);
      expect(v).toHaveLength(0);
      expect(view.slice()).toHaveLength(0);
    });

    it('should allocate buffer of size 1', () => {
      const view = new StaticDataView(4);
      const v = view.getUint32ArrayView(1);
      expect(v).toHaveLength(1);
      expect(view.slice()).toHaveLength(4);
    });

    it('should align', () => {
      const view = new StaticDataView(8);
      view.setPos(3);
      const v = view.getUint32ArrayView(1);
      expect(v).toHaveLength(1);
      expect(view.slice()).toHaveLength(8);
    });

    it('should not align if already aligned', () => {
      const view = new StaticDataView(8);
      view.setPos(4);
      const v = view.getUint32ArrayView(1);
      expect(v).toHaveLength(1);
      expect(view.slice()).toHaveLength(8);
    });

    it('should write in original buffer', () => {
      const view = new StaticDataView(4);
      let v = view.getUint32ArrayView(1);
      v[0] = Number.MAX_SAFE_INTEGER >>> 0;
      view.seekZero();
      v = view.getUint32ArrayView(1);
      expect(v[0]).toBe(Number.MAX_SAFE_INTEGER >>> 0);
      expect(view.pos).toBe(4);
      expect(view.slice()).toEqual(new Uint8Array([255, 255, 255, 255]));
    });

    it('serialize/deserialize', () => {
      const view = new StaticDataView(20);
      view.pushBool(true);
      const v = view.getUint32ArrayView(4);
      v[0] = 1;
      v[1] = 2;
      v[2] = Number.MAX_SAFE_INTEGER >>> 0;
      v[3] = 3;
      const cropped = view.slice();
      expect(cropped).toEqual(
        new Uint8Array([1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 255, 255, 255, 255, 3, 0, 0, 0]),
      );

      // Reload
      const newView = StaticDataView.fromUint8Array(cropped);
      expect(newView.getBool()).toBe(true);
      expect(newView.getUint32ArrayView(4)).toEqual(
        new Uint32Array([1, 2, Number.MAX_SAFE_INTEGER >>> 0, 3]),
      );
    });
  });
});
