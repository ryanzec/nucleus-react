var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

Router.run(require('./routes.jsx'), Router.HistoryLocation, function routerRun(Handler, routerState) {
  ReactDOM.render(<Handler routerState={routerState} />, document.querySelector('.react-bootstrap-element'));
});
