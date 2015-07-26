var React = require('react/addons');

var loadingBar = {};

loadingBar.displayName = 'LoadingBar';

loadingBar.mixins = [
  React.addons.PureRenderMixin
];

loadingBar.propTypes = {
  className: React.PropTypes.string,
  percentageDone: React.PropTypes.number
};

loadingBar.getDefaultProps = function loadingBarGetDefaultProps() {
  return {
    className: null,
    percentageDone: 0
  };
};

loadingBar.getCssClasses = function loadingBarGetCssClasses() {
  var cssClasses = ['loading-bar'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

loadingBar.render = function loadingBarRender() {
  return (
    <span className={this.getCssClasses().join(' ')}>
      <span
        className="loading-bar__indicator"
        style={{
          width: this.props.percentageDone + '%'
        }}
      />
    </span>
  );
};

module.exports = React.createClass(loadingBar);
