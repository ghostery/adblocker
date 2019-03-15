import { factory } from 'tsmaz';

import cosmeticSelectorCodebook from './codebooks/cosmetic-selector';
import networkCSPCodebook from './codebooks/network-csp';
import networkFilterCodebook from './codebooks/network-filter';
import networkHostnameCodebook from './codebooks/network-hostname';
import networkRedirectCodebook from './codebooks/network-redirect';

// Cosmetic selectors
const cosmeticSmaz = factory(cosmeticSelectorCodebook);
export const deflateCosmeticString = cosmeticSmaz.compress;
export const inflateCosmeticString = cosmeticSmaz.decompress;

// Network CSPs
const networkCSPSmaz = factory(networkCSPCodebook);
export const deflateNetworkCSPString = networkCSPSmaz.compress;
export const inflateNetworkCSPString = networkCSPSmaz.decompress;

// Network redirects
const networkRedirectSmaz = factory(networkRedirectCodebook);
export const deflateNetworkRedirectString = networkRedirectSmaz.compress;
export const inflateNetworkRedirectString = networkRedirectSmaz.decompress;

// Network hostnames
const networkHostnameSmaz = factory(networkHostnameCodebook);
export const deflateNetworkHostnameString = networkHostnameSmaz.compress;
export const inflateNetworkHostnameString = networkHostnameSmaz.decompress;

// Network filters
const networkFilterSmaz = factory(networkFilterCodebook);
export const deflateNetworkFilterString = networkFilterSmaz.compress;
export const inflateNetworkFilterString = networkFilterSmaz.decompress;
