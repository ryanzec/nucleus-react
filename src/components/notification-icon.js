import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

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

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
      >
        <SvgIcon
          {...getPassThroughProperties(this.props, NotificationIcon.propTypes)}
        />
      </div>
    );
  }
}

NotificationIcon.propTypes = {
  className: PropTypes.string
};

NotificationIcon.defaultProps = {
  className: null
};

export default NotificationIcon;
