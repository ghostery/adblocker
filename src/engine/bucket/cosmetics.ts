import matchCosmeticFilter from '../../matching/cosmetics';
import { CosmeticFilter } from '../../parsing/cosmetic-filter';
import { fastHash, fastStartsWith, tokenize } from '../../utils';

import ReverseIndex from '../reverse-index';

export default class CosmeticFilterBucket {
  public hostnameIndex: ReverseIndex<CosmeticFilter>;
  public selectorIndex: ReverseIndex<CosmeticFilter>;
  public size: number;

  constructor(filters: (cb: (f: CosmeticFilter) => void) => void) {
    // This accelerating data structure is used to retrieve cosmetic filters for
    // a given hostname. We only store filters having at least one hostname
    // specified and we index each filter several time (one time per hostname).
    this.hostnameIndex = new ReverseIndex(
      (cb: (f: CosmeticFilter) => void) =>
        filters((f: CosmeticFilter) => {
          if (f.hasHostnames()) {
            cb(f);
          }
        }),
      (filter: CosmeticFilter) => {
        const multiTokens: number[][] = [];
        if (filter.hostnames !== undefined) {
          filter.hostnames.split(',').forEach((h: string) => {
            multiTokens.push(tokenize(h));
          });
        }
        return multiTokens;
      },
    );

    // Store cosmetic filters dispatched using their selector. This will allow a
    // fast look-up when we need to get a set of rules to inject in a window,
    // based on some node information.
    this.selectorIndex = new ReverseIndex(
      (cb: (f: CosmeticFilter) => void) =>
        filters((f: CosmeticFilter) => {
          if (!(f.isScriptBlock() || f.isScriptInject())) {
            cb(f);
          }
        }),
      (filter) => filter.getTokens(),
    );

    this.size = this.hostnameIndex.size + this.selectorIndex.size;
  }

  public createContentScriptResponse(
    rules: CosmeticFilter[],
  ): {
    active: boolean;
    blockedScripts: string[];
    scripts: string[];
    styles: string[];
  } {
    const styles: string[] = [];
    const scripts: string[] = [];
    const blockedScripts: string[] = [];

    for (let i = 0; i < rules.length; i += 1) {
      const rule: CosmeticFilter = rules[i];
      const selector: string = rule.getSelector();

      if (rule.isScriptBlock()) {
        blockedScripts.push(selector);
      } else if (rule.isScriptInject()) {
        scripts.push(selector);
      } else {
        styles.push(selector);
      }
    }

    return {
      active: true,
      blockedScripts,
      scripts,
      styles,
    };
  }

  public getDomainRules(hostname: string, js: Map<string, string>) {
    // Collect matching rules
    const rules: Array<{ rule: CosmeticFilter; hostname: string }> = [];
    const checkMatch = (rule: CosmeticFilter) => {
      const result = matchCosmeticFilter(rule, hostname);
      if (result !== null) {
        // Update script injection rule
        if (rule.isScriptInject()) {
          const ruleWithScript = new CosmeticFilter(rule);
          let scriptName = rule.getSelector();
          let scriptArguments: string[] = [];
          if (scriptName.indexOf(',') !== -1) {
            const parts = scriptName.split(',');
            scriptName = parts[0];
            scriptArguments = parts.slice(1).map((s) => s.trim());
          }

          let script = js.get(scriptName);
          if (script !== undefined) {
            for (let i = 0; i < scriptArguments.length; i += 1) {
              script = script.replace(`{{${i + 1}}}`, scriptArguments[i]);
            }

            ruleWithScript.selector = script;
            rules.push({
              hostname: result.hostname,
              rule: ruleWithScript,
            });
          } // TODO - else throw an exception?
        } else {
          rules.push({
            hostname: result.hostname,
            rule,
          });
        }
      }

      return true;
    };

    this.hostnameIndex.iterMatchingFilters(tokenize(hostname), checkMatch);

    return this.filterExceptions(rules);
  }

  public getMatchingRules(hostname: string, nodeInfo: string[][]): CosmeticFilter[] {
    // Collect all selectors
    const tokens = new Set();
    for (let i = 0; i < nodeInfo.length; i += 1) {
      const node = nodeInfo[i];
      // For each attribute of the node: [id, tagName, className] = node
      for (let j = 0; j < node.length; j += 1) {
        tokens.add(fastHash(node[j]));
      }
    }

    // Collect matching rules
    const rules: Array<{ hostname: string; rule: CosmeticFilter }> = [];
    const checkMatch = (rule: CosmeticFilter) => {
      const result = matchCosmeticFilter(rule, hostname);
      if (result !== null) {
        rules.push({
          hostname: result.hostname,
          rule,
        });
      }

      return true;
    };

    this.selectorIndex.iterMatchingFilters([...tokens], checkMatch);

    return this.filterExceptions(rules);
  }

  private filterExceptions(
    matches: Array<{ rule: CosmeticFilter; hostname: string }>,
  ): CosmeticFilter[] {
    const matchingRules = new Map();

    for (let i = 0; i < matches.length; i += 1) {
      const { rule, hostname } = matches[i];
      const selector = rule.getSelector();
      const isException = fastStartsWith(hostname, '~');
      if (matchingRules.has(selector)) {
        const otherRule = matchingRules.get(selector);

        if (rule.isUnhide() || isException || hostname.length > otherRule.hostname.length) {
          // Take the longest hostname
          matchingRules.set(selector, {
            hostname,
            isException,
            rule,
          });
        }
      } else {
        // Add rule
        matchingRules.set(selector, {
          hostname,
          isException,
          rule,
        });
      }
    }

    const rules: CosmeticFilter[] = [];
    matchingRules.forEach(({ rule, isException }) => {
      if (!isException && !rule.isUnhide()) {
        rules.push(rule);
      }
    });

    return rules;
  }
}
