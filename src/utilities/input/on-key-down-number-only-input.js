import blockNumberOnlyInput from './helpers/block-number-only-input';

export default function(event) {
  if (blockNumberOnlyInput(event) === true) {
    event.preventDefault();
  }
}
