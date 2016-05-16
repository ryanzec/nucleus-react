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

import Navigation from '../../../../assets/components/navigation.component.jsx';
import NavigationItem from '../../../../assets/components/navigation-item.component.jsx';

class NavigationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-navigation">
        <h1 className="test">Navigation</h1>
        <h4>Standard</h4>
        <Navigation>
          <NavigationItem isActive={true}>Active</NavigationItem>
          <NavigationItem>Link</NavigationItem>
          <NavigationItem>Another link</NavigationItem>
          <NavigationItem isDisabled={true}>Disabled</NavigationItem>
        </Navigation>
        <h4>Tabs</h4>
        <Navigation isTabs={true}>
          <NavigationItem>Link</NavigationItem>
          <NavigationItem isActive={true}>Active</NavigationItem>
          <NavigationItem>Another link</NavigationItem>
          <NavigationItem isDisabled={true}>Disabled</NavigationItem>
        </Navigation>
      </div>
    );
  }
}

NavigationsPage.displayName = 'NavigationsPage';

NavigationsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NavigationsPage;
