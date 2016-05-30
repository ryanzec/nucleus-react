import React from 'react';
import {
  browserHistory,
  IndexRoute,
  Route,
  Router,
  applyRouterMiddleware
} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './store/store';
import Application from './react/components/application';
import NotFoundPage from './react/components/not-found.page';
import CodePage from './pages/style-guide/code.page';
import {routes as styleGuideRoutes} from './pages/style-guide/module';
import useScroll from 'react-router-scroll';

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
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);
