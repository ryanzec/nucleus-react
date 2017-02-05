import router from '../router';
import * as utilities from '../utilities';

router.get('/users', (request, response) => {
  utilities.addDelay(request, () => {
    response.json({
      users: [{
        id: 1,
      }]
    });
  });
});
