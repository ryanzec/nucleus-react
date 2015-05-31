var React = require('react/addons');

var globalNotification = {};

globalNotification.displayName = 'Badge';

globalNotification.mixins = [
  React.addons.PureRenderMixin
];

globalNotification.propTypes = {
  className: React.PropTypes.string,
  vertical: React.PropTypes.oneOf(['top', 'bottom']),
  horizontal: React.PropTypes.oneOf(['left', 'center', 'right'])
};

globalNotification.getDefaultProps = function globalNotificationGetDefaultProps() {
  return {
    className: null,
    vertical: 'top',
    horizontal: 'center'
  };
};

globalNotification.getCssClasses = function globalNotificationGetCssClasses() {
  var cssClasses = ['global-notification'];
  cssClasses.push('m-' + this.props.vertical + '-' + this.props.horizontal);

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
