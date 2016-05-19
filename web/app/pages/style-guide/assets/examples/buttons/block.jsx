import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';

class ButtonsPageBlockExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button styleType="primary" isBlock={true}>Primary Block</Button>
        <Button styleType="secondary" isBlock={true}>Secondary Block</Button>
      </div>
    );
  }
}

ButtonsPageBlockExample.displayName = 'ButtonsPageBlockExample';

export default ButtonsPageBlockExample;
