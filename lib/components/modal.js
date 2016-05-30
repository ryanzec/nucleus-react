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

var _appendBodyComponent = require('./append-body-component');

var _appendBodyComponent2 = _interopRequireDefault(_appendBodyComponent);

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_AppendBodyComponent) {
  _inherits(Modal, _AppendBodyComponent);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this, props));

    _this.setAppendElement();
    return _this;
  }

  _createClass(Modal, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _pureRenderShouldComponentUpdate2.default)(this.props, nextProps, this.state, nextState);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isActive) {
        document.querySelector('body').classList.add('modal-open');
      }

      this.updateSelf();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      //NOTE: need to make sure when closing the modal, the scroll position is reset to the top incase it is opened again
      if (!this.props.isActive && oldProps.isActive) {
        this.appendedElement.querySelector('.modal__wrapper').scrollTop = 0;
      }

      //NOTE we should only change the body call if the isActive has change incase there are multiple possible modals on the same page
      if (this.props.isActive !== oldProps.isActive) {
        if (this.props.isActive) {
          document.querySelector('body').classList.add('modal-open');
        } else if (!this.props.isActive) {
          document.querySelector('body').classList.remove('modal-open');
        }
      }

      this.updateSelf();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.isActive) {
        document.querySelector('body').classList.remove('modal-open');
      }

      this.removeAppendElement();
    }
  }, {
    key: 'getCssClasses',
    value: function getCssClasses() {
      var cssClasses = ['modal__wrapper'];

      if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
      }

      if (this.props.isActive) {
        cssClasses.push('is-active');
      }

      return cssClasses;
    }
  }, {
    key: 'updateSelf',
    value: function updateSelf() {
      var styles = {};

      if (this.props.isActive) {
        styles.display = 'block';
      }

      var modalNode = _react2.default.createElement(
        'div',
        _extends({
          className: this.getCssClasses().join(' ')
        }, (0, _getPassThroughProperties2.default)(this.props, 'className', 'isActive')),
        _react2.default.createElement(
          'div',
          { className: 'modal' },
          this.props.children
        ),
        _react2.default.createElement(_overlay2.default, { isActive: this.props.isActive })
      );

      this.updateAppendElement(modalNode);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Modal;
}(_appendBodyComponent2.default);

Modal.displayName = 'Modal';

Modal.propTypes = {
  className: _react2.default.PropTypes.string
};

Modal.defaultProps = {
  className: null
};

exports.default = Modal;