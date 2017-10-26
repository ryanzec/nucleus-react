import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/table/Table.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[`${instance.props.alignment}Aligned`]];
    // let cssClasses = ['table', `m-${instance.props.alignment}`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    // if (instance.props.styleType) {
    //   cssClasses.push(`m-${instance.props.styleType}`);
    // }

    if (instance.props.isVertical) {
      cssClasses.push(composedStyles.isVertical);
      // cssClasses.push('is-vertical');
    }

    return cssClasses.join(' ');
  };
};

class Table extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    alignment: PropTypes.oneOf(['left', 'right', 'center']),
    // styleType: PropTypes.oneOf(['zebra', 'borderless']),
    isVertical: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    alignment: 'center',
    styleType: null,
    isVertical: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <table
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Table.propTypes)}
      >
        {this.props.children}
      </table>
    );
  }
}

export default Table;
