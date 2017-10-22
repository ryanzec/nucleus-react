import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['table__body-item', 'table__data-item'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.alignment) {
      cssClasses.push(`m-${instance.props.alignment}`);
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
    alignment: null,
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
