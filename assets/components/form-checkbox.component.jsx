import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import FormLabel from './form-label.component.jsx';
import SvgIcon from './svg-icon.component.jsx';

class FormElementCheckbox extends React.Component {
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
    var fragment = this.props.checked ? 'check-square' : 'square';
    var nodes = [];
    var textNode = this.props.children;
    var iconNode = (
      <SvgIcon fragment={fragment} />
    );

    if (this.props.inputAlignment === 'left') {
      nodes = [iconNode, textNode];
    } else {
      nodes = [textNode, iconNode];
    }

    return (
      <FormLabel inputType="checkbox" inputAlignment={this.props.inputAlignment}>
        <input type="hidden" />
        {nodes}
      </FormLabel>
    );
  }
}

FormElementCheckbox.displayName = 'FormElementCheckbox';

FormElementCheckbox.propTypes = {
  className: React.PropTypes.string,
  inputAlignment: customPropTypes.formLabelInputAlignments
};

FormElementCheckbox.defaultProps = {
  className: null,
  inputAlignment: 'left'
};

export default FormElementCheckbox;
