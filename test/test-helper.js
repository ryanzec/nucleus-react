var _ = require('lodash');
var storeLocations = {
  Application: '../web/app/components/core/application.store'
};
var initialStoreValues = {};
var Router = require('react-router');
var Route = Router.Route;
var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var TestLocation = require('react-router/lib/locations/TestLocation');
var Fiber = require('fibers');
var sinon = require('sinon');
var mockedData = require('../web/mocked-api/data/index');
var mockedRequests = require('../web/mocked-api/requests/index');

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

  testPage: function(initialPath, steps) {
    if (!_.isArray(steps)) {
      steps = [steps];
    };

    var component;
    var routerMainComponent;
    var div = document.createElement('div');
    var routes = require('../web/app/components/core/routes.jsx');
    var location = new TestLocation([initialPath]);

    Router.run(routes, location, function (Handler, routerState) {
      var step = steps.shift();

      //TODO: research: not sure why or if I need this here (https://github.com/rackt/react-router/issues/991)
      this.unmountComponent(routerMainComponent);

      routerMainComponent = React.render(React.createFactory(Handler)({
        routerState: routerState
      }), div);
      step(routerMainComponent);
    }.bind(this));
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
    return sinon.spy(component.prototype.__reactAutoBindMap, eventHandlerName);
  },

  restoreEventHandler: function(component, eventHandlerName) {
    //using weird syntax here to prevent issue with ReactJS auto binding of events
    component.prototype.__reactAutoBindMap[eventHandlerName].restore();
  },

  mockedData: mockedData,

  mockNockRequest: function(scope, resource, verb, key, options) {
    var mockedRequestMetaData = mockedRequests[resource][verb][key];
    var body = mockedRequestMetaData.requestPayload ? mockedRequestMetaData.requestPayload : undefined;
    var mock = scope[verb](mockedRequestMetaData.url, body);
    var replyHeaders;

    if (mockedRequestMetaData.requestHeaders) {
      _.forEach(mockedRequestMetaData.requestHeaders, function(value, header) {
        mock.matchHeader(header, value);
      });
    }

    if (options) {
      if (options.responseHeaders) {
        replyHeaders = options.responseHeaders;
      }

      if (options.times) {
        mock.times(options.times);
      }

      if (options.delay) {
        mock.delay = options.delay;
      }
    }

    mock.reply(mockedRequestMetaData.httpCode, mockedRequestMetaData.response, replyHeaders);
  },

  scryRenderedDOMComponentsWithProp: function scryRenderedDOMComponentsWithProp(root, propName, propValue) {
    return reactTestUtils.findAllInRenderedTree(root, function(inst) {
      var instancePropValue = inst.props[propName];

      return (
        reactTestUtils.isDOMComponent(inst)
        && instancePropValue
        && (' ' + instancePropValue + ' ').indexOf(' ' + propValue + ' ') !== -1
      );
    });
  },

  findRenderedDOMComponentWithProp: function findRenderedDOMComponentWithProp(root, propName, propValue) {
    var all = this.scryRenderedDOMComponentsWithProp(root, propName, propValue);

    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') for prop  ' + propName + ' : ' + propValue);
    }

    return all[0];
  }
};
