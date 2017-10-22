import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/accordion/AccordionItemContent.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push(composedStyles.isActive);
    }

    return cssClasses.join(' ');
  };
};

class AccordionItemContent extends React.PureComponent {
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
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, AccordionItemContent.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default AccordionItemContent;
