var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;
var StyleGuideMenu = require('../style-guide/assets/components/style-guide-menu.component.jsx');

var Application = React.createClass({
  render: function() {
    return (
      <div className="application">
        <Header />
        <div className="main-application">
          <div className="page-style-guide style-guide">
            <StyleGuideMenu />
            <div className="style-guide__content">
              <RouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Application;
