import React from 'react';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

import Label from '../../../../assets/components/label.component.jsx';

class LabelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-labels">
        <h1 className="test">Labels</h1>
        <h4>Standard</h4>
        <div>
          <Label>Default</Label>
          <Label styleType="primary">Primary</Label>
          <Label styleType="success">Success</Label>
          <Label styleType="info">Info</Label>
          <Label styleType="warning">Warning</Label>
          <Label styleType="danger">Danger</Label>
        </div>
        <h4>Pill</h4>
        <div>
          <Label isPill={true}>Default</Label>
          <Label isPill={true} styleType="primary">Primary</Label>
          <Label isPill={true} styleType="success">Success</Label>
          <Label isPill={true} styleType="info">Info</Label>
          <Label isPill={true} styleType="warning">Warning</Label>
          <Label isPill={true} styleType="danger">Danger</Label>
        </div>
      </div>
    );
  }
}

LabelsPage.displayName = 'LabelsPage';

LabelsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LabelsPage;
