import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

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

    return cssClasses;
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
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isRequired')}
      >
        {this.props.children}
        {this.renderRequiredIcon()}
      </label>
    );
  }
}

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
  className: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  inputType: React.PropTypes.oneOf([false, 'checkbox', 'radio']),
  inputAlignment: React.PropTypes.oneOf(['left', 'right']),
  isHidden: React.PropTypes.bool
};

FormLabel.defaultProps = {
  className: null,
  isRequired: false,
  input: false,
  inputAlignment: 'left',
  isHidden: false
};

export default FormLabel;
