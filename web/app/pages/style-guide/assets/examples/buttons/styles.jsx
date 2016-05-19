import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';

class ButtonsPageStylesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button>Default</Button>
        <Button styleType="primary">Primary</Button>
        <Button styleType="secondary">Secondary</Button>
        <Button styleType="success">Success</Button>
        <Button styleType="info">Info</Button>
        <Button styleType="warning">Warning</Button>
        <Button styleType="danger">Danger</Button>
        <Button styleType="link">Link</Button>
      </div>
    );
  }
}

ButtonsPageStylesExample.displayName = 'ButtonsPageStylesExample';

export default ButtonsPageStylesExample;
