import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['breadcrumbs__crumb'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses.join(' ');
  };
};

class Breadcrumb extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    isActive: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    onClick: null,
    isActive: false
  };

  getCssClasses = createGetCssClasses(this);

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

export default Breadcrumb;
