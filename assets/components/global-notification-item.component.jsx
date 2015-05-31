var React = require('react/addons');

var globalNotification = {};

globalNotification.displayName = 'Badge';

globalNotification.mixins = [
  React.addons.PureRenderMixin
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
