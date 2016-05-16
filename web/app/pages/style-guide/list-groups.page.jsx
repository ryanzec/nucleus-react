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

import ListGroup from '../../../../assets/components/list-group.component.jsx';
import ListGroupItem from '../../../../assets/components/list-group-item.component.jsx';
import ListGroupItemHeader from '../../../../assets/components/list-group-item-header.component.jsx';
import ListGroupItemText from '../../../../assets/components/list-group-item-text.component.jsx';
import Label from '../../../../assets/components/label.component.jsx';


class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-list-groups">
        <h1 className="test">List Groups</h1>
        <h4>Basic</h4>
        <ListGroup>
          <ListGroupItem isActive={true}>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <h4>Label</h4>
        <ListGroup>
          <ListGroupItem>
            <Label isPill={true} className="pull-xs-right">14</Label>
            Cras justo odio
          </ListGroupItem>
          <ListGroupItem>
            <Label styleType="primary" isPill={true} className="pull-xs-right">2</Label>
            Dapibus ac facilisis in
          </ListGroupItem>
          <ListGroupItem>
            <Label styleType="danger" isPill={true} className="pull-xs-right">1</Label>
            Morbi leo risus
          </ListGroupItem>
        </ListGroup>
        <h4>Disabled</h4>
        <ListGroup>
          <ListGroupItem isDisabled={true}>
            Cras justo odio
          </ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <h4>Style Types</h4>
        <ListGroup>
          <ListGroupItem styleType="success">Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem styleType="info">Cras sit amet nibh libero</ListGroupItem>
          <ListGroupItem styleType="warning">Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem styleType="danger">Vestibulum at eros</ListGroupItem>
          <ListGroupItem styleType="success" isActive={true}>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem styleType="info" isActive={true}>Cras sit amet nibh libero</ListGroupItem>
          <ListGroupItem styleType="warning" isActive={true}>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem styleType="danger" isActive={true}>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <h4>Custom Content</h4>
        <ListGroup>
          <ListGroupItem isActive={true}>
            <ListGroupItemHeader>List group item heading</ListGroupItemHeader>
            <ListGroupItemText>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeader>List group item heading</ListGroupItemHeader>
            <ListGroupItemText>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeader>List group item heading</ListGroupItemHeader>
            <ListGroupItemText>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

ButtonsPage.displayName = 'ButtonsPage';

ButtonsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonsPage;
