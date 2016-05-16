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

import Breadcrumbs from '../../../../assets/components/breadcrumbs.component.jsx';
import BreadcrumbItem from '../../../../assets/components/breadcrumb-item.component.jsx';

class BreadcrumbsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-breadcrumbs">
        <h1 className="test">Breadcrumbs</h1>
        <Breadcrumbs>
          <BreadcrumbItem isActive={true}>Home</BreadcrumbItem>
        </Breadcrumbs>
        <Breadcrumbs>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem isActive={true}>Library</BreadcrumbItem>
        </Breadcrumbs>
        <Breadcrumbs style={{marginBottom: '5px'}}>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Library</BreadcrumbItem>
          <BreadcrumbItem isActive={true}>Data</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    );
  }
}

BreadcrumbsPage.displayName = 'BreadcrumbsPage';

BreadcrumbsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BreadcrumbsPage;
