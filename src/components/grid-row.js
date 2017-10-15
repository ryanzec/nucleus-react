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
    let cssClasses = ['grid__row', `m-alignment-${this.props.alignment}`];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (!this.props.isStretched) {
      cssClasses.push('m-no-stretch');
    }

    if (this.props.isVertical) {
      cssClasses.push('m-vertical');
    }

    if (this.props.canWrap) {
      cssClasses.push('m-wrapping');
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
  isStretched: PropTypes.bool,
  isVertical: PropTypes.bool,
  canWrap: PropTypes.bool,
  alignment: PropTypes.oneOf(['left', 'center', 'right', 'spaced', 'justify'])
};

GridRow.defaultProps = {
  className: null,
  isStretched: true,
  isVertical: false,
  canWrap: false,
  alignment: 'left'
};

export default GridRow;
