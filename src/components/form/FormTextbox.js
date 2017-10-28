import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormTextbox.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[`${instance.props.type}Input`]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.hasAddon) {
      cssClasses.push(composedStyles.hasAddon);
    }

    if (instance.props.type !== 'file' && instance.props.validation) {
      cssClasses.push(composedStyles[`${instance.props.validation}Value`]);
    }

    return cssClasses.join(' ');
  };
};

class FormTextbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    customStyles: PropTypes.object,
    hasAddon: PropTypes.bool,
    validation: PropTypes.oneOf(['valid', 'invalid']),
  };

  static defaultProps = {
    className: null,
    type: 'text',
    customStyles: null,
    hasAddon: false,
    validation: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          className={this.getCssClasses()}
          {...getPassThroughProperties(this.props, FormTextbox.propTypes)}
        />
      );
    }

    return (
      <input
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormTextbox.propTypes, 'type')}
      />
    );
  }
}

export default FormTextbox;
