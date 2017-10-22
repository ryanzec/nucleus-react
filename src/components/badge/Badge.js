import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/badge/Badge.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles[instance.props.styleType]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isPill) {
      cssClasses.push(composedStyles.isPill);
    }

    if (instance.props.isThin) {
      cssClasses.push(composedStyles.isThin);
    }

    return cssClasses.join(' ');
  };
};

class Badge extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    styleType: PropTypes.oneOf(['default', 'success', 'info', 'warning', 'danger']),
    isPill: PropTypes.bool,
    isThin: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    styleType: 'default',
    isPill: false,
    isThin: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Badge.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Badge;
