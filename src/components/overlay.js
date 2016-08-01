import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import getNextId from '../utilities/get-next-id';

import AppendBodyComponent from './append-body-component';

class Overlay extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.setAppendElementId(getNextId());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentDidMount() {
    this.updateSelf();
  }

  componentDidUpdate() {
    this.updateSelf();
  }

  componentWillUnmount() {
    this.removeAppendElement();
  }

  getCssClasses() {
    let cssClasses = ['overlay'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses;
  }

  updateSelf() {
    let topContentNode = null;

    if (this.props.children && this.props.children[0]) {
      topContentNode = (
        <div className="overlay__top-content">{this.props.children}</div>
      );
    }

    this.updateAppendElement(
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive')}
      >
        {topContentNode}
      </div>
    );
  }

  render() {
    return null;
  }
}

Overlay.displayName = 'Overlay';

Overlay.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool
};

Overlay.defaultProps = {
  className: null,
  isActive: false,
  isAbsolute: false
};

export default Overlay;
