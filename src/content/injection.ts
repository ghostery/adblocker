/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
function autoRemoveScript(script: string): string {
  return `
try {
  ${script}
} catch (ex) { }

(function() {
  var currentScript = document.currentScript;
  var parent = currentScript && currentScript.parentNode;

  if (parent) {
    parent.removeChild(currentScript);
  }
})();
  `;
}

/**
 * Given a self-executing script as well as a list of dependencies (function
 * which are required by the injected script), create a script which contains
 * both the dependencies (as scoped functions) and the script.
 */
function wrapCallableInContext(script: string, deps: Array<(...args: any[]) => any> = []): string {
  return `
${deps.map((dep) => `const ${dep.name} = ${dep.toString()};`).join('\n')}
${script}
  `;
}

/**
 * Given a function which can accept arguments, serialize it into a string (as
 * well as its argument) so that it will automatically execute upon injection.
 */
function autoCallFunction(fn: (...args: any[]) => void, ...args: any[]): string {
  return `
try {
  (${fn.toString()})(${args.map((arg) => JSON.stringify(arg)).join(', ')});
} catch (ex) {  };`;
}

export function blockScript(filter: string, doc: Document): void {
  const filterRE = new RegExp(filter);
  doc.addEventListener('beforescriptexecute', (ev) => {
    const target = ev.target as HTMLElement;
    if (target.textContent && filterRE.test(target.textContent)) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  });
}

export function injectCSSRule(rule: string, doc: Document): void {
  const parent = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
  if (parent !== null) {
    const css = doc.createElement('style');
    css.type = 'text/css';
    css.id = 'cliqz-adblokcer-css-rules';
    css.appendChild(doc.createTextNode(rule));
    parent.appendChild(css);
  }
}

export function injectScript(s: string, doc: Document): void {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.id = 'cliqz-adblocker-script';
  script.async = false;
  script.appendChild(doc.createTextNode(autoRemoveScript(s)));

  // Insert node
  const parent = doc.head || doc.documentElement;
  if (parent !== null) {
    parent.appendChild(script);
  }
}

/**
 * Given a scriptlet (as well as optional dependencies: symbols which must be
 * available in the scope for this scriptlet to do its job), returns a callback
 * which needs to be called with the desired window as well as optional
 * arguments for the scriptlet. The script will be injected in the head of
 * window's document as a self-executing, self-erasing script element.
 */
export function bundle(fn: (...args: any[]) => void, deps: Array<(...args: any[]) => any> = []) {
  return (window: Window, ...args: any[]) =>
    injectScript(wrapCallableInContext(autoCallFunction(fn, ...args), deps), window.document);
}

/**
 * Given a list of CSS selectors, create a valid stylesheet ready to be injected
 * in the page. This also takes care to no create rules with too many selectors
 * for Chrome, see: https://crbug.com/804179
 */
export function createStylesheet(rules: string[]): string {
  const maximumNumberOfSelectors = 1024;
  const parts: string[] = [];
  for (let i = 0; i < rules.length; i += maximumNumberOfSelectors) {
    parts.push(
      `${rules.slice(i, i + maximumNumberOfSelectors).join(',')} { display: none!important; }`,
    );
  }
  return parts.join('\n');
}
