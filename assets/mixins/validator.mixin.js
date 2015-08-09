var React = require('react/addons');
var validator = require('../misc/validator');

var validatorMixin = {};

validatorMixin.propTypes = {
  renderValidation: React.PropTypes.oneOf([false, 'both', 'valid', 'invalid']),
  validateOnLoad: React.PropTypes.bool,
  validators: React.PropTypes.array,
  valueProperty: React.PropTypes.string,
  validatorAllowEmpty: React.PropTypes.bool,
  renderValidationMessages: React.PropTypes.bool
};

validatorMixin.getDefaultProps = function validatorMixinGetDefaultProps() {
  return {
    renderValidation: false,
    validateOnLoad: false,
    validators: [],
    validatorAllowEmpty: false,
    renderValidationMessages: true
  };
};

validatorMixin.componentWillMount = function validatorMixinComponentWillMount() {
  var validatorConfiguration = {
    isActive: this.props.renderValidation ? true : false,
    renderValidation: this.props.renderValidation,
    validators: this.props.validators,
    allowEmpty: this.props.validatorAllowEmpty,
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

validatorMixin.getFormValidationMessages = function validatorMixinGetValidationMessages() {
  var messages = [];

  if (this.props.renderValidationMessages === true && this.validator.validationErrors && this.validator.validationErrors.length > 0) {
    this.validator.validationErrors.forEach(function(validationError) {
      messages.push({
        message: validationError
      });
    })
  }

  return messages;
};

module.exports = validatorMixin;
