import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormCheckboxToggle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__checkbox-toggle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.checked) {
      cssClasses.push('is-checked');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, FormCheckboxToggle.propTypes)}
      >
        <div className="form-element__checkbox-toggle-circle"></div>
        <div className="form-element__checkbox-toggle-bar">
          <span>{this.props.checked ? this.props.onNode : this.props.offNode}</span>
        </div>
      </div>
    );
  }
}

FormCheckboxToggle.propTypes = {
  className: React.PropTypes.string,
  checked: React.PropTypes.bool,
  offNode: React.PropTypes.node,
  onNode: React.PropTypes.node
};

FormCheckboxToggle.defaultProps = {
  className: null,
  checked: false,
  offNode: 'Off',
  onNode: 'On'
};

export default FormCheckboxToggle;
