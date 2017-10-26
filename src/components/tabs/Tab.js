import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/tabs/Tab.module.scss';

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

    if (instance.props.isBlock) {
      cssClasses.push(composedStyles.isBlock);
    }

    return cssClasses.join(' ');
  };
};

class TabItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    isBlock: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    isActive: false,
    isBlock: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TabItem.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default TabItem;
