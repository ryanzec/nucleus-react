Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _customPropTypes = require('../utilities/component/custom-prop-types');

var _customPropTypes2 = _interopRequireDefault(_customPropTypes);

var _getPassThroughProperties = require('../utilities/component/get-pass-through-properties');

var _getPassThroughProperties2 = _interopRequireDefault(_getPassThroughProperties);

var _pureRenderShouldComponentUpdate = require('../utilities/pure-render-should-component-update');

var _pureRenderShouldComponentUpdate2 = _interopRequireDefault(_pureRenderShouldComponentUpdate);

var _formLabel = require('./form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _svgIcon = require('./svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormElementCheckbox = function (_React$Component) {
  _inherits(FormElementCheckbox, _React$Component);

  function FormElementCheckbox(props) {
    _classCallCheck(this, FormElementCheckbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormElementCheckbox).call(this, props));
  }

  _createClass(FormElementCheckbox, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = [];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      return cssClasses;
    }
  }, {
    key: 'render',
    value: function render() {
      var fragment = this.props.checked ? 'check-square' : 'square';
      var nodes = [];
      var textNode = _react2.default.createElement(
        'span',
        { key: 'text' },
        this.props.children
      );
      var iconNode = _react2.default.createElement(_svgIcon2.default, { key: 'icon', fragment: fragment });

      if (this.props.inputAlignment === 'left') {
        nodes = [iconNode, textNode];
      } else {
        nodes = [textNode, iconNode];
      }

      return _react2.default.createElement(
        _formLabel2.default,
        { inputType: 'checkbox', inputAlignment: this.props.inputAlignment },
        _react2.default.createElement('input', { type: 'hidden' }),
        nodes
      );
    }
  }]);

  return FormElementCheckbox;
}(_react2.default.Component);

FormElementCheckbox.displayName = 'FormElementCheckbox';

FormElementCheckbox.propTypes = {
  className: _react2.default.PropTypes.string,
  inputAlignment: _customPropTypes2.default.formLabelInputAlignments
};

FormElementCheckbox.defaultProps = {
  className: null,
  inputAlignment: 'left'
};

exports.default = FormElementCheckbox;