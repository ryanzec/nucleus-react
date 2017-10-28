import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/table/TableRow.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isZebra) {
      cssClasses.push(composedStyles.zebra);
    }

    if (instance.props.isBorderless) {
      cssClasses.push(composedStyles.borderless);

      if (instance.props.isInHeader) {
        cssClasses.push(composedStyles.borderlessInHeader);
      }
    }

    return cssClasses.join(' ');
  };
};

class TableRow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isZebra: PropTypes.bool,
    isBorderless: PropTypes.bool,
    isInHeader: PropTypes.bool,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    isZebra: false,
    isBorderless: false,
    isInHeader: false,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <tr
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableRow.propTypes)}
      >
        {this.props.children}
      </tr>
    );
  }
}

export default TableRow;
