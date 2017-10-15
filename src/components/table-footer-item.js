import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class TableFooterItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__footer-item', 'table__data-item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.alignment) {
      cssClasses.push(`m-${this.props.alignment}`);
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <td
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableFooterItem.propTypes)}
      >
        {this.props.children}
      </td>
    );
  }
}

TableFooterItem.propTypes = {
  className: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
};

TableFooterItem.defaultProps = {
  className: null,
  alignment: null,
};

export default TableFooterItem;
