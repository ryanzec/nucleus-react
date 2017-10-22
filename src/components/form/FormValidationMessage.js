import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['form-element__validation-message'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

import SvgIcon from 'src/components/svg-icon/SvgIcon';

class FormValidationMessage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    iconFragment: PropTypes.string
  };

  static defaultProps = {
    className: null,
    iconFragment: null
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    let iconNode = null;

    if (this.props.iconFragment) {
      iconNode = (
        <SvgIcon
          className="form-element__validation-icon"
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
