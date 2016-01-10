var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var badge = {};

badge.displayName = 'Badge';

badge.mixins = [
  ReactPureRenderMixin
];

badge.propTypes = {
  className: React.PropTypes.string
};

badge.getDefaultProps = function badgeGetDefaultProps() {
  return {
    className: null
  };
};

badge.getCssClasses = function badgeGetCssClasses() {
  var cssClasses = ['badge'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

badge.render = function badgeRender() {
  return (
    <span className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </span>
  );
};

module.exports = React.createClass(badge);
