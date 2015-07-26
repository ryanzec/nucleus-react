var React = require('react/addons');
var _ = require('lodash');
var formInputMixin = require('../mixins/form-input.mixin.jsx');

var selectInput = {};

selectInput.displayName = 'SelectInput';

selectInput.mixins = [
  React.addons.PureRenderMixin,
  formInputMixin
];

selectInput.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  emptyOption: React.PropTypes.any,
  options: React.PropTypes.array
};

selectInput.getDefaultProps = function selectInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    emptyOption: 'Select',
    options: []
  };
};

selectInput.getCssClasses = function selectInputGetCssClasses() {
  var cssClasses = ['form-element', 'm-select'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.validator && this.validator.shouldRenderValidation()) {
    cssClasses.push(this.validator.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

selectInput.getInputPassThroughProps = function selectInputGetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.label;
  delete props.emptyOption;
  delete props.options;
  delete props.renderValidation;
  delete props.validateOnLoad;
  delete props.validators;

  //we provide a custon onChange event handler so we need to remove it from here
  delete props.onChange;

  props.value = this.cleanValue(props.value);

  return props;
};

selectInput.cleanValue = function selectInputCleanValue(value) {
  return (value || value === false) ? value : '';
};

selectInput.renderLabel = function selectInputRenderLabel() {
  var label = null;

  if (this.props.label) {
    label = (
      <label>{this.props.label}</label>
    );
  }

  return label;
};

selectInput.renderInput = function selectInputRenderInput() {
  var selectOptions = _.map(this.props.options, function selectInputRenderInputOptionsMap(option) {
    return (
      <option
        value={option.value}
        key={option.value}
      >
        {option.display}
      </option>
    );
  });

  if (this.props.emptyOption !== false) {
    selectOptions.unshift(
      <option
        value=""
        key="empty"
      >
        {this.props.emptyOption}
      </option>
    );
  }

  return (
    <select
      className="form-element__input-container form-element__input m-select"
      onChange={this.onChange}
      {...this.getInputPassThroughProps()}
    >
      {selectOptions}
    </select>
  );
};

selectInput.render = function selectInputRender() {
  var validationIcon = this.validator ? this.validator.renderValidationIcon('form-element__validation-icon') : null;

  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderLabel()}
      <div className="form-element__field-container">
        {this.renderInput()}
        {validationIcon}
      </div>
    </div>
  );
};

module.exports = React.createClass(selectInput);
