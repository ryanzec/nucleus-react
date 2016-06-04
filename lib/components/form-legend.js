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

var FormLegend = function (_React$Component) {
  _inherits(FormLegend, _React$Component);

  function FormLegend(props) {
    _classCallCheck(this, FormLegend);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormLegend).call(this, props));
  }

  _createClass(FormLegend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = ['form-element__legend'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (this.props.validation) {
        cssClasses.push('m-' + this.props.validation);
      }

      return cssClasses;
    }
  }, {
    key: 'render',
    value: function render() {
      var requiredDetailsNode = null;

      if (this.props.displayRequiredDetails) {
        requiredDetailsNode = _react2.default.createElement(
          'div',
          { className: 'form-required-details' },
          _react2.default.createElement(_svgIcon2.default, {
            fragment: 'asterisk',
            className: 'form-element__required-icon'
          }),
          'required field'
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({
          className: this.getCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'displayRequiredDetails')),
        this.props.children,
        requiredDetailsNode
      );
    }
  }]);

  return FormLegend;
}(_react2.default.Component);

FormLegend.displayName = 'FormLegend';

FormLegend.propTypes = {
  className: _react2.default.PropTypes.string,
  displayRequiredDetails: _react2.default.PropTypes.bool
};

FormLegend.defaultProps = {
  className: null,
  displayRequiredDetails: false
};

exports.default = FormLegend;