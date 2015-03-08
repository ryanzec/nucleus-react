/* NOTE: need to ignore this entire file until we figure out how to properly test events uisng jsdom */
var domEventManagerMixin = {};

/* istanbul ignore next */
domEventManagerMixin.componentWillMount = function domEventManagerMixinComponentWillMount() {
  this._managedDomEvents = [];
};

/* istanbul ignore next */
domEventManagerMixin.componentWillUnmount = function domEventManagerMixinComponentWillUnmount() {
  if (this._managedDomEvents.length > 0) {
    this._managedDomEvents.forEach(function domEventManagerMixinComponentWillUnmountManagedDomEventsForEach(event) {
      event.element.removeEventListener(event.type, event.func);
    });
  }
};

/* istanbul ignore next */
domEventManagerMixin.addDomEvent = function domEventManagerMixinAddDomeEvent(element, type, func) {
  element.addEventListener(type, func);
  this._managedDomEvents.push({
    element: element,
    type: type,
    func: func
  });
};

module.exports = domEventManagerMixin;
