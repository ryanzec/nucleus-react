import router from '../router';
import forEach from 'lodash/forEach';
import * as utilities from '../utilities';
import * as usersData from '../data/users';

router.get('/users', (request, response) => {
  utilities.addDelay(request, () => {
    response.json({
      status: 'success',
      data: {
        users: [
          usersData.test,
          usersData.admin,
        ]
      }
    });
  });
});

forEach(usersData, (user) => {
  router.get(`/users/${user.id}`, (request, response) => {
    utilities.addDelay(request, () => {
      response.json({
        status: 'success',
        data: {
          user,
        }
      });
    });
  });
});
