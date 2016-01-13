var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var formElement = {};

formElement.displayName = 'FormElement';

formElement.mixins = [
  ReactPureRenderMixin
];

formElement.propTypes = {
  className: React.PropTypes.string,
  renderValidation: React.PropTypes.oneOf(['valid', 'invalid', 'both', false]),
  isValid: React.PropTypes.bool
};

formElement.getDefaultProps = function() {
  return {
    className: null,
    renderValidation: false,
    isValid: null
  };
};

formElement.shouldRenderValid = function() {
  return (
    this.props.isValid === true
    && (
      this.props.renderValidation === 'valid'
      || this.props.renderValidation === 'both'
    )
  );
};

formElement.shouldRenderInvalid = function() {
  return (
    this.props.isValid === false
    && (
      this.props.renderValidation === 'invalid'
      || this.props.renderValidation === 'both'
    )
  );
};

formElement.getCssClasses = function() {
  var cssClasses = ['form-element'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.shouldRenderValid()) {
    cssClasses.push('m-valid');
  } else if (this.shouldRenderInvalid()) {
    cssClasses.push('m-invalid');
  }

  return cssClasses;
};

formElement.render = function() {
  return (
    <span className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </span>
  );
};

module.exports = React.createClass(formElement);
