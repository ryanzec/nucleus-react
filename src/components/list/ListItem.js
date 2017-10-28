import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/list/ListItem.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isExpandable) {
      cssClasses.push(composedStyles.isExpandable);
    }

    return cssClasses.join(' ');
  };
};

class ListItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    isExpandable: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isExpandable: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <li
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ListItem.propTypes)}
      >
        {this.props.children}
      </li>
    );
  }
}

export default ListItem;
