import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class FormValidationMessages extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__validation-messages'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormValidationMessages.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

FormValidationMessages.propTypes = {
  className: PropTypes.string
};

FormValidationMessages.defaultProps = {
  className: null
};

export default FormValidationMessages;
