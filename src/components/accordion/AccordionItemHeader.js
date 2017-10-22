import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

import styles from 'src/components/accordion/AccordionItemHeader.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class AccordionItemHeader extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isActive: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    const composedStyles = composeStyles(styles, this.props.customStyles);

    return (
      <h4
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, AccordionItemHeader.propTypes)}
      >
        {this.props.children}
        <SvgIcon
          className={composedStyles.svgIcon}
          fragment={this.props.isActive ? 'arrow-up' : 'arrow-down'}
        />
      </h4>
    );
  }
}

export default AccordionItemHeader;
