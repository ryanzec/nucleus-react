import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import AppendBodyComponent from './append-body-component.component.jsx';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import ModalBackdrop from './modal-backdrop.component.jsx';

class Modal extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.setAppendElement();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentDidMount() {
    this.updateSelf();
  }

  componentDidUpdate() {
    this.updateSelf();
  }

  componentWillUnmount() {
    this.removeAppendElement();
  }

  getCssClasses() {
    let cssClasses = ['modal'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  renderModalBackdrop() {
    let node = null;

    if (this.props.isActive) {
      node = (
        <ModalBackdrop />
      );
    }

    return node;
  }

  updateSelf() {
    let styles = {};

    if (this.props.isActive) {
      styles.display = 'block';

      document.querySelector('body').classList.add('modal-open');
    } else {
      document.querySelector('body').classList.remove('modal-open');
    }

    let modalNode = (
      <span>
        <div
          style={styles}
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(this.props, 'className')}
        >
          <div className="modal-dialog">
            {this.props.children}
          </div>
        </div>
        {this.renderModalBackdrop()}
      </span>
    );

    this.updateAppendElement(modalNode);
  }

  render() {
    return null;
  }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool
};

Modal.defaultProps = {
  className: null,
  isActive: false
};

export default Modal;
