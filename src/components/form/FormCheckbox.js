import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';


import FormLabel from './FormLabel';
import SvgIcon from '../svg-icon/SvgIcon';

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

    return cssClasses.join(' ');
  }

  render() {
    let nodes;
    const textNode = (
      <span key="text">{this.props.children}</span>
    );
    const iconNode = (
      <SvgIcon key="icon" fragment={this.props.checked ? 'check-square' : 'square'} />
    );

    if (this.props.inputAlignment === 'left') {
      nodes = [iconNode, textNode];
    } else {
      nodes = [textNode, iconNode];
    }

    return (
      <FormLabel
        className={this.getCssClasses()}
        inputType="checkbox"
        inputAlignment={this.props.inputAlignment}
      >
        <input
          className="u-hide"
          type="checkbox"
          {...getPassThroughProperties(this.props, FormCheckbox.propTypes, 'checked')}
        />
        {nodes}
      </FormLabel>
    );
  }
}

FormCheckbox.propTypes = {
  className: PropTypes.string,
  inputAlignment: PropTypes.oneOf(['left', 'right']),
  checked: PropTypes.bool
};

FormCheckbox.defaultProps = {
  className: null,
  inputAlignment: 'left',
  checked: false
};

export default FormCheckbox;
