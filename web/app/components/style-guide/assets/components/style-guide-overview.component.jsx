var React = require('react/addons');

var StyleGuideExample = React.createClass({
  propTypes: {
    description: React.PropTypes.any
  },

  getDefaultProps: function() {
    return {
      description: null
    };
  },

  render: function() {
    return (
      <div className="style-guide__overview">
        <header className="style-guide__section-header">Overview</header>
        <div>
          {this.props.description}
        </div>
      </div>
    );
  }
});

module.exports = StyleGuideExample;
