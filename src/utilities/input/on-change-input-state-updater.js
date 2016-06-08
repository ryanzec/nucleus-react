import {helpers as formDataHelpers} from 'form-data-validation';

export default function onChangeInputStateUpdater(options) {
  let markAsDirty = options.markAsDirty === true;
  let newFormData = formDataHelpers.set(this.state[options.formName], options.fieldName, options.value, markAsDirty);
  let validateParameters = [newFormData, options.fieldName];

  if (options.validateWith) {
    let validatWithKeys = Object.keys(options.validateWith);

    validatWithKeys.forEach(function(validateWithKey) {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach(function(fieldName) {
          if (
            formDataHelpers.isDirty(newFormData, fieldName) === true
            || formDataHelpers.isValid(newFormData, fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  if (
    formDataHelpers.isDirty(newFormData, options.fieldName)
    || formDataHelpers.hasBeenValidated(newFormData, options.fieldName) === true
  ) {
    newFormData = formDataHelpers.validate.apply(null, validateParameters);
  }

  return newFormData;
};
