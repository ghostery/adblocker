import { NetworkFilter } from '../parsing/network-filter';

function processRegex(r: RegExp): string {
  return `(?:${r.source})`;
}

function escape(s: string): string {
  return `(?:${s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`;
}

function setWithDefault<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  let bucket = map.get(key);
  if (bucket === undefined) {
    bucket = [];
    map.set(key, bucket);
  }
  bucket.push(value);
}

function groupBy(
  filters: NetworkFilter[],
  criteria: (filter: NetworkFilter) => string,
): NetworkFilter[][] {
  const grouped: Map<string, NetworkFilter[]> = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    setWithDefault(grouped, criteria(filter), filter);
  }
  return [...grouped.values()];
}

function splitBy(
  filters: NetworkFilter[],
  condition: (filter: NetworkFilter) => boolean,
): {
  positive: NetworkFilter[],
  negative: NetworkFilter[],
} {
  const positive: NetworkFilter[] = [];
  const negative: NetworkFilter[] = [];

  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    if (condition(filter)) {
      positive.push(filter);
    } else {
      negative.push(filter);
    }
  }

  return {
    negative,
    positive,
  };
}

interface IOptimization {
  description: string;
  groupByCriteria: (filter: NetworkFilter) => string;
  select: (filter: NetworkFilter) => boolean;
  fusion: (filters: NetworkFilter[]) => NetworkFilter;
}

// TODO: re-introduce more optimizations
const OPTIMIZATIONS: IOptimization[] = [
  {
    description: 'Group simple patterns, into a single filter',
    fusion: (filters: NetworkFilter[]) => {
      const filter = new NetworkFilter(filters[0]);
      const patterns = new Set();
      for (let i = 0; i < filters.length; i += 1) {
        const f = filters[i];
        if (f.isRegex()) {
          patterns.add(processRegex(f.getRegex()));
        } else if (f.isRightAnchor()) {
          patterns.add(`${escape(f.getFilter())}$`);
        } else if (f.isLeftAnchor()) {
          patterns.add(`^${escape(f.getFilter())}`);
        } else {
          patterns.add(escape(f.getFilter()));
        }
      }

      if (patterns.size > 1) {
        filter.setRegex(new RegExp([...patterns].join('|')));
      }

      return filter;
    },
    groupByCriteria: (filter: NetworkFilter) => '' + filter.getMask(),
    select: (filter: NetworkFilter) => (
      !filter.isFuzzy() &&
      !filter.hasOptDomains() &&
      !filter.hasOptNotDomains() &&
      !filter.isHostname() &&
      !filter.isHostnameAnchor() &&
      !filter.isRedirect()
    ),
  },
];

/**
 * Fusion a set of `filters` by applying optimizations sequentially.
 */
export default function optimize(filters: NetworkFilter[]): NetworkFilter[] {
  const fused: NetworkFilter[] = [];
  let toFuse = filters;

  OPTIMIZATIONS.forEach(({ select, fusion, groupByCriteria }) => {
    const { positive, negative } = splitBy(toFuse, select);
    toFuse = negative;
    groupBy(positive, groupByCriteria).forEach((group) => {
      if (group.length > 1) {
        fused.push(fusion(group));
      } else {
        toFuse.push(group[0]);
      }
    });
  });

  for (let i = 0; i < toFuse.length; i += 1) {
    fused.push(toFuse[i]);
  }

  return fused;
}
