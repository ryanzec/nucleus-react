var React = require('react/addons');
var validator = require('../misc/validator.jsx');

var validatorMixin = {};

validatorMixin.propTypes = {
  renderValidation: React.PropTypes.oneOf([false, 'both', 'valid', 'invalid']),
  validateOnLoad: React.PropTypes.bool,
  validators: React.PropTypes.array,
  valueProperty: React.PropTypes.string,
  validatorAllowEmpty: React.PropTypes.bool
};

validatorMixin.getDefaultProps = function validatorMixinGetDefaultProps() {
  return {
    renderValidation: false,
    validateOnLoad: false,
    validators: [],
    validatorAllowEmpty: false
  };
};

validatorMixin.componentWillMount = function validatorMixinComponentWillMount() {
  if (this.props.renderValidation) {
    var validatorConfiguration = {
      renderValidation: this.props.renderValidation,
      validators: this.props.validators,
      allowEmpty: this.props.validatorAllowEmpty
    };

    if (this.props.validateOnLoad === true) {
      validatorConfiguration.validateValueOnCreate = this.getValidationInitialValue ? this.getValidationInitialValue() : this.props.value;
    }

    this.validator = validator.create(validatorConfiguration);
  }
};

module.exports = validatorMixin;
