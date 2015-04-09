var React = require('react/addons');
var _ = require('lodash');
var validator = require('../misc/validator.jsx');

var formInputMixin = {};

formInputMixin.propTypes = {
  renderValidation: React.PropTypes.oneOf([false, 'both', 'valid', 'invalid']),
  validateOnLoad: React.PropTypes.bool,
  validators: React.PropTypes.array
};

formInputMixin.getDefaultProps = function formInputMixinGetDefaultProps() {
  return {
    renderValidation: false,
    validateOnLoad: false,
    validators: []
  };
};

formInputMixin.componentWillMount = function formInputMixinComponentWillMount() {
  if (this.props.renderValidation) {
    var validatorConfiguration = {
      renderValidation: this.props.renderValidation,
      validators: this.props.validators
    };

    if (this.props.validateOnLoad === true) {
      validatorConfiguration.validateValueOnCreate = this.props.value;
    }

    this.validator = validator.create(validatorConfiguration);
  }
};

formInputMixin.componentDidMount = function formInputMixinComponentDidMount() {
  this.initialValue = _.isBoolean(this.props.value) || this.props.value ? this.props.value : null;
};

formInputMixin.onChange = function formInputMixinOnChange(event) {
  var value;

  if (this.constructor.displayName === 'CheckboxInput') {
    value = event.target.checked;
  } else {
    value = event.target.value;
  }

  this.changeValue(value);
};

formInputMixin.changeValue = function formInputMixinChangeValue(value) {
  if (this.validator && this.cleanValue(this.initialValue) !== this.cleanValue(value)) {
    this.validator.validate(this.cleanValue(value));
  }

  /* istanbul ignore else */
  if (this.props.onChange) {
    this.props.onChange(value);
  }
};

module.exports = formInputMixin;
