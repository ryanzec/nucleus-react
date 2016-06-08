import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormTextbox extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [this.props.type === 'textarea' || this.props.type === 'file' ? 'form-element__' + this.props.type : 'form-element__textbox'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    if(this.props.type === 'textarea') {
      return (
        <textarea
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(this.props, 'className', 'type')}
        />
      );
    }

    return (
      <input
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      />
    );
  }
}

FormTextbox.displayName = 'FormTextbox';

FormTextbox.propTypes = {
  className: React.PropTypes.string
};

FormTextbox.defaultProps = {
  className: null,

  //NOTE: default input passtrhgouh props
  type: 'text'
};

export default FormTextbox;
