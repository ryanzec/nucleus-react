var React = require('react/addons');

var svgIcon = {};

svgIcon.displayName = 'SvgIcon';

svgIcon.mixins = [
  React.addons.PureRenderMixin
];

svgIcon.propTypes = {
  svgPath: React.PropTypes.string.isRequired,
  fragment: React.PropTypes.string,
  size: React.PropTypes.string,
  className: React.PropTypes.string
};

svgIcon.getDefaultProps = function svgIconGetDefaultProps() {
  return {
    svgPath: null,
    fragment: null,
    size: 'small',
    className: null
  };
};

svgIcon.getFullSvgPath = function svgIconGetFullSvgPath() {
  var path = this.props.svgPath;

  if (this.props.fragment) {
    path += '#' + this.props.fragment + '-' + this.props.size;
  }

  return path;
};

svgIcon.getCssClasses = function svgIconGetCssClasses() {
  var cssClasses = ['svg-icon'];

  if (this.props.fragment) {
    cssClasses.push(this.props.fragment + '-' + this.props.size);
    cssClasses.push('icon-' + this.props.size);
  }

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

svgIcon.render = function svgIconRender() {
  var useTag = '<use xlink:href="' + this.getFullSvgPath() + '" />';

  return (
    <svg
      className={this.getCssClasses().join(' ')}
      dangerouslySetInnerHTML={{
        __html: useTag
      }} />
  );
};

module.exports = React.createClass(svgIcon);
