var React = require('react/addons');

var card = {};

card.displayName = 'Card';

card.mixins = [
  React.addons.PureRenderMixin
];

card.propTypes = {
  className: React.PropTypes.string,
  isClickable: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

card.getDefaultProps = function cardGetDefaultProps() {
  return {
    className: null,
    isClickable: false,
    onClick: null
  };
};

card.getInitialState = function cardGetInitialState() {
  return {
    isPressed: false
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

card.onMouseLeave = function cardOnMouseLeave() {
  this.setState({
    isPressed: false
  });
};

card.onMouseDown = function cardOnMouseDown() {
  this.setState({
    isPressed: true
  });
};

card.onMouseUp = function cardOnMouseUp() {
  this.setState({
    isPressed: false
  });
};

card.render = function cardRender() {
  return (
    <div
      className={this.getCssClasses().join(' ')}
      onClick={this.props.onClick}
      onMouseDown={this.onMouseDown}
      onMouseUp={this.onMouseUp}
      onMouseLeave={this.onMouseLeave}
    >
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(card);
