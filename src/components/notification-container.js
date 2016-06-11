import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class NotificationContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['notification-container', `m-position-${this.props.position}`];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'position')}
      >
        {this.props.children}
      </div>
    );
  }
}

NotificationContainer.displayName = 'NotificationContainer';

NotificationContainer.propTypes = {
  className: React.PropTypes.string,
  position: React.PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right'])
};

NotificationContainer.defaultProps = {
  className: null,
  position: 'bottom-left'
};

export default NotificationContainer;
