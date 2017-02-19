import isArrow from './is-arrow';
import isNumber from './is-number';
import keyCodes from './key-codes';

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
