Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pureRenderShouldComponentUpdate = require('../utilities/pure-render-should-component-update');

var _pureRenderShouldComponentUpdate2 = _interopRequireDefault(_pureRenderShouldComponentUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Code = function (_React$Component) {
  _inherits(Code, _React$Component);

  function Code(props) {
    _classCallCheck(this, Code);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Code).call(this, props));
  }

  _createClass(Code, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (process.env.ENV !== 'production') {
        if (!window.Prism) {
          console.warn('The Prism JavaScirpt / CSS must be included in order for the <Code /> component to work properly');
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.Prism.highlightElement(this.getCodeElement());
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      window.Prism.highlightElement(this.getCodeElement());
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
    key: 'getCodeElement',
    value: function getCodeElement() {
      if (this.props.isInline === true) {
        return _reactDom2.default.findDOMNode(this);
      } else {
        return _reactDom2.default.findDOMNode(this).querySelector('code');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var codeCssClasses = ['language-' + this.props.language];
      var preCssClasses = [];
      var codeAttributes = {};
      var preAttributes = {};

      if (this.props.showLineNumbers === true) {
        preCssClasses.push('line-numbers');

        if (this.props.lineNumberStart !== null) {
          preAttributes['data-start'] = this.props.lineNumberStart;
        }
      }

      if (this.props.highlightLines) {
        preAttributes['data-line'] = this.props.highlightLines;
      }

      if (this.props.className) {
        preCssClasses.push(this.props.className);
      }

      codeAttributes.className = codeCssClasses.join(' ');
      preAttributes.className = preCssClasses.join(' ');

      if (this.props.isInline !== true) {
        return _react2.default.createElement('pre', preAttributes, _react2.default.createElement('code', codeAttributes, this.props.children));
      } else {
        return _react2.default.createElement('code', codeAttributes, this.props.children);
      }
    }
  }]);

  return Code;
}(_react2.default.Component);

Code.displayName = 'Code';

Code.propTypes = {
  language: _react2.default.PropTypes.string,
  showLineNumbers: _react2.default.PropTypes.bool,
  lineNumberStart: _react2.default.PropTypes.number,
  highlightLines: _react2.default.PropTypes.string,
  isInline: _react2.default.PropTypes.bool
};

Code.defaultProps = {
  language: null,
  showLineNumbers: true,
  lineNumberStart: null,
  hightlightLines: null,
  isInline: false
};

exports.default = Code;