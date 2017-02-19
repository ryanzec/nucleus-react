import isDot from './is-dot';
import isArrow from './is-arrow';
import isNumber from './is-number';
import keyCodes from './key-codes';

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
