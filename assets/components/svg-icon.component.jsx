var React = require('react/addons');
var iconData = require('nucleus-icons');
var _ = require('lodash');

var svgIcon = {};

svgIcon.displayName = 'SvgIcon';

svgIcon.mixins = [
  React.addons.PureRenderMixin
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

svgIcon.getCssClasses = function svgIconGetCssClasses() {
  var cssClasses = ['svg-icon-container'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

svgIcon.getInputPassThroughProps = function svgIconGetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.fragment;
  delete props.size;
  delete props.className;

  return props;
};

svgIcon.render = function svgIconRender() {
  return (
    <span
      className={this.getCssClasses().join(' ')}
      {...this.getInputPassThroughProps()}
      dangerouslySetInnerHTML={{
        __html: this.getSvgHtml()
      }}
    ></span>
  );
};

module.exports = React.createClass(svgIcon);
