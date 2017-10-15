import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class TableHeaderItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__header-item', 'table__data-item'];

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
      <th
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableHeaderItem.propTypes)}
      >
        {this.props.children}
      </th>
    );
  }
}

TableHeaderItem.propTypes = {
  className: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
};

TableHeaderItem.defaultProps = {
  className: null,
  alignment: null,
};

export default TableHeaderItem;
