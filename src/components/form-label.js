import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

import SvgIcon from './svg-icon';

class FormLabel extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__label'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.inputType) {
      cssClasses.push(`m-${this.props.inputType}`);
      cssClasses.push(`m-${this.props.inputAlignment}`);
    }

    return cssClasses.join(' ');
  }

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

FormLabel.propTypes = {
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  inputType: PropTypes.oneOf([false, 'checkbox', 'radio']),
  inputAlignment: PropTypes.oneOf(['left', 'right']),
  isHidden: PropTypes.bool
};

FormLabel.defaultProps = {
  className: null,
  isRequired: false,
  inputType: false,
  inputAlignment: 'left',
  isHidden: false
};

export default FormLabel;
