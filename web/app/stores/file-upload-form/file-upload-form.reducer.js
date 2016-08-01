import immutable from 'immutable';
import {
  helpers as formDataHelpers,
  formDataFactory
} from 'form-data-validation';
import * as constants from './file-upload-form.constants';

const defaultFormData = formDataFactory({
  fields: {
    fileUpload: {
      validatorOptions: {
        validators: [{
          validator: (value) => {
            return value.size < 5000;
          },
          message: 'Sorry but this file is too big (storage isn\'t cheap man...)'
        }]
      }
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
