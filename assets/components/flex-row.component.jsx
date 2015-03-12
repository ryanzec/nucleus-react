var React = require('react/addons');

var flexRow = {};

flexRow.displayName = 'FlexRow';

flexRow.mixins = [
  React.addons.PureRenderMixin
];

flexRow.propTypes = {
  verticalAlign: React.PropTypes.oneOf(['start', 'center', 'end']),
  horizontalAlign: React.PropTypes.oneOf(['start', 'center', 'end']),
  className: React.PropTypes.string,
  hasMargin: React.PropTypes.bool
};

flexRow.getDefaultProps = function flexRowGetDefaultProps() {
  return {
    verticalAlign: null,
    horizontalAlign: null,
    className: null,
    hasMargin: false
  };
};

flexRow.getCssClasses = function flexRowGetCssClasses() {
  var cssClasses = ['flex-row'];

  if (this.props.verticalAlign) {
    cssClasses.push('m-vertical-align-' + this.props.verticalAlign);
  }

  if (this.props.horizontalAlign) {
    cssClasses.push('m-horizontal-align-' + this.props.horizontalAlign);
  }

  if (this.props.hasMargin === true) {
    cssClasses.push('m-has-margin');
  }

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

flexRow.render = function flexRowRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(flexRow);
