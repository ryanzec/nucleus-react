import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormLegend.module.scss';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    // TODO
    if (instance.props.validation) {
      cssClasses.push(`m-${instance.props.validation}`);
    }

    return cssClasses.join(' ');
  };
}

class FormLegend extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    displayRequiredDetails: PropTypes.bool,
    validation: PropTypes.oneOf(['valid', 'inValid']),
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    displayRequiredDetails: false,
    validation: null,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    let requiredDetailsNode = null;

    if (this.props.displayRequiredDetails) {
      const composedStyles = composeStyles(styles, this.props.customStyles);

      requiredDetailsNode = (
        <div className={composedStyles.requiredDetails}>
          <SvgIcon
            fragment="asterisk"
            className={composedStyles.requiredIcon}
          />required field
        </div>
      );
    }

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormLegend.propTypes)}
      >
        {this.props.children}{requiredDetailsNode}
      </div>
    );
  }
}

export default FormLegend;
