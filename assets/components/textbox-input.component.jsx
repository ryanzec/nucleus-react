var React = require('react/addons');
var _ = require('lodash');
var formInputMixin = require('../mixins/form-input.mixin.jsx');

var textboxInput = {};

textboxInput.displayName = 'TextboxInput';

textboxInput.mixins = [
  React.addons.PureRenderMixin,
  formInputMixin
];

textboxInput.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  maskValue: React.PropTypes.bool,
  validate: React.PropTypes.func,
  multiLined: React.PropTypes.bool
};

textboxInput.getDefaultProps = function() {
  return {
    className: null,
    label: null,
    maskValue: false,
    validate: null,
    multiLined: false
  };
};

textboxInput.getInitialState = function() {
  return {
    valid: true
  };
};

textboxInput.getCssClasses = function() {
  var cssClasses = ['form-element'];

  if(this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if(this.shouldRenderValidation()) {
    cssClasses.push(this.state.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

textboxInput.getInputPassThroughProps = function() {
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

textboxInput.renderLabel = function() {
  var label = null;

  if(this.props.label) {
    label = (
      <label>{this.props.label}</label>
    );
  }

  return label;
};

textboxInput.renderInput = function() {
  if(this.props.multiLined) {
    return (
      <textarea
        className="form-element__input-container form-element__input m-textarea"
        onChange={this.onChange}
        {...this.getInputPassThroughProps()} />
    );
  } else {
    return (
      <input
        className="form-element__input-container form-element__input m-text"
        type={this.props.maskValue ? 'password' : 'text'}
        onChange={this.onChange}
        {...this.getInputPassThroughProps()} />
    );
  }
};

textboxInput.render = function() {
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

module.exports = React.createClass(textboxInput);
