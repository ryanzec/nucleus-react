import isArrow from './isArrow';
import keyCodes from './keyCodes';

export default function isNonModifyingInput(event) {
  return (
    event.which === keyCodes.tab
    || isArrow(event) === true
  );
}
