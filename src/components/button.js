import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Button extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['button'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    if (this.props.isPill) {
      cssClasses.push('m-pill');
    }

    if (this.props.isThin) {
      cssClasses.push('m-thin');
    }

    return cssClasses;
  }

  render() {
    return (
      <button
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType', 'isPill', 'isThin')}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'link']),
  isPill: React.PropTypes.bool,
  isThin: React.PropTypes.bool
};

Button.defaultProps = {
  className: null,
  styleType: null,
  isPill: false,
  isThin: false
};

export default Button;
