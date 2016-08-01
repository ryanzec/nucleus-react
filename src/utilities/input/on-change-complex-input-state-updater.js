import {helpers as formDataHelpers} from 'form-data-validation';

export default function onChangeInputStateUpdater(options) {
  let newFormData = formDataHelpers.set(this.state[options.formName], options.fieldName, options.value, true);
  const validateParameters = [newFormData, options.fieldName];

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
            formDataHelpers.isDirty(this.state[options.formName], fieldName) === true
            || formDataHelpers.isValid(this.state[options.formName], fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        });
      }
    });
  }

  return formDataHelpers.validate.apply(null, validateParameters);
}
