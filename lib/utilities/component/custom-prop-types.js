Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttonStyleTypes = _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'link']);
var badgeStyleTypes = _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
var buttonAligns = _react2.default.PropTypes.oneOf(['left', 'right']);
var gridRowAlignments = _react2.default.PropTypes.oneOf(['left', 'center', 'right', 'spaced', 'justify']);
var cardStyleTypes = _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
var progressBarStyleTypes = _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
var notificationStyleTypes = _react2.default.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
var notificationActionsTypes = _react2.default.PropTypes.oneOf(['icons', 'text']);
var notificationActionsActions = _react2.default.PropTypes.oneOf(['positive', 'negative', 'both']);
var formLabelInputTypes = _react2.default.PropTypes.oneOf([false, 'checkbox', 'radio']);
var formLabelInputAlignments = _react2.default.PropTypes.oneOf(['left', 'right']);
var gridFormLabelAlignments = _react2.default.PropTypes.oneOf(['left', 'right']);
var formValidations = _react2.default.PropTypes.oneOf([false, 'valid', 'invalid']);

exports.default = {
  buttonStyleTypes: buttonStyleTypes,
  buttonAligns: buttonAligns,
  gridRowAlignments: gridRowAlignments,
  cardStyleTypes: cardStyleTypes,
  progressBarStyleTypes: progressBarStyleTypes,
  notificationStyleTypes: notificationStyleTypes,
  notificationActionsTypes: notificationActionsTypes,
  notificationActionsActions: notificationActionsActions,
  badgeStyleTypes: badgeStyleTypes,
  formLabelInputTypes: formLabelInputTypes,
  formLabelInputAlignments: formLabelInputAlignments,
  formValidations: formValidations,
  gridFormLabelAlignments: gridFormLabelAlignments
};