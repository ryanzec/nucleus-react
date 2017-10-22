import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['grid__column'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.shrink) {
      cssClasses.push('m-shrink');
    }

    if (instance.props.order) {
      cssClasses.push(`m-order${instance.props.order}`);
    }

    if (instance.props.smallSize) {
      cssClasses.push(`m-small-size${instance.props.smallSize}`);
    }

    if (instance.props.mediumSize) {
      cssClasses.push(`m-medium-size${instance.props.mediumSize}`);
    }

    if (instance.props.largeSize) {
      cssClasses.push(`m-large-size${instance.props.largeSize}`);
    }

    if (instance.props.extraLargeSize) {
      cssClasses.push(`m-extra-large-size${instance.props.extraLargeSize}`);
    }

    if (instance.props.smallOffset) {
      cssClasses.push(`m-small-offset${instance.props.smallOffset}`);
    }

    if (instance.props.mediumOffset) {
      cssClasses.push(`m-medium-offset${instance.props.mediumOffset}`);
    }

    if (instance.props.largeOffset) {
      cssClasses.push(`m-large-offset${instance.props.largeOffset}`);
    }

    if (instance.props.extraLargeOffset) {
      cssClasses.push(`m-extra-large-offset${instance.props.extraLargeOffset}`);
    }

    return cssClasses.join(' ');
  };
};

class GridRow extends React.Component {
  static propTypes = {
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

  static defaultProps = {
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
