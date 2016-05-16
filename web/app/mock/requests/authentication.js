import * as mockedData from '../data/index';
let baseUrl = '/api/app/login';

export const post = {
  oneTwoThree: {
    url: baseUrl,
    httpCode: 200,
    requestHeaders: {
      'Accept': 'application/json',
      'api-version': '1'
    },
    requestPayload: {
      username: 'test.user',
      password: 'password'
    },
    response: {
      httpCode: 200,
      data: mockedData.authentication.oneTwoThree,
      errors: []
    },
    delay: 2000
  }
};
