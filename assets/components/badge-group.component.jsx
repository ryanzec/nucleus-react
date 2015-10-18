var React = require('react/addons');

var badgeGroup = {};

badgeGroup.displayName = 'BadgeGroup';

badgeGroup.mixins = [
  React.addons.PureRenderMixin
];

badgeGroup.propTypes = {
  className: React.PropTypes.string
};

badgeGroup.getDefaultProps = function badgeGroupGetDefaultProps() {
  return {
    className: null
  };
};

badgeGroup.getCssClasses = function badgeGroupGetCssClasses() {
  var cssClasses = ['badge-group'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

badgeGroup.render = function badgeGroupRender() {
  return (
    <span className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </span>
  );
};

module.exports = React.createClass(badgeGroup);
