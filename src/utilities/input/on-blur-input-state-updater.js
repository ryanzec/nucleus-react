import {helpers as formDataHelpers} from 'form-data-validation';

export default function onBlurInputStateUpdater(options) {
  const validateParameters = [this.state[options.formName], options.fieldName];

  if (options.validateWith) {
    const validateWithKeys = Object.keys(options.validateWith);

    validateWithKeys.forEach((validateWithKey) => {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach((fieldName) => {
          if (
            formDataHelpers.isDirty(this.state[options.formName], fieldName) === true
            || formDataHelpers.isValid(this.state[options.formName], fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        });
      }
    });
  }

  const newFormData = formDataHelpers.validate.apply(null, validateParameters);

  return formDataHelpers.markFieldAsDirty(newFormData, options.fieldName);
}
