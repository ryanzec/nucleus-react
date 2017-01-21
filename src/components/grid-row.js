import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

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

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, GridRow.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

GridRow.propTypes = {
  className: React.PropTypes.string,
  isStretched: React.PropTypes.bool,
  isVertical: React.PropTypes.bool,
  canWrap: React.PropTypes.bool,
  alignment: React.PropTypes.oneOf(['left', 'center', 'right', 'spaced', 'justify'])
};

GridRow.defaultProps = {
  className: null,
  isStretched: true,
  isVertical: false,
  canWrap: false,
  alignment: 'left'
};

export default GridRow;
