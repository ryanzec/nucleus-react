var React = require('react/addons');

var inputGroup = {};

inputGroup.displayName = 'InputGroup';

inputGroup.mixins = [
  React.addons.PureRenderMixin
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
    <span className={this.getCssClasses().join(' ')}>
      {this.renderInputGroupItems()}
    </span>
  );
};

module.exports = React.createClass(inputGroup);
