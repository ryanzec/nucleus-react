import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

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

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Notification.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

Notification.propTypes = {
  className: PropTypes.string,
  styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  isFilled: PropTypes.bool,
  hasShadow: PropTypes.bool
};

Notification.defaultProps = {
  className: null,
  styleType: 'success',
  isFilled: false,
  hasShadow: false
};

export default Notification;
