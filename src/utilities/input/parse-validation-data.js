import React from 'react';
import isArray from 'lodash/isArray';
import {helpers as formDataHelpers} from 'form-data-validation';
import FormValidationMessage from '../../components/form-validation-message';

export default function parseValidationData(formData, options) {
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
