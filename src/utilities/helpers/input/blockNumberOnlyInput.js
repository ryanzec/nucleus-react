import isArrow from './isArrow';
import isNumber from './isNumber';
import keyCodes from './keyCodes';

export default function blockNumberOnlyInput(event, overrideBlockNumberInput) {
  return (
    event.which !== keyCodes.backspace
    && event.which !== keyCodes.tab
    && isArrow(event) === false
    && (
      isNumber(event) === false
      || overrideBlockNumberInput
    )
  );
}
