import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

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

    return cssClasses;
  }

  render() {
    return (
      <th
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'alignment')}
      >
        {this.props.children}
      </th>
    );
  }
}

TableHeaderItem.propTypes = {
  className: React.PropTypes.string,
  alignment: React.PropTypes.oneOf(['left', 'right', 'center']),
};

TableHeaderItem.defaultProps = {
  className: null,
  alignment: null,
};

export default TableHeaderItem;
