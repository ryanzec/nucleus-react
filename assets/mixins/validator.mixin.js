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
  var renderIcon = true;

  if (this.constructor.displayName === 'CheckboxInput' || this.constructor.displayName === 'RadioInput') {
    renderIcon = false;
  }

  var validatorConfiguration = {
    isActive: this.props.renderValidation ? true : false,
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
};

validatorMixin.componentDidUpdate = function validatorMixinComponentDidUpdate(previousProps, previousState) {
  if (
    this.validator
    && (
      this.props.renderValidation !== previousProps.renderValidation
      || this.props.validators !== previousProps.validators
      || this.props.validatorAllowEmpty !== previousProps.validatorAllowEmpty
    )
  ) {
    this.validator.updateOptions({
      isActive: this.props.renderValidation ? true : false,
      renderValidation: this.props.renderValidation,
      validators: this.props.validators,
      allowEmpty: this.props.validatorAllowEmpty
    });

    if (this.validator.validationHasHappened === true) {
      this.validator.validate(this.validator.lastValidatedValue);
    }

    this.forceUpdate();
  }
};

module.exports = validatorMixin;
