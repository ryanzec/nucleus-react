import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/tabs/Tabs.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isBlock) {
      cssClasses.push(composedStyles.isBlock);
    }

    return cssClasses.join(' ');
  };
};

class Tabs extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isBlock: PropTypes.bool,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    isBlock: false,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Tabs.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Tabs;
