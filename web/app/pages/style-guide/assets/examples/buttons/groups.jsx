import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';
import ButtonGroup from '../../../../../../../assets/components/button-group.component.jsx';

class ButtonsPageStylesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonGroup>
        <Button styleType="primary">Primary</Button>
        <Button styleType="secondary" disabled={true}>Secondary</Button>
        <Button styleType="success">Success</Button>
      </ButtonGroup>
    );
  }
}

ButtonsPageStylesExample.displayName = 'ButtonsPageStylesExample';

export default ButtonsPageStylesExample;
