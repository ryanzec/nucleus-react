import router from '../router';
import forEach from 'lodash/forEach';
import * as utilities from '../utilities';
import * as issuesData from '../data/issues';

router.get('/issues', (request, response) => {
  utilities.addDelay(request, () => {
    response.json({
      status: 'success',
      data: {
        metaData: {
          count: Object.keys(issuesData).length,
        },
        issues: [
          issuesData.story,
          issuesData.task,
          issuesData.bug,
          issuesData.opened,
          issuesData.inProgress,
          issuesData.closed,
        ],
      }
    });
  });
});

forEach(issuesData, (issue) => {
  router.get(`/issues/${issue.id}`, (request, response) => {
    utilities.addDelay(request, () => {
      response.json({
        status: 'success',
        data: {
          issue,
        }
      });
    });
  });
});
