import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/notification/Notification.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[instance.props.styleType]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isFilled) {
      cssClasses.push(composedStyles[`${instance.props.styleType}IsFilled`]);
    }

    if (instance.props.hasShadow) {
      cssClasses.push(composedStyles.hasShadow);
    }

    return cssClasses.join(' ');
  };
};

class Notification extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    isFilled: PropTypes.bool,
    hasShadow: PropTypes.bool,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    styleType: 'info',
    isFilled: false,
    hasShadow: false,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Notification.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Notification;
