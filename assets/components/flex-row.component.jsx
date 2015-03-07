var React = require('react/addons');

var flexRow = {};

flexRow.displayName = 'FlexRow';

flexRow.mixins = [
  React.addons.PureRenderMixin
];

flexRow.propTypes = {
  alignItems: React.PropTypes.oneOf(['top', 'center', 'bottom']),
  className: React.PropTypes.string
};

flexRow.getDefaultProps = function() {
  return {
    alignItems: null,
    className: null
  };
};

flexRow.getCssClasses = function() {
  var cssClasses = ['flex-row'];

  if(this.props.alignItems) {
    cssClasses.push('m-align-' + this.props.alignItems);
  }

  if(this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

flexRow.render = function() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(flexRow);
