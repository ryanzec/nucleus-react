import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Breadcrumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['breadcrumbs__crumb'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses;
  }

  render() {
    let crumbNode = this.props.children;

    if (this.props.onClick) {
      crumbNode = (
        <a onClick={this.props.onClick}>
          {crumbNode}
        </a>
      );
    }

    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'onClick', 'isActive')}
      >
        {crumbNode}
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  isActive: React.PropTypes.bool
};

Breadcrumb.defaultProps = {
  className: null,
  onClick: null,
  isActive: false
};

export default Breadcrumb;
