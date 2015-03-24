var backend = require('ryanzec-mocked-backend');
var mockedData = require('./data/index');
var mockRequest = function mockRequest(options) {
  var extend = function extend(target, source) {
    var newObject = Object.create(target);

    Object.keys(source).map(function (prop) {
      prop in newObject && (newObject[prop] = source[prop]);
    });

    return newObject;
  };

  var method = options.method || 'GET';
  var url = options.url;
  var delay = options.delay || 0;
  var responseHeaders = extend({
    'content-type': 'application/json'
  }, options.responseHeaders || {});
  var responseHttpStatus = options.responseHttpStatus || 200;

  backend
  .when(method, options.url, options.requestPayload, options.requestHeaders)
  .options( {
    delay: delay
  })
  .respond(responseHttpStatus, options.response, responseHeaders);
};

var mockExtendTextQueries = function mockExtendTextQueries() {
  mockRequest({
    url: '/query',
    response: {
      httpCode: 200,
      data: {
        results: mockedData.query.default
      }
    }
  });

  mockRequest({
    url: '/query/delay',
    delay: 2000,
    response: {
      httpCode: 200,
      data: {
        results: mockedData.query.default.delay
      }
    }
  });

  mockRequest({
    url: '/query/*',
    response: {
      httpCode: 200,
      data: {
        results: mockedData.query.default
      }
    }
  });
};

mockExtendTextQueries();
