import {helpers as formDataHelpers} from 'form-data-validation';

export default function onChangeInputStateUpdater(options) {
  const markAsDirty = options.markAsDirty === true;
  let newFormData = formDataHelpers.set(this.state[options.formName], options.fieldName, options.value, markAsDirty);
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
    const validatWithKeys = Object.keys(options.validateWith);

    validatWithKeys.forEach((validateWithKey) => {
      if (options.fieldName === validateWithKey) {
        options.validateWith[validateWithKey].forEach((fieldName) => {
          if (
            formDataHelpers.isDirty(newFormData, fieldName) === true
            || formDataHelpers.isValid(newFormData, fieldName) !== null
          ) {
            validateParameters.push(fieldName);
          }
        });
      }
    });
  }

  if (
    formDataHelpers.isDirty(newFormData, options.fieldName)
    || formDataHelpers.hasBeenValidated(newFormData, options.fieldName) === true
  ) {
    newFormData = formDataHelpers.validate.apply(null, validateParameters);
  }

  return newFormData;
}
