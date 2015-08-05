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
    var renderIcon = true;

    if (this.constructor.displayName === 'CheckboxInput' || this.constructor.displayName === 'RadioInput') {
      renderIcon = false;
    }

    var validatorConfiguration = {
      renderValidation: this.props.renderValidation,
      validators: this.props.validators,
      allowEmpty: this.props.validatorAllowEmpty,
      renderIcon: renderIcon
    };

    if (this.props.validateOnLoad === true) {
      validatorConfiguration.validateValueOnCreate = this.getValidationInitialValue ? this.getValidationInitialValue() : this.props.value;

      //NOTE: makes sure validation happen initially on uninitialize form elements
      if (!validatorConfiguration.validateValueOnCreate) {
        validatorConfiguration.validateValueOnCreate = '';
      }
    }

    this.validator = validator.create(validatorConfiguration);
  }
};

module.exports = validatorMixin;
