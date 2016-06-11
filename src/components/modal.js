import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import AppendBodyComponent from './append-body-component';
import Overlay from './overlay';

class Modal extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.setAppendElement();
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
      this.appendedElement.querySelector('.modal__wrapper').scrollTop = 0;
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

    this.updateAppendElement(
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive')}
      >
        <div className="modal">
          {this.props.children}
        </div>
        <Overlay isActive={this.props.isActive} />
      </div>
    );
  }

  render() {
    return null;
  }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  className: React.PropTypes.string
};

Modal.defaultProps = {
  className: null
};

export default Modal;
