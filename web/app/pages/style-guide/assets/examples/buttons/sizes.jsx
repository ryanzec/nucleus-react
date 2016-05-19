import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';

class ButtonsPageSizesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button styleType="primary" size="lg">Large</Button>
        <Button styleType="primary">Default</Button>
        <Button styleType="primary" size="sm">Small</Button>
      </div>
    );
  }
}

ButtonsPageSizesExample.displayName = 'ButtonsPageSizesExample';

export default ButtonsPageSizesExample;
