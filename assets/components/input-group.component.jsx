var React = require('react/addons');

var InputGroup = React.createClass({
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
    var cssClasses = ['form-element__input-group'];

    if(this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  },

  renderInputGroupItems: function() {
    return React.Children.map(this.props.children, function(child) {
      return (
        <div className="form-element__input-group-item">
          {child}
        </div>
      );
    });
  },

  render: function() {
    return (
      <span className={this.getCssClasses().join(' ')}>
        {this.renderInputGroupItems()}
      </span>
    );
  }
});

module.exports = InputGroup;
