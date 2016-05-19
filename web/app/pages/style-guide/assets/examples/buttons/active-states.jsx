import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';

class ButtonsPageActiveStatesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button isActive={true}>Default</Button>
        <Button styleType="primary" isActive={true}>Primary</Button>
        <Button styleType="secondary" isActive={true}>Secondary</Button>
        <Button styleType="success" isActive={true}>Success</Button>
        <Button styleType="info" isActive={true}>Info</Button>
        <Button styleType="warning" isActive={true}>Warning</Button>
        <Button styleType="danger" isActive={true}>Danger</Button>
        <Button styleType="link" isActive={true}>Link</Button>
      </div>
    );
  }
}

ButtonsPageActiveStatesExample.displayName = 'ButtonsPageActiveStatesExample';

export default ButtonsPageActiveStatesExample;
