var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var inputGroup = {};

inputGroup.displayName = 'InputGroup';

inputGroup.mixins = [
  ReactPureRenderMixin
];

inputGroup.propTypes = {
  className: React.PropTypes.string
};

inputGroup.getDefaultProps = function inputGroupGetDefaultProps() {
  return {
    className: null
  };
};

inputGroup.getCssClasses = function inputGroupGetCssClasses() {
  var cssClasses = ['form-element__input-group'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

inputGroup.renderInputGroupItems = function inputGroupRenderInputGroupItems() {
  return React.Children.map(this.props.children, function inputGroupRenderInputGroupItemsChildrenLoop(child) {
    return (
      <div className="form-element__input-group-item">
        {child}
      </div>
    );
  });
};

inputGroup.render = function inputGroupRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInputGroupItems()}
    </div>
  );
};

module.exports = React.createClass(inputGroup);
