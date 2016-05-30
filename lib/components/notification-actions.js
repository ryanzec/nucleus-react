Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _customPropTypes = require('../utilities/component/custom-prop-types');

var _customPropTypes2 = _interopRequireDefault(_customPropTypes);

var _getPassThroughProperties = require('../utilities/component/get-pass-through-properties');

var _getPassThroughProperties2 = _interopRequireDefault(_getPassThroughProperties);

var _pureRenderShouldComponentUpdate = require('../utilities/pure-render-should-component-update');

var _pureRenderShouldComponentUpdate2 = _interopRequireDefault(_pureRenderShouldComponentUpdate);

var _svgIcon = require('./svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationActions = function (_React$Component) {
  _inherits(NotificationActions, _React$Component);

  function NotificationActions(props) {
    _classCallCheck(this, NotificationActions);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationActions).call(this, props));
  }

  _createClass(NotificationActions, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = ['notification__actions'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      return cssClasses;
    }
  }, {
    key: 'renderTextActions',
    value: function renderTextActions() {
      var nodes = [];
      var positiveNode = _react2.default.createElement(
        'span',
        { key: '0', className: 'notification__actions-action' },
        'Accept'
      );
      var negativeNode = _react2.default.createElement(
        'span',
        { key: '1', className: 'notification__actions-action' },
        'Decline'
      );
      var dividerNode = _react2.default.createElement(
        'span',
        { key: '2', className: 'notification__actions-divider' },
        '|'
      );

      if (this.props.actions === 'negative') {
        nodes = [negativeNode];
      } else if (this.props.actions === 'positive') {
        nodes = [positiveNode];
      } else {
        nodes = [negativeNode, dividerNode, positiveNode];
      }

      return nodes;
    }
  }, {
    key: 'renderIconActions',
    value: function renderIconActions() {
      var nodes = [];
      var positiveNode = _react2.default.createElement(_svgIcon2.default, { key: '0', fragment: 'check', className: 'notification__actions-action' });
      var negativeNode = _react2.default.createElement(_svgIcon2.default, { key: '1', fragment: 'times', className: 'notification__actions-action' });

      if (this.props.actions === 'negative') {
        nodes = [negativeNode];
      } else if (this.props.actions === 'positive') {
        nodes = [positiveNode];
      } else {
        nodes = [negativeNode, positiveNode];
      }

      return nodes;
    }
  }, {
    key: 'render',
    value: function render() {
      var actionNodes = this.props.type === 'icons' ? this.renderIconActions() : this.renderTextActions();

      return _react2.default.createElement(
        'div',
        _extends({
          className: this.getCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'type', 'actions')),
        actionNodes
      );
    }
  }]);

  return NotificationActions;
}(_react2.default.Component);

NotificationActions.displayName = 'NotificationActions';

NotificationActions.propTypes = {
  className: _react2.default.PropTypes.string,
  type: _customPropTypes2.default.notificationActionsTypes,
  actions: _customPropTypes2.default.notificationActionsActions
};

NotificationActions.defaultProps = {
  className: null,
  text: 'icons',
  actions: 'negative'
};

exports.default = NotificationActions;