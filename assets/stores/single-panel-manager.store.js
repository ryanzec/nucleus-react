var singlePanelManager = {
  _internalData: {
    registeredComponents: [],
    clickedComponent: null
  },

  _globalClickHandler: function(event) {
    singlePanelManager._internalData.registeredComponents.forEach(function(singlePanel) {
      //we need to make sure not to close a single panel if it was just clicked on
      if(this._internalData.clickedComponent !== singlePanel) {
        singlePanel.hideSinglePanel();
      }
    }.bind(singlePanelManager));

    singlePanelManager._internalData.clickedComponent = null;
  },

  _globalKeyUpHandler: function(event) {
    if(event.which === 27) {
      singlePanelManager._internalData.registeredComponents.forEach(function(singlePanel) {
        singlePanel.hideSinglePanel();
      });
    }
  },

  registerComponent: function(options) {
    this._internalData.registeredComponents.push(options.component);
  },

  unregisterComponent: function(options) {
    this._internalData.registeredComponents = this._internalData.registeredComponents.filter(function(singlePanel) {
      return singlePanel !== options.component;
    });
  },

  registerGlobalEventHandler: function() {
    document.addEventListener('click', this._globalClickHandler);
    document.addEventListener('keyup', this._globalKeyUpHandler);
  },

  unregisterGlobalEventHandler: function() {
    document.removeEventListener('click', this._globalClickHandler);
    document.removeEventListener('keyup', this._globalKeyUpHandler);
  },

  setClickedComponent: function(options) {
    this._internalData.clickedComponent = options.component;
  }
};

module.exports = singlePanelManager;
