/**
 * @todo: look into replacing tooltipSpacing with pure css
 */
var React = require('react/addons');
var appendBodyMixin = require('./append-body.mixin.jsx');
var _ = require('lodash');
var singlePanelManager = require('../stores/single-panel-manager.store');
var domUtilities = require('dom-utilities');

var tooltipMixin = {};

tooltipMixin._tooltipDisplayTimeoutId = null;

tooltipMixin.mixins = [
  React.addons.PureRenderMixin,
  appendBodyMixin
];

tooltipMixin.propTypes = {
  tooltipVertical: React.PropTypes.oneOf(['top', 'center', 'bottom']),
  tooltipHorizontal: React.PropTypes.oneOf(['left', 'center', 'right']),
  tooltipShowDelay: React.PropTypes.number,
  tooltipHideDelay: React.PropTypes.number,
  tooltipFixed: React.PropTypes.bool,
  tooltipSpacing: React.PropTypes.number
};

tooltipMixin.getInitialState = function tooltipMixinGetInitialState() {
  return {
    tooltipActive: false,
    tooltipStickyActive: false
  };
};

tooltipMixin.getDefaultProps = function tooltipMixinGetDefaultProps() {
  return {
    tooltipVertical: 'bottom',
    tooltipHorizontal: 'right',
    tooltipShowDelay: 0,
    tooltipHideDelay: 0,
    tooltipFixed: false,
    tooltipSpacing: 5
  };
};

tooltipMixin.componentDidMount = function tooltipMixinComponentDidMount() {
  this.createAppendElement();
  var appendBody = this.getAppendElement();
  var node = this.getDOMNode();
  var handle = node.getElementsByClassName('tooltip__handle')[0];
  var tooltipContent = appendBody.getElementsByClassName('tooltip__content')[0];

  //NOTE: not using domEventManagerMixin because I need to make sure to add/remove the events in correct order
  handle.addEventListener('mouseenter', this._tooltipMouseEnter);
  handle.addEventListener('mouseleave', this._tooltipMouseLeave);
  tooltipContent.addEventListener('mouseenter', this._tooltipMouseEnter);
  tooltipContent.addEventListener('mouseleave', this._tooltipMouseLeave);

  if (_.isFunction(this.getTooltipStickyContent)) {
    tooltipContent.addEventListener('click', this._tooltipContentClick);
    handle.addEventListener('click', this._tooltipClick);
  }

  singlePanelManager.registerComponent({
    component: this
  });
};

tooltipMixin.componentWillUnmount = function tooltipMixinComponentWillUnmount() {
  var node = this.getDOMNode();
  var handle = node.getElementsByClassName('tooltip__handle')[0];
  var appendBody = this.getAppendElement();
  var tooltipContent = appendBody.getElementsByClassName('tooltip__content')[0];

  //NOTE: not using domEventManagerMixin because I need to make sure to add/remove the events in correct order
  handle.removeEventListener('mouseenter', this._tooltipMouseEnter);
  handle.removeEventListener('mouseleave', this._tooltipMouseLeave);
  tooltipContent.removeEventListener('mouseenter', this._tooltipMouseEnter);
  tooltipContent.removeEventListener('mouseleave', this._tooltipMouseLeave);

  if (_.isFunction(this.getTooltipStickyContent)) {
    tooltipContent.removeEventListener('click', this._tooltipContentClick);
    handle.removeEventListener('click', this._tooltipClick);
  }

  this.removeAppendElement();

  singlePanelManager.unregisterComponent({
    component: this
  });
};

/* istanbul ignore next */
tooltipMixin._getTooltipTopPositions = function tooltipMixinGetTooltipPositions(tooltipHandleNode, tooltipNode) {
  var handleDimensions = domUtilities.getDimensions(tooltipHandleNode);
  var tooltipClientRect = tooltipNode.getBoundingClientRect();

  var tops = {
    top: Math.round(handleDimensions.top - tooltipClientRect.height - this.props.tooltipSpacing),
    center: Math.round(handleDimensions.top - (tooltipClientRect.height / 2) + (handleDimensions.height / 2)),
    bottom: Math.round(handleDimensions.top + handleDimensions.height + this.props.tooltipSpacing)
  };

  if (this.props.tooltipFixed === false) {
    tops.top += window.pageYOffset;
    tops.center += window.pageYOffset;
    tops.bottom += window.pageYOffset;
  }

  return tops;
};

/* istanbul ignore next */
tooltipMixin._getTooltipLeftPositions = function tooltipMixingetTooltipLeftPosition(tooltipHandleNode, tooltipNode) {
  var handleDimensions = domUtilities.getDimensions(tooltipHandleNode);
  var tooltipClientRect = tooltipNode.getBoundingClientRect();

  var lefts = {
    left: Math.round(handleDimensions.left - tooltipClientRect.width - this.props.tooltipSpacing),
    center: Math.round(handleDimensions.left - (tooltipClientRect.width / 2) + (handleDimensions.width / 2)),
    right: Math.round(handleDimensions.left + handleDimensions.width + this.props.tooltipSpacing)
  };

  if (this.props.tooltipFixed === false) {
    lefts.left += window.pageXOffset;
    lefts.center += window.pageXOffset;
    lefts.right += window.pageXOffset;
  }

  return lefts;
};

