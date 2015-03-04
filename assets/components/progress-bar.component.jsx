var React = require('react/addons');

var ProgressBar = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    className: React.PropTypes.string,
    percentageDone: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      className: null,
      percentageDone: 0,
      style: {}
    };
  },

  getCssClasses: function() {
    var cssClasses = ['progress-bar'];

    if(this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  },

  render: function() {
    return (
      <span
        style={this.props.style}
        className={this.getCssClasses().join(' ')}>
        <span
          className="progress-bar__indicator"
          style={{width: this.props.percentageDone + '%'}} />
      </span>
    );
  }
});

module.exports = ProgressBar;
