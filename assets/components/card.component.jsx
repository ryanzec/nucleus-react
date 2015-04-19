var React = require('react/addons');
var clickableMixin = require('../mixins/clickable.mixin');

var card = {};

card.displayName = 'Card';

card.mixins = [
  React.addons.PureRenderMixin,
  clickableMixin
];

card.propTypes = {
  className: React.PropTypes.string
};

card.getDefaultProps = function cardGetDefaultProps() {
  return {
    className: null
  };
};

card.getCssClasses = function cardGetCssClasses() {
  var cssClasses = ['card'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.props.isClickable === true) {
    cssClasses.push('has-clickability');
  }

  if (this.state.isPressed === true) {
    cssClasses.push('is-pressed');
  }

  return cssClasses;
};

card.render = function cardRender() {
  return (
    <div
      className={this.getCssClasses().join(' ')}
      {...this.getEventHandlerProps()}
    >
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(card);
