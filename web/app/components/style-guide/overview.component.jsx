var React = require('react/addons');
var StyleGuideMenu = require('./assets/components/style-guide-menu.component.jsx');
var RouteHandler = require('react-router').RouteHandler;

var Standards = React.createClass({
  render: function() {
    return (
      <div className="page-coding-standards">
        <h1>Overview</h1>
        <p>
          Nucleus React is a collection of different ReactJS components (along with mixins and stores).  Stores are dependant on the <a href="https://github.com/ryanzec/fluxe">fluxe</a> library.  It also provide a core sass framework with some normalizing css along with styling for the components.  All the code is accompanied with a test of mocha tests.
        </p>
        <p>
          This style guide (or component guide) shows all the different functionality of each item in this collection.
        </p>
      </div>
    )
  }
});

module.exports = Standards;
