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
import Modal from '../../../../assets/components/modal.component.jsx';
import ModalContent from '../../../../assets/components/modal-content.component.jsx';
import ModalHeader from '../../../../assets/components/modal-header.component.jsx';
import ModalBody from '../../../../assets/components/modal-body.component.jsx';
import ModalFooter from '../../../../assets/components/modal-footer.component.jsx';
import ModalTitle from '../../../../assets/components/modal-title.component.jsx';

class ModalsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false
    };

    this.onClickOpenModal = this.onClickOpenModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
  }

  onClickOpenModal() {
    this.setState({
      isModalActive: true
    });
  }

  onClickCloseModal() {
    this.setState({
      isModalActive: false
    });
  }

  render() {
    return (
      <div className="p-style-guide-modals">
        <h1 className="test">Modals</h1>
        <Button onClick={this.onClickOpenModal}>Show Modal</Button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Button onClick={this.onClickOpenModal}>Show Modal</Button>
        <Modal isActive={this.state.isModalActive}>
          <ModalContent>
            <ModalHeader>
              <Button className="close" onClick={this.onClickCloseModal}>
                <span aria-hidden="true">&times;</span>
              </Button>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
            </ModalBody>
            <ModalFooter>
              <Button styleType="secondary" onClick={this.onClickCloseModal}>Close</Button>
              <Button styleType="primary" onClick={this.onClickCloseModal}>Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

ModalsPage.displayName = 'ModalsPage';

ModalsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ModalsPage;
