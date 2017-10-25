import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormElement.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.validation) {
      cssClasses.push(`m-${instance.props.validation}`);
    }

    return cssClasses.join(' ');
  };
}

class FormElement extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    validation: PropTypes.oneOf([false, 'valid', 'invalid']),
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    validation: false,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormElement.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FormElement;
