var React = require('react/addons');

var badge = {};

badge.displayName = 'Badge';

badge.mixins = [
  React.addons.PureRenderMixin
];

badge.propTypes = {
  className: React.PropTypes.string
};

badge.getDefaultProps = function() {
  return {
    className: null
  };
};

badge.getCssClasses = function() {
  var cssClasses = ['badge'];

  if(this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

badge.render = function() {
  return (
    <span className={this.getCssClasses().join(' ')}>{this.props.children}</span>
  );
};

module.exports = React.createClass(badge);
