import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class PaginationItem extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['page-item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isDisabled) {
      cssClasses.push('disabled');
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses;
  }

  render() {
    return (
      <li
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isDisabled', 'isActive')}
      >
        {this.props.children}
      </li>
    );
  }
}

PaginationItem.displayName = 'PaginationItem';

PaginationItem.propTypes = {
  className: React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
  isActive: React.PropTypes.bool
};

PaginationItem.defaultProps = {
  className: null,
  isDisabled: false,
  isActive: false
};

export default PaginationItem;
