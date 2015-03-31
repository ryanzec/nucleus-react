var _ = require('lodash');

var formMixin = {};

formMixin.resetForm = function formMixinResetForm(formName) {
  //first reset the data
  var initialDataKey = 'initial' + _.capitalize(formName);
  var resetData = {};
  resetData[formName] = this.state[initialDataKey];
  this.setState(resetData);

  //then clear the validation
  var keys = Object.keys(this.getInputs());

  _.forEach(keys, function(key) {
    if (this.refs[key] && this.refs[key].clearValidation) {
      this.refs[key].clearValidation();
    }
  }.bind(this));
};

formMixin.validateForm = function formMixinValidateForm() {
  var inputs = this.getInputs();

  _.forEach(inputs, function formMixinResetFormInputLoop(value, key) {
    if (this.refs[key].validate) {
      this.refs[key].validate();
    }
  }.bind(this));
};

formMixin.onChangeFormInput = function formMixinOnChangeFormInput(formName, field) {
  return function(value, event) {
    var formData = _.clone(this.state.test);
    formData[field] = value;

    this.setState({
      test: formData
    });
  }.bind(this);
};

module.exports = formMixin;
