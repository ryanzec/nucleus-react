var React = require('react/addons');
var _ = require('lodash');
var validator = require('../misc/validator.jsx');

var validatorMixin = {};

validatorMixin.propTypes = {
  renderValidation: React.PropTypes.oneOf([false, 'both', 'valid', 'invalid']),
  validateOnLoad: React.PropTypes.bool,
  validators: React.PropTypes.array
};

validatorMixin.getDefaultProps = function validatorMixinGetDefaultProps() {
  return {
    renderValidation: false,
    validateOnLoad: false,
    validators: []
  };
};

validatorMixin.componentWillMount = function validatorMixinComponentWillMount() {
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

module.exports = validatorMixin;
