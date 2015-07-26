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
  className: React.PropTypes.string,
  outerClassName: React.PropTypes.string,
  indicator: React.PropTypes.string
};

svgIcon.getDefaultProps = function svgIconGetDefaultProps() {
  return {
    fragment: null,
    size: 'small',
    className: null,
    outerClassName: null,
    indicator: null
  };
};

svgIcon.getSvgHtml = function svgIconGetSvgHtml() {
  return iconData[this.props.size][this.props.fragment];
};

svgIcon.getInnerCssClasses = function svgIconGetInnerCssClasses() {
  var cssClasses = ['svg-icon__container', this.props.fragment + '-icon'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

svgIcon.getOuterCssClasses = function svgIconGetOuterCssClasses() {
  var cssClasses = ['svg-icon__outer-container', this.props.fragment + '-icon'];

  if (this.props.outerClassName) {
    cssClasses = cssClasses.concat(this.props.outerClassName.split(' '));
  }

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

svgIcon.getIndicatorHtml = function svgIconGetIndicatorHtml() {
  var indicator = '';

  if (this.props.indicator) {
    indicator = '<div class="svg-icon__indicator m-' + this.props.indicator + '"></div>';
  }

  return indicator;
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
          __html: this.getSvgHtml() + this.getIndicatorHtml()
        }}
      ></span>
    </span>
  );
};

module.exports = React.createClass(svgIcon);
