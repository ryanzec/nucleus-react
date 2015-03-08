var React = require('react/addons');

var appendBodyMixin = {};

appendBodyMixin.componentDidUpdate = function appendBodyMixinComponentDidUpdate() {
  this._updateAppendElement();
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
  this._updateAppendElement();
};

appendBodyMixin.getAppendElement = function appendBodyMixinGetAppendElement() {
  return this._bodyAppendContent;
};

appendBodyMixin.removeAppendElement = function appendBodyMixinRemoveAppendElement() {
  document.body.removeChild(this._bodyAppendContent);
  this._bodyAppendContent = null;
};

appendBodyMixin._updateAppendElement = function appendBodyMixinUpdateAppendElement() {
  var appendContent = this.getAppendBodyContent();

  if (appendContent) {
    React.render(appendContent, this._bodyAppendContent);
  } else {
    React.render(<noscript />, this._bodyAppendContent);
  }
};

module.exports = appendBodyMixin;
