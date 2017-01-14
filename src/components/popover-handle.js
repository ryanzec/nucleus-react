import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class PopoverHandle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['popover__handle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <span
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
      </span>
    );
  }
}

PopoverHandle.propTypes = {
  className: React.PropTypes.string
};

PopoverHandle.defaultProps = {
  className: null
};

export default PopoverHandle;
