import CosmeticsInjection from '../src/cosmetics-injection';

/**
 * Because all the filters and matching logic leaves in the background of the
 * extension, the content script needs a way to request relevant cosmetic
 * filters for each frame. This channel of communication can be handled in
 * several ways (`connect`, `sendMessage`). Here we will make use of
 * `sendMessage` for one-off communications.
 *
 * `backgroundAction` wraps the logic of communicating with the background. It
 * is given as a callback to `CosmeticsInjection`, and will be used to request
 * cosmetic filters for a particular hostname (action:  * 'getCosmeticsForDomain')
 * and for particular DOM nodes found in the page (action: 'getCosmeticsForNodes').
 *
 * The background should listen to these messages and answer back with lists of
 * filters to be injected in the page.
 */
const backgroundAction = (action, ...args) => {
  chrome.runtime.sendMessage({
    action,
    args,
  }, (response) => {
    injection.handleResponseFromBackground(response);
  });
};

/**
 * `CosmeticsInjection` is in charge of all adblocking logic on the
 * content-script side. It handles the following:
 * - Inject scripts into the page, which might be used to defuse anti-adblockers.
 * - Block the execution of some scripts in the page (only if the
 * 'beforescriptexecute' event is avaliable, currently only on Firefox).
 * - Inject CSS styles (cosmetics) to hide ads or remove empty placeholders.
 * - Observe mutations in the page (using MutationObserver) and inject relevant
 * filters for new nodes of the DOM.
 */
const injection = new CosmeticsInjection(
  window,
  backgroundAction,
);

/**
 * Make sure we clean-up all resources and event listeners when this content
 * script is unloaded (stop MutationObserver, etc.).
 */
const onUnload = () => {
  injection.unload();
  window.removeEventListener('unload', onUnload);
};

/**
 * Listen to onDOMContentLoaded to start cosmetic injection, and make sure we
 * clean-up when content script is unloaded.
 */
window.addEventListener('unload', onUnload);
