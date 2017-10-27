import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/progress-bar/ProgressBar.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(composedStyles[instance.props.styleType]);
    }

    if (instance.props.isStriped) {
      cssClasses.push(composedStyles.hasStripes);
    }

    if (!instance.props.isSquare) {
      cssClasses.push(composedStyles.isPill);
    }

    return cssClasses.join(' ');
  };
};

class ProgressBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    isStriped: PropTypes.bool,
    isSquare: PropTypes.bool,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    styleType: null,
    isStriped: false,
    isSquare: false,
    max: 100,
    value: 0,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <progress
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ProgressBar.propTypes)}
      >
        {this.props.children}
      </progress>
    );
  }
}

export default ProgressBar;
