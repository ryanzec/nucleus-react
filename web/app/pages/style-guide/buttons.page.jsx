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

import Button from '../../../../assets/components/button.component.jsx';
import ButtonGroup from '../../../../assets/components/button-group.component.jsx';

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-buttons">
        <h1 className="test">Buttons</h1>
        <p>Buttons are used to trigger action by the user.</p>
        <h4>Styles</h4>
        <div>
          <Button>Default</Button>
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary">Secondary</Button>
          <Button styleType="success">Success</Button>
          <Button styleType="info">Info</Button>
          <Button styleType="warning">Warning</Button>
          <Button styleType="danger">Danger</Button>
          <Button styleType="link">Link</Button>
        </div>
        <h4>Outline</h4>
        <div>
          <Button isOutline={true}>Default</Button>
          <Button styleType="primary" isOutline={true}>Primary</Button>
          <Button styleType="secondary" isOutline={true}>Secondary</Button>
          <Button styleType="success" isOutline={true}>Success</Button>
          <Button styleType="info" isOutline={true}>Info</Button>
          <Button styleType="warning" isOutline={true}>Warning</Button>
          <Button styleType="danger" isOutline={true}>Danger</Button>
          <Button styleType="link" isOutline={true}>Link</Button>
        </div>
        <h4>Sizes</h4>
        <div>
          <Button styleType="primary" size="lg">Large</Button>
          <Button styleType="primary">Default</Button>
          <Button styleType="primary" size="sm">Small</Button>
        </div>
        <h4>Block</h4>
        <div>
          <Button styleType="primary" isBlock={true}>Primary Block</Button>
          <Button styleType="secondary" isBlock={true}>Secondary Block</Button>
        </div>
        <h4>Active State</h4>
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
        <h4>Disabled State</h4>
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
        <h4>Group</h4>
        <ButtonGroup>
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary" disabled={true}>Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
        <h4>Group Sizes</h4>
        <div>
          <ButtonGroup size="lg">
            <Button styleType="primary">Primary</Button>
            <Button styleType="secondary" disabled={true}>Secondary</Button>
            <Button styleType="success">Success</Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup>
            <Button styleType="primary">Primary</Button>
            <Button styleType="secondary">Secondary</Button>
            <Button styleType="success">Success</Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup size="sm">
            <Button styleType="primary">Primary</Button>
            <Button styleType="secondary">Secondary</Button>
            <Button styleType="success">Success</Button>
          </ButtonGroup>
        </div>
        <h4>Toolbar</h4>
        <ButtonGroup isToolbar={true}>
          <ButtonGroup>
            <Button styleType="primary">Primary</Button>
            <Button styleType="secondary" disabled={true}>Secondary</Button>
            <Button styleType="success">Success</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button styleType="primary">Primary</Button>
            <Button styleType="secondary">Secondary</Button>
            <Button styleType="success">Success</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button styleType="primary">Primary</Button>
          </ButtonGroup>
        </ButtonGroup>
        <h4>Vertical</h4>
        <ButtonGroup isVertical={true}>
          <Button styleType="primary">Primary</Button>
          <Button styleType="secondary" disabled={true}>Secondary</Button>
          <Button styleType="success">Success</Button>
        </ButtonGroup>
      </div>
    );
  }
}

ButtonsPage.displayName = 'ButtonsPage';

ButtonsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonsPage;
