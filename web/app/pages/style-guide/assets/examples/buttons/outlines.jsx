import React from 'react';

import Button from '../../../../../../../assets/components/button.component.jsx';

class ButtonsPageOutlinesExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button isOutline={true}>Default</Button>
        <Button styleType="primary" isOutline={true}>Primary</Button>
        <Button styleType="secondary" isOutline={true}>Secondary</Button>
        <Button styleType="success" isOutline={true}>Success</Button>
        <Button styleType="info" isOutline={true}>Info</Button>
        <Button styleType="warning" isOutline={true}>Warning</Button>
        <Button styleType="danger" isOutline={true}>Danger</Button>
      </div>
    );
  }
}

ButtonsPageOutlinesExample.displayName = 'ButtonsPageOutlinesExample';

export default ButtonsPageOutlinesExample;
