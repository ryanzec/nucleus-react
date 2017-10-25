import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormCheckboxToggle.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }
    if (instance.props.checked) {
      cssClasses.push(composedStyles.isChecked);
    }

    return cssClasses.join(' ');
  };
};

export const createGetToggleBarCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.toggleBar];

    if (instance.props.checked) {
      cssClasses.push(composedStyles.toggleBarIsChecked);
    }

    return cssClasses.join(' ');
  };
};

export const createGetToggleCircleCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.toggleCircle];

    if (instance.props.checked) {
      cssClasses.push(composedStyles.toggleCircleIsChecked);
    }

    return cssClasses.join(' ');
  };
};


class FormCheckboxToggle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    offNode: PropTypes.node,
    onNode: PropTypes.node,
    customStyles: PropTypes.object
  };

  static defaultProps = {
    className: null,
    checked: false,
    offNode: 'Off',
    onNode: 'On',
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);
  getToggleBarCssClasses = createGetToggleBarCssClasses(this);
  getToggleCircleCssClasses = createGetToggleCircleCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormCheckboxToggle.propTypes)}
      >
        <div className={this.getToggleCircleCssClasses()} />
        <div className={this.getToggleBarCssClasses()}>
          <span>{this.props.checked ? this.props.onNode : this.props.offNode}</span>
        </div>
      </div>
    );
  }
}

export default FormCheckboxToggle;
