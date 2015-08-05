var React = require('react/addons');
var _ = require('lodash');
var formInputMixin = require('../mixins/form-input.mixin.jsx');
var SvgIcon = require('./svg-icon.component.jsx');

var radioInput = {};

radioInput.displayName = 'RadioInput';

radioInput.mixins = [
  React.addons.PureRenderMixin,
  formInputMixin
];

radioInput.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  options: React.PropTypes.array.isRequired
};

radioInput.getDefaultProps = function radioInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    options: []
  };
};

radioInput.getCssClasses = function radioInputGetCssClasses() {
  var cssClasses = ['form-element', 'm-radio'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.validator && this.validator.shouldRenderValidation()) {
    cssClasses.push(this.validator.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

radioInput.cleanValue = function radioInputCleanValue(value) {
  return value;
};

radioInput.renderLabel = function radioInputRenderLabel() {
  var label = null;

  if (this.props.label) {
    label = (
      <label>{this.props.label}</label>
    );
  }

  return label;
};

radioInput.renderInput = function radioInputRenderInput() {
  var options = _.map(this.props.options, function radioInputRenderInputOptionsMap(option) {
    var checked = this.props.value === option.value;
    var icon = null;
    var iconProperties = {
      fragment: 'radio-empty',
      outerClassName: 'm-right'
    };

    if (checked === true) {
      iconProperties.fragment = 'radio-checked';
    }

    if (option.displayPosition === 'left') {
      iconProperties.outerClassName = 'm-left';
      icon = React.createElement(SvgIcon, iconProperties);

      return (
        <label
          className="m-toggle"
          key={option.value}
        >
          {option.display}{icon}<input
            className="form-element__input m-radio m-left"
            type="radio"
            checked={checked}
            value={option.value}
            name={this.props.name}
            onChange={this.onChange}
          />
        </label>
      );
    }

    icon = React.createElement(SvgIcon, iconProperties);

    return (
      <label
        className="m-toggle"
        key={option.value}
      >
        {icon}<input
          className="form-element__input m-radio m-right"
          type="radio"
          value={option.value}
          checked={checked}
          name={this.props.name}
          onChange={this.onChange}
        />
        {option.display}
      </label>
    );
  }.bind(this));

  return (
    <div className="form-element__radio-group">
      {options}
    </div>
  );
};

radioInput.render = function radioInputRender() {
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

module.exports = React.createClass(radioInput);
