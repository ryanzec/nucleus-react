var React = require('react/addons');
var Header = require('./header.component.jsx');
var RouteHandler = require('react-router').RouteHandler;
var StyleGuideMenu = require('../style-guide/assets/components/style-guide-menu.component.jsx');
var applicationStore = require('./application.store');
var LoadingBar = require('../../../../assets/index').components.LoadingBar;

var Application = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  getInitialState: function() {
    return {
      loadingBarPercentage: applicationStore.getLoadingBarPercentage()
    }
  },

  componentWillMount: function() {
    applicationStore.on('changed', this.onApplicationStoreChanged);
  },

  componentWillUnmount: function() {
    applicationStore.removeListener('changed', this.onApplicationStoreChanged);
  },

  onApplicationStoreChanged: function() {
    this.setState({
      loadingBarPercentage: applicationStore.getLoadingBarPercentage()
    });
  },

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
        <LoadingBar percentageDone={this.state.loadingBarPercentage} />
      </div>
    );
  }
});

module.exports = Application;
