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

var FormLabel = function (_React$Component) {
  _inherits(FormLabel, _React$Component);

  function FormLabel(props) {
    _classCallCheck(this, FormLabel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormLabel).call(this, props));
  }

  _createClass(FormLabel, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = ['form-element__label'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (this.props.inputType) {
        cssClasses.push('m-' + this.props.inputType);
        cssClasses.push('m-' + this.props.inputAlignment);
      }

      return cssClasses;
    }
  }, {
    key: 'renderRequiredIcon',
    value: function renderRequiredIcon() {
      var node = null;

      if (this.props.isRequired) {
        node = _react2.default.createElement(_svgIcon2.default, {
          fragment: 'asterisk',
          className: 'form-element__required-icon'
        });
      }

      return node;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isHidden) {
        return null;
      }

      return _react2.default.createElement(
        'label',
        _extends({
          className: this.getCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'isRequired')),
        this.props.children,
        this.renderRequiredIcon()
      );
    }
  }]);

  return FormLabel;
}(_react2.default.Component);

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
  className: _react2.default.PropTypes.string,
  isRequired: _react2.default.PropTypes.bool,
  inputType: _customPropTypes2.default.formLabelInputTypes,
  inputAlignment: _customPropTypes2.default.formLabelInputAlignments,
  isHidden: _react2.default.PropTypes.bool
};

FormLabel.defaultProps = {
  className: null,
  isRequired: false,
  input: false,
  inputAlignment: 'left',
  isHidden: false
};

exports.default = FormLabel;