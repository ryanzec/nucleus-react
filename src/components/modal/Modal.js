import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/modal/Modal.module.scss';

import AppendBodyComponent from 'src/components/append-body-component/AppendBodyComponent';
import Overlay from 'src/components/overlay/Overlay';

export const createComponentDidMount = (instance) => {
  return () => {
    const activeModalCount = document.querySelectorAll('.append-elements .modal__wrapper').length;

    if (activeModalCount > 0) {
      document.querySelector('body').classList.add('modal-open');
    }

    instance.updateSelf(true);
  };
};

export const createComponentDidUpdate = (instance) => {
  return () => {
    instance.updateSelf();
  }
};

export const createComponentWillUnmount = (instance) => {
  return () => {
    let activeModalCount = document.querySelectorAll('.append-elements .modal__wrapper').length;
    // TODO: remove modal-open class query selector i think
    if (!instance.props.isActive) {
      activeModalCount -= 1;
      document.querySelector('body').classList.remove('modal-open');
    }

    if (activeModalCount <= 0) {
      document.querySelector('body').classList.remove('modal-open');
    }

    instance.removeAppendElement();
  };
};

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push(composedStyles.isActive);
    }

    return cssClasses.join(' ');
  };
};

export const createUpdateSelf = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let overlayNode = null;

    if (instance.props.isActive && !instance.props.overlayDisabled) {
      overlayNode = (
        <div className={composedStyles.overlay} />
      );
    }

    instance.updateAppendElement(
      <span>
        <div
          key={`modal-${instance.uniqueId}`}
          data-modal-id={instance.uniqueId}
          className={instance.getCssClasses()}
          {...getPassThroughProperties(instance.props, Modal.propTypes)}
        >
          <div className={composedStyles.wrapper}>
            {instance.props.children}
          </div>
        </div>
        {overlayNode}
      </span>
    );
  };
};

class Modal extends AppendBodyComponent {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    isActive: PropTypes.bool,
    overlayDisabled: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isActive: false,
    overlayDisabled: false,
  };

  constructor(props) {
    super(props);

    this.uniqueId = uuid();

    this.setAppendElementId(this.uniqueId);
  }

  componentDidMount = createComponentDidMount(this);
  componentDidUpdate = createComponentDidUpdate(this);
  componentWillUnmount = createComponentWillUnmount(this);
  getCssClasses = createGetCssClasses(this);
  updateSelf = createUpdateSelf(this);

  render() {
    return null;
  }
}

export default Modal;
