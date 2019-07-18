/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { ipcRenderer, remote, webFrame } from 'electron';
import { extractFeaturesFromDOM } from '../content/helpers';

alert('test');
let enableMutationObserver = true; // Not sure what to do with it.
let ACTIVE = true;
let MUTATION_OBSERVER = null;
function unload() {
  if (MUTATION_OBSERVER !== null) {
    MUTATION_OBSERVER.disconnect();
    MUTATION_OBSERVER = null;
  }
}
function handleResponseFromBackground(_a) {
    var active = _a.active, scripts = _a.scripts, styles = _a.styles;
    if (active === false) {
        ACTIVE = false;
        unload();
        return;
    }
    
        ACTIVE = true;
    
    // Inject scripts
    if (scripts) {
        var _loop_1 = function (i) {
            setTimeout(function () { return webFrame.executeJavaScript(scripts[i]); }, 0);
        };
        for (var i = 0; i < scripts.length; i += 1) {
            _loop_1(i);
        }
    }
    // Normal CSS
    if (styles && styles.length > 0) {
        setTimeout(function () { return remote.getCurrentWebContents().insertCSS(styles); }, 0);
    }
    // Extended CSS
    // if (extended && extended.length > 0) {
    // }
}
function getCosmeticsFilters(data) {
  let id = `_${ 
        Math.random()
            .toString(36)
            .substr(2, 9)}`;
  ipcRenderer.send('get-cosmetic-filters', id, data);
  ipcRenderer.once('get-cosmetic-filters-response-' + id, (e, response) => {
        handleResponseFromBackground(response);
    });
}
getCosmeticsFilters({
 lifecycle: 'start', ids: [], classes: [], hrefs: [] 
});
// On DOMContentLoaded, start monitoring the DOM. This means that we will
// first check which ids and classes exist in the DOM as a one-off operation;
// this will allow the injection of selectors which have a chance to match.
// We also register a MutationObserver which will monitor the addition of new
// classes and ids, and might trigger extra filters on a per-need basis.
window.addEventListener('DOMContentLoaded', () => {
    // Keep track of values already seen and processed in this frame
    var knownIds = new Set();
    var knownClasses = new Set();
    var knownHrefs = new Set();
    // Given a list of `nodes` (i.e.: instances of `Element` class), extract
    // a list of class names and ids which we never saw before. These will be
    // used to request extra cosmetics to inject if needed.
    var handleNodes = function (nodes) {
        var _a = extractFeaturesFromDOM(nodes), classes = _a.classes, ids = _a.ids, hrefs = _a.hrefs;
        var newIds = [];
        var newClasses = [];
        var newHrefs = [];
        // Update ids
        for (var i = 0; i < ids.length; i += 1) {
            var id = ids[i];
            if (knownIds.has(id) === false) {
                newIds.push(id);
                knownIds.add(id);
            }
        }
        for (var i = 0; i < classes.length; i += 1) {
            var cls = classes[i];
            if (knownClasses.has(cls) === false) {
                newClasses.push(cls);
                knownClasses.add(cls);
            }
        }
        for (var i = 0; i < hrefs.length; i += 1) {
            var href = hrefs[i];
            if (knownHrefs.has(href) === false) {
                newHrefs.push(href);
                knownHrefs.add(href);
            }
        }
        if (newIds.length !== 0 || newClasses.length !== 0 || newHrefs.length !== 0) {
            // TODO - we might want to throttle that?
            getCosmeticsFilters({
                classes: newClasses,
                hrefs: newHrefs,
                ids: newIds,
                lifecycle: 'dom-update'
            });
        }
    };
    // Since we did not start observing before, start by getting the list of
    // all ids and classes in the DOM at this point of time (DOMContentLoaded
    // event). Afterwards, we will rely on the mutation observer to detect
    // changes.
    handleNodes(Array.from(window.document.querySelectorAll('[id],[class],[href]')));
    // Start observing mutations to detect new ids and classes which would
    // need to be hidden.
    if (ACTIVE && enableMutationObserver && window.MutationObserver) {
        MUTATION_OBSERVER = new window.MutationObserver(function (mutations) {
            // Accumulate all nodes which were updated in `nodes`
            var nodes = [];
            for (var i = 0; i < mutations.length; i += 1) {
                var mutation = mutations[i];
                if (mutation.type === 'attributes') {
                    nodes.push(mutation.target);
                }
                else if (mutation.type === 'childList') {
                    var addedNodes = mutation.addedNodes;
                    for (var j = 0; j < addedNodes.length; j += 1) {
                        var addedNode = addedNodes[j];
                        nodes.push(addedNode);
                        if (addedNode.querySelectorAll !== undefined) {
                            var children = addedNode.querySelectorAll('[id],[class],[href]');
                            for (var k = 0; k < children.length; k += 1) {
                                nodes.push(children[k]);
                            }
                        }
                    }
                }
            }
            handleNodes(nodes);
        });
        MUTATION_OBSERVER.observe(window.document.documentElement, {
            attributeFilter: ['class', 'id', 'href'],
            attributes: true,
            childList: true,
            subtree: true
        });
    }
}, { once: true, passive: true });
window.addEventListener('unload', unload, { once: true, passive: true });
