// GET /projects/1/issues

// default user icon

// object-generate.js
import moment from 'moment-timezone';
import assign from 'lodash/assign';
import * as userIconData from './user-icon-data';

// TODO: more to utility
function generateRandomTime() {
  return moment().format();
}

export function project(overrideData) {
  return assign({
    id: 1,
    key: '???',
    name: 'Test Project',
    status: 'active', //active / inactive
  }, overrideData);
}

export function user(overrideData) {
  return assign({
    id: 1,
    firstName: 'test',
    lastName: 'user',
    username: 'test.user',
    email: 'text.user@example.com',
    iconData: userIconData.normal,
    type: 'normal', //normal / admin
    status: 'active', // active / inactive
  }, overrideData);
}

export function projectIssueComment(ovverideData) {
  return assign({}, overrideData);
}

export function projectIssue(overrideData) {
  return assign({
    id: null,
    projectId: null,
    key: '???-???',
    summary: null,
    description: null,
    assigneeId: user().id,
    assignee: user(),
    reporterId: user().id,
    reporter: user(),
    tags: [],
    comments: [],
    priorityLevel: 'medium', // low / minor / medium / high / critical / blocker
    createdAt: generateRandomTime(),
    createdById: user().id,
    createdBy: user(),
    updatedAt: generateRandomTime(),
    updatedById: user().id,
    updatedBy: user(),
    type: 'story', // story / task / bug
    status: 'opened', // opened / inProgress / closed
  }, overrideData);
}
