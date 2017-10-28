import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormLabel.module.scss';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    // if (instance.props.inputType) {
    //   cssClasses.push(`m-${instance.props.inputType}`);
    //   cssClasses.push(`m-${instance.props.inputAlignment}`);
    // }

    return cssClasses.join(' ');
  };
}

class FormLabel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isRequired: PropTypes.bool,
    inputType: PropTypes.oneOf([false, 'checkbox', 'radio']),
    inputAlignment: PropTypes.oneOf(['left', 'right']),
    isHidden: PropTypes.bool,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    isRequired: false,
    inputType: false,
    inputAlignment: 'left',
    isHidden: false,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  renderRequiredIcon() {
    let node = null;

    if (this.props.isRequired) {
      const composedStyles = composeStyles(styles, this.props.customStyles);
      node = (
        <SvgIcon
          fragment="asterisk"
          className={composedStyles.requiredIcon}
        />
      );
    }

    return node;
  }

  render() {
    if (this.props.isHidden) {
      return null;
    }

    return (
      <label
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormLabel.propTypes)}
      >
        {this.props.children}
        {this.renderRequiredIcon()}
      </label>
    );
  }
}

export default FormLabel;
