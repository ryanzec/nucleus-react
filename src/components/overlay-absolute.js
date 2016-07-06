import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

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

    return cssClasses;
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
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive')}
      >
        {topContentNode}
      </div>
    );
  }
}

OverlayAbsolute.displayName = 'OverlayAbsolute';

OverlayAbsolute.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool
};

OverlayAbsolute.defaultProps = {
  className: null,
  isActive: false
};

export default OverlayAbsolute;
