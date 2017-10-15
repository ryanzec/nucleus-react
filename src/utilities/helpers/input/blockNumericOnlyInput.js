import isDot from './isDot';
import isArrow from './isArrow';
import isNumber from './isNumber';
import keyCodes from './keyCodes';

export default function blockNumericOnlyInput(event, overrideBlockNumberInput) {
  return (
    event.which !== keyCodes.backspace
    && event.which !== keyCodes.tab
    && isDot(event) === false
    && isArrow(event) === false
    && (
      isNumber(event) === false
      || overrideBlockNumberInput
    )
  );
}
