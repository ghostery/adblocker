/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
export function autoRemoveScript(script) {
    return "\ntry {\n  " + script + "\n} catch (ex) { }\n\n(function() {\n  var currentScript = document.currentScript;\n  var parent = currentScript && currentScript.parentNode;\n\n  if (parent) {\n    parent.removeChild(currentScript);\n  }\n})();\n  ";
}
/**
 * Given a self-executing script as well as a list of dependencies (function
 * which are required by the injected script), create a script which contains
 * both the dependencies (as scoped functions) and the script.
 */
function wrapCallableInContext(script, deps) {
    if (deps === void 0) { deps = []; }
    return "\n" + deps.map(function (dep) { return "const " + dep.name + " = " + dep.toString() + ";"; }).join('\n') + "\n" + script + "\n  ";
}
/**
 * Given a function which can accept arguments, serialize it into a string (as
 * well as its argument) so that it will automatically execute upon injection.
 */
function autoCallFunction(fn, args) {
    return "\ntry {\n  (" + fn.toString() + ")(" + args.map(function (arg) { return JSON.stringify(arg); }).join(', ') + ");\n} catch (ex) {  };";
}
export function injectCSSRule(rule, doc) {
    var parent = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
    if (parent !== null) {
        var css = doc.createElement('style');
        css.type = 'text/css';
        css.id = 'cliqz-adblokcer-css-rules';
        css.appendChild(doc.createTextNode(rule));
        parent.appendChild(css);
    }
}
export function injectScript(s, doc) {
    var script = doc.createElement('script');
    script.type = 'text/javascript';
    script.id = 'cliqz-adblocker-script';
    script.async = false;
    script.appendChild(doc.createTextNode(autoRemoveScript(s)));
    // Insert node
    var parent = doc.head || doc.documentElement;
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
export function bundle(fn, deps) {
    if (deps === void 0) { deps = []; }
    return function (window, args) {
        return injectScript(wrapCallableInContext(autoCallFunction(fn, args), deps), window.document);
    };
}
