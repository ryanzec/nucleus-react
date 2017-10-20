import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['accordion'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class Accordion extends React.PureComponent {
  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Accordion.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

Accordion.propTypes = {
  className: PropTypes.string,
};

Accordion.defaultProps = {
  className: null,
};

export default Accordion;
