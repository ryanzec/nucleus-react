var storeGenerator = require('./store-generator');

module.exports = storeGenerator({
  getPreventDoubleClick: function() {
    return this._internalData.preventDoubleClick;
  },

  getLoadingBarPercentage: function() {
    return this._internalData.loadingBarPercentage
  },

  setLoadingBarPercentage: function(percentage) {
    this._internalData.loadingBarPercentage = percentage;
    this.emit('changed');
  },

  _internalData: {
    preventDoubleClick: false,
    loadingBarPercentage: 0
  },

  _onEnablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = true;
    this.emit('preventDoubleClickChanged');
  },

  _onDisablePreventDoubleClick: function() {
    this._internalData.preventDoubleClick = false;
    this.emit('preventDoubleClickChanged');
  }
});
