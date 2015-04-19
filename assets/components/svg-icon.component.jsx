var React = require('react/addons');
var iconData = require('nucleus-icons');
var clickableMixin = require('../mixins/clickable.mixin');

var svgIcon = {};

svgIcon.displayName = 'SvgIcon';

svgIcon.mixins = [
  React.addons.PureRenderMixin,
  clickableMixin
];

svgIcon.propTypes = {
  fragment: React.PropTypes.string,
  size: React.PropTypes.string,
  className: React.PropTypes.string
};

svgIcon.getDefaultProps = function svgIconGetDefaultProps() {
  return {
    fragment: null,
    size: 'small',
    className: null
  };
};

svgIcon.getSvgHtml = function svgIconGetSvgHtml() {
  return iconData[this.props.size][this.props.fragment];
};

svgIcon.getInnerCssClasses = function svgIconGetInnerCssClasses() {
  var cssClasses = ['svg-icon-container'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

svgIcon.getOuterCssClasses = function svgIconGetOuterCssClasses() {
  var cssClasses = ['svg-icon-outer-container'];

  if (this.props.isClickable === true) {
    cssClasses.push('has-clickability');
  }

  if (this.state.isPressed === true) {
    cssClasses.push('is-pressed');
  }

  if (this.props.isQuiet === true) {
    cssClasses.push('m-quiet');
  }

  return cssClasses;
};

svgIcon.render = function svgIconRender() {
  return (
    <span
      className={this.getOuterCssClasses().join(' ')}
      {...this.getEventHandlerProps()}
    >
      <span
        className={this.getInnerCssClasses().join(' ')}
        dangerouslySetInnerHTML={{
          __html: this.getSvgHtml()
        }}
      ></span>
    </span>
  );
};

module.exports = React.createClass(svgIcon);
