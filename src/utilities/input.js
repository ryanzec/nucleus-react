import React from 'react';
import isArray from 'lodash/isArray';
import {helpers as formDataHelpers} from 'form-data-validation';

import blockNumberOnlyInput from './helpers/input/block-number-only-input';
import blockNumericOnlyInput from './helpers/input/block-numeric-only-input';

import FormValidationMessage from '../components/form/FormValidationMessage';

export function getInputValueFromEvent(event) {
  let value;

  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    value = event.target.checked;
  } else {
    value = event.target.value;
  }

  return value;
}

export function onBlurInputStateUpdater(formData, options) {
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

export function onChangeInputStateUpdater(formData, options) {
  const markAsDirty = options.markAsDirty === true;
  let newFormData = formDataHelpers.set(formData, options.fieldName, options.value, markAsDirty);
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

export function onKeyDownNumberOnlyInput(event) {
  if (blockNumberOnlyInput(event) === true) {
    event.preventDefault();
  }
}

export function onKeyDownNumericOnlyInput(event) {
  if (blockNumericOnlyInput(event) === true) {
    event.preventDefault();
  }
}

export function parseValidationData(formData, options) {
  let validationData = {
    status: null,
    messageNodes: []
  };
  let skip = false;

  options.fields.forEach((field) => {
    //NOTE: validate all the fields before showing the validation
    if (skip === true || formData.getIn([field, 'isValid']) === null) {
      validationData = {
        status: null,
        messageNodes: []
      };

      skip = true;
      return;
    }

    if (validationData.status !== 'invalid' && formData.getIn([field, 'isValid']) === false) {
      validationData.status = 'invalid';
    }

    if (validationData.status === 'invalid') {
      const validationMessages = formDataHelpers.getValidationMessages(formData, field);

      if (isArray(validationMessages) && validationMessages.length > 0) {
        validationMessages.forEach((validationMessage, key) => {
          validationData.messageNodes.push(
            <FormValidationMessage
              key={key}
              iconFragment="times"
            >
              {validationMessage}
            </FormValidationMessage>
          );
        });
      }
    }
  });

  return validationData;
}
