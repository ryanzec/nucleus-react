import React from 'react';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import onChangeInputFormUpdater from '../../../../../src/utilities/input/on-change-input-form-updater';

describe('on change input state updater', function() {
  it('should set value and not mark as dirty or validate', function() {
    const form = formDataFactory({
      fields: {
        username: {}
      }
    });

    expect(form.getIn(['username', 'value'])).to.equal('');
    expect(form.getIn(['username', 'isDirty'])).to.be.false;
    expect(form.getIn(['username', 'isValid'])).to.be.null;

    const newFormData = onChangeInputFormUpdater(form, {
      fieldName: 'username',
      value: 'test'
    });

    expect(newFormData.getIn(['username', 'value'])).to.equal('test');
    expect(newFormData.getIn(['username', 'isDirty'])).to.be.false;
    expect(newFormData.getIn(['username', 'isValid'])).to.be.null;
  });

  it('should set value, mark as dirty, and validate is markAsDirty flag is set', function() {
    const form = formDataFactory({
      fields: {
        username: {}
      }
    });

    expect(form.getIn(['username', 'value'])).to.equal('');
    expect(form.getIn(['username', 'isDirty'])).to.be.false;
    expect(form.getIn(['username', 'isValid'])).to.be.null;

    const newFormData = onChangeInputFormUpdater(form, {
      fieldName: 'username',
      markAsDirty: true,
      value: 'test'
    });

    expect(newFormData.getIn(['username', 'value'])).to.equal('test');
    expect(newFormData.getIn(['username', 'isDirty'])).to.be.true;
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

    const newFormData = onChangeInputFormUpdater(form, {
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
    let form = formDataFactory({
      fields: {
        username: {},
        password: {}
      }
    });

    expect(form.getIn(['username', 'isValid'])).to.be.null;
    expect(form.getIn(['password', 'isValid'])).to.be.null;

    form = formDataHelpers.markFieldAsDirty(form, 'password');

    const newFormData = onChangeInputFormUpdater(form, {
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
    let form = formDataFactory({
      fields: {
        username: {},
        password: {}
      }
    });

    expect(form.getIn(['username', 'isValid'])).to.be.null;
    expect(form.getIn(['password', 'isValid'])).to.be.null;

    form = form.setIn(['password', 'isValid'], false);

    const newFormData = onChangeInputFormUpdater(form, {
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
