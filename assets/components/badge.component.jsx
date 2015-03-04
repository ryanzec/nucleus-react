var React = require('react/addons');

var Badge = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      className: null
    };
  },

  getCssClasses: function() {
    var cssClasses = ['badge'];

    if(this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  },

  render: function() {
    return (
      <span className={this.getCssClasses().join(' ')}>{this.props.children}</span>
    );
  }
});

module.exports = Badge;
