import { factory } from 'tsmaz';

import cosmeticSelectorCodebook from './codebooks/cosmetic-selector';
import networkCSPCodebook from './codebooks/network-csp';
import networkFilterCodebook from './codebooks/network-filter';
import networkHostnameCodebook from './codebooks/network-hostname';
import networkRedirectCodebook from './codebooks/network-redirect';

// Cosmetic selectors
const cosmeticSmaz = factory(cosmeticSelectorCodebook);
export const deflateCosmeticString = cosmeticSmaz[0];
export const inflateCosmeticString = cosmeticSmaz[1];

// Network CSPs
const networkCSPSmaz = factory(networkCSPCodebook);
export const deflateNetworkCSPString = networkCSPSmaz[0];
export const inflateNetworkCSPString = networkCSPSmaz[1];

// Network redirects
const networkRedirectSmaz = factory(networkRedirectCodebook);
export const deflateNetworkRedirectString = networkRedirectSmaz[0];
export const inflateNetworkRedirectString = networkRedirectSmaz[1];

// Network hostnames
const networkHostnameSmaz = factory(networkHostnameCodebook);
export const deflateNetworkHostnameString = networkHostnameSmaz[0];
export const inflateNetworkHostnameString = networkHostnameSmaz[1];

// Network filters
const networkFilterSmaz = factory(networkFilterCodebook);
export const deflateNetworkFilterString = networkFilterSmaz[0];
export const inflateNetworkFilterString = networkFilterSmaz[1];
