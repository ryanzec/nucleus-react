import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

import styles from 'src/components/form/FormValidationMessage.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.validation) {
      cssClasses.push(composedStyles[instance.props.validation]);
    }

    return cssClasses.join(' ');
  };
};

export const createGetSvgIconCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.validationIcon];

    if (instance.props.validation) {
      cssClasses.push(composedStyles[`${instance.props.validation}ValidationIcon`]);
    }

    return cssClasses.join(' ');
  };
};

class FormValidationMessage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    iconFragment: PropTypes.string,
    customStyles: PropTypes.object,
    validation: PropTypes.oneOf(['valid', 'invalid']),
  };

  static defaultProps = {
    className: null,
    iconFragment: null,
    customStyles: null,
    validation: null,
  };

  getCssClasses = createGetCssClasses(this);
  getSvgIconCssClasses = createGetSvgIconCssClasses(this);

  render() {
    let iconNode = null;

    if (this.props.iconFragment) {
      iconNode = (
        <SvgIcon
          className={this.getSvgIconCssClasses()}
          fragment={this.props.iconFragment}
        />
      );
    }

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormValidationMessage.propTypes)}
      >
        {iconNode}{this.props.children}
      </div>
    );
  }
}

export default FormValidationMessage;
