var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;

module.exports = {
  routes: [
    <Route key="1" name="mixins-append-body" path="/mixins/append-body" handler={require('./append-body.component.jsx')} />,
    <Route key="2" name="mixins-clickable" path="/mixins/clickable" handler={require('./clickable.component.jsx')} />,
    <Route key="3" name="mixins-debounce" path="/mixins/debounce" handler={require('./debounce.component.jsx')} />,
    <Route key="4" name="mixins-dom-event-manager" path="/mixins/dom-event-manager" handler={require('./dom-event-manager.component.jsx')} />,
    <Route key="5" name="mixins-form-input" path="/mixins/form-input" handler={require('./form-input.component.jsx')} />,
    <Route key="6" name="mixins-form" path="/mixins/form" handler={require('./form.component.jsx')} />,
    <Route key="7" name="mixins-pagination" path="/mixins/pagination" handler={require('./pagination.component.jsx')} />,
    <Route key="8" name="mixins-single-panel" path="/mixins/single-panel" handler={require('./single-panel.component.jsx')} />,
    <Route key="9" name="mixins-tooltip" path="/mixins/tooltip" handler={require('./tooltip.component.jsx')} />,
    <Route key="10" name="mixins-validator" path="/mixins/validator" handler={require('./validator.component.jsx')} />,
  ]
};
