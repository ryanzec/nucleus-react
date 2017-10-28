import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import Badge from 'src/components/badge/Badge';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

import styles from 'src/components/badge/SvgIconBadge.module.scss';

export const createGetBadgeCssClasses = (instance) => {
  return () => {
    let cssClasses = [];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createGetSvgIconCssClases = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.svgIconContainer];

    if (instance.props.svgIconClassName) {
      cssClasses = cssClasses.concat(instance.props.svgIconClassName.split(' '));
    }

    if (!instance.props.isThin) {
      cssClasses.push(composedStyles.svgIcon);
    }

    return cssClasses.join(' ');
  };
};

class SvgIconBadge extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    svgIconClassName: PropTypes.string,
    customStyles: PropTypes.object,
    fragment: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: null,
    svgIconClassName: null,
    customStyles: null,
  };

  getBadgeCssClasses = createGetBadgeCssClasses(this);
  getSvgIconCssClasses = createGetSvgIconCssClases(this);

  render() {
    // NOTE: should only pass through the style type if it is one of the svg icon style types
    const styleType = this.props.isThin && ['success', 'info', 'warning', 'danger'].indexOf(this.props.styleType) !== -1
      ? this.props.styleType
      : null;

    return (
      <Badge
        className={this.getBadgeCssClasses()}
        {...getPassThroughProperties(this.props, SvgIconBadge.propTypes)}
      >
        <SvgIcon
          className={this.getSvgIconCssClasses()}
          styleType={styleType}
          fragment={this.props.fragment}
        /> {this.props.children}
      </Badge>
    );
  }
}

export default SvgIconBadge;
