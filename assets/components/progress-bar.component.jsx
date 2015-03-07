var React = require('react/addons');

var progressBar = {};

progressBar.displayName = 'ProgressBar';

progressBar.mixins = [
  React.addons.PureRenderMixin
];

progressBar.propTypes = {
  className: React.PropTypes.string,
  percentageDone: React.PropTypes.number,
  style: React.PropTypes.object,
};

progressBar.getDefaultProps = function() {
  return {
    className: null,
    percentageDone: 0,
    style: {}
  };
};

progressBar.getCssClasses = function() {
  var cssClasses = ['progress-bar'];

  if(this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

progressBar.render = function() {
  return (
    <span
      style={this.props.style}
      className={this.getCssClasses().join(' ')}>
      <span
        className="progress-bar__indicator"
        style={{width: this.props.percentageDone + '%'}} />
    </span>
  );
};

module.exports = React.createClass(progressBar);
