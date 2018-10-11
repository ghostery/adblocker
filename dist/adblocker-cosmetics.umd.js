(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.adblocker = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function injectCSSRule(rule, doc) {
        var css = doc.createElement('style');
        css.type = 'text/css';
        css.id = 'cliqz-adblokcer-css-rules';
        var parent = doc.head || doc.documentElement;
        parent.appendChild(css);
        css.appendChild(doc.createTextNode(rule));
    }
    function injectScript(s, doc) {
        var autoRemoveScript = "\n    try {\n      " + s + "\n    } catch (ex) { }\n\n    (function() {\n      var currentScript = document.currentScript;\n      var parent = currentScript && currentScript.parentNode;\n\n      if (parent) {\n        parent.removeChild(currentScript);\n      }\n    })();\n  ";
        var script = doc.createElement('script');
        script.type = 'text/javascript';
        script.id = 'cliqz-adblocker-script';
        script.appendChild(doc.createTextNode(autoRemoveScript));
        var parent = doc.head || doc.documentElement;
        parent.appendChild(script);
    }
    function blockScript(filter, doc) {
        var filterRE = new RegExp(filter);
        doc.addEventListener('beforescriptexecute', function (ev) {
            var target = ev.target;
            if (target.textContent && filterRE.test(target.textContent)) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    }
    function overrideUserAgent() {
        var script = function () {
            Object.defineProperty(navigator, 'userAgent', {
                get: function () { return 'Mozilla/5.0 Gecko Firefox'; }
            });
        };
        injectScript("(" + script.toString() + ")()", window.document);
    }
    var CosmeticInjection = (function () {
        function CosmeticInjection(window, backgroundAction, useMutationObserver) {
            if (useMutationObserver === void 0) { useMutationObserver = true; }
            this.window = window;
            this.backgroundAction = backgroundAction;
            this.mutationObserver = null;
            this.injectedRules = new Set();
            this.injectedScripts = new Set();
            this.blockedScripts = new Set();
            this.observedNodes = new Set();
            this.backgroundAction('getCosmeticsForDomain');
            if (useMutationObserver) {
                this.onMutation([{ target: this.window.document.body }]);
                this.startObserving();
            }
        }
        CosmeticInjection.prototype.unload = function () {
            if (this.mutationObserver) {
                try {
                    this.mutationObserver.disconnect();
                }
                catch (e) {
                }
            }
        };
        CosmeticInjection.prototype.handleResponseFromBackground = function (_a) {
            var active = _a.active, scripts = _a.scripts, blockedScripts = _a.blockedScripts, styles = _a.styles;
            if (!active) {
                this.unload();
                return;
            }
            for (var i = 0; i < scripts.length; i += 1) {
                var script = scripts[i];
                if (!this.injectedScripts.has(script)) {
                    injectScript(script, this.window.document);
                    this.injectedScripts.add(script);
                }
            }
            for (var i = 0; i < blockedScripts.length; i += 1) {
                var script = blockedScripts[i];
                if (!this.blockedScripts.has(script)) {
                    blockScript(script, this.window.document);
                    this.blockedScripts.add(script);
                }
            }
            this.handleRules(styles);
        };
        CosmeticInjection.prototype.handleRules = function (rules) {
            var rulesToInject = [];
            for (var i = 0; i < rules.length; i += 1) {
                var rule = rules[i];
                if (!this.injectedRules.has(rule)) {
                    try {
                        if (!this.window.document.querySelector(rule)) {
                            continue;
                        }
                    }
                    catch (e) {
                        continue;
                    }
                    this.injectedRules.add(rule);
                    rulesToInject.push(" :root " + rule);
                }
            }
            if (rulesToInject.length > 0) {
                injectCSSRule(rulesToInject.join(' ,') + " {display:none !important;}", this.window.document);
            }
        };
        CosmeticInjection.prototype.onMutation = function (mutations) {
            var _this = this;
            var targets = new Set(mutations.map(function (m) { return m.target; }).filter(function (t) { return t; }));
            if (targets.size > 100) {
                targets = new Set([this.window.document.body]);
            }
            if (targets.size === 0) {
                return;
            }
            var nodeInfo = new Set();
            targets.forEach(function (target) {
                var nodes = target.querySelectorAll('*');
                for (var i = 0; i < nodes.length; i += 1) {
                    var node = nodes[i];
                    if (node.hidden) {
                        continue;
                    }
                    if (node.id) {
                        var selector = "#" + node.id;
                        if (!_this.observedNodes.has(selector)) {
                            nodeInfo.add(selector);
                            _this.observedNodes.add(selector);
                        }
                    }
                    if (node.tagName) {
                        var selector = node.tagName;
                        if (!_this.observedNodes.has(selector)) {
                            nodeInfo.add(selector);
                            _this.observedNodes.add(selector);
                        }
                    }
                    if (node.className && node.className.split) {
                        node.className.split(' ').forEach(function (name) {
                            var selector = "." + name;
                            if (!_this.observedNodes.has(selector)) {
                                nodeInfo.add(selector);
                                _this.observedNodes.add(selector);
                            }
                        });
                    }
                }
            });
            if (nodeInfo.size > 0) {
                this.backgroundAction('getCosmeticsForNodes', [__spread(nodeInfo)]);
            }
        };
        CosmeticInjection.prototype.startObserving = function () {
            var _this = this;
            if (this.window.MutationObserver !== undefined) {
                this.mutationObserver = new this.window.MutationObserver(function (mutations) {
                    return _this.onMutation(mutations);
                });
                this.mutationObserver.observe(this.window.document, {
                    childList: true,
                    subtree: true
                });
            }
        };
        return CosmeticInjection;
    }());

    exports.CosmeticsInjection = CosmeticInjection;
    exports.overrideUserAgent = overrideUserAgent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
