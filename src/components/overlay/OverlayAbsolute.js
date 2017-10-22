import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['overlay', 'overlay-absolute'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  };
};

class OverlayAbsolute extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    isActive: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    let topContentNode = null;

    if (this.props.children && this.props.children[0]) {
      topContentNode = (
        <div className="overlay__top-content">{this.props.children}</div>
      );
    }

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, OverlayAbsolute.propTypes)}
      >
        {topContentNode}
      </div>
    );
  }
}

export default OverlayAbsolute;
