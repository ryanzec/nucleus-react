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
import Application from './react/components/application';
import NotFoundPage from './react/components/not-found.page';
import CodePage from './pages/style-guide/code.page';
import {routes as styleGuideRoutes} from './pages/style-guide/module';
import {routes as subSystemsRoutes} from './pages/sub-systems/module';
import {routes as showcaseRoutes} from './pages/showcase/module';
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
