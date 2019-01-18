import { f, List } from '../src/lists';

// describe('#Lists', () => {
//
// });

describe('#List', () => {
  it('parses filter', () => {
    const list = List.parse('||foo.com');
    expect(list.checksum).toBe('');
    expect(list.cosmetics).toHaveLength(0);
    expect(list.csp).toHaveLength(0);
    expect(list.exceptions).toHaveLength(0);
    expect(list.importants).toHaveLength(0);
    expect(list.redirects).toHaveLength(0);

    expect(list.filters).toHaveLength(1);
  });
});

describe('#f', () => {
  it('handles CosmeticFilter', () => {
    const filter = f`##.selector`;
    expect(filter).not.toBeNull();
    if (filter !== null) {
      expect(filter.isCosmeticFilter()).toBeTruthy();
    }
  });

  it('handles NetworkFitler', () => {
    const filter = f`||foo.com`;
    expect(filter).not.toBeNull();
    if (filter !== null) {
      expect(filter.isNetworkFilter()).toBeTruthy();
    }
  });

  it('returns null for invalid filter', () => {
    expect(f`#$#~~~`).toBeNull();
  });
});
