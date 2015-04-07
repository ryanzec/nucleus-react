var _ = require('lodash');

var formMixin = {};

formMixin.resetForm = function formMixinResetForm(formName) {
  //first reset the data
  var initialDataKey = 'initial' + _.capitalize(formName);
  var resetData = {};
  resetData[formName] = this.state[initialDataKey];
  this.setState(resetData);

  //then clear the validation
  var keys = Object.keys(this.getInputs(formName));

  _.forEach(keys, function formMixinResetFormRefsLoop(key) {
    if (this.refs[key] && this.refs[key].clearValidation) {
      this.refs[key].clearValidation();
    }
  }.bind(this));
};

formMixin.validateForm = function formMixinValidateForm(formName) {
  var inputs = this.getInputs(formName);

  _.forEach(inputs, function formMixinResetFormInputLoop(value, key) {
    if (this.refs[key] && this.refs[key].validate) {
      this.refs[key].validate();
    }
  }.bind(this));
};

formMixin.onChangeFormInput = function formMixinOnChangeFormInput(formName, field) {
  return function formMixinOnChangeFormInputGeneratedHandler(value, event) {
    var newData = {};
    newData[formName] = _.clone(this.state[formName]);
    newData[formName][field] = value;
    this.setState(newData);
  }.bind(this);
};

module.exports = formMixin;
