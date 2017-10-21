import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

import styles from 'src/components/button/ButtonSvgIcon.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = [styles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (!instance.props.isThin) {
      cssClasses.push(styles.svgIcon);
    }

    if (instance.props.styleType === 'link') {
      cssClasses.push(styles.svgIconLink);
    }

    return cssClasses.join(' ');
  };
};

class ButtonSvgIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['default', 'success', 'info', 'warning', 'danger', 'link']),
    isThin: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    styleType: 'default',
    isThin: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    // NOTE: should only pass through the style type if it is one of the svg icon style types
    const styleType = this.props.isThin && ['success', 'info', 'warning', 'danger'].indexOf(this.props.styleType) !== -1
      ? this.props.styleType
      : null;

    return (
      <SvgIcon
        className={this.getCssClasses()}
        styleType={styleType}
        {...getPassThroughProperties(this.props, ButtonSvgIcon.propTypes)}
      />
    );
  }
}

export default ButtonSvgIcon;
