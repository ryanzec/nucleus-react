import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';
import ButtonGroup from '../../../../../../../assets/components/button-group.component.jsx';

class ButtonsPageGroupSizesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ButtonGroup size="lg">
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary" disabled={true}>Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary">Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
        <ButtonGroup size="sm">
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary">Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
      </div>
    );
  }
}

ButtonsPageGroupSizesExample.displayName = 'ButtonsPageGroupSizesExample';

export default ButtonsPageGroupSizesExample;
