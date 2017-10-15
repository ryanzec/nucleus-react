import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class Grid extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['grid'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isForm) {
      cssClasses.push('m-form');

      if (this.props.labelAlignment === 'right') {
        cssClasses.push('m-form-label-right');
      }
    }

    return cssClasses.join(' ');
  }

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

Grid.propTypes = {
  className: PropTypes.string,
  isForm: PropTypes.bool,
  labelAlignment: PropTypes.oneOf(['left', 'right'])
};

Grid.defaultProps = {
  className: null,
  isForm: false,
  labelAlignment: 'right'
};

export default Grid;
