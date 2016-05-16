import React from 'react';
import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './store/store';
import Application from './react/components/application.component.jsx';
import NotFoundPage from './react/components/not-found.page.jsx';
import AlertPage from './pages/style-guide/alerts.page.jsx';
import {routes as styleGuideRoutes} from './pages/style-guide/module.jsx';

let history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Application}>
        <IndexRoute component={AlertPage} />
        {styleGuideRoutes}
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);
