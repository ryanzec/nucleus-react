import {post} from 'axios';
import {API_URL} from 'app/constants/api';

export const login = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  const headers = {
    'api-version': '1',
    Accept: 'application/json',
  };

  return post(`${API_URL}/login`, data, {
    headers,
  });
};
