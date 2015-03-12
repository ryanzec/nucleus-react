var React = require('react/addons');

var cardHeader = {};

cardHeader.displayName = 'Card';

cardHeader.mixins = [
  React.addons.PureRenderMixin
];

cardHeader.propTypes = {
  className: React.PropTypes.string,
  renderArrow: React.PropTypes.bool,
  arrowPosition: React.PropTypes.oneOf(['top', 'bottom'])
};

cardHeader.getDefaultProps = function cardHeaderGetDefaultProps() {
  return {
    className: null,
    renderArrow: false,
    arrowPosition: 'bottom'
  };
};

cardHeader.getCssClasses = function cardHeaderGetCssClasses() {
  var cssClasses = ['card__header'];

  cssClasses.push();

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

cardHeader.renderArrow = function cardHeaderRenderArrow() {
  var arrow = null;

  if (this.props.renderArrow === true) {
    arrow = (
      <div className={'card__header-arrow m-' + this.props.arrowPosition}></div>
    );
  }

  return arrow;
};

cardHeader.render = function cardHeaderRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.props.children}
      {this.renderArrow()}
    </div>
  );
};

module.exports = React.createClass(cardHeader);
