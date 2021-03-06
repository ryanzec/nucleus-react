import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormSelect.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.validation) {
      cssClasses.push(composedStyles[`${instance.props.validation}Value`]);
    }

    return cssClasses.join(' ');
  };
};

class FormSelect extends React.Component {
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
      <select
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormSelect.propTypes)}
      >
        {this.props.children}
      </select>
    );
  }
}

export default FormSelect;
