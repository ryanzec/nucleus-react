import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/notification/NotificationIcon.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createGetSvgIconCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.svgIcon, composedStyles[instance.props.styleType]];

    if (instance.props.styleType) {
      cssClasses.push(composedStyles[instance.props.styleType]);
    }

    if (instance.props.isFilled) {
      cssClasses.push(composedStyles.isFilled);
    }

    return cssClasses.join(' ');
  };
};

import SvgIcon from 'src/components/svg-icon/SvgIcon';

class NotificationIcon extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    isFilled: PropTypes.bool,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isFilled: false,
    styleType: 'info',
  };

  getCssClasses = createGetCssClasses(this);
  getSvgIconCssClasses = createGetSvgIconCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
      >
        <SvgIcon
          className={this.getSvgIconCssClasses()}
          {...getPassThroughProperties(this.props, NotificationIcon.propTypes)}
        />
      </div>
    );
  }
}

export default NotificationIcon;
