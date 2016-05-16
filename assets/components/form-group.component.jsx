import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-group'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.useGrid) {
      cssClasses.push('row');
    }

    if (this.props.validation) {
      cssClasses.push('has-' + this.props.validation);
    }

    return cssClasses;
  }

  render() {
    return React.createElement(
      this.props.elementType,
      Object.assign({
        className: this.getCssClasses().join(' ')
      }, getPassThroughProperties(this.props, 'className', 'elementType', 'useGrid', 'validation')),
      this.props.children
    );
  }
}

FormGroup.displayName = 'FormGroup';

FormGroup.propTypes = {
  className: React.PropTypes.string,
  elementType: React.PropTypes.string,
  useGrid: React.PropTypes.bool,
  validation: React.PropTypes.oneOf(['success', 'warning', 'danger'])
};

FormGroup.defaultProps = {
  className: null,
  elementType: 'div',
  useGrid: false,
  validation: null
};

export default FormGroup;
