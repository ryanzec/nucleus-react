import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class TableBodyItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__body-item', 'table__data-item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.alignment) {
      cssClasses.push(`m-${this.props.alignment}`);
    }

    return cssClasses;
  }

  render() {
    return (
      <td
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, TableBodyItem.propTypes)}
      >
        {this.props.children}
      </td>
    );
  }
}

TableBodyItem.propTypes = {
  className: React.PropTypes.string,
  alignment: React.PropTypes.oneOf(['left', 'right', 'center']),
};

TableBodyItem.defaultProps = {
  className: null,
  alignment: null,
};

export default TableBodyItem;
