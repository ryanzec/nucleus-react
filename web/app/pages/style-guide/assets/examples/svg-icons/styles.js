import React from 'react';

import SvgIcon from '../../../../../../../src/components/svg-icon/SvgIcon';

class SvgIconsIndicatorsExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <SvgIcon
          styleType="success"
          fragment="user"
        />
        <SvgIcon
          styleType="info"
          fragment="user"
        />
        <SvgIcon
          styleType="warning"
          fragment="user"
        />
        <SvgIcon
          styleType="danger"
          fragment="user"
        />
      </span>
    );
  }
}

export default SvgIconsIndicatorsExample;
