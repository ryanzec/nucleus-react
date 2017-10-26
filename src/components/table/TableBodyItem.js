import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/table/TableBodyItem.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[`${instance.props.alignment}Aligned`]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class TableBodyItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    alignment: PropTypes.oneOf(['left', 'right', 'center']),
  };

  static defaultProps = {
    className: null,
    alignment: 'left',
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <td
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableBodyItem.propTypes)}
      >
        {this.props.children}
      </td>
    );
  }
}

export default TableBodyItem;