/* istanbul ignore next */
tooltipMixin._fixHiddenTooltip = function tooltipMixinFixHiddenTooltip(tooltipNode, tops, lefts) {
  var newlyPositionedtooltipClientRect = tooltipNode.getBoundingClientRect();

  if (newlyPositionedtooltipClientRect.top < 0) {
    tooltipNode.style.top = tops.bottom + 'px';
  }

  if (newlyPositionedtooltipClientRect.right > window.innerWidth) {
    tooltipNode.style.left = lefts.left + 'px';
  }

  if (newlyPositionedtooltipClientRect.bottom > window.innerHeight) {
    tooltipNode.style.top = tops.top + 'px';
  }

  if (newlyPositionedtooltipClientRect.left < 0) {
    tooltipNode.style.left = lefts.right + 'px';
  }
};

/* istanbul ignore next */
tooltipMixin._setTooltipPosition = function tooltipMixinSetTooltipPosition() {
  var tooltipNode = this.getAppendElement().getElementsByClassName('tooltip__content')[0];
  var tooltipHandleNode = this.getDOMNode().getElementsByClassName('tooltip__handle')[0];
  var tooltipCurrentDisplay = tooltipNode.style.display;

  //setting these values will make sure the getDimensions retrieves the correct values by allow the content to flow naturally
  tooltipNode.style.visibility = 'hidden';
  tooltipNode.style.display = 'block';
  tooltipNode.style.top = '0px';
  tooltipNode.style.left = '0px';

  var tops = this._getTooltipTopPositions(tooltipHandleNode, tooltipNode);
  var lefts = this._getTooltipLeftPositions(tooltipHandleNode, tooltipNode);

  tooltipNode.style.top = tops[this.props.tooltipVertical] + 'px';
  tooltipNode.style.left = lefts[this.props.tooltipHorizontal] + 'px';

  this._fixHiddenTooltip(tooltipNode, tops, lefts);

  //reset styling that was done in order to get the client rect
  tooltipNode.style.visibility = 'visible';
  tooltipNode.style.display = tooltipCurrentDisplay;
};

tooltipMixin._tooltipMouseEnter = function tooltipMixinTooltipMouseEnter() {
  this._setTooltipPosition();

  if (this._tooltipDisplayTimeoutId) {
    clearTimeout(this._tooltipDisplayTimeoutId);
    this._tooltipDisplayTimeoutId = null;
  } else {
    this._tooltipDisplayTimeoutId = setTimeout(function tooltipMixinTooltipMouseEnterDelayActivation() {
      this._tooltipDisplayTimeoutId = null;
      this.setState({
        tooltipActive: true
      });
    }.bind(this), this.props.tooltipShowDelay);
  }
};

tooltipMixin._tooltipMouseLeave = function tooltipMixinTooltipMouseLeave() {
  if (this._tooltipDisplayTimeoutId) {
    clearTimeout(this._tooltipDisplayTimeoutId);
    this._tooltipDisplayTimeoutId = null;
  } else {
    this._tooltipDisplayTimeoutId = setTimeout(function tooltipMixinTooltipMouseLeaveDelayDeactivation() {
      this._tooltipDisplayTimeoutId = null;
      this.setState({
        tooltipActive: false
      });
    }.bind(this), this.props.tooltipHideDelay);
  }
};

tooltipMixin._tooltipClick = function tooltipMixinTooltipClick(event) {
  event.stopPropagation();

  this.setState({
    tooltipStickyActive: !this.state.tooltipStickyActive
  });

  this._setTooltipPosition();
};

tooltipMixin._tooltipContentClick = function tooltipMixinTooltipContentClick(event) {
  singlePanelManager.setClickedComponent({
    component: this
  });
};

tooltipMixin._getTooltipCssClasses = function tooltipMixingetTooltipCssClasses() {
  var cssClasses = ['tooltip__content'];

  if (this.state.tooltipActive === true || this.state.tooltipStickyActive === true) {
    cssClasses.push('is-active');
  }

  if (this.props.tooltipFixed === true) {
    cssClasses.push('m-fixed');
  }

  return cssClasses;
};

tooltipMixin.hideSinglePanel = function tooltipMixinHideSinglePanel() {
  this.setState({
    tooltipStickyActive: false
  });

  /* istanbul ignore else */
  if (this.state.tooltipStickyActive || this.state.tooltipActive) {
    this._setTooltipPosition();
  }
};

tooltipMixin.getAppendBodyContent = function tooltipMixinGetAppendBodyContent() {
  var content = this.state.tooltipStickyActive === true
  ? this.getTooltipStickyContent(this._getTooltipCssClasses().join(' '))
  : this.getTooltipContent(this._getTooltipCssClasses().join(' '));

  return content;
};

module.exports = tooltipMixin;
