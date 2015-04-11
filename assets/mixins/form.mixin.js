var React = require('react/addons');
var _ = require('lodash');

var formMixin = {};

formMixin.resetForm = function formMixinResetForm(formName) {
  //first reset the data
  var initialDataKey = 'initial' + _.capitalize(formName);
  var resetData = {};
  resetData[formName] = this.state[initialDataKey];
  this.setState(resetData);

  //then clear the validation
  var inputs = this.getInputs(formName);

  _.forEach(inputs, function formMixinResetFormRefsLoop(input, key) {
    /* istanbul ignore else */
    if (this.refs[key] && this.refs[key].validator) {
      this.refs[key].validator.reset();

      if (this.refs[key].props.validateOnLoad === true) {
        this.refs[key].validator.validate(this.refs[key].cleanValue(resetData[formName][key]));
      }

      this.refs[key].forceUpdate();
    }
  }.bind(this));
};

formMixin.validateForm = function formMixinValidateForm(formName) {
  var inputs = this.getInputs(formName);

  _.forEach(inputs, function formMixinResetFormInputLoop(input, key) {
    /* istanbul ignore else */
    if (this.refs[key] && this.refs[key].validator) {
      this.refs[key].validator.validate(this.refs[key].cleanValue(this.refs[key].props[input.valueProperty]));
      this.refs[key].forceUpdate();
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

formMixin.getInputs = function formMixinGetInputs(formName) {
  var inputs = this.formInputs[formName];
  var innerInputs = {};

  _.forEach(inputs, function formMixinGetInputsInputsLoop(config, field) {
    if (inputs[field].hasOnChange !== false && !inputs[field].props.onChange) {
      inputs[field].props.onChange = this.onChangeFormInput(formName, field);
    }

    if (!inputs[field].props.ref) {
      inputs[field].props.ref = field;
    }

    var valueProperty = inputs[field].valueProperty || 'value';
    inputs[field].props[valueProperty] = this.state[formName][field];

    innerInputs[field] = {
      valueProperty: valueProperty,
      render: function formMixinGetInputsReturnInputElement() {
        return React.createElement(inputs[field].component, inputs[field].props);
      }
    };
  }.bind(this));

  return innerInputs;
};

module.exports = formMixin;
