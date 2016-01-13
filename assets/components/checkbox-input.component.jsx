var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var _ = require('lodash');
var SvgIcon = require('./svg-icon.component.jsx');

var checkboxInput = {};

checkboxInput.displayName = 'CheckboxInput';

checkboxInput.mixins = [
  ReactPureRenderMixin
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
  var cssClasses = ['form-element__field-container'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

checkboxInput.getInputPassThroughProps = function checkboxInputgetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;

  props.checked = this.cleanValue(props.value);

  delete props.value;

  return props;
};

checkboxInput.cleanValue = function checkboxInputCleanValue(value) {
  return value || false;
};

checkboxInput.renderInput = function checkboxInputRenderInput() {
  var icon = null;
  var iconProperties = {
    fragment: 'checkbox-empty',
    outerClassName: 'm-left'
  };

  if (this.props.value === true) {
    iconProperties.fragment = 'checkbox-checked';
  }

  if (this.props.displayPosition === 'right') {
    iconProperties.outerClassName = 'm-right';
    icon = React.createElement(SvgIcon, iconProperties);

    return (
      <label className="form-element__input-container m-toggle">
        <input
          className="form-element__input m-checkbox m-right"
          type="checkbox"
          {...this.getInputPassThroughProps()}
        />
        {icon}
        {this.props.label}
      </label>
    );
  }

  icon = React.createElement(SvgIcon, iconProperties);

  return (
    <label className="form-element__input-container m-toggle">
      {this.props.label}
      {icon}
      <input
        className="form-element__input m-checkbox m-left"
        type="checkbox"
        {...this.getInputPassThroughProps()}
      />
    </label>
  );
};

checkboxInput.render = function checkboxInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInput()}
    </div>
  );
};

module.exports = React.createClass(checkboxInput);
