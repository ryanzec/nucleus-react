import React from 'react';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import FormLabel from './form-label';
import SvgIcon from './svg-icon';

class FormCheckbox extends React.Component {
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
    let nodes;
    const textNode = (<span key="text">{this.props.children}</span>);
    const iconNode = (
      <SvgIcon key="icon" fragment={this.props.checked ? 'dot-circle-o' : 'circle-o'} />
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
  inputAlignment: React.PropTypes.oneOf(['left', 'right']),
  checked: React.PropTypes.bool
};

FormCheckbox.defaultProps = {
  className: null,
  inputAlignment: 'left',
  checked: false
};

export default FormCheckbox;
