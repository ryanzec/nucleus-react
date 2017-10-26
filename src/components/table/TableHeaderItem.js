import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/table/TableHeaderItem.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[`${instance.props.alignment}Aligned`]];
    // let cssClasses = ['table__header-item', 'table__data-item'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.alignment) {
      cssClasses.push(`m-${instance.props.alignment}`);
    }

    return cssClasses.join(' ');
  };
};

class TableHeaderItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    alignment: PropTypes.oneOf(['left', 'right', 'center']),
    isVertical: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    alignment: 'left',
    isVertical: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <th
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableHeaderItem.propTypes)}
      >
        {this.props.children}
      </th>
    );
  }
}

export default TableHeaderItem;
