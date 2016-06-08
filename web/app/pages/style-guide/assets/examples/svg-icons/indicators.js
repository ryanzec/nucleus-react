import React from 'react';

import SvgIcon from '../../../../../../../src/components/svg-icon';

class SvgIconsIndicatorsExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <SvgIcon
          indicator="success"
          fragment="user"
        />
        <SvgIcon
          indicator="info"
          fragment="user"
        />
        <SvgIcon
          indicator="warning"
          fragment="user"
        />
        <SvgIcon
          indicator="danger"
          fragment="user"
        />
      </span>
      );
  }
}

SvgIconsIndicatorsExample.displayName = 'SvgIconsIndicatorsExample';

export default SvgIconsIndicatorsExample;
