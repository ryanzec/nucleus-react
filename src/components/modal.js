import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import DomEventManager from '../utilities/dom/dom-event-manager';
import DomDimensions from '../utilities/dom/dom-dimensions';
import getNextId from '../utilities/get-next-id';
import configuration from '../configuration';

import AppendBodyComponent from './append-body-component';
import Overlay from './overlay';

class Modal extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.uniqueId = getNextId();
    this.domEventManager = new DomEventManager();

    this.setAppendElementId(this.uniqueId);

    this.setContentHeight = this.setContentHeight.bind(this);
    this.centerModal = this.centerModal.bind(this);

    //NOTE: this is needed as iOS has some issue with the regular way of dealing with modals
    let userAgentDetails = configuration.get('userAgentDetails');

    this.osName = userAgentDetails.getOS().name;
    this.resetBodyScrollTop = null;
  }

  componentDidMount() {
    if (this.props.isActive) {
      document.querySelector('body').classList.add('modal-open');

      if (this.osName.indexOf('iOS') !== -1) {
        document.querySelector('body').classList.add('ios-fixed');
      }
    }

    if (this.props.isScrollable) {
      this.domEventManager.add(window, 'resize', this.setContentHeight);
      this.domEventManager.add(window, 'orientationchange', this.setContentHeight);
    }

    this.updateSelf(true);
  }

  componentDidUpdate(oldProps) {
    let hideInitially = false;
    //NOTE: need to make sure when closing the modal, the scroll position is reset to the top incase it is opened again
    if (!this.props.isActive && oldProps.isActive) {
      //NOTE: the setting of the overflowY style back and forth is needed in order to fix issue with the scrollTop = 0 not scrolling to the very top for
      //NOTE: chrome on andriod
      const wrapperDomNode = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"]`);
      wrapperDomNode.style.overflowY = 'hidden';
      wrapperDomNode.scrollTop = 0;
      wrapperDomNode.style.overflowY = 'auto';
      this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal__content`).scrollTop = 0;
    }

    //NOTE we should only change the body call if the isActive has change incase there are multiple possible modals on the same page
    if (this.props.isActive !== oldProps.isActive) {
      if (this.props.isActive) {
        hideInitially = true;
        document.querySelector('body').classList.add('modal-open');

        if (this.osName.indexOf('iOS') !== -1) {
          this.resetBodyScrollTop = document.body.scrollTop;
          document.querySelector('body').classList.add('ios-fixed');
        }
      } else if (!this.props.isActive) {
        document.querySelector('body').classList.remove('modal-open');

        if (this.osName.indexOf('iOS') !== -1) {
          document.querySelector('body').classList.remove('ios-fixed');

          if (this.resetBodyScrollTop !== null) {
            document.body.scrollTop = this.resetBodyScrollTop;
            this.resetBodyScrollTop = null;
          }
        }
      }
    }

    this.updateSelf(hideInitially);
  }

  componentWillUnmount() {
    if (this.props.isActive) {
      document.querySelector('body').classList.remove('modal-open');
    }

    this.domEventManager.clear();

    this.removeAppendElement();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  setContentHeight() {
    const modalElement = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal`);
    const headerElement = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal__header`);
    const contentElement = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal__content`);
    const footerElement = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal__footer`);

    if (this.props.isActive) {
      const bodyDimensions = new DomDimensions(document.body);
      const modalDimensions = new DomDimensions(modalElement);
      const maxModalHeight = bodyDimensions.dimensions.height - (this.props.minSpacing * 2);

      let modalHeight = bodyDimensions.dimensions.height - (modalDimensions.dimensions.margins.top * 2);
      modalHeight = maxModalHeight < modalHeight ? maxModalHeight : modalHeight;

      let contentHeight = modalHeight;

      if (headerElement) {
        contentHeight -= (new DomDimensions(headerElement)).dimensions.height;
      }

      if (footerElement) {
        contentHeight -= (new DomDimensions(footerElement)).dimensions.height;
      }

      contentElement.style.maxHeight = `${contentHeight}px`;
      modalElement.style.maxHeight = `${modalHeight}px`;

      if (this.props.hasAutoCenter) {
        setTimeout(this.centerModal);
      } else {
        modalElement.classList.remove('u-invisible');
      }
    }
  }

  centerModal() {
    if (this.props.isActive) {
      const modalElement = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal`);
      const modalContent = this.appendElementContainer.querySelector(`.modal__wrapper[data-modal-id="${this.uniqueId}"] .modal__content`);
      const modalDimensions = new DomDimensions(modalElement);
      const contentDimensions = new DomDimensions(modalContent);
      const heightToUse = contentDimensions.dimensions.height > modalDimensions.dimensions.height
          ? modalDimensions.dimensions.height
          : modalDimensions.dimensions.height
      const topMargin = Math.floor(heightToUse / 2) * -1 + 'px';
      const leftMargin =Math.floor(contentDimensions.dimensions.width / 2) * -1 + 'px';

      modalElement.style.margin = `${topMargin} 0 0 ${leftMargin}`;
      modalElement.classList.remove('u-invisible');
    }
  }

  getCssClasses() {
    let cssClasses = ['modal__wrapper'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    if (this.props.isScrollable) {
      cssClasses.push('is-scrollable');
    }

    if (this.props.hasAutoCenter) {
      cssClasses.push('has-auto-center');
    }

    return cssClasses;
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

    let modalClassName = 'modal';

    if ((this.props.isScrollable || this.props.hasAutoCenter) && hideInitially) {
      modalClassName += ' u-invisible';
    }

    this.updateAppendElement(
      <div
        key={`modal-${this.uniqueId}`}
        data-modal-id={this.uniqueId}
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive', 'overlayDisabled', 'isScrollable', 'hasAutoCenter', 'minSpacing')}
      >
        <div className={modalClassName}>
          <div className="modal__container">
            {this.props.children}
          </div>
        </div>
        {overlayNode}
      </div>
    );

    //NOTE: this allows all styling to be applied before we calculate the dynamic heights
    if (this.props.isScrollable) {
      setTimeout(this.setContentHeight, 10);
    }

    if (this.props.hasAutoCenter) {
      setTimeout(this.centerModal, 10);
    }
  }

  render() {
    return null;
  }
}

Modal.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  overlayDisabled: React.PropTypes.bool,
  isScrollable: React.PropTypes.bool,
  hasAutoCenter: React.PropTypes.bool,

  //NOTE: this needs to be be in the javascript incase the dynamic height and auto height are both enabled and should match the value in the css
  minSpacing: React.PropTypes.number,
};

Modal.defaultProps = {
  className: null,
  isActive: false,
  overlayDisabled: false,
  isScrollable: true,
  hasAutoCenter: false,
  minSpacing: 25,
};

export default Modal;
