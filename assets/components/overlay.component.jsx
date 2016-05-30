import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Overlay extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['overlay'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    if (this.props.isAbsolute) {
      cssClasses.push('overlay-absolute');
    }

    return cssClasses;
  }

  render() {
    var topContentNode = null;

    if (this.props.children && this.props.children[0]) {
      topContentNode = (
        <div className="overlay__top-content">{this.props.children}</div>
      );
    }

    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive', 'isAbsolute')}
      >
        {topContentNode}
      </div>
    );
  }
}

Overlay.displayName = 'Overlay';

Overlay.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  isAbsolute: React.PropTypes.bool
};

Overlay.defaultProps = {
  className: null,
  isActive: false,
  isAbsolute: false
};

export default Overlay;
