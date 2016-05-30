import React from 'react';

import Button from '../../../../../../../src/components/button';

class SvgIconsIndicatorsExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <span>
          <Button>Default</Button>
          <Button styleType="success">Success</Button>
          <Button styleType="info">Info</Button>
          <Button styleType="warning">Warning</Button>
          <Button styleType="danger">Danger</Button>
          <Button styleType="link">Link</Button>
        </span>
      );
  }
}

SvgIconsIndicatorsExample.displayName = 'SvgIconsIndicatorsExample';

export default SvgIconsIndicatorsExample;
