import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class GridRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['grid__column'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.shrink) {
      cssClasses.push('m-shrink');
    }

    if (this.props.order) {
      cssClasses.push(`m-order${this.props.order}`);
    }

    if (this.props.smallSize) {
      cssClasses.push(`m-small-size${this.props.smallSize}`);
    }

    if (this.props.mediumSize) {
      cssClasses.push(`m-medium-size${this.props.mediumSize}`);
    }

    if (this.props.largeSize) {
      cssClasses.push(`m-large-size${this.props.largeSize}`);
    }

    if (this.props.extraLargeSize) {
      cssClasses.push(`m-extra-large-size${this.props.extraLargeSize}`);
    }

    if (this.props.smallOffset) {
      cssClasses.push(`m-small-offset${this.props.smallOffset}`);
    }

    if (this.props.mediumOffset) {
      cssClasses.push(`m-medium-offset${this.props.mediumOffset}`);
    }

    if (this.props.largeOffset) {
      cssClasses.push(`m-large-offset${this.props.largeOffset}`);
    }

    if (this.props.extraLargeOffset) {
      cssClasses.push(`m-extra-large-offset${this.props.extraLargeOffset}`);
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, GridRow.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

GridRow.propTypes = {
  className: PropTypes.string,
  shrink: PropTypes.bool,
  order: PropTypes.number,
  smallSize: PropTypes.number,
  mediumSize: PropTypes.number,
  largeSize: PropTypes.number,
  extraLargeSize: PropTypes.number,
  smallOffset: PropTypes.number,
  mediumOffset: PropTypes.number,
  largeOffset: PropTypes.number,
  extraLargeOffset: PropTypes.number
};

GridRow.defaultProps = {
  className: null,
  shrink: false,
  order: null,
  smallSize: null,
  mediumSize: null,
  largeSize: null,
  extraLargeSize: null,
  smallOffset: null,
  mediumOffset: null,
  largeOffset: null,
  extraLargeOffset: null
};

export default GridRow;
