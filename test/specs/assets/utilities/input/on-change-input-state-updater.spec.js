import React from 'react';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import onChangeInputStateUpdater from '../../../../../assets/utilities/input/on-change-input-state-updater';

describe('on change input state updater', function() {
  it('should set value and not mark as dirty or validate', function() {
    let mockedObject = {
      state: {
        form: formDataFactory({
          fields: {
            username: {}
          }
        })
      }
    };
    let onChangeInputStateUpdaterInstance = onChangeInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'value'])).to.equal('');
    expect(mockedObject.state.form.getIn(['username', 'isDirty'])).to.be.false;
    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;

    var newFormData = onChangeInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      value: 'test'
    });

    expect(newFormData.getIn(['username', 'value'])).to.equal('test');
    expect(newFormData.getIn(['username', 'isDirty'])).to.be.false;
    expect(newFormData.getIn(['username', 'isValid'])).to.be.null;
  });

  it('should set value, mark as dirty, and validate is markAsDirty flag is set', function() {
    let mockedObject = {
      state: {
        form: formDataFactory({
          fields: {
            username: {}
          }
        })
      }
    };
    let onChangeInputStateUpdaterInstance = onChangeInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'value'])).to.equal('');
    expect(mockedObject.state.form.getIn(['username', 'isDirty'])).to.be.false;
    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;

    var newFormData = onChangeInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      markAsDirty: true,
      value: 'test'
    });

    expect(newFormData.getIn(['username', 'value'])).to.equal('test');
    expect(newFormData.getIn(['username', 'isDirty'])).to.be.true;
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
    let onChangeInputStateUpdaterInstance = onChangeInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;
    expect(mockedObject.state.form.getIn(['password', 'isValid'])).to.be.null;

    var newFormData = onChangeInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      value: 'test',
      markAsDirty: true,
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
    let onChangeInputStateUpdaterInstance = onChangeInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;
    expect(mockedObject.state.form.getIn(['password', 'isValid'])).to.be.null;

    mockedObject.state.form = formDataHelpers.markFieldAsDirty(mockedObject.state.form, 'password');

    var newFormData = onChangeInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      value: 'test',
      markAsDirty: true,
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
    let onChangeInputStateUpdaterInstance = onChangeInputStateUpdater.bind(mockedObject);

    expect(mockedObject.state.form.getIn(['username', 'isValid'])).to.be.null;
    expect(mockedObject.state.form.getIn(['password', 'isValid'])).to.be.null;

    mockedObject.state.form = mockedObject.state.form.setIn(['password', 'isValid'], false);

    var newFormData = onChangeInputStateUpdaterInstance({
      formName: 'form',
      fieldName: 'username',
      value: 'test',
      markAsDirty: true,
      validateWith: {
        username: ['password']
      }
    });

    expect(newFormData.getIn(['username', 'isValid'])).to.be.true;
    expect(newFormData.getIn(['password', 'isValid'])).to.be.true;
  });
});
