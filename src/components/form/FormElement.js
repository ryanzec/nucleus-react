import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class FormElement extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.validation) {
      cssClasses.push(`m-${this.props.validation}`);
    }

    return cssClasses.join(' ');
  }

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

FormElement.propTypes = {
  className: PropTypes.string,
  validation: PropTypes.oneOf([false, 'valid', 'invalid'])
};

FormElement.defaultProps = {
  className: null,
  validation: false
};

export default FormElement;
