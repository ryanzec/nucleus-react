var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var progressBar = {};

progressBar.displayName = 'ProgressBar';

progressBar.mixins = [
  ReactPureRenderMixin
];

progressBar.propTypes = {
  className: React.PropTypes.string,
  percentageDone: React.PropTypes.number,
  style: React.PropTypes.object
};

progressBar.getDefaultProps = function progressBarGetDefaultProps() {
  return {
    className: null,
    percentageDone: 0,
    style: {}
  };
};

progressBar.getCssClasses = function progressBarGetCssClasses() {
  var cssClasses = ['progress-bar'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

progressBar.render = function progressBarRender() {
  return (
    <span
      style={this.props.style}
      className={this.getCssClasses().join(' ')}
    >
      <span
        className="progress-bar__indicator"
        style={{
          width: this.props.percentageDone + '%'
        }}
      />
    </span>
  );
};

module.exports = React.createClass(progressBar);
