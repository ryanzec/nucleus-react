var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

module.exports = {
  routes: [
    <Route key="1" name="complex-forms" path="/complex/forms" handler={require('./forms.component.jsx')} />
  ]
};
