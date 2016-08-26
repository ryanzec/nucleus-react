import React from 'react';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import onBlurInputFormUpdater from '../../../../../src/utilities/input/on-blur-input-form-updater';

describe('on blur input state updater', function() {
  it('should validate the form field', function() {
    const form = formDataFactory({
      fields: {
        username: {}
      }
    });

    expect(form.getIn(['username', 'isValid'])).to.be.null;

    const newFormData = onBlurInputFormUpdater(form, {
      fieldName: 'username',
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
  });

  it('should not validate extra fields defined with validateWith property is not dirty and has not been validated before', function() {
    const form = formDataFactory({
      fields: {
        username: {},
        password: {}
      }
    });

    expect(form.getIn(['username', 'isValid'])).to.be.null;
    expect(form.getIn(['password', 'isValid'])).to.be.null;

    const newFormData = onBlurInputFormUpdater(form, {
      fieldName: 'username',
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.null;
  });

  it('should validate extra fields defined with validateWith property if is dirty', function() {
    let form = formDataFactory({
      fields: {
        username: {},
        password: {}
      }
    });

    expect(form.getIn(['username', 'isValid'])).to.be.null;
    expect(form.getIn(['password', 'isValid'])).to.be.null;

    form = formDataHelpers.markFieldAsDirty(form, 'password');

    const newFormData = onBlurInputFormUpdater(form, {
      fieldName: 'username',
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.true;
  });

  it('should validate extra fields defined with validateWith property if has been validated before', function() {
    let form = formDataFactory({
      fields: {
        username: {},
        password: {}
      }
    });

    expect(form.getIn(['username', 'isValid'])).to.be.null;
    expect(form.getIn(['password', 'isValid'])).to.be.null;

    form = form.setIn(['password', 'isValid'], false);

    const newFormData = onBlurInputFormUpdater(form, {
      fieldName: 'username',
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.true;
  });
});
