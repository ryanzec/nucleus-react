import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['button'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push('m-' + this.props.styleType);
    }

    return cssClasses;
  }

  render() {
    return (
      <button
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType')}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.displayName = 'Button';

Button.propTypes = {
  className: React.PropTypes.string,
  styleType: customPropTypes.buttonStyleTypes
};

Button.defaultProps = {
  className: null,
  styleType: null
};

export default Button;
