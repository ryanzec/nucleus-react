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

import Overlay from '../../../../assets/components/overlay.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';

class OverlaysPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,
      isAbsoluteOverlayActive: false
    };

    this.onClickDefault = this.onClickDefault.bind(this);
    this.onClickAbsolute = this.onClickAbsolute.bind(this);
  }

  onClickDefault() {
    this.setState({
      isOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isOverlayActive: false
      });
    }.bind(this), 2000);
  }

  onClickAbsolute() {
    this.setState({
      isAbsoluteOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isAbsoluteOverlayActive: false
      });
    }.bind(this), 2000);
  }

  render() {
    return (
      <div className="p-style-guide-overlays">
        <h1 className="test">Overlays</h1>
        <Button onClick={this.onClickDefault}>Full Page</Button>
        <Overlay isActive={this.state.isOverlayActive} isAbsolute={true} />
        <div style={{position: 'relative', border: '1ps solid black', padding: '30px', margin: '20px'}}>
            <Button onClick={this.onClickAbsolute}>Specific Element Page</Button>
            <Overlay isActive={this.state.isAbsoluteOverlayActive} isAbsolute={true} />
        </div>
      </div>
    );
  }
}

OverlaysPage.displayName = 'OverlaysPage';

OverlaysPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default OverlaysPage;
