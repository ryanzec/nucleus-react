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
  validate: React.PropTypes.func,
  displayPosition: React.PropTypes.oneOf(['right', 'left'])
};

checkboxInput.getDefaultProps = function() {
  return {
    className: null,
    label: null,
    validate: null,
    displayPosition: 'right'
  };
};

checkboxInput.getInitialState = function() {
  return {
    valid: true
  };
};

checkboxInput.getCssClasses = function() {
  var cssClasses = ['form-element'];

  if(this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if(this.shouldRenderValidation()) {
    cssClasses.push(this.state.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

checkboxInput.getInputPassThroughProps = function() {
  var props = _.clone(this.props, true);

  delete props.className;
  delete props.label;
  delete props.renderValidation;
  delete props.renderValidationOnLoad;
  delete props.validate;

  //we provide a custon onChange event handler so we need to remove it from here
  delete props.onChange;

  return props;
};

checkboxInput.renderInput = function() {
  if(this.props.displayPosition === 'right') {
    return (
      <label className="form-element__input-container m-toggle">
        <input
          className="form-element__input m-checkbox m-right"
          type="checkbox"
          onChange={this.onChange}
          {...this.getInputPassThroughProps()} />
        {this.props.label}
      </label>
    );
  } else {
    return (
      <label className="form-element__input-container m-toggle">
        {this.props.label}
        <input
          className="form-element__input m-checkbox m-left"
          type="checkbox"
          onChange={this.onChange}
          {...this.getInputPassThroughProps()} />
      </label>
    );
  }
};

checkboxInput.render = function() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      <div className="form-element__field-container">
        {this.renderInput()}
        {this.renderValidationIcon()}
      </div>
    </div>
  );
};

module.exports = React.createClass(checkboxInput);
