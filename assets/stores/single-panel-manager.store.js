var singlePanelManager = {};

singlePanelManager._internalData = {
  registeredComponents: [],
  clickedComponent: null
};

singlePanelManager._globalClickHandler = function singlePanelManagerGlobalClickHandler(event) {
  singlePanelManager._internalData.registeredComponents.forEach(function singlePanelManagerGlobalClickHandlerRegisteredComponentsForEach(singlePanel) {
    //we need to make sure not to close a single panel if it was just clicked on
    if (this._internalData.clickedComponent !== singlePanel) {
      singlePanel.hideSinglePanel();
    }
  }.bind(singlePanelManager));

  singlePanelManager._internalData.clickedComponent = null;
};

singlePanelManager._globalKeyUpHandler = function singlePanelManagerGlobalKeyUpHandler(event) {
  if (event.which === 27) {
    singlePanelManager._internalData.registeredComponents.forEach(function singlePanelManagerGlobalKeyUpHandlerRegisteredComponentsForEach(singlePanel) {
      singlePanel.hideSinglePanel();
    });
  }
};

singlePanelManager.registerComponent = function singlePanelManagerRegisterComponent(options) {
  this._internalData.registeredComponents.push(options.component);
};

singlePanelManager.unregisterComponent = function singlePanelManagerUnregisterComponent(options) {
  /*eslint-disable*/
  this._internalData.registeredComponents = this._internalData.registeredComponents.filter(function singlePanelManagerUnregisterComponentRegisteredComponentFilter(singlePanel) {
    return singlePanel !== options.component;
  });
  /*eslint-enable*/
};

singlePanelManager.registerGlobalEventHandler = function singlePanelManagerRegisterGlobalEventHandler() {
  document.addEventListener('click', this._globalClickHandler);
  document.addEventListener('keyup', this._globalKeyUpHandler);
};

singlePanelManager.unregisterGlobalEventHandler = function singlePanelManagerUnregisterGlobalEventHandler() {
  document.removeEventListener('click', this._globalClickHandler);
  document.removeEventListener('keyup', this._globalKeyUpHandler);
};

singlePanelManager.setClickedComponent = function singlePanelManagersetClickedComponent(options) {
  this._internalData.clickedComponent = options.component;
};

module.exports = singlePanelManager;
