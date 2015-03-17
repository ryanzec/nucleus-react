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
  validate: React.PropTypes.func,
  emptyOption: React.PropTypes.any,
  options: React.PropTypes.array
};

selectInput.getDefaultProps = function selectInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    validate: null,
    emptyOption: 'Select',
    options: []
  };
};

selectInput.getInitialState = function selectInputGetInitialState() {
  return {
    valid: true
  };
};

selectInput.getCssClasses = function selectInputGetCssClasses() {
  var cssClasses = ['form-element'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.shouldRenderValidation()) {
    cssClasses.push(this.state.valid ? 'm-valid' : 'm-invalid');
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
  delete props.renderValidationOnLoad;
  delete props.validate;

  //we provide a custon onChange event handler so we need to remove it from here
  delete props.onChange;

  return props;
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
      <option value={option.value} key={option.value}>{option.display}</option>
    );
  });

  if (this.props.emptyOption !== false) {
    selectOptions.unshift(
      <option value="" key="empty">{this.props.emptyOption}</option>
    );
  }

  return (
    <select
      className="form-element__input-container form-element__input m-select"
      onChange={this.onChange}
      {...this.getInputPassThroughProps()}>
      {selectOptions}
    </select>
  );
};

selectInput.render = function selectInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderLabel()}
      <div className="form-element__field-container">
        {this.renderInput()}
        {this.renderValidationIcon()}
      </div>
    </div>
  );
};

module.exports = React.createClass(selectInput);
