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

import Alert from '../../../../assets/components/alert.component.jsx';
import AlertLink from '../../../../assets/components/alert-link.component.jsx';

class AlertsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDismissableAlert: true
    };

    this.onClickCloseDismissableAlert = this.onClickCloseDismissableAlert.bind(this);
  }

  onClickCloseDismissableAlert(event) {
    this.setState({
      displayDismissableAlert: false
    });
  }

  render() {
    var dismissableAlert = null;

    if (this.state.displayDismissableAlert) {
      dismissableAlert = (
        <Alert styleType="success" isDismissable={true} onClickClose={this.onClickCloseDismissableAlert}>Success</Alert>
      );
    }

    return (
      <div className="p-style-guide-alerts">
        <h1 className="test">Alerts</h1>
        <h4>Standard</h4>
        <div>
          <Alert styleType="success">Success</Alert>
          <Alert styleType="info">Info</Alert>
          <Alert styleType="warning">Warning</Alert>
          <Alert styleType="danger">Danger</Alert>
        </div>
        <h4>Links</h4>
        <div>
          <Alert styleType="success"><strong>Success</strong> with <AlertLink>link</AlertLink></Alert>
          <Alert styleType="info"><strong>Info</strong> with <AlertLink>link</AlertLink></Alert>
          <Alert styleType="warning"><strong>Warning</strong> with <AlertLink>link</AlertLink></Alert>
          <Alert styleType="danger"><strong>Danger</strong> with <AlertLink>link</AlertLink></Alert>
        </div>
        <h4>Closeable</h4>
        <div>
          {dismissableAlert}
        </div>
      </div>
    );
  }
}

AlertsPage.displayName = 'AlertsPage';

AlertsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AlertsPage;
