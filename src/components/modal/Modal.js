import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import {getPassThroughProperties} from 'src/utilities/component';

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
  return (oldProps) => {
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
    let cssClasses = ['modal'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses.join(' ');
  };
};

export const createUpdateSelf = (instance) => {
  return (hideInitially) => {
    const styles = {};

    if (instance.props.isActive) {
      styles.display = 'block';
    }

    let overlayNode = null;

    if (!instance.props.overlayDisabled) {
      overlayNode = (
        <Overlay isActive={instance.props.isActive} />
      );
    }

    instance.updateAppendElement(
      <div
        key={`modal-${instance.uniqueId}`}
        data-modal-id={instance.uniqueId}
        className={instance.getCssClasses()}
        {...getPassThroughProperties(instance.props, Modal.propTypes)}
      >
        <div className="modal__container">
          {instance.props.children}
        </div>
        {overlayNode}
      </div>
    );
  }
};

class Modal extends AppendBodyComponent {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    overlayDisabled: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
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
