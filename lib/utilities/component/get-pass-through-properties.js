Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPassThroughProperties;

var _lodash = require('lodash.foreach');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPassThroughProperties(componentProperties) {
  for (var _len = arguments.length, skipProperties = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    skipProperties[_key - 1] = arguments[_key];
  }

  var passThroughProps = {};

  //NOTE: children should always be passed explicited
  skipProperties.push('children');

  (0, _lodash2.default)(componentProperties, function (value, key) {
    if (skipProperties.indexOf(key) === -1) {
      passThroughProps[key] = value;
    }
  });

  return passThroughProps;
};