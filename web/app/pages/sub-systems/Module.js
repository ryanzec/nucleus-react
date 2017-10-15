import React from 'react';
import {Route} from 'react-router';

import ApplicationNotificationsPage from './ApplicationNotificationsPage';

export const routes = [
  <Route
    key="1"
    name="sub-systems-application-notifications"
    path="/sub-systems/application-notifications"
    component={ApplicationNotificationsPage}
  />
];
