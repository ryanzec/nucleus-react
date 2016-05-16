import {helpers as formDataHelpers} from 'form-data-validation';

export default function onBlurInputStateUpdater(options) {
  let validateParameters = [this.state[options.formName], options.fieldName];

  if (options.validateWith) {
    let validateWithKeys = Object.keys(options.validateWith);

    validateWithKeys.forEach(function(validateWithKey) {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach(function(fieldName) {
          if (
            formDataHelpers.isDirty(this.state[options.formName], fieldName) === true
            || formDataHelpers.isValid(this.state[options.formName], fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  let newFormData = formDataHelpers.validate.apply(null, validateParameters);

  return formDataHelpers.markFieldAsDirty(newFormData, options.fieldName);
};
