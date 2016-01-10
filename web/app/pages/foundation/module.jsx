var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

module.exports = {
  routes: [
    <Route key="1" name="foundation-colors" path="/foundation/colors" handler={require('./colors.component.jsx')} />,
    <Route key="2" name="foundation-grid" path="/foundation/grid" handler={require('./grid.component.jsx')} />,
    <Route key="3" name="foundation-typography" path="/foundation/typography" handler={require('./typography.component.jsx')} />,
    <Route key="4" name="foundation-utility" path="/foundation/utility" handler={require('./utility.component.jsx')} />,
    <Route key="5" name="foundation-validator" path="/foundation/validator" handler={require('./validator.component.jsx')} />
  ]
};
