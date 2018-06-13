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

export default function optimize(filters: NetworkFilter[]): NetworkFilter[] {
  const fused: NetworkFilter[] = [];

  // 1. Group filters by same options
  const groupedByOption: Map<number, NetworkFilter[]> = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    const mask = filter.getMask();
    setWithDefault(groupedByOption, mask, filter);
  }

  // For each identical option, group identical patterns into one filter
  groupedByOption.forEach(lst => {
    // Group filters by identical filter/hostname
    const plainNoDomains = new Map(); // Plain filter with no `$domain` option
    const plainPatterns = new Map(); // Plain filter with a `$domain` option
    const regexPatterns = new Map(); // Regex filter

    for (let i = 0; i < lst.length; i += 1) {
      const filter = lst[i];
      if (filter.isPlain()) {
        if (
          !(
            filter.hasOptDomains() ||
            filter.hasOptNotDomains() ||
            filter.isHostname() ||
            filter.isHostnameAnchor()
          )
        ) {
          // A very common case of full-text patterns, with no hostname and not
          // options. In this case we just group them into a big regexp. We
          // should just make sure that we keep redirects unchanged.
          setWithDefault(plainNoDomains, `${filter.redirect}`, filter);
        } else {
          setWithDefault(
            plainPatterns,
            `${filter.getHostname()}|||${filter.getFilter()}|||${
              filter.redirect
            }`,
            filter,
          );
        }
      } else if (!(filter.hasOptDomains() || filter.hasOptNotDomains())) {
        setWithDefault(plainNoDomains, `${filter.redirect}`, filter);
      } else {
        setWithDefault(
          regexPatterns,
          `${filter.getHostname()}|||${filter.getRegex().source}`,
          filter,
        );
      }
    }

    // Fusion plain patterns with no domain (create a compiled regex)
    plainNoDomains.forEach(bucket => {
      if (bucket.length === 1) {
        fused.push(bucket[0]);
      } else {
        let filter: NetworkFilter | null = null;
        const patterns = new Set();
        for (let i = 0; i < bucket.length; i += 1) {
          const f = bucket[i];
          if (filter === null) {
            filter = new NetworkFilter(f);
          }

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

        if (filter !== null) {
          // Create one big regex out of all the patterns
          if (patterns.size > 1) {
            filter.setRegex(new RegExp([...patterns].join('|')));
          }

          fused.push(filter);
        }
      }
    });

    // Fusion plain patterns with domain
    plainPatterns.forEach(bucket => {
      if (bucket.length === 1) {
        fused.push(bucket[0]);
      } else {
        let newFilterDomains: NetworkFilter | null = null;
        let optDomains: Set<string> = new Set();
        let newFilterNotDomains: NetworkFilter | null = null;
        let optNotDomains: Set<string> = new Set();
        let newFilter: NetworkFilter | null = null;

        for (let i = 0; i < bucket.length; i += 1) {
          const f = bucket[i];
          if (f.hasOptNotDomains()) {
            if (newFilterNotDomains === null) {
              newFilterNotDomains = new NetworkFilter(f);
              optNotDomains = f.getOptNotDomains();
            } else {
              f.getOptNotDomains().forEach((d: string) => optNotDomains.add(d));
            }
          } else if (f.hasOptDomains()) {
            if (newFilterDomains === null) {
              newFilterDomains = new NetworkFilter(f);
              optDomains = f.getOptDomains();
            } else {
              f.getOptDomains().forEach((d: string) => optDomains.add(d));
            }
          } else if (newFilter === null) {
            newFilter = new NetworkFilter(f);
          }
        }

        if (newFilter !== null) {
          fused.push(newFilter);
        }

        if (newFilterDomains !== null) {
          fused.push(newFilterDomains);
        }
        if (newFilterNotDomains !== null) {
          fused.push(newFilterNotDomains);
        }
      }
    });

    // Fusion regex patterns
    regexPatterns.forEach(bucket => {
      if (bucket.length === 1) {
        fused.push(bucket[0]);
      } else {
        let newFilterDomains: NetworkFilter | null = null;
        const newFilterDomainsRegex = new Set();
        let optDomains: Set<string> = new Set();

        let newFilterNotDomains: NetworkFilter | null = null;
        let optNotDomains: Set<string> = new Set();
        const newFilterNotDomainsRegex = new Set();

        let newFilter: NetworkFilter | null = null;
        const newFilterRegex = new Set();

        for (let i = 0; i < bucket.length; i += 1) {
          const f = bucket[i];
          if (f.hasOptNotDomains()) {
            if (newFilterNotDomains === null) {
              newFilterNotDomains = new NetworkFilter(f);
              optNotDomains = f.getOptNotDomains();
              newFilterNotDomainsRegex.add(processRegex(f.getRegex()));
            } else {
              f
                .getOptNotDomains()
                .forEach(optNotDomains.add.bind(optNotDomains));
              newFilterNotDomainsRegex.add(processRegex(f.getRegex()));
            }
          } else if (f.hasOptDomains()) {
            if (newFilterDomains === null) {
              newFilterDomains = new NetworkFilter(f);
              optDomains = f.getOptDomains();
              newFilterDomainsRegex.add(processRegex(f.getRegex()));
            } else {
              f.getOptDomains().forEach(optDomains.add.bind(optDomains));
              newFilterDomainsRegex.add(processRegex(f.getRegex()));
            }
          } else if (newFilter === null) {
            newFilter = new NetworkFilter(f);
            newFilterRegex.add(processRegex(f.getRegex()));
          } else {
            newFilterRegex.add(processRegex(f.getRegex()));
          }
        }

        // Combine regex into one filter
        if (newFilter !== null) {
          const fusedRegex = [...newFilterRegex].join('|');
          newFilter.setRegex(new RegExp(fusedRegex));
          fused.push(newFilter);
        }

        if (newFilterDomains !== null) {
          const fusedRegex = [...newFilterDomainsRegex].join('|');
          newFilterDomains.setRegex(new RegExp(fusedRegex));
          fused.push(newFilterDomains);
        }

        if (newFilterNotDomains !== null) {
          const fusedRegex = [...newFilterNotDomainsRegex].join('|');
          newFilterNotDomains.setRegex(new RegExp(fusedRegex));
          fused.push(newFilterNotDomains);
        }
      }
    });
  });

  return fused;
}
