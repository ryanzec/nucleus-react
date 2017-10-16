import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class TableFooter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__footer'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <tfoot
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableFooter.propTypes)}
      >
        {this.props.children}
      </tfoot>
    );
  }
}

TableFooter.propTypes = {
  className: PropTypes.string
};

TableFooter.defaultProps = {
  className: null
};

export default TableFooter;
