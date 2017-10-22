import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = [];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};


class AccordionItem extends React.Component {
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
};

AccordionItem.defaultProps = {
  className: null,
};

export default AccordionItem;
