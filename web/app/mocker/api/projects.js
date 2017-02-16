import router from '../router';
import forEach from 'lodash/forEach';
import * as utilities from '../utilities';
import * as projectsData from '../data/projects';
import * as projectIssuesData from '../data/project-issues';

router.get('/projects', (request, response) => {
  utilities.addDelay(request, () => {
    response.json({
      status: 'success',
      data: {
        projects: [
          projectsData.test,
        ]
      }
    });
  });
});

forEach(projectsData, (project) => {
  router.get(`/projects/${project.id}`, (request, response) => {
    utilities.addDelay(request, () => {
      response.json({
        status: 'success',
        data: {
          project,
        }
      });
    });
  });
});

router.get('/projects/1/issues', (request, response) => {
  utilities.addDelay(request, () => {
    response.json({
      status: 'success',
      data: {
        metaData: {
          count: projectIssuesData.testProjectIssues.length,
        },
        project: projectsData.test,
        projects: projectIssuesData.testProjectIssues,
      }
    });
  });
});
