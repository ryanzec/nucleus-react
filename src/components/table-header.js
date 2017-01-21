import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class TableHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <thead
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, TableHeader.propTypes)}
      >
        {this.props.children}
      </thead>
    );
  }
}

TableHeader.propTypes = {
  className: React.PropTypes.string
};

TableHeader.defaultProps = {
  className: null
};

export default TableHeader;
