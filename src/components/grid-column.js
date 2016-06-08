import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class GridRow extends React.Component {
  constructor(props) {
    super(props);
  }

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
      cssClasses.push('m-order' + this.props.order);
    }

    if (this.props.smallSize) {
      cssClasses.push('m-small-size' + this.props.smallSize);
    }

    if (this.props.mediumSize) {
      cssClasses.push('m-medium-size' + this.props.mediumSize);
    }

    if (this.props.largeSize) {
      cssClasses.push('m-large-size' + this.props.largeSize);
    }

    if (this.props.extraLargeSize) {
      cssClasses.push('m-extra-large-size' + this.props.extraLargeSize);
    }

    if (this.props.smallOffset) {
      cssClasses.push('m-small-offset' + this.props.smallOffset);
    }

    if (this.props.mediumOffset) {
      cssClasses.push('m-medium-offset' + this.props.mediumOffset);
    }

    if (this.props.largeOffset) {
      cssClasses.push('m-large-offset' + this.props.largeOffset);
    }

    if (this.props.extraLargeOffset) {
      cssClasses.push('m-extra-large-offset' + this.props.extraLargeOffset);
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'shrink', 'order', 'smallSize', 'mediumSize', 'largeSize', 'extraLargeSize', 'smallOffset', 'mediumOffset', 'largeOffset', 'extraLargeOffset')}
      >
        {this.props.children}
      </div>
    );
  }
}

GridRow.displayName = 'GridRow';

GridRow.propTypes = {
  className: React.PropTypes.string,
  shrink: React.PropTypes.bool,
  order: React.PropTypes.number,
  smallSize: React.PropTypes.number,
  mediumSize: React.PropTypes.number,
  largeSize: React.PropTypes.number,
  extraLargeSize: React.PropTypes.number,
  smallOffset: React.PropTypes.number,
  mediumOffset: React.PropTypes.number,
  largeOffset: React.PropTypes.number,
  extraLargeOffset: React.PropTypes.number
};

GridRow.defaultProps = {
  className: null,
  shrink: false,
  order: null,
  smallSize: null,
  mediumSize: null,
  largeSize: null,
  extraLargeSize: null,
  smallOffset : null,
  mediumOffset : null,
  largeOffset : null,
  extraLargeOffset : null
};

export default GridRow;
