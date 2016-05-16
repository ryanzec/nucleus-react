import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-control'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.size) {
      cssClasses.push('form-control-' + this.props.size);
    }

    if (this.props.validation) {
      cssClasses.push('form-control-' + this.props.validation);
    }

    return cssClasses;
  }

  render() {
    return (
      <select
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'size', 'validation')}
      >
        {this.props.children}
      </select>
    );
  }
}

FormSelect.displayName = 'FormSelect';

FormSelect.propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['sm', 'lg']),
  validation: React.PropTypes.oneOf(['success', 'warning', 'danger'])
};

FormSelect.defaultProps = {
  className: null,
  size: null,
  validation: null
};

export default FormSelect;
