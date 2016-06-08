import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

class ModalHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['modal__header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
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
      <h2
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
        {this.renderCloseHandler()}
      </h2>
    );
  }
}

ModalHeader.displayName = 'ModalHeader';

ModalHeader.propTypes = {
  className: React.PropTypes.string,
  closeHandler: React.PropTypes.func
};

ModalHeader.defaultProps = {
  className: null,
  closeHandler: null
};

export default ModalHeader;
