import {Promise} from 'bluebird';
import {post} from 'superagent';

export const login = (username, password) => {
  //TODO: reject() call
  return new Promise(function(resolve, reject) {
    post('/api/app/login')
      .set('api-version', '1')
      .set('Accept', 'application/json')
      .send({
        username: username,
        password: password
      })
      .end(function(err, response) {
        resolve(response.body.data);
      });
  });
};
