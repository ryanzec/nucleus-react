var React = require('react/addons');

var overlay = {};

overlay.displayName = 'Overlay';

overlay.mixins = [
  React.addons.PureRenderMixin
];

overlay.propTypes = {
  absolutePositioned: React.PropTypes.bool.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  topContent: React.PropTypes.node
};

overlay.getDefaultProps = function overlayGetDefaultProps() {
  return {
    absolutePositioned: false,
    isActive: false,
    topContent: null
  };
};

overlay.getCssClasses = function overlayGetCssClasses() {
  var cssClasses = ['overlay'];

  if (this.props.absolutePositioned === true) {
    cssClasses.push('m-absolute');
  }

  if (this.props.isActive !== true) {
    cssClasses.push('u-hide');
  }

  return cssClasses;
};

overlay.render = function overlayRender() {
  var topContent = null;

  if (this.props.topContent) {
    topContent = (
      <div className="overlay__content">
        {this.props.topContent}
      </div>
    );
  }

  return (
    <div className={this.getCssClasses().join(' ')}>
      {topContent}
    </div>
  );
};

module.exports = React.createClass(overlay);
