/* NOTE: need to ignore until we figure out how to test dom event in jsdom if it is possible */
/* istanbul ignore next */
module.exports = {
  _managedDomEvents: [],

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
