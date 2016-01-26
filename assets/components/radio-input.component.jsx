var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var _ = require('lodash');
var SvgIcon = require('./svg-icon.component.jsx');

var radioInput = {};

radioInput.displayName = 'RadioInput';

radioInput.mixins = [
  ReactPureRenderMixin
];

radioInput.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.any,
  radioValue: React.PropTypes.any.isRequired,
  label: React.PropTypes.node,
  labelPosition: React.PropTypes.oneOf(['left', 'right'])
};

radioInput.getDefaultProps = function radioInputGetDefaultProps() {
  return {
    className: null,
    value: null,
    radioValue: null,
    label: null,
    labelPosition: 'right'
  };
};

radioInput.getInputPassThroughProps = function() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.label;
  delete props.labelPosition;
  delete props.value;

  return props;
};

radioInput.getCssClasses = function radioInputGetCssClasses() {
  var cssClasses = ['form-element__field-container'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

radioInput.renderInput = function radioInputRenderInput() {
  var checked = this.props.value === this.props.radioValue;
  var icon = null;
  var iconProperties = {
    fragment: 'radio-empty',
    outerClassName: 'm-right'
  };

  if (checked === true) {
    iconProperties.fragment = 'radio-checked';
  }

  if (this.props.labelPosition === 'left') {
    iconProperties.outerClassName = 'm-left';
    icon = React.createElement(SvgIcon, iconProperties);

    return (
      <label
        className="m-toggle"
        key={this.props.radioValue}
      >
        {this.props.label}{icon}<input
          className="form-element__input m-radio m-left"
          type="radio"
          checked={checked}
          value={this.props.radioValue}
          {...this.getInputPassThroughProps()}
        />
      </label>
    );
  }

  icon = React.createElement(SvgIcon, iconProperties);

  return (
    <label
      className="m-toggle"
      key={this.props.radioValue}
    >
      {icon}<input
        className="form-element__input m-radio m-right"
        type="radio"
        value={this.props.radioValue}
        checked={checked}
        {...this.getInputPassThroughProps()}
      />
      {this.props.label}
    </label>
  );
};

radioInput.render = function radioInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInput()}
    </div>
  );
};

module.exports = React.createClass(radioInput);
