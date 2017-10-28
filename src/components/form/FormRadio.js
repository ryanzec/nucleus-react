import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormRadio.module.scss';

import FormLabel from './FormLabel';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetFormLabelCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.label];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createGetSvgIconCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.svgIcon];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.disabled) {
      cssClasses.push(composedStyles.svgIconDisabled);
    }

    if (instance.props.validation) {
      cssClasses.push(composedStyles[`${instance.props.validation}SvgIcon`]);
    }

    if (instance.props.inputAlignment === 'right') {
      cssClasses.push(composedStyles.svgIconRightAligned);
    } else {
      cssClasses.push(composedStyles.svgIconLeftAligned);
    }

    return cssClasses.join(' ');
  };
};

class FormRadio extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    inputAlignment: PropTypes.oneOf(['left', 'right']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    customStyles: PropTypes.object,
    validation: PropTypes.oneOf(['valid', 'invalid']),
  };

  static defaultProps = {
    className: null,
    inputAlignment: 'left',
    checked: false,
    disabled: false,
    customStyles: null,
    validation: null,
  };

  getFormLabelCssClasses = createGetFormLabelCssClasses(this);
  getSvgIconCssClasses = createGetSvgIconCssClasses(this);

  render() {
    let nodes;
    const textNode = (<span key="text">{this.props.children}</span>);
    const iconNode = (
      <SvgIcon key="icon" fragment={this.props.checked ? 'dot-circle-o' : 'circle-o'} className={this.getSvgIconCssClasses()} />
    );

    if (this.props.inputAlignment === 'left') {
      nodes = [iconNode, textNode];
    } else {
      nodes = [textNode, iconNode];
    }

    return (
      <FormLabel
        className={this.getFormLabelCssClasses()}
        inputType="radio"
        inputAlignment={this.props.inputAlignment}
      >
        <input
          type="hidden"
          {...getPassThroughProperties(this.props, FormRadio.propTypes)}
        />
        {nodes}
      </FormLabel>
    );
  }
}

export default FormRadio;
