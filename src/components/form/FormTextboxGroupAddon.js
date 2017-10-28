import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormTextboxGroupAddon.module.scss';

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

class FormTextboxGroupAddon extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    validation: PropTypes.oneOf(['valid', 'invalid']),
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    validation: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormTextboxGroupAddon.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FormTextboxGroupAddon;
