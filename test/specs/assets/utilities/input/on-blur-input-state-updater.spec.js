import React from 'react';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import onBlurInputStateUpdater from '../../../../../assets/utilities/input/on-blur-input-state-updater';

describe('on blur input state updater', function() {
  it('should validate the form field', function() {
    let mockedObject = {
      state: {
        form: formDataFactory({
          fields: {
            username: {}
          }
        })
      }
    };
    let onBlurInputStateUpdaterInstance = onBlurInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;

    var newFormData = onBlurInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
  });

  it('should not validate extra fields defined with validateWith property is not dirty and has not been validated before', function() {
    let mockedObject = {
      state: {
        form: formDataFactory({
          fields: {
            username: {},
            password: {}
          }
        })
      }
    };
    let onBlurInputStateUpdaterInstance = onBlurInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;
    expect(mockedObject.state.form.getIn(['password', 'isValid'])).to.be.null;

    var newFormData = onBlurInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.null;
  });

  it('should validate extra fields defined with validateWith property if is dirty', function() {
    let mockedObject = {
      state: {
        form: formDataFactory({
          fields: {
            username: {},
            password: {}
          }
        })
      }
    };
    let onBlurInputStateUpdaterInstance = onBlurInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;
    expect(mockedObject.state.form.getIn(['password', 'isValid'])).to.be.null;

    mockedObject.state.form = formDataHelpers.markFieldAsDirty(mockedObject.state.form, 'password');

    var newFormData = onBlurInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.true;
  });

  it('should validate extra fields defined with validateWith property if has been validated before', function() {
    let mockedObject = {
      state: {
        form: formDataFactory({
          fields: {
            username: {},
            password: {}
          }
        })
      }
    };
    let onBlurInputStateUpdaterInstance = onBlurInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;
    expect(mockedObject.state.form.getIn(['password', 'isValid'])).to.be.null;

    mockedObject.state.form = mockedObject.state.form.setIn(['password', 'isValid'], false);

    var newFormData = onBlurInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.true;
  });
});
