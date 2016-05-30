Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nucleusIcons = require('nucleus-icons');

var _nucleusIcons2 = _interopRequireDefault(_nucleusIcons);

var _pureRenderShouldComponentUpdate = require('../utilities/pure-render-should-component-update');

var _pureRenderShouldComponentUpdate2 = _interopRequireDefault(_pureRenderShouldComponentUpdate);

var _getPassThroughProperties = require('../utilities/component/get-pass-through-properties');

var _getPassThroughProperties2 = _interopRequireDefault(_getPassThroughProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgIcon = function (_React$Component) {
  _inherits(SvgIcon, _React$Component);

  function SvgIcon(props) {
    _classCallCheck(this, SvgIcon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SvgIcon).call(this, props));
  }

  _createClass(SvgIcon, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'getInnerCssClasses',
    value: function getInnerCssClasses() {
      var cssClasses = ['svg-icon__container', this.props.fragment + '-icon'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (this.props.styleType) {
        cssClasses.push('m-' + this.props.styleType);
      }

      return cssClasses;
    }
  }, {
    key: 'getOuterCssClasses',
    value: function getOuterCssClasses() {
      var cssClasses = ['svg-icon__outer-container', this.props.fragment + '-icon'];

      if (this.props.outerClassName) {
        cssClasses = cssClasses.concat(this.props.outerClassName.split(' '));
      }

      if (this.props.isClickable === true) {
        cssClasses.push('has-clickability');
      }

      return cssClasses;
    }
  }, {
    key: 'getIndicatorHtml',
    value: function getIndicatorHtml() {
      var indicator = '';

      if (this.props.indicator) {
        indicator = '<div class="svg-icon__indicator m-' + this.props.indicator + '"></div>';
      }

      return indicator;
    }
  }, {
    key: 'getSvgHtml',
    value: function getSvgHtml() {
      if (this.props.size) {
        return _nucleusIcons2.default[this.props.size][this.props.fragment];
      }

      return _nucleusIcons2.default[this.props.fragment];
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        _extends({
          className: this.getOuterCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'fragment', 'indicator', 'outerClassName', 'size', 'styleType')),
        _react2.default.createElement('span', {
          className: this.getInnerCssClasses().join(' '),
          dangerouslySetInnerHTML: {
            __html: this.getSvgHtml() + this.getIndicatorHtml()
          }
        })
      );
    }
  }]);

  return SvgIcon;
}(_react2.default.Component);

SvgIcon.displayName = 'SvgIcon';

SvgIcon.propTypes = {
  className: _react2.default.PropTypes.string,
  styleType: _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  fragment: _react2.default.PropTypes.string,
  indicator: _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  outerClassName: _react2.default.PropTypes.string,
  size: _react2.default.PropTypes.string
};

SvgIcon.defaultProps = {
  className: null,
  styleType: null,
  fragment: null,
  indicator: null,
  outerClassName: null,
  size: null
};

exports.default = SvgIcon;