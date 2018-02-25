import isArrow from './isArrow';
import isNumber from './isNumber';
import keyCodes from './keyCodes';

export default function isValidNumberOnlyInput(event) {
  return (
    event.which === keyCodes.backspace
    || event.which === keyCodes.tab
    || isArrow(event) === true
    || isNumber(event) === true
  );
}
