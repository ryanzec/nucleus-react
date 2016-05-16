import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import customPropTypes from '../utilities/component/custom-prop-types';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['btn'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      if (this.props.isOutline) {
        cssClasses.push('btn-' + this.props.styleType + '-outline');
      } else {
        cssClasses.push('btn-' + this.props.styleType);
      }
    }

    if (this.props.size) {
      cssClasses.push('btn-' + this.props.size);
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    if (this.props.isBlock) {
      cssClasses.push('btn-block');
    }

    return cssClasses;
  }

  render() {
    return (
      <button
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType', 'isOutline', 'size', 'isActive', 'isBlock')}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.displayName = 'Button';

Button.propTypes = {
  className: React.PropTypes.string,
  styleType: customPropTypes.buttonStyleTypes,
  isOutline: React.PropTypes.bool,
  size: customPropTypes.buttonSizes,
  isActive: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  isBlock: React.PropTypes.bool
};

Button.defaultProps = {
  className: null,
  styleType: null,
  isOutline: false,
  size: null,
  isActive: false,
  disabled: false,
  isBlock: false
};

export default Button;
