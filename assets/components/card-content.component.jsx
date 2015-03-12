var React = require('react/addons');

var cardContent = {};

cardContent.displayName = 'Card';

cardContent.mixins = [
  React.addons.PureRenderMixin
];

cardContent.propTypes = {
  className: React.PropTypes.string
};

cardContent.getDefaultProps = function cardContentGetDefaultProps() {
  return {
    className: null
  };
};

cardContent.getCssClasses = function cardContentGetCssClasses() {
  var cssClasses = ['card__content'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

cardContent.render = function cardContentRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(cardContent);
