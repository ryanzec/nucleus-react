import * as dataGenerator from '../data-generator';

export const test = dataGenerator.user();
export const admin = dataGenerator.user({
  id: 2,
  firstName: 'Ryan',
  lastName: 'Zec',
  username: 'ryan.zec',
  email: 'ryan.zec@example.com',
  type: 'admin',
});
