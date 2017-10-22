import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/breadcrumb/Breadcrumb.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push(composedStyles.isActive);
    }

    return cssClasses.join(' ');
  };
};

class Breadcrumb extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    onClick: PropTypes.func,
    isActive: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    customStyles: null,
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
