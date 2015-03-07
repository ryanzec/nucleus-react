var singlePanelManager = {};

singlePanelManager._internalData = {
  registeredComponents: [],
  clickedComponent: null
};

singlePanelManager._globalClickHandler = function(event) {
  singlePanelManager._internalData.registeredComponents.forEach(function(singlePanel) {
    //we need to make sure not to close a single panel if it was just clicked on
    if(this._internalData.clickedComponent !== singlePanel) {
      singlePanel.hideSinglePanel();
    }
  }.bind(singlePanelManager));

  singlePanelManager._internalData.clickedComponent = null;
};

singlePanelManager._globalKeyUpHandler = function(event) {
  if(event.which === 27) {
    singlePanelManager._internalData.registeredComponents.forEach(function(singlePanel) {
      singlePanel.hideSinglePanel();
    });
  }
};

singlePanelManager.registerComponent = function(options) {
  this._internalData.registeredComponents.push(options.component);
};

singlePanelManager.unregisterComponent = function(options) {
  this._internalData.registeredComponents = this._internalData.registeredComponents.filter(function(singlePanel) {
    return singlePanel !== options.component;
  });
};

singlePanelManager.registerGlobalEventHandler = function() {
  document.addEventListener('click', this._globalClickHandler);
  document.addEventListener('keyup', this._globalKeyUpHandler);
};

singlePanelManager.unregisterGlobalEventHandler = function() {
  document.removeEventListener('click', this._globalClickHandler);
  document.removeEventListener('keyup', this._globalKeyUpHandler);
};

singlePanelManager.setClickedComponent = function(options) {
  this._internalData.clickedComponent = options.component;
};

module.exports = singlePanelManager;
