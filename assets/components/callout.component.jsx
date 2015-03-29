var React = require('react/addons');

var callout = {};

callout.displayName = 'Callout';

callout.mixins = [
  React.addons.PureRenderMixin
];

callout.propTypes = {
  className: React.PropTypes.string,
  headerText: React.PropTypes.string
};

callout.getDefaultProps = function calloutGetDefaultProps() {
  return {
    className: null,
    headerText: null
  };
};

callout.getCssClasses = function calloutGetCssClasses() {
  var cssClasses = ['callout'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

callout.renderHeader = function calloutRenderHeader() {
  var header = null;

  if (this.props.headerText) {
    header = (
      <header className="callout__header">{this.props.headerText}</header>
    );
  }

  return header;
};

callout.render = function calloutRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderHeader()}
      <div className="callout__content">
        {this.props.children}
      </div>
    </div>
  );
};

module.exports = React.createClass(callout);
