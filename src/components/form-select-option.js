import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormSelectOption extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__select-option'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <option
        className={this.getCssClasses().join(' ')}
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
