import React from 'react';

const buttonStyleTypes = React.PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']);
const buttonSizes = React.PropTypes.oneOf(['lg', 'sm']);

export default {
  buttonStyleTypes,
  buttonSizes
};
