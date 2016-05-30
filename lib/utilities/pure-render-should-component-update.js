Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pureRenderShouldComponentUpdate;

var _shallowEquals = require('./shallow-equals');

var _shallowEquals2 = _interopRequireDefault(_shallowEquals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pureRenderShouldComponentUpdate(currentProps, nextProps, currentState, nextState) {
  return !(0, _shallowEquals2.default)(currentProps, nextProps) || !(0, _shallowEquals2.default)(currentState, nextState);
};