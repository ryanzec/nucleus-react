var React = require('react/addons');
var SvgIcon = require('../components/svg-icon.component.jsx');
var svgPath = '/components/nucleus-icons/svg/svg-sprite.svg';

var validIconFragment = 'checkmark';
var invalidIconFragment = 'x';

var formInputMixin = {};

formInputMixin.propTypes = {
  renderValidation: React.PropTypes.oneOf([false, 'valid', 'invalid', 'both']),
  renderValidationOnLoad: React.PropTypes.bool
};

formInputMixin.getDefaultProps = function formInputMixinGetDefaultProps() {
  return {
    renderValidation: false,
    renderValidationOnLoad: false
  };
};

formInputMixin.componentWillMount = function formInputMixinComponentWillMount() {
  this.initialValue = this.props.value || null;
  this.isValueDirty = false;
};

formInputMixin.shouldRenderValidation = function formInputMixinShouldRenderValidation() {
  return (
    this.props.renderValidation
    && (this.props.renderValidationOnLoad || this.isValueDirty)
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
        svgPath={svgPath}
        fragment={this.state.valid ? validIconFragment : invalidIconFragment} />
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

  if (
    !this.isValueDirty
    && this.initialValue !== value
    //IE 10+ triggers change on focus so this logic below prevents that from triggering validation on on focus
    && (this.initialValue === null && value !== '')
  ) {
    this.isValueDirty = true;
  }

  if (this.props.validate) {
    this.state.valid = this.setState({
      valid: this.props.validate(value)
    });
  }

  if (this.props.onChange) {
    this.props.onChange(value, event);
  }
};

module.exports = formInputMixin;
