import PropTypes from 'prop-types';
import React from 'react';

import Code from 'src/components/code/Code';
import Modal from 'src/components/modal/Modal';
import ModalHeader from 'src/components/modal/ModalHeader';
import ModalContent from 'src/components/modal/ModalContent';
import ModalFooter from 'src/components/modal/ModalFooter';
import Button from 'src/components/button/Button';

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
  }

  onClickToggleModal1 = () => {
    this.setState({
      isActiveModal1: !this.state.isActiveModal1
    })
  };

  closeHandler1 = () => {
    this.setState({
      isActiveModal1: false
    })
  };

  onClickToggleModal2 = () => {
    this.setState({
      isActiveModal2: !this.state.isActiveModal2
    })
  };

  closeHandler2 = () => {
    this.setState({
      isActiveModal2: false
    })
  };

  onClickToggleModal3 = () => {
    this.setState({
      isActiveModal3: !this.state.isActiveModal3
    })
  };

  closeHandler3 = () => {
    this.setState({
      isActiveModal3: false
    })
  };

  onClickToggleModal4 = () => {
    this.setState({
      isActiveModal4: !this.state.isActiveModal4
    })
  };

  closeHandler4 = () => {
    this.setState({
      isActiveModal4: false
    })
  };

  onClickToggleModal5 = () => {
    this.setState({
      isActiveModal5: !this.state.isActiveModal5
    })
  };

  onClickDynamicAddContent = () => {
    this.setState({
      dynamicContentCount: this.state.dynamicContentCount + 3
    });
  };

  closeHandler5 = () => {
    this.setState({
      isActiveModal5: false
    })
  };

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
          <ModalFooter>
            <Button onClick={this.closeHandler4}>Save</Button>
            <Button onClick={this.closeHandler4}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  renderDynamicHeightModal() {
    var renderDynamicContent = () => {
      const nodes = [];

      for (let x = 0; x < this.state.dynamicContentCount; x += 1) {
        nodes.push(<div key={x}>content</div>);
      }

      return nodes;
    };

    return (
      <div>
        <h2>Extra Long (using dynamic height)</h2>
        <Button onClick={this.onClickToggleModal5}>Modal5</Button>
        <Modal isActive={this.state.isActiveModal5}>
          <ModalHeader closeHandler={this.closeHandler5}>
            Header
          </ModalHeader>
          <ModalContent>
            <Button onClick={this.onClickDynamicAddContent}>Add Content</Button>
            {renderDynamicContent()}
          </ModalContent>
          <ModalFooter>
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
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        {this.renderDynamicHeightModal()}
      </div>
    );
  }
}

ModalPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ModalPage;
