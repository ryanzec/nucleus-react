var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var InputAutoSizer = require('./input-auto-sizer.component.jsx');

var textboxInput = {};

textboxInput.displayName = 'TextboxInput';

textboxInput.mixins = [
  ReactPureRenderMixin
];

textboxInput.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  multiLined: React.PropTypes.bool,
  appendNode: React.PropTypes.node,
  prependNode: React.PropTypes.node,
  autoSize: React.PropTypes.bool,
  unmanaged: React.PropTypes.bool
};

textboxInput.getDefaultProps = function textboxInputGetDefaultProps() {
  return {
    className: null,
    type: 'text',
    multiLined: false,
    appendNode: null,
    prependNode: null,
    autoSize: false,
    unmanaged: false
  };
};

textboxInput.getCssClasses = function textboxInputGetCssClasses() {
    var cssClasses = ['form-element__field-container'];

    if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.displayOnly === true) {
        cssClasses.push('m-display-only');
    }

    if (this.props.disabled === true) {
        cssClasses.push('m-disabled');
    }

    return cssClasses;
};

textboxInput.getInputCssClasses = function textboxInputGetInputCssClasses() {
    var cssClasses = ['form-element__input-container', 'form-element__input', 'm-text'];
    cssClasses.push('m-' + this.props.type);

    if (this.props.prependNode) {
        cssClasses.push('m-has-prepend');
    }

    if (this.props.appendNode) {
        cssClasses.push('m-has-append');
    }

    return cssClasses;
};

textboxInput.getInputPassThroughProps = function textboxInputGetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;

  props.value = this.cleanValue(props.value);

  return props;
};

textboxInput.cleanValue = function textboxInputCleanValue(value) {
  var defaultValue = this.props.unmanaged === true ? null : '';
  return value || defaultValue;
};

textboxInput.onClickPend = function textboxInputOnClickPend() {
  ReactDOM.findDOMNode(this.refs.input).focus();
};

textboxInput.renderPrepend = function textboxInputRenderPrepend() {
  var prepend = null;

  if (this.props.prependNode) {
    prepend = (
      <span
        className="form-element__input-prepend"
        onClick={this.onClickPend}
      >
        {this.props.prependNode}
      </span>
    );
  }

  return prepend;
};

textboxInput.renderAppend = function textboxInputRenderAppend() {
  var append = null;

  if (this.props.appendNode) {
    append = (
      <span
        className="form-element__input-append"
        onClick={this.onClickPend}
      >
        {this.props.appendNode}
      </span>
    );
  }

  return append;
};

textboxInput.renderInput = function textboxInputRenderInput() {
  if (this.props.multiLined) {
    return (
      <textarea
        ref="input"
        className="form-element__input-container form-element__input m-textarea"
        {...this.getInputPassThroughProps()}
      />
    );
  } else if (this.props.autoSize) {
    return (
      <InputAutoSizer
        ref="input"
        inputClassName={this.getInputCssClasses().join(' ')}
        {...this.getInputPassThroughProps()}
      />
    );
  }

  return (
    <input
      ref="input"
      className={this.getInputCssClasses().join(' ')}
      {...this.getInputPassThroughProps()}
    />
  );
};

textboxInput.render = function textboxInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderPrepend()}
      {this.renderInput()}
      {this.renderAppend()}
    </div>
  );
};

module.exports = React.createClass(textboxInput);
