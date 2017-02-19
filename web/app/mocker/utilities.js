import { randomNumber } from '../../../src/utilities/number';

export function addDelay(request, returnCallback) {
  setTimeout(returnCallback, request && request.query && request.query.delay ? request.query.delay : randomNumber(100, 200));
}
