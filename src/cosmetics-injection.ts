import injectCircumvention from './content/circumvention';
import { blockScript, injectCSSRule, injectScript } from './content/injection';

// We need this as `MutationObserver` is currently not part of the `Window` type
// provided by typescript, although it should be! This will be erased at compile
// time so it has no impact on produced code.
declare global {
  interface Window {
    MutationObserver?: typeof MutationObserver;
  }
}

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
 * - Monitor changes using a mutation observer and inject new rules if needed.
 *
 * All this happens by communicating with the background through the
 * `backgroundAction` function (to trigger request the sending of new rules
 * based on a domain or node selectors) and the `handleResponseFromBackground`
 * callback to apply new rules.
 */
export default class CosmeticInjection {
  private window: Window;

  // TODO: split into two callbacks:
  // 1. getCosmeticsForDomain
  // 2. getCosmeticsForNodes
  // Each of them could return a promise resolving to the filters to be injected
  // in the page, if any. Currently the communication is async, but a
  // promise-based API would be nicer to use.
  private backgroundAction: (action: string, ...args: any[]) => Promise<void>;
  private injectedRules: Set<string>;
  private injectedScripts: Set<string>;
  private blockedScripts: Set<string>;

  private observedNodes: Set<string>;
  private mutationObserver: MutationObserver | null;

  constructor(
    window: Window,
    backgroundAction: (action: string, ...args: any[]) => Promise<void>,
    useMutationObserver = true,
  ) {
    this.window = window;
    this.backgroundAction = backgroundAction;

    this.mutationObserver = null;
    this.injectedRules = new Set();
    this.injectedScripts = new Set();
    this.blockedScripts = new Set();

    this.observedNodes = new Set();

    // Request cosmetics specific to this domain as soon as possible
    this.backgroundAction('getCosmeticsForDomain');

    if (useMutationObserver) {
      // Request cosmetics for nodes already existing in the DOM
      this.onMutation([{ target: this.window.document.body }]);

      // Register MutationObserver
      this.startObserving();
    }
  }

  public unload() {
    if (this.mutationObserver) {
      try {
        this.mutationObserver.disconnect();
      } catch (e) {
        /* in case the page is closed */
      }
    }
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
      this.unload();
      return;
    }

    // Inject scripts
    for (let i = 0; i < scripts.length; i += 1) {
      const script = scripts[i];
      if (!this.injectedScripts.has(script)) {
        injectScript(script, this.window.document);
        this.injectedScripts.add(script);
      }
    }

    // Block scripts
    for (let i = 0; i < blockedScripts.length; i += 1) {
      const script = blockedScripts[i];
      if (!this.blockedScripts.has(script)) {
        blockScript(script, this.window.document);
        this.blockedScripts.add(script);
      }
    }

    this.handleRules(styles);
  }

  private handleRules(rules: string[]) {
    const rulesToInject: string[] = [];

    // Check which rules should be injected in the page.
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i];

      if (!this.injectedRules.has(rule)) {
        // Check if the selector would match
        try {
          if (!this.window.document.querySelector(rule)) {
            continue;
          }
        } catch (e) {
          // invalid selector
          continue;
        }

        this.injectedRules.add(rule);
        rulesToInject.push(` :root ${rule}`);
      }
    }

    // Inject selected rules
    if (rulesToInject.length > 0) {
      injectCSSRule(
        `${rulesToInject.join(' ,')} {display:none !important;}`,
        this.window.document,
      );
    }
  }

  /**
   * When one or several mutations occur in the window, extract caracteristics
   * (node name, class, tag) from the modified nodes and request matching
   * cosmetic filters to inject in the page.
   */
  private onMutation(mutations: Array<{ target: Node }>) {
    let targets: Set<Node> = new Set(mutations.map((m) => m.target).filter((t) => t));

    // TODO - it might be necessary to inject scripts, CSS and block scripts
    // from here into iframes with no src. We could first inject/block
    // everything already present in `this.injectedRules`,
    // `this.injectedScripts` and `this.blockedScripts`. Then we could register
    // the iframe to be subjected to the same future injections as the current
    // window.
    //   targets.forEach((target) => {
    //     if (target.localName === 'iframe') {}
    //     if (target.childElementCount !== 0) {
    //       const iframes = target.getElementsByTagName('iframe');
    //       if (iframes.length !== 0) {}
    //     }
    //   });

    if (targets.size > 100) {
      // In case there are too many mutations we will only check once the whole document
      targets = new Set([this.window.document.body]);
    }

    if (targets.size === 0) {
      return;
    }

    // Collect nodes of targets
    const nodeInfo = new Set();
    targets.forEach((target) => {
      const nodes = (target as HTMLElement).querySelectorAll('*');
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i] as HTMLElement;

        // Ignore hidden nodes
        if (node.hidden) {
          continue;
        }

        if (node.id) {
          const selector = `#${node.id}`;
          if (!this.observedNodes.has(selector)) {
            nodeInfo.add(selector);
            this.observedNodes.add(selector);
          }
        }

        if (node.tagName) {
          const selector = node.tagName;
          if (!this.observedNodes.has(selector)) {
            nodeInfo.add(selector);
            this.observedNodes.add(selector);
          }
        }

        if (node.className && node.className.split) {
          node.className.split(' ').forEach((name) => {
            const selector = `.${name}`;
            if (!this.observedNodes.has(selector)) {
              nodeInfo.add(selector);
              this.observedNodes.add(selector);
            }
          });
        }
      }
    });

    // Send node info to background to request corresponding cosmetic filters
    if (nodeInfo.size > 0) {
      this.backgroundAction('getCosmeticsForNodes', [[...nodeInfo]]);
    }
  }

  private startObserving() {
    // Attach mutation observer in case the DOM is mutated.
    if (this.window.MutationObserver !== undefined) {
      this.mutationObserver = new this.window.MutationObserver((mutations) =>
        this.onMutation(mutations),
      );
      this.mutationObserver.observe(this.window.document, {
        childList: true,
        subtree: true,
      });
    }
  }
}
