import React from 'react';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

class SvgIconsDefaultExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon fragment="user" />
    );
  }
}

export default SvgIconsDefaultExample;
