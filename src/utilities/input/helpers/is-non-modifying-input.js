import isArrow from './is-arrow';
import keyCodes from './key-codes';

export default function isNonModifyingInput(event) {
  return (
    event.which === keyCodes.tab
    || isArrow(event) === true
  );
}
