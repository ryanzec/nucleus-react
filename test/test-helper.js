var _ = require('lodash');
var storeLocations = {
  Application: '../web/app/components/core/application.store',
  SinglePanelManager: '../assets/stores/single-panel-manager.store'
};
var initialStoreValues = {};
var Router = require('react-router');
var Route = Router.Route;
var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TestLocation = require('react-router/modules/locations/TestLocation');
var Fiber = require('fibers');
var sinon = require('sinon');

//store the original state of all the stores
_.forEach(storeLocations, function(path, storeName) {
  initialStoreValues[storeName] = _.clone(require(path), true);
});

module.exports = {
  resetStores: function() {
    var storeNames = Array.prototype.slice.call(arguments);

    storeNames.forEach(function(storeName) {
      //get the store
      var store = require(storeLocations[storeName]);

      //reset all the initial store properties
      store = _.extend(store, _.clone(initialStoreValues[storeName], true));
    });
  },

  getRouterComponent: function(Component) {
    var component;
    var div = document.createElement('div');
    var routes = [
      React.createFactory(Route)({
        name: "test",
        handler:Component
      })
    ];
    TestLocation.history = ['/test'];

    Router.run(routes, TestLocation, function (Handler) {
      var mainComponent = React.render(React.createFactory(Handler)({}), div);
      component = reactTestUtils.findRenderedComponentWithType(mainComponent, Component);
    });

    return component;
  },

  unmountComponent: function(component) {
    //TODO: investigate: is this going to mask any issue that the code might have?
    if(component.isMounted()) {
      React.unmountComponentAtNode(component.getDOMNode().parentNode);
    }
  },

  createNativeClickEvent: function() {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, true);

    return evt;
  },

  createNativeMouseEvent: function(options) {
    var evt = document.createEvent('MouseEvents');
    evt.initEvent(options.action, false, true);

    return evt;
  },

  createNativeKeyboardEvent: function(options) {
    var evt = document.createEvent('HTMLEvents');
    var keyEvent = options.event || 'keyup';
    evt.which = options.which;
    evt.keycode = options.which;
    evt.initEvent(keyEvent, false, true);

    return evt;
  },

  noop: function() {},

  sleep: function(ms) {
    var fiber = Fiber.current;

    setTimeout(function() {
        fiber.run();
    }, ms);

    Fiber.yield();
  },

  keyCodes: {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    COMMA: 188,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18
  },

  getSpyForEventHandler: function(component, eventHandlerName) {
    //using weird syntax here to prevent issue with ReactJS auto binding of events
    return sinon.spy(component.type.prototype.__reactAutoBindMap, eventHandlerName);
  },

restoreEventHandler: function(component, eventHandlerName) {
    //using weird syntax here to prevent issue with ReactJS auto binding of events
    component.type.prototype.__reactAutoBindMap[eventHandlerName].restore();
  }
};
