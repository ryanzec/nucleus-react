import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';
import ButtonGroup from '../../../../../../../assets/components/button-group.component.jsx';

class ButtonsPageToolbarExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonGroup isToolbar={true}>
        <ButtonGroup>
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary" disabled={true}>Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary">Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button styleType="primary">Primary</Button>
        </ButtonGroup>
      </ButtonGroup>
    );
  }
}

ButtonsPageToolbarExample.displayName = 'ButtonsPageToolbarExample';

export default ButtonsPageToolbarExample;
