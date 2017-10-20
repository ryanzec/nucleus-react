import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['accordion__item-header'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class AccordionItemHeader extends React.PureComponent {
  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <h4
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, AccordionItemHeader.propTypes)}
      >
        {this.props.children}
        <SvgIcon fragment={this.props.isActive ? 'arrow-up' : 'arrow-down'} />
      </h4>
    );
  }
}

AccordionItemHeader.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

AccordionItemHeader.defaultProps = {
  className: null,
  isActive: false,
};

export default AccordionItemHeader;
