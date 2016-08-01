import isArrow from './is-arrow';
import isNumber from './is-number';
import keyCodes from './key-codes';

export default function isValidNumberOnlyInput(event) {
  return (
    event.which === keyCodes.backspace
    || event.which === keyCodes.tab
    || isArrow(event) === true
    || isNumber(event) === true
  );
}
