import * as dataGenerator from '../data-generator';

export const story = dataGenerator.projectIssue({
  id: 1,
  projectId: 1,
  key: 'TP-1',
  summary: 'This is a cool user story we should work on',
  type: 'story',
});
export const task = dataGenerator.projectIssue({
  id: 2,
  projectId: 1,
  key: 'TP-2',
  summary: 'Very important task to do',
  type: 'task',
});
export const bug = dataGenerator.projectIssue({
  id: 3,
  projectId: 1,
  key: 'TP-3',
  summary: 'Who ever let this bug through the QA process need to fix it quick',
  type: 'bug',
});
export const opened = dataGenerator.projectIssue({
  id: 4,
  projectId: 1,
  key: 'TP-4',
  summary: 'Who ever let this bug through the QA process need to fix it quick',
  status: 'inProgress', // opened / inProgress / closed
});
export const inProgress = dataGenerator.projectIssue({
  id: 5,
  projectId: 1,
  key: 'TP-5',
  summary: 'Who ever let this bug through the QA process need to fix it quick',
  status: 'inProgress',
});
export const closed = dataGenerator.projectIssue({
  id: 6,
  projectId: 1,
  key: 'TP-6',
  summary: 'Who ever let this bug through the QA process need to fix it quick',
  status: 'closed',
});
