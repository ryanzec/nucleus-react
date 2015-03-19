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
  multiLined: React.PropTypes.bool,
  append: React.PropTypes.node,
  prepend: React.PropTypes.node,
};

textboxInput.getDefaultProps = function textboxInputGetDefaultProps() {
  return {
    className: null,
    label: null,
    maskValue: false,
    validate: null,
    multiLined: false,
    append: null,
    prepend: null
  };
};

textboxInput.getInitialState = function textboxInputGetInitialState() {
  return {
    valid: true
  };
};

textboxInput.getCssClasses = function textboxInputGetCssClasses() {
  var cssClasses = ['form-element'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.shouldRenderValidation()) {
    cssClasses.push(this.state.valid ? 'm-valid' : 'm-invalid');
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
  delete props.renderValidationOnLoad;
  delete props.validate;

  //we provide a custon onChange event handler so we need to remove it from here
  delete props.onChange;

  return props;
};

textboxInput.onClickPend = function textboxInputOnClickPend() {
  console.log('test');
  this.refs.input.getDOMNode().focus();
};

textboxInput.renderPrepend = function textboxInputRenderPrepend() {
  var prepend = null;

  if (this.props.prepend) {
    prepend = (
      <span className="form-element__input-prepend" onClick={this.onClickPend}>{this.props.prepend}</span>
    );
  }

  return prepend;
};

textboxInput.renderAppend = function textboxInputRenderAppend() {
  var append = null;

  if (this.props.append) {
    append = (
      <span className="form-element__input-append" onClick={this.onClickPend}>{this.props.append}</span>
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
  if (this.props.multiLined) {
    return (
      <textarea
        className="form-element__input-container form-element__input m-textarea"
        onChange={this.onChange}
        {...this.getInputPassThroughProps()} />
    );
  }

  return (
    <input
      ref="input"
      className={this.getInputCssClasses().join(' ')}
      type={this.props.maskValue ? 'password' : 'text'}
      onChange={this.onChange}
      {...this.getInputPassThroughProps()} />
  );
};

textboxInput.render = function textboxInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderLabel()}
      <div className="form-element__field-container">
        {this.renderPrepend()}
        {this.renderInput()}
        {this.renderAppend()}
        {this.renderValidationIcon()}
      </div>
    </div>
  );
};

module.exports = React.createClass(textboxInput);
