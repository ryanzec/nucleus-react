import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class OverlayAbsolute extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['overlay', 'overlay-absolute'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  }

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

OverlayAbsolute.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool
};

OverlayAbsolute.defaultProps = {
  className: null,
  isActive: false
};

export default OverlayAbsolute;
