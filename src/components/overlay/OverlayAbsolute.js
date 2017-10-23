import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/overlay/OverlayAbsolute.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, 'overlay-absolute'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    //TODO: remove this and just leave it up to the using code to know when to display or not
    if (instance.props.isActive) {
      cssClasses.push(composedStyles.isActive);
    }

    return cssClasses.join(' ');
  };
};

export const createGetTopContentCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.topContent];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    //TODO: remove this and just leave it up to the using code to know when to display or not
    if (instance.props.isActive) {
      cssClasses.push(composedStyles.topContentActive);
    }

    return cssClasses.join(' ');
  };
};

class OverlayAbsolute extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    isActive: false,
  };

  getTopContentCssClasses = createGetTopContentCssClasses(this)
  getCssClasses = createGetCssClasses(this);

  render() {
    let topContentNode = null;

    if (this.props.children && this.props.children[0]) {
      topContentNode = (
        <div className={this.getTopContentCssClasses()}>{this.props.children}</div>
      );
    }

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, OverlayAbsolute.propTypes)}
      >
        {topContentNode}
      </div>
    );
  }
}

export default OverlayAbsolute;
