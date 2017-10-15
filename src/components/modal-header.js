import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

import SvgIcon from './svg-icon';

class ModalHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['modal__header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  renderCloseHandler() {
    let node = null;

    if (this.props.closeHandler) {
      node = (
        <SvgIcon
          outerClassName="modal__header-close"
          fragment="times"
          onClick={this.props.closeHandler}
        />
      );
    }

    return node;
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ModalHeader.propTypes)}
      >
        {this.props.children}
        {this.renderCloseHandler()}
      </div>
    );
  }
}

ModalHeader.propTypes = {
  className: PropTypes.string,
  closeHandler: PropTypes.func
};

ModalHeader.defaultProps = {
  className: null,
  closeHandler: null
};

export default ModalHeader;
