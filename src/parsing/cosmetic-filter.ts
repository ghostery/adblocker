import {
  fastHash,
  fastStartsWith,
  fastStartsWithFrom,
  getBit,
  setBit,
} from '../utils';

import CosmeticFilter, { MASK } from '../types/cosmetics';

/**
 * Given a line that we know contains a cosmetic filter, create a CosmeticFiler
 * instance out of it. This function should be *very* efficient, as it will be
 * used to parse tens of thousands of lines.
 */
export function parseCosmeticFilter(line: string): CosmeticFilter | null {
  // Mask to store attributes
  // Each flag (unhide, scriptInject, etc.) takes only 1 bit
  // at a specific offset defined in MASK.
  // cf: MASK for the offset of each property
  let mask = 0;
  let selector: string = '';
  let hostnames: string = ''; // Coma-separated list of hostnames
  const sharpIndex = line.indexOf('#');

  // Start parsing the line
  const afterSharpIndex = sharpIndex + 1;
  let suffixStartIndex = afterSharpIndex + 1;

  // hostname1,hostname2#@#.selector
  //                    ^^ ^
  //                    || |
  //                    || suffixStartIndex
  //                    |afterSharpIndex
  //                    sharpIndex

  // Check if unhide
  if (line[afterSharpIndex] === '@') {
    mask = setBit(mask, MASK.unhide);
    suffixStartIndex += 1;
  }

  // Parse hostnames
  if (sharpIndex > 0) {
    hostnames = line.substring(0, sharpIndex);
  }

  // Parse selector
  // TODO - avoid the double call to substring
  selector = line.substr(suffixStartIndex);

  // Deal with script:inject and script:contains
  if (fastStartsWith(selector, 'script:')) {
    //      script:inject(.......)
    //                    ^      ^
    //   script:contains(/......./)
    //                    ^      ^
    //    script:contains(selector[, args])
    //           ^        ^               ^^
    //           |        |          |    ||
    //           |        |          |    |selector.length
    //           |        |          |    scriptSelectorIndexEnd
    //           |        |          |scriptArguments
    //           |        scriptSelectorIndexStart
    //           scriptMethodIndex
    const scriptMethodIndex = 'script:'.length;
    let scriptSelectorIndexStart = scriptMethodIndex;
    let scriptSelectorIndexEnd = selector.length - 1;

    if (fastStartsWithFrom(selector, 'inject(', scriptMethodIndex)) {
      mask = setBit(mask, MASK.scriptInject);
      scriptSelectorIndexStart += 'inject('.length;
    } else if (fastStartsWithFrom(selector, 'contains(', scriptMethodIndex)) {
      mask = setBit(mask, MASK.scriptBlock);
      scriptSelectorIndexStart += 'contains('.length;

      // If it's a regex
      if (
        selector[scriptSelectorIndexStart] === '/' &&
        selector[scriptSelectorIndexEnd - 1] === '/'
      ) {
        scriptSelectorIndexStart += 1;
        scriptSelectorIndexEnd -= 1;
      }
    }

    selector = selector.substring(
      scriptSelectorIndexStart,
      scriptSelectorIndexEnd,
    );
  }

  // Exceptions
  if (
    selector === null ||
    selector.length === 0 ||
    selector.endsWith('}') ||
    selector.indexOf('##') !== -1 ||
    (getBit(mask, MASK.unhide) && hostnames.length === 0)
  ) {
    return null;
  }

  const id = fastHash(line);

  return new CosmeticFilter({
    hostnames,
    id,
    mask,
    selector,
  });
}
