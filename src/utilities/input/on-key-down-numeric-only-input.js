import blockNumericOnlyInput from './helpers/block-numeric-only-input';

export default function onKeyDownNumericOnlyInput(event) {
  if (blockNumericOnlyInput(event) === true) {
    event.preventDefault();
  }
}
