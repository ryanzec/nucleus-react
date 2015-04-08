var React = require('react/addons');
var _ = require('lodash');
var SvgIcon = require('../components/svg-icon.component.jsx');

var validIconFragment = 'checkmark';
var invalidIconFragment = 'x';

var formInputMixin = {};

formInputMixin.propTypes = {
  renderValidation: React.PropTypes.oneOf([false, 'valid', 'invalid', 'both']),
  renderValidationOnLoad: React.PropTypes.bool,
  validate: React.PropTypes.any,
};

formInputMixin.getDefaultProps = function formInputMixinGetDefaultProps() {
  return {
    renderValidation: false,
    renderValidationOnLoad: false,
    validate: []
  };
};

formInputMixin.getInitialState = function formInputMixinGetInitialState() {
  var initialValue = _.isBoolean(this.props.value) || this.props.value ? this.props.value : null;

  return {
    initialValue: initialValue,
    valid: true,
    isValidationActive: false,
    validationErrors: []
  };
};

formInputMixin.componentDidMount = function formInputMixinComponentDidMount() {
  if (this.props.renderValidationOnLoad) {
    this.validate();
  }
};

formInputMixin.shouldRenderValidation = function formInputMixinShouldRenderValidation() {
  return (
    this.props.renderValidation
    && (this.props.renderValidationOnLoad || this.state.isValidationActive)
    && (
      (this.state.valid && this.props.renderValidation !== 'invalid')
      || (!this.state.valid && this.props.renderValidation !== 'valid')
    )
  );
};

formInputMixin.renderValidationIcon = function formInputMixinRenderValidationIcon() {
  var validationIcon = null;

  if (this.shouldRenderValidation()) {
    validationIcon = (
      <SvgIcon
        className="form-element__validation-icon"
        fragment={this.state.valid ? validIconFragment : invalidIconFragment}
      />
    );
  }

  return validationIcon;
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
  if (
    !this.state.isValidationActive
    && this.state.initialValue !== value
    //IE 10+ triggers change on focus so this logic below prevents that from triggering validation on on focus
    && (this.state.initialValue === null && value !== '')
  ) {
    this.isValidationActive = true;
  }

  this.validate(value, false);

  if (this.props.onChange) {
    this.props.onChange(value);
  }
};

formInputMixin.validate = function formInputMixinValidate(value, activateValidation) {
  activateValidation = _.isBoolean(activateValidation) ? activateValidation : true;
  var defaultValue = /*this.props.checked || */this.props.value;
  value = value !== undefined ? value : defaultValue;
  var newState = {
    isValidationActive: true,
    validationErrors: [],
    valid: true
  };

  var validators = _.isArray(this.props.validate) ? this.props.validate : [{
    validator: this.props.validate
  }];

  if (validators.length > 0) {
    validators.forEach(function(validator) {
      if (validator.validator(this.cleanValue(value)) !== true) {
        newState.valid = false;

        if (validator.message) {
          newState.validationErrors.push(validator.message.replace('%%value%%', this.cleanValue(value)));
        }
      }
    }.bind(this));
  }

  this.setState(newState);
};

formInputMixin.clearValidation = function formInputMixinClearValidation() {
  this.setState({
    isValidationActive: false
  });
};

module.exports = formInputMixin;
