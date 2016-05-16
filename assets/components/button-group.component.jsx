import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [this.props.isToolbar ? 'btn-toolbar' : this.props.isVertical ? 'btn-group-vertical' : 'btn-group'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }
    if (this.props.size) {
      cssClasses.push('btn-group-' + this.props.size);
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isToolbar', 'size', 'isVertical')}
      >
        {this.props.children}
      </div>
    );
  }
}

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.propTypes = {
  className: React.PropTypes.string,
  isToolbar: React.PropTypes.bool,
  size: React.PropTypes.oneOf(['lg', 'sm']),
  isVertical: React.PropTypes.bool
};

ButtonGroup.defaultProps = {
  className: null,
  isToolbar: false,
  size: null,
  isVertical: false
};

export default ButtonGroup;
