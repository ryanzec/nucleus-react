var React = require('react/addons');

var Overlay = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    absolutePositioned: React.PropTypes.bool.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    topContent: React.PropTypes.node
  },

  getDefaultProps: function() {
    return {
      absolutePositioned: false,
      isActive: false,
      topContent: null
    };
  },

  getCssClasses: function() {
    var cssClasses = ['overlay'];

    if(this.props.absolutePositioned === true) {
      cssClasses.push('m-absolute');
    }

    if(this.props.isActive !== true) {
      cssClasses.push('u-hide');
    }

    return cssClasses;
  },

  render: function() {
    var topContent = null;

    if(this.props.topContent) {
      topContent = (
        <div className="overlay__content">
          {this.props.topContent}
        </div>
      );
    }

    /* jshint ignore:start */
    return (
      <div className={this.getCssClasses().join(' ')}>
        {topContent}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = Overlay;
