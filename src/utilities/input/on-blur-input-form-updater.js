import {helpers as formDataHelpers} from 'form-data-validation';

export default function onBlurInputStateUpdater(formData, options) {
  let newFormData;
  const validateParameters = [formData, options.fieldName];

  if (options.markFieldsAsDirty) {
    const markFieldsAsDirtyKeys = Object.keys(options.markFieldsAsDirty);

    markFieldsAsDirtyKeys.forEach((markFieldsAsDirtyKey) => {
      if (options.fieldName === markFieldsAsDirtyKey) {
        options.markFieldsAsDirty[markFieldsAsDirtyKey].forEach((fieldName) => {
          newFormData = formDataHelpers.markFieldAsDirty(newFormData, fieldName);
        });
      }
    });
  }

  if (options.validateWith) {
    const validateWithKeys = Object.keys(options.validateWith);

    validateWithKeys.forEach((validateWithKey) => {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach((fieldName) => {
          if (
            formDataHelpers.isDirty(formData, fieldName) === true
            || formDataHelpers.isValid(formData, fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        });
      }
    });
  }

  newFormData = formDataHelpers.validate.apply(null, validateParameters);

  return formDataHelpers.markFieldAsDirty(newFormData, options.fieldName);
}
