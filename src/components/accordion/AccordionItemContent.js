import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['accordion__item-content'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class AccordionItemContent extends React.PureComponent {
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

AccordionItemContent.propTypes = {
  className: PropTypes.string
};

AccordionItemContent.defaultProps = {
  className: null,
};

export default AccordionItemContent;
