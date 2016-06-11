import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

class NotificationIcon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['notification__icon'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
      >
        <SvgIcon
          {...getPassThroughProperties(this.props, 'className')}
        />
      </div>
    );
  }
}

NotificationIcon.displayName = 'NotificationIcon';

NotificationIcon.propTypes = {
  className: React.PropTypes.string
};

NotificationIcon.defaultProps = {
  className: null
};

export default NotificationIcon;
