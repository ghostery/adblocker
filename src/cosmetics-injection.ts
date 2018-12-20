import injectCircumvention from './content/circumvention';
import { blockScript, injectCSSRule, injectScript } from './content/injection';

interface IMessageFromBackground {
  active: boolean;
  scripts: string[];
  blockedScripts: string[];
  styles: string[];
}

/**
 * Takes care of injecting cosmetic filters in a given window. Responsabilities:
 * - Inject scripts.
 * - Block scripts.
 * - Inject CSS rules.
 *
 * All this happens by communicating with the background through the
 * `backgroundAction` function (to trigger request the sending of new rules
 * based on a domain or node selectors) and the `handleResponseFromBackground`
 * callback to apply new rules.
 */
export default class CosmeticInjection {
  constructor(
    private readonly window: Window,
    backgroundAction: (action: string, ...args: any[]) => Promise<void>,
  ) {
    backgroundAction('getCosmeticsFilters');
  }

  public injectCircumvention(): void {
    injectCircumvention(this.window);
  }

  public handleResponseFromBackground({
    active,
    scripts,
    blockedScripts,
    styles,
  }: IMessageFromBackground) {
    if (!active) {
      return;
    }

    // Inject scripts
    for (let i = 0; i < scripts.length; i += 1) {
      injectScript(scripts[i], this.window.document);
    }

    // Block scripts
    for (let i = 0; i < blockedScripts.length; i += 1) {
      blockScript(blockedScripts[i], this.window.document);
    }

    // Inject CSS
    this.handleRules(styles);
  }

  private handleRules(rules: string[]) {
    let idx = 0;
    while (idx < rules.length) {
      injectCSSRule(
        `${rules.slice(idx, idx + 1000).join(',')} { display: none!important; }`,
        this.window.document,
      );
      idx = idx + 1000;
    }
  }
}
