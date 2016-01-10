var React = require('react');
var ReactDOM = require('react-dom');

var appendBodyMixin = {};

appendBodyMixin.componentDidUpdate = function appendBodyMixinComponentDidUpdate() {
  this.updateAppendElement();
};

appendBodyMixin.createAppendElement = function appendBodyMixinCreateAppendElement(options) {
  options = options || {};
  var tag = options.tag || 'div';
  var className = options.className || 'append-body-wrapper';

  if (this._bodyAppendContent) {
    throw new Error('Component has already append an element to the body');
  }

  this._bodyAppendContent = document.createElement(tag);
  this._bodyAppendContent.className = className;
  document.body.appendChild(this._bodyAppendContent);
  this.updateAppendElement();
};

appendBodyMixin.getAppendElement = function appendBodyMixinGetAppendElement() {
  return this._bodyAppendContent;
};

appendBodyMixin.removeAppendElement = function appendBodyMixinRemoveAppendElement() {
  document.body.removeChild(this._bodyAppendContent);
  this._bodyAppendContent = null;
};

appendBodyMixin.updateAppendElement = function appendBodyMixinUpdateAppendElement() {
  var appendContent = this.getAppendBodyContent();

  if (appendContent) {
    ReactDOM.render(appendContent, this._bodyAppendContent);
  } else {
    ReactDOM.render(<noscript />, this._bodyAppendContent);
  }
};

module.exports = appendBodyMixin;
