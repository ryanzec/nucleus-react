import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class Table extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table', `m-${this.props.alignment}`];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    if (this.props.isVertical) {
      cssClasses.push('is-vertical');
    }

    return cssClasses.join(' ');
  }

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

Table.propTypes = {
  className: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right', 'center']),
  styleType: PropTypes.oneOf(['zebra', 'borderless']),
  isVertical: PropTypes.bool,
};

Table.defaultProps = {
  className: null,
  alignment: 'center',
  styleType: null,
  isVertical: false,
};

export default Table;
