var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;

module.exports = {
  routes: [
    <Route key="1" name="introduction" path="/introduction" handler={require('./introduction.component.jsx')} />
  ]
};
