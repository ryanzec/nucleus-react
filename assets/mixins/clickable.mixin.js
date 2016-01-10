var React = require('react');

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

clickableMixin.onMouseLeave = function clickableMixinOnMouseLeave(event) {
  this.setState({
    isPressed: false
  });

  if (this.props.onMouseLeave) {
    this.props.onMouseLeave(event);
  }
};

clickableMixin.onMouseDown = function clickableMixinOnMouseDown(event) {
  this.setState({
    isPressed: true
  });

  if (this.props.onMouseDown) {
    this.props.onMouseDown(event);
  }
};

clickableMixin.onMouseUp = function clickableMixinOnMouseUp(event) {
  this.setState({
    isPressed: false
  });

  if (this.props.onMouseUp) {
    this.props.onMouseUp(event);
  }
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
