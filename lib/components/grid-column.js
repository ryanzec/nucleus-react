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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridRow = function (_React$Component) {
  _inherits(GridRow, _React$Component);

  function GridRow(props) {
    _classCallCheck(this, GridRow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GridRow).call(this, props));
  }

  _createClass(GridRow, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = ['grid__column'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (this.props.shrink) {
        cssClasses.push('m-shrink');
      }

      if (this.props.order) {
        cssClasses.push('m-order' + this.props.order);
      }

      if (this.props.smallSize) {
        cssClasses.push('m-small-size' + this.props.smallSize);
      }

      if (this.props.mediumSize) {
        cssClasses.push('m-medium-size' + this.props.mediumSize);
      }

      if (this.props.largeSize) {
        cssClasses.push('m-large-size' + this.props.largeSize);
      }

      if (this.props.extraLargeSize) {
        cssClasses.push('m-extra-large-size' + this.props.extraLargeSize);
      }

      if (this.props.smallOffset) {
        cssClasses.push('m-small-offset' + this.props.smallOffset);
      }

      if (this.props.mediumOffset) {
        cssClasses.push('m-medium-offset' + this.props.mediumOffset);
      }

      if (this.props.largeOffset) {
        cssClasses.push('m-large-offset' + this.props.largeOffset);
      }

      if (this.props.extraLargeOffset) {
        cssClasses.push('m-extra-large-offset' + this.props.extraLargeOffset);
      }

      return cssClasses;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({
          className: this.getCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'shrink', 'order', 'smallSize', 'mediumSize', 'largeSize', 'extraLargeSize', 'smallOffset', 'mediumOffset', 'largeOffset', 'extraLargeOffset')),
        this.props.children
      );
    }
  }]);

  return GridRow;
}(_react2.default.Component);

GridRow.displayName = 'GridRow';

GridRow.propTypes = {
  className: _react2.default.PropTypes.string,
  shrink: _react2.default.PropTypes.bool,
  order: _react2.default.PropTypes.number,
  smallSize: _react2.default.PropTypes.number,
  mediumSize: _react2.default.PropTypes.number,
  largeSize: _react2.default.PropTypes.number,
  extraLargeSize: _react2.default.PropTypes.number,
  smallOffset: _react2.default.PropTypes.number,
  mediumOffset: _react2.default.PropTypes.number,
  largeOffset: _react2.default.PropTypes.number,
  extraLargeOffset: _react2.default.PropTypes.number
};

GridRow.defaultProps = {
  className: null,
  shrink: false,
  order: null,
  smallSize: null,
  mediumSize: null,
  largeSize: null,
  extraLargeSize: null,
  smallOffset: null,
  mediumOffset: null,
  largeOffset: null,
  extraLargeOffset: null
};

exports.default = GridRow;