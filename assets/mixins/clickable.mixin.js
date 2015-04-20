var React = require('react/addons');

var clickableMixin = {};

clickableMixin.propTypes = {
  isClickable: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

clickableMixin.getDefaultProps = function clickableMixinGetDefaultProps() {
  return {
    isClickable: false,
    onClick: null,
    isQuiet: false
  };
};

clickableMixin.getInitialState = function clickableMixinGetInitialState() {
  return {
    isPressed: false
  };
};

clickableMixin.onMouseLeave = function clickableMixinOnMouseLeave() {
  this.setState({
    isPressed: false
  });
};

clickableMixin.onMouseDown = function clickableMixinOnMouseDown() {
  this.setState({
    isPressed: true
  });
};

clickableMixin.onMouseUp = function clickableMixinOnMouseUp() {
  this.setState({
    isPressed: false
  });
};

clickableMixin.getEventHandlerProps = function clickableMixinGetEventHandlerProps() {
  var props = {};

  if (this.props.isClickable === true) {
    if (this.props.onClick) {
      props.onClick = this.props.onClick;
    }

    props.onMouseDown = this.onMouseDown;
    props.onMouseUp = this.onMouseUp;
    props.onMouseLeave = this.onMouseLeave;
  }

  return props;
};

module.exports = clickableMixin;
