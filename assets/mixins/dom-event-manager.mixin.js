/* NOTE: need to ignore this entire file until we figure out how to properly test events uisng jsdom */
/* istanbul ignore next */
module.exports = {
  componentWillMount: function() {
    this._managedDomEvents = [];
  },

  componentWillUnmount: function() {
    if(this._managedDomEvents.length > 0) {
      this._managedDomEvents.forEach(function(event) {
        event.element.removeEventListener(event.type, event.func);
      });
    }
  },

  addDomEvent: function(element, type, func) {
    element.addEventListener(type, func);
    this._managedDomEvents.push({
      element: element,
      type: type,
      func: func
    });
  }
};
