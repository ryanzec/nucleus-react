import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['form-element__label'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.inputType) {
      cssClasses.push(`m-${instance.props.inputType}`);
      cssClasses.push(`m-${instance.props.inputAlignment}`);
    }

    return cssClasses.join(' ');
  };
}

class FormLabel extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isRequired: PropTypes.bool,
    inputType: PropTypes.oneOf([false, 'checkbox', 'radio']),
    inputAlignment: PropTypes.oneOf(['left', 'right']),
    isHidden: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    isRequired: false,
    inputType: false,
    inputAlignment: 'left',
    isHidden: false
  };

  getCssClasses = createGetCssClasses(this);

  renderRequiredIcon() {
    let node = null;

    if (this.props.isRequired) {
      node = (
        <SvgIcon
          fragment="asterisk"
          className="form-element__required-icon"
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
