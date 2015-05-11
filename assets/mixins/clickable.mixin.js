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
  var events = {};

  if (this.props.isClickable === true) {
    if (this.props.onClick) {
      events.onClick = this.props.onClick;
    }

    events.onMouseDown = this.onMouseDown;
    events.onTouchStart = this.onMouseDown;
    events.onMouseUp = this.onMouseUp;
    events.onTouchEnd = this.onMouseUp;
    events.onMouseLeave = this.onMouseLeave;
  }

  return events;
};

module.exports = clickableMixin;
