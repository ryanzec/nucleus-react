var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var cardContent = {};

cardContent.displayName = 'Card';

cardContent.mixins = [
  ReactPureRenderMixin
];

cardContent.propTypes = {
  className: React.PropTypes.string,
  renderArrow: React.PropTypes.bool
};

cardContent.getDefaultProps = function cardContentGetDefaultProps() {
  return {
    className: null,
    renderArrow: false
  };
};

cardContent.getCssClasses = function cardContentGetCssClasses() {
  var cssClasses = ['card__content'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

cardContent.renderArrow = function cardContentRenderArrow() {
  var arrow = null;

  if (this.props.renderArrow === true) {
    arrow = (
      <span className="card__content-arrow">
        <div className={'card__content-arrow-border m-' + this.props.arrowPosition}></div>
        <div className={'card__content-arrow-background m-' + this.props.arrowPosition}></div>
      </span>
    );
  }

  return arrow;
};

cardContent.render = function cardContentRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderArrow()}
      {this.props.children}
    </div>
  );
};

module.exports = React.createClass(cardContent);
