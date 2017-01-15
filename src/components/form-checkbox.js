import React from 'react';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';


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

    if (this.props.disabled) {
      cssClasses.push('is-disabled');
    }

    return cssClasses;
  }

  render() {
    let nodes;
    const textNode = (<span key="text">{this.props.children}</span>);
    const iconNode = (
      <SvgIcon key="icon" fragment={this.props.checked ? 'check-square' : 'square'} />
    );

    if (this.props.inputAlignment === 'left') {
      nodes = [iconNode, textNode];
    } else {
      nodes = [textNode, iconNode];
    }

    return (
      <FormLabel className={this.getCssClasses().join(' ')} inputType="checkbox" inputAlignment={this.props.inputAlignment}>
        <input
          className="u-hide"
          type="checkbox"
          {...getPassThroughProperties(this.props, 'className', 'inputAlignment')}
        />
        {nodes}
      </FormLabel>
    );
  }
}

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
