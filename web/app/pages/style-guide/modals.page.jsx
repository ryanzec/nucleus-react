import React from 'react';

import Code from '../../../../assets/components/code.component.jsx';
import Modal from '../../../../assets/components/modal.component.jsx';
import ModalHeader from '../../../../assets/components/modal-header.component.jsx';
import ModalContent from '../../../../assets/components/modal-content.component.jsx';
import ModalFooter from '../../../../assets/components/modal-footer.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';

class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveModal1: false,
      isActiveModal2: false,
      isActiveModal3: false,
      isActiveModal4: true
    };

    this.onClickToggleModal1 = this.onClickToggleModal1.bind(this);
    this.closeHandler1 = this.closeHandler1.bind(this);
    this.onClickToggleModal2 = this.onClickToggleModal2.bind(this);
    this.closeHandler2 = this.closeHandler2.bind(this);
    this.onClickToggleModal3 = this.onClickToggleModal3.bind(this);
    this.closeHandler3 = this.closeHandler3.bind(this);
    this.onClickToggleModal4 = this.onClickToggleModal4.bind(this);
    this.closeHandler4 = this.closeHandler4.bind(this);
  }

  onClickToggleModal1() {
    this.setState({
      isActiveModal1: !this.state.isActiveModal1
    })
  }

  closeHandler1() {
    this.setState({
      isActiveModal1: false
    })
  }

  onClickToggleModal2() {
    this.setState({
      isActiveModal2: !this.state.isActiveModal2
    })
  }

  closeHandler2() {
    this.setState({
      isActiveModal2: false
    })
  }

  onClickToggleModal3() {
    this.setState({
      isActiveModal3: !this.state.isActiveModal3
    })
  }

  closeHandler3() {
    this.setState({
      isActiveModal3: false
    })
  }

  onClickToggleModal4() {
    this.setState({
      isActiveModal4: !this.state.isActiveModal4
    })
  }

  closeHandler4() {
    this.setState({
      isActiveModal4: false
    })
  }

  render() {
    return (
      <div className="p-style-guide-modals">
        <h1>Modals</h1>
        <h2>Just Content</h2>
        <Button onClick={this.onClickToggleModal1}>Modal1</Button>
        <Modal isActive={this.state.isActiveModal1}>
          <ModalContent>
            <div>content<Button onClick={this.closeHandler1}>Close</Button></div>
          </ModalContent>
        </Modal>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <h2>Header</h2>
        <Button onClick={this.onClickToggleModal2}>Modal2</Button>
        <Modal isActive={this.state.isActiveModal2}>
          <ModalHeader>
            Header
          </ModalHeader>
          <ModalContent>
            <div>content<Button onClick={this.closeHandler2}>Close</Button></div>
          </ModalContent>
        </Modal>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <h2>Footer</h2>
        <Button onClick={this.onClickToggleModal3}>Modal3</Button>
        <Modal isActive={this.state.isActiveModal3}>
          <ModalContent>
            <div>content<Button onClick={this.closeHandler3}>Close</Button></div>
          </ModalContent>
          <ModalFooter>
            Footer
          </ModalFooter>
        </Modal>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <h2>Extra Long</h2>
        <Button onClick={this.onClickToggleModal4}>Modal4</Button>
        <Modal isActive={this.state.isActiveModal4}>
          <ModalHeader closeHandler={this.closeHandler4}>
            Header
          </ModalHeader>
          <ModalContent>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </ModalContent>
          <ModalFooter isActions={true}>
            <Button onClick={this.closeHandler4}>Cancel</Button><Button onClick={this.closeHandler4}>Save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalPage.displayName = 'ModalPage';

ModalPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ModalPage;
