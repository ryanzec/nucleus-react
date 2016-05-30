import React from 'react';

const buttonStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'link']);
const badgeStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
const buttonAligns = React.PropTypes.oneOf(['left', 'right']);
const gridRowAlignments = React.PropTypes.oneOf(['left', 'center', 'right', 'spaced', 'justify']);
const cardStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
const progressBarStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
const notificationStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
const notificationActionsTypes = React.PropTypes.oneOf(['icons', 'text']);
const notificationActionsActions = React.PropTypes.oneOf(['positive', 'negative', 'both']);
const formLabelInputTypes = React.PropTypes.oneOf([false, 'checkbox', 'radio']);
const formLabelInputAlignments = React.PropTypes.oneOf(['left', 'right']);
const gridFormLabelAlignments = React.PropTypes.oneOf(['left', 'right']);
const formValidations=  React.PropTypes.oneOf([false, 'valid', 'invalid']);

export default {
  buttonStyleTypes,
  buttonAligns,
  gridRowAlignments,
  cardStyleTypes,
  progressBarStyleTypes,
  notificationStyleTypes,
  notificationActionsTypes,
  notificationActionsActions,
  badgeStyleTypes,
  formLabelInputTypes,
  formLabelInputAlignments,
  formValidations,
  gridFormLabelAlignments
};
