var mockedData = require('../data/index');
var baseUrl = '/query';

module.exports = {
  get: {
    empty: {
      url: baseUrl,
      response: {
        httpCode: 200,
        data: {
          results: mockedData.query.default
        }
      }
    },

    delay: {
      url: baseUrl + '/delay',
      delay: 2000,
      response: {
        httpCode: 200,
        data: {
          results: mockedData.query.delay
        }
      }
    },

    others: {
      url: baseUrl + '/*',
      response: {
        httpCode: 200,
        data: {
          results: mockedData.query.default
        }
      }
    }
  }
};
