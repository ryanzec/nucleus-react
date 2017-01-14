import React from 'react';

import Code from '../../../../src/components/code';
import Modal from '../../../../src/components/modal';
import ModalHeader from '../../../../src/components/modal-header';
import ModalContent from '../../../../src/components/modal-content';
import ModalFooter from '../../../../src/components/modal-footer';
import Button from '../../../../src/components/button';

class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveModal1: false,
      isActiveModal2: false,
      isActiveModal3: false,
      isActiveModal4: true,
      isActiveModal5: false,
      dynamicContentCount: 5
    };

    this.onClickToggleModal1 = this.onClickToggleModal1.bind(this);
    this.closeHandler1 = this.closeHandler1.bind(this);
    this.onClickToggleModal2 = this.onClickToggleModal2.bind(this);
    this.closeHandler2 = this.closeHandler2.bind(this);
    this.onClickToggleModal3 = this.onClickToggleModal3.bind(this);
    this.closeHandler3 = this.closeHandler3.bind(this);
    this.onClickToggleModal4 = this.onClickToggleModal4.bind(this);
    this.closeHandler4 = this.closeHandler4.bind(this);
    this.onClickToggleModal5 = this.onClickToggleModal5.bind(this);
    this.closeHandler5 = this.closeHandler5.bind(this);
    this.onClickDynamicAddContent = this.onClickDynamicAddContent.bind(this);
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

  onClickToggleModal5() {
    this.setState({
      isActiveModal5: !this.state.isActiveModal5
    })
  }

  onClickDynamicAddContent() {
    this.setState({
      dynamicContentCount: this.state.dynamicContentCount + 3
    });
  }

  closeHandler5() {
    this.setState({
      isActiveModal5: false
    })
  }

  renderContentModal() {
    return (
      <div>
        <h2>Just Content</h2>
        <Button onClick={this.onClickToggleModal1}>Modal1</Button>
        <Modal isActive={this.state.isActiveModal1}>
          <ModalContent>
            <div>content<Button onClick={this.closeHandler1}>Close</Button></div>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  renderHeaderNoOverlayModal() {
    return (
      <div>
        <h2>Header (and overlay disabled</h2>
        <Button onClick={this.onClickToggleModal2}>Modal2</Button>
        <Modal isActive={this.state.isActiveModal2} overlayDisabled>
          <ModalHeader>
            Header
          </ModalHeader>
          <ModalContent>
            <div>content<Button onClick={this.closeHandler2}>Close</Button></div>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  renderFooterModal() {
    return (
      <div>
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
      </div>
    );
  }

  renderExtraLongModal() {
    return (
      <div>
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

  renderDynamicHeightModal() {
    var renderDynamicContent = () => {
      nodes = [];

      for (let x = 0; x < this.state.dynamicContentCount; x += 1) {
        nodes.push(<div key={x}>content</div>);
      }

      return nodes;
    };

    return (
      <div>
        <h2>Extra Long (using dynamic height)</h2>
        <Button onClick={this.onClickToggleModal5}>Modal5</Button>
        <Modal
          isActive={this.state.isActiveModal5}
          hasAutoCenter
          isScrollable
        >
          <ModalHeader closeHandler={this.closeHandler5}>
            Header
          </ModalHeader>
          <ModalContent>
            <Button onClick={this.onClickDynamicAddContent}>Add Content</Button>
            {renderDynamicContent()}
          </ModalContent>
          <ModalFooter isActions={true}>
            <Button onClick={this.closeHandler5}>Cancel</Button><Button onClick={this.closeHandler5}>Save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div className="p-style-guide-modals">
        <h1>Modals</h1>
        {this.renderContentModal()}
        {this.renderHeaderNoOverlayModal()}
        {this.renderFooterModal()}
        {this.renderExtraLongModal()}
        {this.renderDynamicHeightModal()}
      </div>
    );
  }
}

ModalPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ModalPage;
