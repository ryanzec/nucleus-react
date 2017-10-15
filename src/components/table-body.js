import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class TableBody extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__body'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <tbody
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableBody.propTypes)}
      >
        {this.props.children}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  className: PropTypes.string
};

TableBody.defaultProps = {
  className: null
};

export default TableBody;
