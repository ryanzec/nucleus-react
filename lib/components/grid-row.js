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
      var cssClasses = ['grid__row', 'm-alignment-' + this.props.alignment];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (!this.props.isStretched) {
        cssClasses.push('m-no-stretch');
      }

      if (this.props.isVertical) {
        cssClasses.push('m-vertical');
      }

      if (this.props.canWrap) {
        cssClasses.push('m-wrapping');
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
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'isStretched', 'isVertical', 'canWrap', 'alignment')),
        this.props.children
      );
    }
  }]);

  return GridRow;
}(_react2.default.Component);

GridRow.displayName = 'GridRow';

GridRow.propTypes = {
  className: _react2.default.PropTypes.string,
  isStretched: _react2.default.PropTypes.bool,
  isVertical: _react2.default.PropTypes.bool,
  canWrap: _react2.default.PropTypes.bool,
  alignment: _customPropTypes2.default.gridRowAlignments
};

GridRow.defaultProps = {
  className: null,
  isStretched: true,
  isVertical: false,
  canWrap: false,
  alignment: 'left'
};

exports.default = GridRow;