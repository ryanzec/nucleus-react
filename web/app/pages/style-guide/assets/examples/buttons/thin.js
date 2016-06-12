import React from 'react';

import Button from '../../../../../../../src/components/button';

class ButtonsPillExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <span>
          <Button isThin>Default</Button>
          <Button
            styleType="success"
            isThin
            isPill
          >
            Success
          </Button>
          <Button
            styleType="info"
            isThin
          >
            Info
          </Button>
          <Button
            styleType="warning"
            isThin
            isPill
          >
            Warning
          </Button>
          <Button
            styleType="danger"
            isThin
          >
            Danger
          </Button>
        </span>
      );
  }
}

ButtonsPillExample.displayName = 'ButtonsPillExample';

export default ButtonsPillExample;
