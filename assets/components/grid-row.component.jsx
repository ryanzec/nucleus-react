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
    let cssClasses = ['grid__row', 'm-alignment-' + this.props.alignment];

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
        {...getPassThroughProperties(this.props, 'className', 'isStretched', 'isVertical', 'canWrap', 'alignment')}
      >
        {this.props.children}
      </div>
    );
  }
}

GridRow.displayName = 'GridRow';

GridRow.propTypes = {
  className: React.PropTypes.string,
  isStretched: React.PropTypes.bool,
  isVertical: React.PropTypes.bool,
  canWrap: React.PropTypes.bool,
  alignment: customPropTypes.gridRowAlignments
};

GridRow.defaultProps = {
  className: null,
  isStretched: true,
  isVertical: false,
  canWrap: false,
  alignment: 'left'
};

export default GridRow;
