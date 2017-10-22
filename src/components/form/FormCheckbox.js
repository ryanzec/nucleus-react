import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import FormLabel from './FormLabel';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = [];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.disabled) {
      cssClasses.push('is-disabled');
    }

    return cssClasses.join(' ');
  };
}

class FormCheckbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    inputAlignment: PropTypes.oneOf(['left', 'right']),
    checked: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    inputAlignment: 'left',
    checked: false
  };

  getCssClasses = createGetCssClasses(this);

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

export default FormCheckbox;
