var React = require('react');
var applicationReact = require('./react/index');
var Application = applicationReact.components.Application;
var IntroductionPage = require('./pages/introduction/introduction.component.jsx');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var NotFound = applicationReact.components.NotFound;

module.exports = (
  <Route handler={Application}>
    <DefaultRoute handler={IntroductionPage} />
    {require('./pages/introduction/module.jsx').routes}
    {require('./pages/foundation/module.jsx').routes}
    {require('./pages/components/module.jsx').routes}
    {require('./pages/mixins/module.jsx').routes}
    {require('./pages/complex/module.jsx').routes}
    <NotFoundRoute handler={NotFound} />
  </Route>
);
