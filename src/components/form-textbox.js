import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormTextbox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [this.props.type === 'textarea' || this.props.type === 'file' ? `form-element__${this.props.type}` : 'form-element__textbox'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(this.props, FormTextbox.propTypes)}
        />
      );
    }

    return (
      <input
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, FormTextbox.propTypes, 'type')}
      />
    );
  }
}

FormTextbox.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string
};

FormTextbox.defaultProps = {
  className: null,

  //NOTE: default input passtrhgouh props
  type: 'text'
};

export default FormTextbox;
