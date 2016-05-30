Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppendBodyComponent = function (_React$Component) {
  _inherits(AppendBodyComponent, _React$Component);

  function AppendBodyComponent(props) {
    _classCallCheck(this, AppendBodyComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppendBodyComponent).call(this, props));
  }

  _createClass(AppendBodyComponent, [{
    key: 'setAppendElement',
    value: function setAppendElement() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var tag = options.tag || 'div';
      var className = options.className || 'append-body-wrapper';

      this.appendedElement = document.createElement(tag);
      this.appendedElement.className = className;

      document.body.appendChild(this.appendedElement);
    }
  }, {
    key: 'updateAppendElement',
    value: function updateAppendElement(content) {
      if (content) {
        _reactDom2.default.render(content, this.appendedElement);
      } else {
        _reactDom2.default.render(_react2.default.createElement('noscript', null), this.appendedElement);
      }
    }
  }, {
    key: 'removeAppendElement',
    value: function removeAppendElement() {
      document.body.removeChild(this.appendedElement);
      this.appendedElement = null;
    }
  }]);

  return AppendBodyComponent;
}(_react2.default.Component);

AppendBodyComponent.displayName = 'AppendBodyComponent';

exports.default = AppendBodyComponent;