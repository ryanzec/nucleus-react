import React from 'react';

import Button from '../../../../../../../src/components/button';

class ButtonsPillExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <span>
          <Button isPill>Default</Button>
          <Button
            styleType="success"
            isPill
          >
            Success
          </Button>
          <Button
            styleType="info"
            isPill
          >
            Info
          </Button>
          <Button
            styleType="warning"
            isPill
          >
            Warning
          </Button>
          <Button
            styleType="danger"
            isPill
          >
            Danger
          </Button>
        </span>
      );
  }
}

ButtonsPillExample.displayName = 'ButtonsPillExample';

export default ButtonsPillExample;
