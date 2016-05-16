import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import TetherComponent from 'react-tether';

//NOTE: this might seem backward but it is becuase the position on related to the floating content, not the target
const attachmentPositionMap = {
  top: 'bottom center',
  bottom: 'top center',
  left: 'middle right',
  right: 'middle left'
}

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['tooltip'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    if (!this.props.isActive) {
      return (
        this.props.children[0]
      );
    }

    return (
      <TetherComponent
        className={this.getCssClasses().join(' ')}
        attachment={attachmentPositionMap[this.props.attachment]}
        classPrefix="bs-tether"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        {this.props.children}
      </TetherComponent>
    );
  }
}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  attachment: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

Tooltip.defaultProps = {
  className: null,
  isActive: false,
  attachment: 'top'
};

export default Tooltip;
