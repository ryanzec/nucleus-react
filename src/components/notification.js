import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Notification extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['notification'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    if (this.props.isFilled) {
      cssClasses.push('m-filled');
    }

    if (this.props.hasShadow) {
      cssClasses.push('m-shadow');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, Notification.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

Notification.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  isFilled: React.PropTypes.bool,
  hasShadow: React.PropTypes.bool
};

Notification.defaultProps = {
  className: null,
  styleType: 'success',
  isFilled: false,
  hasShadow: false
};

export default Notification;
