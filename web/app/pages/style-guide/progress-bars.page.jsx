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

import ProgressBar from '../../../../assets/components/progress-bar.component.jsx';

class ProgressBars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-progress-bars">
        <h1 className="test">Progress Bars</h1>
        <h4>Default</h4>
        <ProgressBar>0%</ProgressBar>
        <ProgressBar value={25} max={100}>25%</ProgressBar>
        <ProgressBar value={50} max={100}>50%</ProgressBar>
        <ProgressBar value={75} max={100}>75%</ProgressBar>
        <ProgressBar value={100} max={100}>100%</ProgressBar>
        <h4>Style Types</h4>
        <ProgressBar styleType="success" value={25} max={100}>25%</ProgressBar>
        <ProgressBar styleType="info" value={50} max={100}>50%</ProgressBar>
        <ProgressBar styleType="warning" value={75} max={100}>75%</ProgressBar>
        <ProgressBar styleType="danger" value={100} max={100}>100%</ProgressBar>
        <h4>Striped</h4>
        <ProgressBar isStriped={true} styleType="success" value={25} max={100}>25%</ProgressBar>
        <ProgressBar isStriped={true} styleType="info" value={50} max={100}>50%</ProgressBar>
        <ProgressBar isStriped={true} styleType="warning" value={75} max={100}>75%</ProgressBar>
        <ProgressBar isStriped={true} styleType="danger" value={100} max={100}>100%</ProgressBar>
      </div>
    );
  }
}

ProgressBars.displayName = 'ProgressBars';

ProgressBars.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProgressBars;
