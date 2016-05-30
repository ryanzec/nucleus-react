import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import FormLabel from './form-label.component.jsx';
import SvgIcon from './svg-icon.component.jsx';

class FormCheckbox extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    let fragment = this.props.checked ? 'dot-circle-o' : 'circle-o';
    let nodes = [];
    let textNode = (<span key="text">{this.props.children}</span>);
    let iconNode = (
      <SvgIcon key="icon" fragment={fragment} />
    );

    if (this.props.inputAlignment === 'left') {
      nodes = [iconNode, textNode];
    } else {
      nodes = [textNode, iconNode];
    }

    return (
      <FormLabel inputType="radio" inputAlignment={this.props.inputAlignment}>
        <input type="hidden" />
        {nodes}
      </FormLabel>
    );
  }
}

FormCheckbox.displayName = 'FormCheckbox';

FormCheckbox.propTypes = {
  className: React.PropTypes.string,
  inputAlignment: customPropTypes.formLabelInputAlignments
};

FormCheckbox.defaultProps = {
  className: null,
  inputAlignment: 'left'
};

export default FormCheckbox;
