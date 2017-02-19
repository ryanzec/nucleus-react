import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class FormSelectOption extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__select-option'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <option
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormSelectOption.propTypes)}
      >
        {this.props.children}
      </option>
    );
  }
}

FormSelectOption.propTypes = {
  className: React.PropTypes.string
};

FormSelectOption.defaultProps = {
  className: null
};

export default FormSelectOption;
