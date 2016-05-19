import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';

class ButtonsPageDisabledStatesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button disabled={true}>Default</Button>
        <Button styleType="primary" disabled={true}>Primary</Button>
        <Button styleType="secondary" disabled={true}>Secondary</Button>
        <Button styleType="success" disabled={true}>Success</Button>
        <Button styleType="info" disabled={true}>Info</Button>
        <Button styleType="warning" disabled={true}>Warning</Button>
        <Button styleType="danger" disabled={true}>Danger</Button>
        <Button styleType="link" disabled={true}>Link</Button>
      </div>
    );
  }
}

ButtonsPageDisabledStatesExample.displayName = 'ButtonsPageDisabledStatesExample';

export default ButtonsPageDisabledStatesExample;
