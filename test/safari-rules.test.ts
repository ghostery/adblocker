import {} from 'jest';
import { loadAllLists } from '../assets/load';
import { convertAndValidateFilters } from '../scripts/convert-to-safari-rules';

test('rule must be a valid safari rule', () => {
  convertAndValidateFilters(loadAllLists());
});
