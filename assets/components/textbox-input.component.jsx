var React = require('react/addons');
var _ = require('lodash');
var formInputMixin = require('../mixins/form-input.mixin.jsx');
var InputAutoSizer = require('./input-auto-sizer.component.jsx');

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
  multiLined: React.PropTypes.bool,
  append: React.PropTypes.node,
  prepend: React.PropTypes.node,
  autoSize: React.PropTypes.bool
};

textboxInput.getDefaultProps = function textboxInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    maskValue: false,
    multiLined: false,
    append: null,
    prepend: null,
    autoSize: false
  };
};

textboxInput.getCssClasses = function textboxInputGetCssClasses() {
  var cssClasses = ['form-element', 'm-text'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.validator && this.validator.shouldRenderValidation()) {
    cssClasses.push(this.validator.valid ? 'm-valid' : 'm-invalid');
  }

  return cssClasses;
};

textboxInput.getInputCssClasses = function textboxInputGetInputCssClasses() {
  var cssClasses = ['form-element__input-container', 'form-element__input', 'm-text'];

  if (this.props.prepend) {
    cssClasses.push('m-has-prepend');
  }

  if (this.props.append) {
    cssClasses.push('m-has-append');
  }

  return cssClasses;
};

textboxInput.getInputPassThroughProps = function textboxInputGetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.label;
  delete props.renderValidation;
  delete props.validateOnLoad;
  delete props.validators;

  //we provide a custon onChange event handler so we need to remove it from here
  delete props.onChange;

  props.value = this.cleanValue(props.value);

  return props;
};

textboxInput.cleanValue = function textboxInputCleanValue(value) {
  return value || '';
};

textboxInput.onClickPend = function textboxInputOnClickPend() {
  //NOTE: append/prepend only work for regular inputs so no need to check for refs.input.refs.input
  this.refs.input.getDOMNode().focus();
};

textboxInput.renderPrepend = function textboxInputRenderPrepend() {
  var prepend = null;

  if (this.props.prepend) {
    prepend = (
      <span
        className="form-element__input-prepend"
        onClick={this.onClickPend}
      >
        {this.props.prepend}
      </span>
    );
  }

  return prepend;
};

textboxInput.renderAppend = function textboxInputRenderAppend() {
  var append = null;

  if (this.props.append) {
    append = (
      <span
        className="form-element__input-append"
        onClick={this.onClickPend}
      >
        {this.props.append}
      </span>
    );
  }

  return append;
};

textboxInput.renderLabel = function textboxInputRenderLabel() {
  var label = null;

  if (this.props.label) {
    label = (
      <label>{this.props.label}</label>
    );
  }

  return label;
};

textboxInput.renderInput = function textboxInputRenderInput() {
  var type = this.props.maskValue ? 'password' : 'text';

  if (this.props.multiLined) {
    return (
      <textarea
        className="form-element__input-container form-element__input m-textarea"
        onChange={this.onChange}
        {...this.getInputPassThroughProps()}
      />
    );
  } else if (this.props.autoSize) {
    return (
      <InputAutoSizer
        ref="input"
        type={type}
        inputClassName={this.getInputCssClasses().join(' ')}
        onChange={this.onChange}
        {...this.getInputPassThroughProps()}
      />
    );
  }

  return (
    <input
      ref="input"
      className={this.getInputCssClasses().join(' ')}
      type={type}
      onChange={this.onChange}
      {...this.getInputPassThroughProps()}
    />
  );
};

textboxInput.render = function textboxInputRender() {
  var validationIcon = this.validator ? this.validator.renderValidationIcon('form-element__validation-icon') : null;

  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderLabel()}
      <div className="form-element__field-container">
        {this.renderPrepend()}
        {this.renderInput()}
        {this.renderAppend()}
        {validationIcon}
      </div>
    </div>
  );
};

module.exports = React.createClass(textboxInput);
