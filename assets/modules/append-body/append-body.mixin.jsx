var React = require('react/addons');

module.exports = {
  componentDidUpdate: function() {
    this._updateAppendElement();
  },

  createAppendElement: function(options) {
    options = options || {};
    var tag = options.tag || 'div';
    var className = options.className || 'append-body-wrapper';

    if(this._bodyAppendContent) {
      throw new Error('Component has already append an element to the body');
    }

    this._bodyAppendContent = document.createElement(tag);
    this._bodyAppendContent.className = className;
    document.body.appendChild(this._bodyAppendContent);
    this._updateAppendElement();
  },

  getAppendElement: function() {
    return this._bodyAppendContent;
  },

  removeAppendElement: function() {
    document.body.removeChild(this._bodyAppendContent);
    this._bodyAppendContent = null;
  },

  _updateAppendElement: function() {
    var appendContent = this.getAppendBodyContent();

    /* jshint ignore:start */
    if (appendContent) {
      React.render(appendContent, this._bodyAppendContent);
    } else {
      React.render(<noscript />, this._bodyAppendContent);
    }
    /* jshint ignore:end */
  }
};
