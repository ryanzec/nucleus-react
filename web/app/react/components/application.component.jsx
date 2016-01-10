var React = require('react');
var commoneReact = require('../../../../assets/index');

var menuStore = require('../../stores/menu.store');

var MainNavigation = require('./main-navigation.component.jsx');
var RouteHandler = require('react-router').RouteHandler;
var SvgIcon = commoneReact.components.SvgIcon;

var application = {};

application.displayName = 'Application';

application.onClickMenuToggle = function() {
  menuStore.activate();
};

application.render = function() {
  return (
    <div className="application">
      <MainNavigation />
      <div className="main-application">
        <div className="top-navigation u-hide-large u-hide-extra-large">
          <span
            className="menu-toggle"
            onClick={this.onClickMenuToggle}
          >
            <SvgIcon fragment="four-corners" />
          </span>
        </div>
        <RouteHandler routerState={this.props.routerState} />
      </div>
    </div>
  );
};

module.exports = React.createClass(application);
