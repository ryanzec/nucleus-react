import React from 'react';
import { createHistory } from 'history'
import {
  useRouterHistory,
  IndexRoute,
  Route,
  Router,
  applyRouterMiddleware
} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './store';
import Application from './react/components/Application';
import NotFoundPage from './react/components/NotFoundPage';
import CodePage from './pages/style-guide/CodePage';
import {routes as styleGuideRoutes} from './pages/style-guide/Module';
import {routes as subSystemsRoutes} from './pages/sub-systems/Module';
import {routes as showcaseRoutes} from './pages/showcase/Module';
import {useScroll} from 'react-router-scroll';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/'
});

let history = syncHistoryWithStore(browserHistory, store);

export default (
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route path="/" component={Application}>
        <IndexRoute component={CodePage} />
        {styleGuideRoutes}
        {subSystemsRoutes}
        {showcaseRoutes}
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);
