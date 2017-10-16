import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class TableRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__row'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

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

TableRow.propTypes = {
  className: PropTypes.string
};

TableRow.defaultProps = {
  className: null
};

export default TableRow;
