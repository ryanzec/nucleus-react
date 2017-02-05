export function addDelay(request, returnCallback) {
  setTimeout(returnCallback, request && request.query && request.query.delay ? request.query.delay : 0);
}
