import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['modal__header'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class ModalHeader extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    closeHandler: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    closeHandler: null,
  };

  getCssClasses = createGetCssClasses(this);

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

export default ModalHeader;
