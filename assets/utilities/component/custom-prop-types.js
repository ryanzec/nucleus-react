import React from 'react';

const buttonStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'link']);
const buttonAligns = React.PropTypes.oneOf(['left', 'right']);
const gridRowAlignments = React.PropTypes.oneOf(['left', 'center', 'right', 'spaced', 'justify']);
const cardStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);
const progressBarStyleTypes = React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']);

export default {
  buttonStyleTypes,
  buttonAligns,
  gridRowAlignments,
  cardStyleTypes,
  progressBarStyleTypes
};
