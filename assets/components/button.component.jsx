var React = require('react/addons');
var _ = require('lodash');

var button = {};

button.displayName = 'Button';

button.mixins = [
  React.addons.PureRenderMixin
];

button.propTypes = {
  className: React.PropTypes.string
};

button.getDefaultProps = function buttonGetDefaultProps() {
  return {
    className: null
  };
};

button.getCssClasses = function buttonGetCssClasses() {
  var cssClasses = [];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

button.getPassThroughProps = function buttonGetPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.children;

  return props;
};

button.render = function buttonRender() {
  return (
    <button
      className={this.getCssClasses().join(' ')}
      {...this.getPassThroughProps()}
    >
      {this.props.children}
    </button>
  );
};

module.exports = React.createClass(button);
