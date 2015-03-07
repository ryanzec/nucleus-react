/* NOTE: need to ignore this entire file until we figure out how to properly test events uisng jsdom */
var domEventManagerMixin = {};

/* istanbul ignore next */
domEventManagerMixin.componentWillMount = function() {
  this._managedDomEvents = [];
};

/* istanbul ignore next */
domEventManagerMixin.componentWillUnmount = function() {
  if(this._managedDomEvents.length > 0) {
    this._managedDomEvents.forEach(function(event) {
      event.element.removeEventListener(event.type, event.func);
    });
  }
};

/* istanbul ignore next */
domEventManagerMixin.addDomEvent = function(element, type, func) {
  element.addEventListener(type, func);
  this._managedDomEvents.push({
    element: element,
    type: type,
    func: func
  });
};

module.exports = domEventManagerMixin;
