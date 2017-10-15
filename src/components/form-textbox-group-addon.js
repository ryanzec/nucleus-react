import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class FormTextboxGroupAddon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__textbox-group-addon'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormTextboxGroupAddon.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

FormTextboxGroupAddon.propTypes = {
  className: PropTypes.string
};

FormTextboxGroupAddon.defaultProps = {
  className: null
};

export default FormTextboxGroupAddon;
