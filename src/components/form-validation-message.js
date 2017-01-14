import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

class FormValidationMessage extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__validation-message'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

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
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'iconFragment')}
      >
        {iconNode}{this.props.children}
      </div>
    );
  }
}

FormValidationMessage.propTypes = {
  className: React.PropTypes.string,
  iconFragment: React.PropTypes.string
};

FormValidationMessage.defaultProps = {
  className: null,
  iconFragment: null
};

export default FormValidationMessage;
