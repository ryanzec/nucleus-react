import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import getNextId from '../utilities/get-next-id';

import AppendBodyComponent from './append-body-component';
import Overlay from './overlay';

class Modal extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.uniqueId = getNextId();
    this.setAppendElementId(this.uniqueId);
  }

  componentDidMount() {
    if (this.props.isActive) {
      document.querySelector('body').classList.add('modal-open');
    }

    this.updateSelf();
  }

  componentDidUpdate(oldProps) {
    //NOTE: need to make sure when closing the modal, the scroll position is reset to the top incase it is opened again
    if (!this.props.isActive && oldProps.isActive) {
      this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"]`).scrollTop = 0;
    }

    //NOTE we should only change the body call if the isActive has change incase there are multiple possible modals on the same page
    if (this.props.isActive !== oldProps.isActive) {
      if (this.props.isActive) {
        document.querySelector('body').classList.add('modal-open');
      } else if (!this.props.isActive) {
        document.querySelector('body').classList.remove('modal-open');
      }
    }

    this.updateSelf();
  }

  componentWillUnmount() {
    if (this.props.isActive) {
      document.querySelector('body').classList.remove('modal-open');
    }

    this.removeAppendElement();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['modal__wrapper'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses;
  }

  updateSelf() {
    const styles = {};

    if (this.props.isActive) {
      styles.display = 'block';
    }

    let overlayNode = null;

    if (!this.props.overlayDisabled) {
      overlayNode = (
        <Overlay isActive={this.props.isActive} />
      );
    }

    this.updateAppendElement(
      <div
        data-modal-id={this.uniqueId}
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive')}
      >
        <div className="modal">
          {this.props.children}
        </div>
        {overlayNode}
      </div>
    );
  }

  render() {
    return null;
  }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  className: React.PropTypes.string,
  overlayDisabled: React.PropTypes.bool
};

Modal.defaultProps = {
  className: null,
  overlayDisabled: false
};

export default Modal;
