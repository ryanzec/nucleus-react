Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _customPropTypes = require('../utilities/component/custom-prop-types');

var _customPropTypes2 = _interopRequireDefault(_customPropTypes);

var _getPassThroughProperties = require('../utilities/component/get-pass-through-properties');

var _getPassThroughProperties2 = _interopRequireDefault(_getPassThroughProperties);

var _pureRenderShouldComponentUpdate = require('../utilities/pure-render-should-component-update');

var _pureRenderShouldComponentUpdate2 = _interopRequireDefault(_pureRenderShouldComponentUpdate);

var _domEventManager = require('../utilities/dom/dom-event-manager');

var _domEventManager2 = _interopRequireDefault(_domEventManager);

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 1;

var PopoverContainer = function (_React$Component) {
  _inherits(PopoverContainer, _React$Component);

  function PopoverContainer(props) {
    _classCallCheck(this, PopoverContainer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PopoverContainer).call(this, props));

    _this.domEventManager = new _domEventManager2.default();

    _this.onClickOutside = _this.onClickOutside.bind(_this);
    return _this;
  }

  _createClass(PopoverContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onClickOutside) {
        this.domEventManager.add(document, 'mousedown', this.onClickOutside);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.domEventManager.clear();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'onClickOutside',
    value: function onClickOutside() {
      var closePopover = true;

      if (this.refs.content && (_reactDom2.default.findDOMNode(this.refs.content).contains(event.target) || _reactDom2.default.findDOMNode(this.refs.content) === event.target)) {
        closePopover = false;
      }

      if (closePopover) {
        this.props.onClickOutside();
      }
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = ['popover__container'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (this.props.isActive) {
        cssClasses.push('tether-enabled');
      }

      return cssClasses;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.isActive) {
        return this.props.children[0];
      }

      //NOTE: we need to add in a ref in order to make sure in the outside click handler we are not clicking on the content
      var children = _react2.default.Children.map(this.props.children, function (child, key) {
        return _react2.default.cloneElement(child, {
          ref: key === 0 ? 'handle' : 'content'
        });
      });

      return _react2.default.createElement(
        _reactTether2.default,
        _extends({
          className: this.getCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'isActive')),
        children
      );
    }
  }]);

  return PopoverContainer;
}(_react2.default.Component);

PopoverContainer.displayName = 'PopoverContainer';

PopoverContainer.propTypes = {
  className: _react2.default.PropTypes.string,
  isActive: _react2.default.PropTypes.bool,
  outClickOutside: _react2.default.PropTypes.func
};

PopoverContainer.defaultProps = {
  className: null,
  isActive: false,
  onClickOutside: null,

  //NOTE: default some ReactTether properties
  attachment: 'bottom center',
  constraints: [{
    to: 'scrollParent',
    attachment: 'together'
  }]
};

exports.default = PopoverContainer;