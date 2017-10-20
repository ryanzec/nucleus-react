import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['accordion__item'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses.join(' ');
  };
};


class AccordionItem extends React.PureComponent {
  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, AccordionItem.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

AccordionItem.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

AccordionItem.defaultProps = {
  className: null,
  isActive: false,
};

export default AccordionItem;
