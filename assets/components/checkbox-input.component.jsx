var React = require('react/addons');
var _ = require('lodash');
var formInputMixin = require('../mixins/form-input.mixin.jsx');

var checkboxInput = {};

checkboxInput.displayName = 'CheckboxInput';

checkboxInput.mixins = [
  React.addons.PureRenderMixin,
  formInputMixin
];

checkboxInput.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  displayPosition: React.PropTypes.oneOf(['right', 'left'])
};

checkboxInput.getDefaultProps = function checkboxInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    displayPosition: 'right'
  };
};

checkboxInput.getCssClasses = function checkboxInputGetCssClasses() {
  var cssClasses = ['form-element'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.validator && this.validator.shouldRenderValidation()) {
    cssClasses.push(this.validator.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

checkboxInput.getInputPassThroughProps = function checkboxInputgetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.label;
  delete props.renderValidation;
  delete props.validateOnLoad;
  delete props.validators;

  //we provide a custon onChange event handler so we need to remove it from here
  delete props.onChange;

  props.checked = this.cleanValue(props.value);
  delete props.value;

  return props;
};

checkboxInput.cleanValue = function checkboxInputCleanValue(value) {
  return value || false;
};

checkboxInput.renderInput = function checkboxInputRenderInput() {
  if (this.props.displayPosition === 'right') {
    return (
      <label className="form-element__input-container m-toggle">
        <input
          className="form-element__input m-checkbox m-right"
          type="checkbox"
          onChange={this.onChange}
          {...this.getInputPassThroughProps()}
        />
        {this.props.label}
      </label>
    );
  }

  return (
    <label className="form-element__input-container m-toggle">
      {this.props.label}
      <input
        className="form-element__input m-checkbox m-left"
        type="checkbox"
        onChange={this.onChange}
        {...this.getInputPassThroughProps()}
      />
    </label>
  );
};

checkboxInput.render = function checkboxInputRender() {
  var validationIcon = this.validator ? this.validator.renderValidationIcon() : null;

  return (
    <div className={this.getCssClasses().join(' ')}>
      <div className="form-element__field-container">
        {this.renderInput()}
        {validationIcon}
      </div>
    </div>
  );
};

module.exports = React.createClass(checkboxInput);
