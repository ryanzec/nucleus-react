import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['grid__row', `m-alignment-${instance.props.alignment}`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (!instance.props.isStretched) {
      cssClasses.push('m-no-stretch');
    }

    if (instance.props.isVertical) {
      cssClasses.push('m-vertical');
    }

    if (instance.props.canWrap) {
      cssClasses.push('m-wrapping');
    }

    return cssClasses.join(' ');
  };
}

class GridRow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isStretched: PropTypes.bool,
    isVertical: PropTypes.bool,
    canWrap: PropTypes.bool,
    alignment: PropTypes.oneOf(['left', 'center', 'right', 'spaced', 'justify'])
  };

  static defaultProps = {
    className: null,
    isStretched: true,
    isVertical: false,
    canWrap: false,
    alignment: 'left'
  };

  getCssClasses = createGetCssClasses(this);

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

export default GridRow;
