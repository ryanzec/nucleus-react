var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');

var formElementGroup = {};

formElementGroup.displayName = 'FormElementGroup';

formElementGroup.mixins = [
  ReactPureRenderMixin
];

formElementGroup.propTypes = {
  className: React.PropTypes.string
};

formElementGroup.getDefaultProps = function formElementGroupGetDefaultProps() {
  return {
    className: null
  };
};

formElementGroup.getCssClasses = function formElementGroupGetCssClasses() {
  var cssClasses = ['form-element__group'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

formElementGroup.renderInputGroupItems = function formElementGroupRenderInputGroupItems() {
  return React.Children.map(this.props.children, function formElementGroupRenderInputGroupItemsChildrenLoop(child) {
    return (
      <div className="form-element__group-item">
        {child}
      </div>
    );
  });
};

formElementGroup.render = function formElementGroupRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInputGroupItems()}
    </div>
  );
};

module.exports = React.createClass(formElementGroup);
