import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class TableRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__row'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <tr
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, TableRow.propTypes)}
      >
        {this.props.children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  className: React.PropTypes.string
};

TableRow.defaultProps = {
  className: null
};

export default TableRow;
