var React = require('react/addons');

var card = {};

card.displayName = 'Card';

card.mixins = [
  React.addons.PureRenderMixin
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

  return cssClasses;
};

card.render = function cardRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(card);
