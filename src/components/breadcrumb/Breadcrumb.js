import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

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

    return cssClasses.join(' ');
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
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Breadcrumb.propTypes)}
      >
        {crumbNode}
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

Breadcrumb.defaultProps = {
  className: null,
  onClick: null,
  isActive: false
};

export default Breadcrumb;
