var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var radioInputGroup = {};

radioInputGroup.displayName = 'RadioInputGroup';

radioInputGroup.mixins = [
  ReactPureRenderMixin
];

radioInputGroup.propTypes = {
  className: React.PropTypes.string
};

radioInputGroup.getDefaultProps = function radioInputGroupGetDefaultProps() {
  return {
    className: null
  };
};

radioInputGroup.getCssClasses = function radioInputGroupGetCssClasses() {
  var cssClasses = ['form-element__radio-group'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

radioInputGroup.renderInputGroupItems = function radioInputGroupRenderInputGroupItems() {
  return React.Children.map(this.props.children, function radioInputGroupRenderInputGroupItemsChildrenLoop(child) {
    return (
      <div className="form-element__radio-group-item">
        {child}
      </div>
    );
  });
};

radioInputGroup.render = function radioInputGroupRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInputGroupItems()}
    </div>
  );
};

module.exports = React.createClass(radioInputGroup);
