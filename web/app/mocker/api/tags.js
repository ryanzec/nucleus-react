import router from '../router';
import * as utilities from '../utilities';

router.get('/tags', (request, response) => {
  utilities.addDelay(request, () => {
    response.json({
      tags: [{
        display: 'JavaScript',
        value: 'js'
      }, {
        display: 'ReactJS',
        value: 'react'
      }, {
        display: 'GoLang',
        value: 'go'
      }, {
        display: 'SASS',
        value: 'sass'
      }]
    });
  });
});
