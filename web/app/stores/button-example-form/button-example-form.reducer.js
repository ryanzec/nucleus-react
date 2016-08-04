import immutable from 'immutable';
import {
  helpers as formDataHelpers,
  formDataFactory
} from 'form-data-validation';
import * as constants from './button-example-form.constants';

const defaultFormData = formDataFactory({
  fields: {
    buttonText: {
      initialValue: 'I\'m a Button'
    },
    styleType: {},
    isPill: {
      initialValue: false
    },
    isThin: {
      initialValue: false
    },
    doAlert: {
      initialValue: true
    }
  }
});

export default function(state = defaultFormData, action) {
  let newState;

  switch (action.type) {
    case constants.SET:
      newState = action.formData;
      break;

    case constants.RESET:
      newState = defaultFormData;
      break;

    default:
      newState = state;
  }

  return newState;
}
