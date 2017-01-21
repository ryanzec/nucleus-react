import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormValidationMessages extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__validation-messages'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, FormValidationMessages.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

FormValidationMessages.propTypes = {
  className: React.PropTypes.string
};

FormValidationMessages.defaultProps = {
  className: null
};

export default FormValidationMessages;
