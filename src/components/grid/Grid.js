import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['grid'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isForm) {
      cssClasses.push('m-form');

      if (instance.props.labelAlignment === 'right') {
        cssClasses.push('m-form-label-right');
      }
    }

    return cssClasses.join(' ');
  };
};

class Grid extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isForm: PropTypes.bool,
    labelAlignment: PropTypes.oneOf(['left', 'right'])
  };

  static defaultProps = {
    className: null,
    isForm: false,
    labelAlignment: 'right'
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Grid.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Grid;
