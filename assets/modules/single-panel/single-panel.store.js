var singlePanelStore = {
  storeName: 'SinglePanel',

  _dispatcherEvents: {
    'registerComponent': '_onRegisterComponent',
    'unregisterComponent': '_onUnregisterComponent',
    'registerGlobalEventHandler': '_onRegisterGlobalEventHandler',
    'unregisterGlobalEventHandler': '_onUnregisterGlobalEventHandler',
    'setClickedComponent': '_onSetClickedComponent'
  },

  _internalData: {
    registeredComponents: [],
    clickedComponent: null
  },

  _globalClickHandler: function(event) {
    singlePanelStore._internalData.registeredComponents.forEach(function(singlePanel) {
      //we need to make sure not to close a single panel if it was just clicked on
      if(this._internalData.clickedComponent !== singlePanel) {
        singlePanel.hideSinglePanel();
      }
    }.bind(singlePanelStore));

    singlePanelStore._internalData.clickedComponent = null;
  },

  _globalKeyUpHandler: function(event) {
    if(event.which === 27) {
      singlePanelStore._internalData.registeredComponents.forEach(function(singlePanel) {
        singlePanel.hideSinglePanel();
      });
    }
  },

  _onRegisterComponent: function(options) {
    this._internalData.registeredComponents.push(options.component);
  },

  _onUnregisterComponent: function(options) {
    this._internalData.registeredComponents = this._internalData.registeredComponents.filter(function(singlePanel) {
      return singlePanel !== options.component;
    });
  },

  _onRegisterGlobalEventHandler: function() {
    document.addEventListener('click', this._globalClickHandler);
    document.addEventListener('keyup', this._globalKeyUpHandler);
  },

  _onUnregisterGlobalEventHandler: function() {
    document.removeEventListener('click', this._globalClickHandler);
    document.removeEventListener('keyup', this._globalKeyUpHandler);
  },

  _onSetClickedComponent: function(options) {
    this._internalData.clickedComponent = options.component;
  }
};

module.exports = singlePanelStore;
