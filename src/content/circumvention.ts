import instart from './circumvention/instart';

/**
 * This module exports a single function which will be called from content
 * script to inject some circumvention logic without having to perform a
 * round-trip to the background. This is required for some websites where
 * circumvention is done from the main document and counter-measures need to
 * take effect immediately.
 */
export default (window: Window): void => {
  // Custom logic to defuse InstartLogic
  instart(window);
};
