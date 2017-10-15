import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';
import configuration from '../configuration';

import AppendBodyComponent from './append-body-component';
import Overlay from './overlay';

class Modal extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.uniqueId = uuid();

    this.setAppendElementId(this.uniqueId);
  }

  componentDidMount() {
    const activeModalCount = document.querySelectorAll('.append-elements .modal__wrapper').length;

    if (activeModalCount > 0) {
      document.querySelector('body').classList.add('modal-open');
    }

    this.updateSelf(true);
  }

  componentDidUpdate(oldProps) {
    this.updateSelf();
  }

  componentWillUnmount() {
    let activeModalCount = document.querySelectorAll('.append-elements .modal__wrapper').length;
    // TODO: remove modal-open class query selector i think
    if (!this.props.isActive) {
      activeModalCount -= 1;
      document.querySelector('body').classList.remove('modal-open');
    }

    if (activeModalCount <= 0) {
      document.querySelector('body').classList.remove('modal-open');
    }

    this.removeAppendElement();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['modal'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses.join(' ');
  }

  updateSelf(hideInitially) {
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
        key={`modal-${this.uniqueId}`}
        data-modal-id={this.uniqueId}
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Modal.propTypes)}
      >
        <div className="modal__container">
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

Modal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  overlayDisabled: PropTypes.bool,
};

Modal.defaultProps = {
  className: null,
  isActive: false,
  overlayDisabled: false,
};

export default Modal;
