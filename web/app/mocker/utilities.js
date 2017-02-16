import * as random from '../../../src/utilities/random';

export function addDelay(request, returnCallback) {
  setTimeout(returnCallback, request && request.query && request.query.delay ? request.query.delay : random.number(100, 200));
}
