import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class BreadcrumbItem extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses;
  }

  render() {
    var itemNode = this.props.children;

    if (!this.props.isActive) {
      itemNode = (
        <a href="#">{itemNode}</a>
      );
    }

    return (
      <li
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {itemNode}
      </li>
    );
  }
}

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool
};

BreadcrumbItem.defaultProps = {
  className: null,
  isActive: false
};

export default BreadcrumbItem;
