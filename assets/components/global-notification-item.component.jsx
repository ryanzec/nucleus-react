var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var globalNotification = {};

globalNotification.displayName = 'Badge';

globalNotification.mixins = [
  ReactPureRenderMixin
];

globalNotification.propTypes = {
  className: React.PropTypes.string
};

globalNotification.getDefaultProps = function globalNotificationGetDefaultProps() {
  return {
    className: null
  };
};

globalNotification.getCssClasses = function globalNotificationGetCssClasses() {
  var cssClasses = ['global-notification__item'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

globalNotification.render = function globalNotificationRender() {
  return (
    <span className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </span>
  );
};

module.exports = React.createClass(globalNotification);
