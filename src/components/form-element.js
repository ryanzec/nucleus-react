import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

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

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'validation')}
      >
        {this.props.children}
      </div>
    );
  }
}

FormElement.displayName = 'FormElement';

FormElement.propTypes = {
  className: React.PropTypes.string,
  validation: React.PropTypes.oneOf([false, 'valid', 'invalid'])
};

FormElement.defaultProps = {
  className: null,
  validation: false
};

export default FormElement;
