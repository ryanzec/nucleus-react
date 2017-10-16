import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class FormTextbox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [this.props.type === 'textarea' || this.props.type === 'file' ? `form-element__${this.props.type}` : 'form-element__textbox'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          className={this.getCssClasses()}
          {...getPassThroughProperties(this.props, FormTextbox.propTypes)}
        />
      );
    }

    return (
      <input
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormTextbox.propTypes, 'type')}
      />
    );
  }
}

FormTextbox.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
};

FormTextbox.defaultProps = {
  className: null,

  //NOTE: default input passtrhgouh props
  type: 'text'
};

export default FormTextbox;
