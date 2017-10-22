import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import Button from 'src/components/button/Button';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

import styles from 'src/components/button/SvgIconButton.module.scss';

export const createGetSvgIconCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.svgIconContainer];

    if (instance.props.svgIconClassName) {
      cssClasses = cssClasses.concat(instance.props.svgIconClassName.split(' '));
    }

    if (!instance.props.isThin) {
      cssClasses.push(composedStyles.svgIcon);
    } else if (instance.props.styleType !== 'link') {
      cssClasses.push(composedStyles.svgIconHover);
    }

    if (instance.props.styleType === 'link') {
      cssClasses.push(composedStyles.svgIconLink);
    }

    return cssClasses.join(' ');
  };
};

export const createGetButtonIconCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.buttonContainer];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class SvgIconButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    svgIconClassName: PropTypes.string,
    fragment: PropTypes.string.isRequired,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    svgIconClassName: null,
    customStyles: null,
  };

  getButtonCssClasses = createGetButtonIconCssClasses(this);
  getSvgIconCssClasses = createGetSvgIconCssClasses(this);

  render() {
    // NOTE: should only pass through the style type if it is one of the svg icon style types
    const styleType = this.props.isThin && ['success', 'info', 'warning', 'danger'].indexOf(this.props.styleType) !== -1
      ? this.props.styleType
      : null;

    return (
      <Button
        className={this.getButtonCssClasses()}
        {...getPassThroughProperties(this.props, SvgIconButton.propTypes)}
      >
        <SvgIcon
          className={this.getSvgIconCssClasses()}
          styleType={styleType}
          fragment={this.props.fragment}
        />
        {this.props.children}
      </Button>
    );
  }
}

export default SvgIconButton;
