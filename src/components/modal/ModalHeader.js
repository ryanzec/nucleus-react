import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/modal/ModalHeader.module.scss';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class ModalHeader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    closeHandler: PropTypes.func,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    closeHandler: null,
  };

  getCssClasses = createGetCssClasses(this);

  renderCloseHandler() {
    let node = null;

    if (this.props.closeHandler) {
      const composedStyles = composeStyles(styles, this.props.customStyles);

      node = (
        <SvgIcon
          outerClassName={composedStyles.closeSvgIcon}
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
